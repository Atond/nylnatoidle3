# 🎉 GUIDE TEST - Effet Surprise TOUS les Onglets

**Objectif** : Vérifier que TOUS les onglets (sauf Combat) apparaissent avec animation surprise quand débloqués

---

## ✅ ÉTAT INITIAL

Au lancement du jeu :

- ✅ **Visible** : ⚔️ Combat uniquement
- ❌ **Invisibles** : Tous les autres onglets

```javascript
// Vérifier dans console (F12)
const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach((tab) => {
  const tabName = tab.getAttribute("data-tab");
  const isVisible = tab.style.display !== "none";
  console.log(`${tab.textContent} - Visible: ${isVisible}`);
});

// RÉSULTAT ATTENDU :
// ⚔️ Combat - Visible: true
// ⛏️ Récolte - Visible: false
// 🔨 Fabrication - Visible: false
// ⚗️ Transmutation - Visible: false
// 🎒 Équipement - Visible: false
// 🏘️ Ville - Visible: false
// 🎭 Personnages - Visible: false
// 🏰 Donjons - Visible: false
// 🐉 Dragons - Visible: false
// 👥 Guilde - Visible: false
```

---

## 🎬 SCÉNARIO DE TEST RAPIDE

### 1️⃣ M01 : Premier Monstre → 🎒 ÉQUIPEMENT

```javascript
// Dans console
game.combat.onMonsterDeath(); // Simuler 1 kill

// OBSERVER :
// 🎉 Notification "Quête complétée : Les Premiers Pas"
// 🎉 Onglet 🎒 Équipement APPARAÎT avec animation (scale + glow)
```

**Animation attendue** :

- 0.0s : Invisible (display: none)
- 0.1s : Apparition (scale 0.5, opacity 0)
- 0.4s : Overshoot (scale 1.1, glow doré)
- 0.8s : Stable (scale 1)

---

### 2️⃣ M04 : 20 Bois → ⛏️ RÉCOLTE

```javascript
// Simuler récolte de bois
for (let i = 0; i < 20; i++) {
  game.gathering.gatherResource("wood");
}

// OBSERVER :
// 🎉 Notification "Quête complétée : Apprenti Bûcheron"
// 🎉 Onglet ⛏️ Récolte APPARAÎT avec animation
```

---

### 3️⃣ M06 : Craft Épée de Fer → 🔨 FABRICATION

```javascript
// D'abord récolter le fer
for (let i = 0; i < 20; i++) {
  game.gathering.gatherResource("ore");
}

// Attendre que M05 se complète automatiquement

// Craft épée de fer
game.crafting.craftItem("iron_sword");

// OBSERVER :
// 🎉 Notification "Quête complétée : Première Forge"
// 🎉 Onglet 🔨 Fabrication APPARAÎT avec animation
```

---

### 4️⃣ M08 : Niveau 5 → ⚗️ TRANSMUTATION

```javascript
// Passer au niveau 5
game.player.level = 5;
game.questManager.checkLevelUpQuests();

// OBSERVER :
// 🎉 Notification "Quête complétée : Monter en Puissance"
// 🎉 Onglet ⚗️ Transmutation APPARAÎT avec animation
```

---

### 5️⃣ M10 : Boss → 🏘️ VILLE

```javascript
// Niveau 8 + tuer boss
game.player.level = 8;
game.combat.defeatBoss("bete_prairies");

// OBSERVER :
// 🎉 Notification "Quête complétée : Bête des Prairies"
// 🎉 Onglet 🏘️ Ville APPARAÎT avec animation
```

---

### 6️⃣ M11 : Niveau 30 → 🎭 PERSONNAGES

```javascript
// Niveau 30
game.player.level = 30;
game.questManager.checkLevelUpQuests();

// OBSERVER :
// 🎉 Notification "Quête complétée : Académie des Héros"
// 🎉 Onglet 🎭 Personnages APPARAÎT avec animation
```

---

### 7️⃣ M13 : 3 Alts → 🏰 DONJONS

```javascript
// Créer 3 alts (après M11)
game.altCharacterManager.createAlt("Thor", "male", "tank");
game.altCharacterManager.createAlt("Freya", "female", "healer");
game.altCharacterManager.createAlt("Bjorn", "male", "archer");

// OBSERVER :
// 🎉 Notification "Quête complétée : Formation Trinity"
// 🎉 Onglet 🏰 Donjons APPARAÎT avec animation
```

---

## 🚀 TEST COMPLET EN 30 SECONDES

```javascript
// COPIER-COLLER CE BLOC DANS LA CONSOLE

// 1. M01 : Tuer 1 monstre
game.combat.onMonsterDeath();
console.log("✅ M01 complétée → 🎒 Équipement débloqué");

// 2. M04 : 20 Bois
setTimeout(() => {
  for (let i = 0; i < 20; i++) game.gathering.gatherResource("wood");
  console.log("✅ M04 complétée → ⛏️ Récolte débloquée");
}, 2000);

// 3. M05 : 20 Fer
setTimeout(() => {
  for (let i = 0; i < 20; i++) game.gathering.gatherResource("ore");
  console.log("✅ M05 complétée → M06 prête");
}, 4000);

// 4. M06 : Craft épée
setTimeout(() => {
  game.crafting.craftItem("iron_sword");
  console.log("✅ M06 complétée → 🔨 Fabrication débloquée");
}, 6000);

// 5. M08 : Niveau 5
setTimeout(() => {
  game.player.level = 5;
  game.questManager.checkLevelUpQuests();
  console.log("✅ M08 complétée → ⚗️ Transmutation débloquée");
}, 8000);

// 6. M10 : Boss
setTimeout(() => {
  game.player.level = 8;
  game.combat.defeatBoss("bete_prairies");
  console.log("✅ M10 complétée → 🏘️ Ville débloquée");
}, 10000);

// 7. M11 : Niveau 30
setTimeout(() => {
  game.player.level = 30;
  game.questManager.checkLevelUpQuests();
  console.log("✅ M11 complétée → 🎭 Personnages débloqués");
}, 12000);

// 8. M13 : 3 Alts
setTimeout(() => {
  game.altCharacterManager.createAlt("Thor", "male", "tank");
  game.altCharacterManager.createAlt("Freya", "female", "healer");
  game.altCharacterManager.createAlt("Bjorn", "male", "archer");
  console.log("✅ M13 complétée → 🏰 Donjons débloqués");
}, 14000);

console.log("🎬 Test automatique lancé ! Observer les onglets apparaître un par un...");
```

---

## ✅ VALIDATION FINALE

```javascript
// Vérifier que TOUS les onglets sont maintenant visibles
const tabs = document.querySelectorAll(".tab-btn");
let allVisible = true;

tabs.forEach((tab) => {
  const tabName = tab.getAttribute("data-tab");
  const isVisible = tab.style.display !== "none";

  if (!isVisible && tabName !== "dragons" && tabName !== "guild") {
    console.error(`❌ ${tab.textContent} encore invisible !`);
    allVisible = false;
  }
});

if (allVisible) {
  console.log("✅ TOUS LES ONGLETS DÉBLOQUÉS SONT VISIBLES !");
  console.log("🎉 Effet surprise fonctionnel sur tous les onglets !");
} else {
  console.error("❌ Certains onglets n'apparaissent pas...");
}
```

---

## 🎨 DÉTAILS ANIMATION

**Keyframe `tabUnlock`** (src/css/animations.css) :

```css
@keyframes tabUnlock {
  0% {
    transform: scale(0.5) translateY(-20px);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.tab-unlock-animation {
  animation: tabUnlock 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 0 20px rgba(255, 215, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.4);
}
```

**Effet** :

- Bounce élastique (cubic-bezier)
- Glow doré (2 couches de box-shadow)
- Durée totale : 0.8s
- Nettoyage automatique après animation

---

## 🐛 RÉSOLUTION PROBLÈMES

### Problème 1 : Onglet n'apparaît pas après quête

**Cause** : `updateTabVisibility()` pas appelé

**Solution** :

```javascript
// Forcer update
game.ui.updateTabVisibility();
```

### Problème 2 : Onglet visible dès le départ

**Cause** : `unlockedTabs` contient l'onglet par défaut

**Solution** : Vérifier `ui.js` ligne 9 :

```javascript
this.unlockedTabs = ["combat"]; // ✅ Seul combat
```

### Problème 3 : Animation ne se joue pas

**Cause** : CSS `animations.css` non importé

**Solution** : Vérifier `index.html` :

```html
<link rel="stylesheet" href="src/css/animations.css" />
```

### Problème 4 : Rafraîchissement nécessaire

**Cause** : `quest-manager.js` n'appelle pas `updateTabVisibility()`

**Solution** : Vérifier `quest-manager.js` ligne ~413-446 :

```javascript
window.game.ui.updateTabVisibility(); // Après chaque unlock
```

---

## 📊 TABLEAU RÉCAPITULATIF

| Quête | Niveau | Unlock           | Onglet Débloqué  |
| ----- | ------ | ---------------- | ---------------- |
| M01   | 1      | `equipment_tab`  | 🎒 Équipement    |
| M04   | 1      | `gathering_tab`  | ⛏️ Récolte       |
| M06   | 1      | `crafting_tab`   | 🔨 Fabrication   |
| M08   | 5      | `alchemy_tab`    | ⚗️ Transmutation |
| M10   | 8      | `town_tab`       | 🏘️ Ville         |
| M11   | 30     | `characters_tab` | 🎭 Personnages   |
| M13   | 30     | `dungeons_tab`   | 🏰 Donjons       |

**Non débloqués** (futur) : 🐉 Dragons, 👥 Guilde

---

## 🎯 RÉSULTAT ATTENDU

1. **Lancement** : Seul ⚔️ Combat visible
2. **Après M01** : 🎒 apparaît avec bounce + glow
3. **Après M04** : ⛏️ apparaît avec bounce + glow
4. **Après M06** : 🔨 apparaît avec bounce + glow
5. **Après M08** : ⚗️ apparaît avec bounce + glow
6. **Après M10** : 🏘️ apparaît avec bounce + glow
7. **Après M11** : 🎭 apparaît avec bounce + glow
8. **Après M13** : 🏰 apparaît avec bounce + glow

**Effet psychologique** :

- Découverte progressive
- Sentiment de déblocage/progression
- "WOW" à chaque nouvel onglet
- Motivation à continuer

**🎉 TOUT EST PRÊT POUR LE TEST !**
