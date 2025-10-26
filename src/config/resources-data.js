/**
 * Configuration des Ressources - Bois, Minerais et Gemmes
 */

const ResourcesData = {
    // ========== BOIS ==========
    // Tier 1 (Common) : Région 1 (1-10) - Drop 100% dans leur région
    // Tier 2 (Uncommon) : Région 2 (11-20) - Drop 30% dans région précédente
    // Tier 3 (Rare) : Région 3 (21-30) - Drop 10% dans région précédente
    // Tier 4+ : Régions suivantes - Obtention via Transmutation/Donjons
    wood: [
        // T1 - Région 1 (1-10)
        { id: 'wood_oak', name: 'Bois de Chêne', unlockLevel: 1, rarity: 'common', dropRate: 1.0, tier: 1 },
        { id: 'wood_ash', name: 'Bois de Frêne', unlockLevel: 4, rarity: 'common', dropRate: 0.9, tier: 1 },
        { id: 'wood_maple', name: 'Bois d\'Érable', unlockLevel: 8, rarity: 'uncommon', dropRate: 0.8, tier: 1 },

        // T2 - Région 2 (11-20) - Disponibles en Région 1 avec 30% drop
        { id: 'wood_birch', name: 'Bois de Bouleau', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.3, tier: 2 },
        { id: 'wood_walnut', name: 'Bois de Noyer', unlockLevel: 12, rarity: 'uncommon', dropRate: 0.7, tier: 2 },
        { id: 'wood_cedar', name: 'Bois de Cèdre', unlockLevel: 15, rarity: 'rare', dropRate: 0.6, tier: 2 },
        { id: 'wood_yew', name: 'Bois d\'If', unlockLevel: 18, rarity: 'rare', dropRate: 0.5, tier: 2 },

        // T3 - Région 3 (21-30) - Disponibles en Région 2 avec 10% drop
        { id: 'wood_elm', name: 'Bois d\'Orme', unlockLevel: 20, rarity: 'rare', dropRate: 0.1, tier: 3 },
        { id: 'wood_sequoia', name: 'Bois de Séquoia', unlockLevel: 22, rarity: 'epic', dropRate: 0.5, tier: 3 },
        { id: 'wood_bamboo', name: 'Bois de Bambou', unlockLevel: 25, rarity: 'epic', dropRate: 0.4, tier: 3 },
        { id: 'wood_ebony', name: 'Bois d\'Ébène', unlockLevel: 28, rarity: 'epic', dropRate: 0.3, tier: 3 },

        // T4 - Région 4 (31-40) - Transmutation ou Donjons recommandés
        { id: 'wood_baobab', name: 'Bois de Baobab', unlockLevel: 30, rarity: 'legendary', dropRate: 0.05, tier: 4 },
        { id: 'wood_moonwillow', name: 'Bois de Saule lunaire', unlockLevel: 32, rarity: 'legendary', dropRate: 0.25, tier: 4 },
        { id: 'wood_bloodwood', name: 'Bois de Sang', unlockLevel: 35, rarity: 'legendary', dropRate: 0.2, tier: 4 },

        // T5 - Région 5 (41-50) - Endgame
        { id: 'wood_ironwood', name: 'Bois de Fer', unlockLevel: 40, rarity: 'mythic', dropRate: 0.05, tier: 5 },
        { id: 'wood_spiritwood', name: 'Bois d\'Esprit', unlockLevel: 45, rarity: 'mythic', dropRate: 0.15, tier: 5 },
        { id: 'wood_crystal', name: 'Bois de Cristal', unlockLevel: 50, rarity: 'mythic', dropRate: 0.1, tier: 5 },

        // T6+ - Future content (Prestige, Raids)
        { id: 'wood_shadow', name: 'Bois Ombreux', unlockLevel: 55, rarity: 'mythic', dropRate: 0.05, tier: 6 },
        { id: 'wood_phoenix', name: 'Bois du Phénix', unlockLevel: 60, rarity: 'divine', dropRate: 0.03, tier: 6 },
        { id: 'wood_eternal', name: 'Bois Éternel', unlockLevel: 70, rarity: 'divine', dropRate: 0.01, tier: 7 }
    ],

    // ========== MINERAIS ==========
    // Même progression que le bois : aligné avec les régions
    ore: [
        // T1 - Région 1 (1-10)
        { id: 'ore_iron', name: 'Fer', unlockLevel: 1, rarity: 'common', dropRate: 1.0, tier: 1 },
        { id: 'ore_copper', name: 'Cuivre', unlockLevel: 4, rarity: 'common', dropRate: 0.9, tier: 1 },
        { id: 'ore_tin', name: 'Étain', unlockLevel: 8, rarity: 'uncommon', dropRate: 0.8, tier: 1 },

        // T2 - Région 2 (11-20)
        { id: 'ore_bronze', name: 'Bronze', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.3, tier: 2 },
        { id: 'ore_silver', name: 'Argent', unlockLevel: 12, rarity: 'uncommon', dropRate: 0.7, tier: 2 },
        { id: 'ore_gold', name: 'Or', unlockLevel: 15, rarity: 'rare', dropRate: 0.6, tier: 2 },
        { id: 'ore_steel', name: 'Acier', unlockLevel: 18, rarity: 'rare', dropRate: 0.5, tier: 2 },

        // T3 - Région 3 (21-30)
        { id: 'ore_mithril', name: 'Mithril', unlockLevel: 20, rarity: 'rare', dropRate: 0.1, tier: 3 },
        { id: 'ore_obsidian', name: 'Obsidienne', unlockLevel: 22, rarity: 'epic', dropRate: 0.5, tier: 3 },
        { id: 'ore_platinum', name: 'Platine', unlockLevel: 25, rarity: 'epic', dropRate: 0.4, tier: 3 },
        { id: 'ore_cobalt', name: 'Cobalt', unlockLevel: 28, rarity: 'epic', dropRate: 0.3, tier: 3 },

        // T4 - Région 4 (31-40)
        { id: 'ore_adamantite', name: 'Adamantite', unlockLevel: 30, rarity: 'legendary', dropRate: 0.05, tier: 4 },
        { id: 'ore_electrum', name: 'Électrum', unlockLevel: 32, rarity: 'legendary', dropRate: 0.25, tier: 4 },
        { id: 'ore_runite', name: 'Runite', unlockLevel: 35, rarity: 'legendary', dropRate: 0.2, tier: 4 },

        // T5 - Région 5 (41-50)
        { id: 'ore_orichalcum', name: 'Orichalque', unlockLevel: 40, rarity: 'mythic', dropRate: 0.05, tier: 5 },
        { id: 'ore_crystallium', name: 'Cristallium', unlockLevel: 45, rarity: 'mythic', dropRate: 0.15, tier: 5 },
        { id: 'ore_etherium', name: 'Étherium', unlockLevel: 50, rarity: 'mythic', dropRate: 0.1, tier: 5 },

        // T6+ - Future content
        { id: 'ore_draconium', name: 'Draconium', unlockLevel: 55, rarity: 'mythic', dropRate: 0.05, tier: 6 },
        { id: 'ore_ombrium', name: 'Ombrium', unlockLevel: 60, rarity: 'divine', dropRate: 0.03, tier: 6 },
        { id: 'ore_astralite', name: 'Astralite', unlockLevel: 70, rarity: 'divine', dropRate: 0.01, tier: 7 }
    ],

    // ========== PLANTES (Herboriste) ==========
    plants: [
        // T1 - Région 1 (1-10)
        { id: 'plant_dandelion', name: 'Feuille de Pissenlit', unlockLevel: 1, rarity: 'common', dropRate: 1.0, tier: 1 },
        { id: 'plant_medicinal_herb', name: 'Herbe médicinale', unlockLevel: 2, rarity: 'common', dropRate: 0.95, tier: 1 },
        { id: 'plant_nettle', name: 'Ortie', unlockLevel: 4, rarity: 'common', dropRate: 0.9, tier: 1 },
        { id: 'plant_clover', name: 'Trèfle des champs', unlockLevel: 6, rarity: 'common', dropRate: 0.85, tier: 1 },
        { id: 'plant_sage', name: 'Sauge', unlockLevel: 8, rarity: 'uncommon', dropRate: 0.8, tier: 1 },

        // T2 - Région 2 (11-20)
        { id: 'plant_lavender', name: 'Lavande', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.3, tier: 2 },
        { id: 'plant_thyme', name: 'Thym', unlockLevel: 11, rarity: 'uncommon', dropRate: 0.75, tier: 2 },
        { id: 'plant_rosemary', name: 'Romarin', unlockLevel: 12, rarity: 'uncommon', dropRate: 0.7, tier: 2 },
        { id: 'plant_wood_mushroom', name: 'Champignon des bois', unlockLevel: 15, rarity: 'uncommon', dropRate: 0.6, tier: 2 },
        { id: 'plant_wild_mint', name: 'Menthe sauvage', unlockLevel: 18, rarity: 'rare', dropRate: 0.5, tier: 2 },

        // T3 - Région 3 (21-30)
        { id: 'plant_mandrake', name: 'Mandragore', unlockLevel: 20, rarity: 'rare', dropRate: 0.1, tier: 3 },
        { id: 'plant_ginseng', name: 'Ginseng', unlockLevel: 22, rarity: 'rare', dropRate: 0.5, tier: 3 },
        { id: 'plant_ghostbloom', name: 'Fleur fantôme', unlockLevel: 24, rarity: 'rare', dropRate: 0.45, tier: 3 },
        { id: 'plant_lunar_fern', name: 'Fougère lunaire', unlockLevel: 25, rarity: 'epic', dropRate: 0.4, tier: 3 },
        { id: 'plant_blood_flower', name: 'Fleur de sang', unlockLevel: 30, rarity: 'epic', dropRate: 0.3, tier: 3 },

        // T4 - Région 4 (31-40)
        { id: 'plant_moonflower', name: 'Fleur lunaire', unlockLevel: 32, rarity: 'epic', dropRate: 0.25, tier: 4 },
        { id: 'plant_glowing_mushroom', name: 'Champignon luminescent', unlockLevel: 35, rarity: 'epic', dropRate: 0.2, tier: 4 },
        { id: 'plant_soulroot', name: 'Racine d\'âme', unlockLevel: 38, rarity: 'epic', dropRate: 0.15, tier: 4 },
        { id: 'plant_obsidian_lichen', name: 'Lichen d\'obsidienne', unlockLevel: 40, rarity: 'legendary', dropRate: 0.1, tier: 4 },

        // T5 - Région 5 (41-50)
        { id: 'plant_black_rose', name: 'Rose noire', unlockLevel: 45, rarity: 'legendary', dropRate: 0.08, tier: 5 },
        { id: 'plant_spectral_lotus', name: 'Lotus spectral', unlockLevel: 50, rarity: 'legendary', dropRate: 0.06, tier: 5 },

        // T6+ - Future content
        { id: 'plant_shadow_thorn', name: 'Épine d\'ombre', unlockLevel: 55, rarity: 'mythic', dropRate: 0.05, tier: 6 },
        { id: 'plant_dragon_flower', name: 'Fleur du dragon', unlockLevel: 60, rarity: 'mythic', dropRate: 0.03, tier: 6 },
        { id: 'plant_ancient_essence', name: 'Essence de l\'Ancien Monde', unlockLevel: 70, rarity: 'divine', dropRate: 0.01, tier: 7 }
    ],

    // ========== POISSONS (Pêcheur) ==========
    fish: [
        // T1 - Région 1 (1-10)
        { id: 'fish_stream', name: 'Poisson de ruisseau', unlockLevel: 1, rarity: 'common', dropRate: 1.0, tier: 1 },
        { id: 'fish_bass', name: 'Achigan', unlockLevel: 2, rarity: 'common', dropRate: 0.97, tier: 1 },
        { id: 'fish_silver_trout', name: 'Truite argentée', unlockLevel: 3, rarity: 'common', dropRate: 0.95, tier: 1 },
        { id: 'fish_herring', name: 'Hareng des mers', unlockLevel: 5, rarity: 'common', dropRate: 0.9, tier: 1 },
        { id: 'fish_wild_salmon', name: 'Saumon sauvage', unlockLevel: 7, rarity: 'common', dropRate: 0.85, tier: 1 },

        // T2 - Région 2 (11-20)
        { id: 'fish_golden_perch', name: 'Perche dorée', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.3, tier: 2 },
        { id: 'fish_red_snapper', name: 'Vivaneau rouge', unlockLevel: 11, rarity: 'uncommon', dropRate: 0.75, tier: 2 },
        { id: 'fish_lunar_carp', name: 'Carpe lunaire', unlockLevel: 12, rarity: 'uncommon', dropRate: 0.7, tier: 2 },
        { id: 'fish_golden_carp', name: 'Carpe dorée', unlockLevel: 13, rarity: 'uncommon', dropRate: 0.68, tier: 2 },
        { id: 'fish_deep_eel', name: 'Anguille des profondeurs', unlockLevel: 15, rarity: 'uncommon', dropRate: 0.6, tier: 2 },
        { id: 'fish_striped_bass', name: 'Bar rayé', unlockLevel: 18, rarity: 'uncommon', dropRate: 0.5, tier: 2 },

        // T3 - Région 3 (21-30)
        { id: 'fish_blue_tuna', name: 'Thon bleu', unlockLevel: 20, rarity: 'rare', dropRate: 0.1, tier: 3 },
        { id: 'fish_swordfish', name: 'Espadon', unlockLevel: 22, rarity: 'rare', dropRate: 0.5, tier: 3 },
        { id: 'fish_giant_catfish', name: 'Silure géant', unlockLevel: 24, rarity: 'rare', dropRate: 0.47, tier: 3 },
        { id: 'fish_coral_shark', name: 'Requin corail', unlockLevel: 25, rarity: 'rare', dropRate: 0.4, tier: 3 },
        { id: 'fish_moonfish', name: 'Poisson-lune', unlockLevel: 28, rarity: 'epic', dropRate: 0.35, tier: 3 },
        { id: 'fish_abyss_moray', name: 'Murène des abysses', unlockLevel: 30, rarity: 'epic', dropRate: 0.3, tier: 3 },

        // T4 - Région 4 (31-40)
        { id: 'fish_silver_eel', name: 'Anguille argentée', unlockLevel: 32, rarity: 'epic', dropRate: 0.25, tier: 4 },
        { id: 'fish_ice_fish', name: 'Poisson-glace', unlockLevel: 35, rarity: 'epic', dropRate: 0.2, tier: 4 },
        { id: 'fish_void_squid', name: 'Calmar du Néant', unlockLevel: 38, rarity: 'epic', dropRate: 0.17, tier: 4 },
        { id: 'fish_celestial_koi', name: 'Koi céleste', unlockLevel: 40, rarity: 'epic', dropRate: 0.15, tier: 4 },

        // T5 - Région 5 (41-50)
        { id: 'fish_crimson_leviathan', name: 'Léviathan écarlate', unlockLevel: 44, rarity: 'legendary', dropRate: 0.12, tier: 5 },
        { id: 'fish_sea_serpent', name: 'Serpent de mer', unlockLevel: 45, rarity: 'legendary', dropRate: 0.1, tier: 5 },
        { id: 'fish_dragon_fish', name: 'Poisson-dragon', unlockLevel: 50, rarity: 'legendary', dropRate: 0.08, tier: 5 },

        // T6+ - Future content
        { id: 'fish_abyssal_lantern', name: 'Lanterne abyssale', unlockLevel: 55, rarity: 'legendary', dropRate: 0.06, tier: 6 },
        { id: 'fish_juvenile_leviathan', name: 'Léviathan juvénile', unlockLevel: 60, rarity: 'mythic', dropRate: 0.04, tier: 6 },
        { id: 'fish_mini_kraken', name: 'Kraken miniature', unlockLevel: 65, rarity: 'mythic', dropRate: 0.02, tier: 6 },
        { id: 'fish_ocean_soul', name: 'Âme de l\'océan', unlockLevel: 70, rarity: 'divine', dropRate: 0.01, tier: 7 }
    ],

    // ========== FIBRES & TISSUS (Éleveur - Production automatique via bâtiment Ferme) ==========
    // Note: Ferme unlock niveau 15 (au lieu de 25) pour cohérence avec autres métiers craft
    fabrics: [
        // T1 - Région 1 (1-10) - Ferme niveau 1-3
        { id: 'fabric_linen', name: 'Fibre de Lin', unlockLevel: 1, rarity: 'common', productionRate: 1.0, tier: 1 },
        { id: 'fabric_hemp', name: 'Fibre de Chanvre', unlockLevel: 3, rarity: 'common', productionRate: 0.9, tier: 1 },
        { id: 'fabric_raw_wool', name: 'Laine brute', unlockLevel: 5, rarity: 'common', productionRate: 0.8, tier: 1 },
        { id: 'fabric_cotton', name: 'Coton', unlockLevel: 8, rarity: 'common', productionRate: 0.7, tier: 1 },

        // T2 - Région 2 (11-20) - Ferme niveau 4-6
        { id: 'fabric_coarse_silk', name: 'Soie grossière', unlockLevel: 10, rarity: 'uncommon', productionRate: 0.3, tier: 2 },
        { id: 'fabric_jute', name: 'Jute', unlockLevel: 12, rarity: 'uncommon', productionRate: 0.6, tier: 2 },
        { id: 'fabric_wool', name: 'Laine', unlockLevel: 13, rarity: 'uncommon', productionRate: 0.55, tier: 2 },
        { id: 'fabric_rabbit_skin', name: 'Peau de lapin', unlockLevel: 14, rarity: 'uncommon', productionRate: 0.5, tier: 2 },
        { id: 'fabric_fine_wool', name: 'Laine fine', unlockLevel: 16, rarity: 'uncommon', productionRate: 0.45, tier: 2 },

        // T3 - Région 3 (21-30) - Ferme niveau 7-9
        { id: 'fabric_simple_leather', name: 'Cuir simple', unlockLevel: 18, rarity: 'rare', productionRate: 0.1, tier: 3 },
        { id: 'fabric_refined_silk', name: 'Soie raffinée', unlockLevel: 20, rarity: 'rare', productionRate: 0.4, tier: 3 },
        { id: 'fabric_silk', name: 'Soie', unlockLevel: 21, rarity: 'rare', productionRate: 0.38, tier: 3 },
        { id: 'fabric_velvet', name: 'Velours', unlockLevel: 22, rarity: 'rare', productionRate: 0.35, tier: 3 },
        { id: 'fabric_wolf_skin', name: 'Peau de loup', unlockLevel: 25, rarity: 'epic', productionRate: 0.3, tier: 3 },

        // T4 - Région 4 (31-40) - Ferme niveau 10+
        { id: 'fabric_tanned_leather', name: 'Cuir tanné', unlockLevel: 30, rarity: 'epic', productionRate: 0.2, tier: 4 },
        { id: 'fabric_spider_silk', name: 'Soie d\'araignée', unlockLevel: 32, rarity: 'epic', productionRate: 0.18, tier: 4 },
        { id: 'fabric_lunar_silk', name: 'Soie lunaire', unlockLevel: 35, rarity: 'epic', productionRate: 0.15, tier: 4 },
        { id: 'fabric_basilisk_leather', name: 'Cuir de basilic', unlockLevel: 40, rarity: 'legendary', productionRate: 0.12, tier: 4 },

        // T5 - Région 5 (41-50)
        { id: 'fabric_runic_cloth', name: 'Toile runique', unlockLevel: 45, rarity: 'legendary', productionRate: 0.1, tier: 5 },
        { id: 'fabric_spectral_fabric', name: 'Étoffe spectrale', unlockLevel: 50, rarity: 'legendary', productionRate: 0.08, tier: 5 },

        // T6+ - Future content
        { id: 'fabric_dragon_skin', name: 'Peau de dragon', unlockLevel: 55, rarity: 'mythic', productionRate: 0.06, tier: 6 },
        { id: 'fabric_astral_silk', name: 'Soie astrale', unlockLevel: 60, rarity: 'mythic', productionRate: 0.04, tier: 6 },
        { id: 'fabric_void_cloth', name: 'Tissu du Néant', unlockLevel: 70, rarity: 'divine', productionRate: 0.02, tier: 7 }
    ],

    // ========== BUTIN DE COMBAT ==========
    loot: [
        // Région 1 - Les Plaines Verdoyantes
        { id: 'monster_hide', name: 'Peau de monstre', rarity: 'common', icon: '🦌' },
        { id: 'monster_fang', name: 'Croc de monstre', rarity: 'common', icon: '🦷' },
        { id: 'monster_bone', name: 'Os de monstre', rarity: 'uncommon', icon: '🦴' },
        { id: 'monster_claw', name: 'Griffe de monstre', rarity: 'uncommon', icon: '🪃' },
        { id: 'monster_scale', name: 'Écaille de monstre', rarity: 'rare', icon: '🛡️' },
        { id: 'monster_heart', name: 'Cœur de monstre', rarity: 'epic', icon: '❤️' },
        { id: 'monster_essence', name: 'Essence de monstre', rarity: 'legendary', icon: '✨' },
        { id: 'loot_peau_animale', name: 'Peau Animale', rarity: 'common', icon: '🦌' },
        { id: 'loot_griffes_usees', name: 'Griffes Usées', rarity: 'common', icon: '🦅' },
        { id: 'loot_plumes_sombres', name: 'Plumes Sombres', rarity: 'common', icon: '🪶' },
        { id: 'loot_cuir_robuste', name: 'Cuir Robuste', rarity: 'uncommon', icon: '🎒' },
        { id: 'loot_crocs_venimeux', name: 'Crocs Venimeux', rarity: 'uncommon', icon: '🦷' },
        { id: 'loot_essence_vegetale_instable', name: 'Essence Végétale Instable', rarity: 'uncommon', icon: '🌿' },
        { id: 'loot_os_massif', name: 'Os Massif', rarity: 'rare', icon: '🦴' },
        { id: 'loot_armure_cabossee', name: 'Armure Cabossée', rarity: 'rare', icon: '🛡️' },
        { id: 'loot_sang_concentre', name: 'Sang Concentré', rarity: 'rare', icon: '🩸' },
        { id: 'loot_corne_ancienne', name: 'Corne Ancienne', rarity: 'legendary', icon: '🦌' },
        { id: 'loot_cuir_legendaire', name: 'Cuir Légendaire', rarity: 'legendary', icon: '🎯' },
        { id: 'loot_essence_vie_sauvage', name: 'Essence de Vie Sauvage', rarity: 'legendary', icon: '✨' }
    ],

    // ========== GEMMES (Drops rares du Mineur) ==========
    // Progression T1-T7 alignée sur Mining level
    // Drop rates DRASTIQUEMENT RÉDUITS (0.5% max pour common)
    gems: [
        // T1 - Région 1 (Mining 1-10)
        { id: 'gem_quartz', name: 'Quartz', unlockLevel: 1, rarity: 'common', dropRate: 0.005, tier: 1 },
        { id: 'gem_amethyst', name: 'Améthyste', unlockLevel: 4, rarity: 'common', dropRate: 0.004, tier: 1 },
        { id: 'gem_carnelian', name: 'Cornaline', unlockLevel: 8, rarity: 'uncommon', dropRate: 0.003, tier: 1 },
        
        // T2 - Région 2 (Mining 11-20)
        { id: 'gem_citrine', name: 'Citrine', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.0025, tier: 2 },
        { id: 'gem_onyx', name: 'Onyx', unlockLevel: 12, rarity: 'uncommon', dropRate: 0.002, tier: 2 },
        { id: 'gem_jade', name: 'Jade', unlockLevel: 15, rarity: 'rare', dropRate: 0.0015, tier: 2 },
        { id: 'gem_topaz', name: 'Topaze', unlockLevel: 18, rarity: 'rare', dropRate: 0.0012, tier: 2 },
        
        // T3 - Région 3 (Mining 21-30)
        { id: 'gem_garnet', name: 'Grenat', unlockLevel: 20, rarity: 'rare', dropRate: 0.001, tier: 3 },
        { id: 'gem_sapphire', name: 'Saphir', unlockLevel: 22, rarity: 'epic', dropRate: 0.0008, tier: 3 },
        { id: 'gem_emerald', name: 'Émeraude', unlockLevel: 25, rarity: 'epic', dropRate: 0.0007, tier: 3 },
        { id: 'gem_ruby', name: 'Rubis', unlockLevel: 28, rarity: 'epic', dropRate: 0.0006, tier: 3 },
        
        // T4 - Région 4 (Mining 31-40)
        { id: 'gem_opal', name: 'Opale', unlockLevel: 30, rarity: 'legendary', dropRate: 0.0005, tier: 4 },
        { id: 'gem_aquamarine', name: 'Aigue-marine', unlockLevel: 32, rarity: 'legendary', dropRate: 0.0004, tier: 4 },
        { id: 'gem_spinel', name: 'Spinelle', unlockLevel: 35, rarity: 'legendary', dropRate: 0.0003, tier: 4 },
        
        // T5 - Région 5 (Mining 41-50)
        { id: 'gem_diamond', name: 'Diamant', unlockLevel: 40, rarity: 'mythic', dropRate: 0.0002, tier: 5 },
        { id: 'gem_tanzanite', name: 'Tanzanite', unlockLevel: 45, rarity: 'mythic', dropRate: 0.00015, tier: 5 },
        { id: 'gem_alexandrite', name: 'Alexandrite', unlockLevel: 50, rarity: 'mythic', dropRate: 0.0001, tier: 5 },
        
        // T6+ - Endgame (Mining 55+)
        { id: 'gem_voidstone', name: 'Pierre du Néant', unlockLevel: 55, rarity: 'divine', dropRate: 0.00008, tier: 6 },
        { id: 'gem_dragoncrystal', name: 'Cristal du Dragon', unlockLevel: 60, rarity: 'divine', dropRate: 0.00005, tier: 6 },
        { id: 'gem_astraltears', name: 'Larmes d\'Astral', unlockLevel: 70, rarity: 'divine', dropRate: 0.00003, tier: 7 }
    ]
};

// Couleurs par rareté
const RarityColors = {
    common: '#9e9e9e',      // Gris
    uncommon: '#4caf50',    // Vert
    rare: '#2196f3',        // Bleu
    epic: '#9c27b0',        // Violet
    legendary: '#ff9800',   // Orange
    mythic: '#e91e63',      // Rose
    divine: '#ffd700'       // Doré
};

/**
 * Fonction helper pour trouver une ressource par ID
 */
function findResourceById(resourceId) {
    // Chercher dans toutes les catégories
    for (const category of ['wood', 'ore', 'gems', 'loot', 'plants', 'fish', 'fabrics']) {
        const resource = ResourcesData[category]?.find(r => r.id === resourceId);
        if (resource) {
            // Ajouter l'icône selon la catégorie (ou utiliser celle définie dans loot)
            return {
                ...resource,
                icon: resource.icon || (
                    category === 'wood' ? '🪵' :
                        category === 'ore' ? '⚒️' :
                            category === 'gems' ? '💎' :
                                category === 'plants' ? '🌿' :
                                    category === 'fish' ? '🐟' :
                                        category === 'fabrics' ? '🧵' :
                                            '🎁'
                )
            };
        }
    }
    return null;
}

/**
 * Rendre disponible globalement
 */
if (typeof window !== 'undefined') {
    window.ResourcesData = ResourcesData;
    window.RarityColors = RarityColors;
    window.findResourceById = findResourceById;
}
