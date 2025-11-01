# 🐛 CORRECTIONS BUGS - Combat & Inventaire

**Date** : 28 octobre 2025  
**Statut** : ✅ Complété

---

## 📋 Problèmes Identifiés

### 1. **Icône Corrompue dans Drops**

- **Symptôme** : Journal affichait `📦 � Peau de Monstre x3` (icône cassée)
- **Cause** : `drops-data.js` ligne 16 avait `icon: "�"` (caractère corrompu)

### 2. **Peaux Invisibles dans Inventaire**

- **Symptôme** : Peaux visibles dans craft mais pas dans l'onglet Ressources
- **Cause** : `getResourceType()` ne reconnaissait pas `monster_hide` (sans préfixe `loot_`)
- **Impact** : Les drops `monster_hide`, `robust_hide`, etc. retournaient `'unknown'`

### 3. **Cuirs Traités Invisibles**

- **Symptôme** : `fabric_simple_leather` et `fabric_tanned_leather` non trouvés
- **Cause** : Stockés dans catégorie `processed_leather` mais pas cherchés par `findResourceById()`

### 4. **Crash sur Recettes Processing**

- **Symptôme** : Erreur `Cannot convert undefined to object` en cliquant "Traiter les Peaux Brutes"
- **Cause** : `showRecipeDetail()` appelait `Object.entries(recipe.stats)` mais recettes `type: 'processing'` n'ont pas de stats

### 5. **Notification Transmutation Niveau 5**

- **Symptôme** : Message "Transmutation débloquée" apparaissait au niveau 5
- **Cause** : `TRANSMUTATION_CONFIG.unlockLevel = 5` et quête M08 débloquait l'onglet

---

## ✅ Solutions Appliquées

### 1. Correction Icône Monster Hide

**Fichier** : `src/config/drops-data.js`  
**Ligne** : 16

```javascript
// AVANT
icon: "�",

// APRÈS
icon: "🦌",
```

**Résultat** : Journal affiche `📦 🦌 Peau de Monstre x3` ✅

---

### 2. Extension getResourceType()

**Fichier** : `src/js/profession-manager.js`  
**Ligne** : 331-348

```javascript
getResourceType(resourceId) {
    if (resourceId.startsWith('wood_')) return 'wood';
    if (resourceId.startsWith('ore_')) return 'ore';
    if (resourceId.startsWith('plant_')) return 'plants';
    if (resourceId.startsWith('fish_')) return 'fish';
    if (resourceId.startsWith('gem_')) return 'gems';
    if (resourceId.startsWith('loot_')) return 'loot';

    // ✅ FIX: Loots sans préfixe (monster_hide, robust_hide, etc.)
    if (resourceId.startsWith('monster_') || resourceId.startsWith('robust_')) return 'loot';

    // ✅ FIX: Cuirs traités par le Tanneur
    if (resourceId.startsWith('fabric_')) return 'fabrics';

    return 'unknown';
}
```

**Résultat** : Les peaux et cuirs s'affichent dans l'inventaire ✅

---

### 3. Extension findResourceById()

**Fichier** : `src/config/resources-data.js`  
**Ligne** : 288-293

```javascript
function findResourceById(resourceId) {
  // Chercher dans toutes les catégories (y compris processed_leather)
  for (const category of [
    "wood",
    "ore",
    "gems",
    "loot",
    "plants",
    "fish",
    "fabrics",
    "processed_leather",
  ]) {
    const resource = ResourcesData[category]?.find((r) => r.id === resourceId);
    if (resource) {
      // ...
    }
  }
  return null;
}
```

**Résultat** : `fabric_simple_leather` trouvé dans `processed_leather` ✅

---

### 4. Correction showRecipeDetail()

**Fichier** : `src/js/ui.js`  
**Ligne** : 2006-2011

```javascript
// Générer les stats uniquement si la recette en a (équipements)
const stats = recipe.stats
  ? Object.entries(recipe.stats)
      .map(([stat, value]) => {
        const statName = this.getStatName(stat);
        return `<div class="detail-stat">+${value} ${statName}</div>`;
      })
      .join("")
  : "";
```

**Ajout Affichage Production** :

```javascript
${recipe.produces ? `
    <div class="detail-stats">
        <h4>🎁 Production</h4>
        <div class="detail-stat" style="color: var(--color-success);">
            ${window.findResourceById(recipe.produces.resourceId)?.icon || '📦'}
            ${recipe.produces.amount}x ${window.findResourceById(recipe.produces.resourceId)?.name || recipe.produces.resourceId}
        </div>
    </div>
` : ''}
```

**Résultat** : Plus de crash, affichage "🎁 Production: 🎒 1x Cuir Simple" ✅

---

### 5. Report Transmutation Niveau 20

**Fichier 1** : `src/config/transmutation-data.js`  
**Ligne** : 202

```javascript
// AVANT
unlockLevel: 5,

// APRÈS
unlockLevel: 20,  // Déblocage après les recherches
```

**Fichier 2** : `src/config/quests-data.js`  
**Ligne** : 212

```javascript
// AVANT (Quête M08 niveau 5)
unlocks: ['alchemy_tab'],
message: 'Vous devenez plus puissant ! Transmutation débloquée !'

// APRÈS
// (Pas d'unlock)
message: 'Vous devenez plus puissant !'
```

**Nouvelle Quête** : `main_010c` (niveau 20)

```javascript
{
    id: 'main_010c',
    title: '⚗️ Alchimie Avancée',
    description: 'Atteignez le niveau 20 pour débloquer la Transmutation.',
    type: 'level_up',
    target: 20,
    requirements: { quest: 'main_010b' },
    rewards: {
        xp: 3000,
        gold: 2000,
        unlocks: ['alchemy_tab'],
        message: '⚗️ TRANSMUTATION DÉBLOQUÉE !'
    }
}
```

**Résultat** : Plus de notification au niveau 5, déblocage au niveau 20 ✅

---

## 🧪 Tests à Effectuer

1. **Combattre un monstre**
   - ✅ Journal affiche `📦 🦌 Peau de Monstre x3` (avec icône)
   - ✅ Onglet Ressources affiche les peaux
2. **Ouvrir Tanneur**
   - ✅ Cliquer "Traiter les Peaux Brutes" → Pas de crash
   - ✅ Affichage "🎁 Production: 🎒 1x Cuir Simple"
   - ✅ Matériaux requis : `🦌 Peau de monstre: 5/5`
3. **Monter niveau 5**
   - ✅ Pas de notification Transmutation
   - ✅ Quête M08 complétée sans débloquer l'onglet
4. **Monter niveau 20**
   - ⏳ Quête M10c apparaît
   - ⏳ Notification "⚗️ TRANSMUTATION DÉBLOQUÉE !"
   - ⏳ Onglet Transmutation accessible

---

## 📊 Récapitulatif

| Problème            | Fichier Modifié         | Lignes    | Statut     |
| ------------------- | ----------------------- | --------- | ---------- |
| Icône corrompue     | `drops-data.js`         | 16        | ✅ Corrigé |
| Peaux invisibles    | `profession-manager.js` | 338-341   | ✅ Corrigé |
| Cuirs invisibles    | `resources-data.js`     | 290       | ✅ Corrigé |
| Crash processing    | `ui.js`                 | 2006-2011 | ✅ Corrigé |
| Notif transmutation | `transmutation-data.js` | 202       | ✅ Corrigé |
| Quête M08           | `quests-data.js`        | 212       | ✅ Corrigé |
| Nouvelle quête M10c | `quests-data.js`        | 302-327   | ✅ Ajoutée |

**Total** : 7 corrections sur 5 fichiers ✅
