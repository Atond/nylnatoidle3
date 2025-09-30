# 🏗️ Architecture du Jeu - Idle Game

## 📐 Structure modulaire

### Classe principale : Game
```javascript
class Game {
  constructor() {
    this.cookies = 0;
    this.cookiesPerSecond = 0;
    this.buildings = new BuildingManager();
    this.upgrades = new UpgradeManager();
    this.achievements = new AchievementManager();
    this.statistics = new Statistics();
    this.saveManager = new SaveManager();
  }
}
```

### Système d'événements
```javascript
// EventEmitter personnalisé pour la communication entre modules
class GameEventEmitter extends EventTarget {
  emit(eventName, data) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
  
  on(eventName, callback) {
    this.addEventListener(eventName, callback);
  }
}
```

## 🏭 Gestion des bâtiments

### Structure d'un bâtiment
```javascript
class Building {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.baseCost = config.baseCost;
    this.baseProduction = config.baseProduction;
    this.costMultiplier = config.costMultiplier || 1.15;
    this.count = 0;
    this.unlocked = false;
  }
  
  getCurrentCost() {
    return Math.floor(this.baseCost * Math.pow(this.costMultiplier, this.count));
  }
  
  getCurrentProduction() {
    return this.baseProduction * this.count;
  }
}
```

### Configuration des bâtiments
```javascript
const BUILDINGS_CONFIG = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Automatically clicks for you',
    baseCost: 15,
    baseProduction: 0.1,
    unlockCondition: () => true
  },
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'A nice grandma to bake more cookies',
    baseCost: 100,
    baseProduction: 1,
    unlockCondition: (game) => game.cookies >= 50
  }
  // ... autres bâtiments
];
```

## 🔧 Système d'améliorations

### Types d'améliorations
1. **Production Multipliers** : Multiplie la production d'un type de bâtiment
2. **Click Multipliers** : Augmente la valeur des clics manuels
3. **Global Multipliers** : Affecte toute la production
4. **Unlock Upgrades** : Débloque de nouveaux bâtiments ou fonctionnalités

### Structure d'une amélioration
```javascript
class Upgrade {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.cost = config.cost;
    this.type = config.type; // 'production', 'click', 'global', 'unlock'
    this.target = config.target; // ID du bâtiment ciblé (si applicable)
    this.multiplier = config.multiplier;
    this.purchased = false;
    this.unlocked = false;
  }
  
  apply(game) {
    switch(this.type) {
      case 'production':
        // Appliquer le multiplicateur au bâtiment ciblé
        break;
      case 'click':
        // Augmenter la valeur des clics
        break;
      // ... autres types
    }
  }
}
```

## 💾 Système de sauvegarde

### Format de sauvegarde
```javascript
const saveData = {
  version: '1.0.0',
  timestamp: Date.now(),
  game: {
    cookies: this.cookies,
    totalCookiesEarned: this.totalCookiesEarned,
    buildings: this.buildings.getSaveData(),
    upgrades: this.upgrades.getSaveData(),
    achievements: this.achievements.getSaveData(),
    statistics: this.statistics.getSaveData(),
    settings: this.settings
  }
};
```

### Gestion des versions
```javascript
class SaveManager {
  migrate(saveData) {
    const migrations = {
      '1.0.0': (data) => data, // Version actuelle
      '0.9.0': (data) => this.migrateFrom090(data)
    };
    
    let currentData = saveData;
    const targetVersion = '1.0.0';
    
    while (currentData.version !== targetVersion) {
      const migration = migrations[currentData.version];
      if (!migration) {
        throw new Error(`Migration non trouvée pour la version ${currentData.version}`);
      }
      currentData = migration(currentData);
    }
    
    return currentData;
  }
}
```

## 📊 Système de statistiques

### Métriques à tracker
```javascript
class Statistics {
  constructor() {
    this.totalCookiesEarned = 0;
    this.totalClicks = 0;
    this.totalPlaytime = 0;
    this.buildingsPurchased = {};
    this.upgradesPurchased = [];
    this.achievementsUnlocked = [];
    this.sessionsPlayed = 0;
    this.recordCookiesPerSecond = 0;
  }
}
```

## 🎯 Système d'objectifs/Achievements

### Structure d'un achievement
```javascript
class Achievement {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.condition = config.condition; // Function qui retourne true/false
    this.reward = config.reward; // Optionnel : cookies bonus, multiplicateur, etc.
    this.unlocked = false;
    this.hidden = config.hidden || false;
  }
  
  check(game) {
    if (!this.unlocked && this.condition(game)) {
      this.unlock(game);
      return true;
    }
    return false;
  }
}
```

## ⚡ Boucle de jeu principale

### Game Loop optimisé
```javascript
class GameLoop {
  constructor(game) {
    this.game = game;
    this.lastUpdate = performance.now();
    this.isRunning = false;
    this.targetFPS = 60;
    this.deltaTime = 0;
  }
  
  start() {
    this.isRunning = true;
    this.lastUpdate = performance.now();
    this.loop();
  }
  
  loop(currentTime = performance.now()) {
    if (!this.isRunning) return;
    
    this.deltaTime = (currentTime - this.lastUpdate) / 1000; // en secondes
    this.lastUpdate = currentTime;
    
    // Logique de jeu
    this.update();
    
    // Rendu UI (pas à chaque frame pour optimiser)
    if (currentTime % (1000 / 30) < 16) { // ~30 FPS pour l'UI
      this.render();
    }
    
    requestAnimationFrame((time) => this.loop(time));
  }
  
  update() {
    // Production automatique
    const production = this.game.calculateProduction();
    this.game.addCookies(production * this.deltaTime);
    
    // Vérification des achievements
    this.game.achievements.checkAll(this.game);
    
    // Auto-sauvegarde périodique
    this.game.saveManager.autoSave();
  }
}
```

## 🔧 Prompts spécifiques pour l'architecture

### Pour ajouter un nouveau système :
```
"Implémenter le système [nom] pour l'idle game avec :
- Classe principale suivant les patterns existants
- Intégration avec le système d'événements GameEventEmitter
- Méthodes de sauvegarde/chargement compatibles
- Documentation complète des méthodes publiques
- Tests de validation pour les cas limites"
```

### Pour refactoriser un module :
```
"Refactoriser le module [nom] en maintenant :
- L'interface publique existante (pas de breaking changes)
- La compatibilité avec les sauvegardes existantes
- Les performances actuelles ou meilleures
- La même structure d'événements
- Une couverture de tests équivalente"
```

### Pour optimiser les performances :
```
"Optimiser les performances du module [nom] :
- Identifier les goulots d'étranglement avec console.time()
- Réduire la complexité algorithmique si possible
- Implémenter la mise en cache pour les calculs coûteux
- Éviter les fuites mémoire (event listeners, intervals)
- Maintenir la lisibilité du code"
```

## 📋 Checklist d'implémentation

### Avant d'ajouter une nouvelle fonctionnalité :
- [ ] Définir l'interface publique
- [ ] Documenter le comportement attendu
- [ ] Identifier les dépendances
- [ ] Planifier l'intégration avec l'UI
- [ ] Prévoir la sauvegarde/chargement
- [ ] Considérer l'impact sur les performances

### Après l'implémentation :
- [ ] Tester les cas normaux
- [ ] Tester les cas limites
- [ ] Vérifier la sauvegarde/chargement
- [ ] Valider l'intégration UI
- [ ] Documenter les API publiques
- [ ] Tester sur différents navigateurs