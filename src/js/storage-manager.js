/**
 * Gestion du stockage des ressources
 */
class StorageManager {
    constructor(game) {
        this.game = game;
        
        // Limites de base par type de ressource
        this.baseLimitResources = 1000; // Bois, Minerais, Gemmes
        this.baseLimitLoot = 500; // Butin de combat
        
        this.limits = {}; // Limites personnalisées par ressource
        
        this.initializeResourceLimits();
    }

    /**
     * Initialise les limites pour toutes les ressources
     */
    initializeResourceLimits() {
        // Initialiser les ressources de récolte (1000 de base)
        const gatheringResources = [
            ...window.ResourcesData.wood,
            ...window.ResourcesData.ore,
            ...window.ResourcesData.gems
        ];
        
        for (const resource of gatheringResources) {
            this.limits[resource.id] = this.baseLimitResources;
        }
        
        // Initialiser les ressources de combat (500 de base)
        if (window.ResourcesData.loot) {
            for (const loot of window.ResourcesData.loot) {
                this.limits[loot.id] = this.baseLimitLoot;
            }
        }
    }

    /**
     * Récupère la limite de stockage pour une ressource
     * (inclut les bonus des entrepôts appropriés)
     */
    getLimit(resourceId) {
        const baseLimit = this.limits[resourceId] || this.baseLimitResources;
        
        // Déterminer quel entrepôt utiliser
        const isLoot = resourceId.startsWith('loot_');
        const bonus = isLoot ? this.getTreasuryBonus() : this.getWarehouseBonus();
        
        return baseLimit + bonus;
    }

    /**
     * Calcule le bonus de stockage de l'entrepôt de ressources (Warehouse)
     */
    getWarehouseBonus() {
        if (!this.game || !this.game.buildingManager) {
            return 0;
        }
        
        const warehouse = this.game.buildingManager.getBuilding('warehouse');
        if (!warehouse || !warehouse.isBuilt()) {
            return 0;
        }
        
        const buildingData = window.BuildingsData.warehouse;
        const storageBonus = buildingData.storageBonus || 0;
        
        return storageBonus * warehouse.level;
    }

    /**
     * Calcule le bonus de stockage de la trésorerie (Treasury)
     */
    getTreasuryBonus() {
        if (!this.game || !this.game.buildingManager) {
            return 0;
        }
        
        const treasury = this.game.buildingManager.getBuilding('treasury');
        if (!treasury || !treasury.isBuilt()) {
            return 0;
        }
        
        const buildingData = window.BuildingsData.treasury;
        const storageBonus = buildingData?.storageBonus || 0;
        
        return storageBonus * treasury.level;
    }

    /**
     * Récupère la quantité actuelle d'une ressource
     */
    getCurrentAmount(resourceId) {
        return this.game.professionManager.getInventoryAmount(resourceId);
    }

    /**
     * Vérifie si on peut ajouter une ressource
     */
    canAdd(resourceId, amount = 1) {
        const current = this.getCurrentAmount(resourceId);
        const limit = this.getLimit(resourceId);
        return (current + amount) <= limit;
    }

    /**
     * Vérifie si le stockage est plein pour une ressource
     */
    isFull(resourceId) {
        const current = this.getCurrentAmount(resourceId);
        const limit = this.getLimit(resourceId);
        return current >= limit;
    }

    /**
     * Calcule le pourcentage de remplissage
     */
    getFillPercentage(resourceId) {
        const current = this.getCurrentAmount(resourceId);
        const limit = this.getLimit(resourceId);
        return Math.min(100, (current / limit) * 100);
    }

    /**
     * Vérifie si le stockage est presque plein (>90%)
     */
    isAlmostFull(resourceId) {
        return this.getFillPercentage(resourceId) >= 90;
    }

    /**
     * Augmente la limite de stockage d'une ressource
     */
    upgradeLimit(resourceId, amount) {
        if (!this.limits[resourceId]) {
            this.limits[resourceId] = this.baseLimit;
        }
        this.limits[resourceId] += amount;
    }

    /**
     * Augmente toutes les limites de stockage
     */
    upgradeAllLimits(amount) {
        for (const resourceId in this.limits) {
            this.limits[resourceId] += amount;
        }
    }

    /**
     * Retourne les données pour la sauvegarde
     */
    getSaveData() {
        return {
            baseLimit: this.baseLimit,
            limits: this.limits
        };
    }

    /**
     * Charge les données de sauvegarde
     */
    loadSaveData(data) {
        if (data.baseLimit) {
            this.baseLimit = data.baseLimit;
        }
        if (data.limits) {
            this.limits = { ...data.limits };
        }
    }
}

// Exposer globalement
window.StorageManager = StorageManager;
