# 🔍 Guide de Recherche des Corrections

**Pour les développeurs**: Comment retrouver rapidement les corrections dans le code

---

## 🏷️ Tags de Recherche

Toutes les corrections sont marquées avec des emojis spécifiques :

- `🏗️ FIX:` = Correction architecturale (couplage, injection, etc.)
- `🛡️ FIX:` = Correction de sécurité ou protection
- `⚡ FIX:` = Correction de performance
- `🎨 FIX:` = Correction UI/UX

---

## 📂 Recherche par Fichier

### 1. `src/js/combat.js`

**Rechercher**: `isSpawning`

**Lignes modifiées**:

```javascript
// Ligne ~38
this.isSpawning = false;

// Ligne ~60-67
spawnMonster() {
    if (this.isSpawning) {
        console.warn('⚠️ Spawn déjà en cours...');
        return;
    }
    this.isSpawning = true;
    // ...
}
```

**Commande grep**:

```bash
grep -n "isSpawning" src/js/combat.js
```

---

### 2. `src/js/player.js`

**Rechercher**: `equipmentManager = null`

**Lignes modifiées**:

```javascript
// Ligne ~6
constructor(equipmentManager = null) {
    this.equipmentManager = equipmentManager;
    // ...
}

// Ligne ~215 (avant: window.game.equipmentManager)
if (this.equipmentManager) {
    const equipStats = this.equipmentManager.calculateTotalStats();
}

// Ligne ~270 (avant: window.game.equipmentManager)
if (this.equipmentManager) {
    // ...
}

// Ligne ~313 (avant: window.game.equipmentManager)
if (this.equipmentManager) {
    // ...
}
```

**Commande grep**:

```bash
grep -n "this.equipmentManager" src/js/player.js
```

---

### 3. `src/js/game.js`

**Rechercher**: `new Player(this.equipmentManager)`

**Lignes modifiées**:

```javascript
// Ligne ~53
this.equipmentManager = new EquipmentManager(this);

// Ligne ~56 (avant: new Player())
this.player = new Player(this.equipmentManager);
```

**Commande grep**:

```bash
grep -n "new Player" src/js/game.js
```

---

### 4. `src/config/alchemy-data.js`

**Rechercher**: `ALCHEMY_PRODUCTION_CONFIG`

**Lignes ajoutées** (fin du fichier):

```javascript
// Ligne ~278-283
export const ALCHEMY_PRODUCTION_CONFIG = {
  labPassiveXpMultiplier: 0.25,
  description: "...",
};

// Ligne ~293
window.ALCHEMY_PRODUCTION_CONFIG = ALCHEMY_PRODUCTION_CONFIG;
```

**Commande grep**:

```bash
grep -n "ALCHEMY_PRODUCTION_CONFIG" src/config/alchemy-data.js
```

---

### 5. `src/js/building-manager.js`

**Rechercher**: `labPassiveXpMultiplier`

**Lignes modifiées**:

```javascript
// Ligne ~248 (avant: * 0.25)
const labXpMultiplier = window.ALCHEMY_PRODUCTION_CONFIG?.labPassiveXpMultiplier || 0.25;

// Ligne ~251
const xpGained = Math.floor(conversion.xpGain * conversionsToMake * labXpMultiplier);

// Ligne ~256
console.log(`🧪 Labo: ... | XP: ${xpGained} (${labXpMultiplier * 100}%)`);
```

**Commande grep**:

```bash
grep -n "labXpMultiplier" src/js/building-manager.js
```

---

### 6. `src/js/ui.js`

**Rechercher**: `requestAnimationFrame`

**Lignes modifiées**:

```javascript
// Ligne ~2576 (avant: setTimeout(..., 0))
requestAnimationFrame(() => {
  console.log("🔄 DOM prêt...");

  const slider = document.getElementById("quantitySlider");
  if (slider) {
    this.updateModalQuantity(1, maxPossible);
  } else {
    // Retry
    requestAnimationFrame(() => {
      this.updateModalQuantity(1, maxPossible);
    });
  }
});
```

**Commande grep**:

```bash
grep -n "requestAnimationFrame" src/js/ui.js
```

---

### 7. `src/js/crafting-manager.js`

**Rechercher**: `_craftHistory` ou `_penaltyEndTime`

**Lignes ajoutées**:

```javascript
// Ligne ~17-28 (constructor)
this._lastCraftTime = 0;
this._baseCooldown = 100;
this._cooldownVariance = 20;
this._craftHistory = [];
this._maxHistorySize = 20;
this._maxCraftsPerMinute = 100;
this._penaltyEndTime = 0;
this._penaltyDuration = 5000;

// Ligne ~95-150 (startCraft)
if (now < this._penaltyEndTime) {
    // Pénalité active
}

// Cooldown variable
const cooldown = this._baseCooldown + (Math.random() * ...);

// Historique
this._craftHistory.push(now);
const recentCrafts = this._craftHistory.filter(...);

if (recentCrafts.length > this._maxCraftsPerMinute) {
    // Appliquer pénalité
    this._penaltyEndTime = now + this._penaltyDuration;
}
```

**Commande grep**:

```bash
grep -n "_craftHistory\|_penaltyEndTime" src/js/crafting-manager.js
```

---

## 🔎 Recherche Globale

### Rechercher toutes les corrections

**PowerShell**:

```powershell
Get-ChildItem -Path src -Recurse -Include *.js | Select-String "🏗️ FIX:|🛡️ FIX:"
```

**Bash/Linux**:

```bash
grep -r "🏗️ FIX:\|🛡️ FIX:" src/
```

**VS Code**:

1. Ctrl+Shift+F (Recherche globale)
2. Chercher: `🏗️ FIX:|🛡️ FIX:`
3. Dans: `src/`

---

## 📊 Statistiques des Modifications

| Fichier             | Lignes ajoutées | Lignes modifiées | Lignes supprimées |
| ------------------- | --------------- | ---------------- | ----------------- |
| combat.js           | 3               | 5                | 0                 |
| player.js           | 2               | 9                | 0                 |
| game.js             | 1               | 2                | 0                 |
| alchemy-data.js     | 10              | 1                | 0                 |
| building-manager.js | 3               | 5                | 2                 |
| ui.js               | 8               | 3                | 1                 |
| crafting-manager.js | 35              | 10               | 2                 |
| **TOTAL**           | **62**          | **35**           | **5**             |

---

## 🎯 Vérification Rapide

### Test 1: Toutes les corrections présentes ?

**Commande PowerShell**:

```powershell
$corrections = @(
    "src/js/combat.js:isSpawning",
    "src/js/player.js:equipmentManager = null",
    "src/js/game.js:new Player(this.equipmentManager)",
    "src/config/alchemy-data.js:ALCHEMY_PRODUCTION_CONFIG",
    "src/js/building-manager.js:labPassiveXpMultiplier",
    "src/js/ui.js:requestAnimationFrame",
    "src/js/crafting-manager.js:_penaltyEndTime"
)

foreach ($correction in $corrections) {
    $parts = $correction -split ":"
    $file = $parts[0]
    $search = $parts[1]

    $found = Select-String -Path $file -Pattern $search -Quiet

    if ($found) {
        Write-Host "✅ $correction" -ForegroundColor Green
    } else {
        Write-Host "❌ $correction" -ForegroundColor Red
    }
}
```

---

## 🔧 Debugging des Corrections

### Si une correction ne fonctionne pas

1. **Vérifier que le fichier est chargé**

```javascript
// Console
console.log(window.ALCHEMY_PRODUCTION_CONFIG); // Devrait être défini
console.log(game.player.equipmentManager); // Devrait être défini
```

2. **Vérifier l'ordre de chargement** (index.html)

```html
<!-- Alchemy data AVANT building-manager -->
<script src="src/config/alchemy-data.js"></script>
<script src="src/js/building-manager.js"></script>
```

3. **Vérifier les logs console**

```javascript
// Rechercher ces messages
"🏗️ FIX:"; // Corrections architecturales
"🛡️ FIX:"; // Corrections de protection
"⚠️"; // Warnings attendus
```

---

## 📝 Changelog Format

Pour documenter les futures corrections, utiliser ce format :

```javascript
// 🏗️ FIX [DATE] [AUTEUR]: Description courte
// Problème: Explication du bug
// Solution: Explication de la correction
// Impact: Quels systèmes sont affectés
```

**Exemple**:

```javascript
// 🏗️ FIX 2025-10-18 [Team]: Injection de dépendances dans Player
// Problème: Couplage fort avec window.game.equipmentManager
// Solution: Injection via constructeur
// Impact: Tests unitaires facilités, couplage réduit
constructor(equipmentManager = null) {
    this.equipmentManager = equipmentManager;
}
```

---

**Dernière mise à jour**: 2025-10-18
