/**
 * CRAFT RECIPES - TANNER (Tanneur)
 * Métier de traitement des peaux en cuir
 * 
 * Progression:
 * - Tier 1 (Niv 1-10): monster_hide -> fabric_simple_leather
 * - Tier 2 (Niv 11-20): robust_hide -> fabric_tanned_leather
 * 
 * Débloqué au niveau 10 du joueur via la quête "Apprenti Tanneur"
 */

window.CraftRecipesTanner = [
    // ============================================
    // TIER 1: CUIR SIMPLE (Levels 1-10)
    // ============================================
    
    {
        id: 'tanner_simple_leather',
        name: 'Traiter les Peaux Brutes',
        category: 'leather_processing',
        profession: 'tanner',
        tier: 1,
        type: 'processing', // Pas un équipement, juste du traitement
        icon: '🎒',
        rarity: 'rare',
        professionLevel: 1,
        materials: [
            { resourceId: 'monster_hide', amount: 2 }  // 2 peaux brutes
        ],
        produces: { resourceId: 'fabric_simple_leather', amount: 1 }, // 1 cuir simple
        craftTime: 15, // 15 secondes (traitement manuel)
        expReward: 25, // XP gagné
        requiredLevel: 10, // Joueur niveau 10 minimum
        description: 'Traite 2 peaux brutes de monstre pour créer 1 cuir simple de qualité basique. Requis pour les armures légères avancées.'
    },

    // ============================================
    // TIER 2: CUIR TANNÉ (Levels 11-20)
    // ============================================
    
    {
        id: 'tanner_tanned_leather',
        name: 'Tanner le Cuir Robuste',
        category: 'leather_processing',
        profession: 'tanner',
        tier: 2,
        type: 'processing',
        icon: '🧳',
        rarity: 'epic',
        professionLevel: 15,
        materials: [
            { resourceId: 'robust_hide', amount: 2 },     // 2 peaux robustes (drop T2)
            { resourceId: 'fabric_simple_leather', amount: 1 }  // 1 cuir simple (amélioration)
        ],
        produces: { resourceId: 'fabric_tanned_leather', amount: 1 }, // 1 cuir tanné
        craftTime: 30, // 30 secondes (processus plus long)
        expReward: 50, // Plus d'XP
        requiredLevel: 15, // Joueur niveau 15 minimum
        description: 'Tanne 2 peaux robustes avec 1 cuir simple pour créer 1 cuir tanné de haute qualité. Essentiel pour les armures Tier 2+.'
    }
];

// Export global
if (typeof window !== 'undefined') {
    window.CraftRecipesTanner = window.CraftRecipesTanner || [];
}
