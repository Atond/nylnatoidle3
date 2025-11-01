/**
 * 🗺️ SYSTÈME DE QUÊTES COMPLET - 40 Quêtes Principales
 * 
 * Progression guidée avec déblocage de TOUTES les fonctionnalités :
 * 
 * ✅ CHAPITRE 1 (M01-M10) : Tutoriel & Bases (Niveau 1-10)
 *    - Auto-Combat, Auto-Récolte, Métiers de base, Région 2
 * 
 * ✅ CHAPITRE 2 (M11-M15) : Alt Characters & Donjons (Niveau 30-65)
 *    - Personnages alternatifs, Système Trinity, 5 Donjons, Raids
 * 
 * ✅ CHAPITRE 3 (M16-M20) : Métiers Avancés & Région 3 (Niveau 10-20)
 *    - Alchimie, Transmutation, Pêche, Herboristerie, Dragons unlock
 * 
 * ✅ CHAPITRE 4 (M21-M25) : Craft Tier 3 & Région 4 (Niveau 20-30)
 *    - Premier Dragon, Craft Épique, Exploration, Reproduction Dragons
 * 
 * ✅ CHAPITRE 5 (M26-M30) : Endgame Early & Région 5 (Niveau 30-40)
 *    - Métiers Expert, Craft Tier 4, Boss Région 4, Guilde unlock
 * 
 * ✅ CHAPITRE 6 (M31-M40) : Prestige & Endgame Ultime (Niveau 40-50)
 *    - Craft Tier 5, Dragon Épique, Boss Final, Prestige System, Mode Infini
 */

const QuestsData = [
    
    // ========================================
    // 📖 CHAPITRE 1 : TUTORIEL (Niveau 1-5)
    // ========================================
    
    // M01 : Les Premiers Pas
    {
        id: 'main_001',
        title: '🌟 Les Premiers Pas',
        description: 'Tuez votre premier monstre pour commencer l\'aventure.',
        type: 'kill',
        target: 1,
        chapter: 1,
        difficulty: 'tutorial',
        isMainQuest: true,
        
        requirements: {},
        
        rewards: {
            xp: 50,
            gold: 20,
            unlocks: ['combat_log'], // 🎒 DÉBLOCAGE JOURNAL DE COMBAT
            message: 'Vous avez appris les bases du combat !'
        }
    },
    
    // M02 : Chasseur Débutant
    {
        id: 'main_002',
        title: '⚔️ Chasseur Débutant',
        description: 'Tuez 5 Loups Gris pour prouver votre valeur.',
        type: 'kill',
        target: 5,
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_001',
            monsterName: 'Loup Gris' // ✅ VALIDATION SPÉCIFIQUE DU MONSTRE
        },
        
        rewards: {
            xp: 100,
            gold: 50,
            unlocks: ['gathering_tab', 'profession_woodcutting', 'profession_mining'], // ⛏️ DÉBLOCAGE RÉCOLTE + MÉTIERS DE BASE
            items: [
                { id: 'iron_sword', amount: 1 }
            ],
            message: '🌲 Onglet Récolte débloqué !'
        }
    },
    
    // M03 : Premiers Butins
    {
        id: 'main_003',
        title: '📦 Premiers Butins',
        description: 'Ramassez 10 objets droppés par les monstres.',
        type: 'collect_drops',
        target: 10,
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_002'
        },
        
        rewards: {
            xp: 100,
            gold: 50,
            message: 'Vous apprenez à récupérer les butins des monstres !'
        }
    },
    
    // M04 : Apprenti Bûcheron
    {
        id: 'main_004',
        title: '🪵 Maîtriser le Bûcheronnage',
        description: 'Récoltez 20 Bois de Chêne pour progresser.',
        type: 'collect',
        target: 20,
        requirements: {
            quest: 'main_002', // 🔧 FIX: Apparaît juste après M02 qui débloque la récolte
            resourceType: 'wood',
            resourceName: 'Bois de Chêne'
        },
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        rewards: {
            xp: 120,
            gold: 40,
            message: 'Vous maîtrisez le bûcheronnage !'
        }
    },
    
    // M05 : Apprenti Mineur
    {
        id: 'main_005',
        title: '⛏️ Maîtriser le Minage',
        description: 'Récoltez 20 Minerai de Fer pour progresser.',
        type: 'collect',
        target: 20,
        requirements: {
            quest: 'main_002', // 🔧 FIX: Apparaît juste après M02 qui débloque la récolte
            resourceType: 'ore',
            resourceName: 'Fer'
        },
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        rewards: {
            xp: 120,
            gold: 40,
            unlocks: ['crafting_tab'], // 🔨 DÉBLOCAGE ONGLET FABRICATION (déplacé de M06)
            message: 'Vous maîtrisez le minage ! Fabrication débloquée !'
        }
    },
    
    // M06 : Première Forge
    {
        id: 'main_006',
        title: '🔨 Première Forge',
        description: 'Craftez votre première Épée de Fer pour devenir Forgeron.',
        type: 'craft',
        target: 1,
        requirements: {
            quest: 'main_005',
            craftItem: 'iron_sword'
        },
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        rewards: {
            xp: 200,
            gold: 80,
            unlocks: ['profession_blacksmith', 'equipment_tab'], // 🎒 DÉBLOCAGE FORGERON + ONGLET ÉQUIPEMENT
            message: 'Vous êtes maintenant Forgeron ! Équipez votre épée pour devenir plus fort.'
        }
    },
    
    // M07 : Se Protéger
    {
        id: 'main_007',
        title: '🛡️ Se Protéger',
        description: 'Craftez des Brassards de Fer pour vous protéger au combat.',
        type: 'craft',
        target: 1,
        requirements: {
            quest: 'main_006',
            craftItem: 'iron_bracers' // CORRIGÉ: iron_bracers (Armurier niv 1) au lieu de leather_chest (Tanneur niv 2)
        },
        chapter: 1,
        difficulty: 'easy',
        isMainQuest: true,
        
        rewards: {
            xp: 180,
            gold: 60,
            unlocks: ['profession_armorsmith'], // 🎒 DÉBLOCAGE ARMURIER (equipment_tab déjà unlock en M06)
            message: 'Vous êtes maintenant Armurier !'
        }
    },
    
    // M08 : Monter en Puissance
    {
        id: 'main_008',
        title: '💪 Monter en Puissance',
        description: 'Atteignez le niveau 5 pour devenir plus fort.',
        type: 'level_up',
        target: 5,
        chapter: 1,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_007'
        },
        
        rewards: {
            xp: 300,
            gold: 100,
            items: [
                { id: 'health_potion_minor', amount: 5 }
            ],
            message: 'Vous devenez plus puissant !'
        }
    },
    
    // M09 : Combat Intensif (DÉBLOQUER AUTO-COMBAT)
    {
        id: 'main_009',
        title: '⚡ Guerrier Aguerri',
        description: 'Tuez 50 monstres pour maîtriser le combat automatique.',
        type: 'kill',
        target: 50,
        chapter: 1,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_008',
            level: 5
        },
        
        rewards: {
            xp: 500,
            gold: 200,
            unlocks: ['auto_combat'], // ⚡ DÉBLOCAGE AUTO-COMBAT
            message: '⚡ AUTO-COMBAT DÉBLOQUÉ ! Vous pouvez maintenant combattre automatiquement !'
        }
    },
    
    // M10 : Boss des Plaines (DÉBLOQUER RÉGION 2)
    {
        id: 'main_010',
        title: '👑 Bête des Prairies',
        description: 'Battez le Boss des Plaines pour débloquer la Région 2.',
        type: 'boss_kill',
        target: 1,
        requirements: {
            quest: 'main_009',
            level: 8,
            bossId: 'bete_prairies'
        },
        chapter: 1,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 1000,
            gold: 500,
            unlocks: ['region_2', 'town_tab'],
            items: [
                { id: 'corne_ancienne', amount: 1 },
                { id: 'cuir_legendaire', amount: 1 }
            ],
            message: '🏔️ RÉGION 2 DÉBLOQUÉE ! Les Montagnes Grises vous attendent. Onglet Ville débloqué !'
        }
    },
    
    // M10b : Laboratoire de Recherche (DÉBLOQUER RECHERCHES)
    {
        id: 'main_010b',
        title: '🔬 Laboratoire de Recherche',
        description: 'Atteignez le niveau 15 et construisez une Scierie niveau 5 pour débloquer les Recherches.',
        type: 'building_level',
        building: 'sawmill',
        target: 5,
        chapter: 1,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_010',
            level: 15
        },
        
        rewards: {
            xp: 2500,
            gold: 1500,
            unlocks: ['research_tab'],
            items: [
                { id: 'gems_sapphire', amount: 5 },
                { id: 'gems_ruby', amount: 5 }
            ],
            message: '🔬 RECHERCHES DÉBLOQUÉES ! Investissez dans des améliorations permanentes pour votre empire.'
        }
    },
    
    // M10c : Alchimie Avancée (DÉBLOQUER TRANSMUTATION)
    {
        id: 'main_010c',
        title: '⚗️ Alchimie Avancée',
        description: 'Atteignez le niveau 20 pour débloquer la Transmutation et transformer vos ressources.',
        type: 'level_up',
        target: 20,
        chapter: 1,
        difficulty: 'hard',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_010b'
        },
        
        rewards: {
            xp: 3000,
            gold: 2000,
            unlocks: ['alchemy_tab'],
            items: [
                { id: 'gems_sapphire', amount: 10 },
                { id: 'gems_ruby', amount: 10 }
            ],
            message: '⚗️ TRANSMUTATION DÉBLOQUÉE ! Transformez vos ressources en versions supérieures.'
        }
    },
    
    // ========================================
    // 📖 CHAPITRE 2 : ALT CHARACTERS ET DONJONS (Niveau 30+)
    // ========================================
    
    // M11 : Académie des Héros (DÉBLOQUER ALT CHARACTERS)
    {
        id: 'main_011',
        title: '🎓 Académie des Héros',
        description: 'Vous êtes désormais assez renommé pour entraîner de jeunes apprentis.',
        type: 'level_up',
        target: 30,
        chapter: 2,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_010',
            level: 30
        },
        
        rewards: {
            xp: 5000,
            gold: 2000,
            unlocks: ['alt_characters', 'shared_storage', 'characters_tab'],
            message: '🎭 ALT CHARACTERS DÉBLOQUÉS ! Vous pouvez maintenant recruter et entraîner des apprentis. Coffre partagé débloqué !'
        }
    },
    
    // M12 : Premier Apprenti
    {
        id: 'main_012',
        title: '👥 Premier Apprenti',
        description: 'Recrutez votre premier personnage alternatif (Tank, Heal ou DPS).',
        type: 'create_alt',
        target: 1,
        chapter: 2,
        difficulty: 'easy',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_011',
            level: 30
        },
        
        rewards: {
            xp: 2000,
            gold: 1000,
            items: [
                { id: 'armor_steel_set_tank', amount: 1 },
                { id: 'armor_steel_set_heal', amount: 1 },
                { id: 'armor_steel_set_dps', amount: 1 }
            ],
            message: '✅ Premier apprenti recruté ! Sets d\'armure Acier offerts pour équiper votre alt.'
        }
    },
    
    // M13 : Équipe Trinity
    {
        id: 'main_013',
        title: '⚔️ Formation Trinity',
        description: 'Recrutez 2 autres apprentis pour former une équipe complète (Tank + Heal + DPS).',
        type: 'create_alt',
        target: 3,
        chapter: 2,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_012',
            level: 30
        },
        
        rewards: {
            xp: 5000,
            gold: 3000,
            unlocks: ['dungeons_tab'],
            message: '⚔️ DONJONS DÉBLOQUÉS ! Votre équipe Trinity est prête pour les donjons !'
        }
    },
    
    // M14 : Premier Donjon (CAVERNE DES OMBRES)
    {
        id: 'main_014',
        title: '🏰 Première Expédition',
        description: 'Terminez le donjon "Caverne des Ombres" avec votre équipe Trinity.',
        type: 'complete_dungeon',
        target: 1,
        requirements: {
            quest: 'main_013',
            level: 25,
            dungeonId: 'caverne_ombres',
            hasTrinity: true
        },
        chapter: 2,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 10000,
            gold: 5000,
            items: [
                { id: 'upgrade_token_epic', amount: 3 }
            ],
            message: '🎉 Premier donjon complété ! Tokens d\'amélioration Epic obtenus. Continuez à farmer pour du loot rare !'
        }
    },
    
    // M15 : Maître des Donjons
    {
        id: 'main_015',
        title: '🏆 Maître des Donjons',
        description: 'Complétez tous les 5 donjons au moins une fois.',
        type: 'complete_dungeon',
        target: 5,
        requirements: {
            quest: 'main_014',
            level: 65,
            dungeons: ['caverne_ombres', 'temple_oublie', 'forteresse_dragon', 'sanctuaire_elementaire', 'citadelle_neant']
        },
        chapter: 2,
        difficulty: 'extreme',
        isMainQuest: true,
        
        rewards: {
            xp: 100000,
            gold: 100000,
            items: [
                { id: 'legendary_chest', amount: 1 }
            ],
            unlocks: ['raid_system'],
            message: '🏆 TOUS LES DONJONS COMPLÉTÉS ! Vous êtes un maître des donjons. Système Raid débloqué (à venir) !'
        }
    },
    
    // ========================================
    // 📖 CHAPITRE 3 : MÉTIERS AVANCÉS & RÉGION 3 (Niveau 10-20)
    // ========================================
    
    // M16 : Alchimie 101
    {
        id: 'main_016',
        title: '🧪 Initiation à l\'Alchimie',
        description: 'Atteignez le niveau 10 pour débloquer l\'Alchimie et la Transmutation.',
        type: 'level_up',
        target: 10,
        chapter: 3,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_010',
            level: 10
        },
        
        rewards: {
            xp: 800,
            gold: 400,
            unlocks: ['profession_alchemy'],
            message: '🧪 ALCHIMIE DÉBLOQUÉE ! Vous pouvez maintenant transmuter les ressources.'
        }
    },

    // M16b : Apprenti Tanneur (DÉBLOQUER TANNEUR)
    {
        id: 'main_016b',
        title: '🎒 Apprenti Tanneur',
        description: 'Atteignez le niveau 10 pour maîtriser le traitement des peaux.',
        type: 'level_up',
        target: 10,
        chapter: 3,
        difficulty: 'easy',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_010',
            level: 10
        },
        
        rewards: {
            xp: 300,
            gold: 100,
            unlocks: ['profession_tanner'],
            message: '🎒 MÉTIER TANNEUR DÉBLOQUÉ ! Vous pouvez maintenant traiter les peaux brutes en cuir de qualité.'
        }
    },
    
    // M17 : Pêcheur et Herboriste
    {
        id: 'main_017',
        title: '🎣 Maître des Métiers de la Nature',
        description: 'Atteignez le niveau 10 en Pêche ET en Herboristerie pour maîtriser ces métiers.',
        type: 'profession_level',
        target: 2, // 2 professions à niveau 10
        requirements: {
            quest: 'main_016',
            level: 10,
            professions: ['fisher', 'herbalist'], // ✅ IDs corrects
            professionLevel: 10 // Niveau requis pour chaque profession
        },
        chapter: 3,
        difficulty: 'medium',
        isMainQuest: true,
        
        rewards: {
            xp: 1200,
            gold: 600,
            unlocks: [],
            message: '🌿 Vous maîtrisez maintenant la Pêche et l\'Herboristerie ! Les ressources rares vous attendent.'
        }
    },
    
    // M17b : NOUVELLE QUÊTE - Spécialisation des Métiers (SUPPRIMÉE - Déplacée niveau 20)
    
    // M18 : Transmutation Basique
    {
        id: 'main_018',
        title: '⚗️ Maître de la Transmutation',
        description: 'Effectuez 10 transmutations pour maîtriser l\'art de l\'alchimie.',
        type: 'transmute',
        target: 10,
        requirements: {
            quest: 'main_017',
            level: 15
        },
        chapter: 3,
        difficulty: 'medium',
        isMainQuest: true,
        
        rewards: {
            xp: 1500,
            gold: 800,
            unlocks: ['transmutation_advanced'],
            items: [
                { id: 'wood_maple', amount: 50 },
                { id: 'ore_tin', amount: 50 }
            ],
            message: '⚗️ TRANSMUTATION AVANCÉE ! Vous pouvez maintenant convertir T2→T3.'
        }
    },
    
    // M19 : Boss des Montagnes (DÉBLOQUER RÉGION 3)
    {
        id: 'main_019',
        title: '⛰️ Seigneur des Montagnes',
        description: 'Battez le Boss des Montagnes Grises pour débloquer la Région 3.',
        type: 'boss_kill',
        target: 1,
        requirements: {
            quest: 'main_018',
            level: 18,
            bossId: 'forgemort'
        },
        chapter: 3,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 3000,
            gold: 1500,
            unlocks: ['region_3'],
            items: [
                { id: 'mountain_core', amount: 1 },
                { id: 'steel_ingot_rare', amount: 5 }
            ],
            message: '🌲 RÉGION 3 DÉBLOQUÉE ! La Forêt Éternelle vous attend.'
        }
    },
    
    // M20 : Dragons Unlock
    {
        id: 'main_020',
        title: '🐉 Le Gardien des Dragons',
        description: 'Atteignez le niveau 20 pour débloquer le système Dragons.',
        type: 'level_up',
        target: 20,
        chapter: 3,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_019',
            level: 20
        },
        
        rewards: {
            xp: 4000,
            gold: 2000,
            unlocks: ['dragons_tab', 'dragon_capture'],
            items: [
                { id: 'dragon_egg_novice', amount: 1 }
            ],
            message: '🐉 DRAGONS DÉBLOQUÉS ! Capturez et élevez des dragons légendaires.'
        }
    },
    
    // M20b : QUÊTE SPÉCIALISATION - Maîtrise des Métiers de Récolte
    {
        id: 'main_020b',
        title: '🎯 Maître Artisan des Ressources',
        description: 'Vous avez atteint un niveau de maîtrise exceptionnel. Il est temps de choisir votre spécialisation pour chaque métier de récolte. Chaque choix vous accordera +25% de drop rate sur UNE ressource spécifique.',
        type: 'choose_specialization',
        target: 4, // 4 métiers de récolte (Bûcheron, Mineur, Herboriste, Pêcheur)
        requirements: {
            quest: 'main_020',
            level: 20,
            professions: ['woodcutter', 'miner', 'herbalist', 'fisher'],
            professionLevel: 20 // Tous les métiers de récolte niveau 20
        },
        chapter: 4,
        difficulty: 'hard',
        isMainQuest: true,
        
        // Choix disponibles pour chaque profession
        choices: {
            woodcutter: [
                { resourceId: 'wood_oak', name: 'Spécialiste Chêne', bonus: 0.25, description: '+25% drop Bois de Chêne' },
                { resourceId: 'wood_ash', name: 'Spécialiste Frêne', bonus: 0.25, description: '+25% drop Bois de Frêne' },
                { resourceId: 'wood_maple', name: 'Spécialiste Érable', bonus: 0.25, description: '+25% drop Bois d\'Érable' },
                { resourceId: 'wood_birch', name: 'Spécialiste Bouleau', bonus: 0.25, description: '+25% drop Bois de Bouleau' },
                { resourceId: 'wood_walnut', name: 'Spécialiste Noyer', bonus: 0.25, description: '+25% drop Bois de Noyer' }
            ],
            miner: [
                { resourceId: 'ore_iron', name: 'Spécialiste Fer', bonus: 0.25, description: '+25% drop Fer' },
                { resourceId: 'ore_copper', name: 'Spécialiste Cuivre', bonus: 0.25, description: '+25% drop Cuivre' },
                { resourceId: 'ore_tin', name: 'Spécialiste Étain', bonus: 0.25, description: '+25% drop Étain' },
                { resourceId: 'ore_bronze', name: 'Spécialiste Bronze', bonus: 0.25, description: '+25% drop Bronze' },
                { resourceId: 'ore_silver', name: 'Spécialiste Argent', bonus: 0.25, description: '+25% drop Argent' }
            ],
            herbalist: [
                { resourceId: 'plant_dandelion', name: 'Spécialiste Pissenlit', bonus: 0.25, description: '+25% drop Pissenlit' },
                { resourceId: 'plant_herb', name: 'Spécialiste Herbe médicinale', bonus: 0.25, description: '+25% drop Herbe médicinale' },
                { resourceId: 'plant_nettle', name: 'Spécialiste Ortie', bonus: 0.25, description: '+25% drop Ortie' },
                { resourceId: 'plant_lavender', name: 'Spécialiste Lavande', bonus: 0.25, description: '+25% drop Lavande' },
                { resourceId: 'plant_thyme', name: 'Spécialiste Thym', bonus: 0.25, description: '+25% drop Thym' }
            ],
            fisher: [
                { resourceId: 'fish_stream', name: 'Spécialiste Ruisseau', bonus: 0.25, description: '+25% drop Poisson de ruisseau' },
                { resourceId: 'fish_bass', name: 'Spécialiste Achigan', bonus: 0.25, description: '+25% drop Achigan' },
                { resourceId: 'fish_silver_trout', name: 'Spécialiste Truite', bonus: 0.25, description: '+25% drop Truite argentée' },
                { resourceId: 'fish_golden_perch', name: 'Spécialiste Perche dorée', bonus: 0.25, description: '+25% drop Perche dorée' },
                { resourceId: 'fish_red_snapper', name: 'Spécialiste Vivaneau', bonus: 0.25, description: '+25% drop Vivaneau rouge' }
            ]
        },
        
        rewards: {
            xp: 5000,
            gold: 2500,
            unlocks: ['resource_specialization'],
            items: [
                { id: 'wood_cedar', amount: 100 },
                { id: 'ore_gold', amount: 100 },
                { id: 'plant_rosemary', amount: 100 },
                { id: 'fish_lunar_carp', amount: 100 }
            ],
            message: '🎯 SPÉCIALISATIONS ACTIVES ! Vos choix augmentent vos drops de ressources ciblées de +25%. Vous êtes maintenant un Maître Artisan !'
        }
    },
    
    // ========================================
    // 📖 CHAPITRE 4 : CRAFT TIER 3 & RÉGION 4 (Niveau 20-30)
    // ========================================
    
    // M21 : Premier Dragon Capturé
    {
        id: 'main_021',
        title: '🥚 Premier Dragon',
        description: 'Capturez ou faites éclore votre premier dragon.',
        type: 'dragon_capture',
        target: 1,
        chapter: 4,
        difficulty: 'easy',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_020',
            level: 20
        },
        
        rewards: {
            xp: 3000,
            gold: 1500,
            items: [
                { id: 'dragon_food', amount: 100 }
            ],
            message: '🎉 Premier dragon capturé ! Nourrissez-le pour le faire évoluer.'
        }
    },
    
    // M22 : Craft Tier 3
    {
        id: 'main_022',
        title: '⚒️ Artisan Épique',
        description: 'Craftez votre première pièce d\'équipement Tier 3 (Rare).',
        type: 'craft_tier',
        target: 1,
        requirements: {
            quest: 'main_021',
            level: 23,
            tier: 3
        },
        chapter: 4,
        difficulty: 'medium',
        isMainQuest: true,
        
        rewards: {
            xp: 5000,
            gold: 2500,
            items: [
                { id: 'wood_bamboo', amount: 20 },
                { id: 'ore_mithril', amount: 20 }
            ],
            message: '⚒️ Craft Tier 3 maîtrisé ! Vous êtes un artisan épique.'
        }
    },
    
    // M23 : Exploration Complète Région 3
    {
        id: 'main_023',
        title: '🌲 Explorateur de la Forêt',
        description: 'Explorez toutes les zones de la Forêt Éternelle (Région 3).',
        type: 'explore_region',
        target: 10,
        requirements: {
            quest: 'main_022',
            level: 25,
            region: 3
        },
        chapter: 4,
        difficulty: 'medium',
        isMainQuest: true,
        
        rewards: {
            xp: 6000,
            gold: 3000,
            items: [
                { id: 'ancient_seed', amount: 10 }
            ],
            message: '🌲 Région 3 complètement explorée ! Bonus de drop permanent +5%.'
        }
    },
    
    // M24 : Boss de la Forêt (DÉBLOQUER RÉGION 4)
    {
        id: 'main_024',
        title: '🧝 La Nymphe Sombre',
        description: 'Battez la Nymphe Sombre pour débloquer les Terres Brûlées.',
        type: 'boss_kill',
        target: 1,
        requirements: {
            quest: 'main_023',
            level: 28,
            bossId: 'nymphe_sombre'
        },
        chapter: 4,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 8000,
            gold: 4000,
            unlocks: ['region_4'],
            items: [
                { id: 'nymph_essence', amount: 1 },
                { id: 'wood_ebony', amount: 10 }
            ],
            message: '🔥 RÉGION 4 DÉBLOQUÉE ! Les Terres Brûlées vous attendent.'
        }
    },
    
    // M25 : Reproduction Dragon
    {
        id: 'main_025',
        title: '🐲 Éleveur de Dragons',
        description: 'Faites reproduire deux dragons pour créer un hybride.',
        type: 'dragon_breed',
        target: 1,
        chapter: 4,
        difficulty: 'medium',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_024',
            level: 25
        },
        
        rewards: {
            xp: 7000,
            gold: 3500,
            items: [
                { id: 'dragon_food', amount: 200 },
                { id: 'dragon_egg_rare', amount: 1 }
            ],
            message: '🐲 Hybride créé ! Continuez à élever des dragons puissants.'
        }
    },
    
    // ========================================
    // 📖 CHAPITRE 5 : ENDGAME & RÉGION 5 (Niveau 30-40)
    // ========================================
    
    // M26 : Métiers Expert
    {
        id: 'main_026',
        title: '🎓 Maître Artisan',
        description: 'Montez 3 métiers au niveau 20 pour devenir maître artisan.',
        type: 'profession_level',
        target: 3,
        requirements: {
            quest: 'main_025',
            level: 30,
            professionLevel: 20
        },
        chapter: 5,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 10000,
            gold: 5000,
            unlocks: ['profession_master_bonus'],
            message: '🎓 MAÎTRE ARTISAN ! Bonus permanent +10% XP métiers.'
        }
    },
    
    // M27 : Craft Tier 4
    {
        id: 'main_027',
        title: '💎 Légendaire Forgeron',
        description: 'Craftez votre première pièce d\'équipement Tier 4 (Légendaire).',
        type: 'craft_tier',
        target: 1,
        requirements: {
            quest: 'main_026',
            level: 33,
            tier: 4
        },
        chapter: 5,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 15000,
            gold: 8000,
            items: [
                { id: 'moonwillow_wood', amount: 10 },
                { id: 'adamantite_ore', amount: 10 }
            ],
            message: '💎 Craft Tier 4 maîtrisé ! Vous êtes un légendaire forgeron.'
        }
    },
    
    // M28 : Boss des Terres Brûlées (DÉBLOQUER RÉGION 5)
    {
        id: 'main_028',
        title: '🔥 Le Tyran des Flammes',
        description: 'Battez le Tyran des Flammes pour débloquer la Région 5.',
        type: 'boss_kill',
        target: 1,
        requirements: {
            quest: 'main_027',
            level: 38,
            bossId: 'tyran_flammes'
        },
        chapter: 5,
        difficulty: 'extreme',
        isMainQuest: true,
        
        rewards: {
            xp: 20000,
            gold: 10000,
            unlocks: ['region_5'],
            items: [
                { id: 'flame_core', amount: 1 },
                { id: 'inferno_shard', amount: 5 }
            ],
            message: '⚡ RÉGION 5 DÉBLOQUÉE ! Les Pics Célestes vous défient.'
        }
    },
    
    // M29 : Exploration Région 5
    {
        id: 'main_029',
        title: '⚡ Conquérant des Pics',
        description: 'Explorez toutes les zones des Pics Célestes (Région 5).',
        type: 'explore_region',
        target: 10,
        requirements: {
            quest: 'main_028',
            level: 40,
            region: 5
        },
        chapter: 5,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 25000,
            gold: 12000,
            items: [
                { id: 'celestial_essence', amount: 10 }
            ],
            message: '⚡ Région 5 conquise ! Vous êtes un conquérant légendaire.'
        }
    },
    
    // M30 : Guilde Unlock
    {
        id: 'main_030',
        title: '👥 Fonder une Guilde',
        description: 'Atteignez le niveau 40 pour débloquer le système de Guilde.',
        type: 'level_up',
        target: 40,
        chapter: 5,
        difficulty: 'hard',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_029',
            level: 40
        },
        
        rewards: {
            xp: 30000,
            gold: 15000,
            unlocks: ['guild_tab', 'guild_system'],
            message: '👥 GUILDE DÉBLOQUÉE ! Recrutez des membres et dominez Nyln\'ato.'
        }
    },
    
    // ========================================
    // 📖 CHAPITRE 6 : PRESTIGE & RAIDS (Niveau 40-50)
    // ========================================
    
    // M31 : Craft Tier 5
    {
        id: 'main_031',
        title: '🌟 Artisan Divin',
        description: 'Craftez votre première pièce d\'équipement Tier 5 (Divine).',
        type: 'craft_tier',
        target: 1,
        requirements: {
            quest: 'main_030',
            level: 44,
            tier: 5
        },
        chapter: 6,
        difficulty: 'extreme',
        isMainQuest: true,
        
        rewards: {
            xp: 40000,
            gold: 20000,
            items: [
                { id: 'divine_essence', amount: 5 }
            ],
            message: '🌟 Craft Tier 5 maîtrisé ! Vous êtes un artisan divin.'
        }
    },
    
    // M32 : Dragon Épique
    {
        id: 'main_032',
        title: '🐉 Dragon Épique',
        description: 'Élevez un dragon jusqu\'au Tier 3 (Épique).',
        type: 'dragon_tier',
        target: 1,
        requirements: {
            quest: 'main_031',
            level: 35,
            dragonTier: 3
        },
        chapter: 6,
        difficulty: 'hard',
        isMainQuest: true,
        
        rewards: {
            xp: 35000,
            gold: 18000,
            items: [
                { id: 'dragon_food_premium', amount: 100 }
            ],
            message: '🐉 Dragon Épique élevé ! Votre puissance augmente.'
        }
    },
    
    // M33 : Boss Final Région 5
    {
        id: 'main_033',
        title: '👑 Le Roi des Cieux',
        description: 'Battez le Boss Final de la Région 5 : Le Roi des Cieux.',
        type: 'boss_kill',
        target: 1,
        requirements: {
            quest: 'main_032',
            level: 48,
            bossId: 'roi_cieux'
        },
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        rewards: {
            xp: 50000,
            gold: 25000,
            items: [
                { id: 'crown_of_skies', amount: 1 },
                { id: 'celestial_weapon', amount: 1 }
            ],
            message: '👑 ROI DES CIEUX VAINCU ! Vous dominez Nyln\'ato.'
        }
    },
    
    // M34 : Métiers Légendaires
    {
        id: 'main_034',
        title: '🏆 Légende Vivante',
        description: 'Montez tous vos métiers au niveau 30 minimum.',
        type: 'profession_level',
        target: 8,
        requirements: {
            quest: 'main_033',
            level: 45,
            professionLevel: 30
        },
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        rewards: {
            xp: 60000,
            gold: 30000,
            unlocks: ['legendary_craftsman_bonus'],
            message: '🏆 LÉGENDE VIVANTE ! Bonus permanent +25% qualité crafts.'
        }
    },
    
    // M35 : Niveau 50 Atteint
    {
        id: 'main_035',
        title: '⭐ Apotheose',
        description: 'Atteignez le niveau maximum 50.',
        type: 'level_up',
        target: 50,
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        requirements: {
            quest: 'main_034',
            level: 50
        },
        
        rewards: {
            xp: 0,
            gold: 50000,
            unlocks: ['prestige_system'],
            items: [
                { id: 'prestige_token', amount: 1 }
            ],
            message: '⭐ NIVEAU 50 ATTEINT ! Système Prestige débloqué. Recommencez avec des bonus permanents !'
        }
    },
    
    // M36 : Collection Complète Dragons
    {
        id: 'main_036',
        title: '🐲 Maître des Dragons',
        description: 'Possédez au moins 10 dragons de différents types.',
        type: 'dragon_collection',
        target: 10,
        requirements: {
            quest: 'main_035',
            level: 50
        },
        chapter: 6,
        difficulty: 'extreme',
        isMainQuest: true,
        
        rewards: {
            xp: 0,
            gold: 40000,
            items: [
                { id: 'dragon_egg_legendary', amount: 1 }
            ],
            message: '🐲 Collection de dragons complète ! Œuf légendaire obtenu.'
        }
    },
    
    // M37 : All Bosses Defeated
    {
        id: 'main_037',
        title: '⚔️ Tueur de Boss Ultime',
        description: 'Battez tous les boss régionaux au moins une fois.',
        type: 'boss_kill',
        target: 5,
        requirements: {
            quest: 'main_036',
            level: 50,
            bosses: ['bete_prairies', 'forgemort', 'nymphe_sombre', 'tyran_flammes', 'roi_cieux']
        },
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        rewards: {
            xp: 0,
            gold: 60000,
            items: [
                { id: 'boss_trophy', amount: 5 }
            ],
            unlocks: ['boss_rush_mode'],
            message: '⚔️ TOUS LES BOSS VAINCUS ! Mode Boss Rush débloqué.'
        }
    },
    
    // M38 : Richesse Légendaire
    {
        id: 'main_038',
        title: '💰 Magnat de Nyln\'ato',
        description: 'Accumulez 1,000,000 d\'or.',
        type: 'gold_total',
        target: 1000000,
        requirements: {
            quest: 'main_037',
            level: 50
        },
        chapter: 6,
        difficulty: 'extreme',
        isMainQuest: true,
        
        rewards: {
            xp: 0,
            gold: 100000,
            unlocks: ['merchant_guild'],
            message: '💰 MAGNAT ! Guilde Marchande débloquée. Commerce inter-prestige activé.'
        }
    },
    
    // M39 : Équipement Parfait
    {
        id: 'main_039',
        title: '✨ Équipement Ultime',
        description: 'Équipez un set complet Tier 5 (Divine) avec tous les slots remplis.',
        type: 'equipment_tier',
        target: 1,
        requirements: {
            quest: 'main_038',
            level: 50,
            equipmentTier: 5
        },
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        rewards: {
            xp: 0,
            gold: 80000,
            items: [
                { id: 'divine_enhancement_stone', amount: 10 }
            ],
            message: '✨ ÉQUIPEMENT ULTIME ! Votre puissance est inégalée.'
        }
    },
    
    // M40 : Prêt pour le Prestige
    {
        id: 'main_040',
        title: '🌟 L\'Ascension',
        description: 'Complétez toutes les quêtes et préparez-vous pour le Prestige.',
        type: 'quest_completion',
        target: 39,
        requirements: {
            quest: 'main_039',
            level: 50,
            completedQuests: 39
        },
        chapter: 6,
        difficulty: 'legendary',
        isMainQuest: true,
        
        rewards: {
            xp: 0,
            gold: 200000,
            items: [
                { id: 'prestige_token', amount: 3 }
            ],
            unlocks: ['infinite_mode', 'prestige_shop'],
            message: '🌟 TOUTES LES QUÊTES COMPLÉTÉES ! Vous êtes prêt pour l\'Ascension. Le voyage infini commence...'
        }
    }
];

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.QuestsData = QuestsData;
}
