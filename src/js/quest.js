/**
 * Classe Quest - Représente une quête individuelle
 */

class Quest {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.type = data.type; // 'kill', 'collect', 'level_up', 'craft'
        this.target = data.target; // Objectif à atteindre
        this.progress = data.progress || 0; // Progression actuelle
        this.isCompleted = data.isCompleted || false;
        // Par défaut, seules les quêtes sans prérequis sont actives
        this.isActive = data.isActive !== undefined ? data.isActive : !data.requirements?.quest;
        
        // Récompenses
        this.rewards = {
            xp: data.rewards?.xp || 0,
            gold: data.rewards?.gold || 0,
            unlocks: data.rewards?.unlocks || [] // Ex: ['professions', 'zone_2']
        };
        
        // Conditions de déblocage
        this.requirements = data.requirements || {}; // Ex: { level: 5, quest: 'quest_1' }
    }

    /**
     * Met à jour la progression de la quête
     */
    updateProgress(amount = 1) {
        if (this.isCompleted || !this.isActive) return false;
        
        this.progress += amount;
        
        // Vérifier si la quête est complétée
        if (this.progress >= this.target) {
            this.progress = this.target;
            this.complete();
            return true;
        }
        
        return false;
    }

    /**
     * Marque la quête comme complétée
     */
    complete() {
        this.isCompleted = true;
        this.isActive = false;
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`✅ Quête "${this.title}" complétée !`);
        }
    }

    /**
     * Récupère le pourcentage de progression
     */
    getProgressPercentage() {
        return Math.min(100, Math.floor((this.progress / this.target) * 100));
    }

    /**
     * Vérifie si les conditions de déblocage sont remplies
     */
    meetsRequirements(player, questManager) {
        // Vérifier niveau joueur
        if (this.requirements.level && player.level < this.requirements.level) {
            return false;
        }
        
        // Vérifier quête préalable
        if (this.requirements.quest) {
            const previousQuest = questManager.getQuest(this.requirements.quest);
            if (!previousQuest || !previousQuest.isCompleted) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Sérialisation pour la sauvegarde
     */
    toJSON() {
        return {
            id: this.id,
            progress: this.progress,
            isCompleted: this.isCompleted,
            isActive: this.isActive
        };
    }

    /**
     * Désérialisation depuis une sauvegarde
     */
    static fromJSON(data, questData) {
        const quest = new Quest(questData);
        quest.progress = data.progress || 0;
        quest.isCompleted = data.isCompleted || false;
        // Restaurer l'état d'activation depuis la sauvegarde
        quest.isActive = data.isActive !== undefined ? data.isActive : !questData.requirements?.quest;
        return quest;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Quest = Quest;
}
