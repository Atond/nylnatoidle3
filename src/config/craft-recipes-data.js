/**
 * Configuration des recettes de craft
 */

window.CraftRecipesData = [
    // ========== ARMES ==========
    {
        id: 'iron_sword',
        name: 'Épée de Fer',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'common',
        archetype: 'tank', // Tank melee weapon
        profession: 'blacksmith', // Forgeron
        professionLevel: 1,
        materials: [
            { resourceId: 'ore_iron', amount: 10 },
            { resourceId: 'wood_oak', amount: 5 }
        ],
        craftTime: 2000, // 2 secondes
        stats: {
            force: 3,
            damage: 4
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
        archetype: 'tank', // Tank melee weapon
        profession: 'blacksmith',
        professionLevel: 5,
        materials: [
            { resourceId: 'ore_copper', amount: 15 },
            { resourceId: 'wood_oak', amount: 8 } // Changé: birch (unlock 10) → oak (unlock 1)
        ],
        craftTime: 3000,
        stats: {
            force: 7,
            damage: 9,
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
        profession: 'tanner', // Tanneur (pas armurier pour le cuir)
        professionLevel: 2,
        materials: [
            { resourceId: 'fabric_simple_leather', amount: 4 }, // Cuir traité par le tanneur
            { resourceId: 'fabric_linen', amount: 2 } // Renfort textile
        ],
        craftTime: 2000,
        stats: {
            defense: 3,
            endurance: 2,
            agility: 1 // Bonus agilité pour armure légère
        },
        requiredLevel: 1,
        description: 'Une armure légère en cuir souple. Fabriquée par un tanneur.'
    },

    // iron_chestplate supprimé - voir craft-recipes-armors.js

    {
        id: 'steel_chestplate',
        name: 'Plastron d\'Acier',
        type: 'armor',
        slot: 'chest',
        icon: '👔',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'armorsmith',
        professionLevel: 7,
        materials: [
            { resourceId: 'ore_copper', amount: 25 },
            { resourceId: 'ore_tin', amount: 10 }, // Changé: silver (unlock 12) → tin (unlock 8)
            { resourceId: 'wood_maple', amount: 8 } // Changé: birch (unlock 10) → maple (unlock 8)
        ],
        craftTime: 4000,
        stats: {
            defense: 15,
            endurance: 12,
            force: 3,
            agility: 3
        },
        requiredLevel: 8, // Augmenté: 7 → 8 (cohérence avec tin/maple)
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
        profession: 'tanner', // Tanneur
        professionLevel: 1,
        materials: [
            { resourceId: 'fabric_simple_leather', amount: 3 }, // Cuir traité
            { resourceId: 'fabric_hemp', amount: 1 } // Renfort
        ],
        craftTime: 1500,
        stats: {
            defense: 2,
            endurance: 1,
            agility: 1
        },
        requiredLevel: 1,
        description: 'Une simple capuche en cuir.'
    },

    // iron_helmet supprimé - voir craft-recipes-armors.js

    // ========== ARMURES - JAMBES ==========
    {
        id: 'leather_pants',
        name: 'Pantalon de Cuir',
        type: 'armor',
        slot: 'legs',
        icon: '🦵',
        rarity: 'common',
        profession: 'tanner', // Tanneur
        professionLevel: 3,
        materials: [
            { resourceId: 'fabric_simple_leather', amount: 5 }, // Cuir traité
            { resourceId: 'fabric_cotton', amount: 2 } // Renfort
        ],
        craftTime: 2000,
        stats: {
            defense: 3,
            endurance: 2,
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
        archetype: 'universal',
        profession: 'jeweler',
        professionLevel: 5, // Augmenté: 3 → 5
        materials: [
            { resourceId: 'ore_tin', amount: 8 }, // Changé: silver (unlock 12) → tin (unlock 8)
            { resourceId: 'gem_amethyst', amount: 2 }
        ],
        craftTime: 2500,
        stats: {
            intelligence: 5,
            wisdom: 5,
            professionXP: 10
        },
        requiredLevel: 8, // Augmenté: 3 → 8 (cohérence avec tin)
        description: 'Une amulette mystique en étain serti d\'améthystes.'
    },

    // ========== GANTS ==========
    {
        id: 'work_gloves',
        name: 'Gants de Travail',
        type: 'armor',
        slot: 'gloves',
        icon: '🧤',
        rarity: 'common',
        profession: 'tanner', // Tanneur
        professionLevel: 2,
        materials: [
            { resourceId: 'fabric_simple_leather', amount: 2 }, // Cuir traité
            { resourceId: 'fabric_linen', amount: 1 } // Renfort
        ],
        craftTime: 1000,
        stats: {
            professionXP: 5,
            dropRate: 3,
            agility: 1
        },
        requiredLevel: 1,
        description: 'Des gants robustes en cuir pour les métiers.'
    },

    // ========== BOTTES ==========
    {
        id: 'leather_boots',
        name: 'Bottes de Cuir',
        type: 'armor',
        slot: 'boots',
        icon: '👞',
        rarity: 'common',
        profession: 'tanner', // Tanneur
        professionLevel: 3,
        materials: [
            { resourceId: 'fabric_simple_leather', amount: 3 }, // Cuir traité
            { resourceId: 'fabric_hemp', amount: 2 } // Semelles renforcées
        ],
        craftTime: 1500,
        stats: {
            defense: 2,
            agility: 5,
            endurance: 1
        },
        requiredLevel: 2,
        description: 'Des bottes légères pour se déplacer rapidement.'
    },

    // ========== ALCHIMISTE - POTIONS ==========
    {
        id: 'potion_health_small',
        name: 'Petite Potion de Vie',
        type: 'potion',
        slot: 'consumable',
        icon: '🧪',
        rarity: 'common',
        profession: 'alchemist',
        professionLevel: 1,
        materials: [
            { resourceId: 'plant_dandelion', amount: 5 },
            { resourceId: 'plant_medicinal_herb', amount: 3 }
        ],
        craftTime: 1500,
        stats: {
            hpRestore: 50
        },
        requiredLevel: 1,
        description: 'Restaure 50 HP. Brassée avec des herbes médicinales.'
    },

    {
        id: 'potion_health_medium',
        name: 'Potion de Vie',
        type: 'potion',
        slot: 'consumable',
        icon: '🧪',
        rarity: 'uncommon',
        profession: 'alchemist',
        professionLevel: 3,
        materials: [
            { resourceId: 'plant_sage', amount: 5 },
            { resourceId: 'plant_lavender', amount: 3 }
        ],
        craftTime: 2000,
        stats: {
            hpRestore: 150
        },
        requiredLevel: 3,
        description: 'Restaure 150 HP. Infusion de sauge et lavande.'
    },

    {
        id: 'potion_strength',
        name: 'Potion de Force',
        type: 'potion',
        slot: 'consumable',
        icon: '💪',
        rarity: 'uncommon',
        archetype: 'universal',
        profession: 'alchemist',
        professionLevel: 8, // Augmenté: 5 → 8
        materials: [
            { resourceId: 'plant_sage', amount: 4 }, // Changé: rosemary (unlock 12) → sage (unlock 8)
            { resourceId: 'plant_nettle', amount: 6 }
        ],
        craftTime: 2500,
        stats: {
            force: 3,
            duration: 300
        },
        requiredLevel: 8, // Augmenté: 5 → 8 (cohérence avec sage)
        description: 'Augmente la Force de 5 pendant 5 minutes.'
    },

    {
        id: 'potion_agility',
        name: 'Potion d\'Agilité',
        type: 'potion',
        slot: 'consumable',
        icon: '⚡',
        rarity: 'rare',
        archetype: 'universal',
        profession: 'alchemist',
        professionLevel: 10, // Augmenté: 7 → 10
        materials: [
            { resourceId: 'plant_lavender', amount: 4 }, // Changé: wild_mint (unlock 18) → lavender (unlock 10)
            { resourceId: 'plant_sage', amount: 3 } // Changé: wood_mushroom (unlock 15) → sage (unlock 8)
        ],
        craftTime: 3000,
        stats: {
            agility: 5,
            duration: 300
        },
        requiredLevel: 10, // Augmenté: 7 → 10 (cohérence avec lavender)
        description: 'Augmente l\'Agilité de 5 pendant 5 minutes.'
    },

    // ========== POISSONNIER - PLATS (grilled_fish est dans craft-recipes-consumables.js) ==========

    {
        id: 'fish_soup',
        name: 'Soupe de Poisson',
        type: 'food',
        slot: 'consumable',
        icon: '🍲',
        rarity: 'uncommon',
        profession: 'fishmonger',
        professionLevel: 3,
        materials: [
            { resourceId: 'fish_silver_trout', amount: 2 },
            { resourceId: 'fish_herring', amount: 2 },
            { resourceId: 'plant_medicinal_herb', amount: 3 }
        ],
        craftTime: 2000,
        stats: {
            hpRestore: 120,
            defense: 2,
            duration: 300
        },
        requiredLevel: 3,
        description: 'Restaure 120 HP et augmente la Défense de 3 pendant 5 minutes.'
    },

    {
        id: 'sushi_quality',
        name: 'Sushi de Qualité',
        type: 'food',
        slot: 'consumable',
        icon: '🍣',
        rarity: 'rare',
        profession: 'fishmonger',
        professionLevel: 5,
        materials: [
            { resourceId: 'fish_wild_salmon', amount: 2 },
            { resourceId: 'fish_golden_perch', amount: 1 }
        ],
        craftTime: 2500,
        stats: {
            hpRestore: 200,
            agility: 4,
            intelligence: 2,
            duration: 300
        },
        requiredLevel: 5,
        description: 'Restaure 200 HP et augmente Agilité +4, Intelligence +2 pendant 5 minutes.'
    },

    {
        id: 'seafood_feast',
        name: 'Festin de la Mer',
        type: 'food',
        slot: 'consumable',
        icon: '🦞',
        rarity: 'epic',
        archetype: 'universal',
        profession: 'fishmonger',
        professionLevel: 12, // Augmenté: 10 → 12
        materials: [
            { resourceId: 'fish_striped_bass', amount: 2 }, // Changé: blue_tuna (unlock 20) → striped_bass (unlock 18)
            { resourceId: 'fish_lunar_carp', amount: 1 }, // Changé: swordfish (unlock 22) → lunar_carp (unlock 12)
            { resourceId: 'plant_rosemary', amount: 5 } // Changé: sage (unlock 8) → rosemary (unlock 12)
        ],
        craftTime: 4000,
        stats: {
            hpRestore: 300,
            force: 2,
            defense: 2,
            agility: 3,
            duration: 600
        },
        requiredLevel: 18, // Augmenté: 10 → 18 (cohérence avec striped_bass)
        description: 'Restaure 300 HP et augmente toutes les stats de 3 pendant 10 minutes.'
    },

    // ========== TAILLEUR - VÊTEMENTS ==========
    {
        id: 'linen_tunic',
        name: 'Tunique de Lin',
        type: 'cloth',
        slot: 'chest',
        icon: '👕',
        rarity: 'common',
        archetype: 'universal',
        profession: 'tailor',
        professionLevel: 1,
        materials: [
            { resourceId: 'fabric_linen', amount: 10 },
            { resourceId: 'fabric_hemp', amount: 5 }
        ],
        craftTime: 2000,
        stats: {
            defense: 2,
            agility: 2,
            endurance: 1
        },
        requiredLevel: 1,
        description: 'Une tunique légère en lin. Confortable et résistante.'
    },

    {
        id: 'wool_robe',
        name: 'Robe de Laine',
        type: 'cloth',
        slot: 'chest',
        icon: '👗',
        rarity: 'uncommon',
        profession: 'tailor',
        professionLevel: 3,
        materials: [
            { resourceId: 'fabric_raw_wool', amount: 15 },
            { resourceId: 'fabric_cotton', amount: 8 }
        ],
        craftTime: 2500,
        stats: {
            defense: 4,
            intelligence: 3,
            wisdom: 2,
            endurance: 2
        },
        requiredLevel: 3,
        description: 'Une robe chaude en laine de qualité.'
    },

    {
        id: 'silk_cloak',
        name: 'Cape de Soie',
        type: 'cloth',
        slot: 'back',
        icon: '🧥',
        rarity: 'rare',
        profession: 'tailor',
        professionLevel: 5,
        materials: [
            { resourceId: 'fabric_linen', amount: 10 },
            { resourceId: 'fabric_hemp', amount: 5 }
        ],
        craftTime: 3000,
        stats: {
            defense: 6,
            agility: 5,
            intelligence: 3
        },
        requiredLevel: 5,
        description: 'Une cape élégante en soie fine. Augmente l\'agilité.'
    },

    {
        id: 'enchanted_gloves',
        name: 'Gants Enchantés',
        type: 'cloth',
        slot: 'gloves',
        icon: '🧤',
        rarity: 'epic',
        profession: 'tailor',
        professionLevel: 8,
        materials: [
            { resourceId: 'fabric_refined_silk', amount: 12 },
            { resourceId: 'fabric_velvet', amount: 8 },
            { resourceId: 'gem_sapphire', amount: 2 }
        ],
        craftTime: 4000,
        stats: {
            defense: 3,
            intelligence: 6,
            wisdom: 4,
            professionXP: 10
        },
        requiredLevel: 8,
        description: 'Des gants tissés avec de la magie. Augmentent l\'XP des métiers de 10%.'
    }
];

// ✅ Export déjà fait en haut du fichier avec window.CraftRecipesData
if (typeof window !== 'undefined') {
    console.log(`✅ ${window.CraftRecipesData.length} recettes de craft chargées`);
}
