# 🐛 Stratégie de Débogage - Idle Game

## 📋 Template de rapport de bug

Quand vous rencontrez un bug, utilisez ce format :

```
🔴 **BUG DÉTECTÉ**
- **Fichier(s) concerné(s)** : [nom des fichiers]
- **Fonction/Méthode** : [nom de la fonction problématique]
- **Comportement actuel** : [ce qui se passe]
- **Comportement attendu** : [ce qui devrait se passer]
- **Étapes pour reproduire** : 
  1. [étape 1]
  2. [étape 2]
  3. [étape 3]
- **Console d'erreur** : [messages d'erreur JavaScript]
- **Navigateur testé** : [Chrome/Firefox/Safari/Edge]
```

## 🔍 Méthodologie de débogage

### 1. Identification
- **Isoler** le problème : une seule fonctionnalité à la fois
- **Reproduire** de manière consistante
- **Vérifier** les logs de console (F12)
- **Tester** sur navigateur propre (mode incognito)

### 2. Analyse
- **Tracer** le flux d'exécution avec console.log()
- **Vérifier** les valeurs des variables à chaque étape
- **Examiner** l'état des objets (JSON.stringify pour debug)
- **Contrôler** les conditions et les boucles

### 3. Correction
- **Appliquer** le principe de moindre modification
- **Tester** immédiatement après chaque changement
- **Vérifier** que ça ne casse pas d'autres fonctionnalités
- **Nettoyer** les console.log() de débogage

## 🚨 Bugs courants dans les idle games

### Problèmes de calcul
```javascript
// ❌ Problème : overflow des nombres
let cookies = 1e308; // Infinity

// ✅ Solution : utiliser BigNumber ou limites
const MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER;
```

### Problèmes de timing
```javascript
// ❌ Problème : setInterval non nettoyé
setInterval(gameLoop, 1000);

// ✅ Solution : gérer les références
const gameInterval = setInterval(gameLoop, 1000);
// Plus tard : clearInterval(gameInterval);
```

### Problèmes de sauvegarde
```javascript
// ❌ Problème : données corrompues
localStorage.setItem('save', gameData);

// ✅ Solution : validation avant sauvegarde
try {
  const jsonString = JSON.stringify(gameData);
  localStorage.setItem('save', jsonString);
} catch (error) {
  console.error('Erreur de sauvegarde:', error);
}
```

### Problèmes d'UI
```javascript
// ❌ Problème : UI non synchronisée
building.count++;

// ✅ Solution : mise à jour immédiate
building.count++;
updateBuildingDisplay(building);
```

## 🛠️ Outils de débogage recommandés

### Console JavaScript
```javascript
// Affichage de variables
console.log('Variable:', variable);

// Affichage d'objets
console.table(buildings);

// Groupement de logs
console.group('Production Calculation');
console.log('Base production:', base);
console.log('Multipliers:', multipliers);
console.groupEnd();

// Temps d'exécution
console.time('save-operation');
// ... code à mesurer ...
console.timeEnd('save-operation');
```

### Breakpoints conditionnels
```javascript
// Dans DevTools, clic droit sur numéro de ligne
// Condition : building.id === 'cursor' && building.count > 10
```

### Validation des données
```javascript
function validateGameState(gameState) {
  if (!gameState) return false;
  if (typeof gameState.cookies !== 'number') return false;
  if (!Array.isArray(gameState.buildings)) return false;
  return true;
}
```

## 🔄 Processus de test

### Tests de régression
Après chaque correction :
1. **Tester** la fonctionnalité corrigée
2. **Vérifier** que les fonctionnalités liées marchent toujours
3. **Jouer** 2-3 minutes pour détecter des problèmes subtils
4. **Sauvegarder/Recharger** pour tester la persistance

### Tests de performance
```javascript
// Mesurer les FPS
let lastTime = performance.now();
function measureFPS() {
  const currentTime = performance.now();
  const fps = 1000 / (currentTime - lastTime);
  lastTime = currentTime;
  return fps;
}
```

## 🎯 Prompts de débogage efficaces

### Pour l'analyse de bug :
```
"Analyser le bug dans [fichier.js] ligne [X]. 
La fonction [nom] devrait [comportement attendu] 
mais fait [comportement actuel]. 
Identifier la cause racine et proposer une correction minimale."
```

### Pour la correction :
```
"Corriger le bug identifié en modifiant uniquement le nécessaire. 
Expliquer pourquoi cette solution fonctionne et 
quels sont les risques de régression."
```

### Pour la validation :
```
"Créer une fonction de test pour vérifier que 
[fonctionnalité] fonctionne correctement dans tous les cas :
- Cas normal
- Cas limite (valeurs très grandes/petites)
- Cas d'erreur (données invalides)"
```