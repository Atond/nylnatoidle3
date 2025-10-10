# 🏗️ ÉQUILIBRAGE - BÂTIMENTS & SYNERGIES

> **Fichier** : Tous les bâtiments, production, bonus, synergies  
> **Lien** : [← Craft](BALANCE-CRAFTING.md) | [← Vue d'ensemble](BALANCE-OVERVIEW.md)

---

## 🏛️ PHILOSOPHIE DES BÂTIMENTS

### **Principes**

1. **Idle Progression** : Production passive même AFK
2. **Synergie avec Métiers** : Bâtiments boostent les métiers correspondants
3. **Scaling Exponentiel Contrôlé** : ×2 production mais coût ×1.8
4. **Déblocages Progressifs** : Nouveaux bâtiments tous les 5-10 niveaux

### **Formules Universelles**

```javascript
// Coût du prochain niveau
nextCost = baseCost × (costMultiplier ^ currentLevel)

// Production du niveau actuel
production = baseProduction × (productionMultiplier ^ currentLevel)

// ROI (Return On Investment)
ROI = nextCost / production  // En minutes
```

---

## 🌲 SCIERIE (SAWMILL)

### **Statistiques**

```javascript
{
    id: 'sawmill',
    name: 'Scierie',
    icon: '🏗️',
    unlockLevel: 1,  // Joueur
    professionRequired: 'woodcutter',
    professionLevel: 5,

    baseProduction: {
        wood_oak: 10  // 10 bois chêne/min niveau 1
    },

    baseCost: {
        gold: 100,
        wood_oak: 100
    },

    costMultiplier: 1.8,
    productionMultiplier: 2.0  // ×2 par niveau
}
```

### **Progression**

| Niveau | Coût (Gold) | Coût (Bois) | Production/min | ROI (min) |
| ------ | ----------- | ----------- | -------------- | --------- |
| 1      | 100         | 100         | 10             | 10        |
| 2      | 180         | 180         | 20             | 9         |
| 3      | 324         | 324         | 40             | 8.1       |
| 5      | 1,049       | 1,049       | 160            | 6.5       |
| 10     | 27,476      | 27,476      | 5,120          | 5.4       |
| 15     | 719,571     | 719,571     | 163,840        | 4.4       |
| 20     | 18,842,527  | 18,842,527  | 5,242,880      | 3.6       |

**ROI optimal** : Niveau 10-15 (5-4 minutes de retour sur investissement)

---

### **Bonus sur Bûcheron**

#### **Niveau 5**

```javascript
{
    woodcutterXpBonus: 0.10,      // +10% XP Bûcheron
    woodcutterDropRate: 0.05,     // +5% drop rate
    unlockInfo: 'Boost mineur sur Bûcheron'
}
```

#### **Niveau 10** ⭐

```javascript
{
    woodcutterXpBonus: 0.20,      // +20% XP
    woodcutterDropRate: 0.10,     // +10% drop rate
    autoGatherBonus: 1,           // +1 ressource auto/min
    unlockProduction: ['wood_ash'],  // Peut produire Frêne
    unlockInfo: 'Déblocage production Frêne automatique'
}
```

#### **Niveau 15** ⭐⭐

```javascript
{
    woodcutterXpBonus: 0.30,
    woodcutterDropRate: 0.15,
    autoGatherBonus: 2,
    qualityChance: 0.05,          // +5% chance bois qualité supérieure
    unlockProduction: ['wood_maple', 'wood_birch'],
    unlockInfo: 'Production bois uncommon + Qualité améliorée'
}
```

#### **Niveau 20** ⭐⭐⭐

```javascript
{
    woodcutterXpBonus: 0.50,
    woodcutterDropRate: 0.25,
    autoGatherBonus: 5,
    qualityChance: 0.10,
    unlockProduction: ['wood_cedar', 'wood_yew'],
    multiProduction: true,        // Peut produire plusieurs types simultanément
    unlockInfo: 'Production bois rares + Multi-production'
}
```

#### **Niveau 30** 👑

```javascript
{
    woodcutterXpBonus: 1.00,      // +100% XP Bûcheron
    woodcutterDropRate: 0.50,     // +50% drop rate
    autoGatherBonus: 15,
    qualityChance: 0.20,
    unlockProduction: ['wood_sequoia', 'wood_bamboo', 'wood_ebony'],
    multiProduction: true,
    epicProduction: true,         // Peut produire bois épiques
    unlockInfo: 'MAÎTRE SCIERIE - Production épique débloquée'
}
```

---

## ⛏️ MINE

### **Statistiques**

```javascript
{
    id: 'mine',
    name: 'Mine',
    icon: '⛰️',
    unlockLevel: 1,
    professionRequired: 'miner',
    professionLevel: 5,

    baseProduction: {
        ore_iron: 10  // 10 fer/min niveau 1
    },

    baseCost: {
        gold: 100,
        ore_iron: 100
    },

    costMultiplier: 1.8,
    productionMultiplier: 2.0
}
```

### **Bonus sur Mineur**

**Identique à Scierie** mais avec bonus spécial gemmes :

#### **Niveau 10** ⭐

```javascript
{
    minerXpBonus: 0.20,
    minerDropRate: 0.10,
    gemChance: 0.005,             // +0.5% chance gemme au mineur
    unlockProduction: ['ore_copper', 'ore_tin']
}
```

#### **Niveau 20** ⭐⭐⭐

```javascript
{
    minerXpBonus: 0.50,
    minerDropRate: 0.25,
    gemChance: 0.015,             // +1.5% chance gemme
    qualityChance: 0.10,
    unlockProduction: ['ore_steel', 'ore_mithril', 'ore_obsidian'],
    canProduceGems: true,         // PEUT produire gemmes communes
    unlockInfo: 'Production gemmes communes débloquée'
}
```

#### **Niveau 30** 👑

```javascript
{
    minerXpBonus: 1.00,
    minerDropRate: 0.50,
    gemChance: 0.030,             // +3% chance gemme (MASSIF)
    qualityChance: 0.20,
    unlockProduction: ['ore_electrum', 'ore_adamantite'],
    canProduceGems: true,
    gemRarity: 'uncommon',        // Produit gemmes jusqu'à uncommon
    autoGemProduction: 1,         // 1 gemme aléatoire/10 min
    unlockInfo: 'MAÎTRE MINE - Production gemmes automatique'
}
```

---

## 📦 ENTREPÔT (WAREHOUSE)

### **Statistiques**

```javascript
{
    id: 'warehouse',
    name: 'Entrepôt de Ressources',
    icon: '🏚️',
    unlockLevel: 5,

    baseProduction: {},  // Pas de production

    baseCost: {
        gold: 500,
        wood_oak: 200,
        ore_iron: 100
    },

    costMultiplier: 2.5,  // Plus cher (utilitaire)
    storageBonus: 500     // +500 stockage/niveau
}
```

### **Capacités de Stockage**

| Niveau | Coût (Gold) | Capacité Bois | Capacité Minerai | Capacité Gemmes |
| ------ | ----------- | ------------- | ---------------- | --------------- |
| 0      | -           | 1,000         | 1,000            | 100             |
| 1      | 500         | 1,500         | 1,500            | 150             |
| 5      | 9,765       | 3,500         | 3,500            | 350             |
| 10     | 95,367      | 6,000         | 6,000            | 600             |
| 15     | 931,322     | 8,500         | 8,500            | 850             |
| 20     | 9,094,947   | 11,000        | 11,000           | 1,100           |

**Utilité** :

- Évite de perdre ressources quand cap atteint
- Indispensable pour production passive longue durée
- Requis pour craft équipement haut niveau

---

## 💰 TRÉSORERIE (TREASURY)

### **Statistiques**

```javascript
{
    id: 'treasury',
    name: 'Trésorerie de Guerre',
    icon: '🏰',
    unlockLevel: 5,

    baseCost: {
        gold: 1000,
        wood_oak: 150,
        ore_iron: 150
    },

    costMultiplier: 2.5,
    storageBonus: 250     // +250 stockage butin/niveau
}
```

### **Capacités de Stockage (Drops Combat)**

| Niveau | Coût (Gold) | Capacité Drops Communs | Capacité Drops Rares+ |
| ------ | ----------- | ---------------------- | --------------------- |
| 0      | -           | 500                    | 100                   |
| 1      | 1,000       | 750                    | 150                   |
| 5      | 9,765       | 1,750                  | 350                   |
| 10     | 95,367      | 3,000                  | 600                   |
| 15     | 931,322     | 4,250                  | 850                   |

**Utilité** :

- Stocke drops monstres (peaux, crocs, essences)
- Nécessaire pour craft équipement avancé
- Farm AFK sans perdre drops

---

## ⚒️ FORGE (BLACKSMITH WORKSHOP)

### **Statistiques**

```javascript
{
    id: 'forge',
    name: 'Forge',
    icon: '⚒️',
    unlockLevel: 10,
    professionRequired: 'blacksmith',
    professionLevel: 10,

    baseProduction: {},  // Craft automatique

    baseCost: {
        gold: 2000,
        ore_iron: 300,
        wood_oak: 150,
        ore_mithril: 50
    },

    costMultiplier: 2.2,

    autoCraft: {
        level1: 1,   // 1 craft auto/10 min
        level5: 2,
        level10: 5,
        level20: 15
    }
}
```

### **Bonus sur Forgeron**

#### **Niveau 1** ⭐

```javascript
{
    blacksmithXpBonus: 0.15,      // +15% XP Forgeron
    craftSpeedBonus: 0.10,        // -10% temps craft
    autoCraft: 1,                 // 1 craft auto/10 min
    unlockInfo: 'Craft automatique armes basiques'
}
```

#### **Niveau 5** ⭐⭐

```javascript
{
    blacksmithXpBonus: 0.30,
    craftSpeedBonus: 0.20,
    autoCraft: 2,
    qualityChance: 0.10,          // +10% chance qualité supérieure
    materialSave: 0.05,           // +5% économie matériaux
    unlockInfo: 'Craft armes rares automatique'
}
```

#### **Niveau 10** ⭐⭐⭐

```javascript
{
    blacksmithXpBonus: 0.50,
    craftSpeedBonus: 0.30,
    autoCraft: 5,
    qualityChance: 0.20,
    materialSave: 0.10,
    criticalCraft: 0.10,          // +10% chance craft double
    unlockInfo: 'Craft armes épiques + Craft critique'
}
```

#### **Niveau 20** 👑

```javascript
{
    blacksmithXpBonus: 1.00,
    craftSpeedBonus: 0.50,        // -50% temps craft
    autoCraft: 15,                // 15 crafts/10 min = 1.5/min
    qualityChance: 0.35,
    materialSave: 0.20,
    criticalCraft: 0.20,
    masterworkChance: 0.10,       // +10% chef-d'œuvre
    unlockInfo: 'MAÎTRE FORGE - Chef-d\'œuvres possibles'
}
```

**Utilité** :

- Craft armes passivement pendant AFK
- Boost massif XP Forgeron
- Indispensable pour build crafting optimisé

---

## 🛡️ ARMURERIE (ARMORY)

### **Statistiques**

```javascript
{
    id: 'armory',
    name: 'Armurerie',
    icon: '🛡️',
    unlockLevel: 15,
    professionRequired: 'armorsmith',
    professionLevel: 10,

    baseCost: {
        gold: 3000,
        ore_steel: 200,
        wood_birch: 150,
        ore_mithril: 100
    },

    costMultiplier: 2.2
}
```

**Bonus** : Identiques à Forge mais pour Armurier et craft armures

---

## 🏪 MARCHÉ (MARKET)

### **Statistiques**

```javascript
{
    id: 'market',
    name: 'Marché',
    icon: '🏪',
    unlockLevel: 15,

    baseProduction: {
        gold: 10  // 10 gold/min niveau 1
    },

    baseCost: {
        gold: 5000,
        wood_cedar: 300,
        ore_steel: 200
    },

    costMultiplier: 2.0,
    productionMultiplier: 1.15  // +15% par niveau (moins que ×2)
}
```

### **Production Gold**

| Niveau | Coût (Gold) | Production Gold/min | Production Gold/heure |
| ------ | ----------- | ------------------- | --------------------- |
| 1      | 5,000       | 10                  | 600                   |
| 5      | 20,000      | 17                  | 1,020                 |
| 10     | 100,549     | 31                  | 1,860                 |
| 15     | 506,229     | 56                  | 3,360                 |
| 20     | 2,548,975   | 101                 | 6,060                 |
| 25     | 12,830,949  | 182                 | 10,920                |
| 30     | 64,581,595  | 329                 | 19,740                |

**ROI Market Niveau 10** : 100,549 gold / 31 gold/min = **3,243 minutes** (54 heures)

**Utilité** :

- Income passif
- Essentiel pour financer bâtiments niveau 15+
- Permet d'acheter matériaux au lieu de farmer

---

## 🏛️ ACADÉMIE (ACADEMY)

### **Statistiques**

```javascript
{
    id: 'academy',
    name: 'Académie',
    icon: '🏛️',
    unlockLevel: 20,

    baseProduction: {},

    baseCost: {
        gold: 10000,
        wood_sequoia: 200,
        ore_mithril: 150,
        gem_sapphire: 10
    },

    costMultiplier: 2.8,  // Très cher

    xpBonus: {
        player: 0.05,      // +5% XP joueur par niveau
        professions: 0.05  // +5% XP métiers par niveau
    }
}
```

### **Bonus XP Global**

| Niveau | Coût (Gold)   | Bonus XP Joueur | Bonus XP Métiers | XP Total Niveau 50 |
| ------ | ------------- | --------------- | ---------------- | ------------------ |
| 1      | 10,000        | +5%             | +5%              | +5%                |
| 5      | 128,000       | +25%            | +25%             | +25%               |
| 10     | 2,560,000     | +50%            | +50%             | +50%               |
| 15     | 51,200,000    | +75%            | +75%             | +75%               |
| 20     | 1,024,000,000 | +100%           | +100%            | +100% (×2 XP)      |

**Impact Academy Niveau 10** :

- Niveau 50 joueur : 14h 30min → **9h 40min** (-33%)
- Forgeron niveau 50 : 60h → **40h** (-33%)

**Utilité** :

- Réduit DRASTIQUEMENT le grind
- Essentiel pour alts (2e perso)
- Permet prestige plus rapide

---

## ⛪ TEMPLE (TEMPLE)

### **Statistiques**

```javascript
{
    id: 'temple',
    name: 'Temple',
    icon: '⛪',
    unlockLevel: 25,

    baseCost: {
        gold: 20000,
        wood_bloodwood: 150,
        ore_adamantite: 100,
        gem_diamond: 15
    },

    costMultiplier: 3.0,

    buffs: {
        duration: 3600000,  // 1 heure
        cooldown: 7200000   // 2 heures cooldown
    }
}
```

### **Buffs Disponibles (1 actif à la fois)**

#### **Bénédiction de Force**

```javascript
{
    name: 'Bénédiction de Force',
    duration: 60,  // 60 minutes
    effects: {
        damageBonus: 0.30,     // +30% dégâts
        forceBonus: 50         // +50 Force
    }
}
```

#### **Bénédiction de Sagesse**

```javascript
{
    name: 'Bénédiction de Sagesse',
    duration: 60,
    effects: {
        xpBonus: 0.50,         // +50% XP
        professionXpBonus: 0.50
    }
}
```

#### **Bénédiction de Fortune**

```javascript
{
    name: 'Bénédiction de Fortune',
    duration: 60,
    effects: {
        dropRateBonus: 0.40,   // +40% drop rate
        goldBonus: 0.50,       // +50% gold
        qualityChance: 0.20    // +20% qualité drops
    }
}
```

#### **Bénédiction de Protection**

```javascript
{
    name: 'Bénédiction de Protection',
    duration: 60,
    effects: {
        hpBonus: 0.50,         // +50% HP max
        defenseBonus: 0.40,    // +40% défense
        damageReduction: 0.15  // -15% dégâts reçus
    }
}
```

### **Amélioration Temple**

| Niveau | Coût (Gold)    | Durée Buff | Cooldown | Buffs Simultanés |
| ------ | -------------- | ---------- | -------- | ---------------- |
| 1      | 20,000         | 60 min     | 120 min  | 1                |
| 5      | 486,000        | 75 min     | 100 min  | 1                |
| 10     | 23,328,000     | 90 min     | 80 min   | 2                |
| 15     | 1,119,744,000  | 105 min    | 60 min   | 2                |
| 20     | 53,747,712,000 | 120 min    | 40 min   | 3                |

**Utilité** :

- Buffs temporaires pour farm boss
- Stack multiple buffs niveau 10+
- Essentiel pour contenu difficile

---

## 💎 JOAILLERIE (JEWELER'S WORKSHOP)

### **Statistiques**

```javascript
{
    id: 'jewelers_workshop',
    name: 'Joaillerie',
    icon: '💎',
    unlockLevel: 20,
    professionRequired: 'jeweler',
    professionLevel: 10,

    baseCost: {
        gold: 15000,
        ore_gold: 200,
        ore_platinum: 100,
        gem_emerald: 20
    },

    costMultiplier: 2.5
}
```

**Bonus** : Identiques à Forge mais pour Joaillier

### **Spécial : Extraction de Gemmes**

```javascript
// Niveau 10+ : Peut extraire gemmes d'équipement
gemExtraction: {
    successChance: 0.70,   // 70% chance récupérer gemme
    destroyItem: true      // Détruit l'item
}
```

---

## 🔄 SYNERGIES COMPLÈTES

### **Synergie 1 : Production Optimale**

```
Scierie Niveau 20 + Bûcheron Niveau 30
    ↓
+50% XP Bûcheron (Scierie) + +150% XP base (Bûcheron 30)
    ↓
Bûcheron monte niveau 50 en 1h au lieu de 4h
    ↓
Tous bois accessibles rapidement
    ↓
Craft arcs légendaires dès niveau 25
```

### **Synergie 2 : Craft Industriel**

```
Forge Niveau 20 + Academy Niveau 10 + Forgeron Niveau 30
    ↓
15 crafts auto/10 min + 50% XP + 50% temps craft réduit
    ↓
Forge craft 90 armes/heure en AFK
    ↓
Forgeron niveau 50 atteint en 20h au lieu de 60h
    ↓
Peut crafter équipement divin
```

### **Synergie 3 : Farm Gold**

```
Market Niveau 25 + Temple (Bénédiction Fortune) + Talents Gold
    ↓
182 gold/min (Market) × 1.5 (Fortune) × 1.3 (Talents) = 355 gold/min
    ↓
21,300 gold/heure passif
    ↓
Peut financer bâtiments niveau 30+
```

### **Synergie 4 : Gemmes Farming**

```
Mine Niveau 30 + Mineur Niveau 50 + Temple (Fortune)
    ↓
+3% gemmes (Mine) + +5% (Mineur 50) + +40% (Fortune) = 48% boost gemmes
    ↓
Diamant : 0.2% → 3.2% base + 48% = 4.7% drop
    ↓
Gemmes mythiques farmables
```

---

## 📊 ORDRE DE PRIORITÉ

### **Early Game (Niveau 1-15)**

1. **Scierie Niveau 5** (production bois pour craft)
2. **Mine Niveau 5** (production minerai pour craft)
3. **Warehouse Niveau 3** (éviter cap stockage)
4. **Scierie/Mine Niveau 10** (déblocage bois/minerais rares)

**Coût total** : ~150,000 gold + ressources

---

### **Mid Game (Niveau 15-30)**

1. **Forge Niveau 10** (craft auto armes)
2. **Market Niveau 10** (income passif)
3. **Academy Niveau 5** (boost XP)
4. **Armory Niveau 5** (craft auto armures)
5. **Treasury Niveau 5** (stockage drops)

**Coût total** : ~5,000,000 gold + ressources rares

---

### **Late Game (Niveau 30-50)**

1. **Academy Niveau 15** (+75% XP)
2. **Temple Niveau 10** (multi-buffs)
3. **Mine/Scierie Niveau 20** (production gemmes/bois légendaires)
4. **Forge/Armory Niveau 20** (craft légendaire auto)
5. **Market Niveau 20** (100 gold/min)

**Coût total** : ~100,000,000 gold + ressources légendaires

---

### **End Game (Niveau 50+)**

1. **Academy Niveau 20** (×2 XP pour prestige)
2. **Temple Niveau 20** (buffs permanents)
3. **Tous bâtiments Niveau 25+** (production maximale)

**Coût total** : ~1,000,000,000+ gold

---

## 🎯 IMPACT SUR GAMEPLAY

### **Sans Bâtiments**

- Farming manuel : 100%
- Niveau 50 : 50 heures
- Craft limité par temps
- Gemmes impossibles

### **Avec Bâtiments Optimaux (Niveau 20)**

- Farming manuel : 30%
- Niveau 50 : **25 heures** (-50%)
- Craft 24/7 AFK
- Gemmes accessibles (3-5% drop)

### **Avec Bâtiments Maximaux (Niveau 30+)**

- Farming manuel : 10%
- Niveau 50 : **15 heures** (-70%)
- Production massive AFK
- Équipement divin craftable

---

## 🏆 OBJECTIF FINAL

**Compte Complètement Optimisé (Niveau 50)**

```
BÂTIMENTS:
- Scierie Niveau 30 : 5M bois/heure
- Mine Niveau 30 : 5M minerais/heure + gemmes
- Forge Niveau 25 : 180 crafts armes/heure
- Armory Niveau 25 : 180 crafts armures/heure
- Jeweler Niveau 20 : 60 crafts bijoux/heure
- Market Niveau 25 : 10,920 gold/heure
- Academy Niveau 20 : ×2 XP globale
- Temple Niveau 15 : 3 buffs simultanés
- Warehouse Niveau 20 : 11,000 capacité
- Treasury Niveau 15 : 4,250 capacité

COÛT TOTAL ESTIMÉ:
- Gold : ~5 milliards
- Bois légendaires : ~500,000
- Minerais légendaires : ~500,000
- Gemmes diverses : ~5,000
- Temps : 200-300 heures

GAIN:
- Production passive : 99% auto
- Prestige en 10 heures au lieu de 50
- Équipement divin complet en 1 semaine
```

---

**Navigation** :

- [← Craft](BALANCE-CRAFTING.md)
- [← Vue d'ensemble](BALANCE-OVERVIEW.md)
- [← Stats Joueur](BALANCE-PLAYER.md)
- [← Métiers](BALANCE-PROFESSIONS.md)
