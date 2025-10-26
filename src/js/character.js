/**
 * 🎭 CHARACTER CLASS - Représentation d'un personnage (Main ou Alt)
 * 
 * Gère les stats, équipement, niveau, rôle (Tank/Heal/DPS) pour le Main et les Alts
 */

class Character {
    constructor(options = {}) {
        this.id = options.id || this.generateId();
        this.name = options.name || 'Aventurier';
        this.gender = options.gender || 'male'; // male, female
        this.class = options.class || 'warrior'; // warrior, mage, archer, tank, healer
        
        // Flags
        this.isMain = options.isMain || false;
        this.isAlt = options.isAlt || false;
        
        // Stats de base
        this.level = options.level || 1;
        this.xp = options.xp || 0;
        this.xpNeeded = options.xpNeeded || 100;
        
        // Stats principales
        this.maxHp = options.maxHp || 100;
        this.currentHp = options.currentHp || this.maxHp;
        this.attack = options.attack || 10;
        this.defense = options.defense || 5;
        this.strength = options.strength || 10;
        this.intelligence = options.intelligence || 10;
        this.wisdom = options.wisdom || 10;
        this.endurance = options.endurance || 10;
        
        // Rôle Trinity (pour donjons)
        this.role = options.role || this.getDefaultRole(this.class);
        
        // Équipement
        this.equipment = options.equipment || {
            weapon: null,
            helmet: null,
            chest: null,
            legs: null,
            boots: null,
            accessory: null
        };
        
        // Power Leveling
        this.mainLevel = options.mainLevel || null; // Level du main (si alt)
        this.mentorBonus = options.mentorBonus || 1.0; // Multiplicateur XP
        this.lastCarryTime = options.lastCarryTime || 0;
        this.isAFKFarming = options.isAFKFarming || false;
        this.afkFarmStartTime = options.afkFarmStartTime || null;
        
        // Ressources personnelles
        this.gold = options.gold || 0;
        this.inventory = options.inventory || [];
        
        // Progression
        this.questsCompleted = options.questsCompleted || [];
        this.regionsUnlocked = options.regionsUnlocked || [1];
        this.professionsLevels = options.professionsLevels || {};
    }
    
    generateId() {
        return 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Détermine le rôle par défaut selon la classe
     */
    getDefaultRole(characterClass) {
        const roleMapping = {
            'warrior': 'dps',
            'tank': 'tank',
            'healer': 'heal',
            'mage': 'dps',
            'archer': 'dps'
        };
        return roleMapping[characterClass] || 'dps';
    }
    
    /**
     * Équiper un item
     */
    equip(item) {
        if (!item || !item.slot) return false;
        
        // Déséquiper l'ancien item
        const oldItem = this.equipment[item.slot];
        if (oldItem) {
            this.unequip(item.slot);
        }
        
        // Équiper le nouveau
        this.equipment[item.slot] = item;
        this.recalculateStats();
        
        return true;
    }
    
    /**
     * Déséquiper un slot
     */
    unequip(slot) {
        const item = this.equipment[slot];
        if (!item) return null;
        
        this.equipment[slot] = null;
        this.recalculateStats();
        
        return item;
    }
    
    /**
     * Recalculer les stats selon l'équipement
     */
    recalculateStats() {
        // Reset aux stats de base
        let baseStats = this.getBaseStats();
        
        this.maxHp = baseStats.hp;
        this.attack = baseStats.attack;
        this.defense = baseStats.defense;
        this.strength = baseStats.strength;
        this.intelligence = baseStats.intelligence;
        this.wisdom = baseStats.wisdom;
        this.endurance = baseStats.endurance;
        
        // Appliquer les bonus d'équipement
        Object.values(this.equipment).forEach(item => {
            if (!item || !item.stats) return;
            
            if (item.stats.hp) this.maxHp += item.stats.hp;
            if (item.stats.attack) this.attack += item.stats.attack;
            if (item.stats.defense) this.defense += item.stats.defense;
            if (item.stats.strength) this.strength += item.stats.strength;
            if (item.stats.intelligence) this.intelligence += item.stats.intelligence;
            if (item.stats.wisdom) this.wisdom += item.stats.wisdom;
            if (item.stats.endurance) this.endurance += item.stats.endurance;
        });
        
        // Recalculer stats dérivées
        this.updateDerivedStats();
    }
    
    /**
     * Obtenir les stats de base selon le niveau
     */
    getBaseStats() {
        const levelMultiplier = this.level;
        
        // Stats de base par classe
        const classStats = {
            'warrior': { hp: 100, attack: 12, defense: 8, strength: 15, intelligence: 5, wisdom: 5, endurance: 12 },
            'tank': { hp: 150, attack: 8, defense: 15, strength: 12, intelligence: 5, wisdom: 8, endurance: 20 },
            'healer': { hp: 80, attack: 5, defense: 5, strength: 5, intelligence: 20, wisdom: 18, endurance: 8 },
            'mage': { hp: 70, attack: 15, defense: 5, strength: 5, intelligence: 20, wisdom: 12, endurance: 5 },
            'archer': { hp: 90, attack: 14, defense: 6, strength: 12, intelligence: 8, wisdom: 8, endurance: 10 }
        };
        
        const base = classStats[this.class] || classStats['warrior'];
        
        return {
            hp: base.hp + (levelMultiplier * 10),
            attack: base.attack + (levelMultiplier * 2),
            defense: base.defense + (levelMultiplier * 1),
            strength: base.strength + (levelMultiplier * 1.5),
            intelligence: base.intelligence + (levelMultiplier * 1.5),
            wisdom: base.wisdom + (levelMultiplier * 1.5),
            endurance: base.endurance + (levelMultiplier * 1.5)
        };
    }
    
    /**
     * Calculer les stats dérivées (DPS, HPS, EHP)
     */
    updateDerivedStats() {
        // DPS effectif (pour donjons)
        this.effectiveDPS = this.attack * (1 + this.strength / 100);
        
        // Heal Per Second (pour heal)
        this.healPerSec = (this.intelligence * 0.5) + (this.wisdom * 0.3);
        
        // Effective HP (pour tank)
        this.effectiveHP = this.maxHp * (1 + this.defense / 100);
    }
    
    /**
     * Gagner de l'XP avec mentor bonus
     */
    gainXP(amount) {
        const actualXP = Math.floor(amount * this.mentorBonus);
        this.xp += actualXP;
        
        // Level up
        while (this.xp >= this.xpNeeded) {
            this.levelUp();
        }
        
        return actualXP;
    }
    
    /**
     * Level up
     */
    levelUp() {
        this.level++;
        this.xp -= this.xpNeeded;
        this.xpNeeded = Math.floor(this.xpNeeded * 1.5);
        
        this.recalculateStats();
        this.currentHp = this.maxHp; // Full heal on level up
        
        // Recalculer mentor bonus si alt
        if (this.isAlt && this.mainLevel) {
            this.mentorBonus = this.calculateMentorBonus(this.level, this.mainLevel);
        }
    }
    
    /**
     * Calculer le mentor bonus (pour alts)
     */
    calculateMentorBonus(altLevel, mainLevel) {
        const levelDiff = mainLevel - altLevel;
        
        if (levelDiff >= 10) return 1.50; // +50% XP
        if (levelDiff >= 5) return 1.25; // +25% XP
        return 1.0; // Pas de bonus
    }
    
    /**
     * Sauvegarder le personnage
     */
    save() {
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
            class: this.class,
            isMain: this.isMain,
            isAlt: this.isAlt,
            level: this.level,
            xp: this.xp,
            xpNeeded: this.xpNeeded,
            maxHp: this.maxHp,
            currentHp: this.currentHp,
            attack: this.attack,
            defense: this.defense,
            strength: this.strength,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            endurance: this.endurance,
            role: this.role,
            equipment: this.equipment,
            mainLevel: this.mainLevel,
            mentorBonus: this.mentorBonus,
            lastCarryTime: this.lastCarryTime,
            isAFKFarming: this.isAFKFarming,
            afkFarmStartTime: this.afkFarmStartTime,
            gold: this.gold,
            inventory: this.inventory,
            questsCompleted: this.questsCompleted,
            regionsUnlocked: this.regionsUnlocked,
            professionsLevels: this.professionsLevels
        };
    }
    
    /**
     * Charger un personnage depuis une sauvegarde
     */
    static load(data) {
        return new Character(data);
    }
}

// Export pour utilisation
if (typeof window !== 'undefined') {
    window.Character = Character;
}
