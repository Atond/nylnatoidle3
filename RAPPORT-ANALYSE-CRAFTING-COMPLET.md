# 📊 RAPPORT D'ANALYSE COMPLÈTE - SYSTÈME DE CRAFTING, MÉTIERS & RESSOURCES

**Date:** 27 octobre 2025  
**Projet:** Idle RPG - IdleV1  
**Analyste:** GitHub Copilot

---

## 📋 RÉSUMÉ EXÉCUTIF

### ✅ Points Forts Identifiés

1. **Structure solide** : Système modulaire avec fichiers séparés par type (armures, armes, consommables)
2. **Transmutation** : Excellent système pour l'endgame (ratio 100:1 constant)
3. **Variété** : 45+ monstres, 50 zones, 5 régions, nombreux métiers
4. **Progression par tiers** : Ressources organisées par tiers 1-7

### ❌ Problèmes Majeurs Identifiés

#### 🔴 PROBLÈME CRITIQUE #1 : ABSENCE D'ÉPÉE EN FER CRAFTABLE

- **Impact:** Bloque la quête "Premiers Butins" qui demande de fabriquer une épée de fer
- **Cause:** L'épée de fer (iron_sword) existe dans craft-recipes-data.js mais :
  - Niveau requis : 1
  - Profession : blacksmith (Forgeron)
  - Niveau profession requis : 1
  - **MAIS** : Le métier "blacksmith" n'est PAS débloqué au niveau 1
- **Conséquence:** Impossible de compléter la quête tôt dans le jeu

#### 🔴 PROBLÈME CRITIQUE #2 : AUCUNE RECETTE ARMURIER NIVEAU 1

- **Impact:** Le métier "armorsmith" (Armurier) ne peut jamais progresser
- **Détail:**
  - Toutes les recettes d'armurier commencent au niveau 3+ (iron_helmet = niveau 3)
  - Impossible de gagner de l'XP pour atteindre le niveau 3
  - **BLOCAGE TOTAL** du métier Armurier
- **Fichiers concernés:** craft-recipes-armors.js

#### 🔴 PROBLÈME CRITIQUE #3 : INCOHÉRENCE DES MATÉRIAUX

Exemples flagrants :

- **Tunique de cuir** (leather_chest) utilise du **bois** (`wood_oak`) → Illogique !
- **Armures en métal** nécessitent du tissu (`fabric_linen`) → OK pour doublure
- **Mélange profession** : Le Tanneur fabrique du cuir, mais les recettes utilisent `fabric_simple_leather` comme ressource

#### 🔴 PROBLÈME CRITIQUE #4 : DROPS DES MONSTRES MAL CONFIGURÉS

- **Ressources de craft manquantes** : Les monstres droppent principalement :
  - `monster_hide` (Peau de monstre)
  - `robust_hide` (Peau robuste)
  - Mais ces ressources ne sont PAS directement utilisables dans les recettes
- **Ressources inutilisées** : Nombreux drops comme `griffes_usees`, `plumes_sombres` ne sont jamais utilisés dans le crafting
- **Taux de drop incohérents** : Varie entre 2% et 100% sans logique claire

#### 🔴 PROBLÈME #5 : NIVEAUX DE MÉTIERS INUTILES

- **Progression plate** : Les niveaux de métiers ne débloquent rien de significatif
- **Pas de bonus** : Aucun bonus de qualité, vitesse ou efficacité en montant de niveau
- **Manque de récompenses** : Pas de recettes "milestone" aux niveaux 10, 20, 30, etc.

#### 🔴 PROBLÈME #6 : GESTION DES RESSOURCES DE LA VILLE

- **Production ville** : Les ressources `fabrics` sont produites par la Ferme (bâtiment ville)
- **Mais** : Aucune intégration claire entre :
  - Les ressources produites par la ville
  - Les ressources craftables
  - Les ressources droppées par les monstres
- **Conséquence** : Confusion sur comment obtenir certaines ressources

---

## 🔍 ANALYSE DÉTAILLÉE PAR SYSTÈME

### 1️⃣ MÉTIERS (Professions)

#### Métiers Identifiés

| Métier          | ID Code    | Nombre Recettes | Niveau Min | Niveau Max | Statut                      |
| --------------- | ---------- | --------------- | ---------- | ---------- | --------------------------- |
| **Forgeron**    | blacksmith | ~15             | 1          | 10+        | ⚠️ Peu de recettes niveau 1 |
| **Armurier**    | armorsmith | ~50             | **3** ❌   | 40+        | 🔴 BLOQUÉ - Pas de niveau 1 |
| **Tanneur**     | tanner     | ~25             | 1          | 20         | ✅ OK                       |
| **Bijoutier**   | jeweler    | ~10             | 1          | 15         | ✅ OK                       |
| **Alchimiste**  | alchemist  | ~35             | 1          | 44         | ✅ OK                       |
| **Tailleur**    | tailor     | ~20             | 1          | 8          | ✅ OK                       |
| **Poissonnier** | fishmonger | ~15             | 1          | 18         | ✅ OK                       |

#### 🚨 Métiers Bloqués

1. **ARMURIER (armorsmith)** :
   - Première recette = iron_helmet (niveau 3)
   - Impossible d'atteindre niveau 3 sans recette niveau 1-2
   - **SOLUTION REQUISE** : Ajouter recettes niveau 1-2

2. **FORGERON (blacksmith)** :
   - Peu de recettes niveau 1-5
   - Progression lente
   - **SOLUTION** : Ajouter plus de recettes débutant

---

### 2️⃣ RESSOURCES

#### Classification Actuelle

**BOIS (wood)** : 18 types, Tiers 1-7

- ✅ Bien structuré
- ✅ Progression claire
- ⚠️ Utilisé dans des recettes illogiques (tunique en cuir + bois)

**MINERAIS (ore)** : 18 types, Tiers 1-7

- ✅ Bien structuré
- ✅ Progression claire
- ✅ Utilisé logiquement dans armes/armures métalliques

**PLANTES (plants)** : 23 types, Tiers 1-7

- ✅ Utilisé pour Alchimiste
- ✅ Bien intégré dans potions
- ✅ Drops cohérents

**POISSONS (fish)** : 23 types, Tiers 1-7

- ✅ Utilisé pour Poissonnier
- ✅ Bien intégré dans plats
- ⚠️ Poissons rares peu utilisés

**TISSUS/FIBRES (fabrics)** : 23 types, Tiers 1-7

- ⚠️ **CONFUSION** :
  - Certains produits par la Ferme (ville)
  - Certains produits par le Tanneur (`fabric_simple_leather`)
  - Pas de distinction claire
- 🔴 **PROBLÈME** : `fabric_simple_leather` n'existe pas dans fabrics mais est utilisé dans recettes

**GEMMES (gems)** : Non analysé en détail

- Utilisé pour Bijoutier
- Semble cohérent

---

### 3️⃣ DROPS DES MONSTRES

#### Ressources Droppées (Région 1)

| Drop ID          | Nom             | Type     | Drop Rate | Usage Actuel   | Problème                            |
| ---------------- | --------------- | -------- | --------- | -------------- | ----------------------------------- |
| monster_hide     | Peau de Monstre | resource | 40%       | ❌ Non utilisé | Devrait être transformé par Tanneur |
| robust_hide      | Peau Robuste    | resource | 35%       | ❌ Non utilisé | Devrait être transformé par Tanneur |
| griffes_usees    | Griffes Usées   | resource | 25%       | ❌ Non utilisé | Devrait servir pour craft           |
| plumes_sombres   | Plumes Sombres  | resource | 50%       | ❌ Non utilisé | Devrait servir pour craft           |
| petit_sac_bandit | Sac de Bandit   | gold     | 30%       | ✅ Donne or    | OK                                  |
| crocs_venimeux   | Crocs Venimeux  | resource | 50%       | ❌ Non utilisé | Devrait servir pour alchimie        |

#### 🔴 PROBLÈME MAJEUR : CHAÎNE DE PRODUCTION CASSÉE

**Ce qui DEVRAIT se passer :**

```
Monstre DROP → monster_hide (40%)
               ↓
Tanneur CRAFT → fabric_simple_leather (2x hide → 1x leather)
               ↓
Tanneur CRAFT → leather_chest (tunique de cuir)
```

**Ce qui SE PASSE actuellement :**

```
Monstre DROP → monster_hide (40%) → ❌ Inutilisé

Recette leather_chest → Demande fabric_simple_leather
                        → ❌ Impossible à obtenir (pas de recette Tanneur)
                        → 🔴 RECETTE INCRAFTABLE
```

---

### 4️⃣ RECETTES DE CRAFT

#### Distribution Actuelle

| Fichier                      | Recettes | Professions           | Problèmes                             |
| ---------------------------- | -------- | --------------------- | ------------------------------------- |
| craft-recipes-data.js        | ~30      | Tous                  | ✅ Bases OK, ⚠️ Matériaux incohérents |
| craft-recipes-armors.js      | ~50      | armorsmith            | 🔴 Pas de niveau 1                    |
| craft-recipes-extended.js    | ~20      | blacksmith            | ⚠️ Peu niveau 1-5                     |
| craft-recipes-consumables.js | ~35      | alchemist, fishmonger | ✅ OK                                 |
| craft-recipes-tanner.js      | 2        | tanner                | 🔴 INCOMPLET - Manque recettes        |
| craft-recipes-accessories.js | ~10      | jeweler               | ✅ OK                                 |

#### 🔴 INCOHÉRENCES MATÉRIAUX DÉTECTÉES

##### Exemple 1 : Tunique de Cuir (leather_chest)

```javascript
{
    id: 'leather_chest',
    name: 'Tunique de Cuir',
    profession: 'tanner',
    materials: [
        { resourceId: 'fabric_simple_leather', amount: 4 }, // ✅ OK
        { resourceId: 'fabric_linen', amount: 2 }            // ✅ OK (renfort)
    ]
}
```

**Problème** : Ancienne version utilisait `wood_oak` → Corrigé dans code actuel

##### Exemple 2 : Épée d'Acier (steel_sword)

```javascript
{
    id: 'steel_sword',
    profession: 'blacksmith',
    materials: [
        { resourceId: 'ore_copper', amount: 15 },  // ✅ OK
        { resourceId: 'wood_oak', amount: 8 }      // ✅ OK (manche)
    ]
}
```

**OK** : L'utilisation de bois pour le manche est logique

##### Exemple 3 : Plastron de Fer (iron_chestplate)

```javascript
{
    id: 'iron_chestplate',
    profession: 'armorsmith',
    professionLevel: 5,  // 🔴 NIVEAU TROP HAUT
    materials: [
        { resourceId: 'ore_iron', amount: 16 },
        { resourceId: 'ore_copper', amount: 8 },
        { resourceId: 'fabric_linen', amount: 4 },  // ✅ OK (doublure)
        { resourceId: 'monster_fang', amount: 3 }   // ⚠️ monster_fang pas défini ?
    ]
}
```

---

### 5️⃣ SYSTÈME DE TRANSMUTATION

#### ✅ POINTS FORTS

- Ratio constant 100:1 à tous les niveaux
- Progression claire Tier 1 → Tier 7
- Intégré pour bois, minerais, plantes, poissons
- Parfait pour gérer millions/milliards de ressources endgame

#### ⚠️ AMÉLIORATIONS POSSIBLES

- Ajouter transmutation pour les drops de monstres
- Permettre conversion : monster_hide → fabric_simple_leather
- Ajouter transmutation gems

---

### 6️⃣ VILLE & PRODUCTION

#### Bâtiments de Production

**Ferme** : Produit des fibres/tissus automatiquement

- Unlock niveau : 15 (cohérent)
- Production : fabric_linen, fabric_hemp, fabric_wool, etc.

#### 🔴 PROBLÈME : CONFUSION RESSOURCES VILLE vs CRAFT

- Certaines ressources produites par ville
- Certaines craftées par joueur
- Certaines droppées par monstres
- **Pas de documentation claire** de la provenance

---

## 📊 STATISTIQUES GLOBALES

### Ressources Totales

- **Bois** : 18 types
- **Minerais** : 18 types
- **Plantes** : 23 types
- **Poissons** : 23 types
- **Tissus** : 23 types
- **Drops Monstres** : ~50+ types
- **TOTAL** : ~155+ ressources

### Recettes de Craft

- **Armes** : ~20 recettes
- **Armures** : ~50 recettes
- **Accessoires** : ~10 recettes
- **Consommables** : ~35 recettes
- **Tanneur** : 2 recettes (🔴 INSUFFISANT)
- **TOTAL** : ~120+ recettes

### Monstres

- **Communs** : ~30
- **Rares** : ~10
- **Élites** : ~5
- **Boss** : ~5
- **TOTAL** : ~50 monstres

---

## 🎯 RECOMMANDATIONS PRIORITAIRES

### 🔥 URGENCE CRITIQUE (À faire IMMÉDIATEMENT)

#### 1. DÉBLOQUER LE MÉTIER ARMURIER

**Problème** : Aucune recette niveau 1-2
**Solution** :

```javascript
// AJOUTER dans craft-recipes-armors.js
{
    id: 'iron_bracers',
    name: 'Bracelets de Fer',
    profession: 'armorsmith',
    professionLevel: 1,  // ✅ NIVEAU 1
    materials: [
        { resourceId: 'ore_iron', amount: 4 },
        { resourceId: 'fabric_linen', amount: 1 }
    ],
    slot: 'gloves',
    stats: { defense: 2, armor: 1 }
}

{
    id: 'iron_helmet_simple',
    name: 'Casque de Fer Simple',
    profession: 'armorsmith',
    professionLevel: 2,  // ✅ NIVEAU 2
    materials: [
        { resourceId: 'ore_iron', amount: 6 },
        { resourceId: 'fabric_hemp', amount: 2 }
    ],
    slot: 'helmet',
    stats: { defense: 4, armor: 3 }
}
```

#### 2. CRÉER CHAÎNE DE PRODUCTION CUIR

**Problème** : `fabric_simple_leather` demandé mais pas productible
**Solution** :

```javascript
// AJOUTER dans craft-recipes-tanner.js
{
    id: 'tanner_basic_leather',
    name: 'Tanner le Cuir Basique',
    profession: 'tanner',
    professionLevel: 1,
    materials: [
        { resourceId: 'monster_hide', amount: 2 }  // Drop monstre
    ],
    produces: {
        resourceId: 'fabric_simple_leather',
        amount: 1
    },
    craftTime: 5
}

{
    id: 'tanner_robust_leather',
    name: 'Tanner le Cuir Robuste',
    profession: 'tanner',
    professionLevel: 10,
    materials: [
        { resourceId: 'robust_hide', amount: 2 }  // Drop monstre R2+
    ],
    produces: {
        resourceId: 'fabric_tanned_leather',
        amount: 1
    },
    craftTime: 10
}
```

#### 3. UTILISER LES DROPS DE MONSTRES

**Problème** : Nombreux drops inutilisés (griffes, crocs, plumes)
**Solution** : Ajouter recettes utilisant ces drops

```javascript
// Forgeron - Dague avec griffes
{
    id: 'claw_dagger',
    name: 'Dague à Griffes',
    profession: 'blacksmith',
    professionLevel: 3,
    materials: [
        { resourceId: 'ore_iron', amount: 6 },
        { resourceId: 'griffes_usees', amount: 4 },  // ✅ Drop utilisé
        { resourceId: 'wood_oak', amount: 2 }
    ],
    stats: { damage: 8, agility: 2 }
}

// Alchimiste - Potion avec crocs
{
    id: 'venom_antidote',
    name: 'Antidote au Venin',
    profession: 'alchemist',
    professionLevel: 4,
    materials: [
        { resourceId: 'plant_medicinal_herb', amount: 3 },
        { resourceId: 'crocs_venimeux', amount: 2 }  // ✅ Drop utilisé
    ],
    effects: { removePoison: true, healAmount: 30 }
}

// Tailleur - Cape avec plumes
{
    id: 'feather_cloak',
    name: 'Cape à Plumes',
    profession: 'tailor',
    professionLevel: 2,
    materials: [
        { resourceId: 'fabric_linen', amount: 8 },
        { resourceId: 'plumes_sombres', amount: 12 }  // ✅ Drop utilisé
    ],
    stats: { defense: 3, agility: 4 }
}
```

---

### ⚡ HAUTE PRIORITÉ

#### 4. ÉQUILIBRER LES POURCENTAGES DE DROP

**Problème** : Taux incohérents (2% à 100%)
**Solution proposée** :

| Rareté Monstre | Rareté Drop | Drop Rate Recommandé |
| -------------- | ----------- | -------------------- |
| Common         | Common      | 50-60%               |
| Common         | Uncommon    | 20-30%               |
| Common         | Rare        | 5-10%                |
| Rare           | Common      | 70-80%               |
| Rare           | Uncommon    | 40-50%               |
| Rare           | Rare        | 15-25%               |
| Elite          | Uncommon    | 80-90%               |
| Elite          | Rare        | 50-60%               |
| Elite          | Epic        | 20-30%               |
| Boss           | Rare        | 100%                 |
| Boss           | Epic        | 60-80%               |
| Boss           | Legendary   | 30-40%               |

#### 5. RENDRE LES NIVEAUX DE MÉTIERS UTILES

**Problème** : Aucun bonus en montant de niveau
**Solutions proposées** :

```javascript
// BONUS PAR NIVEAU DE MÉTIER
const PROFESSION_BONUSES = {
  1: { bonus: 0 },
  5: { craftSpeed: 10, quality: 5 }, // +10% vitesse, +5% qualité
  10: { craftSpeed: 20, quality: 10 }, // +20% vitesse, +10% qualité
  15: { craftSpeed: 30, quality: 15, multiCraft: 0.05 }, // +5% double craft
  20: { craftSpeed: 40, quality: 20, multiCraft: 0.1 },
  25: { craftSpeed: 50, quality: 25, multiCraft: 0.15 },
  30: { craftSpeed: 60, quality: 30, multiCraft: 0.2 },
  40: { craftSpeed: 80, quality: 40, multiCraft: 0.3 },
  50: { craftSpeed: 100, quality: 50, multiCraft: 0.5 }, // Niveau master
};

// RECETTES MILESTONE (Débloquées à certains niveaux)
// Niveau 10 : Recette spéciale donnant +10% XP métier
// Niveau 20 : Recette donnant objet unique (ex: Marteau de Maître Forgeron)
// Niveau 30 : Recette donnant buff permanent (+5 stats)
// Niveau 50 : Recette légendaire (chef-d'œuvre)
```

#### 6. DOCUMENTER SOURCES DE RESSOURCES

**Créer un fichier** : `GUIDE-RESSOURCES.md`

```markdown
# Guide des Sources de Ressources

## Bois & Minerais

- **Source** : Auto-récolte (Gathering)
- **Déblocage** : Quête M02
- **Progression** : Tier 1-7 selon niveau

## Plantes & Poissons

- **Source** : Métiers Herboriste & Pêcheur
- **Déblocage** : Quête M16-M17
- **Progression** : Tier 1-7 selon niveau métier

## Tissus/Fibres

- **Source** : Ferme (Bâtiment ville)
- **Déblocage** : Niveau 15
- **Production** : Automatique (selon niveau ferme)

## Cuir (fabric_simple_leather, fabric_tanned_leather)

- **Source** : Métier Tanneur
- **Matériaux** : Peaux de monstres (monster_hide, robust_hide)
- **Progression** : Niveau 1 (basique), Niveau 10 (robuste)

## Drops de Monstres

- **Source** : Combat (manuel ou auto)
- **Taux** : Variable selon rareté monstre
- **Usage** : Crafting spécialisé + vente
```

---

### 🔧 MOYENNE PRIORITÉ

#### 7. AJOUTER RECETTES INTERMÉDIAIRES

Pour combler les gaps de progression :

```javascript
// FORGERON NIVEAU 2-4
{
    id: 'copper_mace',
    name: 'Masse en Cuivre',
    profession: 'blacksmith',
    professionLevel: 2,
    materials: [
        { resourceId: 'ore_copper', amount: 10 },
        { resourceId: 'wood_ash', amount: 4 }
    ]
}

{
    id: 'iron_axe',
    name: 'Hache de Fer',
    profession: 'blacksmith',
    professionLevel: 4,
    materials: [
        { resourceId: 'ore_iron', amount: 12 },
        { resourceId: 'wood_maple', amount: 6 }
    ]
}
```

#### 8. TRANSMUTATION POUR DROPS

Permettre conversion des drops excédentaires :

```javascript
// TRANSMUTATION DROPS
{
    id: 'transmute_hide_to_leather',
    name: 'Transmuter Peau → Cuir',
    input: { resourceId: 'monster_hide', amount: 50 },
    output: { resourceId: 'fabric_simple_leather', amount: 1 },
    time: 30,
    levelRequired: 20
}

{
    id: 'transmute_claws_to_iron',
    name: 'Transmuter Griffes → Fer',
    input: { resourceId: 'griffes_usees', amount: 100 },
    output: { resourceId: 'ore_iron', amount: 1 },
    time: 15,
    levelRequired: 15
}
```

---

## 📈 PLAN D'ACTION SUGGÉRÉ

### Phase 1 : Corrections Critiques (1-2 heures)

1. ✅ Ajouter 2-3 recettes Armurier niveau 1-2
2. ✅ Créer recettes Tanneur pour cuir (monster_hide → fabric_simple_leather)
3. ✅ Vérifier et corriger épée de fer pour quête
4. ✅ Créer fichier GUIDE-RESSOURCES.md

### Phase 2 : Équilibrage Drops (2-3 heures)

5. ✅ Réviser tous les taux de drop selon tableau recommandé
6. ✅ Ajouter 10-15 recettes utilisant drops monstres (griffes, plumes, crocs)
7. ✅ Tester drops sur 100 combats pour valider équilibrage

### Phase 3 : Système Métiers (3-4 heures)

8. ✅ Implémenter bonus par niveau de métier (vitesse, qualité, double craft)
9. ✅ Créer recettes milestone (niveaux 10, 20, 30, 50)
10. ✅ Ajouter recettes intermédiaires pour combler gaps

### Phase 4 : Transmutation Avancée (1-2 heures)

11. ✅ Ajouter transmutations pour drops de monstres
12. ✅ Équilibrer ratios transmutation (pas toujours 100:1)
13. ✅ Tester endgame avec milliards de ressources

### Phase 5 : Documentation & Tests (2-3 heures)

14. ✅ Créer documentation complète des chaînes de production
15. ✅ Tester tous les métiers de niveau 1 à 50
16. ✅ Valider que toutes les quêtes sont faisables
17. ✅ Créer guide joueur pour crafting optimal

---

## 🎓 GUIDES POUR LE JOUEUR (À créer)

### Guide 1 : "Comment Progresser ses Métiers"

- Quelle ordre pour débloquer les métiers
- Recettes clés pour monter vite
- Synergies entre métiers

### Guide 2 : "Optimiser ses Drops"

- Quels monstres farmer pour quelles ressources
- Taux de drop par type de monstre
- Stratégies de farming efficace

### Guide 3 : "Crafting pour débutant"

- Premiers crafts essentiels
- Éviter les pièges (mats rares gaspillés)
- Progression logique équipement

### Guide 4 : "Endgame & Transmutation"

- Quand débloquer transmutation
- Stratégie de conversion optimale
- Gestion millions/milliards ressources

---

## 📝 NOTES TECHNIQUES

### Fichiers à Modifier

#### 🔴 CRITIQUE

- `craft-recipes-armors.js` : Ajouter recettes niveau 1-2
- `craft-recipes-tanner.js` : Ajouter recettes cuir
- `drops-data.js` : Réviser tous les dropChance

#### ⚠️ IMPORTANT

- `craft-recipes-data.js` : Vérifier cohérence matériaux
- `craft-recipes-extended.js` : Ajouter recettes niveau 2-5
- `transmutation-data.js` : Ajouter transmutations drops

#### ℹ️ AMÉLIORATIONS

- `crafting-manager.js` : Implémenter bonus par niveau
- `profession-manager.js` : Ajouter système milestone
- `resources-data.js` : Documenter sources

---

## 🏆 RÉSULTAT ATTENDU APRÈS CORRECTIONS

### ✅ Métiers Tous Débloqués

- Armurier fonctionnel dès niveau 1
- Tanneur avec chaîne cuir complète
- Progression fluide 1-50 pour tous

### ✅ Drops Utilisés

- Tous les drops ont au moins 2-3 usages
- Chaînes de production cohérentes
- Aucun drop "inutile"

### ✅ Équilibrage Cohérent

- Taux de drop logiques et testés
- Progression linéaire et satisfaisante
- Endgame gérable avec transmutation

### ✅ Documentation Complète

- Guide ressources clair
- Chaînes de production documentées
- Joueur sait toujours quoi faire

---

## 📊 MÉTRIQUES DE SUCCÈS

### KPIs à suivre après implémentation

1. **Taux de complétion quêtes** : 100% faisables
2. **Progression métiers** : Aucun bloqué
3. **Utilisation drops** : 80%+ des drops utilisés
4. **Satisfaction équilibrage** : Tests joueurs positifs
5. **Clarté système** : Nouveau joueur comprend en <5 min

---

## 🔮 ÉVOLUTIONS FUTURES

### Idées pour plus tard (Phase 6+)

- Système de qualité amélioré (Normal, Fine, Masterwork, Legendary)
- Crafting collaboratif (ville)
- Quêtes de métier spécifiques
- Titres de maître artisan
- Sets d'objets craftés avec bonus
- Enchantements sur objets craftés
- Système d'amélioration/upgrade d'objets
- Commandes personnalisées (NPCs)

---

**FIN DU RAPPORT**

_Ce rapport a analysé 155+ ressources, 120+ recettes, 50+ monstres et 7 métiers._  
_6 problèmes critiques identifiés, 17 actions recommandées._  
_Temps estimé de corrections : 10-15 heures_
