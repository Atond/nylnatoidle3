/**
 * Classe ProfessionManager
 * Gère tous les métiers de récolte
 */

class ProfessionManager {
    constructor() {
        this.professions = new Map();
        this.inventory = new Map(); // Inventaire des ressources
        this.autoGatherState = {
            woodcutter: { enabled: false, unlocked: false },
            miner: { enabled: false, unlocked: false },
            herbalist: { enabled: false, unlocked: false },
            fisher: { enabled: false, unlocked: false }
        };
        this.autoGatherInterval = 5000; // 5 secondes entre chaque récolte auto (sauf pêcheur)
        this.fisherGatherInterval = 5000; // 5 secondes pour le pêcheur (plus lent)
        this.autoGatherIntervals = {}; // Stocke les intervalles pour chaque métier
        
        this.initProfessions();
    }

    /**
     * Initialiser les métiers
     */
    initProfessions() {
        // ========== MÉTIERS DE RÉCOLTE ==========
        
        // Bûcheron
        this.professions.set('woodcutter', new Profession(
            'woodcutter',
            'Bûcheron',
            'wood',
            10 // XP par clic
        ));

        // Mineur
        this.professions.set('miner', new Profession(
            'miner',
            'Mineur',
            'ore',
            10 // XP par clic
        ));

        // Herboriste
        this.professions.set('herbalist', new Profession(
            'herbalist',
            'Herboriste',
            'plants',
            10 // XP par clic
        ));

        // Pêcheur
        this.professions.set('fisher', new Profession(
            'fisher',
            'Pêcheur',
            'fish',
            15 // XP par clic (plus lent donc plus d'XP)
        ));

        // ========== MÉTIERS DE FABRICATION ==========
        
        // Forgeron (craft armes)
        this.professions.set('blacksmith', new Profession(
            'blacksmith',
            'Forgeron',
            null, // Pas de ressource directe (craft uniquement)
            0 // Pas d'XP par clic (XP gagné en craftant)
        ));

        // Armurier (craft armures)
        this.professions.set('armorsmith', new Profession(
            'armorsmith',
            'Armurier',
            null,
            0
        ));

        // Bijoutier (craft accessoires)
        this.professions.set('jeweler', new Profession(
            'jeweler',
            'Bijoutier',
            null,
            0
        ));

        // Alchimiste (potions et buffs depuis plantes)
        this.professions.set('alchemist', new Profession(
            'alchemist',
            'Alchimiste',
            null, // Pas de ressource directe (craft potions)
            0 // XP gagné par craft
        ));

        // Poissonier (plats cuisinés depuis poissons)
        this.professions.set('fishmonger', new Profession(
            'fishmonger',
            'Poissonier',
            null, // Pas de ressource directe (craft plats)
            0 // XP gagné par craft
        ));

        // Tailleur (vêtements et sacs depuis fibres)
        this.professions.set('tailor', new Profession(
            'tailor',
            'Tailleur',
            null, // Pas de ressource directe (craft équipements)
            0 // XP gagné par craft
        ));

        // Transmutation (conversion ressources T1→T2→T3...) - Anciennement "Alchimie"
        this.professions.set('transmutation', new Profession(
            'transmutation',
            'Transmutation',
            null, // Pas de ressource directe (conversions uniquement)
            0 // XP gagné par conversion
        ));

        // Tanneur (traitement de peaux brutes en cuir)
        this.professions.set('tanner', new Profession(
            'tanner',
            'Tanneur',
            null, // Pas de ressource directe (traitement uniquement)
            0 // XP gagné par craft de cuir
        ));

        if (GameConfig.DEBUG.enabled) {
            console.log('✅ Métiers initialisés:', Array.from(this.professions.keys()));
        }
    }

    /**
     * Obtenir un métier
     */
    getProfession(professionId) {
        return this.professions.get(professionId);
    }

    /**
     * Cliquer sur un métier (récolter)
     */
    clickProfession(professionId, game = null) {
        const profession = this.getProfession(professionId);
        if (!profession) {
            return null;
        }

        const result = profession.click();
        
        // Chance de gemme si mineur (à CHAQUE clic, peu importe le drop de minerai)
        if (professionId === 'miner') {
            this.tryGemDrop();
        }
        
        if (result) {
            // Vérifier si le stockage est plein (si game disponible)
            if (game && game.storageManager && game.storageManager.isFull(result.resourceId)) {
                if (GameConfig.DEBUG.enabled) {
                    console.log(`⚠️ Stockage plein pour ${result.resourceId}, récolte bloquée`);
                }
                return { ...result, storageFull: true };
            }
            
            // 🆕 BONUS: Calculer chance de double drop
            let amountToAdd = 1;
            let passiveBonus = 0;
            const gatheringProfessions = ['woodcutter', 'miner', 'herbalist', 'fisher'];
            if (gatheringProfessions.includes(professionId)) {
                const bonuses = this.getGatheringBonuses(professionId, profession.level);
                
                // Chance de drop double
                if (Math.random() * 100 < bonuses.doubleDropChance) {
                    amountToAdd = 2;
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`✨ Double drop ! (${bonuses.doubleDropChance}% chance)`);
                    }
                }
                
                // 🎉 NOUVEAU: Bonus passif au niveau 50+
                passiveBonus = this.getPassiveClickBonus(professionId, profession.level);
                if (passiveBonus > 0) {
                    // Ajouter le bonus passif au total
                    amountToAdd += passiveBonus;
                    
                    // 🎊 Message spécial si premier déblocage niveau 50
                    if (!profession.passiveBonusUnlocked) {
                        profession.passiveBonusUnlocked = true;
                        if (game && game.ui) {
                            game.ui.createNotification(
                                `🎉 BONUS PASSIF DÉBLOQUÉ ! Niveau 50 ${professionId} : +${passiveBonus} par clic`,
                                'success',
                                5000
                            );
                        }
                    }
                    
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`🌟 Bonus passif niveau 50: +${passiveBonus} ressources`);
                    }
                }
            }
            
            // Ajouter la ressource à l'inventaire
            this.addToInventory(result.resourceId, amountToAdd);

            if (GameConfig.DEBUG.enabled) {
            }
        }

        return result;
    }

    /**
     * Tenter un drop de gemme (pour le mineur)
     * NOUVELLE LOGIQUE : Vérifier unlockLevel + drop rates réduits
     */
    tryGemDrop() {
        const gems = window.ResourcesData.gems || [];
        const minerProfession = this.professions.get('miner');
        
        if (!minerProfession) return;
        
        // 🆕 BONUS: Appliquer le bonus de chance gemme
        const bonuses = this.getGatheringBonuses('miner', minerProfession.level);
        const gemBonusMultiplier = 1 + (bonuses.gemBonus / 100); // 1.0 à 2.0 (niveau 50 = +100%)
        
        // Filtrer uniquement les gemmes débloquées selon le niveau de mineur
        const availableGems = gems.filter(gem => gem.unlockLevel <= minerProfession.level);
        
        for (const gem of availableGems) {
            // Appliquer le bonus à la drop rate
            const adjustedDropRate = gem.dropRate * gemBonusMultiplier;
            const roll = Math.random();
            
            if (roll <= adjustedDropRate) {
                this.addToInventory(gem.id, 1);
                
                if (GameConfig.DEBUG.enabled) {
                    console.log(`💎 Gemme drop: ${gem.name} (${(adjustedDropRate * 100).toFixed(2)}% avec bonus ${bonuses.gemBonus}%)`);
                }
                
                // Notification
                if (window.game && window.game.ui) {
                    window.game.ui.showNotification(
                        `💎 ${gem.name} trouvée !`,
                        'legendary'
                    );
                }
                
                // Seulement 1 gemme par clic max
                break;
            }
        }
    }

    /**
     * Ajouter une ressource à l'inventaire (avec vérification des limites)
     */
    addToInventory(resourceId, amount = 1) {
        if (amount <= 0) return 0;
        
        // ✅ FIX: Normaliser l'ID de ressource pour les drops sans préfixe
        // Si resourceId='plumes_sombres' et que dans resources-data.js c'est 'loot_plumes_sombres',
        // on doit utiliser l'ID correct pour que l'UI puisse l'afficher
        let normalizedId = resourceId;
        const resourceData = this.getResourceData(resourceId);
        if (resourceData && resourceData.id !== resourceId) {
            // La ressource existe mais avec un ID différent (probablement avec préfixe loot_)
            normalizedId = resourceData.id;
        }
        
        const current = this.inventory.get(normalizedId) || 0;
        
        // 🛡️ PROTECTION: Vérifier les limites de stockage
        if (window.game && window.game.storageManager) {
            const limit = window.game.storageManager.getLimit(normalizedId);
            const spaceAvailable = Math.max(0, limit - current);
            
            // Limiter la quantité ajoutée à l'espace disponible
            amount = Math.min(amount, spaceAvailable);
            
            if (amount <= 0) {
                if (GameConfig.DEBUG.enabled) {
                    console.log(`⚠️ Stockage plein pour ${normalizedId}, ajout bloqué`);
                }
                return 0;
            }
        }
        
        this.inventory.set(normalizedId, current + amount);
        
        // Mettre à jour les quêtes de collecte (si disponible)
        if (window.game && window.game.questManager) {
            // Déterminer le type de ressource
            const resourceType = this.getResourceType(resourceId);
            const resourceData = this.getResourceData(resourceId);
            
            if (resourceData) {
                window.game.questManager.updateCollectQuest(
                    resourceType,
                    resourceData.name,
                    amount
                );
            }
        }
    }

    /**
     * Retirer des ressources de l'inventaire
     */
    removeFromInventory(resourceId, amount = 1) {
        const current = this.inventory.get(resourceId) || 0;
        const newAmount = Math.max(0, current - amount);
        this.inventory.set(resourceId, newAmount);
        
        if (GameConfig.DEBUG.enabled) {
        }
    }

    /**
     * Obtenir la quantité d'une ressource
     */
    getInventoryAmount(resourceId) {
        return this.inventory.get(resourceId) || 0;
    }

    /**
     * Obtenir tout l'inventaire
     */
    getInventory() {
        return Array.from(this.inventory.entries()).map(([id, amount]) => ({
            resourceId: id,
            amount: amount,
            data: this.getResourceData(id)
        }));
    }

    /**
     * Déterminer le type de ressource (wood, ore, gems, loot)
     */
    getResourceType(resourceId) {
        if (resourceId.startsWith('wood_')) return 'wood';
        if (resourceId.startsWith('ore_')) return 'ore';
        if (resourceId.startsWith('plant_')) return 'plants';
        if (resourceId.startsWith('fish_')) return 'fish';
        if (resourceId.startsWith('gem_')) return 'gems';
        if (resourceId.startsWith('loot_')) return 'loot';
        
        // ✅ FIX: Les loots de combat sans préfixe (monster_hide, monster_fang, robust_hide, etc.)
        if (resourceId.startsWith('monster_') || resourceId.startsWith('robust_')) return 'loot';
        
        // ✅ FIX: Les cuirs traités par le Tanneur (fabric_simple_leather, fabric_tanned_leather)
        if (resourceId.startsWith('fabric_')) return 'fabrics';
        
        // ✅ FIX COMPLET: TOUS les drops de combat sans préfixe
        // Beaucoup de drops dans drops-data.js utilisent des IDs sans préfixe (plumes_sombres, essence_vegetale_instable, etc.)
        // Au lieu de lister ~80+ IDs manuellement, on vérifie si l'ID existe dans DropsData
        if (typeof window !== 'undefined' && window.DropsData && window.DropsData.getDrop) {
            const dropData = window.DropsData.getDrop(resourceId);
            if (dropData && dropData.type === 'resource') {
                return 'loot';
            }
        }
        
        return 'unknown';
    }

    /**
     * Obtenir les données d'une ressource
     */
    getResourceData(resourceId) {
        const type = this.getResourceType(resourceId);
        
        // Pour le loot, utiliser findResourceById car les IDs sont différents
        if (type === 'loot' && window.findResourceById) {
            return window.findResourceById(resourceId);
        }
        
        const resources = window.ResourcesData[type] || [];
        return resources.find(r => r.id === resourceId);
    }

    /**
     * Débloquer l'auto-récolte pour un métier (coûte 50 bois + 50 fer)
     */
    unlockAutoGather(professionId) {
        const woodAmount = this.getInventoryAmount('wood_oak');
        const oreAmount = this.getInventoryAmount('ore_iron');
        
        if (woodAmount >= 50 && oreAmount >= 50) {
            // Consommer les ressources
            this.inventory.set('wood_oak', woodAmount - 50);
            this.inventory.set('ore_iron', oreAmount - 50);
            
            // Débloquer
            this.autoGatherState[professionId].unlocked = true;
            
            if (window.game && window.game.ui) {
                window.game.ui.showNotification(`✅ Auto-récolte ${professionId === 'woodcutter' ? 'Bûcheron' : 'Mineur'} débloquée !`, 'success');
            }
            
            return true;
        } else {
            if (window.game && window.game.ui) {
                window.game.ui.showNotification(`❌ Ressources insuffisantes (besoin: 50🪵 50⚒️)`, 'error');
            }
            return false;
        }
    }

    /**
     * Toggle l'auto-récolte pour un métier
     */
    toggleAutoGather(professionId) {
        const state = this.autoGatherState[professionId];
        
        if (!state.unlocked) {
            // Tenter de débloquer
            return this.unlockAutoGather(professionId);
        }
        
        // Toggle enabled
        state.enabled = !state.enabled;
        
        if (state.enabled) {
            // Démarrer l'auto-récolte
            this.startAutoGather(professionId);
        } else {
            // Arrêter l'auto-récolte
            this.stopAutoGather(professionId);
        }
        
        return true;
    }

    /**
     * Démarrer l'auto-récolte pour un métier
     */
    startAutoGather(professionId) {
        // Arrêter l'ancien interval si existe
        this.stopAutoGather(professionId);
        
        // 🆕 BONUS: Calculer la vitesse ajustée selon le niveau
        const profession = this.getProfession(professionId);
        const bonuses = this.getGatheringBonuses(professionId, profession.level);
        
        // Intervalle de base selon le métier
        const baseInterval = professionId === 'fisher' ? this.fisherGatherInterval : this.autoGatherInterval;
        
        // Appliquer la réduction de vitesse (max 80% = 5000ms → 1000ms)
        const speedReduction = bonuses.autoGatherSpeed / 100; // 0.0 à 0.8
        const adjustedInterval = Math.max(1000, baseInterval * (1 - speedReduction));
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`⚡ Auto-gather ${professionId}: ${baseInterval}ms → ${adjustedInterval}ms (-${bonuses.autoGatherSpeed}%)`);
        }
        
        // Créer le nouvel interval
        this.autoGatherIntervals[professionId] = setInterval(() => {
            this.clickProfession(professionId);
            if (window.game && window.game.ui) {
                window.game.ui.updateProfessions();
                window.game.ui.updateInventory();
            }
        }, adjustedInterval);
    }

    /**
     * Arrêter l'auto-récolte pour un métier
     */
    stopAutoGather(professionId) {
        if (this.autoGatherIntervals[professionId]) {
            clearInterval(this.autoGatherIntervals[professionId]);
            delete this.autoGatherIntervals[professionId];

        }
    }

    /**
     * 🆕 Calculer les bonus de récolte selon le niveau
     * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
     * @param {number} level - Niveau du métier
     * @returns {object} Bonus calculés
     */
    getGatheringBonuses(professionId, level) {
        const bonuses = {
            autoGatherSpeed: 0,       // Réduction intervalle auto-gather (%)
            doubleDropChance: 0,      // Chance de drop ×2 (%)
            storageEfficiency: 0,     // Bonus capacité stockage (%)
            qualityBonus: 0,          // Chance ressource qualité supérieure (%)
            gemBonus: 0               // Bonus chance gemme (mineur uniquement) (%)
        };

        // Scaling linéaire : 1.6% par niveau
        const speedReduction = Math.min(80, level * 1.6);  // Max 80% au niveau 50
        const doubleChance = Math.min(50, level * 1.0);    // Max 50% au niveau 50
        const storageBonus = Math.min(100, level * 2.0);   // Max 100% au niveau 50
        const quality = Math.min(50, level * 1.0);         // Max 50% au niveau 50
        
        bonuses.autoGatherSpeed = speedReduction;
        bonuses.doubleDropChance = doubleChance;
        bonuses.storageEfficiency = storageBonus;
        bonuses.qualityBonus = quality;
        
        // Bonus spécial mineur : +100% chance gemme niveau 50
        if (professionId === 'miner') {
            bonuses.gemBonus = Math.min(100, level * 2.0);
        }
        
        return bonuses;
    }

    /**
     * 🆕 Calculer le bonus de clic passif (niveau 50+)
     * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
     * @param {number} level - Niveau du métier
     * @returns {number} Ressources bonus par clic
     */
    getPassiveClickBonus(professionId, level) {
        // 🔒 DÉBLOCAGE : Niveau 50 requis
        if (level < 50) return 0;
        
        const buildingProduction = this.getBuildingProductionPerMin(professionId);
        if (!buildingProduction || buildingProduction === 0) return 0;
        
        // Bonus fixe de 5% production passive
        const bonusPercent = 5.0;
        const productionPerSecond = buildingProduction / 60;
        return Math.floor(productionPerSecond * (bonusPercent / 100));
    }

    /**
     * 🆕 Obtient la production passive par minute pour un métier
     * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
     * @returns {number} Production par minute
     */
    getBuildingProductionPerMin(professionId) {
        const buildingMap = {
            woodcutter: 'sawmill',
            miner: 'quarry',
            herbalist: 'greenhouse',
            fisher: 'fishery'
        };
        
        const buildingId = buildingMap[professionId];
        if (!buildingId) return 0;
        
        // Vérifier que le game existe
        if (!window.game || !window.game.buildingManager) return 0;
        
        const building = window.game.buildingManager.buildings.get(buildingId);
        if (!building || building.level === 0) return 0;
        
        // Production = baseProduction × level
        const baseProduction = building.baseProduction || 0;
        return baseProduction * building.level;
    }

    /**
     * Sérialisation pour sauvegarde
     */
    toJSON() {
        const professionsData = {};
        for (const [id, profession] of this.professions) {
            professionsData[id] = profession.toJSON();
        }

        return {
            professions: professionsData,
            inventory: Array.from(this.inventory.entries()),
            autoGatherState: this.autoGatherState
        };
    }

    /**
     * Désérialisation depuis sauvegarde
     */
    fromJSON(data) {
        if (data.professions) {
            for (const [id, professionData] of Object.entries(data.professions)) {
                const profession = this.professions.get(id);
                if (profession) {
                    profession.fromJSON(professionData);
                }
            }
        }

        if (data.inventory) {
            this.inventory = new Map(data.inventory);
        }

        if (data.autoGatherState) {
            // 🛡️ PROTECTION: Fusionner avec l'état par défaut pour les nouvelles professions
            // Cela garantit que herbalist et fisher existent même dans les anciennes sauvegardes
            this.autoGatherState = {
                woodcutter: data.autoGatherState.woodcutter || { enabled: false, unlocked: false },
                miner: data.autoGatherState.miner || { enabled: false, unlocked: false },
                herbalist: data.autoGatherState.herbalist || { enabled: false, unlocked: false },
                fisher: data.autoGatherState.fisher || { enabled: false, unlocked: false }
            };
            
            // Redémarrer les auto-récoltes actives
            for (const [profId, state] of Object.entries(this.autoGatherState)) {
                if (state.enabled) {
                    this.startAutoGather(profId);
                }
            }
        }
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.ProfessionManager = ProfessionManager;
}
