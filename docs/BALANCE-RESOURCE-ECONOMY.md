# 💰 ÉCONOMIE DES RESSOURCES - ANALYSE & SOLUTIONS

> **Date** : 12 Octobre 2025  
> **Problématique** : Équilibrer progression exponentielle des métiers avec coûts de craft réalistes  
> **Objectif** : Trouver un système cohérent et "role-play"

---

## 🔍 DIAGNOSTIC DU PROBLÈME

### **Incohérence Actuelle**

#### ❌ **Ce qui ne va pas**

```javascript
// MÉTIERS : Progression exponentielle
Niveau 30 bûcheron = 191 MILLIONS XP requis
Niveau 50 bûcheron = 637 MILLIARDS XP requis
→ Production de MILLIONS de bois/min

// MAIS...

// CRAFT : Coûts ridicules en comparaison
Épée de fer = 10 fer + 5 bois
Armure légendaire = 100 fer + 50 bois ???

→ DÉCONNEXION TOTALE
```

#### 🎯 **Le Problème Central**

Vous avez conçu **DEUX JEUX DIFFÉRENTS** :

1. **Jeu Narratif** : Niveau 1-50, histoire, combat (échelle 1-1000)
2. **Jeu Idle** : Métiers infinis, millions de ressources, ville passive (échelle 1-∞)

**Ces deux échelles ne communiquent pas correctement !**

---

## 💡 SOLUTIONS POSSIBLES

### **Option 1 : Système de CONVERSION (Recommandée)**

> **Concept** : Introduire un métier "Alchimiste/Raffineur" qui convertit ressources T1 → T2

#### ✅ **Avantages**

- ✅ **RP friendly** : Pas besoin de 10,000 fer pour une épée
- ✅ **Progression claire** : T1 → T2 → T3 = montée en puissance
- ✅ **Sink de ressources** : Les millions de T1 deviennent utiles
- ✅ **Respect idle games** : Cookie Clicker, NGU Idle font ça

#### 📊 **Comment ça marche**

```javascript
// MÉTIER : ALCHIMISTE (ou Raffineur/Transmuteur)
{
    name: 'Alchimiste',
    unlockLevel: 10,  // Joueur niveau 10
    description: 'Transforme les ressources communes en matériaux raffinés'
}

// CONVERSIONS DE TIER
CONVERSIONS: {
    // BOIS T1 → T2
    {
        input: { wood_oak: 100 },    // 100 chêne T1
        output: { wood_maple: 1 },   // = 1 érable T2
        time: 10,                    // 10 secondes
        level: 1                     // Alchemy niveau 1
    },

    // BOIS T2 → T3
    {
        input: { wood_maple: 100 },  // 100 érable T2
        output: { wood_walnut: 1 },  // = 1 noyer T3
        time: 30,
        level: 10
    },

    // MINERAI T1 → T2
    {
        input: { ore_copper: 100 },  // 100 cuivre T1
        output: { ore_iron: 1 },     // = 1 fer T2
        time: 15,
        level: 1
    },

    // MINERAI T2 → T3
    {
        input: { ore_iron: 100 },    // 100 fer T2
        output: { ore_steel: 1 },    // = 1 acier T3
        time: 45,
        level: 10
    }
}
```

#### 🎯 **Déblocages par Niveau Alchimiste**

| Niveau  | Déblocage                 | Ratio                | Temps      |
| ------- | ------------------------- | -------------------- | ---------- |
| **1**   | T1 → T2 (Bois + Minerai)  | 100:1                | 10-15 sec  |
| **10**  | T2 → T3                   | 100:1                | 30-45 sec  |
| **20**  | T3 → T4                   | 100:1                | 1-2 min    |
| **30**  | T4 → T5                   | 100:1                | 5 min      |
| **50**  | T5 → T6                   | 100:1                | 10 min     |
| **75**  | Conversion de masse (×10) | 1000:10 (même ratio) | 1 min      |
| **100** | Auto-conversion (passive) | Automatique en bg    | Instantané |

#### 🧮 **Exemple Concret**

```
OBJECTIF : Crafter une épée en Acier T3

ANCIEN SYSTÈME (ne marche pas) :
❌ Épée acier = 10,000 fer ???  → PAS RP

NOUVEAU SYSTÈME :
1. Farmer 10,000 cuivre T1 (facile avec métier niveau 20+)
2. Alchimiste : 10,000 cuivre → 100 fer T2
3. Alchimiste : 100 fer T2 → 1 acier T3
4. Craft épée : 10 acier T3 + 5 bois T2
   → TOTAL : 100K cuivre pour crafter 10 épées T3
   → RP ET cohérent avec économie exponentielle !
```

---

### **Option 2 : DOUBLE ÉCONOMIE (Séparation)**

> **Concept** : Séparer ressources narratives et ressources idle

#### 📊 **Principe**

```javascript
// DEUX TYPES DE RESSOURCES
RESSOURCES_TYPE: {
    // Type 1 : Craft/Combat (échelle narrative)
    CRAFT_RESOURCES: {
        wood_oak_refined: 'Bois de chêne raffiné',
        ore_iron_ingot: 'Lingot de fer',
        // → Échelle 1-1000, pour craft équipement
        // → DROP des monstres + craft manuel
    },

    // Type 2 : Ville/Métiers (échelle exponentielle)
    BULK_RESOURCES: {
        wood_oak_log: 'Rondins de chêne',
        ore_iron_chunk: 'Morceaux de fer',
        // → Échelle 1-millions, pour bâtiments
        // → Production passive ville
    }
}

// CONVERSION (dans Forge/Scierie)
{
    input: { wood_oak_log: 100 },     // 100 rondins (bulk)
    output: { wood_oak_refined: 1 },  // 1 bois raffiné (craft)
    building: 'sawmill',
    buildingLevel: 5
}
```

#### ❌ **Inconvénients**

- ❌ Complexe à implémenter (2 systèmes parallèles)
- ❌ Confusing pour le joueur (2 types de bois ?)
- ❌ Moins fluide que conversion simple

**→ NON RECOMMANDÉ**

---

### **Option 3 : SCALING DYNAMIQUE (Adaptatif)**

> **Concept** : Les coûts de craft s'adaptent au niveau du métier

#### 📊 **Formule Dynamique**

```javascript
// Le coût augmente avec niveau métier
craftCost(baseAmount, professionLevel) {
    return baseAmount × (1.5 ** (professionLevel / 10))
}

// Exemple : Épée de fer
Base : 10 fer

Forgeron niveau 1:  10 fer
Forgeron niveau 10: 10 × (1.5^1) = 15 fer
Forgeron niveau 20: 10 × (1.5^2) = 22 fer
Forgeron niveau 30: 10 × (1.5^3) = 34 fer
Forgeron niveau 50: 10 × (1.5^5) = 76 fer
Forgeron niveau 100: 10 × (1.5^10) = 576 fer

→ Échelle des coûts suit échelle de production
```

#### ❌ **Problèmes**

- ❌ Bizarre RP (pourquoi un meilleur forgeron utilise PLUS de ressources ?)
- ❌ Punit la progression
- ❌ Complexe à balancer

**→ NON RECOMMANDÉ**

---

## 🏆 SOLUTION RECOMMANDÉE : Alchimiste + Tiers

### **Architecture Complète**

```
┌──────────────────────────────────────────────────────────┐
│  EARLY GAME (Niv 1-20)                                   │
│  → Métiers niveau 1-10                                   │
│  → Farm ressources T1 (cuivre, chêne)                    │
│  → Craft avec T1 uniquement (épée fer = 10 cuivre)      │
│  → PAS BESOIN d'Alchimiste                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  MID GAME (Niv 20-40)                                    │
│  → Métiers niveau 10-30                                 │
│  → Production T1 devient MASSIVE (1000+/min)            │
│  → DÉBLOCAGE ALCHIMISTE                                 │
│  → Conversion T1 → T2 (100:1)                           │
│  → Craft T2/T3 (épée acier = 10 acier = 1000 cuivre)   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  LATE GAME (Niv 40-50)                                   │
│  → Métiers niveau 30-50+                                │
│  → Production millions T1/min                            │
│  → Alchimiste niveau 20+                                │
│  → Conversion auto T1 → T2 → T3                         │
│  → Craft T4/T5 (Mithril, Légendaire)                    │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  ENDGAME (Niv 50, Métiers 50-1000)                      │
│  → Production MILLIARDS T1/min                          │
│  → Alchimiste niveau 50-100                             │
│  → Conversion masse (1000s à la fois)                   │
│  → Craft T6/T7 (Mythique/Divin)                         │
│  → TOUS les tiers restent utiles !                      │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 TABLES DE COÛTS PROPOSÉES

### **Craft d'Armes (avec Alchimiste)**

#### **Tier 1 : Niveau 1-10**

```javascript
// Épée de cuivre (T1)
{
    materials: [
        { ore_copper: 10 },      // Farm direct
        { wood_oak: 5 }          // Farm direct
    ],
    stats: { damage: 5 }
}

// Coût réel : 10 cuivre T1 (facile niveau 1)
```

#### **Tier 2 : Niveau 10-20**

```javascript
// Épée de fer (T2)
{
    materials: [
        { ore_iron: 10 },        // = 1000 cuivre via Alchimie
        { wood_maple: 5 }        // = 500 chêne via Alchimie
    ],
    stats: { damage: 15 }
}

// Coût réel : 1,000 cuivre + 500 chêne
// → Accessible avec métiers niveau 10+
```

#### **Tier 3 : Niveau 20-30**

```javascript
// Épée d'acier (T3)
{
    materials: [
        { ore_steel: 10 },       // = 100K cuivre via double conversion
        { wood_walnut: 5 }       // = 50K chêne
    ],
    stats: { damage: 30 }
}

// Coût réel : 100,000 cuivre + 50,000 chêne
// → Nécessite métiers niveau 20+
```

#### **Tier 4 : Niveau 30-40**

```javascript
// Épée de Mithril (T4)
{
    materials: [
        { ore_mithril: 10 },     // = 10M cuivre
        { wood_redwood: 5 }      // = 5M chêne
    ],
    stats: { damage: 60 }
}

// Coût réel : 10,000,000 cuivre
// → Nécessite métiers niveau 30-40
```

#### **Tier 5 : Niveau 40-50**

```javascript
// Épée Légendaire (T5)
{
    materials: [
        { ore_adamantite: 10 },  // = 1B cuivre
        { wood_moonwood: 5 }     // = 500M chêne
    ],
    stats: { damage: 120 }
}

// Coût réel : 1,000,000,000 cuivre
// → Nécessite métiers niveau 50+
```

---

## 🔄 PROGRESSION DES MÉTIERS AVEC ALCHIMIE

### **Timeline Joueur**

| Niveau Joueur | Niveau Métiers | Production T1/min | Alchimiste | Craft Accessible |
| ------------- | -------------- | ----------------- | ---------- | ---------------- |
| **1-10**      | 1-5            | 10-50             | -          | T1 uniquement    |
| **10-20**     | 5-15           | 100-1K            | Niv 1-10   | T1 + T2          |
| **20-30**     | 15-25          | 2K-50K            | Niv 10-20  | T2 + T3          |
| **30-40**     | 25-40          | 100K-1M           | Niv 20-30  | T3 + T4          |
| **40-50**     | 40-60          | 2M-50M            | Niv 30-50  | T4 + T5          |
| **50 (END)**  | 60-100+        | 100M-1B+          | Niv 50-100 | T5 + T6 + T7     |

---

## 🎮 COMPARAISON AVEC AUTRES IDLE GAMES

### **Cookie Clicker**

```javascript
// Système similaire
Cookies T1 (base) → Millions/sec
Upgrades nécessitent 1 Trillion de cookies
→ Échelle exponentielle ASSUMÉE

// Notre équivalent
Cuivre T1 (base) → Millions/min
Craft T5 nécessite 1B de cuivre (via conversions)
→ Même logique !
```

### **NGU Idle**

```javascript
// Système de conversion
Basic Resources → Advanced Resources → Exotic Resources
Ratio 100:1 à chaque tier

// Notre système
T1 (100) → T2 (1) → T3 (0.01) → T4 (0.0001)
→ EXACTEMENT pareil !
```

### **Melvor Idle**

```javascript
// Coexistence tiers
Bronze (T1) utilisé même au niveau max
+ Silver (T2)
+ Gold (T3)
→ Tous les tiers restent pertinents

// Notre système aussi !
Cuivre toujours nécessaire (craft T1, conversion, ville)
```

---

## ✅ RECOMMANDATIONS FINALES

### **À Implémenter**

1. ✅ **Créer métier Alchimiste**
   - Déblocage niveau 10 joueur
   - Conversions T1 → T2 (ratio 100:1)
   - Niveau infini comme autres métiers

2. ✅ **Ajuster coûts de craft**
   - T1 : 10 ressources T1 (niveau 1-10)
   - T2 : 10 ressources T2 = 1,000 T1 (niveau 10-20)
   - T3 : 10 ressources T3 = 100,000 T1 (niveau 20-30)
   - T4 : 10 ressources T4 = 10M T1 (niveau 30-40)
   - T5 : 10 ressources T5 = 1B T1 (niveau 40-50)

3. ✅ **Bâtiment Alchimiste**
   - "Laboratoire" ou "Athanor"
   - Conversion passive en background
   - Upgrade = vitesse de conversion

4. ✅ **UI Conversion**
   - Onglet dans métiers
   - Queue de conversion (comme craft)
   - Afficher équivalence (10 fer = 1000 cuivre)

### **À Éviter**

- ❌ Double économie (trop complexe)
- ❌ Coûts scaling avec niveau (anti-progression)
- ❌ Ignorer le problème (cassé à long terme)

---

## 📝 EXEMPLE DE GAMEPLAY

### **Scenario : Joueur niveau 25**

```
1. Objectif : Crafter épée d'acier T3

2. Ressources nécessaires :
   - 10 acier T3
   - 5 noyer T3

3. Conversions nécessaires :
   - 10 acier = 1,000 fer = 100,000 cuivre
   - 5 noyer = 500 érable = 50,000 chêne

4. Farm :
   - Mineur niveau 20 → 10,000 cuivre/min
   - Bûcheron niveau 20 → 5,000 chêne/min
   - Temps farm : 10-15 minutes

5. Conversion :
   - Alchimiste niveau 15
   - 100,000 cuivre → 1,000 fer (20 min)
   - 1,000 fer → 10 acier (30 min)
   - 50,000 chêne → 500 érable (10 min)
   - 500 érable → 5 noyer (15 min)
   - TOTAL : ~1h15 de conversions

6. Craft final :
   - Forgeron niveau 20
   - 10 acier + 5 noyer → Épée T3
   - Temps craft : 30 secondes

TOTAL : ~2 heures pour une épée T3
→ Satisfaisant et cohérent !
```

---

## 🎯 CONCLUSION

### **Le Système Alchimiste résout TOUS les problèmes**

✅ **RP friendly** : Pas besoin de 10,000 fer, juste 10 acier raffiné  
✅ **Sink de ressources** : Les millions de T1 deviennent utiles  
✅ **Progression naturelle** : Déblocage progressif des tiers  
✅ **Respect des idles** : Inspiré des meilleurs du genre  
✅ **Endgame viable** : Fonctionne jusqu'à métier niveau 1000+  
✅ **Simple à comprendre** : 100 T1 = 1 T2 (ratio constant)

**C'est LA solution standard des idle games modernes.**

---

**Prochaines étapes** :

1. Valider ce concept
2. Créer fichier `BALANCE-ALCHEMY.md` détaillé
3. Ajuster `BALANCE-CRAFTING.md` avec nouveaux coûts
4. Designer UI du métier Alchimiste
5. Implémenter dans le code

**Besoin de clarifications ou ajustements ?**
