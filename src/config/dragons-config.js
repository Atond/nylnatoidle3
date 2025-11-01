/**
 * Configuration des Dragons
 * Contient toutes les données pour le système de dragons (types, tiers, génétique, reproduction)
 */

window.DragonsConfig = {
    // Types de dragons purs (5 éléments de base)
    TYPES: {
        fire: {
            raceName: 'Dragon de Feu',
            icon: '🔥',
            color: '#FF4500',
            description: 'Maître des flammes, inflige des dégâts de feu'
        },
        ice: {
            raceName: 'Dragon de Glace',
            icon: '❄️',
            color: '#00BFFF',
            description: 'Contrôle le froid, ralentit les ennemis'
        },
        poison: {
            raceName: 'Dragon de Poison',
            icon: '☠️',
            color: '#9400D3',
            description: 'Empoisonne ses victimes sur la durée'
        },
        earth: {
            raceName: 'Dragon de Terre',
            icon: '🌍',
            color: '#8B4513',
            description: 'Défense robuste, résistance élevée'
        },
        lightning: {
            raceName: 'Dragon de Foudre',
            icon: '⚡',
            color: '#FFD700',
            description: 'Vitesse foudroyante, critiques élevés'
        }
    },

    // Noms des dragons hybrides (croisements)
    HYBRID_NAMES: {
        'fire-ice': 'Dragon de Brume',
        'fire-poison': 'Dragon de Cendres',
        'fire-earth': 'Dragon de Lave',
        'fire-lightning': 'Dragon de Plasma',
        'ice-poison': 'Dragon de Gel Toxique',
        'ice-earth': 'Dragon de Givre',
        'ice-lightning': 'Dragon de Tempête',
        'poison-earth': 'Dragon de Marais',
        'poison-lightning': 'Dragon d\'Acide',
        'earth-lightning': 'Dragon de Métal',
        'fire-ice-poison': 'Dragon d\'Apocalypse',
        'fire-ice-earth': 'Dragon Primordial',
        'fire-ice-lightning': 'Dragon de Chaos',
        'fire-poison-earth': 'Dragon de Corruption',
        'fire-poison-lightning': 'Dragon Radioactif',
        'fire-earth-lightning': 'Dragon de Magma',
        'ice-poison-earth': 'Dragon de Glace Noire',
        'ice-poison-lightning': 'Dragon de Néant',
        'ice-earth-lightning': 'Dragon de Cristal',
        'poison-earth-lightning': 'Dragon de Peste',
        'fire-ice-poison-earth': 'Dragon Cosmique',
        'fire-ice-poison-lightning': 'Dragon Élémentaire',
        'fire-ice-earth-lightning': 'Dragon Ancien',
        'fire-poison-earth-lightning': 'Dragon Abyssal',
        'ice-poison-earth-lightning': 'Dragon Spectral'
    },

    // Tiers de puissance (0 à 6)
    TIERS: {
        tier0: {
            name: 'Commun',
            color: '#808080',
            reproductionCost: 50, // Coût en nourriture
            statMultiplier: 1.0,
            rarity: 'Commun'
        },
        tier1: {
            name: 'Rare',
            color: '#4169E1',
            reproductionCost: 100,
            statMultiplier: 1.5,
            rarity: 'Rare'
        },
        tier2: {
            name: 'Épique',
            color: '#9932CC',
            reproductionCost: 200,
            statMultiplier: 2.0,
            rarity: 'Épique'
        },
        tier3: {
            name: 'Légendaire',
            color: '#FF8C00',
            reproductionCost: 400,
            statMultiplier: 3.0,
            rarity: 'Légendaire'
        },
        tier4: {
            name: 'Mythique',
            color: '#FF1493',
            reproductionCost: 800,
            statMultiplier: 5.0,
            rarity: 'Mythique'
        },
        tier5: {
            name: 'Divin',
            color: '#FFD700',
            reproductionCost: 1600,
            statMultiplier: 8.0,
            rarity: 'Divin'
        },
        tier6: {
            name: 'Transcendant',
            color: '#00FFFF',
            reproductionCost: 3200,
            statMultiplier: 12.0,
            rarity: 'Transcendant'
        }
    },

    // Système génétique
    GENETICS: {
        // Chances de base pour la reproduction
        BASE_PROBABILITIES: {
            tier_up: 0.15,      // 15% de monter d'un tier
            failure: 0.10,      // 10% d'échec (tier 0 garanti)
            same_tier: 0.75     // 75% de garder le tier (calculé automatiquement)
        },

        // Bonus de pureté (dragons de même type)
        PURITY_BONUS: {
            high_purity: 0.10,          // +10% si pureté > 75%
            same_tier_parents: 0.05,    // +5% si les 2 parents ont le même tier
            same_lineage: 0.03          // +3% si les parents ont 1+ type en commun
        },

        // Malus pour hybrides complexes
        HYBRID_PENALTY: {
            two_types: -0.05,    // -5% pour 2 types
            three_types: -0.10,  // -10% pour 3 types
            four_types: -0.15    // -15% pour 4 types
        },

        // Chance de mutation (nouveau type aléatoire)
        MUTATION_CHANCE: 0.05 // 5% de mutation
    },

    // Système de collection
    COLLECTION: {
        maxDragons: 50,           // Limite de dragons vivants
        maxBreedingSlots: 2       // Nombre de parents pour reproduction
    },

    // Système d'entraînement
    TRAINING: {
        trainingCost: (level) => {
            // Coût en nourriture : 10 * (niveau + 1)
            return 10 * (level + 1);
        },
        maxLevel: 100,
        statGainPerLevel: {
            force: 2,
            intelligence: 2,
            defense: 1,
            vitality: 5,
            critChance: 0.1  // 0.1% par niveau
        }
    },

    // Système d'essences
    ESSENCE: {
        droppedOnDeath: 10,     // Essence gagnée quand un dragon meurt
        boostAmount: 10,        // Stats bonus par essence consommée
        costPerBoost: 1         // Nombre d'essences par boost
    },

    // Noms aléatoires pour les dragons
    RANDOM_NAMES: [
        // Noms masculins
        'Alduin', 'Bahamut', 'Smaug', 'Drogon', 'Viserion', 'Rhaegal',
        'Fafnir', 'Nidhogg', 'Tiamat', 'Jormungandr', 'Ancalagon',
        'Glaurung', 'Saphira', 'Toothless', 'Spyro', 'Ignitus',
        
        // Noms féminins
        'Daenerys', 'Arya', 'Sansa', 'Cersei', 'Brienne', 'Melisandre',
        'Ellaria', 'Yara', 'Lyanna', 'Margaery', 'Shae', 'Talisa',
        
        // Noms neutres/fantasy
        'Zephyr', 'Ember', 'Frost', 'Thunder', 'Gale', 'Blaze',
        'Crystal', 'Shadow', 'Eclipse', 'Nova', 'Nebula', 'Quasar',
        'Titan', 'Ragnarok', 'Phoenix', 'Gryphon', 'Chimera', 'Hydra',
        
        // Noms épiques
        'Azuregos', 'Onyxia', 'Nefarian', 'Deathwing', 'Alexstrasza',
        'Ysera', 'Malygos', 'Nozdormu', 'Kalecgos', 'Chromie'
    ],

    // Stats de base d'un dragon tier 0 niveau 1
    BASE_STATS: {
        force: 10,
        intelligence: 10,
        defense: 5,
        vitality: 100,
        critChance: 5  // 5% de base
    }
};

console.log(`✅ Configuration Dragons chargée: ${Object.keys(window.DragonsConfig.TYPES).length} types, ${Object.keys(window.DragonsConfig.TIERS).length} tiers`);
