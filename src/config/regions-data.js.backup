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

                    id: 4,
                    name: "Rivière Chantante",
                    description: "Cours d'eau dont les flots produisent une mélodie apaisante",
                    icon: "🏞️",
                    levelRange: { min: 3, max: 4 },
                    monsters: [
                        { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] },
                        { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] },
                        { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }
                    ]
                },
                {
                    id: 5,
                    name: "Collines Dorées",
                    description: "Collines aux herbes dorées par le soleil",
                    icon: "⛰️",
                    levelRange: { min: 4, max: 5 },
                    monsters: [
                        { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] },
                        { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] },
                        { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] },
                        { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] },
                        { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] }
                    ]
                },
                {
                    id: 6,
                    name: "Forêt des Louveteaux",
                    description: "Repaire des loups, territoire dangereux",
                    icon: "🐺",
                    levelRange: { min: 5, max: 6 },
                    monsters: [
                        { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] },
                        { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] },
                        { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] }
                    ]
                },
                {
                    id: 7,
                    name: "Champs de Tournesols",
                    description: "Immenses champs de tournesols rayonnants",
                    icon: "🌻",
                    levelRange: { min: 6, max: 7 },
                    monsters: [
                        { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] },
                        { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] },
                        { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] }
                    ]
                },
                {
                    id: 8,
                    name: "Marais Paisible",
                    description: "Marécages calmes mais trompeurs",
                    icon: "🦎",
                    levelRange: { min: 7, max: 8 },
                    monsters: [
                        { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] },
                        { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] },
                        { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] }
                    ]
                },
                {
                    id: 9,
                    name: "Colline aux Moulins",
                    description: "Colline parsemée de vieux moulins à vent",
                    icon: "🌾",
                    levelRange: { min: 8, max: 9 },
                    monsters: [
                        { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] },
                        { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] },
                        { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] },
                        { id: 'chevalier_renegat', name: 'Chevalier renégat', drops: [ { id: 'heaume_rouille', name: 'Heaume rouillé' } ] }
                    ]
                },
                {
                    id: 10,
                    name: "Bosquet Lumineux",
                    description: "Bosquet mystique où la lumière danse entre les arbres",
                    icon: "✨",
                    levelRange: { min: 9, max: 10 },
                    monsters: [
                        { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] },
                        { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] },
                        { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] },
                        { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] },
                        { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] },
                        { id: 'chevalier_renegat', name: 'Chevalier renégat', drops: [ { id: 'heaume_rouille', name: 'Heaume rouillé' } ] }
                    ],
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
                    monsters: [
                        { id: 'bat_cavernes', name: 'Chauve-souris des cavernes', drops: [ { id: 'aile_bat', name: 'Aile de chauve-souris' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] }
                    ]
                },
                {
                    id: 2,
                    name: "Chemin des Échos",
                    description: "Sentier où le vent porte des voix anciennes",
                    icon: "🌬️",
                    levelRange: { min: 11, max: 12 },
                    monsters: [
                        { id: 'bat_cavernes', name: 'Chauve-souris des cavernes', drops: [ { id: 'aile_bat', name: 'Aile de chauve-souris' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] },
                        { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] }
                    ]
                },
                {
                    id: 3,
                    name: "Col Venteux",
                    description: "Passage étroit balayé par des rafales violentes",
                    icon: "💨",
                    levelRange: { min: 12, max: 13 },
                    monsters: [
                        { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] }
                    ]
                },
                {
                    id: 4,
                    name: "Grotte des Murmures",
                    description: "Caverne profonde où résonnent des bruits inquiétants",
                    icon: "🕳️",
                    levelRange: { min: 13, max: 14 },
                    monsters: [
                        { id: 'bat_cavernes', name: 'Chauve-souris des cavernes', drops: [ { id: 'aile_bat', name: 'Aile de chauve-souris' } ] },
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] }
                    ]
                },
                {
                    id: 5,
                    name: "Crêtes Déchiquetées",
                    description: "Arêtes rocheuses dangereuses et escarpées",
                    icon: "⛰️",
                    levelRange: { min: 14, max: 15 },
                    monsters: [
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'vautour_charognard', name: 'Vautour charognard', drops: [ { id: 'plume_vautour', name: 'Plume de vautour' } ] },
                        { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] },
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] }
                    ]
                },
                {
                    id: 6,
                    name: "Plateau des Vautours",
                    description: "Zone aride où rôdent les charognards",
                    icon: "🦅",
                    levelRange: { min: 15, max: 16 },
                    monsters: [
                        { id: 'vautour_charognard', name: 'Vautour charognard', drops: [ { id: 'plume_vautour', name: 'Plume de vautour' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'geant_montagnes', name: 'Géant des montagnes', drops: [ { id: 'dent_geant', name: 'Dent de géant' } ] }
                    ]
                },
                {
                    id: 7,
                    name: "Ruines de l'Ancienne Forge",
                    description: "Vestiges d'une forge abandonnée, hantée par des ombres",
                    icon: "🏚️",
                    levelRange: { min: 16, max: 17 },
                    monsters: [
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] },
                        { id: 'nain_corrompu', name: 'Nain corrompu', drops: [ { id: 'barbe_noire', name: 'Barbe noire' } ] },
                        { id: 'geant_montagnes', name: 'Géant des montagnes', drops: [ { id: 'dent_geant', name: 'Dent de géant' } ] }
                    ]
                },
                {
                    id: 8,
                    name: "Vallée des Géants",
                    description: "Territoire des anciens géants de pierre",
                    icon: "🗿",
                    levelRange: { min: 17, max: 18 },
                    monsters: [
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] },
                        { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'vautour_charognard', name: 'Vautour charognard', drops: [ { id: 'plume_vautour', name: 'Plume de vautour' } ] },
                        { id: 'geant_montagnes', name: 'Géant des montagnes', drops: [ { id: 'dent_geant', name: 'Dent de géant' } ] }
                    ]
                },
                {
                    id: 9,
                    name: "Entrée du Granithelm",
                    description: "Portes massives menant à la citadelle naine",
                    icon: "🚪",
                    levelRange: { min: 18, max: 19 },
                    monsters: [
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'vautour_charognard', name: 'Vautour charognard', drops: [ { id: 'plume_vautour', name: 'Plume de vautour' } ] },
                        { id: 'geant_montagnes', name: 'Géant des montagnes', drops: [ { id: 'dent_geant', name: 'Dent de géant' } ] },
                        { id: 'nain_corrompu', name: 'Nain corrompu', drops: [ { id: 'barbe_noire', name: 'Barbe noire' } ] }
                    ]
                },
                {
                    id: 10,
                    name: "Sommet Argenté",
                    description: "Point culminant des Montagnes Grises, domaine de Forgemort",
                    icon: "⛰️",
                    levelRange: { min: 19, max: 20 },
                    monsters: [
                        { id: 'golem_fissure', name: 'Golem de fissure', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] },
                        { id: 'loup_roche', name: 'Loup des roches', drops: [ { id: 'peau_loup_roche', name: 'Peau de loup rocheux' } ] },
                        { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] },
                        { id: 'harpie_falaises', name: 'Harpie des falaises', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] },
                        { id: 'vautour_charognard', name: 'Vautour charognard', drops: [ { id: 'plume_vautour', name: 'Plume de vautour' } ] },
                        { id: 'geant_montagnes', name: 'Géant des montagnes', drops: [ { id: 'dent_geant', name: 'Dent de géant' } ] },
                        { id: 'nain_corrompu', name: 'Nain corrompu', drops: [ { id: 'barbe_noire', name: 'Barbe noire' } ] }
                    ],
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
                }
            ],

            // 10 Zones (NOUVELLE STRUCTURE)
            zones: [
                { id: 1, name: "Clairière des Fées", description: "Clairière magique où dansent les fées", icon: "✨", levelRange: { min: 21, max: 21 }, monsters: [ { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'fantome_foret', name: 'Fantôme de la forêt', drops: [ { id: 'essence_fantome', name: 'Essence de fantôme' } ] } ] },
                { id: 2, name: "Arbre-Cœur", description: "Arbre géant au cœur de la forêt", icon: "🌳", levelRange: { min: 21, max: 22 }, monsters: [ { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'araignee_geante', name: 'Araignée géante', drops: [ { id: 'patte_araignee', name: 'Patte d\'araignée' } ] } ] },
                { id: 3, name: "Sentier du Cerf Blanc", description: "Chemin mystique suivi par un cerf légendaire", icon: "🦌", levelRange: { min: 22, max: 23 }, monsters: [ { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'sanglier_racines', name: 'Sanglier des racines', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'loup_garou_jeune', name: 'Jeune loup-garou', drops: [ { id: 'griffes_loup_garou', name: 'Griffes de loup-garou' } ] }, { id: 'dryade_pervertie', name: 'Dryade pervertie', drops: [ { id: 'branche_corrompue', name: 'Branche corrompue' } ] } ] },
                { id: 4, name: "Bois des Murmures", description: "Forêt dense où résonnent des voix anciennes", icon: "🌲", levelRange: { min: 23, max: 24 }, monsters: [ { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'araignee_geante', name: 'Araignée géante', drops: [ { id: 'patte_araignee', name: 'Patte d\'araignée' } ] }, { id: 'fantome_foret', name: 'Fantôme de la forêt', drops: [ { id: 'essence_fantome', name: 'Essence de fantôme' } ] }, { id: 'champignon_geant', name: 'Champignon géant', drops: [ { id: 'spore_geante', name: 'Spore géante' } ] }, { id: 'sorciere_sylvestre', name: 'Sorcière sylvestre', drops: [ { id: 'chapeau_sorciere', name: 'Chapeau de sorcière' } ] } ] },
                { id: 5, name: "Racines Entrelacées", description: "Réseau complexe de racines géantes", icon: "🌿", levelRange: { min: 24, max: 25 }, monsters: [ { id: 'sanglier_racines', name: 'Sanglier des racines', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'loup_garou_jeune', name: 'Jeune loup-garou', drops: [ { id: 'griffes_loup_garou', name: 'Griffes de loup-garou' } ] }, { id: 'dryade_pervertie', name: 'Dryade pervertie', drops: [ { id: 'branche_corrompue', name: 'Branche corrompue' } ] }, { id: 'champignon_geant', name: 'Champignon géant', drops: [ { id: 'spore_geante', name: 'Spore géante' } ] } ] },
                { id: 6, name: "Lac de Cristal", description: "Lac aux eaux pures comme du cristal", icon: "💧", levelRange: { min: 25, max: 26 }, monsters: [ { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'fantome_foret', name: 'Fantôme de la forêt', drops: [ { id: 'essence_fantome', name: 'Essence de fantôme' } ] }, { id: 'corbeau_spectral', name: 'Corbeau spectral', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'sorciere_sylvestre', name: 'Sorcière sylvestre', drops: [ { id: 'chapeau_sorciere', name: 'Chapeau de sorcière' } ] } ] },
                { id: 7, name: "Marais des Feux Follets", description: "Marais hanté par des lumières fantomatiques", icon: "🔥", levelRange: { min: 26, max: 27 }, monsters: [ { id: 'sanglier_racines', name: 'Sanglier des racines', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'araignee_geante', name: 'Araignée géante', drops: [ { id: 'patte_araignee', name: 'Patte d\'araignée' } ] }, { id: 'corbeau_spectral', name: 'Corbeau spectral', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'champignon_geant', name: 'Champignon géant', drops: [ { id: 'spore_geante', name: 'Spore géante' } ] }, { id: 'sorciere_sylvestre', name: 'Sorcière sylvestre', drops: [ { id: 'chapeau_sorciere', name: 'Chapeau de sorcière' } ] }, { id: 'ent_colerique', name: 'Ent colérique', drops: [ { id: 'branche_ent', name: 'Branche d\'ent' } ] }, { id: 'vampire_ancien', name: 'Vampire ancien', drops: [ { id: 'dent_vampire', name: 'Dent de vampire' } ] } ] },
                { id: 8, name: "Vallée des Dryades", description: "Vallée autrefois peuplée d'esprits bienveillants", icon: "🧚", levelRange: { min: 27, max: 28 }, monsters: [ { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'loup_garou_jeune', name: 'Jeune loup-garou', drops: [ { id: 'griffes_loup_garou', name: 'Griffes de loup-garou' } ] }, { id: 'dryade_pervertie', name: 'Dryade pervertie', drops: [ { id: 'branche_corrompue', name: 'Branche corrompue' } ] }, { id: 'ent_colerique', name: 'Ent colérique', drops: [ { id: 'branche_ent', name: 'Branche d\'ent' } ] }, { id: 'elfe_corrompu', name: 'Elfe corrompu', drops: [ { id: 'arc_corrompu', name: 'Arc corrompu' } ] }, { id: 'liche_corrompue', name: 'Liche corrompue', drops: [ { id: 'os_liche', name: 'Os de liche' } ] } ] },
                { id: 9, name: "Bois de Minuit", description: "Zone sombre où la nuit semble éternelle", icon: "🌑", levelRange: { min: 28, max: 29 }, monsters: [ { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'sanglier_racines', name: 'Sanglier des racines', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'fantome_foret', name: 'Fantôme de la forêt', drops: [ { id: 'essence_fantome', name: 'Essence de fantôme' } ] }, { id: 'corbeau_spectral', name: 'Corbeau spectral', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'elfe_corrompu', name: 'Elfe corrompu', drops: [ { id: 'arc_corrompu', name: 'Arc corrompu' } ] }, { id: 'vampire_ancien', name: 'Vampire ancien', drops: [ { id: 'dent_vampire', name: 'Dent de vampire' } ] }, { id: 'gardien_ancien', name: 'Gardien ancien', drops: [ { id: 'masque_gardien', name: 'Masque de gardien' } ] } ] },
                { id: 10, name: "Autel Sylvestre", description: "Sanctuaire ancien corrompu, domaine de la Nymphe Sombre", icon: "⛩️", levelRange: { min: 29, max: 30 }, monsters: [ { id: 'loup_bois', name: 'Loup des bois', drops: [ { id: 'peau_loup_bois', name: 'Peau de loup des bois' } ] }, { id: 'gobelin_forestier', name: 'Gobelin forestier', drops: [ { id: 'oreille_gobelin', name: 'Oreille de gobelin' } ] }, { id: 'serpent_sylvestre', name: 'Serpent sylvestre', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'araignee_geante', name: 'Araignée géante', drops: [ { id: 'patte_araignee', name: 'Patte d\'araignée' } ] }, { id: 'loup_garou_jeune', name: 'Jeune loup-garou', drops: [ { id: 'griffes_loup_garou', name: 'Griffes de loup-garou' } ] }, { id: 'dryade_pervertie', name: 'Dryade pervertie', drops: [ { id: 'branche_corrompue', name: 'Branche corrompue' } ] }, { id: 'champignon_geant', name: 'Champignon géant', drops: [ { id: 'spore_geante', name: 'Spore géante' } ] }, { id: 'sorciere_sylvestre', name: 'Sorcière sylvestre', drops: [ { id: 'chapeau_sorciere', name: 'Chapeau de sorcière' } ] }, { id: 'ent_colerique', name: 'Ent colérique', drops: [ { id: 'branche_ent', name: 'Branche d\'ent' } ] }, { id: 'elfe_corrompu', name: 'Elfe corrompu', drops: [ { id: 'arc_corrompu', name: 'Arc corrompu' } ] }, { id: 'vampire_ancien', name: 'Vampire ancien', drops: [ { id: 'dent_vampire', name: 'Dent de vampire' } ] }, { id: 'liche_corrompue', name: 'Liche corrompue', drops: [ { id: 'os_liche', name: 'Os de liche' } ] }, { id: 'gardien_ancien', name: 'Gardien ancien', drops: [ { id: 'masque_gardien', name: 'Masque de gardien' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
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
                { id: 1, name: "Canyon Rouge", description: "Canyon aux parois rougeoyantes", icon: "🏜️", levelRange: { min: 31, max: 31 }, monsters: [ { id: 'scorpion_cendre', name: 'Scorpion de cendre', drops: [ { id: 'dard_scorpion', name: 'Dard de scorpion' } ] }, { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] } ] },
                { id: 2, name: "Désert de Cendres", description: "Étendue aride couverte de cendres volcaniques", icon: "🌪️", levelRange: { min: 31, max: 32 }, monsters: [ { id: 'scorpion_cendre', name: 'Scorpion de cendre', drops: [ { id: 'dard_scorpion', name: 'Dard de scorpion' } ] }, { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] } ] },
                { id: 3, name: "Gorge Sanguine", description: "Gorge aux roches rouge sang", icon: "🩸", levelRange: { min: 32, max: 33 }, monsters: [ { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] }, { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] }, { id: 'salamandre_ardente', name: 'Salamandre ardente', drops: [ { id: 'queue_salamandre', name: 'Queue de salamandre' } ] } ] },
                { id: 4, name: "Oasis Éphémère", description: "Rare point d'eau dans les terres brûlées", icon: "💧", levelRange: { min: 33, max: 34 }, monsters: [ { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'scorpion_cendre', name: 'Scorpion de cendre', drops: [ { id: 'dard_scorpion', name: 'Dard de scorpion' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'coeur_feu', name: 'Cœur de feu' } ] } ] },
                { id: 5, name: "Cratère des Titans", description: "Immense cratère formé par un ancien cataclysme", icon: "🌋", levelRange: { min: 34, max: 35 }, monsters: [ { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] }, { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] }, { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'salamandre_ardente', name: 'Salamandre ardente', drops: [ { id: 'queue_salamandre', name: 'Queue de salamandre' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'coeur_feu', name: 'Cœur de feu' } ] } ] },
                { id: 6, name: "Rivière de Lave", description: "Fleuve de magma en fusion", icon: "🔥", levelRange: { min: 35, max: 36 }, monsters: [ { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] }, { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'salamandre_ardente', name: 'Salamandre ardente', drops: [ { id: 'queue_salamandre', name: 'Queue de salamandre' } ] }, { id: 'harpie_embrasee', name: 'Harpie embrasée', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] } ] },
                { id: 7, name: "Champ de Basalte", description: "Plaine de roche volcanique noire", icon: "🪨", levelRange: { min: 36, max: 37 }, monsters: [ { id: 'scorpion_cendre', name: 'Scorpion de cendre', drops: [ { id: 'dard_scorpion', name: 'Dard de scorpion' } ] }, { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'coeur_feu', name: 'Cœur de feu' } ] }, { id: 'golem_basalte', name: 'Golem de basalte', drops: [ { id: 'fragment_basalte', name: 'Fragment de basalte' } ] } ] },
                { id: 8, name: "Plateau Ardent", description: "Plateau exposé à une chaleur extrême", icon: "🏔️", levelRange: { min: 37, max: 38 }, monsters: [ { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] }, { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'harpie_embrasee', name: 'Harpie embrasée', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] }, { id: 'orc_berserker', name: 'Orc berserker', drops: [ { id: 'hache_berserker', name: 'Hache de berserker' } ] }, { id: 'golem_basalte', name: 'Golem de basalte', drops: [ { id: 'fragment_basalte', name: 'Fragment de basalte' } ] } ] },
                { id: 9, name: "Fosse des Salamandres", description: "Caverne infestée de créatures de feu", icon: "🦎", levelRange: { min: 38, max: 39 }, monsters: [ { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] }, { id: 'scorpion_cendre', name: 'Scorpion de cendre', drops: [ { id: 'dard_scorpion', name: 'Dard de scorpion' } ] }, { id: 'salamandre_ardente', name: 'Salamandre ardente', drops: [ { id: 'queue_salamandre', name: 'Queue de salamandre' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'coeur_feu', name: 'Cœur de feu' } ] }, { id: 'orc_berserker', name: 'Orc berserker', drops: [ { id: 'hache_berserker', name: 'Hache de berserker' } ] } ] },
                { id: 10, name: "Mont Feu-Éternel", description: "Volcan actif, sanctuaire du Prêtre du Brasier Noir", icon: "🌋", levelRange: { min: 39, max: 40 }, monsters: [ { id: 'orc_pillard', name: 'Orc pillard', drops: [ { id: 'casque_orc', name: 'Casque d\'orc' } ] }, { id: 'chien_magma', name: 'Chien de magma', drops: [ { id: 'crocs_magma', name: 'Crocs de magma' } ] }, { id: 'lezard_lave', name: 'Lézard de lave', drops: [ { id: 'ecaille_lave', name: 'Écaille de lave' } ] }, { id: 'salamandre_ardente', name: 'Salamandre ardente', drops: [ { id: 'queue_salamandre', name: 'Queue de salamandre' } ] }, { id: 'harpie_embrasee', name: 'Harpie embrasée', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] }, { id: 'orc_berserker', name: 'Orc berserker', drops: [ { id: 'hache_berserker', name: 'Hache de berserker' } ] }, { id: 'golem_basalte', name: 'Golem de basalte', drops: [ { id: 'fragment_basalte', name: 'Fragment de basalte' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
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
                { id: 1, name: "Toundra Sauvage", description: "Plaine gelée balayée par des vents violents", icon: "🌨️", levelRange: { min: 41, max: 41 }, monsters: [ { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] } ] },
                { id: 2, name: "Rivière Gelée", description: "Cours d'eau figé dans la glace", icon: "🧊", levelRange: { min: 41, max: 42 }, monsters: [ { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_polaire', name: 'Fourrure d\'ours polaire' } ] }, { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'masque_bandit', name: 'Masque de bandit' } ] } ] },
                { id: 3, name: "Forêt de Givre", description: "Forêt d'arbres enneigés et cristallisés", icon: "🌲", levelRange: { min: 42, max: 43 }, monsters: [ { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] }, { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'golem_glace', name: 'Golem de glace', drops: [ { id: 'fragment_glace', name: 'Fragment de glace' } ] } ] },
                { id: 4, name: "Cavernes de Glace", description: "Grottes de glace aux reflets bleutés", icon: "🕳️", levelRange: { min: 43, max: 44 }, monsters: [ { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_polaire', name: 'Fourrure d\'ours polaire' } ] }, { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'masque_bandit', name: 'Masque de bandit' } ] }, { id: 'esprit_neiges', name: 'Esprit des neiges', drops: [ { id: 'poussiere_neige', name: 'Poussière de neige' } ] } ] },
                { id: 5, name: "Plaines Enneigées", description: "Étendue blanche à perte de vue", icon: "🏔️", levelRange: { min: 44, max: 45 }, monsters: [ { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_polaire', name: 'Fourrure d\'ours polaire' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] }, { id: 'golem_glace', name: 'Golem de glace', drops: [ { id: 'fragment_glace', name: 'Fragment de glace' } ] }, { id: 'morse_geant', name: 'Morse géant', drops: [ { id: 'defense_morse', name: 'Défense de morse' } ] } ] },
                { id: 6, name: "Fjord du Hurlement", description: "Fjord où résonnent des cris étranges", icon: "🌊", levelRange: { min: 45, max: 46 }, monsters: [ { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'masque_bandit', name: 'Masque de bandit' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] }, { id: 'morse_geant', name: 'Morse géant', drops: [ { id: 'defense_morse', name: 'Défense de morse' } ] }, { id: 'esprit_neiges', name: 'Esprit des neiges', drops: [ { id: 'poussiere_neige', name: 'Poussière de neige' } ] } ] },
                { id: 7, name: "Pics Hivernaux", description: "Sommets enneigés difficiles d'accès", icon: "⛰️", levelRange: { min: 46, max: 47 }, monsters: [ { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_polaire', name: 'Fourrure d\'ours polaire' } ] }, { id: 'golem_glace', name: 'Golem de glace', drops: [ { id: 'fragment_glace', name: 'Fragment de glace' } ] }, { id: 'yeti_furieux', name: 'Yéti furieux', drops: [ { id: 'fourrure_yeti', name: 'Fourrure de yéti' } ] } ] },
                { id: 8, name: "Lac des Glaces Noires", description: "Lac sombre figé dans une glace éternelle", icon: "🌑", levelRange: { min: 47, max: 48 }, monsters: [ { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'masque_bandit', name: 'Masque de bandit' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] }, { id: 'esprit_neiges', name: 'Esprit des neiges', drops: [ { id: 'poussiere_neige', name: 'Poussière de neige' } ] }, { id: 'yeti_furieux', name: 'Yéti furieux', drops: [ { id: 'fourrure_yeti', name: 'Fourrure de yéti' } ] }, { id: 'nordique_spectre', name: 'Spectre nordique', drops: [ { id: 'cape_spectre', name: 'Cape de spectre' } ] } ] },
                { id: 9, name: "Temple du Blizzard", description: "Ruines anciennes où souffle un vent perpétuel", icon: "⛩️", levelRange: { min: 48, max: 49 }, monsters: [ { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_polaire', name: 'Fourrure d\'ours polaire' } ] }, { id: 'golem_glace', name: 'Golem de glace', drops: [ { id: 'fragment_glace', name: 'Fragment de glace' } ] }, { id: 'morse_geant', name: 'Morse géant', drops: [ { id: 'defense_morse', name: 'Défense de morse' } ] }, { id: 'nordique_spectre', name: 'Spectre nordique', drops: [ { id: 'cape_spectre', name: 'Cape de spectre' } ] } ] },
                { id: 10, name: "Couronne du Nord", description: "Point le plus au nord, domaine du Héraut du Blizzard Noir", icon: "👑", levelRange: { min: 49, max: 50 }, monsters: [ { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'masque_bandit', name: 'Masque de bandit' } ] }, { id: 'loup_blanc', name: 'Loup blanc', drops: [ { id: 'peau_loup_blanc', name: 'Peau de loup blanc' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume de glace' } ] }, { id: 'esprit_neiges', name: 'Esprit des neiges', drops: [ { id: 'poussiere_neige', name: 'Poussière de neige' } ] }, { id: 'golem_glace', name: 'Golem de glace', drops: [ { id: 'fragment_glace', name: 'Fragment de glace' } ] }, { id: 'yeti_furieux', name: 'Yéti furieux', drops: [ { id: 'fourrure_yeti', name: 'Fourrure de yéti' } ] }, { id: 'nordique_spectre', name: 'Spectre nordique', drops: [ { id: 'cape_spectre', name: 'Cape de spectre' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
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
