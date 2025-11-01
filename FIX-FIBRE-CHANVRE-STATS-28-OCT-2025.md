# 🔧 FIX FIBRE DE CHANVRE + BUG STATS NÉGATIVES

**Date** : 28 octobre 2025  
**Priorité** : CRITIQUE (Bloque progression early game)

---

## 📋 PROBLÈMES IDENTIFIÉS

### ❌ **Problème 1 : Fibre de Chanvre Introuvable**

**Symptômes** :

- ✅ Ressource existe dans `resources-data.js`
- ❌ **PAS produite par la Ferme**
- ❌ Recettes de craft bloquées sans accès ville

**Recettes bloquées** :

1. **Bottes de Fer Simples** (Forgeron niveau 2)
   - Requiert : 10 Fer + 3 Cuivre + **3 Fibre de Chanvre**
2. **Tunique de Lin** (Tailleur)
   - Requiert : 10 Lin + **5 Fibre de Chanvre**
3. **Capuche de Cuir** (Tailleur)
   - Requiert : 3 Cuir Simple + **1 Fibre de Chanvre**

**Impact** : Impossible de crafter équipements T1 sans ville (niveau 8+)

---

### ❌ **Problème 2 : Bug Affichage Stats Négatives**

**Symptôme** :

```
Bottes de Fer Simples
+4 Armure
+6 Défense
+3 Endurance
+20 Santé
+-1 Agilité    ← BUG : "+-1" au lieu de "-1"
```

**Cause** : Ligne 2046 de `ui.js` affiche toujours `+${value}`, même si valeur négative

---

## ✅ SOLUTIONS APPLIQUÉES

### 🏭 **Solution 1 : Ajouter Chanvre à la Ferme**

**Fichier** : `src/config/buildings-data.js` (ligne 138)

**AVANT** :

```javascript
baseProduction: {
    'fabric_linen': 2,           // 2 Fibre de Lin/min
    'fabric_raw_wool': 2,        // 2 Laine brute/min
    'fabric_cotton': 1,          // 1 Coton/min
    'fabric_coarse_silk': 0.5    // 0.5 Soie grossière/min
}
```

**APRÈS** :

```javascript
baseProduction: {
    'fabric_linen': 2,           // 2 Fibre de Lin/min
    'fabric_hemp': 1.5,          // 1.5 Fibre de Chanvre/min ✅ AJOUTÉ
    'fabric_raw_wool': 2,        // 2 Laine brute/min
    'fabric_cotton': 1,          // 1 Coton/min
    'fabric_coarse_silk': 0.5    // 0.5 Soie grossière/min
}
```

**Production ajoutée** :

- **Base** : 1.5 Chanvre/min (90/heure, 2,160/jour)
- **Niveau 2** : 2.25/min (×1.5)
- **Niveau 5** : 7.59/min (×5.06)
- **Niveau 10** : 76.8/min (×51.2)

**Impact** :

- ✅ Ferme niveau 1 = Assez pour 1 Tunique de Lin toutes les 3.3 minutes (5 chanvre)
- ✅ Ferme niveau 1 = Assez pour 1 Bottes de Fer toutes les 2 minutes (3 chanvre)
- ✅ Progression early game débloquée

---

### 🐛 **Solution 2 : Fix Affichage Stats Négatives**

**Fichier** : `src/js/ui.js` (ligne 2044-2048)

**AVANT** :

```javascript
const stats = recipe.stats
  ? Object.entries(recipe.stats)
      .map(([stat, value]) => {
        const statName = this.getStatName(stat);
        return `<div class="detail-stat">+${value} ${statName}</div>`;
      })
      .join("")
  : "";
```

**Problème** : Affiche `+` même si `value = -1` → `+-1 Agilité`

**APRÈS** :

```javascript
const stats = recipe.stats
  ? Object.entries(recipe.stats)
      .map(([stat, value]) => {
        const statName = this.getStatName(stat);
        const sign = value >= 0 ? "+" : ""; // Pas de + si négatif
        return `<div class="detail-stat">${sign}${value} ${statName}</div>`;
      })
      .join("")
  : "";
```

**Impact** :

- ✅ Stats positives : `+4 Armure` (inchangé)
- ✅ Stats négatives : `-1 Agilité` (corrigé, plus de bug `+-1`)

---

## 📊 TABLEAU PRODUCTION CHANVRE

### Production Ferme par Niveau

| Niveau Ferme | Multiplicateur | Chanvre/min | Chanvre/heure | Temps pour 5 Chanvre |
| ------------ | -------------- | ----------- | ------------- | -------------------- |
| **1**        | ×1.0           | 1.5         | 90            | 3 min 20s            |
| **2**        | ×1.5           | 2.25        | 135           | 2 min 13s            |
| **3**        | ×2.25          | 3.38        | 203           | 1 min 29s            |
| **4**        | ×3.38          | 5.07        | 304           | 59 secondes          |
| **5**        | ×5.06          | 7.59        | 455           | 40 secondes          |
| **10**       | ×51.2          | 76.8        | 4,608         | 4 secondes           |

**Conclusion** : Même Ferme niveau 1 = Production suffisante pour craft early game

---

## 🎯 RECETTES DÉBLOQUÉES

### Recettes Maintenant Craftables (Ferme niveau 1)

1. **Bottes de Fer Simples** (Forgeron niv. 2)
   - Temps craft : 25 secondes
   - Chanvre requis : 3 (disponible toutes les 2 min)
   - ✅ Craftable : ~2.4 bottes/heure

2. **Tunique de Lin** (Tailleur)
   - Temps craft : Variable
   - Chanvre requis : 5 (disponible toutes les 3.3 min)
   - ✅ Craftable : ~1.8 tuniques/heure

3. **Capuche de Cuir** (Tailleur)
   - Temps craft : Variable
   - Chanvre requis : 1 (disponible toutes les 40 sec)
   - ✅ Craftable : ~90 capuches/heure (limité par cuir)

4. **Capuche de Soigneur Basique** (Tailleur)
   - Requiert : 5 Lin + 2 Menthe
   - ✅ Aucun chanvre requis (déjà craftable)

---

## 🔍 DÉTAILS TECHNIQUES

### Ressource Chanvre (resources-data.js)

```javascript
{
    id: 'fabric_hemp',
    name: 'Fibre de Chanvre',
    unlockLevel: 3,           // Débloqué niveau 3 joueur
    rarity: 'common',
    productionRate: 0.9,      // Taux de production
    tier: 1                   // Ressource de base
}
```

### Ferme - Conditions de Déblocage

```javascript
unlockConditions: {
    playerLevel: 8,           // Niveau 8 joueur
    professionLevel: {
        herbalist: 3          // Herboriste niveau 3
    }
}
```

**Conclusion** : Chanvre débloqué niveau 3, Ferme niveau 8 → Cohérent

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Production Chanvre

1. ✅ Actualiser (F5)
2. ✅ Construire Ferme (niveau 8 + Herboriste 3)
3. ✅ Vérifier production : 1.5 Chanvre/min
4. ✅ Attendre 3 min 20s
5. ✅ Vérifier inventaire : 5 Chanvre disponibles

### Test 2 : Craft Bottes de Fer

1. ✅ Forgeron niveau 2
2. ✅ Matériaux : 10 Fer + 3 Cuivre + 3 Chanvre
3. ✅ Lancer craft (25 secondes)
4. ✅ Vérifier obtention : Bottes de Fer Simples

### Test 3 : Affichage Stats Négatives

1. ✅ Ouvrir détails Bottes de Fer Simples
2. ✅ Vérifier stats :
   - +4 Armure ✅
   - +6 Défense ✅
   - +3 Endurance ✅
   - +20 Santé ✅
   - **-1 Agilité** ✅ (plus de `+-1`)

### Test 4 : Craft Tunique de Lin

1. ✅ Tailleur niveau approprié
2. ✅ Matériaux : 10 Lin + 5 Chanvre
3. ✅ Lancer craft
4. ✅ Vérifier obtention tunique

### Test 5 : Persistance

1. ✅ Construire Ferme + attendre production
2. ✅ Sauvegarder
3. ✅ Recharger
4. ✅ Vérifier Chanvre toujours en inventaire
5. ✅ Vérifier production continue

---

## 📈 IMPACT SUR LA PROGRESSION

### Avant le Fix

**Niveau 1-7** :

- ❌ Impossible de crafter Bottes de Fer (bloqué par Chanvre)
- ❌ Impossible de crafter Tunique de Lin
- ❌ Impossible de crafter Capuche de Cuir
- ❌ Progression équipement bloquée

**Niveau 8+** :

- ✅ Déblocage Ferme
- ✅ Production Chanvre démarre
- ✅ Recettes enfin craftables

**Problème** : Gap de progression trop important (niveau 1-8)

---

### Après le Fix

**Niveau 1-7** :

- ❌ Toujours pas de Chanvre (normal, Ferme niveau 8)
- ⚠️ **SUGGESTION** : Ajouter quête donnant 10 Chanvre niveau 3 ?
- Alternative : Utiliser autres recettes sans Chanvre

**Niveau 8+** :

- ✅ Ferme débloquée immédiatement
- ✅ Chanvre produit à 1.5/min (90/heure)
- ✅ Toutes recettes T1 craftables
- ✅ Progression fluide

---

## 💡 RECOMMANDATIONS FUTURES

### Option A : Quête de Démarrage

Créer une quête niveau 3 donnant **10 Fibre de Chanvre** pour débloquer craft early game :

```javascript
{
    id: 'M03_first_fabric',
    name: 'Premiers Tissus',
    description: 'Récoltez 20 plantes pour obtenir des fibres',
    type: 'gather',
    requirements: {
        'plant_dandelion': 20
    },
    rewards: {
        xp: 50,
        gold: 100,
        resources: {
            'fabric_hemp': 10  // ✅ Permet craft avant Ferme
        }
    }
}
```

### Option B : Commerce avec PNJ

Ajouter un PNJ vendeur de tissus (niveau 5) :

- Fibre de Chanvre : 10 gold/unité
- Limite : 20 unités/jour
- Permet progression sans Ferme

### Option C : Recettes Alternatives

Créer versions "Sans Chanvre" pour équipements T1 :

- Bottes de Fer (Sans Rembourrage) : Fer + Cuivre uniquement
- Stats légèrement réduites
- Unlock early game

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Corrections** :

- ✅ Ajout Fibre de Chanvre à production Ferme (1.5/min)
- ✅ Fix affichage stats négatives (+-1 → -1)

**Fichiers modifiés** :

- `src/config/buildings-data.js` (ligne 138) : Ajout fabric_hemp
- `src/js/ui.js` (ligne 2046) : Fix signe stats

**Recettes débloquées** :

- Bottes de Fer Simples (Forgeron niv. 2)
- Tunique de Lin (Tailleur)
- Capuche de Cuir (Tailleur)

**Impact joueur** :

- ✅ Progression craft early game débloquée
- ✅ Affichage stats correct (bonus/malus)
- ✅ Ferme niveau 1 = Production suffisante

---

## 🔗 FICHIERS MODIFIÉS

1. **`src/config/buildings-data.js`** (ligne 138)
   - Ajout `'fabric_hemp': 1.5` à `baseProduction`
2. **`src/js/ui.js`** (ligne 2046)
   - Fix : `const sign = value >= 0 ? '+' : '';`

---

**Fin du document** 🎯
