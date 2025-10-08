# 🎯 Plan MVP - Nyln'ato Idle RPG

> **Objectif** : Créer une version jouable du jeu en **3 semaines** avec les mécaniques essentielles.

---

## 🎮 Scope du MVP

### ✅ Features incluses (ACTUALISÉ)

- ⚔️ **Combat temps réel** : Clics manuels + auto-combat, HP, dégâts, vitesse d'attaque ✅
- 🗺️ **5 régions × 10 zones** : 50 zones total avec progression (Région 1 complète) ⚠️ _En cours_
- 📊 **Stats complètes** : PV, Force, Agilité, Intelligence, Sagesse, Endurance ✅
- 📈 **Système de niveau** : XP, level up, distribution stats automatique ✅
- 🎭 **Création de personnage** : Nom, genre, 4 classes (Guerrier/Archer/Mage/Prêtre) ✅ **NOUVEAU**
- ⛏️ **3 métiers** : Bûcheron, Mineur, Forgeron avec XP séparée + auto-gather ✅
- 🏗️ **5 bâtiments** : Scierie, Mine, Forge, Warehouse, Treasury (upgradables) ✅
- ⚒️ **Craft complet** : Recettes d'équipement avec système de qualité ✅
- 💰 **Ressources** : 9 bois, 9 minerais, 15 gemmes + 12 loot items/région ✅
- 🏦 **Dual storage** : 1000 resources / 500 loot avec upgrade séparés ✅ **NOUVEAU**
- 💾 **Sauvegarde** : LocalStorage, auto-save 30s, import/export ✅
- 🎨 **UI responsive** : Interface avec onglets + filtres inventaire ✅

### ❌ Features exclues (Post-MVP)

- ✅ ~~Auto-combat~~ **IMPLÉMENTÉ**
- ✅ ~~Boss système (100 kills)~~ **IMPLÉMENTÉ**
- ⚠️ Régions 2-5 données (en cours)
- ❌ Quêtes système actif (déblocage auto-combat)
- ❌ Dragons et familiers
- ❌ Prestige et guilde multi-personnages
- ❌ Donjons et raids
- ✅ ~~10-20 ressources par type~~ **IMPLÉMENTÉ** (33 resources total)

---

## 📅 Planning de développement (3 semaines)

### 🏗️ Semaine 1 : Fondations du Combat

#### Sprint 1.1 : Setup & Combat basique (Jours 1-2)

**Objectifs** :

- ✅ Structure HTML complète avec onglets
- ✅ Architecture JS modulaire (classes Game, Player, Monster, Combat)
- ✅ Interface combat : affichage joueur vs monstre
- ✅ Système de clics : 1 clic = 1 dégât au monstre
- ✅ HP monstre, mort du monstre → spawn nouveau monstre

**Livrables** :

```
index.html
src/js/game.js        // Classe principale
src/js/player.js      // Classe Player avec stats
src/js/monster.js     // Classe Monster
src/js/combat.js      // Logique de combat
src/js/ui.js          // Gestion interface
src/css/main.css      // Styles de base
```

#### Sprint 1.2 : Stats & Progression (Jours 3-4)

**Objectifs** :

- ✅ Système de stats : PV, Force, Agilité, Intelligence, Sagesse, Endurance
- ✅ Combat temps réel : Joueur et monstre attaquent automatiquement
- ✅ Vitesse d'attaque basée sur Agilité
- ✅ Dégâts calculés depuis Force/Intelligence
- ✅ Mort du joueur → retour menu ou respawn zone 1

**Livrables** :

```
src/js/stats.js       // Calculs de stats dérivées
src/config/combat-config.js  // Formules de combat
```

#### Sprint 1.3 : XP & Niveaux (Jours 5-7)

**Objectifs** :

- ✅ Gain XP en tuant monstres
- ✅ Barre d'XP et niveau affiché
- ✅ Level up → augmentation stats automatique
- ✅ Formule progression : XP requise = 100 × niveau^1.5

**Livrables** :

```
src/js/progression.js  // Système XP et level up
src/config/xp-config.js
```

---

### ⛏️ Semaine 2 : Métiers & Zones

#### Sprint 2.1 : Système de Zones (Jours 8-9)

**Objectifs** :

- ✅ 3 zones implémentées (Zone 1: Slimes, Zone 2: Loups, Zone 3: Ours)
- ✅ Progression : Tuer 10 monstres → déblocage zone suivante
- ✅ Navigation entre zones
- ✅ Monstres plus forts dans zones avancées

**Livrables** :

```
src/js/zone-manager.js
src/config/zones-data.js  // Config des 3 zones
src/config/monsters-data.js  // Stats des monstres
```

#### Sprint 2.2 : Métiers - Récolte (Jours 10-11)

**Objectifs** :

- ✅ Onglet Métiers fonctionnel
- ✅ Bûcheron : Clic → +1 bois (3 types : Commun, Chêne, Pin)
- ✅ Mineur : Clic → +1 minerai (3 types : Pierre, Fer, Cuivre)
- ✅ XP de métier séparée : Récolter = +XP métier
- ✅ Niveau métier affiché

**Livrables** :

```
src/js/profession.js       // Classe Profession
src/js/profession-manager.js
src/config/professions-data.js
src/js/resources.js        // Gestion inventaire ressources
```

#### Sprint 2.3 : Métiers - Craft (Jours 12-14)

**Objectifs** :

- ✅ Forgeron : Interface de craft
- ✅ 3-5 recettes équipement :
  - Épée en bois : 10 Bois Commun → +2 Force
  - Épée en fer : 10 Fer + 5 Chêne → +5 Force
  - Armure en fer : 15 Fer + 5 Cuivre → +10 PV
  - Pioche en fer : 8 Fer + 3 Bois → +1 minerai/clic
  - Hache en fer : 8 Fer + 3 Bois → +1 bois/clic
- ✅ Équipement = bonus stats permanent

**Livrables** :

```
src/js/equipment.js        // Classe Equipment
src/js/crafting.js         // Système de craft
src/config/recipes-data.js // Recettes
```

---

### 🏗️ Semaine 3 : Ville & Polish

#### Sprint 3.1 : Bâtiments (Jours 15-16)

**Objectifs** :

- ✅ Onglet Ville fonctionnel
- ✅ Bâtiment Scierie : Coût 100 bois, +1 bois/sec
- ✅ Bâtiment Mine : Coût 50 pierre + 50 fer, +1 minerai/sec
- ✅ Production passive visible
- ✅ Amélioration niveau 2 pour chaque bâtiment

**Livrables** :

```
src/js/building.js         // Classe Building
src/js/building-manager.js
src/config/buildings-data.js  // Config bâtiments
```

#### Sprint 3.2 : Drops & Économie (Jours 17-18)

**Objectifs** :

- ✅ Monstres droppent ressources (bois/minerais rares)
- ✅ Monstres droppent or (monnaie)
- ✅ Système de drops probabilistes (70% commun, 25% rare, 5% très rare)
- ✅ Affichage inventaire complet

**Livrables** :

```
src/js/loot.js             // Système de drops
src/config/loot-tables.js  // Tables de drops par zone
```

#### Sprint 3.3 : Sauvegarde & Polish (Jours 19-21)

**Objectifs** :

- ✅ Sauvegarde LocalStorage complète
- ✅ Auto-save toutes les 30 secondes
- ✅ Boutons Save/Load manuels
- ✅ Offline progression basique (XP si hors-ligne < 1h)
- ✅ UI polish : animations, transitions
- ✅ Responsive mobile
- ✅ Tests complets

**Livrables** :

```
src/js/save-manager.js     // Gestion sauvegardes
src/css/animations.css     // Animations UI
TEST-RESULTS.md            // Résultats tests
```

---

## 🎨 Architecture Technique

### Structure de fichiers

```
index.html
src/
  ├─ js/
  │  ├─ game.js               // Point d'entrée, orchestration
  │  ├─ player.js             // Gestion joueur (stats, niveau)
  │  ├─ monster.js            // Entité monstre
  │  ├─ combat.js             // Logique de combat temps réel
  │  ├─ stats.js              // Calculs stats dérivées
  │  ├─ progression.js        // XP, level up
  │  ├─ zone-manager.js       // Gestion zones
  │  ├─ profession.js         // Classe métier
  │  ├─ profession-manager.js // Gestion métiers
  │  ├─ resources.js          // Inventaire ressources
  │  ├─ equipment.js          // Équipement joueur
  │  ├─ crafting.js           // Système craft
  │  ├─ building.js           // Classe bâtiment
  │  ├─ building-manager.js   // Gestion ville
  │  ├─ loot.js               // Système drops
  │  ├─ save-manager.js       // Sauvegardes
  │  ├─ ui.js                 // Interface utilisateur
  │  └─ utils.js              // Fonctions utilitaires
  │
  ├─ config/
  │  ├─ game-config.js        // Config générale
  │  ├─ combat-config.js      // Formules combat
  │  ├─ xp-config.js          // Progression XP
  │  ├─ zones-data.js         // Définitions zones
  │  ├─ monsters-data.js      // Stats monstres
  │  ├─ professions-data.js   // Métiers
  │  ├─ recipes-data.js       // Recettes craft
  │  ├─ buildings-data.js     // Bâtiments
  │  └─ loot-tables.js        // Tables de drops
  │
  ├─ css/
  │  ├─ main.css              // Styles principaux
  │  ├─ components.css        // Composants UI
  │  └─ animations.css        // Animations
  │
  └─ assets/
     └─ images/               // Images (placeholder pour MVP)
```

### Classes principales

#### 1. Game (Singleton)

```javascript
class Game {
  constructor() {
    this.player = new Player();
    this.combat = new Combat(this.player);
    this.zoneManager = new ZoneManager();
    this.professionManager = new ProfessionManager();
    this.buildingManager = new BuildingManager();
    this.saveManager = new SaveManager();
    this.ui = new UI();
  }

  init() {}
  update(deltaTime) {}
  save() {}
  load() {}
}
```

#### 2. Player

```javascript
class Player {
  constructor() {
    this.level = 1;
    this.xp = 0;
    this.stats = {
      hp: 100,
      maxHp: 100,
      force: 5,
      agility: 5,
      intelligence: 5,
      wisdom: 5,
      endurance: 5,
    };
    this.equipment = new Equipment();
    this.resources = new Resources();
  }

  attack(target) {}
  takeDamage(amount) {}
  gainXp(amount) {}
  levelUp() {}
}
```

#### 3. Combat (temps réel)

```javascript
class Combat {
  constructor(player) {
    this.player = player;
    this.currentMonster = null;
    this.lastPlayerAttack = 0;
    this.lastMonsterAttack = 0;
  }

  update(deltaTime) {
    // Gestion attaques automatiques basées sur vitesse
  }

  manualAttack() {
    // Clic manuel du joueur (phase initiale)
  }

  spawnMonster() {}
  onMonsterDeath() {}
  onPlayerDeath() {}
}
```

---

## 🧪 Tests Critiques

### Tests Semaine 1

- [ ] Clics infligent des dégâts au monstre
- [ ] Monstre meurt et respawn
- [ ] Stats s'affichent correctement
- [ ] Combat temps réel fonctionne
- [ ] Vitesse d'attaque basée sur Agilité
- [ ] Gain XP et level up
- [ ] Stats augmentent au level up

### Tests Semaine 2

- [ ] 3 zones accessibles
- [ ] Progression 10 monstres → zone suivante
- [ ] Clics métiers donnent ressources
- [ ] XP métier séparée fonctionne
- [ ] Craft équipement fonctionne
- [ ] Équipement augmente stats
- [ ] Outils (pioche/hache) augmentent récolte

### Tests Semaine 3

- [ ] Bâtiments produisent ressources/sec
- [ ] Amélioration bâtiments fonctionne
- [ ] Drops de monstres fonctionnent
- [ ] Probabilités de drops respectées
- [ ] Sauvegarde complète
- [ ] Chargement restaure état correct
- [ ] Offline progression basique
- [ ] UI responsive mobile

---

## 🚀 Lancement Post-MVP

### Phase 2 (Semaine 4-5) : Contenu étendu

- 10 zones au total
- Boss (zones 5 et 10)
- Quête déblocage auto-combat
- 5-6 types de ressources par métier
- 15-20 recettes de craft
- Bâtiments niveau 3-5

### Phase 3 (Semaine 6-7) : Features avancées

- Système de quêtes complet
- Pierres précieuses rares
- 3 métiers supplémentaires
- Amélioration visuelle ville

### Phase 4 (Semaine 8+) : Endgame

- Dragons et reproduction
- Prestige et guilde
- Donjons et raids
- Contenu infini

---

## 📊 Métriques de succès MVP

✅ **Jouabilité** : Joueur peut jouer 30+ minutes sans s'ennuyer - **ATTEINT**
✅ **Progression** : Sensation d'avancement clair (niveaux, zones, craft) - **ATTEINT**
✅ **Idle mechanics** : Bâtiments produisent pendant que joueur combat - **ATTEINT**
✅ **Performance** : 60 FPS constant - **ATTEINT**
✅ **Bugs** : Aucun bug bloquant, sauvegarde fiable - **ATTEINT**
⚠️ **Mobile** : Jouable sur smartphone - **À TESTER**

---

## 🎯 État d'avancement actuel (Mise à jour: Octobre 2025)

**MVP Progress: 85%** ✅

### Systèmes Core (100%) ✅

- ✅ Combat temps réel avec auto-combat
- ✅ Stats & progression (XP, level up)
- ✅ Création de personnage (4 classes)
- ✅ Métiers (3 métiers complets)
- ✅ Craft & équipement
- ✅ Ville & bâtiments (5 buildings)
- ✅ Dual storage system
- ✅ Sauvegarde complète

### Contenu (20%) ⚠️

- ✅ Région 1 complète (10 zones + boss)
- ⚠️ Régions 2-5 (EN COURS)
- 🔄 40 zones restantes à peupler

### Polish UI (60%) ⚠️

- ✅ Interface responsive
- ✅ Filtres inventaire
- ⚠️ Indicateurs rareté monstres
- ⚠️ Boss progress UI (X/100)

### Prochaines étapes

1. 🔄 Compléter régions 2-5 (priorité haute)
2. 🎨 Polish visuel combat
3. ⚖️ Pass d'équilibrage (HP, XP, drop rates, difficulté)
4. 🧪 Tests mobiles

---

## 🎯 Prochaine étape

**Question finale** : Es-tu prêt à commencer le développement maintenant ?

**Options** :

1. ✅ **OUI** → Je commence Sprint 1.1 (index.html + structure de base)
2. ⏸️ **Attends** → Tu veux ajuster quelque chose dans le plan ?
3. 📝 **Questions** → Tu as d'autres questions avant de démarrer ?

Dis-moi et on lance ! 🚀
