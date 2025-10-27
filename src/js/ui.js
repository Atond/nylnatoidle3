/**
 * Classe UI - Gestion de l'interface utilisateur
 */

class UI {
    constructor(game) {
        this.game = game;
        this.notificationOffset = 0; // Pour empiler les notifications verticalement
        this.unlockedTabs = ['combat']; // 🎉 SEUL COMBAT VISIBLE AU DÉBUT (effet surprise pour tous les autres onglets)
        this.tabsAnimated = []; // 🎬 Liste des onglets déjà animés (pour éviter re-animation au chargement)

        // 🛡️ FIX: Flag pour éviter double-appel updateInventory()
        this.isUpdatingInventory = false;

        // ⚡ OPTIMISATION: Cache pour la profession de craft sélectionnée
        this.lastCraftProfession = null;

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
        
        // 🎭 Alt Characters & Donjons UI
        this.altCharactersUI = null;
        this.dungeonsUI = null;

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

        // Nouveaux métiers
        const btnHerbalist = document.getElementById('btn-herbalist');
        if (btnHerbalist) {
            btnHerbalist.addEventListener('click', () => {
                this.onProfessionClick('herbalist');
            });
        }

        const btnFisher = document.getElementById('btn-fisher');
        if (btnFisher) {
            btnFisher.addEventListener('click', () => {
                this.onProfessionClick('fisher');
            });
        }

        // Boutons auto-récolte
        document.getElementById('btn-auto-woodcutter').addEventListener('click', () => {
            this.onAutoGatherClick('woodcutter');
        });

        document.getElementById('btn-auto-miner').addEventListener('click', () => {
            this.onAutoGatherClick('miner');
        });

        const btnAutoHerbalist = document.getElementById('btn-auto-herbalist');
        if (btnAutoHerbalist) {
            btnAutoHerbalist.addEventListener('click', () => {
                this.onAutoGatherClick('herbalist');
            });
        }

        const btnAutoFisher = document.getElementById('btn-auto-fisher');
        if (btnAutoFisher) {
            btnAutoFisher.addEventListener('click', () => {
                this.onAutoGatherClick('fisher');
            });
        }

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

        // 🐉 Event listeners dragons
        if (GameConfig.FEATURES.enableDragons) {
            this.initDragonsEventListeners();
        }
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
        
        // 🎭 Initialiser UI Alt Characters si onglet characters
        if (tabName === 'characters') {
            this.initializeAltCharactersUI();
        }
        
        // 🏰 Initialiser UI Donjons si onglet dungeons
        if (tabName === 'dungeons') {
            this.initializeDungeonsUI();
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
        this.updateBuffDisplay(); // 💫 Mettre à jour l'affichage des buffs

        // Mettre à jour les barres XP des professions de craft
        this.updateCraftingProfessions();

        // 🔧 FIX: Mettre à jour l'inventaire sur l'onglet récolte en temps réel
        const gatheringTab = document.querySelector('[data-tab="gathering"]');
        if (gatheringTab && gatheringTab.classList.contains('active')) {
            this.updateInventory(); // Met à jour les quantités de ressources dans l'inventaire
        }

        // 🔧 FIX: Mettre à jour l'équipement en temps réel
        const equipmentTab = document.querySelector('[data-tab="equipment"]');
        if (equipmentTab && equipmentTab.classList.contains('active')) {
            this.updateEquipmentInventory(); // Met à jour l'inventaire d'équipement
        }

        // 🔧 FIX: Mettre à jour les ressources de crafting en temps réel
        const craftingTab = document.querySelector('[data-tab="crafting"]');
        if (craftingTab && craftingTab.classList.contains('active')) {
            this.updateCraftRecipes(); // Met à jour les quantités de ressources dans les recettes
        }

        // 🧪 Mettre à jour l'alchimie (conversions, queue, unlock)
        this.updateAlchemy();

        // 🏘️ Mettre à jour l'affichage de la ville en temps réel
        if (this.game.cityManager) {
            this.updateCityOverview();
            // Rafraîchir les quantités de ressources dans les cartes (léger)
            const townTab = document.querySelector('[data-tab="town"]');
            if (townTab && townTab.classList.contains('active')) {
                this.updateCityBuildingsResourceAmounts(); // Bâtiments de ville (Maisons, Fermes, etc.)
                this.updateBuildingsResourceAmounts(); // 🔧 FIX: Bâtiments de production (Scierie, Mine, etc.) affichés sur l'onglet Ville
            }
        }

        // 🏗️ Mettre à jour les ressources des bâtiments de production si l'onglet est actif
        const buildingsTab = document.querySelector('[data-tab="buildings"]');
        if (buildingsTab && buildingsTab.classList.contains('active')) {
            this.updateBuildingsResourceAmounts();
        }

        // 🐉 Mettre à jour l'onglet dragons si actif
        if (GameConfig.FEATURES.enableDragons) {
            const dragonsTab = document.querySelector('[data-tab="dragons"]');
            if (dragonsTab && dragonsTab.classList.contains('active')) {
                this.updateDragonsTab();
            }
        }

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
        if (!btn) return;

        // Afficher le bouton quand l'auto-combat est débloqué
        if (window.game && window.game.unlocks && window.game.unlocks.auto_combat) {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }

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
        const tab = document.querySelector(`[data-tab="gathering"]`);
        if (!tab) return;

        // Si déjà débloqué, ne rien faire
        if (!tab.classList.contains('disabled')) {
            return;
        }

        // Débloquer l'onglet sans notification (le message de quête suffit)
        tab.classList.remove('disabled');

        // Ajouter aux tabs débloqués
        if (!this.unlockedTabs.includes('gathering')) {
            this.unlockedTabs.push('gathering');
        }

        // Effet visuel de déblocage
        tab.style.animation = 'tabUnlock 0.8s ease-out';
        setTimeout(() => {
            tab.style.animation = '';
        }, 800);
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
     * 🎯 Met à jour la visibilité des onglets selon les déblocages
     */
    updateTabVisibility() {
        if (!this.game || !this.game.unlocks) return;
        
        const unlocks = this.game.unlocks;
        
        // Définir la correspondance entre les unlocks et les onglets
        const tabMappings = {
            'equipment': 'equipment_tab',    // 🎒 Équipement (M01)
            'gathering': 'gathering_tab',    // ⛏️ Récolte (M04)
            'crafting': 'crafting_tab',      // 🔨 Fabrication (M06)
            'alchemy': 'alchemy_tab',        // ⚗️ Transmutation (M08)
            'town': 'town_tab',              // 🏘️ Ville (M10)
            'characters': 'characters_tab',  // 🎭 Alt Characters (M11)
            'dungeons': 'dungeons_tab',      // 🏰 Donjons (M13)
            'dragons': 'dragons_tab',        // 🐉 Dragons (futur)
            'guild': 'guild_tab'             // 👥 Guilde (futur)
        };
        
        // Pour chaque onglet, vérifier si débloqué
        Object.entries(tabMappings).forEach(([tabName, unlockKey]) => {
            const tab = document.querySelector(`[data-tab="${tabName}"]`);
            if (!tab) return;
            
            const isUnlocked = unlocks[unlockKey] === true;
            const wasAlreadyAnimated = this.tabsAnimated.includes(tabName);
            
            if (isUnlocked) {
                // 🎉 SURPRISE ! Afficher l'onglet avec animation SEULEMENT si nouveau déblocage
                if (tab.style.display === 'none' && !wasAlreadyAnimated) {
                    tab.style.display = ''; // Rendre visible
                    this.tabsAnimated.push(tabName); // Marquer comme animé
                    tab.classList.add('tab-unlock-animation'); // Animation surprise
                    setTimeout(() => tab.classList.remove('tab-unlock-animation'), 800);
                } else if (tab.style.display === 'none') {
                    // Chargement : juste afficher sans animation
                    tab.style.display = '';
                }
                
                // Débloquer l'onglet (si pas déjà fait)
                if (tab.classList.contains('disabled')) {
                    tab.classList.remove('disabled');
                    if (!this.unlockedTabs.includes(tabName)) {
                        this.unlockedTabs.push(tabName);
                    }
                }
            } else {
                // Bloquer l'onglet (si pas déjà fait)
                if (!tab.classList.contains('disabled')) {
                    tab.classList.add('disabled');
                    const index = this.unlockedTabs.indexOf(tabName);
                    if (index > -1) {
                        this.unlockedTabs.splice(index, 1);
                    }
                }
            }
        });
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
        ['woodcutter', 'miner', 'herbalist', 'fisher'].forEach(profId => {
            const btn = document.getElementById(`btn-auto-${profId}`);
            if (!btn) return;

            const state = this.game.professionManager.autoGatherState[profId];
            if (!state) return; // 🛡️ PROTECTION: Si state n'existe pas, on skip
            
            const woodAmount = this.game.professionManager.getInventoryAmount('wood_oak');
            const oreAmount = this.game.professionManager.getInventoryAmount('ore_iron');
            
            // Déterminer l'intervalle et les icônes
            let interval, resourceIcon, resourceName;
            if (profId === 'woodcutter') {
                interval = this.game.professionManager.autoGatherInterval / 1000;
                resourceIcon = '🪵';
                resourceName = 'bois';
            } else if (profId === 'miner') {
                interval = this.game.professionManager.autoGatherInterval / 1000;
                resourceIcon = '⚒️';
                resourceName = 'minerai';
            } else if (profId === 'herbalist') {
                interval = this.game.professionManager.autoGatherInterval / 1000;
                resourceIcon = '🌿';
                resourceName = 'plante';
            } else if (profId === 'fisher') {
                interval = this.game.professionManager.fisherGatherInterval / 1000;
                resourceIcon = '🐟';
                resourceName = 'poisson';
            }

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
        const professions = ['woodcutter', 'miner', 'herbalist', 'fisher'];

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
                const typeOrder = ['wood', 'ore', 'plants', 'fish', 'gems', 'loot']; // ✅ Ajout plants et fish

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
                            item.resourceId.startsWith('plant_') ? '🌿' :  // ✅ NOUVEAU
                            item.resourceId.startsWith('fish_') ? '🐟' :   // ✅ NOUVEAU
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
     * Met à jour l'affichage des buffs actifs
     */
    updateBuffDisplay() {
        const buffsPanel = document.getElementById('buffsPanel');
        const buffsGrid = document.getElementById('buffsGrid');
        
        if (!buffsPanel || !buffsGrid) return;

        const activeBuffs = this.game.buffManager.getActiveBuffs();

        if (activeBuffs.length === 0) {
            buffsPanel.style.display = 'none';
            return;
        }

        buffsPanel.style.display = 'block';

        buffsGrid.innerHTML = activeBuffs.map(buff => {
            const remainingMinutes = Math.floor(buff.remainingTime / 60);
            const remainingSeconds = Math.floor(buff.remainingTime % 60);
            const timeStr = remainingMinutes > 0 
                ? `${remainingMinutes}m ${remainingSeconds}s`
                : `${remainingSeconds}s`;

            const progress = (buff.remainingTime / buff.totalDuration) * 100;

            return `
                <div class="buff-item" title="${buff.effects.description || 'Buff actif'}">
                    <div class="buff-icon">${buff.icon}</div>
                    <div class="buff-info">
                        <div class="buff-name">${buff.name}${buff.stacks > 1 ? ` (x${buff.stacks})` : ''}</div>
                        <div class="buff-timer">${timeStr}</div>
                        <div class="buff-progress-bar">
                            <div class="buff-progress-fill" style="width: ${progress}%"></div>
                        </div>
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
                ${equipment.type === 'consumable' ? `
                    <button class="btn-consume" data-id="${equipment.id}" ${!canEquip ? 'disabled' : ''}>
                        ${!canEquip ? '🔒 Niveau insuffisant' : '🍽️ Consommer'}
                    </button>
                ` : `
                    <button class="btn-equip" data-id="${equipment.id}" ${!canEquip ? 'disabled' : ''}>
                        ${!canEquip ? '🔒 Niveau insuffisant' : 'Équiper'}
                    </button>
                `}
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

        // Ajouter les événements de clic sur les boutons Consommer
        container.querySelectorAll('.btn-consume').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const equipmentId = btn.dataset.id;
                const equipment = inventory.find(e => e.id === equipmentId);
                if (equipment) {
                    this.consumeItem(equipment);
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
     * Consomme un consommable (potion, nourriture)
     */
    consumeItem(consumable) {
        if (!consumable || consumable.type !== 'consumable') {
            this.showNotification('❌ Cet objet ne peut pas être consommé', 'error');
            return;
        }

        // Retirer l'objet de l'inventaire
        const index = this.game.equipmentManager.inventory.findIndex(e => e.id === consumable.id);
        if (index === -1) {
            this.showNotification('❌ Objet introuvable', 'error');
            return;
        }

        this.game.equipmentManager.inventory.splice(index, 1);

        // Appliquer le buff via BuffManager
        const recipe = this.game.craftingManager.getAllRecipes().find(r => r.id === consumable.recipeId || r.produces.resourceId === consumable.id);
        
        if (recipe && recipe.effects) {
            this.game.buffManager.applyBuff(recipe, 1);
        } else {
            this.showNotification('⚠️ Effets du consommable introuvables', 'warning');
        }

        // Mettre à jour l'inventaire
        this.updateEquipmentInventory();
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
        const professions = ['blacksmith', 'armorsmith', 'jeweler', 'tanner'];

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
    updateCraftRecipes(forceRefresh = false) {
        const recipesList = document.getElementById('craftRecipesList');
        if (!recipesList) return;

        // Récupérer la profession sélectionnée
        const selectedProfession = document.querySelector('.craft-profession-card.selected');
        const professionId = selectedProfession ? selectedProfession.dataset.profession : 'blacksmith';

        // 🛡️ OPTIMISATION: Ne rafraîchir que si la profession a changé
        // SAUF si forceRefresh=true (pour level-up de profession)
        if (!forceRefresh && this.lastCraftProfession === professionId && recipesList.children.length > 0) {
            // Juste mettre à jour les quantités sans recréer le HTML
            this.updateCraftRecipesQuantities();
            return;
        }

        this.lastCraftProfession = professionId;

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

                return `<span class="material-amount ${hasEnough ? 'text-success' : 'text-danger'}" data-resource="${mat.resourceId}" data-required="${mat.amount}">${resourceData?.icon || '❓'}${currentAmount}/${mat.amount}</span>`;
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
     * 🛡️ OPTIMISATION: Met à jour uniquement les quantités de ressources sans recréer le HTML
     */
    updateCraftRecipesQuantities() {
        const materialElements = document.querySelectorAll('.material-amount');
        
        materialElements.forEach(element => {
            const resourceId = element.dataset.resource;
            const required = parseInt(element.dataset.required);
            const currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
            const hasEnough = currentAmount >= required;
            
            // Mettre à jour uniquement le texte et la classe si nécessaire
            const resourceData = window.findResourceById(resourceId);
            const newText = `${resourceData?.icon || '❓'}${currentAmount}/${required}`;
            
            if (element.textContent !== newText) {
                element.textContent = newText;
            }
            
            if (hasEnough && !element.classList.contains('text-success')) {
                element.classList.remove('text-danger');
                element.classList.add('text-success');
            } else if (!hasEnough && !element.classList.contains('text-danger')) {
                element.classList.remove('text-success');
                element.classList.add('text-danger');
            }
        });
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
                <div>🎭 Niveau joueur requis: ${recipe.requiredLevel}</div>
                <div>🔧 Niveau profession requis: ${recipe.professionLevel}</div>
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
        this.updateCityOverview();
        this.updateCityBuildings();
        this.updateBuildingsGrid();
        this.updateTownProductionSummary();
    }

    /**
     * 🏘️ Met à jour la vue d'ensemble de la ville
     */
    updateCityOverview() {
        const container = document.getElementById('cityOverview');
        if (!container) return;

        const city = this.game.cityManager;
        const hasStarvation = city.food < 0;
        const foodPercentage = Math.max(0, Math.min(100, (city.food / city.maxFood) * 100));

        // Calculer le taux par citoyen
        const taxPerCitizen = city.population > 0 && city.taxRate > 0 ? (city.taxRate / city.population) : 0;

        // Calculer le bilan nourriture (production - consommation)
        const foodBalance = city.foodProductionRate - city.foodConsumptionRate;

        container.innerHTML = `
            <div class="city-stat-card">
                <div class="city-stat-label">👥 Population</div>
                <div class="city-stat-value">${NumberFormatter.format(city.population)} / ${NumberFormatter.format(city.maxPopulation)}</div>
                <div class="city-stat-details">🏠 Construisez des logements pour accueillir plus d'habitants</div>
            </div>
            
            <div class="city-stat-card ${hasStarvation ? 'danger' : foodPercentage < 20 ? 'warning' : ''}">
                <div class="city-stat-label">🍖 Nourriture</div>
                <div class="city-stat-value">${NumberFormatter.format(Math.floor(city.food))} / ${NumberFormatter.format(city.maxFood)}</div>
                <div class="city-stat-details">
                    ${city.population === 0 ?
                `⚠️ Pas d'habitants (pas de consommation)` :
                city.foodProductionRate > 0 ?
                    `✅ Production: +${city.foodProductionRate.toFixed(1)}/min • Consommation: -${city.foodConsumptionRate.toFixed(1)}/min` :
                    `🚨 Consommation: -${city.foodConsumptionRate.toFixed(1)}/min • Production: +${city.foodProductionRate.toFixed(1)}/min`
            }
                </div>
                <div class="city-stat-details" style="font-size: 0.85em; color: ${foodBalance >= 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
                    📊 Bilan: ${foodBalance >= 0 ? '+' : ''}${foodBalance.toFixed(1)}/min
                </div>
                ${hasStarvation ? '<div class="city-stat-details" style="color: var(--color-danger);">🚨 FAMINE ! Taxes réduites de 50%</div>' : ''}
            </div>
            
            <div class="city-stat-card">
                <div class="city-stat-label">💰 Revenus (Taxes)</div>
                <div class="city-stat-value">+${city.taxRate.toFixed(1)}/min</div>
                <div class="city-stat-details">
                    ${city.population > 0 ? `${taxPerCitizen.toFixed(1)} or/citoyen/min` : 'Pas de citoyens'}
                </div>
            </div>
        `;
    }

    /**
     * 🏘️ Met à jour les bâtiments de la ville
     */
    updateCityBuildings() {
        this.renderCityBuildingCategory('housing', 'cityHousingGrid');
        this.renderCityBuildingCategory('food', 'cityFoodGrid');
        this.renderCityBuildingCategory('income', 'cityIncomeGrid');
        this.renderCityBuildingCategory('services', 'cityServicesGrid');
    }

    /**
     * 🔄 Met à jour uniquement les quantités de ressources dans les cartes de bâtiments (léger)
     */
    updateCityBuildingsResourceAmounts() {
        // Mettre à jour toutes les cartes de coûts
        document.querySelectorAll('.city-building-cost-item').forEach(costItem => {
            const resourceId = costItem.getAttribute('data-resource');
            const requiredAmount = parseFloat(costItem.getAttribute('data-required') || '0');

            if (!resourceId) return;

            // Obtenir la quantité actuelle
            const currentAmount = resourceId === 'gold' ?
                this.game.player.resources.gold :
                this.game.professionManager.getInventoryAmount(resourceId);

            const hasEnough = currentAmount >= requiredAmount;

            // Mettre à jour la classe insufficient
            if (hasEnough) {
                costItem.classList.remove('insufficient');
            } else {
                costItem.classList.add('insufficient');
            }

            // Mettre à jour le texte de la quantité actuelle
            const currentSpan = costItem.querySelector('.resource-current');
            if (currentSpan) {
                currentSpan.textContent = `(${NumberFormatter.format(currentAmount)}/${NumberFormatter.format(requiredAmount)})`;
            }
        });

        // 🔧 FIX: Mettre à jour les boutons (activé/désactivé) - CORRECTION
        document.querySelectorAll('.city-building-card').forEach(card => {
            const upgradeBtn = card.querySelector('button[onclick*="upgradeCityBuilding"]');
            const buildBtn = card.querySelector('button[onclick*="buildCityBuilding"]');

            if (upgradeBtn) {
                const buildingIdMatch = upgradeBtn.getAttribute('onclick').match(/'([^']+)'/);
                if (buildingIdMatch) {
                    const buildingId = buildingIdMatch[1];
                    const canUpgrade = this.game.cityManager.canUpgradeCityBuilding(buildingId);

                    // 🔧 FIX: Forcer la mise à jour du disabled ET de la classe
                    upgradeBtn.disabled = !canUpgrade;
                    if (canUpgrade) {
                        upgradeBtn.className = 'btn btn-primary';
                    } else {
                        upgradeBtn.className = 'btn btn-secondary';
                    }
                }
            }

            if (buildBtn) {
                const buildingIdMatch = buildBtn.getAttribute('onclick').match(/'([^']+)'/);
                if (buildingIdMatch) {
                    const buildingId = buildingIdMatch[1];
                    const canBuild = this.game.cityManager.canBuildCityBuilding(buildingId);

                    // 🔧 FIX: Forcer la mise à jour du disabled ET de la classe
                    buildBtn.disabled = !canBuild;
                    if (canBuild) {
                        buildBtn.className = 'btn btn-primary';
                    } else {
                        buildBtn.className = 'btn btn-secondary';
                    }
                }
            }
        });
    }

    /**
     * 🔄 Met à jour uniquement les quantités de ressources dans les cartes de bâtiments de production (léger)
     * Format unifié avec les city buildings - pas de barres de progression
     */
    updateBuildingsResourceAmounts() {
        // Mettre à jour les cost-items des bâtiments de production (même sélecteur que city buildings)
        const buildingsTab = document.querySelector('[data-tab="buildings"]');
        if (!buildingsTab || !buildingsTab.classList.contains('active')) return;

        document.querySelectorAll('#buildingsGrid .city-building-cost-item').forEach(costItem => {
            const resourceId = costItem.dataset.resource;
            const requiredAmount = parseFloat(costItem.dataset.required || '0');

            if (!resourceId) return;

            // Obtenir la quantité actuelle
            const currentAmount = resourceId === 'gold' ?
                this.game.player.resources.gold :
                this.game.professionManager.getInventoryAmount(resourceId);

            const hasEnough = currentAmount >= requiredAmount;

            // Mettre à jour la classe insufficient (même logique que city buildings)
            if (hasEnough) {
                costItem.classList.remove('insufficient');
            } else {
                costItem.classList.add('insufficient');
            }

            // Mettre à jour le texte de la quantité actuelle
            const currentSpan = costItem.querySelector('.resource-current');
            if (currentSpan) {
                currentSpan.textContent = `(${NumberFormatter.format(currentAmount)}/${NumberFormatter.format(requiredAmount)})`;
            }
        });

        // Mettre à jour les boutons des bâtiments de production
        document.querySelectorAll('#buildingsGrid .city-building-card').forEach(card => {
            const upgradeBtn = card.querySelector('button[onclick*="upgradeBuilding"]');

            if (upgradeBtn) {
                const onclickAttr = upgradeBtn.getAttribute('onclick');
                const buildingIdMatch = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;

                if (buildingIdMatch) {
                    const buildingId = buildingIdMatch[1];
                    const canUpgrade = this.game.buildingManager.canUpgrade(buildingId);

                    // Forcer la mise à jour du disabled ET de la classe
                    upgradeBtn.disabled = !canUpgrade;
                    if (canUpgrade) {
                        upgradeBtn.className = 'btn btn-primary';
                    } else {
                        upgradeBtn.className = 'btn btn-secondary';
                    }
                }
            }
        });
    }

    /**
     * 🏘️ Rend une catégorie de bâtiments de ville
     */
    renderCityBuildingCategory(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const city = this.game.cityManager;
        const buildings = Object.values(window.CityBuildingsData).filter(b => b.category === category);

        container.innerHTML = buildings.map(building => {
            const owned = city.getCityBuildingCount(building.id);
            const buildingInfo = city.cityBuildings[building.id];
            const currentLevel = buildingInfo?.level || 1;
            const canBuild = city.canBuildCityBuilding(building.id);
            const canUpgrade = building.canUpgrade && city.canUpgradeCityBuilding(building.id);
            const cost = window.calculateCityBuildingCost(building.id, owned);
            const isUnlocked = city.isCityBuildingUnlocked(building.id);
            const isService = category === 'services';
            const isActive = isService && city.activeServices.has(building.id);

            // Calculer les stats du bâtiment
            let stats = '';
            if (building.housingCapacity) {
                stats += `<div class="city-building-stat">🏠 Capacité: +${building.housingCapacity * (owned + 1)}</div>`;
            }
            if (building.baseProduction?.food) {
                const production = window.calculateFoodProduction(building.id, currentLevel);
                const nextProduction = window.calculateFoodProduction(building.id, currentLevel + 1);
                stats += `<div class="city-building-stat">🍖 Production: ${production.toFixed(1)}/min → ${nextProduction.toFixed(1)}/min</div>`;
            }
            if (building.baseTaxRate) {
                // Pour les taxes, on passe le NIVEAU actuel
                const rate = window.calculateTaxRate(currentLevel, false);
                const nextRate = window.calculateTaxRate(currentLevel + 1, false);
                stats += `<div class="city-building-stat">💰 Taxes: +${rate.toFixed(1)}/min → +${nextRate.toFixed(1)}/min</div>`;
            }
            if (building.bonus && isActive) {
                const bonusType = building.bonus.type === 'profession_xp' ? 'XP Métiers' :
                    building.bonus.type === 'combat_xp' ? 'XP Combat' :
                        building.bonus.type === 'crafting_speed' ? 'Vitesse Craft' :
                            building.bonus.type === 'health_regen' ? 'Regen HP' :
                                building.bonus.type === 'gold_find' ? 'Or trouvé' :
                                    building.bonus.type === 'resource_find' ? 'Ressources' :
                                        building.bonus.type;
                const bonusValue = (building.bonus.value * 100).toFixed(0);
                stats += `<div class="city-service-bonus">✨ ${bonusType} +${bonusValue}%</div>`;
            }

            return `
                <div class="city-building-card ${!isUnlocked ? 'locked' : ''} ${isActive ? 'city-service-active' : ''}">
                    ${owned > 0 && building.canUpgrade ? `<div class="city-level-badge">Niv. ${currentLevel}</div>` : ''}
                    <div class="city-building-header">
                        <div class="city-building-icon">${building.icon}</div>
                        <div class="city-building-info">
                            <h5>${building.name}</h5>
                            <div class="city-building-count">${isService ? (isActive ? 'Actif' : 'Construit') : `Possédé: ${owned}`}</div>
                        </div>
                    </div>
                    <div class="city-building-description">${building.description}</div>
                    
                    ${!isUnlocked && building.unlockConditions ? `
                        <div class="city-building-lock">
                            🔒 Requis: 
                            ${building.unlockConditions.playerLevel ? `Niveau ${building.unlockConditions.playerLevel}` : ''}
                            ${building.unlockConditions.population ? `${building.unlockConditions.population} habitants` : ''}
                            ${building.unlockConditions.buildings ? Object.entries(building.unlockConditions.buildings).map(([bid, count]) => {
                const requiredBuilding = window.CityBuildingsData[bid];
                return `${count} ${requiredBuilding?.name || bid}`;
            }).join(', ') : ''}
                        </div>
                    ` : ''}
                    
                    ${stats ? `<div class="city-building-stats">${stats}</div>` : ''}
                    
                    ${isUnlocked && (!isService || !isActive) ? `
                        <div class="city-building-cost">
                            ${Object.entries(cost).map(([resourceId, amount]) => {
                let icon = '📦';
                let name = resourceId;

                if (resourceId === 'gold') {
                    icon = '💰';
                    name = 'Or';
                } else {
                    const resource = window.findResourceById(resourceId);
                    if (resource) {
                        icon = resource.icon;
                        name = resource.name;
                    }
                }

                const currentAmount = resourceId === 'gold' ?
                    this.game.player.resources.gold :
                    this.game.professionManager.getInventoryAmount(resourceId);
                const hasEnough = currentAmount >= amount;

                return `<div class="city-building-cost-item ${!hasEnough ? 'insufficient' : ''}" title="${name}" data-resource="${resourceId}" data-required="${amount}">
                                    ${icon} ${NumberFormatter.format(amount)} ${name}
                                    <br><span class="resource-current">(${NumberFormatter.format(currentAmount)}/${NumberFormatter.format(amount)})</span>
                                </div>`;
            }).join('')}
                        </div>
                        <div class="city-building-actions">
                            ${building.canUpgrade && owned > 0 ? `
                                <button class="btn ${canUpgrade ? 'btn-primary' : 'btn-secondary'}" 
                                    onclick="window.game.cityManager.upgradeCityBuilding('${building.id}')" 
                                    ${!canUpgrade ? 'disabled' : ''}>
                                    ⬆️ Améliorer
                                </button>
                            ` : `
                                <button class="btn ${canBuild ? 'btn-primary' : 'btn-secondary'}" 
                                    onclick="window.game.cityManager.buildCityBuilding('${building.id}')" 
                                    ${!canBuild ? 'disabled' : ''}>
                                    🔨 ${owned > 0 ? 'Construire' : 'Débloquer'}
                                </button>
                            `}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    /**
     * Met à jour la grille des bâtiments de production (style unifié avec city buildings)
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
                    professionLock = `<div class="building-requirement">
                        <span class="requirement-icon">🔒</span>
                        <span>Nécessite ${building.profession} niveau ${building.professionLevelRequired}</span>
                    </div>`;
                }
            }

            // 👥 Vérifier l'exigence de population pour le prochain niveau
            let populationInfo = '';
            const buildingData = window.BuildingsData[building.id];
            if (isBuilt && buildingData && buildingData.populationRequirements) {
                const nextLevel = building.level + 1;
                const requiredPopulation = buildingData.populationRequirements[nextLevel];

                if (requiredPopulation !== undefined) {
                    const hasEnough = this.game.cityManager.population >= requiredPopulation;
                    const statusClass = hasEnough ? 'met' : 'unmet';
                    const icon = hasEnough ? '✅' : '🔒';
                    populationInfo = `<div class="building-requirement ${statusClass}">
                        <span class="requirement-icon">${icon}</span>
                        <span>Niveau ${nextLevel}: ${requiredPopulation} habitants ${hasEnough ? '' : `(${this.game.cityManager.population}/${requiredPopulation})`}</span>
                    </div>`;
                }
            }

            // Construction de la section de stats (production actuelle)
            let statsHTML = '';
            if (isBuilt) {
                if (building.id === 'warehouse') {
                    statsHTML = `
                        <div class="city-building-stat">
                            <span class="stat-label">📦 Bonus de stockage:</span>
                            <span class="stat-value">+${NumberFormatter.format(this.game.storageManager.getWarehouseBonus())}</span>
                        </div>
                        <div class="stat-detail">Bois, Minerais, Gemmes</div>
                        <div class="stat-detail">Limite: ${NumberFormatter.format(this.game.storageManager.baseLimitResources + this.game.storageManager.getWarehouseBonus())} par ressource</div>
                    `;
                } else if (building.id === 'treasury') {
                    statsHTML = `
                        <div class="city-building-stat">
                            <span class="stat-label">🏰 Bonus de butin:</span>
                            <span class="stat-value">+${NumberFormatter.format(this.game.storageManager.getTreasuryBonus())}</span>
                        </div>
                        <div class="stat-detail">Limite: ${NumberFormatter.format(this.game.storageManager.baseLimitLoot + this.game.storageManager.getTreasuryBonus())} par butin</div>
                    `;
                } else if (building.id === 'alchemy_lab') {
                    statsHTML = `
                        <div class="city-building-stat">
                            <span class="stat-label">🧪 Production alchimique:</span>
                            <span class="stat-value">${NumberFormatter.format(window.calculateLabProductionPerHour(building.level))}/h</span>
                        </div>
                        <div class="stat-detail">${NumberFormatter.format(window.calculateLabProductionPerMinute(building.level))}/min • ${window.calculateLabProductionPerSecond(building.level).toFixed(2)}/sec</div>
                        <div class="stat-detail" style="color: var(--accent-primary);">💡 Convertit T1→T2→T3 automatiquement</div>
                    `;
                } else {
                    statsHTML = Object.entries(production).map(([resourceId, amount]) => {
                        const resource = window.findResourceById(resourceId);
                        return `
                            <div class="city-building-stat">
                                <span class="stat-label">${resource?.icon || '📦'} ${resource?.name || resourceId}:</span>
                                <span class="stat-value">+${NumberFormatter.format(amount)}/min</span>
                            </div>
                        `;
                    }).join('');
                }
            }

            // Construction du preview du prochain niveau
            let nextLevelPreview = '';
            if (building.id === 'warehouse') {
                const nextBonus = (building.level + 1) * 500;
                nextLevelPreview = `
                    <div class="upgrade-preview">
                        <div class="preview-label">${isBuilt ? '📦 Après amélioration' : '📦 Après construction'}:</div>
                        <div class="preview-value">+${NumberFormatter.format(nextBonus)} stockage total</div>
                        <div class="preview-detail">${isBuilt ? '(+500 supplémentaires)' : '(+500 par ressource)'}</div>
                    </div>
                `;
            } else if (building.id === 'treasury') {
                const nextBonus = (building.level + 1) * 250;
                nextLevelPreview = `
                    <div class="upgrade-preview">
                        <div class="preview-label">${isBuilt ? '🏰 Après amélioration' : '🏰 Après construction'}:</div>
                        <div class="preview-value">+${NumberFormatter.format(nextBonus)} butin total</div>
                        <div class="preview-detail">${isBuilt ? '(+250 supplémentaires)' : '(+250 par butin)'}</div>
                    </div>
                `;
            } else if (building.id === 'alchemy_lab') {
                const nextProd = window.calculateLabProductionPerHour(building.level + 1);
                const currentProd = window.calculateLabProductionPerHour(building.level);
                nextLevelPreview = `
                    <div class="upgrade-preview">
                        <div class="preview-label">${isBuilt ? '🧪 Après amélioration' : '🧪 Après construction'}:</div>
                        <div class="preview-value">⚗️ ${NumberFormatter.format(nextProd)}/h</div>
                        <div class="preview-detail">${isBuilt ? `(×2 production → +${NumberFormatter.format(nextProd - currentProd)}/h)` : '(Production passive)'}</div>
                    </div>
                `;
            } else {
                nextLevelPreview = Object.entries(nextLevelProduction).map(([resourceId, amount]) => {
                    const resource = window.findResourceById(resourceId);
                    return `
                        <div class="upgrade-preview">
                            <div class="preview-label">${resource?.icon || '📦'} ${resource?.name || resourceId}:</div>
                            <div class="preview-value">${NumberFormatter.format(amount)}/min</div>
                        </div>
                    `;
                }).join('');
            }

            return `
                <div class="city-building-card ${isBuilt ? '' : 'not-built'} ${isStorageBlocked ? 'storage-blocked' : ''}">
                    ${isBuilt ? `<div class="city-level-badge">Niv. ${building.level}</div>` : ''}
                    
                    <div class="city-building-header">
                        <div class="city-building-icon">${building.icon}</div>
                        <div class="city-building-title">
                            <h3>${building.name}</h3>
                            ${isBuilt ? `<span class="building-count">Niveau ${building.level}</span>` : '<span class="building-count">Non construit</span>'}
                        </div>
                    </div>
                    
                    <div class="city-building-description">${building.description}</div>
                    
                    ${professionLock}
                    ${populationInfo}
                    
                    ${isBuilt ? `
                        <div class="city-building-stats">
                            <div class="stats-label">📊 Production actuelle</div>
                            ${statsHTML}
                        </div>
                    ` : ''}
                    
                    <div class="city-building-cost">
                        ${Object.entries(cost).map(([resourceId, amount]) => {
                let icon = '📦';
                let name = resourceId;
                let currentAmount = 0;

                if (resourceId === 'gold') {
                    icon = '💰';
                    name = 'Or';
                    currentAmount = this.game.player.resources.gold;
                } else {
                    const resource = window.findResourceById(resourceId);
                    if (resource) {
                        icon = resource.icon;
                        name = resource.name;
                    }
                    currentAmount = this.game.professionManager.getInventoryAmount(resourceId);
                }

                const hasEnough = currentAmount >= amount;

                return `<div class="city-building-cost-item ${!hasEnough ? 'insufficient' : ''}" title="${name}" data-resource="${resourceId}" data-required="${amount}">
                                ${icon} ${NumberFormatter.format(amount)} ${name}
                                <br><span class="resource-current">(${NumberFormatter.format(currentAmount)}/${NumberFormatter.format(amount)})</span>
                            </div>`;
            }).join('')}
                    </div>
                    
                    <div class="city-building-upgrades">
                        ${nextLevelPreview}
                    </div>
                    
                    <div class="city-building-actions">
                        <button class="btn ${canUpgrade ? 'btn-primary' : 'btn-secondary'}" 
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
            const value = amount * Math.pow(building.productionMultiplier, nextLevel - 1);
            // Garder 1 décimale pour les valeurs < 1, sinon arrondir
            production[resource] = value < 1 ? Math.round(value * 10) / 10 : Math.floor(value);
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
            unlockedTabs: this.unlockedTabs,
            tabsAnimated: this.tabsAnimated // 🎬 Sauvegarder les onglets déjà animés
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
        
        // 🎬 Restaurer la liste des onglets déjà animés
        if (data.tabsAnimated) {
            this.tabsAnimated = data.tabsAnimated;
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

    // ========== TRANSMUTATION ==========

    /**
     * Met à jour l'onglet Transmutation
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
            this.unlockTab('alchemy', 'Transmutation débloquée ! Transformez vos ressources en versions supérieures 🧪');
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

        // 🏗️ FIX: requestAnimationFrame plus robuste que setTimeout(0)
        // requestAnimationFrame s'exécute après le paint du navigateur
        console.log('⏳ Attente du rendu DOM...');
        requestAnimationFrame(() => {
            console.log('🔄 DOM prêt, initialisation de la modal avec quantité 1');

            // Double vérification que les éléments sont présents
            const slider = document.getElementById('quantitySlider');
            if (slider) {
                this.updateModalQuantity(1, maxPossible);
                console.log('✅ Modal complètement initialisée et affichée');
            } else {
                // Retry une fois si les éléments ne sont pas encore prêts
                console.warn('⚠️ Éléments DOM non prêts, retry...');
                requestAnimationFrame(() => {
                    this.updateModalQuantity(1, maxPossible);
                    console.log('✅ Modal initialisée après retry');
                });
            }
        });
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
     * Met à jour les bonus de Transmutation
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

    // ========== 🐉 DRAGONS ==========

    /**
     * Obtient l'icône d'une statistique
     */
    getStatIcon(stat) {
        const icons = {
            force: '💪',
            agility: '⚡',
            intelligence: '🧠',
            wisdom: '✨',
            endurance: '🛡️',
            hp: '❤️',
            damage: '⚔️',
            defense: '🔰'
        };
        return icons[stat] || '📊';
    }

    /**
     * Met à jour l'onglet dragons
     */
    updateDragonsTab() {
        if (!this.game.dragonManager) return;

        // Mettre à jour ressources (seulement les nombres, pas le DOM complet)
        const foodCount = document.getElementById('dragonFoodCount');
        const essenceCount = document.getElementById('dragonEssenceCount');
        const dragonsCount = document.getElementById('dragonsCount');
        const dragonsMaxCount = document.getElementById('dragonsMaxCount');

        if (foodCount) foodCount.textContent = this.game.dragonManager.dragonFood;
        if (essenceCount) essenceCount.textContent = this.game.dragonManager.dragonEssences;

        const count = this.game.dragonManager.getAliveDragons().length;
        const max = this.game.dragonManager.getMaxCapacity();
        if (dragonsCount) dragonsCount.textContent = count;
        if (dragonsMaxCount) dragonsMaxCount.textContent = max;

        // Afficher dragon équipé (seulement si changement)
        const currentEquippedId = this._lastEquippedDragonId;
        const newEquippedId = this.game.dragonManager.equippedDragonId;
        if (currentEquippedId !== newEquippedId) {
            this._lastEquippedDragonId = newEquippedId;
            this.displayEquippedDragon();
        }

        // Afficher collection (seulement si changement du nombre de dragons)
        const currentDragonCount = this._lastDragonCount || 0;
        if (currentDragonCount !== count) {
            this._lastDragonCount = count;
            this.displayDragonCollection();
        }

        // Mettre à jour reproduction (ne recrée pas le DOM si parents identiques)
        this.updateBreedingPanel();
    }

    /**
     * Affiche le dragon équipé
     */
    displayEquippedDragon() {
        const container = document.getElementById('equippedDragonDisplay');
        if (!container) return;

        const dragon = this.game.dragonManager.getEquippedDragon();

        if (!dragon || !dragon.isAlive) {
            const hasDragons = this.game.dragonManager.getAliveDragons().length > 0;
            container.innerHTML = `
                <div class="no-dragon-equipped">
                    <p style="font-size: 3rem;">🐣</p>
                    <p>Aucun dragon équipé</p>
                    ${hasDragons ? `
                        <button class="btn btn-success" onclick="window.game.ui.openEquippedDragonSelector()" style="margin-top: 15px;">
                            🔄 Choisir un Dragon
                        </button>
                    ` : `
                        <p style="font-size: 0.9rem; margin-top: 10px;">Obtenez votre premier dragon pour commencer !</p>
                    `}
                </div>
            `;
            return;
        }

        const info = dragon.getDisplayInfo();
        const typeConfig = DragonsConfig.TYPES[info.types[0]];
        const lifePercent = (info.remainingLifeDays / 7) * 100;
        const lifeClass = lifePercent < 20 ? 'warning' : '';

        container.innerHTML = `
            <div class="equipped-dragon-display">
                <div class="dragon-portrait">${typeConfig.icon}</div>
                <div class="dragon-name-tier">
                    <span class="dragon-name">${info.name}</span>
                    <span class="dragon-tier-badge" style="background: ${info.tierColor}">
                        ${info.tierName} Niveau ${info.level}
                    </span>
                </div>

                <div class="dragon-vitals">
                    <div class="dragon-vital-item">
                        <span>❤️ Vie restante:</span>
                        <span>${info.remainingLifeDays} jours</span>
                    </div>
                    <div class="dragon-life-bar">
                        <div class="dragon-life-fill ${lifeClass}" style="width: ${lifePercent}%"></div>
                    </div>

                    <div class="dragon-vital-item">
                        <span>🍖 Nourriture:</span>
                        <span class="${info.isFed ? '' : 'dragon-hungry'}">${info.isFed ? '✅ Nourri' : '❌ Affamé'}</span>
                    </div>

                    <div class="dragon-vital-item">
                        <span>✨ Pureté:</span>
                        <span>${info.purity}%</span>
                    </div>

                    ${info.generation > 0 ? `
                    <div class="dragon-vital-item">
                        <span>🧬 Génération:</span>
                        <span>G${info.generation}</span>
                    </div>
                    ` : ''}
                </div>

                <!-- Bonus donnés au joueur -->
                <div style="background: rgba(100, 200, 100, 0.15); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 12px; padding: 12px; margin: 15px 0;">
                    <div style="font-weight: bold; color: #5CFF5C; margin-bottom: 8px; text-align: center; font-size: 0.95rem;">
                        ⚡ BONUS APPLIQUÉS AU JOUEUR
                    </div>
                    <div class="dragon-stats-list">
                        ${Object.entries(info.stats).filter(([_, value]) => value > 0).map(([stat, value]) => `
                            <div class="dragon-stat-item" style="padding: 5px 10px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                <span style="font-size: 1.2rem;">${this.getStatIcon(stat)}</span>
                                <span style="font-weight: bold; color: #5CFF5C;">+${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="dragon-actions" style="display: grid; grid-template-columns: 1fr; gap: 8px;">
                    <button class="btn btn-success" onclick="window.game.ui.openEquippedDragonSelector()">
                        🔄 Changer de Dragon
                    </button>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <button class="btn btn-primary" onclick="window.game.ui.feedDragon('${dragon.id}')" ${info.isFed ? 'disabled' : ''}>
                            🍖 Nourrir
                        </button>
                        <button class="btn btn-secondary" onclick="window.game.ui.trainDragon('${dragon.id}')" style="font-size: 0.85rem;">
                            ⚡ Entraîner
                        </button>
                    </div>
                    ${dragon.genealogy ? `
                    <button class="btn btn-info" onclick="window.game.ui.showGenealogy('${dragon.id}')">
                        🌳 Généalogie
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Affiche la collection de dragons
     */
    displayDragonCollection() {
        const container = document.getElementById('dragonsGrid');
        const empty = document.getElementById('emptyCollection');
        if (!container || !empty) return;

        const dragons = this.game.dragonManager.getAliveDragons();

        if (dragons.length === 0) {
            container.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        empty.style.display = 'none';

        container.innerHTML = dragons.map(dragon => {
            const info = dragon.getDisplayInfo();
            const typeConfig = DragonsConfig.TYPES[info.types[0]];
            const isEquipped = this.game.dragonManager.equippedDragonId === dragon.id;

            return `
                <div class="dragon-card ${isEquipped ? 'selected' : ''}" 
                     onclick="window.game.ui.showDragonDetailsModal('${dragon.id}')" style="cursor: pointer;">
                    ${isEquipped ? '<div class="dragon-card-badge equipped">⭐ Actif</div>' : ''}
                    <div class="dragon-card-icon">${typeConfig.icon}</div>
                    <div class="dragon-card-name">${info.name}</div>
                    <div class="dragon-card-race" style="font-size: 0.75rem; color: ${info.tierColor}; font-weight: bold; margin: 3px 0;">
                        ${info.raceName}
                    </div>
                    <div class="dragon-card-tier" style="background: ${info.tierColor}">
                        ${info.tierName}
                    </div>
                    <div class="dragon-card-level">Niveau ${info.level}</div>
                    <div class="dragon-stats-preview" style="font-size: 0.7rem; margin-top: 5px; color: var(--text-muted);">
                        ${Object.entries(info.stats).filter(([_, v]) => v > 0).map(([stat, value]) => `${this.getStatIcon(stat)}+${value}`).join(' ')}
                    </div>
                    ${!info.isFed ? '<div class="dragon-hungry">🍖</div>' : ''}
                </div>
            `;
        }).join('');
    }

    /**
     * Affiche le modal de détails d'un dragon
     */
    showDragonDetailsModal(dragonId) {
        const dragon = this.game.dragonManager.getDragon(dragonId);
        if (!dragon) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; background: rgba(0, 0, 0, 0.85) !important; z-index: 1000 !important; display: flex !important; align-items: center !important; justify-content: center !important;';

        const modal = document.createElement('div');
        modal.className = 'dragon-details-modal';
        modal.style.cssText = 'position: relative !important; background: #1e2749 !important; border: 2px solid #2a3f5f !important; border-radius: 15px !important; padding: 25px !important; max-width: 1000px !important; width: 90% !important; max-height: 70vh !important; overflow-y: auto !important; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;';

        const info = dragon.getDisplayInfo();
        const typeConfig = DragonsConfig.TYPES[info.types[0]];
        const lifePercent = (info.remainingLifeDays / 7) * 100;
        const lifeClass = lifePercent < 20 ? 'warning' : '';
        const isEquipped = this.game.dragonManager.equippedDragonId === dragon.id;

        // Fonction de traduction des stats
        const translateStat = (stat) => {
            const translations = {
                'strength': 'Force',
                'agility': 'Agilité',
                'intelligence': 'Intelligence',
                'wisdom': 'Sagesse',
                'endurance': 'Endurance'
            };
            return translations[stat.toLowerCase()] || stat;
        };

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">
                ${typeConfig.icon} ${info.name}
            </h2>

            ${isEquipped ? `
                <div style="background: rgba(255, 215, 0, 0.15); border: 2px solid rgba(255, 215, 0, 0.4); border-radius: 10px; padding: 10px; margin-bottom: 15px; text-align: center;">
                    <strong style="color: #FFD700;">⭐ Dragon Actif</strong>
                </div>
            ` : ''}

            <!-- Layout en 2 colonnes -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                
                <!-- Colonne gauche: Informations générales -->
                <div>
                    <div style="padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; margin-bottom: 15px;">
                        <h3 style="color: var(--accent-color); margin-top: 0;">📋 Informations</h3>
                        <div style="display: grid; gap: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>🐉 Race:</span>
                                <span style="font-weight: bold; color: ${info.tierColor};">${info.raceName}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>⭐ Tier:</span>
                                <span style="font-weight: bold; color: ${info.tierColor};">${info.tierName}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>📊 Niveau:</span>
                                <span style="font-weight: bold;">${info.level}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>⚡ Expérience:</span>
                                <span>${dragon.experience} / ${DragonsConfig.TRAINING.xpRequired(dragon.level)} XP</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>✨ Pureté:</span>
                                <span style="font-weight: bold; color: ${info.purity >= 80 ? '#5CFF5C' : info.purity >= 50 ? '#FFD700' : '#FF6B6B'};">${info.purity}%</span>
                            </div>
                            ${info.generation > 0 ? `
                            <div style="display: flex; justify-content: space-between;">
                                <span>🧬 Génération:</span>
                                <span>G${info.generation}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <div style="padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                        <h3 style="color: var(--accent-color); margin-top: 0;">❤️ État de Santé</h3>
                        <div style="display: grid; gap: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>⏳ Vie restante:</span>
                                <span style="font-weight: bold; color: ${lifePercent < 30 ? '#FF6B6B' : lifePercent < 60 ? '#FFD700' : '#5CFF5C'};">${info.remainingLifeDays} jours</span>
                            </div>
                            <div style="width: 100%; height: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; overflow: hidden;">
                                <div style="width: ${lifePercent}%; height: 100%; background: ${lifePercent < 30 ? '#FF6B6B' : lifePercent < 60 ? '#FFD700' : '#5CFF5C'}; transition: width 0.5s ease;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>🍖 Nourriture:</span>
                                <span style="font-weight: bold; color: ${info.isFed ? '#5CFF5C' : '#FF6B6B'};">${info.isFed ? '✅ Nourri' : '❌ Affamé'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Colonne droite: Statistiques -->
                <div>
                    <div style="padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; height: 100%; display: flex; flex-direction: column;">
                        <h3 style="color: var(--accent-color); margin-top: 0; margin-bottom: 15px;">💪 Statistiques</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px; flex: 1; justify-content: space-evenly;">
                            ${Object.entries(info.stats).map(([stat, value]) => `
                                <div style="display: flex; justify-content: space-between; padding: 12px 10px; background: rgba(0, 0, 0, 0.2); border-radius: 8px;">
                                    <span style="font-size: 1.1rem;">${this.getStatIcon(stat)} ${translateStat(stat)}</span>
                                    <span style="font-weight: bold; font-size: 1.1rem; color: ${value > 0 ? '#5CFF5C' : '#888'};">+${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Boutons d'action -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; margin-left: 10px; margin-right: 10px;">
                ${!isEquipped ? `
                    <button class="btn btn-success btn-equip-dragon" style="grid-column: 1 / -1;">
                        ⭐ Équiper ce Dragon
                    </button>
                ` : ''}
                <button class="btn btn-primary btn-feed-dragon" ${info.isFed ? 'disabled' : ''}>
                    🍖 Nourrir
                </button>
                <button class="btn btn-secondary btn-train-dragon">
                    ⚡ Entraîner
                </button>
                ${dragon.genealogy ? `
                    <button class="btn btn-info btn-genealogy-dragon" style="grid-column: 1 / -1;">
                        🌳 Arbre généalogique
                    </button>
                ` : ''}
            </div>

            <button class="btn btn-secondary btn-block" style="margin-top: 15px; margin-left: 10px; margin-right: 10px;" onclick="this.closest('.modal-overlay').remove();">
                Fermer
            </button>
        `;

        // Événements des boutons
        const equipBtn = modal.querySelector('.btn-equip-dragon');
        if (equipBtn) {
            equipBtn.addEventListener('click', () => {
                const result = this.game.dragonManager.equipDragon(dragonId);
                if (result.success) {
                    this.showNotification(`${result.dragon.name} équipé !`, 'success');
                    this.updateDragonsTab();
                    overlay.remove();
                } else {
                    this.showNotification(result.message, 'error');
                }
            });
        }

        const feedBtn = modal.querySelector('.btn-feed-dragon');
        if (feedBtn && !info.isFed) {
            feedBtn.addEventListener('click', () => {
                const result = this.game.dragonManager.feedDragon(dragonId);
                this.showNotification(result.message, result.success ? 'success' : 'error');
                if (result.success) {
                    overlay.remove();
                    this.updateDragonsTab();
                }
            });
        }

        const trainBtn = modal.querySelector('.btn-train-dragon');
        if (trainBtn) {
            trainBtn.addEventListener('click', () => {
                const result = this.game.dragonManager.trainDragon(dragonId);
                this.showNotification(result.message, result.success ? 'success' : 'error');
                if (result.success) {
                    overlay.remove();
                    this.updateDragonsTab();
                }
            });
        }

        const genealogyBtn = modal.querySelector('.btn-genealogy-dragon');
        if (genealogyBtn) {
            genealogyBtn.addEventListener('click', () => {
                overlay.remove();
                this.showGenealogy(dragonId);
            });
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Ouvre le sélecteur de dragon actif
     */
    openEquippedDragonSelector() {
        const dragons = this.game.dragonManager.getAliveDragons();

        if (dragons.length === 0) {
            this.showNotification('Aucun dragon disponible', 'error');
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'dragon-selector-modal';
        modal.style.cssText = `
            background: #1e2749;
            border: 2px solid #2a3f5f;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            max-width: 700px;
            width: 90%;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        `;

        modal.innerHTML = `
            <h3 style="margin-top: 0;">🔄 Choisir le Dragon Actif</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px;">
                Le dragon actif vous donne ses statistiques en bonus !
            </p>
            
            <div class="dragon-selector-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; max-height: 50vh; overflow-y: auto;">
                ${dragons.map(dragon => {
            const info = dragon.getDisplayInfo();
            const typeConfig = DragonsConfig.TYPES[info.types[0]];
            const isEquipped = this.game.dragonManager.equippedDragonId === dragon.id;
            return `
                        <div class="dragon-card selectable ${isEquipped ? 'selected' : ''}" data-dragon-id="${dragon.id}" style="cursor: pointer; position: relative;">
                            ${isEquipped ? '<div class="dragon-card-badge equipped">⭐ Actif</div>' : ''}
                            <div class="dragon-card-icon">${typeConfig.icon}</div>
                            <div class="dragon-card-name">${info.name}</div>
                            <div style="font-size: 0.75rem; color: ${info.tierColor}; font-weight: bold; margin: 3px 0;">
                                ${info.raceName}
                            </div>
                            <div class="dragon-card-tier" style="background: ${info.tierColor}">
                                ${info.tierName}
                            </div>
                            <div class="dragon-card-level">Niv. ${info.level}</div>
                            <div style="font-size: 0.75rem; margin-top: 5px;">Pureté: ${info.purity}%</div>
                            <div style="font-size: 0.7rem; margin-top: 3px; color: var(--text-muted);">
                                ${Object.entries(info.stats).filter(([_, v]) => v > 0).map(([stat, value]) => `${this.getStatIcon(stat)}+${value}`).join(' ')}
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
            <button class="btn btn-secondary btn-block cancel-btn" style="margin-top: 15px;">
                Annuler
            </button>
        `;

        // Événements sur les cartes
        modal.querySelectorAll('.dragon-card.selectable').forEach(card => {
            card.addEventListener('click', () => {
                const dragonId = card.getAttribute('data-dragon-id');
                const result = this.game.dragonManager.equipDragon(dragonId);
                if (result.success) {
                    this.showNotification(`${result.dragon.name} équipé !`, 'success');
                    this.updateDragonsTab();
                    overlay.remove();
                } else {
                    this.showNotification(result.message, 'error');
                }
            });
        });

        // Bouton Annuler
        const cancelBtn = modal.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                overlay.remove();
            });
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Nourrit un dragon
     */
    feedDragon(dragonId) {
        const result = this.game.dragonManager.feedDragon(dragonId);
        this.showNotification(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            this.updateDragonsTab();
        }
    }

    /**
     * Entraîne un dragon
     */
    trainDragon(dragonId) {
        const result = this.game.dragonManager.trainDragon(dragonId);
        this.showNotification(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            this.updateDragonsTab();
        }
    }

    /**
     * Met à jour le panneau de reproduction
     */
    updateBreedingPanel() {
        const slot1 = document.getElementById('breedingSlot1');
        const slot2 = document.getElementById('breedingSlot2');
        const btnBreed = document.getElementById('btnBreed');
        const breedingCost = document.getElementById('breedingCost');
        const breedingResult = document.getElementById('breedingResult');
        const breedingProbabilities = document.getElementById('breedingProbabilities');

        if (!slot1 || !slot2 || !btnBreed) return;

        const selected = this.game.dragonManager.selectedDragonsForBreeding;

        // Mettre à jour slot 1
        this.updateBreedingSlot(slot1, selected[0], 0);

        // Mettre à jour slot 2
        this.updateBreedingSlot(slot2, selected[1], 1);

        // Vérifier si on peut reproduire
        const canBreedResult = this.game.dragonManager.canBreed();

        if (canBreedResult.can) {
            btnBreed.disabled = false;
            if (breedingCost) {
                breedingCost.textContent = canBreedResult.cost;
            }

            // Afficher probabilités
            if (breedingResult && breedingProbabilities && selected[0] && selected[1]) {
                breedingResult.style.display = 'block';
                this.displayBreedingProbabilities(selected[0], selected[1]);
            }
        } else {
            btnBreed.disabled = true;
            if (breedingCost) {
                breedingCost.textContent = '?';
            }
            if (breedingResult) {
                breedingResult.style.display = 'none';
            }
        }
    }

    /**
     * Met à jour un slot de reproduction
     */
    updateBreedingSlot(slot, dragon, slotIndex) {
        if (!slot) return;

        if (dragon) {
            const info = dragon.getDisplayInfo();
            const typeConfig = DragonsConfig.TYPES[info.types[0]];

            slot.innerHTML = `
                <div class="breeding-slot-icon">${typeConfig.icon}</div>
                <div class="dragon-card-name">${info.name}</div>
                <div class="dragon-card-tier" style="background: ${info.tierColor}; padding: 3px 10px; border-radius: 8px; display: inline-block; margin-top: 5px;">
                    ${info.tierName}
                </div>
                <div style="font-size: 0.8rem; margin-top: 5px;">Pureté: ${info.purity}%</div>
            `;
            slot.classList.add('filled');

            // Clic pour déselectionner
            slot.onclick = () => {
                this.game.dragonManager.selectedDragonsForBreeding[slotIndex] = null;
                this.updateBreedingPanel();
            };
        } else {
            slot.innerHTML = `
                <div class="breeding-slot-icon">🐉</div>
                <div>Parent ${slotIndex + 1}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 5px;">Cliquez pour sélectionner</div>
            `;
            slot.classList.remove('filled');

            // Clic pour ouvrir sélection
            slot.onclick = () => {
                this.openDragonSelector(slotIndex);
            };
        }
    }

    /**
     * Ouvre le sélecteur de dragon pour un slot
     */
    openDragonSelector(slotIndex) {
        const dragons = this.game.dragonManager.getAliveDragons();

        if (dragons.length === 0) {
            this.showNotification('Aucun dragon disponible', 'error');
            return;
        }

        // Filtre les dragons déjà sélectionnés
        const otherSlot = slotIndex === 0 ? 1 : 0;
        const otherDragon = this.game.dragonManager.selectedDragonsForBreeding[otherSlot];

        const availableDragons = dragons.filter(d => !otherDragon || d.id !== otherDragon.id);

        if (availableDragons.length === 0) {
            this.showNotification('Aucun dragon disponible', 'error');
            return;
        }

        // Créer une liste HTML pour sélectionner
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'dragon-selector-modal';
        modal.style.cssText = `
            background: #1e2749;
            border: 2px solid #2a3f5f;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            max-width: 600px;
            width: 90%;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        `;

        // Fonction pour afficher les dragons avec filtres
        const renderDragonList = (filter = 'all') => {
            let filtered = availableDragons;

            if (filter !== 'all') {
                filtered = availableDragons.filter(d => d.types.includes(filter));
            }

            return filtered.map(dragon => {
                const info = dragon.getDisplayInfo();
                const typeConfig = DragonsConfig.TYPES[info.types[0]];
                return `
                    <div class="dragon-card selectable" data-dragon-id="${dragon.id}" style="cursor: pointer; position: relative;">
                        <div class="dragon-card-icon">${typeConfig.icon}</div>
                        <div class="dragon-card-name">${info.name}</div>
                        <div style="font-size: 0.75rem; color: ${info.tierColor}; font-weight: bold; margin: 3px 0;">
                            ${info.raceName}
                        </div>
                        <div class="dragon-card-tier" style="background: ${info.tierColor}">
                            ${info.tierName}
                        </div>
                        <div class="dragon-card-level">Niv. ${info.level}</div>
                        <div style="font-size: 0.75rem; margin-top: 5px;">Pureté: ${info.purity}%</div>
                        <div style="font-size: 0.7rem; margin-top: 3px; color: var(--text-muted);">
                            ${Object.entries(info.stats).filter(([_, v]) => v > 0).map(([stat, value]) => `${this.getStatIcon(stat)}+${value}`).join(' ')}
                        </div>
                        <button class="btn btn-info" style="padding: 3px 8px; font-size: 0.7rem; margin-top: 5px; width: 100%;" 
                                onclick="event.stopPropagation(); window.game.ui.showGenealogy('${dragon.id}');">
                            🌳 Arbre
                        </button>
                    </div>
                `;
            }).join('');
        };

        modal.innerHTML = `
            <h3 style="margin-top: 0;">Sélectionner Parent ${slotIndex + 1}</h3>
            
            <!-- Filtres par stat -->
            <div class="breeding-filters" style="display: flex; gap: 5px; margin-bottom: 15px; flex-wrap: wrap;">
                <button class="filter-btn active" data-filter="all" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    Tous
                </button>
                <button class="filter-btn" data-filter="force" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    💪 Force
                </button>
                <button class="filter-btn" data-filter="agility" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    ⚡ Agilité
                </button>
                <button class="filter-btn" data-filter="intelligence" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    🧠 Intelligence
                </button>
                <button class="filter-btn" data-filter="wisdom" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    ✨ Sagesse
                </button>
                <button class="filter-btn" data-filter="endurance" style="padding: 5px 10px; border: 2px solid var(--border-color); background: var(--card-bg); border-radius: 8px; cursor: pointer; font-size: 0.85rem;">
                    🛡️ Endurance
                </button>
            </div>

            <div class="dragon-selector-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; max-height: 50vh; overflow-y: auto;">
                ${renderDragonList('all')}
            </div>
            <button class="btn btn-secondary btn-block cancel-btn" style="margin-top: 15px;">
                Annuler
            </button>
        `;

        // Gérer les filtres
        modal.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const listContainer = modal.querySelector('.dragon-selector-list');
                listContainer.innerHTML = renderDragonList(filter);

                // Réattacher les événements aux nouvelles cartes
                attachCardEvents();
            });
        });

        // Fonction pour attacher les événements aux cartes
        const attachCardEvents = () => {
            modal.querySelectorAll('.dragon-card.selectable').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Ne pas déclencher si on clique sur le bouton arbre
                    if (e.target.closest('button')) return;

                    const dragonId = card.getAttribute('data-dragon-id');
                    this.game.dragonManager.selectDragonForBreeding(slotIndex, dragonId);
                    this.updateBreedingPanel();
                    modal.remove();
                    overlay.remove();
                });
            });
        };

        attachCardEvents();

        // Gérer le bouton Annuler
        const cancelBtn = modal.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                overlay.remove();
            });
        }

        // Ajouter le modal à l'overlay puis l'overlay au body
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Fermer en cliquant sur l'overlay (mais pas sur le modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche les probabilités de reproduction
     */
    displayBreedingProbabilities(parent1, parent2) {
        const probabilities = document.getElementById('breedingProbabilities');
        if (!probabilities) return;

        const minTier = Math.min(parent1.tier, parent2.tier);
        const maxTier = Math.max(parent1.tier, parent2.tier);

        // Calculer les bonus
        let tierUpChance = DragonsConfig.GENETICS.BASE_PROBABILITIES.tier_up;
        const avgPurity = (parent1.purity + parent2.purity) / 2;

        let bonusText = '';
        if (avgPurity > 0.8) {
            tierUpChance += DragonsConfig.GENETICS.PURITY_BONUS.high_purity;
            bonusText += '<div>✨ +10% (Haute pureté)</div>';
        }
        if (parent1.tier === parent2.tier) {
            tierUpChance += DragonsConfig.GENETICS.PURITY_BONUS.same_tier_parents;
            bonusText += '<div>🎯 +5% (Même tier)</div>';
        }

        const tierUpPercent = Math.round(tierUpChance * 100);
        const sameTierPercent = Math.round(DragonsConfig.GENETICS.BASE_PROBABILITIES.same_tier * 100);
        const failPercent = Math.round(DragonsConfig.GENETICS.BASE_PROBABILITIES.failure * 100);

        probabilities.innerHTML = `
            <div class="probability-item">
                <span>⬆️ Tier ${Math.min(5, maxTier + 1)}:</span>
                <span>${tierUpPercent}%</span>
            </div>
            <div class="probability-item">
                <span>➡️ Tier ${minTier}-${maxTier}:</span>
                <span>${sameTierPercent}%</span>
            </div>
            <div class="probability-item">
                <span>⬇️ Échec:</span>
                <span>${failPercent}%</span>
            </div>
            ${bonusText ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color); font-size: 0.85rem;">${bonusText}</div>` : ''}
        `;
    }

    /**
     * Initialise les event listeners pour les dragons
     */
    initDragonsEventListeners() {
        // Bouton reproduire
        const btnBreed = document.getElementById('btnBreed');
        if (btnBreed) {
            btnBreed.addEventListener('click', () => {
                const result = this.game.dragonManager.breed();
                if (result.success) {
                    this.showNotification(result.message, 'success');
                    // Animation dragon born
                    const dragonsGrid = document.getElementById('dragonsGrid');
                    if (dragonsGrid) {
                        dragonsGrid.lastElementChild?.classList.add('dragon-born-animation');
                    }
                } else {
                    this.showNotification(result.message, 'error');
                }
                this.updateDragonsTab();
            });
        }

        // Filtres collection
        document.querySelectorAll('.collection-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Retirer active de tous
                document.querySelectorAll('.collection-filters .filter-btn').forEach(b => b.classList.remove('active'));
                // Ajouter à celui cliqué
                btn.classList.add('active');

                // Filtrer (TODO: implémenter le filtrage)
                const filter = btn.getAttribute('data-filter');
                this.filterDragons(filter);
            });
        });
    }

    /**
     * Affiche l'arbre généalogique d'un dragon
     */
    showGenealogy(dragonId) {
        const dragon = this.game.dragonManager.getDragon(dragonId);
        if (!dragon) return;

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'genealogy-modal';
        modal.style.cssText = `
            background: #1e2749;
            border: 2px solid #2a3f5f;
            border-radius: 15px;
            padding: 25px;
            z-index: 10000;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        `;

        const info = dragon.getDisplayInfo();
        const typeConfig = DragonsConfig.TYPES[info.types[0]];

        // Fonction helper pour afficher un dragon
        const renderDragonNode = (dragonData, label) => {
            if (!dragonData) {
                return `
                    <div class="genealogy-node empty">
                        <div style="font-size: 2rem; opacity: 0.3;">❓</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${label}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">Inconnu</div>
                    </div>
                `;
            }

            return `
                <div class="genealogy-node">
                    <div style="font-size: 2rem;">${dragonData.icon}</div>
                    <div style="font-size: 0.8rem; font-weight: bold;">${label}</div>
                    <div style="font-size: 0.9rem;">${dragonData.name}</div>
                    <div style="font-size: 0.75rem; margin-top: 3px;">
                        <span style="background: ${dragonData.tierColor}; padding: 2px 6px; border-radius: 5px;">
                            ${dragonData.tierName}
                        </span>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 3px;">
                        Pureté: ${dragonData.purity}%
                    </div>
                </div>
            `;
        };

        const genealogy = dragon.genealogy;
        const parents = genealogy?.parents || { father: null, mother: null };
        const grandparents = genealogy?.grandparents || {
            paternalGrandfather: null,
            paternalGrandmother: null,
            maternalGrandfather: null,
            maternalGrandmother: null
        };

        modal.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0 0 10px 0;">🌳 Arbre Généalogique</h2>
                <div style="font-size: 1.5rem; margin: 10px 0;">${typeConfig.icon}</div>
                <div style="font-size: 1.2rem; font-weight: bold;">${info.name}</div>
                <div style="margin-top: 5px;">
                    <span style="background: ${info.tierColor}; padding: 5px 15px; border-radius: 10px; font-weight: bold;">
                        ${info.tierName} - Niveau ${info.level}
                    </span>
                </div>
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <span>✨ Pureté: ${info.purity}%</span>
                    <span style="margin-left: 15px;">🧬 Génération: ${info.generation}</span>
                </div>
            </div>

            <div class="genealogy-tree" style="margin-top: 30px;">
                <!-- Grands-parents paternels -->
                <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
                    ${renderDragonNode(grandparents.paternalGrandfather, 'Grand-père paternel')}
                    ${renderDragonNode(grandparents.paternalGrandmother, 'Grand-mère paternelle')}
                    ${renderDragonNode(grandparents.maternalGrandfather, 'Grand-père maternel')}
                    ${renderDragonNode(grandparents.maternalGrandmother, 'Grand-mère maternelle')}
                </div>

                <!-- Connecteurs visuels -->
                <div style="text-align: center; font-size: 2rem; line-height: 0.5; color: var(--text-muted);">
                    ↓ ↓ ↓ ↓
                </div>

                <!-- Parents -->
                <div style="display: flex; justify-content: space-around; margin: 20px 0;">
                    ${renderDragonNode(parents.father, 'Père')}
                    ${renderDragonNode(parents.mother, 'Mère')}
                </div>

                <!-- Connecteur vers l'enfant -->
                <div style="text-align: center; font-size: 2rem; line-height: 0.5; color: var(--text-muted);">
                    ↓
                </div>
            </div>

            <button class="btn btn-secondary btn-block" style="margin-top: 25px;" onclick="this.closest('.modal-overlay').remove();">
                Fermer
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Fermer en cliquant sur l'overlay (mais pas sur le modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Rend une section de race hybride pour le bestiaire (avec tous ses tiers)
     */
    renderHybridBestiarySection(hybrid) {
        const raceKey = hybrid.key;
        const raceNames = hybrid.types.map(t => DragonsConfig.TYPES[t].raceName).join(' × ');

        return `
            <div style="margin-bottom: 25px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border-left: 4px solid ${hybrid.colors[0]};">
                <h3 style="background: ${hybrid.gradient}; margin: -15px -15px 15px -15px; padding: 12px 15px; border-radius: 12px 12px 0 0; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.8rem;">${hybrid.icons}</span>
                    <span style="color: white; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); font-weight: bold;">${hybrid.name}</span>
                    <span style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.9);">(${hybrid.statNames})</span>
                </h3>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
                    ${raceNames}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px;">
                    ${Object.entries(DragonsConfig.TIERS).map(([tierKey, tierConfig]) => {
            const isUnlocked = this.game.dragonManager.isBestiaryEntryUnlocked(raceKey, tierKey);
            return `
                            <div style="
                                padding: 12px;
                                background: ${isUnlocked ? tierConfig.color + '20' : 'rgba(0, 0, 0, 0.3)'};
                                border: 2px solid ${isUnlocked ? tierConfig.color : 'var(--border-color)'};
                                border-radius: 10px;
                                text-align: center;
                                ${isUnlocked ? '' : 'opacity: 0.5; filter: grayscale(1);'}
                            ">
                                <div style="font-size: 1.5rem; margin-bottom: 5px;">
                                    ${isUnlocked ? hybrid.icons : '❓'}
                                </div>
                                <div style="font-weight: bold; color: ${tierConfig.color}; font-size: 0.85rem;">
                                    ${tierConfig.name}
                                </div>
                                ${isUnlocked ? `
                                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 5px;">
                                        Stats: ${tierConfig.minStat}-${tierConfig.maxStat}
                                    </div>
                                    <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 3px;">
                                        Coût: ${tierConfig.breedCost}🪙
                                    </div>
                                ` : `
                                    <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 5px;">
                                        Non découvert
                                    </div>
                                `}
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Affiche le bestiaire des dragons
     */
    showBestiary() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.className = 'bestiary-modal';
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 900px; width: 90%; max-height: 85vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        const stats = this.game.dragonManager.getBestiaryStats();

        // Créer la grille du bestiaire
        let bestiaryContent = '';
        for (const [typeKey, typeConfig] of Object.entries(DragonsConfig.TYPES)) {
            bestiaryContent += `
                <div style="margin-bottom: 25px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px;">
                    <h3 style="color: ${typeConfig.color}; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.8rem;">${typeConfig.icon}</span>
                        ${typeConfig.raceName}
                        <span style="font-size: 0.85rem; color: var(--text-muted);">(${this.getStatIcon(typeConfig.stat)} ${typeConfig.statName})</span>
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px;">
                        ${Object.entries(DragonsConfig.TIERS).map(([tierKey, tierConfig]) => {
                const isUnlocked = this.game.dragonManager.isBestiaryEntryUnlocked(typeKey, tierKey);
                return `
                                <div style="
                                    padding: 12px;
                                    background: ${isUnlocked ? tierConfig.color + '20' : 'rgba(0, 0, 0, 0.3)'};
                                    border: 2px solid ${isUnlocked ? tierConfig.color : 'var(--border-color)'};
                                    border-radius: 10px;
                                    text-align: center;
                                    ${isUnlocked ? '' : 'opacity: 0.5; filter: grayscale(1);'}
                                ">
                                    <div style="font-size: 1.5rem; margin-bottom: 5px;">
                                        ${isUnlocked ? typeConfig.icon : '❓'}
                                    </div>
                                    <div style="font-weight: bold; color: ${tierConfig.color}; font-size: 0.85rem;">
                                        ${tierConfig.name}
                                    </div>
                                    ${isUnlocked ? `
                                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 5px;">
                                            Stats: ${tierConfig.minStat}-${tierConfig.maxStat}
                                        </div>
                                        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 3px;">
                                            Coût: ${tierConfig.breedCost}🪙
                                        </div>
                                    ` : `
                                        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 5px;">
                                            Non découvert
                                        </div>
                                    `}
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }

        // Générer les sections d'hybrides
        const allHybrids = DragonsConfig.getAllHybrids();
        let hybridsContent = '';

        // 2 TYPES
        if (allHybrids[2] && allHybrids[2].length > 0) {
            hybridsContent += '<div style="margin-top: 30px;"><h2 style="color: #A78BFA; margin-bottom: 15px;">🌟 Dragons à 2 Types</h2>';
            allHybrids[2].forEach(hybrid => {
                hybridsContent += this.renderHybridBestiarySection(hybrid);
            });
            hybridsContent += '</div>';
        }

        // 3 TYPES
        if (allHybrids[3] && allHybrids[3].length > 0) {
            hybridsContent += '<div style="margin-top: 30px;"><h2 style="color: #9D6BFF; margin-bottom: 15px;">✨ Dragons à 3 Types</h2>';
            allHybrids[3].forEach(hybrid => {
                hybridsContent += this.renderHybridBestiarySection(hybrid);
            });
            hybridsContent += '</div>';
        }

        // 4 TYPES
        if (allHybrids[4] && allHybrids[4].length > 0) {
            hybridsContent += '<div style="margin-top: 30px;"><h2 style="color: #8B5CFF; margin-bottom: 15px;">💫 Dragons à 4 Types</h2>';
            allHybrids[4].forEach(hybrid => {
                hybridsContent += this.renderHybridBestiarySection(hybrid);
            });
            hybridsContent += '</div>';
        }

        // 5 TYPES
        if (allHybrids[5] && allHybrids[5].length > 0) {
            hybridsContent += '<div style="margin-top: 30px;"><h2 style="color: #7A4DFF; margin-bottom: 15px;">🌌 Dragon à 5 Types (Primordial)</h2>';
            allHybrids[5].forEach(hybrid => {
                hybridsContent += this.renderHybridBestiarySection(hybrid);
            });
            hybridsContent += '</div>';
        }

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">📖 Bestiaire des Dragons</h2>
            
            <!-- Statistiques de progression -->
            <div style="background: linear-gradient(135deg, rgba(100, 150, 255, 0.2), rgba(50, 100, 200, 0.2)); border: 2px solid rgba(100, 150, 255, 0.4); border-radius: 12px; padding: 15px; margin-bottom: 20px; text-align: center;">
                <div style="font-size: 1.1rem; font-weight: bold; color: #7FBFFF; margin-bottom: 8px;">
                    Progression: ${stats.unlocked}/${stats.total} (${stats.percentage}%)
                </div>
                <div style="width: 100%; height: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; overflow: hidden;">
                    <div style="width: ${stats.percentage}%; height: 100%; background: linear-gradient(90deg, #5CFF5C, #00CC00); transition: width 0.5s ease;"></div>
                </div>
            </div>

            <h2 style="color: #E74C3C; margin-bottom: 15px;">🔥 Dragons Purs</h2>
            ${bestiaryContent}

            ${hybridsContent}

            <div style="margin-top: 20px; padding: 15px; background: rgba(255, 200, 100, 0.15); border: 2px solid rgba(255, 200, 100, 0.3); border-radius: 10px; font-size: 0.9rem;">
                <strong>💡 Astuce :</strong> Découvrez de nouvelles races en croisant des dragons ! Plus vous mélangez de types, plus les dragons deviennent rares et puissants !
            </div>

            <button class="btn btn-primary btn-block" style="margin-top: 15px;" onclick="this.closest('.modal-overlay').remove();">
                Fermer
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Fermer en cliquant sur l'overlay (mais pas sur le modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur les dragons
     */
    showDragonHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.className = 'dragon-help-modal';
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">🐉 Guide des Dragons</h2>

            <!-- Types de dragons -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">📋 Types de Dragons</h3>
                <p style="margin-bottom: 10px;">Il existe 5 types de dragons, chacun spécialisé dans une statistique :</p>
                <div style="display: grid; gap: 8px;">
                    ${Object.entries(DragonsConfig.TYPES).map(([key, type]) => `
                        <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 8px;">
                            <span style="font-size: 1.5rem;">${type.icon}</span>
                            <span style="font-weight: bold; color: ${type.color};">${type.raceName}</span>
                            <span style="color: var(--text-muted);">(${this.getStatIcon(type.stat)} ${key.charAt(0).toUpperCase() + key.slice(1)})</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Tiers -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⭐ Système de Tiers</h3>
                <p>Les dragons vont de T0 (Commun) à T5 (Mythique). Plus le tier est élevé, plus les stats sont fortes :</p>
                <div style="display: grid; gap: 5px; margin-top: 10px;">
                    ${Object.entries(DragonsConfig.TIERS).map(([tier, data]) => `
                        <div style="display: flex; justify-content: space-between; padding: 6px 12px; background: ${data.color}30; border-left: 3px solid ${data.color}; border-radius: 5px;">
                            <span style="font-weight: bold; color: ${data.color};">${data.name}</span>
                            <span style="color: var(--text-muted); font-size: 0.9rem;">Stats: ${data.minStat}-${data.maxStat}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Pureté -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">✨ Pureté Génétique</h3>
                <p>La pureté mesure l'homogénéité génétique d'un dragon (0-100%). Elle est calculée ainsi :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>50%</strong> : propre type du dragon</li>
                    <li><strong>30%</strong> : types des parents</li>
                    <li><strong>20%</strong> : types des grands-parents</li>
                </ul>
                <p style="color: #5CFF5C; margin-top: 10px;"><strong>💡 Astuce :</strong> Une haute pureté augmente les chances d'avoir un dragon de tier supérieur à la reproduction !</p>
            </div>

            <!-- Reproduction -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">💕 Reproduction</h3>
                <p>Faites reproduire deux dragons pour créer une nouvelle génération :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Bonus de lignée pure</strong> : +30% de chance de tier supérieur si les 4 grands-parents sont du même type</li>
                    <li><strong>Bonus de pureté</strong> : Jusqu'à +20% de chance en fonction de la pureté des parents</li>
                    <li><strong>Hybrides</strong> : Un dragon peut avoir 2 types différents, mais cela réduit la pureté</li>
                    <li><strong>Mutations</strong> : 5% de chance d'obtenir un type différent des parents</li>
                </ul>
                <p style="color: #FFC95C; margin-top: 10px;"><strong>⚠️ Attention :</strong> La reproduction coûte de l'or et les deux parents doivent être vivants et nourris !</p>
            </div>

            <!-- Entraînement -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⚡ Entraînement</h3>
                <p>Entraînez vos dragons pour augmenter leur niveau (max 25) et leurs stats :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Chaque niveau donne <strong>+${DragonsConfig.TRAINING.statsPerLevel} stats</strong> (réparties selon les types)</li>
                    <li>L'XP requise augmente avec le niveau</li>
                    <li>Coûte de l'or et a un temps de recharge</li>
                </ul>
            </div>

            <!-- Durée de vie -->
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⏳ Durée de Vie & Faim</h3>
                <p>Les dragons vivent <strong>${DragonsConfig.LIFESPAN.duration / (24 * 60 * 60 * 1000)} jours</strong> et doivent être nourris régulièrement :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Ils doivent manger toutes les <strong>${DragonsConfig.LIFESPAN.feedingInterval / (60 * 60 * 1000)} heure(s)</strong></li>
                    <li>Un dragon affamé perd des points de vie progressivement</li>
                    <li>Produisez de la nourriture dans la <strong>🏛️ Ferme à Dragons</strong></li>
                </ul>
                <p style="color: #FF5C5C; margin-top: 10px;"><strong>💀 À leur mort :</strong> Les dragons abandonnent des essences qui donnent des bonus permanents (+${DragonsConfig.ESSENCE.boostAmount} stats) !</p>
            </div>

            <!-- Impact sur le joueur -->
            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">🎯 Impact sur le Joueur</h3>
                <p><strong>Le dragon équipé vous donne ses stats en bonus direct !</strong></p>
                <p style="margin-top: 10px;">Plus votre dragon est fort (tier élevé, bien entraîné, pure génétique), plus vous serez puissant au combat et dans vos activités.</p>
                <p style="margin-top: 10px; color: #5CFF5C;"><strong>💡 Stratégie :</strong> Créez des lignées pures de dragons de haut tier pour maximiser vos bonus !</p>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">
                Fermer
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Fermer en cliquant sur l'overlay (mais pas sur le modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur le Combat
     */
    showCombatHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">⚔️ Guide du Combat</h2>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">🎯 Comment Combattre</h3>
                <p>Le combat est automatique ! Votre personnage attaque le monstre toutes les 2 secondes. Gagnez de l'XP et des ressources à chaque victoire.</p>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">🗺️ Zones & Progression</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Chaque région contient 10 zones</li>
                    <li>Tuez 10 monstres dans une zone pour la compléter</li>
                    <li>Utilisez les boutons ◀ et ▶ pour changer de zone</li>
                    <li>Les monstres deviennent plus forts dans les zones suivantes</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">📊 Statistiques de Combat</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>💪 Force :</strong> Augmente vos dégâts physiques</li>
                    <li><strong>⚡ Agilité :</strong> +1% de critique et +0.5% d'esquive par point</li>
                    <li><strong>🧠 Intelligence :</strong> Dégâts magiques (pour Donjons)</li>
                    <li><strong>✨ Sagesse :</strong> Efficacité des soins (pour Donjons)</li>
                    <li><strong>🛡️ Endurance :</strong> +5 PV maximum par point</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">💡 Conseils</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Équipez de meilleures armes et armures pour augmenter vos stats</li>
                    <li>Levez pour débloquer de nouvelles zones et régions</li>
                    <li>Les monstres laissent tomber des ressources précieuses</li>
                    <li>Si un monstre est trop fort, revenez avec du meilleur équipement !</li>
                </ul>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">Fermer</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur la Récolte
     */
    showGatheringHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">⛏️ Guide des Métiers de Récolte</h2>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">📋 Les 4 Métiers</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>🪓 Bûcheron :</strong> Récolte du bois (Chêne, Frêne, Érable...)</li>
                    <li><strong>⛏️ Mineur :</strong> Récolte des minerais (Cuivre, Fer, Mithril...) et gemmes</li>
                    <li><strong>🌿 Herboriste :</strong> Récolte des plantes (Sauge, Gingembre, Chardon...)</li>
                    <li><strong>🎣 Pêcheur :</strong> Récolte des poissons (Poisson-chat, Saumon, Espadon...)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⭐ Système de Niveaux</h3>
                <p>En récoltant, vous gagnez de l'XP et montez de niveau dans chaque métier :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Chaque niveau débloque de nouvelles ressources de qualité supérieure</li>
                    <li>Les ressources de tier supérieur donnent plus d'XP</li>
                    <li>L'XP requise augmente progressivement (formule exponentielle)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⚡ Auto-Récolte</h3>
                <p>Construisez des bâtiments dans l'onglet <strong>🏘️ Ville</strong> pour automatiser la récolte :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Scierie :</strong> Auto-bois (1 bois/10s)</li>
                    <li><strong>Mine :</strong> Auto-minerai (1 minerai/10s)</li>
                    <li><strong>Jardin d'Herbes :</strong> Auto-plantes (1 plante/10s)</li>
                    <li><strong>Étang de Pêche :</strong> Auto-poisson (1 poisson/10s)</li>
                </ul>
                <p style="color: #5CFF5C; margin-top: 10px;"><strong>💡 Astuce :</strong> Les bâtiments produisent automatiquement le tier de ressource le plus élevé que vous avez débloqué !</p>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">💎 Gemmes Rares</h3>
                <p>En minant, vous avez une faible chance de trouver des gemmes précieuses !</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>7 tiers de gemmes : Quartz (T1) → Divine (T7)</li>
                    <li>Chaque gemme se débloque à un niveau de Mineur spécifique</li>
                    <li>Plus la gemme est rare, plus le taux de drop est faible</li>
                    <li>Utilisez les gemmes pour la Transmutation et la Joaillerie</li>
                </ul>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">Fermer</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur la Fabrication
     */
    showCraftingHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">🔨 Guide des Métiers de Fabrication</h2>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">📋 Les 4 Métiers</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>⚒️ Forgeron :</strong> Fabrique des armes (épées, arcs, bâtons...)</li>
                    <li><strong>🛡️ Armurier :</strong> Fabrique des armures (casques, plastrons, bottes...)</li>
                    <li><strong>💍 Joaillier :</strong> Fabrique des accessoires (anneaux, amulettes...)</li>
                    <li><strong>⚗️ Alchimiste :</strong> Transmute les ressources (T1 → T2 → T3)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">🎲 Système de Qualité</h3>
                <p>Chaque objet crafté a une chance d'avoir une qualité supérieure qui multiplie ses stats :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Normal :</strong> Stats de base (×1.0) - 78% de chance</li>
                    <li><strong>✨ Supérieur :</strong> Stats améliorées (×1.2) - 18% de chance</li>
                    <li><strong>🌟 Exceptionnel :</strong> Stats excellentes (×1.5) - 3.5% de chance</li>
                    <li><strong>💎 Parfait :</strong> Stats maximales (×2.0) - 0.5% de chance</li>
                </ul>
                <p style="color: #5CFF5C; margin-top: 10px;"><strong>💡 Astuce :</strong> Montez de niveau dans vos métiers pour augmenter les chances de qualité supérieure !</p>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">📜 Recettes</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Cliquez sur une profession à gauche pour voir ses recettes</li>
                    <li><strong>🔒 Rouge :</strong> Niveau de métier insuffisant</li>
                    <li><strong>📦 Bleu :</strong> Niveau OK mais manque de matériaux</li>
                    <li><strong>✅ Vert :</strong> Peut être crafté immédiatement</li>
                    <li>Cliquez sur une recette pour voir les détails et crafter</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⚗️ Transmutation</h3>
                <p>La Transmutation transforme les ressources de tier inférieur en tier supérieur !</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Par exemple : 5 Bois de Chêne (T1) → 1 Bois de Frêne (T2)</li>
                    <li>Montez de niveau en Transmutation pour débloquer T2, T3, etc.</li>
                    <li>Essentiel pour obtenir les ressources rares nécessaires aux recettes de haut niveau</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">💡 Vente Directe</h3>
                <p>Activez la vente directe pour vendre automatiquement les objets craftés sans encombrer votre inventaire !</p>
                <p style="margin-top: 10px;">Utile pour farmer de l'or et de l'XP de métier rapidement.</p>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">Fermer</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur l'Équipement
     */
    showEquipmentHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">🎒 Guide de l'Équipement</h2>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">👕 Slots d'Équipement</h3>
                <p>Votre personnage peut équiper jusqu'à 7 objets différents :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>⚔️ Arme :</strong> Augmente vos dégâts</li>
                    <li><strong>🪖 Casque :</strong> Protection pour la tête</li>
                    <li><strong>👕 Plastron :</strong> Protection pour le torse</li>
                    <li><strong>👖 Jambières :</strong> Protection pour les jambes</li>
                    <li><strong>👢 Bottes :</strong> Protection pour les pieds</li>
                    <li><strong>🧤 Gants :</strong> Protection pour les mains</li>
                    <li><strong>💍 Accessoire :</strong> Bonus spéciaux (anneaux, amulettes)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⭐ Raretés</h3>
                <p>Les objets existent en 6 raretés différentes :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><span style="color: #9E9E9E;">⚪ Commun</span> : Stats de base</li>
                    <li><span style="color: #4CAF50;">🟢 Peu commun</span> : Stats améliorées</li>
                    <li><span style="color: #2196F3;">🔵 Rare</span> : Bonnes stats</li>
                    <li><span style="color: #9C27B0;">🟣 Épique</span> : Excellentes stats</li>
                    <li><span style="color: #FF9800;">🟠 Légendaire</span> : Stats exceptionnelles</li>
                    <li><span style="color: #F44336;">🔴 Mythique</span> : Stats maximales</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">🎲 Qualité des Objets</h3>
                <p>En plus de la rareté, chaque objet crafté a une qualité qui multiplie ses stats :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Normal (×1.0)</li>
                    <li>✨ Supérieur (×1.2)</li>
                    <li>🌟 Exceptionnel (×1.5)</li>
                    <li>💎 Parfait (×2.0)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">💰 Gestion de l'Inventaire</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Cliquez sur un objet pour l'équiper ou le vendre</li>
                    <li><strong>Vendre Tout :</strong> Vend tous les objets de votre inventaire</li>
                    <li><strong>Vendre Normaux :</strong> Vend uniquement les objets de qualité Normal</li>
                    <li><strong>Vendre Supérieurs :</strong> Vend uniquement les objets de qualité Supérieur</li>
                    <li>Les objets équipés ne peuvent pas être vendus</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">💡 Conseils</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Équipez toujours le meilleur équipement disponible</li>
                    <li>Les stats de vos équipements s'additionnent à vos stats de base</li>
                    <li>Vendez les objets dont vous n'avez plus besoin pour gagner de l'or</li>
                    <li>Craftez de meilleurs objets dans l'onglet <strong>🔨 Fabrication</strong></li>
                </ul>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">Fermer</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Affiche la modal d'aide sur la Ville
     */
    showTownHelp() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; display: flex; align-items: center; justify-content: center;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: #1e2749; border: 2px solid #2a3f5f; border-radius: 15px; padding: 25px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);';

        modal.innerHTML = `
            <h2 style="margin-top: 0; text-align: center; color: var(--accent-color);">🏘️ Guide de la Ville</h2>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">🏗️ Bâtiments</h3>
                <p>Construisez des bâtiments pour automatiser la production de ressources :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>🪚 Scierie :</strong> Produit automatiquement du bois (1 toutes les 10s)</li>
                    <li><strong>⛏️ Mine :</strong> Produit automatiquement des minerais (1 toutes les 10s)</li>
                    <li><strong>🌿 Jardin d'Herbes :</strong> Produit automatiquement des plantes (1 toutes les 10s)</li>
                    <li><strong>🎣 Étang de Pêche :</strong> Produit automatiquement des poissons (1 toutes les 10s)</li>
                    <li><strong>🏛️ Ferme à Dragons :</strong> Produit de la nourriture pour dragons (1 toutes les 30s)</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">⚡ Production Automatique</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Les bâtiments fonctionnent même quand vous êtes hors ligne</li>
                    <li>Ils produisent le <strong>tier le plus élevé</strong> que vous avez débloqué dans ce métier</li>
                    <li>Par exemple : si vous avez Mineur niveau 15, la Mine produira du Fer (T2)</li>
                    <li>Améliorez vos métiers de récolte pour produire de meilleures ressources</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                <h3 style="color: var(--accent-color); margin-top: 0;">👥 Travailleurs</h3>
                <p>Recrutez des travailleurs pour augmenter votre production :</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Chaque travailleur coûte de l'or (prix augmente avec le nombre)</li>
                    <li>Assignez-les à des bâtiments pour accélérer la production</li>
                    <li>Plus de travailleurs = plus de ressources par seconde</li>
                    <li>Gérez intelligemment votre population pour optimiser vos gains</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, rgba(100, 200, 100, 0.2), rgba(50, 150, 50, 0.2)); border: 2px solid rgba(100, 200, 100, 0.4); border-radius: 10px;">
                <h3 style="color: #5CFF5C; margin-top: 0;">💡 Stratégie</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Construisez tous les bâtiments dès que possible</li>
                    <li>Priorisez les bâtiments qui produisent les ressources dont vous avez le plus besoin</li>
                    <li>Montez vos métiers de récolte pour améliorer la production automatique</li>
                    <li>La Ferme à Dragons est essentielle pour nourrir vos dragons !</li>
                </ul>
            </div>

            <button class="btn btn-primary btn-block" onclick="this.closest('.modal-overlay').remove();">Fermer</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Filtre les dragons affichés
     */
    filterDragons(filter) {
        const container = document.getElementById('dragonsGrid');
        if (!container) return;

        let dragons = this.game.dragonManager.dragons;

        switch (filter) {
            case 'all':
                dragons = this.game.dragonManager.getAliveDragons();
                break;
            case 'alive':
                dragons = this.game.dragonManager.getAliveDragons();
                break;
            case 'dead':
                dragons = this.game.dragonManager.getDeadDragons();
                break;
            default:
                // Filtrer par type
                dragons = this.game.dragonManager.getAliveDragons().filter(d =>
                    d.types.includes(filter)
                );
        }

        // Réafficher
        if (dragons.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Aucun dragon trouvé</p></div>';
        } else {
            container.innerHTML = dragons.map(dragon => {
                const info = dragon.getDisplayInfo();
                const typeConfig = DragonsConfig.TYPES[info.types[0]];
                const isEquipped = this.game.dragonManager.equippedDragonId === dragon.id;
                const isDead = !dragon.isAlive;

                return `
                    <div class="dragon-card ${isEquipped ? 'selected' : ''} ${isDead ? 'dead' : ''}" 
                         onclick="window.game.ui.showDragonDetailsModal('${dragon.id}')" style="cursor: pointer;">
                        ${isEquipped ? '<div class="dragon-card-badge equipped">⭐ Actif</div>' : ''}
                        <div class="dragon-card-icon">${typeConfig.icon}</div>
                        <div class="dragon-card-name">${info.name}</div>
                        <div class="dragon-card-race" style="font-size: 0.75rem; color: ${info.tierColor}; font-weight: bold; margin: 3px 0;">
                            ${info.raceName}
                        </div>
                        <div class="dragon-card-tier" style="background: ${info.tierColor}">
                            ${info.tierName}
                        </div>
                        <div class="dragon-card-level">${isDead ? '💀 Mort' : `Niveau ${info.level}`}</div>
                        <div class="dragon-stats-preview" style="font-size: 0.7rem; margin-top: 5px; color: var(--text-muted);">
                            ${Object.entries(info.stats).filter(([_, v]) => v > 0).map(([stat, value]) => `${this.getStatIcon(stat)}+${value}`).join(' ')}
                        </div>
                        ${!info.isFed ? '<div class="dragon-hungry">🍖</div>' : ''}
                    </div>
                `;
            }).join('');
        }
    }

    /**
     * 🎭 Initialise l'UI Alt Characters
     */
    initializeAltCharactersUI() {
        if (!this.altCharactersUI) {
            this.altCharactersUI = new AltCharactersUI(this.game);
        }
        this.altCharactersUI.initialize();
    }

    /**
     * 🏰 Initialise l'UI Donjons
     */
    initializeDungeonsUI() {
        if (!this.dungeonsUI) {
            this.dungeonsUI = new DungeonsUI(this.game);
        }
        this.dungeonsUI.initialize();
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.UI = UI;
}
