/**
 * BuffManager - Gère les buffs actifs des consommables
 * Système de buffs temporaires avec affichage visuel et timer
 */

class BuffManager {
    constructor(game) {
        this.game = game;
        this.activeBuffs = []; // Liste des buffs actifs
    }

    /**
     * Applique un buff depuis un consommable
     * @param {Object} consumable - La recette du consommable
     * @param {number} quantity - Quantité consommée
     */
    applyBuff(consumable, quantity = 1) {
        if (!consumable.effects) {
            console.warn('⚠️ Consommable sans effets:', consumable.id);
            return false;
        }

        const effects = consumable.effects;
        
        // Si c'est une potion de soin instantané (duration = 0)
        if (effects.healAmount && effects.duration === 0) {
            const totalHeal = effects.healAmount * quantity;
            this.game.player.heal(totalHeal);
            this.game.ui.showNotification(
                `💚 +${totalHeal} PV restaurés !`,
                'success'
            );
            return true;
        }

        // Si c'est un buff temporaire (duration > 0)
        if (effects.duration > 0) {
            // Vérifier si ce buff est déjà actif
            const existingBuffIndex = this.activeBuffs.findIndex(b => b.id === consumable.id);
            
            if (existingBuffIndex !== -1) {
                // Rafraîchir le timer du buff existant
                const existingBuff = this.activeBuffs[existingBuffIndex];
                existingBuff.remainingTime = effects.duration;
                existingBuff.stacks = Math.min(existingBuff.stacks + quantity, 10); // Max 10 stacks
                
                this.game.ui.showNotification(
                    `🔄 ${consumable.name} rafraîchi ! (x${existingBuff.stacks})`,
                    'info'
                );
            } else {
                // Créer un nouveau buff
                const buff = {
                    id: consumable.id,
                    name: consumable.name,
                    icon: consumable.icon,
                    effects: { ...effects },
                    remainingTime: effects.duration,
                    totalDuration: effects.duration,
                    stacks: quantity,
                    startTime: Date.now()
                };
                
                this.activeBuffs.push(buff);
                this.applyBuffEffects(buff);
                
                this.game.ui.showNotification(
                    `✨ ${consumable.name} activé ! (${this.formatDuration(effects.duration)})`,
                    'success'
                );
            }

            this.game.ui.updateBuffDisplay();
            return true;
        }

        return false;
    }

    /**
     * Applique les effets d'un buff aux stats du joueur
     */
    applyBuffEffects(buff) {
        const player = this.game.player;
        const effects = buff.effects;
        const multiplier = buff.stacks;

        // Appliquer tous les bonus de stats
        if (effects.force) player.force += effects.force * multiplier;
        if (effects.agility) player.agility += effects.agility * multiplier;
        if (effects.intelligence) player.intelligence += effects.intelligence * multiplier;
        if (effects.wisdom) player.wisdom += effects.wisdom * multiplier;
        if (effects.endurance) player.endurance += effects.endurance * multiplier;
        if (effects.armor) player.armor += effects.armor * multiplier;
        if (effects.defense) player.defense += effects.defense * multiplier;
        if (effects.healthRegen) player.healthRegen = (player.healthRegen || 0) + effects.healthRegen * multiplier;
        if (effects.manaRegen) player.manaRegen = (player.manaRegen || 0) + effects.manaRegen * multiplier;
        if (effects.allStats) {
            player.force += effects.allStats * multiplier;
            player.agility += effects.allStats * multiplier;
            player.intelligence += effects.allStats * multiplier;
            player.wisdom += effects.allStats * multiplier;
            player.endurance += effects.allStats * multiplier;
        }
        if (effects.health) player.maxHealth += effects.health * multiplier;
        if (effects.mana) player.maxMana += effects.mana * multiplier;

        // Recalculer les stats dérivées
        player.updateStats();
    }

    /**
     * Retire les effets d'un buff
     */
    removeBuffEffects(buff) {
        const player = this.game.player;
        const effects = buff.effects;
        const multiplier = buff.stacks;

        // Retirer tous les bonus de stats
        if (effects.force) player.force -= effects.force * multiplier;
        if (effects.agility) player.agility -= effects.agility * multiplier;
        if (effects.intelligence) player.intelligence -= effects.intelligence * multiplier;
        if (effects.wisdom) player.wisdom -= effects.wisdom * multiplier;
        if (effects.endurance) player.endurance -= effects.endurance * multiplier;
        if (effects.armor) player.armor -= effects.armor * multiplier;
        if (effects.defense) player.defense -= effects.defense * multiplier;
        if (effects.healthRegen) player.healthRegen = Math.max(0, (player.healthRegen || 0) - effects.healthRegen * multiplier);
        if (effects.manaRegen) player.manaRegen = Math.max(0, (player.manaRegen || 0) - effects.manaRegen * multiplier);
        if (effects.allStats) {
            player.force -= effects.allStats * multiplier;
            player.agility -= effects.allStats * multiplier;
            player.intelligence -= effects.intelligence * multiplier;
            player.wisdom -= effects.wisdom * multiplier;
            player.endurance -= effects.endurance * multiplier;
        }
        if (effects.health) player.maxHealth -= effects.health * multiplier;
        if (effects.mana) player.maxMana -= effects.mana * multiplier;

        // Recalculer les stats dérivées
        player.updateStats();
    }

    /**
     * Met à jour les buffs actifs (appelé chaque seconde)
     */
    update(deltaTime) {
        const expiredBuffs = [];

        this.activeBuffs.forEach((buff, index) => {
            buff.remainingTime -= deltaTime;

            if (buff.remainingTime <= 0) {
                expiredBuffs.push(index);
            }
        });

        // Retirer les buffs expirés (en ordre inverse pour éviter les problèmes d'index)
        for (let i = expiredBuffs.length - 1; i >= 0; i--) {
            const buffIndex = expiredBuffs[i];
            const buff = this.activeBuffs[buffIndex];
            
            this.removeBuffEffects(buff);
            this.activeBuffs.splice(buffIndex, 1);
            
            this.game.ui.showNotification(
                `⏱️ ${buff.name} a expiré`,
                'info'
            );
        }

        // Mettre à jour l'affichage si des buffs ont changé
        if (expiredBuffs.length > 0) {
            this.game.ui.updateBuffDisplay();
        }
    }

    /**
     * Obtient tous les buffs actifs
     */
    getActiveBuffs() {
        return [...this.activeBuffs];
    }

    /**
     * Formate une durée en secondes vers un format lisible
     */
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (minutes > 0) {
            return `${minutes}m${secs > 0 ? secs + 's' : ''}`;
        }
        return `${secs}s`;
    }

    /**
     * Sauvegarde les buffs actifs
     */
    toJSON() {
        return {
            activeBuffs: this.activeBuffs.map(buff => ({
                ...buff,
                // Sauvegarder le temps restant au moment de la sauvegarde
                remainingTime: buff.remainingTime
            }))
        };
    }

    /**
     * Charge les buffs depuis une sauvegarde
     */
    fromJSON(data) {
        if (!data || !data.activeBuffs) return;

        this.activeBuffs = [];
        
        data.activeBuffs.forEach(savedBuff => {
            // Recréer le buff avec les données sauvegardées
            const buff = {
                ...savedBuff,
                remainingTime: Math.max(0, savedBuff.remainingTime)
            };

            // Si le buff a encore du temps, le réappliquer
            if (buff.remainingTime > 0) {
                this.activeBuffs.push(buff);
                this.applyBuffEffects(buff);
            }
        });

        // Mettre à jour l'affichage
        if (this.game.ui) {
            this.game.ui.updateBuffDisplay();
        }
    }

    /**
     * Réinitialise tous les buffs
     */
    reset() {
        // Retirer tous les effets
        this.activeBuffs.forEach(buff => {
            this.removeBuffEffects(buff);
        });
        
        this.activeBuffs = [];
        
        if (this.game.ui) {
            this.game.ui.updateBuffDisplay();
        }
    }
}

// Export global
if (typeof window !== 'undefined') {
    window.BuffManager = BuffManager;
}
