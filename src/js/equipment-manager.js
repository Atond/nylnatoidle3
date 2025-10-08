/**
 * EquipmentManager - Gère l'équipement du joueur et l'inventaire d'équipement
 */
class EquipmentManager {
    constructor(game) {
        this.game = game;
        
        // Équipement actuellement porté (Map: slot -> Equipment)
        this.equipped = new Map();
        
        // Inventaire d'équipement (Array de Equipment)
        this.inventory = [];
        
        // Stats totales de l'équipement
        this.totalStats = this.calculateTotalStats();
    }
    
    /**
     * Équipe un objet dans un slot
     */
    equip(equipment) {
        const slot = equipment.slot;
        
        // Vérifier le niveau requis
        const playerLevel = this.game.player.level;
        if (playerLevel < equipment.requiredLevel) {
            this.game.ui.showNotification(`Niveau ${equipment.requiredLevel} requis !`, 'error');
            return false;
        }
        
        // Déséquiper l'ancien équipement s'il existe
        if (this.equipped.has(slot)) {
            const oldEquipment = this.equipped.get(slot);
            this.inventory.push(oldEquipment);
        }
        
        // Équiper le nouvel équipement
        this.equipped.set(slot, equipment);
        
        // Retirer de l'inventaire
        const index = this.inventory.findIndex(e => e.id === equipment.id);
        if (index !== -1) {
            this.inventory.splice(index, 1);
        }
        
        // Recalculer les stats
        this.totalStats = this.calculateTotalStats();
        
        // Notification
        this.game.ui.showNotification(`${equipment.icon} ${equipment.name} équipé !`, 'success');
        
        return true;
    }
    
    /**
     * Déséquipe un objet d'un slot
     */
    unequip(slot) {
        if (!this.equipped.has(slot)) {
            return false;
        }
        
        const equipment = this.equipped.get(slot);
        this.equipped.delete(slot);
        this.inventory.push(equipment);
        
        // Recalculer les stats
        this.totalStats = this.calculateTotalStats();
        
        // Notification
        this.game.ui.showNotification(`${equipment.icon} ${equipment.name} retiré`, 'info');
        
        return true;
    }
    
    /**
     * Ajoute un équipement à l'inventaire
     */
    addToInventory(equipment) {
        this.inventory.push(equipment);
        // Notification supprimée : déjà affichée dans crafting-manager avec détails qualité/rareté
    }
    
    /**
     * Calcule les stats totales de l'équipement porté
     */
    calculateTotalStats() {
        const total = {
            force: 0,
            agility: 0,
            intelligence: 0,
            wisdom: 0,
            endurance: 0,
            damage: 0,
            defense: 0,
            professionXP: 0,
            dropRate: 0
        };
        
        for (const equipment of this.equipped.values()) {
            total.force += equipment.stats.force || 0;
            total.agility += equipment.stats.agility || 0;
            total.intelligence += equipment.stats.intelligence || 0;
            total.wisdom += equipment.stats.wisdom || 0;
            total.endurance += equipment.stats.endurance || 0;
            total.damage += equipment.stats.damage || 0;
            total.defense += equipment.stats.defense || 0;
            total.professionXP += equipment.stats.professionXP || 0;
            total.dropRate += equipment.stats.dropRate || 0;
        }
        
        return total;
    }
    
    /**
     * Obtient l'équipement d'un slot
     */
    getEquipped(slot) {
        return this.equipped.get(slot) || null;
    }
    
    /**
     * Obtient tous les équipements portés
     */
    getAllEquipped() {
        return Array.from(this.equipped.entries()).map(([slot, equipment]) => ({
            slot,
            equipment
        }));
    }
    
    /**
     * Obtient l'inventaire d'équipement
     */
    getInventory() {
        return [...this.inventory];
    }
    
    /**
     * Obtient les stats totales
     */
    getTotalStats() {
        return { ...this.totalStats };
    }
    
    /**
     * Verrouille/déverrouille un équipement
     */
    toggleLock(equipmentId) {
        const equipment = this.inventory.find(e => e.id === equipmentId);
        if (equipment) {
            equipment.locked = !equipment.locked;
            return equipment.locked;
        }
        return false;
    }

    /**
     * Calcule le prix de vente d'un équipement
     */
    calculateSellPrice(equipment) {
        const rarityValues = {
            'common': 10,
            'uncommon': 25,
            'rare': 50,
            'epic': 100,
            'legendary': 250,
            'mythic': 500,
            'divine': 1000
        };
        
        const baseValue = rarityValues[equipment.rarity] || 10;
        const levelBonus = equipment.requiredLevel * 2;
        const qualityMultiplier = equipment.qualityMultiplier || 1.0;
        
        return Math.floor((baseValue + levelBonus) * qualityMultiplier);
    }

    /**
     * Analyse l'inventaire pour la vente
     * @returns {Object} Statistiques de vente
     */
    analyzeInventoryForSale(includeQuality = null) {
        const stats = {
            normal: { count: 0, gold: 0, items: [] },
            superior: { count: 0, gold: 0, items: [] },
            exceptional: { count: 0, gold: 0, items: [] },
            perfect: { count: 0, gold: 0, items: [] },
            masterwork: { count: 0, gold: 0, items: [] },
            locked: { count: 0, gold: 0, items: [] }
        };

        for (const equipment of this.inventory) {
            if (equipment.locked) {
                stats.locked.count++;
                stats.locked.gold += this.calculateSellPrice(equipment);
                stats.locked.items.push(equipment);
                continue;
            }

            // Filtrer par qualité si spécifié
            if (includeQuality && equipment.quality !== includeQuality) {
                continue;
            }

            const quality = equipment.quality || 'normal';
            if (stats[quality]) {
                stats[quality].count++;
                stats[quality].gold += this.calculateSellPrice(equipment);
                stats[quality].items.push(equipment);
            }
        }

        return stats;
    }

    /**
     * Vend les équipements par qualité
     * @param {string} maxQuality - Qualité maximale à vendre (ex: 'superior' vend normal + superior)
     * @returns {Object} { count: nombre d'items vendus, gold: or gagné }
     */
    sellByQuality(maxQuality) {
        const qualityOrder = ['normal', 'superior', 'exceptional', 'perfect', 'masterwork'];
        const maxIndex = qualityOrder.indexOf(maxQuality);
        
        if (maxIndex === -1) return { count: 0, gold: 0 };

        let totalGold = 0;
        let count = 0;
        const itemsToKeep = [];

        for (const equipment of this.inventory) {
            // Ne jamais vendre les objets verrouillés
            if (equipment.locked) {
                itemsToKeep.push(equipment);
                continue;
            }

            const qualityIndex = qualityOrder.indexOf(equipment.quality || 'normal');
            
            if (qualityIndex <= maxIndex) {
                // Vendre cet objet
                totalGold += this.calculateSellPrice(equipment);
                count++;
            } else {
                // Garder cet objet
                itemsToKeep.push(equipment);
            }
        }

        // Mettre à jour l'inventaire
        this.inventory = itemsToKeep;

        // Ajouter l'or au joueur
        if (this.game && this.game.player) {
            this.game.player.resources.gold += totalGold;
        }

        return { count, gold: totalGold };
    }

    /**
     * Vend tout l'inventaire d'équipement (sauf verrouillés)
     * @returns {Object} { count: nombre d'items vendus, gold: or gagné }
     */
    sellAllInventory() {
        if (this.inventory.length === 0) {
            return { count: 0, gold: 0 };
        }

        let totalGold = 0;
        let count = 0;
        const itemsToKeep = [];

        for (const equipment of this.inventory) {
            // Ne jamais vendre les objets verrouillés
            if (equipment.locked) {
                itemsToKeep.push(equipment);
                continue;
            }

            totalGold += this.calculateSellPrice(equipment);
            count++;
        }

        // Mettre à jour l'inventaire
        this.inventory = itemsToKeep;

        // Ajouter l'or au joueur
        if (this.game && this.game.player) {
            this.game.player.resources.gold += totalGold;
        }

        return { count, gold: totalGold };
    }

    /**
     * Trie l'inventaire
     * @param {string} sortBy - 'quality', 'rarity', 'level', 'name'
     */
    sortInventory(sortBy = 'quality') {
        const qualityOrder = { masterwork: 5, perfect: 4, exceptional: 3, superior: 2, normal: 1 };
        const rarityOrder = { divine: 7, mythic: 6, legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };

        this.inventory.sort((a, b) => {
            // Les verrouillés toujours en premier
            if (a.locked && !b.locked) return -1;
            if (!a.locked && b.locked) return 1;

            switch (sortBy) {
                case 'quality':
                    return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
                case 'rarity':
                    return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
                case 'level':
                    return b.requiredLevel - a.requiredLevel;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
    }
    
    /**
     * Sérialise le manager
     */
    toJSON() {
        return {
            equipped: Array.from(this.equipped.entries()).map(([slot, equipment]) => ({
                slot,
                equipment: equipment.toJSON()
            })),
            inventory: this.inventory.map(e => e.toJSON())
        };
    }
    
    /**
     * Désérialise le manager
     */
    fromJSON(data) {
        if (!data) return;
        
        // Restaurer l'équipement porté
        this.equipped.clear();
        if (data.equipped) {
            for (const { slot, equipment } of data.equipped) {
                this.equipped.set(slot, Equipment.fromJSON(equipment));
            }
        }
        
        // Restaurer l'inventaire
        this.inventory = [];
        if (data.inventory) {
            this.inventory = data.inventory.map(e => Equipment.fromJSON(e));
        }
        
        // Recalculer les stats
        this.totalStats = this.calculateTotalStats();
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof window !== 'undefined') {
    window.EquipmentManager = EquipmentManager;
}
