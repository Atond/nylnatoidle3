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

    // Suivi du combo de victoires d'affilée par zone
    this.comboWinStreakPerZone = {}; // { 'region_zone': streak }
        
        // Compteurs de kills par zone (pour déblocage)
        this.monstersKilledPerZone = {};
        this.monstersKilledPerZone['1_1'] = 0; // Format: "regionId_zoneId"
        
        // Compteur d'or gagné par zone
        this.goldEarnedPerZone = {};
        this.goldEarnedPerZone['1_1'] = 0; // Format: "regionId_zoneId"
        
        // Tracker des boss vaincus par zone
        this.bossDefeatedPerZone = {}; // { 'region_zone': true/false }
        
        // 🛡️ FIX EXPLOIT : Cache des monstres par zone pour éviter le re-roll
        // Format: { "regionId_zoneId": Monster }
        this.monstersByZone = {};
        
        // État du combat
        this.isActive = true;
        this.isFighting = false;
        this.autoCombatEnabled = false;
        
        // Journal de combat
        this.combatLog = [];
        
        // 🎯 SYSTÈME DE COMBO pour clics manuels
        this.comboCount = 0;
        this.comboTimer = null;
        this.COMBO_TIMEOUT = 3000; // 3 secondes pour maintenir le combo
        this.MAX_COMBO = 10; // Combo maximum (x3.0 de bonus)
        
        // Timer pour régénération HP
        this.lastRegenTime = Date.now();
        
        // 🛡️ FIX: Race condition - empêche le spawn multiple de monstres
        this.isSpawning = false;
        
        // Spawn le premier monstre
        this.spawnMonster();
    }

    /**
     * Obtient la zone actuelle depuis RegionsData
     */
    getCurrentZoneData() {
        if (!window.RegionsData) {
            console.error('RegionsData non défini sur window');
            return undefined;
        }
        const region = window.RegionsData.getRegion(this.currentRegion);
        if (!region) {
            console.error(`Région ${this.currentRegion} introuvable dans RegionsData`);
            return undefined;
        }
        const zone = region.zones.find(z => z.id === this.currentZone);
        if (!zone) {
            console.error(`Zone ${this.currentZone} introuvable dans la région ${this.currentRegion}`);
            return undefined;
        }
        return zone;
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
        // 🛡️ FIX: Empêcher spawn multiple (race condition)
        if (this.isSpawning) {
            console.warn('⚠️ Spawn déjà en cours, ignoré pour éviter duplication');
            return;
        }
        
        this.isSpawning = true;
        
        const zoneData = this.getCurrentZoneData();
        
        if (!zoneData) {
            console.error(`Zone ${this.currentRegion}_${this.currentZone} introuvable`);
            this.isSpawning = false;
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
                // 🔒 VÉRIFIER SI LE BOSS PEUT RESPAWN
                const now = Date.now();
                const bossData = window.MonstersData.boss[regionData.boss.id];
                
                if (bossData && bossData.lastKilledTime) {
                    const timeSinceKill = now - bossData.lastKilledTime;
                    
                    if (timeSinceKill < bossData.respawnTime) {
                        // Boss en cooldown
                        const remainingMinutes = Math.ceil((bossData.respawnTime - timeSinceKill) / 60000);
                        this.addLog(`⏰ ${bossData.name} est en respawn (${remainingMinutes} min restantes)`);
                        
                        if (window.game && window.game.ui) {
                            window.game.ui.showNotification(
                                `⏰ Boss indisponible ! Respawn dans ${remainingMinutes} minutes`,
                                'warning',
                                5000
                            );
                        }
                        
                        // Spawn un monstre normal à la place
                        const allMonsters = Array.isArray(zoneData.monsters) ? zoneData.monsters : [];
                        if (allMonsters.length === 0) {
                            this.addLog(`Aucun monstre dans la zone ${this.currentZone}`);
                            this.isSpawning = false;
                            return;
                        }
                        const randomMonster = allMonsters[Math.floor(Math.random() * allMonsters.length)];
                        const monsterLevel = zoneData.levelRange.min + Math.floor((zoneData.levelRange.max - zoneData.levelRange.min) / 2);
                        this.currentMonster = new Monster(randomMonster.id, monsterLevel);
                        this.addLog(`${this.currentMonster.getName()} apparaît à la place`);
                        this.isSpawning = false;
                        return;
                    }
                }
                
                // Boss disponible - spawn normal
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
                
                // 🛡️ FIX: Débloquer le flag après spawn du boss
                this.isSpawning = false;
                return;
            }
            
            // 📊 Indicateur visuel : si on est à 8 kills, prévenir le joueur
            if (killsInThisZone === 8) {
                this.addLog(`⚔️ ATTENTION : Le boss apparaîtra au prochain monstre ! (9/9)`);
            }
        }
        
        // Sinon, spawn un monstre normal de la zone
        const allMonsters = Array.isArray(zoneData.monsters) ? zoneData.monsters : [];
        if (allMonsters.length === 0) {
            console.error(`Aucun monstre dans la zone ${this.currentZone}`);
            this.isSpawning = false; // 🛡️ FIX: Débloquer le flag en cas d'erreur
            return;
        }
        const randomMonster = allMonsters[Math.floor(Math.random() * allMonsters.length)];
        if (!randomMonster) {
            console.error(`Impossible de spawn un monstre`);
            this.isSpawning = false; // 🛡️ FIX: Débloquer le flag en cas d'erreur
            return;
        }
        // Créer le monstre avec le niveau de la zone
        const monsterLevel = zoneData.levelRange.min + Math.floor((zoneData.levelRange.max - zoneData.levelRange.min) / 2);
        this.currentMonster = new Monster(randomMonster.id, monsterLevel);
        // Message selon la rareté (si tu veux ajouter une propriété 'rarity' sur le monstre plus tard)
        this.addLog(`${this.currentMonster.getName()} apparaît !`);
        // 🛡️ FIX: Débloquer le flag après spawn complet
        this.isSpawning = false;
    }

    /**
     * Attaque manuelle du joueur (clic)
     * � SYSTÈME COMBO : Dégâts réduits de base mais combo augmente les dégâts
     */
    manualAttack() {
        if (!this.currentMonster || !this.currentMonster.isAlive) {
            return false;
        }
        
        if (!this.player.isAlive) {
            return false;
        }
        
        // 🎯 INCRÉMENTER LE COMBO
        this.comboCount = Math.min(this.comboCount + 1, this.MAX_COMBO);
        
        // ⏱️ Réinitialiser le timer de combo
        if (this.comboTimer) {
            clearTimeout(this.comboTimer);
        }
        this.comboTimer = setTimeout(() => {
            this.comboCount = 0;
            this.addLog(`💔 Combo perdu !`);
        }, this.COMBO_TIMEOUT);
        
        // 📊 CALCUL DU MULTIPLICATEUR DE COMBO
        // Combo 1-3: x0.6 à x1.0 (rattrapage de base)
        // Combo 4-7: x1.1 à x1.7 (dépasse l'auto)
        // Combo 8-10: x1.8 à x2.0 (récompense skill)
        const comboMultiplier = 0.6 + (this.comboCount - 1) * 0.2; // 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4
        
        // Le joueur attaque avec le multiplicateur de combo
        const attackResult = this.player.attack(this.currentMonster);
        const comboDamage = Math.ceil(attackResult.damage * comboMultiplier);
        const actualDamage = this.currentMonster.takeDamage(comboDamage);
        
        // Message avec combo et critique
        let message = '';
        if (this.comboCount > 1) {
            message += `🔥 COMBO x${this.comboCount}! `;
        }
        if (attackResult.isCritical) {
            message += `💥 CRITIQUE! `;
        }
        message += `Vous infligez ${actualDamage} dégâts`;
        if (comboMultiplier >= 1.0) {
            message += ` (×${comboMultiplier.toFixed(1)})`;
        }
        this.addLog(message);
        
        // Vérifier si le monstre est mort
        if (!this.currentMonster.isAlive) {
            this.onMonsterDeath();
            return true;
        }
        
        // ⚔️ LE MONSTRE RIPOSTE SEULEMENT S'IL PEUT ATTAQUER (cooldown respecté)
        const currentTime = Date.now();
        if (this.currentMonster && this.currentMonster.isAlive) {
            // Vérifier si le monstre est prêt à attaquer
            if (this.currentMonster.canAttack(currentTime)) {
                const monsterDamage = this.currentMonster.attack();
                const damageResult = this.player.takeDamage(monsterDamage);
                
                // Message selon le résultat
                if (damageResult.blocked) {
                    this.addLog(`🛡️ BLOQUÉ! Vous bloquez l'attaque du ${this.currentMonster.getName()}`);
                } else if (damageResult.evaded) {
                    this.addLog(`💨 ESQUIVÉ! Vous esquivez l'attaque du ${this.currentMonster.getName()}`);
                } else {
                    this.addLog(`${this.currentMonster.getName()} riposte et inflige ${damageResult.damage} dégâts`);
                }
                
                // Vérifier si le joueur est mort
                if (!this.player.isAlive) {
                    this.onPlayerDeath();
                    return true;
                }
            }
            // Sinon le monstre ne peut pas riposter (cooldown en cours)
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
            const attackResult = this.player.attack(this.currentMonster);
            const actualDamage = this.currentMonster.takeDamage(attackResult.damage);
            
            // Message avec critique
            if (attackResult.isCritical) {
                this.addLog(`💥 CRITIQUE! ${actualDamage} dégâts`);
            } else {
                this.addLog(`Vous infligez ${actualDamage} dégâts`);
            }
            
            if (!this.currentMonster.isAlive) {
                this.onMonsterDeath();
                return;
            }
        }
        
        // Le monstre attaque automatiquement (auto-combat ON)
        if (this.currentMonster && this.currentMonster.isAlive && this.currentMonster.canAttack(currentTime)) {
            const damage = this.currentMonster.attack();
            const damageResult = this.player.takeDamage(damage);
            
            // Message selon le résultat
            if (damageResult.blocked) {
                this.addLog(`🛡️ BLOQUÉ!`);
            } else if (damageResult.evaded) {
                this.addLog(`💨 ESQUIVÉ!`);
            } else {
                this.addLog(`${this.currentMonster.getName()} riposte et inflige ${damageResult.damage} dégâts`);
            }
            
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
        if (!this.player.isAlive || this.player.stats.hp >= this.player.getMaxHp()) return;
        
        const currentTime = Date.now();
        const timeSinceLastRegen = (currentTime - this.lastRegenTime) / 1000; // en secondes
        
        if (timeSinceLastRegen >= 1) { // Regen toutes les secondes
            const regenRate = this.isFighting ? 0.02 : 0.10; // 2% en combat, 10% hors combat (doublé!)
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
        
        // Tracker l'or gagné par zone
        const currentZoneKey = `${this.currentRegion}_${this.currentZone}`;
        if (!this.goldEarnedPerZone[currentZoneKey]) {
            this.goldEarnedPerZone[currentZoneKey] = 0;
        }
        this.goldEarnedPerZone[currentZoneKey] += gold;
        
        // 💪 CARRY MODE : Alt gagne aussi de l'XP
        if (window.game && window.game.altCharacterManager) {
            const carryState = window.game.altCharacterManager.getCarryState();
            if (carryState.isActive) {
                const alt = window.game.altCharacterManager.getCharacter(carryState.altId);
                if (alt) {
                    // Alt gagne 75% de l'XP
                    const altXP = Math.floor(xp * 0.75);
                    alt.gainXP(altXP);
                    this.addLog(`💪 ${alt.name} (Carry) : +${altXP} XP`);
                    
                    // Notifier quête si level up
                    if (window.game.questManager) {
                        window.game.questManager.updateCreateAltQuest(carryState.altId);
                    }
                }
            }
        }
        
        // Message de victoire
        const victoryIcon = isBoss ? '👑' : '⚔️';
        this.addLog(`${victoryIcon} Victoire ! +${xp} XP, +${gold} or`);
        
        // 🔒 SYSTÈME ANTI-FARMING BOSS
        if (isBoss && this.currentMonster.id) {
            const now = Date.now();
            const bossData = window.MonstersData.boss[this.currentMonster.id];
            
            if (bossData) {
                // Reset quotidien (minuit)
                const today = new Date().toDateString();
                if (bossData.lastResetDate !== today) {
                    bossData.legendaryDropsToday = 0;
                    bossData.lastResetDate = today;
                }
                
                // Vérifier le respawn timer
                if (bossData.lastKilledTime && (now - bossData.lastKilledTime) < bossData.respawnTime) {
                    const remainingTime = Math.ceil((bossData.respawnTime - (now - bossData.lastKilledTime)) / 60000);
                    this.addLog(`⏰ ${this.currentMonster.name} respawn dans ${remainingTime} min`);
                    
                    if (window.game && window.game.ui) {
                        window.game.ui.showNotification(
                            `⏰ Boss en respawn ! Attendez ${remainingTime} minutes`,
                            'warning',
                            5000
                        );
                    }
                }
                
                // Mettre à jour le timestamp du kill
                bossData.lastKilledTime = now;
            }
        }
        
        // ⭐ NOUVEAU : Calculer et appliquer les drops
        const drops = this.currentMonster.getDrops();
        if (drops && drops.length > 0 && window.DropsData) {
            // 🛡️ FIX: Les drops sont déjà des objets {id, name, icon, quantity, rarity}
            // Validation des drops (vérifier qu'ils ont bien un id et une quantity)
            const validDrops = drops.filter(drop => {
                if (!drop || typeof drop !== 'object' || !drop.id || !drop.quantity) {
                    console.error(`⚠️ Drop invalide détecté:`, drop, `- Ignoré`);
                    return false;
                }
                return true;
            });
            
            if (validDrops.length === 0) {
                console.warn(`⚠️ Aucun drop valide pour ${monsterName}`);
            }
            
            const result = window.DropsData.applyDrops(window.game, validDrops);
            
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

        // Suivi du combo de victoires d'affilée par zone
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        if (!this.comboWinStreakPerZone[zoneKey]) this.comboWinStreakPerZone[zoneKey] = 0;
        if (this.player.isAlive && !isBoss) {
            this.comboWinStreakPerZone[zoneKey]++;
        } else {
            this.comboWinStreakPerZone[zoneKey] = 0;
        }

        // 🛡️ FIX EXPLOIT : Supprimer le monstre du cache quand il meurt
        delete this.monstersByZone[zoneKey];
        
        // 🎯 Mise à jour des quêtes
        if (window.game && window.game.questManager) {
            // Quêtes de type 'kill'
            window.game.questManager.updateKillQuest(monsterName, this.currentZone);
            
            // Quêtes de type 'boss_kill'
            if (isBoss && this.currentMonster.id) {
                window.game.questManager.updateBossKillQuest(this.currentMonster.id);
            }
            
            // Quêtes de type 'collect_drops' (compte chaque item droppé)
            if (drops && drops.length > 0) {
                drops.forEach(() => {
                    window.game.questManager.updateCollectDropsQuest(1);
                });
            }
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
        this.monstersKilledPerZone[zoneKey] = (this.monstersKilledPerZone[zoneKey] || 0) + 1;
        
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
                
                // 🛡️ FIX: Utiliser le flag pour éviter race condition
                setTimeout(() => {
                    if (this.player.isAlive && !this.isSpawning) {
                        this.spawnMonster();
                    }
                }, 500);
                return; // On ne spawn pas deux fois
            }
        }
        
        // 🛡️ FIX: Utiliser le flag pour éviter race condition
        setTimeout(() => {
            if (this.player.isAlive && !this.isSpawning) {
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
        
        // 💡 Conseils pour le joueur
        const playerLevel = this.player.level;
        const tips = [];
        
        // Vérifier si le joueur a de l'équipement
        const hasWeapon = this.player.equipment.weapon !== null;
        const hasArmor = this.player.equipment.chest !== null || this.player.equipment.helmet !== null;
        
        if (!hasWeapon && playerLevel < 5) {
            tips.push('🗡️ Craftez une arme pour augmenter vos dégâts !');
        }
        if (!hasArmor && playerLevel < 5) {
            tips.push('🛡️ Craftez une armure pour augmenter votre défense !');
        }
        if (playerLevel < 10) {
            tips.push('⬆️ Retournez combattre dans une zone précédente pour gagner de l\'expérience et monter de niveau.');
        }
        if (tips.length === 0) {
            tips.push('💪 Améliorez votre équipement ou montez de niveau avant de revenir !');
        }
        
        // Afficher les conseils dans le log et en notification
        tips.forEach(tip => this.addLog(tip));
        
        if (window.game && window.game.ui) {
            window.game.ui.showNotification(
                `💀 Défaite ! ${tips[0]}`,
                'error',
                5000
            );
        }
        
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
        // 🔓 Vérifier si l'auto-combat est débloqué
        if (!window.game || !window.game.unlocks || !window.game.unlocks.auto_combat) {
            this.addLog('⚠️ Auto-combat non débloqué ! Complétez les quêtes.');
            if (window.game && window.game.ui) {
                window.game.ui.showNotification('Auto-combat non débloqué. Complétez les quêtes !', 'warning');
            }
            return false;
        }
        
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
        // 🔓 Vérifier si l'auto-combat est débloqué
        if (!window.game || !window.game.unlocks || !window.game.unlocks.auto_combat) {
            this.addLog('⚠️ Auto-combat non débloqué !');
            return false;
        }
        
        this.autoCombatEnabled = true;
        this.isActive = true;
        this.isFighting = true;
        this.addLog('⚔️ Combat automatique activé');
        return true;
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
     * 🛡️ FIX EXPLOIT : Ne plus re-roll le monstre si on revient sur une zone déjà visitée
     */
    changeZone(direction) {
        const newZone = direction === 'next' ? this.currentZone + 1 : this.currentZone - 1;
        
        // 🌍 Si on dépasse la Zone 10, passer à la région suivante
        if (direction === 'next' && newZone > 10) {
            // Vérifier si la région suivante est débloquée
            if (this.currentRegion < this.unlockedRegions) {
                // 💾 Sauvegarder le monstre actuel avant de changer de zone
                const currentZoneKey = `${this.currentRegion}_${this.currentZone}`;
                if (this.currentMonster) {
                    this.monstersByZone[currentZoneKey] = this.currentMonster;
                }
                
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
                
                // 🔄 Restaurer ou spawner nouveau monstre
                this.restoreOrSpawnMonster();
                
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
                // 💾 Sauvegarder le monstre actuel avant de changer de zone
                const currentZoneKey = `${this.currentRegion}_${this.currentZone}`;
                if (this.currentMonster) {
                    this.monstersByZone[currentZoneKey] = this.currentMonster;
                }
                
                this.currentRegion--;
                this.currentZone = 10;
                
                const zoneKey = `${this.currentRegion}_10`;
                if (!this.monstersKilledPerZone[zoneKey]) {
                    this.monstersKilledPerZone[zoneKey] = 0;
                }
                
                const regionData = this.getCurrentRegionData();
                const zoneData = this.getCurrentZoneData();
                
                // 🔄 Restaurer ou spawner nouveau monstre
                this.restoreOrSpawnMonster();
                
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
        
        // 💾 Sauvegarder le monstre actuel avant de changer de zone
        const currentZoneKey = `${this.currentRegion}_${this.currentZone}`;
        if (this.currentMonster) {
            this.monstersByZone[currentZoneKey] = this.currentMonster;
        }
        
        // Changement de zone
        this.currentZone = newZone;
        
        // Initialiser le compteur si nécessaire
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        if (!this.monstersKilledPerZone[zoneKey]) {
            this.monstersKilledPerZone[zoneKey] = 0;
        }
        
        const zoneData = this.getCurrentZoneData();
        
        // 🔄 Restaurer ou spawner nouveau monstre
        this.restoreOrSpawnMonster();
        
        this.addLog(`➡️ Vous entrez dans ${zoneData.name}`);
        
        return true;
    }

    /**
     * 🛡️ FIX EXPLOIT : Restaure le monstre sauvegardé OU spawn un nouveau
     */
    restoreOrSpawnMonster() {
        const zoneKey = `${this.currentRegion}_${this.currentZone}`;
        const savedMonster = this.monstersByZone[zoneKey];
        
        if (savedMonster && savedMonster.isAlive) {
            // Restaurer le monstre existant AVEC PV AU MAXIMUM (pas d'exploit)
            savedMonster.currentHp = savedMonster.maxHp; // 🛡️ Réinitialiser les PV
            this.currentMonster = savedMonster;
            this.addLog(`🔄 ${this.currentMonster.getName()} vous attend toujours... (PV restaurés)`);
        } else {
            // Spawner un nouveau monstre
            this.spawnMonster();
        }
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
        // Sérialiser le cache de monstres
        const serializedMonstersByZone = {};
        for (const [key, monster] of Object.entries(this.monstersByZone)) {
            if (monster && monster.isAlive) {
                serializedMonstersByZone[key] = monster.toJSON();
            }
        }
        
        return {
            currentRegion: this.currentRegion,
            currentZone: this.currentZone,
            monstersKilled: this.monstersKilled,
            bossKillsInRegion: this.bossKillsInRegion,
            unlockedRegions: this.unlockedRegions,
            unlockedZones: this.unlockedZones,
            monstersKilledPerZone: this.monstersKilledPerZone,
            goldEarnedPerZone: this.goldEarnedPerZone,
            comboWinStreakPerZone: this.comboWinStreakPerZone,
            monstersByZone: serializedMonstersByZone, // 🛡️ Sauvegarder le cache
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
        this.goldEarnedPerZone = data.goldEarnedPerZone || { '1_1': 0 };
        this.comboWinStreakPerZone = data.comboWinStreakPerZone || {};
        this.isActive = data.isActive !== undefined ? data.isActive : true;
        this.isFighting = data.isFighting || false;
        this.autoCombatEnabled = data.autoCombatEnabled || false;
        
        // 🛡️ Restaurer le cache de monstres
        this.monstersByZone = {};
        if (data.monstersByZone) {
            for (const [key, monsterData] of Object.entries(data.monstersByZone)) {
                this.monstersByZone[key] = Monster.fromJSON(monsterData);
            }
        }
        
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
