# 📊 RAPPORT D'ANALYSE COMPLÈTE - SYSTÈME DE CRAFTING & ÉQUILIBRAGE

**Date**: 27 Octobre 2025  
**Auteur**: Analyse Automatique GitHub Copilot  
**Scope**: Recettes, Métiers, Ressources, Drops Monstres

---

## 🎯 OBJECTIFS DE L'ANALYSE

1. ✅ **Cohérence des recettes** - Vérifier que les matériaux utilisés sont logiques
2. ✅ **Utilité des niveaux de métiers** - S'assurer que la progression a du sens
3. ✅ **Équilibrage des drops monstres** - Pourcentages et quantités adaptés
4. ✅ **Gestion des ressources endgame** - Système de transmutation pour gérer les millions/milliards
5. ✅ **Intégration ville/production** - Anticiper la production de ressources par la ville

---

## 🔍 ÉTAT ACTUEL DU SYSTÈME

### 📦 INVENTAIRE DES FICHIERS

#### Fichiers de Configuration Crafting

- `craft-recipes-data.js` - **33 recettes** (Base)
- `craft-recipes-armors.js` - **50 recettes** (Armures spécialisées par archétype)
- `craft-recipes-accessories.js` - **25 recettes** (Accessoires)
- `craft-recipes-consumables.js` - **35 recettes** (Potions/Nourriture)
- `craft-recipes-tanner.js` - **2 recettes** (Traitement cuir)
- `craft-recipes-extended.js` - (À analyser)

**TOTAL ESTIMÉ**: ~145+ recettes

#### Fichiers de Ressources

- `resources-data.js` - Toutes les ressources (Bois, Minerais, Plantes, Poissons, Tissus, Gemmes, Butin)
- `drops-data.js` - Configuration des drops monstres
- `monsters-data.js` - 45+ monstres avec dropTables

#### Systèmes de Métiers

- `profession-manager.js` - Gestion des 10 métiers
- `alchemy-data.js` - **PROBLÈME DÉTECTÉ**: Confusion entre Transmutation et Alchimie

---

## ⚠️ PROBLÈMES CRITIQUES IDENTIFIÉS

### 🚨 PROBLÈME #1: CONFUSION TRANSMUTATION / ALCHIMIE

**Fichier**: `alchemy-data.js`  
**Impact**: MAJEUR

#### Situation Actuelle

- Le fichier `alchemy-data.js` contient le **système de transmutation** (conversion ressources T1→T2→T3)
- Le métier **Alchemist** est utilisé pour crafter des **potions** (consumables)
- **Confusion terminologique**: Transmutation ≠ Alchimie

#### Solution Recommandée

```javascript
// AVANT (alchemy-data.js)
export const ALCHEMY_CONVERSIONS = { ... }

// APRÈS (transmutation-data.js)
export const TRANSMUTATION_CONVERSIONS = { ... }
```

#### Actions à Effectuer

1. ✅ Renommer `alchemy-data.js` → `transmutation-data.js`
2. ✅ Renommer `ALCHEMY_CONVERSIONS` → `TRANSMUTATION_CONVERSIONS`
3. ✅ Mettre à jour l'import dans `alchemy-manager.js`
4. ✅ Renommer `alchemy-manager.js` → `transmutation-manager.js`
5. ✅ Mettre à jour tous les imports dans les autres fichiers
6. ✅ Vérifier CSS: `alchemy.css` → `transmutation.css`

---

### 🚨 PROBLÈME #2: INCOHÉRENCES DE RECETTES

#### A. Tuniques en Cuir avec du Bois 🌲👔

**Fichier**: `craft-recipes-data.js`

```javascript
// ❌ INCOHÉRENT
{
    id: 'leather_chest',
    name: 'Tunique de Cuir',
    materials: [
        { resourceId: 'wood_oak', amount: 8 } // Du bois pour du cuir !?
    ]
}

{
    id: 'leather_helmet',
    materials: [
        { resourceId: 'wood_oak', amount: 5 } // Idem
    ]
}

{
    id: 'leather_pants',
    materials: [
        { resourceId: 'wood_oak', amount: 10 } // Idem
    ]
}
```

**Solution**: Utiliser les ressources de cuir produites par le **Tanneur**

```javascript
// ✅ COHÉRENT
{
    id: 'leather_chest',
    name: 'Tunique de Cuir',
    profession: 'tanner', // Changé de armorsmith → tanner
    professionLevel: 2,
    materials: [
        { resourceId: 'fabric_simple_leather', amount: 4 }, // Cuir traité
        { resourceId: 'fabric_linen', amount: 2 }  // Renfort textile
    ]
}
```

#### B. Gants de Travail en Bois 🌲🧤

```javascript
// ❌ INCOHÉRENT
{
    id: 'work_gloves',
    materials: [
        { resourceId: 'wood_oak', amount: 6 } // Des gants en bois ?
    ]
}

// ✅ COHÉRENT
{
    id: 'work_gloves',
    materials: [
        { resourceId: 'fabric_simple_leather', amount: 3 },
        { resourceId: 'fabric_linen', amount: 2 }
    ]
}
```

#### C. Bottes de Cuir en Bois 🌲👞

```javascript
// ❌ INCOHÉRENT
{
    id: 'leather_boots',
    materials: [
        { resourceId: 'wood_oak', amount: 8 }
    ]
}

// ✅ COHÉRENT
{
    id: 'leather_boots',
    materials: [
        { resourceId: 'fabric_simple_leather', amount: 3 },
        { resourceId: 'fabric_hemp', amount: 2 }
    ]
}
```

---

### 🚨 PROBLÈME #3: NIVEAUX DE MÉTIERS SOUS-UTILISÉS

#### Constat

- Beaucoup de recettes concentrées sur **niveaux 1-10**
- Peu de progression **mid-game** (niveaux 10-30)
- Pas assez de recettes **endgame** (niveaux 30-50)

#### Distribution Actuelle (craft-recipes-data.js)

| Niveau Métier | Nombre de Recettes |
| ------------- | ------------------ |
| 1-5           | 18                 |
| 6-10          | 8                  |
| 11-15         | 4                  |
| 16-20         | 2                  |
| 21+           | 1                  |

**Problème**: Courbe de progression trop rapide au début, puis ralentissement brutal

#### Solution: Étaler la Progression

```javascript
// Exemple: Épée de Fer
// AVANT
professionLevel: 1, requiredLevel: 1

// APRÈS (étaler la progression)
professionLevel: 3, requiredLevel: 3 // Débloque vers niveau 3

// Exemple: Plastron d'Acier
// AVANT
professionLevel: 7, requiredLevel: 8

// APRÈS
professionLevel: 12, requiredLevel: 12 // Plus de challenge
```

---

### 🚨 PROBLÈME #4: DROPS MONSTRES DÉSÉQUILIBRÉS

#### A. Pourcentages de Drop Incohérents

**Fichier**: `drops-data.js`

```javascript
// Monstre Commun - OK
monster_hide: {
    dropChance: 0.40, // 40% - Raisonnable
    quantity: { min: 1, max: 3 }
}

// Monstre Rare - OK
robust_hide: {
    dropChance: 0.35, // 35% - Bon équilirage
    quantity: { min: 1, max: 2 }
}

// Plumes - TROP GÉNÉREUX
plumes_sombres: {
    dropChance: 0.50, // 50% - Trop haut
    quantity: { min: 2, max: 5 } // Quantité excessive
}
```

#### B. Ressources Manquantes dans dropTable

**Analyse des Monstres**:

```javascript
// Région 1 - Loup Gris
dropTable: ["monster_hide", "griffes_usees"]; // ✅ OK

// Région 1 - Corbeau Noir
dropTable: ["plumes_sombres"]; // ⚠️ Trop simpliste

// Région 2+ - Monstres variés
dropTable: ["robust_hide", "fourrure_epaisse", "croc_acere"]; // ✅ Bon
```

**Recommandation**: Ajouter plus de variété aux drops early-game

---

### 🚨 PROBLÈME #5: RESSOURCES INUTILISÉES

#### Ressources Définies mais Jamais Utilisées

**Analyse**: Recherche de ressources dans `drops-data.js` jamais référencées dans les recettes

Exemples:

```javascript
// drops-data.js
griffes_usees: { ... } // Utilisé dans quelques recettes ?
crocs_venimeux: { ... } // Jamais utilisé
essence_vegetale_instable: { ... } // Jamais utilisé
```

**Solution**:

1. Créer des recettes utilisant ces ressources
2. OU supprimer les ressources inutiles
3. OU les intégrer au système de transmutation

---

## 📈 STATISTIQUES DÉTAILLÉES

### 🔨 MÉTIERS DE FABRICATION

| Métier     | Recettes | Niv Min | Niv Max | Progression |
| ---------- | -------- | ------- | ------- | ----------- |
| Blacksmith | 15+      | 1       | 40      | Bon         |
| Armorsmith | 60+      | 1       | 50      | Excellent   |
| Jeweler    | 25+      | 1       | 40      | Bon         |
| Alchemist  | 35+      | 1       | 45      | Bon         |
| Fishmonger | 15+      | 1       | 30      | Moyen       |
| Tailor     | 20+      | 1       | 35      | Bon         |
| Tanner     | 2        | 1       | 15      | ⚠️ Faible   |

**ALERTE TANNER**: Seulement 2 recettes ! Métier sous-exploité.

---

### 🌲 RESSOURCES DE RÉCOLTE

#### Bois (Woodcutter)

- **Tier 1** (1-10): 3 types
- **Tier 2** (11-20): 4 types
- **Tier 3** (21-30): 4 types
- **Tier 4** (31-40): 3 types
- **Tier 5** (41-50): 3 types
- **Tier 6+** (50+): 3 types

**Total**: 20 types de bois ✅ Excellent

#### Minerais (Miner)

- **Distribution identique au bois**
- **Total**: 20 types de minerais ✅ Excellent

#### Plantes (Herbalist)

- **Tier 1**: 5 types
- **Tier 2**: 5 types
- **Tier 3**: 4 types
- **Tier 4**: 4 types
- **Tier 5**: 3 types
- **Total**: 21+ types ✅ Excellent

#### Poissons (Fisher)

- **Tier 1**: 5 types
- **Tier 2**: 6 types
- **Tier 3**: 5 types
- **Tier 4**: 5 types
- **Tier 5**: 3 types
- **Total**: 24+ types ✅ Excellent

#### Tissus (Ville - Ferme)

- **Production automatique** via bâtiment Ferme
- **Total**: 20+ types ✅ Excellent
- **Note**: `fabric_simple_leather` et `fabric_tanned_leather` produits par **Tanneur** (pas Ferme) ✅

#### Gemmes (Miner - Drops rares)

- **Drop rates**: 0.003% à 0.5% (TRÈS rares) ✅ Bon équilibrage
- **Total**: 21 types
- **Usage**: Craft accessoires (Bijoutier)

---

### 👹 DROPS MONSTRES

#### Résumé par Région

**Région 1 - Les Plaines Verdoyantes**

- Monstres communs: 4 types
- Drops: `monster_hide`, `griffes_usees`, `plumes_sombres`, `petit_sac_bandit`
- ⚠️ Variété limitée

**Région 2 - Les Montagnes Grises**

- Monstres rares: Ours, Serpents
- Drops: `robust_hide`, `crocs_venimeux`, `cuir_robuste`
- ✅ Bonne variété

**Régions 3-5**

- Drops progressifs: essences, carapaces, fourrures spéciales
- ✅ Bon équilibrage

#### Pourcentages de Drop

| Rareté    | Drop Chance | Quantité | Équilibrage              |
| --------- | ----------- | -------- | ------------------------ |
| Common    | 30-50%      | 1-5      | ⚠️ Trop haut pour plumes |
| Uncommon  | 25-40%      | 1-3      | ✅ OK                    |
| Rare      | 20-35%      | 1-2      | ✅ OK                    |
| Epic      | 10-20%      | 1-1      | ✅ OK                    |
| Legendary | 5-10%       | 1-1      | ✅ OK                    |

---

## 🎯 RECOMMANDATIONS PRIORITAIRES

### 🔥 PRIORITÉ CRITIQUE

#### 1. Renommer Système de Transmutation ✅

- [ ] Renommer `alchemy-data.js` → `transmutation-data.js`
- [ ] Renommer `alchemy-manager.js` → `transmutation-manager.js`
- [ ] Renommer constantes `ALCHEMY_*` → `TRANSMUTATION_*`
- [ ] Mettre à jour CSS et UI

#### 2. Corriger Recettes Incohérentes ✅

- [ ] Tunique de Cuir → Utiliser `fabric_simple_leather`
- [ ] Casque de Cuir → Utiliser `fabric_simple_leather`
- [ ] Pantalon de Cuir → Utiliser `fabric_simple_leather`
- [ ] Gants de Travail → Utiliser cuir + textile
- [ ] Bottes de Cuir → Utiliser cuir + textile

#### 3. Vérifier Unicité des Recettes ✅

- [ ] Scanner toutes les recettes pour détecter les doublons d'ID
- [ ] Vérifier que chaque `id` est unique à travers tous les fichiers

---

### 🟡 PRIORITÉ HAUTE

#### 4. Équilibrer Drops Monstres

```javascript
// Réduire plumes_sombres
plumes_sombres: {
    dropChance: 0.30, // 50% → 30%
    quantity: { min: 1, max: 3 } // 2-5 → 1-3
}

// Ajouter variété Région 1
loup_gris: {
    dropTable: ['monster_hide', 'griffes_usees', 'monster_fang'] // +crocs
}
```

#### 5. Étaler Progression Métiers

- [ ] Redistribuer recettes niveau 1-5 vers 1-15
- [ ] Créer plus de recettes niveau 20-40
- [ ] Ajouter recettes endgame (40-50)

#### 6. Développer le Métier Tanneur

- [ ] Ajouter recettes Tier 3-5 pour le Tanneur
- [ ] Créer progression cuir: Simple → Tanné → Renforcé → Légendaire
- [ ] Intégrer drops monstres rares (cuir de boss)

---

### 🟢 PRIORITÉ NORMALE

#### 7. Intégration Production Ville

```javascript
// Anticiper production automatique ville
// Exemple: Scierie produit du bois
// Forge produit des barres de métal
// Ferme produit des tissus (déjà fait ✅)

// Recommandation: Créer system_buildings_production.js
{
    sawmill: {
        produces: 'wood_oak',
        rate: 10, // par heure
        levelRequired: 15
    },
    smelter: {
        produces: 'ore_iron_bar', // Nouvelle ressource
        consumes: { ore_iron: 2 },
        rate: 5,
        levelRequired: 20
    }
}
```

#### 8. Utiliser Ressources Drops Inutilisées

- [ ] Créer recettes avec `crocs_venimeux`
- [ ] Créer recettes avec `essence_vegetale_instable`
- [ ] Intégrer toutes les essences/fragments dans crafting

#### 9. Système de Qualité

- [ ] Implémenter qualité pour recettes (Normal, Fine, Superior, Epic)
- [ ] Chance de craft qualité supérieure basée sur niveau métier
- [ ] Bonus stats selon qualité

---

## 🔄 SYSTÈME DE TRANSMUTATION (ENDGAME)

### État Actuel: ✅ EXCELLENT

Le système de transmutation actuel est **très bien conçu** pour gérer les ressources endgame:

```javascript
// Ratio constant 100:1
wood_oak (100x) → wood_maple (1x)
wood_maple (100x) → wood_walnut (1x)
// etc.

// Progression XP
T1→T2: 10 XP, 5s
T2→T3: 25 XP, 10s
T3→T4: 50 XP, 20s
T4→T5: 100 XP, 40s
T5→T6: 200 XP, 80s
T6→T7: 400 XP, 160s
```

**Avantages**:

- ✅ Gérer les millions de ressources T1
- ✅ Convertir en ressources T7 rares
- ✅ Progression XP gratifiante
- ✅ Temps croissant = idle mechanic

**Recommandation**: Garder tel quel, juste renommer pour clarté.

---

## 📊 TABLEAU DE BORD - SANTÉ DU SYSTÈME

| Aspect                       | Note  | Statut                  |
| ---------------------------- | ----- | ----------------------- |
| Cohérence recettes           | 6/10  | ⚠️ À améliorer          |
| Variété ressources           | 9/10  | ✅ Excellent            |
| Équilibrage drops            | 7/10  | 🟡 Bon mais ajustements |
| Progression métiers          | 6/10  | ⚠️ Trop rapide early    |
| Système transmutation        | 10/10 | ✅ Parfait              |
| Intégration ville (anticipé) | 8/10  | ✅ Bon                  |
| Utilisation ressources       | 6/10  | ⚠️ Beaucoup inutilisées |

**MOYENNE GLOBALE**: **7.4/10** - Bon système, nécessite des ajustements

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Phase 1: Corrections Critiques (1-2h)

1. Renommer système Transmutation
2. Corriger recettes cuir incohérentes
3. Vérifier unicité des IDs

### Phase 2: Équilibrage (2-3h)

4. Ajuster drops monstres (pourcentages + variété)
5. Redistribuer niveaux métiers
6. Développer métier Tanneur

### Phase 3: Contenu (3-5h)

7. Créer recettes utilisant ressources inutilisées
8. Ajouter recettes mid/endgame
9. Préparer production ville

### Phase 4: Polish (1-2h)

10. Système qualité craft
11. Tests équilibrage
12. Documentation

**TEMPS TOTAL ESTIMÉ**: 7-12 heures

---

## 📋 CHECKLIST VALIDATION

### Avant Déploiement

- [ ] Toutes les recettes ont des matériaux cohérents
- [ ] Aucun doublon d'ID de recette
- [ ] Chaque ressource de drop est utilisée dans au moins 1 recette
- [ ] Progression métiers équilibrée (1-50)
- [ ] Pourcentages drops ajustés
- [ ] Système transmutation renommé
- [ ] Tests ingame effectués
- [ ] Documentation à jour

---

## 🔗 FICHIERS À MODIFIER

### Critique

- `src/config/alchemy-data.js` → Renommer
- `src/js/alchemy-manager.js` → Renommer
- `src/css/alchemy.css` → Renommer
- `src/config/craft-recipes-data.js` → Corriger recettes cuir

### Important

- `src/config/craft-recipes-armors.js` → Vérifier cohérence
- `src/config/craft-recipes-tanner.js` → Ajouter contenu
- `src/config/drops-data.js` → Ajuster pourcentages
- `src/config/monsters-data.js` → Enrichir dropTables

### Documentation

- `README.md` → Mettre à jour
- Créer `CRAFTING-GUIDE.md` → Guide complet
- Créer `TRANSMUTATION-GUIDE.md` → Guide transmutation

---

## 📝 CONCLUSION

Le système de crafting est **globalement solide** avec une excellente variété de ressources et un système de transmutation endgame bien pensé. Les principaux problèmes sont :

1. **Incohérences de recettes** (cuir en bois) - Facile à corriger
2. **Confusion terminologique** (Alchimie vs Transmutation) - Renommage simple
3. **Progression métiers déséquilibrée** - Ajustements de niveaux
4. **Ressources inutilisées** - Créer recettes manquantes

Avec les corrections recommandées, le système sera **excellent** et offrira une expérience de progression gratifiante du niveau 1 au niveau 50+.

---

**Prochaine étape**: Générer fichier de statistiques détaillées et proposer corrections automatiques.
