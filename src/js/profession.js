/**
 * Classe Profession
 * Gère les métiers de récolte (Bûcheron, Mineur)
 */

class Profession {
    constructor(id, name, type, baseClickXp = 10) {
        this.id = id;               // 'woodcutter' ou 'miner'
        this.name = name;           // 'Bûcheron' ou 'Mineur'
        this.type = type;           // 'wood' ou 'ore'
        this.level = 1;
        this.xp = 0;
        this.baseClickXp = baseClickXp; // XP par clic de récolte
        
        // Ressource actuellement ciblée
        this.targetResource = null;
    }

    /**
     * Obtenir l'XP nécessaire pour le prochain niveau
     */
    getXpForNextLevel() {
        return Math.floor(100 * Math.pow(1.5, this.level - 1));
    }

    /**
     * Gagner de l'XP
     */
    gainXp(amount) {
        this.xp += amount;
        
        // Vérifier level up
        while (this.xp >= this.getXpForNextLevel()) {
            this.levelUp();
        }
    }

    /**
     * Level up du métier
     */
    levelUp() {
        const xpNeeded = this.getXpForNextLevel();
        this.xp -= xpNeeded;
        this.level++;
        
        // Notification
        if (window.game && window.game.ui) {
            window.game.ui.showNotification(
                `⭐ ${this.name} niveau ${this.level} !`,
                'success'
            );
            
            // Rafraîchir l'onglet crafting pour afficher les nouvelles recettes débloquées
            window.game.ui.updateCraftingTab();
        }
    }

    /**
     * Définir la ressource ciblée
     */
    setTargetResource(resourceId) {
        this.targetResource = resourceId;
    }

    /**
     * Effectuer un clic de récolte
     * Retourne la ressource récoltée ou null si échec
     */
    click() {

        // Si pas de ressource ciblée, prendre la première disponible
        if (!this.targetResource) {
            const resources = this.getAvailableResources();
            if (resources.length > 0) {
                this.targetResource = resources[0].id;
            } else {
                return null;
            }
        }

        // Récupérer la ressource
        const resource = this.getResourceData(this.targetResource);
        if (!resource) {
            return null;
        }

        // TOUJOURS gagner de l'XP (même si drop raté)
        this.gainXp(this.baseClickXp);

        // Vérifier le drop (avec dropRate)
        const dropChance = Math.random();
        if (dropChance > resource.dropRate) {
            // Raté ! Pas de ressource mais XP gagné quand même
            return null;
        }

        // Succès ! Retourner la ressource récoltée
        return {
            resourceId: resource.id,
            resourceName: resource.name,
            rarity: resource.rarity
        };
    }

    /**
     * Obtenir les ressources disponibles (débloquées par niveau)
     */
    getAvailableResources() {
        const allResources = window.ResourcesData[this.type] || [];
        return allResources.filter(r => r.unlockLevel <= this.level);
    }

    /**
     * Obtenir les données d'une ressource
     */
    getResourceData(resourceId) {
        const allResources = window.ResourcesData[this.type] || [];
        return allResources.find(r => r.id === resourceId);
    }

    /**
     * Sérialisation pour sauvegarde
     */
    toJSON() {
        return {
            id: this.id,
            level: this.level,
            xp: this.xp,
            targetResource: this.targetResource
        };
    }

    /**
     * Désérialisation depuis sauvegarde
     */
    fromJSON(data) {
        this.level = data.level || 1;
        this.xp = data.xp || 0;
        this.targetResource = data.targetResource || null;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Profession = Profession;
}
