/**
 * Configuration étendue des recettes de craft - 160+ nouvelles recettes
 * Système d'archétypes : Tank, Archer, Mage, Healer
 * Intégration complète des loots de monstres
 */

window.CraftRecipesExtended = [
    
    // ========================================
    // FORGERON - ARMES
    // ========================================
    
    // ========== ARMES TANK (Épées à une main + Boucliers) ==========
    
    // Tier 1 (Niveau 1-10)
    {
        id: 'bronze_sword_tank',
        name: 'Épée de Bronze',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'common',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 3,
        materials: [
            { resourceId: 'ore_copper', amount: 12 },
            { resourceId: 'wood_ash', amount: 6 },
            { resourceId: 'monster_hide', amount: 3 }
        ],
        craftTime: 2500,
        stats: {
            force: 5,
            damage: 7,
            defense: 1
        },
        requiredLevel: 4,
        description: 'Une épée courte en bronze. Fiable pour un tank débutant.'
    },
    
    {
        id: 'wooden_shield',
        name: 'Bouclier de Bois',
        type: 'shield',
        slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
        icon: '🛡️',
        rarity: 'common',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'wood_oak', amount: 15 },
            { resourceId: 'ore_iron', amount: 5 },
            { resourceId: 'monster_hide', amount: 5 }
        ],
        craftTime: 2000,
        stats: {
            defense: 11,
            endurance: 8,
            blockChance: 10 // 10% de bloquer une attaque
        },
        requiredLevel: 2,
        description: 'Un bouclier simple mais efficace pour se protéger.'
    },
    
    {
        id: 'reinforced_mace',
        name: 'Masse Renforcée',
        type: 'weapon',
        slot: 'weapon',
        icon: '🔨',
        rarity: 'uncommon',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 6,
        materials: [
            { resourceId: 'ore_tin', amount: 18 },
            { resourceId: 'wood_maple', amount: 10 },
            { resourceId: 'loot_os_massif', amount: 4 }
        ],
        craftTime: 3000,
        stats: {
            force: 10,
            damage: 12,
            endurance: 4,
            stunChance: 15 // 15% chance d'étourdir
        },
        requiredLevel: 8,
        description: 'Une masse lourde capable d\'assommer les ennemis.'
    },
    
    // Tier 2 (Niveau 11-20)
    {
        id: 'iron_longsword_tank',
        name: 'Longue Épée de Fer',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'uncommon',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 8,
        materials: [
            { resourceId: 'ore_bronze', amount: 20 },
            { resourceId: 'wood_birch', amount: 12 },
            { resourceId: 'loot_cuir_robuste', amount: 6 }
        ],
        craftTime: 3500,
        stats: {
            force: 14,
            damage: 16,
            defense: 3,
            agility: -2 // Malus : arme lourde
        },
        requiredLevel: 10,
        description: 'Une épée longue et lourde. Puissante mais lente.'
    },
    
    {
        id: 'iron_shield',
        name: 'Bouclier de Fer',
        type: 'shield',
        slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
        icon: '🛡️',
        rarity: 'uncommon',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 7,
        materials: [
            { resourceId: 'ore_bronze', amount: 22 },
            { resourceId: 'wood_walnut', amount: 10 },
            { resourceId: 'loot_armure_cabossee', amount: 3 }
        ],
        craftTime: 3000,
        stats: {
            defense: 18,
            endurance: 14,
            blockChance: 18,
            force: 2
        },
        requiredLevel: 12,
        description: 'Un bouclier en fer capable de bloquer les coups puissants.'
    },
    
    {
        id: 'war_axe',
        name: 'Hache de Guerre',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪓',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 10,
        materials: [
            { resourceId: 'ore_silver', amount: 18 },
            { resourceId: 'wood_cedar', amount: 12 },
            { resourceId: 'loot_corne_ancienne', amount: 2 }
        ],
        craftTime: 4000,
        stats: {
            force: 19,
            damage: 21,
            critChance: 12,
            agility: -3
        },
        requiredLevel: 15,
        description: 'Une hache massive pour fendre les armures ennemies.'
    },
    
    // Tier 3 (Niveau 21-30)
    {
        id: 'steel_greatsword',
        name: 'Grande Épée d\'Acier',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚔️',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 13,
        materials: [
            { resourceId: 'ore_gold', amount: 25 },
            { resourceId: 'ore_steel', amount: 15 },
            { resourceId: 'wood_yew', amount: 10 }
        ],
        craftTime: 5000,
        stats: {
            force: 24,
            damage: 27,
            defense: 6,
            endurance: 8,
            agility: -5
        },
        requiredLevel: 20,
        description: 'Une épée immense nécessitant une grande force pour être maniée.'
    },
    
    {
        id: 'tower_shield',
        name: 'Bouclier-Tour',
        type: 'shield',
        slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
        icon: '🛡️',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 12,
        materials: [
            { resourceId: 'ore_mithril', amount: 20 },
            { resourceId: 'wood_elm', amount: 15 }
        ],
        craftTime: 4500,
        stats: {
            defense: 30,
            endurance: 24,
            blockChance: 25,
            force: 3,
            agility: -8 // Très lourd
        },
        requiredLevel: 22,
        description: 'Un bouclier massif qui protège tout le corps.'
    },
    
    // ========== ARMES ARCHER (Arcs, Dagues) ==========
    
    // Tier 1 (Niveau 1-10)
    {
        id: 'simple_bow',
        name: 'Arc Simple',
        type: 'weapon',
        slot: 'weapon',
        icon: '🏹',
        rarity: 'common',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 1,
        materials: [
            { resourceId: 'wood_oak', amount: 12 },
            { resourceId: 'loot_plumes_sombres', amount: 5 }
        ],
        craftTime: 1500,
        stats: {
            damage: 6,
            agility: 8,
            critChance: 5
        },
        requiredLevel: 1,
        description: 'Un arc basique pour débuter la vie d\'archer.'
    },
    
    {
        id: 'iron_dagger',
        name: 'Dague de Fer',
        type: 'weapon',
        slot: 'weapon',
        icon: '🗡️',
        rarity: 'common',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'ore_iron', amount: 8 },
            { resourceId: 'wood_ash', amount: 4 },
            { resourceId: 'loot_griffes_usees', amount: 3 }
        ],
        craftTime: 1800,
        stats: {
            damage: 7,
            agility: 10,
            critChance: 8,
            force: 2
        },
        requiredLevel: 3,
        description: 'Une dague rapide et mortelle. Idéale pour les attaques furtives.'
    },
    
    {
        id: 'hunter_bow',
        name: 'Arc de Chasseur',
        type: 'weapon',
        slot: 'weapon',
        icon: '🏹',
        rarity: 'uncommon',
        archetype: 'archer',
        professionLevel: 5,
        profession: 'blacksmith',
        materials: [
            { resourceId: 'wood_maple', amount: 15 },
            { resourceId: 'ore_copper', amount: 5 },
            { resourceId: 'loot_plumes_sombres', amount: 10 }
        ],
        craftTime: 2500,
        stats: {
            damage: 12,
            agility: 15,
            critChance: 12,
            dexterity: 5
        },
        requiredLevel: 8,
        description: 'Un arc bien équilibré pour les chasseurs expérimentés.'
    },
    
    // Tier 2 (Niveau 11-20)
    {
        id: 'ranger_longbow',
        name: 'Arc Long de Rôdeur',
        type: 'weapon',
        slot: 'weapon',
        icon: '🏹',
        rarity: 'uncommon',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 8,
        materials: [
            { resourceId: 'wood_birch', amount: 20 },
            { resourceId: 'ore_bronze', amount: 8 },
            { resourceId: 'loot_cuir_robuste', amount: 5 }
        ],
        craftTime: 3000,
        stats: {
            damage: 18,
            agility: 20,
            critChance: 18,
            dexterity: 8,
            range: 15 // Portée augmentée
        },
        requiredLevel: 12,
        description: 'Un arc long avec une portée exceptionnelle.'
    },
    
    {
        id: 'assassin_dagger',
        name: 'Dague d\'Assassin',
        type: 'weapon',
        slot: 'weapon',
        icon: '🗡️',
        rarity: 'rare',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 10,
        materials: [
            { resourceId: 'ore_silver', amount: 15 },
            { resourceId: 'wood_walnut', amount: 8 },
            { resourceId: 'loot_crocs_venimeux', amount: 4 }
        ],
        craftTime: 3500,
        stats: {
            damage: 15,
            agility: 25,
            critChance: 25,
            poisonDamage: 5, // Dégâts de poison
            backstabBonus: 50 // +50% dégâts dans le dos
        },
        requiredLevel: 15,
        description: 'Une dague enduite de venin. Mortelle en attaque sournoise.'
    },
    
    // Tier 3 (Niveau 21-30)
    {
        id: 'elven_bow',
        name: 'Arc Elfique',
        type: 'weapon',
        slot: 'weapon',
        icon: '🏹',
        rarity: 'rare',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 13,
        materials: [
            { resourceId: 'wood_elm', amount: 25 },
            { resourceId: 'ore_mithril', amount: 10 },
            { resourceId: 'gem_emerald', amount: 2 }
        ],
        craftTime: 4500,
        stats: {
            damage: 27,
            agility: 30,
            critChance: 28,
            dexterity: 15,
            range: 20,
            piercing: 10 // 10% chance de percer l'armure
        },
        requiredLevel: 22,
        description: 'Un arc légendaire forgé selon les techniques elfiques.'
    },
    
    // ========== ARMES MAGE (Bâtons, Sceptres) ==========
    
    // Tier 1 (Niveau 1-10)
    {
        id: 'apprentice_staff',
        name: 'Bâton d\'Apprenti',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪄',
        rarity: 'common',
        archetype: 'mage',
        profession: 'blacksmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'wood_oak', amount: 10 },
            { resourceId: 'gem_quartz', amount: 1 },
            { resourceId: 'loot_essence_vegetale_instable', amount: 2 }
        ],
        craftTime: 2000,
        stats: {
            intelligence: 6, // 18 (INT) + 5 (ancien spellPower)
            wisdom: 6,
            damage: 3
        },
        requiredLevel: 1,
        description: 'Une simple baguette pour lancer des sorts mineurs.'
    },
    
    {
        id: 'mystic_staff',
        name: 'Bâton Mystique',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪄',
        rarity: 'uncommon',
        archetype: 'mage',
        profession: 'blacksmith',
        professionLevel: 6,
        materials: [
            { resourceId: 'wood_maple', amount: 12 },
            { resourceId: 'gem_sapphire', amount: 2 },
            { resourceId: 'loot_essence_vegetale_instable', amount: 5 }
        ],
        craftTime: 2800,
        stats: {
            intelligence: 7
        },
        requiredLevel: 8,
        description: 'Un bâton imprégné d\'énergie magique.'
    },
    
    // Tier 2 (Niveau 11-20)
    {
        id: 'sorcerer_staff',
        name: 'Bâton de Sorcier',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪄',
        rarity: 'uncommon',
        archetype: 'mage',
        profession: 'blacksmith',
        professionLevel: 9,
        materials: [
            { resourceId: 'wood_walnut', amount: 15 },
            { resourceId: 'gem_sapphire', amount: 3 },
            { resourceId: 'ore_silver', amount: 5 }
        ],
        craftTime: 3500,
        stats: {
            intelligence: 10,
            critSpell: 10 // 10% chance sort critique
        },
        requiredLevel: 12,
        description: 'Un bâton puissant pour les sorciers confirmés.'
    },
    
    {
        id: 'arcane_scepter',
        name: 'Sceptre Arcane',
        type: 'weapon',
        slot: 'weapon',
        icon: '🔮',
        rarity: 'rare',
        archetype: 'mage',
        profession: 'blacksmith',
        professionLevel: 11,
        materials: [
            { resourceId: 'wood_cedar', amount: 12 },
            { resourceId: 'ore_gold', amount: 8 },
            { resourceId: 'gem_ruby', amount: 2 },
            { resourceId: 'loot_essence_vie_sauvage', amount: 3 }
        ],
        craftTime: 4000,
        stats: {
            intelligence: 12,
            critSpell: 15
        },
        requiredLevel: 15,
        description: 'Un sceptre canalisant l\'énergie arcanique pure.'
    },
    
    // Tier 3 (Niveau 21-30)
    {
        id: 'archmage_staff',
        name: 'Bâton d\'Archimage',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪄',
        rarity: 'rare',
        archetype: 'mage',
        profession: 'blacksmith',
        professionLevel: 14,
        materials: [
            { resourceId: 'wood_sequoia', amount: 20 },
            { resourceId: 'ore_mithril', amount: 10 },
            { resourceId: 'gem_diamond', amount: 3 }
        ],
        craftTime: 5000,
        stats: {
            intelligence: 19,
            critSpell: 20,
            spellPenetration: 15 // 15% ignore résistance magique
        },
        requiredLevel: 22,
        description: 'Le bâton ultime des maîtres de la magie.'
    },
    
    // ========== ARMES HEALER (Totems, Bâtons de soin) ==========
    
    // Tier 1 (Niveau 1-10)
    {
        id: 'healing_wand',
        name: 'Baguette de Soin',
        type: 'weapon',
        slot: 'weapon',
        icon: '⚕️',
        rarity: 'common',
        archetype: 'healer',
        profession: 'blacksmith',
        professionLevel: 2,
        materials: [
            { resourceId: 'wood_oak', amount: 8 },
            { resourceId: 'plant_medicinal_herb', amount: 5 },
            { resourceId: 'gem_quartz', amount: 1 }
        ],
        craftTime: 1800,
        stats: {
            wisdom: 12,
            intelligence: 4,
            healing: 20,
            hpRegen: 2 // Régénération HP passive
        },
        requiredLevel: 3,
        description: 'Un totem spirituel qui augmente les soins.'
    },
    
    {
        id: 'life_staff',
        name: 'Bâton de Vie',
        type: 'weapon',
        slot: 'weapon',
        icon: '🌿',
        rarity: 'uncommon',
        archetype: 'healer',
        profession: 'blacksmith',
        professionLevel: 6,
        materials: [
            { resourceId: 'wood_maple', amount: 12 },
            { resourceId: 'plant_sage', amount: 8 },
            { resourceId: 'gem_emerald', amount: 1 },
            { resourceId: 'loot_essence_vegetale_instable', amount: 4 }
        ],
        craftTime: 2800,
        stats: {
            wisdom: 20,
            intelligence: 8,
            healing: 45,
            manaRegen: 8,
            hpRegen: 5,
            healBonus: 15 // +15% efficacité soins
        },
        requiredLevel: 12,
        description: 'Un bâton béni par les dieux de la vie.'
    },
    
    {
        id: 'restoration_totem',
        name: 'Totem de Restauration',
        type: 'weapon',
        slot: 'weapon',
        icon: '🗿',
        rarity: 'rare',
        archetype: 'healer',
        profession: 'blacksmith',
        professionLevel: 11,
        materials: [
            { resourceId: 'wood_yew', amount: 12 },
            { resourceId: 'plant_lavender', amount: 8 },
            { resourceId: 'loot_essence_vie_sauvage', amount: 5 }
        ],
        craftTime: 4000,
        stats: {
            wisdom: 32,
            intelligence: 12,
            healing: 80,
            manaRegen: 15,
            hpRegen: 12,
            healBonus: 30,
            aoeHeal: 20,
            resurrection: 1 // Peut ressusciter 1 fois par combat
        },
        requiredLevel: 22,
        description: 'Le bâton ultime des grands prêtres. Peut ramener les morts à la vie.'
    },
    
    // ========================================
    // NOUVELLES RECETTES UTILISANT MONSTER DROPS
    // ========================================
    
    // ALCHIMISTE - Potions avec drops monstres
    {
        id: 'poison_vial',
        name: 'Fiole de Poison',
        type: 'consumable',
        slot: 'consumable',
        icon: '🧪',
        rarity: 'uncommon',
        archetype: 'universal',
        profession: 'alchemist',
        professionLevel: 5,
        materials: [
            { resourceId: 'crocs_venimeux', amount: 3 },
            { resourceId: 'plumes_sombres', amount: 5 },
            { resourceId: 'plant_nightshade', amount: 4 }
        ],
        craftTime: 3000,
        stats: {
            poisonDamage: 50,
            poisonDuration: 10 // 10 secondes
        },
        requiredLevel: 8,
        description: 'Poison mortel créé à partir de crocs venimeux. Inflige des dégâts continus.'
    },
    
    {
        id: 'elixir_ferocity',
        name: 'Élixir de Férocité',
        type: 'consumable',
        slot: 'consumable',
        icon: '🍷',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'alchemist',
        professionLevel: 12,
        materials: [
            { resourceId: 'sang_concentre', amount: 3 },
            { resourceId: 'griffes_usees', amount: 8 },
            { resourceId: 'plant_dragonroot', amount: 5 }
        ],
        craftTime: 4000,
        stats: {
            forceBuff: 25,
            critBonus: 15,
            duration: 300 // 5 minutes
        },
        requiredLevel: 18,
        description: 'Élixir puissant augmentant force et taux de critique.'
    },
    
    {
        id: 'shadow_essence_potion',
        name: 'Potion d\'Essence d\'Ombre',
        type: 'consumable',
        slot: 'consumable',
        icon: '🌑',
        rarity: 'epic',
        archetype: 'mage',
        profession: 'alchemist',
        professionLevel: 18,
        materials: [
            { resourceId: 'essence_vegetale_instable', amount: 5 },
            { resourceId: 'aile_chauve_souris', amount: 6 },
            { resourceId: 'plant_deathcap', amount: 4 }
        ],
        craftTime: 5000,
        stats: {
            intelligenceBuff: 30,
            spellPower: 40,
            shadowDamage: 25,
            duration: 600 // 10 minutes
        },
        requiredLevel: 28,
        description: 'Potion mystique canalisant les énergies de l\'ombre.'
    },
    
    // BIJOUTIER - Accessoires avec drops rares
    {
        id: 'fang_necklace',
        name: 'Collier de Crocs',
        type: 'accessory',
        slot: 'amulet',
        icon: '📿',
        rarity: 'uncommon',
        archetype: 'universal',
        profession: 'jeweler',
        professionLevel: 8,
        materials: [
            { resourceId: 'croc_acere', amount: 5 },
            { resourceId: 'ore_silver', amount: 8 },
            { resourceId: 'fabric_linen', amount: 4 }
        ],
        craftTime: 3500,
        stats: {
            force: 8,
            critChance: 5,
            lifesteal: 3 // 3% vol de vie
        },
        requiredLevel: 12,
        description: 'Collier fait de crocs acérés. Absorbe la vie des ennemis.'
    },
    
    {
        id: 'crystal_ring',
        name: 'Anneau de Cristal',
        type: 'accessory',
        slot: 'ring1',
        icon: '💍',
        rarity: 'rare',
        archetype: 'mage',
        profession: 'jeweler',
        professionLevel: 15,
        materials: [
            { resourceId: 'cristal_montagne', amount: 3 },
            { resourceId: 'gem_sapphire', amount: 2 },
            { resourceId: 'ore_mithril', amount: 10 }
        ],
        craftTime: 4500,
        stats: {
            intelligence: 18,
            manaRegen: 12,
            spellCrit: 8
        },
        requiredLevel: 22,
        description: 'Anneau serti d\'un cristal de montagne magique.'
    },
    
    {
        id: 'horn_amulet',
        name: 'Amulette de Corne Ancienne',
        type: 'accessory',
        slot: 'amulet',
        icon: '🦌',
        rarity: 'legendary',
        archetype: 'healer',
        profession: 'jeweler',
        professionLevel: 25,
        materials: [
            { resourceId: 'corne_ancienne', amount: 2 },
            { resourceId: 'gem_diamond', amount: 3 },
            { resourceId: 'ore_adamantite', amount: 12 }
        ],
        craftTime: 6000,
        stats: {
            wisdom: 35,
            healing: 60,
            hpRegen: 15,
            manaRegen: 20,
            resurrect: 1
        },
        requiredLevel: 38,
        description: 'Amulette légendaire conférant des pouvoirs de résurrection.'
    },
    
    // FORGERON - Armes avec drops
    {
        id: 'bone_war_axe',
        name: 'Hache de Guerre en Os',
        type: 'weapon',
        slot: 'weapon',
        icon: '🪓',
        rarity: 'uncommon',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 10,
        materials: [
            { resourceId: 'os_massif', amount: 8 },
            { resourceId: 'ore_iron', amount: 15 },
            { resourceId: 'wood_ash', amount: 10 }
        ],
        craftTime: 3500,
        stats: {
            force: 22,
            damage: 28,
            critChance: 10
        },
        requiredLevel: 16,
        description: 'Hache forgée avec des os de créatures massives.'
    },
    
    {
        id: 'feathered_bow',
        name: 'Arc à Plumes Noires',
        type: 'weapon',
        slot: 'weapon',
        icon: '🏹',
        rarity: 'rare',
        archetype: 'archer',
        profession: 'blacksmith',
        professionLevel: 14,
        materials: [
            { resourceId: 'plume_harpie', amount: 12 },
            { resourceId: 'wood_yew', amount: 15 },
            { resourceId: 'fabric_spider_silk', amount: 6 }
        ],
        craftTime: 4000,
        stats: {
            agility: 28,
            damage: 35,
            critChance: 18,
            attackSpeed: 15
        },
        requiredLevel: 24,
        description: 'Arc légendaire fait de plumes de harpies. Tir ultra-rapide.'
    },
    
    {
        id: 'golem_hammer',
        name: 'Marteau de Golem',
        type: 'weapon',
        slot: 'weapon',
        icon: '🔨',
        rarity: 'epic',
        archetype: 'tank',
        profession: 'blacksmith',
        professionLevel: 20,
        materials: [
            { resourceId: 'fragment_golem', amount: 10 },
            { resourceId: 'ore_runite', amount: 20 },
            { resourceId: 'coeur_montagne', amount: 3 }
        ],
        craftTime: 5500,
        stats: {
            force: 45,
            damage: 60,
            endurance: 25,
            stunChance: 30
        },
        requiredLevel: 32,
        description: 'Marteau massif forgé à partir de fragments de golem de pierre.'
    },
    
    // ARMURIER - Armures avec drops
    {
        id: 'thick_hide_vest',
        name: 'Gilet en Fourrure Épaisse',
        type: 'armor',
        slot: 'chest',
        icon: '🧥',
        rarity: 'uncommon',
        archetype: 'archer',
        profession: 'armorsmith',
        professionLevel: 8,
        materials: [
            { resourceId: 'fourrure_epaisse', amount: 10 },
            { resourceId: 'cuir_robuste', amount: 6 },
            { resourceId: 'fabric_cotton', amount: 5 }
        ],
        craftTime: 3000,
        stats: {
            armor: 18,
            defense: 12,
            endurance: 10,
            coldResist: 15
        },
        requiredLevel: 14,
        description: 'Gilet isolant contre le froid, fait de fourrure épaisse.'
    },
    
    {
        id: 'battered_armor_restored',
        name: 'Armure Cabossée Restaurée',
        type: 'armor',
        slot: 'chest',
        icon: '🛡️',
        rarity: 'rare',
        archetype: 'tank',
        profession: 'armorsmith',
        professionLevel: 16,
        materials: [
            { resourceId: 'armure_cabossee', amount: 3 },
            { resourceId: 'ore_mithril', amount: 15 },
            { resourceId: 'monster_essence', amount: 5 }
        ],
        craftTime: 4500,
        stats: {
            armor: 35,
            defense: 40,
            endurance: 22,
            health: 120
        },
        requiredLevel: 26,
        description: 'Armure ancienne restaurée avec du mithril et de l\'essence magique.'
    },
    
    {
        id: 'legendary_leather_coat',
        name: 'Manteau en Cuir Légendaire',
        type: 'armor',
        slot: 'chest',
        icon: '🧥',
        rarity: 'legendary',
        archetype: 'archer',
        profession: 'armorsmith',
        professionLevel: 28,
        materials: [
            { resourceId: 'cuir_legendaire', amount: 8 },
            { resourceId: 'fabric_spider_silk', amount: 10 },
            { resourceId: 'gem_ruby', amount: 4 }
        ],
        craftTime: 6500,
        stats: {
            armor: 42,
            agility: 45,
            critChance: 20,
            dodgeChance: 18,
            attackSpeed: 12
        },
        requiredLevel: 40,
        description: 'Manteau mythique fait du cuir des créatures les plus légendaires.'
    },
    
    // TANNEUR - Cuirs spéciaux avec drops
    {
        id: 'harpy_leather',
        name: 'Cuir de Harpie',
        type: 'material',
        slot: 'material',
        icon: '🎒',
        rarity: 'rare',
        archetype: 'universal',
        profession: 'tanner',
        professionLevel: 12,
        materials: [
            { resourceId: 'plume_harpie', amount: 15 },
            { resourceId: 'robust_hide', amount: 8 },
            { resourceId: 'plant_sage', amount: 5 }
        ],
        craftTime: 3500,
        produces: { resourceId: 'harpy_leather', amount: 5 },
        requiredLevel: 20,
        description: 'Cuir léger et résistant fait de peaux de harpies.'
    },
    
    {
        id: 'golem_leather',
        name: 'Cuir de Golem',
        type: 'material',
        slot: 'material',
        icon: '🧳',
        rarity: 'epic',
        archetype: 'universal',
        profession: 'tanner',
        professionLevel: 18,
        materials: [
            { resourceId: 'fragment_golem', amount: 12 },
            { resourceId: 'peau_geant', amount: 6 },
            { resourceId: 'ore_mithril', amount: 10 }
        ],
        craftTime: 5000,
        produces: { resourceId: 'golem_leather', amount: 3 },
        requiredLevel: 30,
        description: 'Cuir ultra-résistant infusé de fragments de golem.'
    },
    
    // TAILLEUR - Armures légères avec drops
    {
        id: 'shadow_robe',
        name: 'Robe d\'Ombre',
        type: 'armor',
        slot: 'chest',
        icon: '👘',
        rarity: 'rare',
        archetype: 'mage',
        profession: 'tailor',
        professionLevel: 15,
        materials: [
            { resourceId: 'aile_chauve_souris', amount: 20 },
            { resourceId: 'fabric_silk', amount: 12 },
            { resourceId: 'essence_vegetale_instable', amount: 6 }
        ],
        craftTime: 4000,
        stats: {
            armor: 22,
            intelligence: 35,
            manaRegen: 18,
            shadowResist: 25
        },
        requiredLevel: 25,
        description: 'Robe tissée avec des ailes de chauve-souris. Résiste aux ténèbres.'
    }
    
    // ... Plus de recettes à venir (accessoires, boucliers, etc.) ...
];

console.log(`✅ ${window.CraftRecipesExtended.length} recettes étendues chargées`);
