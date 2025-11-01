/**
 * CRAFT RECIPES - ARMORS (50 recipes)
 * Archetype-specific armor system with tier progression
 * 
 * Distribution:
 * - Heavy Armor (Tank): 20 recipes (Head, Chest, Legs, Boots, Gloves × 4 tiers)
 * - Light Armor (Archer): 20 recipes (Head, Chest, Legs, Boots, Gloves × 4 tiers)
 * - Cloth Armor (Mage/Healer): 10 recipes (Robe, Hood, Pants, Boots, Gloves × 2 tiers)
 */

window.CraftRecipesArmors = [
  // ============================================
  // HEAVY ARMOR - TANK (22 recipes) - UPDATED
  // ============================================
  
  // TIER 1: IRON HEAVY ARMOR (Levels 1-10)
  
  // NEW: Armorsmith Level 1 Starter Recipe
  {
    id: 'iron_bracers',
    name: 'Brassards de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'gloves',
    icon: '🥊',
    rarity: 'common',
    professionLevel: 1,
    requiredLevel: 1,
    materials: [
      { resourceId: 'ore_iron', amount: 6 },
      { resourceId: 'monster_hide', amount: 2 } // CORRIGÉ: monster_hide (drop monstre) au lieu de fabric_linen (ferme)
    ],
    produces: { resourceId: 'iron_bracers', amount: 1 },
    craftTime: 20,
    stats: {
      armor: 3,
      defense: 4,
      force: 2,
      endurance: 2,
      health: 15
    }
  },
  
  // NEW: Armorsmith Level 2 Recipe
  {
    id: 'iron_boots_basic',
    name: 'Bottes de Fer Simples',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'boots',
    icon: '🥾',
    rarity: 'common',
    professionLevel: 2,
    requiredLevel: 1,
    materials: [
      { resourceId: 'ore_iron', amount: 10 },
      { resourceId: 'ore_copper', amount: 3 },
      { resourceId: 'fabric_hemp', amount: 3 }
    ],
    produces: { resourceId: 'iron_boots_basic', amount: 1 },
    craftTime: 25,
    stats: {
      armor: 4,
      defense: 6,
      endurance: 3,
      health: 20,
      agility: -1
    }
  },
  
  {
    id: 'iron_helmet',
    name: 'Casque de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'helmet',
    icon: '⛑️',
    rarity: 'common',
    professionLevel: 3,
    requiredLevel: 1,
    materials: [
      { resourceId: 'ore_iron', amount: 8 },
      { resourceId: 'ore_copper', amount: 4 },
      { resourceId: 'fabric_linen', amount: 2 }
    ],
    produces: { resourceId: 'iron_helmet', amount: 1 },
    craftTime: 30,
    stats: {
      armor: 6,
      defense: 9,
      endurance: 4,
      health: 25,
      agility: -2
    }
  },
  {
    id: 'iron_chestplate',
    name: 'Plastron de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'common',
    requiredLevel: 5,

    professionLevel: 5,
    materials: [
      { resourceId: 'ore_iron', amount: 16 },
      { resourceId: 'ore_copper', amount: 8 },
      { resourceId: 'fabric_linen', amount: 4 },
      { resourceId: 'monster_fang', amount: 3 }
    ],
    produces: { resourceId: 'iron_chestplate', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 13,
      defense: 18,
      endurance: 8,
      health: 50,
      blockChance: 5,
      agility: -5
    }
  },
  {
    id: 'iron_legplates',
    name: 'Jambières de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'common',
    requiredLevel: 6,

    professionLevel: 6,
    materials: [
      { resourceId: 'ore_iron', amount: 12 },
      { resourceId: 'ore_copper', amount: 6 },
      { resourceId: 'fabric_linen', amount: 3 }
    ],
    produces: { resourceId: 'iron_legplates', amount: 1 },
    craftTime: 35,
    stats: {
      armor: 10,
      defense: 13,
      endurance: 6,
      health: 35,
      agility: -3
    }
  },
  {
    id: 'iron_boots',
    name: 'Bottes de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'common',
    requiredLevel: 4,

    professionLevel: 4,
    materials: [
      { resourceId: 'ore_iron', amount: 6 },
      { resourceId: 'ore_copper', amount: 4 },
      { resourceId: 'fabric_linen', amount: 2 }
    ],
    produces: { resourceId: 'iron_boots', amount: 1 },
    craftTime: 25,
    stats: {
      armor: 7,
      defense: 7,
      endurance: 3,
      health: 20,
      movementSpeed: -5
    }
  },
  {
    id: 'iron_gauntlets',
    name: 'Gantelets de Fer',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'common',
    requiredLevel: 7,

    professionLevel: 7,
    materials: [
      { resourceId: 'ore_iron', amount: 8 },
      { resourceId: 'ore_copper', amount: 4 },
      { resourceId: 'monster_bone', amount: 2 }
    ],
    produces: { resourceId: 'iron_gauntlets', amount: 1 },
    craftTime: 30,
    stats: {
      armor: 6,
      defense: 6,
      strength: 5,
      endurance: 2,
      blockChance: 3
    }
  },

  // TIER 2: STEEL HEAVY ARMOR (Levels 11-20)
  {
    id: 'steel_helmet',
    name: 'Casque d\'Acier',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'uncommon',
    requiredLevel: 12,

    professionLevel: 12,
    materials: [
      { resourceId: 'ore_tin', amount: 12 },
      { resourceId: 'ore_iron', amount: 8 },
      { resourceId: 'fabric_wool', amount: 4 },
      { resourceId: 'monster_scale', amount: 3 }
    ],
    produces: { resourceId: 'steel_helmet', amount: 1 },
    craftTime: 40,
    stats: {
      armor: 15,
      defense: 21,
      endurance: 9,
      health: 60,
      agility: -3
    }
  },
  {
    id: 'steel_chestplate_heavy',
    name: 'Plastron d\'Acier',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'uncommon',
    requiredLevel: 15,

    professionLevel: 15,
    materials: [
      { resourceId: 'ore_tin', amount: 20 },
      { resourceId: 'ore_iron', amount: 12 },
      { resourceId: 'fabric_wool', amount: 6 },
      { resourceId: 'monster_fang', amount: 5 },
      { resourceId: 'monster_scale', amount: 4 }
    ],
    produces: { resourceId: 'steel_chestplate_heavy', amount: 1 },
    craftTime: 60,
    stats: {
      armor: 31,
      defense: 41,
      endurance: 17,
      health: 110,
      blockChance: 8,
      agility: -8
    }
  },
  {
    id: 'steel_legplates',
    name: 'Jambières d\'Acier',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'uncommon',
    requiredLevel: 14,

    professionLevel: 14,
    materials: [
      { resourceId: 'ore_tin', amount: 16 },
      { resourceId: 'ore_iron', amount: 10 },
      { resourceId: 'fabric_wool', amount: 5 }
    ],
    produces: { resourceId: 'steel_legplates', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 24,
      defense: 30,
      endurance: 14,
      health: 80,
      agility: -5
    }
  },
  {
    id: 'steel_boots',
    name: 'Bottes d\'Acier',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'uncommon',
    requiredLevel: 13,

    professionLevel: 13,
    materials: [
      { resourceId: 'ore_tin', amount: 10 },
      { resourceId: 'ore_iron', amount: 6 },
      { resourceId: 'fabric_wool', amount: 3 },
      { resourceId: 'monster_bone', amount: 2 }
    ],
    produces: { resourceId: 'steel_boots', amount: 1 },
    craftTime: 35,
    stats: {
      armor: 16,
      defense: 18,
      endurance: 8,
      health: 50,
      movementSpeed: -8
    }
  },
  {
    id: 'steel_gauntlets',
    name: 'Gantelets d\'Acier',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'uncommon',
    requiredLevel: 16,

    professionLevel: 16,
    materials: [
      { resourceId: 'ore_tin', amount: 12 },
      { resourceId: 'ore_iron', amount: 8 },
      { resourceId: 'monster_claw', amount: 4 }
    ],
    produces: { resourceId: 'steel_gauntlets', amount: 1 },
    craftTime: 40,
    stats: {
      armor: 13,
      defense: 15,
      strength: 12,
      endurance: 6,
      blockChance: 5
    }
  },

  // TIER 3: MITHRIL HEAVY ARMOR (Levels 21-30)
  {
    id: 'mithril_helmet',
    name: 'Casque de Mithril',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'rare',
    requiredLevel: 23,

    professionLevel: 23,
    materials: [
      { resourceId: 'ore_mithril', amount: 15 },
      { resourceId: 'ore_tin', amount: 10 },
      { resourceId: 'fabric_silk', amount: 5 },
      { resourceId: 'monster_scale', amount: 6 }
    ],
    produces: { resourceId: 'mithril_helmet', amount: 1 },
    craftTime: 50,
    stats: {
      armor: 33,
      defense: 45,
      endurance: 20,
      health: 120,
      magicResist: 10,
      agility: -4
    }
  },
  {
    id: 'mithril_chestplate',
    name: 'Plastron de Mithril',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'rare',
    requiredLevel: 26,

    professionLevel: 26,
    materials: [
      { resourceId: 'ore_mithril', amount: 25 },
      { resourceId: 'ore_tin', amount: 15 },
      { resourceId: 'fabric_silk', amount: 8 },
      { resourceId: 'monster_heart', amount: 3 },
      { resourceId: 'monster_scale', amount: 8 }
    ],
    produces: { resourceId: 'mithril_chestplate', amount: 1 },
    craftTime: 75,
    stats: {
      armor: 66,
      defense: 82,
      endurance: 36,
      health: 220,
      blockChance: 12,
      magicResist: 15,
      agility: -10
    }
  },
  {
    id: 'mithril_legplates',
    name: 'Jambières de Mithril',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'rare',
    requiredLevel: 25,

    professionLevel: 25,
    materials: [
      { resourceId: 'ore_mithril', amount: 20 },
      { resourceId: 'ore_tin', amount: 12 },
      { resourceId: 'fabric_silk', amount: 6 },
      { resourceId: 'monster_scale', amount: 5 }
    ],
    produces: { resourceId: 'mithril_legplates', amount: 1 },
    craftTime: 60,
    stats: {
      armor: 51,
      defense: 63,
      endurance: 28,
      health: 160,
      magicResist: 12,
      agility: -7
    }
  },
  {
    id: 'mithril_boots',
    name: 'Bottes de Mithril',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'rare',
    requiredLevel: 24,

    professionLevel: 24,
    materials: [
      { resourceId: 'ore_mithril', amount: 14 },
      { resourceId: 'ore_tin', amount: 8 },
      { resourceId: 'fabric_silk', amount: 4 },
      { resourceId: 'monster_bone', amount: 4 }
    ],
    produces: { resourceId: 'mithril_boots', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 36,
      defense: 39,
      endurance: 17,
      health: 100,
      movementSpeed: -10,
      magicResist: 8
    }
  },
  {
    id: 'mithril_gauntlets',
    name: 'Gantelets de Mithril',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'rare',
    requiredLevel: 27,

    professionLevel: 27,
    materials: [
      { resourceId: 'ore_mithril', amount: 16 },
      { resourceId: 'ore_tin', amount: 10 },
      { resourceId: 'monster_claw', amount: 6 }
    ],
    produces: { resourceId: 'mithril_gauntlets', amount: 1 },
    craftTime: 50,
    stats: {
      armor: 28,
      defense: 31,
      strength: 24,
      endurance: 14,
      blockChance: 8,
      magicResist: 6
    }
  },

  // TIER 4: ADAMANTITE HEAVY ARMOR (Levels 31-40)
  {
    id: 'adamantite_helmet',
    name: 'Casque d\'Adamantite',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'epic',
    requiredLevel: 34,

    professionLevel: 34,
    materials: [
      { resourceId: 'ore_adamantite', amount: 20 },
      { resourceId: 'ore_mithril', amount: 12 },
      { resourceId: 'fabric_spider_silk', amount: 6 },
      { resourceId: 'monster_essence', amount: 4 },
      { resourceId: 'monster_scale', amount: 8 }
    ],
    produces: { resourceId: 'adamantite_helmet', amount: 1 },
    craftTime: 70,
    stats: {
      armor: 71,
      defense: 93,
      endurance: 40,
      health: 240,
      magicResist: 20,
      damageReflect: 5,
      agility: -6
    }
  },
  {
    id: 'adamantite_chestplate',
    name: 'Plastron d\'Adamantite',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'epic',
    requiredLevel: 37,

    professionLevel: 37,
    materials: [
      { resourceId: 'ore_adamantite', amount: 35 },
      { resourceId: 'ore_mithril', amount: 20 },
      { resourceId: 'fabric_spider_silk', amount: 10 },
      { resourceId: 'monster_heart', amount: 5 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'monster_scale', amount: 12 }
    ],
    produces: { resourceId: 'adamantite_chestplate', amount: 1 },
    craftTime: 100,
    stats: {
      armor: 135,
      defense: 172,
      endurance: 72,
      health: 450,
      blockChance: 18,
      magicResist: 30,
      damageReflect: 8,
      agility: -15
    }
  },
  {
    id: 'adamantite_legplates',
    name: 'Jambières d\'Adamantite',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'epic',
    requiredLevel: 36,

    professionLevel: 36,
    materials: [
      { resourceId: 'ore_adamantite', amount: 28 },
      { resourceId: 'ore_mithril', amount: 16 },
      { resourceId: 'fabric_spider_silk', amount: 8 },
      { resourceId: 'monster_essence', amount: 5 },
      { resourceId: 'monster_scale', amount: 10 }
    ],
    produces: { resourceId: 'adamantite_legplates', amount: 1 },
    craftTime: 80,
    stats: {
      armor: 105,
      defense: 131,
      endurance: 56,
      health: 330,
      magicResist: 25,
      damageReflect: 6,
      agility: -12
    }
  },
  {
    id: 'adamantite_boots',
    name: 'Bottes d\'Adamantite',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'epic',
    requiredLevel: 35,

    professionLevel: 35,
    materials: [
      { resourceId: 'ore_adamantite', amount: 18 },
      { resourceId: 'ore_mithril', amount: 10 },
      { resourceId: 'fabric_spider_silk', amount: 5 },
      { resourceId: 'monster_bone', amount: 6 }
    ],
    produces: { resourceId: 'adamantite_boots', amount: 1 },
    craftTime: 60,
    stats: {
      armor: 73,
      defense: 81,
      endurance: 36,
      health: 200,
      movementSpeed: -15,
      magicResist: 18,
      damageReflect: 4
    }
  },
  {
    id: 'adamantite_gauntlets',
    name: 'Gantelets d\'Adamantite',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'epic',
    requiredLevel: 38,

    professionLevel: 38,
    materials: [
      { resourceId: 'ore_adamantite', amount: 22 },
      { resourceId: 'ore_mithril', amount: 14 },
      { resourceId: 'monster_claw', amount: 8 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'adamantite_gauntlets', amount: 1 },
    craftTime: 65,
    stats: {
      armor: 58,
      defense: 66,
      strength: 48,
      endurance: 30,
      blockChance: 12,
      magicResist: 15,
      damageReflect: 5
    }
  },

  // ============================================
  // LIGHT ARMOR - ARCHER (20 recipes)
  // ============================================

  // TIER 1: LEATHER LIGHT ARMOR (Levels 1-10)
  {
    id: 'leather_hood',
    name: 'Capuche de Cuir',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'common',
    requiredLevel: 3,

    professionLevel: 3,
    materials: [
      { resourceId: 'fabric_linen', amount: 6 },
      { resourceId: 'monster_hide', amount: 4 },
      { resourceId: 'wood_oak', amount: 2 }
    ],
    produces: { resourceId: 'leather_hood', amount: 1 },
    craftTime: 25,
    stats: {
      armor: 3,
      agility: 8,
      critChance: 2,
      evasion: 5,
      health: 15
    }
  },
  {
    id: 'leather_vest',
    name: 'Gilet de Cuir',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'common',
    requiredLevel: 5,

    professionLevel: 5,
    materials: [
      { resourceId: 'fabric_linen', amount: 10 },
      { resourceId: 'monster_hide', amount: 8 },
      { resourceId: 'wood_oak', amount: 4 },
      { resourceId: 'monster_bone', amount: 2 }
    ],
    produces: { resourceId: 'leather_vest', amount: 1 },
    craftTime: 40,
    stats: {
      armor: 9,
      agility: 15,
      critChance: 4,
      evasion: 8,
      health: 30,
      movementSpeed: 5
    }
  },
  {
    id: 'leather_pants',
    name: 'Pantalon de Cuir',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'common',
    requiredLevel: 6,

    professionLevel: 6,
    materials: [
      { resourceId: 'fabric_linen', amount: 8 },
      { resourceId: 'monster_hide', amount: 6 },
      { resourceId: 'wood_oak', amount: 3 }
    ],
    produces: { resourceId: 'leather_pants', amount: 1 },
    craftTime: 30,
    stats: {
      armor: 6,
      agility: 12,
      critChance: 3,
      evasion: 6,
      health: 22,
      movementSpeed: 3
    }
  },
  {
    id: 'leather_boots',
    name: 'Bottes de Cuir',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'common',
    requiredLevel: 4,

    professionLevel: 4,
    materials: [
      { resourceId: 'fabric_linen', amount: 5 },
      { resourceId: 'monster_hide', amount: 4 },
      { resourceId: 'wood_oak', amount: 2 }
    ],
    produces: { resourceId: 'leather_boots', amount: 1 },
    craftTime: 22,
    stats: {
      armor: 3,
      agility: 10,
      evasion: 4,
      movementSpeed: 8,
      health: 12
    }
  },
  {
    id: 'leather_gloves',
    name: 'Gants de Cuir',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'common',
    requiredLevel: 7,

    professionLevel: 7,
    materials: [
      { resourceId: 'fabric_linen', amount: 4 },
      { resourceId: 'monster_hide', amount: 3 },
      { resourceId: 'monster_claw', amount: 2 }
    ],
    produces: { resourceId: 'leather_gloves', amount: 1 },
    craftTime: 20,
    stats: {
      armor: 2,
      agility: 7,
      critChance: 3,      accuracy: 5
    }
  },

  // TIER 2: STUDDED LEATHER ARMOR (Levels 11-20)
  {
    id: 'studded_hood',
    name: 'Capuche de Cuir Clouté',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'uncommon',
    requiredLevel: 12,

    professionLevel: 12,
    materials: [
      { resourceId: 'fabric_wool', amount: 8 },
      { resourceId: 'fabric_simple_leather', amount: 4 },
      { resourceId: 'ore_tin', amount: 4 },
      { resourceId: 'wood_birch', amount: 3 }
    ],
    produces: { resourceId: 'studded_hood', amount: 1 },
    craftTime: 35,
    stats: {
      armor: 10,
      agility: 18,
      critChance: 5,
      evasion: 10,
      health: 40,
      perception: 8
    }
  },
  {
    id: 'studded_vest',
    name: 'Gilet de Cuir Clouté',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'uncommon',
    requiredLevel: 15,

    professionLevel: 15,
    materials: [
      { resourceId: 'fabric_wool', amount: 14 },
      { resourceId: 'fabric_simple_leather', amount: 6 },
      { resourceId: 'ore_tin', amount: 8 },
      { resourceId: 'wood_birch', amount: 6 },
      { resourceId: 'monster_scale', amount: 3 }
    ],
    produces: { resourceId: 'studded_vest', amount: 1 },
    craftTime: 55,
    stats: {
      armor: 21,
      agility: 32,
      critChance: 8,
      evasion: 15,
      health: 75,
      movementSpeed: 10,
      backstabDamage: 10
    }
  },
  {
    id: 'studded_pants',
    name: 'Pantalon de Cuir Clouté',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'uncommon',
    requiredLevel: 14,

    professionLevel: 14,
    materials: [
      { resourceId: 'fabric_wool', amount: 12 },
      { resourceId: 'fabric_simple_leather', amount: 5 },
      { resourceId: 'ore_tin', amount: 6 },
      { resourceId: 'wood_birch', amount: 4 }
    ],
    produces: { resourceId: 'studded_pants', amount: 1 },
    craftTime: 42,
    stats: {
      armor: 15,
      agility: 26,
      critChance: 6,
      evasion: 12,
      health: 55,
      movementSpeed: 8
    }
  },
  {
    id: 'studded_boots',
    name: 'Bottes de Cuir Clouté',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'uncommon',
    requiredLevel: 13,

    professionLevel: 13,
    materials: [
      { resourceId: 'fabric_wool', amount: 8 },
      { resourceId: 'fabric_simple_leather', amount: 3 },
      { resourceId: 'ore_tin', amount: 4 },
      { resourceId: 'wood_birch', amount: 3 }
    ],
    produces: { resourceId: 'studded_boots', amount: 1 },
    craftTime: 32,
    stats: {
      armor: 9,
      agility: 22,
      evasion: 8,
      movementSpeed: 15,
      health: 32,
      stealth: 5
    }
  },
  {
    id: 'studded_gloves',
    name: 'Gants de Cuir Clouté',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'uncommon',
    requiredLevel: 16,

    professionLevel: 16,
    materials: [
      { resourceId: 'fabric_wool', amount: 6 },
      { resourceId: 'fabric_simple_leather', amount: 3 },
      { resourceId: 'ore_tin', amount: 3 },
      { resourceId: 'monster_claw', amount: 4 }
    ],
    produces: { resourceId: 'studded_gloves', amount: 1 },
    craftTime: 28,
    stats: {
      armor: 6,
      agility: 16,
      critChance: 6,      accuracy: 12,
      rangedDamage: 5
    }
  },

  // TIER 3: DRAGON SCALE ARMOR (Levels 21-30)
  {
    id: 'dragonscale_hood',
    name: 'Capuche d\'Écailles de Dragon',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'rare',
    requiredLevel: 23,

    professionLevel: 23,
    materials: [
      { resourceId: 'fabric_silk', amount: 10 },
      { resourceId: 'monster_scale', amount: 12 },
      { resourceId: 'ore_mithril', amount: 6 },
      { resourceId: 'wood_mahogany', amount: 4 }
    ],
    produces: { resourceId: 'dragonscale_hood', amount: 1 },
    craftTime: 50,
    stats: {
      armor: 24,
      agility: 38,
      critChance: 10,
      evasion: 18,
      health: 80,
      perception: 15,
      magicResist: 10
    }
  },
  {
    id: 'dragonscale_vest',
    name: 'Gilet d\'Écailles de Dragon',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'rare',
    requiredLevel: 26,

    professionLevel: 26,
    materials: [
      { resourceId: 'fabric_silk', amount: 18 },
      { resourceId: 'monster_scale', amount: 20 },
      { resourceId: 'ore_mithril', amount: 10 },
      { resourceId: 'wood_mahogany', amount: 8 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'dragonscale_vest', amount: 1 },
    craftTime: 75,
    stats: {
      armor: 46,
      agility: 68,
      critChance: 15,
      evasion: 28,
      health: 145,
      movementSpeed: 18,
      backstabDamage: 20,
      magicResist: 15
    }
  },
  {
    id: 'dragonscale_pants',
    name: 'Pantalon d\'Écailles de Dragon',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'rare',
    requiredLevel: 25,

    professionLevel: 25,
    materials: [
      { resourceId: 'fabric_silk', amount: 14 },
      { resourceId: 'monster_scale', amount: 16 },
      { resourceId: 'ore_mithril', amount: 8 },
      { resourceId: 'wood_mahogany', amount: 6 }
    ],
    produces: { resourceId: 'dragonscale_pants', amount: 1 },
    craftTime: 58,
    stats: {
      armor: 36,
      agility: 55,
      critChance: 12,
      evasion: 22,
      health: 110,
      movementSpeed: 15,
      magicResist: 12
    }
  },
  {
    id: 'dragonscale_boots',
    name: 'Bottes d\'Écailles de Dragon',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'rare',
    requiredLevel: 24,

    professionLevel: 24,
    materials: [
      { resourceId: 'fabric_silk', amount: 10 },
      { resourceId: 'monster_scale', amount: 12 },
      { resourceId: 'ore_mithril', amount: 5 },
      { resourceId: 'wood_mahogany', amount: 4 }
    ],
    produces: { resourceId: 'dragonscale_boots', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 21,
      agility: 46,
      evasion: 16,
      movementSpeed: 28,
      health: 68,
      stealth: 12,
      magicResist: 8
    }
  },
  {
    id: 'dragonscale_gloves',
    name: 'Gants d\'Écailles de Dragon',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'rare',
    requiredLevel: 27,

    professionLevel: 27,
    materials: [
      { resourceId: 'fabric_silk', amount: 8 },
      { resourceId: 'monster_scale', amount: 10 },
      { resourceId: 'ore_mithril', amount: 4 },
      { resourceId: 'monster_claw', amount: 6 }
    ],
    produces: { resourceId: 'dragonscale_gloves', amount: 1 },
    craftTime: 42,
    stats: {
      armor: 13,
      agility: 35,
      critChance: 12,      accuracy: 24,
      rangedDamage: 12,
      magicResist: 6
    }
  },

  // TIER 4: SHADOW SILK ARMOR (Levels 31-40)
  {
    id: 'shadowsilk_hood',
    name: 'Capuche de Soie d\'Ombre',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'epic',
    requiredLevel: 34,

    professionLevel: 34,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 12 },
      { resourceId: 'monster_scale', amount: 16 },
      { resourceId: 'ore_adamantite', amount: 8 },
      { resourceId: 'wood_ebony', amount: 6 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'shadowsilk_hood', amount: 1 },
    craftTime: 65,
    stats: {
      armor: 51,
      agility: 78,
      critChance: 18,
      evasion: 32,
      health: 160,
      perception: 28,
      magicResist: 20,
      stealth: 15
    }
  },
  {
    id: 'shadowsilk_vest',
    name: 'Gilet de Soie d\'Ombre',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'epic',
    requiredLevel: 37,

    professionLevel: 37,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 22 },
      { resourceId: 'monster_scale', amount: 28 },
      { resourceId: 'ore_adamantite', amount: 14 },
      { resourceId: 'wood_ebony', amount: 10 },
      { resourceId: 'monster_heart', amount: 4 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'shadowsilk_vest', amount: 1 },
    craftTime: 95,
    stats: {
      armor: 96,
      agility: 140,
      critChance: 25,
      evasion: 50,
      health: 290,
      movementSpeed: 32,
      backstabDamage: 35,
      magicResist: 30,
      stealth: 22
    }
  },
  {
    id: 'shadowsilk_pants',
    name: 'Pantalon de Soie d\'Ombre',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'epic',
    requiredLevel: 36,

    professionLevel: 36,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 18 },
      { resourceId: 'monster_scale', amount: 22 },
      { resourceId: 'ore_adamantite', amount: 12 },
      { resourceId: 'wood_ebony', amount: 8 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'shadowsilk_pants', amount: 1 },
    craftTime: 75,
    stats: {
      armor: 73,
      agility: 112,
      critChance: 20,
      evasion: 40,
      health: 220,
      movementSpeed: 28,
      magicResist: 25,
      stealth: 18
    }
  },
  {
    id: 'shadowsilk_boots',
    name: 'Bottes de Soie d\'Ombre',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'epic',
    requiredLevel: 35,

    professionLevel: 35,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 14 },
      { resourceId: 'monster_scale', amount: 18 },
      { resourceId: 'ore_adamantite', amount: 8 },
      { resourceId: 'wood_ebony', amount: 6 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'shadowsilk_boots', amount: 1 },
    craftTime: 58,
    stats: {
      armor: 43,
      agility: 95,
      evasion: 30,
      movementSpeed: 48,
      health: 135,
      stealth: 25,
      magicResist: 18,
      dodgeChance: 8
    }
  },
  {
    id: 'shadowsilk_gloves',
    name: 'Gants de Soie d\'Ombre',
    archetype: 'archer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'epic',
    requiredLevel: 38,

    professionLevel: 38,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 12 },
      { resourceId: 'monster_scale', amount: 14 },
      { resourceId: 'ore_adamantite', amount: 6 },
      { resourceId: 'monster_claw', amount: 8 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'shadowsilk_gloves', amount: 1 },
    craftTime: 55,
    stats: {
      armor: 28,
      agility: 72,
      critChance: 22,      accuracy: 45,
      rangedDamage: 25,
      magicResist: 15,
      stealth: 12
    }
  },

  // ============================================
  // CLOTH ARMOR - MAGE/HEALER (10 recipes)
  // ============================================

  // TIER 2: ENCHANTED ROBES (Levels 11-20)
  {
    id: 'enchanted_robe',
    name: 'Robe Enchantée',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'uncommon',
    requiredLevel: 14,

    professionLevel: 14,
    materials: [
      { resourceId: 'fabric_wool', amount: 16 },
      { resourceId: 'ore_silver', amount: 6 },
      { resourceId: 'plant_lavender', amount: 8 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'enchanted_robe', amount: 1 },
    craftTime: 50,
    stats: {
      armor: 13,
      intelligence: 15,
      manaRegen: 8,
      health: 45,
      magicResist: 15
    }
  },
  {
    id: 'enchanted_hood',
    name: 'Capuche Enchantée',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'uncommon',
    requiredLevel: 13,

    professionLevel: 13,
    materials: [
      { resourceId: 'fabric_wool', amount: 10 },
      { resourceId: 'ore_silver', amount: 4 },
      { resourceId: 'plant_lavender', amount: 5 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'enchanted_hood', amount: 1 },
    craftTime: 35,
    stats: {
      armor: 7,
      intelligence: 8,
      manaRegen: 5,
      health: 25,
      magicResist: 10
    }
  },
  {
    id: 'enchanted_pants',
    name: 'Pantalon Enchanté',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'uncommon',
    requiredLevel: 15,

    professionLevel: 15,
    materials: [
      { resourceId: 'fabric_wool', amount: 12 },
      { resourceId: 'ore_silver', amount: 5 },
      { resourceId: 'plant_lavender', amount: 6 }
    ],
    produces: { resourceId: 'enchanted_pants', amount: 1 },
    craftTime: 40,
    stats: {
      armor: 10,
      intelligence: 11,
      manaRegen: 6,
      health: 35,
      magicResist: 12
    }
  },
  {
    id: 'enchanted_boots',
    name: 'Bottes Enchantées',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'uncommon',
    requiredLevel: 12,

    professionLevel: 12,
    materials: [
      { resourceId: 'fabric_wool', amount: 8 },
      { resourceId: 'ore_silver', amount: 3 },
      { resourceId: 'plant_lavender', amount: 4 }
    ],
    produces: { resourceId: 'enchanted_boots', amount: 1 },
    craftTime: 30,
    stats: {
      armor: 6,
      intelligence: 6,
      manaRegen: 4,
      movementSpeed: 5,
      magicResist: 8
    }
  },
  {
    id: 'enchanted_gloves',
    name: 'Gants Enchantés',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 2,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'uncommon',
    requiredLevel: 16,

    professionLevel: 16,
    materials: [
      { resourceId: 'fabric_wool', amount: 6 },
      { resourceId: 'ore_silver', amount: 3 },
      { resourceId: 'plant_lavender', amount: 4 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'enchanted_gloves', amount: 1 },
    craftTime: 28,
    stats: {
      armor: 4,
      intelligence: 8,
      spellCrit: 5,      magicResist: 6
    }
  },

  // TIER 4: ARCHMAGE VESTMENTS (Levels 31-40)
  {
    id: 'archmage_robe',
    name: 'Robe d\'Archimage',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'epic',
    requiredLevel: 36,

    professionLevel: 36,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 20 },
      { resourceId: 'ore_runite', amount: 12 },
      { resourceId: 'plant_moonflower', amount: 10 },
      { resourceId: 'monster_essence', amount: 8 },
      { resourceId: 'monster_heart', amount: 3 }
    ],
    produces: { resourceId: 'archmage_robe', amount: 1 },
    craftTime: 85,
    stats: {
      armor: 36,
      intelligence: 50,
      manaRegen: 28,
      health: 180,
      magicResist: 40,
      spellCrit: 15,
      spellPenetration: 20
    }
  },
  {
    id: 'archmage_hood',
    name: 'Capuche d\'Archimage',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🪖',
    rarity: 'epic',
    requiredLevel: 34,

    professionLevel: 34,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 14 },
      { resourceId: 'ore_runite', amount: 8 },
      { resourceId: 'plant_moonflower', amount: 7 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'archmage_hood', amount: 1 },
    craftTime: 60,
    stats: {
      armor: 21,
      intelligence: 30,
      manaRegen: 18,
      health: 95,
      magicResist: 28,
      spellCrit: 10
    }
  },
  {
    id: 'archmage_pants',
    name: 'Pantalon d\'Archimage',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'epic',
    requiredLevel: 35,

    professionLevel: 35,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 16 },
      { resourceId: 'ore_runite', amount: 10 },
      { resourceId: 'plant_moonflower', amount: 8 },
      { resourceId: 'monster_essence', amount: 6 }
    ],
    produces: { resourceId: 'archmage_pants', amount: 1 },
    craftTime: 70,
    stats: {
      armor: 28,
      intelligence: 38,
      manaRegen: 22,
      health: 135,
      magicResist: 35,
      spellCrit: 12
    }
  },
  {
    id: 'archmage_boots',
    name: 'Bottes d\'Archimage',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👢',
    rarity: 'epic',
    requiredLevel: 33,

    professionLevel: 33,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 12 },
      { resourceId: 'ore_runite', amount: 6 },
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'archmage_boots', amount: 1 },
    craftTime: 52,
    stats: {
      armor: 16,
      intelligence: 22,
      manaRegen: 14,
      movementSpeed: 12,
      magicResist: 22,
      spellCrit: 6
    }
  },
  {
    id: 'archmage_gloves',
    name: 'Gants d\'Archimage',
    archetype: 'mage',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'epic',
    requiredLevel: 37,

    professionLevel: 37,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 10 },
      { resourceId: 'ore_runite', amount: 6 },
      { resourceId: 'plant_moonflower', amount: 5 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'archmage_gloves', amount: 1 },
    craftTime: 55,
    stats: {
      armor: 13,
      intelligence: 29,
      spellCrit: 18,
      magicResist: 18,
      spellPenetration: 12
    }
  },

  // ============================================
  // CLOTH ARMOR - HEALER (15 recipes) - NEW
  // ============================================
  
  // TIER 1: BASIC HEALER ROBES (Levels 1-10)
  
  {
    id: 'basic_healer_robe',
    name: 'Robe de Soigneur Basique',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'common',
    requiredLevel: 2,
    professionLevel: 2,
    materials: [
      { resourceId: 'fabric_linen', amount: 8 },
      { resourceId: 'plant_wild_mint', amount: 4 }
    ],
    produces: { resourceId: 'basic_healer_robe', amount: 1 },
    craftTime: 20,
    stats: {
      armor: 5,
      intelligence: 8,
      healingPower: 6,
      manaRegen: 3,
      health: 20
    }
  },
  {
    id: 'basic_healer_hood',
    name: 'Capuche de Soigneur Basique',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '🎓',
    rarity: 'common',
    requiredLevel: 1,
    professionLevel: 1,
    materials: [
      { resourceId: 'fabric_linen', amount: 5 },
      { resourceId: 'plant_wild_mint', amount: 2 }
    ],
    produces: { resourceId: 'basic_healer_hood', amount: 1 },
    craftTime: 15,
    stats: {
      armor: 2,
      intelligence: 4,
      healingPower: 3,
      manaRegen: 2,
      health: 10
    }
  },
  {
    id: 'basic_healer_pants',
    name: 'Pantalon de Soigneur Basique',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'common',
    requiredLevel: 5,
    professionLevel: 5,
    materials: [
      { resourceId: 'fabric_linen', amount: 7 },
      { resourceId: 'plant_wild_mint', amount: 3 }
    ],
    produces: { resourceId: 'basic_healer_pants', amount: 1 },
    craftTime: 18,
    stats: {
      armor: 4,
      intelligence: 6,
      healingPower: 5,
      manaRegen: 2,
      health: 15
    }
  },
  {
    id: 'basic_healer_boots',
    name: 'Bottes de Soigneur Basique',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '👟',
    rarity: 'common',
    requiredLevel: 3,
    professionLevel: 3,
    materials: [
      { resourceId: 'fabric_linen', amount: 4 },
      { resourceId: 'plant_wild_mint', amount: 2 }
    ],
    produces: { resourceId: 'basic_healer_boots', amount: 1 },
    craftTime: 12,
    stats: {
      armor: 3,
      intelligence: 5,
      healingPower: 4,
      manaRegen: 2,
      health: 12
    }
  },
  {
    id: 'basic_healer_gloves',
    name: 'Gants de Soigneur Basique',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 1,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'common',
    requiredLevel: 7,
    professionLevel: 7,
    materials: [
      { resourceId: 'fabric_linen', amount: 6 },
      { resourceId: 'plant_wild_mint', amount: 3 }
    ],
    produces: { resourceId: 'basic_healer_gloves', amount: 1 },
    craftTime: 16,
    stats: {
      armor: 3,
      intelligence: 7,
      healingPower: 5,
      manaRegen: 3,
      health: 13
    }
  },

  // TIER 3: BLESSED HEALER ROBES (Levels 21-30)
  
  {
    id: 'blessed_robe',
    name: 'Robe Bénie',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'rare',
    requiredLevel: 25,
    professionLevel: 25,
    materials: [
      { resourceId: 'fabric_silk', amount: 18 },
      { resourceId: 'plant_chamomile', amount: 10 },
      { resourceId: 'ore_silver', amount: 5 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'blessed_robe', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 20,
      intelligence: 30,
      healingPower: 25,
      manaRegen: 18,
      health: 60,
      magicResist: 15
    }
  },
  {
    id: 'blessed_hood',
    name: 'Capuche Bénie',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🎓',
    rarity: 'rare',
    requiredLevel: 21,
    professionLevel: 21,
    materials: [
      { resourceId: 'fabric_silk', amount: 12 },
      { resourceId: 'plant_chamomile', amount: 6 },
      { resourceId: 'ore_silver', amount: 3 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'blessed_hood', amount: 1 },
    craftTime: 35,
    stats: {
      armor: 15,
      intelligence: 20,
      healingPower: 15,
      manaRegen: 12,
      health: 40,
      magicResist: 10
    }
  },
  {
    id: 'blessed_pants',
    name: 'Pantalon Béni',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'rare',
    requiredLevel: 27,
    professionLevel: 27,
    materials: [
      { resourceId: 'fabric_silk', amount: 15 },
      { resourceId: 'plant_chamomile', amount: 8 },
      { resourceId: 'ore_silver', amount: 4 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'blessed_pants', amount: 1 },
    craftTime: 40,
    stats: {
      armor: 18,
      intelligence: 25,
      healingPower: 20,
      manaRegen: 15,
      health: 50,
      magicResist: 12
    }
  },
  {
    id: 'blessed_boots',
    name: 'Bottes Bénies',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '👟',
    rarity: 'rare',
    requiredLevel: 23,
    professionLevel: 23,
    materials: [
      { resourceId: 'fabric_silk', amount: 10 },
      { resourceId: 'plant_chamomile', amount: 5 },
      { resourceId: 'ore_silver', amount: 3 }
    ],
    produces: { resourceId: 'blessed_boots', amount: 1 },
    craftTime: 30,
    stats: {
      armor: 16,
      intelligence: 22,
      healingPower: 18,
      manaRegen: 13,
      health: 45,
      magicResist: 11
    }
  },
  {
    id: 'blessed_gloves',
    name: 'Gants Bénis',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 3,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'rare',
    requiredLevel: 29,
    professionLevel: 29,
    materials: [
      { resourceId: 'fabric_silk', amount: 13 },
      { resourceId: 'plant_chamomile', amount: 7 },
      { resourceId: 'ore_silver', amount: 4 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'blessed_gloves', amount: 1 },
    craftTime: 38,
    stats: {
      armor: 17,
      intelligence: 27,
      healingPower: 22,
      manaRegen: 16,
      health: 48,
      magicResist: 13
    }
  },

  // TIER 4: DIVINE VESTMENTS (Levels 31-40)
  
  {
    id: 'divine_vestments_robe',
    name: 'Robe de Vêtements Divins',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👕',
    rarity: 'epic',
    requiredLevel: 35,
    professionLevel: 35,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 20 },
      { resourceId: 'plant_moonflower', amount: 12 },
      { resourceId: 'ore_gold', amount: 8 },
      { resourceId: 'monster_essence', amount: 6 }
    ],
    produces: { resourceId: 'divine_vestments_robe', amount: 1 },
    craftTime: 60,
    stats: {
      armor: 35,
      intelligence: 45,
      healingPower: 45,
      manaRegen: 30,
      health: 90,
      magicResist: 25,
      holyPower: 10
    }
  },
  {
    id: 'divine_vestments_hood',
    name: 'Capuche de Vêtements Divins',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🎓',
    rarity: 'epic',
    requiredLevel: 31,
    professionLevel: 31,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 14 },
      { resourceId: 'plant_moonflower', amount: 8 },
      { resourceId: 'ore_gold', amount: 5 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'divine_vestments_hood', amount: 1 },
    craftTime: 45,
    stats: {
      armor: 25,
      intelligence: 35,
      healingPower: 30,
      manaRegen: 20,
      health: 65,
      magicResist: 18,
      holyPower: 6
    }
  },
  {
    id: 'divine_vestments_pants',
    name: 'Pantalon de Vêtements Divins',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👖',
    rarity: 'epic',
    requiredLevel: 37,
    professionLevel: 37,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 17 },
      { resourceId: 'plant_moonflower', amount: 10 },
      { resourceId: 'ore_gold', amount: 6 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'divine_vestments_pants', amount: 1 },
    craftTime: 52,
    stats: {
      armor: 30,
      intelligence: 40,
      healingPower: 38,
      manaRegen: 25,
      health: 78,
      magicResist: 22,
      holyPower: 8
    }
  },
  {
    id: 'divine_vestments_boots',
    name: 'Bottes de Vêtements Divins',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '👟',
    rarity: 'epic',
    requiredLevel: 33,
    professionLevel: 33,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 12 },
      { resourceId: 'plant_moonflower', amount: 7 },
      { resourceId: 'ore_gold', amount: 4 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'divine_vestments_boots', amount: 1 },
    craftTime: 42,
    stats: {
      armor: 27,
      intelligence: 37,
      healingPower: 33,
      manaRegen: 22,
      health: 70,
      magicResist: 20,
      holyPower: 7
    }
  },
  {
    id: 'divine_vestments_gloves',
    name: 'Gants de Vêtements Divins',
    archetype: 'healer',
    category: 'armor',
    profession: 'tailor',
    tier: 4,
    type: 'armor',
    slot: 'armor',
    icon: '🧤',
    rarity: 'epic',
    requiredLevel: 39,
    professionLevel: 39,
    materials: [
      { resourceId: 'fabric_spider_silk', amount: 15 },
      { resourceId: 'plant_moonflower', amount: 9 },
      { resourceId: 'ore_gold', amount: 5 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'divine_vestments_gloves', amount: 1 },
    craftTime: 48,
    stats: {
      armor: 28,
      intelligence: 42,
      healingPower: 40,
      manaRegen: 27,
      health: 73,
      magicResist: 23,
      holyPower: 9
    }
  }
];




