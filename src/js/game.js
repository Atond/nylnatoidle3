/**
 * Classe Game - Point d'entrée principal du jeu
 * Orchestre tous les systèmes (combat, métiers, ville, etc.)
 */

class Game {
    constructor() {
        // Systèmes principaux
        this.player = null;
        this.combat = null;
        this.ui = null;
        this.questManager = null;
        this.professionManager = null;
        this.equipmentManager = null;
        this.storageManager = null;
        this.characterCreation = null;
        this.alchemyManager = null; // 🧪 Système de conversion alchimique
        this.dragonManager = null; // 🐉 Système de dragons
        this.altCharacterManager = null; // 🎭 Système de personnages alternatifs
        this.dungeonManager = null; // 🏰 Système de donjons Trinity
        
        // 🔓 Système de déblocages progressifs (Quêtes)
        this.unlocks = {
            // Auto-features
            auto_combat: false,
            auto_gather_wood: false,
            auto_gather_ore: false,
            auto_fishing: false,
            auto_herbalism: false,
            
            // Onglets UI
            combat_log: false,
            equipment_tab: false,      // 🎒 Équipement (M01)
            gathering_tab: false,      // ⛏️ Récolte (M04)
            crafting_tab: false,       // 🔨 Fabrication (M06)
            alchemy_tab: false,        // ⚗️ Transmutation (M08)
            inventory_tab: false,      // Ancien nom (compatibilité)
            professions_tab: false,    // Ancien nom (compatibilité)
            town_tab: false,           // 🏘️ Ville (M10)
            dragons_tab: false,        // 🐉 Dragons (futur)
            guild_tab: false,          // 👥 Guilde (futur)
            
            // Régions
            region_2: false,
            region_3: false,
            region_4: false,
            region_5: false,
            
            // Métiers
            profession_woodcutting: false,
            profession_mining: false,
            profession_herbalism: false,
            profession_fishing: false,
            profession_blacksmith: false,
            profession_armorsmith: false,
            profession_jeweler: false,
            profession_alchemist: false,
            profession_tailor: false,
            profession_transmutation: false,
            
            // Systèmes
            storage_system: false,
            dragon_capture: false,
            dragon_breeding: false,
            
            // Alt Characters & Donjons
            alt_characters: false,
            shared_storage: false,
            characters_tab: false,
            dungeons_tab: false,
            raid_system: false
        };
        
        // Boucle de jeu
        this.lastUpdateTime = 0;
        this.gameLoopId = null;
        this.isRunning = false;
        
        // Sauvegarde automatique
        this.lastSaveTime = 0;
        this.autoSaveIntervalId = null;
        
        // Flag pour empêcher la sauvegarde pendant le reset
        this.isResetting = false;
        
        // ⚡ OPTIMISATION: Throttle UI updates
        this.lastUIUpdateTime = 0;
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`🎮 ${GameConfig.GAME_NAME} v${GameConfig.GAME_VERSION} initialisé`);
        }
    }

    /**
     * Initialise le jeu
     */
    init() {
        // ✅ Vérifier si on est en train d'importer une sauvegarde
        const isImporting = localStorage.getItem('nylnato_importing');
        if (isImporting === 'true') {
            this.isResetting = true; // Bloquer beforeunload
            localStorage.removeItem('nylnato_importing'); // Nettoyer le flag
            console.log('🔄 Import de sauvegarde détecté - Auto-save désactivé');
        }
        
        // 🏗️ FIX: Injection de dépendances - créer equipmentManager d'abord
        this.equipmentManager = new EquipmentManager(this);
        
        // 🐉 Créer dragonManager avant player (pour injection)
        this.dragonManager = new DragonManager(null); // Player sera défini après
        
        // 🎭 Créer altCharacterManager avant player
        this.altCharacterManager = new AltCharacterManager(this);
        
        // 🏰 Créer dungeonManager
        this.dungeonManager = new DungeonManager(this);
        this.dungeonManager.initialize();
        
        // Création des instances avec injection de dépendances
        this.player = new Player(this.equipmentManager, this.dragonManager);
        
        // 🐉 Lier le player au dragonManager
        this.dragonManager.player = this.player;
        
        this.combat = new Combat(this.player);
        this.questManager = new QuestManager(this.player);
        this.professionManager = new ProfessionManager();
        this.craftingManager = new CraftingManager(this);
        this.buildingManager = new BuildingManager(this);
        this.cityManager = new CityManager(this); // 🏘️ Gestion de la ville
        this.alchemyManager = new AlchemyManager(this); // 🧪 Alchimie
        this.storageManager = new StorageManager(this);
        this.ui = new UI(this);
        this.characterCreation = new CharacterCreationManager(this);
        
        // Tente de charger une sauvegarde existante
        const loaded = this.load();
        
        if (!loaded) {
            console.log('🆕 Nouvelle partie démarrée');
            // Plus besoin d'équipement de test, on peut les fabriquer !
        } else {
            console.log('💾 Sauvegarde chargée');
        }
        
        // ✅ Réactiver la sauvegarde après le chargement réussi
        if (this.isResetting) {
            this.isResetting = false;
            console.log('✅ Import terminé - Auto-save réactivé');
        }
        
        // Mise à jour initiale de l'interface
        this.ui.update();
        this.ui.updateProfessions();
        this.ui.updateInventory();
        this.ui.updateAutoGatherButtons();
        this.ui.checkEquipmentUnlock(); // Vérifier si l'équipement doit être débloqué
        
        // 🔧 FIX: Restaurer l'état du bouton auto-combat après chargement
        this.ui.updateAutoCombatButton(this.combat.autoCombatEnabled);
        
        // Afficher la création de personnage si nécessaire
        if (this.characterCreation.shouldShow()) {
            setTimeout(() => {
                this.characterCreation.show();
            }, 500);
        }
        
        // Démarre la boucle de jeu
        this.start();
        
        // Active l'auto-save
        this.startAutoSave();
        
        if (GameConfig.DEBUG.enabled) {
            console.log('✅ Jeu prêt !');
            console.log('💡 Tapez game dans la console pour accéder au jeu');
        }
    }

    /**
     * Démarre la boucle de jeu
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastUpdateTime = Date.now();
        this.gameLoop();
    }

    /**
     * Arrête la boucle de jeu
     */
    stop() {
        this.isRunning = false;
        
        if (this.gameLoopId) {
            cancelAnimationFrame(this.gameLoopId);
            this.gameLoopId = null;
        }
    }

    /**
     * Boucle principale du jeu
     */
    gameLoop() {
        if (!this.isRunning) return;
        
        const currentTime = Date.now();
        let deltaTime = currentTime - this.lastUpdateTime;
        
        // ⚡ OPTIMISATION: Limiter deltaTime pour éviter accumulation
        if (deltaTime > GameConfig.PERFORMANCE.MAX_DELTA_TIME) {
            console.warn(`⚠️ deltaTime trop élevé (${deltaTime}ms), limité à ${GameConfig.PERFORMANCE.MAX_DELTA_TIME}ms`);
            deltaTime = GameConfig.PERFORMANCE.MAX_DELTA_TIME;
        }
        
        // Mise à jour uniquement tous les X ms (défini dans config)
        if (deltaTime >= GameConfig.PERFORMANCE.UPDATE_INTERVAL) {
            this.update(deltaTime);
            this.lastUpdateTime = currentTime;
        }
        
        // Continue la boucle
        this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Met à jour le jeu
     */
    update(deltaTime) {
        // Met à jour le combat (auto-combat pour plus tard)
        if (this.combat) {
            this.combat.update(deltaTime);
        }
        
        // Met à jour les bâtiments (production automatique)
        if (this.buildingManager) {
            this.buildingManager.update(deltaTime);
        }
        
        // 🏘️ Met à jour la ville (population, nourriture, taxes)
        if (this.cityManager) {
            this.cityManager.update(deltaTime);
        }
        
        // 🧪 Met à jour l'alchimie (conversions en cours)
        if (this.alchemyManager) {
            this.alchemyManager.update(deltaTime);
            // Vérifier déblocage alchimie
            this.alchemyManager.checkUnlock(this.player.level);
        }
        
        // 🐉 Met à jour les dragons (durée de vie, faim)
        if (this.dragonManager && GameConfig.FEATURES.enableDragons) {
            this.dragonManager.update(deltaTime);
        }
        
        // ⚡ OPTIMISATION: Throttle UI updates (pas besoin de refresh constant)
        const currentTime = Date.now();
        if (currentTime - this.lastUIUpdateTime >= GameConfig.PERFORMANCE.UI_UPDATE_INTERVAL) {
            if (this.ui) {
                this.ui.update();
            }
            this.lastUIUpdateTime = currentTime;
        }
    }

    /**
     * Gère le clic sur le bouton d'attaque
     */
    onAttackClick() {
        if (!this.player.isAlive) {
            console.log('Vous êtes mort, attendez la réanimation...');
            return;
        }
        
        const success = this.combat.manualAttack();
        
        if (success) {
            // Mise à jour immédiate de l'UI
            this.ui.update();
        }
    }

    /**
     * Toggle l'auto-combat
     */
    onAutoCombatToggle() {
        const isActive = this.combat.toggleAutoCombat();
        this.ui.updateAutoCombatButton(isActive);
        
        if (GameConfig.DEBUG.enabled) {
            console.log('🔄 Auto-combat:', isActive ? 'ACTIVÉ' : 'DÉSACTIVÉ');
            console.log('Combat state:', {
                isActive: this.combat.isActive,
                isFighting: this.combat.isFighting,
                autoCombatEnabled: this.combat.autoCombatEnabled
            });
        }
    }

    /**
     * Change de zone (avec flèches)
     */
    onZoneChange(direction) {
        const success = this.combat.changeZone(direction);
        if (success) {
            this.ui.update();
        }
    }

    /**
     * Sauvegarde le jeu
     */
    save() {
        // Empêcher la sauvegarde pendant le reset
        if (this.isResetting) {
            console.log('⏸️ Sauvegarde bloquée (reset en cours)');
            return;
        }
        
        try {
            const saveData = {
                version: GameConfig.GAME_VERSION,
                timestamp: Date.now(),
                unlocks: this.unlocks, // 🔓 Déblocages progressifs
                player: this.player.toJSON(),
                combat: this.combat.toJSON(),
                quests: this.questManager.toJSON(),
                professions: this.professionManager.toJSON(),
                equipment: this.equipmentManager.toJSON(),
                crafting: this.craftingManager.toJSON(),
                buildings: this.buildingManager.toJSON(),
                city: this.cityManager.toJSON(), // 🏘️ Ville
                alchemy: this.alchemyManager.save(), // 🧪 Alchimie
                dragons: this.dragonManager.toJSON(), // 🐉 Dragons
                storage: this.storageManager.getSaveData(),
                altCharacters: this.altCharacterManager.save(), // 🎭 Alt Characters
                dungeons: this.dungeonManager.save(), // 🏰 Donjons
                ui: this.ui.toJSON()
            };
            
            const saveString = JSON.stringify(saveData);
            localStorage.setItem(GameConfig.SAVE.SAVE_KEY, saveString);
            
            this.lastSaveTime = Date.now();
            this.ui.updateLastSave(this.lastSaveTime);
            
            if (GameConfig.DEBUG.logSaves) {
                console.log('💾 Partie sauvegardée', saveData);
            }
            
            // Notification supprimée pour réduire le spam (auto-save toutes les 30s)
            return true;
            
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde:', error);
            this.ui.showNotification('Erreur lors de la sauvegarde', 'error');
            return false;
        }
    }

    /**
     * Charge le jeu depuis une sauvegarde
     */
    load() {
        try {
            const saveString = localStorage.getItem(GameConfig.SAVE.SAVE_KEY);
            
            if (!saveString) {
                return false; // Pas de sauvegarde
            }
            
            const saveData = JSON.parse(saveString);
            
            // Vérification de version (important pour la compatibilité)
            if (saveData.version !== GameConfig.GAME_VERSION) {
                console.warn('⚠️ Version de sauvegarde différente, chargement tenté...');
            }
            
            // Restaure les données
            // 🔓 Restaurer les déblocages
            if (saveData.unlocks) {
                this.unlocks = { ...this.unlocks, ...saveData.unlocks };
            }
            
            this.player.fromJSON(saveData.player);
            this.combat.fromJSON(saveData.combat);
            if (saveData.quests) {
                this.questManager.fromJSON(saveData.quests);
            }
            if (saveData.professions) {
                this.professionManager.fromJSON(saveData.professions);
            }
            if (saveData.equipment) {
                this.equipmentManager.fromJSON(saveData.equipment);
            }
            if (saveData.crafting) {
                this.craftingManager.fromJSON(saveData.crafting);
            }
            if (saveData.buildings) {
                this.buildingManager.fromJSON(saveData.buildings);
            }
            if (saveData.city) { // 🏘️ Charger ville
                this.cityManager.fromJSON(saveData.city);
            }
            if (saveData.alchemy) { // 🧪 Charger alchimie
                this.alchemyManager.load(saveData.alchemy);
            }
            if (saveData.dragons) { // 🐉 Charger dragons
                this.dragonManager.fromJSON(saveData.dragons);
            }
            if (saveData.storage) {
                this.storageManager.loadSaveData(saveData.storage);
            }
            if (saveData.altCharacters) { // 🎭 Charger Alt Characters
                this.altCharacterManager.load(saveData.altCharacters);
            }
            if (saveData.dungeons) { // 🏰 Charger Donjons
                this.dungeonManager.load(saveData.dungeons);
            }
            if (saveData.ui) {
                this.ui.fromJSON(saveData.ui);
            }
            
            this.lastSaveTime = saveData.timestamp;
            this.ui.updateLastSave(this.lastSaveTime);
            
            // Calculer la production offline
            this.calculateOfflineProgress(saveData.timestamp);
            
            // 🛡️ FIX: Forcer une mise à jour complète de l'UI après chargement
            if (this.ui) {
                this.ui.update();
                this.ui.updateProfessions();
                this.ui.updateInventory();
                this.ui.updateAutoGatherButtons();
                this.ui.updateTabVisibility(); // 🎉 Restaurer visibilité onglets débloqués
            }
            
            if (GameConfig.DEBUG.logSaves) {
                console.log('📂 Sauvegarde chargée', saveData);
                console.log('👤 Joueur chargé:', {
                    nom: this.player.name,
                    classe: this.player.class,
                    niveau: this.player.level,
                    or: this.player.resources.gold
                });
            }
            
            this.ui.showNotification('Partie chargée', 'success');
            return true;
            
        } catch (error) {
            console.error('❌ Erreur lors du chargement:', error);
            this.ui.showNotification('Erreur lors du chargement', 'error');
            return false;
        }
    }

    /**
     * Réinitialise le jeu
     */
    reset() {
        console.log('🔄 RÉINITIALISATION EN COURS...');
        
        // 🛡️ FIX: Bloquer toute sauvegarde ET arrêter tous les timers AVANT
        this.isResetting = true;
        
        console.log('LocalStorage avant:', localStorage.getItem(GameConfig.SAVE.SAVE_KEY));
        
        // 🛡️ FIX: Arrêter TOUS les timers AVANT de supprimer (ordre important)
        this.stop();
        
        // Arrêter l'auto-save
        if (this.autoSaveIntervalId) {
            clearInterval(this.autoSaveIntervalId);
            this.autoSaveIntervalId = null;
        }
        
        // Arrêter tous les timers des managers
        if (this.buildingManager && this.buildingManager.lastProductionTime) {
            this.buildingManager.lastProductionTime = 0;
        }
        
        // Arrêter auto-craft si actif
        if (this.craftingManager && this.craftingManager.autoCraftState.intervalId) {
            clearInterval(this.craftingManager.autoCraftState.intervalId);
            this.craftingManager.autoCraftState.intervalId = null;
        }
        
        // 🛡️ FIX: Attendre un cycle complet avant de clear
        setTimeout(() => {
            // Supprime TOUTE la sauvegarde
            localStorage.clear();
            
            console.log('LocalStorage après clear:', localStorage.getItem(GameConfig.SAVE.SAVE_KEY));
            console.log('Rechargement de la page...');
            
            // Force le rechargement complet
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }, 100);
    }

    /**
     * Ajoute des équipements de départ pour tester
     */
    addStarterEquipment() {
        // Épée de fer
        const ironSword = new Equipment({
            id: 'iron_sword',
            name: 'Épée de Fer',
            type: 'weapon',
            slot: 'weapon',
            rarity: 'common',
            icon: '⚔️',
            stats: {
                force: 5,
                damage: 8
            },
            requiredLevel: 1,
            description: 'Une simple épée en fer forgé.'
        });
        
        // Bouclier en bois
        const woodenShield = new Equipment({
            id: 'wooden_shield',
            name: 'Bouclier en Bois',
            type: 'offhand',
            slot: 'offhand',
            rarity: 'common',
            icon: '🛡️',
            stats: {
                defense: 5,
                endurance: 3
            },
            requiredLevel: 1,
            description: 'Un bouclier basique en bois renforcé.'
        });
        
        // Tunique de cuir
        const leatherChest = new Equipment({
            id: 'leather_chest',
            name: 'Tunique de Cuir',
            type: 'armor',
            slot: 'chest',
            rarity: 'uncommon',
            icon: '👔',
            stats: {
                defense: 10,
                endurance: 5,
                agility: 2
            },
            requiredLevel: 2,
            description: 'Une armure légère en cuir souple.'
        });
        
        // Gants de travail
        const workGloves = new Equipment({
            id: 'work_gloves',
            name: 'Gants de Travail',
            type: 'gloves',
            slot: 'gloves',
            rarity: 'common',
            icon: '🧤',
            stats: {
                professionXP: 5,
                dropRate: 3
            },
            requiredLevel: 1,
            description: 'Des gants robustes pour les métiers.'
        });
        
        // Anneau de chance
        const luckyRing = new Equipment({
            id: 'lucky_ring',
            name: 'Anneau de Chance',
            type: 'ring',
            slot: 'ring1',
            rarity: 'rare',
            icon: '💍',
            stats: {
                dropRate: 10,
                wisdom: 3
            },
            requiredLevel: 3,
            description: 'Un anneau qui attire la fortune.'
        });
        
        // Ajouter à l'inventaire
        this.equipmentManager.addToInventory(ironSword);
        this.equipmentManager.addToInventory(woodenShield);
        this.equipmentManager.addToInventory(leatherChest);
        this.equipmentManager.addToInventory(workGloves);
        this.equipmentManager.addToInventory(luckyRing);
        
        console.log('🎒 Équipements de départ ajoutés');
    }

    /**
     * Démarre l'auto-save
     */
    startAutoSave() {
        // Sauvegarde automatique tous les X secondes
        this.autoSaveIntervalId = setInterval(() => {
            this.save();
        }, GameConfig.SAVE.AUTO_SAVE_INTERVAL);
        
        console.log(`⏰ Auto-save activé (toutes les ${GameConfig.SAVE.AUTO_SAVE_INTERVAL / 1000}s)`);
    }

    /**
     * Arrête l'auto-save
     */
    stopAutoSave() {
        if (this.autoSaveIntervalId) {
            clearInterval(this.autoSaveIntervalId);
            this.autoSaveIntervalId = null;
        }
    }

    /**
     * Exporte la sauvegarde en Base64 (pour partage/backup)
     * @returns {string|null} Sauvegarde encodée en Base64
     */
    exportSaveAsBase64() {
        this.save(); // Sauvegarde d'abord
        
        const saveString = localStorage.getItem(GameConfig.SAVE.SAVE_KEY);
        if (!saveString) return null;
        
        return btoa(saveString); // Encode en Base64
    }

    /**
     * Importe une sauvegarde depuis Base64
     */
    importSave(base64String) {
        try {
            const saveString = atob(base64String); // Décode depuis Base64
            const saveData = JSON.parse(saveString);
            
            // Valide les données
            if (!saveData.version || !saveData.player) {
                throw new Error('Données de sauvegarde invalides');
            }
            
            // Enregistre et charge
            localStorage.setItem(GameConfig.SAVE.SAVE_KEY, saveString);
            this.load();
            
            console.log('✅ Sauvegarde importée avec succès');
            return true;
            
        } catch (error) {
            console.error("❌ Erreur lors de l'import:", error);
            return false;
        }
    }

    /**
     * Calcule la production offline (ressources gagnées pendant l'absence)
     * @param {number} lastTimestamp - Timestamp de la dernière sauvegarde
     */
    calculateOfflineProgress(lastTimestamp) {
        const now = Date.now();
        const timeAwayMs = now - lastTimestamp;
        const timeAwaySec = timeAwayMs / 1000;
        
        // Ignorer si moins de 60 secondes
        if (timeAwaySec < 60) {
            return;
        }

        // Limiter à 24 heures max (éviter exploits)
        const MAX_OFFLINE_HOURS = 24;
        const maxOfflineMs = MAX_OFFLINE_HOURS * 60 * 60 * 1000;
        const effectiveTimeMs = Math.min(timeAwayMs, maxOfflineMs);
        const effectiveTimeSec = effectiveTimeMs / 1000;

        console.log(`⏰ Production offline : ${NumberFormatter.formatTime(effectiveTimeSec, true)} d'absence`);

        // 🛡️ FIX: Limites maximales de production pour éviter overflow
        const MAX_PRODUCTION_PER_RESOURCE = 1000000; // 1 million max par ressource
        const MAX_TOTAL_PRODUCTION = 10000000; // 10 millions max total
        
        // Calculer la production des bâtiments
        const productions = {};
        let totalProductionValue = 0;

        for (const building of this.buildingManager.getAllBuildings()) {
            if (!building.isBuilt()) continue;

            const production = building.getCurrentProduction();
            
            for (const [resourceId, amountPerMinute] of Object.entries(production)) {
                // Convertir en production par seconde
                const amountPerSecond = amountPerMinute / 60;
                let amountProduced = Math.floor(amountPerSecond * effectiveTimeSec);
                
                // 🛡️ FIX: Limiter la production par ressource
                amountProduced = Math.min(amountProduced, MAX_PRODUCTION_PER_RESOURCE);
                
                if (amountProduced > 0) {
                    // 🛡️ FIX: Vérifier qu'on ne dépasse pas la limite totale
                    if (totalProductionValue + amountProduced > MAX_TOTAL_PRODUCTION) {
                        console.warn(`⚠️ Production offline limitée à ${MAX_TOTAL_PRODUCTION} pour éviter overflow`);
                        amountProduced = Math.max(0, MAX_TOTAL_PRODUCTION - totalProductionValue);
                    }
                    
                    if (amountProduced > 0) {
                        // 📦 FIX: Vérifier les limites de stockage avant d'ajouter
                        const currentAmount = this.professionManager.getInventoryAmount(resourceId);
                        const storageLimit = this.storageManager.getLimit(resourceId);
                        const spaceAvailable = storageLimit - currentAmount;
                        
                        // Limiter la quantité ajoutée à l'espace disponible
                        const actualAmountToAdd = Math.min(amountProduced, spaceAvailable);
                        
                        if (actualAmountToAdd > 0) {
                            // Ajouter à l'inventaire (avec limite de stockage)
                            this.professionManager.addToInventory(resourceId, actualAmountToAdd);
                            
                            // Comptabiliser pour le récapitulatif
                            if (!productions[resourceId]) {
                                productions[resourceId] = 0;
                            }
                            productions[resourceId] += actualAmountToAdd;
                            totalProductionValue += actualAmountToAdd;
                            
                            // Avertir si on a atteint la limite
                            if (actualAmountToAdd < amountProduced) {
                                console.warn(`⚠️ Stockage plein pour ${resourceId}: ${actualAmountToAdd}/${amountProduced} ajouté`);
                            }
                        }
                    }
                }
            }
        }

        // Afficher le récapitulatif si des ressources ont été produites
        if (totalProductionValue > 0) {
            this.showOfflineProgressSummary(effectiveTimeSec, productions, timeAwaySec > effectiveTimeSec);
        }
    }

    /**
     * Affiche le récapitulatif de la production offline
     * @param {number} timeSec - Temps effectif en secondes
     * @param {object} productions - Ressources produites {resourceId: amount}
     * @param {boolean} wasCapped - Si le temps a été limité
     */
    showOfflineProgressSummary(timeSec, productions, wasCapped) {
        const timeFormatted = NumberFormatter.formatTime(timeSec, false);
        
        let message = `🏭 <strong>Production pendant ton absence</strong><br>`;
        message += `⏰ Durée : ${timeFormatted}<br><br>`;
        message += `<strong>Ressources gagnées :</strong><br>`;
        
        for (const [resourceId, amount] of Object.entries(productions)) {
            const resource = window.findResourceById(resourceId);
            const icon = resource?.icon || '📦';
            const name = resource?.name || resourceId;
            message += `${icon} ${name} : +${NumberFormatter.format(amount)}<br>`;
        }

        if (wasCapped) {
            message += `<br><em>⚠️ Production limitée à 24h maximum</em>`;
        }

        // Afficher dans une popup personnalisée
        this.ui.showOfflinePopup(message);
    }

    /**
     * Nettoie avant fermeture
     */
    destroy() {
        this.stop();
        this.stopAutoSave();
        this.save(); // Sauvegarde finale
    }

    /**
     * Exporte la sauvegarde actuelle en tant que fichier JSON téléchargeable
     */
    exportSave() {
        try {
            // Sauvegarder d'abord
            this.save();
            
            // Récupérer la sauvegarde
            const saveString = localStorage.getItem(GameConfig.SAVE.SAVE_KEY);
            if (!saveString) {
                this.ui.showNotification('Aucune sauvegarde à exporter', 'error');
                return false;
            }

            // Créer un blob avec la sauvegarde
            const blob = new Blob([saveString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Créer un lien de téléchargement
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `nylnato-save-${timestamp}.json`;
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();

            // Nettoyer
            URL.revokeObjectURL(url);

            this.ui.showNotification('Sauvegarde exportée !', 'success');
            console.log('📦 Sauvegarde exportée:', filename);
            return true;

        } catch (error) {
            console.error('❌ Erreur lors de l\'export:', error);
            this.ui.showNotification('Erreur lors de l\'export', 'error');
            return false;
        }
    }

    /**
     * Exporte la sauvegarde comme texte à copier
     */
    exportSaveAsText() {
        try {
            // Sauvegarder d'abord
            this.save();
            
            // Récupérer la sauvegarde
            const saveString = localStorage.getItem(GameConfig.SAVE.SAVE_KEY);
            if (!saveString) {
                this.ui.showNotification('Aucune sauvegarde à exporter', 'error');
                return null;
            }

            // Encoder en base64 pour faciliter le copier/coller
            const encoded = btoa(encodeURIComponent(saveString));
            
            console.log('📋 Sauvegarde encodée (longueur:', encoded.length, ')');
            return encoded;

        } catch (error) {
            console.error('❌ Erreur lors de l\'export texte:', error);
            this.ui.showNotification('Erreur lors de l\'export', 'error');
            return null;
        }
    }

    /**
     * Importe une sauvegarde depuis un fichier JSON
     * @param {File} file - Le fichier JSON à importer
     */
    importSaveFromFile(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const saveString = e.target.result;
                const saveData = JSON.parse(saveString);

                // Valider la sauvegarde
                if (!this.validateSave(saveData)) {
                    this.ui.showNotification('Sauvegarde invalide ou corrompue', 'error');
                    return false;
                }

                // Confirmer l'import (écrase la sauvegarde actuelle)
                if (confirm('⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?')) {
                    // ✅ PROTECTION: Bloquer beforeunload avec un flag
                    localStorage.setItem('nylnato_importing', 'true');
                    
                    // Sauvegarder dans localStorage
                    localStorage.setItem(GameConfig.SAVE.SAVE_KEY, saveString);
                    
                    // Recharger la page pour appliquer
                    this.ui.showNotification('Sauvegarde importée ! Rechargement...', 'success');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }

            } catch (error) {
                console.error('❌ Erreur lors de l\'import:', error);
                this.ui.showNotification('Erreur: fichier invalide', 'error');
                return false;
            }
        };

        reader.onerror = () => {
            console.error('❌ Erreur de lecture du fichier');
            this.ui.showNotification('Erreur de lecture du fichier', 'error');
        };

        reader.readAsText(file);
    }

    /**
     * Importe une sauvegarde depuis un texte encodé
     * @param {string} encodedSave - La sauvegarde encodée en base64
     */
    importSaveFromText(encodedSave) {
        try {
            let saveString;
            let saveData;
            
            // ✅ Détecter si c'est du JSON brut ou du Base64
            if (encodedSave.trim().startsWith('{')) {
                // C'est du JSON brut
                console.log('🔍 Format détecté: JSON brut');
                saveString = encodedSave;
                saveData = JSON.parse(saveString);
            } else {
                // C'est du Base64 encodé
                console.log('🔍 Format détecté: Base64');
                saveString = decodeURIComponent(atob(encodedSave));
                saveData = JSON.parse(saveString);
            }

            // Valider la sauvegarde
            if (!this.validateSave(saveData)) {
                this.ui.showNotification('Sauvegarde invalide ou corrompue', 'error');
                return false;
            }

            // Confirmer l'import
            if (confirm('⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?')) {
                // ✅ PROTECTION: Bloquer beforeunload avec un flag
                localStorage.setItem('nylnato_importing', 'true');
                
                // Sauvegarder dans localStorage
                localStorage.setItem(GameConfig.SAVE.SAVE_KEY, saveString);
                
                // Recharger la page
                this.ui.showNotification('Sauvegarde importée ! Rechargement...', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
                return true;
            }

            return false;

        } catch (error) {
            console.error('❌ Erreur lors de l\'import:', error);
            this.ui.showNotification('Erreur: sauvegarde invalide', 'error');
            return false;
        }
    }

    /**
     * Valide une sauvegarde importée
     * @param {object} saveData - Les données de sauvegarde à valider
     * @returns {boolean} - True si valide
     */
    validateSave(saveData) {
        // Vérifier la structure de base
        if (!saveData || typeof saveData !== 'object') {
            console.error('❌ Sauvegarde invalide: pas un objet');
            return false;
        }

        // Vérifier les champs obligatoires
        const requiredFields = ['version', 'timestamp', 'player', 'combat'];
        for (const field of requiredFields) {
            if (!(field in saveData)) {
                console.error(`❌ Sauvegarde invalide: champ manquant '${field}'`);
                return false;
            }
        }

        // Vérifier que player a au moins level et resources
        if (!saveData.player.level || !saveData.player.resources) {
            console.error('❌ Sauvegarde invalide: données joueur manquantes');
            return false;
        }

        // Vérifier la version (warning seulement)
        if (saveData.version !== GameConfig.GAME_VERSION) {
            console.warn(`⚠️ Version différente: sauvegarde ${saveData.version}, jeu ${GameConfig.GAME_VERSION}`);
        }

        return true;
    }
}

// Sauvegarde automatique avant fermeture de la page
window.addEventListener('beforeunload', () => {
    if (window.game && !window.game.isResetting) {
        window.game.save();
    }
});

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Game = Game;
}
