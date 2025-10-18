# 🔬 ANALYSE TECHNIQUE - Bugs de Multiplication des Stats

## 📊 CONTEXTE

Votre idle RPG utilise un système de **qualité d'équipement** qui multiplie les stats de base :

- Normal : x1.0
- Superior : x1.2
- Exceptional : x1.5
- Perfect : x2.0
- Masterwork : x3.0

## 🐛 BUG #1 : MULTIPLICATION EXPONENTIELLE

### Comportement Observé

```javascript
// Création initiale d'une épée
Base Stats: Force 10, Damage 15
Quality: perfect (x2)
→ Stats finales: Force 20, Damage 30 ✅

// Premier save/load
Saved: Force 20, Damage 30
Loaded: Force 40, Damage 60 ❌

// Deuxième save/load
Saved: Force 40, Damage 60
Loaded: Force 80, Damage 120 ❌

// Après 10 cycles
Stats: Force 10,240, Damage 15,360 ❌❌❌
```

### Cause Racine

**Code Original** (`src/js/equipment.js` ligne 152) :

```javascript
static fromJSON(data) {
    return new Equipment(data); // ❌ ERREUR ICI
}
```

**Problème** : Le constructeur `Equipment()` recalcule toujours les stats :

```javascript
constructor(data) {
    // ...
    const baseStats = {
        force: data.stats?.force || 0,  // ❌ Prend les stats DÉJÀ multipliées
        damage: data.stats?.damage || 0
    };

    this.qualityMultiplier = this.getQualityMultiplier(); // x2

    this.stats = {};
    for (const [stat, value] of Object.entries(baseStats)) {
        this.stats[stat] = Math.floor(value * this.qualityMultiplier);
        // ❌ Remultiplie des stats déjà multipliées !
    }
}
```

### Flux du Bug

```
1. Création initiale
   ├─ baseStats.force = 10
   ├─ qualityMultiplier = 2
   └─ stats.force = 10 × 2 = 20 ✅

2. Sauvegarde
   └─ JSON: { stats: { force: 20 } } ✅

3. Chargement (BUG)
   ├─ fromJSON() appelle new Equipment(data)
   ├─ baseStats.force = 20 (depuis data.stats.force)
   ├─ qualityMultiplier = 2
   └─ stats.force = 20 × 2 = 40 ❌

4. Deuxième cycle
   ├─ baseStats.force = 40
   └─ stats.force = 40 × 2 = 80 ❌

5. Progression exponentielle
   20 → 40 → 80 → 160 → 320 → 640 → 1,280 → 2,560 → 5,120 → 10,240...
```

### Solution Appliquée

**Nouveau Code** (`src/js/equipment.js` ligne 152-173) :

```javascript
static fromJSON(data) {
    // Ne PAS passer par le constructeur
    const equipment = Object.create(Equipment.prototype);

    // Assigner directement les propriétés
    equipment.id = data.id;
    equipment.name = data.name;
    equipment.type = data.type;
    equipment.slot = data.slot;
    equipment.rarity = data.rarity;
    equipment.quality = data.quality || 'normal';
    equipment.qualityMultiplier = data.qualityMultiplier || 1.0;
    equipment.locked = data.locked || false;
    equipment.icon = data.icon || '⚔️';

    // ✅ CORRECTION : Copier les stats SANS recalcul
    equipment.stats = { ...data.stats };

    equipment.requiredLevel = data.requiredLevel || 1;
    equipment.description = data.description || '';

    return equipment;
}
```

**Avantages** :

- ✅ Les stats sont copiées directement
- ✅ Aucune multiplication supplémentaire
- ✅ Stabilité garantie

### Comparaison Avant/Après

| Cycle    | Avant (Bug)   | Après (Fix) |
| -------- | ------------- | ----------- |
| Création | 20            | 20          |
| Load #1  | 40 ❌         | 20 ✅       |
| Load #2  | 80 ❌         | 20 ✅       |
| Load #5  | 320 ❌        | 20 ✅       |
| Load #10 | 10,240 ❌     | 20 ✅       |
| Load #20 | 10,485,760 ❌ | 20 ✅       |

---

## 🐛 BUG #2 : MODAL DE CRÉATION RÉAPPARAÎT

### Comportement Observé

1. Vous créez un personnage : "Ato", Warrior
2. Vous exportez la sauvegarde
3. Vous importez la sauvegarde
4. **Le modal de création apparaît** ❌
5. Vous êtes forcé de recréer un personnage
6. Votre progression est perdue

### Cause Racine

**Code Original** (`src/js/character-creation.js` ligne 261) :

```javascript
shouldShow() {
    return !this.game.player.class || this.game.player.name === 'Aventurier';
    //                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                                 ❌ PROBLÈME ICI
}
```

**Problème** : La condition `name === 'Aventurier'` peut être vraie même pour un personnage valide

### Scénarios Problématiques

**Scénario A** : Nom par défaut non changé

```javascript
// Utilisateur crée un personnage mais garde le nom "Aventurier"
player = {
    name: 'Aventurier',  // ❌ Nom par défaut
    class: 'warrior'     // ✅ Classe définie
}

shouldShow()
    → return !false || true  // !class || name === 'Aventurier'
    → return false || true
    → return true ❌  // Modal s'affiche alors que personnage existe !
```

**Scénario B** : Après import de sauvegarde

```javascript
// Import d'une sauvegarde valide
player = {
    name: 'Ato',
    class: 'warrior',
    level: 13
}

// Mais si à un moment name === 'Aventurier' (race condition?)
shouldShow()
    → return !false || true
    → return true ❌  // Modal s'affiche
```

### Solution Appliquée

**Nouveau Code** (`src/js/character-creation.js` ligne 261-277) :

```javascript
shouldShow() {
    const hasClass = this.game.player.class !== null;

    // Si le joueur a une classe, ne JAMAIS afficher
    if (hasClass) {
        return false; // ✅ Priorité à la classe
    }

    // Sinon, afficher seulement si vraiment nouveau
    return !hasClass;
}
```

**Logique** :

- ✅ Priorité absolue à la classe
- ✅ Si `class !== null` → Ne JAMAIS afficher le modal
- ✅ Le nom n'est plus un critère

### Table de Vérité

| `class`     | `name`       | Avant              | Après              |
| ----------- | ------------ | ------------------ | ------------------ |
| `null`      | "Aventurier" | Affiche ✅         | Affiche ✅         |
| `null`      | "Custom"     | Ne pas afficher ❌ | Affiche ✅         |
| `"warrior"` | "Aventurier" | Affiche ❌         | Ne pas afficher ✅ |
| `"warrior"` | "Ato"        | Ne pas afficher ✅ | Ne pas afficher ✅ |

---

## 🔍 ANALYSE DES DONNÉES DE SAUVEGARDE

### Votre Sauvegarde Actuelle

**Fichier** : `nylnato-save-2025-10-12T21-16-36.json`

**Équipement Problématique** :

```json
{
  "id": "iron_sword_1760301654506",
  "name": "Épée de Fer",
  "quality": "perfect",
  "qualityMultiplier": 2,
  "stats": {
    "force": 20480, // ❌ Devrait être ~20
    "damage": 32768 // ❌ Devrait être ~30
    // ...
  }
}
```

**Calcul de la Corruption** :

```
Stats attendues (perfect x2) : Force 20, Damage 30

Stats observées : Force 20,480, Damage 32,768

Ratio de corruption :
  Force:  20,480 / 20 = 1,024
  Damage: 32,768 / 30 ≈ 1,092

Nombre de cycles de multiplication :
  1,024 = 2^10
  → 10 cycles de save/load (ou refresh)
```

**Conclusion** : Votre sauvegarde a subi ~10 cycles de multiplication

### Impact avec la Correction

Avec le fix appliqué :

```javascript
// Chargement de votre sauvegarde
const loadedSword = Equipment.fromJSON({
  stats: {
    force: 20480,
    damage: 32768,
  },
  quality: "perfect",
  qualityMultiplier: 2,
});

// Résultat : ✅ Stats restent à 20,480 et 32,768
// Pas de nouvelle multiplication !
```

**Options** :

1. **Garder les stats hautes** → Stable mais surpuissant
2. **Re-crafter** → Stats normales
3. **Éditer le JSON** → Corriger manuellement les stats

---

## 🧪 TESTS UNITAIRES

### Test 1 : Création Simple

```javascript
const equipment = new Equipment({
  id: "test",
  name: "Test",
  type: "weapon",
  slot: "weapon",
  rarity: "common",
  quality: "perfect",
  stats: { force: 10 },
  requiredLevel: 1,
});

console.assert(equipment.stats.force === 20, "Force devrait être 20");
console.assert(equipment.qualityMultiplier === 2.0, "Multiplicateur devrait être 2.0");
```

### Test 2 : Save/Load Simple

```javascript
const original = new Equipment({
  id: "test",
  name: "Test",
  stats: { force: 10 },
  quality: "perfect",
});

const saved = original.toJSON();
const loaded = Equipment.fromJSON(saved);

console.assert(
  loaded.stats.force === original.stats.force,
  `Force devrait rester ${original.stats.force}`
);
```

### Test 3 : Save/Load Multiple

```javascript
let equipment = new Equipment({
  id: "test",
  stats: { force: 10 },
  quality: "perfect",
});

const originalForce = equipment.stats.force; // 20

for (let i = 0; i < 10; i++) {
  const saved = equipment.toJSON();
  equipment = Equipment.fromJSON(saved);

  console.assert(
    equipment.stats.force === originalForce,
    `Cycle ${i + 1}: Force devrait rester ${originalForce}, obtenu ${equipment.stats.force}`
  );
}
```

### Test 4 : Votre Sauvegarde

```javascript
const yourSwordData = {
  id: "iron_sword_1760301654506",
  stats: {
    force: 20480,
    damage: 32768,
  },
  quality: "perfect",
  qualityMultiplier: 2,
};

const loaded = Equipment.fromJSON(yourSwordData);

console.assert(loaded.stats.force === 20480, "Force devrait rester 20480 (haute mais stable)");
console.assert(loaded.stats.damage === 32768, "Damage devrait rester 32768 (haute mais stable)");

// Deuxième cycle
const saved = loaded.toJSON();
const reloaded = Equipment.fromJSON(saved);

console.assert(reloaded.stats.force === 20480, "Force devrait toujours être 20480");
```

---

## 📊 MÉTRIQUES DE PERFORMANCE

### Avant la Correction

- ❌ Multiplication exponentielle : `O(2^n)`
- ❌ Instabilité totale
- ❌ Sauvegarde non fiable

### Après la Correction

- ✅ Complexité constante : `O(1)`
- ✅ Stabilité parfaite
- ✅ Sauvegarde fiable

---

## 🎯 CONCLUSION TECHNIQUE

### Points Clés

1. **Éviter les recalculs lors de la désérialisation**
   - Utiliser `Object.create()` au lieu de `new`
   - Copier les propriétés directement

2. **Séparer la logique de création et de restauration**
   - Constructeur = calcul des stats
   - fromJSON = restauration sans calcul

3. **Priorité aux données critiques**
   - La classe du joueur est plus importante que le nom
   - Ne jamais afficher de modal si personnage valide

### Leçons Apprises

- ⚠️ **Ne jamais recalculer des valeurs déjà calculées**
- ⚠️ **Distinguer création et restauration**
- ⚠️ **Tester les cycles de save/load**
- ⚠️ **Valider les données importées**

---

**Auteur** : GitHub Copilot  
**Date** : 13 octobre 2025  
**Catégorie** : Debug, Architecture, Sérialisation  
**Complexité** : Moyenne  
**Impact** : Critique 🔥
