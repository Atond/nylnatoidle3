/**
 * AlchemyManager
 * Gère le système de conversion alchimique T1→T2→T3→etc.
 */

import { ALCHEMY_CONVERSIONS, ALCHEMY_CONFIG, calculateConversionTime, getBonusOutputChance } from '../config/alchemy-data.js';

class AlchemyManager {
    constructor(game) {
        this.game = game;
        this.level = 1;
        this.xp = 0;
        this.conversionQueue = []; // Max 5 conversions simultanées
        this.unlocked = false; // Débloqué au niveau joueur 10
        
        if (GameConfig.DEBUG.enabled) {
            console.log('🧪 AlchemyManager initialisé');
        }
    }

    /**
     * Vérifie si la Transmutation est débloquée
     */
    checkUnlock(playerLevel) {
        if (!this.unlocked && playerLevel >= ALCHEMY_CONFIG.unlockLevel) {
            this.unlocked = true;
            // La notification est gérée par unlockTab() dans UI
            if (GameConfig.DEBUG.enabled) {
                console.log('🧪 Transmutation débloquée au niveau', playerLevel);
            }
            return true;
        }
        return false;
    }

    /**
     * Démarre une nouvelle conversion
     * @param {string} conversionId - ID de la conversion (ex: 'wood_t1_to_t2')
     * @param {number} quantity - Nombre de conversions (multiplicateur)
     * @returns {boolean} Succès ou échec
     */
    startConversion(conversionId, quantity = 1) {
        // Vérifications
        if (!this.unlocked) {
            if (this.game.ui) {
                this.game.ui.showNotification('❌ Transmutation non débloquée (requis niveau 5)', 'error');
            }
            return false;
        }

        if (this.conversionQueue.length >= ALCHEMY_CONFIG.maxQueueSize) {
            if (this.game.ui) {
                this.game.ui.showNotification('❌ File d\'attente pleine (max 5)', 'error');
            }
            return false;
        }

        const conversion = ALCHEMY_CONVERSIONS[conversionId];
        if (!conversion) {
            console.error('❌ Conversion inconnue:', conversionId);
            return false;
        }

        // Vérifier niveau requis
        if (this.level < conversion.levelRequired) {
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `❌ Transmutation niveau ${conversion.levelRequired} requis`,
                    'error'
                );
            }
            return false;
        }

        // Vérifier ressources disponibles
        const inputAmount = conversion.input.amount * quantity;
        const currentAmount = this.game.professionManager.getInventoryAmount(conversion.input.resourceId);
        
        if (currentAmount < inputAmount) {
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `❌ Ressources insuffisantes (besoin: ${inputAmount})`,
                    'error'
                );
            }
            return false;
        }

        // Consommer ressources
        this.game.professionManager.removeFromInventory(conversion.input.resourceId, inputAmount);

        // Calculer temps avec bonus
        const baseTime = calculateConversionTime(conversion, this.level);
        const totalTime = baseTime * 1000; // Convertir en millisecondes

        // Ajouter à la queue
        const conversionItem = {
            id: Date.now() + Math.random(), // ID unique
            conversionId: conversionId,
            conversion: conversion,
            quantity: quantity,
            startTime: Date.now(),
            duration: totalTime,
            progress: 0
        };

        this.conversionQueue.push(conversionItem);

        if (this.game.ui) {
            this.game.ui.showNotification(
                `🧪 Conversion démarrée: ${conversion.name} ×${quantity}`,
                'info'
            );
            this.game.ui.updateAlchemy();
        }

        if (GameConfig.DEBUG.enabled) {
            console.log('🧪 Conversion démarrée:', conversionItem);
        }

        return true;
    }

    /**
     * Update conversions en cours
     * @param {number} deltaTime - Temps écoulé en ms
     */
    update(deltaTime) {
        if (!this.unlocked || this.conversionQueue.length === 0) return;

        const now = Date.now();
        const completedConversions = [];

        this.conversionQueue.forEach(item => {
            const elapsed = now - item.startTime;
            item.progress = Math.min(elapsed / item.duration, 1.0);

            // Conversion terminée
            if (item.progress >= 1.0) {
                completedConversions.push(item);
            }
        });

        // Traiter les conversions terminées
        completedConversions.forEach(item => {
            this.completeConversion(item);
        });

        // Mettre à jour UI si nécessaire
        if (this.game.ui && (completedConversions.length > 0 || this.conversionQueue.length > 0)) {
            this.game.ui.updateAlchemy();
        }
    }

    /**
     * Complète une conversion
     * @param {object} item - Item de conversion
     */
    completeConversion(item) {
        const conversion = item.conversion;
        let outputAmount = conversion.output.amount * item.quantity;

        // Chance de bonus output
        const bonusChance = getBonusOutputChance(this.level);
        if (Math.random() < bonusChance) {
            outputAmount *= 2;
            if (this.game.ui) {
                this.game.ui.showNotification(`✨ Bonus ! Output ×2`, 'success');
            }
        }

        // Ajouter ressources
        this.game.professionManager.addToInventory(conversion.output.resourceId, outputAmount);

        // Gagner XP
        const xpGained = conversion.xpGain * item.quantity;
        this.gainXP(xpGained);

        // Notification de succès
        if (this.game.ui) {
            const resourceData = this.game.professionManager.getResourceData(conversion.output.resourceId);
            const resourceName = resourceData ? resourceData.name : conversion.output.resourceId;
            this.game.ui.showNotification(
                `✅ Conversion terminée: +${outputAmount} ${resourceName}`,
                'success'
            );
        }

        // Retirer de la queue
        const index = this.conversionQueue.indexOf(item);
        if (index > -1) {
            this.conversionQueue.splice(index, 1);
        }

        if (GameConfig.DEBUG.enabled) {
            console.log('✅ Conversion complétée:', item);
        }
    }

    /**
     * Annuler une conversion en cours
     * @param {number} itemId - ID de l'item dans la queue
     */
    cancelConversion(itemId) {
        const item = this.conversionQueue.find(i => i.id === itemId);
        if (!item) return false;

        // Rembourser ressources (partiel selon progression)
        const refundPercent = Math.max(0.5, 1 - item.progress); // Min 50% remboursé
        const refundAmount = Math.floor(item.conversion.input.amount * item.quantity * refundPercent);
        
        this.game.professionManager.addToInventory(item.conversion.input.resourceId, refundAmount);

        // Retirer de la queue
        const index = this.conversionQueue.indexOf(item);
        if (index > -1) {
            this.conversionQueue.splice(index, 1);
        }

        if (this.game.ui) {
            this.game.ui.showNotification(
                `❌ Conversion annulée (${Math.floor(refundPercent * 100)}% remboursé)`,
                'warning'
            );
            this.game.ui.updateAlchemy();
        }

        return true;
    }

    /**
     * Gagner de l'XP en Transmutation
     * @param {number} amount - Montant XP
     */
    gainXP(amount) {
        this.xp += amount;

        // Level up ?
        const xpRequired = ALCHEMY_CONFIG.xpFormula(this.level);
        
        while (this.xp >= xpRequired) {
            this.xp -= xpRequired;
            this.level++;

            // Vérifier déblocage bonus
            const bonus = ALCHEMY_CONFIG.bonuses[this.level];
            if (bonus) {
                if (this.game.ui) {
                    this.game.ui.showNotification(
                        `🎉 Transmutation niveau ${this.level} ! ${bonus.description}`,
                        'success'
                    );
                }
            } else {
                if (this.game.ui) {
                    this.game.ui.showNotification(
                        `🎉 Transmutation niveau ${this.level} !`,
                        'success'
                    );
                }
            }

            if (GameConfig.DEBUG.enabled) {
                console.log(`🧪 Transmutation niveau ${this.level} !`);
            }
        }

        // Mettre à jour UI
        if (this.game.ui) {
            this.game.ui.updateAlchemy();
        }

        // Mettre à jour profession (pour affichage)
        const alchemyProfession = this.game.professionManager.getProfession('alchemy');
        if (alchemyProfession) {
            alchemyProfession.level = this.level;
            alchemyProfession.xp = this.xp;
        }
    }

    /**
     * Obtenir les conversions disponibles
     * @returns {Array} Liste des conversions débloquées
     */
    getAvailableConversions() {
        return Object.values(ALCHEMY_CONVERSIONS).filter(
            conv => conv.levelRequired <= this.level
        );
    }

    /**
     * Obtenir conversions par catégorie
     * @param {string} category - 'wood' ou 'ore'
     * @returns {Array} Liste des conversions
     */
    getConversionsByCategory(category) {
        return this.getAvailableConversions().filter(
            conv => conv.category === category
        );
    }

    /**
     * Calculer temps de conversion actuel
     * @param {string} conversionId - ID conversion
     * @returns {number} Temps en secondes
     */
    getConversionTime(conversionId) {
        const conversion = ALCHEMY_CONVERSIONS[conversionId];
        if (!conversion) return 0;
        return calculateConversionTime(conversion, this.level);
    }

    /**
     * Obtenir bonus output actuel
     * @returns {number} Chance entre 0.0 et 1.0
     */
    getBonusChance() {
        return getBonusOutputChance(this.level);
    }

    /**
     * Sauvegarde
     */
    save() {
        const now = Date.now();
        
        return {
            level: this.level,
            xp: this.xp,
            unlocked: this.unlocked,
            conversionQueue: this.conversionQueue.map(item => ({
                id: item.id,
                conversionId: item.conversionId,
                quantity: item.quantity,
                timeRemaining: item.duration - (now - item.startTime),
                progress: item.progress
            }))
        };
    }

    /**
     * Chargement
     */
    load(data) {
        if (!data) return;

        this.level = data.level || 1;
        this.xp = data.xp || 0;
        this.unlocked = data.unlocked || false;

        // Restaurer queue avec temps restant
        if (data.conversionQueue && Array.isArray(data.conversionQueue)) {
            const now = Date.now();
            
            this.conversionQueue = data.conversionQueue
                .filter(item => item.timeRemaining > 0) // Ignorer les conversions expirées
                .map(item => {
                    const conversion = ALCHEMY_CONVERSIONS[item.conversionId];
                    if (!conversion) return null;

                    const duration = item.timeRemaining;
                    return {
                        id: item.id,
                        conversionId: item.conversionId,
                        conversion: conversion,
                        quantity: item.quantity,
                        startTime: now,
                        duration: duration,
                        progress: 0
                    };
                })
                .filter(item => item !== null);
        }

        // Sync avec profession
        const alchemyProfession = this.game.professionManager.getProfession('alchemy');
        if (alchemyProfession) {
            alchemyProfession.level = this.level;
            alchemyProfession.xp = this.xp;
        }

        if (GameConfig.DEBUG.enabled) {
            console.log('🧪 AlchemyManager chargé:', data);
        }
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.AlchemyManager = AlchemyManager;
}

export { AlchemyManager };
