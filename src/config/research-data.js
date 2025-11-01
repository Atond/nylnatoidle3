/**
 * 🔬 RECHERCHES - Configuration des améliorations permanentes
 * 
 * 5 catégories principales :
 * - 🛠️ PRODUCTION : Vitesse, rendements, coûts
 * - ⚔️ COMBAT : Dégâts, défense, soins
 * - 💎 PROGRESSION : XP, drop rates, unlock levels
 * - 🏛️ VILLE : Stockage, bâtiments, auto-sell
 * - 🔮 ENDGAME : Prestige, multiplicateurs, meta
 */

const ResearchData = {
    // 🛠️ CATÉGORIE 1 : PRODUCTION (15 recherches)
    production: [
        {
            id: 'faster_gathering',
            name: 'Récolte Rapide I',
            description: 'Récolte manuelle +10% plus rapide',
            icon: '⚡',
            cost: { gold: 500 },
            effect: { gatherSpeed: 0.1 },
            tier: 1
        },
        {
            id: 'faster_gathering_2',
            name: 'Récolte Rapide II',
            description: 'Récolte manuelle +20% plus rapide',
            icon: '⚡',
            cost: { gold: 2000 },
            effect: { gatherSpeed: 0.2 },
            tier: 2,
            requires: ['faster_gathering']
        },
        {
            id: 'faster_gathering_3',
            name: 'Récolte Rapide III',
            description: 'Récolte manuelle +30% plus rapide',
            icon: '⚡',
            cost: { gold: 8000 },
            effect: { gatherSpeed: 0.3 },
            tier: 3,
            requires: ['faster_gathering_2']
        },
        {
            id: 'auto_gather_boost',
            name: 'Auto-Récolte Efficace',
            description: 'Auto-récolte 25% plus rapide',
            icon: '🤖',
            cost: { gold: 3000, wood_oak: 50, ore_iron: 50 },
            effect: { autoGatherSpeed: 0.25 },
            tier: 2
        },
        {
            id: 'double_drop_chance',
            name: 'Chance de Butin Double',
            description: 'Drop double +10% (en plus des bonus métier)',
            icon: '🎲',
            cost: { gold: 5000, gems_emerald: 5 },
            effect: { doubleDropBonus: 0.1 },
            tier: 2
        },
        {
            id: 'resource_yield',
            name: 'Rendement Amélioré I',
            description: 'Toutes ressources +5% par clic',
            icon: '📦',
            cost: { gold: 4000 },
            effect: { resourceYield: 0.05 },
            tier: 2
        },
        {
            id: 'resource_yield_2',
            name: 'Rendement Amélioré II',
            description: 'Toutes ressources +10% par clic',
            icon: '📦',
            cost: { gold: 12000, gems_sapphire: 10 },
            effect: { resourceYield: 0.1 },
            tier: 3,
            requires: ['resource_yield']
        },
        {
            id: 'building_efficiency',
            name: 'Bâtiments Efficaces I',
            description: 'Production passive +15%',
            icon: '🏭',
            cost: { gold: 6000, wood_oak: 100, ore_iron: 100 },
            effect: { buildingProduction: 0.15 },
            tier: 2
        },
        {
            id: 'building_efficiency_2',
            name: 'Bâtiments Efficaces II',
            description: 'Production passive +30%',
            icon: '🏭',
            cost: { gold: 20000, wood_mahogany: 50, ore_mithril: 50 },
            effect: { buildingProduction: 0.3 },
            tier: 3,
            requires: ['building_efficiency']
        },
        {
            id: 'crafting_speed',
            name: 'Artisanat Rapide I',
            description: 'Crafting instantané (pas de temps d\'attente)',
            icon: '🔨',
            cost: { gold: 3000 },
            effect: { craftingSpeed: 1.0 },
            tier: 2
        },
        {
            id: 'crafting_cost_reduction',
            name: 'Économie de Ressources',
            description: 'Coûts de craft -10%',
            icon: '💰',
            cost: { gold: 8000, gems_ruby: 5 },
            effect: { craftingCostReduction: 0.1 },
            tier: 3
        },
        {
            id: 'fast_transmutation',
            name: 'Alchimie Accélérée',
            description: 'Temps de transmutation -50%',
            icon: '⚗️',
            cost: { gold: 15000, gems_ruby: 10 },
            effect: { transmutationSpeed: 0.5 },
            tier: 3
        },
        {
            id: 'quality_craft_chance',
            name: 'Maître Artisan',
            description: '+15% chance de craft qualité supérieure',
            icon: '✨',
            cost: { gold: 15000, gems_emerald: 10, gems_sapphire: 10 },
            effect: { qualityCraftBonus: 0.15 },
            tier: 3
        },
        {
            id: 'passive_click_boost',
            name: 'Synergie Active-Passive',
            description: 'Bonus passif niveau 50 : 5% → 8%',
            icon: '🌟',
            cost: { gold: 25000, gems_diamond: 5 },
            effect: { passiveClickBonus: 0.03 },
            tier: 4,
            requires: []
        },
        {
            id: 'mass_production',
            name: 'Production de Masse',
            description: 'Tous les bâtiments +50% production',
            icon: '🏗️',
            cost: { gold: 50000, wood_elderwood: 100, ore_adamantite: 100 },
            effect: { buildingProduction: 0.5 },
            tier: 4,
            requires: ['building_efficiency_2']
        },
        {
            id: 'legendary_crafter',
            name: 'Artisan Légendaire',
            description: '+25% chance craft qualité supérieure (cumul avec Maître)',
            icon: '👑',
            cost: { gold: 100000, gems_diamond: 20, gems_ruby: 20 },
            effect: { qualityCraftBonus: 0.25 },
            tier: 5,
            requires: ['quality_craft_chance']
        }
    ],

    // ⚔️ CATÉGORIE 2 : COMBAT (12 recherches)
    combat: [
        {
            id: 'combat_damage',
            name: 'Frappe Puissante I',
            description: 'Dégâts en combat +10%',
            icon: '⚔️',
            cost: { gold: 1000, ore_iron: 30 },
            effect: { combatDamage: 0.1 },
            tier: 1
        },
        {
            id: 'combat_damage_2',
            name: 'Frappe Puissante II',
            description: 'Dégâts en combat +25%',
            icon: '⚔️',
            cost: { gold: 5000, ore_steel: 50 },
            effect: { combatDamage: 0.25 },
            tier: 2,
            requires: ['combat_damage']
        },
        {
            id: 'combat_damage_3',
            name: 'Frappe Puissante III',
            description: 'Dégâts en combat +50%',
            icon: '⚔️',
            cost: { gold: 20000, ore_mithril: 100 },
            effect: { combatDamage: 0.5 },
            tier: 3,
            requires: ['combat_damage_2']
        },
        {
            id: 'combat_defense',
            name: 'Défense Renforcée I',
            description: 'Défense +15%',
            icon: '🛡️',
            cost: { gold: 1500, ore_iron: 50 },
            effect: { combatDefense: 0.15 },
            tier: 1
        },
        {
            id: 'combat_defense_2',
            name: 'Défense Renforcée II',
            description: 'Défense +30%',
            icon: '🛡️',
            cost: { gold: 6000, ore_steel: 80 },
            effect: { combatDefense: 0.3 },
            tier: 2,
            requires: ['combat_defense']
        },
        {
            id: 'combat_health',
            name: 'Vitalité Accrue',
            description: 'PV maximum +20%',
            icon: '❤️',
            cost: { gold: 3000, plant_healing_herb: 100 },
            effect: { maxHealth: 0.2 },
            tier: 2
        },
        {
            id: 'combat_regen',
            name: 'Régénération Naturelle',
            description: 'Récupère 1% PV max par seconde hors combat',
            icon: '💚',
            cost: { gold: 4000, plant_healing_herb: 200 },
            effect: { healthRegen: 0.01 },
            tier: 2
        },
        {
            id: 'combat_crit_chance',
            name: 'Coup Critique',
            description: '+10% chance de coup critique (×2 dégâts)',
            icon: '💥',
            cost: { gold: 8000, gems_ruby: 10 },
            effect: { critChance: 0.1 },
            tier: 3
        },
        {
            id: 'combat_lightning_speed',
            name: 'Combat Éclair',
            description: 'Vitesse d\'attaque +20% (plus rapide)',
            icon: '⚡',
            cost: { gold: 12000, gems_sapphire: 15, ore_platinum: 50 },
            effect: { attackSpeed: 0.2 },
            tier: 3
        },
        {
            id: 'combat_loot_bonus',
            name: 'Pillard Expert',
            description: '+25% butin des donjons',
            icon: '💎',
            cost: { gold: 10000, gems_emerald: 15 },
            effect: { dungeonLootBonus: 0.25 },
            tier: 3
        },
        {
            id: 'combat_dodge',
            name: 'Esquive',
            description: '+5% chance d\'esquiver une attaque',
            icon: '🌀',
            cost: { gold: 12000, gems_sapphire: 10 },
            effect: { dodgeChance: 0.05 },
            tier: 3
        },
        {
            id: 'combat_lifesteal',
            name: 'Vol de Vie',
            description: 'Récupère 10% des dégâts infligés en PV',
            icon: '🩸',
            cost: { gold: 25000, gems_ruby: 20 },
            effect: { lifesteal: 0.1 },
            tier: 4
        },
        {
            id: 'combat_berserker',
            name: 'Rage du Berserker',
            description: '+2% dégâts par 1% PV manquant (max +100%)',
            icon: '😡',
            cost: { gold: 50000, gems_diamond: 10 },
            effect: { berserkerRage: 2.0 },
            tier: 5
        }
    ],

    // 💎 CATÉGORIE 3 : PROGRESSION (10 recherches)
    progression: [
        {
            id: 'xp_boost',
            name: 'Apprentissage Rapide I',
            description: 'XP métiers +15%',
            icon: '📚',
            cost: { gold: 2000 },
            effect: { xpBonus: 0.15 },
            tier: 1
        },
        {
            id: 'xp_boost_2',
            name: 'Apprentissage Rapide II',
            description: 'XP métiers +30%',
            icon: '📚',
            cost: { gold: 8000 },
            effect: { xpBonus: 0.3 },
            tier: 2,
            requires: ['xp_boost']
        },
        {
            id: 'xp_boost_3',
            name: 'Apprentissage Rapide III',
            description: 'XP métiers +50%',
            icon: '📚',
            cost: { gold: 30000, gems_sapphire: 20 },
            effect: { xpBonus: 0.5 },
            tier: 3,
            requires: ['xp_boost_2']
        },
        {
            id: 'rare_drop_chance',
            name: 'Chasseur de Raretés',
            description: '+10% chance drop ressources rares',
            icon: '🎁',
            cost: { gold: 5000, gems_emerald: 5 },
            effect: { rareDropBonus: 0.1 },
            tier: 2
        },
        {
            id: 'gem_find',
            name: 'Prospecteur de Gemmes',
            description: 'Gemmes +50% plus fréquentes (mineur)',
            icon: '💎',
            cost: { gold: 10000, ore_mithril: 100 },
            effect: { gemDropBonus: 0.5 },
            tier: 3
        },
        {
            id: 'unlock_early',
            name: 'Expertise Précoce',
            description: 'Ressources débloquées 5 niveaux plus tôt',
            icon: '🔓',
            cost: { gold: 15000, gems_diamond: 3 },
            effect: { unlockLevelReduction: 5 },
            tier: 3
        },
        {
            id: 'quest_rewards',
            name: 'Renégociateur',
            description: 'Récompenses de quêtes +25%',
            icon: '📜',
            cost: { gold: 12000 },
            effect: { questRewardBonus: 0.25 },
            tier: 3
        },
        {
            id: 'merchant_discount',
            name: 'Négociant Habile',
            description: 'Prix de vente +15% (auto-sell, vendeur)',
            icon: '💰',
            cost: { gold: 8000 },
            effect: { sellPriceBonus: 0.15 },
            tier: 2
        },
        {
            id: 'prestige_bonus',
            name: 'Momentum Prestige',
            description: '+10% bonus par prestige (multiplicateur)',
            icon: '♻️',
            cost: { gold: 100000, gems_diamond: 50 },
            effect: { prestigeBonusMultiplier: 0.1 },
            tier: 5
        },
        {
            id: 'lucky_charm',
            name: 'Charme de Chance',
            description: '+5% toutes les chances (drop, crit, double, esquive)',
            icon: '🍀',
            cost: { gold: 50000, gems_emerald: 30, gems_ruby: 30, gems_sapphire: 30 },
            effect: { globalLuckBonus: 0.05 },
            tier: 4
        }
    ],

    // 🏛️ CATÉGORIE 4 : VILLE (8 recherches)
    town: [
        {
            id: 'storage_expansion',
            name: 'Stockage Amélioré I',
            description: 'Capacité stockage +25%',
            icon: '📦',
            cost: { gold: 3000, wood_oak: 100 },
            effect: { storageCapacity: 0.25 },
            tier: 2
        },
        {
            id: 'storage_expansion_2',
            name: 'Stockage Amélioré II',
            description: 'Capacité stockage +50%',
            icon: '📦',
            cost: { gold: 12000, wood_mahogany: 200 },
            effect: { storageCapacity: 0.5 },
            tier: 3,
            requires: ['storage_expansion']
        },
        {
            id: 'storage_expansion_3',
            name: 'Stockage Amélioré III',
            description: 'Capacité stockage +100%',
            icon: '📦',
            cost: { gold: 50000, wood_elderwood: 300 },
            effect: { storageCapacity: 1.0 },
            tier: 4,
            requires: ['storage_expansion_2']
        },
        {
            id: 'building_cost_reduction',
            name: 'Architecture Efficace',
            description: 'Coûts construction/amélioration -15%',
            icon: '🏗️',
            cost: { gold: 5000, wood_oak: 50, ore_iron: 50 },
            effect: { buildingCostReduction: 0.15 },
            tier: 2
        },
        {
            id: 'auto_sell_tax_reduction',
            name: 'Taxe Réduite',
            description: 'Taxe auto-sell : 10% → 5%',
            icon: '💸',
            cost: { gold: 10000 },
            effect: { autoSellTaxReduction: 0.05 },
            tier: 3
        },
        {
            id: 'auto_sell_threshold',
            name: 'Vente Anticipée',
            description: 'Auto-sell déclenché à 70% (au lieu de 80%)',
            icon: '⚙️',
            cost: { gold: 8000 },
            effect: { autoSellThreshold: -0.1 },
            tier: 3
        },
        {
            id: 'population_bonus',
            name: 'Ville Prospère',
            description: '+20% production tous bâtiments',
            icon: '🏘️',
            cost: { gold: 20000, wood_mahogany: 100, ore_mithril: 100 },
            effect: { buildingProduction: 0.2 },
            tier: 3
        },
        {
            id: 'mega_city',
            name: 'Métropole',
            description: 'Débloquer niveau 100 pour tous les bâtiments',
            icon: '🌆',
            cost: { gold: 500000, wood_elderwood: 1000, ore_adamantite: 1000, gems_diamond: 100 },
            effect: { maxBuildingLevel: 100 },
            tier: 6
        }
    ],

    // 🔮 CATÉGORIE 5 : ENDGAME (7 recherches)
    endgame: [
        {
            id: 'prestige_unlock',
            name: 'Éveil du Prestige',
            description: 'Débloquer le système de Prestige (requiert niveau 100 total)',
            icon: '⭐',
            cost: { gold: 100000 },
            effect: { unlockPrestige: true },
            tier: 4
        },
        {
            id: 'global_multiplier',
            name: 'Catalyseur Universel I',
            description: 'TOUT +10% (production, combat, XP, drops)',
            icon: '🌍',
            cost: { gold: 50000, gems_diamond: 20 },
            effect: { globalMultiplier: 0.1 },
            tier: 4
        },
        {
            id: 'global_multiplier_2',
            name: 'Catalyseur Universel II',
            description: 'TOUT +25% (cumul avec I)',
            icon: '🌍',
            cost: { gold: 200000, gems_diamond: 100, gems_ruby: 100 },
            effect: { globalMultiplier: 0.25 },
            tier: 5,
            requires: ['global_multiplier']
        },
        {
            id: 'idle_optimizer',
            name: 'Optimisation Idle',
            description: 'Production idle continue même déconnecté (max 8h)',
            icon: '💤',
            cost: { gold: 75000, gems_sapphire: 50 },
            effect: { offlineProduction: 8 },
            tier: 4
        },
        {
            id: 'infinite_potential',
            name: 'Potentiel Infini',
            description: 'Pas de niveau max pour les métiers',
            icon: '♾️',
            cost: { gold: 500000, gems_diamond: 200 },
            effect: { removeLevelCap: true },
            tier: 6
        },
        {
            id: 'auto_progression',
            name: 'Progression Automatique',
            description: 'Auto-craft, auto-équipement, auto-donjon (IA)',
            icon: '🤖',
            cost: { gold: 1000000, gems_diamond: 500 },
            effect: { autoProgression: true },
            tier: 6
        },
        {
            id: 'transcendence',
            name: 'Transcendance',
            description: 'TOUT ×2 de façon permanente',
            icon: '✨',
            cost: { gold: 10000000, gems_diamond: 1000 },
            effect: { transcendenceMultiplier: 2.0 },
            tier: 7
        }
    ]
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.ResearchData = ResearchData;
}
