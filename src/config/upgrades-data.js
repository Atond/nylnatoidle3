/**
 * Données de toutes les améliorations (upgrades) du jeu
 */

export const UPGRADES_DATA = [
  // ===== UPGRADES DE CURSEURS =====
  {
    id: "cursor_upgrade_1",
    name: "Curseurs renforcés",
    description: "Les curseurs sont deux fois plus efficaces",
    emoji: "💪",
    
    cost: 100,
    
    type: "production",
    target: "cursor", // ID du bâtiment ciblé
    multiplier: 2,
    
    unlockCondition: {
      type: "building",
      buildingId: "cursor",
      count: 1,
    },
    
    category: "cursor",
  },
  
  {
    id: "cursor_upgrade_2",
    name: "Curseurs en titane",
    description: "Les curseurs sont deux fois plus efficaces",
    emoji: "🦾",
    
    cost: 500,
    
    type: "production",
    target: "cursor",
    multiplier: 2,
    
    unlockCondition: {
      type: "building",
      buildingId: "cursor",
      count: 10,
    },
    
    category: "cursor",
    requiresUpgrade: "cursor_upgrade_1", // Nécessite l'upgrade précédent
  },
  
  // ===== UPGRADES DE GRAND-MÈRES =====
  {
    id: "grandma_upgrade_1",
    name: "Recette secrète",
    description: "Les grand-mères sont deux fois plus efficaces",
    emoji: "📖",
    
    cost: 1000,
    
    type: "production",
    target: "grandma",
    multiplier: 2,
    
    unlockCondition: {
      type: "building",
      buildingId: "grandma",
      count: 1,
    },
    
    category: "grandma",
  },
  
  {
    id: "grandma_upgrade_2",
    name: "Grand-mères expérimentées",
    description: "Les grand-mères sont deux fois plus efficaces",
    emoji: "👵✨",
    
    cost: 5000,
    
    type: "production",
    target: "grandma",
    multiplier: 2,
    
    unlockCondition: {
      type: "building",
      buildingId: "grandma",
      count: 10,
    },
    
    category: "grandma",
    requiresUpgrade: "grandma_upgrade_1",
  },
  
  // ===== UPGRADES DE CLICS =====
  {
    id: "click_upgrade_1",
    name: "Doigts agiles",
    description: "Chaque clic rapporte +1 cookie",
    emoji: "👆",
    
    cost: 100,
    
    type: "click",
    bonus: 1, // Bonus additionnel par clic
    
    unlockCondition: {
      type: "clicks",
      count: 100, // Débloqué après 100 clics
    },
    
    category: "click",
  },
  
  {
    id: "click_upgrade_2",
    name: "Doigts d'acier",
    description: "Chaque clic rapporte +5 cookies",
    emoji: "🖱️",
    
    cost: 1000,
    
    type: "click",
    bonus: 5,
    
    unlockCondition: {
      type: "clicks",
      count: 1000,
    },
    
    category: "click",
    requiresUpgrade: "click_upgrade_1",
  },
  
  {
    id: "click_multiplier_1",
    name: "Multiplicateur de clics",
    description: "Les clics sont deux fois plus efficaces",
    emoji: "✖️",
    
    cost: 10000,
    
    type: "click_multiplier",
    multiplier: 2,
    
    unlockCondition: {
      type: "clicks",
      count: 5000,
    },
    
    category: "click",
  },
  
  // ===== UPGRADES GLOBALES =====
  {
    id: "global_production_1",
    name: "Optimisation logistique",
    description: "Toute la production +5%",
    emoji: "📈",
    
    cost: 50000,
    
    type: "global",
    multiplier: 1.05,
    
    unlockCondition: {
      type: "cps", // Cookies per second
      value: 100,
    },
    
    category: "global",
  },
  
  {
    id: "global_production_2",
    name: "Synergies industrielles",
    description: "Toute la production +10%",
    emoji: "⚙️",
    
    cost: 500000,
    
    type: "global",
    multiplier: 1.10,
    
    unlockCondition: {
      type: "cps",
      value: 1000,
    },
    
    category: "global",
    requiresUpgrade: "global_production_1",
  },
  
  // ===== UPGRADES DE DÉBLOCAGE =====
  {
    id: "unlock_upgrade_1",
    name: "Expansion agricole",
    description: "Débloque les fermes plus tôt",
    emoji: "🌱",
    
    cost: 500,
    
    type: "unlock",
    unlocks: "farm", // ID du bâtiment à débloquer
    
    unlockCondition: {
      type: "cookies",
      value: 250,
    },
    
    category: "unlock",
  },
  
  // ===== UPGRADES SPÉCIALES =====
  {
    id: "lucky_cookie",
    name: "Cookie porte-bonheur",
    description: "10% de chance de doubler les gains sur chaque clic",
    emoji: "🍀",
    
    cost: 7777,
    
    type: "special",
    effect: "lucky_click",
    
    unlockCondition: {
      type: "cookies_earned", // Total gagné
      value: 77777,
    },
    
    category: "special",
  },
];

/**
 * Catégories d'upgrades pour l'organisation dans l'UI
 */
export const UPGRADE_CATEGORIES = {
  cursor: { name: "Curseurs", emoji: "👆", color: "#FFD700" },
  grandma: { name: "Grand-mères", emoji: "👵", color: "#FF69B4" },
  farm: { name: "Fermes", emoji: "🌾", color: "#90EE90" },
  click: { name: "Clics", emoji: "🖱️", color: "#4169E1" },
  global: { name: "Production", emoji: "📈", color: "#32CD32" },
  unlock: { name: "Déblocages", emoji: "🔓", color: "#FFD700" },
  special: { name: "Spécial", emoji: "✨", color: "#9370DB" },
};

/**
 * Fonction utilitaire pour obtenir une amélioration par son ID
 */
export function getUpgradeData(id) {
  return UPGRADES_DATA.find(upgrade => upgrade.id === id);
}

/**
 * Fonction utilitaire pour obtenir toutes les améliorations d'une catégorie
 */
export function getUpgradesByCategory(category) {
  return UPGRADES_DATA.filter(upgrade => upgrade.category === category);
}
