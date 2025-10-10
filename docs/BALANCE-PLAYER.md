# 👤 ÉQUILIBRAGE - PROGRESSION JOUEUR

> **Fichier** : Stats, Classes, XP, Level-Up  
> **Lien** : [← Vue d'ensemble](BALANCE-OVERVIEW.md) | [→ Métiers](BALANCE-PROFESSIONS.md)

---

## 📊 STATS DE BASE

### **Départ (Niveau 1)**

```javascript
PLAYER: {
    STARTING_LEVEL: 1,
    STARTING_HP: 100,
    STARTING_STATS: {
        force: 5,
        agility: 5,
        intelligence: 5,
        wisdom: 5,
        endurance: 5
    }
}
```

### **Rôle de Chaque Stat**

| Stat             | Formule                              | Effet                       |
| ---------------- | ------------------------------------ | --------------------------- |
| **Force**        | 1 point = +1.0 dégâts physiques      | Dégâts mêlée/arc            |
| **Agilité**      | 1 point = +0.5% chance critique      | Coups critiques (×2 dégâts) |
| **Intelligence** | 1 point = +1.0 dégâts magiques       | Sorts magiques (futur)      |
| **Sagesse**      | 1 point = +2 mana max + 0.1 mana/sec | Régénération mana (futur)   |
| **Endurance**    | 1 point = +15 HP max + 1 défense     | Points de vie et défense    |

**Notes** :

- **HP supprimé** : Fusionné avec Endurance pour simplifier
- **Agilité** : 100 agilité = 50% chance critique (équilibré)
- **Sagesse** : Prépare système de mana (5 sagesse = 10 mana, 0.5 mana/sec)
- **Endurance** : Stat tank principale (HP + défense)

---

## 📈 PROGRESSION XP

### **Formule XP Requise**

```javascript
// OPTIMISÉE
PROGRESSION: {
    BASE_XP: 100,
    XP_EXPONENT: 1.35  // Réduit de 1.5 → 1.35 (-25% au niveau 50)
}

Formule : 100 × (niveau ^ 1.35)
```

### **Table XP Complète (Niveaux 1-50)**

| Niveau | XP Requise | XP Cumul | Temps (15 XP/sec) | Gain Stats |
| ------ | ---------- | -------- | ----------------- | ---------- |
| 1      | 100        | 0        | 0s                | -          |
| 2      | 128        | 128      | 9s                | +17        |
| 3      | 154        | 282      | 19s               | +17        |
| 4      | 180        | 462      | 31s               | +17        |
| 5      | 204        | 666      | 44s               | +17        |
| 6      | 228        | 894      | 1m 0s             | +17        |
| 7      | 251        | 1,145    | 1m 16s            | +17        |
| 8      | 274        | 1,419    | 1m 35s            | +17        |
| 9      | 296        | 1,715    | 1m 54s            | +17        |
| 10     | 318        | 2,033    | 2m 14s            | +17        |
| 11     | 339        | 2,372    | 2m 38s            | +17        |
| 12     | 360        | 2,732    | 3m 2s             | +17        |
| 13     | 381        | 3,113    | 3m 27s            | +17        |
| 14     | 401        | 3,514    | 3m 54s            | +17        |
| 15     | 421        | 3,935    | 4m 22s            | +17        |
| 20     | 531        | 7,341    | 8m 9s             | +17        |
| 25     | 634        | 12,162   | 13m 32s           | +17        |
| 30     | 731        | 18,176   | 20m 12s           | +17        |
| 35     | 824        | 25,268   | 28m 4s            | +17        |
| 40     | 913        | 33,352   | 37m 3s            | +17        |
| 45     | 999        | 42,363   | 47m 4s            | +17        |
| 50     | 1,083      | 52,252   | 58m 5s            | +17        |

**Temps total niveau 50** : ~14h 30min (avec 15 XP/sec moyen)

---

## 🎯 GAINS PAR NIVEAU

### **Stats de Base (Tous)**

```javascript
// OPTIMISÉS (+50% par rapport à avant)
STATS_PER_LEVEL: {
    force: 3,         // +2 → +3 (+50%)
    agility: 2,       // +1 → +2 (×2)
    intelligence: 2,  // +1 → +2 (×2)
    wisdom: 2,        // +1 → +2 (×2)
    endurance: 4      // +2 → +4 (×2) - Remplace HP + Endurance
}
```

**Total par niveau** : +13 points de stats (au lieu de +17, mais HP intégré dans Endurance)

---

## 🛡️ BONUS PAR CLASSE

### **Guerrier (Warrior)** 🛡️

**Focus** : Tank, DPS physique, survie

```javascript
CLASS_BONUSES: {
    warrior: {
        hp: +5,          // 20 HP/niveau au lieu de 15
        force: +2,       // 5 Force/niveau au lieu de 3
        endurance: +2    // 5 Endurance/niveau au lieu de 3
    }
}
```

**Progression Guerrier Niveau 20** :

- HP : 100 + (20 × 20) = **500 HP** (vs 400 autres classes)
- Force : 5 + (20 × 5) = **105 Force** (vs 65 autres)
- Endurance : 5 + (20 × 5) = **105 Endurance** (vs 65 autres)

**Rôle** : Tank en early game, bruiser en late game

---

### **Archer (Archer)** 🏹

**Focus** : Coups critiques, DPS, précision

```javascript
CLASS_BONUSES: {
    archer: {
        agility: +3,     // 5 Agilité/niveau au lieu de 2
        force: +1,       // 4 Force/niveau au lieu de 3
        intelligence: +1 // 3 Intelligence/niveau au lieu de 2
    }
}
```

**Progression Archer Niveau 20** :

- Agilité : 5 + (20 × 5) = **105 Agilité** (vs 45 autres)
- Chance critique : 105 × 0.5% = **52.5%** (vs 22.5% autres)
- Force : 5 + (20 × 4) = **85 Force**
- **Dégâts critiques** : ×2.0 (doublent les dégâts)

**Rôle** : DPS élevé avec critiques constants, excellent clear zones

---

### **Mage (Mage)** 🔮

**Focus** : Burst damage magique, AoE, mana élevé

```javascript
CLASS_BONUSES: {
    mage: {
        intelligence: +3, // 5 Intelligence/niveau au lieu de 2
        wisdom: +2,       // 4 Sagesse/niveau au lieu de 2
        endurance: -1     // 3 Endurance/niveau au lieu de 4 (fragile)
    }
}
```

**Progression Mage Niveau 20** :

- Intelligence : 5 + (20 × 5) = **105 Intelligence** (vs 45 autres)
- Sagesse : 5 + (20 × 4) = **85 Sagesse**
- Mana max : 85 × 2 = **170 mana** (vs 90 autres)
- Régén mana : 85 × 0.1 = **8.5 mana/sec** (vs 4.5 autres)
- HP : 100 + (20 × 3 × 15) = **1000 HP** (vs 1300 autres)

**Rôle** : Burst DPS magique, sorts lourds, fragile mais puissant

---

### **Prêtre (Priest)** ❤️

**Focus** : Support, régénération mana, sorts de soin (futur)

```javascript
CLASS_BONUSES: {
    priest: {
        wisdom: +3,       // 5 Sagesse/niveau au lieu de 2
        intelligence: +1, // 3 Intelligence/niveau au lieu de 2
        endurance: +1     // 5 Endurance/niveau au lieu de 4
    }
}
```

**Progression Prêtre Niveau 20** :

- Sagesse : 5 + (20 × 5) = **105 Sagesse**
- Intelligence : 5 + (20 × 3) = **65 Intelligence**
- Mana max : 105 × 2 = **210 mana** (le plus élevé)
- Régén mana : 105 × 0.1 = **10.5 mana/sec** (régénération exceptionnelle)
- HP : 100 + (20 × 5 × 15) = **1600 HP** (tanky)

**Rôle** : Tank magique, sorts de soin (futur), mana illimité

**Rôle** : Solo facile (regen), support groupe (futur)

---

## 📊 COMPARAISON CLASSES NIVEAU 50

| Classe       | HP   | Force | Agilité | Int | Sagesse | Endurance | Critique | Mana Max |
| ------------ | ---- | ----- | ------- | --- | ------- | --------- | -------- | -------- |
| **Guerrier** | 3950 | 255   | 105     | 105 | 105     | 255       | 52.5%    | 210      |
| **Archer**   | 3100 | 205   | 255     | 155 | 105     | 205       | 127.5%   | 210      |
| **Mage**     | 2400 | 155   | 105     | 255 | 205     | 155       | 52.5%    | 410      |
| **Prêtre**   | 3400 | 155   | 105     | 155 | 255     | 205       | 52.5%    | 510      |
| **Moyenne**  | 3200 | 192   | 142     | 167 | 167     | 205       | 71.25%   | 335      |

**Notes** :

- **HP** : Calculé avec formule base HP = endurance × 15 + 100
- **Critique** : Archer dépasse 100%, garantit critiques + bonus multiplicateur futur
- **Mana** : Prêtre et Mage dominent pour système de sorts (futur)

**Variation** : ±30-35% dans la spécialité de chaque classe

---

## 🎲 FORMULES DE COMBAT

### **Dégâts Infligés**

```javascript
// Dégâts physiques (Guerrier, Archer)
baseDamage = weapon.damage || 1
physicalDamage = baseDamage + (force × 1.0) + equipment.damageBonus

// Dégâts magiques (Mage, Prêtre) - FUTUR
magicalDamage = baseDamage + (intelligence × 1.0) + equipment.magicBonus

// Système de critique
critChance = agility × 0.005  // 0.5% par point (200 agilité = 100%)
critMultiplier = 2.0  // Dégâts × 2 sur critique

if (Math.random() < critChance) {
    damage *= critMultiplier
    console.log("💥 COUP CRITIQUE!")
}

finalDamage = Math.max(1, damage - enemy.defense)
```

**Exemples de dégâts critiques** :

- Archer 105 agilité : 52.5% chance × 2.0 = **~105% DPS moyen**
- Guerrier 55 agilité : 27.5% chance × 2.0 = **~55% DPS moyen**
- Impact visible et satisfaisant !

### **Vitesse d'Attaque** (SUPPRIMÉ)

```javascript
// ANCIEN SYSTÈME (vitesse basée agilité) - NE PLUS UTILISER
// baseSpeed = weapon.speed / (1 + agility × 0.02)

// NOUVEAU : Vitesse fixe par arme
baseSpeed = weapon.speed || 2000; // 2 secondes base
attackSpeed = baseSpeed / equipment.attackSpeedBonus;

// Les critiques remplacent la vitesse pour l'agilité
```

### **HP Maximum**

```javascript
// HP total (SIMPLIFIÉ - Endurance = HP)
baseHP = 100
enduranceHP = endurance × 15  // 1 endurance = 15 HP

maxHP = baseHP + enduranceHP + equipment.hpBonus

// Exemple Guerrier niveau 20 (255 endurance)
maxHP = 100 + (255 × 15) + 50
maxHP = 100 + 3825 + 50 = 3975 HP

// Exemple Mage niveau 20 (155 endurance)
maxHP = 100 + (155 × 15) + 50
maxHP = 100 + 2325 + 50 = 2475 HP (fragile!)
```

### **Défense**

```javascript
// Réduction dégâts (intégrée dans Endurance)
baseDefense = 0
enduranceDefense = endurance × 1.0  // 1:1 avec endurance
equipmentDefense = equipment.defense

totalDefense = baseDefense + enduranceDefense + equipmentDefense

// Dégâts réduits de 1:1 (cap 75%)
damageReduced = Math.min(totalDefense, incomingDamage * 0.75)
```

### **Mana (FUTUR SYSTÈME)**

```javascript
// Mana total
baseMana = 0
wisdomMana = wisdom × 2  // 1 sagesse = 2 mana max

maxMana = baseMana + wisdomMana + equipment.manaBonus

// Régénération mana
manaRegen = wisdom × 0.1  // 1 sagesse = 0.1 mana/sec

// Exemple Mage niveau 20 (85 sagesse)
maxMana = 0 + (85 × 2) + 20 = 190 mana
manaRegen = 85 × 0.1 = 8.5 mana/sec
```

**Notes sur le mana** :

- Système préparé pour futur contenu (sorts, compétences actives)
- Prêtre = tank mana (210 mana niveau 20)
- Mage = burst damage (170 mana niveau 20)
- Guerrier/Archer = peu de mana (45 mana niveau 20), focus physique

---

## 🎁 RÉCOMPENSES DE NIVEAU

### **Tous les Niveaux**

- ✅ Stats augmentées (+17 points)
- ✅ HP restauré à 100%
- ✅ Animation + notification
- ✅ Unlock check (nouveaux contenus ?)

### **Niveau 5** 🎉

- 🔓 Déblocage Craft (Forgeron accessible)
- 🔓 Déblocage Ville (Scierie/Mine)
- 🎖️ 1 Point de Compétence
- 💎 Coffre cadeau (50 gold, 20 bois, 20 fer)

### **Niveau 10** 🎉

- 🔓 Auto-combat disponible
- 🔓 Boss Région 1 accessible
- 🎖️ 1 Point de Compétence
- 💎 Coffre cadeau (200 gold, équipement rare)

### **Niveau 15** 🎉

- 🔓 Market (génère gold)
- 🔓 Joaillier (craft bijoux)
- 🎖️ 2 Points de Compétence
- 💎 Coffre cadeau (500 gold, gemme rare)

### **Niveau 20** 🎉

- 🔓 Boss Région 2 accessible
- 🔓 Monture (+20% vitesse XP)
- 🎖️ 2 Points de Compétence
- 💎 Coffre cadeau (1000 gold, équipement épique)

### **Niveau 25** 🎉

- 🔓 Temple (buffs temporaires)
- 🎖️ 3 Points de Compétence
- 💎 Coffre cadeau (2000 gold, recette légendaire)

### **Niveau 30** 🎉

- 🔓 Boss Région 3 accessible
- 🔓 Familier (+10% drop rate)
- 🎖️ 3 Points de Compétence
- 💎 Coffre cadeau (5000 gold, équipement légendaire)

### **Niveau 35** 🎉

- 🎖️ 4 Points de Compétence
- 💎 Coffre cadeau (10000 gold, gemme légendaire)

### **Niveau 40** 🎉

- 🔓 Boss Région 4 accessible
- 🔓 Titre "Champion" (+15% toutes stats)
- 🎖️ 4 Points de Compétence
- 💎 Coffre cadeau (20000 gold, équipement mythique)

### **Niveau 45** 🎉

- 🎖️ 5 Points de Compétence
- 💎 Coffre cadeau (50000 gold, recette divine)

### **Niveau 50** 🎉👑

- 🔓 Boss Final accessible
- 🔓 Ascension (prestige) disponible
- 🎖️ 5 Points de Compétence
- 💎 Coffre cadeau (100000 gold, équipement divin complet)

**Total Points de Compétence niveau 50** : 30 points

---

## 🌟 ARBRE DE COMPÉTENCES

### **Combat (15 talents)**

```javascript
COMBAT_TREE: {
    // Rang 1 (1 point chacun)
    physical_damage_1: { bonus: '+5% dégâts physiques', cost: 1, requires: null },
    critical_chance_1: { bonus: '+5% chance critique', cost: 1, requires: null },
    magic_damage_1: { bonus: '+5% dégâts magiques (futur)', cost: 1, requires: null },

    // Rang 2 (2 points chacun)
    physical_damage_2: { bonus: '+10% dégâts physiques', cost: 2, requires: 'physical_damage_1' },
    critical_chance_2: { bonus: '+10% chance critique', cost: 2, requires: 'critical_chance_1' },
    magic_damage_2: { bonus: '+10% dégâts magiques (futur)', cost: 2, requires: 'magic_damage_1' },

    // Rang 3 (3 points chacun)
    physical_damage_3: { bonus: '+15% dégâts physiques', cost: 3, requires: 'physical_damage_2' },
    critical_damage: { bonus: 'Critiques × 2.5 au lieu de × 2', cost: 3, requires: 'critical_chance_2' },
    magic_damage_3: { bonus: '+15% dégâts magiques (futur)', cost: 3, requires: 'magic_damage_2' },

    // Rang 4 (5 points) - CAPSTONE
    lethal_strike: { bonus: 'Critiques × 3.0 finaux', cost: 5, requires: 'critical_damage' }
}
```

**Max Combat** : 27 points (plus que disponible) → Choix obligatoire
**Build Archer** : Focus critique (1+2+3+5 = 11 points = critiques × 3.0)

### **Survie (15 talents)**

```javascript
SURVIVAL_TREE: {
    hp_boost_1: { bonus: '+5% HP max', cost: 1, requires: null },
    defense_boost_1: { bonus: '+5% défense', cost: 1, requires: null },
    regeneration_1: { bonus: '+1 HP/sec hors combat', cost: 1, requires: null },

    hp_boost_2: { bonus: '+10% HP max', cost: 2, requires: 'hp_boost_1' },
    defense_boost_2: { bonus: '+10% défense', cost: 2, requires: 'defense_boost_1' },
    regeneration_2: { bonus: '+2 HP/sec hors combat', cost: 2, requires: 'regeneration_1' },

    hp_boost_3: { bonus: '+15% HP max', cost: 3, requires: 'hp_boost_2' },
    defense_boost_3: { bonus: '+15% défense', cost: 3, requires: 'defense_boost_2' },
    combat_regeneration: { bonus: '+1 HP/sec EN combat', cost: 3, requires: 'regeneration_2' }
}
```

### **Métiers (15 talents)**

```javascript
PROFESSION_TREE: {
    profession_xp_1: { bonus: '+10% XP métiers', cost: 1, requires: null },
    drop_rate_1: { bonus: '+5% drop rate', cost: 1, requires: null },
    craft_speed_1: { bonus: '+10% vitesse craft', cost: 1, requires: null },

    profession_xp_2: { bonus: '+20% XP métiers', cost: 2, requires: 'profession_xp_1' },
    drop_rate_2: { bonus: '+10% drop rate', cost: 2, requires: 'drop_rate_1' },
    craft_speed_2: { bonus: '+20% vitesse craft', cost: 2, requires: 'craft_speed_1' },

    profession_xp_3: { bonus: '+30% XP métiers', cost: 3, requires: 'profession_xp_2' },
    drop_rate_3: { bonus: '+15% drop rate', cost: 3, requires: 'drop_rate_2' },
    auto_craft: { bonus: 'Auto-craft 1 item/min', cost: 3, requires: 'craft_speed_2' }
}
```

### **Économie (15 talents)**

```javascript
ECONOMY_TREE: {
    gold_boost_1: { bonus: '+10% gold des monstres', cost: 1, requires: null },
    building_boost_1: { bonus: '+10% production bâtiments', cost: 1, requires: null },
    craft_cost_1: { bonus: '-5% coût craft', cost: 1, requires: null },

    gold_boost_2: { bonus: '+20% gold des monstres', cost: 2, requires: 'gold_boost_1' },
    building_boost_2: { bonus: '+20% production bâtiments', cost: 2, requires: 'building_boost_1' },
    craft_cost_2: { bonus: '-10% coût craft', cost: 2, requires: 'craft_cost_1' },

    gold_boost_3: { bonus: '+30% gold des monstres', cost: 3, requires: 'gold_boost_2' },
    building_boost_3: { bonus: '+30% production bâtiments', cost: 3, requires: 'building_boost_2' },
    merchant: { bonus: 'Vendre items +20% prix', cost: 3, requires: 'craft_cost_2' }
}
```

---

## 🎮 BUILDS RECOMMANDÉS

### **Build Speedrun (Niveau 50 rapide)**

**Priorité** : XP > Everything

- ✅ Économie : gold_boost (3 rangs) = 9 points
- ✅ Métiers : profession_xp (3 rangs) = 6 points
- ✅ Combat : physical_damage (2 rangs) = 3 points
- ✅ Survie : hp_boost (2 rangs) = 3 points

**Total** : 21 points / 30

---

### **Build Tank (Guerrier survie)**

**Priorité** : HP + Défense > DPS

- ✅ Survie : hp_boost (3 rangs) + defense_boost (3 rangs) + regen (3 rangs) = 18 points
- ✅ Combat : physical_damage (2 rangs) = 3 points

**Total** : 21 points / 30

---

### **Build DPS Critique (Archer burst)**

**Priorité** : Critiques > Dégâts physiques

- ✅ Combat : critical_chance (3 rangs) + critical_damage + lethal_strike = 11 points
- ✅ Combat : physical_damage (3 rangs) = 6 points
- ✅ Survie : hp_boost (2 rangs) + defense_boost (1 rang) = 4 points
- ✅ Économie : gold_boost (2 rangs) = 3 points

**Total** : 24 points / 30
**Résultat** : Critiques × 3.0 constants + 30% dégâts physiques

---

### **Build Mage (DPS magique futur)**

**Priorité** : Dégâts magiques > Mana

- ✅ Combat : magic_damage (3 rangs) = 6 points
- ✅ Survie : hp_boost (3 rangs) = 6 points (compense fragilité)
- ✅ Survie : regeneration (2 rangs) = 3 points
- ✅ Économie : gold_boost (3 rangs) = 6 points
- ✅ Métiers : profession_xp (2 rangs) = 3 points

**Total** : 24 points / 30
**Résultat** : +30% dégâts magiques, tanky malgré faible Endurance

---

### **Build Farmer (Ressources optimales)**

**Priorité** : Drops + Production

- ✅ Métiers : drop_rate (3 rangs) + profession_xp (2 rangs) + craft_speed (2 rangs) = 12 points
- ✅ Économie : gold_boost (3 rangs) + building_boost (2 rangs) = 8 points

**Total** : 20 points / 30

---

## 🔄 RESET DE TALENTS

### **Coût de Respec**

```javascript
RESPEC_COST: {
    first: 100,      // 100 gold (gratuit au début)
    multiplier: 2    // Double à chaque fois
}

// 1er respec : 100 gold
// 2e respec : 200 gold
// 3e respec : 400 gold
// 10e respec : 51,200 gold
```

**Alternative** : Respec gratuit tous les 7 jours (encourager expérimentation)

---

**Navigation** :

- [← Vue d'ensemble](BALANCE-OVERVIEW.md)
- [→ Métiers détaillés](BALANCE-PROFESSIONS.md)
- [→ Craft et recettes](BALANCE-CRAFTING.md)
