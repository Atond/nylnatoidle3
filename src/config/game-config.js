/**
 * Configuration centrale du jeu
 * Modifier ces valeurs pour ajuster l'équilibrage sans toucher au code
 */

export const GAME_CONFIG = {
  // Informations du jeu
  name: "Idle Game",
  version: "0.1.0",
  
  // Ressource principale
  resource: {
    name: "cookies",
    nameSingular: "cookie",
    emoji: "🍪",
    startingAmount: 0,
    clickPower: 1, // Cookies par clic manuel
  },
  
  // Système de sauvegarde
  save: {
    autoSaveInterval: 30000, // 30 secondes en millisecondes
    saveKey: "idleGameSave_v1", // Clé LocalStorage
    enableCompression: false, // Activer plus tard si nécessaire
  },
  
  // Performance et rendu
  performance: {
    gameUpdateInterval: 100, // ms entre chaque calcul de production
    uiUpdateInterval: 200, // ms entre chaque mise à jour de l'UI
    maxFPS: 60,
    enablePerformanceMonitoring: true, // Logs de performance en dev
  },
  
  // Interface utilisateur
  ui: {
    numberFormat: {
      useShortNotation: true, // true: 1.5M, false: 1,500,000
      decimalPlaces: 2,
      useSpaceSeparator: false, // true: 1 500 000, false: 1,500,000
    },
    animations: {
      enableParticles: true,
      enableTransitions: true,
      particleLifetime: 1000, // ms
    },
    notifications: {
      duration: 3000, // ms
      maxVisible: 3,
      position: "top-right", // top-right, top-left, bottom-right, bottom-left
    },
  },
  
  // Features activées/désactivées
  features: {
    enableAchievements: true,
    enableUpgrades: true,
    enableStatistics: true,
    enablePrestige: false, // À activer plus tard
    enableEvents: false, // À activer plus tard
    enableSounds: false, // À activer plus tard
  },
  
  // Débogage
  debug: {
    enabled: true, // Mettre à false en production
    showFPS: true,
    logProduction: false,
    logSaves: true,
    cheatMode: true, // Raccourcis pour tester rapidement
  },
};
