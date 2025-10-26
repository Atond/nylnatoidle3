import fs from 'fs';

const files = [
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-armors.js", type: 'armor', slot: 'armor' },
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-accessories.js", type: 'accessory', slot: 'accessory' },
    { path: "e:\\IdleV1\\src\\config\\craft-recipes-consumables.js", type: 'consumable', slot: 'consumable' }
];

files.forEach(({ path, type, slot }) => {
    let content = fs.readFileSync(path, 'utf8');
    const lines = content.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        newLines.push(lines[i]);
        
        // Si on trouve "tier: X," et que la ligne suivante n'est PAS "type:", ajouter les champs
        if (lines[i].match(/\s+tier:\s*\d+,/) && !lines[i+1]?.includes('type:')) {
            // Extraire le tier
            const tier = parseInt(lines[i].match(/tier:\s*(\d+)/)[1]);
            
            // Trouver l'ID de cette recette (chercher en arrière)
            let id = '';
            for (let j = i - 1; j >= 0; j--) {
                const idMatch = lines[j].match(/id:\s*'([^']+)'/);
                if (idMatch) {
                    id = idMatch[1];
                    break;
                }
            }
            
            // Déterminer l'icône
            let icon = '📦';
            if (id.includes('helmet') || id.includes('hood') || id.includes('circlet')) icon = '🪖';
            else if (id.includes('chestplate') || id.includes('vest') || id.includes('robe')) icon = '👕';
            else if (id.includes('legplates') || id.includes('pants') || id.includes('leggings')) icon = '👖';
            else if (id.includes('boots') || id.includes('sandals')) icon = '👢';
            else if (id.includes('gauntlets') || id.includes('gloves') || id.includes('wraps')) icon = '🧤';
            else if (id.includes('ring')) icon = '💍';
            else if (id.includes('amulet')) icon = '📿';
            else if (id.includes('talisman')) icon = '🔮';
            else if (id.includes('potion')) icon = '🧪';
            else if (id.includes('elixir')) icon = '⚗️';
            else if (id.includes('food') || id.includes('meal') || id.includes('stew')) icon = '🍖';
            
            // Déterminer la rareté
            let rarity = 'common';
            if (tier === 2) rarity = 'uncommon';
            else if (tier === 3) rarity = 'rare';
            else if (tier === 4) rarity = 'epic';
            else if (tier >= 5) rarity = 'legendary';
            
            newLines.push(`    type: '${type}',`);
            newLines.push(`    slot: '${slot}',`);
            newLines.push(`    icon: '${icon}',`);
            newLines.push(`    rarity: '${rarity}',`);
        }
    }
    
    content = newLines.join('\n');
    
    // Remplacer productionTime par craftTime
    content = content.replace(/productionTime:/g, 'craftTime:');
    
    fs.writeFileSync(path, content, 'utf8');
    console.log(`✓ Enrichi: ${path}`);
});

console.log("\n✅ Tous les fichiers ont été enrichis");
