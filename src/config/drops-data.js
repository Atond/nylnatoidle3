/**
 * Données des Ressources Droppées par les Monstres
 * 
 * Région 1 : Les Plaines Verdoyantes
 */

const DropsData = {
    
    // ========== DROPS COMMUNS ==========
    // Monstres communs : Loups, Sangliers, Bandits, Corbeaux
    
    monster_hide: {
        id: 'monster_hide',
        name: "Peau de Monstre",
        description: "Peau brute récupérée sur une bête sauvage. Peut être utilisée telle quelle ou traitée par un Tanneur.",
        icon: "�",
        type: "resource",
        rarity: "common",
        dropChance: 0.40, // 40% de chance
        quantity: { min: 1, max: 3 },
        sellPrice: 5
    },
    
    griffes_usees: {
        id: 'griffes_usees',
        name: "Griffes Usées",
        description: "Griffes abîmées mais utilisables",
        icon: "🗡️",
        type: "resource",
        rarity: "common",
        dropChance: 0.25, // 25% de chance
        quantity: { min: 1, max: 2 },
        sellPrice: 8
    },
    
    plumes_sombres: {
        id: 'plumes_sombres',
        name: "Plumes Sombres",
        description: "Plumes noires lustrées",
        icon: "🪶",
        type: "resource",
        rarity: "common",
        dropChance: 0.50, // 50% de chance
        quantity: { min: 2, max: 5 },
        sellPrice: 3
    },
    
    petit_sac_bandit: {
        id: 'petit_sac_bandit',
        name: "Petit Sac de Bandit",
        description: "Contient de l'or et quelques babioles",
        icon: "💰",
        type: "gold",
        rarity: "common",
        dropChance: 0.30, // 30% de chance
        goldBonus: { min: 10, max: 30 }, // Or bonus directement ajouté
        sellPrice: 0 // Ne se vend pas, donne l'or directement
    },
    
    // ========== DROPS RARES ==========
    // Monstres rares : Ours, Serpents, Épouvantails
    
    cuir_robuste: {
        id: 'cuir_robuste',
        name: "Cuir Robuste",
        description: "Cuir épais et résistant",
        icon: "🛡️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.60, // 60% sur monstre rare
        quantity: { min: 1, max: 2 },
        sellPrice: 30
    },
    
    crocs_venimeux: {
        id: 'crocs_venimeux',
        name: "Crocs Venimeux",
        description: "Crocs de serpent contenant encore du venin",
        icon: "🦷",
        type: "resource",
        rarity: "rare",
        dropChance: 0.50, // 50% sur serpent
        quantity: { min: 1, max: 1 },
        sellPrice: 50
    },
    
    essence_vegetale_instable: {
        id: 'essence_vegetale_instable',
        name: "Essence Végétale Instable",
        description: "Énergie magique végétale corrompue",
        icon: "🌿",
        type: "resource",
        rarity: "rare",
        dropChance: 0.40, // 40% sur épouvantail
        quantity: { min: 1, max: 1 },
        sellPrice: 40
    },
    
    // ========== DROPS ÉLITES ==========
    // Monstres élites : Troll, Chevalier Renégat
    
    os_massif: {
        id: 'os_massif',
        name: "Os Massif",
        description: "Os énorme provenant d'une grande créature",
        icon: "🦴",
        type: "resource",
        rarity: "elite",
        dropChance: 0.70, // 70% sur élite
        quantity: { min: 1, max: 2 },
        sellPrice: 80
    },
    
    armure_cabossee: {
        id: 'armure_cabossee',
        name: "Armure Cabossée",
        description: "Pièce d'armure endommagée mais réparable",
        icon: "🛡️",
        type: "resource",
        rarity: "elite",
        dropChance: 0.60, // 60% sur chevalier
        quantity: { min: 1, max: 1 },
        sellPrice: 100
    },
    
    sang_concentre: {
        id: 'sang_concentre',
        name: "Sang Concentré",
        description: "Sang épais rempli d'énergie vitale",
        icon: "💉",
        type: "resource",
        rarity: "elite",
        dropChance: 0.50, // 50% sur élite
        quantity: { min: 1, max: 1 },
        sellPrice: 120
    },
    
    // ========== RÉGION 2 : LES MONTAGNES GRISES ==========
    
    // Drops Communs Région 2
    aile_chauve_souris: {
        id: 'aile_chauve_souris',
        name: "Aile de Chauve-souris",
        description: "Membrane fine mais résistante",
        icon: "🦇",
        type: "resource",
        rarity: "common",
        dropChance: 0.45,
        quantity: { min: 1, max: 3 },
        sellPrice: 8
    },
    
    croc_acere: {
        id: 'croc_acere',
        name: "Croc Acéré",
        description: "Croc pointu et tranchant",
        icon: "🦷",
        type: "resource",
        rarity: "common",
        dropChance: 0.35,
        quantity: { min: 1, max: 2 },
        sellPrice: 12
    },
    
    fourrure_epaisse: {
        id: 'fourrure_epaisse',
        name: "Fourrure Épaisse",
        description: "Pelage dense protégeant du froid",
        icon: "🧥",
        type: "resource",
        rarity: "common",
        dropChance: 0.50,
        quantity: { min: 1, max: 2 },
        sellPrice: 10
    },
    
    // Drops Uncommon Région 2
    corne_bouc: {
        id: 'corne_bouc',
        name: "Corne de Bouc",
        description: "Corne robuste et spiralée",
        icon: "🎺",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.30,
        quantity: { min: 1, max: 2 },
        sellPrice: 25
    },
    
    fragment_golem: {
        id: 'fragment_golem',
        name: "Fragment de Golem",
        description: "Morceau de pierre enchantée",
        icon: "🪨",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.28,
        quantity: { min: 1, max: 1 },
        sellPrice: 35
    },
    
    plume_harpie: {
        id: 'plume_harpie',
        name: "Plume de Harpie",
        description: "Plume magique légère comme l'air",
        icon: "🪶",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.32,
        quantity: { min: 1, max: 2 },
        sellPrice: 30
    },
    
    // Drops Rares Région 2
    cristal_montagne: {
        id: 'cristal_montagne',
        name: "Cristal de Montagne",
        description: "Gemme pure formée dans les profondeurs rocheuses",
        icon: "💎",
        type: "resource",
        rarity: "rare",
        dropChance: 0.08,
        quantity: { min: 1, max: 1 },
        sellPrice: 80
    },
    
    serre_acier: {
        id: 'serre_acier',
        name: "Serre d'Acier",
        description: "Griffe de harpie dure comme du métal",
        icon: "🗡️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.10,
        quantity: { min: 1, max: 1 },
        sellPrice: 70
    },
    
    peau_geant: {
        id: 'peau_geant',
        name: "Peau de Géant",
        description: "Peau épaisse et quasi-impénétrable",
        icon: "🛡️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.12,
        quantity: { min: 1, max: 1 },
        sellPrice: 90
    },
    
    // Drops Légendaires Région 2
    armure_naine: {
        id: 'armure_naine',
        name: "Armure Naine",
        description: "Pièce d'armure forgée par les maîtres de Granithelm",
        icon: "⚔️",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.03,
        quantity: { min: 1, max: 1 },
        sellPrice: 200
    },
    
    hachette_runique: {
        id: 'hachette_runique',
        name: "Hachette Runique",
        description: "Arme gravée de runes anciennes",
        icon: "🪓",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.04,
        quantity: { min: 1, max: 1 },
        sellPrice: 180
    },
    
    coeur_montagne: {
        id: 'coeur_montagne',
        name: "Cœur de Montagne",
        description: "Essence cristallisée de la montagne elle-même",
        icon: "❤️",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.02,
        quantity: { min: 1, max: 1 },
        sellPrice: 250
    },
    
    // ========== DROPS BOSS RÉGION 1 ==========
    // Boss : La Bête des Prairies
    
    corne_ancienne: {
        id: 'corne_ancienne',
        name: "Corne Ancienne",
        description: "Bois de cerf millénaire imprégné de magie",
        icon: "🦌",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 500,
        unique: true // Ressource unique de boss
    },
    
    cuir_legendaire: {
        id: 'cuir_legendaire',
        name: "Cuir Légendaire",
        description: "Peau d'une créature légendaire",
        icon: "✨",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 2, max: 3 },
        sellPrice: 400,
        unique: true
    },
    
    essence_vie_sauvage: {
        id: 'essence_vie_sauvage',
        name: "Essence de la Vie Sauvage",
        description: "Énergie primordiale de la nature, utilisée pour crafts puissants",
        icon: "🌟",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 1000,
        unique: true,
        craftingMaterial: true // Utilisé pour crafts légendaires
    },
    
    // ========== DROPS BOSS RÉGION 2 ==========
    // Boss : Forgemort
    
    marteau_forgemort: {
        id: 'marteau_forgemort',
        name: "Marteau de Forgemort",
        description: "Arme légendaire du seigneur de forge corrompu",
        icon: "⚒️",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 800,
        unique: true
    },
    
    armure_forge_eternelle: {
        id: 'armure_forge_eternelle',
        name: "Armure de la Forge Éternelle",
        description: "Pièce d'armure forgée dans les flammes immortelles",
        icon: "🛡️",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 2 },
        sellPrice: 600,
        unique: true
    },
    
    coeur_forge: {
        id: 'coeur_forge',
        name: "Cœur de la Forge",
        description: "Essence du feu éternel des forges naines, matériau de craft ultime",
        icon: "🔥",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 1200,
        unique: true,
        craftingMaterial: true
    },
    
    // ========== RÉGION 3 : LA FORÊT ANCESTRALE ==========
    
    // Drops Communs Région 3
    peau_epaisse: {
        id: 'peau_epaisse',
        name: "Peau Épaisse",
        description: "Peau robuste de bête forestière",
        icon: "🦌",
        type: "resource",
        rarity: "common",
        dropChance: 0.50,
        quantity: { min: 1, max: 3 },
        sellPrice: 10
    },
    
    dard_venimeux: {
        id: 'dard_venimeux',
        name: "Dard Venimeux",
        description: "Croc de serpent gorgé de poison",
        icon: "🦷",
        type: "resource",
        rarity: "common",
        dropChance: 0.40,
        quantity: { min: 1, max: 2 },
        sellPrice: 15
    },
    
    champignon_commun: {
        id: 'champignon_commun',
        name: "Champignon Commun",
        description: "Champignon forestier comestible",
        icon: "🍄",
        type: "resource",
        rarity: "common",
        dropChance: 0.45,
        quantity: { min: 1, max: 4 },
        sellPrice: 8
    },
    
    soie_araignee: {
        id: 'soie_araignee',
        name: "Soie d'Araignée",
        description: "Fil résistant produit par les araignées géantes",
        icon: "🕸️",
        type: "resource",
        rarity: "common",
        dropChance: 0.40,
        quantity: { min: 1, max: 3 },
        sellPrice: 15
    },
    
    croc_loup_garou: {
        id: 'croc_loup_garou',
        name: "Croc de Loup-Garou",
        description: "Croc maudit d'un loup-garou, imprégné de magie noire",
        icon: "🦷",
        type: "resource",
        rarity: "common",
        dropChance: 0.35,
        quantity: { min: 1, max: 2 },
        sellPrice: 18
    },
    
    essence_spectrale: {
        id: 'essence_spectrale',
        name: "Essence Spectrale",
        description: "Énergie fantomatique capturée d'un spectre",
        icon: "👻",
        type: "resource",
        rarity: "common",
        dropChance: 0.30,
        quantity: { min: 1, max: 1 },
        sellPrice: 20
    },
    
    // Drops Uncommon Région 3
    bois_impregne: {
        id: 'bois_impregne',
        name: "Bois Imprégné",
        description: "Bois gorgé de magie sylvestre",
        icon: "🪵",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.32,
        quantity: { min: 1, max: 2 },
        sellPrice: 30
    },
    
    spore_luminescente: {
        id: 'spore_luminescente',
        name: "Spore Luminescente",
        description: "Spore brillant dans l'obscurité",
        icon: "✨",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.28,
        quantity: { min: 1, max: 2 },
        sellPrice: 35
    },
    
    plume_spectrale: {
        id: 'plume_spectrale',
        name: "Plume Spectrale",
        description: "Plume fantomatique et légère",
        icon: "🪶",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.30,
        quantity: { min: 1, max: 1 },
        sellPrice: 32
    },
    
    seve_corrompue: {
        id: 'seve_corrompue',
        name: "Sève Corrompue",
        description: "Sève d'arbre corrompue par l'Ombre",
        icon: "🌳",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.35,
        quantity: { min: 1, max: 1 },
        sellPrice: 40
    },
    
    grimoire_dechire: {
        id: 'grimoire_dechire',
        name: "Grimoire Déchiré",
        description: "Pages de sortilèges anciennes, partiellement détruites",
        icon: "📖",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.32,
        quantity: { min: 1, max: 1 },
        sellPrice: 55
    },
    
    // Drops Rares Région 3
    ecorce_vivante: {
        id: 'ecorce_vivante',
        name: "Écorce Vivante",
        description: "Écorce d'ent toujours animée par la vie",
        icon: "🌳",
        type: "resource",
        rarity: "rare",
        dropChance: 0.10,
        quantity: { min: 1, max: 1 },
        sellPrice: 90
    },
    
    arc_brise: {
        id: 'arc_brise',
        name: "Arc Brisé",
        description: "Arc elfique ancien et puissant, mais endommagé",
        icon: "🏹",
        type: "resource",
        rarity: "rare",
        dropChance: 0.12,
        quantity: { min: 1, max: 1 },
        sellPrice: 85
    },
    
    essence_sylvestre: {
        id: 'essence_sylvestre',
        name: "Essence Sylvestre",
        description: "Essence pure de la forêt ancestrale",
        icon: "🌿",
        type: "resource",
        rarity: "rare",
        dropChance: 0.08,
        quantity: { min: 1, max: 1 },
        sellPrice: 100
    },
    
    sang_vampire: {
        id: 'sang_vampire',
        name: "Sang de Vampire",
        description: "Sang noir et épais d'un vampire ancien",
        icon: "🩸",
        type: "resource",
        rarity: "rare",
        dropChance: 0.45,
        quantity: { min: 1, max: 1 },
        sellPrice: 80
    },
    
    phylactere_brise: {
        id: 'phylactere_brise',
        name: "Phylactère Brisé",
        description: "Fragment d'un réceptacle d'âme de liche",
        icon: "💀",
        type: "resource",
        rarity: "rare",
        dropChance: 0.40,
        quantity: { min: 1, max: 1 },
        sellPrice: 100
    },
    
    pierre_gardienne: {
        id: 'pierre_gardienne',
        name: "Pierre Gardienne",
        description: "Pierre enchantée d'un gardien ancien de la forêt",
        icon: "🗿",
        type: "resource",
        rarity: "rare",
        dropChance: 0.50,
        quantity: { min: 1, max: 1 },
        sellPrice: 120
    },
    
    // Drops Légendaires Région 3
    larmes_dryade: {
        id: 'larmes_dryade',
        name: "Larmes de Dryade",
        description: "Larmes cristallisées d'un esprit sylvestre",
        icon: "💧",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.04,
        quantity: { min: 1, max: 1 },
        sellPrice: 220
    },
    
    fleur_corrompue: {
        id: 'fleur_corrompue',
        name: "Fleur Corrompue",
        description: "Fleur magnifique mais empoisonnée par l'Ombre",
        icon: "🌺",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.03,
        quantity: { min: 1, max: 1 },
        sellPrice: 200
    },
    
    coeur_ancien: {
        id: 'coeur_ancien',
        name: "Cœur d'Arbre Ancien",
        description: "Cœur pulsant d'un arbre millénaire",
        icon: "❤️",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.02,
        quantity: { min: 1, max: 1 },
        sellPrice: 250
    },
    
    // ========== DROPS BOSS RÉGION 3 ==========
    // Boss : La Nymphe Sombre
    
    essence_nature_dechue: {
        id: 'essence_nature_dechue',
        name: "Essence de la Nature Déchue",
        description: "Pouvoir corrompu de la Nymphe Sombre",
        icon: "🌑",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 1500,
        unique: true,
        craftingMaterial: true
    },
    
    couronne_sylvestre: {
        id: 'couronne_sylvestre',
        name: "Couronne Sylvestre Corrompue",
        description: "Ancienne couronne de la gardienne de la forêt",
        icon: "👑",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 1200,
        unique: true,
        craftingMaterial: true
    },
    
    sceptre_nature: {
        id: 'sceptre_nature',
        name: "Sceptre de la Nature",
        description: "Bâton druidique aux pouvoirs immenses",
        icon: "🌿",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 1300,
        unique: true,
        craftingMaterial: true
    },
    
    // ========== RÉGION 4 : LES TERRES BRÛLÉES ==========
    
    // Drops Communs Région 4
    carapace_brulee: {
        id: 'carapace_brulee',
        name: "Carapace Brûlée",
        description: "Carapace de scorpion résistante à la chaleur",
        icon: "🦂",
        type: "resource",
        rarity: "common",
        dropChance: 0.48,
        quantity: { min: 1, max: 3 },
        sellPrice: 12
    },
    
    peau_ecailleuse: {
        id: 'peau_ecailleuse',
        name: "Peau Écailleuse",
        description: "Peau de reptile adaptée aux environnements chauds",
        icon: "🦎",
        type: "resource",
        rarity: "common",
        dropChance: 0.45,
        quantity: { min: 1, max: 2 },
        sellPrice: 14
    },
    
    morceau_arme_grossiere: {
        id: 'morceau_arme_grossiere',
        name: "Morceau d'Arme Grossière",
        description: "Fragment d'arme orc, lourd et brutal",
        icon: "⚔️",
        type: "resource",
        rarity: "common",
        dropChance: 0.42,
        quantity: { min: 1, max: 2 },
        sellPrice: 18
    },
    
    // Drops Uncommon Région 4
    flamme_instable: {
        id: 'flamme_instable',
        name: "Flamme Instable",
        description: "Essence de feu volatile, dangereuse mais précieuse",
        icon: "🔥",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.30,
        quantity: { min: 1, max: 1 },
        sellPrice: 40
    },
    
    plume_embrasee: {
        id: 'plume_embrasee',
        name: "Plume Embrasée",
        description: "Plume de harpie toujours chaude au toucher",
        icon: "🪶",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.28,
        quantity: { min: 1, max: 2 },
        sellPrice: 38
    },
    
    fragment_basalte: {
        id: 'fragment_basalte',
        name: "Fragment de Basalte",
        description: "Morceau de roche volcanique noire et dense",
        icon: "🪨",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.32,
        quantity: { min: 1, max: 2 },
        sellPrice: 35
    },
    
    // Drops Rares Région 4
    sang_fusion: {
        id: 'sang_fusion',
        name: "Sang en Fusion",
        description: "Sang d'orc berserker, bouillonnant de rage",
        icon: "🩸",
        type: "resource",
        rarity: "rare",
        dropChance: 0.11,
        quantity: { min: 1, max: 1 },
        sellPrice: 95
    },
    
    armure_volcanique: {
        id: 'armure_volcanique',
        name: "Armure Volcanique",
        description: "Pièce d'armure forgée dans les terres brûlées",
        icon: "🛡️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.10,
        quantity: { min: 1, max: 1 },
        sellPrice: 100
    },
    
    cristal_ardent: {
        id: 'cristal_ardent',
        name: "Cristal Ardent",
        description: "Cristal de feu pur, rayonnant de chaleur",
        icon: "💎",
        type: "resource",
        rarity: "rare",
        dropChance: 0.09,
        quantity: { min: 1, max: 1 },
        sellPrice: 110
    },
    
    // Drops Légendaires Région 4
    cendres_eternelles: {
        id: 'cendres_eternelles',
        name: "Cendres Éternelles",
        description: "Cendres qui ne refroidissent jamais",
        icon: "🌪️",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.03,
        quantity: { min: 1, max: 1 },
        sellPrice: 240
    },
    
    baton_runique_calcine: {
        id: 'baton_runique_calcine',
        name: "Bâton Runique Calciné",
        description: "Arme du prêtre, gravée de runes de feu",
        icon: "🪄",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.04,
        quantity: { min: 1, max: 1 },
        sellPrice: 230
    },
    
    pierre_magma: {
        id: 'pierre_magma',
        name: "Pierre de Magma",
        description: "Pierre volcanique contenant du magma liquide",
        icon: "🌋",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.02,
        quantity: { min: 1, max: 1 },
        sellPrice: 260
    },
    
    // ========== DROPS BOSS RÉGION 4 ==========
    // Boss : Prêtre du Brasier Noir
    
    essence_feu_obscur: {
        id: 'essence_feu_obscur',
        name: "Essence du Feu Obscur",
        description: "Pouvoir corrompu du Prêtre du Brasier Noir",
        icon: "🔥",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 2000,
        unique: true,
        craftingMaterial: true
    },
    
    orbe_brasier: {
        id: 'orbe_brasier',
        name: "Orbe du Brasier Éternel",
        description: "Sphère de feu contenant une puissance apocalyptique",
        icon: "🔮",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 1800,
        unique: true,
        craftingMaterial: true
    },
    
    manteau_cendres: {
        id: 'manteau_cendres',
        name: "Manteau de Cendres Noires",
        description: "Cape du prêtre, tissée de cendres éternelles",
        icon: "🧥",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 1700,
        unique: true,
        craftingMaterial: true
    },
    
    // ========== RÉGION 5 : LE NORD GELÉ ==========
    
    // Drops Communs Région 5
    fourrure_epaisse_nord: {
        id: 'fourrure_epaisse_nord',
        name: "Fourrure Épaisse du Nord",
        description: "Pelage dense isolant du froid extrême",
        icon: "🐻‍❄️",
        type: "resource",
        rarity: "common",
        dropChance: 0.50,
        quantity: { min: 1, max: 3 },
        sellPrice: 15
    },
    
    griffes_glacees: {
        id: 'griffes_glacees',
        name: "Griffes Glacées",
        description: "Griffes de prédateur du grand nord",
        icon: "🐾",
        type: "resource",
        rarity: "common",
        dropChance: 0.42,
        quantity: { min: 1, max: 2 },
        sellPrice: 18
    },
    
    fragment_bois_gele: {
        id: 'fragment_bois_gele',
        name: "Fragment de Bois Gelé",
        description: "Bois durci par le froid perpétuel",
        icon: "🪵",
        type: "resource",
        rarity: "common",
        dropChance: 0.45,
        quantity: { min: 1, max: 2 },
        sellPrice: 16
    },
    
    // Drops Uncommon Région 5
    eclat_glace_pure: {
        id: 'eclat_glace_pure',
        name: "Éclat de Glace Pure",
        description: "Fragment de glace cristalline immuable",
        icon: "💎",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.30,
        quantity: { min: 1, max: 2 },
        sellPrice: 42
    },
    
    defense_gelee: {
        id: 'defense_gelee',
        name: "Défense Gelée",
        description: "Défense de morse géant, solide comme la pierre",
        icon: "🦷",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.28,
        quantity: { min: 1, max: 1 },
        sellPrice: 45
    },
    
    ectoplasme_givre: {
        id: 'ectoplasme_givre',
        name: "Ectoplasme Givré",
        description: "Essence spectrale figée par le froid",
        icon: "👻",
        type: "resource",
        rarity: "uncommon",
        dropChance: 0.32,
        quantity: { min: 1, max: 2 },
        sellPrice: 40
    },
    
    // Drops Rares Région 5
    coeur_gele: {
        id: 'coeur_gele',
        name: "Cœur Gelé",
        description: "Cœur de yéti toujours froid",
        icon: "❤️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.10,
        quantity: { min: 1, max: 1 },
        sellPrice: 110
    },
    
    armure_spectrale: {
        id: 'armure_spectrale',
        name: "Armure Spectrale",
        description: "Pièce d'armure nordique fantomatique",
        icon: "🛡️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.11,
        quantity: { min: 1, max: 1 },
        sellPrice: 105
    },
    
    essence_glaciale: {
        id: 'essence_glaciale',
        name: "Essence Glaciale",
        description: "Essence pure du froid éternel",
        icon: "❄️",
        type: "resource",
        rarity: "rare",
        dropChance: 0.09,
        quantity: { min: 1, max: 1 },
        sellPrice: 115
    },
    
    // Drops Légendaires Région 5
    cape_blizzard: {
        id: 'cape_blizzard',
        name: "Cape du Blizzard",
        description: "Manteau tissé de tempêtes éternelles",
        icon: "🧥",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.03,
        quantity: { min: 1, max: 1 },
        sellPrice: 270
    },
    
    cor_guerre_brise: {
        id: 'cor_guerre_brise',
        name: "Cor de Guerre Brisé",
        description: "Ancien cor nordique fendu par le temps",
        icon: "📯",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.04,
        quantity: { min: 1, max: 1 },
        sellPrice: 260
    },
    
    cristal_givre_eternel: {
        id: 'cristal_givre_eternel',
        name: "Cristal de Givre Éternel",
        description: "Gemme de glace qui ne fond jamais",
        icon: "💠",
        type: "resource",
        rarity: "legendary",
        dropChance: 0.02,
        quantity: { min: 1, max: 1 },
        sellPrice: 280
    },
    
    // ========== DROPS BOSS RÉGION 5 ==========
    // Boss : Le Héraut du Blizzard Noir
    
    essence_froid_eternel: {
        id: 'essence_froid_eternel',
        name: "Essence du Froid Éternel",
        description: "Pouvoir ultime du Héraut du Blizzard Noir",
        icon: "❄️",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0, // 100% garanti
        quantity: { min: 1, max: 1 },
        sellPrice: 2500,
        unique: true,
        craftingMaterial: true
    },
    
    couronne_nord: {
        id: 'couronne_nord',
        name: "Couronne du Nord",
        description: "Couronne de glace du champion de l'Ombre",
        icon: "👑",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 2200,
        unique: true,
        craftingMaterial: true
    },
    
    epee_blizzard: {
        id: 'epee_blizzard',
        name: "Épée du Blizzard Noir",
        description: "Lame légendaire du Héraut, tranchante comme le vent glacial",
        icon: "⚔️",
        type: "resource",
        rarity: "legendary",
        dropChance: 1.0,
        quantity: { min: 1, max: 1 },
        sellPrice: 2300,
        unique: true,
        craftingMaterial: true
    },
    
    /**
     * Obtenir les données d'un drop par ID
     */
    getDrop(dropId) {
        return this[dropId] || null;
    },
    
    /**
     * Calculer les drops d'un monstre
     */
    calculateDrops(monsterData) {
        const drops = [];
        
        if (!monsterData.dropTable) return drops;
        
        // Pour chaque drop possible
        for (const dropId of monsterData.dropTable) {
            const dropData = this.getDrop(dropId);
            if (!dropData) continue;
            
            // Vérifier si le drop tombe (RNG)
            const roll = Math.random();
            const dropChance = monsterData.guaranteedDrops ? 1.0 : dropData.dropChance;
            
            if (roll < dropChance) {
                // Calculer la quantité
                let quantity = 1;
                if (dropData.quantity) {
                    quantity = Math.floor(
                        Math.random() * (dropData.quantity.max - dropData.quantity.min + 1)
                    ) + dropData.quantity.min;
                }
                
                // Ajouter le drop
                drops.push({
                    id: dropId,
                    name: dropData.name,
                    icon: dropData.icon,
                    quantity: quantity,
                    rarity: dropData.rarity,
                    goldBonus: dropData.goldBonus || null
                });
            }
        }
        
        return drops;
    },
    
    /**
     * Ajouter les drops à l'inventaire du joueur
     */
    applyDrops(game, drops) {
        let totalGoldBonus = 0;
        const droppedItems = [];
        
        for (const drop of drops) {
            const dropData = this.getDrop(drop.id);
            
            // Si c'est un bonus d'or
            if (dropData.type === 'gold' && drop.goldBonus) {
                const goldAmount = Math.floor(
                    Math.random() * (drop.goldBonus.max - drop.goldBonus.min + 1)
                ) + drop.goldBonus.min;
                totalGoldBonus += goldAmount;
            }
            // Si c'est une ressource
            else if (dropData.type === 'resource') {
                // Ajouter à l'inventaire via ProfessionManager
                const resourceId = `loot_${drop.id}`;
                if (game.professionManager) {
                    game.professionManager.addToInventory(resourceId, drop.quantity);
                }
                
                droppedItems.push({
                    id: resourceId,
                    name: drop.name,
                    icon: drop.icon,
                    quantity: drop.quantity,
                    rarity: drop.rarity
                });
            }
        }
        
        // Ajouter l'or bonus
        if (totalGoldBonus > 0) {
            game.player.resources.gold += totalGoldBonus;
        }
        
        return { items: droppedItems, goldBonus: totalGoldBonus };
    }
};

// Export pour utilisation dans le jeu
if (typeof window !== 'undefined') {
    window.DropsData = DropsData;
}
