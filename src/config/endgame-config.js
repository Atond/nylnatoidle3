/**
 * Configuration des Systèmes Endgame - Rejouabilité et Progression Avancée
 * 
 * Ce fichier contient les configurations pour :
 * - Shared Storage (Coffre de guilde/compte)
 * - Donjons et Raids (drops spéciaux)
 * - Prestige System (rejouabilité)
 * - Transmutation avancée
 */

const EndgameConfig = {
    
    // ========== SHARED STORAGE (Coffre de Guilde/Compte) ==========
    sharedStorage: {
        enabled: false, // À activer plus tard
        unlockLevel: 20, // Niveau requis pour débloquer
        unlockQuest: 'Q20_shared_storage', // Quête associée
        
        // Capacité du coffre partagé
        baseCapacity: 1000,
        capacityPerLevel: 500,
        maxLevel: 10,
        
        // Coût d'upgrade
        upgradeCost: {
            gold: (level) => 10000 * Math.pow(2, level - 1),
            gems: (level) => 10 * level
        },
        
        // Restrictions
        restrictions: {
            // Les ressources ne peuvent être déposées que si le niveau unlock est atteint
            requireUnlockLevel: true,
            
            // Limite de transfert par jour (anti-abuse)
            dailyTransferLimit: 10000,
            
            // Cooldown entre transferts (en secondes)
            transferCooldown: 60
        }
    },
    
    // ========== DONJONS & RAIDS ==========
    dungeons: {
        enabled: false, // À implémenter plus tard
        
        // Configuration des donjons par niveau
        levels: [
            {
                level: 10,
                name: 'Caverne des Ombres',
                requiredPlayerLevel: 10,
                rewards: {
                    // Boss drops des ressources T2/T3 même si pas unlock
                    guaranteedDrops: [
                        { resourceId: 'wood_birch', amount: 50 },
                        { resourceId: 'ore_bronze', amount: 50 }
                    ],
                    rareDrop: [
                        { resourceId: 'wood_cedar', amount: 10, chance: 0.2 },
                        { resourceId: 'ore_gold', amount: 10, chance: 0.2 }
                    ],
                    gold: 1000,
                    experience: 500
                }
            },
            {
                level: 20,
                name: 'Temple Oublié',
                requiredPlayerLevel: 20,
                rewards: {
                    guaranteedDrops: [
                        { resourceId: 'wood_cedar', amount: 50 },
                        { resourceId: 'ore_gold', amount: 50 },
                        { resourceId: 'plant_mandrake', amount: 30 },
                        { resourceId: 'fish_blue_tuna', amount: 30 }
                    ],
                    rareDrop: [
                        { resourceId: 'wood_sequoia', amount: 10, chance: 0.15 },
                        { resourceId: 'ore_obsidian', amount: 10, chance: 0.15 }
                    ],
                    gold: 5000,
                    experience: 2000
                }
            },
            {
                level: 30,
                name: 'Forteresse du Dragon',
                requiredPlayerLevel: 30,
                rewards: {
                    guaranteedDrops: [
                        { resourceId: 'wood_sequoia', amount: 50 },
                        { resourceId: 'ore_obsidian', amount: 50 },
                        { resourceId: 'plant_ginseng', amount: 40 },
                        { resourceId: 'fish_swordfish', amount: 40 }
                    ],
                    rareDrop: [
                        { resourceId: 'wood_baobab', amount: 10, chance: 0.1 },
                        { resourceId: 'ore_adamantite', amount: 10, chance: 0.1 }
                    ],
                    gold: 15000,
                    experience: 5000,
                    dragonEggs: 1 // Spécial : Oeufs de dragon pour breeding
                }
            },
            {
                level: 40,
                name: 'Sanctuaire Élémentaire',
                requiredPlayerLevel: 40,
                rewards: {
                    guaranteedDrops: [
                        { resourceId: 'wood_moonwillow', amount: 50 },
                        { resourceId: 'ore_electrum', amount: 50 },
                        { resourceId: 'plant_glowing_mushroom', amount: 40 }
                    ],
                    rareDrop: [
                        { resourceId: 'wood_ironwood', amount: 10, chance: 0.08 },
                        { resourceId: 'ore_orichalcum', amount: 10, chance: 0.08 }
                    ],
                    gold: 50000,
                    experience: 15000,
                    ascensionTokens: 1 // Prestige currency
                }
            },
            {
                level: 50,
                name: 'Citadelle du Néant',
                requiredPlayerLevel: 50,
                rewards: {
                    guaranteedDrops: [
                        { resourceId: 'wood_crystal', amount: 100 },
                        { resourceId: 'ore_etherium', amount: 100 },
                        { resourceId: 'plant_spectral_lotus', amount: 80 },
                        { resourceId: 'fish_dragon_fish', amount: 80 }
                    ],
                    rareDrop: [
                        { resourceId: 'wood_shadow', amount: 20, chance: 0.05 },
                        { resourceId: 'ore_draconium', amount: 20, chance: 0.05 },
                        { resourceId: 'gem_obsidian_heart', amount: 1, chance: 0.01 }
                    ],
                    gold: 100000,
                    experience: 50000,
                    ascensionTokens: 5,
                    divineFragments: 1 // Ultra-rare endgame currency
                }
            }
        ],
        
        // Raids (content 5 joueurs, future implementation)
        raids: {
            enabled: false,
            minPlayers: 5,
            maxPlayers: 10,
            // À définir plus tard
        }
    },
    
    // ========== PRESTIGE SYSTEM ==========
    prestige: {
        enabled: false, // À implémenter plus tard
        
        // Configuration
        unlockLevel: 50, // Niveau minimum pour prestige
        unlockQuest: 'Q35_apotheosis_complete', // Compléter toutes les quêtes
        
        // Récompenses permanentes par prestige
        bonusPerPrestige: {
            // Bonus multiplicatifs (stackent)
            dropRateBonus: 0.05,           // +5% drop rate
            xpGainBonus: 0.10,             // +10% XP gain
            goldGainBonus: 0.15,           // +15% Gold
            
            // Réductions de requirements
            unlockLevelReduction: 2,       // Ressources unlock 2 niveaux plus tôt
            transmutationBonus: 0.90,      // Ratio 10:1 devient 9:1 (puis 8.1:1, etc.)
            
            // Bonus de production bâtiments
            buildingProductionBonus: 0.20  // +20% production
        },
        
        // Ce qui est conservé après prestige
        keepOnPrestige: {
            resources: false,              // Ressources perdues
            gold: false,                   // Or perdu
            equipment: false,              // Équipement perdu
            
            craftRecipes: true,            // Recettes apprises conservées
            questProgress: false,          // Quêtes reset
            professionLevels: false,       // Niveaux métiers reset
            
            buildings: true,               // Bâtiments conservés (mais niveau reset)
            dragons: true,                 // Dragons conservés
            
            prestigeLevel: true,           // Compte le nombre de prestiges
            ascensionTokens: true,         // Currency permanente
            divineFragments: true          // Currency ultra-rare
        },
        
        // Récompenses en Ascension Tokens
        ascensionTokensGained: (prestigeLevel) => {
            // Formule : 100 * prestigeLevel^1.5
            return Math.floor(100 * Math.pow(prestigeLevel, 1.5));
        },
        
        // Prestige Shop (achats permanents)
        prestigeShop: [
            {
                id: 'auto_gather_all',
                name: 'Auto-Récolte Universelle',
                description: 'Active auto-gather sur TOUS les métiers de récolte dès le niveau 1',
                cost: 100,
                effect: { type: 'unlock', value: 'auto_gather_all' }
            },
            {
                id: 'instant_craft',
                name: 'Craft Instantané',
                description: 'Toutes les recettes se craftent instantanément',
                cost: 250,
                effect: { type: 'unlock', value: 'instant_craft' }
            },
            {
                id: 'shared_storage_unlock',
                name: 'Déverrouillage Coffre Partagé',
                description: 'Accès immédiat au coffre partagé niveau 1',
                cost: 150,
                effect: { type: 'unlock', value: 'shared_storage' }
            },
            {
                id: 'double_building_production',
                name: 'Production x2',
                description: 'Double la production de TOUS les bâtiments en permanence',
                cost: 500,
                effect: { type: 'multiplier', target: 'building_production', value: 2.0 }
            },
            {
                id: 'resource_multiplier_1',
                name: 'Récolte x1.5',
                description: '+50% ressources obtenues en récoltant',
                cost: 300,
                effect: { type: 'multiplier', target: 'resource_gain', value: 1.5 }
            },
            {
                id: 'resource_multiplier_2',
                name: 'Récolte x2',
                description: 'Double les ressources obtenues en récoltant (stacke avec x1.5)',
                cost: 800,
                requires: 'resource_multiplier_1',
                effect: { type: 'multiplier', target: 'resource_gain', value: 2.0 }
            },
            {
                id: 'transmutation_tier_skip',
                name: 'Transmutation Avancée',
                description: 'Permet de convertir T1 → T3 directement (ratio 50:1)',
                cost: 600,
                effect: { type: 'unlock', value: 'transmutation_tier_skip' }
            },
            {
                id: 'dragon_breeding_boost',
                name: 'Élevage de Dragons Accéléré',
                description: 'Réduit le temps de breeding des dragons de 50%',
                cost: 400,
                effect: { type: 'multiplier', target: 'dragon_breeding_speed', value: 0.5 }
            },
            {
                id: 'combat_power_boost',
                name: 'Puissance de Combat +25%',
                description: 'Augmente tous les stats de combat de 25%',
                cost: 350,
                effect: { type: 'multiplier', target: 'combat_stats', value: 1.25 }
            },
            {
                id: 'dungeon_loot_boost',
                name: 'Butin de Donjon Amélioré',
                description: '+50% de récompenses dans les donjons',
                cost: 450,
                effect: { type: 'multiplier', target: 'dungeon_rewards', value: 1.5 }
            },
            {
                id: 'ultimate_idle',
                name: 'Idle Ultime',
                description: 'Gains passifs continuent même hors ligne (jusqu\'à 72h)',
                cost: 1000,
                effect: { type: 'unlock', value: 'offline_progression' }
            }
        ]
    },
    
    // ========== TRANSMUTATION AVANCÉE ==========
    transmutation: {
        // Unlock niveau 15 (au lieu de 30)
        unlockLevel: 15,
        unlockQuest: 'Q17_transmutation',
        
        // Recettes de base (disponibles niveau 15)
        basicRecipes: [
            {
                id: 'transmute_wood_t1_t2',
                name: 'Bois T1 → T2',
                inputTier: 1,
                outputTier: 2,
                ratio: 10, // 10 ressources T1 = 1 ressource T2
                category: 'wood'
            },
            {
                id: 'transmute_ore_t1_t2',
                name: 'Minerai T1 → T2',
                inputTier: 1,
                outputTier: 2,
                ratio: 10,
                category: 'ore'
            },
            {
                id: 'transmute_plant_t1_t2',
                name: 'Plante T1 → T2',
                inputTier: 1,
                outputTier: 2,
                ratio: 10,
                category: 'plants'
            },
            {
                id: 'transmute_fish_t1_t2',
                name: 'Poisson T1 → T2',
                inputTier: 1,
                outputTier: 2,
                ratio: 10,
                category: 'fish'
            }
        ],
        
        // Recettes avancées (unlock niveau 25)
        advancedRecipes: [
            {
                id: 'transmute_wood_t2_t3',
                name: 'Bois T2 → T3',
                inputTier: 2,
                outputTier: 3,
                ratio: 10,
                category: 'wood',
                unlockLevel: 25
            },
            {
                id: 'transmute_ore_t2_t3',
                name: 'Minerai T2 → T3',
                inputTier: 2,
                outputTier: 3,
                ratio: 10,
                category: 'ore',
                unlockLevel: 25
            },
            {
                id: 'transmute_plant_t2_t3',
                name: 'Plante T2 → T3',
                inputTier: 2,
                outputTier: 3,
                ratio: 10,
                category: 'plants',
                unlockLevel: 25
            },
            {
                id: 'transmute_fish_t2_t3',
                name: 'Poisson T2 → T3',
                inputTier: 2,
                outputTier: 3,
                ratio: 10,
                category: 'fish',
                unlockLevel: 25
            }
        ],
        
        // Recettes expertes (unlock niveau 35)
        expertRecipes: [
            {
                id: 'transmute_wood_t3_t4',
                name: 'Bois T3 → T4',
                inputTier: 3,
                outputTier: 4,
                ratio: 15, // Plus dur
                category: 'wood',
                unlockLevel: 35
            },
            {
                id: 'transmute_ore_t3_t4',
                name: 'Minerai T3 → T4',
                inputTier: 3,
                outputTier: 4,
                ratio: 15,
                category: 'ore',
                unlockLevel: 35
            },
            // T1 → T3 direct (Prestige shop unlock)
            {
                id: 'transmute_wood_t1_t3_skip',
                name: 'Bois T1 → T3 (Direct)',
                inputTier: 1,
                outputTier: 3,
                ratio: 50,
                category: 'wood',
                requiresPrestigeUpgrade: 'transmutation_tier_skip'
            }
        ],
        
        // Recettes master (unlock niveau 50)
        masterRecipes: [
            {
                id: 'transmute_any_to_divine',
                name: 'Transmutation Divine',
                description: 'Convertit n\'importe quelle ressource en T7 (Divine)',
                inputTier: 'any',
                outputTier: 7,
                ratio: 100,
                requiresGems: true, // Nécessite des gemmes en plus
                gemCost: 10,
                unlockLevel: 50
            }
        ]
    },
    
    // ========== DROP RATE MODIFIERS PAR RÉGION ==========
    regionDropModifiers: {
        // Modificateurs appliqués selon la région du joueur
        // Exemple : En Région 2, les ressources T1 ont 100% drop, T2 ont 100%, T3 ont 30%
        
        region1: { // Plaines (1-10)
            tier1: 1.0,   // 100% drop
            tier2: 0.3,   // 30% drop (lucky drops)
            tier3: 0.05,  // 5% drop (ultra rare)
            tier4: 0.0    // Impossible
        },
        
        region2: { // Montagnes (11-20)
            tier1: 1.0,   // 100% drop (toujours utile pour Transmutation)
            tier2: 1.0,   // 100% drop (région principale)
            tier3: 0.3,   // 30% drop (lucky drops)
            tier4: 0.05   // 5% drop (ultra rare)
        },
        
        region3: { // Forêt (21-30)
            tier1: 1.0,
            tier2: 1.0,
            tier3: 1.0,   // 100% drop (région principale)
            tier4: 0.3,   // 30% drop
            tier5: 0.05
        },
        
        region4: { // Marais (31-40)
            tier1: 1.0,
            tier2: 1.0,
            tier3: 1.0,
            tier4: 1.0,   // 100% drop
            tier5: 0.3,
            tier6: 0.05
        },
        
        region5: { // Terres Désolées (41-50)
            tier1: 1.0,
            tier2: 1.0,
            tier3: 1.0,
            tier4: 1.0,
            tier5: 1.0,   // 100% drop
            tier6: 0.3,
            tier7: 0.05
        }
    }
};

// Export pour utilisation globale
if (typeof window !== 'undefined') {
    window.EndgameConfig = EndgameConfig;
}
