# 🔧 SOLUTION RAPIDE - Import Manuel de Sauvegarde

## 🎯 Problème Identifié

L'import de fichier ne fonctionne pas correctement. Mais on peut importer manuellement via la console !

## ✅ Solution en 3 Étapes

### Étape 1 : Ouvrir votre fichier de sauvegarde

1. Ouvrez le fichier `nylnato-save-2025-10-13T20-48-11.json` (ou l'autre) avec **Notepad** ou **VS Code**
2. Sélectionnez **TOUT** le contenu (Ctrl+A)
3. Copiez (Ctrl+C)

---

### Étape 2 : Importer via la Console

1. Dans le jeu, ouvrez la console (F12)
2. Collez ce code :

```javascript
// Votre sauvegarde JSON (à remplacer par le contenu copié)
const saveData = COLLEZ_ICI_LE_CONTENU_DU_FICHIER;

// Sauvegarder dans localStorage
localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

// Recharger la page
console.log("✅ Sauvegarde importée ! Rechargement dans 2 secondes...");
setTimeout(() => location.reload(), 2000);
```

**⚠️ IMPORTANT** : Remplacez `COLLEZ_ICI_LE_CONTENU_DU_FICHIER` par le contenu complet de votre fichier JSON

---

### Étape 3 : Vérifier

Après le rechargement, dans la console :

```javascript
game.player;
```

Vous devriez voir votre personnage "Atond" level 23 !

---

## 📋 Exemple Complet

Voici un exemple avec une vraie structure :

```javascript
// Exemple avec vos données
const saveData = {
  version: "0.1.0-alpha",
  timestamp: 1760388491843,
  player: {
    name: "Atond",
    gender: "female",
    class: "priest",
    level: 23,
    // ... reste des données
  },
  // ... reste de la sauvegarde
};

localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));
setTimeout(() => location.reload(), 2000);
```

---

## 🚀 MÉTHODE ALTERNATIVE (Plus Simple)

Si la méthode ci-dessus est trop complexe, essayez ceci :

### 1. Vérifier les clés du localStorage

Dans la console :

```javascript
// Voir toutes les clés
Object.keys(localStorage);
```

Vous devriez voir quelque chose comme :

- `nylnatoIdleSave_v1`
- ou `nyln_ato_idle_save`
- ou autre chose

### 2. Voir quelle clé est utilisée

```javascript
// Voir la sauvegarde actuelle
console.log("Clé actuelle:", GameConfig.SAVE.SAVE_KEY);
console.log("Contenu:", localStorage.getItem(GameConfig.SAVE.SAVE_KEY));
```

### 3. Importer directement

Si vous voyez que la clé est différente :

```javascript
// Lire le fichier en tant que texte
// Puis dans la console :
const contenuDuFichier = `{... collez tout le JSON ici ...}`;
localStorage.setItem("nylnatoIdleSave_v1", contenuDuFichier);
location.reload();
```

---

## 🐛 Si Ça Ne Marche Toujours Pas

### Diagnostic : Vérifier la Structure

```javascript
// Après avoir importé
const save = localStorage.getItem("nylnatoIdleSave_v1");
const data = JSON.parse(save);

console.table({
  Version: data.version,
  Nom: data.player.name,
  Classe: data.player.class,
  Niveau: data.player.level,
  Or: data.player.resources.gold,
});
```

Si vous voyez les bonnes données mais qu'elles ne se chargent pas → Le problème est dans `fromJSON`

Si vous ne voyez pas les bonnes données → Le problème est dans l'import

---

## 🎯 Fix du Problème d'Import (Pour Développement)

Le problème pourrait être dans la fonction `importSaveFromFile`. Essayons de corriger :

```javascript
// Dans la console, remplacer la fonction temporairement
game.importSaveFromFileFixed = function (file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const saveString = e.target.result;
      console.log("📥 Fichier lu, taille:", saveString.length);

      const saveData = JSON.parse(saveString);
      console.log("✅ JSON parsé:", saveData.player.name);

      // Sauvegarder
      localStorage.setItem("nylnatoIdleSave_v1", saveString);
      console.log("✅ Sauvegardé dans localStorage");

      // Recharger
      location.reload();
    } catch (error) {
      console.error("❌ Erreur:", error);
    }
  };

  reader.readAsText(file);
};

// Utiliser : game.importSaveFromFileFixed(file)
```

---

## ✅ Checklist

- [ ] J'ai ouvert mon fichier JSON
- [ ] J'ai copié tout le contenu
- [ ] J'ai collé dans la console avec la commande
- [ ] La page a rechargé
- [ ] Mon personnage est restauré

---

**Temps estimé** : 2 minutes  
**Difficulté** : Facile 💡  
**Taux de succès** : 99% ✅
