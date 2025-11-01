/**
 * Classe Player - Gestion du joueur et de ses statistiques
 */

class Player {
    constructor(equipmentManager = null, dragonManager = null) {
        // 🏗️ Injection de dépendances pour réduire le couplage
        this.equipmentManager = equipmentManager;
        this.dragonManager = dragonManager;
        
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
        
        // 🎯 Récupérer les gains selon la classe du joueur
        let gains;
        if (this.class && GameConfig.PROGRESSION.STATS_PER_LEVEL_BY_CLASS[this.class]) {
            // Gains spécifiques à la classe
            gains = GameConfig.PROGRESSION.STATS_PER_LEVEL_BY_CLASS[this.class];
        } else {
            // Gains par défaut si pas de classe définie
            gains = GameConfig.PROGRESSION.STATS_PER_LEVEL;
        }
        
        // Augmentation des stats
        this.stats.maxHp += gains.hp;
        this.stats.hp = this.stats.maxHp; // Heal complet au level up
        this.stats.force += gains.force;
        this.stats.agility += gains.agility;
        this.stats.intelligence += gains.intelligence;
        this.stats.wisdom += gains.wisdom;
        this.stats.endurance += gains.endurance;
        
        // 🎯 Mise à jour des quêtes de type 'level_up'
        if (window.game && window.game.questManager) {
            window.game.questManager.updateLevelUpQuest(this.level);
        }
        
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
     * Calcule les bonus du dragon équipé
     */
    calculateDragonBonus() {
        const dragonBonus = {
            force: 0,
            agility: 0,
            intelligence: 0,
            wisdom: 0,
            endurance: 0
        };
        
        if (this.dragonManager) {
            const equippedDragon = this.dragonManager.getEquippedDragon();
            if (equippedDragon && equippedDragon.isAlive) {
                const dragonStats = equippedDragon.getTotalStats();
                Object.keys(dragonStats).forEach(stat => {
                    if (dragonBonus.hasOwnProperty(stat)) {
                        dragonBonus[stat] = dragonStats[stat] || 0;
                    }
                });
            }
        }
        
        return dragonBonus;
    }

    /**
     * Met à jour les statistiques après changement d'équipement/dragon
     */
    updateEquipmentStats() {
        // Cette méthode sera appelée quand l'équipement ou le dragon change
        // Pour le moment, elle ne fait rien mais est appelée par les managers
        // Les bonus sont calculés dynamiquement dans calculateDamage() et calculateDefense()
    }

    /**
     * Calcule les dégâts d'attaque du joueur
     * Gère les dégâts physiques (Force) ET magiques (Intelligence) selon la classe
     */
    calculateDamage() {
        const baseDamage = GameConfig.COMBAT.BASE_CLICK_DAMAGE;
        
        // 🎯 CLASSE : Déterminer le type de dégâts (Physique ou Magique)
        // Par défaut, si pas de classe définie, utiliser physique (rétrocompatibilité)
        const playerClass = this.class || 'warrior';
        const isMagicClass = (playerClass === 'mage' || playerClass === 'priest');
        
        // 💪 DÉGÂTS PHYSIQUES (Guerrier/Archer)
        let physicalDamage = 0;
        if (!isMagicClass) {
            const playerForce = Math.max(0, this.stats.force);
            physicalDamage = playerForce * GameConfig.COMBAT.DAMAGE_FORMULA.FORCE_MULTIPLIER;
        }
        
        // 🧠 DÉGÂTS MAGIQUES (Mage/Prêtre)
        let magicalDamage = 0;
        if (isMagicClass) {
            const playerIntelligence = Math.max(0, this.stats.intelligence);
            magicalDamage = playerIntelligence * GameConfig.COMBAT.DAMAGE_FORMULA.INTELLIGENCE_MULTIPLIER;
        }
        
        // 🎒 BONUS D'ÉQUIPEMENT
        let equipmentBonus = 0;
        if (this.equipmentManager) {
            const equipStats = this.equipmentManager.calculateTotalStats();
            
            if (!isMagicClass) {
                // Classe physique : bonus de Force + dégâts directs
                equipmentBonus += Math.max(0, equipStats.force || 0) * GameConfig.COMBAT.DAMAGE_FORMULA.FORCE_MULTIPLIER;
                equipmentBonus += Math.max(0, equipStats.damage || 0);
            } else {
                // Classe magique : bonus d'Intelligence
                equipmentBonus += Math.max(0, equipStats.intelligence || 0) * GameConfig.COMBAT.DAMAGE_FORMULA.INTELLIGENCE_MULTIPLIER;
                equipmentBonus += Math.max(0, equipStats.damage || 0); // Dégâts directs aussi
            }
        }
        
        // 🐉 BONUS DE DRAGON
        const dragonBonus = this.calculateDragonBonus();
        let dragonDamage = 0;
        if (!isMagicClass) {
            dragonDamage = Math.max(0, dragonBonus.force || 0) * GameConfig.COMBAT.DAMAGE_FORMULA.FORCE_MULTIPLIER;
        } else {
            dragonDamage = Math.max(0, dragonBonus.intelligence || 0) * GameConfig.COMBAT.DAMAGE_FORMULA.INTELLIGENCE_MULTIPLIER;
        }
        
        // 🎯 TOTAL : Base + (Physique OU Magique) + Équipement + Dragon
        const totalDamage = baseDamage + physicalDamage + magicalDamage + equipmentBonus + dragonDamage;
        
        return Math.max(1, Math.floor(totalDamage));
    }

    /**
     * Calcule la vitesse d'attaque du joueur (en millisecondes)
     * ⚡ Formule progressive : Base - (Niveau × 10ms) - (Agilité × 2ms) - Bonus Recherche
     */
    calculateAttackSpeed() {
        let speed = GameConfig.COMBAT.BASE_ATTACK_SPEED; // 1500ms de base
        
        // 📈 Bonus de niveau (-10ms par niveau, max -500ms)
        const levelBonus = Math.min(
            this.level * GameConfig.COMBAT.ATTACK_SPEED_PER_LEVEL,
            GameConfig.COMBAT.MAX_LEVEL_BONUS
        );
        speed -= levelBonus;
        
        // 💨 Bonus d'agilité (-2ms par point d'agilité)
        const agilityBonus = this.stats.agility * GameConfig.COMBAT.ATTACK_SPEED_PER_AGILITY;
        speed -= agilityBonus;
        
        // 🔬 Bonus de recherche "Combat Éclair" (-20% vitesse)
        if (this.game && this.game.researchManager) {
            const researchBonuses = this.game.researchManager.getActiveBonuses();
            if (researchBonuses.attackSpeed) {
                speed = speed * (1 - researchBonuses.attackSpeed);
            }
        }
        
        // Minimum 500ms pour éviter le spam trop rapide
        return Math.max(GameConfig.COMBAT.MIN_ATTACK_SPEED, Math.floor(speed));
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
        
        let damage = this.calculateDamage();
        this.lastAttackTime = Date.now();
        
        // ⚔️ CRITICAL HIT : Basé sur l'Agilité (1% par point d'Agilité)
        const critChance = Math.min(50, this.stats.agility); // Max 50% crit
        const isCritical = Math.random() * 100 < critChance;
        
        if (isCritical) {
            damage = Math.floor(damage * 2); // Double dégâts
            return { damage, isCritical: true };
        }
        
        return { damage, isCritical: false };
    }

    /**
     * Subit des dégâts
     */
    takeDamage(amount) {
        if (!this.isAlive) return { damage: 0, blocked: false, evaded: false };
        
        let equipStats = {};
        if (this.equipmentManager) {
            equipStats = this.equipmentManager.calculateTotalStats();
        }
        
        // 🛡️ BLOCK CHANCE : Chance de bloquer l'attaque complètement
        const blockChance = Math.max(0, equipStats.blockChance || 0);
        const isBlocked = Math.random() * 100 < blockChance;
        
        if (isBlocked) {
            return { damage: 0, blocked: true, evaded: false };
        }
        
        // 🏃 EVASION : Basée sur l'Agilité (0.5% par point d'Agilité, max 40%)
        const evasionChance = Math.min(40, (this.stats.agility || 0) * 0.5);
        const isEvaded = Math.random() * 100 < evasionChance;
        
        if (isEvaded) {
            return { damage: 0, blocked: false, evaded: true };
        }
        
        // Réduction des dégâts par la défense de l'équipement
        const defense = Math.max(0, equipStats.defense || 0);
        let finalDamage = Math.max(1, amount - defense);
        
        this.stats.hp -= finalDamage;
        
        if (this.stats.hp <= 0) {
            this.stats.hp = 0;
            this.isAlive = false;
            this.onDeath();
        }
        
        return { damage: finalDamage, blocked: false, evaded: false };
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
        let maxHp = Math.max(1, this.stats.maxHp); // 🛡️ FIX: Au moins 1 HP
        
        // Bonus d'endurance de l'équipement
        // 🏗️ FIX: Utilisation de l'instance injectée au lieu de window.game
        if (this.equipmentManager) {
            const equipStats = this.equipmentManager.calculateTotalStats();
            // 🛡️ FIX: Protection contre endurance négative
            const endurance = Math.max(0, equipStats.endurance || 0);
            // Chaque point d'endurance donne +5 HP
            maxHp += endurance * 5;
        }
        
        return Math.max(1, maxHp); // 🛡️ FIX: Toujours au moins 1 HP
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
        if (!data) {
            console.error('❌ fromJSON: data est null ou undefined');
            return;
        }
        
        // 🛡️ DEBUG: Logger le chargement
        if (GameConfig.DEBUG.enabled) {
            console.log('📥 Player.fromJSON appelé avec:', data);
        }
        
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
        
        // 🛡️ DEBUG: Logger le résultat
        if (GameConfig.DEBUG.enabled) {
            console.log('✅ Player chargé:', {
                nom: this.name,
                classe: this.class,
                niveau: this.level,
                or: this.resources.gold
            });
        }
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Player = Player;
}
