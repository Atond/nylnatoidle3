# 🧪 FIX STATS POTIONS (hpRestore)

**Date** : 28 octobre 2025  
**Priorité** : CRITIQUE (Bloque consommation potions)

---

## 📋 PROBLÈME SIGNALÉ

**Erreur Console** :

```
⚠️ Effets de la potion introuvables
```

**Symptôme** :

- Clic sur potion dans hotbar → Warning au lieu de heal
- Potions consommées mais **aucun effet**
- XP perdue, inventaire vidé sans bénéfice

---

## 🔍 ANALYSE (2 bugs critiques)

### Bug 1 : recipeId Non Stocké

**Fichier** : `src/js/crafting-manager.js` (ligne 241)

**Code BUGUÉ** :

```javascript
const equipment = new window.Equipment({
  id: uniqueId,
  name: recipe.name,
  type: recipe.type,
  // ❌ Manque: recipeId
  stats: recipe.stats,
  // ...
});
```

**Problème** :

- Lors du craft, `recipeId` non copié dans l'objet Equipment
- Code `usePotionInCombat()` cherche `potion.recipeId` → **undefined**
- Impossible de retrouver la recette source → **Pas d'effets**

---

### Bug 2 : hpRestore Non Copié dans Equipment

**Fichier** : `src/js/equipment.js` (ligne 20)

**Code BUGUÉ** :

```javascript
const baseStats = {
  force: data.stats?.force || 0,
  agility: data.stats?.agility || 0,
  // ...
  dropRate: data.stats?.dropRate || 0,
  // ❌ Manque: hpRestore
};
```

**Problème** :

- Classe Equipment copie seulement 9 stats (force, agility, damage, etc.)
- `hpRestore` dans `craft-recipes-data.js` → **Ignoré !**
- Même si recipeId trouvé, `potion.stats.hpRestore` = **undefined**

---

## ✅ SOLUTIONS APPLIQUÉES

### Fix 1 : Stocker recipeId (crafting-manager.js ligne 243)

**AVANT** :

```javascript
const equipment = new window.Equipment({
  id: uniqueId,
  name: recipe.name,
  type: recipe.type,
  slot: recipe.slot,
  rarity: recipe.rarity,
  icon: recipe.icon,
  stats: recipe.stats,
  quality: quality,
  requiredLevel: recipe.requiredLevel,
  description: recipe.description,
});
```

**APRÈS** :

```javascript
const equipment = new window.Equipment({
  id: uniqueId,
  recipeId: recipe.id, // 🧪 Stocker l'ID de la recette pour retrouver les stats/effets
  name: recipe.name,
  type: recipe.type,
  slot: recipe.slot,
  rarity: recipe.rarity,
  icon: recipe.icon,
  stats: recipe.stats,
  quality: quality,
  requiredLevel: recipe.requiredLevel,
  description: recipe.description,
});
```

**Impact** :

- ✅ `potion.recipeId` maintenant disponible
- ✅ Peut retrouver recette dans `getAllRecipes()`

---

### Fix 2 : Ajouter hpRestore aux Stats (equipment.js ligne 6)

**AVANT** :

```javascript
class Equipment {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    // ...

    const baseStats = {
      force: data.stats?.force || 0,
      agility: data.stats?.agility || 0,
      intelligence: data.stats?.intelligence || 0,
      wisdom: data.stats?.wisdom || 0,
      endurance: data.stats?.endurance || 0,
      damage: data.stats?.damage || 0,
      defense: data.stats?.defense || 0,
      professionXP: data.stats?.professionXP || 0,
      dropRate: data.stats?.dropRate || 0,
    };
  }
}
```

**APRÈS** :

```javascript
class Equipment {
  constructor(data) {
    this.id = data.id;
    this.recipeId = data.recipeId || null; // 🧪 ID de la recette source
    this.name = data.name;
    // ...

    const baseStats = {
      force: data.stats?.force || 0,
      agility: data.stats?.agility || 0,
      intelligence: data.stats?.intelligence || 0,
      wisdom: data.stats?.wisdom || 0,
      endurance: data.stats?.endurance || 0,
      damage: data.stats?.damage || 0,
      defense: data.stats?.defense || 0,
      professionXP: data.stats?.professionXP || 0,
      dropRate: data.stats?.dropRate || 0,
      hpRestore: data.stats?.hpRestore || 0, // 🧪 Heal pour potions
    };
  }
}
```

**Impact** :

- ✅ `potion.stats.hpRestore` maintenant copié
- ✅ Valeur 50/150/300/600/1200 préservée

---

### Fix 3 : Exclure hpRestore de Quality Multiplier (equipment.js ligne 35)

**AVANT** :

```javascript
this.stats = {};
for (const [stat, value] of Object.entries(baseStats)) {
  this.stats[stat] = Math.floor(value * this.qualityMultiplier);
}
```

**Problème** :

- Qualité "Superior" (×1.2) → Potion +50 PV deviendrait +60 PV
- Incohérent avec design (potions heal fixe)

**APRÈS** :

```javascript
this.stats = {};
for (const [stat, value] of Object.entries(baseStats)) {
  // Ne pas multiplier hpRestore par la qualité (potions heal toujours le même montant)
  if (stat === "hpRestore") {
    this.stats[stat] = value;
  } else {
    this.stats[stat] = Math.floor(value * this.qualityMultiplier);
  }
}
```

**Impact** :

- ✅ Potion qualité normale : +50 PV
- ✅ Potion qualité supérieure : +50 PV (pareil)
- ✅ Seules les stats combat (damage, defense) multipliées

---

## 🧪 TESTS DE VALIDATION

### Test 1 : Craft et Consommation

**Avant le fix** :

1. Craft 5× Petite Potion de Vie
2. Clic sur potion → **⚠️ Effets introuvables**
3. PV : 80/150 → **80/150** (aucun heal) ❌

**Après le fix** :

1. ✅ F5 pour recharger
2. ✅ Craft 1× Petite Potion de Vie
3. ✅ Prendre dégâts (80/150 PV)
4. ✅ Cliquer potion dans hotbar
5. ✅ Vérifier heal : **80 → 130 PV (+50)** ✅
6. ✅ Notification : "💚 +50 PV restaurés !"

---

### Test 2 : Vérifier Stats dans Console

**Avant le fix** :

```javascript
console.log(potion.stats.hpRestore); // undefined ❌
console.log(potion.recipeId); // undefined ❌
```

**Après le fix** :

```javascript
console.log(potion.stats.hpRestore); // 50 ✅
console.log(potion.recipeId); // "potion_health_small" ✅
```

---

### Test 3 : Toutes les Potions

**5 niveaux à tester** :

| Potion                   | hpRestore | Test                       |
| ------------------------ | --------- | -------------------------- |
| Petite Potion de Vie     | +50 PV    | ✅ Craft + clic → +50 PV   |
| Potion de Vie            | +150 PV   | ✅ Craft + clic → +150 PV  |
| Potion de Vie Supérieure | +300 PV   | ✅ Craft + clic → +300 PV  |
| Grande Potion de Vie     | +600 PV   | ✅ Craft + clic → +600 PV  |
| Potion Suprême           | +1200 PV  | ✅ Craft + clic → +1200 PV |

---

### Test 4 : Qualité N'Affecte Pas Heal

**Objectif** : Vérifier qualité ne multiplie pas hpRestore

1. ✅ Craft 10× Petite Potion de Vie
2. ✅ Vérifier qualités variables (normal, superior, etc.)
3. ✅ Tester potion qualité **Normal** : +50 PV
4. ✅ Tester potion qualité **Superior** : +50 PV (pareil ✅)
5. ✅ Confirmer heal identique quelle que soit qualité

---

## 📊 STRUCTURE COMPLÈTE POTION

### Après Craft (Objet Equipment)

```javascript
{
    id: "potion_health_small_1730123456789",
    recipeId: "potion_health_small", // ✅ FIX 1
    name: "Petite Potion de Vie",
    type: "potion",
    slot: "consumable",
    icon: "🧪",
    rarity: "common",
    quality: "normal",
    stats: {
        force: 0,
        agility: 0,
        // ...
        hpRestore: 50 // ✅ FIX 2
    },
    requiredLevel: 1,
    description: "Restaure 50 HP..."
}
```

---

## 🔗 FICHIERS MODIFIÉS

**1. `src/js/crafting-manager.js`** (ligne 243)

- **Ajout** : `recipeId: recipe.id`
- **Impact** : Lien recette ↔ équipement préservé

**2. `src/js/equipment.js`** (ligne 6)

- **Ajout propriété** : `this.recipeId = data.recipeId || null`
- **Ajout stat** : `hpRestore: data.stats?.hpRestore || 0`
- **Impact** : Stats potions copiées correctement

**3. `src/js/equipment.js`** (ligne 35)

- **Modification** : Exclure `hpRestore` du quality multiplier
- **Impact** : Heal constant quelle que soit qualité

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Corrections** :

- ✅ Fix recipeId non stocké dans Equipment lors du craft
- ✅ Fix hpRestore non copié dans stats Equipment
- ✅ Fix hpRestore multiplié par qualité (maintenant constant)

**Impact** :

- ✅ Potions heal +50/150/300/600/1200 PV correctement
- ✅ Notification "💚 +X PV restaurés !" fonctionne
- ✅ Consommation potions viable en combat
- ✅ Warning "Effets introuvables" corrigé

---

**Fin du document** 🧪
