/**
 * Configuration globale du jeu - Nyln'ato Idle RPG
 * Toutes les constantes et paramètres modifiables sans toucher au code
 */

const GameConfig = {
  // ========== GÉNÉRAL ==========
  GAME_VERSION: '0.1.0-alpha',
  GAME_NAME: "Nyln'ato Idle",
  
  // ========== JOUEUR DÉPART ==========
  PLAYER: {
    STARTING_LEVEL: 1,
    STARTING_HP: 100,
    STARTING_STATS: {
      force: 5,
      agility: 5,
      intelligence: 5,
      wisdom: 5,
      endurance: 5
    }
  },
  
  // ========== COMBAT ==========
  COMBAT: {
    // Dégâts de base par clic
    BASE_CLICK_DAMAGE: 1,
    
    // ⚡ Vitesse d'attaque progressive
    BASE_ATTACK_SPEED: 1500, // Vitesse de base (1.5 secondes)
    ATTACK_SPEED_PER_LEVEL: 10, // -10ms par niveau du joueur
    ATTACK_SPEED_PER_AGILITY: 2, // -2ms par point d'agilité
    MIN_ATTACK_SPEED: 500, // Vitesse minimum (0.5 secondes)
    MAX_LEVEL_BONUS: 500, // Bonus maximum des niveaux (-500ms au niveau 50)
    
    // Formule de calcul des dégâts
    DAMAGE_FORMULA: {
      // Dégâts physiques = Force × multiplicateur
      FORCE_MULTIPLIER: 1.0,
      // Dégâts magiques = Intelligence × multiplicateur
      INTELLIGENCE_MULTIPLIER: 1.0
    },
    
    // Formule vitesse d'attaque basée sur Agilité
    AGILITY_SPEED_FACTOR: 0.02, // +2% de vitesse par point d'agilité
  },
  
  // ========== PROGRESSION ==========
  PROGRESSION: {
    // Formule XP requise : BASE_XP × (niveau ^ EXPONENT)
    BASE_XP: 100,
    XP_EXPONENT: 1.5,
    
    // Stats gagnées par niveau (par défaut, si pas de classe)
    STATS_PER_LEVEL: {
      hp: 10,        // +10 PV max par niveau
      force: 2,      // +2 Force par niveau
      agility: 1,    // +1 Agilité par niveau
      intelligence: 1, // +1 Intelligence par niveau
      wisdom: 1,     // +1 Sagesse par niveau
      endurance: 2   // +2 Endurance par niveau
    },
    
    // 🎯 Stats différenciées par classe
    STATS_PER_LEVEL_BY_CLASS: {
      warrior: {
        hp: 15,           // Tank : +15 PV (le plus résistant)
        force: 3,         // DPS physique principal : +3 Force
        agility: 1,       // Mobilité faible : +1 Agilité
        intelligence: 0,  // Pas de magie : +0 Intelligence
        wisdom: 0,        // Pas de magie : +0 Sagesse
        endurance: 3      // Tank : +3 Endurance (défense physique)
      },
      archer: {
        hp: 10,           // Équilibré : +10 PV
        force: 2,         // DPS physique secondaire : +2 Force
        agility: 3,       // Spécialité : +3 Agilité (vitesse, esquive, crit)
        intelligence: 0,  // Pas de magie : +0 Intelligence
        wisdom: 1,        // Un peu de résistance : +1 Sagesse
        endurance: 1      // Défense moyenne : +1 Endurance
      },
      mage: {
        hp: 8,            // Fragile : +8 PV (le moins résistant)
        force: 0,         // Pas de physique : +0 Force
        agility: 1,       // Mobilité faible : +1 Agilité
        intelligence: 4,  // DPS magique principal : +4 Intelligence
        wisdom: 2,        // Résistance magique : +2 Sagesse
        endurance: 0      // Pas de défense physique : +0 Endurance
      },
      priest: {
        hp: 12,           // Support résistant : +12 PV
        force: 0,         // Pas de physique : +0 Force
        agility: 1,       // Mobilité faible : +1 Agilité
        intelligence: 2,  // Magie de soin : +2 Intelligence
        wisdom: 3,        // Spécialité : +3 Sagesse (résistance + soin)
        endurance: 2      // Support tankable : +2 Endurance
      }
    }
  },
  
  // ========== ZONES ==========
  ZONES: {
    // Nombre de monstres à tuer pour débloquer la zone suivante
    MONSTERS_TO_UNLOCK: 10
  },
  
  // ========== SAUVEGARDE ==========
  SAVE: {
    AUTO_SAVE_INTERVAL: 30000, // 30 secondes
    SAVE_KEY: "nylnatoIdleSave_v1",
    ENABLE_COMPRESSION: false
  },
  
  // ========== PERFORMANCE ==========
  PERFORMANCE: {
    // ⚡ OPTIMISATION: 250ms pour idle game (4 FPS suffisant)
    UPDATE_INTERVAL: 250, // 250ms au lieu de 100ms = -60% CPU
    MAX_FPS: 60,
    ENABLE_MONITORING: true,
    // ⚡ Nouvelle option: Limite deltaTime pour éviter accumulation
    MAX_DELTA_TIME: 1000, // 1 seconde max
    // ⚡ Throttle UI updates (ne pas refresh à chaque frame)
    UI_UPDATE_INTERVAL: 500 // Update UI toutes les 500ms
  },
  
  // ========== UI ==========
  UI: {
    // Nombre maximum de lignes dans le journal de combat
    MAX_COMBAT_LOG_ENTRIES: 10,
    
    // Animation des barres de vie (ms)
    HP_BAR_ANIMATION_DURATION: 300,
    
    // Notation des grands nombres
    NUMBER_FORMAT: 'abbreviated', // 'full', 'abbreviated', 'scientific'
    
    // Animations
    ANIMATIONS: {
      enableParticles: true,
      enableTransitions: true,
      particleLifetime: 1000
    },
    
    // Notifications
    NOTIFICATIONS: {
      duration: 3000,
      maxVisible: 3,
      position: "top-right"
    }
  },
  
  // ========== FEATURES ==========
  FEATURES: {
    enableProfessions: true,
    enableTown: true,
    enableQuests: false, // Phase 2
    enableDragons: true, // 🐉 ACTIVÉ !
    enableGuild: false, // Phase 4
    enableSounds: false // À activer plus tard
  },
  
  // ========== DEBUG ==========
  DEBUG: {
    enabled: false, // ✅ PRODUCTION MODE
    showFPS: false,
    logCombat: false,
    logSaves: false,
    cheatMode: false
  }
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
  window.GameConfig = GameConfig;
}
