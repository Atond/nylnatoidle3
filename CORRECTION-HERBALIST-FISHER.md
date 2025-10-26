# 🔧 Correction des Bugs - Herboriste et Pêcheur

## 📋 Problème Initial

- ✅ Les boutons "Cueillir des Plantes" et "Pêcher du Poisson" étaient cliquables
- ❌ La barre d'expérience ne montait pas
- ❌ Aucune ressource n'était récoltée

## 🔍 Analyse

Le problème venait de **event listeners manquants** dans le fichier `src/js/ui.js`. Les professions Herboriste et Pêcheur étaient bien configurées dans le backend (`profession-manager.js`) et l'UI HTML existait (`index.html`), mais les **clics n'étaient pas connectés** aux fonctions JavaScript.

## ✅ Corrections Appliquées

### 1. Ajout des Event Listeners (`ui.js` lignes ~129-166)

```javascript
// Nouveaux métiers - Boutons de récolte
const btnHerbalist = document.getElementById("btn-herbalist");
if (btnHerbalist) {
  btnHerbalist.addEventListener("click", () => {
    this.onProfessionClick("herbalist");
  });
}

const btnFisher = document.getElementById("btn-fisher");
if (btnFisher) {
  btnFisher.addEventListener("click", () => {
    this.onProfessionClick("fisher");
  });
}

// Boutons auto-récolte
const btnAutoHerbalist = document.getElementById("btn-auto-herbalist");
if (btnAutoHerbalist) {
  btnAutoHerbalist.addEventListener("click", () => {
    this.onAutoGatherClick("herbalist");
  });
}

const btnAutoFisher = document.getElementById("btn-auto-fisher");
if (btnAutoFisher) {
  btnAutoFisher.addEventListener("click", () => {
    this.onAutoGatherClick("fisher");
  });
}
```

**Effet** : Les clics sur les boutons déclenchent maintenant les fonctions `onProfessionClick()` et `onAutoGatherClick()` qui gèrent la récolte.

---

### 2. Mise à Jour de `updateProfessions()` (`ui.js` ligne ~1118)

```javascript
updateProfessions() {
    const professions = ['woodcutter', 'miner', 'herbalist', 'fisher']; // ✅ Ajout

    professions.forEach(profId => {
        // ... mise à jour niveau, XP, barres de progression
    });
}
```

**Effet** : Les barres d'XP et niveaux d'Herboriste et Pêcheur sont maintenant mises à jour à chaque clic.

---

### 3. Mise à Jour de `updateAutoGatherButtons()` (`ui.js` ligne ~1068)

```javascript
updateAutoGatherButtons() {
    ['woodcutter', 'miner', 'herbalist', 'fisher'].forEach(profId => { // ✅ Ajout
        const btn = document.getElementById(`btn-auto-${profId}`);
        if (!btn) return;

        // Gestion des icônes et intervalles spécifiques
        let interval, resourceIcon, resourceName;
        if (profId === 'herbalist') {
            interval = 3; // 3 secondes
            resourceIcon = '🌿';
            resourceName = 'plante';
        } else if (profId === 'fisher') {
            interval = 5; // 5 secondes (plus lent)
            resourceIcon = '🐟';
            resourceName = 'poisson';
        }

        // ... logique de mise à jour des boutons
    });
}
```

**Effet** : Les boutons d'auto-récolte affichent maintenant les bonnes informations pour Herboriste (3s) et Pêcheur (5s).

---

## ✅ Vérifications Backend (Déjà en Place)

### `profession-manager.js` - Professions Créées ✅

```javascript
// Herboriste
this.professions.set(
  "herbalist",
  new Profession(
    "herbalist",
    "Herboriste",
    "plants", // Correspond à ResourcesData.plants
    10 // XP par clic
  )
);

// Pêcheur
this.professions.set(
  "fisher",
  new Profession(
    "fisher",
    "Pêcheur",
    "fish", // Correspond à ResourcesData.fish
    15 // XP par clic (plus lent donc plus d'XP)
  )
);
```

### `profession-manager.js` - Auto-Gather State ✅

```javascript
this.autoGatherState = {
  woodcutter: { enabled: false, unlocked: false },
  miner: { enabled: false, unlocked: false },
  herbalist: { enabled: false, unlocked: false }, // ✅
  fisher: { enabled: false, unlocked: false }, // ✅
};
```

### `resources-data.js` - Ressources Définies ✅

```javascript
const ResourcesData = {
  // ...
  plants: [
    {
      id: "plant_dandelion",
      name: "Feuille de Pissenlit",
      unlockLevel: 1,
      rarity: "common",
      dropRate: 1.0,
    },
    // ... 19 autres plantes
  ],
  fish: [
    {
      id: "fish_stream",
      name: "Poisson de ruisseau",
      unlockLevel: 1,
      rarity: "common",
      dropRate: 1.0,
    },
    // ... 19 autres poissons
  ],
};
```

---

## 🎮 Comment Tester

1. **Lancer le serveur de développement** :

   ```powershell
   python -m http.server 8080
   ```

2. **Ouvrir le jeu** : http://localhost:8080

3. **Tester la Récolte** :
   - Aller dans l'onglet **⛏️ Récolte**
   - Cliquer sur **"🌱 Cueillir des Plantes"** (Herboriste)
   - Vérifier que :
     - ✅ La barre d'XP monte
     - ✅ Les plantes apparaissent dans l'inventaire (filtre 🌿 Plantes)
     - ✅ Le niveau augmente à 100 XP
   - Cliquer sur **"🐟 Pêcher du Poisson"** (Pêcheur)
   - Vérifier que :
     - ✅ La barre d'XP monte (15 XP par clic)
     - ✅ Les poissons apparaissent dans l'inventaire (filtre 🐟 Poissons)
     - ✅ Le niveau augmente à 100 XP

4. **Tester l'Auto-Récolte** :
   - Récolter **50 bois** + **50 minerai**
   - Cliquer sur **"⚡ Auto-Récolte (T1)"** pour Herboriste
   - Vérifier que :
     - ✅ Le bouton devient "✅ Actif (1 plante / 3s)"
     - ✅ Les plantes sont récoltées automatiquement toutes les 3 secondes
   - Faire de même pour le Pêcheur
   - Vérifier que :
     - ✅ Le bouton devient "✅ Actif (1 poisson / 5s)"
     - ✅ Les poissons sont récoltés automatiquement toutes les 5 secondes

---

## 📊 Résumé des Modifications

| Fichier        | Lignes Modifiées | Changement                                               |
| -------------- | ---------------- | -------------------------------------------------------- |
| `src/js/ui.js` | ~129-166         | ✅ Ajout event listeners herbalist/fisher                |
| `src/js/ui.js` | ~1118            | ✅ Ajout herbalist/fisher dans updateProfessions()       |
| `src/js/ui.js` | ~1068            | ✅ Ajout herbalist/fisher dans updateAutoGatherButtons() |

**Total** : 3 modifications dans `ui.js` (connexion de l'UI au backend existant)

---

## 🎯 Fonctionnalités Maintenant Opérationnelles

### Herboriste 🌿

- ✅ Récolte manuelle de plantes (clic)
- ✅ Gain d'XP : 10 XP par clic
- ✅ Drop basé sur `dropRate` des plantes
- ✅ 20 plantes disponibles (Common → Divine)
- ✅ Auto-récolte : 1 plante / 3 secondes
- ✅ Filtre d'inventaire "🌿 Plantes"

### Pêcheur 🎣

- ✅ Récolte manuelle de poissons (clic)
- ✅ Gain d'XP : 15 XP par clic (plus lent donc +50% XP)
- ✅ Drop basé sur `dropRate` des poissons
- ✅ 20 poissons disponibles (Common → Divine)
- ✅ Auto-récolte : 1 poisson / 5 secondes (plus lent que les autres métiers)
- ✅ Filtre d'inventaire "🐟 Poissons"

---

## 🔄 Prochaines Étapes (Non Bloquantes)

### Métiers de Craft à Implémenter

1. **🧪 Alchimiste** : Recettes de potions (plantes → potions)
2. **🍽️ Poissonnier** : Recettes de plats (poissons → plats)
3. **🧵 Tailleur** : Recettes d'équipements (tissus → vêtements)

### Bâtiment à Créer

4. **🐑 Ferme** : Production automatique de tissus pour le Tailleur

### Système de Buffs

5. **⚡ BuffManager** : Gestion des buffs temporaires (potions, plats)

---

**Date de correction** : 24 octobre 2025
**Statut** : ✅ RÉSOLU
**Temps de correction** : ~15 minutes
