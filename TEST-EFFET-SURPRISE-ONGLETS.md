# 🎮 COMMANDES TEST RAPIDE - Effet Surprise Onglets

**Objectif** : Tester l'apparition surprise des onglets Alt Characters + Donjons

---

## ⚡ TEST RAPIDE (Console)

```javascript
// 1️⃣ VÉRIFIER ÉTAT INITIAL
// → Onglets 🎭 Personnages et 🏰 Donjons doivent être INVISIBLES
const charactersTab = document.querySelector('[data-tab="characters"]');
const dungeonsTab = document.querySelector('[data-tab="dungeons"]');
console.log("🎭 Personnages visible ?", charactersTab.style.display !== "none"); // → false
console.log("🏰 Donjons visible ?", dungeonsTab.style.display !== "none"); // → false

// 2️⃣ DÉBLOQUER M11 → 🎉 SURPRISE ONGLET PERSONNAGES !
game.player.level = 30;
game.questManager.checkLevelUpQuests();
game.ui.updateTabVisibility();

// → Observer dans UI :
//   * Onglet 🎭 Personnages APPARAÎT avec animation
//   * Scale de 0.5 → 1.1 → 1 (bounce)
//   * Glow doré (box-shadow)
//   * Durée 0.8s

// Vérifier unlock
console.log("✅ characters_tab unlock ?", game.unlocks.characters_tab); // → true
console.log("✅ shared_storage unlock ?", game.unlocks.shared_storage); // → true

// 3️⃣ CRÉER 3 ALTS → 🎉 SURPRISE ONGLET DONJONS !
game.altCharacterManager.createAlt("Thor", "male", "tank");
game.altCharacterManager.createAlt("Freya", "female", "healer");
game.altCharacterManager.createAlt("Bjorn", "male", "archer");

// → M12 complétée (1 alt)
// → M13 complétée (3 alts) → Unlock dungeons_tab

game.ui.updateTabVisibility();

// → Observer dans UI :
//   * Onglet 🏰 Donjons APPARAÎT avec animation
//   * Même effet que Personnages (scale + glow)

// Vérifier unlock
console.log("✅ dungeons_tab unlock ?", game.unlocks.dungeons_tab); // → true

// 4️⃣ TEST TOOLTIPS STATS
// → Hover sur chaque stat dans sidebar gauche :
//   ❤️ PV → "Points de Vie : Votre santé actuelle..."
//   💪 Force → "Augmente vos dégâts physiques..."
//   ⚡ Agilité → "Réduit les dégâts reçus..."
//   🧠 Intelligence → "...Utile pour Soigneurs (HPS = INT × 0.5 + WIS × 0.3)"
//   ✨ Sagesse → "Améliore l'efficacité des soins..."
//   🛡️ Endurance → "Augmente vos PV maximum..."

// 5️⃣ TEST CARRY MODE (pas d'erreur)
const altId = game.altCharacterManager.altCharacters[0].id;
const carryState = game.altCharacterManager.getCarryState();
console.log("Carry State:", carryState); // → { isActive: false, ... }

// Simuler combat
game.combat.onMonsterDeath(); // ✅ Pas d'erreur TypeError

// 6️⃣ TEST AFK FARM STATE
const afkState = game.altCharacterManager.getAFKFarmState();
console.log("AFK State:", afkState); // → { activeAlts: [], count: 0 }
```

---

## 📹 SCÉNARIO VISUEL

### Étape 1 : Lancement du jeu

- Navigation : ⚔️ Combat, ⛏️ Récolte, 🔨 Fabrication, ⚗️ Transmutation, 🎒 Équipement, 🏘️ Ville, 🐉 Dragons, 👥 Guilde
- **🎭 Personnages** : **INVISIBLE** (pas dans la barre de navigation)
- **🏰 Donjons** : **INVISIBLE** (pas dans la barre de navigation)

### Étape 2 : Level 30 (M11 complétée)

```javascript
game.player.level = 30;
game.questManager.checkLevelUpQuests();
```

**🎉 EFFET SURPRISE !**

- Notification : "🎉 Quête complétée ! Académie des Héros"
- Onglet **🎭 Personnages** apparaît entre 🏘️ Ville et 🐉 Dragons
- **Animation** :
  - 0.0s : Invisible (scale 0.5, opacity 0)
  - 0.4s : Overshoot (scale 1.1)
  - 0.56s : Bounce back (scale 0.95)
  - 0.8s : Stable (scale 1, opacity 1)
  - **Glow doré** : box-shadow avec rgba(255, 215, 0)

### Étape 3 : Créer 3 alts (M13 complétée)

```javascript
game.altCharacterManager.createAlt("Thor", "male", "tank");
game.altCharacterManager.createAlt("Freya", "female", "healer");
game.altCharacterManager.createAlt("Bjorn", "male", "archer");
```

**🎉 EFFET SURPRISE BIS !**

- Notification : "🎉 Quête complétée ! Formation Trinity"
- Onglet **🏰 Donjons** apparaît entre 🎭 Personnages et 🐉 Dragons
- **Même animation** que Personnages (scale + glow)

### Étape 4 : Hover Stats

- Hover **❤️ PV** :
  - Tooltip apparaît au-dessus (0.3s fadeIn)
  - Fond : gradient bleu foncé
  - Bordure : dorée (rgba(255, 215, 0, 0.3))
  - Flèche pointant vers la stat
  - Texte : "Points de Vie : Votre santé actuelle. Si vous atteignez 0 PV, vous mourrez !"
- Hover **🧠 Intelligence** :
  - Tooltip avec formule : "HPS = INT × 0.5 + WIS × 0.3"
  - Highlight bleu (border-left) car mention "Donjons"

---

## ✅ VALIDATION VISUELLE

- [ ] Au lancement : **0 onglets** Alt/Donjons visibles
- [ ] M11 (Lvl 30) : **1 onglet** 🎭 apparaît avec bounce + glow
- [ ] M13 (3 alts) : **1 onglet** 🏰 apparaît avec bounce + glow
- [ ] Hover stats : **6 tooltips** s'affichent avec formules
- [ ] Tooltips stats : **Responsive** (mobile : en dessous)
- [ ] Tooltips stats : **Color-coded** (PV rouge, Donjons bleu)
- [ ] Console : **0 erreur** `getCarryState is not a function`

---

## 🎬 GIF ANIMATION ATTENDUE

```
[Frame 0] Barre navigation : ⚔️ 🔨 ⚗️ 🎒 🏘️ 🐉 👥
                            (pas de 🎭 ni 🏰)

[Frame 1] Level 30 → M11 complétée

[Frame 2] 🎭 commence à apparaître (scale 0.5, opacity 0)
          Barre : ⚔️ 🔨 ⚗️ 🎒 🏘️ [🎭?] 🐉 👥

[Frame 3] 🎭 overshoot (scale 1.1, glow doré)
          Barre : ⚔️ 🔨 ⚗️ 🎒 🏘️ [🎭✨] 🐉 👥

[Frame 4] 🎭 bounce back (scale 0.95)
          Barre : ⚔️ 🔨 ⚗️ 🎒 🏘️ [🎭] 🐉 👥

[Frame 5] 🎭 stable (scale 1, glow fade out)
          Barre : ⚔️ 🔨 ⚗️ 🎒 🏘️ 🎭 🐉 👥

[Repeat pour 🏰 après M13]
```

---

## 🚀 RÉSULTAT ATTENDU

**Avant M11** : Aucun indice du système Alt Characters  
**Après M11** : 🎉 SURPRISE ! Onglet 🎭 apparaît avec animation WOW  
**Après M13** : 🎉 SURPRISE BIS ! Onglet 🏰 apparaît avec animation WOW

**Effet psychologique** :

- Joueur ne sait pas que le système existe
- Déblocage crée un **moment "WOW"** mémorable
- Animation attire l'attention sur la nouveauté
- Encourage exploration du nouveau contenu

**Tout est prêt pour le test ! 🎮**
