/**
 * CRAFT RECIPES - CONSUMABLES (35 recipes)
 * Potions, elixirs and food buffs for all archetypes
 * 
 * Distribution:
 * - Health Potions: 5 recipes (Tiers 1-5)
 * - Mana Potions: 5 recipes (Tiers 1-5)
 * - Stat Potions: 10 recipes (Strength, Agility, Intelligence, Defense)
 * - Endgame Elixirs: 5 recipes (Tier 4-5, powerful temporary buffs)
 * - Food Buffs: 10 recipes (Regeneration, stat boosts, profession bonuses)
 */

window.CraftRecipesConsumables = [
  // ============================================
  // HEALTH POTIONS (4 recipes - health_potion_minor dans craft-recipes-data.js)
  // ============================================

  {
    id: 'health_potion_lesser',
    name: 'Potion de Vie Mineure',
    category: 'consumable',
    profession: 'alchemist',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'uncommon',
    requiredLevel: 11,

    professionLevel: 11,
    materials: [
      { resourceId: 'plant_lavender', amount: 4 },
      { resourceId: 'plant_wild_mint', amount: 3 },
      { resourceId: 'fish_red_snapper', amount: 1 }
    ],
    produces: { resourceId: 'health_potion_lesser', amount: 3 },
    craftTime: 22,
    effects: {
      healAmount: 150,
      duration: 0,
      description: 'Restores 150 health instantly'
    }
  },
  {
    id: 'health_potion',
    name: 'Potion de Vie',
    category: 'consumable',
    profession: 'alchemist',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 22,

    professionLevel: 22,
    materials: [
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'plant_lavender', amount: 4 },
      { resourceId: 'fish_golden_carp', amount: 2 }
    ],
    produces: { resourceId: 'health_potion', amount: 3 },
    craftTime: 30,
    effects: {
      healAmount: 400,
      duration: 0,
      description: 'Restores 400 health instantly'
    }
  },
  {
    id: 'health_potion_greater',
    name: 'Grande Potion de Vie',
    category: 'consumable',
    profession: 'alchemist',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'epic',
    requiredLevel: 33,

    professionLevel: 33,
    materials: [
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'fish_silver_eel', amount: 3 },
      { resourceId: 'monster_heart', amount: 1 }
    ],
    produces: { resourceId: 'health_potion_greater', amount: 3 },
    craftTime: 42,
    effects: {
      healAmount: 900,
      duration: 0,
      description: 'Restores 900 health instantly'
    }
  },
  {
    id: 'health_potion_supreme',
    name: 'Potion de Vie Suprême',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'legendary',
    requiredLevel: 44,

    professionLevel: 44,
    materials: [
      { resourceId: 'plant_soulroot', amount: 8 },
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'fish_crimson_leviathan', amount: 4 },
      { resourceId: 'monster_heart', amount: 2 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'health_potion_supreme', amount: 3 },
    craftTime: 60,
    effects: {
      healAmount: 2000,
      duration: 0,
      description: 'Restores 2000 health instantly'
    }
  },

  // ============================================
  // MANA POTIONS (5 recipes)
  // ============================================

  {
    id: 'mana_potion_minor',
    name: 'Petite Potion de Mana',
    category: 'consumable',
    profession: 'alchemist',
    tier: 1,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'common',
    requiredLevel: 3,

    professionLevel: 3,
    materials: [
      { resourceId: 'plant_thyme', amount: 3 },
      { resourceId: 'plant_sage', amount: 2 }
    ],
    produces: { resourceId: 'mana_potion_minor', amount: 3 },
    craftTime: 15,
    effects: {
      manaAmount: 40,
      duration: 0,
      description: 'Restores 40 mana instantly'
    }
  },
  {
    id: 'mana_potion_lesser',
    name: 'Potion de Mana Mineure',
    category: 'consumable',
    profession: 'alchemist',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'uncommon',
    requiredLevel: 12,

    professionLevel: 12,
    materials: [
      { resourceId: 'plant_wild_mint', amount: 4 },
      { resourceId: 'plant_lavender', amount: 3 },
      { resourceId: 'fish_striped_bass', amount: 1 }
    ],
    produces: { resourceId: 'mana_potion_lesser', amount: 3 },
    craftTime: 22,
    effects: {
      manaAmount: 120,
      duration: 0,
      description: 'Restores 120 mana instantly'
    }
  },
  {
    id: 'mana_potion',
    name: 'Potion de Mana',
    category: 'consumable',
    profession: 'alchemist',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 23,

    professionLevel: 23,
    materials: [
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'plant_wild_mint', amount: 4 },
      { resourceId: 'fish_moonfish', amount: 2 }
    ],
    produces: { resourceId: 'mana_potion', amount: 3 },
    craftTime: 30,
    effects: {
      manaAmount: 320,
      duration: 0,
      description: 'Restores 320 mana instantly'
    }
  },
  {
    id: 'mana_potion_greater',
    name: 'Grande Potion de Mana',
    category: 'consumable',
    profession: 'alchemist',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'epic',
    requiredLevel: 34,

    professionLevel: 34,
    materials: [
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'fish_void_squid', amount: 3 },
      { resourceId: 'monster_essence', amount: 2 }
    ],
    produces: { resourceId: 'mana_potion_greater', amount: 3 },
    craftTime: 42,
    effects: {
      manaAmount: 720,
      duration: 0,
      description: 'Restores 720 mana instantly'
    }
  },
  {
    id: 'mana_potion_supreme',
    name: 'Potion de Mana Suprême',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'legendary',
    requiredLevel: 45,

    professionLevel: 45,
    materials: [
      { resourceId: 'plant_soulroot', amount: 8 },
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'fish_void_squid', amount: 4 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'mana_potion_supreme', amount: 3 },
    craftTime: 60,
    effects: {
      manaAmount: 1600,
      duration: 0,
      description: 'Restores 1600 mana instantly'
    }
  },

  // ============================================
  // STAT POTIONS (10 recipes)
  // ============================================

  {
    id: 'potion_strength',
    name: 'Potion de Force',
    archetype: 'tank',
    category: 'consumable',
    profession: 'alchemist',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'uncommon',
    requiredLevel: 14,

    professionLevel: 14,
    materials: [
      { resourceId: 'plant_sage', amount: 5 },
      { resourceId: 'monster_bone', amount: 3 },
      { resourceId: 'fish_red_snapper', amount: 2 }
    ],
    produces: { resourceId: 'potion_strength', amount: 2 },
    craftTime: 28,
    effects: {
      strength: 25,
      duration: 300,
      description: '+25 Strength for 5 minutes'
    }
  },
  {
    id: 'potion_fortitude',
    name: 'Potion de Robustesse',
    archetype: 'tank',
    category: 'consumable',
    profession: 'alchemist',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 25,

    professionLevel: 25,
    materials: [
      { resourceId: 'plant_ghostbloom', amount: 6 },
      { resourceId: 'monster_scale', amount: 4 },
      { resourceId: 'fish_giant_catfish', amount: 3 }
    ],
    produces: { resourceId: 'potion_fortitude', amount: 2 },
    craftTime: 38,
    effects: {
      endurance: 35,
      defense: 30,
      duration: 300,
      description: '+35 Endurance, +30 Defense for 5 minutes'
    }
  },
  {
    id: 'potion_iron_skin',
    name: 'Potion de Peau de Fer',
    archetype: 'tank',
    category: 'consumable',
    profession: 'alchemist',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'epic',
    requiredLevel: 36,

    professionLevel: 36,
    materials: [
      { resourceId: 'plant_moonflower', amount: 7 },
      { resourceId: 'monster_scale', amount: 6 },
      { resourceId: 'ore_adamantite', amount: 4 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'potion_iron_skin', amount: 2 },
    craftTime: 50,
    effects: {
      armor: 80,
      damageReduction: 10,
      duration: 300,
      description: '+80 Armor, +10% damage reduction for 5 minutes'
    }
  },

  {
    id: 'potion_agility',
    name: 'Potion d\'Agilité',
    archetype: 'archer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'uncommon',
    requiredLevel: 15,

    professionLevel: 15,
    materials: [
      { resourceId: 'plant_lavender', amount: 5 },
      { resourceId: 'monster_claw', amount: 3 },
      { resourceId: 'fish_striped_bass', amount: 2 }
    ],
    produces: { resourceId: 'potion_agility', amount: 2 },
    craftTime: 28,
    effects: {
      agility: 28,
      duration: 300,
      description: '+28 Agility for 5 minutes'
    }
  },
  {
    id: 'potion_swiftness',
    name: 'Potion de Rapidité',
    archetype: 'archer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 26,

    professionLevel: 26,
    materials: [
      { resourceId: 'plant_ghostbloom', amount: 6 },
      { resourceId: 'monster_claw', amount: 5 },
      { resourceId: 'fish_moonfish', amount: 3 }
    ],
    produces: { resourceId: 'potion_swiftness', amount: 2 },
    craftTime: 38,
    effects: {
      agility: 42,      movementSpeed: 20,
      duration: 300,
      description: '+42 Agility, +15% attack speed, +20% movement speed for 5 minutes'
    }
  },
  {
    id: 'potion_deadly_precision',
    name: 'Potion de Précision Mortelle',
    archetype: 'archer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'epic',
    requiredLevel: 37,

    professionLevel: 37,
    materials: [
      { resourceId: 'plant_moonflower', amount: 7 },
      { resourceId: 'monster_claw', amount: 6 },
      { resourceId: 'monster_essence', amount: 4 },
      { resourceId: 'fish_silver_eel', amount: 3 }
    ],
    produces: { resourceId: 'potion_deadly_precision', amount: 2 },
    craftTime: 50,
    effects: {
      critChance: 18,
      critDamage: 35,
      accuracy: 40,
      duration: 300,
      description: '+18% crit chance, +35% crit damage, +40 accuracy for 5 minutes'
    }
  },

  {
    id: 'potion_intelligence',
    name: 'Potion d\'Intelligence',
    archetype: 'mage',
    category: 'consumable',
    profession: 'alchemist',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'uncommon',
    requiredLevel: 16,

    professionLevel: 16,
    materials: [
      { resourceId: 'plant_wild_mint', amount: 5 },
      { resourceId: 'monster_essence', amount: 2 },
      { resourceId: 'fish_blue_tuna', amount: 2 }
    ],
    produces: { resourceId: 'potion_intelligence', amount: 2 },
    craftTime: 28,
    effects: {
      intelligence: 55, // 75 + 145 fusionnés
      spellCrit: 15,
      spellPenetration: 20,
      duration: 300,
      description: '+220 Intelligence, +15% spell crit, +20 penetration for 5 minutes'
    }
  },

  {
    id: 'potion_wisdom',
    name: 'Potion de Sagesse',
    archetype: 'healer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 28,

    professionLevel: 28,
    materials: [
      { resourceId: 'plant_wild_mint', amount: 7 },
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'monster_heart', amount: 3 },
      { resourceId: 'fish_golden_carp', amount: 2 }
    ],
    produces: { resourceId: 'potion_wisdom', amount: 2 },
    craftTime: 40,
    effects: {
      wisdom: 48,
      healingPower: 38,
      duration: 300,
      description: '+48 Wisdom, +38 Healing Power for 5 minutes'
    }
  },

  // ============================================
  // ENDGAME ELIXIRS (5 recipes)
  // ============================================

  {
    id: 'elixir_titans_might',
    name: 'Elixir of Titan\'s Might',
    archetype: 'tank',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '⚗️',
    rarity: 'legendary',
    requiredLevel: 46,

    professionLevel: 46,
    materials: [
      { resourceId: 'plant_soulroot', amount: 10 },
      { resourceId: 'monster_heart', amount: 5 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'ore_runite', amount: 8 },
      { resourceId: 'fish_crimson_leviathan', amount: 4 }
    ],
    produces: { resourceId: 'elixir_titans_might', amount: 1 },
    craftTime: 90,
    effects: {
      strength: 80,
      endurance: 70,
      defense: 65,
      health: 300,
      damageReflect: 12,
      duration: 600,
      description: 'Massive tank buff: +80 STR, +70 END, +65 DEF, +300 HP, +12% reflect for 10 minutes'
    }
  },
  {
    id: 'elixir_shadow_assassin',
    name: 'Élixir de l\'Assassin de l\'Ombre',
    archetype: 'archer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '⚗️',
    rarity: 'legendary',
    requiredLevel: 47,

    professionLevel: 47,
    materials: [
      { resourceId: 'plant_soulroot', amount: 10 },
      { resourceId: 'monster_claw', amount: 8 },
      { resourceId: 'monster_essence', amount: 6 },
      { resourceId: 'fabric_spider_silk', amount: 8 },
      { resourceId: 'fish_silver_eel', amount: 5 }
    ],
    produces: { resourceId: 'elixir_shadow_assassin', amount: 1 },
    craftTime: 90,
    effects: {
      agility: 95,
      critChance: 25,
      critDamage: 50,
      backstabDamage: 45,
      stealth: 30,
      duration: 600,
      description: 'Massive archer buff: +95 AGI, +25% crit, +50% crit dmg, +45% backstab, +30 stealth for 10 minutes'
    }
  },
  {
    id: 'elixir_arcane_supremacy',
    name: 'Élixir de Suprématie Arcanique',
    archetype: 'mage',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '⚗️',
    rarity: 'legendary',
    requiredLevel: 48,

    professionLevel: 48,
    materials: [
      { resourceId: 'plant_soulroot', amount: 12 },
      { resourceId: 'plant_moonflower', amount: 10 },
      { resourceId: 'monster_essence', amount: 8 },
      { resourceId: 'ore_runite', amount: 6 },
      { resourceId: 'fish_void_squid', amount: 6 }
    ],
    produces: { resourceId: 'elixir_arcane_supremacy', amount: 1 },
    craftTime: 90,
    effects: {
      intelligence: 61,
      spellCrit: 22,
      spellPenetration: 35,
      manaRegen: 45,
      duration: 600,
      description: 'Massive mage buff: +110 INT, +135 spell power, +22% spell crit, +35 penetration, +45 mana/s for 10 minutes'
    }
  },
  {
    id: 'elixir_divine_grace',
    name: 'Élixir de Grâce Divine',
    archetype: 'healer',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '⚗️',
    rarity: 'legendary',
    requiredLevel: 49,

    professionLevel: 49,
    materials: [
      { resourceId: 'plant_soulroot', amount: 12 },
      { resourceId: 'plant_wild_mint', amount: 10 },
      { resourceId: 'monster_heart', amount: 6 },
      { resourceId: 'monster_essence', amount: 7 },
      { resourceId: 'fish_golden_carp', amount: 5 }
    ],
    produces: { resourceId: 'elixir_divine_grace', amount: 1 },
    craftTime: 90,
    effects: {
      wisdom: 105,
      healingPower: 150,
      healBonus: 35,
      aoeHealBonus: 25,
      manaRegen: 40,
      duration: 600,
      description: 'Massive healer buff: +105 WIS, +150 heal power, +35% heal, +25% AoE heal, +40 mana/s for 10 minutes'
    }
  },
  {
    id: 'elixir_omnipotence',
    name: 'Élixir d\'Omnipotence',
    category: 'consumable',
    profession: 'alchemist',
    tier: 5,
    type: 'consumable',
    slot: 'consumable',
    icon: '⚗️',
    rarity: 'legendary',
    requiredLevel: 50,

    professionLevel: 50,
    materials: [
      { resourceId: 'plant_soulroot', amount: 15 },
      { resourceId: 'plant_moonflower', amount: 12 },
      { resourceId: 'monster_heart', amount: 8 },
      { resourceId: 'monster_essence', amount: 10 },
      { resourceId: 'ore_runite', amount: 10 },
      { resourceId: 'fish_crimson_leviathan', amount: 6 }
    ],
    produces: { resourceId: 'elixir_omnipotence', amount: 1 },
    craftTime: 120,
    effects: {
      allStats: 50,
      allDamage: 30,
      allResist: 25,
      health: 500,
      mana: 500,
      duration: 600,
      description: 'Ultimate buff: +50 all stats, +30% all damage, +25% all resist, +500 HP/MP for 10 minutes'
    }
  },

  // ============================================
  // FOOD BUFFS (10 recipes)
  // ============================================

  {
    id: 'grilled_fish',
    name: 'Poisson Grillé',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 1,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'common',
    requiredLevel: 1,

    professionLevel: 1,
    materials: [
      { resourceId: 'fish_bass', amount: 3 },
      { resourceId: 'plant_thyme', amount: 2 }
    ],
    produces: { resourceId: 'grilled_fish', amount: 4 },
    craftTime: 12,
    effects: {
      healthRegen: 5,
      duration: 180,
      description: '+5 HP/s for 3 minutes'
    }
  },
  {
    id: 'fish_stew',
    name: 'Ragoût de Poisson Copieux',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🍖',
    rarity: 'uncommon',
    requiredLevel: 13,

    professionLevel: 13,
    materials: [
      { resourceId: 'fish_red_snapper', amount: 4 },
      { resourceId: 'plant_sage', amount: 3 },
      { resourceId: 'plant_thyme', amount: 2 }
    ],
    produces: { resourceId: 'fish_stew', amount: 3 },
    craftTime: 25,
    effects: {
      healthRegen: 12,
      endurance: 15,
      duration: 240,
      description: '+12 HP/s, +15 Endurance for 4 minutes'
    }
  },
  {
    id: 'seafood_feast',
    name: 'Festin de Fruits de Mer',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🍖',
    rarity: 'rare',
    requiredLevel: 24,

    professionLevel: 24,
    materials: [
      { resourceId: 'fish_golden_carp', amount: 5 },
      { resourceId: 'fish_giant_catfish', amount: 3 },
      { resourceId: 'plant_lavender', amount: 4 },
      { resourceId: 'plant_wild_mint', amount: 3 }
    ],
    produces: { resourceId: 'seafood_feast', amount: 2 },
    craftTime: 40,
    effects: {
      healthRegen: 25,
      manaRegen: 15,
      allStats: 20,
      duration: 300,
      description: '+25 HP/s, +15 MP/s, +20 all stats for 5 minutes'
    }
  },
  {
    id: 'legendary_banquet',
    name: 'Banquet Légendaire',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'epic',
    requiredLevel: 39,

    professionLevel: 39,
    materials: [
      { resourceId: 'fish_crimson_leviathan', amount: 6 },
      { resourceId: 'fish_silver_eel', amount: 5 },
      { resourceId: 'plant_moonflower', amount: 6 },
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'monster_heart', amount: 2 }
    ],
    produces: { resourceId: 'legendary_banquet', amount: 2 },
    craftTime: 70,
    effects: {
      healthRegen: 50,
      manaRegen: 35,
      allStats: 45,
      expBonus: 15,
      duration: 360,
      description: '+50 HP/s, +35 MP/s, +45 all stats, +15% XP for 6 minutes'
    }
  },

  {
    id: 'combat_ration',
    name: 'Ration de Combat',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'uncommon',
    requiredLevel: 17,

    professionLevel: 17,
    materials: [
      { resourceId: 'fish_striped_bass', amount: 5 },
      { resourceId: 'plant_sage', amount: 4 }
    ],
    produces: { resourceId: 'combat_ration', amount: 5 },
    craftTime: 20,
    effects: {
      strength: 18,
      damage: 10,
      duration: 240,
      description: '+18 Strength, +10% damage for 4 minutes'
    }
  },
  {
    id: 'mana_infused_meal',
    name: 'Repas Infusé de Mana',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🍖',
    rarity: 'rare',
    requiredLevel: 29,

    professionLevel: 29,
    materials: [
      { resourceId: 'fish_moonfish', amount: 6 },
      { resourceId: 'fish_void_squid', amount: 4 },
      { resourceId: 'plant_ghostbloom', amount: 5 },
      { resourceId: 'monster_essence', amount: 3 }
    ],
    produces: { resourceId: 'mana_infused_meal', amount: 2 },
    craftTime: 45,
    effects: {
      intelligence: 22,
      manaRegen: 20,
      duration: 300,
      description: '+40 INT, +48 Spell Power, +20 MP/s for 5 minutes'
    }
  },

  {
    id: 'gatherer_delight',
    name: 'Gatherer\'s Delight',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'uncommon',
    requiredLevel: 18,

    professionLevel: 18,
    materials: [
      { resourceId: 'fish_blue_tuna', amount: 4 },
      { resourceId: 'plant_lavender', amount: 5 },
      { resourceId: 'plant_thyme', amount: 4 }
    ],
    produces: { resourceId: 'gatherer_delight', amount: 3 },
    craftTime: 28,
    effects: {
      gatherSpeed: 25,
      gatherBonus: 10,
      duration: 300,
      description: '+25% gather speed, +10% gather bonus for 5 minutes'
    }
  },
  {
    id: 'crafter_feast',
    name: 'Crafter\'s Feast',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'rare',
    requiredLevel: 31,

    professionLevel: 31,
    materials: [
      { resourceId: 'fish_giant_catfish', amount: 6 },
      { resourceId: 'fish_golden_carp', amount: 5 },
      { resourceId: 'plant_ghostbloom', amount: 6 }
    ],
    produces: { resourceId: 'crafter_feast', amount: 2 },
    craftTime: 50,
    effects: {
      craftSpeed: 30,
      craftQuality: 15,
      professionExp: 20,
      duration: 360,
      description: '+30% craft speed, +15% quality chance, +20% profession XP for 6 minutes'
    }
  },
  {
    id: 'adventurer_meal',
    name: 'Adventurer\'s Meal',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 3,
    type: 'consumable',
    slot: 'consumable',
    icon: '🍖',
    rarity: 'rare',
    requiredLevel: 30,

    professionLevel: 30,
    materials: [
      { resourceId: 'fish_moonfish', amount: 5 },
      { resourceId: 'plant_ghostbloom', amount: 4 },
      { resourceId: 'monster_hide', amount: 3 }
    ],
    produces: { resourceId: 'adventurer_meal', amount: 3 },
    craftTime: 42,
    effects: {
      movementSpeed: 25,
      expBonus: 12,
      goldFind: 10,
      duration: 300,
      description: '+25% movement, +12% XP, +10% gold for 5 minutes'
    }
  },
  {
    id: 'boss_slayer_steak',
    name: 'Steak du Tueur de Boss',
    category: 'consumable',
    profession: 'fishmonger',
    tier: 4,
    type: 'consumable',
    slot: 'consumable',
    icon: '📦',
    rarity: 'epic',
    requiredLevel: 42,

    professionLevel: 42,
    materials: [
      { resourceId: 'fish_crimson_leviathan', amount: 8 },
      { resourceId: 'plant_soulroot', amount: 6 },
      { resourceId: 'monster_heart', amount: 4 },
      { resourceId: 'monster_essence', amount: 4 }
    ],
    produces: { resourceId: 'boss_slayer_steak', amount: 1 },
    craftTime: 80,
    effects: {
      bossDamage: 35,
      critDamage: 30,
      lifesteal: 8,
      damageReduction: 12,
      duration: 480,
      description: '+35% boss damage, +30% crit damage, +8% lifesteal, +12% damage reduction for 8 minutes'
    }
  }
];


