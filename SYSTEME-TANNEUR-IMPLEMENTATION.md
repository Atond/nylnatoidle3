# 🧵 SYSTÈME TANNEUR - Implémentation Complète

> **Date** : 26 Octobre 2025  
> **Statut** : ⚙️ **EN COURS** (Phase 1 terminée)

---

## 📊 PROBLÈME INITIAL

### Incohérences du Système Actuel

1. **Cuir qui "pousse" à la Ferme** 🌾🎒
   - `fabric_simple_leather` et `fabric_tanned_leather` sont produits par la Ferme
   - Illogique : le cuir vient des animaux, pas des plantes !

2. **Recettes d'armures illogiques**
   - Certaines armures demandent `wood` (bois) au lieu de `monster_hide` (peau)
   - Pas de progression cohérente entre matières brutes et traitées

3. **Pas de métier de traitement du cuir**
   - Forgeron pour les armes ✅
   - Armurier pour les armures ✅
   - Bijoutier pour les accessoires ✅
   - **Tanneur pour le cuir** ❌ MANQUANT

---

## ✅ SOLUTION IMPLÉMENTÉE

### Nouvelle Boucle de Gameplay

#### **Early Game (Niv 1-10) - Simple et Direct**

```
COMBAT → drop monster_hide → ARMURIER → craft Armure Light T1
```

- Pas de complexité
- Récompenses immédiates
- Peaux brutes directement utilisables

#### **Mid Game (Niv 10+) - Profondeur et Stratégie**

```
COMBAT → drop monster_hide → TANNEUR → craft fabric_simple_leather → ARMURIER → craft Armure T2
```

- Nouveau métier débloqué (Tanneur)
- Étape de traitement ajoutée
- Plus de profondeur, plus satisfaisant

---

## 🛠️ MODIFICATIONS APPORTÉES

### **ÉTAPE 1 : Unification des Ressources** ✅ TERMINÉ

#### Fichier : `src/config/drops-data.js`

**AVANT :**

```javascript
peau_animale: {
    id: 'peau_animale',
    name: "Peau Animale",
    icon: "🦴",
    dropChance: 0.40
}
```

**APRÈS :**

```javascript
monster_hide: {
    id: 'monster_hide',
    name: "Peau de Monstre",
    description: "Peau brute récupérée sur une bête sauvage. Peut être utilisée telle quelle ou traitée par un Tanneur.",
    icon: "🦌",
    dropChance: 0.40
}
```

**Impact :**

- ✅ Ressource unique standardisée (`monster_hide`)
- ✅ Suppression de `peau_animale` (doublons éliminés)
- ✅ Tous les monstres R1 droppent `monster_hide`

---

#### Fichier : `src/config/monsters-data.js`

**Monstres corrigés (3) :**

1. `loup_gris` : `peau_animale` → `monster_hide`
2. `sanglier_sauvage` : `peau_animale` → `monster_hide`
3. `bandit_routes` : `peau_animale` → `monster_hide`

---

#### Fichier : `src/config/craft-recipes-extended.js`

**Recettes corrigées (2) :**

1. `bronze_sword` : `loot_peau_animale` → `monster_hide`
2. `wooden_shield` : `loot_peau_animale` → `monster_hide`

---

#### Fichier : `src/config/resources-data.js`

**Supprimé :**

```javascript
{ id: 'loot_peau_animale', name: 'Peau Animale', rarity: 'common', icon: '🦌' }
```

**Ajouté (nouvelle section) :**

```javascript
// ========== CUIRS TRAITÉS (Produits par le TANNEUR) ==========
processed_leather: [
  { id: "fabric_simple_leather", name: "Cuir Simple", rarity: "rare", icon: "🎒", tier: 1 },
  { id: "fabric_tanned_leather", name: "Cuir Tanné", rarity: "epic", icon: "🧳", tier: 2 },
];
```

---

### **ÉTAPE 2 : Retrait du Cuir de la Ferme** ✅ TERMINÉ

#### Fichier : `src/config/resources-data.js`

**Ressources RETIRÉES de la production Ferme :**

```javascript
// AVANT (Ferme T3)
{ id: 'fabric_simple_leather', unlockLevel: 18, productionRate: 0.1 }

// APRÈS
// fabric_simple_leather RETIRÉ - Produit par le TANNEUR uniquement
```

```javascript
// AVANT (Ferme T4)
{ id: 'fabric_tanned_leather', unlockLevel: 30, productionRate: 0.2 }

// APRÈS
// fabric_tanned_leather RETIRÉ - Produit par le TANNEUR uniquement
```

**Impact :**

- ✅ Le cuir ne "pousse" plus magiquement
- ✅ Logique de jeu cohérente (cuir = combat + craft)
- ✅ Ressources transférées à la section `processed_leather`

---

### **ÉTAPE 3 : Création du Métier Tanneur** ✅ TERMINÉ

#### Fichier : `src/js/profession-manager.js`

**Nouveau métier ajouté :**

```javascript
// Tanneur (traitement de peaux brutes en cuir)
this.professions.set(
  "tanner",
  new Profession(
    "tanner",
    "Tanneur",
    null, // Pas de ressource directe (traitement uniquement)
    0 // XP gagné par craft de cuir
  )
);
```

**Caractéristiques :**

- 🔹 Métier de **traitement** (pas de récolte)
- 🔹 Gagne XP uniquement en **craftant du cuir**
- 🔹 Pas de bouton "Récolter" dans l'interface
- 🔹 Similaire à Forgeron/Armurier (craft only)

---

### **ÉTAPE 4 : Création des Recettes Tanneur** ✅ TERMINÉ

#### Fichier : `src/config/craft-recipes-tanner.js` (NOUVEAU)

**2 recettes créées :**

##### **Recette T1 : Cuir Simple**

```javascript
{
    id: 'tanner_simple_leather',
    name: 'Traiter les Peaux Brutes',
    profession: 'tanner',
    professionLevel: 1,
    requiredLevel: 10, // Joueur niveau 10 minimum
    materials: [
        { resourceId: 'monster_hide', amount: 2 }  // 2 peaux brutes
    ],
    produces: { resourceId: 'fabric_simple_leather', amount: 1 },
    craftTime: 15,
    expReward: 25
}
```

**Fonctionnement :**

- 2 peaux brutes → 1 cuir simple
- Tanneur niveau 1 minimum
- Joueur niveau 10 minimum (débloqué par quête)
- 15 secondes de craft
- +25 XP Tanneur

---

##### **Recette T2 : Cuir Tanné**

```javascript
{
    id: 'tanner_tanned_leather',
    name: 'Tanner le Cuir Robuste',
    profession: 'tanner',
    professionLevel: 15,
    requiredLevel: 15,
    materials: [
        { resourceId: 'robust_hide', amount: 2 },     // Drop T2 (à créer)
        { resourceId: 'fabric_simple_leather', amount: 1 }
    ],
    produces: { resourceId: 'fabric_tanned_leather', amount: 1 },
    craftTime: 30,
    expReward: 50
}
```

**Fonctionnement :**

- 2 peaux robustes + 1 cuir simple → 1 cuir tanné
- Tanneur niveau 15 minimum
- Joueur niveau 15 minimum
- 30 secondes de craft
- +50 XP Tanneur

---

#### Fichier : `index.html`

**Inclusion du fichier de recettes :**

```html
<script src="src/config/craft-recipes-tanner.js"></script>
<!-- Tanneur (traitement cuir) -->
```

---

#### Fichier : `src/js/crafting-manager.js`

**Fusion des recettes Tanneur dans getAllRecipes() :**

```javascript
getAllRecipes() {
    const baseRecipes = window.CraftRecipesData || [];
    const weaponRecipes = window.CraftRecipesExtended || [];
    const armorRecipes = window.CraftRecipesArmors || [];
    const accessoryRecipes = window.CraftRecipesAccessories || [];
    const consumableRecipes = window.CraftRecipesConsumables || [];
    const tannerRecipes = window.CraftRecipesTanner || []; // NOUVEAU

    const allRecipes = [
        ...baseRecipes,
        ...weaponRecipes,
        ...armorRecipes,
        ...accessoryRecipes,
        ...consumableRecipes,
        ...tannerRecipes  // NOUVEAU
    ];

    return allRecipes;
}
```

---

## 📋 TODO - ÉTAPES RESTANTES

### **ÉTAPE 5 : Créer le Drop robust_hide (T2)** ⏳ EN ATTENTE

- [ ] Ajouter `robust_hide` à `drops-data.js`
- [ ] Faire dropper `robust_hide` aux monstres Région 2+
- [ ] Icon, rareté, drop rate

### **ÉTAPE 6 : Recette T2 Tanneur** ✅ DÉJÀ CRÉÉE

- [x] Recette `tanner_tanned_leather` existe
- [ ] Attends que `robust_hide` soit créé pour être fonctionnelle

### **ÉTAPE 7 : Modifier Armures Light T1** ⏳ EN ATTENTE

**Fichier : `src/config/craft-recipes-armors.js`**

Armures à corriger (5) :

- `leather_hood` : Remplacer matériaux par `monster_hide` (peau brute)
- `leather_chest` : Remplacer matériaux par `monster_hide`
- `leather_pants` : Remplacer matériaux par `monster_hide`
- `leather_boots` : Remplacer matériaux par `monster_hide`
- `leather_gloves` : Remplacer matériaux par `monster_hide`

**Exemple AVANT :**

```javascript
materials: [
  { resourceId: "fabric_simple_leather", amount: 4 }, // ❌ Cuir traité
  { resourceId: "fabric_linen", amount: 2 },
];
```

**Exemple APRÈS :**

```javascript
materials: [
  { resourceId: "monster_hide", amount: 4 }, // ✅ Peau brute
  { resourceId: "fabric_linen", amount: 2 },
];
```

### **ÉTAPE 8 : Modifier Armures Light T2+** ⏳ EN ATTENTE

**Fichier : `src/config/craft-recipes-armors.js`**

Armures à corriger (10+) :

- Armures T2 (Reinforced) : Utiliser `fabric_simple_leather` (cuir traité T1)
- Armures T3+ : Utiliser `fabric_tanned_leather` (cuir traité T2)

**Exemple T2 APRÈS :**

```javascript
materials: [
  { resourceId: "fabric_simple_leather", amount: 6 }, // ✅ Cuir traité par Tanneur
  { resourceId: "ore_copper", amount: 4 },
];
```

### **ÉTAPE 9 : Ajouter Onglet Tanneur dans UI** ⏳ EN ATTENTE

**Fichier : `src/js/ui.js`**

- [ ] Ajouter carte profession "Tanneur" dans `updateCraftingProfessions()`
- [ ] Afficher recettes Tanneur quand profession sélectionnée
- [ ] Icon : 🧵 ou 🎒
- [ ] Description : "Traite les peaux brutes en cuir de qualité"

### **ÉTAPE 10 : Quête "Apprenti Tanneur"** ⏳ EN ATTENTE

**Fichier : `src/config/quests-data.js`**

Nouvelle quête :

```javascript
{
    id: 'M10',
    type: 'level_up',
    target: 10,
    title: 'Apprenti Tanneur',
    description: 'Atteindre le niveau 10 pour débloquer le métier de Tanneur',
    rewards: {
        xp: 500,
        gold: 100,
        unlocks: ['tanner_profession']
    }
}
```

---

## 📊 RÉSUMÉ DES CHANGEMENTS

| Fichier                     | Modifications                                             | Statut     |
| --------------------------- | --------------------------------------------------------- | ---------- |
| `drops-data.js`             | Renommé `peau_animale` → `monster_hide`                   | ✅ Terminé |
| `monsters-data.js`          | 3 monstres droppent `monster_hide`                        | ✅ Terminé |
| `craft-recipes-extended.js` | 2 recettes utilisent `monster_hide`                       | ✅ Terminé |
| `resources-data.js`         | Cuir retiré de Ferme, section `processed_leather` ajoutée | ✅ Terminé |
| `profession-manager.js`     | Métier `tanner` créé                                      | ✅ Terminé |
| `craft-recipes-tanner.js`   | 2 recettes Tanneur (T1 + T2)                              | ✅ Terminé |
| `crafting-manager.js`       | Recettes Tanneur fusionnées                               | ✅ Terminé |
| `index.html`                | Fichier `craft-recipes-tanner.js` inclus                  | ✅ Terminé |
| `drops-data.js`             | Créer drop `robust_hide` (T2)                             | ⏳ TODO    |
| `craft-recipes-armors.js`   | Armures T1 utilisent `monster_hide` brut                  | ⏳ TODO    |
| `craft-recipes-armors.js`   | Armures T2+ utilisent cuir traité                         | ⏳ TODO    |
| `ui.js`                     | Onglet Tanneur dans interface                             | ⏳ TODO    |
| `quests-data.js`            | Quête "Apprenti Tanneur" niveau 10                        | ⏳ TODO    |

---

## 🎯 IMPACT SUR LE GAME DESIGN

### Avantages ✅

1. **Logique cohérente**
   - Le cuir vient du combat, pas de la ferme
   - Progression matières brutes → matières traitées

2. **Profondeur accrue**
   - Nouveau métier à monter (Tanneur)
   - Nouvelle boucle de craft satisfaisante

3. **Équilibrage amélioré**
   - Early game simple (peaux brutes directes)
   - Mid/Late game plus complexe (traitement requis)

4. **Économie plus riche**
   - Valeur ajoutée au combat (drops de peaux)
   - Interaction entre métiers (Combat → Tanneur → Armurier)

### Inconvénients ⚠️

1. **Complexité ajoutée**
   - Les joueurs doivent comprendre le système de traitement
   - Tutoriel/quête nécessaire pour expliquer

2. **Rupture de stocks potentielle**
   - Si joueur ne farm pas assez de peaux
   - Solution : drop rate `monster_hide` à 40% (élevé)

---

## 🧪 TESTS À EFFECTUER

### Phase 1 (ACTUELLE)

- [x] Vérifier que `monster_hide` drop correctement (Loups, Sangliers, Bandits)
- [x] Vérifier que `fabric_simple_leather` n'est PLUS produit par la Ferme
- [x] Vérifier que métier Tanneur existe dans `profession-manager.js`
- [x] Vérifier que recettes Tanneur sont chargées (`getAllRecipes()`)

### Phase 2 (APRÈS TODO 5-10)

- [ ] Crafter `fabric_simple_leather` avec le Tanneur
- [ ] Vérifier XP Tanneur (+25 XP par craft)
- [ ] Crafter armure Light T1 avec `monster_hide` brut
- [ ] Débloquer quête "Apprenti Tanneur" au niveau 10
- [ ] Interface UI Tanneur fonctionnelle

---

## 📝 CONCLUSION

**Phase 1 (80% terminée) :**

- ✅ Système de base implémenté
- ✅ Métier Tanneur créé
- ✅ Recettes T1/T2 définies
- ✅ Ressources unifiées

**Phase 2 (20% restante) :**

- ⏳ Drops T2 (`robust_hide`)
- ⏳ Correction armures (T1 peaux brutes, T2+ cuir traité)
- ⏳ Interface UI
- ⏳ Quête de déblocage

**Estimation fin Phase 2 :** ~1-2 heures de travail supplémentaire.

---

**Date de création :** 26 Octobre 2025  
**Dernière mise à jour :** 26 Octobre 2025 - 19h45  
**Statut global :** ⚙️ **EN COURS** (80% terminé)
