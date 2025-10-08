/**
 * Classe Combat - Gestion du système de combat
 */

class Combat {
    constructor(player) {
        this.player = player;
        this.currentMonster = null;
        
        // Système de régions/zones
        this.currentRegion = 1; // Région actuelle (1-5)
        this.currentZone = 1; // Zone actuelle dans la région (1-10)
        this.monstersKilled = 0; // Compteur total
        this.bossKillsInRegion = 0; // Kills pour spawn du boss
        
        // Système de progression
        this.unlockedRegions = 1; // Nombre de régions débloquées
        this.unlockedZones = {}; // { regionId: maxZoneUnlocked }
        this.unlockedZones[1] = 1; // Région 1, Zone 1 débloquée
        
        // Compteurs de kills par zone (pour déblocage)
        this.monstersKilledPerZone = {};
        this.monstersKilledPerZone['1_1'] = 0; // Format: "regionId_zoneId"
        
        // État du combat
        this.isActive = true;
        this.isFighting = false;
        this.autoCombatEnabled = false;
        
        // Journal de combat
        this.combatLog = [];
        
        // Timer pour régénération HP
        this.lastRegenTime = Date.now();
        
        // Spawn le premier monstre
        this.spawnMonster();
    }

    /**
     * Obtient la zone actuelle depuis RegionsData
     */
    getCurrentZoneData() {
        return window.RegionsData.getZone(this.currentRegion, this.currentZone);
    }

    /**
     * Obtient la région actuelle depuis RegionsData
     */
    getCurrentRegionData() {
        return window.RegionsData.getRegion(this.currentRegion);
    }

    /**
     * Spawn un nouveau monstre basé sur la zone actuelle
     */
    spawnMonster() {
        const zoneData = this.getCurrentZoneData();
        
        if (!zoneData) {
            console.error(`Zone ${this.currentRegion}_${this.currentZone} introuvable`);
            return;
        }
        
        const regionData = this.getCurrentRegionData();
        
        // ========== MÉCANIQUE BOSS : Zone 10 uniquement ==========
        // Si c'est la Zone 10 ET que c'est le 10ème monstre de cette zone
        if (this.currentZone === 10 && zoneData.isBossZone && zoneData.bossSpawnLogic === "9_normal_then_boss") {
            // Compter les kills dans cette zone spécifique
            const zoneKey = `${this.currentRegion}_${this.currentZone}`;
            const killsInThisZone = this.monstersKilledPerZone[zoneKey] || 0;
            
            // Si on a tué 9 monstres dans cette zone, spawn le boss
            if (killsInThisZone >= 9 && regionData.boss) {
                // 🩺 Soigner le joueur à 100% avant le boss
                this.player.heal(9999);
                
                // Mettre à jour l'UI pour afficher les HP restaurés
                if (window.game && window.game.ui) {
                    window.game.ui.updatePlayerUI();
                }
                
                // Spawn le boss
                this.currentMonster = new Monster(regionData.boss.id, zoneData.levelRange.max);
                this.addLog(`⚠️ 💀 ${this.currentMonster.getName()} apparaît ! (BOSS) 💀`);
                this.addLog(`✨ Vous avez été complètement soigné !`);
                
                return;
            }
            
            // 📊 Indicateur visuel : si on est à 8 kills, prévenir le joueur
            if (killsInThisZone === 8) {
                this.addLog(`⚔️ ATTENTION : Le boss apparaîtra au prochain monstre ! (9/9)`);
            }
        }
        
        // Sinon, spawn un monstre normal de la zone
        const allMonsters = [
            ...zoneData.monsters.common,
            ...zoneData.monsters.rare,
            ...zoneData.monsters.elite
        ];
        
        if (allMonsters.length === 0) {
            console.error(`Aucun monstre dans la zone ${this.currentZone}`);
            return;
        }
        
        // Utiliser le système de RNG de MonstersData pour spawn rare/elite
        const randomMonster = window.MonstersData.getRandomMonster(allMonsters);
        
        if (!randomMonster) {
            console.error(`Impossible de spawn un monstre`);
            return;
        }
        
        // Créer le monstre avec le niveau de la zone
        const monsterLevel = zoneData.levelRange.min + Math.floor((zoneData.levelRange.max - zoneData.levelRange.min) / 2);
        this.currentMonster = new Monster(randomMonster.id, monsterLevel);
        
        // Message selon la rareté
        const rarityPrefix = {
            rare: '✨',
            elite: '👑',
            boss: '💀'
        };
        const prefix = rarityPrefix[this.currentMonster.getRarity()] || '';
        
        this.addLog(`${prefix} ${this.currentMonster.getName()} apparaît !`);
    }

    /**
     * Attaque manuelle du joueur (clic)
     */
    manualAttack() {
        if (!this.currentMonster || !this.currentMonster.isAlive) {
            return false;
        }
        
        if (!this.player.isAlive) {
            return false;
        }
        
        // Le joueur attaque
        const damage = this.player.attack(this.currentMonster);
        const actualDamage = this.currentMonster.takeDamage(damage);
        
        this.addLog(`Vous infligez ${actualDamage} dégâts au ${this.currentMonster.getName()}`);
        
        // Vérifier si le monstre est mort
        if (!this.currentMonster.isAlive) {
            this.onMonsterDeath();
            return true;
        }
        
        // ⚔️ LE MONSTRE RIPOSTE IMMÉDIATEMENT après l'attaque du joueur
        if (this.currentMonster && this.currentMonster.isAlive) {
            const monsterDamage = this.currentMonster.attack();
            const actualMonsterDamage = this.player.takeDamage(monsterDamage);
            
            this.addLog(`${this.currentMonster.getName()} riposte et inflige ${actualMonsterDamage} dégâts`);
            
            // Vérifier si le joueur est mort
            if (!this.player.isAlive) {
                this.onPlayerDeath();
                return true;
            }
        }
        
        return true;
    }

    /**
     * Mise à jour du combat automatique
     */
    update(deltaTime) {
        if (!this.isActive) return;
        
        const currentTime = Date.now();
        
        // Régénération HP passive
        this.updateHealthRegen(deltaTime);
        
        // Si auto-combat désactivé, on s'arrête ici (pas d'attaque automatique)
        // Le monstre riposte uniquement quand le joueur clique (voir manualAttack)
        if (!this.isFighting) return;
        
        // Le joueur attaque automatiquement (auto-combat ON)
        if (this.player.canAttack(currentTime) && this.currentMonster && this.currentMonster.isAlive) {
            const damage = this.player.attack(this.currentMonster);
            const actualDamage = this.currentMonster.takeDamage(damage);
            
            this.addLog(`Vous infligez ${actualDamage} dégâts`);
            
            if (!this.currentMonster.isAlive) {
                this.onMonsterDeath();
                return;
            }
        }
        
        // Le monstre attaque automatiquement (auto-combat ON)
        if (this.currentMonster && this.currentMonster.isAlive && this.currentMonster.canAttack(currentTime)) {
            const damage = this.currentMonster.attack();
            const actualDamage = this.player.takeDamage(damage);
            
            this.addLog(`${this.currentMonster.getName()} riposte et inflige ${actualDamage} dégâts`);
            
            if (!this.player.isAlive) {
                this.onPlayerDeath();
                return;
            }
        }
    }

    /**
     * Régénération HP passive
     */
    updateHealthRegen(deltaTime) {
        if (!this.player.isAlive || this.player.hp >= this.player.getMaxHp()) return;
        
        const currentTime = Date.now();
        const timeSinceLastRegen = (currentTime - this.lastRegenTime) / 1000; // en secondes
        
        if (timeSinceLastRegen >= 1) { // Regen toutes les secondes
            const regenRate = this.isFighting ? 0.01 : 0.05; // 1% en combat, 5% hors combat
            const healAmount = Math.floor(this.player.getMaxHp() * regenRate);
            
            if (healAmount > 0) {
                this.player.heal(healAmount);
            }
            
            this.lastRegenTime = currentTime;
        }
    }

    /**
     * Gère la mort d'un monstre
     */
    onMonsterDeath() {
        if (!this.currentMonster) return;
        
        const monsterName = this.currentMonster.getName();
        const isBoss = this.currentMonster.getRarity() === 'boss';
        
        // Récompenses de base
        const xp = this.currentMonster.xpReward;
        const gold = this.currentMonster.goldReward;
        
        const levelUps = this.player.gainXp(xp);
        this.player.resources.gold += gold;
        
        // Message de victoire
        const victoryIcon = isBoss ? '👑' : '⚔️';
        this.addLog(`${victoryIcon} Victoire ! +${xp} XP, +${gold} or`);
        
        // ⭐ NOUVEAU : Calculer et appliquer les drops
        const drops = this.currentMonster.getDrops();
        if (drops && drops.length > 0 && window.DropsData) {
            const result = window.DropsData.applyDrops(window.game, drops);
            
            // Afficher les drops dans le log
            if (result.items && result.items.length > 0) {
                result.items.forEach(item => {
                    this.addLog(`📦 ${item.icon} ${item.name} x${item.quantity}`);
                });
            }
            
            // Or bonus depuis sac de bandit
            if (result.goldBonus > 0) {
                this.addLog(`💰 Bonus d'or : +${result.goldBonus}`);
            }
            
            // Notification UI pour drops importants
            if (window.game && window.game.ui) {
                const rareDrops = result.items.filter(item => 
                    item.rarity === 'rare' || item.rarity === 'elite' || item.rarity === 'legendary'
                );
                
                if (rareDrops.length > 0) {
                    rareDrops.forEach(drop => {
                        window.game.ui.showNotification(
                            `${drop.icon} ${drop.name} x${drop.quantity} obtenu !`,
                            'legendary',
                            5000
                        );
                    });
                }
                
                // Mettre à jour l'inventaire de combat dans la sidebar
                window.game.ui.updateCombatInventory();
            }
        }
        
        // Déclencher l'effet visuel de level up
        if (levelUps && levelUps.length > 0 && window.game && window.game.ui) {
            levelUps.forEach(levelUpData => {
                window.game.ui.showLevelUpEffect(levelUpData);
            });
        }
        
        // Compteur de monstres tués
        this.monstersKilled++;
        if (!isBoss) {
            this.bossKillsInRegion++; // Compte vers le spawn du boss
        }
        
        // 🎯 Si on a tué le BOSS de la région (Zone 10), débloquer la région suivante
        if (isBoss && this.currentZone === 10) {
            // Débloquer la région suivante
            this.unlockedRegions = Math.min(this.unlockedRegions + 1, 5); // Max 5 régions
            
            // Initialiser la première zone de la nouvelle région
            const nextRegion = this.currentRegion + 1;
            if (nextRegion <= 5) {
                this.unlockedZones[nextRegion] = 1;
                this.monstersKilledPerZone[`${nextRegion}_1`] = 0;
                
                this.addLog(`🎊 RÉGION ${nextRegion} DÉBLOQUÉE ! Vous pouvez maintenant y accéder.`);
            }
        }
        
        // Compteur par zone (pour déblocage)
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        this.monstersKilledPerZone[zoneKey] = (this.monstersKilledPerZone[zoneKey] || 0) + 1;
        
        // Mettre à jour les quêtes de type 'kill'
        if (window.game && window.game.questManager) {
            const questCompleted = window.game.questManager.updateKillQuest(monsterName, this.currentZone);
        }
        
        // Vérifier si on débloque la zone suivante
        if (this.monstersKilledPerZone[zoneKey] >= GameConfig.ZONES.MONSTERS_TO_UNLOCK) {
            const maxZoneInRegion = this.unlockedZones[this.currentRegion] || 1;
            
            if (this.currentZone < 10 && this.currentZone === maxZoneInRegion) {
                // Débloquer la zone suivante dans cette région
                this.unlockedZones[this.currentRegion] = this.currentZone + 1;
                this.currentZone++;
                
                // Initialiser le compteur pour la nouvelle zone
                const newZoneKey = `${this.currentRegion}_${this.currentZone}`;
                if (!this.monstersKilledPerZone[newZoneKey]) {
                    this.monstersKilledPerZone[newZoneKey] = 0;
                }
                
                const zoneData = this.getCurrentZoneData();
                this.addLog(`🎉 ${zoneData.name} débloquée ! Vous y entrez automatiquement.`);
                
                // Spawn dans la nouvelle zone
                setTimeout(() => {
                    if (this.player.isAlive) {
                        this.spawnMonster();
                    }
                }, 500);
                return; // On ne spawn pas deux fois
            }
        }
        
        // Spawn un nouveau monstre après un court délai
        setTimeout(() => {
            if (this.player.isAlive) {
                this.spawnMonster();
            }
        }, 500);
    }

    /**
     * Gère la mort du joueur
     */
    onPlayerDeath() {
        this.isFighting = false;
        
        this.addLog('💀 Vous êtes mort !');
        
        // Pénalité : retour à la zone précédente (ou zone 1 si déjà en zone 1)
        if (this.currentZone > 1) {
            this.currentZone--;
            this.addLog(`⬅️ Retour à la zone ${this.currentZone}`);
        } else {
            this.addLog('💔 Vous restez en zone 1');
        }
        
        // Restaurer le compteur de la zone actuelle
        this.monstersKilled = this.monstersKilledPerZone[this.currentZone];
        
        // Réanimation après 3 secondes
        setTimeout(() => {
            this.player.revive();
            this.spawnMonster();
            this.isActive = true;
            if (this.autoCombatEnabled) {
                this.isFighting = true;
            }
            this.addLog('✨ Vous êtes réanimé avec tous vos PV !');
        }, 3000);
    }

    /**
     * Toggle le combat automatique
     */
    toggleAutoCombat() {
        this.autoCombatEnabled = !this.autoCombatEnabled;
        this.isFighting = this.autoCombatEnabled;
        
        if (this.autoCombatEnabled) {
            this.addLog('⚔️ Combat automatique activé');
        } else {
            this.addLog('⏸️ Combat automatique désactivé');
        }
        
        return this.autoCombatEnabled;
    }

    /**
     * Démarre le combat automatique
     */
    startAutoCombat() {
        this.autoCombatEnabled = true;
        this.isActive = true;
        this.isFighting = true;
        this.addLog('⚔️ Combat automatique activé');
    }

    /**
     * Arrête le combat automatique
     */
    stopAutoCombat() {
        this.autoCombatEnabled = false;
        this.isFighting = false;
        this.addLog('⏸️ Combat automatique désactivé');
    }

    /**
     * Vérifie si une zone est débloquée
     */
    isZoneUnlocked(regionId, zoneNumber) {
        const maxUnlocked = this.unlockedZones[regionId] || 0;
        return zoneNumber <= maxUnlocked;
    }

    /**
     * Change de zone manuellement (avec flèches)
     */
    changeZone(direction) {
        const newZone = direction === 'next' ? this.currentZone + 1 : this.currentZone - 1;
        
        // 🌍 Si on dépasse la Zone 10, passer à la région suivante
        if (direction === 'next' && newZone > 10) {
            // Vérifier si la région suivante est débloquée
            if (this.currentRegion < this.unlockedRegions) {
                this.currentRegion++;
                this.currentZone = 1;
                this.bossKillsInRegion = 0; // Reset le compteur de boss
                
                // Initialiser la zone si nécessaire
                const zoneKey = `${this.currentRegion}_1`;
                if (!this.monstersKilledPerZone[zoneKey]) {
                    this.monstersKilledPerZone[zoneKey] = 0;
                }
                
                const regionData = this.getCurrentRegionData();
                const zoneData = this.getCurrentZoneData();
                this.spawnMonster();
                this.addLog(`🌍 Vous entrez dans ${regionData.name} !`);
                this.addLog(`➡️ Zone : ${zoneData.name}`);
                return true;
            } else {
                this.addLog('🚫 Battez le boss pour débloquer la région suivante !');
                return false;
            }
        }
        
        // 🌍 Si on recule depuis la Zone 1, revenir à la région précédente
        if (direction === 'prev' && newZone < 1) {
            if (this.currentRegion > 1) {
                this.currentRegion--;
                this.currentZone = 10;
                
                const zoneKey = `${this.currentRegion}_10`;
                if (!this.monstersKilledPerZone[zoneKey]) {
                    this.monstersKilledPerZone[zoneKey] = 0;
                }
                
                const regionData = this.getCurrentRegionData();
                const zoneData = this.getCurrentZoneData();
                this.spawnMonster();
                this.addLog(`🌍 Retour en ${regionData.name}`);
                this.addLog(`⬅️ Zone : ${zoneData.name}`);
                return true;
            } else {
                this.addLog('🚫 Déjà en Région 1, Zone 1');
                return false;
            }
        }
        
        // Vérifications normales pour zones dans la même région
        if (newZone < 1 || newZone > 10) {
            this.addLog(direction === 'next' ? '🚫 Pas de zone suivante' : '🚫 Déjà en zone 1');
            return false;
        }
        
        if (direction === 'next' && !this.isZoneUnlocked(this.currentRegion, newZone)) {
            this.addLog(`🔒 Tuez ${GameConfig.ZONES.MONSTERS_TO_UNLOCK} monstres pour débloquer la zone ${newZone}`);
            return false;
        }
        
        // Changement de zone
        this.currentZone = newZone;
        
        // Initialiser le compteur si nécessaire
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        if (!this.monstersKilledPerZone[zoneKey]) {
            this.monstersKilledPerZone[zoneKey] = 0;
        }
        
        const zoneData = this.getCurrentZoneData();
        this.spawnMonster();
        this.addLog(`➡️ Vous entrez dans ${zoneData.name}`);
        
        return true;
    }

    /**
     * Ajoute une entrée au journal de combat
     */
    addLog(message) {
        Utils.addToLog(this.combatLog, message, GameConfig.UI.MAX_COMBAT_LOG_ENTRIES);
    }

    /**
     * Obtient la progression dans la zone actuelle (0-100%)
     */
    getZoneProgress() {
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        const killed = this.monstersKilledPerZone[zoneKey] || 0;
        return Utils.percentage(killed, GameConfig.ZONES.MONSTERS_TO_UNLOCK);
    }

    /**
     * Exporte les données du combat pour la sauvegarde
     */
    toJSON() {
        return {
            currentRegion: this.currentRegion,
            currentZone: this.currentZone,
            monstersKilled: this.monstersKilled,
            bossKillsInRegion: this.bossKillsInRegion,
            unlockedRegions: this.unlockedRegions,
            unlockedZones: this.unlockedZones,
            monstersKilledPerZone: this.monstersKilledPerZone,
            currentMonster: this.currentMonster ? this.currentMonster.toJSON() : null,
            isActive: this.isActive,
            isFighting: this.isFighting,
            autoCombatEnabled: this.autoCombatEnabled
        };
    }

    /**
     * Importe les données du combat depuis une sauvegarde
     */
    fromJSON(data) {
        this.currentRegion = data.currentRegion || 1;
        this.currentZone = data.currentZone || 1;
        this.monstersKilled = data.monstersKilled || 0;
        this.bossKillsInRegion = data.bossKillsInRegion || 0;
        this.unlockedRegions = data.unlockedRegions || 1;
        this.unlockedZones = data.unlockedZones || { 1: 1 };
        this.monstersKilledPerZone = data.monstersKilledPerZone || { '1_1': 0 };
        this.isActive = data.isActive !== undefined ? data.isActive : true;
        this.isFighting = data.isFighting || false;
        this.autoCombatEnabled = data.autoCombatEnabled || false;
        
        if (data.currentMonster) {
            this.currentMonster = Monster.fromJSON(data.currentMonster);
        } else {
            this.spawnMonster();
        }
        
        // Réinitialiser le timer de regen
        this.lastRegenTime = Date.now();
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Combat = Combat;
}
