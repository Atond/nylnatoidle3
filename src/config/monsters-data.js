/**
 * Données des Monstres - Toutes Régions
 * 
 * Structure : common, rare, elite, boss
 * Stats : HP, Attaque, Défense, Vitesse (ms entre attaques)
 * Récompenses : XP, Or
 * 
 * Scaling : Les stats augmentent avec le niveau de la zone
 */

const MonstersData = {
    
    // ========================================
    // MONSTRES COMMUNS
    // ========================================
    common: {
        
        // === RÉGION 1 : LES PLAINES VERDOYANTES ===
        
        loup_gris: {
            id: 'loup_gris',
            name: "Loup Gris",
            description: "Un loup ordinaire des plaines",
            icon: "🐺",
            type: "beast",
            
            baseStats: {
                hp: 40,        // 25 → 40 (+60%)
                attack: 6,     // 4 → 6 (+2)
                defense: 2,
                speed: 2500
            },
            
            rewards: {
                xp: 12,
                gold: 5
            },
            
            dropTable: ['monster_hide', 'griffes_usees']
        },
        
        sanglier_sauvage: {
            id: 'sanglier_sauvage',
            name: "Sanglier Sauvage",
            description: "Un sanglier agressif",
            icon: "🐗",
            type: "beast",
            
            baseStats: {
                hp: 55,        // 35 → 55 (+57%)
                attack: 8,     // 6 → 8 (+2)
                defense: 3,
                speed: 3000
            },
            
            rewards: {
                xp: 15,
                gold: 8
            },
            
            dropTable: ['monster_hide', 'griffes_usees']
        },
        
        bandit_routes: {
            id: 'bandit_routes',
            name: "Bandit des Routes",
            description: "Un brigand qui détroussait les voyageurs",
            icon: "🗡️",
            type: "humanoid",
            
            baseStats: {
                hp: 48,        // 30 → 48 (+60%)
                attack: 7,     // 5 → 7 (+2)
                defense: 2,
                speed: 2000
            },
            
            rewards: {
                xp: 18,
                gold: 15
            },
            
            dropTable: ['petit_sac_bandit', 'monster_hide']
        },
        
        corbeau_noir: {
            id: 'corbeau_noir',
            name: "Corbeau Noir",
            description: "Un corbeau particulièrement agressif",
            icon: "🦅",
            type: "beast",
            
            baseStats: {
                hp: 25,        // 15 → 25 (+67%)
                attack: 5,     // 3 → 5 (+2)
                defense: 1,
                speed: 1500
            },
            
            rewards: {
                xp: 8,
                gold: 3
            },
            
            dropTable: ['plumes_sombres']
        },
        
        // === RÉGION 2 : LES MONTAGNES GRISES ===
        
        bat_cavernes: {
            id: 'bat_cavernes',
            name: "Chauve-souris des Cavernes",
            description: "Chauve-souris vivant dans les grottes montagneuses",
            icon: "🦇",
            type: "beast",
            
            baseStats: {
                hp: 40,
                attack: 8,
                defense: 3,
                speed: 1800
            },
            
            rewards: {
                xp: 25,
                gold: 10
            },
            
            dropTable: ['aile_chauve_souris', 'croc_acere']
        },
        
        loup_roche: {
            id: 'loup_roche',
            name: "Loup de Roche",
            description: "Loup robuste adapté au terrain montagneux",
            icon: "🐺",
            type: "beast",
            
            baseStats: {
                hp: 55,
                attack: 10,
                defense: 5,
                speed: 2300
            },
            
            rewards: {
                xp: 30,
                gold: 15
            },
            
            dropTable: ['robust_hide', 'fourrure_epaisse', 'croc_acere']
        },
        
        bouc_sauvage: {
            id: 'bouc_sauvage',
            name: "Bouc Sauvage",
            description: "Bouc des montagnes au tempérament agressif",
            icon: "🐐",
            type: "beast",
            
            baseStats: {
                hp: 60,
                attack: 9,
                defense: 6,
                speed: 2600
            },
            
            rewards: {
                xp: 28,
                gold: 12
            },
            
            dropTable: ['robust_hide', 'corne_bouc', 'fourrure_epaisse']
        },
        
        // === RÉGION 3 : LA FORÊT ANCESTRALE ===
        
        loup_bois: {
            id: 'loup_bois',
            name: "Loup des Bois",
            description: "Loup sauvage errant dans la forêt ancestrale",
            icon: "🐺",
            type: "beast",
            
            baseStats: {
                hp: 75,
                attack: 12,
                defense: 7,
                speed: 2200
            },
            
            rewards: {
                xp: 35,
                gold: 18
            },
            
            dropTable: ['peau_epaisse', 'croc_acere']
        },
        
        serpent_sylvestre: {
            id: 'serpent_sylvestre',
            name: "Serpent Sylvestre",
            description: "Serpent venimeux caché dans les fougères",
            icon: "🐍",
            type: "beast",
            
            baseStats: {
                hp: 60,
                attack: 14,
                defense: 5,
                speed: 2000
            },
            
            rewards: {
                xp: 32,
                gold: 16
            },
            
            dropTable: ['dard_venimeux', 'peau_epaisse']
        },
        
        sanglier_racines: {
            id: 'sanglier_racines',
            name: "Sanglier des Racines",
            description: "Sanglier massif vivant près des racines géantes",
            icon: "🐗",
            type: "beast",
            
            baseStats: {
                hp: 85,
                attack: 13,
                defense: 8,
                speed: 2500
            },
            
            rewards: {
                xp: 38,
                gold: 20
            },
            
            dropTable: ['peau_epaisse', 'champignon_commun']
        },
        
        gobelin_forestier: {
            id: 'gobelin_forestier',
            name: "Gobelin Forestier",
            description: "Petite créature rusée et agressive",
            icon: "👺",
            type: "humanoid",
            
            baseStats: {
                hp: 70,
                attack: 11,
                defense: 6,
                speed: 1800
            },
            
            rewards: {
                xp: 30,
                gold: 22
            },
            
            dropTable: ['champignon_commun', 'peau_epaisse']
        },
        
        araignee_geante: {
            id: 'araignee_geante',
            name: "Araignée Géante",
            description: "Araignée monstrueuse tissant des toiles mortelles",
            icon: "🕷️",
            type: "beast",
            
            baseStats: {
                hp: 80,
                attack: 13,
                defense: 6,
                speed: 2000
            },
            
            rewards: {
                xp: 36,
                gold: 20
            },
            
            dropTable: ['soie_araignee', 'dard_venimeux']
        },
        
        loup_garou_jeune: {
            id: 'loup_garou_jeune',
            name: "Jeune Loup-Garou",
            description: "Lycanthrope nouvellement transformé, encore sauvage",
            icon: "🐺",
            type: "monstrous",
            
            baseStats: {
                hp: 90,
                attack: 14,
                defense: 7,
                speed: 2100
            },
            
            rewards: {
                xp: 40,
                gold: 24
            },
            
            dropTable: ['croc_loup_garou', 'peau_epaisse']
        },
        
        fantome_foret: {
            id: 'fantome_foret',
            name: "Fantôme de la Forêt",
            description: "Esprit tourmenté errant dans les bois",
            icon: "👻",
            type: "undead",
            
            baseStats: {
                hp: 65,
                attack: 15,
                defense: 5,
                speed: 1900
            },
            
            rewards: {
                xp: 34,
                gold: 18
            },
            
            dropTable: ['essence_spectrale', 'plume_spectrale']
        },
        
        // === RÉGION 4 : LES TERRES BRÛLÉES ===
        
        scorpion_cendre: {
            id: 'scorpion_cendre',
            name: "Scorpion de Cendre",
            description: "Scorpion du désert adapté aux terres volcaniques",
            icon: "🦂",
            type: "beast",
            
            baseStats: {
                hp: 95,
                attack: 15,
                defense: 9,
                speed: 2100
            },
            
            rewards: {
                xp: 42,
                gold: 25
            },
            
            dropTable: ['carapace_brulee', 'peau_ecailleuse']
        },
        
        lezard_lave: {
            id: 'lezard_lave',
            name: "Lézard de Lave",
            description: "Reptile résistant à la chaleur extrême",
            icon: "🦎",
            type: "beast",
            
            baseStats: {
                hp: 85,
                attack: 14,
                defense: 8,
                speed: 2000
            },
            
            rewards: {
                xp: 40,
                gold: 22
            },
            
            dropTable: ['peau_ecailleuse', 'carapace_brulee']
        },
        
        orc_pillard: {
            id: 'orc_pillard',
            name: "Orc Pillard",
            description: "Guerrier orc brutal en quête de butin",
            icon: "⚔️",
            type: "humanoid",
            
            baseStats: {
                hp: 100,
                attack: 16,
                defense: 10,
                speed: 2400
            },
            
            rewards: {
                xp: 45,
                gold: 30
            },
            
            dropTable: ['morceau_arme_grossiere', 'carapace_brulee']
        },
        
        chien_magma: {
            id: 'chien_magma',
            name: "Chien du Magma",
            description: "Canidé féroce vivant près des rivières de lave",
            icon: "🐕",
            type: "beast",
            
            baseStats: {
                hp: 90,
                attack: 13,
                defense: 7,
                speed: 1900
            },
            
            rewards: {
                xp: 38,
                gold: 20
            },
            
            dropTable: ['peau_ecailleuse', 'carapace_brulee']
        },
        
        // === RÉGION 5 : LE NORD GELÉ ===
        
        loup_blanc: {
            id: 'loup_blanc',
            name: "Loup Blanc",
            description: "Loup arctique adapté au froid extrême",
            icon: "🐺",
            type: "beast",
            
            baseStats: {
                hp: 110,
                attack: 17,
                defense: 10,
                speed: 2100
            },
            
            rewards: {
                xp: 50,
                gold: 28
            },
            
            dropTable: ['fourrure_epaisse_nord', 'griffes_glacees']
        },
        
        ours_polaire: {
            id: 'ours_polaire',
            name: "Ours Polaire",
            description: "Ours massif et redoutable du grand nord",
            icon: "🐻‍❄️",
            type: "beast",
            
            baseStats: {
                hp: 130,
                attack: 18,
                defense: 12,
                speed: 2600
            },
            
            rewards: {
                xp: 55,
                gold: 32
            },
            
            dropTable: ['fourrure_epaisse_nord', 'griffes_glacees']
        },
        
        corbeau_glace: {
            id: 'corbeau_glace',
            name: "Corbeau de Glace",
            description: "Oiseau spectral du blizzard éternel",
            icon: "🦅",
            type: "beast",
            
            baseStats: {
                hp: 95,
                attack: 16,
                defense: 8,
                speed: 1800
            },
            
            rewards: {
                xp: 48,
                gold: 26
            },
            
            dropTable: ['fragment_bois_gele', 'griffes_glacees']
        },
        
        bandit_nordique: {
            id: 'bandit_nordique',
            name: "Guerrier Bandit Nordique",
            description: "Pillard sans honneur du grand nord",
            icon: "⚔️",
            type: "humanoid",
            
            baseStats: {
                hp: 105,
                attack: 15,
                defense: 11,
                speed: 2300
            },
            
            rewards: {
                xp: 52,
                gold: 35
            },
            
            dropTable: ['fragment_bois_gele', 'fourrure_epaisse_nord']
        }
    },
    
    // ========================================
    // MONSTRES RARES
    // ========================================
    rare: {
        
        // === RÉGION 1 : LES PLAINES VERDOYANTES ===
        
        ours_brun: {
            id: 'ours_brun',
            name: "Ours Brun",
            description: "Un ours puissant et territorial",
            icon: "🐻",
            type: "beast",
            spawnChance: 0.15,
            
            baseStats: {
                hp: 80,
                attack: 6,          // RÉDUIT : 12 → 6 (battable sans armure)
                defense: 8,
                speed: 3500
            },
            
            rewards: {
                xp: 40,
                gold: 30
            },
            
            dropTable: ['cuir_robuste', 'griffes_usees']
        },
        
        serpent_venimeux: {
            id: 'serpent_venimeux',
            name: "Serpent Venimeux",
            description: "Serpent aux crochets mortels",
            icon: "🐍",
            type: "beast",
            spawnChance: 0.10,
            
            baseStats: {
                hp: 50,
                attack: 15,
                defense: 4,
                speed: 2000
            },
            
            rewards: {
                xp: 35,
                gold: 25
            },
            
            dropTable: ['crocs_venimeux', 'monster_hide']
        },
        
        epouvantail_anime: {
            id: 'epouvantail_anime',
            name: "Épouvantail Animé",
            description: "Épouvantail possédé par une force obscure",
            icon: "🎃",
            type: "construct",
            spawnChance: 0.12,
            
            baseStats: {
                hp: 60,
                attack: 10,
                defense: 6,
                speed: 2800
            },
            
            rewards: {
                xp: 38,
                gold: 28
            },
            
            dropTable: ['essence_vegetale_instable', 'plumes_sombres']
        },
        
        // === RÉGION 2 : LES MONTAGNES GRISES ===
        
        golem_fissure: {
            id: 'golem_fissure',
            name: "Golem de Pierre Fissuré",
            description: "Ancien gardien de pierre partiellement brisé",
            icon: "🗿",
            type: "construct",
            spawnChance: 0.15,
            
            baseStats: {
                hp: 100,
                attack: 14,
                defense: 12,
                speed: 3500
            },
            
            rewards: {
                xp: 50,
                gold: 35
            },
            
            dropTable: ['fragment_golem', 'cristal_montagne']
        },
        
        harpie_falaises: {
            id: 'harpie_falaises',
            name: "Harpie des Falaises",
            description: "Créature ailée mi-femme mi-oiseau, hostile aux intrus",
            icon: "🦅",
            type: "monstrous",
            spawnChance: 0.12,
            
            baseStats: {
                hp: 65,
                attack: 16,
                defense: 6,
                speed: 2000
            },
            
            rewards: {
                xp: 45,
                gold: 32
            },
            
            dropTable: ['plume_harpie', 'serre_acier']
        },
        
        vautour_charognard: {
            id: 'vautour_charognard',
            name: "Vautour Charognard",
            description: "Énorme charognard des hautes altitudes",
            icon: "🦅",
            type: "beast",
            spawnChance: 0.10,
            
            baseStats: {
                hp: 70,
                attack: 13,
                defense: 5,
                speed: 2200
            },
            
            rewards: {
                xp: 42,
                gold: 30
            },
            
            dropTable: ['plume_harpie', 'croc_acere']
        },
        
        // === RÉGION 3 : LA FORÊT ANCESTRALE ===
        
        dryade_pervertie: {
            id: 'dryade_pervertie',
            name: "Dryade Pervertie",
            description: "Esprit sylvestre corrompu par l'Ombre",
            icon: "🧚",
            type: "monstrous",
            spawnChance: 0.12,
            
            baseStats: {
                hp: 90,
                attack: 16,
                defense: 8,
                speed: 2500
            },
            
            rewards: {
                xp: 55,
                gold: 40
            },
            
            dropTable: ['bois_impregne', 'essence_sylvestre']
        },
        
        champignon_geant: {
            id: 'champignon_geant',
            name: "Champignon Géant Animé",
            description: "Champignon colossal animé par une magie étrange",
            icon: "🍄",
            type: "construct",
            spawnChance: 0.14,
            
            baseStats: {
                hp: 110,
                attack: 14,
                defense: 10,
                speed: 3000
            },
            
            rewards: {
                xp: 52,
                gold: 38
            },
            
            dropTable: ['spore_luminescente', 'bois_impregne']
        },
        
        corbeau_spectral: {
            id: 'corbeau_spectral',
            name: "Corbeau Spectral",
            description: "Oiseau fantomatique aux yeux lumineux",
            icon: "🦅",
            type: "undead",
            spawnChance: 0.10,
            
            baseStats: {
                hp: 75,
                attack: 18,
                defense: 6,
                speed: 1800
            },
            
            rewards: {
                xp: 50,
                gold: 36
            },
            
            dropTable: ['plume_spectrale', 'essence_sylvestre']
        },
        
        sorciere_sylvestre: {
            id: 'sorciere_sylvestre',
            name: "Sorcière Sylvestre",
            description: "Pratiquante de magie noire vivant recluse dans la forêt",
            icon: "🧙‍♀️",
            type: "humanoid",
            spawnChance: 0.12,
            
            baseStats: {
                hp: 95,
                attack: 17,
                defense: 9,
                speed: 2600
            },
            
            rewards: {
                xp: 58,
                gold: 42
            },
            
            dropTable: ['grimoire_dechire', 'seve_corrompue']
        },
        
        // === RÉGION 4 : LES TERRES BRÛLÉES ===
        
        salamandre_ardente: {
            id: 'salamandre_ardente',
            name: "Salamandre Ardente",
            description: "Créature de feu et de lave, dangereuse et rapide",
            icon: "🦎",
            type: "elemental",
            spawnChance: 0.13,
            
            baseStats: {
                hp: 120,
                attack: 18,
                defense: 9,
                speed: 2300
            },
            
            rewards: {
                xp: 60,
                gold: 45
            },
            
            dropTable: ['flamme_instable', 'fragment_basalte']
        },
        
        elementaire_feu: {
            id: 'elementaire_feu',
            name: "Élémentaire de Feu Instable",
            description: "Incarnation chaotique du feu volcanique",
            icon: "🔥",
            type: "elemental",
            spawnChance: 0.11,
            
            baseStats: {
                hp: 110,
                attack: 20,
                defense: 7,
                speed: 2200
            },
            
            rewards: {
                xp: 58,
                gold: 42
            },
            
            dropTable: ['flamme_instable', 'fragment_basalte']
        },
        
        harpie_embrasee: {
            id: 'harpie_embrasee',
            name: "Harpie Embrasée",
            description: "Harpie aux ailes de feu, créature féroce",
            icon: "🦅",
            type: "monstrous",
            spawnChance: 0.10,
            
            baseStats: {
                hp: 100,
                attack: 19,
                defense: 8,
                speed: 2000
            },
            
            rewards: {
                xp: 55,
                gold: 40
            },
            
            dropTable: ['plume_embrasee', 'flamme_instable']
        },
        
        // === RÉGION 5 : LE NORD GELÉ ===
        
        golem_glace: {
            id: 'golem_glace',
            name: "Golem de Glace",
            description: "Gardien de glace animé par une magie ancestrale",
            icon: "🗿",
            type: "construct",
            spawnChance: 0.12,
            
            baseStats: {
                hp: 140,
                attack: 19,
                defense: 14,
                speed: 3000
            },
            
            rewards: {
                xp: 65,
                gold: 48
            },
            
            dropTable: ['eclat_glace_pure', 'essence_glaciale']
        },
        
        morse_geant: {
            id: 'morse_geant',
            name: "Morse Géant",
            description: "Colosse marin aux défenses redoutables",
            icon: "🦭",
            type: "beast",
            spawnChance: 0.11,
            
            baseStats: {
                hp: 150,
                attack: 20,
                defense: 15,
                speed: 2800
            },
            
            rewards: {
                xp: 68,
                gold: 50
            },
            
            dropTable: ['defense_gelee', 'eclat_glace_pure']
        },
        
        esprit_neiges: {
            id: 'esprit_neiges',
            name: "Esprit des Neiges",
            description: "Fantôme éthéré du blizzard éternel",
            icon: "👻",
            type: "undead",
            spawnChance: 0.10,
            
            baseStats: {
                hp: 120,
                attack: 21,
                defense: 10,
                speed: 2200
            },
            
            rewards: {
                xp: 62,
                gold: 46
            },
            
            dropTable: ['ectoplasme_givre', 'essence_glaciale']
        }
    },
    
    // ========================================
    // MONSTRES ÉLITES
    // ========================================
    elite: {
        
        // === RÉGION 1 : LES PLAINES VERDOYANTES ===
        
        troll_collines: {
            id: 'troll_collines',
            name: "Troll des Collines",
            description: "Une créature massive et brutale",
            icon: "👹",
            type: "giant",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 150,
                attack: 20,
                defense: 10,
                speed: 4000
            },
            
            rewards: {
                xp: 80,
                gold: 60
            },
            
            dropTable: ['os_massif', 'cuir_robuste', 'sang_concentre']
        },
        
        chevalier_renegat: {
            id: 'chevalier_renegat',
            name: "Chevalier Renégat",
            description: "Ancien chevalier devenu mercenaire sans honneur",
            icon: "⚔️",
            type: "humanoid",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 120,
                attack: 25,
                defense: 15,
                speed: 2500
            },
            
            rewards: {
                xp: 90,
                gold: 70
            },
            
            dropTable: ['armure_cabossee', 'cuir_robuste']
        },
        
        // === RÉGION 2 : LES MONTAGNES GRISES ===
        
        geant_montagnes: {
            id: 'geant_montagnes',
            name: "Géant des Montagnes",
            description: "Colosse ancestral errant dans les montagnes",
            icon: "👹",
            type: "giant",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 180,
                attack: 22,
                defense: 12,
                speed: 4000
            },
            
            rewards: {
                xp: 100,
                gold: 80
            },
            
            dropTable: ['peau_geant', 'os_massif']
        },
        
        nain_corrompu: {
            id: 'nain_corrompu',
            name: "Nain Traître Corrompu",
            description: "Nain sous l'emprise de Forgemort, l'esprit brisé",
            icon: "🧔",
            type: "humanoid",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 140,
                attack: 24,
                defense: 16,
                speed: 2500
            },
            
            rewards: {
                xp: 95,
                gold: 75
            },
            
            dropTable: ['armure_naine', 'hachette_runique']
        },
        
        // === RÉGION 3 : LA FORÊT ANCESTRALE ===
        
        ent_colerique: {
            id: 'ent_colerique',
            name: "Ent Colérique",
            description: "Ancien arbre vivant en colère contre les intrus",
            icon: "🌳",
            type: "construct",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 200,
                attack: 26,
                defense: 18,
                speed: 4500
            },
            
            rewards: {
                xp: 110,
                gold: 90
            },
            
            dropTable: ['ecorce_vivante', 'essence_sylvestre']
        },
        
        elfe_corrompu: {
            id: 'elfe_corrompu',
            name: "Chasseur Elfe Corrompu",
            description: "Chasseur elfe déchu, maître de l'arc",
            icon: "🏹",
            type: "humanoid",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 160,
                attack: 28,
                defense: 14,
                speed: 2200
            },
            
            rewards: {
                xp: 105,
                gold: 85
            },
            
            dropTable: ['arc_brise', 'essence_sylvestre']
        },
        
        vampire_ancien: {
            id: 'vampire_ancien',
            name: "Vampire Ancien",
            description: "Créature de la nuit aux pouvoirs surnaturels, assoiffée de sang",
            icon: "🧛",
            type: "undead",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 180,
                attack: 30,
                defense: 16,
                speed: 2400
            },
            
            rewards: {
                xp: 115,
                gold: 90
            },
            
            dropTable: ['sang_vampire', 'essence_sylvestre']
        },
        
        liche_corrompue: {
            id: 'liche_corrompue',
            name: "Liche Corrompue",
            description: "Nécromancien immortel, maître de la magie noire",
            icon: "💀",
            type: "undead",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 200,
                attack: 26,
                defense: 18,
                speed: 3000
            },
            
            rewards: {
                xp: 120,
                gold: 95
            },
            
            dropTable: ['phylactere_brise', 'essence_sylvestre']
        },
        
        gardien_ancien: {
            id: 'gardien_ancien',
            name: "Gardien Ancien de la Forêt",
            description: "Ancien protecteur de pierre corrompue par l'Ombre",
            icon: "🗿",
            type: "construct",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 220,
                attack: 24,
                defense: 20,
                speed: 3500
            },
            
            rewards: {
                xp: 110,
                gold: 88
            },
            
            dropTable: ['pierre_gardienne', 'ecorce_vivante']
        },
        
        // === RÉGION 4 : LES TERRES BRÛLÉES ===
        
        orc_berserker: {
            id: 'orc_berserker',
            name: "Guerrier Orc Berserker",
            description: "Orc enragé, combattant avec une force dévastatrice",
            icon: "⚔️",
            type: "humanoid",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 220,
                attack: 30,
                defense: 15,
                speed: 2800
            },
            
            rewards: {
                xp: 120,
                gold: 95
            },
            
            dropTable: ['sang_fusion', 'armure_volcanique']
        },
        
        golem_basalte: {
            id: 'golem_basalte',
            name: "Golem de Basalte",
            description: "Gardien de pierre noire, quasi-indestructible",
            icon: "🗿",
            type: "construct",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 250,
                attack: 28,
                defense: 20,
                speed: 4500
            },
            
            rewards: {
                xp: 115,
                gold: 90
            },
            
            dropTable: ['cristal_ardent', 'armure_volcanique']
        },
        
        // === RÉGION 5 : LE NORD GELÉ ===
        
        yeti_furieux: {
            id: 'yeti_furieux',
            name: "Yéti Furieux",
            description: "Créature légendaire des montagnes enneigées",
            icon: "🦧",
            type: "giant",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 280,
                attack: 32,
                defense: 18,
                speed: 3200
            },
            
            rewards: {
                xp: 130,
                gold: 100
            },
            
            dropTable: ['coeur_gele', 'essence_glaciale']
        },
        
        nordique_spectre: {
            id: 'nordique_spectre',
            name: "Guerrier Nordique Spectre",
            description: "Fantôme de guerrier nordique maudit",
            icon: "👻",
            type: "undead",
            spawnChance: 0.05,
            
            baseStats: {
                hp: 240,
                attack: 30,
                defense: 16,
                speed: 2600
            },
            
            rewards: {
                xp: 125,
                gold: 95
            },
            
            dropTable: ['armure_spectrale', 'essence_glaciale']
        }
    },
    
    // ========================================
    // BOSS
    // ========================================
    boss: {
        
        // === RÉGION 1 : LES PLAINES VERDOYANTES ===
        
        bete_prairies: {
            id: 'bete_prairies',
            name: "La Bête des Prairies",
            description: "Un énorme cerf corrompu aux yeux flamboyants",
            icon: "🦌",
            type: "boss",
            rarity: "boss",
            
            baseStats: {
                hp: 300,       // 500 → 300 (-40%) - Plus accessible niveau 5-10
                attack: 25,    // 30 → 25 (-5) - Moins de one-shot
                defense: 15,   // 20 → 15 (-5) - Joueur fait plus de dégâts
                speed: 3000
            },
            
            rewards: {
                xp: 500,
                gold: 1000
            },
            
            dropTable: ['corne_ancienne', 'cuir_legendaire', 'essence_vie_sauvage'],
            guaranteedDrops: true,
            
            // 🔒 SYSTÈME ANTI-FARMING
            respawnTime: 3600000,  // 1 heure (en millisecondes)
            maxLegendaryDropsPerDay: 3,  // Maximum 3 drops légendaires/jour
            lastKilledTime: null,  // Timestamp du dernier kill
            legendaryDropsToday: 0,  // Compteur journalier
            lastResetDate: null  // Date du dernier reset quotidien
        },
        
        // === RÉGION 2 : LES MONTAGNES GRISES ===
        
        forgemort_boss: {
            id: 'forgemort_boss',
            name: "Forgemort",
            description: "Maître forgeron nain tombé sous l'influence de l'Ombre",
            icon: "⚒️",
            type: "boss",
            isBoss: true,
            rarity: "boss",
            
            baseStats: {
                hp: 800,       // 1200 → 800 (-33%)
                attack: 30,    // 35 → 30 (-5)
                defense: 20,   // 25 → 20 (-5)
                speed: 3000
            },
            
            rewards: {
                xp: 1000,
                gold: 2000
            },
            
            dropTable: ['marteau_forgemort', 'armure_forge_eternelle', 'coeur_forge'],
            guaranteedDrops: true,
            
            // 🔒 SYSTÈME ANTI-FARMING
            respawnTime: 3600000,
            maxLegendaryDropsPerDay: 3,
            lastKilledTime: null,
            legendaryDropsToday: 0,
            lastResetDate: null
        },
        
        // === RÉGION 3 : LA FORÊT ANCESTRALE ===
        
        nymphe_sombre: {
            id: 'nymphe_sombre',
            name: "La Nymphe Sombre",
            description: "Elfe déchue liée à l'Ombre, ancienne gardienne de la forêt",
            icon: "🧝‍♀️",
            type: "boss",
            isBoss: true,
            rarity: "boss",
            
            baseStats: {
                hp: 1200,      // 1800 → 1200 (-33%)
                attack: 35,    // 40 → 35 (-5)
                defense: 23,   // 28 → 23 (-5)
                speed: 2800
            },
            
            rewards: {
                xp: 1500,
                gold: 3000
            },
            
            dropTable: ['larmes_dryade', 'fleur_corrompue', 'essence_nature_dechue'],
            guaranteedDrops: true,
            
            // 🔒 SYSTÈME ANTI-FARMING
            respawnTime: 3600000,
            maxLegendaryDropsPerDay: 3,
            lastKilledTime: null,
            legendaryDropsToday: 0,
            lastResetDate: null
        },
        
        // === RÉGION 4 : LES TERRES BRÛLÉES ===
        
        pretre_brasier: {
            id: 'pretre_brasier',
            name: "Prêtre du Brasier Noir",
            description: "Sorcier de l'Ombre, maître des flammes et des rituels apocalyptiques",
            icon: "🔮",
            type: "boss",
            isBoss: true,
            rarity: "boss",
            
            baseStats: {
                hp: 1600,      // 2500 → 1600 (-36%)
                attack: 40,    // 45 → 40 (-5)
                defense: 27,   // 32 → 27 (-5)
                speed: 2600
            },
            
            rewards: {
                xp: 2000,
                gold: 4000
            },
            
            dropTable: ['cendres_eternelles', 'baton_runique_calcine', 'essence_feu_obscur'],
            guaranteedDrops: true,
            
            // 🔒 SYSTÈME ANTI-FARMING
            respawnTime: 3600000,
            maxLegendaryDropsPerDay: 3,
            lastKilledTime: null,
            legendaryDropsToday: 0,
            lastResetDate: null
        },
        
        // === RÉGION 5 : LE NORD GELÉ ===
        
        heraut_blizzard: {
            id: 'heraut_blizzard',
            name: "Le Héraut du Blizzard Noir",
            description: "Champion de l'Ombre dans le grand nord, maître du froid éternel",
            icon: "❄️",
            type: "boss",
            isBoss: true,
            rarity: "boss",
            
            baseStats: {
                hp: 2200,      // 3200 → 2200 (-31%)
                attack: 45,    // 50 → 45 (-5)
                defense: 30,   // 35 → 30 (-5)
                speed: 2500
            },
            
            rewards: {
                xp: 2500,
                gold: 5000
            },
            
            dropTable: ['cape_blizzard', 'cor_guerre_brise', 'essence_froid_eternel'],
            guaranteedDrops: true,
            
            // 🔒 SYSTÈME ANTI-FARMING
            respawnTime: 3600000,
            maxLegendaryDropsPerDay: 3,
            lastKilledTime: null,
            legendaryDropsToday: 0,
            lastResetDate: null
        }
    },
    
    // ========================================
    // MÉTHODES UTILITAIRES
    // ========================================
    
    /**
     * Obtenir les données d'un monstre par ID
     */
    getMonster(monsterId) {
        // Chercher dans tous les types
        for (const category of ['common', 'rare', 'elite', 'boss']) {
            if (this[category][monsterId]) {
                return this[category][monsterId];
            }
        }
        return null;
    },
    
    /**
     * Obtenir un monstre aléatoire selon les probabilités de spawn
     */
    getRandomMonster(monsterIds) {
        if (!monsterIds || monsterIds.length === 0) return null;
        
        // Récupérer les données complètes des monstres
        const monsters = monsterIds.map(id => this.getMonster(id)).filter(m => m);
        
        // Séparer communs et spéciaux (avec spawnChance)
        const commonMonsters = monsters.filter(m => !m.spawnChance);
        const specialMonsters = monsters.filter(m => m.spawnChance);
        
        // D'abord, tenter de spawn un monstre spécial (rare/elite)
        for (const monster of specialMonsters) {
            if (Math.random() < monster.spawnChance) {
                return monster;
            }
        }
        
        // Sinon, spawn un monstre commun aléatoire
        if (commonMonsters.length > 0) {
            return commonMonsters[Math.floor(Math.random() * commonMonsters.length)];
        }
        
        return null;
    },
    
    /**
     * Calculer les stats avec scaling de niveau
     */
    calculateStats(monsterData, level = 1) {
        const levelMultiplier = 1 + (level - 1) * 0.3; // +30% par niveau
        
        return {
            hp: Math.floor(monsterData.baseStats.hp * levelMultiplier),
            attack: Math.floor(monsterData.baseStats.attack * levelMultiplier),
            defense: Math.floor(monsterData.baseStats.defense * levelMultiplier),
            speed: monsterData.baseStats.speed
        };
    }
};

// Export pour utilisation dans le jeu
if (typeof window !== 'undefined') {
    window.MonstersData = MonstersData;
}
