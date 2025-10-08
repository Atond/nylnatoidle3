/**
 * Classe QuestManager - Gère toutes les quêtes du jeu
 */

class QuestManager {
    constructor(player) {
        this.player = player;
        this.quests = new Map(); // Map<questId, Quest>
        this.activeQuests = [];
        this.completedQuests = [];
        
        // Charger les quêtes depuis la configuration
        this.loadQuests();
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`📜 QuestManager initialisé avec ${this.quests.size} quêtes`);
        }
    }

    /**
     * Charge les quêtes depuis la configuration
     */
    loadQuests() {
        if (typeof QuestsData === 'undefined') {
            console.warn('⚠️ QuestsData non défini, aucune quête chargée');
            return;
        }
        
        QuestsData.forEach(questData => {
            const quest = new Quest(questData);
            this.quests.set(quest.id, quest);
            
            // Ajouter aux quêtes actives si elle est active
            if (quest.isActive && !quest.isCompleted) {
                this.activeQuests.push(quest);
            }
        });
    }

    /**
     * Récupère une quête par son ID
     */
    getQuest(questId) {
        return this.quests.get(questId);
    }

    /**
     * Récupère toutes les quêtes actives
     */
    getActiveQuests() {
        return this.activeQuests.filter(q => !q.isCompleted);
    }

    /**
     * Récupère toutes les quêtes complétées
     */
    getCompletedQuests() {
        return this.completedQuests;
    }

    /**
     * Met à jour la progression d'une quête de type 'kill'
     */
    updateKillQuest(monsterName = null, zone = null) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'kill' && !quest.isCompleted) {
                // Vérifier si la quête a des conditions spécifiques
                const matchesConditions = this.checkQuestConditions(quest, { monsterName, zone });
                
                if (matchesConditions) {
                    const completed = quest.updateProgress(1);
                    
                    if (completed) {
                        this.onQuestComplete(quest);
                        questCompleted = true;
                    }
                }
            }
        });
        
        return questCompleted;
    }

    /**
     * Met à jour la progression d'une quête de type 'collect'
     */
    updateCollectQuest(resourceType, resourceName, amount = 1) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'collect' && !quest.isCompleted) {
                // Vérifier si c'est la bonne ressource
                if (quest.requirements?.resourceType === resourceType && 
                    quest.requirements?.resourceName === resourceName) {
                    const completed = quest.updateProgress(amount);
                    
                    if (completed) {
                        this.onQuestComplete(quest);
                        questCompleted = true;
                    }
                }
            }
        });
        
        return questCompleted;
    }

    /**
     * Vérifie si les conditions de la quête sont remplies
     */
    checkQuestConditions(quest, context) {
        // Si pas de conditions spécifiques ou seulement une condition de prérequis de quête, c'est OK
        if (!quest.requirements) return true;
        
        // Vérifier la zone (si spécifiée)
        if (quest.requirements.zone && context.zone !== quest.requirements.zone) {
            return false;
        }
        
        // Vérifier le type de monstre (si spécifié)
        if (quest.requirements.monsterName && context.monsterName !== quest.requirements.monsterName) {
            return false;
        }
        
        // Si la quête n'a que des conditions de prérequis (quest, level, etc.) 
        // et pas de conditions de contexte (zone, monsterName), accepter tous les événements
        const hasContextRequirements = quest.requirements.zone || quest.requirements.monsterName;
        if (!hasContextRequirements) {
            return true;
        }
        
        return true;
    }

    /**
     * Gère la complétion d'une quête
     */
    onQuestComplete(quest) {
        // Retirer des quêtes actives
        const index = this.activeQuests.indexOf(quest);
        if (index > -1) {
            this.activeQuests.splice(index, 1);
        }
        
        // Ajouter aux quêtes complétées
        this.completedQuests.push(quest);
        
        // Appliquer les récompenses
        this.applyRewards(quest);
        
        // Notification
        if (window.game && window.game.ui) {
            window.game.ui.showQuestCompleteNotification(quest);
        }
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`🎉 Quête complétée: ${quest.title}`);
            console.log(`Récompenses:`, quest.rewards);
        }
        
        // Activer automatiquement les quêtes suivantes
        this.checkAndActivateNextQuests(quest);
    }

    /**
     * Vérifie et active les quêtes qui dépendent de la quête complétée
     */
    checkAndActivateNextQuests(completedQuest) {
        this.quests.forEach(quest => {
            // Si la quête n'est pas active et pas complétée
            if (!quest.isActive && !quest.isCompleted) {
                // Si elle requiert la quête qu'on vient de compléter
                if (quest.requirements?.quest === completedQuest.id) {
                    // Vérifier si toutes les autres conditions sont remplies
                    if (quest.meetsRequirements(this.player, this)) {
                        this.activateQuest(quest.id);
                    }
                }
            }
        });
    }

    /**
     * Applique les récompenses d'une quête
     */
    applyRewards(quest) {
        // XP
        if (quest.rewards.xp > 0) {
            this.player.gainXp(quest.rewards.xp);
        }
        
        // Or
        if (quest.rewards.gold > 0) {
            this.player.resources.gold += quest.rewards.gold;
        }
        
        // Déblocages
        if (quest.rewards.unlocks && quest.rewards.unlocks.length > 0) {
            quest.rewards.unlocks.forEach(unlock => {
                this.handleUnlock(unlock);
            });
        }
    }

    /**
     * Gère les déblocages
     */
    handleUnlock(unlockType) {
        if (GameConfig.DEBUG.enabled) {
            console.log(`🔓 Déblocage: ${unlockType}`);
        }
        
        switch (unlockType) {
            case 'gathering':
                // Débloquer l'onglet Récolte
                if (window.game && window.game.ui) {
                    window.game.ui.unlockProfessionsTab();
                }
                break;
            
            case 'town':
                // Débloquer l'onglet Ville
                if (window.game && window.game.ui) {
                    window.game.ui.unlockTownTab();
                }
                break;
            
            case 'dragons':
                // Débloquer l'onglet Dragons
                if (window.game && window.game.ui) {
                    window.game.ui.unlockDragonsTab();
                }
                break;
            
            case 'guild':
                // Débloquer l'onglet Guilde
                if (window.game && window.game.ui) {
                    window.game.ui.unlockGuildTab();
                }
                break;
            
            case 'zone_2':
                // Débloquer la zone 2
                // À implémenter plus tard
                break;
            
            default:
                console.warn(`⚠️ Type de déblocage inconnu: ${unlockType}`);
        }
    }

    /**
     * Active une nouvelle quête
     */
    activateQuest(questId) {
        const quest = this.quests.get(questId);
        if (!quest) {
            console.warn(`⚠️ Quête ${questId} introuvable`);
            return false;
        }
        
        // Vérifier les prérequis
        if (!quest.meetsRequirements(this.player, this)) {
            console.log(`⚠️ Conditions non remplies pour ${quest.title}`);
            return false;
        }
        
        quest.isActive = true;
        this.activeQuests.push(quest);
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`✅ Quête activée: ${quest.title}`);
        }
        
        return true;
    }

    /**
     * Sérialisation pour la sauvegarde
     */
    toJSON() {
        const questsData = {};
        
        this.quests.forEach((quest, id) => {
            questsData[id] = quest.toJSON();
        });
        
        return {
            quests: questsData
        };
    }

    /**
     * Désérialisation depuis une sauvegarde
     */
    fromJSON(data) {
        if (!data || !data.quests) return;
        
        // Recharger les quêtes avec les données sauvegardées
        this.quests.clear();
        this.activeQuests = [];
        this.completedQuests = [];
        
        QuestsData.forEach(questData => {
            const savedData = data.quests[questData.id];
            const quest = savedData 
                ? Quest.fromJSON(savedData, questData)
                : new Quest(questData);
            
            this.quests.set(quest.id, quest);
            
            if (quest.isActive && !quest.isCompleted) {
                this.activeQuests.push(quest);
            } else if (quest.isCompleted) {
                this.completedQuests.push(quest);
            }
        });
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`💾 Quêtes chargées: ${this.activeQuests.length} actives, ${this.completedQuests.length} complétées`);
        }
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.QuestManager = QuestManager;
}
