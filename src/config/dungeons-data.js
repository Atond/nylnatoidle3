/**
 * 🏰 DUNGEONS DATA - Configuration des donjons
 * 
 * 5 donjons avec progression de difficulté, boss stats équilibrées, loot tables
 */

const DungeonsData = [
    
    // ========================================
    // 🏰 DONJON 1 : CAVERNE DES OMBRES (Niveau 25)
    // ========================================
    {
        id: 'caverne_ombres',
        name: 'Caverne des Ombres',
        description: 'Une caverne infestée de créatures des ténèbres. Premier donjon accessible.',
        level: 25,
        requiredPlayers: 3,
        entryCost: 500,
        region: 2,
        
        // Boss
        boss: {
            id: 'ombre_primordiale',
            name: 'Ombre Primordiale',
            level: 25,
            hp: 12000,
            attack: 50,
            defense: 10,
            mechanics: 'Attaque simple sur Tank',
            description: 'Une ombre ancienne qui hante la caverne depuis des siècles.'
        },
        
        // Stats recommandées
        recommendedStats: {
            tank: {
                hp: 450,
                defense: 80,
                endurance: 35,
                note: 'Doit survivre 5+ minutes avec heal moyen'
            },
            heal: {
                intelligence: 60,
                wisdom: 30,
                healPerSec: 35,
                note: 'Boss fait 50 DPS, il faut 35+ HPS minimum'
            },
            dps: {
                attack: 180,
                strength: 120,
                dpsPerSec: 300,
                note: 'Boss a 12,000 HP, il faut tuer en <4min'
            }
        },
        
        // Durée estimée
        estimatedTime: 240, // secondes (4 minutes)
        
        // Récompenses
        rewards: {
            xp: 2000,
            gold: 2500,
            
            // Loot garanti
            guaranteedLoot: [
                { resourceId: 'wood_ash', min: 40, max: 60 },
                { resourceId: 'ore_steel', min: 40, max: 60 },
                { resourceId: 'essence_shadow', min: 5, max: 15 }
            ],
            
            // Loot rare (chance drop)
            rareLoot: [
                {
                    id: 'helmet_guardian_shadows',
                    name: 'Casque du Gardien des Ombres',
                    rarity: 'epic',
                    slot: 'helmet',
                    archetype: 'tank',
                    stats: { hp: 100, defense: 50, endurance: 30 },
                    setBonus: { set: 'guardian_shadows', bonuses: { 2: '+10% HP', 4: '+15% Block', 6: 'Reflect 5% dmg' } },
                    dropChance: 0.25 // 25%
                },
                {
                    id: 'staff_wisdom',
                    name: 'Bâton de Sagesse',
                    rarity: 'rare',
                    slot: 'weapon',
                    archetype: 'heal',
                    stats: { intelligence: 40, wisdom: 20, healPower: 15 },
                    dropChance: 0.30 // 30%
                },
                {
                    id: 'sword_shadow',
                    name: 'Épée de l\'Ombre',
                    rarity: 'rare',
                    slot: 'weapon',
                    archetype: 'dps',
                    stats: { attack: 80, strength: 40, critChance: 10 },
                    dropChance: 0.30 // 30%
                }
            ]
        }
    },
    
    // ========================================
    // 🏰 DONJON 2 : TEMPLE OUBLIÉ (Niveau 35)
    // ========================================
    {
        id: 'temple_oublie',
        name: 'Temple Oublié',
        description: 'Un temple ancien rempli de gardiens magiques. Difficulté moyenne.',
        level: 35,
        requiredPlayers: 3,
        entryCost: 1500,
        region: 3,
        
        boss: {
            id: 'gardien_temple',
            name: 'Gardien du Temple',
            level: 35,
            hp: 25000,
            attack: 65,
            defense: 20,
            mechanics: 'Spike damage toutes les 30s (+50% dégâts)',
            description: 'Un gardien de pierre animé par une magie ancienne.'
        },
        
        recommendedStats: {
            tank: {
                hp: 600,
                defense: 120,
                endurance: 50,
                note: 'Doit encaisser les spikes de 100 dmg'
            },
            heal: {
                intelligence: 80,
                wisdom: 40,
                healPerSec: 50,
                note: 'Boss fait 65 DPS avec spikes à 100 DPS'
            },
            dps: {
                attack: 250,
                strength: 150,
                dpsPerSec: 500,
                note: 'Boss a 25,000 HP, tuer en <5min'
            }
        },
        
        estimatedTime: 360, // 6 minutes
        
        rewards: {
            xp: 5000,
            gold: 7500,
            
            guaranteedLoot: [
                { resourceId: 'wood_ebony', min: 50, max: 80 },
                { resourceId: 'ore_mythril', min: 50, max: 80 },
                { resourceId: 'essence_arcane', min: 10, max: 20 }
            ],
            
            rareLoot: [
                {
                    id: 'chest_temple_guardian',
                    name: 'Plastron du Gardien du Temple',
                    rarity: 'epic',
                    slot: 'chest',
                    archetype: 'tank',
                    stats: { hp: 150, defense: 80, endurance: 50 },
                    setBonus: { set: 'temple_guardian', bonuses: { 2: '+15% HP', 4: '+20% Block', 6: '-10% dmg taken' } },
                    dropChance: 0.20
                },
                {
                    id: 'robe_sage',
                    name: 'Robe du Sage Oublié',
                    rarity: 'epic',
                    slot: 'chest',
                    archetype: 'heal',
                    stats: { intelligence: 60, wisdom: 40, healPower: 25 },
                    setBonus: { set: 'forgotten_sage', bonuses: { 2: '+10% Heal', 4: '+15% Mana', 6: 'Heal AoE' } },
                    dropChance: 0.20
                },
                {
                    id: 'sword_arcane',
                    name: 'Lame Arcanique',
                    rarity: 'epic',
                    slot: 'weapon',
                    archetype: 'dps',
                    stats: { attack: 120, strength: 60, critDamage: 50 },
                    dropChance: 0.25
                }
            ]
        }
    },
    
    // ========================================
    // 🏰 DONJON 3 : FORTERESSE DU DRAGON (Niveau 45)
    // ========================================
    {
        id: 'forteresse_dragon',
        name: 'Forteresse du Dragon',
        description: 'Repaire d\'un dragon corrompu. Difficulté élevée.',
        level: 45,
        requiredPlayers: 3,
        entryCost: 5000,
        region: 4,
        
        boss: {
            id: 'dragon_corrompu',
            name: 'Dragon Corrompu',
            level: 45,
            hp: 50000,
            attack: 85,
            defense: 30,
            mechanics: 'Breath attack AoE toutes les 45s (150 dmg à toute l\'équipe)',
            description: 'Un dragon autrefois noble, maintenant corrompu par les ténèbres.'
        },
        
        recommendedStats: {
            tank: {
                hp: 800,
                defense: 160,
                endurance: 70,
                note: 'Doit survivre au Breath (150 dmg AoE)'
            },
            heal: {
                intelligence: 100,
                wisdom: 60,
                healPerSec: 70,
                note: 'Doit heal toute l\'équipe après Breath AoE'
            },
            dps: {
                attack: 350,
                strength: 200,
                dpsPerSec: 700,
                note: 'Boss a 50,000 HP, tuer en <7min'
            }
        },
        
        estimatedTime: 480, // 8 minutes
        
        rewards: {
            xp: 10000,
            gold: 15000,
            
            guaranteedLoot: [
                { resourceId: 'wood_ancient', min: 80, max: 120 },
                { resourceId: 'ore_adamantite', min: 80, max: 120 },
                { resourceId: 'dragon_scale', min: 5, max: 10 },
                { resourceId: 'essence_fire', min: 15, max: 30 }
            ],
            
            rareLoot: [
                {
                    id: 'armor_dragonscale_tank',
                    name: 'Armure en Écailles de Dragon',
                    rarity: 'legendary',
                    slot: 'chest',
                    archetype: 'tank',
                    stats: { hp: 250, defense: 120, endurance: 80, fireResist: 50 },
                    setBonus: { set: 'dragonscale', bonuses: { 2: '+20% HP', 4: '+25% Fire Resist', 6: 'Immunity Breath' } },
                    dropChance: 0.15
                },
                {
                    id: 'staff_dragonfire',
                    name: 'Bâton du Feu de Dragon',
                    rarity: 'legendary',
                    slot: 'weapon',
                    archetype: 'heal',
                    stats: { intelligence: 80, wisdom: 60, healPower: 40, manaRegen: 20 },
                    dropChance: 0.15
                },
                {
                    id: 'sword_dragonslayer',
                    name: 'Épée Tueuse de Dragon',
                    rarity: 'legendary',
                    slot: 'weapon',
                    archetype: 'dps',
                    stats: { attack: 180, strength: 100, critChance: 20, critDamage: 100 },
                    dropChance: 0.15
                }
            ]
        }
    },
    
    // ========================================
    // 🏰 DONJON 4 : SANCTUAIRE ÉLÉMENTAIRE (Niveau 55)
    // ========================================
    {
        id: 'sanctuaire_elementaire',
        name: 'Sanctuaire Élémentaire',
        description: 'Un lieu où les éléments se déchaînent. Très difficile.',
        level: 55,
        requiredPlayers: 3,
        entryCost: 10000,
        region: 5,
        
        boss: {
            id: 'seigneur_elements',
            name: 'Seigneur des Éléments',
            level: 55,
            hp: 80000,
            attack: 100,
            defense: 40,
            mechanics: 'Change d\'élément toutes les 60s (Feu/Glace/Foudre), résistances variables',
            description: 'Une entité primordiale contrôlant les 4 éléments.'
        },
        
        recommendedStats: {
            tank: {
                hp: 1000,
                defense: 200,
                endurance: 90,
                note: 'Besoin résistances élémentaires (Feu/Glace/Foudre)'
            },
            heal: {
                intelligence: 120,
                wisdom: 80,
                healPerSec: 90,
                note: 'Boss fait 100 DPS + DoT élémentaires'
            },
            dps: {
                attack: 450,
                strength: 250,
                dpsPerSec: 900,
                note: 'Boss a 80,000 HP, adapter dégâts selon élément'
            }
        },
        
        estimatedTime: 600, // 10 minutes
        
        rewards: {
            xp: 20000,
            gold: 30000,
            
            guaranteedLoot: [
                { resourceId: 'essence_fire', min: 20, max: 40 },
                { resourceId: 'essence_ice', min: 20, max: 40 },
                { resourceId: 'essence_lightning', min: 20, max: 40 },
                { resourceId: 'essence_earth', min: 20, max: 40 }
            ],
            
            rareLoot: [
                {
                    id: 'armor_elemental_tank',
                    name: 'Armure Élémentaire',
                    rarity: 'legendary',
                    slot: 'chest',
                    archetype: 'tank',
                    stats: { hp: 300, defense: 150, endurance: 100, allResist: 25 },
                    setBonus: { set: 'elemental', bonuses: { 2: '+25% All Resist', 4: '+30% HP', 6: 'Absorb Elements' } },
                    dropChance: 0.12
                },
                {
                    id: 'staff_elements',
                    name: 'Bâton des Éléments',
                    rarity: 'legendary',
                    slot: 'weapon',
                    archetype: 'heal',
                    stats: { intelligence: 100, wisdom: 80, healPower: 50, allPower: 30 },
                    dropChance: 0.12
                },
                {
                    id: 'sword_elemental',
                    name: 'Lame Élémentaire',
                    rarity: 'legendary',
                    slot: 'weapon',
                    archetype: 'dps',
                    stats: { attack: 220, strength: 120, critChance: 25, elementalDmg: 50 },
                    dropChance: 0.12
                }
            ]
        }
    },
    
    // ========================================
    // 🏰 DONJON 5 : CITADELLE DU NÉANT (Niveau 65)
    // ========================================
    {
        id: 'citadelle_neant',
        name: 'Citadelle du Néant',
        description: 'Le donjon ultime où règne le chaos absolu. Extrêmement difficile.',
        level: 65,
        requiredPlayers: 3,
        entryCost: 25000,
        region: 5,
        
        boss: {
            id: 'roi_neant',
            name: 'Roi du Néant',
            level: 65,
            hp: 150000,
            attack: 120,
            defense: 50,
            mechanics: 'Multiplie dégâts toutes les 90s (+25% cumulatif), heal interdit pendant Void Zone',
            description: 'L\'incarnation du néant absolu, destroyer de mondes.'
        },
        
        recommendedStats: {
            tank: {
                hp: 1200,
                defense: 250,
                endurance: 120,
                note: 'Doit survivre dégâts croissants (120 → 150 → 187 DPS)'
            },
            heal: {
                intelligence: 150,
                wisdom: 100,
                healPerSec: 120,
                note: 'Heal impossible pendant Void Zone (10s toutes les 90s)'
            },
            dps: {
                attack: 600,
                strength: 300,
                dpsPerSec: 1200,
                note: 'Boss a 150,000 HP, course contre la montre'
            }
        },
        
        estimatedTime: 720, // 12 minutes
        
        rewards: {
            xp: 50000,
            gold: 75000,
            
            guaranteedLoot: [
                { resourceId: 'essence_void', min: 30, max: 60 },
                { resourceId: 'ore_cosmic', min: 50, max: 100 },
                { resourceId: 'fragment_chaos', min: 10, max: 20 }
            ],
            
            rareLoot: [
                {
                    id: 'armor_void_tank',
                    name: 'Armure du Néant',
                    rarity: 'mythic',
                    slot: 'chest',
                    archetype: 'tank',
                    stats: { hp: 400, defense: 200, endurance: 150, voidResist: 50 },
                    setBonus: { set: 'void', bonuses: { 2: '+30% HP', 4: '+40% All Resist', 6: 'Negate Void Zone' } },
                    dropChance: 0.10
                },
                {
                    id: 'staff_void',
                    name: 'Bâton du Néant',
                    rarity: 'mythic',
                    slot: 'weapon',
                    archetype: 'heal',
                    stats: { intelligence: 150, wisdom: 100, healPower: 70, resurrectPower: 1 },
                    dropChance: 0.10
                },
                {
                    id: 'sword_void',
                    name: 'Lame du Néant',
                    rarity: 'mythic',
                    slot: 'weapon',
                    archetype: 'dps',
                    stats: { attack: 300, strength: 150, critChance: 30, voidDmg: 100 },
                    dropChance: 0.10
                }
            ]
        }
    }
];

// Export
if (typeof window !== 'undefined') {
    window.DungeonsData = DungeonsData;
}
