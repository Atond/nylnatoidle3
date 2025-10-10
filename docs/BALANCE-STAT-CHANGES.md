# 📊 CHANGEMENTS SYSTÈME DE STATS

## 🎯 Objectif

Adapter les stats du jeu Idle RPG pour correspondre à la mécanique idle (pas de contrôle en temps réel).

---

## ❌ ANCIEN SYSTÈME

| Stat             | Effet                   | Problème                                  |
| ---------------- | ----------------------- | ----------------------------------------- |
| **HP**           | Points de vie           | ❌ Doublon avec Endurance                 |
| **Force**        | Dégâts physiques        | ✅ OK                                     |
| **Agilité**      | Vitesse d'attaque       | ❌ Pas de contrôle vitesse dans idle game |
| **Intelligence** | Dégâts magiques (futur) | ✅ OK (mais pas implémenté)               |
| **Sagesse**      | Résistance magique      | ❌ Peu d'impact, pas de système magique   |
| **Endurance**    | HP + Défense            | ✅ OK (mais redondant avec HP)            |

**Problèmes identifiés** :

1. **Agilité = vitesse** : Dans un jeu idle, on ne contrôle pas la vitesse d'attaque manuellement → impact invisible
2. **HP séparé** : Redondant avec Endurance (les deux augmentent HP)
3. **Sagesse** : Stat inutile sans système de sorts/mana

---

## ✅ NOUVEAU SYSTÈME

| Stat             | Effet                      | Impact visible                                  |
| ---------------- | -------------------------- | ----------------------------------------------- |
| **Force**        | +1.0 dégâts physiques      | ✅ Dégâts bruts (mêlée/arc)                     |
| **Agilité**      | +0.5% chance critique      | ✅ 💥 Coups critiques (×2 dégâts) satisfaisants |
| **Intelligence** | +1.0 dégâts magiques       | ✅ Dégâts sorts (système futur)                 |
| **Sagesse**      | +2 mana max + 0.1 mana/sec | ✅ Ressource pour sorts (système futur)         |
| **Endurance**    | +15 HP max + 1.0 défense   | ✅ Survie (tank)                                |

**Améliorations** :

1. **Agilité → Critiques** : Impact immédiat visible (💥 messages, dégâts × 2)
2. **HP fusionné** : Plus de doublon, Endurance = stat tank unique
3. **Sagesse → Mana** : Prépare système de sorts futur (mana costs)

---

## 🔢 FORMULES

### **Dégâts Physiques**

```javascript
baseDamage = weapon.damage || 1
physicalDamage = baseDamage + (force × 1.0) + equipment.damageBonus

// Système critique
critChance = agility × 0.005  // 0.5% par point
critMultiplier = 2.0  // Dégâts × 2

if (Math.random() < critChance) {
    damage *= critMultiplier
    // Affichage "💥 COUP CRITIQUE!"
}

finalDamage = Math.max(1, damage - enemy.defense)
```

**Exemple** :

- Archer niveau 20 : 105 agilité = 52.5% critique
- 1 attaque sur 2 = critique × 2 = **DPS moyen +52.5%**
- Impact visible et satisfaisant !

### **HP Maximum**

```javascript
// ANCIEN (redondant)
maxHP = 100 + (level × 15) + (endurance × 10) + equipment.hpBonus

// NOUVEAU (simplifié)
maxHP = 100 + (endurance × 15) + equipment.hpBonus
```

**Exemple** :

- Guerrier niveau 20 (255 endurance) : 100 + 3825 = **3925 HP**
- Mage niveau 20 (155 endurance) : 100 + 2325 = **2425 HP**

### **Défense**

```javascript
totalDefense = (endurance × 1.0) + equipment.defense
damageReduced = Math.min(totalDefense, incomingDamage × 0.75)
```

### **Mana (FUTUR)**

```javascript
maxMana = (wisdom × 2) + equipment.manaBonus
manaRegen = wisdom × 0.1  // mana/sec

// Exemple Mage niveau 20 (85 sagesse)
maxMana = 170 mana
manaRegen = 8.5 mana/sec
```

---

## 📈 PROGRESSION PAR CLASSE

### **Niveau 20**

| Classe       | HP   | Force | Agilité | Critique | Int | Mana | Endurance |
| ------------ | ---- | ----- | ------- | -------- | --- | ---- | --------- |
| **Guerrier** | 3925 | 105   | 45      | 22.5%    | 45  | 90   | 255       |
| **Archer**   | 3100 | 85    | 105     | 52.5%    | 65  | 90   | 205       |
| **Mage**     | 2425 | 55    | 45      | 22.5%    | 105 | 170  | 155       |
| **Prêtre**   | 3100 | 55    | 45      | 22.5%    | 65  | 210  | 205       |

### **Niveau 50**

| Classe       | HP   | Force | Agilité | Critique | Int | Mana | Endurance |
| ------------ | ---- | ----- | ------- | -------- | --- | ---- | --------- |
| **Guerrier** | 3950 | 255   | 105     | 52.5%    | 105 | 210  | 255       |
| **Archer**   | 3100 | 205   | 255     | 127.5%   | 155 | 210  | 205       |
| **Mage**     | 2400 | 155   | 105     | 52.5%    | 255 | 410  | 155       |
| **Prêtre**   | 3400 | 155   | 105     | 52.5%    | 155 | 510  | 205       |

**Notes** :

- **Archer** : Chance critique > 100% = crits garantis + futur bonus multiplicateur
- **Mage/Prêtre** : Mana élevé pour système de sorts futur
- **Guerrier** : Tank équilibré (HP + défense)

---

## 🎯 IMPACTS SUR LE GAMEPLAY

### **Classes**

#### **Guerrier** 🛡️

- **Avant** : Tank (HP élevé, vitesse normale)
- **Après** : Tank bruiser (HP + défense élevés, critiques rares mais puissants)
- **Changement** : Plus simple, focus survie

#### **Archer** 🏹

- **Avant** : DPS rapide (vitesse × 3, critiques rares)
- **Après** : DPS critique (critiques constants × 2, vitesse normale)
- **Changement** : Plus satisfaisant visuellement (💥 critiques visibles)

#### **Mage** 🔮

- **Avant** : DPS magique (Intelligence, fragile, pas de mana)
- **Après** : DPS magique (Intelligence, mana pour sorts futurs)
- **Changement** : Prépare système de sorts actifs

#### **Prêtre** ❤️

- **Avant** : Support (Sagesse, régénération HP)
- **Après** : Support mana (Sagesse, mana illimité pour sorts soin)
- **Changement** : Rôle clarifié (tank magique avec sorts)

### **Arbre de Talents**

#### **Nouveaux talents critiques**

```javascript
critical_chance_1: { bonus: '+5% chance critique', cost: 1 }
critical_chance_2: { bonus: '+10% chance critique', cost: 2 }
critical_damage: { bonus: 'Critiques × 2.5', cost: 3 }
lethal_strike: { bonus: 'Critiques × 3.0 finaux', cost: 5 }
```

**Build Archer niveau 50** :

- Base : 127.5% critique (255 agilité)
- Talents : +15% critique (3 rangs)
- **Total : 142.5% critique garantis × 3.0 = DPS × 4.275 !**

#### **Suppression talents vitesse**

```javascript
// ❌ SUPPRIMÉ
attack_speed_1: { bonus: '+10% vitesse attaque', cost: 1 }
attack_speed_2: { bonus: '+15% vitesse attaque', cost: 2 }
attack_speed_3: { bonus: '+20% vitesse attaque', cost: 3 }
```

---

## 🔧 IMPLÉMENTATION

### **Fichiers à Modifier** (FUTUR)

#### **1. player.js**

```javascript
// Calcul stats
calculateStats() {
    this.maxHP = 100 + (this.stats.endurance × 15)
    this.defense = this.stats.endurance × 1.0
    this.critChance = this.stats.agility × 0.005
    this.maxMana = this.stats.wisdom × 2  // FUTUR
    this.manaRegen = this.stats.wisdom × 0.1  // FUTUR
}
```

#### **2. combat.js**

```javascript
// Système critique
calculateDamage(attacker, defender) {
    let damage = attacker.weapon.damage + attacker.stats.force

    // Critique
    if (Math.random() < attacker.critChance) {
        damage *= attacker.critMultiplier || 2.0
        this.displayCriticalHit()  // 💥 Animation
    }

    return Math.max(1, damage - defender.defense)
}
```

#### **3. ui.js**

```javascript
// Affichage critique
displayCriticalHit() {
    const critText = document.createElement('div')
    critText.className = 'critical-hit-text'
    critText.textContent = '💥 COUP CRITIQUE!'
    critText.style.animation = 'critBounce 0.5s ease-out'
    document.body.appendChild(critText)
}
```

#### **4. upgrades-data.js**

```javascript
// Talents critiques
TALENT_TREE: {
    combat: {
        critical_chance_1: {
            name: 'Précision I',
            bonus: { critChance: 0.05 },  // +5%
            cost: 1
        },
        lethal_strike: {
            name: 'Frappe Létale',
            bonus: { critMultiplier: 3.0 },  // × 3
            cost: 5,
            requires: ['critical_damage']
        }
    }
}
```

---

## 🎨 AMÉLIORATIONS VISUELLES

### **Animations Critiques**

```css
/* animations.css */
.critical-hit-text {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: bold;
  color: #ff0000;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
  pointer-events: none;
  z-index: 9999;
}

@keyframes critBounce {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.damage-number.critical {
  color: #ff0000;
  font-size: 32px;
  font-weight: bold;
  animation: critFloat 1s ease-out;
}
```

---

## 📋 TODO LISTE

### **Phase 1 : Documentation** ✅

- [x] Créer BALANCE-STAT-CHANGES.md
- [x] Mettre à jour BALANCE-PLAYER.md
- [x] Mettre à jour formules combat
- [x] Mettre à jour arbre talents
- [x] Mettre à jour comparaisons classes

### **Phase 2 : Implémentation** (FUTUR)

- [ ] Modifier player.js (calcul HP/défense/critique)
- [ ] Modifier combat.js (système critique)
- [ ] Supprimer vitesse d'attaque basée agilité
- [ ] Ajouter système mana (futur)
- [ ] Créer animations critiques
- [ ] Mettre à jour UI stats

### **Phase 3 : Tests** (FUTUR)

- [ ] Tester progression Archer (critiques)
- [ ] Tester équilibrage Guerrier (tank)
- [ ] Tester équilibrage Mage (fragile)
- [ ] Tester talents critiques (× 3.0)
- [ ] Valider maths (HP, défense, critique)

### **Phase 4 : Polish** (FUTUR)

- [ ] Animations critiques satisfaisantes
- [ ] Sons critiques
- [ ] Feedback visuel mana (UI)
- [ ] Tooltips stats clairs
- [ ] Guide in-game système critique

---

## ✅ AVANTAGES

1. **Agilité = Critiques** : Impact visible et satisfaisant (💥)
2. **HP simplifié** : Plus de doublon Endurance/HP
3. **Mana préparé** : Système sorts futur (Intelligence/Sagesse utiles)
4. **Classes distinctes** : Archer = critiques, Mage = mana, Guerrier = tank
5. **Progression claire** : Chaque stat a un rôle défini

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ **Documentation complète** (FAIT)
2. ⏳ **Validation utilisateur** (attente retour)
3. ⏳ **Implémentation code** (après validation)
4. ⏳ **Tests équilibrage** (après implémentation)
5. ⏳ **Système de sorts** (feature future)

---

**Date** : 2025-01-XX  
**Version** : 1.0  
**Statut** : En attente validation ✅
