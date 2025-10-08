/**
 * Classe Equipment - Représente un objet équipable
 */
class Equipment {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type; // weapon, helmet, chest, legs, boots, gloves, amulet, ring, offhand
        this.slot = data.slot; // weapon, helmet, chest, legs, boots, gloves, amulet, ring1, ring2, offhand
        this.rarity = data.rarity; // common, uncommon, rare, epic, legendary, divine
        this.icon = data.icon || '⚔️';
        
        // Qualité du craft (affecte les stats)
        this.quality = data.quality || 'normal'; // normal, superior, exceptional, perfect, masterwork
        this.qualityMultiplier = this.getQualityMultiplier();
        
        // Système de verrouillage
        this.locked = data.locked || false;
        
        // Stats de base (seront multipliées par la qualité)
        const baseStats = {
            force: data.stats?.force || 0,
            agility: data.stats?.agility || 0,
            intelligence: data.stats?.intelligence || 0,
            wisdom: data.stats?.wisdom || 0,
            endurance: data.stats?.endurance || 0,
            damage: data.stats?.damage || 0,
            defense: data.stats?.defense || 0,
            professionXP: data.stats?.professionXP || 0, // Bonus % XP métiers
            dropRate: data.stats?.dropRate || 0 // Bonus % drop rate
        };
        
        // Appliquer le multiplicateur de qualité
        this.stats = {};
        for (const [stat, value] of Object.entries(baseStats)) {
            this.stats[stat] = Math.floor(value * this.qualityMultiplier);
        }
        
        // Niveau requis pour équiper
        this.requiredLevel = data.requiredLevel || 1;
        
        // Description
        this.description = data.description || '';
    }
    
    /**
     * Obtient le multiplicateur de stats selon la qualité
     */
    getQualityMultiplier() {
        const multipliers = {
            normal: 1.0,
            superior: 1.2,
            exceptional: 1.5,
            perfect: 2.0,
            masterwork: 3.0 // Ultra rare !
        };
        return multipliers[this.quality] || 1.0;
    }
    
    /**
     * Obtient le nom de la qualité formaté
     */
    getQualityName() {
        const names = {
            normal: 'Normal',
            superior: 'Supérieur',
            exceptional: 'Exceptionnel',
            perfect: 'Parfait',
            masterwork: 'Œuvre Maître'
        };
        return names[this.quality] || 'Normal';
    }
    
    /**
     * Obtient la couleur de la qualité
     */
    getQualityColor() {
        const colors = {
            normal: '#9E9E9E',      // Gris
            superior: '#4CAF50',     // Vert
            exceptional: '#2196F3',  // Bleu
            perfect: '#9C27B0',      // Violet
            masterwork: '#FFD700'    // Or
        };
        return colors[this.quality] || '#9E9E9E';
    }
    
    /**
     * Obtient l'icône de la qualité
     */
    getQualityIcon() {
        const icons = {
            normal: '',
            superior: '✨',
            exceptional: '💎',
            perfect: '⭐',
            masterwork: '👑'
        };
        return icons[this.quality] || '';
    }
    
    /**
     * Obtient les stats formatées pour l'affichage
     */
    getStatsDisplay() {
        const display = [];
        
        if (this.stats.force > 0) display.push(`💪 +${this.stats.force} Force`);
        if (this.stats.agility > 0) display.push(`⚡ +${this.stats.agility} Agilité`);
        if (this.stats.intelligence > 0) display.push(`🧠 +${this.stats.intelligence} Intelligence`);
        if (this.stats.wisdom > 0) display.push(`✨ +${this.stats.wisdom} Sagesse`);
        if (this.stats.endurance > 0) display.push(`🛡️ +${this.stats.endurance} Endurance`);
        if (this.stats.damage > 0) display.push(`⚔️ +${this.stats.damage} Dégâts`);
        if (this.stats.defense > 0) display.push(`🔰 +${this.stats.defense} Défense`);
        if (this.stats.professionXP > 0) display.push(`⚒️ +${this.stats.professionXP}% XP Métiers`);
        if (this.stats.dropRate > 0) display.push(`💎 +${this.stats.dropRate}% Drop Rate`);
        
        return display;
    }
    
    /**
     * Obtient la couleur de rareté
     */
    getRarityColor() {
        const colors = {
            common: '#9e9e9e',      // Gris
            uncommon: '#4caf50',    // Vert
            rare: '#2196f3',        // Bleu
            epic: '#9c27b0',        // Violet
            legendary: '#ff9800',   // Orange
            mythic: '#e91e63',      // Rose
            divine: '#ffd700'       // Or
        };
        return colors[this.rarity] || colors.common;
    }
    
    /**
     * Sérialise l'équipement
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            slot: this.slot,
            rarity: this.rarity,
            quality: this.quality,
            qualityMultiplier: this.qualityMultiplier,
            locked: this.locked,
            icon: this.icon,
            stats: this.stats,
            requiredLevel: this.requiredLevel,
            description: this.description
        };
    }
    
    /**
     * Désérialise l'équipement
     */
    static fromJSON(data) {
        return new Equipment(data);
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof window !== 'undefined') {
    window.Equipment = Equipment;
}
