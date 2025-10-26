/**
 * Configuration du système de Dragons
 * Inspiré de Dofus (Dragodindes) et Equideow
 */

const DragonsConfig = {
    // ========== TYPES DE DRAGONS ==========
    TYPES: {
        force: {
            id: 'force',
            name: 'Dragon de Force',
            raceName: 'Rousse', // Comme les dragodindes rousses de Dofus
            icon: '💪',
            color: '#e74c3c',
            stat: 'force',
            statName: 'Force',
            description: 'Dragons puissants qui augmentent la Force'
        },
        agility: {
            id: 'agility',
            name: 'Dragon d\'Agilité',
            raceName: 'Dorée', // Comme les dorées (rapides et brillantes)
            icon: '⚡',
            color: '#f39c12',
            stat: 'agility',
            statName: 'Agilité',
            description: 'Dragons rapides qui augmentent l\'Agilité'
        },
        intelligence: {
            id: 'intelligence',
            name: 'Dragon d\'Intelligence',
            raceName: 'Amande', // Comme les amandes de Dofus
            icon: '🧠',
            color: '#3498db',
            stat: 'intelligence',
            statName: 'Intelligence',
            description: 'Dragons sages qui augmentent l\'Intelligence'
        },
        wisdom: {
            id: 'wisdom',
            name: 'Dragon de Sagesse',
            raceName: 'Orchidée', // Mystique et rare comme une orchidée
            icon: '✨',
            color: '#9b59b6',
            stat: 'wisdom',
            statName: 'Sagesse',
            description: 'Dragons mystiques qui augmentent la Sagesse'
        },
        endurance: {
            id: 'endurance',
            name: 'Dragon d\'Endurance',
            raceName: 'Émeraude', // Solide et précieux comme l\'émeraude
            icon: '🛡️',
            color: '#2ecc71',
            stat: 'endurance',
            statName: 'Endurance',
            description: 'Dragons robustes qui augmentent l\'Endurance'
        }
    },

    // ========== NOMS DES HYBRIDES (Croisements) ==========
    // Noms uniques pour chaque combinaison de types de dragons
    HYBRID_NAMES: {
        // ===== 2 TYPES (10 combinaisons) =====
        // Force + autres
        'force-agility': 'Flamboiement', // Rapide et puissant
        'force-intelligence': 'Carmillon', // Force intelligente
        'force-wisdom': 'Rubiscent', // Force sage et ancienne
        'force-endurance': 'Brasier', // Puissant et résistant

        // Agility + autres
        'agility-intelligence': 'Célériane', // Rapide et rusé
        'agility-wisdom': 'Aurélion', // Agile et mystique
        'agility-endurance': 'Foudracier', // Rapide et endurant

        // Intelligence + autres
        'intelligence-wisdom': 'Azurite', // Sagesse et intellect
        'intelligence-endurance': 'Cristalline', // Intelligent et robuste

        // Wisdom + Endurance
        'wisdom-endurance': 'Améthyste', // Sage et endurant

        // ===== 3 TYPES (10 combinaisons) =====
        'force-agility-intelligence': 'Prismaflame', // Triple élément tactique
        'force-agility-wisdom': 'Stellaria', // Étoile guerrière
        'force-agility-endurance': 'Titanforge', // Titan rapide
        'force-intelligence-wisdom': 'Arcanius', // Maître des arcanes
        'force-intelligence-endurance': 'Obsidienne', // Pierre volcanique
        'force-wisdom-endurance': 'Gardien', // Protecteur sage
        'agility-intelligence-wisdom': 'Luminescence', // Lumière intelligente
        'agility-intelligence-endurance': 'Mercurial', // Vif-argent
        'agility-wisdom-endurance': 'Zéphyrian', // Vent éternel
        'intelligence-wisdom-endurance': 'Chronolithe', // Pierre du temps

        // ===== 4 TYPES (5 combinaisons) =====
        'force-agility-intelligence-wisdom': 'Omniscient', // Tout-sachant
        'force-agility-intelligence-endurance': 'Conquérant', // Conquérant ultime
        'force-agility-wisdom-endurance': 'Immortel', // Immortel guerrier
        'force-intelligence-wisdom-endurance': 'Archimage', // Mage suprême
        'agility-intelligence-wisdom-endurance': 'Transcendant', // Au-delà

        // ===== 5 TYPES (1 combinaison) =====
        'agility-endurance-force-intelligence-wisdom': 'Primordial' // Dragon originel, maître de tout
    },

    // ========== TIERS DE DRAGONS ==========
    TIERS: {
        0: {
            name: 'Novice',
            color: '#95a5a6',
            minStat: 0,
            maxStat: 20,
            breedCost: 500,
            reproductionCost: 500 // Alias pour compatibilité
        },
        1: {
            name: 'Commun',
            color: '#27ae60',
            minStat: 20,
            maxStat: 40,
            breedCost: 1000,
            reproductionCost: 1000
        },
        2: {
            name: 'Rare',
            color: '#3498db',
            minStat: 40,
            maxStat: 60,
            breedCost: 2000,
            reproductionCost: 2000
        },
        3: {
            name: 'Épique',
            color: '#9b59b6',
            minStat: 60,
            maxStat: 80,
            breedCost: 4000,
            reproductionCost: 4000
        },
        4: {
            name: 'Légendaire',
            color: '#f39c12',
            minStat: 80,
            maxStat: 100,
            breedCost: 8000,
            reproductionCost: 8000
        },
        5: {
            name: 'Mythique',
            color: '#e74c3c',
            minStat: 100,
            maxStat: 120,
            breedCost: 16000,
            reproductionCost: 16000
        }
    },

    // ========== GÉNÉTIQUE & REPRODUCTION ==========
    GENETICS: {
        // Probabilités de base pour la reproduction (même type, même tier)
        BASE_PROBABILITIES: {
            same_tier: 0.60,      // 60% de rester au même tier
            tier_up: 0.35,        // 35% de monter d'un tier
            failure: 0.05         // 5% d'échec
        },

        // Bonus génétiques
        PURITY_BONUS: {
            high_purity: 0.10,    // +10% si pureté > 80%
            same_lineage: 0.05,   // +5% si 4 grands-parents même type
            same_tier_parents: 0.05 // +5% si parents même tier
        },

        // Malus pour hybridation
        HYBRID_PENALTY: {
            two_types: 0.10,      // -10% si 2 types différents
            three_types: 0.20,    // -20% si 3 types différents
            four_types: 0.30      // -30% si 4+ types différents
        },

        // Calcul de pureté (% du type principal dans l'arbre)
        PURITY_CALCULATION: {
            self: 0.50,           // 50% = soi-même
            parents: 0.30,        // 30% = parents (15% chacun)
            grandparents: 0.20    // 20% = grands-parents (5% chacun)
        },

        // Chance de mutation (très rare)
        MUTATION_CHANCE: 0.01,    // 1% de chance de mutation
        MUTATION_BONUS: 5         // +5 stats bonus si mutation
    },

    // ========== SYSTÈME DE VIE ==========
    LIFESPAN: {
        duration: 7 * 24 * 60 * 60 * 1000,  // 7 jours en millisecondes
        warningThreshold: 24 * 60 * 60 * 1000, // Alerte à 24h restantes
        feedingInterval: 60 * 60 * 1000,     // Nourrir toutes les heures (raisonnable pour le gameplay)
        hungerDamage: 1,                     // -1 heure de vie si pas nourri
        maxHungerStacks: 60                  // Max 60 stacks = -60h = -2.5 jours
    },

    // ========== ENTRAÎNEMENT ==========
    TRAINING: {
        maxLevel: 25,
        statsPerLevel: 1,         // +1 stat par niveau
        xpPerTraining: 10,
        xpRequired: (level) => Math.floor(100 * Math.pow(level, 1.3)),
        trainingCost: (level) => Math.floor(100 * level),
        cooldown: 5 * 60 * 1000   // 5 minutes entre chaque entraînement
    },

    // ========== ESSENCE DE DRAGON ==========
    ESSENCE: {
        droppedOnDeath: 1,        // 1 essence par dragon mort
        boostAmount: 5,           // +5 stats permanentes
        applyToStat: true,        // S'applique à la stat principale du dragon
        maxEssencePerDragon: 5    // Maximum 5 essences par dragon (+ 25 stats max)
    },

    // ========== COLLECTION ==========
    COLLECTION: {
        maxDragons: 10,           // 10 dragons maximum en collection
        canExpand: true,          // Possibilité d'agrandir plus tard
        expansionCost: 5000,      // Coût pour +5 slots
        maxExpansions: 4          // Maximum 30 dragons (10 + 4*5)
    },

    // ========== NOMS DE DRAGONS (générés aléatoirement) ==========
    NAMES: {
        prefixes: [
            'Dra', 'Fyr', 'Skar', 'Zal', 'Mor', 'Thal', 'Kor', 'Vex',
            'Ryx', 'Nyx', 'Aer', 'Orm', 'Kra', 'Syl', 'Vor', 'Zeph'
        ],
        suffixes: [
            'gon', 'thor', 'zar', 'moth', 'kor', 'nix', 'dor', 'gar',
            'mor', 'vok', 'rex', 'ion', 'ash', 'eon', 'us', 'is'
        ],
        special: [
            'Alduin', 'Smaug', 'Drogon', 'Viserion', 'Rhaegal', 'Balerion',
            'Vhagar', 'Meraxes', 'Saphira', 'Glaedr', 'Thorn', 'Shruikan'
        ]
    },

    // ========== UI & AFFICHAGE ==========
    UI: {
        showGenealogy: true,
        genealogyDepth: 2,        // Afficher jusqu'aux grands-parents
        showPurityBar: true,
        showLifeTimer: true,
        animateStats: true
    },

    // ========== MÉTHODES UTILITAIRES ==========
    /**
     * Obtient le nom d'un hybride à partir de deux types
     */
    getHybridName(type1, type2) {
        const sortedTypes = [type1, type2].sort();
        const key = sortedTypes.join('-');
        return this.HYBRID_NAMES[key] || null;
    },

    /**
     * Obtient une couleur mélangée pour un hybride
     */
    getHybridColor(type1, type2) {
        const color1 = this.TYPES[type1].color;
        const color2 = this.TYPES[type2].color;

        // Convertir hex en RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        // Moyenne des couleurs
        const avgR = Math.round((rgb1.r + rgb2.r) / 2);
        const avgG = Math.round((rgb1.g + rgb2.g) / 2);
        const avgB = Math.round((rgb1.b + rgb2.b) / 2);

        return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
    },

    /**
     * Obtient un dégradé pour un hybride
     */
    getHybridGradient(type1, type2) {
        const color1 = this.TYPES[type1].color;
        const color2 = this.TYPES[type2].color;
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    },

    /**
     * Obtient tous les hybrides possibles groupés par nombre de types
     */
    getAllHybrids() {
        const hybrids = {
            2: [], // Doubles
            3: [], // Triples
            4: [], // Quadruples
            5: []  // Quintuple
        };

        Object.keys(this.HYBRID_NAMES).forEach(key => {
            const types = key.split('-');
            const typeCount = types.length;

            const hybrid = {
                key,
                name: this.HYBRID_NAMES[key],
                types: types,
                typeCount: typeCount,
                icons: types.map(t => this.TYPES[t].icon).join(''),
                colors: types.map(t => this.TYPES[t].color),
                gradient: this.getMultiGradient(types),
                statNames: types.map(t => this.TYPES[t].statName).join(' + ')
            };

            hybrids[typeCount].push(hybrid);
        });

        return hybrids;
    },

    /**
     * Obtient un dégradé multi-couleurs
     */
    getMultiGradient(types) {
        const colors = types.map(t => this.TYPES[t].color);
        if (colors.length === 1) {
            return colors[0];
        } else if (colors.length === 2) {
            return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
        } else {
            // Pour 3+ couleurs, créer un dégradé avec des stops équidistants
            const stops = colors.map((color, i) => {
                const percent = (i / (colors.length - 1)) * 100;
                return `${color} ${percent}%`;
            }).join(', ');
            return `linear-gradient(135deg, ${stops})`;
        }
    },

    /**
     * Obtient un hybride spécifique par ses types
     */
    getHybridByTypes(types) {
        const sortedTypes = [...types].sort();
        const key = sortedTypes.join('-');
        const name = this.HYBRID_NAMES[key];

        if (!name) return null;

        return {
            key,
            name,
            types: sortedTypes,
            typeCount: sortedTypes.length,
            icons: sortedTypes.map(t => this.TYPES[t].icon).join(''),
            gradient: this.getMultiGradient(sortedTypes),
            statNames: sortedTypes.map(t => this.TYPES[t].statName).join(' + ')
        };
    }
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.DragonsConfig = DragonsConfig;
}
