const RegionsData = {
    regions: [
        {
            id: 1,
            name: "Les Plaines Verdoyantes",
            description: "Terres agricoles paisibles où l'humanité prospère",
            icon: "🌾",
            levelRange: { min: 1, max: 10 },
            
            faction: {
                name: "Les Humains d'Érialis",
                type: "Humains",
                alignment: "Neutre Bon",
                description: "Peuple agricole et commerçant",
                strengths: ["Agriculture", "Élevage", "Artisanat de base"],
                military: "Milices locales"
            },
            
            antagonist: {
                name: "L'Ombre",
                description: "Force corrompue",
                corruption: "Loups corrompus, Sangliers noirs"
            },
            
            capital: {
                id: "erialis",
                name: "Érialis",
                description: "Ville lumineuse",
                icon: "🏛️",
                unlockLevel: 1
            },
            
            towns: [
                { id: "clairval", name: "Clairval", description: "Village pastoral", icon: "🐄", unlockLevel: 3 },
                { id: "fonterive", name: "Fonterive", description: "Bourg au bord de la rivière", icon: "🌊", unlockLevel: 5 },
                { id: "brumechene", name: "Brumechêne", description: "Bourgade forestière", icon: "🌲", unlockLevel: 7 }
            ],
            
            zones: [
                { id: 1, name: "Camp des Débutants", description: "Point de départ", icon: "⛺", levelRange: { min: 1, max: 1 }, monsters: [ { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] } ] },
                { id: 2, name: "Champs de Blé", description: "Vastes étendues dorées", icon: "🌾", levelRange: { min: 1, max: 2 }, monsters: [ { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] }, { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] } ] },
                { id: 3, name: "Forêt de Chêneblanc", description: "Forêt de chênes centenaires", icon: "🌳", levelRange: { min: 2, max: 3 }, monsters: [ { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] }, { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] } ] },
                { id: 4, name: "Rivière Chantante", description: "Cours d'eau mélodieux", icon: "🏞️", levelRange: { min: 3, max: 4 }, monsters: [ { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] } ] },
                { id: 5, name: "Collines Dorées", description: "Collines aux herbes dorées", icon: "⛰️", levelRange: { min: 4, max: 5 }, monsters: [ { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] }, { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] }, { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] }, { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] } ] },
                { id: 6, name: "Forêt des Louveteaux", description: "Repaire des loups", icon: "🐺", levelRange: { min: 5, max: 6 }, monsters: [ { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] }, { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] }, { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] } ] },
                { id: 7, name: "Champs de Tournesols", description: "Immenses champs rayonnants", icon: "🌻", levelRange: { min: 6, max: 7 }, monsters: [ { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] }, { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] } ] },
                { id: 8, name: "Marais Paisible", description: "Marécages trompeurs", icon: "🦎", levelRange: { min: 7, max: 8 }, monsters: [ { id: 'serpent_venimeux', name: 'Serpent venimeux', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] } ] },
                { id: 9, name: "Colline aux Moulins", description: "Colline aux vieux moulins", icon: "🌾", levelRange: { min: 8, max: 9 }, monsters: [ { id: 'bandit_routes', name: 'Bandit des routes', drops: [ { id: 'sac_bandit', name: 'Sac de bandit' } ] }, { id: 'sanglier_sauvage', name: 'Sanglier sauvage', drops: [ { id: 'cuir_sanglier', name: 'Cuir de sanglier' } ] }, { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] }, { id: 'chevalier_renegat', name: 'Chevalier renégat', drops: [ { id: 'heaume_rouille', name: 'Heaume rouillé' } ] } ] },
                { id: 10, name: "Bosquet Lumineux", description: "Bosquet mystique", icon: "✨", levelRange: { min: 9, max: 10 }, monsters: [ { id: 'loup_gris', name: 'Loup gris', drops: [ { id: 'peau_loup', name: 'Peau de loup' } ] }, { id: 'corbeau_noir', name: 'Corbeau noir', drops: [ { id: 'plume_corbeau', name: 'Plume de corbeau' } ] }, { id: 'ours_brun', name: 'Ours brun', drops: [ { id: 'fourrure_ours', name: 'Fourrure d\'ours' } ] }, { id: 'epouvantail_anime', name: 'Épouvantail animé', drops: [ { id: 'paille_maudite', name: 'Paille maudite' } ] }, { id: 'troll_collines', name: 'Troll des collines', drops: [ { id: 'dent_troll', name: 'Dent de troll' } ] }, { id: 'chevalier_renegat', name: 'Chevalier renégat', drops: [ { id: 'heaume_rouille', name: 'Heaume rouillé' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
            ],
            
            boss: {
                id: "bete_prairies",
                name: "La Bête des Prairies",
                description: "Un énorme cerf corrompu",
                icon: "🦌",
                spawnAfterKills: 9,
                minLevel: 10,
                uniqueDrop: "corne_ancienne"
            }
        },
        
        // ==========================================
        // RÉGION 2 : LES MONTAGNES GRISES
        // ==========================================
        {
            id: 2,
            name: "Les Montagnes Grises",
            description: "Hautes montagnes rocheuses habitées par les nains",
            icon: "⛰️",
            levelRange: { min: 11, max: 20 },
            
            faction: {
                name: "Les Nains de Karak-Thar",
                type: "Nains",
                alignment: "Loyal Neutre",
                description: "Peuple de mineurs et forgerons",
                strengths: ["Forge", "Ingénierie", "Mine"],
                military: "Gardes de la Forge"
            },
            
            antagonist: {
                name: "Les Gobelins des Cavernes",
                description: "Créatures souterraines hostiles",
                corruption: "Trolls, Gobelins, Harpies"
            },
            
            capital: {
                id: "karak_thar",
                name: "Karak-Thar",
                description: "Forteresse souterraine des nains",
                icon: "🏔️",
                unlockLevel: 11
            },
            
            towns: [
                { id: "forgehaut", name: "Forgehaut", description: "Village de forgerons", icon: "🔨", unlockLevel: 13 },
                { id: "porteroc", name: "Porteroc", description: "Porte fortifiée de la montagne", icon: "🚪", unlockLevel: 15 },
                { id: "cristalpic", name: "Cristalpic", description: "Mine de cristaux", icon: "💎", unlockLevel: 17 }
            ],
            
            zones: [
                { id: 1, name: "Sentier Rocheux", description: "Chemin escarpé menant aux montagnes", icon: "🥾", levelRange: { min: 11, max: 11 }, monsters: [ { id: 'bat_cavernes', name: 'Chauve-souris', drops: [ { id: 'aile_chauve_souris', name: 'Aile de chauve-souris' } ] }, { id: 'loup_roche', name: 'Loup de roche', drops: [ { id: 'fourrure_epaisse', name: 'Fourrure épaisse' } ] } ] },
                { id: 2, name: "Caverne Sombre", description: "Caverne plongée dans l'obscurité", icon: "🕳️", levelRange: { min: 11, max: 12 }, monsters: [ { id: 'bat_cavernes', name: 'Chauve-souris', drops: [ { id: 'aile_chauve_souris', name: 'Aile de chauve-souris' } ] }, { id: 'bouc_sauvage', name: 'Bouc sauvage', drops: [ { id: 'corne_bouc', name: 'Corne de bouc' } ] } ] },
                { id: 3, name: "Falaise Vertigineuse", description: "Falaises aux vents violents", icon: "🏔️", levelRange: { min: 12, max: 13 }, monsters: [ { id: 'loup_roche', name: 'Loup de roche', drops: [ { id: 'fourrure_epaisse', name: 'Fourrure épaisse' } ] }, { id: 'harpie_falaises', name: 'Harpie', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] } ] },
                { id: 4, name: "Mine Abandonnée", description: "Ancienne mine infestée de gobelins", icon: "⛏️", levelRange: { min: 13, max: 14 }, monsters: [ { id: 'gobelin_mineur', name: 'Gobelin mineur', drops: [ { id: 'champignon_commun', name: 'Champignon commun' } ] }, { id: 'bat_cavernes', name: 'Chauve-souris', drops: [ { id: 'aile_chauve_souris', name: 'Aile de chauve-souris' } ] } ] },
                { id: 5, name: "Forge Ancienne", description: "Ancienne forge des nains", icon: "🔥", levelRange: { min: 14, max: 15 }, monsters: [ { id: 'golem_fissure', name: 'Golem de pierre', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] }, { id: 'gobelin_mineur', name: 'Gobelin mineur', drops: [ { id: 'champignon_commun', name: 'Champignon commun' } ] } ] },
                { id: 6, name: "Galerie Cristalline", description: "Galerie ornée de cristaux", icon: "💎", levelRange: { min: 15, max: 16 }, monsters: [ { id: 'bat_cavernes', name: 'Chauve-souris', drops: [ { id: 'aile_chauve_souris', name: 'Aile de chauve-souris' } ] }, { id: 'golem_fissure', name: 'Golem de pierre', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] } ] },
                { id: 7, name: "Passage du Troll", description: "Tunnel hanté par un troll", icon: "👹", levelRange: { min: 16, max: 17 }, monsters: [ { id: 'troll_montagne', name: 'Troll des montagnes', drops: [ { id: 'os_massif', name: 'Os massif' } ] }, { id: 'gobelin_mineur', name: 'Gobelin mineur', drops: [ { id: 'champignon_commun', name: 'Champignon commun' } ] } ] },
                { id: 8, name: "Sommet Venteux", description: "Sommet balayé par les vents", icon: "🌬️", levelRange: { min: 17, max: 18 }, monsters: [ { id: 'harpie_falaises', name: 'Harpie', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] }, { id: 'loup_roche', name: 'Loup de roche', drops: [ { id: 'fourrure_epaisse', name: 'Fourrure épaisse' } ] } ] },
                { id: 9, name: "Nid de Harpies", description: "Nid perché au sommet", icon: "🪺", levelRange: { min: 18, max: 19 }, monsters: [ { id: 'harpie_falaises', name: 'Harpie', drops: [ { id: 'plume_harpie', name: 'Plume de harpie' } ] }, { id: 'vautour_charognard', name: 'Vautour', drops: [ { id: 'serre_acier', name: 'Serre d\'acier' } ] } ] },
                { id: 10, name: "Trône du Troll", description: "Tanière du roi troll", icon: "👑", levelRange: { min: 19, max: 20 }, monsters: [ { id: 'troll_montagne', name: 'Troll des montagnes', drops: [ { id: 'os_massif', name: 'Os massif' } ] }, { id: 'golem_fissure', name: 'Golem de pierre', drops: [ { id: 'fragment_golem', name: 'Fragment de golem' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
            ],
            
            boss: {
                id: "roi_troll_ancestral",
                name: "Le Roi Troll Ancestral",
                description: "Ancien troll géant gardien des montagnes",
                icon: "👹",
                spawnAfterKills: 9,
                minLevel: 20,
                uniqueDrop: "coeur_troll"
            }
        },
        
        // ==========================================
        // RÉGION 3 : LE DÉSERT DE CENDRES
        // ==========================================
        {
            id: 3,
            name: "Le Désert de Cendres",
            description: "Désert aride parsemé de ruines anciennes",
            icon: "🏜️",
            levelRange: { min: 21, max: 30 },
            
            faction: {
                name: "Les Nomades du Sable",
                type: "Humains",
                alignment: "Chaotique Neutre",
                description: "Tribus nomades du désert",
                strengths: ["Survie", "Navigation", "Commerce"],
                military: "Cavaliers du désert"
            },
            
            antagonist: {
                name: "Les Cultistes du Serpent",
                description: "Culte vénérant les anciens dieux serpents",
                corruption: "Scorpions géants, Momies, Serpents de sable"
            },
            
            capital: {
                id: "oasis_doree",
                name: "Oasis Dorée",
                description: "Oasis luxuriante au cœur du désert",
                icon: "🌴",
                unlockLevel: 21
            },
            
            towns: [
                { id: "campement_vent", name: "Campement du Vent", description: "Camp nomade mobile", icon: "⛺", unlockLevel: 23 },
                { id: "ruines_soleil", name: "Ruines du Soleil", description: "Ruines d'une ancienne cité", icon: "🏛️", unlockLevel: 25 },
                { id: "caravanserail", name: "Le Caravansérail", description: "Poste de commerce", icon: "🐫", unlockLevel: 27 }
            ],
            
            zones: [
                { id: 1, name: "Dunes Dorées", description: "Dunes de sable doré", icon: "🏜️", levelRange: { min: 21, max: 21 }, monsters: [ { id: 'serpent_venimeux', name: 'Serpent de sable', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'loup_gris', name: 'Chacal du désert', drops: [ { id: 'peau_loup', name: 'Peau de chacal' } ] } ] },
                { id: 2, name: "Oasis Empoisonnée", description: "Oasis à l'eau corrompue", icon: "💧", levelRange: { min: 21, max: 22 }, monsters: [ { id: 'serpent_venimeux', name: 'Serpent de sable', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'corbeau_noir', name: 'Vautour', drops: [ { id: 'plumes_sombres', name: 'Plumes sombres' } ] } ] },
                { id: 3, name: "Canyon Rouge", description: "Canyon aux parois rouge sang", icon: "🏔️", levelRange: { min: 22, max: 23 }, monsters: [ { id: 'vautour_charognard', name: 'Vautour du désert', drops: [ { id: 'serre_acier', name: 'Serre acérée' } ] }, { id: 'serpent_venimeux', name: 'Serpent de sable', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] } ] },
                { id: 4, name: "Ruines Oubliées", description: "Ruines d'une civilisation perdue", icon: "🏛️", levelRange: { min: 23, max: 24 }, monsters: [ { id: 'bandit_routes', name: 'Pilleur de ruines', drops: [ { id: 'petit_sac_bandit', name: 'Sac de pilleur' } ] }, { id: 'serpent_venimeux', name: 'Serpent de sable', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] } ] },
                { id: 5, name: "Temple Ensablé", description: "Temple ancien à moitié enfoui", icon: "🕌", levelRange: { min: 24, max: 25 }, monsters: [ { id: 'epouvantail_anime', name: 'Gardien ancien', drops: [ { id: 'essence_vegetale_instable', name: 'Essence ancienne' } ] }, { id: 'sanglier_sauvage', name: 'Scarabée géant', drops: [ { id: 'cuir_sanglier', name: 'Carapace dure' } ] } ] },
                { id: 6, name: "Mer de Sable", description: "Étendue infinie de sable", icon: "🌊", levelRange: { min: 25, max: 26 }, monsters: [ { id: 'serpent_venimeux', name: 'Serpent de sable', drops: [ { id: 'venin_serpent', name: 'Venin de serpent' } ] }, { id: 'loup_gris', name: 'Chacal du désert', drops: [ { id: 'peau_loup', name: 'Peau de chacal' } ] } ] },
                { id: 7, name: "Tombeau Maudit", description: "Tombeau de pharaons maudits", icon: "⚰️", levelRange: { min: 26, max: 27 }, monsters: [ { id: 'bandit_routes', name: 'Garde momifié', drops: [ { id: 'petit_sac_bandit', name: 'Relique ancienne' } ] }, { id: 'epouvantail_anime', name: 'Statue animée', drops: [ { id: 'essence_vegetale_instable', name: 'Essence maudite' } ] } ] },
                { id: 8, name: "Faille Brûlante", description: "Faille crachant des flammes", icon: "🔥", levelRange: { min: 27, max: 28 }, monsters: [ { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'essence_feu', name: 'Essence de feu' } ] }, { id: 'serpent_venimeux', name: 'Serpent de lave', drops: [ { id: 'venin_serpent', name: 'Venin brûlant' } ] } ] },
                { id: 9, name: "Pyramide Noire", description: "Pyramide noire mystérieuse", icon: "🔺", levelRange: { min: 28, max: 29 }, monsters: [ { id: 'epouvantail_anime', name: 'Gardien maudit', drops: [ { id: 'essence_vegetale_instable', name: 'Essence ancienne' } ] }, { id: 'bandit_routes', name: 'Garde élite', drops: [ { id: 'petit_sac_bandit', name: 'Trésor ancien' } ] } ] },
                { id: 10, name: "Sanctuaire du Wyrm", description: "Sanctuaire du grand wyrm", icon: "🐉", levelRange: { min: 29, max: 30 }, monsters: [ { id: 'bandit_routes', name: 'Cultiste', drops: [ { id: 'petit_sac_bandit', name: 'Parchemin maudit' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'essence_feu', name: 'Essence de feu' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
            ],
            
            boss: {
                id: "wyrm_sables",
                name: "Le Wyrm des Sables",
                description: "Dragon de sable ancestral",
                icon: "🐉",
                spawnAfterKills: 9,
                minLevel: 30,
                uniqueDrop: "ecaille_wyrm"
            }
        },
        
        // ==========================================
        // RÉGION 4 : LES TERRES GLACÉES
        // ==========================================
        {
            id: 4,
            name: "Les Terres Glacées",
            description: "Terres éternellement gelées du grand nord",
            icon: "❄️",
            levelRange: { min: 31, max: 40 },
            
            faction: {
                name: "Les Guerriers du Nord",
                type: "Humains",
                alignment: "Chaotique Bon",
                description: "Guerriers endurcis du froid",
                strengths: ["Résistance", "Chasse", "Combat"],
                military: "Berserkers nordiques"
            },
            
            antagonist: {
                name: "Le Seigneur de Glace",
                description: "Tyran gelé cherchant à geler le monde",
                corruption: "Yetis, Loups des glaces, Dragons de glace"
            },
            
            capital: {
                id: "fjord_glace",
                name: "Fjord de Glace",
                description: "Forteresse taillée dans la glace",
                icon: "🏔️",
                unlockLevel: 31
            },
            
            towns: [
                { id: "village_ours", name: "Village de l'Ours", description: "Village de chasseurs", icon: "🐻‍❄️", unlockLevel: 33 },
                { id: "tour_blanche", name: "Tour Blanche", description: "Tour de guet gelée", icon: "🗼", unlockLevel: 35 },
                { id: "caverne_cristal", name: "Caverne de Cristal", description: "Caverne de glace cristalline", icon: "💎", unlockLevel: 37 }
            ],
            
            zones: [
                { id: 1, name: "Toundra Gelée", description: "Plaine de glace éternelle", icon: "🌨️", levelRange: { min: 31, max: 31 }, monsters: [ { id: 'loup_gris', name: 'Loup des glaces', drops: [ { id: 'peau_loup', name: 'Fourrure glacée' } ] }, { id: 'corbeau_glace', name: 'Corbeau de glace', drops: [ { id: 'plume_glace', name: 'Plume glacée' } ] } ] },
                { id: 2, name: "Forêt de Pins Gelés", description: "Forêt de conifères gelés", icon: "🌲", levelRange: { min: 31, max: 32 }, monsters: [ { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure d\'ours blanc' } ] }, { id: 'loup_gris', name: 'Loup des glaces', drops: [ { id: 'peau_loup', name: 'Fourrure glacée' } ] } ] },
                { id: 3, name: "Lac Gelé", description: "Lac recouvert de glace", icon: "🧊", levelRange: { min: 32, max: 33 }, monsters: [ { id: 'elementaire_feu', name: 'Élémentaire de glace', drops: [ { id: 'essence_feu', name: 'Essence de glace' } ] }, { id: 'loup_gris', name: 'Loup des glaces', drops: [ { id: 'peau_loup', name: 'Fourrure glacée' } ] } ] },
                { id: 4, name: "Caverne de Glace", description: "Grotte aux stalactites de glace", icon: "🕳️", levelRange: { min: 33, max: 34 }, monsters: [ { id: 'ours_polaire', name: 'Yéti', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure de yéti' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure d\'ours blanc' } ] } ] },
                { id: 5, name: "Montagne Blanche", description: "Montagne enneigée", icon: "⛰️", levelRange: { min: 34, max: 35 }, monsters: [ { id: 'ours_polaire', name: 'Yéti', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure de yéti' } ] }, { id: 'loup_gris', name: 'Loup des glaces', drops: [ { id: 'peau_loup', name: 'Fourrure glacée' } ] } ] },
                { id: 6, name: "Glacier Éternel", description: "Glacier millénaire", icon: "🏔️", levelRange: { min: 35, max: 36 }, monsters: [ { id: 'elementaire_feu', name: 'Élémentaire de glace', drops: [ { id: 'essence_feu', name: 'Essence de glace' } ] }, { id: 'ours_polaire', name: 'Yéti', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure de yéti' } ] } ] },
                { id: 7, name: "Village Abandonné", description: "Village nordique abandonné", icon: "🏘️", levelRange: { min: 36, max: 37 }, monsters: [ { id: 'bandit_nordique', name: 'Bandit nordique', drops: [ { id: 'armure_nordique', name: 'Armure nordique' } ] }, { id: 'loup_gris', name: 'Loup des glaces', drops: [ { id: 'peau_loup', name: 'Fourrure glacée' } ] } ] },
                { id: 8, name: "Col Venteux", description: "Col battu par les vents glacés", icon: "🌬️", levelRange: { min: 37, max: 38 }, monsters: [ { id: 'corbeau_glace', name: 'Wyverne de glace', drops: [ { id: 'plume_glace', name: 'Écaille de wyverne' } ] }, { id: 'ours_polaire', name: 'Ours polaire', drops: [ { id: 'fourrure_ours_blanc', name: 'Fourrure d\'ours blanc' } ] } ] },
                { id: 9, name: "Temple Gelé", description: "Temple ancien gelé dans la glace", icon: "🕌", levelRange: { min: 38, max: 39 }, monsters: [ { id: 'golem_fissure', name: 'Gardien de glace', drops: [ { id: 'fragment_golem', name: 'Fragment de gardien' } ] }, { id: 'elementaire_feu', name: 'Élémentaire de glace', drops: [ { id: 'essence_feu', name: 'Essence de glace' } ] } ] },
                { id: 10, name: "Trône de Glace", description: "Salle du trône du seigneur de glace", icon: "👑", levelRange: { min: 39, max: 40 }, monsters: [ { id: 'chevalier_renegat', name: 'Chevalier de glace', drops: [ { id: 'heaume_rouille', name: 'Armure de glace' } ] }, { id: 'corbeau_glace', name: 'Wyverne de glace', drops: [ { id: 'plume_glace', name: 'Écaille de wyverne' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
            ],
            
            boss: {
                id: "seigneur_glace",
                name: "Le Seigneur de Glace",
                description: "Tyran gelé régnant sur le grand nord",
                icon: "❄️",
                spawnAfterKills: 9,
                minLevel: 40,
                uniqueDrop: "coeur_glace"
            }
        },
        
        // ==========================================
        // RÉGION 5 : LES TERRES DÉMONIAQUES
        // ==========================================
        {
            id: 5,
            name: "Les Terres Démoniaques",
            description: "Terres corrompues infestées de démons",
            icon: "🔥",
            levelRange: { min: 41, max: 50 },
            
            faction: {
                name: "La Résistance",
                type: "Alliance Multi-races",
                alignment: "Neutre Bon",
                description: "Alliance combattant les démons",
                strengths: ["Magie sainte", "Combat", "Stratégie"],
                military: "Paladins et Inquisiteurs"
            },
            
            antagonist: {
                name: "Les Légions Démoniaques",
                description: "Armée démoniaque cherchant à corrompre le monde",
                corruption: "Diablotins, Succubes, Chevaliers des Enfers"
            },
            
            capital: {
                id: "bastion_lumiere",
                name: "Bastion de Lumière",
                description: "Dernière forteresse contre les démons",
                icon: "🏰",
                unlockLevel: 41
            },
            
            towns: [
                { id: "camp_refuge", name: "Camp Refuge", description: "Camp de réfugiés", icon: "⛺", unlockLevel: 43 },
                { id: "sanctuaire_sacre", name: "Sanctuaire Sacré", description: "Temple de lumière", icon: "⛪", unlockLevel: 45 },
                { id: "tour_gardien", name: "Tour du Gardien", description: "Tour de magie", icon: "🗼", unlockLevel: 47 }
            ],
            
            zones: [
                { id: 1, name: "Terres Brûlées", description: "Terres ravagées par le feu démoniaque", icon: "🔥", levelRange: { min: 41, max: 41 }, monsters: [ { id: 'serpent_venimeux', name: 'Diablotin', drops: [ { id: 'venin_serpent', name: 'Essence démoniaque' } ] }, { id: 'loup_gris', name: 'Chien des enfers', drops: [ { id: 'peau_loup', name: 'Fourrure infernale' } ] } ] },
                { id: 2, name: "Marais de Corruption", description: "Marais empoisonné par la corruption", icon: "☠️", levelRange: { min: 41, max: 42 }, monsters: [ { id: 'serpent_venimeux', name: 'Diablotin', drops: [ { id: 'venin_serpent', name: 'Essence démoniaque' } ] }, { id: 'harpie_falaises', name: 'Succube', drops: [ { id: 'plume_harpie', name: 'Plume corrompue' } ] } ] },
                { id: 3, name: "Forêt Maudite", description: "Forêt corrompue par les démons", icon: "🌲", levelRange: { min: 42, max: 43 }, monsters: [ { id: 'loup_gris', name: 'Chien des enfers', drops: [ { id: 'peau_loup', name: 'Fourrure infernale' } ] }, { id: 'serpent_venimeux', name: 'Diablotin', drops: [ { id: 'venin_serpent', name: 'Essence démoniaque' } ] } ] },
                { id: 4, name: "Ruines Corrompues", description: "Ruines envahies par les démons", icon: "🏚️", levelRange: { min: 43, max: 44 }, monsters: [ { id: 'bandit_routes', name: 'Démon guerrier', drops: [ { id: 'petit_sac_bandit', name: 'Relique démoniaque' } ] }, { id: 'harpie_falaises', name: 'Succube', drops: [ { id: 'plume_harpie', name: 'Plume corrompue' } ] } ] },
                { id: 5, name: "Portail Instable", description: "Portail vers les enfers", icon: "🌀", levelRange: { min: 44, max: 45 }, monsters: [ { id: 'bandit_routes', name: 'Démon guerrier', drops: [ { id: 'petit_sac_bandit', name: 'Relique démoniaque' } ] }, { id: 'serpent_venimeux', name: 'Diablotin', drops: [ { id: 'venin_serpent', name: 'Essence démoniaque' } ] } ] },
                { id: 6, name: "Champ de Lave", description: "Plaine de lave en fusion", icon: "🌋", levelRange: { min: 45, max: 46 }, monsters: [ { id: 'elementaire_feu', name: 'Élémentaire de feu', drops: [ { id: 'essence_feu', name: 'Essence de feu pure' } ] }, { id: 'loup_gris', name: 'Chien des enfers', drops: [ { id: 'peau_loup', name: 'Fourrure infernale' } ] } ] },
                { id: 7, name: "Forteresse Démoniaque", description: "Forteresse des légions", icon: "🏰", levelRange: { min: 46, max: 47 }, monsters: [ { id: 'chevalier_renegat', name: 'Chevalier des enfers', drops: [ { id: 'heaume_rouille', name: 'Heaume infernal' } ] }, { id: 'bandit_routes', name: 'Démon guerrier', drops: [ { id: 'petit_sac_bandit', name: 'Relique démoniaque' } ] } ] },
                { id: 8, name: "Tour de la Succube", description: "Tour de séduction et corruption", icon: "🗼", levelRange: { min: 47, max: 48 }, monsters: [ { id: 'harpie_falaises', name: 'Succube', drops: [ { id: 'plume_harpie', name: 'Plume corrompue' } ] }, { id: 'harpie_falaises', name: 'Succube reine', drops: [ { id: 'plume_harpie', name: 'Plume royale' } ] } ] },
                { id: 9, name: "Abîme Sans Fond", description: "Gouffre menant aux enfers", icon: "🕳️", levelRange: { min: 48, max: 49 }, monsters: [ { id: 'troll_collines', name: 'Démon seigneur', drops: [ { id: 'os_massif', name: 'Fragment démoniaque' } ] }, { id: 'chevalier_renegat', name: 'Chevalier des enfers', drops: [ { id: 'heaume_rouille', name: 'Heaume infernal' } ] } ] },
                { id: 10, name: "Citadelle Infernale", description: "Palais du seigneur démon", icon: "👹", levelRange: { min: 49, max: 50 }, monsters: [ { id: 'troll_collines', name: 'Démon seigneur', drops: [ { id: 'os_massif', name: 'Fragment démoniaque' } ] }, { id: 'golem_fissure', name: 'Garde infernal', drops: [ { id: 'fragment_golem', name: 'Bouclier infernal' } ] } ], isBossZone: true, bossSpawnLogic: "9_normal_then_boss" }
            ],
            
            boss: {
                id: "seigneur_demon",
                name: "Le Seigneur Démon",
                description: "Maître des légions infernales",
                icon: "😈",
                spawnAfterKills: 9,
                minLevel: 50,
                uniqueDrop: "coeur_demon"
            }
        }
    ],
    
    getRegion(regionId) {
        return this.regions.find(r => r.id === regionId);
    },
    
    getZone(regionId, zoneId) {
        const region = this.getRegion(regionId);
        return region ? region.zones.find(z => z.id === zoneId) : null;
    },
    
    getBoss(regionId) {
        const region = this.getRegion(regionId);
        return region ? region.boss : null;
    }
};

if (typeof window !== 'undefined') {
    window.RegionsData = RegionsData;
}
