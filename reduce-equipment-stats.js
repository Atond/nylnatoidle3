import fs from 'fs';

// Fichiers à modifier
const files = [
    'e:\\IdleV1\\src\\config\\craft-recipes-data.js',
    'e:\\IdleV1\\src\\config\\craft-recipes-extended.js',
    'e:\\IdleV1\\src\\config\\craft-recipes-armors.js'
];

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    console.log(`\n📝 Traitement de ${filePath.split('\\').pop()}...`);
    
    // Fonction pour réduire une stat de 40%
    const reduceBy40 = (match, statName, value) => {
        const numValue = parseInt(value);
        const newValue = Math.max(1, Math.floor(numValue * 0.6)); // Réduction de 40%
        modified = true;
        console.log(`  ${statName}: ${numValue} → ${newValue}`);
        return `${statName}: ${newValue}`;
    };
    
    // Réduire damage de 40% (mais minimum 1)
    content = content.replace(/damage: (\d+)/g, (match, value) => reduceBy40(match, 'damage', value));
    
    // Réduire force de 30% dans les armes
    content = content.replace(/force: (\d+)/g, (match, value) => {
        const numValue = parseInt(value);
        const newValue = Math.max(1, Math.floor(numValue * 0.7)); // Réduction de 30%
        modified = true;
        console.log(`  force: ${numValue} → ${newValue}`);
        return `force: ${newValue}`;
    });
    
    // Réduire defense de 25% dans les armures
    content = content.replace(/defense: (\d+)/g, (match, value) => {
        const numValue = parseInt(value);
        const newValue = Math.max(1, Math.floor(numValue * 0.75)); // Réduction de 25%
        modified = true;
        console.log(`  defense: ${numValue} → ${newValue}`);
        return `defense: ${newValue}`;
    });
    
    // Réduire armor de 25%
    content = content.replace(/armor: (\d+)/g, (match, value) => {
        const numValue = parseInt(value);
        const newValue = Math.max(1, Math.floor(numValue * 0.75));
        modified = true;
        console.log(`  armor: ${numValue} → ${newValue}`);
        return `armor: ${newValue}`;
    });
    
    // Réduire endurance de 20%
    content = content.replace(/endurance: (\d+)/g, (match, value) => {
        const numValue = parseInt(value);
        const newValue = Math.max(1, Math.floor(numValue * 0.8));
        modified = true;
        console.log(`  endurance: ${numValue} → ${newValue}`);
        return `endurance: ${newValue}`;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fichier modifié avec succès`);
    } else {
        console.log(`⏭️ Aucune modification nécessaire`);
    }
});

console.log(`\n🎉 Réduction des stats d'équipement terminée !`);
console.log(`\n📊 Résumé :`);
console.log(`  - Damage : -40% (minimum 1)`);
console.log(`  - Force : -30% (minimum 1)`);
console.log(`  - Defense : -25% (minimum 1)`);
console.log(`  - Armor : -25% (minimum 1)`);
console.log(`  - Endurance : -20% (minimum 1)`);
