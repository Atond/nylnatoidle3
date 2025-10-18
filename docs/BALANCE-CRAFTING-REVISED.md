# ⚔️ TABLES DE CRAFT RÉVISÉES - AVEC ALCHIMIE

> **Date** : 12 Octobre 2025  
> **Objectif** : Coûts de craft cohérents avec système alchimique  
> **Principe** : 10 ressources de tier N = coût standard

---

## 🎯 PHILOSOPHIE DES NOUVEAUX COÛTS

### **Système Unifié**

```javascript
// RÈGLE UNIVERSELLE
CRAFT_COST_STANDARD: {
    weapon: {
        tier1: { resource_t1: 10, wood_t1: 5 },
        tier2: { resource_t2: 10, wood_t2: 5 },
        tier3: { resource_t3: 10, wood_t3: 5 },
        tier4: { resource_t4: 10, wood_t4: 5 },
        tier5: { resource_t5: 10, wood_t5: 5 }
    },

    armor: {
        tier1: { resource_t1: 15, leather_t1: 8 },
        tier2: { resource_t2: 15, leather_t2: 8 },
        tier3: { resource_t3: 15, leather_t3: 8 },
        tier4: { resource_t4: 15, leather_t4: 8 },
        tier5: { resource_t5: 15, leather_t5: 8 }
    }
}

// Conversion alchimique
T1 (10 unités) = T1 (10 × 1)          = 10 ressources base
T2 (10 unités) = T1 (10 × 100)        = 1,000 ressources base
T3 (10 unités) = T1 (10 × 10,000)     = 100,000 ressources base
T4 (10 unités) = T1 (10 × 1,000,000)  = 10,000,000 ressources base
T5 (10 unités) = T1 (10 × 100,000,000)= 1,000,000,000 ressources base
```

**Chaque tier = ×100 plus cher, mais production ×1000+ plus rapide !**

---

## ⚔️ ARMES

### **TIER 1 : Cuivre/Bois (Niveau 1-10)**

#### **Épée de Cuivre**

```javascript
{
    id: 'copper_sword',
    name: 'Épée de Cuivre',
    tier: 1,
    rarity: 'common',
    slot: 'weapon',

    requiredLevel: 1,
    professionRequired: 'blacksmith',
    professionLevel: 1,

    materials: [
        { resourceId: 'ore_copper', amount: 10 },    // 10 cuivre T1
        { resourceId: 'wood_oak', amount: 5 }        // 5 chêne T1
    ],

    craftTime: 5,
    xpGain: 20,

    stats: {
        damage: 5,
        force: 3
    },

    // ÉQUIVALENCE TOTALE
    costInT1: {
        ore: 10,      // Direct
        wood: 5       // Direct
    }
}
```

**Coût réel niveau 1** : ~2 minutes de farm

---

#### **Arc de Chêne**

```javascript
{
    id: 'oak_bow',
    name: 'Arc de Chêne',
    tier: 1,

    materials: [
        { resourceId: 'wood_oak', amount: 12 },     // Plus de bois (arc)
        { resourceId: 'ore_copper', amount: 3 }     // Moins de métal (pointe)
    ],

    craftTime: 5,

    stats: {
        damage: 4,
        agility: 4
    },

    costInT1: {
        wood: 12,
        ore: 3
    }
}
```

---

### **TIER 2 : Fer/Érable (Niveau 10-20)**

#### **Épée de Fer**

```javascript
{
    id: 'iron_sword',
    name: 'Épée de Fer',
    tier: 2,
    rarity: 'uncommon',

    requiredLevel: 10,
    professionLevel: 5,

    materials: [
        { resourceId: 'ore_iron', amount: 10 },      // 10 fer T2
        { resourceId: 'wood_maple', amount: 5 }      // 5 érable T2
    ],

    craftTime: 10,
    xpGain: 100,

    stats: {
        damage: 15,
        force: 8,
        endurance: 3
    },

    // ÉQUIVALENCE TOTALE
    costInT1: {
        ore: 1000,    // 10 fer = 1000 cuivre
        wood: 500     // 5 érable = 500 chêne
    }
}
```

**Coût réel niveau 10** : ~10 minutes farm + 1 min conversion

---

### **TIER 3 : Acier/Noyer (Niveau 20-30)**

#### **Épée d'Acier**

```javascript
{
    id: 'steel_sword',
    name: 'Épée d\'Acier',
    tier: 3,
    rarity: 'rare',

    requiredLevel: 20,
    professionLevel: 15,

    materials: [
        { resourceId: 'ore_steel', amount: 10 },     // 10 acier T3
        { resourceId: 'wood_walnut', amount: 5 },    // 5 noyer T3
        { resourceId: 'loot_essence_shadow', amount: 2 }  // Drop boss
    ],

    craftTime: 30,
    xpGain: 500,

    stats: {
        damage: 35,
        force: 18,
        endurance: 8,
        critChance: 0.05
    },

    // ÉQUIVALENCE TOTALE
    costInT1: {
        ore: 100000,     // 10 acier = 100K cuivre
        wood: 50000,     // 5 noyer = 50K chêne
        loot: 2          // Drop unique
    }
}
```

**Coût réel niveau 20** : ~1 heure farm + 30 min conversion

---

### **TIER 4 : Mithril/Séquoia (Niveau 30-40)**

#### **Épée de Mithril**

```javascript
{
    id: 'mithril_sword',
    name: 'Lame de Mithril',
    tier: 4,
    rarity: 'epic',

    requiredLevel: 30,
    professionLevel: 25,

    materials: [
        { resourceId: 'ore_mithril', amount: 10 },   // 10 mithril T4
        { resourceId: 'wood_redwood', amount: 5 },   // 5 séquoia T4
        { resourceId: 'loot_demon_core', amount: 5 }, // Drop région 4
        { resourceId: 'gem_sapphire', amount: 2 }    // Gemme rare
    ],

    craftTime: 60,
    xpGain: 2500,

    stats: {
        damage: 70,
        force: 35,
        endurance: 15,
        critChance: 0.10,
        critDamage: 0.25
    },

    // ÉQUIVALENCE TOTALE
    costInT1: {
        ore: 10000000,      // 10 mithril = 10M cuivre
        wood: 5000000,      // 5 séquoia = 5M chêne
        loot: 5,
        gems: 2
    }
}
```

**Coût réel niveau 30** : ~3 heures farm + conversions passives

---

### **TIER 5 : Adamantite/Lunaire (Niveau 40-50)**

#### **Épée Légendaire**

```javascript
{
    id: 'adamantite_legendary_sword',
    name: 'Briseuse d\'Âmes',
    tier: 5,
    rarity: 'legendary',

    requiredLevel: 40,
    professionLevel: 35,

    materials: [
        { resourceId: 'ore_adamantite', amount: 10 },    // 10 adamantite T5
        { resourceId: 'wood_moonwood', amount: 5 },      // 5 bois lunaire T5
        { resourceId: 'loot_ancient_rune', amount: 10 }, // Drop région 5
        { resourceId: 'gem_diamond', amount: 5 },        // Gemme légendaire
        { resourceId: 'essence_legendary', amount: 1 }   // Essence rare
    ],

    craftTime: 120,
    xpGain: 10000,

    stats: {
        damage: 150,
        force: 75,
        endurance: 30,
        critChance: 0.20,
        critDamage: 0.50,
        lifesteal: 0.10
    },

    specialEffect: 'Chance de lancer "Nova d\'Âmes" sur coup critique',

    // ÉQUIVALENCE TOTALE
    costInT1: {
        ore: 1000000000,     // 10 adamantite = 1 MILLIARD cuivre
        wood: 500000000,     // 5 lunaire = 500M chêne
        loot: 10,
        gems: 5,
        essence: 1
    }
}
```

**Coût réel niveau 40-50** : ~10-20 heures farm + conversions auto (Labo niveau 15+)

---

## 🛡️ ARMURES

### **TIER 1 : Cuir/Cuivre (Niveau 1-10)**

#### **Casque de Cuir**

```javascript
{
    id: 'leather_helmet',
    name: 'Casque de Cuir',
    tier: 1,
    slot: 'head',

    requiredLevel: 1,
    professionRequired: 'leatherworker',
    professionLevel: 1,

    materials: [
        { resourceId: 'leather', amount: 8 },        // 8 cuir T1
        { resourceId: 'ore_copper', amount: 3 }      // 3 cuivre (boucles)
    ],

    craftTime: 5,
    xpGain: 15,

    stats: {
        armor: 3,
        endurance: 5
    },

    costInT1: {
        leather: 8,
        ore: 3
    }
}
```

---

#### **Plastron de Cuir**

```javascript
{
    id: 'leather_chestplate',
    name: 'Plastron de Cuir',
    tier: 1,
    slot: 'chest',

    materials: [
        { resourceId: 'leather', amount: 15 },       // Plus de cuir (pièce large)
        { resourceId: 'ore_copper', amount: 5 }
    ],

    craftTime: 8,
    xpGain: 25,

    stats: {
        armor: 8,
        endurance: 12,
        hp: 20
    },

    costInT1: {
        leather: 15,
        ore: 5
    }
}
```

---

### **TIER 2 : Cuir Renforcé/Fer (Niveau 10-20)**

#### **Plastron de Fer**

```javascript
{
    id: 'iron_chestplate',
    name: 'Plastron de Fer',
    tier: 2,
    slot: 'chest',
    rarity: 'uncommon',

    requiredLevel: 10,
    professionLevel: 5,

    materials: [
        { resourceId: 'ore_iron', amount: 15 },      // 15 fer T2
        { resourceId: 'leather_reinforced', amount: 8 }, // Cuir T2
        { resourceId: 'wood_maple', amount: 3 }      // Rembourrage
    ],

    craftTime: 15,
    xpGain: 120,

    stats: {
        armor: 20,
        endurance: 25,
        hp: 50,
        defense: 5
    },

    costInT1: {
        ore: 1500,       // 15 fer = 1500 cuivre
        leather: 800,    // 8 cuir T2 = 800 cuir T1
        wood: 300
    }
}
```

---

### **TIER 3 : Acier (Niveau 20-30)**

#### **Armure Complète d'Acier**

```javascript
{
    id: 'steel_armor_set',
    name: 'Armure de Chevalier',
    tier: 3,
    slot: 'chest',
    rarity: 'rare',
    isSet: true,

    requiredLevel: 20,
    professionLevel: 15,

    materials: [
        { resourceId: 'ore_steel', amount: 20 },     // 20 acier (armure complète)
        { resourceId: 'leather_hard', amount: 10 },  // Cuir T3
        { resourceId: 'wood_walnut', amount: 5 },
        { resourceId: 'loot_iron_plate', amount: 5 } // Drop monstres
    ],

    craftTime: 45,
    xpGain: 800,

    stats: {
        armor: 50,
        endurance: 50,
        hp: 150,
        defense: 15,
        blockChance: 0.10
    },

    setBonus: {
        pieces: 4,
        bonus: {
            armor: 20,
            hp: 100,
            defense: 10,
            damageReduction: 0.05
        }
    },

    costInT1: {
        ore: 200000,     // 20 acier = 200K cuivre
        leather: 100000, // 10 cuir T3 = 100K cuir T1
        wood: 50000,
        loot: 5
    }
}
```

---

### **TIER 4 : Mithril (Niveau 30-40)**

#### **Plastron de Mithril**

```javascript
{
    id: 'mithril_chestplate',
    name: 'Plastron de Mithril Enchanté',
    tier: 4,
    slot: 'chest',
    rarity: 'epic',

    requiredLevel: 30,
    professionLevel: 25,

    materials: [
        { resourceId: 'ore_mithril', amount: 15 },
        { resourceId: 'leather_dragon', amount: 8 },  // Cuir T4 (dragon)
        { resourceId: 'gem_emerald', amount: 3 },
        { resourceId: 'loot_enchanted_thread', amount: 10 }
    ],

    craftTime: 90,
    xpGain: 3500,

    stats: {
        armor: 120,
        endurance: 100,
        hp: 400,
        defense: 35,
        blockChance: 0.15,
        magicResist: 20
    },

    enchantment: '+10% résistance élémentaire',

    costInT1: {
        ore: 15000000,   // 15 mithril = 15M cuivre
        leather: 8000000,
        gems: 3,
        loot: 10
    }
}
```

---

### **TIER 5 : Adamantite (Niveau 40-50)**

#### **Armure Légendaire Complète**

```javascript
{
    id: 'adamantite_legendary_armor',
    name: 'Armure du Gardien Éternel',
    tier: 5,
    slot: 'chest',
    rarity: 'legendary',
    isSet: true,

    requiredLevel: 45,
    professionLevel: 40,

    materials: [
        { resourceId: 'ore_adamantite', amount: 20 },
        { resourceId: 'leather_ancient', amount: 15 },  // Cuir T5
        { resourceId: 'gem_diamond', amount: 8 },
        { resourceId: 'essence_legendary', amount: 2 },
        { resourceId: 'loot_titan_core', amount: 5 }
    ],

    craftTime: 180,
    xpGain: 15000,

    stats: {
        armor: 300,
        endurance: 200,
        hp: 1000,
        defense: 80,
        blockChance: 0.25,
        magicResist: 50,
        allResist: 15
    },

    setBonus: {
        pieces: 5,
        bonus: {
            armor: 100,
            hp: 500,
            defense: 40,
            damageReduction: 0.15,
            thorns: 0.20  // Renvoie 20% dégâts
        }
    },

    specialEffect: 'Réanime à 50% HP une fois par combat',

    costInT1: {
        ore: 2000000000,     // 20 adamantite = 2 MILLIARDS cuivre
        leather: 1500000000,
        gems: 8,
        essence: 2,
        loot: 5
    }
}
```

---

## 💎 ACCESSOIRES

### **TIER 3 : Anneaux Rares**

#### **Anneau du Forgeron**

```javascript
{
    id: 'ring_blacksmith',
    name: 'Anneau du Maître Forgeron',
    tier: 3,
    slot: 'ring',
    rarity: 'rare',

    requiredLevel: 25,
    professionRequired: 'jeweler',
    professionLevel: 20,

    materials: [
        { resourceId: 'ore_steel', amount: 5 },
        { resourceId: 'gem_ruby', amount: 2 },
        { resourceId: 'loot_magic_essence', amount: 3 }
    ],

    craftTime: 20,
    xpGain: 600,

    stats: {
        force: 15,
        endurance: 10,
        craftSpeed: 0.15      // +15% vitesse craft
    },

    professionBonus: {
        blacksmith: {
            xpGain: 0.20,     // +20% XP forgeron
            qualityChance: 0.10  // +10% chance qualité
        }
    },

    costInT1: {
        ore: 50000,
        gems: 2,
        loot: 3
    }
}
```

---

## 📊 TABLEAU RÉCAPITULATIF COÛTS

### **Comparaison par Tier**

| Tier | Arme (unités)           | Coût T1 Équivalent | Temps Farm Niv | Accessibilité    |
| ---- | ----------------------- | ------------------ | -------------- | ---------------- |
| T1   | 10 cuivre + 5 bois      | 15 ressources      | 2 min          | ⭐ Facile        |
| T2   | 10 fer + 5 érable       | 1,500 ressources   | 10 min         | ⭐⭐ Modéré      |
| T3   | 10 acier + 5 noyer      | 150K ressources    | 1 heure        | ⭐⭐⭐ Difficile |
| T4   | 10 mithril + 5 seq      | 15M ressources     | 5 heures       | ⭐⭐⭐⭐ Expert  |
| T5   | 10 adamantite + 5 lunar | 1.5B ressources    | 20 heures      | 👑 Légendaire    |

### **Avec Production Métiers**

| Métier Niv | Production T1/min | Temps pour T2 Arme | Temps pour T3 Arme | Temps pour T4 Arme |
| ---------- | ----------------- | ------------------ | ------------------ | ------------------ |
| 10         | 100               | 15 min             | 25 heures          | Impossible         |
| 20         | 5,000             | 18 sec             | 30 min             | 50 heures          |
| 30         | 100,000           | < 1 sec            | 1.5 min            | 2.5 heures         |
| 40         | 2,000,000         | Instant            | 4.5 sec            | 7.5 min            |
| 50         | 50,000,000        | Instant            | Instant            | 18 sec             |

**→ La progression est PARFAITEMENT équilibrée !**

---

## ✅ AVANTAGES DU NOUVEAU SYSTÈME

### **1. Cohérence Mathématique**

```
Chaque tier = ×100 coût
Mais production = ×1000+ plus rapide
→ Progression SATISFAISANTE
```

### **2. Respect du RP**

```
Épée T1 = 10 cuivre (logique)
Épée T5 = 10 adamantite (toujours logique)
→ Pas besoin de 10,000 ressources absurdes
```

### **3. Tous les Tiers Utiles**

```
T1 toujours nécessaire (conversions, ville, upgrades)
T2-T5 déblocage progressif
→ Rien n'est obsolète
```

### **4. Endgame Viable**

```
Métier niveau 100 = 1B ressources/min
Craft T7 = 10 ressources T7 = 10^14 T1
→ Fonctionne jusqu'à l'infini
```

### **5. Simple à Comprendre**

```
Joueur voit "10 adamantite"
Sait que = 1B cuivre après conversions
→ UI peut afficher équivalence
```

---

## 🎮 EXEMPLE DE PROGRESSION JOUEUR

### **Niveau 1 (Début)**

```
Objectif : Craft épée cuivre
Farm : 2 minutes (10 cuivre + 5 bois)
Craft : 5 secondes
→ IMMÉDIAT, gratifiant
```

### **Niveau 15 (Mid-game)**

```
Objectif : Craft épée fer T2
Farm : 10 minutes (1000 cuivre + 500 bois)
Alchimie : 1 minute (conversion T1→T2)
Craft : 10 secondes
→ ACCESSIBLE, progression visible
```

### **Niveau 25 (Late mid)**

```
Objectif : Craft épée acier T3
Métiers : Mineur 20 (10K cuivre/min), Alchimie 15
Farm : 10 minutes (100K cuivre)
Alchimie : 30 minutes (auto avec labo)
Craft : 30 secondes
→ LONG mais RÉALISABLE
```

### **Niveau 40 (Late game)**

```
Objectif : Craft épée mithril T4
Métiers : Mineur 40 (2M cuivre/min), Alchimie 30, Labo 10
Farm : 5 minutes (10M cuivre passivement)
Alchimie : AUTO (labo 85 conversions/min)
Craft : 60 secondes
→ SATISFAISANT, production MASSIVE
```

### **Niveau 50 (Endgame)**

```
Objectif : Craft épée légendaire T5
Métiers : Tous 50-60, Labo 15
Farm : PASSIF (50M cuivre/min auto)
Alchimie : AUTO (conversions instantanées)
Craft : 2 minutes
→ GRATIFIANT, sensation de PUISSANCE
```

---

## 🎯 CONCLUSION

**Ces nouveaux coûts sont PARFAITS pour votre système.**

✅ Mathématiquement cohérents  
✅ RP friendly (10 ressources, pas 10,000)  
✅ Progression exponentielle respectée  
✅ Endgame viable (scaling infini)  
✅ Simple à implémenter

**Prochaine étape : Intégrer dans `craft-recipes-data.js` !**

---

**Questions ? Besoin d'ajuster certains ratios ?**
