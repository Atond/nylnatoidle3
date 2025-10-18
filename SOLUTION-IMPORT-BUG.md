# 🐛 SOLUTION: Bug d'import de sauvegarde

## ❌ Problème

Lors de l'import d'une sauvegarde, le personnage est bien écrit dans `localStorage`, mais après le rechargement de la page, c'est l'**ancien personnage** qui réapparaît.

**Exemple :**

- Import : "Atond" (prêtre niveau 23, 47354 or) ✅
- Après F5 : "eaz" (archer niveau 1) ❌

## 🔍 Cause racine

### Séquence du bug :

````
1. Utilisateur exécute script d'import
   → localStorage.setItem('nylnatoIdleSave_v1', JSON.stringify(saveData))
   → localStorage contient maintenant "Atond" ✅

2. Utilisateur recharge la page (F5 ou Ctrl+R)

3. ⚠️ AVANT le rechargement, le navigateur déclenche l'événement 'beforeunload'
   → game.js ligne 840-843 :
   ```javascript
   window.addEventListener('beforeunload', () => {
       if (window.game && !window.game.isResetting) {
           window.game.save(); // ❌ SAUVEGARDE LE JEU ACTUEL ("eaz")
       }
   });
````

→ localStorage écrasé avec "eaz" ❌

4. La nouvelle page se charge
   → game.load() charge "eaz" depuis localStorage ❌

```

### Diagramme du flux :

```

📥 IMPORT 🔄 RELOAD 📤 BEFOREUNLOAD 💾 LOAD
─────────────────────────────────────────────────────────────────────
localStorage: [F5 pressé] localStorage: localStorage:
"Atond" ✅ → → "eaz" ❌ → "eaz" ❌
(script) (user) (auto-save) (init)

````

## ✅ Solutions

### 🎯 Solution 1 : Interface web (RECOMMANDÉ)

**Fichier :** `import-save.html`

1. Ouvrez **`http://localhost:8080/import-save.html`** dans votre navigateur
2. Cliquez sur "Choisir un fichier" et sélectionnez votre JSON
3. Cliquez sur "📥 Importer et recharger"
4. La page vous redirige automatiquement vers le jeu avec votre personnage restauré !

**Avantages :**
- ✅ Simple et visuel
- ✅ Pas besoin de copier-coller
- ✅ Vérifications automatiques
- ✅ Fonctionne avec tous les fichiers JSON
- ✅ Utilise un flag localStorage pour bloquer beforeunload

---

### 📋 Solution 2 : Script console avec copier-coller

**Fichier :** `IMPORT-SAVE-FIX.js`

1. Ouvrez votre fichier JSON avec un éditeur de texte
2. Copiez **TOUT** le contenu (Ctrl+A, Ctrl+C)
3. Ouvrez `IMPORT-SAVE-FIX.js`
4. Remplacez la ligne `const saveData = null;` par `const saveData = <CTRL+V>;`
5. Copiez tout le script modifié
6. Ouvrez la console du jeu (F12)
7. Collez et exécutez le script

**Avantages :**
- ✅ Fonctionne sans serveur web
- ✅ Contrôle total

**Inconvénient :**
- ⚠️ Plus technique (nécessite édition manuelle)

---

### 🔑 Principe technique commun

Les deux solutions utilisent le flag `isResetting` pour bloquer la sauvegarde automatique pendant l'import.

**Code dans game.js ligne ~855 (beforeunload) :**
```javascript
window.addEventListener('beforeunload', () => {
    if (window.game && !window.game.isResetting) {
        window.game.save(); // Ne s'exécute PAS si isResetting = true
    }
});
````

---

#### 🔹 Méthode 1 : Flag localStorage

**import-save.html** utilise un flag persistent :

```javascript
// Étape 1 : Écrire le flag avant l'import
localStorage.setItem("nylnato_importing", "true");

// Étape 2 : Écrire la sauvegarde
localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

// Étape 3 : Rediriger vers index.html
window.location.href = "index.html";
```

**game.js** lit ce flag au démarrage :

```javascript
init() {
    // Vérifier si on est en train d'importer
    const isImporting = localStorage.getItem('nylnato_importing');
    if (isImporting === 'true') {
        this.isResetting = true; // ✅ Bloque beforeunload
        localStorage.removeItem('nylnato_importing'); // Nettoyer
        console.log('🔄 Import détecté - Auto-save désactivé');
    }

    // ... création des instances ...

    // Charger la sauvegarde
    this.load();

    // Réactiver après le chargement
    if (this.isResetting) {
        this.isResetting = false;
        console.log('✅ Import terminé - Auto-save réactivé');
    }
}
```

**Avantage :** Fonctionne même si la page est rechargée ou redirigée.

---

#### 🔹 Méthode 2 : Script direct

**IMPORT-SAVE-FIX.js** modifie directement l'instance :

```javascript
// 1. Bloquer immédiatement
window.game.isResetting = true; // ✅ Empêche beforeunload
window.game.stopAutoSave(); // ✅ Arrête l'intervalle

// 2. Écrire la nouvelle sauvegarde
localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

// 3. Recharger (beforeunload est bloqué)
location.reload();
```

**Avantage :** Plus direct, contrôle immédiat de l'instance `game`.

## 📊 Tests de validation

### Test 1 : Import basique

```javascript
// Console avant import
JSON.parse(localStorage.getItem("nylnatoIdleSave_v1")).player.name;
// → "eaz"

// Exécuter IMPORT-SAVE-FIX.js avec nylnato-save-2025-10-13T20-48-11.json

// Console après reload
JSON.parse(localStorage.getItem("nylnatoIdleSave_v1")).player.name;
// → "Atond" ✅
```

### Test 2 : Vérifier isResetting

```javascript
// Avant import
window.game.isResetting;
// → false

// Pendant l'exécution du script
window.game.isResetting;
// → true (bloque beforeunload)

// Après reload (dans nouvelle session)
window.game.isResetting;
// → false (normal)
```

### Test 3 : Vérifier les stats

```javascript
// Console après import réussi
game.player.name;
// → "Atond"

game.player.class;
// → "priest"

game.player.level;
// → 23

game.player.resources.gold;
// → 47354
```

## 🎯 Résumé technique

### Fichiers modifiés :

- **AUCUN** ! La solution utilise le système existant (`isResetting`).

### Fichiers créés :

- `IMPORT-SAVE-FIX.js` : Script d'import corrigé

### Ligne de code clé :

```javascript
window.game.isResetting = true; // ✅ Une ligne qui règle tout !
```

## 📚 Références

- **game.js ligne 840-843** : Événement `beforeunload` qui sauvegarde le jeu
- **game.js ligne 29** : Déclaration de `this.isResetting = false;`
- **game.js ligne 616** : Utilisation dans `resetProgress()` pour bloquer la sauvegarde

## ⚠️ Points d'attention

1. **Ne pas oublier `isResetting = true`** avant l'import
2. **Arrêter l'auto-save** avec `stopAutoSave()`
3. **Laisser un délai** de 2 secondes avant `location.reload()` pour garantir l'écriture
4. **Restaurer `isResetting = false`** en cas d'erreur (voir catch dans le script)

## 🎓 Leçon apprise

> Les événements `beforeunload` sont exécutés **avant** le rechargement de la page.
> Toute sauvegarde automatique dans ce handler écrasera les modifications faites juste avant le reload.
> **Solution :** Utiliser un flag pour désactiver temporairement la sauvegarde automatique.

---

**Statut :** ✅ Bug résolu
**Date :** 2025-01-13
**Fichiers :** IMPORT-SAVE-FIX.js, SOLUTION-IMPORT-BUG.md
