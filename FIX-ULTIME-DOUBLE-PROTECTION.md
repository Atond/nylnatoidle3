# ✅ FIX ULTIME : Double Protection Anti-Écrasement

## 🎯 Problème identifié

Même avec le flag `nylnato_importing` dans localStorage, **l'événement `beforeunload` se déclenche PENDANT le rechargement** et peut sauvegarder l'ancien jeu **AVANT** que la nouvelle session ne lise le flag.

### Séquence du bug :

```
1. Utilisateur confirme l'import
2. localStorage.setItem('nylnato_importing', 'true') ✅
3. localStorage.setItem('nylnatoIdleSave_v1', saveData) ✅  (Atond écrit)
4. setTimeout(() => location.reload(), 1000) déclenché
5. [PENDANT LE RECHARGEMENT] beforeunload se déclenche
6. beforeunload → game.save() → écrase avec le jeu actuel ❌ (eaz écrase Atond !)
7. Nouvelle session → game.init() lit le flag... mais trop tard ❌
```

---

## 🛡️ Solution : Double Protection

### Protection 1 : Session actuelle

**Bloquer IMMÉDIATEMENT** l'auto-save et beforeunload dans la session actuelle :

```javascript
// AVANT le rechargement
this.game.stopAutoSave(); // ✅ Arrête l'intervalle auto-save
this.game.isResetting = true; // ✅ Bloque beforeunload MAINTENANT
```

### Protection 2 : Prochaine session

**Flag localStorage** pour la session suivante :

```javascript
localStorage.setItem("nylnato_importing", "true"); // ✅ Pour game.init()
```

---

## 📝 Code appliqué

### `src/js/ui.js` - Fonction `handleImportFile()`

**Ligne ~2179** :

```javascript
// Confirmer l'import
if (confirm("⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?")) {
  // ✅ PROTECTION 1: Bloquer la session actuelle
  this.game.stopAutoSave();
  this.game.isResetting = true;
  console.log("🛑 Auto-save désactivé et beforeunload bloqué");

  // ✅ PROTECTION 2: Flag pour la prochaine session
  localStorage.setItem("nylnato_importing", "true");

  // Écrire dans localStorage
  localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

  // Vérifier l'écriture
  const verification = JSON.parse(localStorage.getItem("nylnatoIdleSave_v1"));
  console.log(
    "✅ Sauvegarde écrite:",
    verification.player.name,
    "niveau",
    verification.player.level
  );

  // Recharger la page (beforeunload est maintenant bloqué)
  this.showNotification(
    `Sauvegarde de ${saveData.player.name} importée ! Rechargement...`,
    "success"
  );
  setTimeout(() => {
    location.reload();
  }, 1000);
}
```

---

### `src/js/ui.js` - Fonction `showImportTextDialog()`

**Ligne ~2136** :

```javascript
// Confirmer l'import
if (confirm("⚠️ Importer cette sauvegarde écrasera votre progression actuelle. Continuer ?")) {
  // ✅ PROTECTION 1: Bloquer la session actuelle
  this.game.stopAutoSave();
  this.game.isResetting = true;
  console.log("🛑 Auto-save désactivé et beforeunload bloqué");

  // ✅ PROTECTION 2: Flag pour la prochaine session
  localStorage.setItem("nylnato_importing", "true");

  // Écrire dans localStorage
  localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

  // Vérifier l'écriture
  const verification = JSON.parse(localStorage.getItem("nylnatoIdleSave_v1"));
  console.log(
    "✅ Sauvegarde écrite:",
    verification.player.name,
    "niveau",
    verification.player.level
  );

  // Recharger la page
  this.showNotification(
    `Sauvegarde de ${saveData.player.name} importée ! Rechargement...`,
    "success"
  );
  setTimeout(() => {
    location.reload();
  }, 1000);
}
```

---

## 🔍 Vérification dans `game.js`

Le code `beforeunload` vérifie `isResetting` :

**Ligne ~861** :

```javascript
window.addEventListener("beforeunload", () => {
  if (window.game && !window.game.isResetting) {
    window.game.save(); // ✅ Ne s'exécute PAS si isResetting = true
  }
});
```

---

## ✅ Nouvelle séquence (CORRIGÉE)

```
1. Utilisateur confirme l'import
2. this.game.stopAutoSave() ✅ (arrête l'intervalle)
3. this.game.isResetting = true ✅ (bloque beforeunload MAINTENANT)
4. localStorage.setItem('nylnato_importing', 'true') ✅
5. localStorage.setItem('nylnatoIdleSave_v1', saveData) ✅  (Atond écrit)
6. setTimeout(() => location.reload(), 1000) déclenché
7. [PENDANT LE RECHARGEMENT] beforeunload se déclenche
8. beforeunload vérifie → isResetting = true → PAS de save() ✅
9. Nouvelle session → game.init() lit le flag ✅
10. game.load() → charge Atond ✅✅✅
```

---

## 🧪 Tests de validation

### Console logs attendus :

```javascript
// Après avoir confirmé l'import
🛑 Auto-save désactivé et beforeunload bloqué
✅ Sauvegarde écrite: Atond niveau 23

// Pendant le rechargement (beforeunload ne sauvegarde PAS)

// Au démarrage de la nouvelle session
🔄 Import de sauvegarde détecté - Auto-save désactivé
💾 Sauvegarde chargée
✅ Import terminé - Auto-save réactivé
📥 Player.fromJSON appelé avec: {name: 'Atond', ...}
✅ Player chargé: Atond niveau 23
```

---

## 📊 Comparaison : Ancien vs Nouveau

| Protection                            | Avant     | Après      |
| ------------------------------------- | --------- | ---------- |
| Flag localStorage                     | ✅ Oui    | ✅ Oui     |
| Arrêt auto-save session actuelle      | ❌ Non    | ✅ Oui     |
| Blocage beforeunload session actuelle | ❌ Non    | ✅ Oui     |
| **Résultat**                          | ❌ Écrasé | ✅ Protégé |

---

## 🎓 Pourquoi c'est crucial

### Timing du beforeunload :

L'événement `beforeunload` se déclenche **pendant la transition** entre les deux sessions :

```
Session 1 (jeu actuel avec "eaz")
    ↓
    | - Clic sur "Importer"
    | - Écriture dans localStorage ("Atond")
    | - location.reload()
    ↓
[ZONE CRITIQUE] ← beforeunload se déclenche ICI
    ↓
Session 2 (nouveau démarrage)
    ↓
    | - game.init()
    | - Lecture du flag
    | - game.load()
```

**Si `isResetting` n'est pas activé dans Session 1**, beforeunload sauvegarde "eaz" dans la Zone Critique, écrasant "Atond" !

**Avec `isResetting = true`**, beforeunload est bloqué dans la Zone Critique ✅

---

## 🔧 Code de vérification (Console)

Pour tester que la protection fonctionne :

```javascript
// AVANT l'import
window.game.isResetting;
// → false

// JUSTE APRÈS avoir confirmé l'import (avant rechargement)
window.game.isResetting;
// → true ✅ (bloque beforeunload)

// APRÈS rechargement (nouvelle session)
window.game.isResetting;
// → false (réactivé après load)
```

---

## ✅ Résumé

**Problème :** Le flag `nylnato_importing` seul ne suffit pas car beforeunload se déclenche **avant** que la nouvelle session ne le lise.

**Solution :** Activation de `isResetting` **dans la session actuelle** pour bloquer beforeunload **immédiatement**, en plus du flag localStorage.

**Résultat :** Import **100% fiable** avec double protection temporelle.

---

**Date :** 2025-10-13  
**Statut :** ✅ PROTECTION COMPLÈTE ACTIVÉE  
**Fichiers modifiés :** `src/js/ui.js` (2 fonctions avec double protection)
