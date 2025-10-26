/**
 * 🏰 DUNGEON MANAGER - Gestion des donjons Trinity (Tank/Heal/DPS)
 * 
 * Système de donjons 3-player avec simulation de combat automatique,
 * vérification d'équipe, calcul de chances de victoire
 */

class DungeonManager {
    constructor(game) {
        this.game = game;
        this.dungeons = []; // Chargé depuis DungeonsData
        this.currentDungeon = null;
        this.currentTeam = null; // { tank, heal, dps }
        this.combatState = null;
        this.combatInterval = null;
    }
    
    /**
     * Initialiser les donjons
     */
    initialize() {
        if (typeof window.DungeonsData !== 'undefined') {
            this.dungeons = window.DungeonsData;
        }
    }
    
    /**
     * Obtenir un donjon par ID
     */
    getDungeon(dungeonId) {
        return this.dungeons.find(d => d.id === dungeonId);
    }
    
    /**
     * Obtenir les donjons disponibles selon le niveau
     */
    getAvailableDungeons(playerLevel) {
        return this.dungeons.filter(d => d.level <= playerLevel + 5);
    }
    
    /**
     * Vérifier si une équipe peut entrer dans un donjon
     */
    canEnterDungeon(dungeonId, team) {
        const dungeon = this.getDungeon(dungeonId);
        if (!dungeon) {
            return {
                success: false,
                message: `❌ Donjon non trouvé`
            };
        }
        
        // Vérifier nombre de joueurs
        if (!team || !team.tank || !team.heal || !team.dps) {
            return {
                success: false,
                message: `❌ Équipe incomplète ! Il faut 1 Tank, 1 Heal et 1 DPS`
            };
        }
        
        // Vérifier niveaux minimums
        const tankLevel = team.tank.level;
        const healLevel = team.heal.level;
        const dpsLevel = team.dps.level;
        const minLevel = dungeon.level - 5;
        
        if (tankLevel < minLevel || healLevel < minLevel || dpsLevel < minLevel) {
            return {
                success: false,
                message: `❌ Niveau trop faible ! Minimum requis : ${minLevel}`
            };
        }
        
        // Vérifier rôles Trinity
        if (team.tank.role !== 'tank') {
            return {
                success: false,
                message: `❌ ${team.tank.name} n'est pas un Tank`
            };
        }
        
        if (team.heal.role !== 'heal') {
            return {
                success: false,
                message: `❌ ${team.heal.name} n'est pas un Heal`
            };
        }
        
        if (team.dps.role !== 'dps') {
            return {
                success: false,
                message: `❌ ${team.dps.name} n'est pas un DPS`
            };
        }
        
        // Vérifier coût d'entrée
        const mainCharacter = this.game.altCharacterManager.mainCharacter;
        if (mainCharacter.gold < dungeon.entryCost) {
            return {
                success: false,
                message: `❌ Pas assez d'or ! Coût : ${dungeon.entryCost} or`
            };
        }
        
        return {
            success: true,
            message: `✅ Équipe prête à entrer dans ${dungeon.name}`
        };
    }
    
    /**
     * Vérifier la préparation de l'équipe (stats)
     */
    checkTeamReadiness(dungeonId, team) {
        const dungeon = this.getDungeon(dungeonId);
        if (!dungeon) return null;
        
        const warnings = [];
        const recommendations = [];
        
        // TANK : Vérifier survie
        const tankEHP = team.tank.effectiveHP || (team.tank.maxHp * (1 + team.tank.defense / 100));
        const requiredEHP = dungeon.boss.attack * 180; // Doit survivre 3min minimum
        const tankScore = tankEHP >= requiredEHP ? 5 : Math.max(1, Math.floor(tankEHP / requiredEHP * 5));
        
        if (tankEHP < requiredEHP) {
            warnings.push(`🔴 Tank : HP/DEF trop faibles`);
            recommendations.push(`Améliorer ${team.tank.name} : +${Math.round(requiredEHP - tankEHP)} EHP requis (craft armure Lvl ${dungeon.level})`);
        }
        
        // HEAL : Vérifier heal/sec
        const healPower = team.heal.healPerSec || ((team.heal.intelligence * 0.5) + (team.heal.wisdom * 0.3));
        const requiredHeal = dungeon.boss.attack * 0.7; // Doit heal 70% des dégâts minimum
        const healScore = healPower >= requiredHeal ? 5 : Math.max(1, Math.floor(healPower / requiredHeal * 5));
        
        if (healPower < requiredHeal) {
            warnings.push(`🔴 Heal : Intelligence/Sagesse trop faibles`);
            recommendations.push(`Améliorer ${team.heal.name} : +${Math.round(requiredHeal - healPower)} HPS requis (craft bâton/robe INT)`);
        }
        
        // DPS : Vérifier dégâts
        const dpsOutput = team.dps.effectiveDPS || (team.dps.attack * (1 + team.dps.strength / 100));
        const requiredDPS = dungeon.boss.hp / 240; // Doit tuer en 4min maximum
        const dpsScore = dpsOutput >= requiredDPS ? 5 : Math.max(1, Math.floor(dpsOutput / requiredDPS * 5));
        
        if (dpsOutput < requiredDPS) {
            warnings.push(`🔴 DPS : Attaque/Force trop faibles`);
            recommendations.push(`Améliorer ${team.dps.name} : +${Math.round(requiredDPS - dpsOutput)} DPS requis (craft épée/armure STR)`);
        }
        
        // Calculer chance de victoire
        const winChance = this.calculateWinChance(team, dungeon);
        
        return {
            isReady: warnings.length === 0,
            warnings: warnings,
            recommendations: recommendations,
            scores: {
                tank: tankScore,
                heal: healScore,
                dps: dpsScore
            },
            winChance: winChance,
            estimatedTime: dungeon.estimatedTime
        };
    }
    
    /**
     * Calculer la chance de victoire
     */
    calculateWinChance(team, dungeon) {
        // TANK : Temps de survie
        const tankEHP = team.tank.effectiveHP || (team.tank.maxHp * (1 + team.tank.defense / 100));
        const bossDPS = dungeon.boss.attack;
        
        // HEAL : Heal per second
        const healPerSec = team.heal.healPerSec || ((team.heal.intelligence * 0.5) + (team.heal.wisdom * 0.3));
        const netDamage = bossDPS - healPerSec; // Dégâts net sur Tank
        
        // DPS : Time to kill
        const dpsOutput = team.dps.effectiveDPS || (team.dps.attack * (1 + team.dps.strength / 100));
        const timeToKillBoss = dungeon.boss.hp / dpsOutput;
        
        // Temps de survie du tank
        let tankSurvivalTime;
        if (netDamage > 0) {
            // Heal insuffisant → Tank perd HP
            tankSurvivalTime = team.tank.maxHp / netDamage;
        } else {
            // Heal suffisant → Tank survit indéfiniment
            tankSurvivalTime = Infinity;
        }
        
        // Victoire si Tank survit jusqu'à mort boss
        const willWin = tankSurvivalTime >= timeToKillBoss;
        const winChance = Math.min(100, Math.max(0, (tankSurvivalTime / timeToKillBoss) * 100));
        
        return {
            willWin: willWin,
            chance: Math.round(winChance),
            timeToKill: timeToKillBoss,
            tankSurvival: tankSurvivalTime,
            netDamage: netDamage,
            healPower: healPerSec,
            bossDPS: bossDPS,
            playerDPS: dpsOutput
        };
    }
    
    /**
     * Entrer dans un donjon (lancer le combat)
     */
    enterDungeon(dungeonId, team) {
        const canEnter = this.canEnterDungeon(dungeonId, team);
        if (!canEnter.success) {
            return canEnter;
        }
        
        const dungeon = this.getDungeon(dungeonId);
        
        // Payer le coût d'entrée
        const mainCharacter = this.game.altCharacterManager.mainCharacter;
        mainCharacter.gold -= dungeon.entryCost;
        
        // Initialiser le combat
        this.currentDungeon = dungeon;
        this.currentTeam = team;
        
        this.combatState = {
            bossHp: dungeon.boss.hp,
            bossMaxHp: dungeon.boss.hp,
            tankHp: team.tank.currentHp || team.tank.maxHp,
            tankMaxHp: team.tank.maxHp,
            healHp: team.heal.currentHp || team.heal.maxHp,
            healMaxHp: team.heal.maxHp,
            healMana: 100,
            healMaxMana: 100,
            dpsHp: team.dps.currentHp || team.dps.maxHp,
            dpsMaxHp: team.dps.maxHp,
            elapsedTime: 0,
            combatLog: [],
            isVictory: false,
            isDefeat: false
        };
        
        // Démarrer le combat automatique
        this.startCombat();
        
        return {
            success: true,
            message: `⚔️ Combat démarré contre ${dungeon.boss.name} !`,
            dungeon: dungeon,
            combatState: this.combatState
        };
    }
    
    /**
     * Démarrer le combat automatique
     */
    startCombat() {
        // Combat update toutes les 1 seconde (accéléré pour idle game)
        this.combatInterval = setInterval(() => {
            this.updateCombat(1); // 1 seconde
        }, 1000);
    }
    
    /**
     * Update du combat
     */
    updateCombat(deltaTime) {
        if (!this.combatState || this.combatState.isVictory || this.combatState.isDefeat) {
            return;
        }
        
        const dungeon = this.currentDungeon;
        const team = this.currentTeam;
        
        this.combatState.elapsedTime += deltaTime;
        
        // Boss attaque le Tank
        const bossDPS = dungeon.boss.attack;
        const healPower = team.heal.healPerSec || ((team.heal.intelligence * 0.5) + (team.heal.wisdom * 0.3));
        
        // Dégâts sur Tank
        this.combatState.tankHp -= bossDPS * deltaTime;
        
        // Heal sur Tank
        this.combatState.tankHp += healPower * deltaTime;
        this.combatState.tankHp = Math.min(this.combatState.tankHp, this.combatState.tankMaxHp);
        
        // Mana du Heal (diminue lentement)
        this.combatState.healMana -= 0.5 * deltaTime;
        this.combatState.healMana = Math.max(0, this.combatState.healMana);
        
        // DPS attaque le Boss
        const dpsOutput = team.dps.effectiveDPS || (team.dps.attack * (1 + team.dps.strength / 100));
        this.combatState.bossHp -= dpsOutput * deltaTime;
        
        // Log toutes les 10 secondes
        if (Math.floor(this.combatState.elapsedTime) % 10 === 0 && this.combatState.combatLog.length < 100) {
            this.combatState.combatLog.push({
                time: this.combatState.elapsedTime,
                tankHp: Math.round(this.combatState.tankHp),
                bossHp: Math.round(this.combatState.bossHp),
                healMana: Math.round(this.combatState.healMana)
            });
        }
        
        // Vérifier victoire
        if (this.combatState.bossHp <= 0) {
            this.onVictory();
            return;
        }
        
        // Vérifier défaite
        if (this.combatState.tankHp <= 0) {
            this.onDefeat();
            return;
        }
    }
    
    /**
     * Victoire
     */
    onVictory() {
        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }
        
        this.combatState.isVictory = true;
        
        const dungeon = this.currentDungeon;
        const team = this.currentTeam;
        
        // Récompenses
        const rewards = this.generateRewards(dungeon);
        
        // XP pour toute l'équipe
        team.tank.gainXP(dungeon.rewards.xp);
        team.heal.gainXP(dungeon.rewards.xp);
        team.dps.gainXP(dungeon.rewards.xp);
        
        // Or au main
        const mainCharacter = this.game.altCharacterManager.mainCharacter;
        mainCharacter.gold += dungeon.rewards.gold;
        
        // Ressources au coffre partagé
        rewards.resources.forEach(r => {
            this.game.altCharacterManager.sharedStorage.addResource(r.id, r.amount);
        });
        
        // Équipement au coffre partagé
        rewards.equipment.forEach(eq => {
            this.game.altCharacterManager.sharedStorage.addEquipment(eq);
        });
        
        // Notification UI
        if (this.game.ui) {
            this.game.ui.showNotification(
                `🎉 Victoire contre ${dungeon.boss.name} ! +${dungeon.rewards.xp} XP, +${dungeon.rewards.gold} or`,
                'success'
            );
        }
        
        return {
            success: true,
            isVictory: true,
            duration: this.combatState.elapsedTime,
            rewards: rewards
        };
    }
    
    /**
     * Défaite
     */
    onDefeat() {
        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }
        
        this.combatState.isDefeat = true;
        
        const dungeon = this.currentDungeon;
        const team = this.currentTeam;
        
        // Calculer le problème
        const analysis = this.analyzeDefeat(team, dungeon);
        
        // Notification UI
        if (this.game.ui) {
            this.game.ui.showNotification(
                `💀 Défaite contre ${dungeon.boss.name}. ${analysis.mainProblem}`,
                'error'
            );
        }
        
        return {
            success: false,
            isDefeat: true,
            duration: this.combatState.elapsedTime,
            analysis: analysis
        };
    }
    
    /**
     * Analyser la défaite
     */
    analyzeDefeat(team, dungeon) {
        const healPower = team.heal.healPerSec || ((team.heal.intelligence * 0.5) + (team.heal.wisdom * 0.3));
        const bossDPS = dungeon.boss.attack;
        const netDamage = bossDPS - healPower;
        
        let mainProblem = '';
        const recommendations = [];
        
        if (netDamage > 20) {
            mainProblem = `Heal trop faible (${Math.round(healPower)} HPS < ${bossDPS} DPS Boss)`;
            recommendations.push(`Améliorer ${team.heal.name} : Craft Bâton/Robe Intelligence`);
        } else {
            mainProblem = `Tank pas assez résistant`;
            recommendations.push(`Améliorer ${team.tank.name} : Craft Armure Tank complète`);
        }
        
        return {
            mainProblem: mainProblem,
            recommendations: recommendations,
            netDamage: netDamage,
            tankDeathTime: this.combatState.elapsedTime
        };
    }
    
    /**
     * Générer les récompenses
     */
    generateRewards(dungeon) {
        const rewards = {
            xp: dungeon.rewards.xp,
            gold: dungeon.rewards.gold,
            resources: [],
            equipment: []
        };
        
        // Loot garanti
        dungeon.rewards.guaranteedLoot.forEach(loot => {
            const amount = Math.floor(Math.random() * (loot.max - loot.min + 1)) + loot.min;
            rewards.resources.push({
                id: loot.resourceId,
                amount: amount
            });
        });
        
        // Loot rare (chance)
        dungeon.rewards.rareLoot.forEach(item => {
            if (Math.random() < item.dropChance) {
                rewards.equipment.push({ ...item });
            }
        });
        
        return rewards;
    }
    
    /**
     * Obtenir l'état du combat actuel
     */
    getCombatState() {
        return this.combatState;
    }
    
    /**
     * Abandonner le donjon
     */
    abandonDungeon() {
        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }
        
        this.currentDungeon = null;
        this.currentTeam = null;
        this.combatState = null;
        
        return {
            success: true,
            message: `🏃 Vous avez fui le donjon`
        };
    }
    
    /**
     * Sauvegarder
     */
    save() {
        return {
            currentDungeon: this.currentDungeon ? this.currentDungeon.id : null,
            combatState: this.combatState
        };
    }
    
    /**
     * Charger
     */
    load(data) {
        if (!data) return;
        
        if (data.currentDungeon) {
            this.currentDungeon = this.getDungeon(data.currentDungeon);
        }
        
        if (data.combatState) {
            this.combatState = data.combatState;
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.DungeonManager = DungeonManager;
}
