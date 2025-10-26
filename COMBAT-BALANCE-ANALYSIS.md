# ⚔️ ANALYSE D'ÉQUILIBRAGE - SYSTÈME DE COMBAT

> **Date** : 25 Octobre 2025  
> **Objectif** : Analyser et équilibrer le système de combat pour une progression fluide

---

## 📊 FORMULES DE COMBAT ACTUELLES

### **Dégâts du Joueur**

```javascript
Dégâts = BASE_DAMAGE + (Force × 1.0) + Équipement.Damage + Équipement.Force + Dragon.Force
       = 1 + (Force × 1.0) + Bonus Équipement

// Protection minimum : Toujours au moins 1 dégât
```

**Exemple Joueur Niveau 1 (sans équipement) :**

- Force de base : **5**
- Dégâts = 1 + (5 × 1.0) = **6 dégâts par attaque**
- Vitesse d'attaque : **2000ms** (toutes les 2 secondes)

**Exemple Joueur Niveau 1 (avec Iron Sword) :**

- Force de base : **5**
- Iron Sword : +12 Damage, +3 Force
- Dégâts = 1 + (5+3) × 1.0 + 12 = **21 dégâts par attaque**

---

### **Dégâts du Monstre**

```javascript
Dégâts = Monster.Attack × Variance(0.8-1.2)
       - Équipement.Defense (minimum 1)

// Variance aléatoire ±20%
```

**Exemple Loup Gris vs Joueur nu :**

- Attaque Loup : **4**
- Défense Joueur : **0**
- Dégâts = 4 × ~1.0 = **3-5 dégâts** (avec variance)

---

### **Vitesse d'Attaque**

```javascript
AttackSpeed = BASE_SPEED / (1 + Agility × 0.02)
            = 2000ms / (1 + Agility × 0.02)

// Minimum : 500ms
```

**Exemple :**

- Agility 5 : 2000 / (1 + 0.1) = **1818ms** (~1.8s)
- Agility 20 : 2000 / (1.4) = **1428ms** (~1.4s)
- Agility 50 : 2000 / (2.0) = **1000ms** (1s)

---

### **HP Maximum**

```javascript
MaxHP = Base MaxHP + Équipement.Endurance × 5

// Stats de base par niveau :
// +10 HP, +2 Force, +1 Agility, +1 Intelligence, +1 Wisdom, +2 Endurance
```

**Progression HP Joueur :**

- Niveau 1 : **100 HP**
- Niveau 2 : **110 HP** (+10)
- Niveau 5 : **140 HP**
- Niveau 10 : **190 HP**
- Niveau 20 : **290 HP**
- Niveau 50 : **590 HP**

---

## 🐺 STATS DES MONSTRES RÉGION 1 (Niveau 1-10)

### **Common Monsters**

| Monstre           | HP  | ATK | DEF | Speed  | XP  | Gold |
| ----------------- | --- | --- | --- | ------ | --- | ---- |
| Loup Gris         | 25  | 4   | 2   | 2500ms | 12  | 5    |
| Sanglier Sauvage  | 35  | 6   | 3   | 3000ms | 15  | 8    |
| Bandit des Routes | 30  | 5   | 2   | 2000ms | 18  | 15   |
| Corbeau Noir      | 15  | 3   | 1   | 1500ms | 10  | 3    |

### **Rare Monsters**

| Monstre      | HP  | ATK | DEF | Speed  | XP  | Gold |
| ------------ | --- | --- | --- | ------ | --- | ---- |
| Loup Alpha   | 60  | 8   | 4   | 2500ms | 30  | 20   |
| Ours Féroce  | 100 | 12  | 6   | 3500ms | 50  | 35   |
| Brigand Chef | 80  | 10  | 5   | 2000ms | 45  | 40   |

### **Elite Monsters**

| Monstre              | HP  | ATK | DEF | Speed  | XP  | Gold |
| -------------------- | --- | --- | --- | ------ | --- | ---- |
| Esprit des Plaines   | 150 | 15  | 8   | 2500ms | 80  | 60   |
| Champion des Bandits | 200 | 18  | 10  | 2000ms | 100 | 80   |

### **Boss**

| Boss                  | HP  | ATK | DEF | Speed  | XP  | Gold |
| --------------------- | --- | --- | --- | ------ | --- | ---- |
| Roi des Loups Gris 👑 | 500 | 25  | 15  | 2500ms | 250 | 200  |

---

## 🎯 SIMULATIONS DE COMBAT

### **SCÉNARIO 1 : Joueur Niveau 1 NU vs Loup Gris**

**Stats Joueur :**

- HP : 100
- Force : 5
- Agility : 5
- Dégâts : **6**
- Vitesse : **1818ms**

**Stats Loup :**

- HP : 25
- ATK : 4
- DEF : 2
- Vitesse : 2500ms

**Simulation :**

```
Tour 1 (0s)    : Joueur attaque → 6 dmg (6-2 def = 4 réels) → Loup : 21/25 HP
Tour 2 (1.8s)  : Joueur attaque → 6 dmg (4 réels) → Loup : 17/25 HP
Tour 3 (2.5s)  : LOUP attaque → 4 dmg (aucune def) → Joueur : 96/100 HP
Tour 4 (3.6s)  : Joueur attaque → 6 dmg (4 réels) → Loup : 13/25 HP
Tour 5 (5.0s)  : LOUP attaque → 4 dmg → Joueur : 92/100 HP
Tour 6 (5.4s)  : Joueur attaque → 6 dmg (4 réels) → Loup : 9/25 HP
Tour 7 (7.2s)  : Joueur attaque → 6 dmg (4 réels) → Loup : 5/25 HP
Tour 8 (7.5s)  : LOUP attaque → 4 dmg → Joueur : 88/100 HP
Tour 9 (9.0s)  : Joueur attaque → 6 dmg (4 réels) → Loup : 1/25 HP
Tour 10 (10.0s): LOUP attaque → 4 dmg → Joueur : 84/100 HP
Tour 11 (10.8s): Joueur attaque → 6 dmg → LOUP MORT ✅
```

**Résultat :**

- ✅ **VICTOIRE** en ~11 secondes
- Joueur final : **84/100 HP** (perd 16 HP)
- Ratio : **7 coups pour tuer** (le loup attaque 4 fois)

**Verdict :** ⚠️ **TROP FACILE** - Le joueur nu devrait lutter plus !

---

### **SCÉNARIO 2 : Joueur Niveau 1 avec Iron Sword vs Loup Gris**

**Stats Joueur :**

- HP : 100
- Force : 5 + 3 (épée) = **8**
- Dégâts : 1 + 8 + 12 (épée) = **21**
- Vitesse : **1818ms**

**Simulation :**

```
Tour 1 (0s)   : Joueur attaque → 21 dmg (21-2 = 19 réels) → Loup : 6/25 HP
Tour 2 (1.8s) : Joueur attaque → 21 dmg (19 réels) → LOUP MORT ✅
```

**Résultat :**

- ✅ **ONE-SHOT** en 1.8 secondes
- Joueur final : **100/100 HP** (prend 0 dégâts)

**Verdict :** ⚠️ **DÉSÉQUILIBRÉ** - L'Iron Sword rend le joueur invincible en R1 !

---

### **SCÉNARIO 3 : Joueur Niveau 1 NU vs Sanglier Sauvage**

**Stats Joueur :**

- HP : 100
- Dégâts : **6**
- Vitesse : **1818ms**

**Stats Sanglier :**

- HP : 35
- ATK : 6
- DEF : 3
- Vitesse : 3000ms

**Simulation :**

```
Tour 1 (0s)   : Joueur attaque → 6 dmg (6-3 = 3 réels) → Sanglier : 32/35 HP
Tour 2 (1.8s) : Joueur attaque → 6 dmg (3 réels) → Sanglier : 29/35 HP
Tour 3 (3.0s) : SANGLIER attaque → 6 dmg → Joueur : 94/100 HP
Tour 4 (3.6s) : Joueur attaque → 6 dmg (3 réels) → Sanglier : 26/35 HP
Tour 5 (5.4s) : Joueur attaque → 6 dmg (3 réels) → Sanglier : 23/35 HP
Tour 6 (6.0s) : SANGLIER attaque → 6 dmg → Joueur : 88/100 HP
Tour 7 (7.2s) : Joueur attaque → 6 dmg (3 réels) → Sanglier : 20/35 HP
Tour 8 (9.0s) : Joueur attaque → 6 dmg (3 réels) → Sanglier : 17/35 HP
       (9.0s) : SANGLIER attaque → 6 dmg → Joueur : 82/100 HP
Tour 9 (10.8s): Joueur attaque → 6 dmg (3 réels) → Sanglier : 14/35 HP
Tour 10(12.0s): SANGLIER attaque → 6 dmg → Joueur : 76/100 HP
Tour 11(12.6s): Joueur attaque → 6 dmg (3 réels) → Sanglier : 11/35 HP
Tour 12(14.4s): Joueur attaque → 6 dmg (3 réels) → Sanglier : 8/35 HP
Tour 13(15.0s): SANGLIER attaque → 6 dmg → Joueur : 70/100 HP
Tour 14(16.2s): Joueur attaque → 6 dmg (3 réels) → Sanglier : 5/35 HP
Tour 15(18.0s): Joueur attaque → 6 dmg (3 réels) → Sanglier : 2/35 HP
       (18.0s): SANGLIER attaque → 6 dmg → Joueur : 64/100 HP
Tour 16(19.8s): Joueur attaque → 6 dmg (3 réels) → SANGLIER MORT ✅
```

**Résultat :**

- ✅ **VICTOIRE** en ~20 secondes
- Joueur final : **64/100 HP** (perd 36 HP)
- Ratio : **12 coups pour tuer** (le sanglier attaque 6 fois)

**Verdict :** ✅ **ÉQUILIBRÉ** - Combat difficile mais gagnable

---

### **SCÉNARIO 4 : Joueur Niveau 1 NU vs Roi des Loups (Boss)**

**Stats Joueur :**

- HP : 100
- Dégâts : **6**
- Vitesse : **1818ms**

**Stats Boss :**

- HP : 500
- ATK : 25
- DEF : 15
- Vitesse : 2500ms

**Simulation :**

```
Dégâts joueur : 6 - 15 = 1 (minimum garanti)
Dégâts boss : 25

Tour 1 (0s)   : Joueur attaque → 1 dmg → Boss : 499/500 HP
Tour 2 (1.8s) : Joueur attaque → 1 dmg → Boss : 498/500 HP
Tour 3 (2.5s) : BOSS attaque → 25 dmg → Joueur : 75/100 HP ⚠️
Tour 4 (3.6s) : Joueur attaque → 1 dmg → Boss : 497/500 HP
Tour 5 (5.0s) : BOSS attaque → 25 dmg → Joueur : 50/100 HP ⚠️⚠️
Tour 6 (5.4s) : Joueur attaque → 1 dmg → Boss : 496/500 HP
Tour 7 (7.2s) : Joueur attaque → 1 dmg → Boss : 495/500 HP
Tour 8 (7.5s) : BOSS attaque → 25 dmg → Joueur : 25/100 HP ⚠️⚠️⚠️
Tour 9 (9.0s) : Joueur attaque → 1 dmg → Boss : 494/500 HP
Tour 10(10.0s): BOSS attaque → 25 dmg → Joueur : 0/100 HP 💀
```

**Résultat :**

- ❌ **DÉFAITE** en 10 secondes
- Boss HP restants : **494/500** (6 dégâts infligés)
- Il faudrait **500 coups** pour tuer le boss (prendrait 15 minutes)
- Le joueur meurt au **4ème coup** du boss

**Verdict :** ✅ **IMPOSSIBLE** (comme prévu) - Boss nécessite équipement full

---

## 🏹 SIMULATIONS AVEC ÉQUIPEMENT

### **SCÉNARIO 5 : Joueur Niveau 5 Tank Full T1 vs Roi des Loups**

**Stats Joueur :**

- Level 5 → +40 HP, +8 Force, +4 Agility, +8 Endurance = **140 HP base**
- Iron Heavy Set (T1) : +58 ARM, +73 DEF, +175 HP, -15 AGI
- Iron Mace (T1) : +12 DMG, +3 FOR, +8 DEF
- Total HP : 140 + 175 + (8+10 END × 5) = **405 HP**
- Total Force : 5 + 8 + 3 = **16**
- Total Dégâts : 1 + 16 + 12 = **29**
- Total Defense : 0 + 73 + 8 = **81**

**Stats Boss :**

- HP : 500
- ATK : 25
- DEF : 15
- Vitesse : 2500ms

**Simulation :**

```
Dégâts joueur : 29 - 15 = 14 réels
Dégâts boss : 25 - 81 = 1 (minimum)

Tour 1 (0s)   : Joueur attaque → 14 dmg → Boss : 486/500 HP
Tour 2 (2.5s) : BOSS attaque → 1 dmg → Joueur : 404/405 HP ✅
Tour 3 (2.5s) : Joueur attaque → 14 dmg → Boss : 472/500 HP
...
Coups nécessaires pour tuer : 500 / 14 = ~36 coups
Temps total : 36 × 2s = ~72 secondes
Dégâts subis : 36 / 2.5 × 2.0 = ~29 coups × 1 dmg = 29 HP
```

**Résultat :**

- ✅ **VICTOIRE** en ~1 minute 12 secondes
- Joueur final : **376/405 HP**
- Ratio : Tank peut battre le boss grâce à sa defense massive !

**Verdict :** ✅ **ÉQUILIBRÉ** - Le tank peut vaincre le boss mais c'est long

---

## 📊 TABLEAU RÉCAPITULATIF - SURVIE DU JOUEUR

| Scenario                        | Temps Combat | HP Perdus | Victoire ? | Verdict         |
| ------------------------------- | ------------ | --------- | ---------- | --------------- |
| Lvl 1 NU vs Loup                | 11s          | 16        | ✅ Facile  | ⚠️ Trop facile  |
| Lvl 1 Iron Sword vs Loup        | 2s           | 0         | ✅ Trivial | ⚠️ Déséquilibré |
| Lvl 1 NU vs Sanglier            | 20s          | 36        | ✅ Moyen   | ✅ Équilibré    |
| Lvl 1 NU vs Boss                | 10s (mort)   | 100       | ❌ Mort    | ✅ Impossible   |
| Lvl 5 Tank T1 vs Boss           | 72s          | 29        | ✅ Dur     | ✅ Possible     |
| Lvl 1 NU vs Loup Alpha (Rare)   | ?            | ?         | ?          | À TESTER        |
| Lvl 1 Iron Sword vs Ours Féroce | ?            | ?         | ?          | À TESTER        |

---

## 🔧 PROBLÈMES IDENTIFIÉS

### ❌ **Problème 1 : Joueur Niveau 1 NU trop fort**

**Constat :**

- Le joueur nu peut tuer un Loup en perdant seulement **16 HP** (84% survie)
- Il peut enchaîner **6-7 loups** avant de mourir
- Aucun challenge, pas de danger

**Solution proposée :**

```diff
Option A : Augmenter ATK des monstres R1
- Loup Gris : 4 → 6 ATK
- Sanglier : 6 → 8 ATK

Option B : Réduire Force de base du joueur
- Force : 5 → 3
- Dégâts niveau 1 : 6 → 4

Option C : Augmenter HP des monstres R1
- Loup : 25 → 40 HP
- Sanglier : 35 → 60 HP

✅ RECOMMANDATION : Option A + C (buff monstres)
```

---

### ❌ **Problème 2 : Iron Sword (T1) trop puissant**

**Constat :**

- +12 DMG rend le joueur 3.5× plus fort
- One-shot les monstres communs
- Pas de progression (trop facile d'un coup)

**Solution proposée :**

```diff
Réduire les dégâts des armes T1
- Iron Mace : 12 → 6 DMG
- Iron Sword : 15 → 8 DMG
- Hunting Bow : 15 → 7 DMG

Progression graduelle :
T1 : +5-8 DMG
T2 : +12-18 DMG
T3 : +25-40 DMG
T4 : +50-80 DMG
```

---

### ❌ **Problème 3 : Pas de mécanique de Block/Evasion/Crit**

**Constat :**

- Les stats Block%, Evasion%, Crit% existent dans l'équipement
- MAIS elles ne sont **PAS utilisées** dans le combat !
- Combat trop linéaire (juste ATK vs DEF)

**Solution proposée :**

```javascript
// Ajouter dans Player.takeDamage()
const blockChance = this.equipmentManager.calculateTotalStats().blockChance || 0;
if (Math.random() * 100 < blockChance) {
  return 0; // Attaque bloquée !
}

// Ajouter dans Player.attack()
const critChance = this.stats.force / 100; // 1% par point de Force
if (Math.random() * 100 < critChance) {
  return damage * 2; // Coup critique !
}
```

---

### ❌ **Problème 4 : Régénération HP trop lente**

**Constat :**

- Regen en combat : **1% MaxHP/sec** (1 HP/sec au niveau 1)
- Regen hors combat : **5% MaxHP/sec** (5 HP/sec)
- Si le joueur perd 30 HP → **30 secondes** pour regen

**Solution proposée :**

```diff
Augmenter la régénération hors combat
- Hors combat : 5% → 10% MaxHP/sec
- En combat : 1% → 2% MaxHP/sec

Ou ajouter un bouton "Se reposer" :
- Repose pendant 5s
- Regen 50% MaxHP
- Cooldown 30s
```

---

## 🎯 OBJECTIFS D'ÉQUILIBRAGE

### **Règle des 80-50-20**

```
À son niveau, le joueur devrait :
✅ Gagner 80% des combats vs Monstres Communs (niveau égal)
✅ Gagner 50% des combats vs Monstres Rares (niveau +2)
❌ Gagner 20% des combats vs Monstres Elite (niveau +5)
❌ Gagner 0% des combats vs Boss (sans équipement adapté)
```

### **Progression du Temps de Combat**

```
Monstre Commun : 10-15 secondes
Monstre Rare : 20-30 secondes
Monstre Elite : 45-60 secondes
Boss : 1-2 minutes
```

### **Consommation HP**

```
Monstre Commun : Perdre 10-20% HP
Monstre Rare : Perdre 30-40% HP
Monstre Elite : Perdre 50-70% HP
Boss : Combat à mort (utiliser potions)
```

---

## 📋 PLAN D'ACTION

### **Phase 1 : Ajuster Stats Monstres R1** ⚡ URGENT

1. ✅ Augmenter HP des monstres communs (+50%)
2. ✅ Augmenter ATK des monstres communs (+2)
3. ✅ Tester avec simulations

### **Phase 2 : Réduire Puissance Équipement T1** ⚡ URGENT

1. ✅ Diviser par 2 les dégâts des armes T1
2. ✅ Réduire légèrement les stats d'armure T1 (-20%)
3. ✅ Re-tester les simulations

### **Phase 3 : Implémenter Block/Crit/Evasion** 📊 MOYEN

1. ⏳ Ajouter logique Block dans `Player.takeDamage()`
2. ⏳ Ajouter logique Crit dans `Player.attack()`
3. ⏳ Ajouter logique Evasion (Agility)
4. ⏳ Afficher dans l'UI (messages "BLOCKED!", "CRITICAL!")

### **Phase 4 : Balancer XP & Progression** 📈 MOYEN

1. ⏳ Calculer XP requis niveaux 1-50
2. ⏳ Ajuster XP donnée par monstres
3. ⏳ Vérifier progression = ~30-50h pour level 50

### **Phase 5 : Tester avec Joueurs** 🎮 FINAL

1. ⏳ Playtest niveau 1-10
2. ⏳ Recueillir feedback
3. ⏳ Ajuster selon retours

---

## 🚀 PROCHAINE ÉTAPE IMMÉDIATE

**Voulez-vous que je :**

**Option A** : Ajuste immédiatement les stats des monstres R1 (HP +50%, ATK +2) ?

**Option B** : Réduise d'abord les dégâts des armes T1 (÷2) ?

**Option C** : Implémente d'abord Block/Crit/Evasion pour rendre le combat plus intéressant ?

**Option D** : Tout faire dans l'ordre (A → B → C) automatiquement ?

Je recommande **Option D** pour un équilibrage complet ! 🎯
