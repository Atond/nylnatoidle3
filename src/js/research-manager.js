/**
 * 🔬 RESEARCH MANAGER
 * Gère le système de recherches permanentes
 */

class ResearchManager {
    constructor(game) {
        this.game = game;
        
        // Recherches débloquées (Set des IDs)
        this.unlockedResearches = new Set();
        
        // Effets cumulés calculés
        this.effects = {
            // Production
            gatherSpeed: 0,
            autoGatherSpeed: 0,
            doubleDropBonus: 0,
            resourceYield: 0,
            buildingProduction: 0,
            craftingSpeed: 0,
            craftingCostReduction: 0,
            qualityCraftBonus: 0,
            passiveClickBonus: 0,
            
            // Combat
            combatDamage: 0,
            combatDefense: 0,
            maxHealth: 0,
            healthRegen: 0,
            critChance: 0,
            dungeonLootBonus: 0,
            dodgeChance: 0,
            lifesteal: 0,
            berserkerRage: 0,
            
            // Progression
            xpBonus: 0,
            rareDropBonus: 0,
            gemDropBonus: 0,
            unlockLevelReduction: 0,
            questRewardBonus: 0,
            sellPriceBonus: 0,
            prestigeBonusMultiplier: 0,
            globalLuckBonus: 0,
            
            // Ville
            storageCapacity: 0,
            buildingCostReduction: 0,
            autoSellTaxReduction: 0,
            autoSellThreshold: 0,
            maxBuildingLevel: 50, // Valeur par défaut
            
            // Endgame
            unlockPrestige: false,
            globalMultiplier: 0,
            offlineProduction: 0,
            removeLevelCap: false,
            autoProgression: false,
            transcendenceMultiplier: 1.0
        };
    }

    /**
     * Vérifier si une recherche est disponible à l'achat
     */
    canPurchase(researchId) {
        const research = this.getResearchById(researchId);
        if (!research) return { canBuy: false, reason: 'Recherche introuvable' };
        
        // Déjà débloquée ?
        if (this.isUnlocked(researchId)) {
            return { canBuy: false, reason: 'Déjà recherchée' };
        }
        
        // Vérifier les prérequis
        if (research.requires && research.requires.length > 0) {
            for (const reqId of research.requires) {
                if (!this.isUnlocked(reqId)) {
                    const reqResearch = this.getResearchById(reqId);
                    return { 
                        canBuy: false, 
                        reason: `Requiert: ${reqResearch ? reqResearch.name : reqId}` 
                    };
                }
            }
        }
        
        // Vérifier les ressources
        const cost = research.cost;
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') {
                if (this.game.player.resources.gold < amount) {
                    return { canBuy: false, reason: `Or insuffisant (${amount} requis)` };
                }
            } else {
                const playerAmount = this.game.professionManager.getInventoryAmount(resourceId);
                if (playerAmount < amount) {
                    return { canBuy: false, reason: `Ressources insuffisantes` };
                }
            }
        }
        
        return { canBuy: true };
    }

    /**
     * Acheter une recherche
     */
    purchase(researchId) {
        const checkResult = this.canPurchase(researchId);
        if (!checkResult.canBuy) {
            if (this.game.ui) {
                this.game.ui.createNotification(`❌ ${checkResult.reason}`, 'error');
            }
            return false;
        }
        
        const research = this.getResearchById(researchId);
        
        // Déduire les coûts
        const cost = research.cost;
        for (const [resourceId, amount] of Object.entries(cost)) {
            if (resourceId === 'gold') {
                this.game.player.resources.gold -= amount;
            } else {
                this.game.professionManager.removeFromInventory(resourceId, amount);
            }
        }
        
        // Débloquer la recherche
        this.unlockedResearches.add(researchId);
        
        // Recalculer les effets
        this.recalculateEffects();
        
        // Notification
        if (this.game.ui) {
            this.game.ui.createNotification(
                `🔬 ${research.icon} ${research.name} recherché !`,
                'success',
                3000
            );
        }
        
        // Sauvegarder
        this.game.save();
        
        // Rafraîchir l'UI
        if (this.game.ui) {
            this.game.ui.updateResearchTab();
        }
        
        return true;
    }

    /**
     * Vérifier si une recherche est débloquée
     */
    isUnlocked(researchId) {
        return this.unlockedResearches.has(researchId);
    }

    /**
     * Obtenir une recherche par son ID
     */
    getResearchById(researchId) {
        for (const category of Object.values(window.ResearchData)) {
            const found = category.find(r => r.id === researchId);
            if (found) return found;
        }
        return null;
    }

    /**
     * Recalculer tous les effets actifs
     */
    recalculateEffects() {
        // Réinitialiser
        const baseEffects = {
            gatherSpeed: 0,
            autoGatherSpeed: 0,
            doubleDropBonus: 0,
            resourceYield: 0,
            buildingProduction: 0,
            craftingSpeed: 0,
            craftingCostReduction: 0,
            qualityCraftBonus: 0,
            passiveClickBonus: 0,
            combatDamage: 0,
            combatDefense: 0,
            maxHealth: 0,
            healthRegen: 0,
            critChance: 0,
            dungeonLootBonus: 0,
            dodgeChance: 0,
            lifesteal: 0,
            berserkerRage: 0,
            xpBonus: 0,
            rareDropBonus: 0,
            gemDropBonus: 0,
            unlockLevelReduction: 0,
            questRewardBonus: 0,
            sellPriceBonus: 0,
            prestigeBonusMultiplier: 0,
            globalLuckBonus: 0,
            storageCapacity: 0,
            buildingCostReduction: 0,
            autoSellTaxReduction: 0,
            autoSellThreshold: 0,
            maxBuildingLevel: 50,
            unlockPrestige: false,
            globalMultiplier: 0,
            offlineProduction: 0,
            removeLevelCap: false,
            autoProgression: false,
            transcendenceMultiplier: 1.0
        };
        
        // Cumuler les effets de toutes les recherches débloquées
        for (const researchId of this.unlockedResearches) {
            const research = this.getResearchById(researchId);
            if (!research) continue;
            
            for (const [effectKey, effectValue] of Object.entries(research.effect)) {
                if (typeof effectValue === 'boolean') {
                    baseEffects[effectKey] = effectValue;
                } else if (effectKey === 'maxBuildingLevel') {
                    baseEffects[effectKey] = Math.max(baseEffects[effectKey], effectValue);
                } else if (effectKey === 'transcendenceMultiplier') {
                    baseEffects[effectKey] *= effectValue;
                } else {
                    baseEffects[effectKey] += effectValue;
                }
            }
        }
        
        // Appliquer le multiplicateur global à tout
        if (baseEffects.globalMultiplier > 0) {
            const mult = baseEffects.globalMultiplier;
            baseEffects.gatherSpeed += mult;
            baseEffects.autoGatherSpeed += mult;
            baseEffects.resourceYield += mult;
            baseEffects.buildingProduction += mult;
            baseEffects.combatDamage += mult;
            baseEffects.combatDefense += mult;
            baseEffects.xpBonus += mult;
            baseEffects.doubleDropBonus += mult;
        }
        
        // Appliquer transcendence (×2 tout)
        if (baseEffects.transcendenceMultiplier > 1) {
            const mult = baseEffects.transcendenceMultiplier - 1;
            for (const key of Object.keys(baseEffects)) {
                if (typeof baseEffects[key] === 'number' && key !== 'transcendenceMultiplier') {
                    baseEffects[key] += baseEffects[key] * mult;
                }
            }
        }
        
        this.effects = baseEffects;
    }

    /**
     * Obtenir toutes les recherches d'une catégorie avec leur statut
     */
    getResearchesByCategory(category) {
        const categoryData = window.ResearchData[category] || [];
        
        return categoryData.map(research => ({
            ...research,
            unlocked: this.isUnlocked(research.id),
            canPurchase: this.canPurchase(research.id)
        }));
    }

    /**
     * Obtenir les statistiques de progression
     */
    getStats() {
        let totalResearches = 0;
        let unlockedCount = this.unlockedResearches.size;
        
        for (const category of Object.values(window.ResearchData)) {
            totalResearches += category.length;
        }
        
        return {
            unlocked: unlockedCount,
            total: totalResearches,
            percentage: Math.floor((unlockedCount / totalResearches) * 100)
        };
    }

    /**
     * Sérialisation pour sauvegarde
     */
    toJSON() {
        return {
            unlockedResearches: Array.from(this.unlockedResearches)
        };
    }

    /**
     * Désérialisation depuis sauvegarde
     */
    fromJSON(data) {
        if (data.unlockedResearches) {
            this.unlockedResearches = new Set(data.unlockedResearches);
            this.recalculateEffects();
        }
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.ResearchManager = ResearchManager;
}
