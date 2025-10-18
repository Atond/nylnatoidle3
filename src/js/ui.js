/**
 * Classe UI - Gestion de l'interface utilisateur
 */

class UI {
    constructor(game) {
        this.game = game;
        this.notificationOffset = 0; // Pour empiler les notifications verticalement
        this.unlockedTabs = ['home', 'combat', 'quests', 'gathering']; // Tabs débloqués par défaut (equipment/crafting se débloquent avec auto-récoltes)
        
        // 🛡️ FIX: Flag pour éviter double-appel updateInventory()
        this.isUpdatingInventory = false;
        
        // ⚡ OPTIMISATION: Cache pour éviter re-calculs
        this.cachedValues = {
            playerHpPercent: 0,
            monsterHpPercent: 0,
            playerXpPercent: 0,
            lastHpCheck: 0
        };
        
        // ⚡ OPTIMISATION: Cache des query selectors fréquents
        this.cachedElements = {
            playerName: null,
            tabs: null,
            initialized: false
        };
        
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
        
        // 🧪 Mettre à jour l'alchimie (conversions, queue, unlock)
        this.updateAlchemy();
        
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
        
        // Nom du joueur avec icône de classe - OPTIMISATION : cache querySelector
        if (!this.cachedElements.playerName) {
            this.cachedElements.playerName = document.getElementById('playerName');
        }
        if (this.cachedElements.playerName) {
            const classIcon = player.getClassIcon();
            this.cachedElements.playerName.textContent = `${classIcon} ${player.name}`;
        }
        
        // Niveau
        this.elements.playerLevel.textContent = player.level;
        
        // HP (avec bonus d'équipement) - OPTIMISATION : calcul en cache
        const maxHp = player.getMaxHp();
        const currentHp = Math.floor(player.stats.hp);
        this.elements.playerHp.textContent = currentHp;
        this.elements.playerMaxHp.textContent = maxHp;
        
        // Cache la barre de HP si elle n'a pas changé
        const newHpPercent = player.getHpPercentage();
        if (this.cachedValues.playerHpPercent !== newHpPercent) {
            this.cachedValues.playerHpPercent = newHpPercent;
            this.elements.playerHpBar.style.width = newHpPercent + '%';
        }
        
        // Stats (avec bonus d'équipement) - OPTIMISATION : calcul en cache
        const equipStats = this.game.equipmentManager ? this.game.equipmentManager.calculateTotalStats() : {};
        this.elements.statHp.textContent = maxHp;
        this.elements.statForce.textContent = player.stats.force + (equipStats.force || 0);
        this.elements.statAgility.textContent = player.stats.agility + (equipStats.agility || 0);
        this.elements.statIntelligence.textContent = player.stats.intelligence + (equipStats.intelligence || 0);
        this.elements.statWisdom.textContent = player.stats.wisdom + (equipStats.wisdom || 0);
        this.elements.statEndurance.textContent = player.stats.endurance + (equipStats.endurance || 0);
        
        // XP - OPTIMISATION : calcul en cache
        this.elements.currentXp.textContent = Math.floor(player.xp);
        this.elements.requiredXp.textContent = player.xpRequired;
        
        const newXpPercent = player.getXpPercentage();
        if (this.cachedValues.playerXpPercent !== newXpPercent) {
            this.cachedValues.playerXpPercent = newXpPercent;
            this.elements.xpBar.style.width = newXpPercent + '%';
        }
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
        
        // OPTIMISATION : cache la barre de HP si elle n'a pas changé
        const newMonsterHpPercent = monster.getHpPercentage();
        if (this.cachedValues.monsterHpPercent !== newMonsterHpPercent) {
            this.cachedValues.monsterHpPercent = newMonsterHpPercent;
            this.elements.monsterHpBar.style.width = newMonsterHpPercent + '%';
        }
        
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

        // Mettre à jour la mini-map
        this.updateMinimap();
    }

    /**
     * Met à jour la mini-map des régions
     */
    updateMinimap() {
        const minimapRegions = document.getElementById('minimapRegions');
        if (!minimapRegions) return;

        const combat = this.game.combat;
        if (!combat) return;

        const regionsData = window.RegionsData;
        if (!regionsData || !regionsData.regions) return;
        
        const regions = regionsData.regions;
        const player = this.game.player;

        // Calculer la progression globale
        let totalZones = 0;
        let completedZones = 0;
        
        regions.forEach(region => {
            region.zones.forEach(zone => {
                totalZones++;
                const zoneKey = `${region.id}_${zone.id}`;
                const killed = combat.monstersKilledPerZone[zoneKey] || 0;
                if (killed >= GameConfig.ZONES.MONSTERS_TO_UNLOCK) {
                    completedZones++;
                }
            });
        });

        // Mettre à jour la progression globale
        const globalProgress = document.getElementById('minimapGlobalProgress');
        if (globalProgress) {
            globalProgress.textContent = `${completedZones}/${totalZones}`;
        }

        // Générer les régions
        minimapRegions.innerHTML = '';
        
        regions.forEach((region, index) => {
            const isLocked = player.level < region.levelRange.min;
            const isCurrentRegion = combat.currentRegion === region.id;
            
            // Calculer la progression de cette région
            let regionZonesCompleted = 0;
            let regionTotalZones = region.zones.length;
            
            region.zones.forEach(zone => {
                const zoneKey = `${region.id}_${zone.id}`;
                const killed = combat.monstersKilledPerZone[zoneKey] || 0;
                if (killed >= GameConfig.ZONES.MONSTERS_TO_UNLOCK) {
                    regionZonesCompleted++;
                }
            });
            
            const regionCompleted = regionZonesCompleted === regionTotalZones;
            const progressPercent = Math.floor((regionZonesCompleted / regionTotalZones) * 100);

            // Créer l'élément région
            const regionDiv = document.createElement('div');
            regionDiv.className = 'minimap-region';
            
            if (isLocked) {
                regionDiv.classList.add('locked');
            } else if (isCurrentRegion) {
                regionDiv.classList.add('active');
            } else if (regionCompleted) {
                regionDiv.classList.add('completed');
            }

            // Contenu de la région
            let statusBadge = '';
            if (isLocked) {
                statusBadge = `<span class="minimap-region-badge locked">🔒 Niv. ${region.levelRange.min}</span>`;
            } else if (isCurrentRegion) {
                statusBadge = '<span class="minimap-region-badge current">En cours</span>';
            } else if (regionCompleted) {
                statusBadge = '<span class="minimap-region-badge completed">✓ Terminée</span>';
            }

            regionDiv.innerHTML = `
                <div class="minimap-region-header">
                    <div class="minimap-region-name">
                        <span class="minimap-region-icon">${region.icon}</span>
                        <span>${region.name}</span>
                    </div>
                    <div class="minimap-region-status">
                        ${statusBadge}
                    </div>
                </div>
                <div class="minimap-zones-progress">
                    <div class="minimap-zones-bar">
                        <div class="minimap-zones-bar-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="minimap-zones-text">${regionZonesCompleted}/${regionTotalZones}</div>
                </div>
                <div class="minimap-region-info">
                    <div class="minimap-region-stat">
                        <span>📊</span>
                        <span>Niv. ${region.levelRange.min}+</span>
                    </div>
                    <div class="minimap-region-stat">
                        <span>🗺️</span>
                        <span>${region.zones.length} zones</span>
                    </div>
                </div>
            `;

            // Click sur la région pour y aller (si débloquée)
            if (!isLocked) {
                regionDiv.style.cursor = 'pointer';
                regionDiv.addEventListener('click', () => {
                    // Aller à la première zone de cette région
                    combat.currentRegion = region.id;
                    combat.currentZone = 1;
                    combat.generateMonster();
                    this.update();
                });
            }

            minimapRegions.appendChild(regionDiv);
        });
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
        // 🛡️ FIX: Éviter les double-appels
        if (this.isUpdatingInventory) {
            return;
        }
        
        this.isUpdatingInventory = true;
        
        try {
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
        } finally {
            // 🛡️ FIX: Débloquer le flag
            this.isUpdatingInventory = false;
        }
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
            sellDirectly ? '🔄💰 Auto-Craft avec vente activé!' : '🔄📦 Auto-Craft activé!',
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
                                ` : building.id === 'alchemy_lab' ? `
                                    <strong>🧪 Production alchimique actuelle :</strong>
                                    <div>⚗️ ${NumberFormatter.format(window.calculateLabProductionPerHour(building.level))} conversions/heure</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px;">
                                        (${NumberFormatter.format(window.calculateLabProductionPerMinute(building.level))} conversions/min • ${window.calculateLabProductionPerSecond(building.level).toFixed(2)} conversions/sec)
                                    </div>
                                    <div style="color: var(--accent-primary); font-size: 0.85rem; margin-top: 8px;">
                                        💡 Convertit automatiquement vos ressources T1→T2→T3 en arrière-plan
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
                                ` : building.id === 'alchemy_lab' ? `
                                    <div class="bonus-preview">
                                        <strong>${isBuilt ? '🧪 Après amélioration :' : '🧪 Après construction :'}</strong>
                                        <div>⚗️ ${NumberFormatter.format(window.calculateLabProductionPerHour(building.level + 1))} conversions/heure</div>
                                        <div style="color: var(--color-success); font-size: 0.9rem;">
                                            ${isBuilt ? 
                                                `(×2 production → ${NumberFormatter.format(window.calculateLabProductionPerHour(building.level + 1) - window.calculateLabProductionPerHour(building.level))} conversions/heure supplémentaires)` : 
                                                `(Production passive automatique)`
                                            }
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
        const saveText = prompt('Colle ta sauvegarde ici (JSON ou Base64) :');
        if (saveText && saveText.trim()) {
            try {
                let saveData;
                const trimmed = saveText.trim();
                
                // ✅ Détecter le format automatiquement
                if (trimmed.startsWith('{')) {
                    // JSON brut
                    console.log('🔍 Format détecté: JSON brut');
                    saveData = JSON.parse(trimmed);
                } else {
                    // Base64 encodé
                    console.log('🔍 Format détecté: Base64');
                    const decoded = decodeURIComponent(atob(trimmed));
                    saveData = JSON.parse(decoded);
                }
                
                // Vérifier la validité
                if (!saveData.player || !saveData.player.name) {
                    this.showNotification('Sauvegarde invalide : structure incorrecte', 'error');
                    return;
                }
                
                // Confirmer l'import
                if (confirm('⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?')) {
                    // ✅ PROTECTION 1: Bloquer la session actuelle
                    this.game.stopAutoSave();
                    this.game.isResetting = true;
                    console.log('🛑 Auto-save désactivé et beforeunload bloqué');
                    
                    // ✅ PROTECTION 2: Flag pour la prochaine session
                    localStorage.setItem('nylnato_importing', 'true');
                    
                    // Écrire dans localStorage
                    localStorage.setItem('nylnatoIdleSave_v1', JSON.stringify(saveData));
                    
                    // Vérifier l'écriture
                    const verification = JSON.parse(localStorage.getItem('nylnatoIdleSave_v1'));
                    console.log('✅ Sauvegarde écrite:', verification.player.name, 'niveau', verification.player.level);
                    
                    // Recharger la page
                    this.showNotification(`Sauvegarde de ${saveData.player.name} importée ! Rechargement...`, 'success');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error('❌ Erreur lors de l\'import:', error);
                this.showNotification('Erreur: sauvegarde invalide ou corrompue', 'error');
            }
        }
    }

    /**
     * Gère l'import depuis fichier
     */
    handleImportFile(event) {
        const file = event.target.files[0];
        if (file) {
            // ✅ Utiliser la méthode sécurisée directement ici
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const saveData = JSON.parse(e.target.result);
                    
                    // Vérifier que c'est bien une sauvegarde valide
                    if (!saveData.player || !saveData.player.name) {
                        this.showNotification('Fichier JSON invalide : structure de sauvegarde incorrecte', 'error');
                        return;
                    }
                    
                    // Confirmer l'import
                    if (confirm('⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?')) {
                        // ✅ PROTECTION 1: Bloquer la session actuelle
                        this.game.stopAutoSave();
                        this.game.isResetting = true;
                        console.log('🛑 Auto-save désactivé et beforeunload bloqué');
                        
                        // ✅ PROTECTION 2: Flag pour la prochaine session
                        localStorage.setItem('nylnato_importing', 'true');
                        
                        // Écrire dans localStorage
                        localStorage.setItem('nylnatoIdleSave_v1', JSON.stringify(saveData));
                        
                        // Vérifier l'écriture
                        const verification = JSON.parse(localStorage.getItem('nylnatoIdleSave_v1'));
                        console.log('✅ Sauvegarde écrite:', verification.player.name, 'niveau', verification.player.level);
                        
                        // Recharger la page
                        this.showNotification(`Sauvegarde de ${saveData.player.name} importée ! Rechargement...`, 'success');
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }
                } catch (error) {
                    console.error('❌ Erreur lors de l\'import:', error);
                    this.showNotification('Erreur: fichier JSON invalide', 'error');
                }
            };
            
            reader.onerror = () => {
                this.showNotification('Erreur de lecture du fichier', 'error');
            };
            
            reader.readAsText(file);
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

    // ========== ALCHIMIE ==========

    /**
     * Met à jour l'onglet Alchimie
     */
    updateAlchemy() {
        if (!this.game.alchemyManager) return;

        const alchemy = this.game.alchemyManager;

        // Mettre à jour niveau et XP
        const levelEl = document.getElementById('alchemy-level');
        const xpEl = document.getElementById('alchemy-xp');
        const xpRequiredEl = document.getElementById('alchemy-xp-required');
        const xpBarEl = document.getElementById('alchemy-xp-bar');

        if (levelEl) levelEl.textContent = alchemy.level;
        if (xpEl) xpEl.textContent = Math.floor(alchemy.xp);
        
        const xpRequired = window.ALCHEMY_CONFIG ? window.ALCHEMY_CONFIG.xpFormula(alchemy.level) : 100;
        if (xpRequiredEl) xpRequiredEl.textContent = xpRequired;
        
        const xpPercent = (alchemy.xp / xpRequired) * 100;
        if (xpBarEl) xpBarEl.style.width = `${Math.min(xpPercent, 100)}%`;

        // Mettre à jour conversions disponibles (seulement si niveau a changé)
        if (!this.cachedAlchemyLevel || this.cachedAlchemyLevel !== alchemy.level) {
            this.cachedAlchemyLevel = alchemy.level;
            this.updateAlchemyConversions();
        }

        // Mettre à jour queue
        this.updateAlchemyQueue();

        // Mettre à jour bonus
        this.updateAlchemyBonuses();

        // Débloquer onglet si nécessaire
        if (alchemy.unlocked) {
            this.unlockTab('alchemy', 'Alchimie débloquée ! Transformez vos ressources en versions supérieures 🧪');
        }
    }

    /**
     * Met à jour les conversions disponibles
     */
    updateAlchemyConversions() {
        const alchemy = this.game.alchemyManager;
        if (!alchemy || !window.ALCHEMY_CONVERSIONS) return;

        const woodList = document.getElementById('conversions-wood');
        const oreList = document.getElementById('conversions-ore');

        if (!woodList || !oreList) return;

        // Conversions bois
        const woodConversions = Object.values(window.ALCHEMY_CONVERSIONS)
            .filter(c => c.category === 'wood');
        woodList.innerHTML = this.renderConversionsList(woodConversions, alchemy);

        // Conversions minerai
        const oreConversions = Object.values(window.ALCHEMY_CONVERSIONS)
            .filter(c => c.category === 'ore');
        oreList.innerHTML = this.renderConversionsList(oreConversions, alchemy);
    }

    /**
     * Génère le HTML pour une liste de conversions
     */
    renderConversionsList(conversions, alchemy) {
        return conversions.map(conv => {
            const locked = alchemy.level < conv.levelRequired;
            const currentAmount = this.game.professionManager.getInventoryAmount(conv.input.resourceId);
            const sufficient = currentAmount >= conv.input.amount;
            
            const convTime = alchemy.getConversionTime(conv.id);
            const bonusChance = alchemy.getBonusChance();

            return `
                <div class="conversion-item ${locked ? 'locked' : ''}" 
                     onclick="${locked ? '' : `game.ui.openConversionModal('${conv.id}')`}">
                    ${locked ? '<div class="conversion-lock-icon">🔒</div>' : ''}
                    
                    <div class="conversion-header">
                        <div class="conversion-name">${conv.name}</div>
                        <div class="conversion-time">⏱️ ${convTime.toFixed(1)}s</div>
                    </div>
                    
                    <div class="conversion-ratio">
                        <div class="conversion-input">
                            ${conv.input.amount} ${this.getResourceIcon(conv.input.resourceId)}
                        </div>
                        <div class="conversion-arrow">→</div>
                        <div class="conversion-output">
                            ${conv.output.amount} ${this.getResourceIcon(conv.output.resourceId)}
                        </div>
                    </div>
                    
                    <div class="conversion-resources">
                        <span class="resource-available ${sufficient ? 'sufficient' : 'insufficient'}">
                            ${locked ? `Requis niveau ${conv.levelRequired}` : 
                                `Disponible: ${NumberFormatter.format(currentAmount)}`}
                        </span>
                    </div>
                    
                    <div class="conversion-xp">
                        +${conv.xpGain} XP${bonusChance > 0 ? ` • ${Math.floor(bonusChance * 100)}% bonus ×2` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Ouvre la modal de conversion avec sélecteur de quantité
     */
    openConversionModal(conversionId) {
        console.log('🧪 openConversionModal appelé pour:', conversionId);
        const conversion = window.ALCHEMY_CONVERSIONS[conversionId];
        if (!conversion) {
            console.log('❌ Conversion introuvable:', conversionId);
            return;
        }

        const alchemy = this.game.alchemyManager;
        const currentAmount = this.game.professionManager.getInventoryAmount(conversion.input.resourceId);
        const maxPossible = Math.floor(currentAmount / conversion.input.amount);

        console.log('📊 Ressources:', currentAmount, '/ Max possible:', maxPossible);

        if (maxPossible === 0) {
            this.showNotification('❌ Ressources insuffisantes', 'error');
            return;
        }

        // Créer overlay avec styles inline FORCÉS pour garantir le centrage
        const overlay = document.createElement('div');
        overlay.className = 'conversion-modal-overlay';
        overlay.id = 'alchemy-conversion-overlay';
        
        // FORCER tous les styles en inline pour éviter conflits CSS
        overlay.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            background: rgba(0, 0, 0, 0.85) !important;
            opacity: 1 !important;
        `;
        
        // Fermer UNIQUEMENT si clic sur le fond noir (pas sur la modal)
        overlay.addEventListener('click', (e) => {
            // Vérifier si le clic vient de l'overlay lui-même (pas d'un élément enfant)
            const modal = overlay.querySelector('.conversion-modal');
            const isClickOnOverlay = !modal || (e.target instanceof Node && !modal.contains(e.target));
            
            console.log('🔍 Overlay clicked, target:', e.target, 'modal:', modal, 'isClickOnOverlay:', isClickOnOverlay);
            if (isClickOnOverlay) {
                console.log('✅ Fermeture de la modal (clic sur overlay)');
                this.closeConversionModal();
            } else {
                console.log('❌ Clic ignoré (clic dans la modal)');
            }
        });

        // Créer modal
        const inputResource = this.game.professionManager.getResourceData(conversion.input.resourceId);
        const outputResource = this.game.professionManager.getResourceData(conversion.output.resourceId);
        const convTime = alchemy.getConversionTime(conversionId);

        let selectedQuantity = 1;

        const modal = document.createElement('div');
        modal.className = 'conversion-modal';
        modal.id = 'alchemy-conversion-modal';
        
        // FORCER le centrage et la taille de la modal
        modal.style.cssText = `
            position: relative !important;
            margin: auto !important;
            max-width: 500px !important;
            width: 90% !important;
            opacity: 1 !important;
            z-index: 1000000 !important;
            pointer-events: auto !important;
        `;
        
        // Empêcher la propagation des clics dans la modal
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        modal.innerHTML = `
            <div class="conversion-modal-header">
                <div class="conversion-modal-title">🧪 ${conversion.name}</div>
                <button class="conversion-modal-close" onclick="game.ui.closeConversionModal()">×</button>
            </div>

            <div class="conversion-modal-content">
                <div class="conversion-modal-left">
                    <div class="conversion-modal-info">
                        <div class="conversion-modal-info-title">ℹ️ Conversion</div>
                        <div class="conversion-modal-info-row">
                            <span class="conversion-modal-info-label">Ratio :</span>
                            <span class="conversion-modal-info-value">
                                ${conversion.input.amount} ${inputResource?.icon || '📦'} → ${conversion.output.amount} ${outputResource?.icon || '📦'}
                            </span>
                        </div>
                        <div class="conversion-modal-info-row">
                            <span class="conversion-modal-info-label">Temps :</span>
                            <span class="conversion-modal-info-value">${convTime.toFixed(1)}s</span>
                        </div>
                    </div>

                    <div class="conversion-modal-quantity">
                        <label class="conversion-modal-label">📈 Quantité :</label>
                        <div class="quantity-presets">
                            <button class="quantity-preset-btn ${1 <= maxPossible ? 'active' : ''}" 
                                    ${1 > maxPossible ? 'disabled' : ''} 
                                    onclick="event.stopPropagation(); game.ui.updateModalQuantity(1, ${maxPossible})"
                                    style="pointer-events: auto !important;">×1</button>
                            <button class="quantity-preset-btn" 
                                    ${5 > maxPossible ? 'disabled' : ''} 
                                    onclick="event.stopPropagation(); game.ui.updateModalQuantity(5, ${maxPossible})"
                                    style="pointer-events: auto !important;">×5</button>
                            <button class="quantity-preset-btn" 
                                    ${10 > maxPossible ? 'disabled' : ''} 
                                    onclick="event.stopPropagation(); game.ui.updateModalQuantity(10, ${maxPossible})"
                                    style="pointer-events: auto !important;">×10</button>
                            <button class="quantity-preset-btn" 
                                    onclick="event.stopPropagation(); game.ui.updateModalQuantity(${maxPossible}, ${maxPossible})"
                                    style="pointer-events: auto !important;">MAX</button>
                        </div>
                        <div class="quantity-slider-container">
                            <input type="range" class="quantity-slider" id="quantitySlider" 
                                   min="1" max="${maxPossible}" value="1" 
                                   oninput="event.stopPropagation(); game.ui.updateModalQuantity(parseInt(this.value), ${maxPossible})"
                                   style="pointer-events: auto !important;">
                            <div class="quantity-slider-value" id="quantityValue">1</div>
                        </div>
                    </div>
                </div>

                <div class="conversion-modal-right">
                    <div class="conversion-modal-cost" id="modalCost">
                        <div class="conversion-modal-cost-title">📊 Résumé</div>
                        <div class="cost-item">
                            <span class="cost-item-label">Coût total :</span>
                            <span class="cost-item-value sufficient" id="modalCostAmount">
                                ${conversion.input.amount} ${inputResource?.icon || '📦'} ${inputResource?.name || ''}
                            </span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-item-label">Production :</span>
                            <span class="cost-item-value" id="modalOutputAmount">
                                ${conversion.output.amount} ${outputResource?.icon || '📦'} ${outputResource?.name || ''}
                            </span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-item-label">Temps total :</span>
                            <span class="cost-item-value" id="modalTimeTotal">
                                ${convTime.toFixed(1)}s
                            </span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-item-label">XP gagnée :</span>
                            <span class="cost-item-value" id="modalXpTotal">
                                +${conversion.xpGain} XP
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="conversion-modal-actions">
                <button class="conversion-modal-btn conversion-modal-cancel" 
                        onclick="event.stopPropagation(); game.ui.closeConversionModal()"
                        style="pointer-events: auto !important;">
                    ❌ Annuler
                </button>
                <button class="conversion-modal-btn conversion-modal-confirm" 
                        id="modalConfirmBtn"
                        onclick="event.stopPropagation(); game.ui.confirmConversion('${conversionId}')"
                        style="pointer-events: auto !important;">
                    ✅ Convertir
                </button>
            </div>
        `;

        overlay.appendChild(modal);
        console.log('✅ Modal ajoutée à overlay, children:', overlay.children.length);
        
        document.body.appendChild(overlay);
        console.log('✅ Overlay ajouté à document.body');

        // Stocker les infos pour update
        this.currentModal = {
            overlay: overlay,
            conversionId: conversionId,
            conversion: conversion,
            inputResource: inputResource,
            outputResource: outputResource,
            convTime: convTime,
            maxPossible: maxPossible,
            currentAmount: currentAmount,
            selectedQuantity: 1
        };
        console.log('✅ currentModal stocké:', this.currentModal);

        // IMPORTANT: Attendre que le DOM soit prêt avant d'initialiser
        // setTimeout avec 0ms permet au navigateur de "rendre" le HTML d'abord
        console.log('⏳ Attente du rendu DOM...');
        setTimeout(() => {
            console.log('🔄 DOM prêt, initialisation de la modal avec quantité 1');
            this.updateModalQuantity(1, maxPossible);
            
            console.log('✅ Modal complètement initialisée et affichée');
        }, 0);
    }

    /**
     * Met à jour la quantité sélectionnée dans la modal
     */
    updateModalQuantity(quantity, maxPossible) {
        console.log('📊 updateModalQuantity appelé:', quantity, '/', maxPossible);
        if (!this.currentModal) {
            console.log('❌ Pas de currentModal');
            return;
        }

        // Clamp quantity
        quantity = Math.max(1, Math.min(quantity, maxPossible));
        this.currentModal.selectedQuantity = quantity;

        const { conversion, inputResource, outputResource, convTime } = this.currentModal;

        // Update slider value
        const slider = document.getElementById('quantitySlider');
        const valueDisplay = document.getElementById('quantityValue');
        console.log('🔍 Éléments trouvés - slider:', slider, 'valueDisplay:', valueDisplay);
        if (slider) slider.value = quantity;
        if (valueDisplay) valueDisplay.textContent = quantity;

        // Update preset buttons
        document.querySelectorAll('.quantity-preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = Array.from(document.querySelectorAll('.quantity-preset-btn')).find(
            btn => btn.textContent.includes(`×${quantity}`) || 
                   (btn.textContent === 'MAX' && quantity === maxPossible)
        );
        if (activeBtn) activeBtn.classList.add('active');

        // Update cost summary
        const totalCost = conversion.input.amount * quantity;
        const totalOutput = conversion.output.amount * quantity;
        const totalTime = convTime * quantity;
        const totalXp = conversion.xpGain * quantity;

        const sufficient = this.currentModal.currentAmount >= totalCost;

        document.getElementById('modalCostAmount').innerHTML = 
            `${NumberFormatter.format(totalCost)} ${inputResource?.icon || '📦'} ${inputResource?.name || ''}`;
        document.getElementById('modalCostAmount').className = 
            `conversion-modal-cost-value ${sufficient ? 'sufficient' : 'insufficient'}`;

        document.getElementById('modalOutputAmount').textContent = 
            `${NumberFormatter.format(totalOutput)} ${outputResource?.icon || '📦'} ${outputResource?.name || ''}`;

        document.getElementById('modalTimeTotal').textContent = 
            this.formatTime(Math.floor(totalTime));

        document.getElementById('modalXpTotal').textContent = 
            `+${NumberFormatter.format(totalXp)} XP`;

        // Enable/disable confirm button
        const confirmBtn = document.getElementById('modalConfirmBtn');
        if (confirmBtn) {
            confirmBtn.disabled = !sufficient;
        }
    }

    /**
     * Confirme et lance les conversions
     */
    confirmConversion(conversionId) {
        if (!this.currentModal) return;

        const quantity = this.currentModal.selectedQuantity;
        this.game.alchemyManager.startConversion(conversionId, quantity);
        this.closeConversionModal();
    }

    /**
     * Ferme la modal de conversion
     */
    closeConversionModal() {
        console.log('🚪 closeConversionModal appelé, currentModal:', this.currentModal);
        if (this.currentModal && this.currentModal.overlay) {
            console.log('✅ Suppression de l\'overlay');
            this.currentModal.overlay.remove();
            this.currentModal = null;
        } else {
            console.log('❌ Pas de currentModal ou overlay');
        }
    }

    /**
     * Met à jour la file de conversion
     */
    updateAlchemyQueue() {
        const alchemy = this.game.alchemyManager;
        if (!alchemy) return;

        const queueCount = document.getElementById('queue-count');
        const queueContainer = document.getElementById('conversionQueue');

        if (!queueContainer) return;

        if (queueCount) {
            queueCount.textContent = alchemy.conversionQueue.length;
        }

        if (alchemy.conversionQueue.length === 0) {
            queueContainer.innerHTML = `
                <div class="empty-state">
                    <p class="text-muted">Aucune conversion en cours...</p>
                </div>
            `;
            return;
        }

        queueContainer.innerHTML = alchemy.conversionQueue.map(item => {
            const progressPercent = (item.progress * 100).toFixed(1);
            const remainingTime = Math.max(0, (item.duration * (1 - item.progress)) / 1000);

            return `
                <div class="queue-item">
                    <div class="queue-item-header">
                        <div class="queue-item-name">${item.conversion.name}</div>
                        <button class="queue-item-cancel" 
                                onclick="game.alchemyManager.cancelConversion(${item.id})">
                            ✕ Annuler
                        </button>
                    </div>
                    
                    <div class="queue-progress-bar">
                        <div class="queue-progress-fill" style="width: ${progressPercent}%"></div>
                        <div class="queue-progress-text">${progressPercent}%</div>
                    </div>
                    
                    <div class="queue-item-info">
                        <span class="queue-item-quantity">×${item.quantity}</span>
                        <span>⏱️ ${this.formatTime(remainingTime)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Met à jour les bonus d'alchimie
     */
    updateAlchemyBonuses() {
        const alchemy = this.game.alchemyManager;
        if (!alchemy || !window.ALCHEMY_CONFIG) return;

        const bonusesList = document.getElementById('alchemyBonusesList');
        if (!bonusesList) return;

        const bonuses = Object.entries(window.ALCHEMY_CONFIG.bonuses);
        
        if (bonuses.length === 0) {
            bonusesList.innerHTML = '<p class="text-muted">Aucun bonus disponible</p>';
            return;
        }

        bonusesList.innerHTML = bonuses.map(([level, bonus]) => {
            const levelNum = parseInt(level);
            const active = alchemy.level >= levelNum;
            const locked = alchemy.level < levelNum;

            return `
                <div class="bonus-item ${active ? 'active' : ''} ${locked ? 'locked' : ''}">
                    <div class="bonus-level">Niveau ${level}</div>
                    <div class="bonus-description">${bonus.description}</div>
                    ${active ? '<div style="color: var(--success-color); margin-top: 5px;">✅ Actif</div>' : ''}
                </div>
            `;
        }).join('');
    }

    /**
     * Obtient l'icône d'une ressource
     */
    getResourceIcon(resourceId) {
        const icons = {
            wood_oak: '🌳',
            wood_maple: '🍁',
            wood_walnut: '🌰',
            wood_sequoia: '🌲',
            wood_lunar: '🌙',
            wood_crystal: '💎',
            wood_eternal: '✨',
            ore_copper: '🟤',
            ore_iron: '⚙️',
            ore_steel: '🔩',
            ore_mithril: '💠',
            ore_adamantite: '💎',
            ore_orichalcum: '🔱',
            ore_celestial: '⭐'
        };
        return icons[resourceId] || '❓';
    }

    /**
     * Formate un temps en secondes en format lisible
     */
    formatTime(seconds) {
        if (seconds < 60) {
            return `${Math.ceil(seconds)}s`;
        }
        const mins = Math.floor(seconds / 60);
        const secs = Math.ceil(seconds % 60);
        return `${mins}m ${secs}s`;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.UI = UI;
}
