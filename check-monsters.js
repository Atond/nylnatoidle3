import fs from 'fs';

// Lire les fichiers
const regionsContent = fs.readFileSync('./src/config/regions-data.js', 'utf-8');
const monstersContent = fs.readFileSync('./src/config/monsters-data.js', 'utf-8');

// Extraire tous les IDs de monstres dans regions-data.js (dans la propriété monsters)
// Chercher uniquement les IDs qui sont juste après "monsters: [" et avant ", name:"
const monsterMatches = regionsContent.matchAll(/\{\s*id:\s*'([a-z_]+)',\s*name:\s*'[^']+',\s*drops:/g);
const usedMonsterIds = [...new Set([...monsterMatches].map(m => m[1]))];

console.log('\n🔍 MONSTRES UTILISÉS DANS REGIONS-DATA.JS:');
console.log('Total:', usedMonsterIds.length);
usedMonsterIds.sort().forEach(id => console.log('  -', id));

// Vérifier existence dans monsters-data.js
console.log('\n✅ VÉRIFICATION DANS MONSTERS-DATA.JS:');
const missing = [];
const found = [];

usedMonsterIds.forEach(id => {
  // Chercher le monstre comme clé d'objet
  const regex = new RegExp(`\\b${id}:\\s*{`, 'g');
  const exists = regex.test(monstersContent);
  
  if (!exists) {
    missing.push(id);
    console.log('  ❌', id, '- MANQUANT');
  } else {
    found.push(id);
    console.log('  ✅', id);
  }
});

console.log('\n📊 RÉSUMÉ:');
console.log('  Trouvés:', found.length);
console.log('  Manquants:', missing.length);

if (missing.length > 0) {
  console.log('\n⚠️  MONSTRES À CRÉER:');
  missing.forEach(id => console.log('  -', id));
} else {
  console.log('\n🎉 Tous les monstres existent dans monsters-data.js!');
}
