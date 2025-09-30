# 🧪 Stratégies de Test - Idle Game

## 🎯 Types de tests essentiels

### 1. Tests unitaires (Logique métier)
- Calculs de production
- Mécaniques de coût
- Système d'upgrades
- Algorithmes de sauvegarde

### 2. Tests d'intégration (Interaction entre modules)
- Communication Game ↔ UI
- Sauvegarde ↔ Chargement
- Events ↔ Achievements

### 3. Tests end-to-end (Scénarios complets)
- Session de jeu complète
- Scénarios de progression
- Edge cases (très grandes valeurs)

## 🔬 Framework de test simple

### Test Runner minimal
```javascript
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, errors: [] };
  }
  
  test(name, testFunction) {
    this.tests.push({ name, fn: testFunction });
  }
  
  async run() {
    console.group('🧪 Running Tests');
    
    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        this.results.passed++;
      } catch (error) {
        console.error(`❌ ${test.name}:`, error.message);
        this.results.failed++;
        this.results.errors.push({ test: test.name, error });
      }
    }
    
    console.groupEnd();
    this.printSummary();
    return this.results;
  }
  
  printSummary() {
    const total = this.results.passed + this.results.failed;
    console.log(`\n📊 Tests: ${this.results.passed}/${total} passed`);
    
    if (this.results.failed > 0) {
      console.log('❌ Failed tests:');
      this.results.errors.forEach(({ test, error }) => {
        console.log(`  - ${test}: ${error.message}`);
      });
    }
  }
}

// Assertions simples
const assert = {
  equals: (actual, expected, message = '') => {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
  },
  
  approximately: (actual, expected, tolerance = 0.01, message = '') => {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(`Expected ~${expected}, got ${actual}. ${message}`);
    }
  },
  
  throws: (fn, expectedError, message = '') => {
    try {
      fn();
      throw new Error(`Expected function to throw. ${message}`);
    } catch (error) {
      if (expectedError && !error.message.includes(expectedError)) {
        throw new Error(`Expected error containing "${expectedError}", got "${error.message}"`);
      }
    }
  }
};
```

## 🧮 Tests de calculs critiques

### Tests de production
```javascript
// test/production.test.js
const testRunner = new TestRunner();

testRunner.test('Building production calculation', () => {
  const building = new Building({
    id: 'cursor',
    baseCost: 15,
    baseProduction: 0.1,
    costMultiplier: 1.15
  });
  
  building.count = 10;
  
  // Test production de base
  assert.equals(building.getCurrentProduction(), 1.0, 'Base production incorrect');
  
  // Test coût avec multiplicateur
  const expectedCost = Math.floor(15 * Math.pow(1.15, 10));
  assert.equals(building.getCurrentCost(), expectedCost, 'Cost calculation incorrect');
});

testRunner.test('Game total production', () => {
  const game = new Game();
  
  // Ajouter quelques bâtiments
  game.buildings.add('cursor', 5);   // 5 * 0.1 = 0.5/s
  game.buildings.add('grandma', 2);  // 2 * 1.0 = 2.0/s
  
  const totalProduction = game.calculateTotalProduction();
  assert.equals(totalProduction, 2.5, 'Total production incorrect');
});

testRunner.test('Production with upgrades', () => {
  const game = new Game();
  
  game.buildings.add('cursor', 10);
  
  // Appliquer un upgrade qui double la production des cursors
  const upgrade = new Upgrade({
    id: 'cursor-double',
    type: 'production',
    target: 'cursor',
    multiplier: 2
  });
  
  game.upgrades.purchase(upgrade);
  
  const expectedProduction = 10 * 0.1 * 2; // base * count * multiplier
  assert.equals(game.calculateTotalProduction(), expectedProduction);
});
```

### Tests de grandes valeurs (BigNumber)
```javascript
testRunner.test('Large number handling', () => {
  const game = new Game();
  
  // Simuler une progression avancée
  game.cookies = 1e15; // 1 quadrillion
  
  // Tester l'achat d'un bâtiment très coûteux
  const expensiveBuilding = game.buildings.getBuilding('antimatter');
  const cost = expensiveBuilding.getCurrentCost();
  
  assert.equals(game.canAfford(cost), true, 'Should afford expensive building');
  
  game.purchase(expensiveBuilding);
  
  assert.equals(
    game.cookies, 
    1e15 - cost, 
    'Cookies not deducted correctly'
  );
});

testRunner.test('Number formatting', () => {
  assert.equals(formatNumber(1234), '1,234');
  assert.equals(formatNumber(1234567), '1.23M');
  assert.equals(formatNumber(1e12), '1.00T');
  assert.equals(formatNumber(1e21), '1.00Sx');
});
```

## 💾 Tests de persistance

### Tests de sauvegarde/chargement
```javascript
testRunner.test('Save and load game state', () => {
  const originalGame = new Game();
  
  // Configurer un état de jeu
  originalGame.cookies = 12345;
  originalGame.buildings.add('cursor', 5);
  originalGame.buildings.add('grandma', 2);
  originalGame.upgrades.purchase('cursor-double');
  
  // Sauvegarder
  const saveData = originalGame.save();
  
  // Créer un nouveau jeu et charger
  const loadedGame = new Game();
  loadedGame.load(saveData);
  
  // Vérifier que l'état est identique
  assert.equals(loadedGame.cookies, 12345, 'Cookies not loaded correctly');
  assert.equals(loadedGame.buildings.getCount('cursor'), 5, 'Cursor count incorrect');
  assert.equals(loadedGame.buildings.getCount('grandma'), 2, 'Grandma count incorrect');
  assert.equals(loadedGame.upgrades.isPurchased('cursor-double'), true, 'Upgrade not loaded');
});

testRunner.test('Save data compression', () => {
  const game = new Game();
  game.cookies = 1e10;
  
  // Ajouter beaucoup de données
  for (let i = 0; i < 100; i++) {
    game.buildings.add('cursor', 1);
  }
  
  const saveData = game.save();
  const compressedData = game.saveManager.compress(saveData);
  
  // Vérifier que la compression réduit la taille
  assert.equals(
    compressedData.length < saveData.length, 
    true, 
    'Compression should reduce size'
  );
  
  // Vérifier que la décompression fonctionne
  const decompressed = game.saveManager.decompress(compressedData);
  const restoredGame = new Game();
  restoredGame.load(decompressed);
  
  assert.equals(restoredGame.cookies, 1e10, 'Decompression failed');
});
```

## 🎮 Tests de gameplay

### Tests de progression
```javascript
testRunner.test('Early game progression', () => {
  const game = new Game();
  
  // Simuler les premiers clics
  for (let i = 0; i < 15; i++) {
    game.click(); // +1 cookie par clic
  }
  
  assert.equals(game.cookies, 15, 'Manual clicks not working');
  assert.equals(game.canAfford(15), true, 'Should afford first cursor');
  
  // Acheter le premier cursor
  game.purchaseBuilding('cursor');
  
  assert.equals(game.cookies, 0, 'Cost not deducted');
  assert.equals(game.buildings.getCount('cursor'), 1, 'Cursor not added');
  
  // Attendre un peu et vérifier la production automatique
  game.update(10); // 10 secondes
  
  const expectedCookies = 1 * 0.1 * 10; // 1 cursor * 0.1 prod * 10 sec
  assert.approximately(game.cookies, expectedCookies, 0.1, 'Auto-production not working');
});

testRunner.test('Achievement unlocking', () => {
  const game = new Game();
  
  // Simuler l'obtention d'un achievement
  game.cookies = 1000;
  
  const achievement = game.achievements.getAchievement('first-thousand');
  assert.equals(achievement.unlocked, false, 'Achievement should be locked initially');
  
  // Vérifier les achievements
  game.achievements.checkAll();
  
  assert.equals(achievement.unlocked, true, 'Achievement should be unlocked');
  assert.equals(game.statistics.achievementsUnlocked.includes('first-thousand'), true);
});
```

## 🚀 Tests de performance

### Tests de charge
```javascript
testRunner.test('Performance with many buildings', async () => {
  const game = new Game();
  
  // Ajouter beaucoup de bâtiments
  const buildingTypes = ['cursor', 'grandma', 'farm', 'mine'];
  buildingTypes.forEach(type => {
    for (let i = 0; i < 1000; i++) {
      game.buildings.add(type, 1);
    }
  });
  
  // Mesurer le temps d'une mise à jour
  const startTime = performance.now();
  
  for (let i = 0; i < 100; i++) {
    game.update(0.016); // ~60 FPS
  }
  
  const endTime = performance.now();
  const averageUpdateTime = (endTime - startTime) / 100;
  
  // Une mise à jour ne devrait pas prendre plus de 16ms (60 FPS)
  assert.equals(
    averageUpdateTime < 16, 
    true, 
    `Update too slow: ${averageUpdateTime.toFixed(2)}ms`
  );
});

testRunner.test('Memory usage stability', () => {
  const game = new Game();
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  
  // Simuler une session de jeu intensive
  for (let i = 0; i < 1000; i++) {
    game.click();
    game.update(0.1);
    
    if (i % 100 === 0) {
      game.save(); // Sauvegardes périodiques
    }
  }
  
  // Forcer le garbage collection si possible
  if (window.gc) window.gc();
  
  const finalMemory = performance.memory?.usedJSHeapSize || 0;
  const memoryGrowth = finalMemory - initialMemory;
  
  // La croissance mémoire ne devrait pas être excessive (< 10MB)
  assert.equals(
    memoryGrowth < 10 * 1024 * 1024, 
    true, 
    `Memory growth too high: ${(memoryGrowth / 1024 / 1024).toFixed(2)}MB`
  );
});
```

## 🔧 Prompts de test spécifiques

### Pour créer des tests pour une nouvelle fonctionnalité :
```
"Créer une suite de tests complète pour [fonctionnalité] incluant :
- Tests unitaires pour chaque méthode publique
- Tests de cas limites (valeurs extrêmes, données invalides)
- Tests d'intégration avec les autres modules
- Tests de performance si applicable
- Assertions claires avec messages d'erreur descriptifs"
```

### Pour déboguer un test qui échoue :
```
"Le test '[nom du test]' échoue avec l'erreur '[message d'erreur]'.
Analyser :
- Pourquoi le comportement attendu diffère du comportement réel
- Si le test est correct ou si c'est le code qui a un bug
- Comment corriger le problème avec un impact minimal
- Si d'autres tests pourraient être affectés"
```

### Pour tester les cas d'erreur :
```
"Créer des tests robustes pour [module] qui valident :
- La gestion des données corrompues ou manquantes
- Le comportement avec des valeurs négatives ou nulles
- La récupération après des erreurs inattendues
- La validation des entrées utilisateur
- Les timeouts et échecs de réseau (si applicable)"
```

## 📋 Checklist de tests

### Avant de livrer une fonctionnalité :
- [ ] Tests unitaires passent à 100%
- [ ] Tests d'intégration validés
- [ ] Cas limites testés
- [ ] Performance acceptable
- [ ] Pas de régression sur les fonctionnalités existantes

### Tests de régression périodiques :
- [ ] Sauvegarde/chargement de différentes versions
- [ ] Compatibilité avec les navigateurs cibles
- [ ] Performance avec de gros volumes de données
- [ ] Interface responsive sur différents écrans
- [ ] Accessibilité (contraste, navigation clavier)