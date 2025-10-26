# 📝 CHANGELOG - Nyln'ato Idle RPG

## [0.2.0-alpha] - 2025-10-21

### 🐉 Système de Dragons Hybrides

#### Nouvelles Fonctionnalités
- **10 Races Hybrides Uniques** : Noms originaux pour chaque croisement
  - Flamboiement (Force × Agilité)
  - Carmillon (Force × Intelligence)
  - Rubiscent (Force × Sagesse)
  - Brasier (Force × Endurance)
  - Célériane (Agilité × Intelligence)
  - Aurélion (Agilité × Sagesse)
  - Foudracier (Agilité × Endurance)
  - Azurite (Intelligence × Sagesse)
  - Cristalline (Intelligence × Endurance)
  - Améthyste (Sagesse × Endurance)

#### Améliorations UI
- **Modal de Sélection Améliorée** :
  - Filtres par statistique (Force, Agilité, etc.)
  - Bouton arbre généalogique sur chaque dragon
  - Affichage du nom de race et stats
- **Bestiaire Enrichi** :
  - Section dédiée aux dragons hybrides
  - Dégradés de couleurs visuels
  - Double icône pour les hybrides
- **Affichage des Stats** :
  - Section "Bonus appliqués au joueur" sur dragon équipé
  - Stats en vert avec encadré distinct
- **Modal d'Aide Complète** :
  - Explications détaillées du système
  - Types, tiers, pureté, reproduction
  - Impact sur le joueur

#### Techniques
- Méthodes utilitaires dans `DragonsConfig` :
  - `getHybridName()` : Récupère le nom d'un hybride
  - `getHybridColor()` : Couleur moyenne des types parents
  - `getHybridGradient()` : Dégradé CSS pour affichage
  - `getAllHybrids()` : Liste tous les hybrides possibles
- Méthode `getRaceName()` améliorée dans `Dragon`
- Nouvelles commandes de test :
  - `DragonTestHelper.testHybrids()`
  - `DragonTestHelper.createAllHybrids()`
  - `DragonTestHelper.createHybridDragon(type1, type2, tier)`

#### Corrections
- ✅ Fix `minStats`/`maxStats` → `minStat`/`maxStat` dans TIERS
- ✅ Ajout `breedCost` pour compatibilité bestiaire
- ✅ Noms de races affichés partout (collection, modals, généalogie)

#### Documentation
- 📖 **DRAGON-HYBRID-NAMES.md** : Liste complète des noms et descriptions
- 📖 **DRAGON-SYSTEM-GUIDE.md** : Guide complet du système
- Tableaux des races pures et hybrides
- Stratégies de reproduction
- Commandes de test

## [0.1.0-alpha] - 2025-10-19

### ✅ Corrections majeures
- 🐛 Correction duplication exportSave()
- 🐛 Ajout méthodes manquantes StorageManager
- 🐛 Désactivation mode debug en production
- 🔧 Nettoyage de 56 fichiers temporaires

### 🎮 Fonctionnalités
- Combat automatique avec 5 régions, 50 zones, 45+ monstres
- Système de crafting avec qualité d'équipement
- Professions (Bûcheron, Mineur)
- Système de ville avec bâtiments
- Alchimie (conversion de ressources)
- Import/Export de sauvegardes
- Création de personnage (genre, classe)

### 🏗️ Architecture
- Injection de dépendances
- Configuration centralisée (GameConfig)
- Système de sauvegarde/chargement
- Optimisation performance (throttling UI)

### 📚 Documentation
- 📊 Rapport d'analyse complet
- 🔧 Guide de correction des bugs
- 🗑️ Script de nettoyage
- 📁 Réorganisation de la structure

---

## [Historique complet]

Pour l'historique détaillé des corrections, voir `archive/solutions/`

