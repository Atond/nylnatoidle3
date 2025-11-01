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
        
        // 🆕 Flag pour déblocage bonus passif niveau 50
        this.passiveBonusUnlocked = false;
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
            // 🛡️ FORCE REFRESH pour afficher les nouvelles recettes immédiatement
            window.game.ui.updateCraftRecipes(true);
            window.game.ui.updateCraftingTab();
        }
        
        // 🎯 Mettre à jour les quêtes de type 'profession_level'
        if (window.game && window.game.questManager) {
            window.game.questManager.updateProfessionLevelQuest(this.id, this.level);
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
        // ✅ FIX: Choisir aléatoirement parmi TOUTES les ressources disponibles
        // (pas juste la première comme avant)
        const resources = this.getAvailableResources();
        if (resources.length === 0) {
            return null;
        }

        // Choisir une ressource aléatoire parmi celles débloquées
        const randomIndex = Math.floor(Math.random() * resources.length);
        const resource = resources[randomIndex];

        // TOUJOURS gagner de l'XP (même si drop raté)
        this.gainXp(this.baseClickXp);

        // 🎯 Calculer le drop rate avec bonus de spécialisation
        let effectiveDropRate = resource.dropRate;
        
        if (window.game && window.game.getSpecializationBonus) {
            const specializationBonus = window.game.getSpecializationBonus(this.id, resource.id);
            effectiveDropRate = Math.min(1.0, effectiveDropRate + specializationBonus);
            
            // Debug: afficher le bonus appliqué (seulement si actif)
            if (specializationBonus > 0 && window.GameConfig?.DEBUG?.enabled) {
                console.log(`🎯 Bonus spécialisation ${this.name}: ${resource.name} ${(resource.dropRate * 100).toFixed(0)}% → ${(effectiveDropRate * 100).toFixed(0)}%`);
            }
        }

        // Vérifier le drop (avec dropRate + bonus)
        const dropChance = Math.random();
        if (dropChance > effectiveDropRate) {
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
            targetResource: this.targetResource,
            passiveBonusUnlocked: this.passiveBonusUnlocked || false
        };
    }

    /**
     * Désérialisation depuis sauvegarde
     */
    fromJSON(data) {
        this.level = data.level || 1;
        this.xp = data.xp || 0;
        this.targetResource = data.targetResource || null;
        this.passiveBonusUnlocked = data.passiveBonusUnlocked || false;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Profession = Profession;
}
