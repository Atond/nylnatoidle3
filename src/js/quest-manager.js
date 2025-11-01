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
     * 🔧 FIX: Vérifie et active les quêtes dont les prérequis sont remplis
     * Appelé après chargement d'une sauvegarde pour réactiver les quêtes manquantes
     */
    checkAndActivateMissingQuests() {
        let questsActivated = false;
        
        this.quests.forEach(quest => {
            // Si la quête n'est pas active et pas complétée
            if (!quest.isActive && !quest.isCompleted) {
                // Vérifier si les prérequis sont remplis
                if (quest.meetsRequirements(this.player, this)) {
                    this.activateQuest(quest.id);
                    questsActivated = true;
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`🔓 Quête réactivée après chargement: ${quest.title}`);
                    }
                }
            }
        });
        
        // Mettre à jour l'UI si des quêtes ont été activées
        if (questsActivated && window.game && window.game.ui) {
            window.game.ui.updateQuests();
        }
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
     * 🔓 Récupère les quêtes à afficher : actives + prochaines verrouillées
     * Pour toujours montrer au joueur quoi faire ensuite
     */
    getDisplayedQuests() {
        const displayed = [];
        
        // Ajouter toutes les quêtes actives non complétées
        const active = this.getActiveQuests();
        displayed.push(...active);
        
        // Si pas de quête active, chercher la prochaine quête principale disponible
        if (active.length === 0) {
            // Trouver la première quête principale non complétée
            const nextMainQuest = Array.from(this.quests.values()).find(q => 
                q.isMainQuest && !q.isCompleted && !q.isActive
            );
            
            if (nextMainQuest) {
                displayed.push(nextMainQuest);
            }
        }
        
        return displayed;
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
     * Met à jour la progression d'une quête de type 'collect_drops'
     */
    updateCollectDropsQuest(amount = 1) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'collect_drops' && !quest.isCompleted) {
                const completed = quest.updateProgress(amount);
                
                if (completed) {
                    this.onQuestComplete(quest);
                    questCompleted = true;
                }
            }
        });
        
        return questCompleted;
    }
    
    /**
     * Met à jour la progression d'une quête de type 'boss_kill'
     */
    updateBossKillQuest(bossId) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'boss_kill' && !quest.isCompleted) {
                // Vérifier si c'est le bon boss
                if (quest.requirements?.bossId === bossId) {
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
     * Met à jour la progression d'une quête de type 'create_alt'
     */
    updateCreateAltQuest(altId) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'create_alt' && !quest.isCompleted) {
                const completed = quest.updateProgress(1);
                
                if (completed) {
                    this.onQuestComplete(quest);
                    questCompleted = true;
                }
            }
        });
        
        return questCompleted;
    }
    
    /**
     * Met à jour la progression d'une quête de type 'complete_dungeon'
     */
    updateCompleteDungeonQuest(dungeonId) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'complete_dungeon' && !quest.isCompleted) {
                // Vérifier si c'est le bon donjon (si spécifié)
                if (quest.requirements?.dungeonId && quest.requirements.dungeonId !== dungeonId) {
                    return; // Pas le bon donjon
                }
                
                // Vérifier si Trinity requis
                if (quest.requirements?.hasTrinity && window.game?.dungeonManager) {
                    // Cette vérification sera faite avant d'entrer dans le donjon
                }
                
                const completed = quest.updateProgress(1);
                
                if (completed) {
                    this.onQuestComplete(quest);
                    questCompleted = true;
                }
            }
        });
        
        return questCompleted;
    }

    /**
     * Met à jour la progression d'une quête de type 'craft'
     */
    updateCraftQuest(itemId, amount = 1) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'craft' && !quest.isCompleted) {
                // Vérifier si c'est le bon item
                if (quest.requirements?.craftItem === itemId) {
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
     * Met à jour la progression d'une quête de type 'level_up'
     */
    updateLevelUpQuest(newLevel) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'level_up' && !quest.isCompleted) {
                // Vérifier si le niveau cible est atteint
                if (newLevel >= quest.target) {
                    quest.progress = quest.target;
                    const completed = quest.complete();
                    
                    if (completed !== false) {
                        this.onQuestComplete(quest);
                        questCompleted = true;
                    }
                }
            }
        });
        
        return questCompleted;
    }

    /**
     * Met à jour la progression des quêtes de type 'profession_level'
     * Appelé quand une profession gagne un niveau
     */
    updateProfessionLevelQuest(professionId, newLevel) {
        let questCompleted = false;
        
        this.activeQuests.forEach(quest => {
            if (quest.type === 'profession_level' && !quest.isCompleted) {
                // Vérifier si cette profession fait partie des requirements
                if (quest.requirements.professions && quest.requirements.professions.includes(professionId)) {
                    // Vérifier si le niveau requis est atteint
                    if (newLevel >= quest.requirements.professionLevel) {
                        // Recompter combien de professions ont atteint le niveau requis
                        let professionsAtLevel = 0;
                        
                        quest.requirements.professions.forEach(profId => {
                            const profession = window.game?.professionManager?.getProfession(profId);
                            if (profession && profession.level >= quest.requirements.professionLevel) {
                                professionsAtLevel++;
                            }
                        });
                        
                        quest.progress = professionsAtLevel;
                        
                        // Si toutes les professions ont atteint le niveau requis
                        if (professionsAtLevel >= quest.target) {
                            const completed = quest.complete();
                            
                            if (completed !== false) {
                                this.onQuestComplete(quest);
                                questCompleted = true;
                            }
                        }
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
        
        // Items
        if (quest.rewards.items && quest.rewards.items.length > 0) {
            quest.rewards.items.forEach(itemReward => {
                // Ajouter l'item à l'inventaire du joueur
                if (window.game && window.game.player) {
                    // TODO: Implémenter l'ajout d'items à l'inventaire
                    console.log(`📦 Item reçu: ${itemReward.id} x${itemReward.amount}`);
                }
            });
        }
        
        // Déblocages
        if (quest.rewards.unlocks && quest.rewards.unlocks.length > 0) {
            quest.rewards.unlocks.forEach(unlock => {
                this.handleUnlock(unlock);
            });
        }
        
        // Message personnalisé
        if (quest.rewards.message && window.game && window.game.ui) {
            window.game.ui.showNotification(quest.rewards.message, 'success');
        }
    }

    /**
     * Gère les déblocages
     */
    handleUnlock(unlockType) {
        if (GameConfig.DEBUG.enabled) {
            console.log(`🔓 Déblocage: ${unlockType}`);
        }
        
        // ✅ Activer le déblocage dans Game.unlocks
        if (window.game && window.game.unlocks && window.game.unlocks.hasOwnProperty(unlockType)) {
            window.game.unlocks[unlockType] = true;
        }
        
        // 🎨 Mettre à jour l'UI selon le type de déblocage
        if (!window.game || !window.game.ui) return;
        
        switch (unlockType) {
            // ⚡ AUTO-FEATURES
            case 'auto_combat':
                window.game.ui.showNotification('⚡ AUTO-COMBAT DÉBLOQUÉ !', 'legendary');
                window.game.ui.updateAutoCombatButton(false); // Montrer le bouton
                break;
            
            case 'auto_gather_wood':
                window.game.ui.showNotification('🪵 AUTO-RÉCOLTE BOIS DÉBLOQUÉE !', 'epic');
                window.game.ui.updateAutoGatherButtons();
                break;
            
            case 'auto_gather_ore':
                window.game.ui.showNotification('⛏️ AUTO-RÉCOLTE MINERAI DÉBLOQUÉE !', 'epic');
                window.game.ui.updateAutoGatherButtons();
                break;
            
            case 'auto_fishing':
                window.game.ui.showNotification('🎣 AUTO-PÊCHE DÉBLOQUÉE !', 'epic');
                window.game.ui.updateAutoGatherButtons();
                break;
            
            case 'auto_herbalism':
                window.game.ui.showNotification('🌿 AUTO-HERBORISTERIE DÉBLOQUÉE !', 'epic');
                window.game.ui.updateAutoGatherButtons();
                break;
            
            // 📑 ONGLETS UI
            case 'combat_log':
                // Déjà visible par défaut
                break;
            
            case 'equipment_tab':
                window.game.ui.showNotification('🎒 Onglet Équipement débloqué !', 'success');
                window.game.ui.updateTabVisibility();
                break;
            
            case 'gathering_tab':
            case 'gathering': // Compatibilité anciennes sauvegardes
                // Notification retirée - le message de la quête est suffisant
                window.game.ui.unlockProfessionsTab();
                window.game.ui.updateTabVisibility();
                break;
            
            case 'crafting_tab':
                window.game.ui.showNotification('🔨 Onglet Fabrication débloqué !', 'epic');
                window.game.ui.updateTabVisibility();
                break;
            
            case 'alchemy_tab':
                window.game.ui.showNotification('⚗️ Onglet Transmutation débloqué !', 'epic');
                window.game.ui.updateTabVisibility();
                break;
            
            case 'inventory_tab':
                window.game.ui.showNotification('🎒 Inventaire débloqué !', 'success');
                window.game.ui.updateTabVisibility();
                break;
            
            case 'professions_tab':
                window.game.ui.showNotification('🔨 Onglet Métiers débloqué !', 'epic');
                window.game.ui.updateTabVisibility();
                break;
            
            case 'town_tab':
            case 'town': // Compatibilité anciennes sauvegardes
                window.game.ui.showNotification('🏙️ Onglet Ville débloqué !', 'legendary');
                window.game.ui.unlockTownTab();
                window.game.ui.updateTabVisibility();
                break;
            
            case 'dragons_tab':
            case 'dragons': // Compatibilité anciennes sauvegardes
                window.game.ui.showNotification('🐉 Onglet Dragons débloqué !', 'legendary');
                window.game.ui.unlockDragonsTab();
                window.game.ui.updateTabVisibility();
                break;
            
            case 'guild_tab':
            case 'guild': // Compatibilité anciennes sauvegardes
                window.game.ui.showNotification('⚔️ Onglet Guilde débloqué !', 'legendary');
                window.game.ui.unlockGuildTab();
                window.game.ui.updateTabVisibility();
                break;
            
            // 🗺️ RÉGIONS
            case 'region_2':
                window.game.ui.showNotification('🏔️ RÉGION 2 DÉBLOQUÉE : Montagnes Grises !', 'legendary');
                break;
            
            case 'region_3':
                window.game.ui.showNotification('🌳 RÉGION 3 DÉBLOQUÉE : Forêt Ancestrale !', 'legendary');
                break;
            
            case 'region_4':
                window.game.ui.showNotification('🔥 RÉGION 4 DÉBLOQUÉE : Terres Brûlées !', 'legendary');
                break;
            
            case 'region_5':
                window.game.ui.showNotification('❄️ RÉGION 5 DÉBLOQUÉE : Nord Gelé !', 'legendary');
                break;
            
            // 🛠️ MÉTIERS
            case 'profession_woodcutting':
                // Notification retirée - laisse juste "Récolte débloquée"
                break;
            
            case 'profession_mining':
                // Notification retirée - laisse juste "Récolte débloquée"
                break;
            
            case 'profession_blacksmith':
                // Notification retirée - le message de la quête est suffisant
                break;
            
            case 'profession_armorsmith':
                // Notification retirée - le message de la quête est suffisant
                break;
            
            case 'profession_herbalism':
                window.game.ui.showNotification('🌿 Vous êtes maintenant Herboriste !', 'success');
                break;
            
            case 'profession_fishing':
                window.game.ui.showNotification('🎣 Vous êtes maintenant Pêcheur !', 'success');
                break;
            
            case 'profession_jeweler':
                window.game.ui.showNotification('💍 Vous êtes maintenant Bijoutier !', 'success');
                break;
            
            case 'profession_alchemist':
                window.game.ui.showNotification('🧪 Vous êtes maintenant Alchimiste !', 'success');
                break;
            
            case 'profession_tailor':
                window.game.ui.showNotification('👗 Vous êtes maintenant Tailleur !', 'success');
                break;
            
            case 'profession_tanner':
                window.game.ui.showNotification('🎒 Vous êtes maintenant Tanneur !', 'success');
                break;
            
            case 'profession_transmutation':
                window.game.ui.showNotification('⚗️ Vous êtes maintenant Transmutateur !', 'success');
                break;
            
            // 🎮 SYSTÈMES
            case 'storage_system':
                window.game.ui.showNotification('📦 Système de stockage débloqué !', 'success');
                break;
            
            case 'dragon_capture':
                window.game.ui.showNotification('🐉 Vous pouvez maintenant capturer des dragons !', 'legendary');
                break;
            
            case 'dragon_breeding':
                window.game.ui.showNotification('🥚 Reproduction de dragons débloquée !', 'legendary');
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
        
        // 🎯 INITIALISATION : Pour les quêtes 'level_up', définir la progression au niveau actuel
        if (quest.type === 'level_up') {
            quest.progress = Math.min(this.player.level, quest.target);
            
            // Si le niveau est déjà atteint, compléter immédiatement
            if (this.player.level >= quest.target) {
                const completed = quest.complete();
                
                if (completed !== false) {
                    this.onQuestComplete(quest);
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`✅ Quête ${quest.title} complétée immédiatement (niveau déjà atteint)`);
                    }
                }
            }
        }
        
        // 🎯 INITIALISATION : Pour les quêtes 'unlock_professions', vérifier si les professions sont déjà débloquées
        if (quest.type === 'unlock_professions' && quest.requirements.professions) {
            let unlockedCount = 0;
            
            // Vérifier combien de professions requises sont déjà débloquées
            quest.requirements.professions.forEach(professionId => {
                const profession = window.game?.professionManager?.getProfession(professionId);
                if (profession && profession.unlocked) {
                    unlockedCount++;
                }
            });
            
            quest.progress = unlockedCount;
            
            // Si toutes les professions sont déjà débloquées, compléter immédiatement
            if (unlockedCount >= quest.target) {
                const completed = quest.complete();
                
                if (completed !== false) {
                    this.onQuestComplete(quest);
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`✅ Quête ${quest.title} complétée immédiatement (professions déjà débloquées)`);
                    }
                }
            }
        }
        
        // 🎯 INITIALISATION : Pour les quêtes 'profession_level', vérifier les niveaux actuels
        if (quest.type === 'profession_level' && quest.requirements.professions && quest.requirements.professionLevel) {
            let professionsAtLevel = 0;
            
            // Vérifier combien de professions ont atteint le niveau requis
            quest.requirements.professions.forEach(professionId => {
                const profession = window.game?.professionManager?.getProfession(professionId);
                if (profession && profession.level >= quest.requirements.professionLevel) {
                    professionsAtLevel++;
                }
            });
            
            quest.progress = professionsAtLevel;
            
            // Si toutes les professions ont déjà le niveau requis, compléter immédiatement
            if (professionsAtLevel >= quest.target) {
                const completed = quest.complete();
                
                if (completed !== false) {
                    this.onQuestComplete(quest);
                    if (GameConfig.DEBUG.enabled) {
                        console.log(`✅ Quête ${quest.title} complétée immédiatement (professions déjà au niveau ${quest.requirements.professionLevel})`);
                    }
                }
            }
        }
        
        // 🎯 SPÉCIALISATION : Ouvrir le modal de sélection pour la quête de spécialisation
        if (quest.type === 'choose_specialization' && quest.choices) {
            // Ouvrir le modal après un court délai pour laisser l'UI se mettre à jour
            setTimeout(() => {
                if (window.game && window.game.ui) {
                    window.game.ui.showSpecializationModal(quest);
                }
            }, 500);
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
        
        // 🎯 VÉRIFICATION POST-CHARGEMENT : Mettre à jour les quêtes level_up
        this.activeQuests.forEach(quest => {
            if (quest.type === 'level_up' && !quest.isCompleted) {
                // Mettre à jour la progression au niveau actuel (même si pas encore complétée)
                quest.progress = Math.min(this.player.level, quest.target);
                
                // Si le niveau est déjà atteint, compléter la quête
                if (this.player.level >= quest.target) {
                    const completed = quest.complete();
                    
                    if (completed !== false) {
                        this.onQuestComplete(quest);
                        if (GameConfig.DEBUG.enabled) {
                            console.log(`✅ Quête ${quest.title} auto-validée au chargement (niveau déjà atteint)`);
                        }
                    }
                }
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
