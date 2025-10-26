# 🔧 GUIDE DÉVELOPPEUR - SYSTÈME DE CRAFT

## 📁 FICHIERS MODIFIÉS

### Nouveaux Fichiers Créés

```
src/config/craft-recipes-extended.js      (735 lignes, 35 armes)
src/config/craft-recipes-armors.js        (1180 lignes, 50 armures)
src/config/craft-recipes-accessories.js   (615 lignes, 25 accessoires)
src/config/craft-recipes-consumables.js   (720 lignes, 35 consommables)
```

### Fichiers Modifiés

```
index.html                     (Lignes 1119-1125: ajout des 4 nouveaux scripts)
src/js/crafting-manager.js     (Lignes 37-68: fusion des 5 sources de recettes)
```

---

## 🔗 INTÉGRATION DANS LE CODE

### 1. Chargement des Recettes (index.html)

```html
<!-- AVANT -->
<script src="src/config/craft-recipes-data.js"></script>

<!-- APRÈS -->
<script src="src/config/craft-recipes-data.js"></script>
<script src="src/config/craft-recipes-extended.js"></script>
<script src="src/config/craft-recipes-armors.js"></script>
<script src="src/config/craft-recipes-accessories.js"></script>
<script src="src/config/craft-recipes-consumables.js"></script>
```

### 2. Fusion des Recettes (crafting-manager.js)

```javascript
// AVANT
getAllRecipes() {
    const recipes = window.CraftRecipesData || [];
    return recipes;
}

// APRÈS
getAllRecipes() {
    const baseRecipes = window.CraftRecipesData || [];
    const weaponRecipes = window.CraftRecipesExtended || [];
    const armorRecipes = window.CraftRecipesArmors || [];
    const accessoryRecipes = window.CraftRecipesAccessories || [];
    const consumableRecipes = window.CraftRecipesConsumables || [];

    const allRecipes = [
        ...baseRecipes,
        ...weaponRecipes,
        ...armorRecipes,
        ...accessoryRecipes,
        ...consumableRecipes
    ];

    return allRecipes;
}
```

---

## 📋 FORMAT DES RECETTES

### Weapons / Armor / Accessories

```javascript
{
  id: 'unique_item_id',              // Identifiant unique (REQUIS)
  name: 'Display Name',              // Nom affiché (REQUIS)
  archetype: 'tank',                 // tank|archer|mage|healer (OPTIONNEL)
  category: 'weapon',                // weapon|armor|accessory (REQUIS)
  profession: 'blacksmith',          // Profession requise (REQUIS)
  tier: 3,                           // 1-5 pour progression (REQUIS)
  requiredLevel: 25,                 // Level requis (REQUIS)
  materials: [                       // Liste matériaux (REQUIS)
    { id: 'ore_mithril', quantity: 15 },
    { id: 'monster_scale', quantity: 6 }
  ],
  produces: {                        // Item produit (REQUIS)
    id: 'mithril_sword',
    quantity: 1
  },
  productionTime: 45,                // Temps en secondes (REQUIS)
  stats: {                           // Stats de l'item (REQUIS pour equipment)
    damage: 55,
    defense: 25,
    agility: -6,
    critChance: 10
    // Voir liste complète ci-dessous
  }
}
```

### Consumables

```javascript
{
  id: 'health_potion',
  name: 'Health Potion',
  category: 'consumable',            // Toujours 'consumable'
  profession: 'alchemist',           // alchemist ou fishmonger
  tier: 2,
  requiredLevel: 15,
  materials: [
    { id: 'plant_lavender', quantity: 4 },
    { id: 'fish_red_snapper', quantity: 2 }
  ],
  produces: {
    id: 'health_potion',
    quantity: 3                      // Consumables souvent × plusieurs
  },
  productionTime: 25,
  effects: {                         // 'effects' au lieu de 'stats'
    healAmount: 150,                 // Heal instantané
    duration: 0,                     // 0 = instant, >0 = buff temporaire
    description: 'Restores 150 health instantly'
  }
}
```

### Food Buffs

```javascript
{
  id: 'seafood_feast',
  name: 'Seafood Feast',
  category: 'consumable',
  profession: 'fishmonger',
  tier: 3,
  requiredLevel: 24,
  materials: [
    { id: 'fish_golden_carp', quantity: 5 },
    { id: 'plant_lavender', quantity: 4 }
  ],
  produces: { id: 'seafood_feast', quantity: 2 },
  productionTime: 40,
  effects: {
    healthRegen: 25,                 // HP/s pendant duration
    manaRegen: 15,                   // MP/s pendant duration
    allStats: 20,                    // Bonus à toutes les stats
    duration: 300,                   // 5 minutes en secondes
    description: '+25 HP/s, +15 MP/s, +20 all stats for 5 minutes'
  }
}
```

---

## 🎨 STATS DISPONIBLES

### Combat Stats

```javascript
// Dégâts & Attaque
damage: 55,              // Dégâts de base
strength: 25,            // Bonus dégâts physiques
intelligence: 45,        // Bonus dégâts magiques
spellPower: 95,          // Multiplicateur sorts
rangedDamage: 18,        // Bonus dégâts à distance
elementalDamage: 20,     // Bonus dégâts élémentaires
critChance: 15,          // % chance critique
critDamage: 35,          // % dégâts critiques
attackSpeed: 12,         // % vitesse attaque
castSpeed: 18,           // % vitesse sorts

// Défense & Survie
armor: 120,              // Armure physique
defense: 85,             // Défense générale
endurance: 45,           // Endurance/Constitution
health: 250,             // Points de vie bonus
blockChance: 18,         // % chance bloquer
evasion: 22,             // Esquive (dodge)
damageReduction: 10,     // % réduction dégâts
damageReflect: 8,        // % renvoi dégâts
magicResist: 25,         // Résistance magique

// Agilité & Mobilité
agility: 68,             // Agilité générale
movementSpeed: 25,       // % vitesse déplacement
stealth: 18,             // Furtivité
accuracy: 38,            // Précision
backstabDamage: 35,      // % dégâts backstab

// Mana & Régénération
mana: 500,               // Mana bonus
manaRegen: 22,           // Mana/s
healthRegen: 15,         // HP/s

// Stats Healer
wisdom: 95,              // Sagesse
healingPower: 128,       // Puissance soins
healBonus: 28,           // % bonus soins
aoeHealBonus: 15,        // % bonus soins zone

// Spéciales
spellCrit: 20,           // % crit sorts
spellPenetration: 18,    // Pénétration magique
lifesteal: 8,            // % vol de vie
piercing: 10,            // Pénétration armure
range: 8,                // Portée attaque
perception: 15,          // Perception
```

### Consumable Effects

```javascript
// Heal/Restore
healAmount: 400,         // Heal instantané
manaAmount: 320,         // Mana instantané

// Regen Temporaire
healthRegen: 25,         // HP/s
manaRegen: 15,           // MP/s

// Buffs Temporaires
allStats: 45,            // Bonus toutes stats
allDamage: 30,           // % tous dégâts
allResist: 25,           // % toutes résistances

// Buffs Spécialisés
gatherSpeed: 25,         // % vitesse récolte
gatherBonus: 10,         // % bonus récolte
craftSpeed: 30,          // % vitesse craft
craftQuality: 15,        // % qualité craft
professionExp: 20,       // % XP métiers
expBonus: 12,            // % XP combat
goldFind: 10,            // % or trouvé
bossDamage: 35,          // % dégâts boss

// Duration
duration: 300,           // Secondes (0 = instant)
```

---

## 🏷️ ARCHÉTYPES

### Valeurs Possibles

```javascript
archetype: "tank"; // Tank/Guerrier
archetype: "archer"; // Archer/Rogue
archetype: "mage"; // Mage/Sorcier
archetype: "healer"; // Prêtre/Soigneur
// Optionnel : peut être undefined pour items universels
```

### Usage Recommandé

- **Weapons**: TOUJOURS spécifier l'archetype
- **Armor**: TOUJOURS spécifier l'archetype
- **Accessories**: TOUJOURS spécifier l'archetype
- **Consumables**: Optionnel (potions universelles vs spécialisées)

---

## 📊 TIERS & PROGRESSION

### Tiers Recommandés

```javascript
tier: 1; // Levels 1-10   (Copper, Iron, Leather, Basic)
tier: 2; // Levels 11-20  (Bronze, Steel, Studded, Improved)
tier: 3; // Levels 21-30  (Silver, Mithril, Dragonscale, Advanced)
tier: 4; // Levels 31-40  (Gold, Adamantite, Shadowsilk, Master)
tier: 5; // Levels 41-50  (Platinum, Runite, Legendary, Supreme)
```

### Unlock Levels Recommandés

| Tier | Slot        | Min Level | Max Level |
| ---- | ----------- | --------- | --------- |
| 1    | Weapon      | 1         | 10        |
| 1    | Head        | 3         | 7         |
| 1    | Chest       | 5         | 8         |
| 1    | Legs        | 6         | 9         |
| 1    | Boots       | 4         | 7         |
| 1    | Gloves      | 7         | 10        |
| 2    | Weapon      | 11        | 20        |
| 2    | Full Set    | 12        | 19        |
| 3    | Weapon      | 21        | 30        |
| 3    | Full Set    | 23        | 29        |
| 4    | Weapon      | 31        | 42        |
| 4    | Full Set    | 33        | 40        |
| 5    | Consumables | 44        | 50        |

---

## 🔧 PROFESSIONS

### Mapping Profession → Items

```javascript
"blacksmith"; // Armes métalliques (épées, haches, marteaux)
"armorsmith"; // Armures lourdes (plates, heavy armor)
"tailor"; // Armures légères/tissu (leather, cloth, robes)
"jeweler"; // Accessoires (rings, amulets, talismans)
"alchemist"; // Potions, elixirs
"fishmonger"; // Food buffs, fish-based consumables
```

### Production Time Guidelines

```javascript
// Par Tier
tier: 1  →  15-30s
tier: 2  →  25-45s
tier: 3  →  40-65s
tier: 4  →  55-90s
tier: 5  →  80-120s

// Par Type
'weapon'     →  +10s (crafting complexe)
'armor'      →  +5s par slot (chest > legs > head > gloves > boots)
'accessory'  →  +0s (petits items)
'consumable' →  -10s (mais quantity > 1)
```

---

## 🧮 BALANCING FORMULAS

### Stats Scaling par Tier

```javascript
// Formula générale : Stat_T(n+1) = Stat_T(n) × 2.2

// Exemple Tank Defense
tier: 1  →  defense: 75
tier: 2  →  defense: 75 × 2.2 = 165
tier: 3  →  defense: 165 × 2.2 = 363
tier: 4  →  defense: 363 × 2.2 = 798

// Exemple Archer Agility
tier: 1  →  agility: 52
tier: 2  →  agility: 52 × 2.2 = 114
tier: 3  →  agility: 114 × 2.2 = 250
tier: 4  →  agility: 250 × 2.2 = 550
```

### Material Costs par Tier

```javascript
// Formula : Quantity_T(n+1) = Quantity_T(n) × 1.5 à 2

tier: 1  →  materials: 6-10 units
tier: 2  →  materials: 10-18 units
tier: 3  →  materials: 16-30 units
tier: 4  →  materials: 25-50 units
tier: 5  →  materials: 40-80 units
```

### Consumable Healing

```javascript
// Formula : Heal = BaseHeal × (Tier^2)

tier: 1  →  healAmount: 50   (50 × 1²)
tier: 2  →  healAmount: 150  (50 × 3²/3)
tier: 3  →  healAmount: 400  (50 × 8²/8)
tier: 4  →  healAmount: 900  (50 × 18²/18)
tier: 5  →  healAmount: 2000 (50 × 40²/40)
```

---

## 🐛 DEBUGGING

### Console Logs

```javascript
// Dans crafting-manager.js ligne 63-65
if (GameConfig.DEBUG.enabled) {
  console.log(`📋 Total recettes chargées: ${allRecipes.length}`);
  console.log(`Base: ${baseRecipes.length}, Armes: ${weaponRecipes.length}, ...`);
}
```

### Vérifier Chargement

```javascript
// Console navigateur
console.log(window.CraftRecipesData.length); // 25 (original)
console.log(window.CraftRecipesExtended.length); // 35 (weapons)
console.log(window.CraftRecipesArmors.length); // 50 (armors)
console.log(window.CraftRecipesAccessories.length); // 25 (accessories)
console.log(window.CraftRecipesConsumables.length); // 35 (consumables)
// Total attendu : 170 (25+35+50+25+35)
```

### Tester Recette Spécifique

```javascript
// Dans la console
const recipe = window.game.craftingManager
  .getAllRecipes()
  .find((r) => r.id === "adamantite_chestplate");
console.log(recipe);

// Vérifier matériaux disponibles
recipe.materials.forEach((mat) => {
  const resource = window.ResourcesData.find((r) => r.id === mat.id);
  console.log(`${mat.id}: Unlock ${resource.unlock}, Tier ${resource.tier}`);
});
```

---

## ⚠️ ERREURS COURANTES

### 1. "Recipe materials not found"

```javascript
// ERREUR : Matériau inexistant
materials: [
  { id: "ore_mythril", quantity: 10 }, // ❌ Typo : 'mythril' au lieu de 'mithril'
];

// SOLUTION : Vérifier resources-data.js
materials: [
  { id: "ore_mithril", quantity: 10 }, // ✅ Correct
];
```

### 2. "Recipe unlock higher than material unlock"

```javascript
// ERREUR : Recette craft avant déblocage matériau
{
  requiredLevel: 10,
  materials: [
    { id: 'ore_silver', quantity: 5 }  // ❌ silver unlock = 12
  ]
}

// SOLUTION : Ajuster requiredLevel ou utiliser autre matériau
{
  requiredLevel: 12,  // ✅ Après unlock silver
  materials: [
    { id: 'ore_silver', quantity: 5 }
  ]
}
```

### 3. "Duplicate recipe ID"

```javascript
// ERREUR : ID déjà utilisé
{ id: 'iron_sword', ... }  // Dans craft-recipes-data.js
{ id: 'iron_sword', ... }  // ❌ Duplicate dans craft-recipes-extended.js

// SOLUTION : ID unique
{ id: 'iron_sword_enhanced', ... }  // ✅ Nouveau nom
```

### 4. "Stats object vs effects object"

```javascript
// ERREUR : Mauvais objet pour consumable
{
  category: 'consumable',
  stats: { healAmount: 50 }  // ❌ stats au lieu de effects
}

// SOLUTION : Utiliser 'effects' pour consumables
{
  category: 'consumable',
  effects: { healAmount: 50, duration: 0 }  // ✅ Correct
}
```

---

## 📚 RÉFÉRENCES EXTERNES

### Fichiers de Configuration Liés

```
src/config/resources-data.js     → Liste complète des ressources
src/config/monsters-data.js      → Monster loots (12 types)
src/config/regions-data.js       → Unlock levels par région
src/config/endgame-config.js     → Transmutation, dungeons
docs/BALANCE-OVERVIEW.md         → Vue d'ensemble équilibrage
```

### Documentation Projet

```
PHASE-2-COMPLETE-RECAP.md        → Récapitulatif complet Phase 2
ANALYSE-STATS-EQUILIBRAGE.md     → Analyse comparative des stats
TABLEAU-CHANGEMENTS-UNLOCK-LEVELS.md → Changements unlock levels
ANALYSE-RECETTES-CORRECTION.md   → Corrections recettes originales
```

---

## 🚀 AJOUTER UNE NOUVELLE RECETTE

### Template Rapide

```javascript
// 1. Choisir le bon fichier
// craft-recipes-extended.js     → Armes
// craft-recipes-armors.js       → Armures
// craft-recipes-accessories.js  → Accessoires
// craft-recipes-consumables.js  → Consommables

// 2. Copier/coller ce template
{
  id: 'my_new_item',                    // UNIQUE ID
  name: 'My New Item',
  archetype: 'tank',                    // tank|archer|mage|healer
  category: 'weapon',                   // weapon|armor|accessory|consumable
  profession: 'blacksmith',             // Voir liste professions
  tier: 2,                              // 1-5
  requiredLevel: 15,                    // 1-50
  materials: [
    { id: 'ore_tin', quantity: 10 },
    { id: 'monster_scale', quantity: 4 }
  ],
  produces: { id: 'my_new_item', quantity: 1 },
  productionTime: 35,                   // secondes
  stats: {                              // Pour equipment
    damage: 30,
    defense: 15,
    agility: -3
  }
  // OU
  effects: {                            // Pour consumables
    healAmount: 200,
    duration: 0
  }
},

// 3. Sauvegarder et recharger le jeu
// 4. Tester avec console : window.game.craftingManager.getAllRecipes()
```

---

## 📊 CHECKLIST NOUVELLE RECETTE

- [ ] ID unique (vérifier tous les fichiers craft-recipes-\*.js)
- [ ] Tous les matériaux existent dans resources-data.js
- [ ] requiredLevel ≥ max(unlock levels des matériaux)
- [ ] tier cohérent avec requiredLevel (T1=1-10, T2=11-20, etc.)
- [ ] Stats équilibrées vs recettes similaires du même tier
- [ ] productionTime raisonnable (15-120s)
- [ ] profession correcte pour le type d'item
- [ ] archetype spécifié (sauf consumables universels)
- [ ] Format JSON valide (virgules, accolades, guillemets)
- [ ] produces.quantity > 1 si consumable de base
- [ ] Stats vs effects selon category (equipment vs consumable)

---

## 💡 TIPS AVANCÉS

### Créer un Set Complet

```javascript
// Toujours 5 pièces : Head, Chest, Legs, Boots, Gloves
// Naming convention : {material}_{slot}
// Levels échelonnés : +0/+2/+1/+0/+3 du min level du tier

const tier3TankSet = {
  head: { requiredLevel: 23 }, // min + 0
  chest: { requiredLevel: 26 }, // min + 3 (pièce maîtresse)
  legs: { requiredLevel: 25 }, // min + 2
  boots: { requiredLevel: 24 }, // min + 1
  gloves: { requiredLevel: 27 }, // min + 4
};
```

### Équilibrer un Nouvel Archetype

```javascript
// 1. Définir l'identité (ex: Assassin = AGI + Stealth + Poison)
// 2. Stats primaires : agility (×3), critChance, stealth
// 3. Stats secondaires : damage, backstabDamage, movementSpeed
// 4. Pénalités : -endurance, -health
// 5. Archetype-specific : poisonDamage, shadowStep
```

### Optimiser Production Time

```javascript
// Formula empirique :
const productionTime = Math.floor(baseTierTime + totalMaterialCost / 10 + categoryModifier);

// Exemples :
// T2 Weapon : 30 + (50/10) + 10 = 45s
// T3 Armor  : 45 + (80/10) + 5  = 58s
// T4 Potion : 60 + (40/10) + (-10) = 54s
```

---

_Guide maintenu à jour - Phase 2 Complete_
