/**
 * 📦 SHARED STORAGE - Coffre partagé entre tous les personnages
 * 
 * Permet de transférer ressources, or et équipement entre Main et Alts
 */

class SharedStorage {
    constructor() {
        this.resources = {}; // { 'wood_oak': 1200, 'ore_iron': 800, ... }
        this.gold = 0;
        this.equipment = []; // Array d'équipement stocké
        this.capacity = 5000; // Nombre max de slots
        this.usedSlots = 0;
    }
    
    /**
     * Ajouter une ressource
     */
    addResource(resourceId, amount) {
        if (this.usedSlots + amount > this.capacity) {
            return {
                success: false,
                message: `❌ Coffre plein ! (${this.usedSlots}/${this.capacity})`
            };
        }
        
        if (!this.resources[resourceId]) {
            this.resources[resourceId] = 0;
        }
        
        this.resources[resourceId] += amount;
        this.usedSlots += amount;
        
        return {
            success: true,
            message: `✅ +${amount} ${resourceId} ajouté au coffre partagé`
        };
    }
    
    /**
     * Retirer une ressource
     */
    withdrawResource(resourceId, amount) {
        if (!this.resources[resourceId] || this.resources[resourceId] < amount) {
            return {
                success: false,
                message: `❌ Pas assez de ${resourceId} dans le coffre`
            };
        }
        
        this.resources[resourceId] -= amount;
        this.usedSlots -= amount;
        
        if (this.resources[resourceId] === 0) {
            delete this.resources[resourceId];
        }
        
        return {
            success: true,
            message: `✅ ${amount} ${resourceId} retiré du coffre`,
            amount: amount
        };
    }
    
    /**
     * Ajouter de l'or
     */
    addGold(amount) {
        this.gold += amount;
        return {
            success: true,
            message: `✅ +${amount} or ajouté au coffre partagé`
        };
    }
    
    /**
     * Retirer de l'or
     */
    withdrawGold(amount) {
        if (this.gold < amount) {
            return {
                success: false,
                message: `❌ Pas assez d'or dans le coffre (${this.gold} disponible)`
            };
        }
        
        this.gold -= amount;
        
        return {
            success: true,
            message: `✅ ${amount} or retiré du coffre`,
            amount: amount
        };
    }
    
    /**
     * Ajouter un équipement
     */
    addEquipment(equipment) {
        if (this.usedSlots >= this.capacity) {
            return {
                success: false,
                message: `❌ Coffre plein ! (${this.usedSlots}/${this.capacity})`
            };
        }
        
        this.equipment.push(equipment);
        this.usedSlots++;
        
        return {
            success: true,
            message: `✅ ${equipment.name} ajouté au coffre partagé`
        };
    }
    
    /**
     * Retirer un équipement
     */
    withdrawEquipment(equipmentId) {
        const index = this.equipment.findIndex(e => e.id === equipmentId);
        
        if (index === -1) {
            return {
                success: false,
                message: `❌ Équipement non trouvé dans le coffre`
            };
        }
        
        const equipment = this.equipment.splice(index, 1)[0];
        this.usedSlots--;
        
        return {
            success: true,
            message: `✅ ${equipment.name} retiré du coffre`,
            equipment: equipment
        };
    }
    
    /**
     * Obtenir un équipement par ID
     */
    getEquipment(equipmentId) {
        return this.equipment.find(e => e.id === equipmentId);
    }
    
    /**
     * Obtenir tous les équipements
     */
    getAllEquipment() {
        return [...this.equipment];
    }
    
    /**
     * Obtenir toutes les ressources
     */
    getAllResources() {
        return { ...this.resources };
    }
    
    /**
     * Obtenir le nombre d'une ressource
     */
    getResourceAmount(resourceId) {
        return this.resources[resourceId] || 0;
    }
    
    /**
     * Vérifier si capacité suffisante
     */
    hasCapacity(slotsNeeded) {
        return (this.usedSlots + slotsNeeded) <= this.capacity;
    }
    
    /**
     * Augmenter la capacité
     */
    upgradeCapacity(amount) {
        this.capacity += amount;
        return {
            success: true,
            message: `✅ Capacité du coffre augmentée à ${this.capacity} slots`
        };
    }
    
    /**
     * Sauvegarder
     */
    save() {
        return {
            resources: this.resources,
            gold: this.gold,
            equipment: this.equipment,
            capacity: this.capacity,
            usedSlots: this.usedSlots
        };
    }
    
    /**
     * Charger
     */
    load(data) {
        if (!data) return;
        
        this.resources = data.resources || {};
        this.gold = data.gold || 0;
        this.equipment = data.equipment || [];
        this.capacity = data.capacity || 5000;
        this.usedSlots = data.usedSlots || 0;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.SharedStorage = SharedStorage;
}
