/**
 * Données des Régions du Jeu
 * 
 * Structure : Régions → Zones → Monstres → Boss
 * Chaque région a sa capitale, ses villes, et son identité
 */

const RegionsData = {
    regions: [
        {
            id: 1,
            name: "Les Plaines Verdoyantes",
            description: "Terres agricoles paisibles où l'humanité prospère",
            icon: "🌾",
            levelRange: { min: 1, max: 10 },
            
            // Faction & Lore
            faction: {
                name: "Les Humains d'Érialis",
                type: "Humains",
                alignment: "Neutre Bon",
                description: "Peuple agricole et commerçant, réputés pour leur courage et leur sens du collectif.",
                strengths: ["Agriculture", "Élevage", "Artisanat de base"],
                military: "Milices locales nombreuses mais peu expérimentées"
            },
            
            // Antagoniste
            antagonist: {
                name: "L'Ombre",
                description: "Force corrompue qui infiltre les champs et possède les bêtes paisibles",
                corruption: "Loups corrompus, Sangliers noirs, Épouvantails vivants"
            },
            
            // Capitale
            capital: {
                id: "erialis",
                name: "Érialis",
                description: "Ville lumineuse, centre agricole et commercial",
                icon: "🏛️",
                unlockLevel: 1 // Accessible dès le début
            },
            
            // Autres villes
            towns: [
                {
                    id: "clairval",
                    name: "Clairval",
                    description: "Village pastoral, réputé pour son bétail",
                    icon: "🐄",
                    unlockLevel: 3
                },
                {
                    id: "fonterive",
                    name: "Fonterive",
                    description: "Bourg au bord de la rivière, connu pour ses moulins",
                    icon: "🌊",
                    unlockLevel: 5
                },
                {
                    id: "brumechene",
                    name: "Brumechêne",
                    description: "Petite bourgade forestière",
                    icon: "🌲",
                    unlockLevel: 7
                }
            ],
            
            // 10 Zones
            zones: [
                {
                    id: 1,
                    name: "Camp des Débutants",
                    description: "Point de départ pour les nouveaux aventuriers",
                    icon: "⛺",
                    levelRange: { min: 1, max: 1 },
                    monsters: {
                        common: ['loup_gris', 'sanglier_sauvage'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 2,
                    name: "Prairie des Brises",
                    description: "Vastes prairies balayées par le vent",
                    icon: "🌾",
                    levelRange: { min: 1, max: 2 },
                    monsters: {
                        common: ['loup_gris', 'sanglier_sauvage', 'corbeau_noir'],
                        rare: ['serpent_venimeux'],
                        elite: []
                    }
                },
                {
                    id: 3,
                    name: "Forêt de Chêneblanc",
                    description: "Forêt de chênes centenaires aux troncs blanchis",
                    icon: "🌳",
                    levelRange: { min: 2, max: 3 },
                    monsters: {
                        common: ['loup_gris', 'corbeau_noir'],
                        rare: ['ours_brun'],
                        elite: []
                    }
                },
                {
                    id: 4,
                    name: "Rivière Chantante",
                    description: "Cours d'eau dont les flots produisent une mélodie apaisante",
                    icon: "🏞️",
                    levelRange: { min: 3, max: 4 },
                    monsters: {
                        common: ['sanglier_sauvage', 'corbeau_noir'],
                        rare: ['serpent_venimeux'],
                        elite: []
                    }
                },
                {
                    id: 5,
                    name: "Collines Dorées",
                    description: "Collines aux herbes dorées par le soleil",
                    icon: "⛰️",
                    levelRange: { min: 4, max: 5 },
                    monsters: {
                        common: ['loup_gris', 'sanglier_sauvage', 'bandit_routes'],
                        rare: ['ours_brun'],
                        elite: ['troll_collines']
                    }
                },
                {
                    id: 6,
                    name: "Forêt des Louveteaux",
                    description: "Repaire des loups, territoire dangereux",
                    icon: "🐺",
                    levelRange: { min: 5, max: 6 },
                    monsters: {
                        common: ['loup_gris'],
                        rare: ['ours_brun'],
                        elite: ['troll_collines']
                    }
                },
                {
                    id: 7,
                    name: "Champs de Tournesols",
                    description: "Immenses champs de tournesols rayonnants",
                    icon: "🌻",
                    levelRange: { min: 6, max: 7 },
                    monsters: {
                        common: ['corbeau_noir', 'bandit_routes'],
                        rare: ['epouvantail_anime'],
                        elite: []
                    }
                },
                {
                    id: 8,
                    name: "Marais Paisible",
                    description: "Marécages calmes mais trompeurs",
                    icon: "🦎",
                    levelRange: { min: 7, max: 8 },
                    monsters: {
                        common: ['serpent_venimeux', 'corbeau_noir'],
                        rare: ['epouvantail_anime'],
                        elite: []
                    }
                },
                {
                    id: 9,
                    name: "Colline aux Moulins",
                    description: "Colline parsemée de vieux moulins à vent",
                    icon: "🌾",
                    levelRange: { min: 8, max: 9 },
                    monsters: {
                        common: ['bandit_routes', 'sanglier_sauvage'],
                        rare: ['epouvantail_anime'],
                        elite: ['chevalier_renegat']
                    }
                },
                {
                    id: 10,
                    name: "Bosquet Lumineux",
                    description: "Bosquet mystique où la lumière danse entre les arbres",
                    icon: "✨",
                    levelRange: { min: 9, max: 10 },
                    monsters: {
                        common: ['loup_gris', 'corbeau_noir'],
                        rare: ['ours_brun', 'epouvantail_anime'],
                        elite: ['troll_collines', 'chevalier_renegat']
                    },
                    isBossZone: true,
                    bossSpawnLogic: "9_normal_then_boss" // 9 monstres normaux, puis boss en 10ème
                }
            ],
            
            // Boss de région
            boss: {
                id: "bete_prairies",
                name: "La Bête des Prairies",
                description: "Un énorme cerf corrompu aux yeux flamboyants",
                icon: "🦌",
                spawnAfterKills: 9, // Dans la zone 10, apparaît après 9 kills
                minLevel: 10, // Niveau minimum recommandé
                uniqueDrop: "corne_ancienne" // Drop légendaire garanti
            }
        },
        
        // Région 2 : Les Montagnes Grises
        {
            id: 2,
            name: "Les Montagnes Grises",
            description: "Pics rocheux battus par les vents où les nains ont bâti leurs forges",
            icon: "⛰️",
            levelRange: { min: 11, max: 20 },
            
            // Faction & Lore
            faction: {
                name: "Les Nains de Granithelm",
                type: "Nains",
                alignment: "Loyal Neutre",
                description: "Maîtres forgerons et mineurs légendaires, gardiens des secrets du métal et de la roche.",
                strengths: ["Forge légendaire", "Minage profond", "Architecture de pierre"],
                military: "Gardes de la montagne, hachettes runiques, armures impénétrables"
            },
            
            // Antagoniste
            antagonist: {
                name: "Forgemort",
                description: "Ancien seigneur de forge nain corrompu par la soif de pouvoir",
                corruption: "A réveillé d'anciens golems et corrompu ses frères pour dominer la montagne"
            },
            
            // Capitale
            capital: {
                id: "granithelm",
                name: "Granithelm",
                description: "Citadelle naine taillée dans la roche, cœur de la forge éternelle",
                icon: "🏔️",
                unlockLevel: 11
            },
            
            // Autres villes
            towns: [
                {
                    id: "hautepic",
                    name: "Hautepic",
                    description: "Avant-poste nain sur les sommets, gardiens des cols",
                    icon: "🗻",
                    unlockLevel: 13
                },
                {
                    id: "fontefer",
                    name: "Fontefer",
                    description: "Village de forgerons, où résonne le chant du marteau",
                    icon: "⚒️",
                    unlockLevel: 16
                },
                {
                    id: "rochegrise",
                    name: "Rochegrise",
                    description: "Communauté minière au cœur de la montagne",
                    icon: "⛏️",
                    unlockLevel: 18
                }
            ],
            
            // 10 Zones
            zones: [
                {
                    id: 1,
                    name: "Contreforts Rocheux",
                    description: "Début de l'ascension vers les montagnes",
                    icon: "🪨",
                    levelRange: { min: 11, max: 11 },
                    monsters: {
                        common: ['bat_cavernes', 'loup_roche'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 2,
                    name: "Chemin des Échos",
                    description: "Sentier où le vent porte des voix anciennes",
                    icon: "🌬️",
                    levelRange: { min: 11, max: 12 },
                    monsters: {
                        common: ['bat_cavernes', 'loup_roche', 'bouc_sauvage'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 3,
                    name: "Col Venteux",
                    description: "Passage étroit balayé par des rafales violentes",
                    icon: "💨",
                    levelRange: { min: 12, max: 13 },
                    monsters: {
                        common: ['bouc_sauvage', 'loup_roche', 'harpie_falaises'],
                        rare: ['golem_fissure'],
                        elite: []
                    }
                },
                {
                    id: 4,
                    name: "Grotte des Murmures",
                    description: "Caverne profonde où résonnent des bruits inquiétants",
                    icon: "🕳️",
                    levelRange: { min: 13, max: 14 },
                    monsters: {
                        common: ['bat_cavernes', 'golem_fissure'],
                        rare: ['harpie_falaises'],
                        elite: []
                    }
                },
                {
                    id: 5,
                    name: "Crêtes Déchiquetées",
                    description: "Arêtes rocheuses dangereuses et escarpées",
                    icon: "⛰️",
                    levelRange: { min: 14, max: 15 },
                    monsters: {
                        common: ['harpie_falaises', 'vautour_charognard', 'bouc_sauvage'],
                        rare: ['golem_fissure'],
                        elite: []
                    }
                },
                {
                    id: 6,
                    name: "Plateau des Vautours",
                    description: "Zone aride où rôdent les charognards",
                    icon: "🦅",
                    levelRange: { min: 15, max: 16 },
                    monsters: {
                        common: ['vautour_charognard', 'harpie_falaises'],
                        rare: ['geant_montagnes'],
                        elite: []
                    }
                },
                {
                    id: 7,
                    name: "Ruines de l'Ancienne Forge",
                    description: "Vestiges d'une forge abandonnée, hantée par des ombres",
                    icon: "🏚️",
                    levelRange: { min: 16, max: 17 },
                    monsters: {
                        common: ['golem_fissure', 'nain_corrompu'],
                        rare: ['geant_montagnes'],
                        elite: []
                    }
                },
                {
                    id: 8,
                    name: "Vallée des Géants",
                    description: "Territoire des anciens géants de pierre",
                    icon: "🗿",
                    levelRange: { min: 17, max: 18 },
                    monsters: {
                        common: ['golem_fissure', 'loup_roche', 'bouc_sauvage'],
                        rare: ['harpie_falaises', 'vautour_charognard'],
                        elite: ['geant_montagnes']
                    }
                },
                {
                    id: 9,
                    name: "Entrée du Granithelm",
                    description: "Portes massives menant à la citadelle naine",
                    icon: "🚪",
                    levelRange: { min: 18, max: 19 },
                    monsters: {
                        common: ['golem_fissure', 'loup_roche'],
                        rare: ['harpie_falaises', 'vautour_charognard'],
                        elite: ['geant_montagnes', 'nain_corrompu']
                    }
                },
                {
                    id: 10,
                    name: "Sommet Argenté",
                    description: "Point culminant des Montagnes Grises, domaine de Forgemort",
                    icon: "⛰️",
                    levelRange: { min: 19, max: 20 },
                    monsters: {
                        common: ['golem_fissure', 'loup_roche', 'bouc_sauvage'],
                        rare: ['harpie_falaises', 'vautour_charognard'],
                        elite: ['geant_montagnes', 'nain_corrompu']
                    },
                    isBossZone: true,
                    bossSpawnLogic: "9_normal_then_boss" // 9 monstres normaux, puis boss en 10ème
                }
            ],
            
            // Boss
            boss: {
                id: "forgemort_boss",
                name: "Forgemort",
                description: "Seigneur de forge nain corrompu, maître du feu et du métal",
                spawnAfterKills: 9, // Dans la zone 10, apparaît après 9 kills
                uniqueDrop: "marteau_forgemort" // Drop légendaire garanti
            }
        },
        
        // Région 3 : La Forêt Ancestrale
        {
            id: 3,
            name: "La Forêt Ancestrale",
            description: "Forêt millénaire aux arbres gigantesques, berceau des elfes",
            icon: "🌲",
            levelRange: { min: 21, max: 30 },
            
            // Faction & Lore
            faction: {
                name: "Les Elfes de Sylvaria",
                type: "Elfes",
                alignment: "Neutre Bon",
                description: "Peuple ancien, protecteur de la nature et des esprits. Maîtres de la magie druidique, de l'herboristerie et de l'arc.",
                strengths: ["Magie druidique", "Archerie légendaire", "Herboristerie"],
                military: "Archers d'élite, druides de guerre, gardiens sylvestres"
            },
            
            // Antagoniste
            antagonist: {
                name: "La Nymphe Sombre",
                description: "Elfe déchue, ancienne gardienne de la forêt tombée sous l'influence de l'Ombre",
                corruption: "A corrompu les esprits sylvestres et transformé la faune et la flore"
            },
            
            // Capitale
            capital: {
                id: "sylvaria",
                name: "Sylvaria",
                description: "Cité druidique bâtie autour d'un arbre géant millénaire",
                icon: "🌳",
                unlockLevel: 21
            },
            
            // Autres villes
            towns: [
                {
                    id: "boismurmure",
                    name: "Boismurmure",
                    description: "Village sylvestre protégé par les esprits de la forêt",
                    icon: "🏡",
                    unlockLevel: 23
                },
                {
                    id: "clairlune",
                    name: "Clairlune",
                    description: "Bourg mystique illuminé par des champignons phosphorescents",
                    icon: "🍄",
                    unlockLevel: 26
                },
                {
                    id: "epinenoire",
                    name: "Épine-Noire",
                    description: "Bourgade isolée, réputée pour ses chasseurs",
                    icon: "🏹",
                    unlockLevel: 28
                }
            ],
            
            // 10 Zones
            zones: [
                {
                    id: 1,
                    name: "Clairière des Fées",
                    description: "Clairière magique où dansent les fées",
                    icon: "✨",
                    levelRange: { min: 21, max: 21 },
                    monsters: {
                        common: ['loup_bois', 'gobelin_forestier', 'fantome_foret'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 2,
                    name: "Arbre-Cœur",
                    description: "Arbre géant au cœur de la forêt",
                    icon: "🌳",
                    levelRange: { min: 21, max: 22 },
                    monsters: {
                        common: ['loup_bois', 'serpent_sylvestre', 'gobelin_forestier', 'araignee_geante'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 3,
                    name: "Sentier du Cerf Blanc",
                    description: "Chemin mystique suivi par un cerf légendaire",
                    icon: "🦌",
                    levelRange: { min: 22, max: 23 },
                    monsters: {
                        common: ['loup_bois', 'sanglier_racines', 'loup_garou_jeune'],
                        rare: ['dryade_pervertie'],
                        elite: []
                    }
                },
                {
                    id: 4,
                    name: "Bois des Murmures",
                    description: "Forêt dense où résonnent des voix anciennes",
                    icon: "🌲",
                    levelRange: { min: 23, max: 24 },
                    monsters: {
                        common: ['serpent_sylvestre', 'gobelin_forestier', 'araignee_geante', 'fantome_foret'],
                        rare: ['champignon_geant', 'sorciere_sylvestre'],
                        elite: []
                    }
                },
                {
                    id: 5,
                    name: "Racines Entrelacées",
                    description: "Réseau complexe de racines géantes",
                    icon: "🌿",
                    levelRange: { min: 24, max: 25 },
                    monsters: {
                        common: ['sanglier_racines', 'loup_bois', 'loup_garou_jeune'],
                        rare: ['dryade_pervertie', 'champignon_geant'],
                        elite: []
                    }
                },
                {
                    id: 6,
                    name: "Lac de Cristal",
                    description: "Lac aux eaux pures comme du cristal",
                    icon: "💧",
                    levelRange: { min: 25, max: 26 },
                    monsters: {
                        common: ['serpent_sylvestre', 'gobelin_forestier', 'fantome_foret'],
                        rare: ['corbeau_spectral', 'sorciere_sylvestre'],
                        elite: []
                    }
                },
                {
                    id: 7,
                    name: "Marais des Feux Follets",
                    description: "Marais hanté par des lumières fantomatiques",
                    icon: "🔥",
                    levelRange: { min: 26, max: 27 },
                    monsters: {
                        common: ['sanglier_racines', 'serpent_sylvestre', 'araignee_geante'],
                        rare: ['corbeau_spectral', 'champignon_geant', 'sorciere_sylvestre'],
                        elite: ['ent_colerique', 'vampire_ancien']
                    }
                },
                {
                    id: 8,
                    name: "Vallée des Dryades",
                    description: "Vallée autrefois peuplée d'esprits bienveillants",
                    icon: "🧚",
                    levelRange: { min: 27, max: 28 },
                    monsters: {
                        common: ['loup_bois', 'gobelin_forestier', 'loup_garou_jeune'],
                        rare: ['dryade_pervertie'],
                        elite: ['ent_colerique', 'elfe_corrompu', 'liche_corrompue']
                    }
                },
                {
                    id: 9,
                    name: "Bois de Minuit",
                    description: "Zone sombre où la nuit semble éternelle",
                    icon: "🌑",
                    levelRange: { min: 28, max: 29 },
                    monsters: {
                        common: ['serpent_sylvestre', 'sanglier_racines', 'fantome_foret'],
                        rare: ['corbeau_spectral'],
                        elite: ['elfe_corrompu', 'vampire_ancien', 'gardien_ancien']
                    }
                },
                {
                    id: 10,
                    name: "Autel Sylvestre",
                    description: "Sanctuaire ancien corrompu, domaine de la Nymphe Sombre",
                    icon: "⛩️",
                    levelRange: { min: 29, max: 30 },
                    monsters: {
                        common: ['loup_bois', 'gobelin_forestier', 'serpent_sylvestre', 'araignee_geante', 'loup_garou_jeune'],
                        rare: ['dryade_pervertie', 'champignon_geant', 'sorciere_sylvestre'],
                        elite: ['ent_colerique', 'elfe_corrompu', 'vampire_ancien', 'liche_corrompue', 'gardien_ancien']
                    },
                    isBossZone: true,
                    bossSpawnLogic: "9_normal_then_boss"
                }
            ],
            
            // Boss
            boss: {
                id: "nymphe_sombre",
                name: "La Nymphe Sombre",
                description: "Elfe déchue liée à l'Ombre, ancienne gardienne de la forêt",
                spawnAfterKills: 9,
                icon: "🧝‍♀️"
            }
        },
        
        // Région 4 : Les Terres Brûlées
        {
            id: 4,
            name: "Les Terres Brûlées",
            description: "Terres volcaniques dévastées, royaume des orcs et du feu éternel",
            icon: "🔥",
            levelRange: { min: 31, max: 40 },
            
            // Faction & Lore
            faction: {
                name: "Les Orcs d'Ignarok",
                type: "Orcs",
                alignment: "Chaotique Neutre",
                description: "Peuple rude forgé par le feu et les cendres. Grands artisans d'armes et guerriers redoutables.",
                strengths: ["Forge volcanique", "Guerriers berserkers", "Résistance au feu"],
                military: "Légions de guerre, berserkers enragés, artisans de siège"
            },
            
            // Antagoniste
            antagonist: {
                name: "Prêtre du Brasier Noir",
                description: "Sorcier de l'Ombre cherchant à exploiter le volcan pour des rituels apocalyptiques",
                corruption: "A corrompu les élémentaires et possédé des guerriers orcs"
            },
            
            // Capitale
            capital: {
                id: "ignarok",
                name: "Ignarok",
                description: "Cité volcanique aux forges immenses, capitale des artisans orcs",
                icon: "🌋",
                unlockLevel: 31
            },
            
            // Autres villes
            towns: [
                {
                    id: "sangroc",
                    name: "Sangroc",
                    description: "Village troglodyte, dur et guerrier",
                    icon: "⚔️",
                    unlockLevel: 33
                },
                {
                    id: "cendralie",
                    name: "Cendralie",
                    description: "Bourg sur un plateau, souvent couvert de cendres",
                    icon: "🌪️",
                    unlockLevel: 36
                },
                {
                    id: "brasero",
                    name: "Brasero",
                    description: "Avant-poste militaire au bord d'une rivière de lave",
                    icon: "🔥",
                    unlockLevel: 38
                }
            ],
            
            // 10 Zones
            zones: [
                {
                    id: 1,
                    name: "Canyon Rouge",
                    description: "Canyon aux parois rougeoyantes",
                    icon: "🏜️",
                    levelRange: { min: 31, max: 31 },
                    monsters: {
                        common: ['scorpion_cendre', 'lezard_lave'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 2,
                    name: "Désert de Cendres",
                    description: "Étendue aride couverte de cendres volcaniques",
                    icon: "🌪️",
                    levelRange: { min: 31, max: 32 },
                    monsters: {
                        common: ['scorpion_cendre', 'chien_magma', 'orc_pillard'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 3,
                    name: "Gorge Sanguine",
                    description: "Gorge aux roches rouge sang",
                    icon: "🩸",
                    levelRange: { min: 32, max: 33 },
                    monsters: {
                        common: ['lezard_lave', 'orc_pillard'],
                        rare: ['salamandre_ardente'],
                        elite: []
                    }
                },
                {
                    id: 4,
                    name: "Oasis Éphémère",
                    description: "Rare point d'eau dans les terres brûlées",
                    icon: "💧",
                    levelRange: { min: 33, max: 34 },
                    monsters: {
                        common: ['chien_magma', 'scorpion_cendre'],
                        rare: ['elementaire_feu'],
                        elite: []
                    }
                },
                {
                    id: 5,
                    name: "Cratère des Titans",
                    description: "Immense cratère formé par un ancien cataclysme",
                    icon: "🌋",
                    levelRange: { min: 34, max: 35 },
                    monsters: {
                        common: ['lezard_lave', 'orc_pillard', 'chien_magma'],
                        rare: ['salamandre_ardente', 'elementaire_feu'],
                        elite: []
                    }
                },
                {
                    id: 6,
                    name: "Rivière de Lave",
                    description: "Fleuve de magma en fusion",
                    icon: "🔥",
                    levelRange: { min: 35, max: 36 },
                    monsters: {
                        common: ['lezard_lave', 'chien_magma'],
                        rare: ['salamandre_ardente', 'harpie_embrasee'],
                        elite: []
                    }
                },
                {
                    id: 7,
                    name: "Champ de Basalte",
                    description: "Plaine de roche volcanique noire",
                    icon: "🪨",
                    levelRange: { min: 36, max: 37 },
                    monsters: {
                        common: ['scorpion_cendre', 'orc_pillard'],
                        rare: ['elementaire_feu'],
                        elite: ['golem_basalte']
                    }
                },
                {
                    id: 8,
                    name: "Plateau Ardent",
                    description: "Plateau exposé à une chaleur extrême",
                    icon: "🏔️",
                    levelRange: { min: 37, max: 38 },
                    monsters: {
                        common: ['orc_pillard', 'chien_magma'],
                        rare: ['harpie_embrasee'],
                        elite: ['orc_berserker', 'golem_basalte']
                    }
                },
                {
                    id: 9,
                    name: "Fosse des Salamandres",
                    description: "Caverne infestée de créatures de feu",
                    icon: "🦎",
                    levelRange: { min: 38, max: 39 },
                    monsters: {
                        common: ['lezard_lave', 'scorpion_cendre'],
                        rare: ['salamandre_ardente', 'elementaire_feu'],
                        elite: ['orc_berserker']
                    }
                },
                {
                    id: 10,
                    name: "Mont Feu-Éternel",
                    description: "Volcan actif, sanctuaire du Prêtre du Brasier Noir",
                    icon: "🌋",
                    levelRange: { min: 39, max: 40 },
                    monsters: {
                        common: ['orc_pillard', 'chien_magma', 'lezard_lave'],
                        rare: ['salamandre_ardente', 'harpie_embrasee'],
                        elite: ['orc_berserker', 'golem_basalte']
                    },
                    isBossZone: true,
                    bossSpawnLogic: "9_normal_then_boss"
                }
            ],
            
            // Boss
            boss: {
                id: "pretre_brasier",
                name: "Prêtre du Brasier Noir",
                description: "Sorcier de l'Ombre, maître des flammes et des rituels apocalyptiques",
                spawnAfterKills: 9,
                icon: "🔮"
            }
        },
        
        // Région 5 : Le Nord Gelé
        {
            id: 5,
            name: "Le Nord Gelé",
            description: "Terres glacées du grand nord, royaume du blizzard éternel",
            icon: "❄️",
            levelRange: { min: 41, max: 50 },
            
            // Faction & Lore
            faction: {
                name: "Les Nordiques de Frostenheim",
                type: "Humains Nordiques",
                alignment: "Loyal Bon",
                description: "Humains adaptés au froid extrême, liés à la chasse et aux rituels ancestraux. Société guerrière où l'honneur est central.",
                strengths: ["Chasse ancestrale", "Guerriers vikings", "Rituels du froid"],
                military: "Drakkars de guerre, haches de bataille, boucliers runiques"
            },
            
            // Antagoniste
            antagonist: {
                name: "Le Héraut du Blizzard Noir",
                description: "Champion de l'Ombre dans le grand nord, corrompant les esprits ancestraux",
                corruption: "A créé des abominations de glace et zombifié les loups blancs"
            },
            
            // Capitale
            capital: {
                id: "frostenheim",
                name: "Frostenheim",
                description: "Grande cité nordique bâtie dans la glace éternelle",
                icon: "🏰",
                unlockLevel: 41
            },
            
            // Autres villes
            towns: [
                {
                    id: "glacemer",
                    name: "Glacemer",
                    description: "Port gelé, centre d'échanges maritimes malgré la banquise",
                    icon: "⛵",
                    unlockLevel: 43
                },
                {
                    id: "loupblanc",
                    name: "Loupblanc",
                    description: "Village de chasseurs dans la toundra sauvage",
                    icon: "🐺",
                    unlockLevel: 46
                },
                {
                    id: "cryoroc",
                    name: "Cryoroc",
                    description: "Forteresse perchée sur un pic enneigé",
                    icon: "⛰️",
                    unlockLevel: 48
                }
            ],
            
            // 10 Zones
            zones: [
                {
                    id: 1,
                    name: "Toundra Sauvage",
                    description: "Plaine gelée balayée par des vents violents",
                    icon: "🌨️",
                    levelRange: { min: 41, max: 41 },
                    monsters: {
                        common: ['loup_blanc', 'corbeau_glace'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 2,
                    name: "Rivière Gelée",
                    description: "Cours d'eau figé dans la glace",
                    icon: "🧊",
                    levelRange: { min: 41, max: 42 },
                    monsters: {
                        common: ['loup_blanc', 'ours_polaire', 'bandit_nordique'],
                        rare: [],
                        elite: []
                    }
                },
                {
                    id: 3,
                    name: "Forêt de Givre",
                    description: "Forêt d'arbres enneigés et cristallisés",
                    icon: "🌲",
                    levelRange: { min: 42, max: 43 },
                    monsters: {
                        common: ['corbeau_glace', 'loup_blanc'],
                        rare: ['golem_glace'],
                        elite: []
                    }
                },
                {
                    id: 4,
                    name: "Cavernes de Glace",
                    description: "Grottes de glace aux reflets bleutés",
                    icon: "🕳️",
                    levelRange: { min: 43, max: 44 },
                    monsters: {
                        common: ['ours_polaire', 'bandit_nordique'],
                        rare: ['esprit_neiges'],
                        elite: []
                    }
                },
                {
                    id: 5,
                    name: "Plaines Enneigées",
                    description: "Étendue blanche à perte de vue",
                    icon: "🏔️",
                    levelRange: { min: 44, max: 45 },
                    monsters: {
                        common: ['loup_blanc', 'ours_polaire', 'corbeau_glace'],
                        rare: ['golem_glace', 'morse_geant'],
                        elite: []
                    }
                },
                {
                    id: 6,
                    name: "Fjord du Hurlement",
                    description: "Fjord où résonnent des cris étranges",
                    icon: "🌊",
                    levelRange: { min: 45, max: 46 },
                    monsters: {
                        common: ['bandit_nordique', 'corbeau_glace'],
                        rare: ['morse_geant', 'esprit_neiges'],
                        elite: []
                    }
                },
                {
                    id: 7,
                    name: "Pics Hivernaux",
                    description: "Sommets enneigés difficiles d'accès",
                    icon: "⛰️",
                    levelRange: { min: 46, max: 47 },
                    monsters: {
                        common: ['loup_blanc', 'ours_polaire'],
                        rare: ['golem_glace'],
                        elite: ['yeti_furieux']
                    }
                },
                {
                    id: 8,
                    name: "Lac des Glaces Noires",
                    description: "Lac sombre figé dans une glace éternelle",
                    icon: "🌑",
                    levelRange: { min: 47, max: 48 },
                    monsters: {
                        common: ['bandit_nordique', 'corbeau_glace'],
                        rare: ['esprit_neiges'],
                        elite: ['yeti_furieux', 'nordique_spectre']
                    }
                },
                {
                    id: 9,
                    name: "Temple du Blizzard",
                    description: "Ruines anciennes où souffle un vent perpétuel",
                    icon: "⛩️",
                    levelRange: { min: 48, max: 49 },
                    monsters: {
                        common: ['loup_blanc', 'ours_polaire'],
                        rare: ['golem_glace', 'morse_geant'],
                        elite: ['nordique_spectre']
                    }
                },
                {
                    id: 10,
                    name: "Couronne du Nord",
                    description: "Point le plus au nord, domaine du Héraut du Blizzard Noir",
                    icon: "👑",
                    levelRange: { min: 49, max: 50 },
                    monsters: {
                        common: ['bandit_nordique', 'loup_blanc', 'corbeau_glace'],
                        rare: ['esprit_neiges', 'golem_glace'],
                        elite: ['yeti_furieux', 'nordique_spectre']
                    },
                    isBossZone: true,
                    bossSpawnLogic: "9_normal_then_boss"
                }
            ],
            
            // Boss
            boss: {
                id: "heraut_blizzard",
                name: "Le Héraut du Blizzard Noir",
                description: "Champion de l'Ombre dans le grand nord, maître du froid éternel",
                spawnAfterKills: 9,
                icon: "❄️"
            }
        }
    ],
    
    /**
     * Obtenir une région par ID
     */
    getRegion(regionId) {
        return this.regions.find(r => r.id === regionId);
    },
    
    /**
     * Obtenir une zone spécifique
     */
    getZone(regionId, zoneId) {
        const region = this.getRegion(regionId);
        return region ? region.zones.find(z => z.id === zoneId) : null;
    },
    
    /**
     * Obtenir le boss d'une région
     */
    getBoss(regionId) {
        const region = this.getRegion(regionId);
        return region ? region.boss : null;
    }
};

// Export pour utilisation dans le jeu
if (typeof window !== 'undefined') {
    window.RegionsData = RegionsData;
}
