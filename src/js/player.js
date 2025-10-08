/**
 * Classe Player - Gestion du joueur et de ses statistiques
 */

class Player {
    constructor() {
        // Personnalisation du personnage
        this.name = "Aventurier";
        this.gender = null; // male, female, neutral
        this.class = null; // warrior, archer, mage, priest
        this.isMainCharacter = true;
        
        // Niveau et progression
        this.level = GameConfig.PLAYER.STARTING_LEVEL;
        this.xp = 0;
        this.xpRequired = this.calculateXpRequired(this.level);
        
        // Statistiques de base
        this.stats = {
            hp: GameConfig.PLAYER.STARTING_HP,
            maxHp: GameConfig.PLAYER.STARTING_HP,
            force: GameConfig.PLAYER.STARTING_STATS.force,
            agility: GameConfig.PLAYER.STARTING_STATS.agility,
            intelligence: GameConfig.PLAYER.STARTING_STATS.intelligence,
            wisdom: GameConfig.PLAYER.STARTING_STATS.wisdom,
            endurance: GameConfig.PLAYER.STARTING_STATS.endurance
        };
        
        // Équipement (pour plus tard)
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null
        };
        
        // Ressources (pour les métiers)
        this.resources = {
            gold: 0,
            wood: {
                common: 0,
                oak: 0,
                pine: 0
            },
            ore: {
                stone: 0,
                iron: 0,
                copper: 0
            }
        };
        
        // Combat
        this.isAlive = true;
        this.lastAttackTime = 0;
    }

    /**
     * Initialise le personnage avec nom, genre et classe
     */
    initializeCharacter(name, gender, className) {
        this.name = name;
        this.gender = gender;
        this.class = className;
        
        // Appliquer les bonus de classe
        this.applyClassBonuses(className);
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`✨ Personnage créé : ${name} (${gender}, ${className})`);
        }
    }

    /**
     * Applique les bonus de stats selon la classe choisie
     */
    applyClassBonuses(className) {
        const classBonuses = {
            warrior: {
                hp: 20,
                force: 2
            },
            archer: {
                agility: 3,
                force: 1
            },
            mage: {
                intelligence: 3,
                wisdom: 1
            },
            priest: {
                wisdom: 3,
                hp: 10
            }
        };

        const bonus = classBonuses[className];
        if (!bonus) return;

        // Appliquer les bonus
        if (bonus.hp) {
            this.stats.maxHp += bonus.hp;
            this.stats.hp += bonus.hp;
        }
        if (bonus.force) this.stats.force += bonus.force;
        if (bonus.agility) this.stats.agility += bonus.agility;
        if (bonus.intelligence) this.stats.intelligence += bonus.intelligence;
        if (bonus.wisdom) this.stats.wisdom += bonus.wisdom;
        if (bonus.endurance) this.stats.endurance += bonus.endurance;

        if (GameConfig.DEBUG.enabled) {
            console.log(`💪 Bonus de classe ${className} appliqués :`, bonus);
        }
    }

    /**
     * Obtient l'icône du personnage selon son genre
     */
    getGenderIcon() {
        const icons = {
            male: '♂️',
            female: '♀️',
            neutral: '⚧'
        };
        return icons[this.gender] || '👤';
    }

    /**
     * Obtient l'icône de classe
     */
    getClassIcon() {
        const icons = {
            warrior: '🛡️',
            archer: '🏹',
            mage: '🔮',
            priest: '❤️'
        };
        return icons[this.class] || '⚔️';
    }

    /**
     * Calcule l'XP requise pour le niveau suivant
     * Formule : BASE_XP × (niveau ^ EXPONENT)
     */
    calculateXpRequired(level) {
        return Math.floor(
            GameConfig.PROGRESSION.BASE_XP * Math.pow(level, GameConfig.PROGRESSION.XP_EXPONENT)
        );
    }

    /**
     * Gagne de l'expérience
     */
    gainXp(amount) {
        this.xp += amount;
        
        // Level up si XP suffisante
        const levelUps = [];
        while (this.xp >= this.xpRequired) {
            const levelUpData = this.levelUp();
            levelUps.push(levelUpData);
        }
        
        // Retourner les level ups pour déclencher les effets visuels
        return levelUps;
    }

    /**
     * Monte d'un niveau
     */
    levelUp() {
        this.level++;
        this.xp -= this.xpRequired;
        this.xpRequired = this.calculateXpRequired(this.level);
        
        // Augmentation des stats
        const gains = GameConfig.PROGRESSION.STATS_PER_LEVEL;
        this.stats.maxHp += gains.hp;
        this.stats.hp = this.stats.maxHp; // Heal complet au level up
        this.stats.force += gains.force;
        this.stats.agility += gains.agility;
        this.stats.intelligence += gains.intelligence;
        this.stats.wisdom += gains.wisdom;
        this.stats.endurance += gains.endurance;
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`🎉 Level Up! Niveau ${this.level} atteint!`);
        }
        
        // Retourner les gains pour l'UI
        return {
            level: this.level,
            gains: {
                hp: gains.hp,
                force: gains.force,
                agility: gains.agility,
                intelligence: gains.intelligence,
                wisdom: gains.wisdom,
                endurance: gains.endurance
            }
        };
    }

    /**
     * Calcule les dégâts d'attaque du joueur
     */
    calculateDamage() {
        // Dégâts de base
        const baseDamage = GameConfig.COMBAT.BASE_CLICK_DAMAGE;
        const forceDamage = this.stats.force * GameConfig.COMBAT.DAMAGE_FORMULA.FORCE_MULTIPLIER;
        
        // Bonus d'équipement
        let equipmentBonus = 0;
        if (window.game && window.game.equipmentManager) {
            const equipStats = window.game.equipmentManager.calculateTotalStats();
            // Bonus de force de l'équipement
            equipmentBonus += equipStats.force * GameConfig.COMBAT.DAMAGE_FORMULA.FORCE_MULTIPLIER;
            // Bonus de dégâts directs
            equipmentBonus += equipStats.damage;
        }
        
        return Math.max(1, Math.floor(baseDamage + forceDamage + equipmentBonus));
    }

    /**
     * Calcule la vitesse d'attaque du joueur (en millisecondes)
     */
    calculateAttackSpeed() {
        // Vitesse de base réduite par l'agilité
        const baseSpeed = GameConfig.COMBAT.BASE_ATTACK_SPEED;
        const speedBonus = 1 + (this.stats.agility * GameConfig.COMBAT.AGILITY_SPEED_FACTOR);
        
        return Math.max(500, Math.floor(baseSpeed / speedBonus)); // Minimum 500ms
    }

    /**
     * Le joueur peut-il attaquer maintenant ?
     */
    canAttack(currentTime) {
        const attackSpeed = this.calculateAttackSpeed();
        return currentTime - this.lastAttackTime >= attackSpeed;
    }

    /**
     * Effectue une attaque
     */
    attack(target) {
        if (!this.isAlive || !target) return 0;
        
        const damage = this.calculateDamage();
        this.lastAttackTime = Date.now();
        
        return damage;
    }

    /**
     * Subit des dégâts
     */
    takeDamage(amount) {
        if (!this.isAlive) return;
        
        // Réduction des dégâts par la défense de l'équipement
        let finalDamage = amount;
        if (window.game && window.game.equipmentManager) {
            const equipStats = window.game.equipmentManager.calculateTotalStats();
            // La défense réduit les dégâts (1 défense = -1 dégât)
            finalDamage = Math.max(1, amount - equipStats.defense);
        }
        
        this.stats.hp -= finalDamage;
        
        if (this.stats.hp <= 0) {
            this.stats.hp = 0;
            this.isAlive = false;
            this.onDeath();
        }
        
        return finalDamage; // Retourne les dégâts réels subis
    }

    /**
     * Gère la mort du joueur
     */
    onDeath() {
        if (GameConfig.DEBUG.enabled) {
            console.log('💀 Le joueur est mort!');
        }
    }

    /**
     * Réanime le joueur
     */
    revive() {
        this.isAlive = true;
        this.stats.hp = this.stats.maxHp;
    }

    /**
     * Obtient les HP maximum (avec bonus d'équipement)
     */
    getMaxHp() {
        let maxHp = this.stats.maxHp;
        
        // Bonus d'endurance de l'équipement
        if (window.game && window.game.equipmentManager) {
            const equipStats = window.game.equipmentManager.calculateTotalStats();
            // Chaque point d'endurance donne +5 HP
            maxHp += equipStats.endurance * 5;
        }
        
        return maxHp;
    }

    /**
     * Soigne le joueur
     */
    heal(amount) {
        if (!this.isAlive) return;
        const maxHp = this.getMaxHp(); // Utilise getMaxHp() pour prendre en compte l'équipement
        this.stats.hp = Math.min(maxHp, this.stats.hp + amount);
    }

    /**
     * Obtient le pourcentage de HP
     */
    getHpPercentage() {
        return Utils.percentage(this.stats.hp, this.getMaxHp());
    }

    /**
     * Obtient le pourcentage d'XP
     */
    getXpPercentage() {
        return Utils.percentage(this.xp, this.xpRequired);
    }

    /**
     * Exporte les données du joueur pour la sauvegarde
     */
    toJSON() {
        return {
            name: this.name,
            gender: this.gender,
            class: this.class,
            isMainCharacter: this.isMainCharacter,
            level: this.level,
            xp: this.xp,
            xpRequired: this.xpRequired,
            stats: this.stats,
            equipment: this.equipment,
            resources: this.resources,
            isAlive: this.isAlive
        };
    }

    /**
     * Importe les données du joueur depuis une sauvegarde
     */
    fromJSON(data) {
        // Données de personnalisation
        this.name = data.name || "Aventurier";
        this.gender = data.gender || null;
        this.class = data.class || null;
        this.isMainCharacter = data.isMainCharacter !== undefined ? data.isMainCharacter : true;
        
        // Progression
        this.level = data.level || 1;
        this.xp = data.xp || 0;
        this.xpRequired = data.xpRequired || this.calculateXpRequired(this.level);
        this.stats = data.stats || this.stats;
        this.equipment = data.equipment || this.equipment;
        this.resources = data.resources || this.resources;
        this.isAlive = data.isAlive !== undefined ? data.isAlive : true;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Player = Player;
}
