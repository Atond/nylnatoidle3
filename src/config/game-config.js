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
    
    // Vitesse d'attaque (millisecondes entre chaque attaque)
    BASE_ATTACK_SPEED: 2000, // 2 secondes
    
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
    
    // Stats gagnées par niveau
    STATS_PER_LEVEL: {
      hp: 10,        // +10 PV max par niveau
      force: 2,      // +2 Force par niveau
      agility: 1,    // +1 Agilité par niveau
      intelligence: 1, // +1 Intelligence par niveau
      wisdom: 1,     // +1 Sagesse par niveau
      endurance: 2   // +2 Endurance par niveau
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
    enableDragons: false, // Phase 4
    enableGuild: false, // Phase 4
    enableSounds: false // À activer plus tard
  },
  
  // ========== DEBUG ==========
  DEBUG: {
    enabled: true, // Mettre à false en production
    showFPS: true,
    logCombat: true, // Activé pour déboguer
    logSaves: true,
    cheatMode: true // Raccourcis pour tester rapidement
  }
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
  window.GameConfig = GameConfig;
}
