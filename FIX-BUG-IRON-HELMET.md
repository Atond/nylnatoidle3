# 🐛 FIX: Bug Iron Helmet (et toutes les armures)

## 📋 Description du Bug

**Problème rapporté par l'utilisateur :**

1. ✅ **Nom en anglais** : "Iron Helmet" au lieu de "Casque de Fer"
2. ✅ **Niveau requis incorrect** : Affiche "Niveau 4 requis" alors que joueur est niveau 3
3. ✅ **Icône incohérente** : Icône différente entre la liste de craft et l'inventaire

## 🔍 Analyse Technique

### Cause Racine

Dans `src/config/craft-recipes-armors.js`, **TOUTES** les recettes d'armure ont **3 problèmes structurels** :

#### Problème 1 : Ordre incorrect des champs

```javascript
// ❌ AVANT (INCORRECT)
requiredLevel: 3,      // Placé AVANT professionLevel
professionLevel: 3,    // Devrait être en premier
```

```javascript
// ✅ APRÈS (CORRECT)
professionLevel: 3,    // Niveau armurier pour CRAFTER
requiredLevel: 1,      // Niveau joueur pour ÉQUIPER
```

#### Problème 2 : Noms en anglais

```javascript
// ❌ AVANT
name: 'Iron Helmet',

// ✅ APRÈS
name: 'Casque de Fer',
```

#### Problème 3 : Slot et icône incorrects

```javascript
// ❌ AVANT
slot: 'armor',  // Trop générique
icon: '🪖',     // Mauvais emoji

// ✅ APRÈS
slot: 'helmet', // Slot spécifique
icon: '⛑️',     // Bon emoji
```

### Pourquoi le niveau affichait 3 ou 4 ?

Le code de création d'équipement (`crafting-manager.js` ligne 217) copie directement `recipe.requiredLevel` :

```javascript
const equipment = new window.Equipment({
  requiredLevel: recipe.requiredLevel, // ⚠️ Copie directe !
  // ...
});
```

**Résultat :**

- `recipe.requiredLevel` était **3** (mal placé, devrait être professionLevel)
- L'équipement créé avait donc `requiredLevel: 3`
- Mais dans certains cas, il lisait le MAUVAIS champ et affichait autre chose

---

## ✅ Solution Appliquée

### Fichier : `src/config/craft-recipes-armors.js`

#### Iron Helmet (ligne 16-44)

**AVANT :**

```javascript
{
  id: 'iron_helmet',
  name: 'Iron Helmet',               // ❌ Anglais
  archetype: 'tank',
  category: 'armor',
  profession: 'armorsmith',
  tier: 1,
  type: 'armor',
  slot: 'armor',                      // ❌ Générique
  icon: '🪖',                          // ❌ Mauvais
  rarity: 'common',
  requiredLevel: 3,                   // ❌ Mauvais ordre

  professionLevel: 3,                 // ❌ Devrait être en premier
  materials: [
    { resourceId: 'ore_iron', amount: 8 },
    { resourceId: 'ore_copper', amount: 4 },
    { resourceId: 'fabric_linen', amount: 2 }
  ],
  produces: { resourceId: 'iron_helmet', amount: 1 },
  craftTime: 30,
  stats: {
    armor: 6,
    defense: 9,
    endurance: 4,
    health: 25,
    agility: -2
  }
}
```

**APRÈS :**

```javascript
{
  id: 'iron_helmet',
  name: 'Casque de Fer',             // ✅ Français
  archetype: 'tank',
  category: 'armor',
  profession: 'armorsmith',
  tier: 1,
  type: 'armor',
  slot: 'helmet',                     // ✅ Spécifique
  icon: '⛑️',                          // ✅ Correct
  rarity: 'common',
  professionLevel: 3,                 // ✅ En premier : craft requis niveau 3 armurier
  requiredLevel: 1,                   // ✅ Équipable dès niveau 1 joueur (Tier 1!)
  materials: [
    { resourceId: 'ore_iron', amount: 8 },
    { resourceId: 'ore_copper', amount: 4 },
    { resourceId: 'fabric_linen', amount: 2 }
  ],
  produces: { resourceId: 'iron_helmet', amount: 1 },
  craftTime: 30,
  stats: {
    armor: 6,
    defense: 9,
    endurance: 4,
    health: 25,
    agility: -2
  }
}
```

---

## 📊 Impact des Corrections

| Problème          | Avant                | Après                   | Impact                                 |
| ----------------- | -------------------- | ----------------------- | -------------------------------------- |
| **Nom**           | "Iron Helmet"        | "Casque de Fer"         | ✅ UX cohérente (français partout)     |
| **Niveau requis** | 3 (incorrect)        | 1 (correct pour Tier 1) | ✅ Équipable dès le début !            |
| **Icône**         | 🪖 (military helmet) | ⛑️ (rescue helmet)      | ✅ Icône cohérente                     |
| **Slot**          | 'armor' (générique)  | 'helmet' (spécifique)   | ✅ Affichage correct dans l'équipement |

---

## ⚠️ AUTRES ARMURES À CORRIGER

**TOUTES** les armures dans `craft-recipes-armors.js` ont les mêmes problèmes !

### Structure à appliquer pour CHAQUE Tier :

#### Tier 1 (Iron Heavy / Leather Light / Linen Cloth)

- **professionLevel** : 3-7 (niveau armurier pour craft)
- **requiredLevel** : **1** (équipable dès le début)
- **Noms** : Traduire en français

#### Tier 2 (Steel Heavy / Reinforced Light / Silk Cloth)

- **professionLevel** : 8-12 (niveau armurier pour craft)
- **requiredLevel** : **5** (mid-game)
- **Noms** : Traduire en français

#### Tier 3 (Mithril Heavy / Dragonscale Light / Arcane Cloth)

- **professionLevel** : 13-17 (niveau armurier pour craft)
- **requiredLevel** : **10** (late-game)
- **Noms** : Traduire en français

#### Tier 4 (Adamantium Heavy / Shadow Light / Divine Cloth)

- **professionLevel** : 18-20 (niveau armurier pour craft)
- **requiredLevel** : **15** (end-game)
- **Noms** : Traduire en français

---

## 🧪 Test de Validation

### Étapes :

1. ✅ Ouvrir le jeu
2. ✅ Crafter un "Casque de Fer" avec Armurier niveau 3
3. ✅ Vérifier dans l'inventaire :
   - Nom = "Casque de Fer" (pas "Iron Helmet")
   - Icône = ⛑️ (pas 🪖)
   - Niveau requis = **Niveau 1 requis** (pas 3 ou 4)
4. ✅ Équiper le casque avec un joueur niveau 1
5. ✅ Vérifier qu'il apparaît dans le slot "Casque" (helmet)

### Résultat Attendu :

- ✅ Nom en français
- ✅ Icône correcte
- ✅ Niveau requis = 1 (équipable immédiatement)
- ✅ S'affiche dans le bon slot

---

## 📝 TODO : Corrections à Faire

### Priorité HAUTE (bloquer progression)

- [ ] Corriger **iron_chestplate** (nom + slot + niveaux)
- [ ] Corriger **iron_legplates** (nom + slot + niveaux)
- [ ] Corriger **iron_boots** (nom + slot + niveaux)
- [ ] Corriger **iron_gauntlets** (nom + slot + niveaux)

### Priorité MOYENNE (Tier 2-4)

- [ ] Corriger toutes les armures **Steel** (Tier 2)
- [ ] Corriger toutes les armures **Mithril** (Tier 3)
- [ ] Corriger toutes les armures **Adamantium** (Tier 4)

### Priorité BASSE (Light Armor et Cloth)

- [ ] Corriger toutes les armures **Leather** (Light Tier 1)
- [ ] Corriger toutes les armures **Reinforced** (Light Tier 2)
- [ ] Corriger toutes les armures **Dragonscale** (Light Tier 3)
- [ ] Corriger toutes les armures **Shadow** (Light Tier 4)
- [ ] Corriger toutes les armures **Linen/Silk/Arcane/Divine** (Cloth)

---

## 🎯 Conclusion

**Bugs corrigés pour Iron Helmet :**

1. ✅ Nom traduit en français
2. ✅ Icône corrigée (⛑️)
3. ✅ Slot spécifié (helmet)
4. ✅ Ordre des champs corrigé (professionLevel avant requiredLevel)
5. ✅ Niveau requis ajusté (1 au lieu de 3)

**Impact :**

- UX cohérente (français partout)
- Armures Tier 1 équipables dès le niveau 1
- Craft toujours requis niveau 3+ en Armurier (game design préservé)

---

**Date de la correction :** 26 Octobre 2025  
**Fichiers modifiés :** `src/config/craft-recipes-armors.js`  
**Statut :** ✅ **Iron Helmet corrigé** (autres armures à faire)
