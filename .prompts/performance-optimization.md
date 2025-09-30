# ⚡ Optimisation des Performances - Idle Game

## 🎯 Objectifs de performance

### Métriques cibles
- **FPS** : Maintenir 60 FPS constant
- **Memory** : < 100MB d'utilisation RAM
- **CPU** : < 10% d'utilisation processeur en idle
- **Storage** : Sauvegarde < 1MB
- **Load time** : < 2 secondes au démarrage

## 🔄 Optimisation de la boucle de jeu

### Séparation Update/Render
```javascript
class OptimizedGameLoop {
  constructor() {
    this.updateRate = 60; // Logic à 60 FPS
    this.renderRate = 30; // UI à 30 FPS pour économiser
    this.lastUpdate = 0;
    this.lastRender = 0;
  }
  
  loop(timestamp) {
    // Update logic si nécessaire
    if (timestamp - this.lastUpdate >= 1000 / this.updateRate) {
      this.updateGame(timestamp - this.lastUpdate);
      this.lastUpdate = timestamp;
    }
    
    // Render UI moins fréquemment
    if (timestamp - this.lastRender >= 1000 / this.renderRate) {
      this.renderUI();
      this.lastRender = timestamp;
    }
    
    requestAnimationFrame(this.loop.bind(this));
  }
}
```

### Batch des calculs coûteux
```javascript
// ❌ Recalcul à chaque frame
function updateBuildings() {
  buildings.forEach(building => {
    building.currentProduction = calculateProduction(building);
    updateBuildingUI(building);
  });
}

// ✅ Calculs groupés et mise en cache
class ProductionCalculator {
  constructor() {
    this.cache = new Map();
    this.isDirty = false;
  }
  
  recalculateIfNeeded() {
    if (!this.isDirty) return;
    
    this.cache.clear();
    buildings.forEach(building => {
      this.cache.set(building.id, this.calculateProduction(building));
    });
    
    this.isDirty = false;
  }
  
  markDirty() {
    this.isDirty = true;
  }
}
```

## 💾 Optimisation du stockage

### Compression des sauvegardes
```javascript
class SaveOptimizer {
  compress(gameState) {
    // Supprimer les données redondantes
    const optimized = {
      v: gameState.version,
      c: gameState.cookies,
      b: gameState.buildings.map(b => [b.id, b.count]), // [id, count] seulement
      u: gameState.upgrades.filter(u => u.purchased).map(u => u.id),
      t: Date.now()
    };
    
    return JSON.stringify(optimized);
  }
  
  decompress(compressedData) {
    const data = JSON.parse(compressedData);
    
    return {
      version: data.v,
      cookies: data.c,
      buildings: this.reconstructBuildings(data.b),
      upgrades: this.reconstructUpgrades(data.u),
      timestamp: data.t
    };
  }
}
```

### Sauvegarde différentielle
```javascript
class DifferentialSave {
  constructor() {
    this.baseline = null;
    this.lastSave = null;
  }
  
  createDelta(currentState) {
    if (!this.lastSave) {
      this.baseline = currentState;
      this.lastSave = currentState;
      return { type: 'full', data: currentState };
    }
    
    const delta = this.computeDifference(this.lastSave, currentState);
    this.lastSave = currentState;
    
    return { type: 'delta', data: delta };
  }
}
```

## 🖼️ Optimisation de l'interface

### Virtual Scrolling pour les listes longues
```javascript
class VirtualList {
  constructor(container, itemHeight, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.visibleItems = [];
    this.scrollTop = 0;
  }
  
  update(data) {
    const containerHeight = this.container.clientHeight;
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / this.itemHeight) + 1,
      data.length
    );
    
    // Ne rendre que les éléments visibles
    this.renderVisibleItems(data.slice(startIndex, endIndex), startIndex);
  }
}
```

### Debounce des mises à jour UI
```javascript
class UIUpdateManager {
  constructor() {
    this.pendingUpdates = new Set();
    this.isUpdateScheduled = false;
  }
  
  requestUpdate(component) {
    this.pendingUpdates.add(component);
    
    if (!this.isUpdateScheduled) {
      this.isUpdateScheduled = true;
      requestAnimationFrame(() => this.flushUpdates());
    }
  }
  
  flushUpdates() {
    this.pendingUpdates.forEach(component => component.render());
    this.pendingUpdates.clear();
    this.isUpdateScheduled = false;
  }
}
```

## 🧮 Optimisation des calculs

### Mémoization des calculs coûteux
```javascript
function memoize(fn, keyGenerator = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyGenerator(...args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    // Éviter la croissance infinie du cache
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
}

// Usage
const memoizedCalculateProduction = memoize(calculateProduction, 
  (buildingCount, upgradeLevel) => `${buildingCount}-${upgradeLevel}`
);
```

### Pool d'objets pour éviter GC
```javascript
class ParticlePool {
  constructor(size = 100) {
    this.pool = [];
    this.active = [];
    
    // Pré-créer les objets
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createParticle());
    }
  }
  
  acquire() {
    if (this.pool.length > 0) {
      const particle = this.pool.pop();
      this.active.push(particle);
      return particle;
    }
    
    // Créer un nouveau si le pool est vide
    const particle = this.createParticle();
    this.active.push(particle);
    return particle;
  }
  
  release(particle) {
    const index = this.active.indexOf(particle);
    if (index > -1) {
      this.active.splice(index, 1);
      particle.reset(); // Remettre à l'état initial
      this.pool.push(particle);
    }
  }
}
```

## 📊 Monitoring des performances

### Performance Profiler
```javascript
class PerformanceProfiler {
  constructor() {
    this.metrics = {};
    this.isEnabled = false;
  }
  
  start(label) {
    if (!this.isEnabled) return;
    
    if (!this.metrics[label]) {
      this.metrics[label] = {
        calls: 0,
        totalTime: 0,
        averageTime: 0,
        maxTime: 0
      };
    }
    
    return performance.now();
  }
  
  end(label, startTime) {
    if (!this.isEnabled || startTime === undefined) return;
    
    const duration = performance.now() - startTime;
    const metric = this.metrics[label];
    
    metric.calls++;
    metric.totalTime += duration;
    metric.averageTime = metric.totalTime / metric.calls;
    metric.maxTime = Math.max(metric.maxTime, duration);
  }
  
  getReport() {
    return Object.entries(this.metrics)
      .sort(([,a], [,b]) => b.totalTime - a.totalTime)
      .map(([label, metric]) => ({
        label,
        ...metric,
        averageTime: parseFloat(metric.averageTime.toFixed(2))
      }));
  }
}

// Usage avec décorateur
function profile(label) {
  return function(target, propertyName, descriptor) {
    const method = descriptor.value;
    
    descriptor.value = function(...args) {
      const startTime = profiler.start(label || `${target.constructor.name}.${propertyName}`);
      const result = method.apply(this, args);
      profiler.end(label || `${target.constructor.name}.${propertyName}`, startTime);
      return result;
    };
  };
}
```

### Memory Leak Detection
```javascript
class MemoryMonitor {
  constructor() {
    this.checkInterval = null;
    this.samples = [];
    this.maxSamples = 100;
  }
  
  startMonitoring() {
    this.checkInterval = setInterval(() => {
      if (performance.memory) {
        const sample = {
          timestamp: Date.now(),
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        };
        
        this.samples.push(sample);
        
        if (this.samples.length > this.maxSamples) {
          this.samples.shift();
        }
        
        this.detectLeaks();
      }
    }, 5000); // Check every 5 seconds
  }
  
  detectLeaks() {
    if (this.samples.length < 10) return;
    
    const recent = this.samples.slice(-5);
    const older = this.samples.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, s) => sum + s.used, 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + s.used, 0) / older.length;
    
    const growthRate = (recentAvg - olderAvg) / olderAvg;
    
    if (growthRate > 0.1) { // 10% growth
      console.warn('Potential memory leak detected:', {
        growthRate: (growthRate * 100).toFixed(1) + '%',
        currentUsage: (recentAvg / 1024 / 1024).toFixed(1) + 'MB'
      });
    }
  }
}
```

## 🔧 Prompts d'optimisation spécifiques

### Pour identifier les goulots d'étranglement :
```
"Analyser les performances du module [nom] et identifier :
- Les fonctions qui prennent le plus de temps d'exécution
- Les allocations mémoire inutiles
- Les calculs redondants
- Les opportunités de mise en cache
Proposer des optimisations concrètes avec before/after."
```

### Pour optimiser une fonction spécifique :
```
"Optimiser la fonction [nom] qui est appelée [fréquence] fois par seconde :
- Réduire la complexité algorithmique si possible
- Implémenter la mémoization pour les calculs coûteux
- Éviter les allocations d'objets inutiles
- Maintenir la lisibilité et la maintenabilité du code"
```

### Pour résoudre un problème de performance :
```
"Le jeu lag quand [situation]. Analyser et corriger :
- Mesurer les performances avec console.time()
- Identifier la cause racine du ralentissement
- Proposer une solution qui maintient les 60 FPS
- Vérifier que la correction n'introduit pas de bugs"
```

## 📋 Checklist d'optimisation

### Performance générale :
- [ ] Boucle de jeu optimisée (60 FPS stable)
- [ ] Pas de calculs inutiles dans la boucle principale
- [ ] Event listeners correctement nettoyés
- [ ] Animations utilisant requestAnimationFrame

### Mémoire :
- [ ] Pas de fuites mémoire détectables
- [ ] Pool d'objets pour les éléments fréquents
- [ ] Références circulaires évitées
- [ ] Cache avec limite de taille

### Stockage :
- [ ] Sauvegardes compressées
- [ ] Pas de données redondantes
- [ ] Auto-save optimisé (pas trop fréquent)
- [ ] Validation des données chargées

### Interface :
- [ ] Virtual scrolling pour les longues listes
- [ ] Debounce des mises à jour fréquentes
- [ ] CSS optimisé (éviter les reflows)
- [ ] Images optimisées et lazy-loaded