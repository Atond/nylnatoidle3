# 🏰 FORMULES D'ÉQUILIBRAGE DES DONJONS

## 🎯 **Objectif**

Créer un système de donjons **équilibré** où :

- ✅ **Pas de carry facile** : Tous les persos doivent être bien équipés
- ✅ **Challenge réel** : Échec possible si sous-équipés
- ✅ **Progression claire** : Savoir exactement quoi améliorer
- ✅ **Respect de l'équilibrage existant** : Cohérent avec les quêtes/combat

---

## 📊 **FORMULES DE SIMULATION**

### **A. Calcul Effective HP du Tank**

```javascript
effectiveHP = baseHP * (1 + defense / 100);
```

**Exemple** :

- Tank avec 450 HP et 85 DEF
- EHP = 450 _ (1 + 85/100) = 450 _ 1.85 = **832.5 HP effectifs**
- Signification : Il peut encaisser 832 dégâts bruts avant de mourir

### **B. Calcul Heal Per Second (HPS)**

```javascript
healPerSec = intelligence * 0.5 + wisdom * 0.3;
```

**Exemple** :

- Heal avec 50 INT et 25 WIS
- HPS = (50 _ 0.5) + (25 _ 0.3) = 25 + 7.5 = **32.5 HP/sec**

### **C. Calcul Damage Per Second (DPS)**

```javascript
dpsPerSec = attack * (1 + strength / 100);
```

**Exemple** :

- DPS avec 150 ATK et 100 STR
- DPS = 150 _ (1 + 100/100) = 150 _ 2 = **300 dégâts/sec**

### **D. Simulation de combat**

```javascript
// Boss inflige X dégâts/sec sur Tank
bossDPS = bossAttack * (1 - tankDefense / (tankDefense + 100));

// Tank perd HP net par seconde
netDamageTank = bossDPS - healPerSec;

// Temps avant mort du Tank
if (netDamageTank > 0) {
  tankDeathTime = tankHP / netDamageTank;
} else {
  tankDeathTime = Infinity; // Tank ne meurt jamais
}

// Temps pour tuer le Boss
bossDeathTime = bossHP / playerDPS;

// Victoire si Boss meurt avant Tank
victory = bossDeathTime < tankDeathTime;
```

---

## 🏰 **TEMPLATE : CAVERNE DES OMBRES (Niveau 25)**

### **Stats du Boss**

```javascript
{
    name: 'Ombre Primordiale',
    level: 25,
    hp: 12000,
    attack: 50, // DPS brut
    defense: 10,
    mechanics: 'Attaque simple sur Tank'
}
```

### **Stats minimales requises (60% chance victoire)**

#### **🛡️ Tank**

```javascript
{
    level: 25,
    hp: 450,
    defense: 80,
    endurance: 35,

    // Résultats calculés
    effectiveHP: 450 * 1.80 = 810,
    survivalTime: 810 / 25 = 32.4 secondes (avec heal 25 HPS)
}
```

**Équipement recommandé** :

- Casque Acier +5 : +30 HP, +15 DEF
- Plastron Acier +5 : +80 HP, +25 DEF
- Jambières Acier +5 : +50 HP, +20 DEF
- Bottes Acier +5 : +40 HP, +10 DEF
- **TOTAL** : +200 HP, +70 DEF

#### **❤️ Heal**

```javascript
{
    level: 24,
    intelligence: 60,
    wisdom: 30,

    // Résultats calculés
    healPerSec: (60 * 0.5) + (30 * 0.3) = 39 HPS,
    netTankDamage: 50 - 39 = 11 DPS (Tank perd HP lentement)
}
```

**Équipement recommandé** :

- Bâton d'Acier +5 : +40 INT
- Robe Intelligence +3 : +20 INT, +15 WIS
- Chapeau Sage +3 : +10 WIS
- **TOTAL** : +60 INT, +25 WIS

#### **⚔️ DPS**

```javascript
{
    level: 26,
    attack: 180,
    strength: 120,

    // Résultats calculés
    dpsOutput: 180 * (1 + 120/100) = 396 DPS,
    timeToKill: 12000 / 396 = 30.3 secondes
}
```

**Équipement recommandé** :

- Épée d'Acier +5 : +80 ATK
- Plastron Force +3 : +40 STR
- Gants Force +3 : +30 STR
- **TOTAL** : +80 ATK, +70 STR

### **Simulation avec stats minimales**

```
Boss DPS sur Tank : 50
Heal HPS : 39
Net damage Tank : 50 - 39 = 11 DPS

Tank HP : 450
Temps avant mort Tank : 450 / 11 = 40.9 secondes

Boss HP : 12000
Player DPS : 396
Temps pour tuer Boss : 12000 / 396 = 30.3 secondes

✅ VICTOIRE : Boss meurt en 30s, Tank survit 41s
Marge de sécurité : 11 secondes (confortable)
```

### **Simulation avec équipement faible (ÉCHEC)**

```
Stats faibles :
- Tank : 350 HP, 60 DEF
- Heal : 40 INT, 15 WIS → 23 HPS
- DPS : 120 ATK, 80 STR → 216 DPS

Boss DPS : 50
Heal HPS : 23
Net damage Tank : 50 - 23 = 27 DPS

Tank HP : 350
Temps avant mort Tank : 350 / 27 = 13 secondes

Boss HP : 12000
Player DPS : 216
Temps pour tuer Boss : 12000 / 216 = 55.5 secondes

❌ DÉFAITE : Tank meurt en 13s, Boss meurt en 56s
Besoin d'améliorer équipement !
```

---

## 🎯 **RECOMMANDATIONS SYSTÈME**

### **A. Messages automatiques pré-combat**

```javascript
function getRecommendations(tank, heal, dps, dungeon) {
  const simulation = simulateCombat(tank, heal, dps, dungeon);

  if (simulation.tankDeathTime < simulation.bossDeathTime) {
    // Tank meurt avant Boss = ÉCHEC

    if (simulation.netDamage > 20) {
      return [
        "🔴 PROBLÈME CRITIQUE : Heal trop faible",
        `Tank perd ${simulation.netDamage.toFixed(1)} HP/sec net`,
        "",
        "💡 SOLUTION 1 (Recommandée) :",
        `Améliorer Heal : +${Math.round((simulation.netDamage + 5) / 0.5)} Intelligence`,
        `→ Craft Bâton d'Acier +5 (+40 INT)`,
        "",
        "💡 SOLUTION 2 (Alternative) :",
        `Améliorer Tank : +${Math.round(simulation.netDamage * 50)} HP`,
        `→ Craft Armure Acier complète (+200 HP, +70 DEF)`,
        "",
        "💡 SOLUTION 3 (Risquée) :",
        `Améliorer DPS : +${Math.round((simulation.bossDeathTime - simulation.tankDeathTime) * simulation.dpsOutput)} DPS`,
        `→ Tuer Boss avant mort Tank (difficile)`,
      ];
    }
  }

  if (simulation.winChance >= 90) {
    return [
      "✅ EXCELLENT : Équipe sur-équipée",
      `Chance victoire : ${simulation.winChance}%`,
      "Combat sera facile !",
    ];
  }

  if (simulation.winChance >= 70) {
    return [
      "✅ BON : Équipe bien équipée",
      `Chance victoire : ${simulation.winChance}%`,
      "Combat faisable avec bonne exécution",
    ];
  }

  if (simulation.winChance >= 50) {
    return [
      "⚠️ RISQUÉ : Équipe limite",
      `Chance victoire : ${simulation.winChance}%`,
      "Améliorer équipement recommandé",
    ];
  }

  return [
    "🔴 DANGEREUX : Échec probable",
    `Chance victoire : ${simulation.winChance}%`,
    "Équipement insuffisant, améliorez avant d'entrer !",
  ];
}
```

### **B. Coût d'entrée adaptatif**

```javascript
const dungeonEntryCost = {
  caverne_ombres: {
    level: 25,
    cost: 500,
    lostOnFailure: true,
    message: "Vous perdrez 500 or si vous échouez !",
  },
  temple_oublie: {
    level: 35,
    cost: 1500,
    lostOnFailure: true,
    message: "Vous perdrez 1500 or si vous échouez !",
  },
  forteresse_dragon: {
    level: 45,
    cost: 5000,
    lostOnFailure: true,
    message: "Vous perdrez 5000 or si vous échouez !",
  },
};
```

---

## 🔄 **INTÉGRATION AVEC SYSTÈME EXISTANT**

### **A. Cohérence avec les quêtes**

**Quête M10** : Tuer Boss Région 1 (niveau 8) → Débloque Région 2
**Quête M18** : Tuer Boss Région 2 (niveau 18) → Débloque Ville
**Quête M28** : Tuer Boss Région 3 (niveau 28) → Débloque Donjons

**Logique** :

- Level 30 → Débloque Alt Characters
- Level 25 → Premier Donjon accessible (mais difficile)
- Level 30+ avec 3 alts équipés → Donjons faisables

### **B. Progression équipement**

```
Level 1-10 : Équipement Bronze (Craft T1)
Level 10-20 : Équipement Fer (Craft T1 amélioré)
Level 20-30 : Équipement Acier (Craft T2)
Level 30-40 : Équipement Acier + Donjon Epic (Loot T2+)
Level 40-50 : Équipement Mythril (Craft T3) + Donjon Legendary
```

**Donjons dropent équipement T2+ avec Set Bonus** :

- Caverne Ombres (Lvl 25) : Epic T2 (Set Tank/Heal)
- Temple Oublié (Lvl 35) : Epic+ T2.5 (Set complet)
- Forteresse Dragon (Lvl 45) : Legendary T3 (Best in Slot)

---

## ✅ **CHECKLIST ÉQUILIBRAGE**

Avant de release un donjon, vérifier :

- [ ] **Stats Boss** : HP, ATK, DEF cohérents avec level
- [ ] **Stats minimales** : Tank, Heal, DPS requis calculés
- [ ] **Simulation** : Victoire à 60% avec stats minimales
- [ ] **Recommandations** : Messages clairs si sous-équipé
- [ ] **Coût d'entrée** : Proportionnel au risque
- [ ] **Loot** : Équipement meilleur que craft du même level
- [ ] **XP Reward** : ~10% du level requis
- [ ] **Or Reward** : 5x le coût d'entrée

---

## 💬 **Question pour toi**

Ces formules te semblent **équilibrées** ?

- Pas trop difficile (impossible sans over-stuff)
- Pas trop facile (carry avec main OP)

Veux-tu que j'ajuste quelque chose ? 🎯
