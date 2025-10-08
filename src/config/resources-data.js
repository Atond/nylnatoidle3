/**
 * Configuration des Ressources - Bois, Minerais et Gemmes
 */

const ResourcesData = {
    // ========== BOIS ==========
    wood: [
        { id: 'wood_oak', name: 'Bois de Chêne', unlockLevel: 1, rarity: 'common', dropRate: 1.0 },
        { id: 'wood_ash', name: 'Bois de Frêne', unlockLevel: 3, rarity: 'common', dropRate: 0.8 },
        { id: 'wood_maple', name: 'Bois d\'Érable', unlockLevel: 5, rarity: 'uncommon', dropRate: 0.6 },
        { id: 'wood_birch', name: 'Bois de Bouleau', unlockLevel: 7, rarity: 'uncommon', dropRate: 0.5 },
        { id: 'wood_walnut', name: 'Bois de Noyer', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.4 },
        { id: 'wood_cedar', name: 'Bois de Cèdre', unlockLevel: 12, rarity: 'rare', dropRate: 0.3 },
        { id: 'wood_yew', name: 'Bois d\'If', unlockLevel: 15, rarity: 'rare', dropRate: 0.25 },
        { id: 'wood_elm', name: 'Bois d\'Orme', unlockLevel: 18, rarity: 'rare', dropRate: 0.2 },
        { id: 'wood_sequoia', name: 'Bois de Séquoia', unlockLevel: 20, rarity: 'epic', dropRate: 0.15 },
        { id: 'wood_bamboo', name: 'Bois de Bambou', unlockLevel: 23, rarity: 'epic', dropRate: 0.12 },
        { id: 'wood_ebony', name: 'Bois d\'Ébène', unlockLevel: 25, rarity: 'epic', dropRate: 0.1 },
        { id: 'wood_baobab', name: 'Bois de Baobab', unlockLevel: 28, rarity: 'legendary', dropRate: 0.08 },
        { id: 'wood_moonwillow', name: 'Bois de Saule lunaire', unlockLevel: 30, rarity: 'legendary', dropRate: 0.06 },
        { id: 'wood_bloodwood', name: 'Bois de Sang', unlockLevel: 35, rarity: 'legendary', dropRate: 0.05 },
        { id: 'wood_ironwood', name: 'Bois de Fer', unlockLevel: 40, rarity: 'mythic', dropRate: 0.04 },
        { id: 'wood_spiritwood', name: 'Bois d\'Esprit', unlockLevel: 45, rarity: 'mythic', dropRate: 0.03 },
        { id: 'wood_crystal', name: 'Bois de Cristal', unlockLevel: 50, rarity: 'mythic', dropRate: 0.025 },
        { id: 'wood_shadow', name: 'Bois Ombreux', unlockLevel: 55, rarity: 'mythic', dropRate: 0.02 },
        { id: 'wood_phoenix', name: 'Bois du Phénix', unlockLevel: 60, rarity: 'divine', dropRate: 0.015 },
        { id: 'wood_eternal', name: 'Bois Éternel', unlockLevel: 70, rarity: 'divine', dropRate: 0.01 }
    ],

    // ========== MINERAIS ==========
    ore: [
        { id: 'ore_iron', name: 'Fer', unlockLevel: 1, rarity: 'common', dropRate: 1.0 },
        { id: 'ore_copper', name: 'Cuivre', unlockLevel: 3, rarity: 'common', dropRate: 0.8 },
        { id: 'ore_tin', name: 'Étain', unlockLevel: 5, rarity: 'uncommon', dropRate: 0.6 },
        { id: 'ore_bronze', name: 'Bronze', unlockLevel: 7, rarity: 'uncommon', dropRate: 0.5 },
        { id: 'ore_silver', name: 'Argent', unlockLevel: 10, rarity: 'uncommon', dropRate: 0.4 },
        { id: 'ore_gold', name: 'Or', unlockLevel: 12, rarity: 'rare', dropRate: 0.3 },
        { id: 'ore_steel', name: 'Acier', unlockLevel: 15, rarity: 'rare', dropRate: 0.25 },
        { id: 'ore_mithril', name: 'Mithril', unlockLevel: 18, rarity: 'rare', dropRate: 0.2 },
        { id: 'ore_obsidian', name: 'Obsidienne', unlockLevel: 20, rarity: 'epic', dropRate: 0.15 },
        { id: 'ore_platinum', name: 'Platine', unlockLevel: 23, rarity: 'epic', dropRate: 0.12 },
        { id: 'ore_cobalt', name: 'Cobalt', unlockLevel: 25, rarity: 'epic', dropRate: 0.1 },
        { id: 'ore_adamantite', name: 'Adamantite', unlockLevel: 28, rarity: 'legendary', dropRate: 0.08 },
        { id: 'ore_electrum', name: 'Électrum', unlockLevel: 30, rarity: 'legendary', dropRate: 0.06 },
        { id: 'ore_runite', name: 'Runite', unlockLevel: 35, rarity: 'legendary', dropRate: 0.05 },
        { id: 'ore_orichalcum', name: 'Orichalque', unlockLevel: 40, rarity: 'mythic', dropRate: 0.04 },
        { id: 'ore_crystallium', name: 'Cristallium', unlockLevel: 45, rarity: 'mythic', dropRate: 0.03 },
        { id: 'ore_etherium', name: 'Étherium', unlockLevel: 50, rarity: 'mythic', dropRate: 0.025 },
        { id: 'ore_draconium', name: 'Draconium', unlockLevel: 55, rarity: 'mythic', dropRate: 0.02 },
        { id: 'ore_ombrium', name: 'Ombrium', unlockLevel: 60, rarity: 'divine', dropRate: 0.015 },
        { id: 'ore_astralite', name: 'Astralite', unlockLevel: 70, rarity: 'divine', dropRate: 0.01 }
    ],

    // ========== BUTIN DE COMBAT ==========
    loot: [
        // Région 1 - Les Plaines Verdoyantes
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
    gems: [
        { id: 'gem_quartz', name: 'Quartz', rarity: 'common', dropRate: 0.05 },
        { id: 'gem_amethyst', name: 'Améthyste', rarity: 'common', dropRate: 0.04 },
        { id: 'gem_carnelian', name: 'Cornaline', rarity: 'uncommon', dropRate: 0.03 },
        { id: 'gem_citrine', name: 'Citrine', rarity: 'uncommon', dropRate: 0.025 },
        { id: 'gem_onyx', name: 'Onyx', rarity: 'uncommon', dropRate: 0.02 },
        { id: 'gem_jade', name: 'Jade', rarity: 'rare', dropRate: 0.015 },
        { id: 'gem_topaz', name: 'Topaze', rarity: 'rare', dropRate: 0.012 },
        { id: 'gem_garnet', name: 'Grenat', rarity: 'rare', dropRate: 0.01 },
        { id: 'gem_sapphire', name: 'Saphir', rarity: 'epic', dropRate: 0.008 },
        { id: 'gem_emerald', name: 'Émeraude', rarity: 'epic', dropRate: 0.007 },
        { id: 'gem_ruby', name: 'Rubis', rarity: 'epic', dropRate: 0.006 },
        { id: 'gem_opal', name: 'Opale', rarity: 'legendary', dropRate: 0.005 },
        { id: 'gem_aquamarine', name: 'Aigue-marine', rarity: 'legendary', dropRate: 0.004 },
        { id: 'gem_spinel', name: 'Spinelle', rarity: 'legendary', dropRate: 0.003 },
        { id: 'gem_diamond', name: 'Diamant', rarity: 'mythic', dropRate: 0.002 },
        { id: 'gem_tanzanite', name: 'Tanzanite', rarity: 'mythic', dropRate: 0.0015 },
        { id: 'gem_alexandrite', name: 'Alexandrite', rarity: 'mythic', dropRate: 0.001 },
        { id: 'gem_voidstone', name: 'Pierre du Néant', rarity: 'divine', dropRate: 0.0008 },
        { id: 'gem_dragoncrystal', name: 'Cristal du Dragon', rarity: 'divine', dropRate: 0.0005 },
        { id: 'gem_astraltears', name: 'Larmes d\'Astral', rarity: 'divine', dropRate: 0.0003 }
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
    for (const category of ['wood', 'ore', 'gems', 'loot']) {
        const resource = ResourcesData[category]?.find(r => r.id === resourceId);
        if (resource) {
            // Ajouter l'icône selon la catégorie (ou utiliser celle définie dans loot)
            return {
                ...resource,
                icon: resource.icon || (category === 'wood' ? '🪵' : category === 'ore' ? '⚒️' : category === 'gems' ? '💎' : '🎁')
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
