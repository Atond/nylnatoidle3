/**
 * Configuration du système de Transmutation
 * Système de transformation de ressources T1 → T2 → T3 → etc.
 * Ratio constant : 100:1 à tous les niveaux
 * 
 * ATTENTION: Ne pas confondre avec le métier "Alchimiste" qui fabrique des potions
 * La Transmutation est un système de conversion de ressources pour l'endgame
 */

export const TRANSMUTATION_CONVERSIONS = {
    // ═══════════════════════════════════════════════════════════
    // BOIS (Woodcutting → Transmutation)
    // NOUVEAU RATIO : Plus efficace pour compenser la récolte aléatoire
    // T1→T2: 20:1, T2→T3: 15:1, T3→T4: 10:1, T4+: 5:1
    // ═══════════════════════════════════════════════════════════
    
    wood_t1_to_t2: {
        id: 'wood_t1_to_t2',
        name: 'Chêne → Érable',
        input: { resourceId: 'wood_oak', amount: 20 },
        output: { resourceId: 'wood_maple', amount: 1 },
        time: 3,                    // 3 secondes (réduit de 5s)
        xpGain: 10,
        levelRequired: 1,
        tier: 1,
        category: 'wood',
        description: '20 rondins de chêne brut peuvent être raffinés en 1 bois d\'érable de qualité supérieure.'
    },
    
    wood_t2_to_t3: {
        id: 'wood_t2_to_t3',
        name: 'Érable → Noyer',
        input: { resourceId: 'wood_maple', amount: 15 },
        output: { resourceId: 'wood_walnut', amount: 1 },
        time: 6,                   // 6 secondes (réduit de 10s)
        xpGain: 25,
        levelRequired: 10,
        tier: 2,
        category: 'wood',
        description: 'Transformation alchimique de l\'érable en noyer ancien.'
    },
    
    wood_t3_to_t4: {
        id: 'wood_t3_to_t4',
        name: 'Noyer → Séquoia',
        input: { resourceId: 'wood_walnut', amount: 10 },
        output: { resourceId: 'wood_sequoia', amount: 1 },
        time: 12,                   // 12 secondes (réduit de 20s)
        xpGain: 50,
        levelRequired: 20,
        tier: 3,
        category: 'wood',
        description: 'Transmutation magique vers le bois de séquoia millénaire.'
    },
    
    wood_t4_to_t5: {
        id: 'wood_t4_to_t5',
        name: 'Séquoia → Bois Lunaire',
        input: { resourceId: 'wood_sequoia', amount: 5 },
        output: { resourceId: 'wood_lunar', amount: 1 },
        time: 25,                   // 25 secondes (réduit de 40s)
        xpGain: 100,
        levelRequired: 30,
        tier: 4,
        category: 'wood',
        description: 'Infusion de l\'essence lunaire dans le séquoia.'
    },
    
    wood_t5_to_t6: {
        id: 'wood_t5_to_t6',
        name: 'Bois Lunaire → Cristal',
        input: { resourceId: 'wood_lunar', amount: 5 },
        output: { resourceId: 'wood_crystal', amount: 1 },
        time: 50,                   // 50 secondes (réduit de 80s)
        xpGain: 200,
        levelRequired: 40,
        tier: 5,
        category: 'wood',
        description: 'Cristallisation magique du bois lunaire.'
    },
    
    wood_t6_to_t7: {
        id: 'wood_t6_to_t7',
        name: 'Cristal → Éternel',
        input: { resourceId: 'wood_crystal', amount: 5 },
        output: { resourceId: 'wood_eternal', amount: 1 },
        time: 100,                  // 100 secondes (réduit de 160s)
        xpGain: 400,
        levelRequired: 50,
        tier: 6,
        category: 'wood',
        description: 'Transcendance vers le bois éternel, matériau divin.'
    },
    
    // ═══════════════════════════════════════════════════════════
    // MINERAI (Mining → Alchemy)
    // NOUVEAU RATIO : Plus efficace pour compenser la récolte aléatoire
    // T1→T2: 20:1, T2→T3: 15:1, T3→T4: 10:1, T4+: 5:1
    // Hiérarchie correcte : Fer (T1) → Cuivre (T2) → Étain (T3) → Bronze (T4) → Argent (T5) → Or (T6) → Acier (T7)
    // ═══════════════════════════════════════════════════════════
    
    ore_t1_to_t2: {
        id: 'ore_t1_to_t2',
        name: 'Fer → Cuivre',
        input: { resourceId: 'ore_iron', amount: 20 },
        output: { resourceId: 'ore_copper', amount: 1 },
        time: 3,                    // 3 secondes (réduit de 5s)
        xpGain: 10,
        levelRequired: 1,
        tier: 1,
        category: 'ore',
        description: 'Purification du fer brut en cuivre de qualité supérieure.'
    },
    
    ore_t2_to_t3: {
        id: 'ore_t2_to_t3',
        name: 'Cuivre → Étain',
        input: { resourceId: 'ore_copper', amount: 15 },
        output: { resourceId: 'ore_tin', amount: 1 },
        time: 6,                   // 6 secondes (réduit de 10s)
        xpGain: 25,
        levelRequired: 10,
        tier: 2,
        category: 'ore',
        description: 'Transmutation alchimique du cuivre en étain rare.'
    },
    
    ore_t3_to_t4: {
        id: 'ore_t3_to_t4',
        name: 'Étain → Bronze',
        input: { resourceId: 'ore_tin', amount: 10 },
        output: { resourceId: 'ore_bronze', amount: 1 },
        time: 12,                   // 12 secondes (réduit de 20s)
        xpGain: 50,
        levelRequired: 20,
        tier: 3,
        category: 'ore',
        description: 'Alliage alchimique créant le bronze résistant.'
    },
    
    ore_t4_to_t5: {
        id: 'ore_t4_to_t5',
        name: 'Bronze → Argent',
        input: { resourceId: 'ore_bronze', amount: 5 },
        output: { resourceId: 'ore_silver', amount: 1 },
        time: 25,                   // 25 secondes (réduit de 40s)
        xpGain: 100,
        levelRequired: 30,
        tier: 4,
        category: 'ore',
        description: 'Purification alchimique vers l\'argent précieux.'
    },
    
    ore_t5_to_t6: {
        id: 'ore_t5_to_t6',
        name: 'Argent → Or',
        input: { resourceId: 'ore_silver', amount: 5 },
        output: { resourceId: 'ore_gold', amount: 1 },
        time: 50,                   // 50 secondes (réduit de 80s)
        xpGain: 200,
        levelRequired: 40,
        tier: 5,
        category: 'ore',
        description: 'Transmutation légendaire de l\'argent en or pur.'
    },
    
    ore_t6_to_t7: {
        id: 'ore_t6_to_t7',
        name: 'Or → Acier',
        input: { resourceId: 'ore_gold', amount: 5 },
        output: { resourceId: 'ore_steel', amount: 1 },
        time: 100,                  // 100 secondes (réduit de 160s)
        xpGain: 400,
        levelRequired: 50,
        tier: 6,
        category: 'ore',
        description: 'Fusion mystique créant l\'acier le plus résistant.'
    }
};

// ═══════════════════════════════════════════════════════════
// CONFIGURATION GÉNÉRALE TRANSMUTATION
// ═══════════════════════════════════════════════════════════

export const TRANSMUTATION_CONFIG = {
    maxQueueSize: 5,                // Max 5 conversions simultanées
    
    // Formule XP : 100 × (1.5 ^ level)
    xpFormula: (level) => {
        return Math.floor(100 * Math.pow(1.5, level));
    },
    
    // Bonus par palier de niveau
    bonuses: {
        10: { type: 'batch', value: 2, description: 'Conversion ×2 plus rapide' },
        20: { type: 'bonus_output', value: 0.05, description: '5% chance output ×2' },
        30: { type: 'batch', value: 5, description: 'Conversion ×5 plus rapide' },
        40: { type: 'bonus_output', value: 0.10, description: '10% chance output ×2' },
        50: { type: 'batch', value: 10, description: 'Conversion ×10 plus rapide' },
        60: { type: 'bonus_output', value: 0.15, description: '15% chance output ×2' },
        75: { type: 'batch', value: 50, description: 'Conversion ×50 plus rapide' },
        100: { type: 'batch', value: 100, description: 'Conversion ×100 plus rapide' }
    },
    
    // Configuration déblocage
    unlockLevel: 20,                // Déblocage Transmutation au niveau joueur 20 (après les recherches)
    
    // Multiplicateurs vitesse
    speedMultipliers: {
        base: 1.0,
        perLevel: 0.01              // +1% vitesse par niveau transmutation
    }
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Retourne toutes les conversions disponibles pour un niveau donné
 * @param {number} transmutationLevel - Niveau du métier transmutation
 * @returns {Array} Liste des conversions débloquées
 */
export function getAvailableConversions(transmutationLevel) {
    return Object.values(TRANSMUTATION_CONVERSIONS).filter(
        conv => conv.levelRequired <= transmutationLevel
    );
}

/**
 * Retourne les conversions par catégorie
 * @param {string} category - 'wood' ou 'ore'
 * @returns {Array} Liste des conversions de cette catégorie
 */
export function getConversionsByCategory(category) {
    return Object.values(TRANSMUTATION_CONVERSIONS).filter(
        conv => conv.category === category
    );
}

/**
 * Calcule le temps de conversion avec bonus
 * @param {object} conversion - Objet conversion
 * @param {number} transmutationLevel - Niveau transmutation
 * @returns {number} Temps en secondes
 */
export function calculateConversionTime(conversion, transmutationLevel) {
    const baseTime = conversion.time;
    const speedBonus = 1 + (transmutationLevel * TRANSMUTATION_CONFIG.speedMultipliers.perLevel);
    
    // Bonus batch (niveau 10, 30, 50, etc.)
    let batchMultiplier = 1;
    Object.keys(TRANSMUTATION_CONFIG.bonuses)
        .filter(level => parseInt(level) <= transmutationLevel)
        .forEach(level => {
            const bonus = TRANSMUTATION_CONFIG.bonuses[level];
            if (bonus.type === 'batch') {
                batchMultiplier = Math.max(batchMultiplier, bonus.value);
            }
        });
    
    return baseTime / (speedBonus * batchMultiplier);
}

/**
 * Calcule la chance de bonus output
 * @param {number} transmutationLevel - Niveau transmutation
 * @returns {number} Chance entre 0.0 et 1.0
 */
export function getBonusOutputChance(transmutationLevel) {
    let chance = 0;
    Object.keys(TRANSMUTATION_CONFIG.bonuses)
        .filter(level => parseInt(level) <= transmutationLevel)
        .forEach(level => {
            const bonus = TRANSMUTATION_CONFIG.bonuses[level];
            if (bonus.type === 'bonus_output') {
                chance = Math.max(chance, bonus.value);
            }
        });
    return chance;
}

/**
 * Configuration de la production passive
 * 🏗️ Ajout pour centraliser les valeurs magiques
 */
export const TRANSMUTATION_PRODUCTION_CONFIG = {
    // Multiplicateur d'XP pour la production passive du Laboratoire de Transmutation
    // Valeur normale = 1.0 (100%), Valeur actuelle = 0.25 (25%)
    labPassiveXpMultiplier: 0.25,
    description: "Le Laboratoire de Transmutation donne 25% de l'XP normale en production passive pour équilibrer l'auto-production"
};

// ═══════════════════════════════════════════════════════════
// EXPORTS GLOBAUX (pour compatibilité avec le reste du code)
// ═══════════════════════════════════════════════════════════

window.TRANSMUTATION_CONVERSIONS = TRANSMUTATION_CONVERSIONS;
window.TRANSMUTATION_CONFIG = TRANSMUTATION_CONFIG;
window.TRANSMUTATION_PRODUCTION_CONFIG = TRANSMUTATION_PRODUCTION_CONFIG;
window.getAvailableConversions = getAvailableConversions;
window.getConversionsByCategory = getConversionsByCategory;
window.calculateConversionTime = calculateConversionTime;
window.getBonusOutputChance = getBonusOutputChance;
