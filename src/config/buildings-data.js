/**
 * Données de tous les bâtiments du jeu
 * Séparation données/logique pour faciliter l'équilibrage
 */

export const BUILDINGS_DATA = [
  {
    id: "cursor",
    name: "Curseur",
    namePlural: "Curseurs",
    description: "Clique automatiquement pour vous",
    emoji: "👆",
    
    // Économie
    baseCost: 15,
    baseProduction: 0.1, // cookies par seconde
    costMultiplier: 1.15, // Coût augmente de 15% à chaque achat
    
    // Déblocage
    unlockCondition: {
      type: "always", // Toujours disponible
    },
    
    // UI
    color: "#FFD700",
    sortOrder: 1,
  },
  
  {
    id: "grandma",
    name: "Grand-mère",
    namePlural: "Grand-mères",
    description: "Une gentille mamie qui cuit des cookies",
    emoji: "👵",
    
    baseCost: 100,
    baseProduction: 1,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies", // Débloqué quand on a assez de cookies
      value: 50, // Apparaît à partir de 50 cookies
    },
    
    color: "#FF69B4",
    sortOrder: 2,
  },
  
  {
    id: "farm",
    name: "Ferme",
    namePlural: "Fermes",
    description: "Cultive des ingrédients pour les cookies",
    emoji: "🌾",
    
    baseCost: 1100,
    baseProduction: 8,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 500,
    },
    
    color: "#90EE90",
    sortOrder: 3,
  },
  
  {
    id: "mine",
    name: "Mine",
    namePlural: "Mines",
    description: "Extrait du chocolat et du sucre",
    emoji: "⛏️",
    
    baseCost: 12000,
    baseProduction: 47,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "building", // Débloqué quand on possède un certain bâtiment
      buildingId: "farm",
      count: 10,
    },
    
    color: "#8B4513",
    sortOrder: 4,
  },
  
  {
    id: "factory",
    name: "Usine",
    namePlural: "Usines",
    description: "Production industrielle de cookies",
    emoji: "🏭",
    
    baseCost: 130000,
    baseProduction: 260,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 50000,
    },
    
    color: "#808080",
    sortOrder: 5,
  },
  
  {
    id: "bank",
    name: "Banque",
    namePlural: "Banques",
    description: "Génère des intérêts sur vos cookies",
    emoji: "🏦",
    
    baseCost: 1400000,
    baseProduction: 1400,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 500000,
    },
    
    color: "#4169E1",
    sortOrder: 6,
  },
  
  {
    id: "temple",
    name: "Temple",
    namePlural: "Temples",
    description: "Invoque des cookies divins",
    emoji: "⛩️",
    
    baseCost: 20000000,
    baseProduction: 7800,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 5000000,
    },
    
    color: "#9370DB",
    sortOrder: 7,
  },
  
  {
    id: "wizard_tower",
    name: "Tour de magicien",
    namePlural: "Tours de magicien",
    description: "Transforme la magie en cookies",
    emoji: "🧙",
    
    baseCost: 330000000,
    baseProduction: 44000,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 100000000,
    },
    
    color: "#4B0082",
    sortOrder: 8,
  },
  
  {
    id: "shipment",
    name: "Vaisseau spatial",
    namePlural: "Vaisseaux spatiaux",
    description: "Rapporte des cookies de l'espace",
    emoji: "🚀",
    
    baseCost: 5100000000,
    baseProduction: 260000,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 1000000000,
    },
    
    color: "#00CED1",
    sortOrder: 9,
  },
  
  {
    id: "time_machine",
    name: "Machine temporelle",
    namePlural: "Machines temporelles",
    description: "Rapporte des cookies du futur",
    emoji: "⏰",
    
    baseCost: 75000000000,
    baseProduction: 1600000,
    costMultiplier: 1.15,
    
    unlockCondition: {
      type: "cookies",
      value: 20000000000,
    },
    
    color: "#FFD700",
    sortOrder: 10,
  },
];

/**
 * Fonction utilitaire pour obtenir un bâtiment par son ID
 */
export function getBuildingData(id) {
  return BUILDINGS_DATA.find(building => building.id === id);
}

/**
 * Fonction utilitaire pour obtenir tous les bâtiments triés
 */
export function getSortedBuildings() {
  return [...BUILDINGS_DATA].sort((a, b) => a.sortOrder - b.sortOrder);
}
