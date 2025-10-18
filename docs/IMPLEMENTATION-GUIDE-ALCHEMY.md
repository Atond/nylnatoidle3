# 🛠️ GUIDE D'IMPLÉMENTATION - SYSTÈME ALCHIMIE

> **Date** : 12 Octobre 2025  
> **Pour** : Développeurs  
> **Temps estimé** : 15-20 heures  
> **Difficulté** : Moyenne

---

## 📋 CHECKLIST COMPLÈTE

### **Phase 1 : Data & Configuration (2h)**

```
✅ Tâches :
□ Créer fichier src/config/alchemy-data.js
□ Définir conversions T1→T2 pour tous les tiers (Bois, Minerai)
□ Ajouter profession "alchemy" dans game-config.js
□ Créer bâtiment "Laboratoire d'Alchimie" dans buildings-data.js
□ Mettre à jour craft-recipes-data.js avec nouveaux coûts

📁 Fichiers à créer/modifier :
- src/config/alchemy-data.js (NOUVEAU)
- src/config/game-config.js (MODIFIER)
- src/config/buildings-data.js (MODIFIER)
- src/config/craft-recipes-data.js (MODIFIER)
```

---

### **Phase 2 : Backend Logic (6h)**

```
✅ Tâches :
□ Créer classe AlchemyManager (src/js/alchemy-manager.js)
□ Système de conversion (input → output avec temps)
□ Queue de conversion (max 5 simultanées)
□ Calcul XP et progression niveau
□ Bonus par palier (tous les 10 niveaux)
□ Intégration avec ProfessionManager
□ Sauvegarde/chargement état conversions

📁 Fichiers à créer/modifier :
- src/js/alchemy-manager.js (NOUVEAU)
- src/js/profession-manager.js (MODIFIER)
- src/js/storage-manager.js (MODIFIER)
- src/js/game.js (MODIFIER)
```

---

### **Phase 3 : UI & UX (5h)**

```
✅ Tâches :
□ Créer onglet "Alchimie" dans interface métiers
□ Liste conversions disponibles (avec verrous niveau)
□ Modal "Nouvelle conversion" avec slider quantité
□ File d'attente visuelle (progress bars)
□ Affichage équivalences (10 fer = 1000 cuivre)
□ Notifications conversion terminée
□ Intégration dans UI principale

📁 Fichiers à créer/modifier :
- src/css/alchemy.css (NOUVEAU)
- src/js/ui.js (MODIFIER)
- index.html (MODIFIER - ajouter tab)
```

---

### **Phase 4 : Bâtiment Laboratoire (3h)**

```
✅ Tâches :
□ Logique production passive (conversions/heure)
□ Intégration avec BuildingManager existant
□ Bonus sur vitesse conversion
□ UI upgrade laboratoire
□ Affichage production en temps réel

📁 Fichiers à modifier :
- src/js/building-manager.js
- src/js/alchemy-manager.js
- src/js/ui.js
```

---

### **Phase 5 : Balance & Tests (2h)**

```
✅ Tâches :
□ Tester toutes conversions T1→T2→T3
□ Valider XP gains
□ Vérifier bonus paliers
□ Tester queue conversions
□ Tester laboratoire production passive
□ Ajuster temps si nécessaire

📁 Fichiers à tester :
- Tous les fichiers créés/modifiés
```

---

### **Phase 6 : Mise à Jour Craft (2h)**

```
✅ Tâches :
□ Remplacer TOUS les coûts dans craft-recipes-data.js
□ Appliquer formule : 10 ressources tier N
□ Ajouter tooltips montrant équivalence T1
□ Tester crafts T1 à T5
□ Ajuster si déséquilibre

📁 Fichiers à modifier :
- src/config/craft-recipes-data.js
- src/js/crafting-manager.js (tooltips)
```

---

## 📁 STRUCTURE FICHIERS DÉTAILLÉE

### **1. src/config/alchemy-data.js**

```javascript
/**
 * Configuration des conversions alchimiques
 */

export const ALCHEMY_CONVERSIONS = {
  // BOIS
  wood_t1_to_t2: {
    id: "wood_t1_to_t2",
    name: "Raffiner Bois d'Érable",
    tier: 1,

    input: { resourceId: "wood_oak", amount: 100 },
    output: { resourceId: "wood_maple", amount: 1 },

    requiredLevel: 1, // Alchemy niveau 1
    time: 5, // 5 secondes
    xpGain: 10,

    description: "100 chêne brut → 1 érable raffiné",
  },

  wood_t2_to_t3: {
    id: "wood_t2_to_t3",
    name: "Raffiner Bois de Noyer",
    tier: 2,

    input: { resourceId: "wood_maple", amount: 100 },
    output: { resourceId: "wood_walnut", amount: 1 },

    requiredLevel: 10,
    time: 10,
    xpGain: 50,

    description: "100 érable → 1 noyer ancien",
  },

  // TODO : Ajouter T3→T4, T4→T5, etc.

  // MINERAI
  ore_t1_to_t2: {
    id: "ore_t1_to_t2",
    name: "Raffiner Fer",
    tier: 1,

    input: { resourceId: "ore_copper", amount: 100 },
    output: { resourceId: "ore_iron", amount: 1 },

    requiredLevel: 1,
    time: 5,
    xpGain: 10,

    description: "100 cuivre brut → 1 fer purifié",
  },

  ore_t2_to_t3: {
    id: "ore_t2_to_t3",
    name: "Forger Acier",
    tier: 2,

    input: { resourceId: "ore_iron", amount: 100 },
    output: { resourceId: "ore_steel", amount: 1 },

    requiredLevel: 10,
    time: 10,
    xpGain: 50,

    description: "100 fer → 1 acier trempé",
  },

  // TODO : Ajouter T3→T4, T4→T5, etc.
};

export const ALCHEMY_CONFIG = {
  maxQueueSize: 5, // Max 5 conversions en parallèle

  // Bonus par niveau
  bonuses: {
    10: {
      speedBonus: 0.1, // -10% temps
      batchSize: 2, // ×2 conversions simultanées
      unlockTier: 2,
    },
    20: {
      speedBonus: 0.2,
      batchSize: 5,
      unlockTier: 3,
      bonusOutput: 0.05, // 5% chance double output
    },
    30: {
      speedBonus: 0.3,
      batchSize: 10,
      unlockTier: 4,
      bonusOutput: 0.1,
    },
    50: {
      speedBonus: 0.5,
      batchSize: 100,
      unlockTier: 5,
      bonusOutput: 0.2,
      autoConvert: true, // Conversion passive activée
    },
  },
};
```

---

### **2. src/js/alchemy-manager.js**

```javascript
/**
 * Gestion du système d'alchimie
 */

import { ALCHEMY_CONVERSIONS, ALCHEMY_CONFIG } from "../config/alchemy-data.js";

export class AlchemyManager {
  constructor(game) {
    this.game = game;
    this.level = 1;
    this.xp = 0;
    this.conversionQueue = []; // Max 5 conversions actives
    this.totalConversions = 0;
  }

  /**
   * Démarre une nouvelle conversion
   */
  startConversion(conversionId, quantity = 1) {
    const conversion = ALCHEMY_CONVERSIONS[conversionId];

    if (!conversion) {
      console.error("Conversion inconnue:", conversionId);
      return false;
    }

    // Vérifier niveau requis
    if (this.level < conversion.requiredLevel) {
      this.game.ui.showNotification(`Alchimie niveau ${conversion.requiredLevel} requis`, "error");
      return false;
    }

    // Vérifier ressources
    const totalInput = conversion.input.amount * quantity;
    if (!this.game.player.hasResource(conversion.input.resourceId, totalInput)) {
      this.game.ui.showNotification(
        `Ressources insuffisantes : ${totalInput} ${conversion.input.resourceId}`,
        "error"
      );
      return false;
    }

    // Vérifier queue
    if (this.conversionQueue.length >= ALCHEMY_CONFIG.maxQueueSize) {
      this.game.ui.showNotification("File de conversion pleine (max 5)", "warning");
      return false;
    }

    // Consommer ressources
    this.game.player.removeResource(conversion.input.resourceId, totalInput);

    // Calculer temps avec bonus
    const baseTime = conversion.time * 1000; // Convertir en ms
    const speedBonus = this.getSpeedBonus();
    const finalTime = baseTime * (1 - speedBonus);

    // Ajouter à la queue
    const queueItem = {
      id: Date.now(),
      conversionId,
      quantity,
      startTime: Date.now(),
      endTime: Date.now() + finalTime * quantity,
      duration: finalTime * quantity,
      conversion,
    };

    this.conversionQueue.push(queueItem);

    this.game.ui.showNotification(
      `Conversion démarrée : ${conversion.name} ×${quantity}`,
      "success"
    );

    return true;
  }

  /**
   * Mise à jour (appelé chaque frame)
   */
  update(deltaTime) {
    const now = Date.now();

    // Vérifier conversions terminées
    this.conversionQueue = this.conversionQueue.filter((item) => {
      if (now >= item.endTime) {
        this.completeConversion(item);
        return false;
      }
      return true;
    });
  }

  /**
   * Termine une conversion
   */
  completeConversion(item) {
    const conversion = item.conversion;
    let outputAmount = conversion.output.amount * item.quantity;

    // Chance bonus output
    const bonusChance = this.getBonusOutputChance();
    if (Math.random() < bonusChance) {
      outputAmount *= 2;
      this.game.ui.showNotification("✨ Conversion critique ! Double output !", "legendary");
    }

    // Ajouter ressources
    this.game.player.addResource(conversion.output.resourceId, outputAmount);

    // Gain XP
    const xpGain = conversion.xpGain * item.quantity;
    this.gainXP(xpGain);

    // Stats
    this.totalConversions += item.quantity;

    this.game.ui.showNotification(
      `Conversion terminée : +${outputAmount} ${conversion.output.resourceId}`,
      "success"
    );
  }

  /**
   * Gain XP alchimie
   */
  gainXP(amount) {
    this.xp += amount;

    // Vérifier level up
    const xpRequired = this.getXPRequired(this.level + 1);
    if (this.xp >= xpRequired) {
      this.levelUp();
    }
  }

  /**
   * Level up alchimie
   */
  levelUp() {
    this.level++;
    this.xp = 0;

    this.game.ui.showNotification(`🧪 Alchimie niveau ${this.level} !`, "legendary");

    // Vérifier déblocages
    this.checkUnlocks();
  }

  /**
   * XP requis pour niveau N
   */
  getXPRequired(level) {
    return 100 * Math.pow(1.5, level);
  }

  /**
   * Bonus vitesse conversion
   */
  getSpeedBonus() {
    let bonus = 0;

    for (const [levelReq, bonusData] of Object.entries(ALCHEMY_CONFIG.bonuses)) {
      if (this.level >= parseInt(levelReq)) {
        bonus = Math.max(bonus, bonusData.speedBonus || 0);
      }
    }

    return bonus;
  }

  /**
   * Chance bonus output
   */
  getBonusOutputChance() {
    let chance = 0;

    for (const [levelReq, bonusData] of Object.entries(ALCHEMY_CONFIG.bonuses)) {
      if (this.level >= parseInt(levelReq)) {
        chance = Math.max(chance, bonusData.bonusOutput || 0);
      }
    }

    return chance;
  }

  /**
   * Vérifier déblocages
   */
  checkUnlocks() {
    // TODO : Notifications déblocages conversions T2→T3, etc.
  }

  /**
   * Sauvegarder état
   */
  save() {
    return {
      level: this.level,
      xp: this.xp,
      totalConversions: this.totalConversions,
      conversionQueue: this.conversionQueue,
    };
  }

  /**
   * Charger état
   */
  load(data) {
    this.level = data.level || 1;
    this.xp = data.xp || 0;
    this.totalConversions = data.totalConversions || 0;
    this.conversionQueue = data.conversionQueue || [];
  }
}
```

---

### **3. Intégration dans game.js**

```javascript
// Dans src/js/game.js

import { AlchemyManager } from "./alchemy-manager.js";

class Game {
  constructor() {
    // ... autres managers

    this.alchemyManager = new AlchemyManager(this);
  }

  init() {
    // ... autres inits

    // Charger alchimie si sauvegarde existe
    const savedAlchemy = this.storageManager.load("alchemy");
    if (savedAlchemy) {
      this.alchemyManager.load(savedAlchemy);
    }
  }

  gameLoop(timestamp) {
    // ... autres updates

    this.alchemyManager.update(deltaTime);
  }

  save() {
    // ... autres saves

    this.storageManager.save("alchemy", this.alchemyManager.save());
  }
}
```

---

## 🎨 UI HTML EXEMPLE

### **Onglet Alchimie**

```html
<!-- Dans index.html -->

<div id="alchemy-tab" class="tab-content" style="display: none;">
  <div class="alchemy-container">
    <!-- Header -->
    <div class="alchemy-header">
      <h2>🧪 Alchimie</h2>
      <div class="alchemy-level">
        <span>Niveau <span id="alchemy-level">1</span></span>
        <div class="xp-bar">
          <div class="xp-fill" id="alchemy-xp-fill"></div>
        </div>
        <span class="xp-text">
          <span id="alchemy-xp-current">0</span> / <span id="alchemy-xp-required">150</span> XP
        </span>
      </div>
    </div>

    <!-- Conversions disponibles -->
    <div class="conversions-list">
      <h3>📦 Conversions Disponibles</h3>

      <!-- Bois -->
      <div class="conversion-category">
        <h4>🌲 Bois</h4>
        <div class="conversions">
          <div class="conversion-card" data-conversion="wood_t1_to_t2">
            <div class="conversion-icon">T1→T2</div>
            <div class="conversion-info">
              <h5>Raffiner Bois d'Érable</h5>
              <p class="conversion-formula">
                100 <span class="resource-icon">🌳</span> Chêne → 1
                <span class="resource-icon">🍁</span> Érable
              </p>
              <p class="conversion-time">⏱️ 5 secondes</p>
            </div>
            <button class="btn-convert">Convertir</button>
          </div>

          <div class="conversion-card locked" data-conversion="wood_t2_to_t3">
            <div class="conversion-icon">T2→T3</div>
            <div class="conversion-info">
              <h5>Raffiner Bois de Noyer</h5>
              <p class="locked-text">🔒 Requis : Alchimie niveau 10</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Minerai -->
      <div class="conversion-category">
        <h4>⛏️ Minerai</h4>
        <div class="conversions">
          <!-- Similaire aux bois -->
        </div>
      </div>
    </div>

    <!-- Queue de conversion -->
    <div class="conversion-queue">
      <h3>🔄 File de Conversion (0/5)</h3>
      <div id="queue-list">
        <!-- Généré dynamiquement -->
      </div>
    </div>

    <!-- Stats -->
    <div class="alchemy-stats">
      <h3>📊 Statistiques</h3>
      <ul>
        <li>Vitesse : <span id="alchemy-speed-bonus">+0%</span></li>
        <li>Taille batch : <span id="alchemy-batch-size">×1</span></li>
        <li>Chance double : <span id="alchemy-bonus-chance">0%</span></li>
        <li>Conversions totales : <span id="alchemy-total">0</span></li>
      </ul>
    </div>
  </div>
</div>
```

---

## 🎯 ORDRE D'IMPLÉMENTATION RECOMMANDÉ

### **Semaine 1 : Backend**

```
Jour 1-2 : Data (Phase 1)
Jour 3-5 : AlchemyManager (Phase 2)
Jour 6-7 : Tests backend
```

### **Semaine 2 : Frontend + Finalisation**

```
Jour 1-3 : UI/UX (Phase 3)
Jour 4-5 : Laboratoire (Phase 4)
Jour 6 : Craft update (Phase 6)
Jour 7 : Tests finaux + polish
```

---

## ⚠️ POINTS D'ATTENTION

### **1. Performance**

```javascript
// ❌ MAUVAIS : Boucle chaque conversion chaque frame
update() {
    this.conversionQueue.forEach(item => {
        // Calculs lourds...
    });
}

// ✅ BON : Calculer seulement si changement
update(deltaTime) {
    const now = Date.now();

    // Filtrer seulement si conversions terminées
    if (this.conversionQueue.some(item => now >= item.endTime)) {
        this.processCompletedConversions();
    }
}
```

### **2. Sauvegarde**

```javascript
// ❌ MAUVAIS : Sauvegarder timestamps absolus
save() {
    return {
        conversionQueue: this.conversionQueue // Timestamps invalides après reload
    };
}

// ✅ BON : Sauvegarder temps restant
save() {
    const now = Date.now();
    return {
        conversionQueue: this.conversionQueue.map(item => ({
            ...item,
            timeRemaining: item.endTime - now
        }))
    };
}

load(data) {
    const now = Date.now();
    this.conversionQueue = data.conversionQueue.map(item => ({
        ...item,
        startTime: now,
        endTime: now + item.timeRemaining
    }));
}
```

### **3. Affichage Grands Nombres**

```javascript
// Utiliser le formatter existant
import { formatNumber } from './utils/number-formatter.js';

// Afficher équivalences
showEquivalence(tier) {
    const totalT1 = Math.pow(100, tier);
    return `= ${formatNumber(totalT1)} ressources T1`;
}

// Exemple
// T3 = 10,000 T1 → "= 10.00K ressources T1"
```

---

## ✅ TESTS À EFFECTUER

### **Tests Unitaires**

```javascript
// Test conversion simple
test("Conversion T1→T2", () => {
  player.addResource("wood_oak", 1000);
  alchemy.startConversion("wood_t1_to_t2", 10);

  expect(player.getResource("wood_oak")).toBe(0);
  expect(alchemy.conversionQueue.length).toBe(1);

  // Simuler fin conversion
  alchemy.completeConversion(alchemy.conversionQueue[0]);

  expect(player.getResource("wood_maple")).toBe(10);
});

// Test bonus output
test("Bonus output chance", () => {
  alchemy.level = 20; // Débloque 5% chance double

  let doubles = 0;
  for (let i = 0; i < 1000; i++) {
    const output = alchemy.rollBonusOutput(1);
    if (output === 2) doubles++;
  }

  // Doit être proche de 5%
  expect(doubles).toBeCloseTo(50, 20);
});
```

### **Tests Manuels**

```
□ Tester conversion avec ressources insuffisantes (doit refuser)
□ Tester queue pleine (doit refuser)
□ Tester level up alchimie (notifications, déblocages)
□ Tester sauvegarde/chargement pendant conversion
□ Tester offline : lancer conversion, fermer, rouvrir (doit terminer)
□ Tester bâtiment laboratoire production
□ Tester craft avec nouveaux coûts T2/T3/T4
□ Tester progression complète niveau 1→30
```

---

## 📚 RESSOURCES

### **Fichiers de Référence**

- `docs/BALANCE-ALCHEMY.md` - Spécifications complètes
- `docs/BALANCE-RESOURCE-ECONOMY.md` - Vision économique
- `docs/BALANCE-CRAFTING-REVISED.md` - Nouveaux coûts

### **Code Existant à Étudier**

- `src/js/profession-manager.js` - Pour progression XP
- `src/js/crafting-manager.js` - Pour système de queue
- `src/js/building-manager.js` - Pour production passive

---

## 🎯 OBJECTIFS DE QUALITÉ

### **Performance**

- ✅ 60 FPS constant même avec 5 conversions actives
- ✅ Temps de sauvegarde < 100ms
- ✅ Pas de memory leaks

### **UX**

- ✅ Feedback immédiat sur chaque action
- ✅ Tooltips explicatifs partout
- ✅ Notifications non-intrusives
- ✅ Mobile-friendly (si applicable)

### **Code Quality**

- ✅ JSDoc sur toutes les fonctions publiques
- ✅ Gestion erreurs robuste
- ✅ Code lisible et maintenable
- ✅ Pas de duplication

---

## 🚀 APRÈS L'IMPLÉMENTATION

### **Suivi & Ajustements**

```
1. Collecter feedback joueurs sur temps conversions
2. Ajuster ratios si déséquilibre détecté
3. Ajouter conversions T6→T7, T7→T8 selon besoin
4. Implémenter "skip tiers" niveau 100+ (optionnel)
```

### **Futures Améliorations**

```
- Conversion de masse (1000× en une fois)
- Auto-conversion intelligente (AI qui convertit selon besoins)
- Talents spécifiques alchimie
- Quêtes alchimie
- Succès/achievements
```

---

## ❓ FAQ DÉVELOPPEURS

**Q : Pourquoi ratio 100:1 et pas 50:1 ou 1000:1 ?**  
R : Compromis prouvé par NGU Idle et Kittens Game. 50:1 trop généreux, 1000:1 trop punitif.

**Q : Pourquoi pas conversion directe T1→T3 ?**  
R : Progression graduelle plus satisfaisante. Peut être ajoutée niveau 100+ comme bonus.

**Q : Comment gérer offline conversions ?**  
R : Calculer temps écoulé, terminer conversions dans l'ordre, limiter à 12h max.

**Q : Que faire si joueur spamme conversions ?**  
R : Queue limitée à 5, ressources consommées immédiatement = protection naturelle.

**Q : Comment afficher grands nombres (milliards) ?**  
R : Utiliser `formatNumber()` existant avec K/M/B/T notation.

---

**Besoin d'aide ? Consulter les docs/BALANCE-\*.md !**

**Bon développement ! 🚀**
