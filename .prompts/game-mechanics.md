# 🎨 Mécaniques de Jeu - Idle Game

## 🍪 Mécaniques Core d'un Idle Game

### 1. Système de Ressource Principal
La ressource principale (cookies, gold, energy) qui :
- S'accumule par clics manuels
- Se génère automatiquement via les bâtiments
- Sert de monnaie pour les achats
- Augmente de façon exponentielle

### 2. Production Automatique
- **Bâtiments générateurs** : Produisent la ressource principale
- **Coût croissant** : Prix augmente à chaque achat (ex: coût × 1.15^quantité)
- **Production par seconde** : Affichage en temps réel des gains
- **Efficacité** : Ratio coût/production pour guider les décisions

### 3. Système d'Amélioration (Upgrades)
- **Multiplicateurs de production** : Doublent ou triplent l'efficacité
- **Amélioration des clics** : Augmentent la valeur des clics manuels
- **Déblocages** : Rendent disponibles de nouveaux bâtiments
- **Bonus globaux** : Affectent toute la production

## 📈 Progression et Équilibrage

### Courbe de progression exponentielle
```javascript
// Exemple de formules d'équilibrage
const BUILDING_CONFIG = {
  cursor: {
    baseCost: 15,
    baseProduction: 0.1,
    costMultiplier: 1.15
  },
  grandma: {
    baseCost: 100,
    baseProduction: 1,
    costMultiplier: 1.15,
    unlockCondition: (cookies) => cookies >= 50
  },
  farm: {
    baseCost: 1100,
    baseProduction: 8,
    costMultiplier: 1.15,
    unlockCondition: (totalCookies) => totalCookies >= 1000
  }
};

// Progression des upgrades
const UPGRADE_TIERS = {
  early: { cost: building.baseCost * 10, multiplier: 2 },
  mid: { cost: building.baseCost * 100, multiplier: 3 },
  late: { cost: building.baseCost * 1000, multiplier: 5 }
};
```

### Rythme de déblocage
```
Minute 1-5: Découverte des clics et premiers cursors
Minute 5-15: Déblocage des grandmas et premiers upgrades
Minute 15-45: Introduction des farms et bâtiments avancés
Heure 1+: Mécaniques avancées (prestige, achievements)
```

## 🎯 Système de Motivation

### Boucle de gameplay addictive
1. **Accumulation** → Voir les nombres augmenter
2. **Objectif** → Viser le prochain achat important
3. **Achat** → Satisfaction immédiate + boost de production
4. **Nouvelle cible** → Cycle qui se répète

### Psychology des récompenses
```javascript
// Système de récompenses variées
const REWARD_TYPES = {
  immediate: 'Augmentation instantanée de production',
  milestone: 'Déblocage de nouveaux contenus',
  visual: 'Animations et effets visuels gratifiants',
  progression: 'Sens d\'avancement et de maîtrise'
};
```

## 🏆 Système d'Achievements

### Catégories d'achievements
```javascript
const ACHIEVEMENT_CATEGORIES = {
  production: {
    id: 'baker',
    name: 'Baker',
    description: 'Bake 1,000 cookies',
    condition: (game) => game.statistics.totalCookiesBaked >= 1000,
    reward: { type: 'multiplier', value: 1.1 }
  },
  
  buildings: {
    id: 'cursor-master',
    name: 'Cursor Master', 
    description: 'Own 100 cursors',
    condition: (game) => game.buildings.getCount('cursor') >= 100
  },
  
  upgrades: {
    id: 'upgrade-collector',
    name: 'Upgrade Collector',
    description: 'Purchase 20 upgrades',
    condition: (game) => game.upgrades.getPurchasedCount() >= 20
  },
  
  special: {
    id: 'fast-clicker',
    name: 'Fast Clicker',
    description: 'Click 10 times in 1 second',
    condition: (game) => game.clicksInLastSecond >= 10,
    hidden: true // Découvert par hasard
  }
};
```

## 🔄 Système de Prestige/Reset

### Mécaniques avancées pour la rétention
```javascript
class PrestigeSystem {
  constructor() {
    this.heavenlyChips = 0;
    this.prestige = 0;
  }
  
  calculatePrestigeGain(totalCookies) {
    // Formule commune : racine cubique des cookies totaux
    return Math.floor(Math.pow(totalCookies / 1e12, 1/3));
  }
  
  getPrestigeBonus() {
    // Chaque point de prestige donne +1% de production
    return 1 + (this.heavenlyChips * 0.01);
  }
  
  shouldRecommendPrestige(game) {
    const currentGain = this.calculatePrestigeGain(game.statistics.totalCookies);
    const currentBonus = this.getPrestigeBonus();
    
    // Recommander si le gain est substantiel
    return currentGain > currentBonus * 0.1;
  }
}
```

## 🎪 Mécaniques Spéciales

### Événements temporaires
```javascript
class RandomEvents {
  constructor() {
    this.activeEvents = [];
    this.eventChance = 0.001; // 0.1% par seconde
  }
  
  checkForEvents(game) {
    if (Math.random() < this.eventChance) {
      this.triggerRandomEvent(game);
    }
  }
  
  triggerRandomEvent(game) {
    const events = [
      {
        name: 'Golden Cookie',
        description: 'Click for bonus cookies!',
        duration: 10000, // 10 secondes
        effect: () => game.cookies *= 1.1
      },
      {
        name: 'Production Frenzy',
        description: 'Double production for 30 seconds!',
        duration: 30000,
        effect: () => game.productionMultiplier = 2
      }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    this.activateEvent(event);
  }
}
```

### Mini-jeux intégrés
```javascript
// Exemple : Système de jardinage (à la Cookie Clicker)
class GardenMinigame {
  constructor() {
    this.plots = Array(6).fill(null).map(() => Array(6).fill(null));
    this.seeds = ['baker_wheat', 'thumbcorn', 'cronerice'];
    this.maturityTime = 30 * 60 * 1000; // 30 minutes
  }
  
  plantSeed(x, y, seedType) {
    if (this.plots[x][y] === null) {
      this.plots[x][y] = {
        type: seedType,
        plantedAt: Date.now(),
        mature: false
      };
    }
  }
  
  checkMaturity() {
    this.plots.forEach((row, x) => {
      row.forEach((plant, y) => {
        if (plant && !plant.mature) {
          if (Date.now() - plant.plantedAt >= this.maturityTime) {
            plant.mature = true;
            this.onPlantMature(plant, x, y);
          }
        }
      });
    });
  }
}
```

## 📊 Métriques et Analytics

### Données importantes à tracker
```javascript
class GameAnalytics {
  constructor() {
    this.metrics = {
      // Engagement
      sessionLength: 0,
      clicksPerSession: 0,
      purchasesPerSession: 0,
      
      // Progression
      timeToFirstBuilding: null,
      timeToFirstUpgrade: null,
      buildingsOwned: {},
      
      // Monétisation (si applicable)
      premiumFeaturesUsed: [],
      
      // Rétention
      dailyActiveTime: [],
      lastPlayDate: null,
      streakDays: 0
    };
  }
  
  trackEvent(eventName, data = {}) {
    const event = {
      timestamp: Date.now(),
      session: this.getCurrentSessionId(),
      event: eventName,
      data: data
    };
    
    // Stocker localement ou envoyer à un service
    this.storeEvent(event);
  }
}
```

## 🎮 Formules d'Équilibrage Éprouvées

### Coûts des bâtiments
```javascript
// Coût du Nième bâtiment
function getBuildingCost(baseCost, count, multiplier = 1.15) {
  return Math.floor(baseCost * Math.pow(multiplier, count));
}

// Coût total pour acheter N bâtiments
function getTotalCostForN(baseCost, currentCount, quantity, multiplier = 1.15) {
  let total = 0;
  for (let i = 0; i < quantity; i++) {
    total += getBuildingCost(baseCost, currentCount + i, multiplier);
  }
  return Math.floor(total);
}
```

### Temps de payback
```javascript
// Temps nécessaire pour rentabiliser un achat
function getPaybackTime(cost, productionIncrease) {
  return cost / productionIncrease; // en secondes
}

// Efficacité d'un bâtiment (production par cookie dépensé)
function getEfficiency(baseCost, baseProduction, count, multiplier = 1.15) {
  const cost = getBuildingCost(baseCost, count, multiplier);
  return baseProduction / cost;
}
```

## 🔧 Prompts spécifiques pour les mécaniques

### Pour équilibrer une nouvelle fonctionnalité :
```
"Créer l'équilibrage pour [fonctionnalité] en respectant :
- Progression exponentielle cohérente avec les autres éléments
- Temps de payback raisonnable (30 secondes à 5 minutes selon le stade)
- Courbe d'apprentissage progressive
- Pas de stratégie dominante qui rend les autres obsolètes
Fournir les formules mathématiques et des exemples concrets."
```

### Pour améliorer l'engagement :
```
"Analyser les mécaniques d'engagement actuelles et proposer :
- Points de friction où les joueurs pourraient décrocher
- Nouvelles récompenses pour maintenir la motivation
- Rythme de déblocage optimal pour éviter l'ennui
- Mécaniques de comeback pour les joueurs qui reviennent après une pause"
```

### Pour implémenter un système de progression :
```
"Implémenter le système [nom] avec :
- Mécaniques claires et intuitives
- Feedback visuel immédiat
- Progression mesurable et gratifiante
- Équilibrage testé sur différents styles de jeu
- Documentation des formules pour ajustements futurs"
```