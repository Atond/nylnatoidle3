/**
 * Classe Building - Représente un bâtiment de production
 */

class Building {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        
        // Niveau actuel du bâtiment
        this.level = data.level || 0; // 0 = pas construit
        
        // Production et coûts de base
        this.baseProduction = data.baseProduction; // { resourceId: amount per minute }
        this.baseCost = data.baseCost; // { gold: amount }
        this.costMultiplier = data.costMultiplier || 1.5;
        this.productionMultiplier = data.productionMultiplier || 1.5;
        
        // Profession associée (optionnel)
        this.profession = data.profession || null;
        this.professionLevelRequired = data.professionLevelRequired || 0;
    }

    /**
     * Vérifie si le bâtiment est construit
     */
    isBuilt() {
        return this.level > 0;
    }

    /**
     * Calcule le coût pour le prochain niveau
     */
    getUpgradeCost() {
        if (this.level === 0) {
            // Premier achat (construction)
            return { ...this.baseCost };
        }
        
        // Upgrade : coût augmente selon le multiplicateur
        const cost = {};
        for (const [resource, amount] of Object.entries(this.baseCost)) {
            cost[resource] = Math.floor(amount * Math.pow(this.costMultiplier, this.level));
        }
        return cost;
    }

    /**
     * Calcule la production actuelle (par minute)
     */
    getCurrentProduction() {
        if (this.level === 0) return {};
        
        const production = {};
        for (const [resource, amount] of Object.entries(this.baseProduction)) {
            production[resource] = Math.floor(amount * Math.pow(this.productionMultiplier, this.level - 1));
        }
        return production;
    }

    /**
     * Améliore le bâtiment d'un niveau
     */
    upgrade() {
        this.level++;
    }

    /**
     * Sérialisation pour la sauvegarde
     */
    toJSON() {
        return {
            id: this.id,
            level: this.level
        };
    }

    /**
     * Désérialisation depuis une sauvegarde
     */
    static fromJSON(data, buildingData) {
        const building = new Building(buildingData);
        building.level = data.level || 0;
        return building;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Building = Building;
}
