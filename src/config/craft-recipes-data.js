/**
 * Configuration des recettes de craft
 */

const CraftRecipesData = [
    // ========== ARMES ==========
    {
        id: 'iron_sword',
        name: 'Épée de Fer',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'common',
        profession: 'blacksmith', // Forgeron
        professionLevel: 1,
        materials: [
            { resourceId: 'ore_iron', amount: 10 },
            { resourceId: 'wood_oak', amount: 5 }
        ],
        craftTime: 2000, // 2 secondes
        stats: {
            force: 5,
            damage: 8
        },
        requiredLevel: 1,
        description: 'Une simple épée en fer forgé.'
    },
    
    {
        id: 'steel_sword',
        name: 'Épée d\'Acier',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'uncommon',
        profession: 'blacksmith',
        professionLevel: 5,
        materials: [
            { resourceId: 'ore_copper', amount: 15 },
            { resourceId: 'wood_birch', amount: 8 }
        ],
        craftTime: 3000,
        stats: {
            force: 10,
            damage: 15,
            agility: 3
        },
        requiredLevel: 5,
        description: 'Une épée robuste en acier trempé.'
    },

    // ========== ARMURES - TORSE ==========
    {
        id: 'leather_chest',
        name: 'Tunique de Cuir',
        type: 'armor',
        slot: 'chest',
        icon: '👔',
        rarity: 'common',
        profession: 'armorsmith', // Armurier
        professionLevel: 1,
        materials: [
            { resourceId: 'wood_oak', amount: 8 }
        ],
        craftTime: 2000,
        stats: {
            defense: 5,
            endurance: 3
        },
        requiredLevel: 1,
        description: 'Une armure légère en cuir souple.'
    },
    
    {
        id: 'iron_chestplate',
        name: 'Plastron de Fer',
        type: 'armor',
        slot: 'chest',
        icon: '👔',
        rarity: 'uncommon',
        profession: 'armorsmith',
        professionLevel: 3,
        materials: [
            { resourceId: 'ore_iron', amount: 20 },
            { resourceId: 'wood_oak', amount: 5 }
        ],
        craftTime: 3000,
        stats: {
            defense: 12,
            endurance: 8,
            force: 2
        },
        requiredLevel: 3,
        description: 'Un plastron solide en fer battu.'
    },

    {
        id: 'steel_chestplate',
        name: 'Plastron d\'Acier',
        type: 'armor',
        slot: 'chest',
        icon: '👔',
        rarity: 'rare',
        profession: 'armorsmith',
        professionLevel: 7,
        materials: [
            { resourceId: 'ore_copper', amount: 25 },
            { resourceId: 'ore_silver', amount: 10 },
            { resourceId: 'wood_birch', amount: 8 }
        ],
        craftTime: 4000,
        stats: {
            defense: 20,
            endurance: 15,
            force: 5,
            agility: 3
        },
        requiredLevel: 7,
        description: 'Un plastron d\'acier de haute qualité.'
    },

    // ========== ARMURES - CASQUE ==========
    {
        id: 'leather_helmet',
        name: 'Capuche de Cuir',
        type: 'armor',
        slot: 'helmet',
        icon: '🎩',
        rarity: 'common',
        profession: 'armorsmith',
        professionLevel: 1,
        materials: [
            { resourceId: 'wood_oak', amount: 5 }
        ],
        craftTime: 1500,
        stats: {
            defense: 3,
            endurance: 2
        },
        requiredLevel: 1,
        description: 'Une simple capuche en cuir.'
    },

    {
        id: 'iron_helmet',
        name: 'Casque de Fer',
        type: 'armor',
        slot: 'helmet',
        icon: '🎩',
        rarity: 'uncommon',
        profession: 'armorsmith',
        professionLevel: 4,
        materials: [
            { resourceId: 'ore_iron', amount: 15 },
            { resourceId: 'wood_oak', amount: 3 }
        ],
        craftTime: 2500,
        stats: {
            defense: 8,
            endurance: 5,
            intelligence: 2
        },
        requiredLevel: 4,
        description: 'Un casque protecteur en fer.'
    },

    // ========== ARMURES - JAMBES ==========
    {
        id: 'leather_pants',
        name: 'Pantalon de Cuir',
        type: 'armor',
        slot: 'legs',
        icon: '🦵',
        rarity: 'common',
        profession: 'armorsmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'wood_oak', amount: 10 }
        ],
        craftTime: 2000,
        stats: {
            defense: 4,
            endurance: 3,
            agility: 2
        },
        requiredLevel: 2,
        description: 'Un pantalon en cuir résistant.'
    },

    // ========== ACCESSOIRES ==========
    {
        id: 'bronze_ring',
        name: 'Anneau de Bronze',
        type: 'accessory',
        slot: 'ring1',
        icon: '💍',
        rarity: 'common',
        profession: 'jeweler', // Bijoutier
        professionLevel: 1,
        materials: [
            { resourceId: 'ore_copper', amount: 5 },
            { resourceId: 'gem_quartz', amount: 1 }
        ],
        craftTime: 1500,
        stats: {
            wisdom: 2,
            dropRate: 5
        },
        requiredLevel: 1,
        description: 'Un simple anneau en bronze orné d\'un quartz.'
    },

    {
        id: 'silver_amulet',
        name: 'Amulette d\'Argent',
        type: 'accessory',
        slot: 'amulet',
        icon: '📿',
        rarity: 'uncommon',
        profession: 'jeweler',
        professionLevel: 3,
        materials: [
            { resourceId: 'ore_silver', amount: 8 },
            { resourceId: 'gem_amethyst', amount: 2 }
        ],
        craftTime: 2500,
        stats: {
            intelligence: 5,
            wisdom: 5,
            professionXP: 10
        },
        requiredLevel: 3,
        description: 'Une amulette mystique en argent.'
    },

    // ========== GANTS ==========
    {
        id: 'work_gloves',
        name: 'Gants de Travail',
        type: 'armor',
        slot: 'gloves',
        icon: '🧤',
        rarity: 'common',
        profession: 'armorsmith',
        professionLevel: 1,
        materials: [
            { resourceId: 'wood_oak', amount: 6 }
        ],
        craftTime: 1000,
        stats: {
            professionXP: 5,
            dropRate: 3
        },
        requiredLevel: 1,
        description: 'Des gants robustes pour les métiers.'
    },

    // ========== BOTTES ==========
    {
        id: 'leather_boots',
        name: 'Bottes de Cuir',
        type: 'armor',
        slot: 'boots',
        icon: '👞',
        rarity: 'common',
        profession: 'armorsmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'wood_oak', amount: 8 }
        ],
        craftTime: 1500,
        stats: {
            defense: 3,
            agility: 5,
            endurance: 2
        },
        requiredLevel: 2,
        description: 'Des bottes légères pour se déplacer rapidement.'
    }
];

// Export global
if (typeof window !== 'undefined') {
    window.CraftRecipesData = CraftRecipesData;
    console.log(`✅ ${CraftRecipesData.length} recettes de craft chargées`);
}
