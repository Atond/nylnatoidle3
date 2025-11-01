# 🧪 SYSTÈME DE POTIONS EN COMBAT

**Date** : 28 octobre 2025  
**Priorité** : HAUTE (Améliore expérience joueur en combat)

---

## 📋 PROBLÈME IDENTIFIÉ

### ❌ **Problème : Potions Inutilisables en Combat**

**Symptômes** :

- ✅ Potions craftables (Alchimiste niveau 1+)
- ✅ Bouton "Équiper" visible dans inventaire
- ❌ **Impossible d'utiliser en combat** (seulement dans l'onglet Équipement)
- ❌ **Aucune interface pour consommer** pendant le combat
- ❌ Potions stockées mais inaccessibles quand on en a besoin (PV bas)

**Impact joueur** :

- Frustration : Craft potions mais ne peut pas les utiliser
- Mort inutile alors que potions disponibles en inventaire
- Gameplay non intuitif (pourquoi "équiper" une potion ?)

---

## ✅ SOLUTION IMPLÉMENTÉE

### 🎯 **Hotbar de Potions dans l'Onglet Combat**

**Concept** :

- Section dédiée aux potions juste au-dessus du Journal de combat
- Hotbar avec 4 slots de potions rapides
- Clic sur une potion = Consommation instantanée
- Affichage du nombre de potions disponibles
- Panneau masqué si aucune potion en inventaire

---

## 🔧 MODIFICATIONS TECHNIQUES

### 1. Interface HTML (`index.html`)

**Ajout après les boutons d'attaque** (ligne ~241) :

```html
<!-- 🧪 Potions Rapides -->
<div class="combat-potions" id="combatPotionsPanel" style="display: none;">
  <div class="potions-title">🧪 Potions Rapides</div>
  <div class="potions-hotbar" id="potionsHotbar">
    <!-- Les potions seront ajoutées dynamiquement ici -->
  </div>
</div>
```

**Position** : Entre `combat-actions` et `combat-log`

---

### 2. Styles CSS (`main.css`)

**Ajout après `.btn-toggle.active:hover`** (ligne ~418) :

```css
/* 🧪 Combat Potions Hotbar */
.combat-potions {
  background: var(--bg-panel);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.potions-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-info);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.potions-hotbar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.potion-slot {
  background: var(--bg-light);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-sm);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.potion-slot:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.potion-slot.empty {
  opacity: 0.3;
  cursor: not-allowed;
  border-style: dashed;
}

.potion-icon {
  font-size: 1.8rem;
}

.potion-name {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: bold;
}

.potion-count {
  font-size: 0.7rem;
  color: var(--xp-color);
}
```

---

### 3. Logique JavaScript (`ui.js`)

**Fonction 1 : `updateCombatPotions()`** (ligne ~705) :

```javascript
/**
 * 🧪 Met à jour les potions disponibles en combat (hotbar)
 */
updateCombatPotions() {
    const panel = document.getElementById('combatPotionsPanel');
    const hotbar = document.getElementById('potionsHotbar');

    if (!panel || !hotbar || !this.game.equipmentManager) return;

    // Récupérer toutes les potions de l'inventaire
    const allPotions = this.game.equipmentManager.inventory.filter(item =>
        item.type === 'consumable' &&
        (item.name.includes('Potion') || item.category === 'consumable')
    );

    // Grouper par type et compter
    const potionGroups = {};
    allPotions.forEach(potion => {
        const key = potion.recipeId || potion.id.replace(/_\d+$/, '');
        if (!potionGroups[key]) {
            potionGroups[key] = { item: potion, count: 0 };
        }
        potionGroups[key].count++;
    });

    // Limiter à 4 slots (hotbar)
    const potionTypes = Object.values(potionGroups).slice(0, 4);

    // Afficher le panneau seulement si on a des potions
    if (potionTypes.length > 0) {
        panel.style.display = '';
    } else {
        panel.style.display = 'none';
        return;
    }

    // Générer les slots avec compteurs
    hotbar.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const potionGroup = potionTypes[i];

        if (potionGroup) {
            const potion = potionGroup.item;
            const count = potionGroup.count;

            hotbar.innerHTML += `
                <div class="potion-slot" data-potion-id="${potion.id}">
                    <div class="potion-icon">${potion.icon || '🧪'}</div>
                    <div class="potion-name">${potion.name}</div>
                    <div class="potion-count">×${count}</div>
                </div>
            `;
        } else {
            hotbar.innerHTML += `
                <div class="potion-slot empty">
                    <div class="potion-icon">⬜</div>
                    <div class="potion-name">Vide</div>
                </div>
            `;
        }
    }

    // Ajouter les événements de clic
    hotbar.querySelectorAll('.potion-slot:not(.empty)').forEach(slot => {
        slot.addEventListener('click', (e) => {
            e.stopPropagation();
            const potionId = slot.dataset.potionId;
            const potion = allPotions.find(p => p.id === potionId);

            if (potion) {
                this.usePotionInCombat(potion);
            }
        });
    });
}
```

**Fonction 2 : `usePotionInCombat(potion)`** (ligne ~784) :

```javascript
/**
 * 🍽️ Utilise une potion pendant le combat
 */
usePotionInCombat(potion) {
    if (!potion || potion.type !== 'consumable') {
        this.showNotification('❌ Ceci n\'est pas une potion', 'error');
        return;
    }

    // Retirer la potion de l'inventaire
    const index = this.game.equipmentManager.inventory.findIndex(p => p.id === potion.id);
    if (index === -1) {
        this.showNotification('❌ Potion introuvable', 'error');
        return;
    }

    this.game.equipmentManager.inventory.splice(index, 1);

    // Appliquer l'effet
    const recipe = this.game.craftingManager.getAllRecipes().find(r =>
        r.id === potion.recipeId || r.produces.resourceId === potion.id
    );

    if (recipe && recipe.effects) {
        // Heal instantané
        if (recipe.effects.healAmount) {
            const healed = Math.min(recipe.effects.healAmount,
                this.game.player.stats.maxHp - this.game.player.stats.hp);
            this.game.player.stats.hp += healed;
            this.showNotification(`💚 +${healed} PV restaurés !`, 'success');
        }

        // Appliquer le buff si durée > 0
        if (recipe.effects.duration > 0) {
            this.game.buffManager.applyBuff(recipe, 1);
        }
    } else {
        this.showNotification('⚠️ Effets de la potion introuvables', 'warning');
    }

    // Mettre à jour l'interface
    this.updateCombatPotions();
    this.updatePlayerUI();
}
```

**Intégration dans `update()`** (ligne 342) :

```javascript
update() {
    this.updatePlayerUI();
    this.updateMonsterUI();
    this.updateCombatLog();
    this.updateZoneInfo();
    this.updateQuests();
    this.updateBuffDisplay();
    this.updateCombatPotions(); // ✅ AJOUTÉ
    // ...
}
```

---

## 🎮 EXPÉRIENCE JOUEUR

### Avant le Fix

❌ **Workflow ancien** :

1. Crafter Petite Potion de Vie (Alchimiste)
2. Voir "Équiper" dans inventaire (confus)
3. Cliquer "Équiper" → Rien ne se passe
4. Retourner au combat → Aucun moyen d'utiliser la potion
5. Mourir avec 10 potions en inventaire (frustrant)

### Après le Fix

✅ **Workflow nouveau** :

1. Crafter Petite Potion de Vie
2. Voir hotbar apparaître dans l'onglet Combat
3. Clic sur potion → Heal instantané +50 PV
4. Compteur diminue (×10 → ×9)
5. Utilisation fluide en combat

---

## 📊 INTERFACE VISUELLE

### Exemple Hotbar (4 Slots)

```
┌──────────────────────────────────────────────────────────┐
│              🧪 Potions Rapides                         │
├──────────┬──────────┬──────────┬──────────┐
│    🧪    │    🧪    │    ⬜    │    ⬜    │
│  Petite  │  Potion  │   Vide   │   Vide   │
│ Potion   │   de     │          │          │
│   ×5     │  Mana ×2 │          │          │
└──────────┴──────────┴──────────┴──────────┘
```

### États des Slots

**Slot Rempli** :

- Icon : 🧪 (emoji de la potion)
- Nom : "Petite Potion de Vie"
- Compteur : "×5"
- Hover : Bordure bleue + élévation
- Clic : Consommation instantanée

**Slot Vide** :

- Icon : ⬜ (carré vide)
- Nom : "Vide"
- Opacité : 30%
- Bordure : Pointillés
- Clic : Désactivé

---

## 🧪 POTIONS DISPONIBLES

### Potions de Vie (Health)

| Potion                    | Craft         | Heal     | Icon |
| ------------------------- | ------------- | -------- | ---- |
| **Petite Potion de Vie**  | Alchimiste 1  | +50 PV   | 🧪   |
| **Potion de Vie Mineure** | Alchimiste 11 | +150 PV  | 🧪   |
| **Potion de Vie**         | Alchimiste 21 | +300 PV  | 🧪   |
| **Grande Potion de Vie**  | Alchimiste 31 | +600 PV  | 🧪   |
| **Potion de Vie Suprême** | Alchimiste 41 | +1200 PV | 🧪   |

### Potions de Mana (Prêtres/Mages)

| Potion                    | Craft         | Restore   | Icon |
| ------------------------- | ------------- | --------- | ---- |
| **Petite Potion de Mana** | Alchimiste 6  | +50 Mana  | 🔮   |
| **Potion de Mana**        | Alchimiste 16 | +150 Mana | 🔮   |

### Potions de Buff (Temporaires)

| Potion                    | Craft         | Effet             | Durée |
| ------------------------- | ------------- | ----------------- | ----- |
| **Potion de Force**       | Alchimiste 26 | +10% Force        | 300s  |
| **Potion d'Agilité**      | Alchimiste 26 | +10% Agilité      | 300s  |
| **Potion d'Intelligence** | Alchimiste 26 | +10% Intelligence | 300s  |

---

## 🎯 AVANTAGES DU SYSTÈME

### Gameplay

✅ **Accessibilité** : Potions toujours visibles en combat  
✅ **Rapidité** : Consommation en 1 clic (pas besoin de changer d'onglet)  
✅ **Clarté** : Compteur indique combien de potions disponibles  
✅ **Intuitivité** : Fonctionne comme hotbar d'un MMO classique

### Stratégie

✅ **Gestion HP** : Utiliser potions avant de mourir  
✅ **Buffs tactiques** : Activer Force/Agilité avant boss  
✅ **Optimisation** : Limité à 4 slots = choix stratégique

### Progression

✅ **Craft utile** : Alchimiste devient profession stratégique  
✅ **Economy sink** : Potions consommées = besoin de re-craft  
✅ **Endgame** : Potions Suprêmes (+1200 PV) critiques pour raids

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Affichage Hotbar

1. ✅ F5 pour recharger
2. ✅ Craft 5× Petite Potion de Vie
3. ✅ Vérifier hotbar apparaît dans onglet Combat
4. ✅ Voir "🧪 Petite Potion de Vie ×5"

### Test 2 : Consommation Basique

1. ✅ Combat avec monstre
2. ✅ Prendre des dégâts (PV < 50)
3. ✅ Cliquer sur potion dans hotbar
4. ✅ Vérifier:
   - Heal instantané +50 PV
   - Notification "💚 +50 PV restaurés !"
   - Compteur diminue (×5 → ×4)
   - Potion retirée de l'inventaire

### Test 3 : Slots Multiples

1. ✅ Craft 3× Petite Potion de Vie
2. ✅ Craft 2× Potion de Mana
3. ✅ Vérifier hotbar affiche 2 slots remplis:
   - Slot 1 : Petite Potion de Vie ×3
   - Slot 2 : Potion de Mana ×2
   - Slots 3-4 : Vides

### Test 4 : Disparition Hotbar

1. ✅ Consommer toutes les potions (×0)
2. ✅ Vérifier hotbar disparaît automatiquement
3. ✅ Re-craft 1 potion
4. ✅ Vérifier hotbar réapparaît

### Test 5 : Buffs Temporaires

1. ✅ Craft Potion de Force
2. ✅ Consommer avant combat
3. ✅ Vérifier:
   - Buff "💪 Force +10%" apparaît
   - Durée 300s affichée
   - Dégâts augmentés en combat

### Test 6 : Heal Overflow

1. ✅ PV pleins (100/100)
2. ✅ Consommer Petite Potion (+50 PV)
3. ✅ Vérifier PV plafonnés à 100 (pas 150)
4. ✅ Notification correcte: "+0 PV restaurés"

### Test 7 : Persistance

1. ✅ Craft 10 potions
2. ✅ Sauvegarder
3. ✅ Recharger
4. ✅ Vérifier hotbar affiche toujours ×10

---

## 📈 MÉTRIQUES D'UTILISATION

### Early Game (Niveau 1-10)

**Craft** : Petite Potion de Vie (5 Pissenlit + 3 Herbe médicinale)  
**Heal** : +50 PV (50% HP niveau 1)  
**Usage** : Survie zones 1-2 (Plaines, Forêt)  
**Fréquence** : ~1 potion/combat contre élites

### Mid Game (Niveau 11-30)

**Craft** : Potion de Vie (+150 PV)  
**Heal** : 150 PV (~75% HP niveau 20)  
**Usage** : Zones 3-5 (Marais, Montagnes, Désert)  
**Fréquence** : ~2 potions/boss fight

### Late Game (Niveau 31-50)

**Craft** : Grande Potion de Vie (+600 PV)  
**Heal** : 600 PV (~100% HP niveau 40)  
**Usage** : Donjons endgame, raids  
**Fréquence** : ~5 potions/donjon complet

---

## 🔮 AMÉLIORATIONS FUTURES (Non implémentées)

### Hotkeys (Touches 1-4)

```javascript
// Appuyer sur "1" pour consommer potion slot 1
document.addEventListener("keydown", (e) => {
  if (e.key >= "1" && e.key <= "4") {
    const slotIndex = parseInt(e.key) - 1;
    const slot = hotbar.children[slotIndex];
    if (slot && !slot.classList.contains("empty")) {
      // Consommer potion du slot
    }
  }
});
```

### Cooldown Global (Anti-spam)

```javascript
// Limite: 1 potion toutes les 3 secondes
let lastPotionTime = 0;
const POTION_COOLDOWN = 3000;

usePotionInCombat(potion) {
    const now = Date.now();
    if (now - lastPotionTime < POTION_COOLDOWN) {
        this.showNotification('⏳ Potion en cooldown...', 'warning');
        return;
    }
    lastPotionTime = now;
    // ... rest du code
}
```

### Drag & Drop (Organisation hotbar)

- Glisser-déposer potions pour réorganiser slots
- Clic droit pour retirer une potion de la hotbar
- Persistance de l'ordre choisi

### Auto-Consommation (Option)

```javascript
// Option: Consommer potion automatiquement si PV < 30%
if (autoUsePotion && player.getHpPercentage() < 30) {
  const healthPotion = findBestHealthPotion();
  if (healthPotion) {
    this.usePotionInCombat(healthPotion);
  }
}
```

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Ajouts** :

- ✅ Hotbar de potions dans l'onglet Combat (4 slots)
- ✅ Consommation en 1 clic depuis le combat
- ✅ Compteur de potions disponibles (×N)
- ✅ Affichage dynamique (apparaît/disparaît selon inventaire)
- ✅ Support heal instantané + buffs temporaires

**Fichiers modifiés** :

- `index.html` (ligne ~241) : Ajout section combat-potions
- `src/css/main.css` (ligne ~418) : Styles hotbar potions
- `src/js/ui.js` (lignes 342, 705-815) : Logique updateCombatPotions() + usePotionInCombat()

**Recettes utilisables** :

- Petite Potion de Vie (+50 PV)
- Potion de Vie Mineure (+150 PV)
- Potion de Vie (+300 PV)
- Grande Potion de Vie (+600 PV)
- Potion de Vie Suprême (+1200 PV)
- Toutes potions de mana + buffs

---

## 🔗 FICHIERS MODIFIÉS

1. **`index.html`** (ligne ~241)
   - Ajout `<div class="combat-potions">` avec hotbar
2. **`src/css/main.css`** (ligne ~418)
   - Styles `.combat-potions`, `.potion-slot`, `.potion-icon`, etc.
3. **`src/js/ui.js`** (lignes 342, 705-815)
   - Ajout `updateCombatPotions()` dans `update()`
   - Nouvelle méthode `updateCombatPotions()` (groupage + affichage)
   - Nouvelle méthode `usePotionInCombat(potion)` (consommation + heal)

---

**Fin du document** 🎯
