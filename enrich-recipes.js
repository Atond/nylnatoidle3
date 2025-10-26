import fs from 'fs';

// Mapping des icônes par type d'équipement
const icons = {
    // Heavy Armor (Tank)
    'helmet': '🪖',
    'chestplate': '🛡️',
    'legplates': '👖',
    'boots': '🥾',
    'gauntlets': '🧤',
    
    // Light Armor (Archer)
    'hood': '🎩',
    'vest': '🦺',
    'pants': '👔',
    'gloves': '🧤',
    
    // Cloth Armor (Mage/Healer)
    'circlet': '👑',
    'robe': '👘',
    'leggings': '👗',
    'sandals': '👡',
    'wraps': '🧤',
    
    // Accessories
    'ring': '💍',
    'amulet': '📿',
    'talisman': '🔮',
    
    // Consumables
    'potion': '🧪',
    'elixir': '⚗️',
    'food': '🍖',
    'meal': '🍲'
};

// Fonction pour trouver l'icône appropriée
function findIcon(id) {
    for (const [key, icon] of Object.entries(icons)) {
        if (id.toLowerCase().includes(key)) return icon;
    }
    return '📦'; // Default
}

// Fonction pour déterminer la rareté basée sur le tier
function getRarity(tier) {
    if (tier === 1) return 'common';
    if (tier === 2) return 'uncommon';
    if (tier === 3) return 'rare';
    if (tier === 4) return 'epic';
    if (tier >= 5) return 'legendary';
    return 'common';
}

// Traiter chaque fichier
const files = [
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-armors.js", type: 'armor', slot: 'armor' },
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-accessories.js", type: 'accessory', slot: 'accessory' },
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-consumables.js", type: 'consumable', slot: 'consumable' }
];

files.forEach(({ path, type, slot }) => {
    let content = fs.readFileSync(path, 'utf8');
    
    // Remplacer productionTime par craftTime
    content = content.replace(/productionTime:/g, 'craftTime:');
    
    // Ajouter icon, rarity, type, slot après tier
    // Chercher le pattern avec possibilité de ligne vide
    content = content.replace(
        /(\s+tier: (\d+),)\n(\s+requiredLevel:)/g,
        (match, tierLine, tier, requiredLevelLine) => {
            const lines = match.split('\n');
            const id = content.substring(content.lastIndexOf("id: '", content.indexOf(tierLine)) + 5, content.indexOf("',", content.lastIndexOf("id: '", content.indexOf(tierLine))));
            const icon = findIcon(id);
            const rarity = getRarity(parseInt(tier));
            return `${tierLine}\n    type: '${type}',\n    slot: '${slot}',\n    icon: '${icon}',\n    rarity: '${rarity}',\n${requiredLevelLine}`;
        }
    );
    
    fs.writeFileSync(path, content, 'utf8');
    console.log(`✓ Enrichi: ${path}`);
});

console.log("\n✅ Tous les fichiers ont été enrichis avec icon, rarity, type, slot");
