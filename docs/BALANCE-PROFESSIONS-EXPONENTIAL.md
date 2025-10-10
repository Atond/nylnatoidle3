# ⚒️ ÉQUILIBRAGE - MÉTIERS EXPONENTIELS

> **Fichier** : Bûcheron, Mineur, Forgeron, Armurier, Joaillier  
> **Lien** : [← Vision Endgame](BALANCE-ENDGAME-VISION.md) | [← Stats Joueur](BALANCE-PLAYER.md) | [→ Craft](BALANCE-CRAFTING.md)

---

## 🎯 PHILOSOPHIE MÉTIERS

### **Différence avec Niveau Personnage**

| Aspect          | Niveau Personnage      | Métiers                          |
| --------------- | ---------------------- | -------------------------------- |
| **Cap**         | ✅ Niveau 50 (fixe)    | ❌ Infini (pas de cap)           |
| **Progression** | Linéaire (base × n²)   | **EXPONENTIELLE** (base × 1.5^n) |
| **Chiffres**    | Modestes (625K XP max) | **MASSIFS** (milliards+)         |
| **Objectif**    | Finir histoire         | Production infinie               |
| **Temps**       | 50-75 heures           | Mois/Années (jeu infini)         |

### **Formule XP Métiers**

```javascript
// EXPONENTIELLE (+50% par niveau)
xpRequired(level) {
    return 100 × (1.5 ** level)
}

// Exemples concrets
Level 1:    150 XP
Level 10:   5 763 XP
Level 20:   332 527 XP (332K)
Level 30:   19 175 135 XP (19M)
Level 40:   1 106 335 462 XP (1.1 MILLIARDS)
Level 50:   63 762 197 304 XP (63.7 MILLIARDS)
Level 100:  4.38e27 XP (ASTRONOMIQUE)
```

### **Formatage Grands Nombres**

```javascript
// Affichage UI
1000      → "1.00K"
1000000   → "1.00M"
1000000000 → "1.00B"
1e12      → "1.00T" (trillion)
1e15      → "1.00Qa" (quadrillion)
1e18      → "1.00Qi" (quintillion)
// ... etc à l'infini
```

---

## 🌲 BÛCHERON (WOODCUTTER)

### **Vue d'ensemble**

- **Déblocage** : Niveau joueur 1
- **Pas de cap niveau** : Progression infinie
- **Ressources** : Tiers T1 → T7 → T∞ (nouveaux tiers ajoutés régulièrement)
- **Utilité** : Craft armes, bâtiments, upgrades

### **Déblocages de Bois (Tiers)**

| Niveau  | Bois Débloqué     | Tier | Rareté    | Valeur    | Utilisation         |
| ------- | ----------------- | ---- | --------- | --------- | ------------------- |
| **1**   | Chêne (Oak)       | T1   | Common    | 1 gold    | Craft T1, Ville T1  |
| **5**   | Érable (Maple)    | T2   | Uncommon  | 10 gold   | Craft T2, Ville T2  |
| **10**  | Noyer (Walnut)    | T3   | Rare      | 100 gold  | Craft T3, Ville T3  |
| **20**  | Séquoia (Redwood) | T4   | Epic      | 1K gold   | Craft T4, Ville T4  |
| **30**  | Saule lunaire     | T5   | Legendary | 10K gold  | Craft T5, Ville T5  |
| **50**  | Bois de Cristal   | T6   | Mythic    | 100K gold | Craft T6, Donjons   |
| **100** | Bois Éternel      | T7   | Divine    | 1M gold   | Craft T7, Raids     |
| **200** | Bois Transcendant | T8   | Cosmic    | 10M gold  | Craft T8 (futur)    |
| **∞**   | Nouveaux tiers... | T∞   | ...       | ∞         | Progression infinie |

### **Quantité Récoltée par Niveau**

```javascript
// Bonus multiplicateur (+10% par niveau)
amountPerClick(level) {
    return 1 + (level × 0.1)
}

// Exemples
Niveau 1:   1.1 bois/clic
Niveau 10:  2.0 bois/clic (×2)
Niveau 20:  3.0 bois/clic (×3)
Niveau 50:  6.0 bois/clic (×6)
Niveau 100: 11.0 bois/clic (×11)
Niveau 500: 51.0 bois/clic (×51)
```

### **Bonus de Niveau (Paliers tous les 10 niveaux)**

```javascript
// Palier N (niveaux 10, 20, 30, etc.)
BONUS_PALIER: {
    dropRate: +(N × 0.05),        // +5% par palier
    xpGain: +(N × 0.20),          // +20% XP par palier
    autoGather: 10 × (2 ** (N/10)), // Production auto exponentielle
    qualityChance: +(N × 0.05),   // +5% qualité supérieure
    doubleChance: +(N × 0.02)     // +2% double drop
}
```

**Exemples** :

#### **Niveau 10** ⭐

- +50% drop rate
- +200% XP/clic (×3 total)
- 20 bois/min auto
- +50% chance qualité
- +20% chance ×2

#### **Niveau 50** ⭐⭐⭐⭐⭐

- +250% drop rate (×3.5)
- +1000% XP/clic (×11)
- 320 bois/min auto
- +250% chance qualité
- +100% chance ×2 (garanti)

#### **Niveau 100** 👑

- +500% drop rate (×6)
- +2000% XP/clic (×21)
- 10K bois/min auto
- +500% chance qualité
- +200% chance ×2 (+ triple/quadruple)

---

## ⛏️ MINEUR (MINER)

### **Vue d'ensemble**

- **Déblocage** : Niveau joueur 1
- **Pas de cap niveau** : Progression infinie
- **Ressources** : Minerais T1 → T∞
- **Utilité** : Craft armes/armures, bâtiments

### **Déblocages de Minerais (Tiers)**

| Niveau  | Minerai Débloqué     | Tier | Rareté    | Valeur    | Utilisation         |
| ------- | -------------------- | ---- | --------- | --------- | ------------------- |
| **1**   | Cuivre (Copper)      | T1   | Common    | 2 gold    | Craft T1, Ville T1  |
| **5**   | Fer (Iron)           | T2   | Uncommon  | 20 gold   | Craft T2, Ville T2  |
| **10**  | Acier (Steel)        | T3   | Rare      | 200 gold  | Craft T3, Ville T3  |
| **20**  | Mithril              | T4   | Epic      | 2K gold   | Craft T4, Ville T4  |
| **30**  | Adamantium           | T5   | Legendary | 20K gold  | Craft T5, Ville T5  |
| **50**  | Orichalque           | T6   | Mythic    | 200K gold | Craft T6, Donjons   |
| **100** | Éternium             | T7   | Divine    | 2M gold   | Craft T7, Raids     |
| **200** | Célestium            | T8   | Cosmic    | 20M gold  | Craft T8 (futur)    |
| **∞**   | Nouveaux minerais... | T∞   | ...       | ∞         | Progression infinie |

### **Formule XP et Bonus**

Identique à Bûcheron (100 × 1.5^level), même système de paliers.

---

## 🔨 FORGERON (BLACKSMITH)

### **Vue d'ensemble**

- **Déblocage** : Niveau joueur 3
- **Dépendance** : Nécessite Mineur pour minerais
- **Craft** : Armes (épées, haches, masses)
- **XP** : Gagné en craftant (10 XP par craft, scaling avec rareté)

### **Déblocages d'Armes par Niveau**

| Niveau  | Arme Type          | Tier | Dégâts | Coût Minerai   | Coût Gold |
| ------- | ------------------ | ---- | ------ | -------------- | --------- |
| **1**   | Épée en Cuivre     | T1   | 10     | 10 Cuivre      | 50        |
| **5**   | Épée en Fer        | T2   | 30     | 20 Fer         | 500       |
| **10**  | Épée en Acier      | T3   | 80     | 30 Acier       | 5K        |
| **20**  | Épée en Mithril    | T4   | 200    | 50 Mithril     | 50K       |
| **30**  | Épée en Adamantium | T5   | 500    | 100 Adamantium | 500K      |
| **50**  | Épée en Orichalque | T6   | 1500   | 200 Orichalque | 5M        |
| **100** | Épée en Éternium   | T7   | 5000   | 500 Éternium   | 50M       |
| **∞**   | Armes scaling...   | T∞   | ∞      | ∞              | ∞         |

### **XP Craft**

```javascript
// XP gagné en craftant (scaling avec rareté)
xpPerCraft(tier) {
    return 10 × (tier ** 2)
}

// Exemples
T1 (Common):    10 XP/craft
T2 (Uncommon):  40 XP/craft
T3 (Rare):      90 XP/craft
T4 (Epic):      160 XP/craft
T5 (Legendary): 250 XP/craft
T6 (Mythic):    360 XP/craft
T7 (Divine):    490 XP/craft
```

---

## 🛡️ ARMURIER (ARMORSMITH)

### **Vue d'ensemble**

- **Déblocage** : Niveau joueur 5
- **Dépendance** : Nécessite Mineur pour minerais
- **Craft** : Armures (casque, plastron, jambes, bottes)
- **Bonus** : +Défense, +HP, +Endurance

### **Déblocages d'Armures par Niveau**

| Niveau  | Armure Type         | Tier | Défense | HP   | Coût Minerai   | Coût Gold |
| ------- | ------------------- | ---- | ------- | ---- | -------------- | --------- |
| **1**   | Plastron Cuivre     | T1   | 5       | 20   | 15 Cuivre      | 100       |
| **5**   | Plastron Fer        | T2   | 15      | 50   | 25 Fer         | 1K        |
| **10**  | Plastron Acier      | T3   | 40      | 150  | 40 Acier       | 10K       |
| **20**  | Plastron Mithril    | T4   | 100     | 400  | 75 Mithril     | 100K      |
| **30**  | Plastron Adamantium | T5   | 250     | 1000 | 150 Adamantium | 1M        |
| **50**  | Plastron Orichalque | T6   | 750     | 3000 | 300 Orichalque | 10M       |
| **100** | Plastron Éternium   | T7   | 2500    | 10K  | 750 Éternium   | 100M      |
| **∞**   | Armures scaling...  | T∞   | ∞       | ∞    | ∞              | ∞         |

### **Formule XP et Bonus**

Identique à Forgeron (XP par craft scaling avec tier).

---

## 💎 JOAILLIER (JEWELER)

### **Vue d'ensemble**

- **Déblocage** : Niveau joueur 10
- **Dépendance** : Nécessite Mineur pour gemmes
- **Craft** : Bijoux (anneaux, amulettes)
- **Bonus** : Stats (+Force, +Agilité, +Intelligence, etc.)

### **Déblocages de Gemmes par Niveau**

| Niveau  | Gemme Type        | Tier | Bonus Stats       | Drop Rate (Mine) | Valeur    |
| ------- | ----------------- | ---- | ----------------- | ---------------- | --------- |
| **1**   | Rubis Brut        | T1   | +2 Force          | 10%              | 10 gold   |
| **5**   | Émeraude Brute    | T2   | +5 Agilité        | 8%               | 100 gold  |
| **10**  | Saphir Brut       | T3   | +10 Intelligence  | 6%               | 1K gold   |
| **20**  | Diamant           | T4   | +20 toutes stats  | 4%               | 10K gold  |
| **30**  | Gemme Lunaire     | T5   | +50 toutes stats  | 2%               | 100K gold |
| **50**  | Gemme Étoilée     | T6   | +150 toutes stats | 1%               | 1M gold   |
| **100** | Gemme Primordiale | T7   | +500 toutes stats | 0.5%             | 10M gold  |
| **∞**   | Gemmes scaling... | T∞   | ∞                 | Scaling          | ∞         |

### **Craft Bijoux**

```javascript
// Exemple : Anneau de Force (Tier 5)
RING_OF_STRENGTH_T5: {
    level: 30,
    materials: {
        gemme_lunaire: 5,      // 5 gemmes lunaires
        adamantium: 20,        // 20 adamantium (pour sertissure)
        gold: 500000          // 500K gold
    },
    bonus: {
        force: +50,
        critChance: +5,
        physicalDamage: +10
    },
    craftTime: 300,  // 5 minutes
    xpGain: 500
}
```

---

## 🏗️ SYNERGIE AVEC VILLE

### **Production Passive Ville**

La **ville boost MASSIVEMENT** la production métiers grâce aux bâtiments :

```javascript
// Formule production bâtiment
production(building, level) {
    const BASE = {
        sawmill: 10,      // 10 bois/min niveau 1
        mine: 10,         // 10 minerai/min niveau 1
        forge: 5,         // 5 armes/jour niveau 1
        smithy: 5         // 5 armures/jour niveau 1
    }

    return BASE[building] × (1.5 ** level)  // EXPONENTIEL
}
```

### **Exemples Production**

#### **Scierie (Sawmill)**

| Niveau  | Bois T1/min | Bois T1/jour | Bois T1/mois |
| ------- | ----------- | ------------ | ------------ |
| **1**   | 10          | 14K          | 432K         |
| **10**  | 575         | 828K         | 24.8M        |
| **20**  | 43K         | 62M          | 1.86B        |
| **30**  | 3.3M        | 4.75B        | 142B         |
| **50**  | 1.8B        | 2.59T        | 77T          |
| **100** | 4.38e27     | INFINI       | INFINI       |

**Important** : Ville produit **TOUJOURS Tier 1** (bois normal) !  
→ Les tiers supérieurs (T2-T7) viennent de la récolte manuelle/auto du métier.

#### **Mine (Mining)**

Identique à Scierie (10 minerai/min base, scaling ×1.5 par niveau).

---

## 💰 COÛTS UPGRADES VILLE

### **Formule Coût (Multi-Tiers)**

```javascript
// Coût upgrade bâtiment niveau N
upgradeCost(building, level) {
    return {
        t1: 1000 × (2 ** level),           // T1 TOUJOURS nécessaire
        t2: level >= 5 ? 500 × (2 ** (level - 5)) : 0,
        t3: level >= 10 ? 200 × (2 ** (level - 10)) : 0,
        t4: level >= 20 ? 100 × (2 ** (level - 20)) : 0,
        t5: level >= 30 ? 50 × (2 ** (level - 30)) : 0,
        gold: 10000 × (3 ** level)
    }
}
```

### **Exemple : Scierie Niveau 20**

```javascript
{
    bois_t1: 1 048 576 000,  // 1 MILLIARD de bois T1
    bois_t2: 512 000,        // 512K bois T2
    bois_t3: 4 000,          // 4K bois T3
    gold: 3 486 784 401      // 3.5 MILLIARDS de gold
}
```

**Clé** : T1 reste **TOUJOURS** nécessaire, même à niveau 100+ !

---

## 📊 TIMELINE PROGRESSION MÉTIERS

### **Joueur Solo (Sans Ville)**

| Niveau | Temps Cumulé | XP Total | Ressources Récoltées |
| ------ | ------------ | -------- | -------------------- |
| 10     | 2 heures     | 5.7K     | ~1K ressources       |
| 20     | 10 heures    | 332K     | ~10K ressources      |
| 30     | 50 heures    | 19M      | ~100K ressources     |
| 50     | 500 heures   | 63B      | ~1M ressources       |
| 100    | ANNÉES       | 4.38e27  | INFINI               |

### **Avec Ville Maximisée**

| Niveau Ville | Production/min | Temps pour 1B T1 | Métiers boost |
| ------------ | -------------- | ---------------- | ------------- |
| 10           | 575            | 29 heures        | ×5 speed      |
| 20           | 43K            | 23 minutes       | ×50 speed     |
| 30           | 3.3M           | 5 secondes       | ×500 speed    |
| 50           | 1.8B           | INSTANTANÉ       | ×10000 speed  |

**Ville = Game Changer** pour progression métiers !

---

## 🎯 OBJECTIFS MÉTIERS PAR PHASE

### **Phase 1 : Early (Niveaux 1-10)**

- ✅ Débloquer tiers T1-T3
- ✅ Ville niveau 5 (production modeste)
- ✅ Craft équipement Rare
- **Ressources** : Milliers

### **Phase 2 : Mid (Niveaux 10-30)**

- ⚔️ Débloquer tiers T4-T5
- ⚔️ Ville niveau 15 (production MILLIONS/jour)
- ⚔️ Craft équipement Légendaire
- **Ressources** : Millions

### **Phase 3 : Late (Niveaux 30-50)**

- 🔥 Débloquer tier T6
- 🔥 Ville niveau 30 (production MILLIARDS/jour)
- 🔥 Craft équipement Mythique
- **Ressources** : Milliards

### **Phase 4 : Endgame (Niveaux 50-100)**

- 👑 Débloquer tier T7
- 👑 Ville niveau 50+ (production TRILLIONS/jour)
- 👑 Craft équipement Divin
- **Ressources** : Trillions+

### **Phase 5 : Infini (Niveaux 100+)**

- ✨ Nouveaux tiers ajoutés régulièrement
- ✨ Ville niveau infini
- ✨ Craft scaling infini
- **Ressources** : ASTRONOMIQUES

---

## 🎮 FORMULE SATISFACTION JOUEUR

```
Satisfaction = Voir les chiffres EXPLOSER
             + Débloquer nouveaux tiers
             + Ville produit MASSIVEMENT
             + Métiers JAMAIS cap
```

**C'est ça un VRAI idle RPG moderne !** 🚀

---

## 📋 TODO IMPLÉMENTATION

### **Phase 1 : Formules Exponentielles**

- [ ] Remplacer formule XP métiers (×1.5 par niveau)
- [ ] Système tiers infinis (T1 → T∞)
- [ ] Formatter grands nombres (1.5M, 3.2B, etc.)
- [ ] Bonus niveau (+10% quantité par niveau)

### **Phase 2 : Production Ville**

- [ ] Production exponentielle (×1.5 par niveau)
- [ ] Coût multi-tiers (T1+T2+T3+...)
- [ ] Pas de cap niveau bâtiments
- [ ] UI production avec grands chiffres

### **Phase 3 : Balance Testing**

- [ ] Tester progression 1 → 50 (temps)
- [ ] Tester ville synergy
- [ ] Valider coûts craft (pas trop cher/cheap)
- [ ] Ajuster formules si nécessaire

---

**Date** : 9 Octobre 2025  
**Auteur** : Vision utilisateur + AI  
**Statut** : ✅ Prêt pour implémentation
