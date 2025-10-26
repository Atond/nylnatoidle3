# 🚀 Guide rapide : Restaurer votre personnage

## ⚡ Méthode 1 : Interface graphique (5 secondes)

**⚠️ Prérequis :** Le serveur doit être lancé (`npx http-server -p 8080`)

1. **Ouvrez** : http://localhost:8080/import-save.html
2. **Cliquez** : "Choisir un fichier"
3. **Sélectionnez** : Votre fichier JSON (ex: `nylnato-save-2025-10-13T21-06-12.json`)
4. **Cliquez** : "📥 Importer et recharger"
5. **Attendez** : Redirection automatique vers le jeu (2 secondes) ✅

**C'est tout ! Votre personnage est restauré.**

**Note :** Cette méthode utilise un flag localStorage pour bloquer la sauvegarde automatique pendant l'import.

---

## 📋 Méthode 2 : Console (experts)

### Étapes :

1. **Ouvrez** votre fichier JSON (`nylnato-save-2025-10-13T21-06-12.json`)
2. **Copiez** TOUT le contenu (Ctrl+A puis Ctrl+C)
3. **Ouvrez** le fichier `IMPORT-SAVE-FIX.js`
4. **Trouvez** la ligne : `const saveData = null;`
5. **Remplacez** par : `const saveData = ` puis collez (Ctrl+V) puis `;`
6. **Résultat** : `const saveData = { "version": "1.0", "timestamp": ... };`
7. **Copiez** TOUT le script modifié
8. **Ouvrez** le jeu dans le navigateur
9. **Ouvrez** la console (F12)
10. **Collez** le script et appuyez sur Entrée
11. **Attendez** : Le jeu recharge automatiquement ✅

---

## ✅ Vérification

Après le rechargement, ouvrez la console (F12) et tapez :

```javascript
game.player.name;
// → Doit afficher "Atond" (ou votre nom)

game.player.level;
// → Doit afficher 23 (ou votre niveau)

game.player.resources.gold;
// → Doit afficher 47354 (ou votre or)
```

---

## ❌ Problèmes courants

### "Not allowed to load local resource"

- **Cause :** `fetch()` ne peut pas lire les fichiers locaux
- **Solution :** Utilisez **import-save.html** (Méthode 1)

### "Le personnage n'est pas restauré après reload"

- **Cause :** L'événement `beforeunload` a sauvegardé l'ancien jeu
- **Solution :** Vérifiez que `window.game.isResetting = true;` est bien exécuté

### "JSON parse error"

- **Cause :** Le fichier JSON est corrompu ou incomplet
- **Solution :** Vérifiez que vous avez copié **tout** le contenu (accolades ouvrante et fermante)

---

## 📚 Fichiers

- **`import-save.html`** : Interface graphique d'import (recommandé)
- **`IMPORT-SAVE-FIX.js`** : Script console (experts)
- **`SOLUTION-IMPORT-BUG.md`** : Documentation technique complète

---

## 🎓 Pourquoi ça marche ?

Le bug venait de l'événement `beforeunload` qui sauvegardait automatiquement le jeu **avant** le rechargement de la page, écrasant ainsi l'import.

**Solution :** Le flag `isResetting` bloque cette sauvegarde automatique, permettant à l'import de persister.

```javascript
// game.js ligne 840-843
window.addEventListener("beforeunload", () => {
  if (window.game && !window.game.isResetting) {
    window.game.save(); // Ne s'exécute PAS si isResetting = true
  }
});
```

---

**Besoin d'aide ?** Consultez `SOLUTION-IMPORT-BUG.md` pour plus de détails.
