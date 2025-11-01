import fs from 'fs';

// Lire les fichiers
const regionsContent = fs.readFileSync('./src/config/regions-data.js', 'utf-8');
const monstersContent = fs.readFileSync('./src/config/monsters-data.js', 'utf-8');
const recipesContent = fs.readFileSync('./src/config/craft-recipes-extended.js', 'utf-8');
const dropsContent = fs.readFileSync('./src/config/drops-data.js', 'utf-8');

// Extraire les monstres utilisés dans regions-data.js
const monsterMatches = regionsContent.matchAll(/\{\s*id:\s*'([a-z_]+)',\s*name:\s*'[^']+',\s*drops:/g);
const usedMonsterIds = [...new Set([...monsterMatches].map(m => m[1]))];

// Extraire les drops utilisés dans les recettes
const recipeDropMatches = recipesContent.matchAll(/resourceId:\s*'([a-z_]+)'/g);
const recipeDropIds = [...new Set([...recipeDropMatches].map(m => m[1]))];

console.log('\n🔍 ANALYSE COMPLÈTE:\n');

// Vérifier chaque monstre manquant
const missingMonsters = [];
usedMonsterIds.forEach(id => {
  const regex = new RegExp(`\\b${id}:\\s*{`, 'g');
  const exists = regex.test(monstersContent);
  
  if (!exists) {
    missingMonsters.push(id);
  }
});

console.log('❌ MONSTRES MANQUANTS:', missingMonsters.length);

// Pour chaque monstre manquant, vérifier si ses drops sont utilisés dans les recettes
const criticalMissing = [];
const nonCriticalMissing = [];

missingMonsters.forEach(monsterId => {
  // Trouver les drops de ce monstre dans regions-data.js
  const monsterRegex = new RegExp(`id:\\s*'${monsterId}'[^\\]]+drops:\\s*\\[[^\\]]+id:\\s*'([a-z_]+)'`, 'g');
  const matches = [...regionsContent.matchAll(monsterRegex)];
  
  let usedInRecipes = false;
  const monsterDrops = [];
  
  matches.forEach(match => {
    const dropId = match[1];
    monsterDrops.push(dropId);
    if (recipeDropIds.includes(dropId)) {
      usedInRecipes = true;
    }
  });
  
  if (usedInRecipes) {
    criticalMissing.push({ id: monsterId, drops: monsterDrops });
  } else {
    nonCriticalMissing.push({ id: monsterId, drops: monsterDrops });
  }
});

console.log('\n🚨 CRITIQUES (drops utilisés dans recettes):');
criticalMissing.forEach(m => {
  console.log(`  - ${m.id}`);
  console.log(`    Drops: ${m.drops.join(', ')}`);
});

console.log('\n⚠️  NON-CRITIQUES (drops non utilisés):');
nonCriticalMissing.forEach(m => {
  console.log(`  - ${m.id}`);
  console.log(`    Drops: ${m.drops.join(', ')}`);
});

console.log('\n📋 RECOMMANDATION:');
console.log('1. PRIORITÉ HAUTE: Créer les', criticalMissing.length, 'monstres critiques');
console.log('2. PRIORITÉ BASSE: Remplacer les', nonCriticalMissing.length, 'monstres non-critiques par des monstres existants');
