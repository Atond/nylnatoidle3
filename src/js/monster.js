/**
 * Classe Monster - Gestion des monstres
 * Utilise les données de MonstersData pour créer les monstres
 */

class Monster {
    constructor(monsterId, level = 1) {
        // Récupérer les données du monstre depuis MonstersData
        this.data = window.MonstersData.getMonster(monsterId);
        
        if (!this.data) {
            console.error(`Monstre introuvable: ${monsterId}`);
            // Fallback vers un monstre par défaut
            this.data = window.MonstersData.getMonster('loup_gris');
        }
        
        this.id = this.data.id;
        this.type = this.data.type;
        this.level = level;
        this.rarity = this.data.rarity || 'common';
        
        // Stats calculées avec scaling de niveau
        this.stats = window.MonstersData.calculateStats(this.data, level);
        this.maxHp = this.stats.hp;
        this.hp = this.maxHp;
        
        this.isAlive = true;
        this.lastAttackTime = 0;
        
        // Récompenses basées sur les données
        this.xpReward = this.calculateXpReward();
        this.goldReward = this.calculateGoldReward();
    }

    /**
     * Calcule l'XP donnée par ce monstre (avec scaling de niveau)
     */
    calculateXpReward() {
        const baseXp = this.data.rewards.xp;
        return Math.floor(baseXp * (1 + this.level * 0.2));
    }

    /**
     * Calcule l'or donné par ce monstre (avec scaling de niveau)
     */
    calculateGoldReward() {
        const baseGold = this.data.rewards.gold;
        return Math.floor(baseGold * (1 + this.level * 0.15));
    }

    /**
     * Le monstre peut-il attaquer maintenant ?
     */
    canAttack(currentTime) {
        return currentTime - this.lastAttackTime >= this.stats.speed;
    }

    /**
     * Le monstre attaque
     */
    attack() {
        if (!this.isAlive) return 0;
        
        this.lastAttackTime = Date.now();
        
        // Dégâts avec un peu de variance (±20%)
        const variance = Utils.randomFloat(0.8, 1.2);
        const damage = Math.max(1, Math.floor(this.stats.attack * variance));
        
        return damage;
    }

    /**
     * Le monstre subit des dégâts
     */
    takeDamage(amount) {
        if (!this.isAlive) return;
        
        // Réduction par la défense (chaque point de défense = -1 dégât, minimum 1)
        const reducedDamage = Math.max(1, amount - this.stats.defense);
        
        this.hp -= reducedDamage;
        
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;
            this.onDeath();
        }
        
        return reducedDamage; // Retourne les dégâts réellement infligés
    }

    /**
     * Gère la mort du monstre
     */
    onDeath() {
        if (GameConfig.DEBUG.enabled) {
            console.log(`💀 ${this.getName()} est vaincu!`);
        }
    }

    /**
     * Obtient le pourcentage de HP
     */
    getHpPercentage() {
        return Utils.percentage(this.hp, this.maxHp);
    }

    /**
     * Obtient le nom du monstre
     */
    getName() {
        return this.data.name;
    }

    /**
     * Obtient l'émoji/icône du monstre
     */
    getEmoji() {
        return this.data.icon;
    }

    /**
     * Obtient une description du monstre
     */
    getDescription() {
        return this.data.description;
    }

    /**
     * Obtient la rareté du monstre (pour affichage UI)
     */
    getRarity() {
        return this.rarity;
    }

    /**
     * Obtient la couleur selon la rareté
     */
    getRarityColor() {
        const colors = {
            common: '#cccccc',
            rare: '#4a9eff',
            elite: '#9d4eff',
            boss: '#ff6b35'
        };
        return colors[this.rarity] || colors.common;
    }

    /**
     * Calcule les drops du monstre
     */
    getDrops() {
        if (!window.DropsData) return [];
        return window.DropsData.calculateDrops(this.data);
    }

    /**
     * Exporte les données du monstre
     */
    toJSON() {
        return {
            id: this.id,
            level: this.level,
            hp: this.hp,
            maxHp: this.maxHp,
            stats: this.stats,
            isAlive: this.isAlive,
            xpReward: this.xpReward,
            goldReward: this.goldReward
        };
    }

    /**
     * Crée un monstre depuis des données JSON
     */
    static fromJSON(data) {
        const monster = new Monster(data.id, data.level);
        monster.hp = data.hp;
        monster.isAlive = data.isAlive;
        return monster;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Monster = Monster;
}
