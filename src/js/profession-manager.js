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
            miner: { enabled: false, unlocked: false }
        };
        this.autoGatherInterval = 5000; // 5 secondes entre chaque récolte auto
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

        // Alchimiste (conversion ressources T1→T2→T3...)
        this.professions.set('alchemy', new Profession(
            'alchemy',
            'Alchimiste',
            null, // Pas de ressource directe (conversions uniquement)
            0 // XP gagné par conversion
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
            
            // Ajouter la ressource à l'inventaire
            this.addToInventory(result.resourceId, 1);

            if (GameConfig.DEBUG.enabled) {
            }
        }

        return result;
    }

    /**
     * Tenter un drop de gemme (pour le mineur)
     */
    tryGemDrop() {
        const gems = window.ResourcesData.gems || [];
        
        for (const gem of gems) {
            const roll = Math.random();
            if (roll <= gem.dropRate) {
                this.addToInventory(gem.id, 1);
                
                if (GameConfig.DEBUG.enabled) {
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
     * Ajouter une ressource à l'inventaire
     */
    addToInventory(resourceId, amount = 1) {
        const current = this.inventory.get(resourceId) || 0;
        this.inventory.set(resourceId, current + amount);
        
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
        if (resourceId.startsWith('gem_')) return 'gems'; // Avec un S !
        if (resourceId.startsWith('loot_')) return 'loot';
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
        
        // Créer le nouvel interval
        this.autoGatherIntervals[professionId] = setInterval(() => {
            this.clickProfession(professionId);
            if (window.game && window.game.ui) {
                window.game.ui.updateProfessions();
                window.game.ui.updateInventory();
            }
        }, this.autoGatherInterval);
        

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
            this.autoGatherState = data.autoGatherState;
            
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
