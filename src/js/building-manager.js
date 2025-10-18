/**
 * Classe BuildingManager - Gestion des bâtiments de la ville
 */

class BuildingManager {
    constructor(game) {
        this.game = game;
        this.buildings = new Map(); // Map<buildingId, Building>
        
        // Temps de la dernière production
        this.lastProductionTime = Date.now();
        
        this.initBuildings();
    }

    /**
     * Initialise tous les bâtiments disponibles
     */
    initBuildings() {
        if (!window.BuildingsData) {
            console.error('❌ BuildingsData non chargé !');
            return;
        }
        
        for (const [id, data] of Object.entries(window.BuildingsData)) {
            const building = new Building(data);
            this.buildings.set(id, building);
        }
    }

    /**
     * Obtient un bâtiment par son ID
     */
    getBuilding(buildingId) {
        return this.buildings.get(buildingId);
    }

    /**
     * Obtient tous les bâtiments
     */
    getAllBuildings() {
        return Array.from(this.buildings.values());
    }

    /**
     * Vérifie si un bâtiment est débloqué
     */
    isBuildingUnlocked(buildingId) {
        const building = this.buildings.get(buildingId);
        if (!building) return false;
        
        // Vérifier les conditions de déblocage
        if (building.unlockConditions) {
            if (building.unlockConditions.playerLevel && this.game.player.level < building.unlockConditions.playerLevel) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Vérifie si le joueur peut acheter/améliorer un bâtiment
     */
    canUpgrade(buildingId) {
        const building = this.buildings.get(buildingId);
        if (!building) return false;
        
        // Vérifier si le bâtiment est débloqué
        if (!this.isBuildingUnlocked(buildingId)) {
            return false;
        }
        
        // Vérifier le niveau de profession requis
        if (building.profession && building.professionLevelRequired > 0) {
            const profession = this.game.professionManager.getProfession(building.profession);
            if (!profession || profession.level < building.professionLevelRequired) {
                return false;
            }
        }
        
        // Vérifier les coûts (or ET ressources)
        const cost = building.getUpgradeCost();
        
        // Vérifier l'or
        if (cost.gold && this.game.player.resources.gold < cost.gold) {
            return false;
        }
        
        // Vérifier les ressources
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
     * Achète ou améliore un bâtiment
     */
    upgradeBuilding(buildingId) {
        const building = this.buildings.get(buildingId);
        if (!building) {
            return false;
        }
        
        if (!this.canUpgrade(buildingId)) {
            return false;
        }
        
        // Payer le coût (or ET ressources)
        const cost = building.getUpgradeCost();
        
        // Payer l'or
        if (cost.gold) {
            this.game.player.resources.gold -= cost.gold;
        }
        
        // Payer les ressources
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') continue; // Déjà payé
            this.game.professionManager.removeFromInventory(resourceId, amount);
        }
        
        // Améliorer le bâtiment
        building.upgrade();
        
        return true;
    }

    /**
     * Met à jour la production des bâtiments (appelé régulièrement)
     */
    update(deltaTime) {
        const currentTime = Date.now();
        const timePassed = (currentTime - this.lastProductionTime) / 1000; // en secondes
        
        // Production toutes les secondes minimum
        if (timePassed < 1) return;
        
        // Calculer la production pour chaque bâtiment
        for (const building of this.buildings.values()) {
            if (!building.isBuilt()) continue;
            
            // ========== TRAITEMENT SPÉCIAL LABORATOIRE ==========
            if (building.id === 'alchemy_lab') {
                this.processAlchemyLabProduction(building, timePassed);
                continue; // Passer au bâtiment suivant
            }
            
            // ========== PRODUCTION NORMALE ==========
            const production = building.getCurrentProduction();
            
            for (const [resourceId, amountPerMinute] of Object.entries(production)) {
                // Vérifier si le stockage est plein
                if (this.game.storageManager.isFull(resourceId)) {
                    continue;
                }
                
                // Convertir en production par seconde
                const amountPerSecond = amountPerMinute / 60;
                const amountProduced = amountPerSecond * timePassed;
                const finalAmount = Math.floor(amountProduced);
                
                if (finalAmount > 0) {
                    const limit = this.game.storageManager.getLimit(resourceId);
                    const current = this.game.storageManager.getCurrentAmount(resourceId);
                    const available = Math.max(0, limit - current);
                    const toAdd = Math.min(finalAmount, available);
                    
                    if (toAdd > 0) {
                        // Ajouter à l'inventaire du métier
                        this.game.professionManager.addToInventory(resourceId, toAdd);
                    }
                }
            }
        }
        
        this.lastProductionTime = currentTime;
    }

    /**
     * Traite la production passive du Laboratoire d'Alchimie
     * @param {Building} lab - Le laboratoire
     * @param {number} timePassed - Temps écoulé en secondes
     */
    processAlchemyLabProduction(lab, timePassed) {
        if (!this.game.alchemyManager) return;
        
        const alchemy = this.game.alchemyManager;
        
        // Calculer nombre de conversions possibles
        const conversionsPerSecond = window.calculateLabProductionPerSecond(lab.level);
        const conversionsAvailable = conversionsPerSecond * timePassed;
        
        if (conversionsAvailable < 0.01) return; // Trop petit, on attend
        
        // Obtenir les conversions disponibles pour le niveau d'alchimie actuel
        const availableConversions = alchemy.getAvailableConversions();
        if (availableConversions.length === 0) return;
        
        // Stratégie: Convertir les ressources dans l'ordre des tiers (T1→T2 en priorité)
        let conversionsRemaining = Math.floor(conversionsAvailable);
        
        for (const conversion of availableConversions) {
            if (conversionsRemaining <= 0) break;
            
            // Vérifier ressources disponibles
            const inputAmount = this.game.professionManager.getInventoryAmount(conversion.input.resourceId);
            const maxConversions = Math.floor(inputAmount / conversion.input.amount);
            
            if (maxConversions > 0) {
                // Faire autant de conversions que possible
                const conversionsToMake = Math.min(conversionsRemaining, maxConversions);
                
                // Consommer input
                this.game.professionManager.removeFromInventory(
                    conversion.input.resourceId, 
                    conversion.input.amount * conversionsToMake
                );
                
                // Produire output (avec chance de bonus)
                let outputAmount = conversion.output.amount * conversionsToMake;
                const bonusChance = alchemy.getBonusChance();
                
                if (bonusChance > 0 && Math.random() < bonusChance) {
                    outputAmount *= 2; // Bonus ×2
                    if (this.game.ui) {
                        this.game.ui.showNotification(
                            `🧪✨ Laboratoire bonus ! Output ×2 (${conversion.name})`,
                            'success'
                        );
                    }
                }
                
                // Ajouter output
                this.game.professionManager.addToInventory(
                    conversion.output.resourceId, 
                    outputAmount
                );
                
                // Gagner XP (réduit pour production passive, 25% de l'XP normale)
                const xpGained = Math.floor(conversion.xpGain * conversionsToMake * 0.25);
                alchemy.gainXP(xpGained);
                
                conversionsRemaining -= conversionsToMake;
                
                if (GameConfig.DEBUG.enabled && conversionsToMake > 0) {
                    console.log(`🧪 Labo: ${conversionsToMake}× ${conversion.name} (+${outputAmount} ${conversion.output.resourceId})`);
                }
            }
        }
    }

    /**
     * Obtient la production totale par seconde
     */
    getTotalProduction() {
        const totalProduction = {};
        
        for (const building of this.buildings.values()) {
            if (!building.isBuilt()) continue;
            
            const production = building.getCurrentProduction();
            
            for (const [resourceId, amountPerMinute] of Object.entries(production)) {
                if (!totalProduction[resourceId]) {
                    totalProduction[resourceId] = 0;
                }
                totalProduction[resourceId] += amountPerMinute / 60; // Convertir en par seconde
            }
        }
        
        return totalProduction;
    }

    /**
     * Sérialisation pour la sauvegarde
     */
    toJSON() {
        return {
            buildings: Array.from(this.buildings.values()).map(b => b.toJSON()),
            lastProductionTime: this.lastProductionTime
        };
    }

    /**
     * Désérialisation depuis une sauvegarde
     */
    fromJSON(data) {
        if (!data) return;
        
        // Restaurer les bâtiments
        if (data.buildings) {
            for (const buildingData of data.buildings) {
                const buildingInfo = window.BuildingsData[buildingData.id];
                if (buildingInfo) {
                    const building = Building.fromJSON(buildingData, buildingInfo);
                    this.buildings.set(building.id, building);
                }
            }
        }
        
        // Restaurer le temps de production
        this.lastProductionTime = data.lastProductionTime || Date.now();
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.BuildingManager = BuildingManager;
}
