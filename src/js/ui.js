/**
 * Classe UI - Gestion de l'interface utilisateur
 */

class UI {
    constructor(game) {
        this.game = game;
        this.notificationOffset = 0; // Pour empiler les notifications verticalement
        this.unlockedTabs = ['home', 'combat', 'quests', 'gathering']; // Tabs débloqués par défaut (equipment/crafting se débloquent avec auto-récoltes)
        
        // Éléments DOM - Combat
        this.elements = {
            // Header
            playerLevel: document.getElementById('playerLevel'),
            
            // Combat area
            zoneName: document.getElementById('zoneName'),
            zoneProgress: document.getElementById('zoneProgress'),
            
            playerHp: document.getElementById('playerHp'),
            playerMaxHp: document.getElementById('playerMaxHp'),
            playerHpBar: document.getElementById('playerHpBar'),
            
            monsterName: document.getElementById('monsterName'),
            monsterHp: document.getElementById('monsterHp'),
            monsterMaxHp: document.getElementById('monsterMaxHp'),
            monsterHpBar: document.getElementById('monsterHpBar'),
            monsterSprite: document.getElementById('monsterSprite'),
            
            attackBtn: document.getElementById('attackBtn'),
            autoCombatBtn: document.getElementById('autoCombatBtn'),
            prevZoneBtn: document.getElementById('prevZoneBtn'),
            nextZoneBtn: document.getElementById('nextZoneBtn'),
            combatLog: document.getElementById('combatLog'),
            
            // Stats sidebar
            statHp: document.getElementById('statHp'),
            statForce: document.getElementById('statForce'),
            statAgility: document.getElementById('statAgility'),
            statIntelligence: document.getElementById('statIntelligence'),
            statWisdom: document.getElementById('statWisdom'),
            statEndurance: document.getElementById('statEndurance'),
            
            // Or
            playerGold: document.getElementById('playerGold'),
            
            // XP
            currentXp: document.getElementById('currentXp'),
            requiredXp: document.getElementById('requiredXp'),
            xpBar: document.getElementById('xpBar'),
            
            // Zone info
            currentRegionName: document.getElementById('currentRegionName'),
            currentZoneNum: document.getElementById('currentZoneNum'),
            monsterType: document.getElementById('monsterType'),
            combatInventoryGrid: document.getElementById('combatInventoryGrid'),
            
            // Quêtes
            questsList: document.getElementById('questsList'),
            questsSidebar: document.getElementById('questsSidebar'),
            
            // Métiers
            btnWoodcutter: document.getElementById('btn-woodcutter'),
            btnMiner: document.getElementById('btn-miner'),
            inventoryGrid: document.getElementById('inventory-grid'),
            
            // Footer
            lastSave: document.getElementById('lastSave'),
            
            // Onglets
            tabs: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };
        
        this.initEventListeners();
    }

    /**
     * Initialise les event listeners
     */
    initEventListeners() {
        // Bouton d'attaque manuelle
        this.elements.attackBtn.addEventListener('click', () => {
            this.game.onAttackClick();
        });
        
        // Bouton toggle auto-combat
        this.elements.autoCombatBtn.addEventListener('click', () => {
            this.game.onAutoCombatToggle();
        });
        
        // Boutons de navigation de zone
        this.elements.prevZoneBtn.addEventListener('click', () => {
            this.game.onZoneChange('prev');
        });
        
        this.elements.nextZoneBtn.addEventListener('click', () => {
            this.game.onZoneChange('next');
        });
        
        // Gestion des onglets
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                if (!tab.classList.contains('disabled')) {
                    this.switchTab(tabName);
                }
            });
        });
        
        // Boutons des métiers
        this.elements.btnWoodcutter.addEventListener('click', () => {
            this.onProfessionClick('woodcutter');
        });
        
        this.elements.btnMiner.addEventListener('click', () => {
            this.onProfessionClick('miner');
        });

        // Boutons auto-récolte
        document.getElementById('btn-auto-woodcutter').addEventListener('click', () => {
            this.onAutoGatherClick('woodcutter');
        });

        document.getElementById('btn-auto-miner').addEventListener('click', () => {
            this.onAutoGatherClick('miner');
        });

        // Filtres d'inventaire
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.dataset.filter;
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateInventory();
            });
        });

        // Sélection de profession de craft
        document.querySelectorAll('.craft-profession-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.craft-profession-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.updateCraftRecipes();
            });
        });

        // Boutons de vente d'équipement
        const sellAllBtn = document.getElementById('sellAllInventoryBtn');
        if (sellAllBtn) {
            sellAllBtn.addEventListener('click', () => {
                this.confirmSellInventory('all');
            });
        }

        const sellNormalBtn = document.getElementById('sellNormalBtn');
        if (sellNormalBtn) {
            sellNormalBtn.addEventListener('click', () => {
                this.confirmSellInventory('normal');
            });
        }

        const sellSuperiorBtn = document.getElementById('sellSuperiorBtn');
        if (sellSuperiorBtn) {
            sellSuperiorBtn.addEventListener('click', () => {
                this.confirmSellInventory('superior');
            });
        }

        const sellExceptionalBtn = document.getElementById('sellExceptionalBtn');
        if (sellExceptionalBtn) {
            sellExceptionalBtn.addEventListener('click', () => {
                this.confirmSellInventory('exceptional');
            });
        }

        // Tri de l'inventaire
        const sortInventory = document.getElementById('sortInventory');
        if (sortInventory) {
            sortInventory.addEventListener('change', () => {
                this.game.equipmentManager.sortInventory(sortInventory.value);
                this.updateEquipmentInventory();
            });
        }

        this.currentFilter = 'all'; // Filtre actif par défaut
        this.selectedRecipeId = null; // Aucune recette sélectionnée par défaut
    }

    /**
     * Change d'onglet
     */
    switchTab(tabName) {
        // Désactive tous les onglets et contenus
        this.elements.tabs.forEach(t => t.classList.remove('active'));
        this.elements.tabContents.forEach(c => c.classList.remove('active'));
        
        // Active l'onglet et le contenu sélectionné
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedContent = document.getElementById(`tab-${tabName}`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedContent) selectedContent.classList.add('active');
        
        // Mettre à jour l'équipement si on ouvre l'onglet équipement
        if (tabName === 'equipment') {
            this.updateEquipment();
            this.updateEquipmentInventory();
        }
        
        // Mettre à jour le crafting si on ouvre l'onglet crafting
        if (tabName === 'crafting') {
            // Sélectionner le forgeron par défaut si aucun métier n'est sélectionné
            const selectedProf = document.querySelector('.craft-profession-card.selected');
            if (!selectedProf) {
                const firstProf = document.querySelector('.craft-profession-card[data-profession="blacksmith"]');
                if (firstProf) firstProf.classList.add('selected');
            }
            this.updateCraftingTab();
        }
        
        // Mettre à jour la ville si on ouvre l'onglet ville
        if (tabName === 'town') {
            this.updateTownTab();
        }
    }

    /**
     * Met à jour toute l'interface
     */
    update() {
        this.updatePlayerUI();
        this.updateMonsterUI();
        this.updateCombatLog();
        this.updateZoneInfo();
        this.updateQuests();
        
        // Mettre à jour les barres XP des professions de craft
        this.updateCraftingProfessions();
        
        // NE PAS mettre à jour les métiers ici - uniquement lors des clics !
        
        // Vérifier HP du joueur
        const hpPercent = this.game.player.getHpPercentage();
        if (hpPercent < 30 && this.game.player.isAlive) {
            // Effet visuel sur la barre HP
            this.elements.playerHpBar.parentElement.style.border = '2px solid #e74c3c';
        } else {
            this.elements.playerHpBar.parentElement.style.border = 'none';
        }
    }

    /**
     * Met à jour les informations du joueur (alias pour updatePlayerUI)
     */
    updatePlayerInfo() {
        this.updatePlayerUI();
    }

    /**
     * Met à jour les stats (alias pour updatePlayerUI)
     */
    updateStats() {
        this.updatePlayerUI();
    }

    /**
     * Met à jour l'interface du joueur
     */
    updatePlayerUI() {
        const player = this.game.player;
        
        // Or (formaté)
        if (this.elements.playerGold) {
            this.elements.playerGold.textContent = NumberFormatter.format(player.resources.gold);
        }
        
        // Nom du joueur avec icône de classe
        const playerNameElement = document.getElementById('playerName');
        if (playerNameElement) {
            const classIcon = player.getClassIcon();
            playerNameElement.textContent = `${classIcon} ${player.name}`;
        }
        
        // Niveau
        this.elements.playerLevel.textContent = player.level;
        
        // HP (avec bonus d'équipement)
        const maxHp = player.getMaxHp();
        this.elements.playerHp.textContent = Math.floor(player.stats.hp);
        this.elements.playerMaxHp.textContent = maxHp;
        this.elements.playerHpBar.style.width = player.getHpPercentage() + '%';
        
        // Stats (avec bonus d'équipement)
        const equipStats = this.game.equipmentManager ? this.game.equipmentManager.calculateTotalStats() : {};
        this.elements.statHp.textContent = maxHp;
        this.elements.statForce.textContent = player.stats.force + (equipStats.force || 0);
        this.elements.statAgility.textContent = player.stats.agility + (equipStats.agility || 0);
        this.elements.statIntelligence.textContent = player.stats.intelligence + (equipStats.intelligence || 0);
        this.elements.statWisdom.textContent = player.stats.wisdom + (equipStats.wisdom || 0);
        this.elements.statEndurance.textContent = player.stats.endurance + (equipStats.endurance || 0);
        
        // XP
        this.elements.currentXp.textContent = Math.floor(player.xp);
        this.elements.requiredXp.textContent = player.xpRequired;
        this.elements.xpBar.style.width = player.getXpPercentage() + '%';
    }

    /**
     * Met à jour l'interface du monstre
     */
    updateMonsterUI() {
        const monster = this.game.combat.currentMonster;
        
        if (!monster) return;
        
        this.elements.monsterName.textContent = monster.getName();
        this.elements.monsterHp.textContent = Math.floor(monster.hp);
        this.elements.monsterMaxHp.textContent = monster.maxHp;
        this.elements.monsterHpBar.style.width = monster.getHpPercentage() + '%';
        this.elements.monsterSprite.textContent = monster.getEmoji();
    }

    /**
     * Met à jour le journal de combat
     */
    updateCombatLog() {
        const log = this.game.combat.combatLog;
        
        // Réinitialise le contenu
        this.elements.combatLog.innerHTML = '';
        
        // Ajoute les entrées (les plus récentes en premier)
        log.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'log-entry';
            div.textContent = entry.message;
            this.elements.combatLog.appendChild(div);
        });
    }

    /**
     * Met à jour les informations de zone
     */
    updateZoneInfo() {
        const combat = this.game.combat;
        if (!combat) return;
        
        // Récupérer les données de région et zone une seule fois
        const regionData = combat.getCurrentRegionData ? combat.getCurrentRegionData() : null;
        const zoneData = combat.getCurrentZoneData ? combat.getCurrentZoneData() : null;
        
        // Nom de la zone (affichage central)
        if (regionData && zoneData) {
            this.elements.zoneName.textContent = `${regionData.icon} ${regionData.name} - ${zoneData.icon} ${zoneData.name}`;
        } else {
            this.elements.zoneName.textContent = `Zone ${combat.currentZone}`;
        }
        
        // Progression
        const zoneKey = `${combat.currentRegion}_${combat.currentZone}`;
        const killed = combat.monstersKilledPerZone[zoneKey] || 0;
        this.elements.zoneProgress.textContent = 
            `${killed} / ${GameConfig.ZONES.MONSTERS_TO_UNLOCK}`;
        
        // Zone actuelle (sidebar)
        if (regionData && zoneData) {
            this.elements.currentRegionName.textContent = `${regionData.icon} ${regionData.name}`;
            this.elements.currentZoneNum.textContent = `${zoneData.icon} ${zoneData.name}`;
        } else {
            this.elements.currentRegionName.textContent = 'Région inconnue';
            this.elements.currentZoneNum.textContent = `Zone ${combat.currentZone}`;
        }
        
        // Type de monstre
        if (combat.currentMonster) {
            const rarityColor = combat.currentMonster.getRarityColor ? combat.currentMonster.getRarityColor() : '#fff';
            this.elements.monsterType.textContent = combat.currentMonster.getName();
            this.elements.monsterType.style.color = rarityColor;
        }
    }

    /**
     * Met à jour le bouton auto-combat
     */
    updateAutoCombatButton(isActive) {
        const btn = this.elements.autoCombatBtn;
        
        if (isActive) {
            btn.textContent = '⚙️ Auto-Combat : ON';
            btn.classList.add('active');
        } else {
            btn.textContent = '⚙️ Auto-Combat : OFF';
            btn.classList.remove('active');
        }
    }

    /**
     * Affiche un warning si HP bas
     */
    showHpWarning() {
        const player = this.game.player;
        const hpPercent = player.getHpPercentage();
        
        if (hpPercent < 30 && player.isAlive) {
            this.showNotification('⚠️ PV faibles ! Attention !', 'warning');
        }
    }

    /**
     * Met à jour l'affichage de la dernière sauvegarde
     */
    updateLastSave(timestamp) {
        if (timestamp) {
            this.elements.lastSave.textContent = Utils.formatDate(timestamp);
        } else {
            this.elements.lastSave.textContent = 'Jamais';
        }
    }

    /**
     * Affiche une notification toast en bas à droite
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Log en console
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Ajouter au DOM
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        container.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('notification-show');
        }, 10);
        
        // Supprimer après durée
        setTimeout(() => {
            notification.classList.remove('notification-show');
            notification.classList.add('notification-hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    /**
     * Effet visuel de dégâts sur la barre de HP
     */
    animateHpBar(element, percentage) {
        if (!element) return;
        
        element.style.transition = `width ${GameConfig.UI.HP_BAR_ANIMATION_DURATION}ms ease-out`;
        element.style.width = percentage + '%';
    }

    /**
     * Effet visuel de level up
     */
    showLevelUpEffect(levelUpData) {
        if (!levelUpData) return;
        
        const { level, gains } = levelUpData;
        
        // Animation flash doré sur le joueur
        const playerSection = document.querySelector('.player-section');
        if (playerSection) {
            playerSection.classList.add('level-up-flash');
            setTimeout(() => {
                playerSection.classList.remove('level-up-flash');
            }, 1000);
        }
        
        // Animation sur la barre XP
        if (this.elements.xpBar) {
            this.elements.xpBar.classList.add('xp-bar-pulse');
            setTimeout(() => {
                this.elements.xpBar.classList.remove('xp-bar-pulse');
            }, 1000);
        }
        
        // Créer notification de level up avec détails
        this.showLevelUpNotification(level, gains);
    }

    /**
     * Affiche la notification détaillée de level up
     */
    showLevelUpNotification(level, gains) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        
        // Positionner avec offset pour éviter les chevauchements
        notification.style.top = `${80 + this.notificationOffset}px`;
        this.notificationOffset += 10; // Petit décalage pour empiler
        
        // Contenu de la notification
        notification.innerHTML = `
            <div class="level-up-title">🎉 LEVEL UP! 🎉</div>
            <div class="level-up-level">Niveau ${level}</div>
            <div class="level-up-gains">
                <div class="gain-item">💚 PV: +${gains.hp}</div>
                <div class="gain-item">⚔️ Force: +${gains.force}</div>
                <div class="gain-item">⚡ Agilité: +${gains.agility}</div>
                <div class="gain-item">🔮 Intelligence: +${gains.intelligence}</div>
                <div class="gain-item">📖 Sagesse: +${gains.wisdom}</div>
                <div class="gain-item">🛡️ Endurance: +${gains.endurance}</div>
            </div>
        `;
        
        // Ajouter au body
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Retirer après 4 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                this.notificationOffset = Math.max(0, this.notificationOffset - 10);
            }, 500);
        }, 4000);
    }

    /**
     * Affiche/masque le bouton d'attaque
     */
    toggleAttackButton(show) {
        if (this.elements.attackBtn) {
            this.elements.attackBtn.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Met à jour l'affichage des quêtes
     */
    updateQuests() {
        if (!this.game.questManager || !this.elements.questsList) return;
        
        const activeQuests = this.game.questManager.getActiveQuests();
        
        // Vider la liste
        this.elements.questsList.innerHTML = '';
        
        // Afficher les quêtes actives
        if (activeQuests.length === 0) {
            this.elements.questsList.innerHTML = '<p class="text-muted">Aucune quête active</p>';
            return;
        }
        
        activeQuests.forEach(quest => {
            const questCard = this.createQuestCard(quest);
            this.elements.questsList.appendChild(questCard);
        });
    }

    /**
     * Crée une carte de quête
     */
    createQuestCard(quest) {
        const card = document.createElement('div');
        card.className = 'quest-card';
        if (quest.isCompleted) {
            card.classList.add('completed');
        }
        
        const progressPercent = quest.getProgressPercentage();
        
        card.innerHTML = `
            <div class="quest-title">
                ${quest.isCompleted ? '✅' : '📋'} ${quest.title}
            </div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-progress">
                <div class="quest-progress-text">
                    <span>Progression</span>
                    <span>${quest.progress} / ${quest.target}</span>
                </div>
                <div class="quest-progress-bar">
                    <div class="quest-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            ${this.createQuestRewards(quest)}
        `;
        
        return card;
    }

    /**
     * Crée l'affichage des récompenses
     */
    createQuestRewards(quest) {
        const rewards = [];
        
        if (quest.rewards.xp > 0) {
            rewards.push(`📈 ${quest.rewards.xp} XP`);
        }
        
        if (quest.rewards.gold > 0) {
            rewards.push(`💰 ${quest.rewards.gold} Or`);
        }
        
        if (quest.rewards.unlocks && quest.rewards.unlocks.length > 0) {
            quest.rewards.unlocks.forEach(unlock => {
                if (unlock === 'professions') {
                    rewards.push(`🔓 Métiers`);
                }
            });
        }
        
        if (rewards.length === 0) return '';
        
        return `
            <div class="quest-rewards">
                ${rewards.map(r => `<span class="quest-reward">${r}</span>`).join('')}
            </div>
        `;
    }

    /**
     * Affiche la notification de quête complétée
     */
    showQuestCompleteNotification(quest) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'quest-complete-notification';
        
        // Positionner avec offset pour éviter les chevauchements
        notification.style.top = `${80 + this.notificationOffset}px`;
        this.notificationOffset += 10; // Petit décalage pour empiler
        
        const rewardsHtml = [];
        if (quest.rewards.xp > 0) {
            rewardsHtml.push(`<div class="quest-complete-reward">📈 +${quest.rewards.xp} XP</div>`);
        }
        if (quest.rewards.gold > 0) {
            rewardsHtml.push(`<div class="quest-complete-reward">💰 +${quest.rewards.gold} Or</div>`);
        }
        if (quest.rewards.unlocks && quest.rewards.unlocks.length > 0) {
            quest.rewards.unlocks.forEach(unlock => {
                if (unlock === 'professions') {
                    rewardsHtml.push(`<div class="quest-complete-reward">🔓 Métiers Débloqués!</div>`);
                }
            });
        }
        
        // Contenu de la notification
        notification.innerHTML = `
            <div class="quest-complete-title">🎉 QUÊTE COMPLÉTÉE! 🎉</div>
            <div class="quest-complete-name">${quest.title}</div>
            <div class="quest-complete-rewards">
                ${rewardsHtml.join('')}
            </div>
        `;
        
        // Ajouter au body
        document.body.appendChild(notification);
        
        // Animer l'apparition
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Retirer après 5 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                this.notificationOffset = Math.max(0, this.notificationOffset - 10);
            }, 500);
        }, 5000);
        
        // Mettre à jour l'affichage des quêtes
        this.updateQuests();
    }

    /**
     * Débloque l'onglet Récolte
     */
    unlockProfessionsTab() {
        this.unlockTab('gathering', '⛏️ Récolte débloquée ! Explorez les ressources');
    }

    /**
     * Débloque l'onglet Ville
     */
    unlockTownTab() {
        this.unlockTab('town', '🏘️ Ville débloquée ! Construisez votre cité');
    }

    /**
     * Débloque l'onglet Dragons
     */
    unlockDragonsTab() {
        this.unlockTab('dragons', '🐉 Dragons débloqués ! Domptez ces créatures légendaires');
    }

    /**
     * Débloque l'onglet Guilde
     */
    unlockGuildTab() {
        this.unlockTab('guild', '👥 Guilde débloquée ! Rejoignez d\'autres aventuriers');
    }

    /**
     * Méthode générique pour débloquer un onglet
     */
    unlockTab(tabName, message) {
        const tab = document.querySelector(`[data-tab="${tabName}"]`);
        if (!tab) {
            console.warn(`⚠️ Onglet ${tabName} introuvable`);
            return;
        }

        // Si déjà débloqué, ne rien faire
        if (!tab.classList.contains('disabled')) {
            return;
        }

        // Débloquer l'onglet
        tab.classList.remove('disabled');
        
        // Ajouter aux tabs débloqués
        if (!this.unlockedTabs.includes(tabName)) {
            this.unlockedTabs.push(tabName);
        }
        
        // Effet visuel de déblocage
        tab.style.animation = 'tabUnlock 0.8s ease-out';
        setTimeout(() => {
            tab.style.animation = '';
        }, 800);
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`🔓 Onglet ${tabName} débloqué!`);
        }
        
        // Notification
        this.showNotification(`🎉 ${message}`, 'success');
    }

    /**
     * Vérifie si les onglets Équipement et Fabrication doivent être débloqués
     */
    checkEquipmentUnlock() {
        const autoGatherState = this.game.professionManager.autoGatherState;
        
        // Vérifier si les deux auto-récoltes sont débloquées
        const woodcutterUnlocked = autoGatherState.woodcutter?.unlocked || false;
        const minerUnlocked = autoGatherState.miner?.unlocked || false;
        
        if (woodcutterUnlocked && minerUnlocked) {
            // Débloquer l'onglet Équipement
            if (!this.unlockedTabs.includes('equipment')) {
                this.unlockTab('equipment', 'Onglet Équipement débloqué ! 🎒');
            }
            
            // Débloquer l'onglet Fabrication
            if (!this.unlockedTabs.includes('crafting')) {
                this.unlockTab('crafting', 'Onglet Fabrication débloqué ! 🔨');
            }
        }
    }

    /**
     * ========================================
     * MÉTIERS - Gestion des professions
     * ========================================
     */

    /**
     * Clic sur un bouton de métier
     */
    onProfessionClick(professionId) {
        const result = this.game.professionManager.clickProfession(professionId, this.game);
        
        // Si le stockage est plein, afficher un message
        if (result && result.storageFull) {
            this.showNotification(`⚠️ Stockage plein pour ${result.resourceName}`, 'warning');
        }
        
        this.updateProfessions();
        this.updateInventory();
        this.updateAutoGatherButtons();
    }

    /**
     * Clic sur un bouton auto-récolte
     */
    onAutoGatherClick(professionId) {
        const success = this.game.professionManager.unlockAutoGather(professionId);
        if (success) {
            // Démarrer automatiquement et définitivement
            this.game.professionManager.autoGatherState[professionId].enabled = true;
            this.game.professionManager.startAutoGather(professionId);
            
            // Vérifier si les deux auto-récoltes sont débloquées pour débloquer l'onglet Équipement
            this.checkEquipmentUnlock();
        }
        this.updateAutoGatherButtons();
        this.updateInventory();
    }

    /**
     * Met à jour l'affichage des boutons auto-récolte
     */
    updateAutoGatherButtons() {
        ['woodcutter', 'miner'].forEach(profId => {
            const btn = document.getElementById(`btn-auto-${profId}`);
            if (!btn) return;

            const state = this.game.professionManager.autoGatherState[profId];
            const woodAmount = this.game.professionManager.getInventoryAmount('wood_oak');
            const oreAmount = this.game.professionManager.getInventoryAmount('ore_iron');
            const interval = this.game.professionManager.autoGatherInterval / 1000; // En secondes

            const resourceIcon = profId === 'woodcutter' ? '🪵' : '⚒️';
            const resourceName = profId === 'woodcutter' ? 'bois' : 'minerai';

            if (state.unlocked && state.enabled) {
                // Une fois débloqué et actif, afficher le statut actif en permanence
                btn.disabled = true;
                btn.querySelector('.btn-cost').textContent = `✅ Actif (1 ${resourceName} / ${interval}s)`;
                btn.classList.add('active');
            } else if (state.unlocked) {
                // Cas où unlocked mais pas encore enabled (ne devrait pas arriver avec le nouveau code)
                btn.disabled = false;
                btn.querySelector('.btn-cost').textContent = `▶️ Activer (1 ${resourceName} / ${interval}s)`;
            } else {
                // Pas encore débloqué
                btn.disabled = (woodAmount < 50 || oreAmount < 50);
                btn.querySelector('.btn-cost').textContent = `🪵${woodAmount}/50 ⚒️${oreAmount}/50`;
            }
        });
    }

    /**
     * Met à jour l'affichage des métiers
     */
    updateProfessions() {
        const professions = ['woodcutter', 'miner'];
        
        professions.forEach(profId => {
            const profession = this.game.professionManager.getProfession(profId);
            if (!profession) return;
            
            // Niveau
            const levelEl = document.getElementById(`${profId}-level`);
            if (levelEl) levelEl.textContent = String(profession.level);
            
            // XP
            const xpEl = document.getElementById(`${profId}-xp`);
            const xpReqEl = document.getElementById(`${profId}-xp-required`);
            const xpBarEl = document.getElementById(`${profId}-xp-bar`);
            
            if (xpEl) xpEl.textContent = String(Math.floor(profession.xp));
            if (xpReqEl) xpReqEl.textContent = String(profession.getXpForNextLevel());
            
            if (xpBarEl) {
                const xpPercent = (profession.xp / profession.getXpForNextLevel()) * 100;
                xpBarEl.style.setProperty('width', `${Math.min(100, xpPercent)}%`, 'important');
            }
        });
    }

    /**
     * Met à jour l'inventaire des ressources
     */
    updateInventory() {
        let inventory = this.game.professionManager.getInventory();
        
        // Appliquer le filtre
        if (this.currentFilter && this.currentFilter !== 'all') {
            inventory = inventory.filter(item => {
                const type = this.game.professionManager.getResourceType(item.resourceId);
                return type === this.currentFilter;
            });
        }
        
        if (inventory.length === 0) {
            this.elements.inventoryGrid.innerHTML = '<p class="text-muted">Aucune ressource pour l\'instant...</p>';
            return;
        }
        
        // Trier par type puis par rareté
        inventory.sort((a, b) => {
            const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'divine'];
            const typeOrder = ['wood', 'ore', 'gems', 'loot'];
            
            const typeA = this.game.professionManager.getResourceType(a.resourceId);
            const typeB = this.game.professionManager.getResourceType(b.resourceId);
            
            if (typeA !== typeB) {
                return typeOrder.indexOf(typeA) - typeOrder.indexOf(typeB);
            }
            
            if (!a.data || !b.data) return 0;
            return rarityOrder.indexOf(a.data.rarity) - rarityOrder.indexOf(b.data.rarity);
        });
        
        // Générer les cartes d'inventaire
        this.elements.inventoryGrid.innerHTML = inventory.map(item => {
            if (!item.data) return '';
            
            const rarityColor = window.RarityColors[item.data.rarity] || '#fff';
            // Utiliser l'icône de la data si disponible, sinon fallback sur le type
            const icon = item.data.icon || 
                        (item.resourceId.startsWith('wood_') ? '🪵' :
                         item.resourceId.startsWith('ore_') ? '⚒️' :
                         item.resourceId.startsWith('gem_') ? '💎' : '🎁');
            
            // Récupérer les infos de stockage
            const limit = this.game.storageManager.getLimit(item.resourceId);
            const percentage = this.game.storageManager.getFillPercentage(item.resourceId);
            const isAlmostFull = this.game.storageManager.isAlmostFull(item.resourceId);
            const isFull = this.game.storageManager.isFull(item.resourceId);
            
            // Classe pour le warning visuel
            let storageClass = '';
            if (isFull) storageClass = 'storage-full';
            else if (isAlmostFull) storageClass = 'storage-warning';
            
            return `
                <div class="inventory-item ${storageClass}" style="border-color: ${rarityColor}">
                    <div class="item-icon">${icon}</div>
                    <div class="item-name" style="color: ${rarityColor}">${item.data.name}</div>
                    <div class="item-amount">
                        ${window.NumberFormatter.format(item.amount)} / ${window.NumberFormatter.format(limit)}
                        ${isFull ? '⚠️' : isAlmostFull ? '⚠️' : ''}
                    </div>
                    <div class="storage-bar">
                        <div class="storage-fill ${storageClass}" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Met à jour l'inventaire de butin de combat (sidebar)
     */
    updateCombatInventory() {
        if (!this.game.professionManager) return;
        
        // Récupérer uniquement les items de type "loot"
        let lootItems = Array.from(this.game.professionManager.inventory.entries())
            .filter(([resourceId]) => resourceId.startsWith('loot_'))
            .map(([resourceId, amount]) => ({
                resourceId,
                amount,
                data: window.findResourceById(resourceId)
            }))
            .filter(item => item.data && item.amount > 0);
        
        if (lootItems.length === 0) {
            this.elements.combatInventoryGrid.innerHTML = '<p class="text-muted">Aucun butin pour l\'instant...</p>';
            return;
        }
        
        // Trier par rareté (du plus commun au plus rare)
        const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'divine'];
        lootItems.sort((a, b) => {
            return rarityOrder.indexOf(a.data.rarity) - rarityOrder.indexOf(b.data.rarity);
        });
        
        // Afficher les items (max 10 pour ne pas surcharger)
        this.elements.combatInventoryGrid.innerHTML = lootItems.slice(0, 10).map(item => {
            const rarityColor = window.RarityColors[item.data.rarity] || '#fff';
            return `
                <div class="combat-loot-item" style="border-left: 3px solid ${rarityColor}">
                    <span class="loot-icon">${item.data.icon}</span>
                    <span class="loot-name">${item.data.name}</span>
                    <span class="loot-amount">x${item.amount}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Confirme et vend l'inventaire d'équipement (sélectivement)
     * @param {string} maxQuality - 'normal', 'superior', 'exceptional', 'perfect', 'all'
     */
    confirmSellInventory(maxQuality = 'all') {
        const inventory = this.game.equipmentManager.getInventory();
        
        if (inventory.length === 0) {
            this.showNotification('Votre sac est vide !', 'info');
            return;
        }

        // Analyser ce qui sera vendu
        const qualityOrder = ['normal', 'superior', 'exceptional', 'perfect', 'masterwork'];
        const maxIndex = maxQuality === 'all' ? 999 : qualityOrder.indexOf(maxQuality);
        
        const toSell = {
            normal: { count: 0, gold: 0 },
            superior: { count: 0, gold: 0 },
            exceptional: { count: 0, gold: 0 },
            perfect: { count: 0, gold: 0 },
            masterwork: { count: 0, gold: 0 },
            locked: { count: 0 }
        };

        let totalGold = 0;
        let totalCount = 0;

        for (const equipment of inventory) {
            if (equipment.locked) {
                toSell.locked.count++;
                continue;
            }

            const qualityIndex = qualityOrder.indexOf(equipment.quality || 'normal');
            if (maxQuality === 'all' || qualityIndex <= maxIndex) {
                const price = this.game.equipmentManager.calculateSellPrice(equipment);
                const quality = equipment.quality || 'normal';
                toSell[quality].count++;
                toSell[quality].gold += price;
                totalGold += price;
                totalCount++;
            }
        }

        if (totalCount === 0) {
            const lockedMsg = toSell.locked.count > 0 ? 
                `\n\n🔒 ${toSell.locked.count} équipement${toSell.locked.count > 1 ? 's verrouillés' : ' verrouillé'}` : '';
            this.showNotification(`Aucun équipement à vendre !${lockedMsg}`, 'info');
            return;
        }

        // Construire le message de confirmation
        const qualityNames = {
            normal: 'Normal',
            superior: 'Supérieur ✨',
            exceptional: 'Exceptionnel 💎',
            perfect: 'Parfait ⭐',
            masterwork: 'Œuvre 👑'
        };

        let detailLines = [];
        for (const quality of qualityOrder) {
            if (toSell[quality].count > 0) {
                const emoji = quality === 'perfect' || quality === 'masterwork' ? '⚠️ ' : '';
                detailLines.push(
                    `${emoji}${qualityNames[quality]} : ${toSell[quality].count} × (${toSell[quality].gold} or)`
                );
            }
        }

        const lockedNote = toSell.locked.count > 0 ? 
            `\n\n🔒 ${toSell.locked.count} équipement${toSell.locked.count > 1 ? 's verrouillés ne seront PAS vendus' : ' verrouillé ne sera PAS vendu'}` : '';

        const confirmed = confirm(
            `⚠️ CONFIRMATION DE VENTE ⚠️\n\n` +
            `Êtes-vous sûr de vouloir vendre ces équipements ?\n\n` +
            detailLines.join('\n') +
            `\n\n� TOTAL : ${totalCount} équipement${totalCount > 1 ? 's' : ''} pour ${totalGold} or` +
            lockedNote +
            `\n\nCette action est IRRÉVERSIBLE !`
        );
        
        if (confirmed) {
            let result;
            if (maxQuality === 'all') {
                result = this.game.equipmentManager.sellAllInventory();
            } else {
                result = this.game.equipmentManager.sellByQuality(maxQuality);
            }

            // Message de succès détaillé
            let successMsg = `🎉 Vendu ${result.count} équipement${result.count > 1 ? 's' : ''} pour ${result.gold} or !`;
            if (toSell.locked.count > 0) {
                successMsg += ` (${toSell.locked.count} verrouillé${toSell.locked.count > 1 ? 's' : ''} conservé${toSell.locked.count > 1 ? 's' : ''})`;
            }

            this.showNotification(successMsg, 'success');
            
            // Mettre à jour tous les affichages
            this.updateEquipmentInventory();
            this.updateInventory();
            this.updateEquipment();
            this.update();
        }
    }

    /**
     * ========================================
     * SAUVEGARDE / CHARGEMENT
     * ========================================
     */

    /**
     * Met à jour l'affichage de l'équipement
     */
    updateEquipment() {
        const equipped = this.game.equipmentManager.getAllEquipped();
        const totalStats = this.game.equipmentManager.getTotalStats();
        const player = this.game.player;
        
        // Mettre à jour tous les slots
        const slots = ['helmet', 'amulet', 'weapon', 'chest', 'offhand', 'gloves', 'ring1', 'ring2', 'legs', 'boots'];
        
        slots.forEach(slot => {
            const slotElement = document.querySelector(`.equipment-slot[data-slot="${slot}"]`);
            if (!slotElement) return;
            
            const equippedItem = equipped.find(e => e.slot === slot);
            
            if (equippedItem) {
                const equipment = equippedItem.equipment;
                slotElement.classList.remove('empty');
                slotElement.classList.add('equipped');
                
                // Ajouter les attributs de rareté et qualité pour les effets visuels
                slotElement.setAttribute('data-rarity', equipment.rarity);
                if (equipment.quality) {
                    slotElement.setAttribute('data-quality', equipment.quality);
                }
                
                // Appliquer la couleur de bordure : priorité à la qualité si > normal, sinon rareté
                let borderColor;
                if (equipment.quality && equipment.quality !== 'normal') {
                    borderColor = equipment.getQualityColor();
                } else {
                    borderColor = equipment.getRarityColor();
                }
                slotElement.style.borderColor = borderColor;
                slotElement.style.borderWidth = '3px';
                slotElement.style.borderStyle = 'solid';
                
                // Afficher le nom avec l'icône de qualité
                const qualityIcon = equipment.quality !== 'normal' ? ` ${equipment.getQualityIcon()}` : '';
                slotElement.querySelector('.slot-item-name').textContent = equipment.name + qualityIcon;
                
                // Ajouter/mettre à jour les stats dans le slot
                let statsDiv = slotElement.querySelector('.slot-stats');
                if (!statsDiv) {
                    statsDiv = document.createElement('div');
                    statsDiv.className = 'slot-stats';
                    slotElement.appendChild(statsDiv);
                }
                
                const stats = equipment.getStatsDisplay();
                statsDiv.innerHTML = stats.length > 0 
                    ? stats.map(s => `<div class="slot-stat">${s}</div>`).join('') 
                    : '<div class="slot-stat">Aucun bonus</div>';
                
                // Ajouter tooltip avec niveau requis et qualité
                const qualityText = equipment.quality !== 'normal' ? `\nQualité: ${equipment.getQualityName()} ${equipment.getQualityIcon()}` : '';
                slotElement.title = `${equipment.name}${qualityText}\n${equipment.description}\nNiveau requis: ${equipment.requiredLevel}\n\nClic pour déséquiper`;
                
                // Ajouter événement de clic pour déséquiper
                slotElement.onclick = () => {
                    this.game.equipmentManager.unequip(slot);
                    this.updateEquipment();
                    this.updateEquipmentInventory();
                };
            } else {
                slotElement.classList.add('empty');
                slotElement.classList.remove('equipped');
                slotElement.removeAttribute('data-quality');
                slotElement.removeAttribute('data-rarity');
                slotElement.style.borderColor = '';
                slotElement.style.borderWidth = '';
                slotElement.style.borderStyle = '';
                slotElement.querySelector('.slot-item-name').textContent = 'Vide';
                slotElement.title = '';
                
                // Retirer les stats si elles existent
                const statsDiv = slotElement.querySelector('.slot-stats');
                if (statsDiv) {
                    statsDiv.remove();
                }
                
                slotElement.onclick = null;
            }
        });
        
        // Mettre à jour les statistiques du joueur avec bonus
        document.getElementById('playerForceTotal').textContent = player.stats.force + totalStats.force;
        document.getElementById('playerForceBonus').textContent = totalStats.force > 0 ? `(+${totalStats.force})` : '';
        
        document.getElementById('playerAgilityTotal').textContent = player.stats.agility + totalStats.agility;
        document.getElementById('playerAgilityBonus').textContent = totalStats.agility > 0 ? `(+${totalStats.agility})` : '';
        
        document.getElementById('playerIntelligenceTotal').textContent = player.stats.intelligence + totalStats.intelligence;
        document.getElementById('playerIntelligenceBonus').textContent = totalStats.intelligence > 0 ? `(+${totalStats.intelligence})` : '';
        
        document.getElementById('playerWisdomTotal').textContent = player.stats.wisdom + totalStats.wisdom;
        document.getElementById('playerWisdomBonus').textContent = totalStats.wisdom > 0 ? `(+${totalStats.wisdom})` : '';
        
        document.getElementById('playerEnduranceTotal').textContent = player.stats.endurance + totalStats.endurance;
        document.getElementById('playerEnduranceBonus').textContent = totalStats.endurance > 0 ? `(+${totalStats.endurance})` : '';
        
        // Dégâts (utilise la vraie formule du Player)
        const actualDamage = player.calculateDamage();
        document.getElementById('playerDamageTotal').textContent = actualDamage;
        const equipDamageBonus = totalStats.damage + (totalStats.force * (window.GameConfig?.COMBAT?.DAMAGE_FORMULA?.FORCE_MULTIPLIER || 0.5));
        document.getElementById('playerDamageBonus').textContent = equipDamageBonus > 0 ? `(+${Math.floor(equipDamageBonus)})` : '';
        
        // Défense (équipement uniquement)
        document.getElementById('playerDefenseTotal').textContent = totalStats.defense;
        document.getElementById('playerDefenseBonus').textContent = totalStats.defense > 0 ? `(+${totalStats.defense})` : '';
        
        // XP Métiers et Drop Rate
        document.getElementById('playerProfessionXPTotal').textContent = `${totalStats.professionXP}%`;
        document.getElementById('playerProfessionXPBonus').textContent = totalStats.professionXP > 0 ? `(+${totalStats.professionXP}%)` : '';
        
        document.getElementById('playerDropRateTotal').textContent = `${totalStats.dropRate}%`;
        document.getElementById('playerDropRateBonus').textContent = totalStats.dropRate > 0 ? `(+${totalStats.dropRate}%)` : '';
    }
    
    /**
     * Met à jour l'inventaire d'équipement
     */
    updateEquipmentInventory() {
        const inventory = this.game.equipmentManager.getInventory();
        const container = document.getElementById('equipmentInventory');
        
        if (inventory.length === 0) {
            container.innerHTML = '<p class="text-muted">Votre sac est vide.</p>';
            return;
        }
        
        const playerLevel = this.game.player.level;
        
        container.innerHTML = inventory.map(equipment => {
            const canEquip = playerLevel >= equipment.requiredLevel;
            const levelReqText = equipment.requiredLevel > 1 ? `Niveau ${equipment.requiredLevel} requis` : '';
            const qualityIcon = equipment.getQualityIcon();
            const qualityName = equipment.getQualityName();
            const qualityColor = equipment.getQualityColor();
            const isLocked = equipment.locked || false;
            const sellPrice = this.game.equipmentManager.calculateSellPrice(equipment);
            
            return `
            <div class="equipment-item-card ${!canEquip ? 'level-locked' : ''} ${isLocked ? 'locked-item' : ''}" 
                 data-rarity="${equipment.rarity}" 
                 data-quality="${equipment.quality}"
                 data-id="${equipment.id}"
                 style="border-left: 4px solid ${qualityColor};">
                <div class="equipment-item-header">
                    <span class="equipment-item-icon">${equipment.icon}</span>
                    <div class="equipment-item-name-wrapper">
                        <span class="equipment-item-name">${equipment.name} ${qualityIcon}</span>
                        ${equipment.quality !== 'normal' ? `<span class="equipment-quality" style="color: ${qualityColor};">${qualityName}</span>` : ''}
                        ${levelReqText ? `<span class="equipment-level-req ${!canEquip ? 'unmet' : 'met'}">${levelReqText}</span>` : ''}
                    </div>
                    <button class="btn-lock" data-id="${equipment.id}" title="${isLocked ? 'Déverrouiller' : 'Verrouiller'}">
                        ${isLocked ? '🔒' : '🔓'}
                    </button>
                </div>
                <div class="equipment-item-stats">
                    ${equipment.getStatsDisplay().map(stat => `<span>${stat}</span>`).join('')}
                    <span style="color: #FFD700;">💰 ${window.NumberFormatter.format(sellPrice)} or</span>
                </div>
                <button class="btn-equip" data-id="${equipment.id}" ${!canEquip ? 'disabled' : ''}>
                    ${!canEquip ? '🔒 Niveau insuffisant' : 'Équiper'}
                </button>
            </div>
        `;
        }).join('');
        
        // Ajouter les événements de clic sur les boutons Équiper
        container.querySelectorAll('.btn-equip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const equipmentId = btn.dataset.id;
                const equipment = inventory.find(e => e.id === equipmentId);
                if (equipment && this.game.equipmentManager.equip(equipment)) {
                    this.updateEquipment();
                    this.updateEquipmentInventory();
                }
            });
        });

        // Ajouter les événements de clic sur les boutons Verrouiller
        container.querySelectorAll('.btn-lock').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const equipmentId = btn.dataset.id;
                this.game.equipmentManager.toggleLock(equipmentId);
                this.updateEquipmentInventory();
            });
        });
    }

    /**
     * Met à jour l'onglet Fabrication
     */
    updateCraftingTab() {
        // Mettre à jour la liste des recettes
        this.updateCraftRecipes();
        
        // Mettre à jour les niveaux de profession
        this.updateCraftingProfessions();
        
        // Mettre à jour le panneau de détail si une recette est sélectionnée
        if (this.selectedRecipeId) {
            this.showRecipeDetail(this.selectedRecipeId);
        }
    }

    /**
     * Met à jour les niveaux des professions de craft
     */
    updateCraftingProfessions() {
        const professions = ['blacksmith', 'armorsmith', 'jeweler'];
        
        professions.forEach(profId => {
            const profession = this.game.professionManager.getProfession(profId);
            if (!profession) return;
            
            const card = document.querySelector(`[data-profession="${profId}"]`);
            if (!card) return;
            
            const levelEl = card.querySelector('.craft-prof-level');
            const xpEl = card.querySelector('.craft-prof-xp');
            const xpBar = document.getElementById(`${profId}-xp-bar`);
            
            if (levelEl) levelEl.textContent = `Niveau ${profession.level}`;
            if (xpEl) xpEl.textContent = `${Math.floor(profession.xp)} / ${profession.getXpForNextLevel()} XP`;
            if (xpBar) {
                const xpPercent = (profession.xp / profession.getXpForNextLevel()) * 100;
                xpBar.style.width = `${xpPercent}%`;
            }
        });
    }

    /**
     * Met à jour la liste des recettes
     */
    updateCraftRecipes() {
        const recipesList = document.getElementById('craftRecipesList');
        if (!recipesList) return;
        
        // Récupérer la profession sélectionnée
        const selectedProfession = document.querySelector('.craft-profession-card.selected');
        const professionId = selectedProfession ? selectedProfession.dataset.profession : 'blacksmith';
        
        // Récupérer les recettes pour cette profession
        const recipes = this.game.craftingManager.getRecipesByProfession(professionId);
        
        if (recipes.length === 0) {
            recipesList.innerHTML = '<div class="empty-state"><p class="text-muted">Aucune recette disponible pour ce métier</p></div>';
            return;
        }
        
        recipesList.innerHTML = recipes.map(recipe => {
            const canCraftResult = this.game.craftingManager.canCraft(recipe.id);
            const profession = this.game.professionManager.getProfession(recipe.profession);
            const hasLevel = profession && profession.level >= recipe.professionLevel;
            
            // Afficher les matériaux
            const materialsHtml = recipe.materials.map(mat => {
                const resourceData = window.findResourceById(mat.resourceId);
                const currentAmount = this.game.professionManager.getInventoryAmount(mat.resourceId);
                const hasEnough = currentAmount >= mat.amount;
                
                return `<span class="${hasEnough ? 'text-success' : 'text-danger'}">${resourceData?.icon || '❓'}${currentAmount}/${mat.amount}</span>`;
            }).join(' ');
            
            // Déterminer le statut de la carte : craftable (vert), available (bleu - niveau OK mais pas matériaux), locked (rouge - niveau insuffisant)
            let cardClass = 'locked';
            let statusIcon = '🔒';
            
            if (hasLevel) {
                if (canCraftResult.canCraft) {
                    cardClass = 'craftable';
                    statusIcon = '✅';
                } else {
                    cardClass = 'available';
                    statusIcon = '📦'; // Niveau OK mais manque de matériaux
                }
            }
            
            return `
                <div class="craft-recipe-card ${cardClass}" 
                     data-recipe="${recipe.id}"
                     onclick="window.game.ui.showRecipeDetail('${recipe.id}')">
                    <div class="recipe-icon">${recipe.icon}</div>
                    <div class="recipe-info">
                        <div class="recipe-name ${recipe.rarity}">${recipe.name}</div>
                        <div class="recipe-level ${hasLevel ? 'met' : 'unmet'}">
                            ${hasLevel ? '✅' : '🔒'} Niveau ${recipe.professionLevel} ${hasLevel ? '(débloqué)' : '(requis)'}
                        </div>
                        <div class="recipe-materials">${materialsHtml}</div>
                    </div>
                    <span class="recipe-status">${statusIcon}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Affiche les détails d'une recette
     */
    showRecipeDetail(recipeId) {
        this.selectedRecipeId = recipeId;
        
        const recipe = this.game.craftingManager.getAllRecipes().find(r => r.id === recipeId);
        if (!recipe) return;
        
        const detailPanel = document.getElementById('craftDetailPanel');
        if (!detailPanel) return;
        
        const canCraftResult = this.game.craftingManager.canCraft(recipeId);
        const stats = Object.entries(recipe.stats).map(([stat, value]) => {
            const statName = this.getStatName(stat);
            return `<div class="detail-stat">+${value} ${statName}</div>`;
        }).join('');
        
        const materials = recipe.materials.map(mat => {
            const resourceData = window.findResourceById(mat.resourceId);
            const currentAmount = this.game.professionManager.getInventoryAmount(mat.resourceId);
            const hasEnough = currentAmount >= mat.amount;
            
            return `
                <div class="detail-material ${hasEnough ? 'has' : 'missing'}">
                    ${resourceData ? resourceData.icon : '❓'} ${resourceData ? resourceData.name : mat.resourceId}: 
                    <span class="${hasEnough ? 'text-success' : 'text-danger'}">${currentAmount}/${mat.amount}</span>
                </div>
            `;
        }).join('');
        
        const craftProgress = this.game.craftingManager.getCraftProgress();
        const isCraftingThis = craftProgress.isCrafting && craftProgress.recipe && craftProgress.recipe.id === recipeId;
        
        // Calculer le prix de vente et profit/min
        const tempEquipment = {
            rarity: recipe.rarity,
            requiredLevel: recipe.requiredLevel
        };
        const sellPrice = this.game.craftingManager.calculateSellPrice(tempEquipment);
        const profitPerMin = this.game.craftingManager.calculateProfitPerMinute(recipe.id);
        
        const isAutoCrafting = this.game.craftingManager.autoCraftState.enabled && 
                               this.game.craftingManager.autoCraftState.recipeId === recipe.id;
        
        detailPanel.innerHTML = `
            <div class="craft-detail-header">
                <div class="detail-icon ${recipe.rarity}">${recipe.icon}</div>
                <div class="detail-title">
                    <h3>${recipe.name}</h3>
                    <p class="detail-description">${recipe.description}</p>
                </div>
            </div>
            
            <div class="detail-stats">
                <h4>📊 Statistiques</h4>
                ${stats}
            </div>
            
            <div class="detail-requirements">
                <h4>📦 Matériaux requis</h4>
                ${materials}
            </div>
            
            <div class="detail-info">
                <div style="color: var(--color-success);">⚡ INSTANTANÉ</div>
                <div>🔧 Niveau requis: ${recipe.professionLevel}</div>
                <div>🎭 Niveau équipement: ${recipe.requiredLevel}</div>
                <div>💰 Prix de vente: ${NumberFormatter.format(sellPrice)} or</div>
                <div style="color: var(--color-success); font-weight: bold;">💸 Profit: ~${NumberFormatter.format(profitPerMin)} or/min</div>
            </div>
            
            <div class="craft-actions" style="display: flex; gap: 10px; flex-direction: column; margin-top: 15px;">
                ${isAutoCrafting ? `
                    <div style="padding: 12px; background: rgba(46, 204, 113, 0.1); border: 2px solid var(--color-success); border-radius: 8px; text-align: center;">
                        <div style="color: var(--color-success); font-weight: bold; margin-bottom: 8px;">
                            🔄 Auto-Craft ACTIF
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">
                            Mode: ${this.game.craftingManager.autoCraftState.sellDirectly ? '💰 Vente directe' : '📦 Inventaire'}
                        </div>
                        <button class="btn btn-danger" style="margin-top: 8px; width: 100%;"
                                onclick="window.game.ui.stopAutoCraft()">
                            🛑 Arrêter l'Auto-Craft
                        </button>
                    </div>
                ` : `
                    <button class="btn btn-primary" 
                            ${!canCraftResult.canCraft ? 'disabled' : ''}
                            onclick="window.game.ui.craftRecipe('${recipe.id}', false)">
                        ${canCraftResult.canCraft ? '🔨 Fabriquer (1x)' : `🔒 ${canCraftResult.reason}`}
                    </button>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn btn-success" 
                                ${!canCraftResult.canCraft ? 'disabled' : ''}
                                onclick="window.game.ui.startAutoCraft('${recipe.id}', true)"
                                title="Craft en continu et vend automatiquement (ne pollue pas l'inventaire)">
                            🔄💰 Auto-Craft + Vente
                        </button>
                        
                        <button class="btn btn-secondary" 
                                ${!canCraftResult.canCraft ? 'disabled' : ''}
                                onclick="window.game.ui.startAutoCraft('${recipe.id}', false)"
                                title="Craft en continu et ajoute à l'inventaire">
                            🔄📦 Auto-Craft
                        </button>
                    </div>
                    
                    <button class="btn" style="background: var(--color-warning);" 
                            ${!canCraftResult.canCraft ? 'disabled' : ''}
                            onclick="window.game.ui.craftRecipe('${recipe.id}', true)"
                            title="Fabrique une fois et vend immédiatement">
                        💰 Fabriquer et Vendre (1x)
                    </button>
                `}
            </div>
        `;
    }

    /**
     * Lance le craft d'une recette
     */
    craftRecipe(recipeId, sellDirectly = false) {
        const success = this.game.craftingManager.startCraft(recipeId, sellDirectly);
        
        if (success) {
            // Notifications supprimées : déjà affichées dans crafting-manager avec détails qualité/rareté
            this.updateCraftRecipes();
            this.showRecipeDetail(recipeId);
        } else {
            this.showNotification('❌ Impossible de fabriquer', 'error');
        }
    }

    /**
     * Démarre l'auto-craft
     */
    startAutoCraft(recipeId, sellDirectly = true) {
        this.game.craftingManager.startAutoCraft(recipeId, sellDirectly);
        this.showNotification(
            sellDirectly ? '🔄💰 Auto-Craft avec vente activé !' : '🔄📦 Auto-Craft activé !',
            'success'
        );
        this.showRecipeDetail(recipeId);
    }

    /**
     * Arrête l'auto-craft
     */
    stopAutoCraft() {
        const recipeId = this.game.craftingManager.autoCraftState.recipeId;
        this.game.craftingManager.stopAutoCraft();
        this.showNotification('🛑 Auto-Craft arrêté', 'info');
        if (recipeId) {
            this.showRecipeDetail(recipeId);
        }
    }

    /**
     * ========================================
     * VILLE / BÂTIMENTS
     * ========================================
     */

    /**
     * Met à jour l'onglet Ville
     */
    updateTownTab() {
        this.updateBuildingsGrid();
        this.updateTownProductionSummary();
    }

    /**
     * Met à jour la grille des bâtiments
     */
    updateBuildingsGrid() {
        const container = document.getElementById('buildingsGrid');
        if (!container) return;
        
        const buildings = this.game.buildingManager.getAllBuildings();
        
        // Filtrer les bâtiments non débloqués
        const unlockedBuildings = buildings.filter(building => 
            this.game.buildingManager.isBuildingUnlocked(building.id)
        );
        
        container.innerHTML = unlockedBuildings.map(building => {
            const isBuilt = building.isBuilt();
            const canUpgrade = this.game.buildingManager.canUpgrade(building.id);
            const cost = building.getUpgradeCost();
            const production = building.getCurrentProduction();
            const nextLevelProduction = this.calculateNextLevelProduction(building);
            
            // Vérifier si au moins une ressource produite est pleine
            let isStorageBlocked = false;
            if (isBuilt) {
                for (const resourceId in production) {
                    if (this.game.storageManager.isFull(resourceId)) {
                        isStorageBlocked = true;
                        break;
                    }
                }
            }
            
            // Vérifier le niveau de profession requis
            let professionLock = '';
            if (building.profession && building.professionLevelRequired > 0) {
                const profession = this.game.professionManager.getProfession(building.profession);
                if (!profession || profession.level < building.professionLevelRequired) {
                    professionLock = `<div class="building-lock">🔒 Nécessite ${building.profession} niveau ${building.professionLevelRequired}</div>`;
                }
            }
            
            return `
                <div class="building-card ${isBuilt ? 'built' : 'not-built'} ${isStorageBlocked ? 'storage-blocked' : ''}">
                    ${isBuilt ? `<div class="building-level-badge">Niv. ${building.level}</div>` : ''}
                    <div class="building-icon">${building.icon}</div>
                    <div class="building-info">
                        <h3>${building.name}</h3>
                        <p class="building-description">${building.description}</p>
                        
                        ${professionLock}
                        
                        ${isBuilt ? `
                            <div class="building-production">
                                ${building.id === 'warehouse' ? `
                                    <strong>📦 Bonus de stockage actuel :</strong>
                                    <div>+${NumberFormatter.format(this.game.storageManager.getWarehouseBonus())} pour Bois, Minerais, Gemmes</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">
                                        Limite actuelle : ${NumberFormatter.format(this.game.storageManager.baseLimitResources + this.game.storageManager.getWarehouseBonus())} par ressource
                                    </div>
                                ` : building.id === 'treasury' ? `
                                    <strong>🏰 Bonus de stockage actuel :</strong>
                                    <div>+${NumberFormatter.format(this.game.storageManager.getTreasuryBonus())} pour le Butin de combat</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">
                                        Limite actuelle : ${NumberFormatter.format(this.game.storageManager.baseLimitLoot + this.game.storageManager.getTreasuryBonus())} par butin
                                    </div>
                                ` : `
                                    <strong>📦 Production actuelle :</strong>
                                    ${Object.entries(production).map(([resourceId, amount]) => {
                                        const resource = window.findResourceById(resourceId);
                                        return `<div>${resource?.icon || '📦'} ${resource?.name || resourceId} : +${NumberFormatter.format(amount)}/min</div>`;
                                    }).join('')}
                                `}
                            </div>
                        ` : ''}
                        
                        <div class="building-next-level">
                            <strong>${isBuilt ? '⬆️ Prochain niveau' : '🏗️ Construction'} :</strong>
                            <div class="building-cost">
                                <div class="cost-title">💰 Coût :</div>
                                ${Object.entries(cost).map(([resourceId, amount]) => {
                                    if (resourceId === 'gold') {
                                        const currentGold = this.game.player.resources.gold;
                                        const hasEnough = currentGold >= amount;
                                        const percentage = Math.min(100, (currentGold / amount) * 100);
                                        return `<div class="cost-item ${hasEnough ? 'has-enough' : 'not-enough'}">
                                            <div class="cost-item-header">
                                                💰 ${NumberFormatter.format(amount)} or
                                                <span class="current-amount">(${NumberFormatter.format(currentGold)}/${NumberFormatter.format(amount)})</span>
                                            </div>
                                            <div class="cost-progress-bar">
                                                <div class="cost-progress-fill ${hasEnough ? 'complete' : ''}" style="width: ${percentage}%"></div>
                                            </div>
                                        </div>`;
                                    } else {
                                        const resource = window.findResourceById(resourceId);
                                        const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
                                        const hasEnough = currentAmount >= amount;
                                        const percentage = Math.min(100, (currentAmount / amount) * 100);
                                        return `<div class="cost-item ${hasEnough ? 'has-enough' : 'not-enough'}">
                                            <div class="cost-item-header">
                                                ${resource?.icon || '📦'} ${NumberFormatter.format(amount)} ${resource?.name || resourceId}
                                                <span class="current-amount">(${NumberFormatter.format(currentAmount)}/${NumberFormatter.format(amount)})</span>
                                            </div>
                                            <div class="cost-progress-bar">
                                                <div class="cost-progress-fill ${hasEnough ? 'complete' : ''}" style="width: ${percentage}%"></div>
                                            </div>
                                        </div>`;
                                    }
                                }).join('')}
                            </div>
                            <div class="building-production-gain">
                                ${building.id === 'warehouse' ? `
                                    <div class="bonus-preview">
                                        <strong>${isBuilt ? '📦 Après amélioration :' : '📦 Après construction :'}</strong>
                                        <div>+${NumberFormatter.format((building.level + 1) * 500)} total pour Bois/Minerais/Gemmes</div>
                                        <div style="color: var(--color-success); font-size: 0.9rem;">
                                            ${isBuilt ? `(+500 supplémentaires)` : `(+500 par ressource)`}
                                        </div>
                                    </div>
                                ` : building.id === 'treasury' ? `
                                    <div class="bonus-preview">
                                        <strong>${isBuilt ? '🏰 Après amélioration :' : '🏰 Après construction :'}</strong>
                                        <div>+${NumberFormatter.format((building.level + 1) * 250)} total pour le Butin</div>
                                        <div style="color: var(--color-success); font-size: 0.9rem;">
                                            ${isBuilt ? `(+250 supplémentaires)` : `(+250 par butin)`}
                                        </div>
                                    </div>
                                ` : `
                                    <div class="bonus-preview">
                                        <strong>${isBuilt ? '📦 Nouvelle production :' : '📦 Production :'}</strong>
                                        ${Object.entries(nextLevelProduction).map(([resourceId, amount]) => {
                                            const resource = window.findResourceById(resourceId);
                                            return `<div>${resource?.icon || '📦'} ${NumberFormatter.format(amount)}/min</div>`;
                                        }).join('')}
                                    </div>
                                `}
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-upgrade-building" 
                                ${!canUpgrade ? 'disabled' : ''}
                                onclick="window.game.ui.upgradeBuilding('${building.id}')">
                            ${isBuilt ? '⬆️ Améliorer' : '🏗️ Construire'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Calcule la production du prochain niveau
     */
    calculateNextLevelProduction(building) {
        const nextLevel = building.level + 1;
        const production = {};
        
        for (const [resource, amount] of Object.entries(building.baseProduction)) {
            production[resource] = Math.floor(amount * Math.pow(building.productionMultiplier, nextLevel - 1));
        }
        
        return production;
    }

    /**
     * Met à jour le résumé de production de la ville
     */
    updateTownProductionSummary() {
        const container = document.getElementById('townProductionSummary');
        if (!container) return;
        
        const totalProduction = this.game.buildingManager.getTotalProduction();
        
        if (Object.keys(totalProduction).length === 0) {
            container.innerHTML = '<p class="text-muted">Aucune production active. Construisez des bâtiments !</p>';
            return;
        }
        
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
                <h3 style="margin: 0; font-size: 1.2rem; font-weight: bold;">📊 Production Totale</h3>
                <span style="color: var(--text-secondary); font-size: 0.85rem; font-style: italic;">par minute</span>
            </div>
            <div class="production-grid" style="display: flex; gap: 16px; flex-wrap: wrap;">
                ${Object.entries(totalProduction).map(([resourceId, amountPerSecond]) => {
                    const resource = window.findResourceById(resourceId);
                    const amountPerMinute = Math.floor(amountPerSecond * 60);
                    
                    // Récupérer les infos de stockage
                    const current = this.game.storageManager.getCurrentAmount(resourceId);
                    const limit = this.game.storageManager.getLimit(resourceId);
                    const isFull = this.game.storageManager.isFull(resourceId);
                    const isAlmostFull = this.game.storageManager.isAlmostFull(resourceId);
                    
                    return `
                        <div class="production-summary-item ${isFull ? 'storage-full' : isAlmostFull ? 'storage-warning' : ''}">
                            <div class="production-summary-icon">${resource?.icon || '📦'}</div>
                            <div>
                                <div class="production-summary-value">+${NumberFormatter.format(amountPerMinute)}/min</div>
                                <div class="production-summary-label">${resource?.name || resourceId}</div>
                                <div style="font-size: 0.75rem; color: ${isFull ? '#ff6b6b' : isAlmostFull ? '#ffa500' : 'var(--text-secondary)'};">
                                    ${NumberFormatter.format(current)} / ${NumberFormatter.format(limit)} ${isFull ? '⚠️ PLEIN' : isAlmostFull ? '⚠️' : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Améliore un bâtiment
     */
    upgradeBuilding(buildingId) {
        const building = this.game.buildingManager.getBuilding(buildingId);
        const wasBuilt = building.isBuilt();
        
        const success = this.game.buildingManager.upgradeBuilding(buildingId);
        
        if (success) {
            const message = wasBuilt ? 
                `✅ ${building.icon} ${building.name} amélioré au niveau ${building.level} !` :
                `🎉 ${building.icon} ${building.name} construit !`;
            
            this.showNotification(message, 'success');
            this.updateTownTab();
            this.updateInventory(); // Mettre à jour l'or
        } else {
            this.showNotification('❌ Impossible d\'améliorer ce bâtiment', 'error');
        }
    }

    /**
     * Obtient le nom français d'une stat
     */
    getStatName(stat) {
        const names = {
            force: 'Force',
            agility: 'Agilité',
            intelligence: 'Intelligence',
            wisdom: 'Sagesse',
            endurance: 'Endurance',
            damage: 'Dégâts',
            defense: 'Défense',
            professionXP: 'XP Métier',
            dropRate: 'Taux de Drop'
        };
        return names[stat] || stat;
    }

    /**
     * Exporte l'état de l'UI pour sauvegarde
     */
    toJSON() {
        return {
            unlockedTabs: this.unlockedTabs
        };
    }

    /**
     * Restaure l'état de l'UI depuis une sauvegarde
     */
    fromJSON(data) {
        if (data.unlockedTabs) {
            this.unlockedTabs = data.unlockedTabs;
            
            // Restaurer visuellement les tabs débloqués
            this.unlockedTabs.forEach(tabName => {
                const tab = document.querySelector(`[data-tab="${tabName}"]`);
                if (tab && tab.classList.contains('disabled')) {
                    tab.classList.remove('disabled');
                }
            });
        }
    }

    /**
     * Toggle le panneau d'options
     */
    toggleOptionsPanel() {
        const panel = document.getElementById('optionsPanel');
        if (panel.style.display === 'none' || !panel.style.display) {
            panel.style.display = 'flex';
            // Mettre à jour la dernière sauvegarde
            const lastSaveOptions = document.getElementById('lastSaveOptions');
            const lastSave = document.getElementById('lastSave');
            if (lastSaveOptions && lastSave) {
                lastSaveOptions.textContent = lastSave.textContent;
            }
        } else {
            panel.style.display = 'none';
        }
    }

    /**
     * Affiche le texte de sauvegarde pour copier/coller
     */
    showSaveText() {
        const saveText = this.game.exportSaveAsText();
        if (saveText) {
            const message = `Copie ce texte pour sauvegarder ta progression :\n\n${saveText}`;
            
            // Créer une zone de texte temporaire
            const textarea = document.createElement('textarea');
            textarea.value = saveText;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                this.showNotification('Sauvegarde copiée dans le presse-papier !', 'success');
            } catch (err) {
                // Fallback: afficher dans un prompt
                prompt(message, saveText);
            }
            
            document.body.removeChild(textarea);
        }
    }

    /**
     * Affiche le dialogue pour importer depuis texte
     */
    showImportTextDialog() {
        const saveText = prompt('Colle ta sauvegarde encodée ici :');
        if (saveText && saveText.trim()) {
            this.game.importSaveFromText(saveText.trim());
        }
    }

    /**
     * Gère l'import depuis fichier
     */
    handleImportFile(event) {
        const file = event.target.files[0];
        if (file) {
            this.game.importSaveFromFile(file);
        }
        // Réinitialiser l'input pour permettre de re-sélectionner le même fichier
        event.target.value = '';
    }

    /**
     * Confirmation avant reset
     */
    confirmReset() {
        const confirmation = confirm('⚠️ ATTENTION ! Cela supprimera TOUTE ta progression de manière IRRÉVERSIBLE.\n\nEs-tu absolument sûr de vouloir réinitialiser le jeu ?');
        if (confirmation) {
            const doubleConfirm = confirm('Dernière chance ! Confirmes-tu la suppression de ta sauvegarde ?');
            if (doubleConfirm) {
                this.game.reset();
                this.toggleOptionsPanel();
            }
        }
    }

    /**
     * Affiche la popup de production offline
     * @param {string} message - Message HTML à afficher
     */
    showOfflinePopup(message) {
        const popup = document.createElement('div');
        popup.className = 'offline-popup';
        popup.innerHTML = `
            <div class="offline-popup-content">
                <div class="offline-popup-message">${message}</div>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    OK
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.UI = UI;
}
