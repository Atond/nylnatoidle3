# 🐉 Guide Complet du Système de Dragons

## 🎯 Vue d'Ensemble

Le système de dragons offre une expérience de reproduction et d'élevage inspirée de Dofus et Equideow, avec des mécaniques de génétique, pureté, et croisements uniques.

## 📊 Types de Dragons

### Dragons Purs (5 Races)

| Race | Icône | Couleur | Statistique | Description |
|------|-------|---------|-------------|-------------|
| **Rousse** | 💪 | Rouge | Force | Puissants combattants |
| **Dorée** | ⚡ | Orange | Agilité | Rapides et agiles |
| **Amande** | 🧠 | Bleu | Intelligence | Sages et rusés |
| **Orchidée** | ✨ | Violet | Sagesse | Mystiques |
| **Émeraude** | 🛡️ | Vert | Endurance | Robustes et résistants |

### Dragons Hybrides (10 Croisements)

#### Force × Autres
- 💪⚡ **Flamboiement** (Force + Agilité)
- 💪🧠 **Carmillon** (Force + Intelligence)
- 💪✨ **Rubiscent** (Force + Sagesse)
- 💪🛡️ **Brasier** (Force + Endurance)

#### Agilité × Autres
- ⚡🧠 **Célériane** (Agilité + Intelligence)
- ⚡✨ **Aurélion** (Agilité + Sagesse)
- ⚡🛡️ **Foudracier** (Agilité + Endurance)

#### Intelligence × Autres
- 🧠✨ **Azurite** (Intelligence + Sagesse)
- 🧠🛡️ **Cristalline** (Intelligence + Endurance)

#### Sagesse × Endurance
- ✨🛡️ **Améthyste** (Sagesse + Endurance)

## ⭐ Système de Tiers

| Tier | Nom | Couleur | Stats Min-Max | Coût Reproduction |
|------|-----|---------|---------------|-------------------|
| T0 | Novice | Gris | 0-20 | 500 🪙 |
| T1 | Commun | Vert | 20-40 | 1,000 🪙 |
| T2 | Rare | Bleu | 40-60 | 2,000 🪙 |
| T3 | Épique | Violet | 60-80 | 4,000 🪙 |
| T4 | Légendaire | Orange | 80-100 | 8,000 🪙 |
| T5 | Mythique | Rouge | 100-120 | 16,000 🪙 |

## 🧬 Système Génétique

### Pureté
Calculée sur 3 générations :
- **50%** : Type du dragon lui-même
- **30%** : Types des parents
- **20%** : Types des grands-parents

### Bonus de Reproduction

#### Bonus de Lignée Pure (+30%)
Si les 4 grands-parents sont du même type :
- Augmente drastiquement les chances de tier supérieur

#### Bonus de Pureté (jusqu'à +20%)
Basé sur la pureté moyenne des parents :
- Dragons très purs → meilleures chances

#### Pénalité Hybride (-15%)
Dragons à 2 types différents :
- Réduit les chances de tier supérieur
- Mais créent des combinaisons uniques !

### Mutations (5%)
Chance d'obtenir un type différent des parents :
- Crée de la variété génétique
- Peut débloquer de nouveaux hybrides

## 🎮 Gameplay

### Cycle de Vie
- **Durée** : 7 jours
- **Alimentation** : Toutes les 1 heure
- **Faim** : Cause des dégâts progressifs si négligée
- **Mort** : Abandonne des **Essences** (bonus permanents +5 stats)

### Entraînement
- **Niveaux** : 1 → 25
- **Bonus** : +3 stats par niveau (répartis selon types)
- **XP requise** : Augmente avec le niveau
- **Coût** : Or + Temps de recharge

### Équipement
- 1 dragon équipé à la fois
- **Bonus directs** : Ses stats s'ajoutent au joueur
- Visible dans l'affichage du dragon actif

## 📖 Interface Utilisateur

### Onglet Dragons
1. **Ressources** : Nourriture 🥩, Essences ✨, Nombre de dragons 📊
2. **Dragon Actif** : Stats, vie restante, faim, actions
3. **Collection** : Grille de tous vos dragons
4. **Reproduction** : Sélection de parents, probabilités
5. **Filtres** : Par type, statut (vivant/mort)

### Bouton "❓ Aide"
Modal explicative complète :
- Types de dragons et races
- Système de tiers
- Pureté et génétique
- Reproduction et bonus
- Entraînement
- Durée de vie
- Impact sur le joueur

### Bouton "📖 Bestiaire"
Encyclopédie des dragons :
- **Dragons Purs** : 5 races × 6 tiers = 30 entrées
- **Dragons Hybrides** : 10 croisements uniques
- Progression : X/Y découverts
- Stats et coûts détaillés
- Verrouillés/Déverrouillés

### Modal de Sélection de Parents
Améliorations :
- **Filtres par stat** : Force, Agilité, Intelligence, Sagesse, Endurance
- **Bouton Arbre** : Voir la généalogie sans fermer
- **Nom de race** : Rousse, Flamboiement, etc.
- **Stats visibles** : Contribution du dragon
- **Pureté affichée** : Pour planifier les croisements

### Arbre Généalogique
Vue sur 3 générations :
- Grands-parents paternels/maternels
- Parents (père/mère)
- Dragon actuel
- Connecteurs visuels
- Icônes et couleurs des tiers

## 🎯 Stratégies Avancées

### Maximiser la Pureté
1. Créer une lignée pure en croisant uniquement le même type
2. Sélectionner des parents de haute pureté
3. Éviter les hybrides si objectif = pureté

### Créer des Hybrides Puissants
1. Croiser deux types complémentaires
2. Accepter la pénalité hybride
3. Viser des tiers élevés pour compenser

### Progression Optimale
1. **Début** : Dragons T0-T1 pour découvrir le système
2. **Milieu** : Focus sur lignées pures T2-T3
3. **Endgame** : Hybrides T4-T5 avec stats équilibrées

### Farming d'Essences
1. Laisser vieillir les dragons de faible qualité
2. Récupérer leurs essences à la mort
3. Appliquer sur des dragons prometteurs
4. **Limite** : 5 essences par dragon (5×5 = +25 stats max)

## 🔧 Commandes de Test

Ouvre la console (F12) et utilise :

```javascript
// 🌟 Tester les hybrides
DragonTestHelper.testHybrids()

// Créer tous les hybrides d'un coup
DragonTestHelper.createAllHybrids()

// Créer un hybride spécifique (Flamboiement T3)
DragonTestHelper.createHybridDragon('force', 'agility', 3)

// Tests généraux
DragonTestHelper.cleanStart()        // Recommencer à zéro
DragonTestHelper.runFullTest()       // Test complet
DragonTestHelper.giveTestResources() // Ressources infinies
DragonTestHelper.reviveAllDragons()  // Ressusciter tous
```

## 📚 Fichiers de Référence

- **dragons-data.js** : Configuration complète (types, tiers, génétique, noms hybrides)
- **dragon.js** : Classe Dragon (génome, stats, vie, entraînement)
- **dragon-manager.js** : Gestion collection et reproduction
- **ui.js** : Interface utilisateur (affichage, modals, interactions)
- **dragons.css** : Styles visuels
- **DRAGON-HYBRID-NAMES.md** : Liste complète des noms

## 🎨 Visuels

### Dragons Purs
- Icône unique (💪, ⚡, 🧠, ✨, 🛡️)
- Couleur unie du type
- Nom : "Rousse Épique", "Dorée Légendaire"

### Dragons Hybrides
- Double icône (💪⚡, 🧠✨, etc.)
- Dégradé des deux couleurs parentales
- Nom unique : "Flamboiement Épique", "Azurite Mythique"

### Tiers (Rareté)
- Couleur de bordure et badge
- Gradation Gris → Vert → Bleu → Violet → Orange → Rouge

## 🚀 Améliorations Futures Possibles

- [ ] Dragons à 3 types (très rares, légendaires)
- [ ] Compétences spéciales par race
- [ ] Arène de combat entre dragons
- [ ] Expéditions avec dragons équipés
- [ ] Skins/cosmétiques pour dragons
- [ ] Système de prestige (réincarnation)
- [ ] Événements temporaires (dragons saisonniers)
- [ ] Marketplace pour échanger dragons
