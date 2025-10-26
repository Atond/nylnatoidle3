/**
 * Classe CityManager - Gestion du système de ville et d'habitants
 * 
 * Inspiré d'Evolve Idle
 * Gère :
 * - Population et logements
 * - Production et consommation de nourriture
 * - Collecte d'impôts
 * - Services et bonus
 */

class CityManager {
    constructor(game) {
        this.game = game;
        
        // Buildings de ville (séparé des buildings de production)
        this.cityBuildings = {};
        
        // Population
        this.population = 0;
        this.maxPopulation = 0;
        this.populationGrowthTimer = 0;
        
        // Nourriture
        this.food = 100;  // Commence avec 100 nourriture
        this.maxFood = 1000;
        this.foodProductionRate = 0;  // nourriture/min
        this.foodConsumptionRate = 0;  // nourriture/min
        
        // Impôts
        this.taxRate = 0;  // or/min par habitant
        this.taxAccumulator = 0;
        
        // Bonus actifs
        this.activeServices = new Set();
        
        // Timers
        this.lastUpdateTime = Date.now();
        
        console.log('✅ CityManager initialisé');
    }
    
    /**
     * Mise à jour principale (appelée chaque frame)
     */
    update(deltaTime) {
        const now = Date.now();
        const realDelta = (now - this.lastUpdateTime) / 1000;  // en secondes
        this.lastUpdateTime = now;
        
        // Production de nourriture
        this.produceFood(realDelta);
        
        // Consommation de nourriture
        this.consumeFood(realDelta);
        
        // Croissance de population
        this.updatePopulationGrowth(deltaTime);
        
        // Collecte d'impôts
        this.collectTaxes(realDelta);
        
        // Mettre à jour les stats
        this.updateStats();
    }
    
    /**
     * Production de nourriture
     */
    produceFood(deltaSeconds) {
        if (this.foodProductionRate <= 0) return;
        
        const productionPerSecond = this.foodProductionRate / 60;
        const produced = productionPerSecond * deltaSeconds;
        
        this.food = Math.min(this.food + produced, this.maxFood);
    }
    
    /**
     * Consommation de nourriture
     */
    consumeFood(deltaSeconds) {
        if (this.population === 0) return;
        
        const consumptionPerSecond = this.foodConsumptionRate / 60;
        const consumed = consumptionPerSecond * deltaSeconds;
        
        this.food -= consumed;
        
        // Pénalité si nourriture négative
        if (this.food < 0) {
            this.handleStarvation();
        }
    }
    
    /**
     * Gestion de la famine
     */
    handleStarvation() {
        if (!CityConfig.starvationPenalty.enabled) return;
        
        // Limiter la nourriture à 0
        this.food = Math.max(this.food, -100);  // Maximum -100
        
        // TODO: Implémenter perte de population graduelle
        // Pour l'instant, juste arrêter la croissance
    }
    
    /**
     * Vérification de la population (ajustement automatique si besoin)
     */
    updatePopulationGrowth(deltaTime) {
        // 🏠 NOUVELLE MÉCANIQUE : Les habitants arrivent quand on construit des maisons
        // Cette méthode vérifie juste qu'on n'a pas plus de pop que de capacité
        
        // Si population dépasse la capacité (par exemple après démolition), réduire
        if (this.population > this.maxPopulation) {
            console.warn(`⚠️ Surpopulation ! Ajustement: ${this.population} → ${this.maxPopulation}`);
            this.population = this.maxPopulation;
            
            if (this.game.ui) {
                this.game.ui.showNotification('⚠️ Surpopulation ! Certains habitants sont partis.', 'warning');
            }
        }
        
        // Si pas assez de nourriture, perte graduelle de population
        if (this.food < -50) {  // Famine sévère
            this.populationGrowthTimer += deltaTime;
            
            // Perdre 1 habitant toutes les 60 secondes en cas de famine sévère
            if (this.populationGrowthTimer >= 60000 && this.population > 0) {
                this.population--;
                this.populationGrowthTimer = 0;
                
                console.log(`☠️ Famine ! Population: ${this.population}/${this.maxPopulation}`);
                
                if (this.game.ui) {
                    this.game.ui.showNotification('☠️ Un habitant est mort de faim !', 'error');
                }
            }
        } else {
            this.populationGrowthTimer = 0;
        }
    }
    
    /**
     * Collecte d'impôts
     */
    collectTaxes(deltaSeconds) {
        if (this.population === 0 || this.taxRate === 0) return;
        
        // Ne pas collecter d'impôts si famine
        let effectiveTaxRate = this.taxRate;
        if (this.food < 0 && CityConfig.starvationPenalty.enabled) {
            effectiveTaxRate *= CityConfig.starvationPenalty.taxPenalty;  // -50%
        }
        
        const taxPerSecond = (this.population * effectiveTaxRate) / 60;
        const collected = taxPerSecond * deltaSeconds;
        
        this.taxAccumulator += collected;
        
        // Collecter l'or chaque seconde
        if (this.taxAccumulator >= 1) {
            const goldToAdd = Math.floor(this.taxAccumulator);
            this.game.player.resources.gold += goldToAdd;
            this.taxAccumulator -= goldToAdd;
        }
    }
    
    /**
     * Mettre à jour les statistiques
     */
    updateStats() {
        // Calculer capacité de logement max
        this.maxPopulation = this.calculateMaxPopulation();
        
        // Calculer production de nourriture
        this.foodProductionRate = this.calculateFoodProduction();
        
        // Calculer consommation de nourriture
        this.foodConsumptionRate = this.calculateFoodConsumption();
        
        // Calculer taux d'impôt
        this.taxRate = this.calculateTaxRate();
        
        // Mettre à jour stockage max nourriture
        this.maxFood = this.calculateMaxFoodStorage();
    }
    
    /**
     * Calculer capacité de logement maximale
     */
    calculateMaxPopulation() {
        let total = 0;
        
        for (const [buildingId, data] of Object.entries(this.cityBuildings)) {
            const buildingData = CityBuildingsData[buildingId];
            if (buildingData && buildingData.category === 'housing') {
                const count = data.count || 0;
                total += buildingData.housingCapacity * count;
            }
        }
        
        return total;
    }
    
    /**
     * Calculer production de nourriture totale
     */
    calculateFoodProduction() {
        let total = 0;
        
        for (const [buildingId, data] of Object.entries(this.cityBuildings)) {
            const buildingData = CityBuildingsData[buildingId];
            if (buildingData && buildingData.category === 'food') {
                const production = calculateFoodProduction(
                    buildingId,
                    data.level || 1,
                    this.population
                );
                total += production * data.count;
            }
        }
        
        return total;
    }
    
    /**
     * Calculer consommation de nourriture totale
     */
    calculateFoodConsumption() {
        const hasHospital = this.hasService('hospital');
        return calculateFoodConsumption(this.population, hasHospital);
    }
    
    /**
     * Calculer taux d'impôt
     */
    calculateTaxRate() {
        const taxOffice = this.cityBuildings.tax_office;
        if (!taxOffice) return 0;
        
        const hasFinanceHall = this.hasService('finance_hall');
        return calculateTaxRate(taxOffice.level || 1, hasFinanceHall);
    }
    
    /**
     * Calculer stockage max de nourriture
     */
    calculateMaxFoodStorage() {
        let storage = CityConfig.baseFoodStorage;
        
        // Bonus si entrepôt construit
        const warehouse = this.game.buildingManager?.getBuilding('warehouse');
        if (warehouse && warehouse.level > 0) {
            storage += CityConfig.foodStoragePerWarehouse * warehouse.level;
        }
        
        return storage;
    }
    
    /**
     * Construire un bâtiment de ville
     */
    buildCityBuilding(buildingId) {
        const buildingData = CityBuildingsData[buildingId];
        if (!buildingData) {
            console.error(`❌ Bâtiment de ville inconnu: ${buildingId}`);
            return false;
        }
        
        // Vérifier si débloqué
        if (!this.isCityBuildingUnlocked(buildingId)) {
            console.log(`🔒 Bâtiment ${buildingId} non débloqué`);
            return false;
        }
        
        // Vérifier limite max (pour bâtiments uniques)
        if (buildingData.maxCount) {
            const currentCount = this.getCityBuildingCount(buildingId);
            if (currentCount >= buildingData.maxCount) {
                console.log(`⚠️ Limite atteinte pour ${buildingId}`);
                return false;
            }
        }
        
        // Calculer le coût
        const currentCount = this.getCityBuildingCount(buildingId);
        const cost = calculateCityBuildingCost(buildingId, currentCount);
        
        // Vérifier les ressources (or + ressources)
        if (cost.gold && this.game.player.resources.gold < cost.gold) {
            console.log(`❌ Or insuffisant pour ${buildingId} (besoin: ${cost.gold}, actuel: ${this.game.player.resources.gold})`);
            return false;
        }
        
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') continue; // Déjà vérifié
            
            const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
            if (currentAmount < amount) {
                console.log(`❌ ${resourceId} insuffisant pour ${buildingId} (besoin: ${amount}, actuel: ${currentAmount})`);
                return false;
            }
        }
        
        // Consommer les ressources
        if (cost.gold) {
            this.game.player.resources.gold -= cost.gold;
        }
        
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') continue; // Déjà payé
            this.game.professionManager.removeFromInventory(resourceId, amount);
        }
        
        // Construire le bâtiment
        if (!this.cityBuildings[buildingId]) {
            this.cityBuildings[buildingId] = {
                count: 0,
                level: 1
            };
        }
        this.cityBuildings[buildingId].count++;
        
        // Activer le service si applicable
        if (buildingData.category === 'service') {
            this.activeServices.add(buildingId);
        }
        
        // 🏠 Si c'est un logement, faire arriver les habitants immédiatement !
        if (buildingData.category === 'housing' && buildingData.housingCapacity) {
            const newCitizens = buildingData.housingCapacity;
            this.population += newCitizens;
            
            console.log(`🏗️ ${buildingData.name} construit ! +${newCitizens} habitants (Total: ${this.population})`);
            
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `🏗️ ${buildingData.name} construit ! 👥 +${newCitizens} habitants`,
                    'success'
                );
            }
        } else {
            console.log(`🏗️ ${buildingData.name} construit ! (${this.cityBuildings[buildingId].count})`);
            
            // Notification
            if (this.game.ui) {
                this.game.ui.showNotification(`🏗️ ${buildingData.name} construit !`, 'success');
            }
        }
        
        // Mettre à jour les stats
        this.updateStats();
        
        // Rafraîchir l'UI
        if (this.game.ui) {
            this.game.ui.updateTownTab();
        }
        
        return true;
    }
    
    /**
     * Améliorer un bâtiment de ville
     */
    upgradeCityBuilding(buildingId) {
        const buildingData = CityBuildingsData[buildingId];
        if (!buildingData) return false;
        
        // Seulement pour bâtiments avec niveau (production/impôts)
        if (!buildingData.baseProduction && !buildingData.baseTaxRate) {
            console.log(`⚠️ ${buildingId} ne peut pas être amélioré`);
            return false;
        }
        
        if (!this.cityBuildings[buildingId] || this.cityBuildings[buildingId].count === 0) {
            console.log(`❌ Aucun ${buildingId} construit`);
            return false;
        }
        
        // Calculer coût upgrade (similaire à building-manager)
        const currentLevel = this.cityBuildings[buildingId].level || 1;
        const upgradeCost = calculateCityBuildingCost(buildingId, currentLevel);
        
        // Vérifier ressources (or + ressources)
        if (upgradeCost.gold && this.game.player.resources.gold < upgradeCost.gold) {
            console.log(`❌ Or insuffisant pour améliorer ${buildingId}`);
            return false;
        }
        
        for (const [resourceId, amount] of Object.entries(upgradeCost)) {
            if (resourceId === 'gold') continue;
            
            const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
            if (currentAmount < amount) {
                console.log(`❌ ${resourceId} insuffisant pour améliorer ${buildingId}`);
                return false;
            }
        }
        
        // Consommer ressources
        if (upgradeCost.gold) {
            this.game.player.resources.gold -= upgradeCost.gold;
        }
        
        for (const [resourceId, amount] of Object.entries(upgradeCost)) {
            if (resourceId === 'gold') continue;
            this.game.professionManager.removeFromInventory(resourceId, amount);
        }
        
        // Upgrade
        this.cityBuildings[buildingId].level++;
        
        console.log(`⬆️ ${buildingData.name} niveau ${this.cityBuildings[buildingId].level}`);
        
        if (this.game.ui) {
            this.game.ui.showNotification(
                `⬆️ ${buildingData.name} niveau ${this.cityBuildings[buildingId].level}`,
                'success'
            );
            // Rafraîchir l'UI
            this.game.ui.updateTownTab();
        }
        
        this.updateStats();
        return true;
    }
    
    /**
     * Vérifier si on peut construire un bâtiment
     */
    canBuildCityBuilding(buildingId) {
        const buildingData = CityBuildingsData[buildingId];
        if (!buildingData) return false;
        
        // Vérifier si débloqué
        if (!this.isCityBuildingUnlocked(buildingId)) {
            return false;
        }
        
        // Vérifier limite max
        if (buildingData.maxCount) {
            const currentCount = this.getCityBuildingCount(buildingId);
            if (currentCount >= buildingData.maxCount) {
                return false;
            }
        }
        
        // Vérifier les ressources
        const currentCount = this.getCityBuildingCount(buildingId);
        const cost = calculateCityBuildingCost(buildingId, currentCount);
        
        // Vérifier l'or
        if (cost.gold && this.game.player.resources.gold < cost.gold) {
            return false;
        }
        
        // Vérifier les autres ressources
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') continue; // Déjà vérifié
            
            const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
            if (currentAmount < amount) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Vérifier si on peut améliorer un bâtiment
     */
    canUpgradeCityBuilding(buildingId) {
        const buildingData = CityBuildingsData[buildingId];
        if (!buildingData) return false;
        
        // Seulement pour bâtiments avec niveau
        if (!buildingData.canUpgrade) return false;
        
        // Doit être construit
        if (!this.cityBuildings[buildingId] || this.cityBuildings[buildingId].count === 0) {
            return false;
        }
        
        // Vérifier les ressources
        const currentLevel = this.cityBuildings[buildingId].level || 1;
        const cost = calculateCityBuildingCost(buildingId, currentLevel);
        
        // Vérifier l'or
        if (cost.gold && this.game.player.resources.gold < cost.gold) {
            return false;
        }
        
        // Vérifier les autres ressources
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') continue; // Déjà vérifié
            
            const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
            if (currentAmount < amount) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Vérifier si un bâtiment de ville est débloqué
     */
    isCityBuildingUnlocked(buildingId) {
        const buildingData = CityBuildingsData[buildingId];
        if (!buildingData || !buildingData.unlockConditions) return true;
        
        const conditions = buildingData.unlockConditions;
        
        // Niveau joueur
        if (conditions.playerLevel && this.game.player.level < conditions.playerLevel) {
            return false;
        }
        
        // Population minimum
        if (conditions.population && this.population < conditions.population) {
            return false;
        }
        
        // Bâtiments requis
        if (conditions.buildings) {
            for (const [requiredBuilding, requiredCount] of Object.entries(conditions.buildings)) {
                const currentCount = this.getCityBuildingCount(requiredBuilding);
                if (currentCount < requiredCount) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    /**
     * Obtenir le nombre de bâtiments d'un type
     */
    getCityBuildingCount(buildingId) {
        return this.cityBuildings[buildingId]?.count || 0;
    }
    
    /**
     * Vérifier si un service est actif
     */
    hasService(serviceId) {
        return this.activeServices.has(serviceId);
    }
    
    /**
     * Obtenir tous les bonus actifs
     */
    getActiveServices() {
        const services = [];
        
        for (const serviceId of this.activeServices) {
            const building = CityBuildingsData[serviceId];
            if (building && building.bonus) {
                services.push({
                    id: serviceId,
                    name: building.name,
                    icon: building.icon,
                    bonus: building.bonus
                });
            }
        }
        
        return services;
    }
    
    /**
     * Sauvegarder
     */
    toJSON() {
        return {
            cityBuildings: this.cityBuildings,
            population: this.population,
            food: this.food,
            populationGrowthTimer: this.populationGrowthTimer,
            taxAccumulator: this.taxAccumulator,
            activeServices: Array.from(this.activeServices)
        };
    }
    
    /**
     * Charger
     */
    fromJSON(data) {
        if (!data) return;
        
        this.cityBuildings = data.cityBuildings || {};
        this.population = data.population || 0;
        // 🛡️ FIX: Utiliser ?? au lieu de || pour permettre la valeur 0
        this.food = data.food ?? 100;
        this.populationGrowthTimer = data.populationGrowthTimer ?? 0;
        this.taxAccumulator = data.taxAccumulator ?? 0;
        this.activeServices = new Set(data.activeServices || []);
        
        this.updateStats();
        
        console.log(`📦 Ville chargée: ${this.population} habitants, ${Object.keys(this.cityBuildings).length} types de bâtiments`);
    }
}

// Export
if (typeof window !== 'undefined') {
    window.CityManager = CityManager;
}
