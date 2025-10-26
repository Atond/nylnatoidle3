# 📋 TÂCHES FUTURES - Nyln'ato Idle RPG

**Dernière mise à jour :** 26 octobre 2025

---

## 🔥 PRIORITÉ HAUTE (Cette semaine)

### ✅ 1. Mode DEBUG désactivé

**Status :** ✅ **FAIT**  
**Date :** 26 octobre 2025  
**Temps :** 5 min  
**Fichier :** `src/config/game-config.js`

```javascript
DEBUG: {
  enabled: false, // ✅ PRODUCTION MODE
}
```

---

### 📝 2. Corriger Erreurs TypeScript

**Status :** ✅ **FAIT**  
**Date :** 26 octobre 2025  
**Temps estimé :** 2h  
**Temps réel :** 30 min

**Fichier créé :** `src/types/global.d.ts`

**Impact :** 89 erreurs TypeScript corrigées ✅

---

### 🗑️ 3. Nettoyer Fichiers Markdown

**Status :** ⏳ **EN ATTENTE** (script prêt)  
**Temps estimé :** 30 min

**Fichiers à supprimer :** 18 fichiers temporaires  
**Fichiers à archiver :** 2 anciens rapports

**Action :**

```powershell
.\cleanup-files.ps1
```

---

### ⚡ 4. Débouncer updateInventory()

**Status :** ⏳ **TODO**  
**Temps estimé :** 1h  
**Priorité :** 🟡 Moyenne

**Objectif :** Réduire appels répétés de `updateInventory()`

**Implémentation :**

```javascript
// Dans ui.js - constructor
this.debouncedUpdateInventory = this.debounce(
    () => this._updateInventory(),
    200 // 200ms
);

debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Remplacer tous les appels
// this.updateInventory() → this.debouncedUpdateInventory()
```

**Gain estimé :** +10-15% performance UI

---

### 🛡️ 5. Améliorer Nettoyage setInterval

**Status :** ⏳ **TODO**  
**Temps estimé :** 1h  
**Priorité :** 🟡 Moyenne

**Fichier :** `src/js/game.js`

**Objectif :** Éviter memory leaks lors du reset

**Implémentation :**

```javascript
reset() {
    // ✅ Nettoyer TOUS les intervals avant reset
    if (this.professionManager) {
        ['woodcutter', 'miner', 'herbalist', 'fisher'].forEach(profId => {
            this.professionManager.stopAutoGather(profId);
        });
    }

    if (this.craftingManager?.autoCraftState?.intervalId) {
        clearInterval(this.craftingManager.autoCraftState.intervalId);
    }

    if (this.altCharacterManager) {
        this.altCharacterManager.stopAllAFK();
    }

    // Nettoyer game loop
    if (this.gameLoopId) {
        cancelAnimationFrame(this.gameLoopId);
    }

    if (this.autoSaveIntervalId) {
        clearInterval(this.autoSaveIntervalId);
    }

    // Ensuite reset normal...
    // ... code existant
}
```

---

## 🟡 PRIORITÉ MOYENNE (Ce mois-ci)

### 🎨 6. Animations Dégâts Flottants

**Status :** ⏳ **TODO**  
**Temps estimé :** 2h  
**Priorité :** 🟡 Moyenne

**Objectif :** Feedback visuel lors des attaques

**Fichiers :**

- `src/css/animations.css`
- `src/js/ui.js`

**Implémentation :**

```css
/* animations.css */
.damage-number {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: #ff6b6b;
  animation: floatUp 1s ease-out forwards;
  pointer-events: none;
  z-index: 9999;
}

.damage-number.critical {
  color: #ff0000;
  font-size: 32px;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}
```

```javascript
// ui.js
showDamage(damage, isCritical, x, y) {
    const dmgElement = document.createElement('div');
    dmgElement.className = isCritical ? 'damage-number critical' : 'damage-number';
    dmgElement.textContent = `-${damage}`;
    dmgElement.style.left = x + 'px';
    dmgElement.style.top = y + 'px';

    document.body.appendChild(dmgElement);
    setTimeout(() => dmgElement.remove(), 1000);
}
```

---

### 📊 7. Tooltips Stats Détaillés

**Status :** ⏳ **TODO**  
**Temps estimé :** 3h  
**Priorité :** 🟡 Moyenne

**Objectif :** Afficher détails des stats (base, équipement, classe, etc.)

**Fichiers :**

- `src/css/stats-tooltips.css`
- `src/js/ui.js`

**Exemple :**

```html
<div class="stat-tooltip">
  <h4>💪 Force</h4>
  <p>Valeur actuelle : <strong>25</strong></p>
  <hr />
  <p>Base : 5</p>
  <p>Équipement : +15</p>
  <p>Classe (Guerrier) : +2</p>
  <p>Niveaux : +3</p>
  <hr />
  <p><em>Effet : +25 dégâts physiques</em></p>
</div>
```

---

### 🎯 8. Système d'Events (Pub/Sub)

**Status :** ⏳ **TODO**  
**Temps estimé :** 4-6h  
**Priorité :** 🟡 Moyenne

**Objectif :** Découpler combat → quests → UI

**Fichier :** `src/js/event-bus.js` (nouveau)

**Implémentation :**

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((cb) => cb(data));
  }
}

// Export global
if (typeof window !== "undefined") {
  window.EventBus = new EventBus();
}
```

**Usage :**

```javascript
// Dans quest-manager.js
EventBus.on("monsterKilled", (monster) => {
  this.updateKillQuest(monster.name);
});

// Dans combat.js
EventBus.emit("monsterKilled", this.currentMonster);
```

**Avantages :**

- ✅ Meilleur découplage
- ✅ Facilite les tests
- ✅ Plus facile d'ajouter de nouvelles fonctionnalités

---

### 🎮 9. Ajuster Équilibrage Boss Région 5

**Status :** ⏳ **TODO**  
**Temps estimé :** 1h  
**Priorité :** 🟢 Basse

**Objectif :** Réduire difficulté boss fin de jeu

**Fichier :** `src/config/monsters-data.js`

**Action :** Réduire HP boss Région 5 de 10-15%

```javascript
// Boss Région 5 (avant)
baseStats: {
    hp: 1500, // ❌ Trop dur
}

// Boss Région 5 (après)
baseStats: {
    hp: 1300, // ✅ Mieux équilibré (-13%)
}
```

---

## 🟢 PRIORITÉ BASSE (Trimestre)

### 📦 10. Lazy Loading Inventaire

**Status :** ⏳ **TODO**  
**Temps estimé :** 4-6h  
**Priorité :** 🟢 Basse

**Objectif :** Afficher seulement items visibles (scrolling virtuel)

**Gain :** +20% performance avec 100+ items

---

### ⚙️ 11. Web Workers Offline Progress

**Status :** ⏳ **TODO**  
**Temps estimé :** 6-8h  
**Priorité :** 🟢 Basse

**Objectif :** Calculer offline progress dans un worker

**Gain :** +30% chargement initial

---

### 🧪 12. Tests Unitaires

**Status :** ⏳ **TODO**  
**Temps estimé :** 1-2 semaines  
**Priorité :** 🟢 Basse

**Objectif :** Couvrir combat, player, crafting

**Setup :**

- Jest
- Tests coverage
- CI/CD pipeline

---

### 🌍 13. Internationalisation (i18n)

**Status :** ⏳ **TODO**  
**Temps estimé :** 1 semaine  
**Priorité :** 🟢 Basse

**Objectif :** Support multi-langues (FR, EN, ES, DE)

**Fichiers :**

- `src/lang/fr.json`
- `src/lang/en.json`
- `src/js/i18n.js`

---

## 📊 PROGRESSION GLOBALE

```
Haute Priorité    : 2/5  (40%)  ✅✅⏳⏳⏳
Moyenne Priorité  : 0/4  (0%)   ⏳⏳⏳⏳
Basse Priorité    : 0/4  (0%)   ⏳⏳⏳⏳
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL             : 2/13 (15%)  ▓▓░░░░░░░░
```

---

## 📝 NOTES

### Fichiers Créés

1. ✅ `RAPPORT-ANALYSE-FINALE.md` - Rapport complet
2. ✅ `src/types/global.d.ts` - Déclarations TypeScript
3. ✅ `cleanup-files.ps1` - Script de nettoyage
4. ✅ `TACHES-FUTURES.md` - Ce fichier

### Fichiers Modifiés

1. ✅ `src/config/game-config.js` - DEBUG désactivé

---

**Prochaine mise à jour :** Après implémentation des tâches Haute Priorité
