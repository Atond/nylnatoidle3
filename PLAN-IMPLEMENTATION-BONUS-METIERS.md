# 🎯 PLAN D'IMPLÉMENTATION - BONUS MÉTIERS COMPLETS

> **Date** : 27 Octobre 2025  
> **Objectif** : Rendre les niveaux de métiers UTILES (actuellement inutiles)  
> **Temps estimé** : 3-4 heures

---

## 📊 ANALYSE : MÉTIERS RÉCOLTE vs CRAFT

### 🌲 **Métiers de RÉCOLTE** (4 métiers)

**Actuellement** : Ont déjà des bonus (selon `BALANCE-PROFESSIONS-EXPONENTIAL.md`)

- Bûcheron (Woodcutter)
- Mineur (Miner)
- Herboriste (Herbalist)
- Pêcheur (Fisher)

**Bonus existants** :

- ✅ `amountPerClick(level)` : +10% quantité par clic par niveau
- ✅ Auto-gather débloqué au niveau 5
- ✅ Drop rate augmente avec le niveau
- ✅ XP par clic augmente

**MAIS manquent** :

- ❌ **Vitesse auto-gather** (actuellement fixe à 5s)
- ❌ **Chance double drop** (documenté mais non implémenté)
- ❌ **Bonus qualité ressources** (non implémenté)
- ❌ **Chance gemme** (bonus mineur seulement)

---

### ⚒️ **Métiers de CRAFT** (7 métiers)

**Actuellement** : **AUCUN BONUS** (problème critique)

- Forgeron (Blacksmith)
- Armurier (Armorsmith)
- Bijoutier (Jeweler)
- Tailleur (Tailor)
- Alchimiste (Alchemist)
- Poissonier (Fishmonger)
- Tanneur (Tanner)

**À implémenter** :

- ❌ **Vitesse craft** (actuellement identique niveau 1 et 50)
- ❌ **Qualité items** (existe mais n'améliore pas avec niveau)
- ❌ **Chance double craft**
- ❌ **Économie matériaux**

---

## 🎯 SYSTÈME PROPOSÉ

### 1️⃣ **MÉTIERS DE RÉCOLTE** - Bonus Améliorés

#### 📋 Bonus par Niveau

```javascript
/**
 * Calcule les bonus de récolte selon le niveau
 * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
 * @param {number} level - Niveau du métier
 * @returns {object} Bonus calculés
 */
getGatheringBonuses(professionId, level) {
    const bonuses = {
        // ✅ EXISTANT (déjà implémenté partiellement)
        amountPerClick: 1 + (level * 0.1),  // +10% par niveau
        xpMultiplier: 1 + (level * 0.05),   // +5% XP par niveau

        // 🆕 NOUVEAUX BONUS
        autoGatherSpeed: 0,       // Réduction intervalle auto-gather (%)
        doubleDropChance: 0,      // Chance de drop ×2 (%)
        qualityBonus: 0,          // Chance ressource qualité supérieure (%)
        gemBonus: 0,              // Bonus chance gemme (mineur uniquement) (%)
        storageEfficiency: 0      // Bonus capacité stockage (%)
    };

    // PALIERS TOUS LES 5 NIVEAUX
    if (level >= 5) {
        bonuses.autoGatherSpeed = 10;      // -10% intervalle (5s → 4.5s)
        bonuses.doubleDropChance = 5;      // 5% chance ×2
    }
    if (level >= 10) {
        bonuses.autoGatherSpeed = 20;      // -20% (5s → 4s)
        bonuses.doubleDropChance = 10;     // 10%
        bonuses.qualityBonus = 5;          // 5% qualité sup
    }
    if (level >= 15) {
        bonuses.autoGatherSpeed = 30;      // -30% (5s → 3.5s)
        bonuses.doubleDropChance = 15;     // 15%
        bonuses.qualityBonus = 10;         // 10%
    }
    if (level >= 20) {
        bonuses.autoGatherSpeed = 40;      // -40% (5s → 3s)
        bonuses.doubleDropChance = 20;     // 20%
        bonuses.qualityBonus = 15;         // 15%
        bonuses.storageEfficiency = 10;    // +10% stockage
    }
    if (level >= 25) {
        bonuses.autoGatherSpeed = 50;      // -50% (5s → 2.5s)
        bonuses.doubleDropChance = 25;     // 25%
        bonuses.qualityBonus = 20;         // 20%
        bonuses.storageEfficiency = 20;    // +20%
    }
    if (level >= 30) {
        bonuses.autoGatherSpeed = 60;      // -60% (5s → 2s)
        bonuses.doubleDropChance = 30;     // 30%
        bonuses.qualityBonus = 25;         // 25%
        bonuses.storageEfficiency = 30;    // +30%
    }
    if (level >= 40) {
        bonuses.autoGatherSpeed = 70;      // -70% (5s → 1.5s)
        bonuses.doubleDropChance = 40;     // 40%
        bonuses.qualityBonus = 35;         // 35%
        bonuses.storageEfficiency = 50;    // +50%
    }
    if (level >= 50) {  // MASTER GATHERER
        bonuses.autoGatherSpeed = 80;      // -80% (5s → 1s) ⚡
        bonuses.doubleDropChance = 50;     // 50% (1 drop sur 2)
        bonuses.qualityBonus = 50;         // 50% qualité
        bonuses.storageEfficiency = 100;   // +100% stockage (×2)
    }

    // BONUS SPÉCIAL MINEUR : Chance gemme
    if (professionId === 'miner') {
        if (level >= 10) bonuses.gemBonus = 10;  // +10%
        if (level >= 20) bonuses.gemBonus = 25;  // +25%
        if (level >= 30) bonuses.gemBonus = 50;  // +50%
        if (level >= 50) bonuses.gemBonus = 100; // +100% (×2 gemmes)
    }

    return bonuses;
}
```

#### 📊 Impact Niveau 50 (Récolte)

| Métrique                | Niveau 1 | Niveau 50 | Gain  |
| ----------------------- | -------- | --------- | ----- |
| **Quantité/clic**       | 1        | 6         | +500% |
| **Vitesse auto-gather** | 5s       | **1s**    | +400% |
| **Chance double drop**  | 0%       | **50%**   | +50%  |
| **Qualité ressource**   | 0%       | **50%**   | +50%  |
| **Stockage**            | Base     | **×2**    | +100% |
| **XP/clic**             | 10       | 35        | +250% |

**Production/minute** :

- Niveau 1 : 12 ressources/min (1 clic + auto 5s)
- Niveau 50 : **360 ressources/min** (6 clics + auto 1s + 50% double)
- **Gain : ×30 production** ✅

---

### 2️⃣ **MÉTIERS DE CRAFT** - Système Complet

#### 📋 Bonus par Niveau

```javascript
/**
 * Calcule les bonus de craft selon le niveau
 * @param {string} professionId - 'blacksmith', 'armorsmith', 'jeweler', etc.
 * @param {number} level - Niveau du métier
 * @returns {object} Bonus calculés
 */
getCraftingBonuses(professionId, level) {
    const bonuses = {
        craftSpeed: 0,          // Réduction temps craft (%)
        qualityBonus: 0,        // Bonus stats items craftés (%)
        multiCraftChance: 0,    // Chance de craft ×2 (%)
        materialSaving: 0,      // Chance économiser 1 matériau (%)
        xpBonus: 0,             // Bonus XP craft (%)
        autoCraftSpeed: 0       // Vitesse auto-craft (si implémenté)
    };

    // PALIERS TOUS LES 5 NIVEAUX
    if (level >= 5) {
        bonuses.craftSpeed = 10;
        bonuses.qualityBonus = 5;
        bonuses.xpBonus = 10;
    }
    if (level >= 10) {
        bonuses.craftSpeed = 20;
        bonuses.qualityBonus = 10;
        bonuses.multiCraftChance = 5;  // 5% double craft
        bonuses.xpBonus = 20;
    }
    if (level >= 15) {
        bonuses.craftSpeed = 30;
        bonuses.qualityBonus = 15;
        bonuses.multiCraftChance = 10;
        bonuses.xpBonus = 30;
    }
    if (level >= 20) {
        bonuses.craftSpeed = 40;
        bonuses.qualityBonus = 20;
        bonuses.multiCraftChance = 15;
        bonuses.materialSaving = 5;    // 5% économie
        bonuses.xpBonus = 40;
    }
    if (level >= 25) {
        bonuses.craftSpeed = 50;
        bonuses.qualityBonus = 25;
        bonuses.multiCraftChance = 20;
        bonuses.materialSaving = 10;
        bonuses.xpBonus = 50;
    }
    if (level >= 30) {
        bonuses.craftSpeed = 60;
        bonuses.qualityBonus = 30;
        bonuses.multiCraftChance = 25;
        bonuses.materialSaving = 15;
        bonuses.xpBonus = 60;
    }
    if (level >= 40) {
        bonuses.craftSpeed = 80;
        bonuses.qualityBonus = 40;
        bonuses.multiCraftChance = 35;
        bonuses.materialSaving = 20;
        bonuses.xpBonus = 80;
    }
    if (level >= 50) {  // MASTER CRAFTSMAN
        bonuses.craftSpeed = 100;      // Craft 2x plus vite ⚡
        bonuses.qualityBonus = 50;     // +50% stats items
        bonuses.multiCraftChance = 50; // 50% double craft
        bonuses.materialSaving = 25;   // 25% économie
        bonuses.xpBonus = 100;         // ×2 XP
        bonuses.autoCraftSpeed = 50;   // Auto-craft 50% plus rapide
    }

    return bonuses;
}
```

#### 📊 Impact Niveau 50 (Craft)

| Métrique          | Niveau 1 | Niveau 50   | Gain  |
| ----------------- | -------- | ----------- | ----- |
| **Temps craft**   | 20s      | **10s**     | +100% |
| **Stats items**   | 100 ATK  | **150 ATK** | +50%  |
| **Craft double**  | 0%       | **50%**     | +50%  |
| **Économie mat.** | 0        | **25%**     | -25%  |
| **XP/craft**      | 10       | **20**      | +100% |

**Rentabilité** :

- Niveau 1 : 100 épées = 2000s, 1000 Fer, 100 épées
- Niveau 50 : 100 épées = **1000s, 750 Fer, 150 épées** (50 doubles)
- **Gain : ×3 efficacité totale** ✅

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### PHASE 1 : Métiers de CRAFT (PRIORITÉ)

#### Fichier 1 : `src/js/crafting-manager.js`

**Ajouter la fonction de calcul des bonus** :

```javascript
/**
 * Calcule les bonus de craft selon le niveau de profession
 */
getCraftingBonuses(professionId, level) {
    const bonuses = {
        craftSpeed: 0,
        qualityBonus: 0,
        multiCraftChance: 0,
        materialSaving: 0,
        xpBonus: 0,
        autoCraftSpeed: 0
    };

    // Paliers tous les 5 niveaux
    if (level >= 5) {
        bonuses.craftSpeed = 10;
        bonuses.qualityBonus = 5;
        bonuses.xpBonus = 10;
    }
    if (level >= 10) {
        bonuses.craftSpeed = 20;
        bonuses.qualityBonus = 10;
        bonuses.multiCraftChance = 5;
        bonuses.xpBonus = 20;
    }
    if (level >= 15) {
        bonuses.craftSpeed = 30;
        bonuses.qualityBonus = 15;
        bonuses.multiCraftChance = 10;
        bonuses.xpBonus = 30;
    }
    if (level >= 20) {
        bonuses.craftSpeed = 40;
        bonuses.qualityBonus = 20;
        bonuses.multiCraftChance = 15;
        bonuses.materialSaving = 5;
        bonuses.xpBonus = 40;
    }
    if (level >= 25) {
        bonuses.craftSpeed = 50;
        bonuses.qualityBonus = 25;
        bonuses.multiCraftChance = 20;
        bonuses.materialSaving = 10;
        bonuses.xpBonus = 50;
    }
    if (level >= 30) {
        bonuses.craftSpeed = 60;
        bonuses.qualityBonus = 30;
        bonuses.multiCraftChance = 25;
        bonuses.materialSaving = 15;
        bonuses.xpBonus = 60;
    }
    if (level >= 40) {
        bonuses.craftSpeed = 80;
        bonuses.qualityBonus = 40;
        bonuses.multiCraftChance = 35;
        bonuses.materialSaving = 20;
        bonuses.xpBonus = 80;
    }
    if (level >= 50) {
        bonuses.craftSpeed = 100;
        bonuses.qualityBonus = 50;
        bonuses.multiCraftChance = 50;
        bonuses.materialSaving = 25;
        bonuses.xpBonus = 100;
        bonuses.autoCraftSpeed = 50;
    }

    return bonuses;
}
```

**Modifier `startCraft()` pour appliquer les bonus** :

```javascript
startCraft(recipeId, sellDirectly = false) {
    const recipe = this.getAllRecipes().find(r => r.id === recipeId);
    if (!recipe) return false;

    const profession = this.game.professionManager.getProfession(recipe.profession);
    if (!profession) return false;

    // 🎯 RÉCUPÉRER BONUS
    const bonuses = this.getCraftingBonuses(recipe.profession, profession.level);

    // 🎯 APPLIQUER BONUS VITESSE
    const baseCraftTime = recipe.craftTime || 10;
    const craftTime = baseCraftTime * (1 - bonuses.craftSpeed / 100);

    // 🎯 VÉRIFIER MATÉRIAUX + ÉCONOMIE
    const materialsNeeded = [...recipe.materials]; // Copie

    for (const material of materialsNeeded) {
        // Chance d'économiser 1 matériau
        if (Math.random() * 100 < bonuses.materialSaving) {
            material.amount = Math.max(1, material.amount - 1);
            if (this.game.ui) {
                this.game.ui.showNotification(
                    `💰 Économie ! -1 ${material.resourceId}`,
                    'success'
                );
            }
        }
    }

    // Vérifier si on a les matériaux (après économie)
    for (const material of materialsNeeded) {
        const current = this.game.professionManager.getInventoryAmount(material.resourceId);
        if (current < material.amount) {
            return false;
        }
    }

    // Consommer les matériaux
    for (const material of materialsNeeded) {
        this.game.professionManager.removeFromInventory(material.resourceId, material.amount);
    }

    // 🎯 DÉTERMINER QUANTITÉ (CHANCE DOUBLE)
    let craftAmount = 1;
    if (Math.random() * 100 < bonuses.multiCraftChance) {
        craftAmount = 2;
        if (this.game.ui) {
            this.game.ui.showNotification(
                `🎉 DOUBLE CRAFT ! ×2 ${recipe.name}`,
                'legendary'
            );
        }
    }

    // 🎯 GÉNÉRER QUALITÉ AVEC BONUS
    const quality = this.generateQualityWithBonus(recipe.profession, bonuses.qualityBonus);

    // Créer l'équipement (ou directement vendre)
    for (let i = 0; i < craftAmount; i++) {
        const equipment = new Equipment(recipe, quality);

        if (sellDirectly) {
            const sellPrice = this.calculateSellPrice(equipment);
            this.game.player.gainGold(sellPrice);
        } else {
            this.game.player.addEquipment(equipment);
        }
    }

    // 🎯 GAGNER XP AVEC BONUS
    const baseXp = recipe.professionLevel * 10;
    const xpGain = baseXp * (1 + bonuses.xpBonus / 100);
    profession.gainXp(xpGain);

    // 🎯 METTRE À JOUR QUÊTES
    if (this.game.questManager) {
        this.game.questManager.updateCraftQuest(recipe.id, craftAmount);
    }

    // Notification
    if (this.game.ui) {
        const qualityIcon = equipment.getQualityIcon();
        this.game.ui.showNotification(
            `${qualityIcon} ${recipe.name} crafté ! (+${Math.floor(xpGain)} XP)`,
            'success'
        );
    }

    // Rafraîchir UI
    if (this.game.ui) {
        this.game.ui.updateCraftingTab();
    }

    return true;
}
```

**Nouvelle fonction pour qualité avec bonus** :

```javascript
/**
 * Génère une qualité avec bonus de niveau
 */
generateQualityWithBonus(professionId, qualityBonus = 0) {
    const profession = this.game.professionManager.getProfession(professionId);
    const professionLevel = profession ? profession.level : 1;

    // Bonus de niveau : +0.5% par niveau + bonus supplémentaire
    const levelBonus = (professionLevel - 1) * 0.5 + qualityBonus;

    const roll = Math.random() * 100;

    // Probabilités ajustées avec bonus
    if (roll < 0.5 + (levelBonus * 0.05)) {
        return 'masterwork'; // Ultra rare
    } else if (roll < 3 + (levelBonus * 0.1)) {
        return 'perfect';
    } else if (roll < 11 + (levelBonus * 0.5)) {
        return 'exceptional';
    } else if (roll < 31 + (levelBonus * 1.0)) {
        return 'superior';
    } else {
        return 'normal';
    }
}
```

---

### PHASE 2 : Métiers de RÉCOLTE

#### Fichier 2 : `src/js/profession-manager.js`

**Ajouter la fonction de calcul des bonus** :

```javascript
/**
 * Calcule les bonus de récolte selon le niveau
 */
getGatheringBonuses(professionId, level) {
    const bonuses = {
        amountPerClick: 1 + (level * 0.1),
        xpMultiplier: 1 + (level * 0.05),
        autoGatherSpeed: 0,
        doubleDropChance: 0,
        qualityBonus: 0,
        gemBonus: 0,
        storageEfficiency: 0
    };

    // Paliers tous les 5 niveaux
    if (level >= 5) {
        bonuses.autoGatherSpeed = 10;
        bonuses.doubleDropChance = 5;
    }
    if (level >= 10) {
        bonuses.autoGatherSpeed = 20;
        bonuses.doubleDropChance = 10;
        bonuses.qualityBonus = 5;
    }
    if (level >= 15) {
        bonuses.autoGatherSpeed = 30;
        bonuses.doubleDropChance = 15;
        bonuses.qualityBonus = 10;
    }
    if (level >= 20) {
        bonuses.autoGatherSpeed = 40;
        bonuses.doubleDropChance = 20;
        bonuses.qualityBonus = 15;
        bonuses.storageEfficiency = 10;
    }
    if (level >= 25) {
        bonuses.autoGatherSpeed = 50;
        bonuses.doubleDropChance = 25;
        bonuses.qualityBonus = 20;
        bonuses.storageEfficiency = 20;
    }
    if (level >= 30) {
        bonuses.autoGatherSpeed = 60;
        bonuses.doubleDropChance = 30;
        bonuses.qualityBonus = 25;
        bonuses.storageEfficiency = 30;
    }
    if (level >= 40) {
        bonuses.autoGatherSpeed = 70;
        bonuses.doubleDropChance = 40;
        bonuses.qualityBonus = 35;
        bonuses.storageEfficiency = 50;
    }
    if (level >= 50) {
        bonuses.autoGatherSpeed = 80;
        bonuses.doubleDropChance = 50;
        bonuses.qualityBonus = 50;
        bonuses.storageEfficiency = 100;
    }

    // Bonus spécial mineur
    if (professionId === 'miner') {
        if (level >= 10) bonuses.gemBonus = 10;
        if (level >= 20) bonuses.gemBonus = 25;
        if (level >= 30) bonuses.gemBonus = 50;
        if (level >= 50) bonuses.gemBonus = 100;
    }

    return bonuses;
}
```

**Modifier `startAutoGather()` pour utiliser vitesse dynamique** :

```javascript
startAutoGather(professionId) {
    const state = this.autoGatherState[professionId];
    if (!state || !state.unlocked) return;

    state.enabled = true;

    // 🎯 CALCULER INTERVALLE AVEC BONUS
    const profession = this.getProfession(professionId);
    const bonuses = this.getGatheringBonuses(professionId, profession.level);

    let baseInterval = professionId === 'fisher'
        ? this.fisherGatherInterval
        : this.autoGatherInterval;

    // Appliquer bonus vitesse
    const interval = baseInterval * (1 - bonuses.autoGatherSpeed / 100);

    // Démarrer l'intervalle
    this.autoGatherIntervals[professionId] = setInterval(() => {
        if (!state.enabled) return;

        const result = this.clickProfession(professionId, window.game);

        // 🎯 APPLIQUER CHANCE DOUBLE DROP
        if (result && !result.storageFull) {
            if (Math.random() * 100 < bonuses.doubleDropChance) {
                this.addToInventory(result.resourceId, 1);
                if (window.game && window.game.ui) {
                    window.game.ui.showNotification(
                        `⭐ Double drop ! +1 ${result.resourceId}`,
                        'success'
                    );
                }
            }
        }

        if (window.game && window.game.ui) {
            window.game.ui.updateProfessionsTab();
        }
    }, interval);
}
```

---

### PHASE 3 : UI - Affichage des Bonus

#### Fichier 3 : `src/js/ui.js`

**Modifier `updateCraftingProfessions()`** :

```javascript
updateCraftingProfessions() {
    const professions = ['blacksmith', 'armorsmith', 'jeweler', 'tanner', 'alchemist', 'fishmonger'];

    professions.forEach(profId => {
        const profession = this.game.professionManager.getProfession(profId);
        if (!profession) return;

        const card = document.querySelector(`[data-profession="${profId}"]`);
        if (!card) return;

        // Niveau et XP
        const levelEl = card.querySelector('.craft-prof-level');
        const xpEl = card.querySelector('.craft-prof-xp');
        const xpBar = document.getElementById(`${profId}-xp-bar`);

        if (levelEl) levelEl.textContent = `Niveau ${profession.level}`;
        if (xpEl) xpEl.textContent = `${Math.floor(profession.xp)} / ${profession.getXpForNextLevel()} XP`;
        if (xpBar) {
            const progress = (profession.xp / profession.getXpForNextLevel()) * 100;
            xpBar.style.width = `${Math.min(progress, 100)}%`;
        }

        // 🆕 AFFICHER BONUS
        const bonuses = this.game.craftingManager.getCraftingBonuses(profId, profession.level);
        const bonusEl = card.querySelector('.profession-bonuses');

        if (bonusEl && profession.level >= 5) {
            bonusEl.innerHTML = `
                <div class="bonus-stats">
                    <span>⚡ Vitesse: <strong>+${bonuses.craftSpeed}%</strong></span>
                    <span>✨ Qualité: <strong>+${bonuses.qualityBonus}%</strong></span>
                    ${bonuses.multiCraftChance > 0 ? `<span>🎲 Double: <strong>${bonuses.multiCraftChance}%</strong></span>` : ''}
                    ${bonuses.materialSaving > 0 ? `<span>💰 Économie: <strong>${bonuses.materialSaving}%</strong></span>` : ''}
                </div>
            `;
            bonusEl.style.display = 'block';
        } else if (bonusEl) {
            bonusEl.style.display = 'none';
        }
    });
}
```

**Modifier `updateProfessionsTab()`** pour récolte :

```javascript
updateProfessionsTab() {
    // ... code existant ...

    // 🆕 AFFICHER BONUS RÉCOLTE
    ['woodcutter', 'miner', 'herbalist', 'fisher'].forEach(profId => {
        const profession = this.game.professionManager.getProfession(profId);
        const bonuses = this.game.professionManager.getGatheringBonuses(profId, profession.level);

        const bonusContainer = document.getElementById(`${profId}-bonuses`);
        if (bonusContainer && profession.level >= 5) {
            bonusContainer.innerHTML = `
                <div class="gathering-bonuses">
                    <span>⚡ Auto: <strong>-${bonuses.autoGatherSpeed}%</strong></span>
                    <span>🎲 Double: <strong>${bonuses.doubleDropChance}%</strong></span>
                    ${bonuses.storageEfficiency > 0 ? `<span>📦 Stock: <strong>+${bonuses.storageEfficiency}%</strong></span>` : ''}
                </div>
            `;
        }
    });
}
```

---

## 📊 RÉCAPITULATIF COMPLET

### ✅ BONUS MÉTIERS DE CRAFT (Niveau 50)

| Bonus         | Valeur | Impact                     |
| ------------- | ------ | -------------------------- |
| Vitesse craft | +100%  | 20s → **10s**              |
| Qualité items | +50%   | 100 ATK → **150 ATK**      |
| Double craft  | 50%    | 1 item sur 2 = **2 items** |
| Économie mat. | 25%    | 100 Fer → **75 Fer**       |
| XP craft      | +100%  | 10 XP → **20 XP**          |

**Efficacité totale : ×3**

---

### ✅ BONUS MÉTIERS DE RÉCOLTE (Niveau 50)

| Bonus         | Valeur | Impact          |
| ------------- | ------ | --------------- |
| Quantité/clic | +500%  | 1 → **6**       |
| Vitesse auto  | -80%   | 5s → **1s**     |
| Double drop   | 50%    | +50% ressources |
| Stockage      | +100%  | Capacité **×2** |
| XP/clic       | +250%  | 10 → **35**     |

**Production/min : ×30**

---

## 🎯 TEMPS D'IMPLÉMENTATION

| Phase     | Tâche                                 | Temps estimé |
| --------- | ------------------------------------- | ------------ |
| **1**     | Bonus craft (crafting-manager.js)     | 1h30         |
| **2**     | Bonus récolte (profession-manager.js) | 1h           |
| **3**     | UI bonus (ui.js + CSS)                | 1h           |
| **4**     | Tests et ajustements                  | 30min        |
| **TOTAL** |                                       | **4 heures** |

---

## ✅ CHECKLIST D'IMPLÉMENTATION

### Phase 1 - Craft

- [ ] Ajouter `getCraftingBonuses()` dans `crafting-manager.js`
- [ ] Modifier `startCraft()` pour appliquer bonus vitesse
- [ ] Implémenter économie matériaux (25% chance)
- [ ] Implémenter double craft (50% chance)
- [ ] Ajouter `generateQualityWithBonus()` pour bonus qualité
- [ ] Tester avec Forgeron niveau 1 vs niveau 50

### Phase 2 - Récolte

- [ ] Ajouter `getGatheringBonuses()` dans `profession-manager.js`
- [ ] Modifier `startAutoGather()` pour vitesse dynamique
- [ ] Implémenter double drop (50% chance)
- [ ] Implémenter bonus stockage (+100%)
- [ ] Tester avec Bûcheron niveau 1 vs niveau 50

### Phase 3 - UI

- [ ] Afficher bonus dans cartes professions craft
- [ ] Afficher bonus dans onglet récolte
- [ ] Ajouter tooltip explicatif au survol
- [ ] CSS pour mise en forme bonus
- [ ] Tester affichage niveau 5, 10, 20, 50

### Phase 4 - Documentation

- [ ] Créer guide joueur "Progression Métiers"
- [ ] Documenter formules bonus
- [ ] Ajouter exemples concrets

---

## 🎮 ÉQUILIBRE vs AUTRES IDLE GAMES

### Comparaison Bonus Niveau 50

| Jeu               | Vitesse   | Qualité  | Double  | Économie |
| ----------------- | --------- | -------- | ------- | -------- |
| **Idle Skilling** | +50%      | -        | 10%     | -        |
| **Melvor Idle**   | -15%      | +10%     | -       | 10%      |
| **NGU Idle**      | ×5        | -        | 10%     | -        |
| **VOTRE JEU**     | **+100%** | **+50%** | **50%** | **25%**  |

✅ **Votre système est PLUS GÉNÉREUX** → Encourage progression métiers ✅

---

**Prochaine étape** : Implémenter Phase 1 (Craft) d'abord, puis Phase 2 (Récolte) ?
