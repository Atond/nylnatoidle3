/**
 * 🎭 ALT CHARACTER MANAGER - Gestion des personnages alternatifs
 * 
 * Permet de créer, gérer et faire progresser des personnages alternatifs (alts)
 * avec système de Power Leveling, Carry Mode, AFK Farm
 */

class AltCharacterManager {
    constructor(game) {
        this.game = game;
        this.mainCharacter = null; // Le personnage principal
        this.altCharacters = []; // Liste des alts
        this.maxAlts = 40;
        this.activeCharacterId = null; // ID du personnage actuellement joué
        this.sharedStorage = new SharedStorage();
    }
    
    /**
     * Initialiser avec le personnage principal
     */
    initializeMain(playerData) {
        this.mainCharacter = new Character({
            id: 'main_character',
            name: playerData.name || 'Héros',
            gender: playerData.gender || 'male',
            class: 'warrior',
            isMain: true,
            level: playerData.level || 1,
            xp: playerData.xp || 0,
            gold: playerData.gold || 0
        });
        
        this.activeCharacterId = 'main_character';
        
        return this.mainCharacter;
    }
    
    /**
     * Créer un personnage alternatif
     */
    createAlt(name, gender, characterClass) {
        // Vérifier le nombre max d'alts
        if (this.altCharacters.length >= this.maxAlts) {
            return {
                success: false,
                message: `❌ Nombre maximum d'alts atteint (${this.maxAlts})`
            };
        }
        
        // Vérifier que le main existe
        if (!this.mainCharacter) {
            return {
                success: false,
                message: `❌ Erreur : Personnage principal non trouvé`
            };
        }
        
        // Créer l'alt
        const alt = new Character({
            name: name,
            gender: gender,
            class: characterClass,
            isAlt: true,
            mainLevel: this.mainCharacter.level,
            level: 1,
            xp: 0,
            gold: 0
        });
        
        // Calculer mentor bonus initial
        alt.mentorBonus = alt.calculateMentorBonus(1, this.mainCharacter.level);
        
        this.altCharacters.push(alt);
        
        return {
            success: true,
            message: `✅ ${name} (${this.getClassNameFr(characterClass)}) recruté(e) ! Mentor Bonus : +${Math.round((alt.mentorBonus - 1) * 100)}% XP`,
            alt: alt
        };
    }
    
    /**
     * Supprimer un alt
     */
    deleteAlt(altId) {
        const index = this.altCharacters.findIndex(a => a.id === altId);
        
        if (index === -1) {
            return {
                success: false,
                message: `❌ Personnage non trouvé`
            };
        }
        
        // Ne pas supprimer le personnage actif
        if (this.activeCharacterId === altId) {
            return {
                success: false,
                message: `❌ Impossible de supprimer le personnage actuellement joué`
            };
        }
        
        const alt = this.altCharacters[index];
        this.altCharacters.splice(index, 1);
        
        return {
            success: true,
            message: `✅ ${alt.name} supprimé(e)`
        };
    }
    
    /**
     * Changer de personnage actif
     */
    switchCharacter(characterId) {
        let character;
        
        if (characterId === 'main_character' || characterId === this.mainCharacter.id) {
            character = this.mainCharacter;
        } else {
            character = this.altCharacters.find(a => a.id === characterId);
        }
        
        if (!character) {
            return {
                success: false,
                message: `❌ Personnage non trouvé`
            };
        }
        
        this.activeCharacterId = character.id;
        
        return {
            success: true,
            message: `✅ Changement vers ${character.name} (${this.getClassNameFr(character.class)} Lvl ${character.level})`,
            character: character
        };
    }
    
    /**
     * Obtenir le personnage actif
     */
    getActiveCharacter() {
        if (this.activeCharacterId === 'main_character' || this.activeCharacterId === this.mainCharacter.id) {
            return this.mainCharacter;
        }
        
        return this.altCharacters.find(a => a.id === this.activeCharacterId) || this.mainCharacter;
    }
    
    /**
     * Obtenir un personnage par ID
     */
    getCharacter(characterId) {
        if (characterId === 'main_character' || characterId === this.mainCharacter.id) {
            return this.mainCharacter;
        }
        
        return this.altCharacters.find(a => a.id === characterId);
    }
    
    /**
     * Lister tous les personnages
     */
    getAllCharacters() {
        return [this.mainCharacter, ...this.altCharacters];
    }
    
    /**
     * Démarrer le Carry Mode
     */
    startCarryMode(altId, targetZone) {
        const alt = this.altCharacters.find(a => a.id === altId);
        if (!alt) {
            return {
                success: false,
                message: `❌ Alt non trouvé`
            };
        }
        
        // ⚠️ VÉRIFICATION : Zone pas trop difficile pour l'alt
        const maxZoneLevel = alt.level + 10;
        if (targetZone.level > maxZoneLevel) {
            return {
                success: false,
                message: `❌ Zone trop difficile ! ${alt.name} (Lvl ${alt.level}) ne peut pas être carry dans une zone Lvl ${targetZone.level}. Maximum : Lvl ${maxZoneLevel}`
            };
        }
        
        // Vérifier cooldown carry
        const lastCarry = alt.lastCarryTime || 0;
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000; // 24h
        const maxCarryTime = 3 * 60 * 60 * 1000; // 3h max
        
        if (now - lastCarry < cooldown) {
            const remainingTime = Math.ceil((cooldown - (now - lastCarry)) / 1000 / 60);
            return {
                success: false,
                message: `⏰ Cooldown carry : encore ${remainingTime} minutes`
            };
        }
        
        // Activer carry mode (limité aux zones faciles)
        alt.lastCarryTime = now;
        
        return {
            success: true,
            message: `💪 Carry Mode activé ! ${this.mainCharacter.name} boost ${alt.name} (3h max, zone Lvl ${targetZone.level})`,
            carryData: {
                altId: alt.id,
                zoneLevel: targetZone.level,
                startTime: now,
                maxDuration: maxCarryTime
            }
        };
    }
    
    /**
     * Démarrer l'AFK Farm pour un alt
     */
    startAFKFarm(altId) {
        const alt = this.altCharacters.find(a => a.id === altId);
        if (!alt) {
            return {
                success: false,
                message: `❌ Alt non trouvé`
            };
        }
        
        if (alt.isAFKFarming) {
            return {
                success: false,
                message: `❌ ${alt.name} farm déjà AFK`
            };
        }
        
        alt.isAFKFarming = true;
        alt.afkFarmStartTime = Date.now();
        
        return {
            success: true,
            message: `🏭 ${alt.name} commence à AFK farm`
        };
    }
    
    /**
     * Arrêter l'AFK Farm
     */
    stopAFKFarm(altId) {
        const alt = this.altCharacters.find(a => a.id === altId);
        if (!alt) return { success: false };
        
        if (!alt.isAFKFarming) {
            return {
                success: false,
                message: `❌ ${alt.name} ne farm pas AFK`
            };
        }
        
        const hoursElapsed = (Date.now() - alt.afkFarmStartTime) / 1000 / 60 / 60;
        
        // 1% XP du main par heure
        const xpGain = Math.floor(this.mainCharacter.xp * 0.01 * hoursElapsed);
        alt.gainXP(xpGain);
        
        // Farm ressources T1 aléatoires
        const woodGain = Math.floor(Math.random() * 50 * hoursElapsed);
        const oreGain = Math.floor(Math.random() * 40 * hoursElapsed);
        const goldGain = Math.floor(Math.random() * 100 * hoursElapsed);
        
        this.sharedStorage.addResource('wood_oak', woodGain);
        this.sharedStorage.addResource('ore_iron', oreGain);
        this.sharedStorage.addGold(goldGain);
        
        alt.isAFKFarming = false;
        alt.afkFarmStartTime = null;
        
        return {
            success: true,
            message: `✅ AFK Farm terminé pour ${alt.name}`,
            rewards: {
                xp: xpGain,
                wood: woodGain,
                ore: oreGain,
                gold: goldGain,
                duration: hoursElapsed
            }
        };
    }
    
    /**
     * Update AFK Farm (appelé périodiquement)
     */
    updateAFKFarm(deltaTime) {
        this.altCharacters.forEach(alt => {
            if (!alt.isAFKFarming) return;
            
            // Update toutes les 60 secondes
            const elapsed = Date.now() - alt.afkFarmStartTime;
            if (elapsed < 60000) return; // Moins d'1 minute
            
            const hoursElapsed = elapsed / 1000 / 60 / 60;
            
            // Petits gains progressifs
            const xpGainPerHour = Math.floor(this.mainCharacter.xp * 0.01);
            const woodGainPerHour = Math.floor(Math.random() * 50);
            const oreGainPerHour = Math.floor(Math.random() * 40);
            const goldGainPerHour = Math.floor(Math.random() * 100);
            
            // Appliquer proportionnellement
            alt.gainXP(Math.floor(xpGainPerHour * hoursElapsed / 60)); // Par minute
            this.sharedStorage.addResource('wood_oak', Math.floor(woodGainPerHour * hoursElapsed / 60));
            this.sharedStorage.addResource('ore_iron', Math.floor(oreGainPerHour * hoursElapsed / 60));
            this.sharedStorage.addGold(Math.floor(goldGainPerHour * hoursElapsed / 60));
        });
    }
    
    /**
     * Obtenir le nom de classe en français
     */
    getClassNameFr(className) {
        const names = {
            'warrior': 'Guerrier',
            'tank': 'Tank',
            'healer': 'Prêtre',
            'mage': 'Mage',
            'archer': 'Archer'
        };
        return names[className] || className;
    }
    
    /**
     * Obtenir le statut de tous les alts (pour UI)
     */
    getAltsStatus() {
        return this.altCharacters.map(alt => ({
            id: alt.id,
            name: alt.name,
            class: alt.class,
            level: alt.level,
            role: alt.role,
            mentorBonus: alt.mentorBonus,
            isAFKFarming: alt.isAFKFarming,
            afkDuration: alt.isAFKFarming ? (Date.now() - alt.afkFarmStartTime) / 1000 / 60 / 60 : 0,
            canCarry: (Date.now() - (alt.lastCarryTime || 0)) >= 24 * 60 * 60 * 1000
        }));
    }
    
    /**
     * 💪 CARRY MODE STATE - Obtenir l'état actuel du carry mode
     */
    getCarryState() {
        // Chercher un alt qui est actuellement en carry mode
        const activeCarry = this.altCharacters.find(alt => {
            if (!alt.lastCarryTime) return false;
            
            const now = Date.now();
            const maxCarryDuration = 3 * 60 * 60 * 1000; // 3h
            const elapsed = now - alt.lastCarryTime;
            
            return elapsed < maxCarryDuration; // Carry encore actif
        });
        
        if (!activeCarry) {
            return {
                isActive: false,
                altId: null,
                startTime: 0,
                endTime: 0
            };
        }
        
        const startTime = activeCarry.lastCarryTime;
        const maxDuration = 3 * 60 * 60 * 1000;
        const endTime = startTime + maxDuration;
        
        return {
            isActive: true,
            altId: activeCarry.id,
            startTime: startTime,
            endTime: endTime
        };
    }
    
    /**
     * 🏭 AFK FARM STATE - Obtenir l'état de l'AFK Farm
     */
    getAFKFarmState() {
        const activeAlts = this.altCharacters
            .filter(alt => alt.isAFKFarming)
            .map(alt => alt.id);
        
        return {
            activeAlts: activeAlts,
            count: activeAlts.length
        };
    }
    
    /**
     * Sauvegarder
     */
    save() {
        return {
            mainCharacter: this.mainCharacter ? this.mainCharacter.save() : null,
            altCharacters: this.altCharacters.map(alt => alt.save()),
            activeCharacterId: this.activeCharacterId,
            sharedStorage: this.sharedStorage.save()
        };
    }
    
    /**
     * Charger
     */
    load(data) {
        if (!data) return;
        
        if (data.mainCharacter) {
            this.mainCharacter = Character.load(data.mainCharacter);
        }
        
        if (data.altCharacters) {
            this.altCharacters = data.altCharacters.map(altData => Character.load(altData));
        }
        
        this.activeCharacterId = data.activeCharacterId || 'main_character';
        
        if (data.sharedStorage) {
            this.sharedStorage.load(data.sharedStorage);
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.AltCharacterManager = AltCharacterManager;
}
