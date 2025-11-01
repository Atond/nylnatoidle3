# 🧪 FIX HOTBAR POTIONS EN COMBAT

**Date** : 28 octobre 2025  
**Priorité** : CRITIQUE (Fonctionnalité invisible)

---

## 📋 PROBLÈME SIGNALÉ

**Symptôme** : La hotbar de potions n'apparaît pas dans l'onglet Combat

**Impact** :

- ❌ Impossible de consommer des potions pendant le combat
- ❌ Fonctionnalité entière invisible malgré le code présent
- ❌ Potions craftées inutilisables

---

## 🔍 ANALYSE DES BUGS (3 bugs critiques)

### Bug 1 : Filtre de Type Incorrect

**Fichier** : `src/js/ui.js` (ligne 717)

**Code BUGUÉ** :

```javascript
const allPotions = this.game.equipmentManager.inventory.filter(
  (item) =>
    item.type === "consumable" && // ❌ FAUX !
    (item.name.includes("Potion") || item.category === "consumable")
);
```

**Problème** :

- Les potions dans `craft-recipes-data.js` ont :
  - `type: 'potion'` (PAS 'consumable')
  - `slot: 'consumable'`
- Le filtre cherchait `type === 'consumable'` → **0 résultat**
- Donc panneau toujours masqué (`display: none`)

---

### Bug 2 : Validation Type dans usePotionInCombat()

**Fichier** : `src/js/ui.js` (ligne 791)

**Code BUGUÉ** :

```javascript
if (!potion || potion.type !== "consumable") {
  // ❌ FAUX !
  this.showNotification("❌ Ceci n'est pas une potion", "error");
  return;
}
```

**Problème** :

- Même erreur que Bug 1
- Validation rejetait **toutes** les potions car `type === 'potion'`
- Aucune potion n'aurait pu être consommée même en cliquant

---

### Bug 3 : Structure de Données Heal

**Fichier** : `src/js/ui.js` (ligne 807)

**Code BUGUÉ** :

```javascript
const recipe = this.game.craftingManager
  .getAllRecipes()
  .find((r) => r.id === potion.recipeId || r.produces.resourceId === potion.id);

if (recipe && recipe.effects) {
  if (recipe.effects.healAmount) {
    // ❌ FAUX !
    // ...
  }
}
```

**Problème** :

- Les potions dans `craft-recipes-data.js` utilisent :
  ```javascript
  stats: {
    hpRestore: 50; // ✅ Correct
  }
  ```
- Le code cherchait `recipe.effects.healAmount` (n'existe pas)
- Heal **jamais appliqué** même si clic fonctionnait

---

## ✅ SOLUTIONS APPLIQUÉES

### Fix 1 : Filtre Potions Amélioré (ligne 717)

**AVANT** :

```javascript
const allPotions = this.game.equipmentManager.inventory.filter(
  (item) =>
    item.type === "consumable" && (item.name.includes("Potion") || item.category === "consumable")
);
```

**APRÈS** :

```javascript
const allPotions = this.game.equipmentManager.inventory.filter(
  (item) =>
    item.type === "potion" || // ✅ Type correct
    item.slot === "consumable" || // ✅ Slot alternatif
    (item.name && item.name.includes("Potion")) // ✅ Fallback nom
);
```

**Impact** :

- ✅ Détecte potions avec `type: 'potion'`
- ✅ Détecte potions avec `slot: 'consumable'`
- ✅ Fallback par nom au cas où

---

### Fix 2 : Validation Type Corrigée (ligne 791)

**AVANT** :

```javascript
if (!potion || potion.type !== "consumable") {
  this.showNotification("❌ Ceci n'est pas une potion", "error");
  return;
}
```

**APRÈS** :

```javascript
if (!potion || (potion.type !== "potion" && potion.slot !== "consumable")) {
  this.showNotification("❌ Ceci n'est pas une potion", "error");
  return;
}
```

**Impact** :

- ✅ Accepte `type: 'potion'`
- ✅ Accepte `slot: 'consumable'`
- ✅ Validation cohérente avec le filtre

---

### Fix 3 : Heal avec stats.hpRestore (ligne 803)

**AVANT** :

```javascript
const recipe = this.game.craftingManager
  .getAllRecipes()
  .find((r) => r.id === potion.recipeId || r.produces.resourceId === potion.id);

if (recipe && recipe.effects) {
  if (recipe.effects.healAmount) {
    // ❌ N'existe pas
    const healed = Math.min(
      recipe.effects.healAmount,
      this.game.player.stats.maxHp - this.game.player.stats.hp
    );
    this.game.player.stats.hp += healed;
    this.showNotification(`💚 +${healed} PV restaurés !`, "success");
  }
}
```

**APRÈS** :

```javascript
let healed = 0;

// ✅ Chercher d'abord dans stats.hpRestore (structure craft-recipes-data.js)
if (potion.stats && potion.stats.hpRestore) {
  healed = Math.min(
    potion.stats.hpRestore,
    this.game.player.stats.maxHp - this.game.player.stats.hp
  );
  this.game.player.stats.hp += healed;
  this.showNotification(`💚 +${healed} PV restaurés !`, "success");
}
// ✅ Sinon chercher dans recipe.effects (ancien système)
else {
  const recipe = this.game.craftingManager
    .getAllRecipes()
    .find((r) => r.id === potion.recipeId || r.id === potion.id.replace(/_\d+$/, ""));

  if (recipe && recipe.effects && recipe.effects.healAmount) {
    healed = Math.min(
      recipe.effects.healAmount,
      this.game.player.stats.maxHp - this.game.player.stats.hp
    );
    this.game.player.stats.hp += healed;
    this.showNotification(`💚 +${healed} PV restaurés !`, "success");
  }
}

if (healed === 0) {
  this.showNotification("⚠️ Effets de la potion introuvables", "warning");
}
```

**Impact** :

- ✅ Utilise `potion.stats.hpRestore` (structure actuelle)
- ✅ Fallback vers `recipe.effects.healAmount` (compatibilité)
- ✅ Heal +50/150/300/600/1200 PV fonctionne
- ✅ Warning si aucun effet trouvé

---

## 🎮 STRUCTURE DES POTIONS

### Exemple : Petite Potion de Vie

**Fichier** : `src/config/craft-recipes-data.js`

```javascript
{
    id: 'potion_health_small',
    name: 'Petite Potion de Vie',
    type: 'potion',           // ✅ Type principal
    slot: 'consumable',       // ✅ Slot d'équipement
    icon: '🧪',
    rarity: 'common',
    profession: 'alchemist',
    professionLevel: 1,
    materials: [
        { resourceId: 'plant_dandelion', amount: 5 },
        { resourceId: 'plant_medicinal_herb', amount: 3 }
    ],
    craftTime: 1500,
    stats: {
        hpRestore: 50        // ✅ Heal utilisé par le fix
    },
    requiredLevel: 1,
    description: 'Restaure 50 HP. Brassée avec des herbes médicinales.'
}
```

---

## 📊 LISTE DES POTIONS (5 niveaux)

| ID                      | Nom                      | Type     | Slot         | Heal     | Niveau |
| ----------------------- | ------------------------ | -------- | ------------ | -------- | ------ |
| `potion_health_small`   | Petite Potion de Vie     | `potion` | `consumable` | +50 PV   | 1      |
| `potion_health_medium`  | Potion de Vie            | `potion` | `consumable` | +150 PV  | 11     |
| `potion_health_large`   | Potion de Vie Supérieure | `potion` | `consumable` | +300 PV  | 21     |
| `potion_health_greater` | Grande Potion de Vie     | `potion` | `consumable` | +600 PV  | 31     |
| `potion_health_supreme` | Potion Suprême           | `potion` | `consumable` | +1200 PV | 41     |

**Impact du fix** : **TOUTES** les potions maintenant détectables et consommables

---

## 🧪 TESTS DE VALIDATION

### Test 1 : Affichage Hotbar

**Avant le fix** :

1. Craft 5× Petite Potion de Vie
2. Aller dans onglet Combat
3. Résultat : **Aucune hotbar visible** ❌

**Après le fix** :

1. ✅ F5 pour recharger
2. ✅ Craft 5× Petite Potion de Vie
3. ✅ Aller dans onglet Combat
4. ✅ Vérifier hotbar visible : "🧪 Potions Rapides"
5. ✅ Voir slot : "🧪 Petite Potion de Vie ×5"

---

### Test 2 : Consommation Potion

**Avant le fix** :

1. Clic sur potion (si visible)
2. Résultat : **Erreur "Ceci n'est pas une potion"** ❌

**Après le fix** :

1. ✅ Combat avec monstre → Prendre dégâts (ex: 80/150 PV)
2. ✅ Cliquer sur Petite Potion de Vie dans hotbar
3. ✅ Vérifier heal instantané : 80 → 130 PV (+50)
4. ✅ Voir notification : "💚 +50 PV restaurés !"
5. ✅ Vérifier compteur : ×5 → ×4
6. ✅ Vérifier inventaire : 5 → 4 potions

---

### Test 3 : Plusieurs Types de Potions

**Objectif** : Vérifier hotbar avec 4 slots maximum

1. ✅ Craft 10× Petite Potion de Vie
2. ✅ Craft 10× Potion de Vie (si Alchimiste niveau 11)
3. ✅ Craft 10× Potion de Mana (si existe)
4. ✅ Craft 10× Potion de Force (si existe)
5. ✅ Aller dans Combat
6. ✅ Vérifier hotbar affiche 4 slots remplis
7. ✅ Cliquer chaque potion → Vérifier effets distincts

---

### Test 4 : Hotbar Disparaît Sans Potions

**Objectif** : Vérifier masquage automatique

1. ✅ Avoir 1× Petite Potion de Vie
2. ✅ Vérifier hotbar visible
3. ✅ Consommer la dernière potion
4. ✅ Vérifier hotbar **disparaît automatiquement**
5. ✅ Craft nouvelle potion
6. ✅ Vérifier hotbar **réapparaît**

---

### Test 5 : Persistance Après Recharge

**Objectif** : Vérifier sauvegarde/chargement

1. ✅ Craft 5× Petite Potion de Vie
2. ✅ Vérifier hotbar affiche ×5
3. ✅ Sauvegarder (auto ou manuel)
4. ✅ F5 pour recharger
5. ✅ Aller dans Combat
6. ✅ Vérifier hotbar toujours affiche ×5

---

## 🎯 FONCTIONNALITÉS HOTBAR

### Affichage Dynamique

```javascript
updateCombatPotions() {
    // 1. Filtre potions dans inventaire
    const allPotions = inventory.filter(item =>
        item.type === 'potion' ||
        item.slot === 'consumable'
    );

    // 2. Groupe par type (grouper IDs similaires)
    const potionGroups = {};
    allPotions.forEach(potion => {
        const key = potion.id.replace(/_\d+$/, '');  // Enlever suffixe numérique
        if (!potionGroups[key]) {
            potionGroups[key] = { item: potion, count: 0 };
        }
        potionGroups[key].count++;
    });

    // 3. Limiter à 4 slots
    const potionTypes = Object.values(potionGroups).slice(0, 4);

    // 4. Afficher/masquer panneau
    if (potionTypes.length > 0) {
        panel.style.display = '';  // ✅ Visible
    } else {
        panel.style.display = 'none';  // ✅ Masqué
    }
}
```

---

### Consommation au Clic

```javascript
usePotionInCombat(potion) {
    // 1. Valider type
    if (potion.type !== 'potion' && potion.slot !== 'consumable') {
        return;
    }

    // 2. Retirer de l'inventaire
    inventory.splice(index, 1);

    // 3. Appliquer heal
    const healed = Math.min(potion.stats.hpRestore, maxHp - currentHp);
    player.hp += healed;

    // 4. Notification
    showNotification(`💚 +${healed} PV restaurés !`, 'success');

    // 5. Rafraîchir hotbar
    updateCombatPotions();
}
```

---

## 🔗 FICHIERS MODIFIÉS

**1. `src/js/ui.js`** (3 modifications)

| Ligne   | Type           | Description                                                             |
| ------- | -------------- | ----------------------------------------------------------------------- |
| 717     | Fix filtre     | `item.type === 'potion'` au lieu de `'consumable'`                      |
| 791     | Fix validation | `potion.type !== 'potion' && potion.slot !== 'consumable'`              |
| 803-834 | Fix heal       | Utilise `potion.stats.hpRestore` au lieu de `recipe.effects.healAmount` |

---

## 📈 IMPACT DU FIX

### Avant

**Early Game** :

- ❌ Potions craftées mais **inutilisables**
- ❌ Heal uniquement via repos (+50% HP/5s)
- ❌ Combat risqué sans heal instantané

**Mid/Late Game** :

- ❌ Alchimie profession inutile
- ❌ Impossibilité de survivre donjons difficiles
- ❌ 50+ potions en inventaire non consommables

---

### Après

**Early Game** :

- ✅ Potions consommables en combat
- ✅ Heal instantané +50 PV (survie niveau 1-10)
- ✅ Alchimie profession viable

**Mid Game** :

- ✅ Potion de Vie +150 PV (survie niveau 11-20)
- ✅ Hotbar 4 slots pour types variés
- ✅ Stratégie combat avec gestion potions

**Late Game** :

- ✅ Grande Potion de Vie +600 PV
- ✅ Potion Suprême +1200 PV (endgame viable)
- ✅ Économie potions complète

---

## 💡 NOTES TECHNIQUES

### Pourquoi 3 Bugs Simultanés ?

**Cause racine** : Incohérence structure de données

1. **Conception initiale** : Système prévu avec `type: 'consumable'`
2. **Implémentation recettes** : Utilisé `type: 'potion'` à la place
3. **Code UI** : Resté sur ancienne structure `type: 'consumable'`

**Résultat** : Code fonctionnel **MAIS** incompatible avec données

---

### Pourquoi Le Bug Était Invisible ?

**Console développeur** : Aucune erreur JavaScript

- Filtre retournait `[]` (vide) → **Comportement normal**
- Panneau masqué avec `display: none` → **Comportement attendu**
- Code exécuté correctement → **Pas de crash**

**Seul symptôme** : Panneau jamais affiché

---

### Architecture Améliorée

**Avant** : Structure rigide

```javascript
if (item.type === 'consumable') { ... }  // ❌ 1 seul critère
```

**Après** : Structure flexible

```javascript
if (item.type === 'potion' ||        // ✅ Critère principal
    item.slot === 'consumable' ||    // ✅ Critère alternatif
    item.name.includes('Potion')) {  // ✅ Fallback
    ...
}
```

**Impact** :

- ✅ Compatible avec structure actuelle
- ✅ Compatible avec futures structures
- ✅ Failsafe par nom si types changent

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Corrections** :

- ✅ Fix détection potions dans inventaire (type 'potion' au lieu de 'consumable')
- ✅ Fix validation type dans usePotionInCombat()
- ✅ Fix récupération heal (stats.hpRestore au lieu de effects.healAmount)

**Impact** :

- ✅ Hotbar potions maintenant visible en combat
- ✅ Potions consommables au clic
- ✅ Heal +50/150/300/600/1200 PV fonctionnel
- ✅ Compteur ×N mis à jour
- ✅ Panneau masqué automatiquement si inventaire vide

**Fonctionnalités débloquées** :

- Consommation potions en combat (5 niveaux)
- Gestion 4 slots hotbar
- Notifications heal instantané
- Persistance sauvegarde/chargement

---

**Fin du document** 🧪
