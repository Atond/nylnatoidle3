# 🧪 MÉTIER ALCHIMISTE - SPÉCIFICATIONS COMPLÈTES

> **Date** : 12 Octobre 2025  
> **Objectif** : Métier de conversion permettant de transformer ressources T1 → T2 → T3 → etc.  
> **Importance** : Résout le problème d'économie exponentielle

---

## 🎯 CONCEPT GÉNÉRAL

### **Rôle dans l'Économie**

```
┌─────────────────────────────────────────────────┐
│  MÉTIERS DE RÉCOLTE                             │
│  Bûcheron/Mineur → MILLIONS de ressources T1   │
│                    ↓                            │
│  ALCHIMISTE                                     │
│  Convertit T1 → T2 → T3 → etc.                 │
│  (Ratio 100:1 par tier)                        │
│                    ↓                            │
│  MÉTIERS DE CRAFT                               │
│  Forgeron/Armurier → Équipement de qualité     │
└─────────────────────────────────────────────────┘
```

### **Caractéristiques**

- **Type** : Métier de transformation (pas de récolte active)
- **Déblocage** : Niveau joueur 10
- **Niveau max** : Infini (comme tous les métiers)
- **Progression XP** : Exponentielle (×1.5 par niveau)
- **Mécanisme** : Queue de conversion (comme crafting)

---

## 📊 STATISTIQUES DE BASE

### **Configuration Métier**

```javascript
PROFESSION_ALCHEMY: {
    id: 'alchemy',
    name: 'Alchimie',
    icon: '🧪',
    description: 'Transforme les ressources communes en matériaux raffinés',

    unlockLevel: 10,           // Niveau joueur requis
    unlockMessage: 'Vous avez débloqué l\'Alchimie ! Transformez vos ressources en matériaux de tier supérieur.',

    // Progression XP (exponentielle comme autres métiers)
    baseXP: 100,
    xpMultiplier: 1.5,         // Niveau N = 100 × (1.5^N)

    // Gains XP par conversion
    xpPerConversion: {
        t1_to_t2: 10,          // 10 XP par conversion T1→T2
        t2_to_t3: 50,          // 50 XP par conversion T2→T3
        t3_to_t4: 250,         // 250 XP par conversion T3→T4
        t4_to_t5: 1000,        // Scaling exponentiel
        t5_to_t6: 5000
    }
}
```

---

## 🔄 CONVERSIONS DISPONIBLES

### **Formule Universelle**

```javascript
CONVERSION_RATIO: 100  // Constant pour tous les tiers

// Temps de conversion (augmente avec tier)
conversionTime(tier) {
    return 5 × (2 ** tier)  // 5s, 10s, 20s, 40s, 80s...
}
```

---

### **BOIS (Woodcutting → Alchemy)**

#### **T1 → T2 : Chêne → Érable**

```javascript
{
    id: 'wood_t1_to_t2',
    name: 'Raffiner Bois Érable',
    tier: 1,

    input: { wood_oak: 100 },         // 100 chêne T1
    output: { wood_maple: 1 },        // 1 érable T2

    requiredLevel: 1,                 // Alchemy niveau 1
    time: 5,                          // 5 secondes
    xpGain: 10,

    description: '100 rondins de chêne brut peuvent être raffinés en 1 bois d\'érable de qualité supérieure.'
}
```

#### **T2 → T3 : Érable → Noyer**

```javascript
{
    id: 'wood_t2_to_t3',
    name: 'Raffiner Bois de Noyer',
    tier: 2,

    input: { wood_maple: 100 },       // 100 érable T2
    output: { wood_walnut: 1 },       // 1 noyer T3

    requiredLevel: 10,                // Alchemy niveau 10
    time: 10,                         // 10 secondes
    xpGain: 50,

    description: 'Transformation alchimique de l\'érable en noyer ancien.'
}
```

#### **T3 → T4 : Noyer → Séquoia**

```javascript
{
    id: 'wood_t3_to_t4',
    name: 'Transmuter Séquoia',
    tier: 3,

    input: { wood_walnut: 100 },      // 100 noyer T3
    output: { wood_redwood: 1 },      // 1 séquoia T4

    requiredLevel: 20,                // Alchemy niveau 20
    time: 20,                         // 20 secondes
    xpGain: 250,

    description: 'Transmutation magique vers le bois de séquoia millénaire.'
}
```

#### **T4 → T5 : Séquoia → Bois Lunaire**

```javascript
{
    id: 'wood_t4_to_t5',
    name: 'Créer Bois Lunaire',
    tier: 4,

    input: { wood_redwood: 100 },     // 100 séquoia T4
    output: { wood_moonwood: 1 },     // 1 bois lunaire T5

    requiredLevel: 30,                // Alchemy niveau 30
    time: 40,                         // 40 secondes
    xpGain: 1000,

    description: 'Infusion de l\'essence lunaire dans le séquoia.'
}
```

#### **T5 → T6 : Bois Lunaire → Cristal**

```javascript
{
    id: 'wood_t5_to_t6',
    name: 'Cristalliser Bois',
    tier: 5,

    input: { wood_moonwood: 100 },    // 100 bois lunaire T5
    output: { wood_crystal: 1 },      // 1 bois cristal T6

    requiredLevel: 50,                // Alchemy niveau 50
    time: 80,                         // 1min 20s
    xpGain: 5000,

    description: 'Cristallisation magique du bois lunaire.'
}
```

#### **T6 → T7 : Cristal → Éternel**

```javascript
{
    id: 'wood_t6_to_t7',
    name: 'Éterniser Bois',
    tier: 6,

    input: { wood_crystal: 100 },     // 100 cristal T6
    output: { wood_eternal: 1 },      // 1 éternel T7

    requiredLevel: 75,                // Alchemy niveau 75
    time: 160,                        // 2min 40s
    xpGain: 25000,

    description: 'Transcendance vers le bois éternel, matériau divin.'
}
```

---

### **MINERAI (Mining → Alchemy)**

#### **T1 → T2 : Cuivre → Fer**

```javascript
{
    id: 'ore_t1_to_t2',
    name: 'Raffiner Fer',
    tier: 1,

    input: { ore_copper: 100 },       // 100 cuivre T1
    output: { ore_iron: 1 },          // 1 fer T2

    requiredLevel: 1,                 // Alchemy niveau 1
    time: 5,                          // 5 secondes
    xpGain: 10,

    description: 'Purification du cuivre brut en fer de qualité.'
}
```

#### **T2 → T3 : Fer → Acier**

```javascript
{
    id: 'ore_t2_to_t3',
    name: 'Forger Acier',
    tier: 2,

    input: { ore_iron: 100 },         // 100 fer T2
    output: { ore_steel: 1 },         // 1 acier T3

    requiredLevel: 10,                // Alchemy niveau 10
    time: 10,                         // 10 secondes
    xpGain: 50,

    description: 'Fusion alchimique du fer en acier trempé.'
}
```

#### **T3 → T4 : Acier → Mithril**

```javascript
{
    id: 'ore_t3_to_t4',
    name: 'Transmuter Mithril',
    tier: 3,

    input: { ore_steel: 100 },        // 100 acier T3
    output: { ore_mithril: 1 },       // 1 mithril T4

    requiredLevel: 20,                // Alchemy niveau 20
    time: 20,                         // 20 secondes
    xpGain: 250,

    description: 'Transmutation alchimique vers le mithril légendaire.'
}
```

#### **T4 → T5 : Mithril → Adamantite**

```javascript
{
    id: 'ore_t4_to_t5',
    name: 'Créer Adamantite',
    tier: 4,

    input: { ore_mithril: 100 },      // 100 mithril T4
    output: { ore_adamantite: 1 },    // 1 adamantite T5

    requiredLevel: 30,                // Alchemy niveau 30
    time: 40,                         // 40 secondes
    xpGain: 1000,

    description: 'Création du métal le plus dur connu.'
}
```

#### **T5 → T6 : Adamantite → Orichalque**

```javascript
{
    id: 'ore_t5_to_t6',
    name: 'Forger Orichalque',
    tier: 5,

    input: { ore_adamantite: 100 },   // 100 adamantite T5
    output: { ore_orichalcum: 1 },    // 1 orichalque T6

    requiredLevel: 50,                // Alchemy niveau 50
    time: 80,                         // 1min 20s
    xpGain: 5000,

    description: 'Métal mythique des légendes anciennes.'
}
```

#### **T6 → T7 : Orichalque → Céleste**

```javascript
{
    id: 'ore_t6_to_t7',
    name: 'Sublimer Métal Céleste',
    tier: 6,

    input: { ore_orichalcum: 100 },   // 100 orichalque T6
    output: { ore_celestial: 1 },     // 1 céleste T7

    requiredLevel: 75,                // Alchemy niveau 75
    time: 160,                        // 2min 40s
    xpGain: 25000,

    description: 'Métal divin forgé dans les étoiles.'
}
```

---

## 🎯 BONUS PAR NIVEAU

### **Paliers tous les 10 niveaux**

```javascript
ALCHEMY_BONUSES: {
    level_10: {
        conversionSpeed: 0.10,      // -10% temps conversion
        batchSize: 2,               // Peut convertir 2× à la fois
        unlockTier: 2,              // Débloque T2→T3
        description: 'Vitesse +10%, Batch ×2'
    },

    level_20: {
        conversionSpeed: 0.20,      // -20% temps total
        batchSize: 5,               // Peut convertir 5× à la fois
        unlockTier: 3,              // Débloque T3→T4
        bonusOutput: 0.05,          // 5% chance double output
        description: 'Vitesse +20%, Batch ×5, 5% double'
    },

    level_30: {
        conversionSpeed: 0.30,      // -30% temps
        batchSize: 10,              // Peut convertir 10× à la fois
        unlockTier: 4,              // Débloque T4→T5
        bonusOutput: 0.10,          // 10% chance double
        description: 'Vitesse +30%, Batch ×10, 10% double'
    },

    level_50: {
        conversionSpeed: 0.50,      // -50% temps
        batchSize: 100,             // Batch massif
        unlockTier: 5,              // Débloque T5→T6
        bonusOutput: 0.20,          // 20% chance double
        autoConvert: true,          // PASSIF activé
        description: 'Vitesse +50%, Batch ×100, 20% double, AUTO'
    },

    level_75: {
        conversionSpeed: 0.70,      // -70% temps
        batchSize: 1000,            // Batch énorme
        unlockTier: 6,              // Débloque T6→T7
        bonusOutput: 0.30,          // 30% chance double
        autoConvertSpeed: 2,        // Auto ×2 vitesse
        description: 'Vitesse +70%, Batch ×1000, 30% double'
    },

    level_100: {
        conversionSpeed: 0.90,      // -90% temps (quasi instantané)
        batchSize: 10000,           // Conversion de masse
        unlockTier: 7,              // Tous tiers
        bonusOutput: 0.50,          // 50% chance double
        autoConvertSpeed: 10,       // Auto ×10 vitesse
        skipTiers: true,            // Peut sauter tiers (T1→T3 direct)
        description: 'MAÎTRE ALCHIMISTE - Conversion de masse instantanée'
    }
}
```

---

## 🏗️ BÂTIMENT : LABORATOIRE D'ALCHIMIE

### **Statistiques**

```javascript
{
    id: 'alchemy_lab',
    name: 'Laboratoire d\'Alchimie',
    icon: '🧪',
    description: 'Permet la conversion passive de ressources',

    unlockLevel: 15,               // Joueur niveau 15
    professionRequired: 'alchemy',
    professionLevel: 10,           // Alchimie niveau 10

    // Coût construction
    baseCost: {
        gold: 5000,
        wood_oak: 500,
        ore_iron: 500,
        wood_maple: 50,            // Nécessite T2
        ore_steel: 50              // Encourage progression
    },

    costMultiplier: 1.8,

    // Production passive
    baseProduction: {
        conversionsPerHour: 10     // 10 conversions/heure niveau 1
    },

    productionMultiplier: 2.0      // ×2 par niveau
}
```

### **Progression Laboratoire**

| Niveau | Coût Gold | Conversions/heure | Conversions/min | ROI     |
| ------ | --------- | ----------------- | --------------- | ------- |
| 1      | 5,000     | 10                | 0.17            | -       |
| 2      | 9,000     | 20                | 0.33            | 15h     |
| 5      | 41,000    | 160               | 2.67            | 4h      |
| 10     | 1.1M      | 5,120             | 85.3            | 20min   |
| 15     | 28M       | 163,840           | 2,730           | <1min   |
| 20     | 753M      | 5,242,880         | 87,381          | Instant |

**Niveau 20 = 87K conversions/min = économie complètement passive**

---

## 🎨 UI/UX PROPOSÉE

### **Onglet Alchimie**

```
┌──────────────────────────────────────────────────┐
│  🧪 ALCHIMIE - Niveau 25 (15,450 / 50,000 XP)   │
├──────────────────────────────────────────────────┤
│                                                  │
│  📦 CONVERSIONS DISPONIBLES                      │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ 🌲 BOIS                                 │    │
│  │ ─────────────────────────────────────   │    │
│  │ [✓] T1→T2  100 Chêne → 1 Érable  (5s)  │    │
│  │ [✓] T2→T3  100 Érable → 1 Noyer (10s)  │    │
│  │ [✓] T3→T4  100 Noyer → 1 Séquoia (20s) │    │
│  │ [🔒] T4→T5  Requis niveau 30           │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ ⛏️ MINERAI                              │    │
│  │ ─────────────────────────────────────   │    │
│  │ [✓] T1→T2  100 Cuivre → 1 Fer (5s)     │    │
│  │ [✓] T2→T3  100 Fer → 1 Acier (10s)     │    │
│  │ [✓] T3→T4  100 Acier → 1 Mithril (20s) │    │
│  │ [🔒] T4→T5  Requis niveau 30           │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  🔄 FILE DE CONVERSION (3/5)                     │
│  ────────────────────────────────────────────   │
│  1. [████████░░] 80% - Cuivre→Fer (1s)          │
│  2. [██░░░░░░░░] 20% - Érable→Noyer (8s)        │
│  3. [░░░░░░░░░░] 0%  - Fer→Acier (10s)          │
│  ────────────────────────────────────────────   │
│  [+ AJOUTER CONVERSION]                          │
│                                                  │
│  📊 STATISTIQUES                                 │
│  • Vitesse conversion: -25% (bonus niveau)      │
│  • Taille batch: ×10 conversions simultanées    │
│  • Chance double: 10%                           │
│  • Conversions totales: 15,450                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

### **Interface Conversion (Popup)**

```
┌────────────────────────────────────────┐
│  🧪 CONVERTIR T1 → T2                 │
├────────────────────────────────────────┤
│                                        │
│  Ressource Source:                     │
│  🌲 Chêne (T1)                        │
│  En stock: 150,450                     │
│                                        │
│  Quantité à convertir:                 │
│  [______100______] ×100 batches        │
│  ◄────────────────────────────────►    │
│  1        100       1000      10000    │
│                                        │
│  Résultat:                             │
│  10,000 Chêne → 100 Érable            │
│  (+ 10% chance → 110 Érable)          │
│                                        │
│  Temps: 50s (5s × 10 batches)         │
│  XP Gain: 100                          │
│                                        │
│  [ANNULER]  [CONVERTIR] ✨            │
│                                        │
└────────────────────────────────────────┘
```

---

## 📈 PROGRESSION TYPIQUE

### **Timeline Alchimiste**

| Niveau | Temps Jeu | Déblocages              | Utilité             |
| ------ | --------- | ----------------------- | ------------------- |
| 1      | 10h       | T1→T2 (Bois + Minerai)  | Craft équipement T2 |
| 10     | 25h       | T2→T3, Laboratoire      | Craft équipement T3 |
| 20     | 50h       | T3→T4, Batch ×5         | Craft équipement T4 |
| 30     | 100h      | T4→T5, Batch ×10        | Craft légendaire T5 |
| 50     | 250h      | T5→T6, Auto-conversion  | Craft mythique T6   |
| 75     | 500h      | T6→T7, Conversion masse | Craft divin T7      |
| 100    | 1000h     | Skip tiers, Instantané  | Production infinie  |

---

## 🎮 SYNERGIES AVEC AUTRES SYSTÈMES

### **Avec Bûcheron/Mineur**

```
Mineur Niv 50 → 1M cuivre/min
      ↓
Alchimiste Niv 30 (auto) → 10K fer/min
      ↓
Forgeron Niv 40 → Craft T4/T5
```

### **Avec Bâtiments**

```
Mine Niv 15 → 163K cuivre/heure passif
      ↓
Laboratoire Niv 10 → 85 conversions/min auto
      ↓
1.6K fer/heure sans rien faire
```

### **Avec Quêtes**

```javascript
QUEST_ALCHEMY_INTRO: {
    id: 'alchemy_intro',
    name: 'Le Pouvoir de la Transmutation',
    requiredLevel: 10,

    objectives: [
        { type: 'convert', conversion: 'wood_t1_to_t2', amount: 10 },
        { type: 'convert', conversion: 'ore_t1_to_t2', amount: 10 },
        { type: 'reach_level', profession: 'alchemy', level: 5 }
    ],

    rewards: {
        gold: 1000,
        xp: 500,
        items: [
            { id: 'recipe_alchemy_advanced', amount: 1 }
        ]
    },

    description: 'Le vieux sage t\'apprend les bases de l\'alchimie. Convertis 10 bois et 10 minerais pour prouver ta maîtrise.'
}
```

---

## ⚠️ NOTES D'IMPLÉMENTATION

### **Priorités**

1. ✅ **Phase 1** : Conversions manuelles T1→T2 et T2→T3
2. ✅ **Phase 2** : System de queue (file d'attente)
3. ✅ **Phase 3** : Bâtiment Laboratoire (conversion passive)
4. ✅ **Phase 4** : Batch conversion (plusieurs à la fois)
5. ✅ **Phase 5** : Auto-conversion (niveau 50+)
6. ✅ **Phase 6** : Skip tiers (niveau 100+)

### **Formules Clés**

```javascript
// XP requis niveau N
xpRequired(level) {
    return 100 × (1.5 ** level)
}

// Temps conversion avec bonus
conversionTime(baseTier, professionLevel) {
    const baseTime = 5 × (2 ** baseTier)
    const speedBonus = Math.floor(professionLevel / 10) × 0.10
    return baseTime × (1 - speedBonus)
}

// Chance bonus output
bonusChance(professionLevel) {
    return Math.min(0.50, Math.floor(professionLevel / 10) × 0.05)
}

// Équivalence totale (pour UI)
totalEquivalent(tier) {
    return 100 ** tier  // T3 = 10,000 × T1, T4 = 1M × T1
}
```

---

## ✅ CHECKLIST DÉVELOPPEMENT

### **Code**

- [ ] Créer classe `AlchemyManager`
- [ ] Système conversion (input → output)
- [ ] Queue de conversion (max 5 slots)
- [ ] Calcul XP et progression
- [ ] Bonus par niveau (paliers 10/20/30...)
- [ ] Intégration avec `ProfessionManager`
- [ ] Sauvegarde état conversions

### **UI**

- [ ] Onglet Alchimie dans professions
- [ ] Liste conversions disponibles
- [ ] Modal "Nouvelle conversion"
- [ ] File d'attente visuelle (progress bars)
- [ ] Affichage équivalences (10 fer = 1000 cuivre)
- [ ] Notifications conversion terminée

### **Data**

- [ ] Fichier `alchemy-conversions-data.js`
- [ ] Intégration dans `game-config.js`
- [ ] Mise à jour `craft-recipes-data.js` (nouveaux coûts)
- [ ] Ajout bâtiment Laboratoire

### **Balance**

- [ ] Valider tous les ratios (100:1)
- [ ] Temps conversions équilibrés
- [ ] XP gains appropriés
- [ ] Tester progression niveau 1-50

---

## 🎯 CONCLUSION

**L'Alchimie est LA clé de votre système économique.**

Sans elle, votre progression exponentielle ne fonctionne pas.  
Avec elle, vous avez un idle RPG cohérent et satisfaisant jusqu'au niveau 1000+ de métiers.

**C'est le métier le plus important à implémenter après les bases !**

---

**Questions ? Ajustements nécessaires ?**
