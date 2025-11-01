/**
 * CRAFT RECIPES - ACCESSORIES (25 recipes)
 * Archetype-specific accessories with tier progression
 * 
 * Distribution:
 * - Rings: 10 recipes (2-3 per archetype)
 * - Amulets: 10 recipes (2-3 per archetype)
 * - Talismans: 5 recipes (1-2 per archetype)
 */

window.CraftRecipesAccessories = [
  // ============================================
  // RINGS (10 recipes)
  // ============================================

  // TANK RINGS
  {
    id: 'iron_ring_defense',
    name: 'Anneau de Fer de Défense',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'common',
    requiredLevel: 5,

    professionLevel: 5,
    materials: [
      { resourceId: 'ore_iron', amount: 6 },
      { resourceId: 'ore_copper', amount: 4 }
    ],
    produces: { resourceId: 'iron_ring_defense', amount: 1 },
    craftTime: 20,
    stats: {
      defense: 15,
      endurance: 8,
      health: 30,
      blockChance: 3
    }
  },
  {
    id: 'steel_ring_fortitude',
    name: 'Anneau d\'Acier de Robustesse',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 2,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'uncommon',
    requiredLevel: 16,

    professionLevel: 16,
    materials: [
      { resourceId: 'ore_tin', amount: 8 },
      { resourceId: 'ore_silver', amount: 4 },
      { resourceId: 'monster_bone', amount: 3 }
    ],
    produces: { resourceId: 'steel_ring_fortitude', amount: 1 },
    craftTime: 35,
    stats: {
      defense: 35,
      endurance: 18,
      health: 70,
      blockChance: 6,
      damageReduction: 3
    }
  },
  {
    id: 'adamantite_ring_titan',
    name: 'Anneau d\'Adamantite du Titan',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'epic',
    requiredLevel: 38,

    professionLevel: 38,
    materials: [
      { resourceId: 'ore_adamantite', amount: 12 },
      { resourceId: 'ore_runite', amount: 6 },
      { resourceId: 'monster_heart', amount: 2 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'adamantite_ring_titan', amount: 1 },
    craftTime: 65,
    stats: {
      defense: 85,
      endurance: 45,
      health: 180,
      blockChance: 15,
      damageReduction: 8,
      damageReflect: 6
    }
  },

  // ARCHER RINGS
  {
    id: 'copper_ring_precision',
    name: 'Anneau de Cuivre de Précision',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'common',
    requiredLevel: 6,

    professionLevel: 6,
    materials: [
      { resourceId: 'ore_copper', amount: 8 },
      { resourceId: 'ore_iron', amount: 4 },
      { resourceId: 'monster_claw', amount: 2 }
    ],
    produces: { resourceId: 'copper_ring_precision', amount: 1 },
    craftTime: 22,
    stats: {
      agility: 12,
      critChance: 4,
      accuracy: 8,    }
  },
  {
    id: 'silver_ring_swiftness',
    name: 'Anneau d\'Argent de Rapidité',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 2,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'uncommon',
    requiredLevel: 17,

    professionLevel: 17,
    materials: [
      { resourceId: 'ore_silver', amount: 10 },
      { resourceId: 'ore_tin', amount: 6 },
      { resourceId: 'monster_claw', amount: 4 }
    ],
    produces: { resourceId: 'silver_ring_swiftness', amount: 1 },
    craftTime: 38,
    stats: {
      agility: 28,
      critChance: 8,
      accuracy: 16,      evasion: 5
    }
  },
  {
    id: 'runite_ring_marksman',
    name: 'Anneau de Runite du Tireur d\'Élite',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'epic',
    requiredLevel: 39,

    professionLevel: 39,
    materials: [
      { resourceId: 'ore_runite', amount: 12 },
      { resourceId: 'ore_adamantite', amount: 8 },
      { resourceId: 'monster_essence', amount: 5 },
      { resourceId: 'monster_claw', amount: 6 }
    ],
    produces: { resourceId: 'runite_ring_marksman', amount: 1 },
    craftTime: 68,
    stats: {
      agility: 68,
      critChance: 18,
      accuracy: 38,      evasion: 12,
      critDamage: 25
    }
  },

  // MAGE RINGS
  {
    id: 'copper_ring_intelligence',
    name: 'Anneau de Cuivre d\'Intelligence',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'common',
    requiredLevel: 7,

    professionLevel: 7,
    materials: [
      { resourceId: 'ore_copper', amount: 6 },
      { resourceId: 'plant_sage', amount: 4 },
      { resourceId: 'monster_essence', amount: 1 }
    ],
    produces: { resourceId: 'copper_ring_intelligence', amount: 1 },
    craftTime: 24,
    stats: {
      intelligence: 6,
      manaRegen: 3
    }
  },
  {
    id: 'silver_ring_arcana',
    name: 'Anneau d\'Argent de l\'Arcane',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 2,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'uncommon',
    requiredLevel: 18,

    professionLevel: 18,
    materials: [
      { resourceId: 'ore_silver', amount: 10 },
      { resourceId: 'plant_lavender', amount: 6 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'silver_ring_arcana', amount: 1 },
    craftTime: 40,
    stats: {
      intelligence: 18,
      manaRegen: 8,
      spellCrit: 5
    }
  },
  {
    id: 'runite_ring_archmage',
    name: 'Anneau de Runite de l\'Archimage',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'epic',
    requiredLevel: 40,

    professionLevel: 40,
    materials: [
      { resourceId: 'ore_runite', amount: 14 },
      { resourceId: 'plant_moonflower', amount: 8 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'runite_ring_archmage', amount: 1 },
    craftTime: 72,
    stats: {
      intelligence: 43,
      manaRegen: 22,
      spellCrit: 15,
      spellPenetration: 18,    }
  },

  // HEALER RING
  {
    id: 'silver_ring_restoration',
    name: 'Anneau d\'Argent de Restauration',
    archetype: 'healer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 2,
    type: 'accessory',
    slot: 'accessory',
    icon: '💍',
    rarity: 'uncommon',
    requiredLevel: 19,

    professionLevel: 19,
    materials: [
      { resourceId: 'ore_silver', amount: 10 },
      { resourceId: 'plant_wild_mint', amount: 8 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'silver_ring_restoration', amount: 1 },
    craftTime: 42,
    stats: {
      wisdom: 28,
      healingPower: 35,
      manaRegen: 10,
      healBonus: 8
    }
  },

  // ============================================
  // AMULETS (10 recipes)
  // ============================================

  // TANK AMULETS
  {
    id: 'iron_amulet_guardian',
    name: 'Amulette de Fer du Gardien',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'common',
    requiredLevel: 8,

    professionLevel: 8,
    materials: [
      { resourceId: 'ore_iron', amount: 10 },
      { resourceId: 'ore_copper', amount: 6 },
      { resourceId: 'fabric_linen', amount: 3 },
      { resourceId: 'monster_bone', amount: 2 }
    ],
    produces: { resourceId: 'iron_amulet_guardian', amount: 1 },
    craftTime: 28,
    stats: {
      defense: 20,
      endurance: 12,
      health: 45,
      armor: 8,
      blockChance: 4
    }
  },
  {
    id: 'mithril_amulet_bulwark',
    name: 'Amulette de Mithril du Rempart',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'rare',
    requiredLevel: 28,

    professionLevel: 28,
    materials: [
      { resourceId: 'ore_mithril', amount: 14 },
      { resourceId: 'ore_tin', amount: 10 },
      { resourceId: 'fabric_silk', amount: 4 },
      { resourceId: 'monster_scale', amount: 6 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'mithril_amulet_bulwark', amount: 1 },
    craftTime: 58,
    stats: {
      defense: 68,
      endurance: 38,
      health: 145,
      armor: 25,
      blockChance: 10,
      damageReduction: 5,
      magicResist: 12
    }
  },
  {
    id: 'adamantite_amulet_colossus',
    name: 'Amulette d\'Adamantite du Colosse',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'epic',
    requiredLevel: 40,

    professionLevel: 40,
    materials: [
      { resourceId: 'ore_adamantite', amount: 18 },
      { resourceId: 'ore_runite', amount: 10 },
      { resourceId: 'fabric_spider_silk', amount: 6 },
      { resourceId: 'monster_heart', amount: 4 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'adamantite_amulet_colossus', amount: 1 },
    craftTime: 75,
    stats: {
      defense: 105,
      endurance: 68,
      health: 280,
      armor: 45,
      blockChance: 18,
      damageReduction: 10,
      damageReflect: 8,
      magicResist: 22
    }
  },

  // ARCHER AMULETS
  {
    id: 'copper_amulet_hunter',
    name: 'Amulette de Cuivre du Chasseur',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'common',
    requiredLevel: 9,

    professionLevel: 9,
    materials: [
      { resourceId: 'ore_copper', amount: 10 },
      { resourceId: 'fabric_linen', amount: 4 },
      { resourceId: 'monster_hide', amount: 4 },
      { resourceId: 'monster_fang', amount: 2 }
    ],
    produces: { resourceId: 'copper_amulet_hunter', amount: 1 },
    craftTime: 30,
    stats: {
      agility: 16,
      critChance: 5,
      accuracy: 10,
      rangedDamage: 4,
      evasion: 3
    }
  },
  {
    id: 'mithril_amulet_ranger',
    name: 'Amulette de Mithril du Rôdeur',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'rare',
    requiredLevel: 29,

    professionLevel: 29,
    materials: [
      { resourceId: 'ore_mithril', amount: 16 },
      { resourceId: 'fabric_silk', amount: 6 },
      { resourceId: 'monster_scale', amount: 8 },
      { resourceId: 'monster_claw', amount: 5 }
    ],
    produces: { resourceId: 'mithril_amulet_ranger', amount: 1 },
    craftTime: 62,
    stats: {
      agility: 55,
      critChance: 12,
      accuracy: 28,
      rangedDamage: 18,
      evasion: 15,
      backstabDamage: 12,
      movementSpeed: 10
    }
  },
  {
    id: 'runite_amulet_sniper',
    name: 'Amulette de Runite du Sniper',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'epic',
    requiredLevel: 41,

    professionLevel: 41,
    materials: [
      { resourceId: 'ore_runite', amount: 18 },
      { resourceId: 'fabric_spider_silk', amount: 8 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'monster_claw', amount: 8 }
    ],
    produces: { resourceId: 'runite_amulet_sniper', amount: 1 },
    craftTime: 78,
    stats: {
      agility: 88,
      critChance: 22,
      accuracy: 52,
      rangedDamage: 38,
      evasion: 22,
      backstabDamage: 28,
      critDamage: 30,
      movementSpeed: 18
    }
  },

  // MAGE AMULETS
  {
    id: 'copper_amulet_scholar',
    name: 'Amulette de Cuivre de l\'Érudit',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 1,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'common',
    requiredLevel: 10,

    professionLevel: 10,
    materials: [
      { resourceId: 'ore_copper', amount: 8 },
      { resourceId: 'plant_sage', amount: 6 },
      { resourceId: 'fabric_linen', amount: 3 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'copper_amulet_scholar', amount: 1 },
    craftTime: 32,
    stats: {
      intelligence: 8,
      manaRegen: 5,
      magicResist: 4
    }
  },
  {
    id: 'mithril_amulet_sorcerer',
    name: 'Amulette de Mithril du Sorcier',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'rare',
    requiredLevel: 30,

    professionLevel: 30,
    materials: [
      { resourceId: 'ore_mithril', amount: 16 },
      { resourceId: 'plant_ghostbloom', amount: 8 },
      { resourceId: 'fabric_silk', amount: 5 },
      { resourceId: 'monster_essence', amount: 5 }
    ],
    produces: { resourceId: 'mithril_amulet_sorcerer', amount: 1 },
    craftTime: 65,
    stats: {
      intelligence: 34,
      manaRegen: 18,
      spellCrit: 10,
      spellPenetration: 12,
      magicResist: 15
    }
  },
  {
    id: 'runite_amulet_archmage',
    name: 'Amulette de Runite de l\'Archimage',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'epic',
    requiredLevel: 42,

    professionLevel: 42,
    materials: [
      { resourceId: 'ore_runite', amount: 20 },
      { resourceId: 'plant_moonflower', amount: 10 },
      { resourceId: 'fabric_spider_silk', amount: 7 },
      { resourceId: 'monster_essence', amount: 8 },
      { resourceId: 'monster_heart', amount: 3 }
    ],
    produces: { resourceId: 'runite_amulet_archmage', amount: 1 },
    craftTime: 82,
    stats: {
      intelligence: 57,
      manaRegen: 32,
      spellCrit: 20,
      spellPenetration: 25,
      magicResist: 28,    }
  },

  // HEALER AMULETS
  {
    id: 'silver_amulet_cleric',
    name: 'Amulette d\'Argent du Clerc',
    archetype: 'healer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 2,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'uncommon',
    requiredLevel: 20,

    professionLevel: 20,
    materials: [
      { resourceId: 'ore_silver', amount: 12 },
      { resourceId: 'plant_wild_mint', amount: 8 },
      { resourceId: 'fabric_wool', amount: 4 },
      { resourceId: 'monster_heart', amount: 3 }
    ],
    produces: { resourceId: 'silver_amulet_cleric', amount: 1 },
    craftTime: 48,
    stats: {
      wisdom: 38,
      healingPower: 45,
      manaRegen: 12,
      healBonus: 12,
      health: 60
    }
  },
  {
    id: 'runite_amulet_oracle',
    name: 'Amulette de Runite de l\'Oracle',
    archetype: 'healer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '📿',
    rarity: 'epic',
    requiredLevel: 43,

    professionLevel: 43,
    materials: [
      { resourceId: 'ore_runite', amount: 18 },
      { resourceId: 'plant_soulroot', amount: 10 },
      { resourceId: 'fabric_spider_silk', amount: 6 },
      { resourceId: 'monster_heart', amount: 5 },
      { resourceId: 'monster_essence', amount: 6 }
    ],
    produces: { resourceId: 'runite_amulet_oracle', amount: 1 },
    craftTime: 80,
    stats: {
      wisdom: 98,
      healingPower: 128,
      manaRegen: 35,
      healBonus: 28,
      health: 220,
      aoeHealBonus: 15,
      magicResist: 20
    }
  },

  // ============================================
  // TALISMANS (5 recipes)
  // ============================================

  {
    id: 'talisman_berserker',
    name: 'Talisman du Berserker',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '🔮',
    rarity: 'rare',
    requiredLevel: 32,

    professionLevel: 32,
    materials: [
      { resourceId: 'ore_mithril', amount: 12 },
      { resourceId: 'monster_fang', amount: 8 },
      { resourceId: 'monster_claw', amount: 6 },
      { resourceId: 'monster_heart', amount: 3 }
    ],
    produces: { resourceId: 'talisman_berserker', amount: 1 },
    craftTime: 55,
    stats: {
      strength: 45,
      endurance: 32,
      critChance: 8,
      lifesteal: 5,
      health: 100,
      damageReflect: 4
    }
  },
  {
    id: 'talisman_shadowdancer',
    name: 'Talisman du Danseur d\'Ombre',
    archetype: 'archer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '🔮',
    rarity: 'rare',
    requiredLevel: 33,

    professionLevel: 33,
    materials: [
      { resourceId: 'ore_mithril', amount: 10 },
      { resourceId: 'fabric_silk', amount: 8 },
      { resourceId: 'monster_scale', amount: 6 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'talisman_shadowdancer', amount: 1 },
    craftTime: 58,
    stats: {
      agility: 52,
      evasion: 22,
      stealth: 18,
      critChance: 12,
      backstabDamage: 25,
      movementSpeed: 15
    }
  },
  {
    id: 'talisman_elementalist',
    name: 'Talisman de l\'Élémentaliste',
    archetype: 'mage',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '🔮',
    rarity: 'rare',
    requiredLevel: 34,

    professionLevel: 34,
    materials: [
      { resourceId: 'ore_mithril', amount: 12 },
      { resourceId: 'plant_ghostbloom', amount: 10 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'talisman_elementalist', amount: 1 },
    craftTime: 62,
    stats: {
      intelligence: 32,
      spellCrit: 15,
      elementalDamage: 20,
      manaRegen: 15,
      spellPenetration: 10
    }
  },
  {
    id: 'talisman_lifebinder',
    name: 'Talisman du Lieur de Vie',
    archetype: 'healer',
    category: 'accessory',
    profession: 'jeweler',
    tier: 3,
    type: 'accessory',
    slot: 'accessory',
    icon: '🔮',
    rarity: 'rare',
    requiredLevel: 35,

    professionLevel: 35,
    materials: [
      { resourceId: 'ore_mithril', amount: 12 },
      { resourceId: 'plant_ghostbloom', amount: 8 },
      { resourceId: 'plant_wild_mint', amount: 8 },
      { resourceId: 'monster_heart', amount: 4 }
    ],
    produces: { resourceId: 'talisman_lifebinder', amount: 1 },
    craftTime: 60,
    stats: {
      wisdom: 62,
      healingPower: 78,
      healBonus: 18,
      aoeHealBonus: 12,
      manaRegen: 18,
      health: 120
    }
  },
  {
    id: 'talisman_eternal_champion',
    name: 'Talisman du Champion Éternel',
    archetype: 'tank',
    category: 'accessory',
    profession: 'jeweler',
    tier: 4,
    type: 'accessory',
    slot: 'accessory',
    icon: '🔮',
    rarity: 'epic',
    requiredLevel: 45,

    professionLevel: 45,
    materials: [
      { resourceId: 'ore_adamantite', amount: 16 },
      { resourceId: 'ore_runite', amount: 12 },
      { resourceId: 'monster_heart', amount: 6 },
      { resourceId: 'monster_essence', amount: 8 }
    ],
    produces: { resourceId: 'talisman_eternal_champion', amount: 1 },
    craftTime: 90,
    stats: {
      strength: 85,
      endurance: 72,
      defense: 68,
      health: 250,
      critChance: 15,
      lifesteal: 10,
      damageReflect: 10,
      damageReduction: 8
    }
  }
];


