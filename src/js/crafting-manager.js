/**
 * Gestion du système de craft
 */

class CraftingManager {
    constructor(game) {
        this.game = game;
        this.isCrafting = false;
        this.currentCraft = null;
        this.craftStartTime = 0;
        
        // Nouveau système d'auto-craft
        this.autoCraftState = {
            enabled: false,
            recipeId: null,
            sellDirectly: true, // Par défaut, vendre directement
            intervalId: null
        };
        this.autoCraftInterval = 1000; // 1 seconde entre chaque craft auto
        
        // 🏗️ FIX: Système de cooldown renforcé avec détection d'abus
        this._lastCraftTime = 0;
        this._baseCooldown = 100; // 100ms entre chaque craft manuel
        this._cooldownVariance = 20; // ±20ms de variabilité aléatoire
        
        // Historique des crafts pour détection de spam
        this._craftHistory = [];
        this._maxHistorySize = 20;
        this._maxCraftsPerMinute = 100; // Limite raisonnable
        
        // Pénalité en cas d'abus détecté
        this._penaltyEndTime = 0;
        this._penaltyDuration = 5000; // 5 secondes de pénalité
    }

    /**
     * Récupère toutes les recettes disponibles
     */
    getAllRecipes() {
        // Fusion de toutes les sources de recettes
        const baseRecipes = window.CraftRecipesData || [];
        const weaponRecipes = window.CraftRecipesExtended || [];
        const armorRecipes = window.CraftRecipesArmors || [];
        const accessoryRecipes = window.CraftRecipesAccessories || [];
        const consumableRecipes = window.CraftRecipesConsumables || [];
        const tannerRecipes = window.CraftRecipesTanner || [];
        
        const allRecipes = [
            ...baseRecipes,
            ...weaponRecipes,
            ...armorRecipes,
            ...accessoryRecipes,
            ...consumableRecipes,
            ...tannerRecipes
        ];
        
        if (GameConfig.DEBUG.enabled && allRecipes.length === 0) {
            console.warn('⚠️ Aucune recette chargée ! Vérifiez que les fichiers craft-recipes-*.js sont inclus.');
        }
        
        if (GameConfig.DEBUG.enabled) {
            console.log(`📋 Total recettes chargées: ${allRecipes.length} (Base: ${baseRecipes.length}, Armes: ${weaponRecipes.length}, Armures: ${armorRecipes.length}, Accessoires: ${accessoryRecipes.length}, Consommables: ${consumableRecipes.length}, Tanneur: ${tannerRecipes.length})`);
        }
        
        return allRecipes;
    }

    /**
     * Récupère les recettes filtrées par profession
     */
    getRecipesByProfession(professionId) {
        return this.getAllRecipes().filter(recipe => recipe.profession === professionId);
    }

    /**
     * Vérifie si le joueur peut crafter une recette
     */
    canCraft(recipeId) {
        const recipe = this.getAllRecipes().find(r => r.id === recipeId);
        if (!recipe) return { canCraft: false, reason: 'Recette introuvable' };

        // Vérifier le niveau de profession
        const profession = this.game.professionManager.getProfession(recipe.profession);
        if (!profession) return { canCraft: false, reason: 'Profession non trouvée' };
        if (profession.level < recipe.professionLevel) {
            return { canCraft: false, reason: `Niveau ${recipe.professionLevel} requis en ${profession.name}` };
        }

        // Vérifier les matériaux
        for (const material of recipe.materials) {
            const currentAmount = this.game.professionManager.getInventoryAmount(material.resourceId);
            if (currentAmount < material.amount) {
                const resourceData = window.findResourceById(material.resourceId);
                return { 
                    canCraft: false, 
                    reason: `Matériaux insuffisants: ${resourceData ? resourceData.name : material.resourceId}` 
                };
            }
        }

        // Vérifier si déjà en train de crafter
        if (this.isCrafting) {
            return { canCraft: false, reason: 'Craft en cours...' };
        }

        return { canCraft: true };
    }

    /**
     * Démarre le craft d'une recette (instantané maintenant)
     */
    startCraft(recipeId, sellDirectly = false) {
        const now = Date.now();
        
        // 🏗️ FIX 1: Vérifier si une pénalité est active
        if (now < this._penaltyEndTime) {
            const remainingPenalty = Math.ceil((this._penaltyEndTime - now) / 1000);
            console.warn(`🚫 Pénalité active ! Attendez encore ${remainingPenalty}s`);
            
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `⚠️ Cooldown actif: ${remainingPenalty}s restantes`,
                    'error'
                );
            }
            return false;
        }
        
        // 🏗️ FIX 2: Cooldown avec variabilité aléatoire
        const cooldown = this._baseCooldown + (Math.random() * this._cooldownVariance * 2 - this._cooldownVariance);
        
        if (now - this._lastCraftTime < cooldown) {
            console.warn('⚠️ Craft trop rapide, veuillez patienter');
            return false;
        }
        
        // 🏗️ FIX 3: Détection de spam via historique
        this._craftHistory.push(now);
        if (this._craftHistory.length > this._maxHistorySize) {
            this._craftHistory.shift();
        }
        
        // Calculer le nombre de crafts sur la dernière minute
        const oneMinuteAgo = now - 60000;
        const recentCrafts = this._craftHistory.filter(time => time > oneMinuteAgo);
        
        if (recentCrafts.length > this._maxCraftsPerMinute) {
            console.error('🚫 ABUS DÉTECTÉ ! Trop de crafts par minute.');
            
            // Appliquer une pénalité
            this._penaltyEndTime = now + this._penaltyDuration;
            
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `🚫 Spam détecté ! Cooldown de ${this._penaltyDuration / 1000}s appliqué.`,
                    'error'
                );
            }
            
            if (GameConfig.DEBUG.enabled) {
                console.trace('Stack trace de l\'abus détecté:');
            }
            
            return false;
        }
        
        const canCraftResult = this.canCraft(recipeId);
        if (!canCraftResult.canCraft) {
            console.warn('Cannot craft:', canCraftResult.reason);
            return false;
        }

        const recipe = this.getAllRecipes().find(r => r.id === recipeId);
        if (!recipe) return false;

        // 🆕 BONUS: Calculer bonus craft selon niveau
        const profession = this.game.professionManager.getProfession(recipe.profession);
        const bonuses = this.getCraftingBonuses(recipe.profession, profession.level);
        
        // 🆕 BONUS: Chance d'économiser matériaux (25% niveau 50)
        const materialSavingRoll = Math.random() * 100;
        const saveMaterials = materialSavingRoll < bonuses.materialSaving;
        
        if (!saveMaterials) {
            // Consommer les matériaux normalement
            for (const material of recipe.materials) {
                this.game.professionManager.removeFromInventory(material.resourceId, material.amount);
            }
        } else {
            if (GameConfig.DEBUG.enabled) {
                console.log(`💚 Matériaux économisés ! (${bonuses.materialSaving}% chance)`);
            }
            if (this.game.ui) {
                this.game.ui.showNotification('💚 Matériaux économisés !', 'success');
            }
        }

        // 🆕 BONUS: Chance de craft double (50% niveau 50)
        const doubleCraftRoll = Math.random() * 100;
        const craftDouble = doubleCraftRoll < bonuses.doubleCraftChance;
        const craftCount = craftDouble ? 2 : 1;
        
        if (craftDouble && GameConfig.DEBUG.enabled) {
            console.log(`✨ Double craft ! (${bonuses.doubleCraftChance}% chance)`);
        }
        
        // Craft instantané : compléter immédiatement
        for (let i = 0; i < craftCount; i++) {
            this.completeCraft(recipe, sellDirectly, bonuses);
        }
        
        // 🏗️ FIX: Mettre à jour le dernier craft avec la propriété privée
        this._lastCraftTime = now;

        return true;
    }

    /**
     * Termine le craft et donne l'objet (ou vend directement)
     */
    completeCraft(recipe = null, sellDirectly = false, bonuses = null) {
        if (!recipe) {
            recipe = this.currentCraft;
        }
        if (!recipe) return;

        // Calculer les bonus si non fournis
        if (!bonuses) {
            const profession = this.game.professionManager.getProfession(recipe.profession);
            bonuses = this.getCraftingBonuses(recipe.profession, profession.level);
        }

        // 🆕 BONUS: Améliorer la qualité selon le niveau (50% niveau 50)
        const quality = this.generateQuality(recipe.profession, bonuses.qualityBonus);

        // Créer l'équipement avec un ID unique
        const uniqueId = `${recipe.id}_${Date.now()}`;
        const equipment = new window.Equipment({
            id: uniqueId,
            recipeId: recipe.id, // 🧪 Stocker l'ID de la recette pour retrouver les stats/effets
            name: recipe.name,
            type: recipe.type,
            slot: recipe.slot,
            rarity: recipe.rarity,
            icon: recipe.icon,
            stats: recipe.stats,
            quality: quality, // Ajout de la qualité
            requiredLevel: recipe.requiredLevel,
            description: recipe.description
        });

        // Si vente directe activée, vendre au lieu d'ajouter à l'inventaire
        if (sellDirectly) {
            const sellPrice = this.calculateSellPrice(equipment);
            this.game.player.resources.gold += sellPrice;
            
            // Donner l'expérience même lors de la vente
            const expGained = recipe.expReward || 10;
            if (this.game.professionManager) {
                const profession = this.game.professionManager.getProfession(recipe.profession);
                if (profession) {
                    profession.gainXp(expGained);
                }
            }
            
            // Notification unique selon la rareté (vente directe)
            if (this.game.ui && this.game.ui.showNotification) {
                const qualityIcon = equipment.getQualityIcon();
                
                // Rareté non-commune : notification spéciale même en vente
                if (recipe.rarity !== 'common') {
                    const rarityEmojis = {
                        uncommon: '🟢',
                        rare: '🔵',
                        epic: '🟣',
                        legendary: '🟠',
                        mythic: '🔴',
                        divine: '🟡'
                    };
                    const emoji = rarityEmojis[recipe.rarity] || '⭐';
                    let message = `${emoji} ${recipe.name} crafté et vendu pour ${sellPrice} or !`;
                    if (quality !== 'normal') {
                        message += ` ${qualityIcon}`;
                    }
                    this.game.ui.showNotification(message, 'legendary', 5000);
                } 
                // Rareté commune : notification vente simple
                else {
                    let message = `💰 ${recipe.name} vendu pour ${sellPrice} or !`;
                    if (quality !== 'normal') {
                        message += ` ${qualityIcon}`;
                    }
                    this.game.ui.showNotification(message, 'success');
                }
            }
            
            if (this.game.ui) {
                this.game.ui.update();
                this.game.ui.updateCraftingTab(); // Mettre à jour les recettes pour afficher les nouvelles quantités
            }
            
            this.isCrafting = false;
            this.currentCraft = null;
            return;
        }

        // Ajouter à l'inventaire d'équipement
        this.game.equipmentManager.addToInventory(equipment);

        // Donner de l'XP à la profession
        const profession = this.game.professionManager.getProfession(recipe.profession);
        if (profession) {
            const xpGain = recipe.professionLevel * 10; // 10 XP par niveau de recette
            profession.gainXp(xpGain);
        }
        
        // 🎯 MISE À JOUR DES QUÊTES DE TYPE 'CRAFT'
        if (this.game.questManager) {
            this.game.questManager.updateCraftQuest(recipe.id, 1);
        }
        
        // Notification avec qualité
        // Notification unique selon la rareté
        if (this.game.ui && this.game.ui.showNotification) {
            const qualityIcon = equipment.getQualityIcon();
            const qualityName = equipment.getQualityName();
            
            // Rareté non-commune : notification spéciale
            if (recipe.rarity !== 'common') {
                const rarityEmojis = {
                    uncommon: '🟢',
                    rare: '🔵',
                    epic: '🟣',
                    legendary: '🟠',
                    mythic: '🔴',
                    divine: '🟡'
                };
                const emoji = rarityEmojis[recipe.rarity] || '⭐';
                let message = `${emoji} ${recipe.name} crafté !`;
                if (quality !== 'normal') {
                    message += ` ${qualityIcon}`;
                }
                this.game.ui.showNotification(message, 'legendary', 5000);
            } 
            // Rareté commune : notification simple
            else {
                let message = `🔨 ${recipe.name} crafté !`;
                if (quality !== 'normal') {
                    message += ` ${qualityIcon}`;
                }
                this.game.ui.showNotification(message, 'success');
            }
        }

        // Réinitialiser
        this.isCrafting = false;
        this.currentCraft = null;
        this.craftStartTime = 0;

        // Mettre à jour l'UI
        if (this.game.ui) {
            this.game.ui.updateCraftingTab();
            this.game.ui.updateEquipmentInventory();
            this.game.ui.updateInventory(); // Mettre à jour l'inventaire des ressources
        }
    }

    /**
     * Récupère la progression du craft en cours
     */
    getCraftProgress() {
        if (!this.isCrafting || !this.currentCraft) {
            return { isCrafting: false, progress: 0 };
        }

        const elapsed = Date.now() - this.craftStartTime;
        const progress = Math.min(100, (elapsed / this.currentCraft.craftTime) * 100);

        return {
            isCrafting: true,
            recipe: this.currentCraft,
            progress: progress,
            timeRemaining: Math.max(0, this.currentCraft.craftTime - elapsed)
        };
    }

    /**
     * Génère une qualité aléatoire pour un équipement
     * Prend en compte le niveau de la profession pour améliorer les chances
     */
    generateQuality(professionId, qualityBonus = 0) {
        const profession = this.game.professionManager.getProfession(professionId);
        const professionLevel = profession ? profession.level : 1;
        
        // Bonus de niveau : +0.5% par niveau pour les qualités supérieures (ancien système)
        const levelBonus = (professionLevel - 1) * 0.5;
        
        // 🆕 NOUVEAU: Bonus de qualité du système de métier (0-50% niveau 50)
        const totalBonus = levelBonus + qualityBonus;
        
        // Tirer un nombre aléatoire
        const roll = Math.random() * 100;
        
        // Probabilités ajustées avec le nouveau bonus
        // Normal: 69%, Supérieur: 20%, Exceptionnel: 8%, Parfait: 2%, Œuvre Maître: 0.5%
        if (roll < 0.5 + (totalBonus * 0.1)) {
            return 'masterwork'; // 0.5% de base, augmente avec bonus
        } else if (roll < 3 + (totalBonus * 0.3)) {
            return 'perfect'; // 2.5% de base, augmente fortement
        } else if (roll < 11 + (totalBonus * 0.8)) {
            return 'exceptional'; // 8% + fort bonus
        } else if (roll < 31 + (totalBonus * 1.5)) {
            return 'superior'; // 20% + très fort bonus
        } else {
            return 'normal'; // Le reste (diminue avec bonus)
        }
    }

    /**
     * Calcule le prix de vente d'un équipement
     */
    calculateSellPrice(equipment) {
        const rarityValues = {
            'common': 10,
            'uncommon': 25,
            'rare': 50,
            'epic': 100,
            'legendary': 250,
            'mythic': 500,
            'divine': 1000
        };
        
        const baseValue = rarityValues[equipment.rarity] || 10;
        const levelBonus = equipment.requiredLevel * 2;
        
        // Multiplicateur de qualité pour le prix
        const qualityMultiplier = equipment.qualityMultiplier || 1.0;
        
        return Math.floor((baseValue + levelBonus) * qualityMultiplier);
    }

    /**
     * Active/désactive l'auto-craft
     */
    toggleAutoCraft(recipeId, sellDirectly = true) {
        if (this.autoCraftState.enabled && this.autoCraftState.recipeId === recipeId) {
            // Désactiver
            this.stopAutoCraft();
            return false;
        } else {
            // Activer
            this.startAutoCraft(recipeId, sellDirectly);
            return true;
        }
    }

    /**
     * Démarre l'auto-craft
     */
    startAutoCraft(recipeId, sellDirectly = true) {
        this.stopAutoCraft(); // Arrêter l'ancien si existe
        
        this.autoCraftState.enabled = true;
        this.autoCraftState.recipeId = recipeId;
        this.autoCraftState.sellDirectly = sellDirectly;
        
        // Craft immédiat
        this.startCraft(recipeId, sellDirectly);
        
        // Puis craft en boucle
        this.autoCraftState.intervalId = setInterval(() => {
            const canCraftResult = this.canCraft(recipeId);
            if (canCraftResult.canCraft) {
                this.startCraft(recipeId, sellDirectly);
            }
        }, this.autoCraftInterval);
    }

    /**
     * Arrête l'auto-craft
     */
    stopAutoCraft() {
        if (this.autoCraftState.intervalId) {
            clearInterval(this.autoCraftState.intervalId);
            this.autoCraftState.intervalId = null;
        }
        this.autoCraftState.enabled = false;
        this.autoCraftState.recipeId = null;
    }

    /**
     * 🆕 Calculer les bonus de craft selon le niveau
     * @param {string} professionId - 'blacksmith', 'armorsmith', 'jeweler', 'tailor', 'alchemist', 'fishmonger', 'tanner'
     * @param {number} level - Niveau du métier
     * @returns {object} Bonus calculés
     */
    getCraftingBonuses(professionId, level) {
        const bonuses = {
            speedBonus: 0,            // Réduction temps craft (%)
            qualityBonus: 0,          // Augmentation qualité items (%)
            doubleCraftChance: 0,     // Chance de craft double (%)
            materialSaving: 0         // Chance d'économiser matériaux (%)
        };

        // Scaling linéaire
        const speed = Math.min(100, level * 2.0);           // Max 100% niveau 50 (instant)
        const quality = Math.min(50, level * 1.0);          // Max 50% niveau 50
        const doubleChance = Math.min(50, level * 1.0);     // Max 50% niveau 50
        const saving = Math.min(25, level * 0.5);           // Max 25% niveau 50
        
        bonuses.speedBonus = speed;
        bonuses.qualityBonus = quality;
        bonuses.doubleCraftChance = doubleChance;
        bonuses.materialSaving = saving;
        
        return bonuses;
    }

    /**
     * Calcule le profit estimé par minute pour une recette
     */
    calculateProfitPerMinute(recipeId) {
        const recipe = this.getAllRecipes().find(r => r.id === recipeId);
        if (!recipe) return 0;
        
        // Créer un équipement temporaire pour calculer le prix
        const tempEquipment = {
            rarity: recipe.rarity,
            requiredLevel: recipe.requiredLevel
        };
        
        const sellPrice = this.calculateSellPrice(tempEquipment);
        
        // Calculer le coût des matériaux (si on veut afficher le profit net)
        // Pour l'instant, juste le prix de vente
        
        // Crafts par minute (1 craft par seconde = 60 par minute)
        const craftsPerMinute = 60 / (this.autoCraftInterval / 1000);
        
        return Math.floor(sellPrice * craftsPerMinute);
    }

    /**
     * Sérialisation pour la sauvegarde
     */
    toJSON() {
        return {
            isCrafting: this.isCrafting,
            currentCraft: this.currentCraft ? this.currentCraft.id : null,
            craftStartTime: this.craftStartTime,
            autoCraftState: {
                enabled: this.autoCraftState.enabled,
                recipeId: this.autoCraftState.recipeId,
                sellDirectly: this.autoCraftState.sellDirectly
            }
        };
    }

    /**
     * Désérialisation depuis la sauvegarde
     */
    fromJSON(data) {
        if (!data) return;

        this.isCrafting = data.isCrafting || false;
        
        // Restaurer l'auto-craft si actif
        if (data.autoCraftState && data.autoCraftState.enabled) {
            const recipeId = data.autoCraftState.recipeId;
            const sellDirectly = data.autoCraftState.sellDirectly !== false; // Par défaut true
            
            if (recipeId) {
                // Redémarrer l'auto-craft
                setTimeout(() => {
                    this.startAutoCraft(recipeId, sellDirectly);
                }, 100);
            }
        }
    }
}

// Export global
if (typeof window !== 'undefined') {
    window.CraftingManager = CraftingManager;
}
