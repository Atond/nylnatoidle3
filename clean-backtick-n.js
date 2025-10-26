import fs from 'fs';

const files = [
    "e:\\IdleV1\\src\\config\\craft-recipes-armors.js",
    "e:\\IdleV1\\src\\config\\craft-recipes-accessories.js",
    "e:\\IdleV1\\src\\config\\craft-recipes-consumables.js"
];

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Supprimer les doublons professionLevel avec `n
    content = content.replace(/,`n\s+professionLevel:\s*\d+,/g, ',');
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✓ Nettoyé: ${filepath}`);
});

console.log("\n✅ Tous les fichiers ont été nettoyés");
