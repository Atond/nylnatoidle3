// Configuration des bâtiments de production
// Les bâtiments produisent des ressources automatiquement
// NOTE: Les gemmes ne sont PAS produites par les bâtiments (drop joueur uniquement)

const BuildingsData = {
    sawmill: {
        id: 'sawmill',
        name: 'Scierie',
        icon: '🏗️',
        description: 'Produit du bois automatiquement',
        baseProduction: {
            'wood_oak': 10  // 10 Bois de Chêne/min niveau 1
        },
        baseCost: {
            gold: 100,
            wood_oak: 100  // 100 Bois de Chêne pour construire
        },
        costMultiplier: 1.8,  // Croissance exponentielle forte
        productionMultiplier: 2.0,  // Production double à chaque niveau
        profession: 'woodcutter',
        professionLevelRequired: 5
    },
    
    mine: {
        id: 'mine',
        name: 'Mine',
        icon: '⛰️',
        description: 'Produit des minerais automatiquement (SAUF gemmes)',
        baseProduction: {
            'ore_iron': 10  // 10 Fer/min niveau 1
        },
        baseCost: {
            gold: 100,
            ore_iron: 100  // 100 Fer pour construire
        },
        costMultiplier: 1.8,  // Croissance exponentielle forte
        productionMultiplier: 2.0,  // Production double à chaque niveau
        profession: 'miner',
        professionLevelRequired: 5
    },
    
    warehouse: {
        id: 'warehouse',
        name: 'Entrepôt de Ressources',
        icon: '🏚️',
        description: 'Augmente la capacité de stockage des ressources de récolte (Bois, Minerais, Gemmes)',
        baseProduction: {}, // Pas de production, seulement amélioration de stockage
        baseCost: {
            gold: 500,
            wood_oak: 200,
            ore_iron: 100
        },
        costMultiplier: 2.5,  // Coût augmente fortement
        productionMultiplier: 1.0,  // Pas de production
        storageBonus: 500,  // +500 de stockage par niveau pour les ressources de récolte
        profession: null,
        professionLevelRequired: 0
    },

    treasury: {
        id: 'treasury',
        name: 'Trésorerie de Guerre',
        icon: '🏰',
        description: 'Augmente la capacité de stockage du butin de combat',
        baseProduction: {}, // Pas de production, seulement amélioration de stockage
        baseCost: {
            gold: 1000,
            wood_oak: 150,
            ore_iron: 150
        },
        costMultiplier: 2.5,  // Coût augmente fortement
        productionMultiplier: 1.0,  // Pas de production
        storageBonus: 250,  // +250 de stockage par niveau pour le butin de combat
        profession: null,
        professionLevelRequired: 0,
        unlockConditions: {
            playerLevel: 5  // Se débloque au niveau 5 du joueur
        }
    },

    alchemy_lab: {
        id: 'alchemy_lab',
        name: 'Laboratoire d\'Alchimie',
        icon: '🧪',
        description: 'Effectue des conversions alchimiques automatiquement (production passive)',
        baseProduction: {
            // Production spéciale: conversions alchimiques par heure
            alchemy_conversions_per_hour: 10  // 10 conversions/heure au niveau 1
        },
        baseCost: {
            gold: 5000,
            wood_oak: 500,
            ore_iron: 500
        },
        costMultiplier: 2.2,  // Coût augmente fortement (bâtiment avancé)
        productionMultiplier: 2.0,  // Production double à chaque niveau
        profession: 'alchemy',
        professionLevelRequired: 10,  // Requis Alchimie niveau 10
        unlockConditions: {
            playerLevel: 15,  // Se débloque au niveau 15 du joueur
            professionLevel: {
                alchemy: 10  // ET Alchimie niveau 10
            }
        },
        specialEffect: 'alchemy_passive_conversions'  // Effet spécial pour le système
    }
};

// ========== HELPER : Calculer production Laboratoire ==========
/**
 * Calcule le nombre de conversions/heure pour un niveau donné du Laboratoire
 * @param {number} level - Niveau du laboratoire
 * @returns {number} Conversions par heure
 */
function calculateLabProductionPerHour(level) {
    const baseProduction = BuildingsData.alchemy_lab.baseProduction.alchemy_conversions_per_hour;
    const multiplier = BuildingsData.alchemy_lab.productionMultiplier;
    return baseProduction * Math.pow(multiplier, level - 1);
}

/**
 * Calcule le nombre de conversions/minute pour un niveau donné
 * @param {number} level - Niveau du laboratoire
 * @returns {number} Conversions par minute
 */
function calculateLabProductionPerMinute(level) {
    return calculateLabProductionPerHour(level) / 60;
}

/**
 * Calcule le nombre de conversions/seconde pour un niveau donné
 * @param {number} level - Niveau du laboratoire
 * @returns {number} Conversions par seconde
 */
function calculateLabProductionPerSecond(level) {
    return calculateLabProductionPerHour(level) / 3600;
}

if (typeof window !== 'undefined') {
    window.BuildingsData = BuildingsData;
    window.calculateLabProductionPerHour = calculateLabProductionPerHour;
    window.calculateLabProductionPerMinute = calculateLabProductionPerMinute;
    window.calculateLabProductionPerSecond = calculateLabProductionPerSecond;
    console.log('✅ BuildingsData chargé:', Object.keys(BuildingsData).length, 'bâtiments');
}

if (typeof window !== 'undefined') {
    window.BuildingsData = BuildingsData;
    console.log('✅ BuildingsData chargé:', Object.keys(BuildingsData).length, 'bâtiments');
}
