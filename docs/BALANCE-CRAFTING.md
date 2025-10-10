# ⚔️ ÉQUILIBRAGE - CRAFT & RECETTES COMPLÈTES

> **Fichier** : Toutes les recettes avec ressources monstres intégrées  
> **Lien** : [← Métiers](BALANCE-PROFESSIONS.md) | [→ Bâtiments](BALANCE-BUILDINGS.md)

---

## 📋 PHILOSOPHIE DU CRAFT

### **Principes**

1. **Combat + Métiers** : Chaque craft nécessite ressources monstres ET ressources récoltées
2. **Progression naturelle** : Les recettes se débloquent en explorant les régions
3. **Qualité variable** : Tous les crafts peuvent avoir une qualité (Common → Divine)
4. **Recyclage** : Possibilité de désassembler pour récupérer 50% des matériaux

### **Formule de Qualité**

```javascript
// Chance de craft qualité supérieure
baseChance = 0.10  // 10% base
professionBonus = profession.level * 0.01  // +1% par niveau métier
talentBonus = talents.crafting_quality || 0  // Bonus talents

totalChance = baseChance + professionBonus + talentBonus

// Exemple Forgeron niveau 30
totalChance = 0.10 + 0.30 + 0.15 = 0.55 (55% chance)
```

---

## ⚔️ ARMES - FORGERON

### **Niveau 1-5 : Débutant**

#### **Épée de Fer**

```javascript
{
    id: 'iron_sword',
    name: 'Épée de Fer',
    slot: 'weapon',
    rarity: 'common',
    requiredLevel: 1,
    professionLevel: 1,  // Forgeron

    materials: [
        { type: 'ore', id: 'ore_iron', amount: 10 },
        { type: 'wood', id: 'wood_oak', amount: 5 },
        { type: 'loot', id: 'griffes_usees', amount: 2 }  // DROP MONSTRE
    ],

    craftTime: 2000,  // 2 secondes

    stats: {
        damage: 8,
        force: 5
    },

    description: 'Une épée simple en fer forgé, avec poignée en chêne.'
}
```

#### **Hache de Bûcheron**

```javascript
{
    id: 'woodcutter_axe',
    name: 'Hache de Bûcheron',
    slot: 'weapon',
    rarity: 'common',
    requiredLevel: 2,
    professionLevel: 1,

    materials: [
        { type: 'ore', id: 'ore_iron', amount: 12 },
        { type: 'wood', id: 'wood_oak', amount: 8 },
        { type: 'loot', id: 'peau_animale', amount: 3 }  // DROP MONSTRE
    ],

    craftTime: 2500,

    stats: {
        damage: 10,
        force: 7,
        endurance: 3
    },

    description: 'Hache robuste, efficace contre les créatures des forêts.'
}
```

#### **Arc Court**

```javascript
{
    id: 'short_bow',
    name: 'Arc Court',
    slot: 'weapon',
    rarity: 'common',
    requiredLevel: 3,
    professionLevel: 2,

    materials: [
        { type: 'wood', id: 'wood_ash', amount: 15 },
        { type: 'loot', id: 'plumes_sombres', amount: 10 },  // DROP CORBEAU
        { type: 'ore', id: 'ore_copper', amount: 5 }
    ],

    craftTime: 3000,

    stats: {
        damage: 12,
        agility: 5,
        force: 3
    },

    description: 'Arc léger et rapide, idéal pour les archers débutants.'
}
```

---

### **Niveau 5-10 : Intermédiaire**

#### **Épée d'Acier**

```javascript
{
    id: 'steel_sword',
    name: 'Épée d\'Acier',
    slot: 'weapon',
    rarity: 'uncommon',
    requiredLevel: 5,
    professionLevel: 5,

    materials: [
        { type: 'ore', id: 'ore_copper', amount: 20 },
        { type: 'ore', id: 'ore_tin', amount: 10 },
        { type: 'wood', id: 'wood_birch', amount: 8 },
        { type: 'loot', id: 'cuir_robuste', amount: 3 },  // DROP RARE
        { type: 'loot', id: 'croc_acere', amount: 2 }     // DROP RÉGION 2
    ],

    craftTime: 3500,

    stats: {
        damage: 18,
        force: 12,
        agility: 5
    },

    description: 'Épée en acier trempé, équilibrée et résistante.'
}
```

#### **Lance de Chasseur**

```javascript
{
    id: 'hunter_spear',
    name: 'Lance de Chasseur',
    slot: 'weapon',
    rarity: 'uncommon',
    requiredLevel: 7,
    professionLevel: 6,

    materials: [
        { type: 'ore', id: 'ore_bronze', amount: 15 },
        { type: 'wood', id: 'wood_maple', amount: 20 },
        { type: 'loot', id: 'fourrure_epaisse', amount: 5 },  // DROP RÉGION 2
        { type: 'loot', id: 'corne_bouc', amount: 2 }         // DROP UNCOMMON
    ],

    craftTime: 4000,

    stats: {
        damage: 22,
        force: 10,
        agility: 8,
        criticalChance: 5  // +5% critique
    },

    description: 'Lance longue portée, efficace contre les bêtes sauvages.'
}
```

#### **Arc Long en If**

```javascript
{
    id: 'yew_longbow',
    name: 'Arc Long en If',
    slot: 'weapon',
    rarity: 'rare',
    requiredLevel: 10,
    professionLevel: 8,

    materials: [
        { type: 'wood', id: 'wood_yew', amount: 25 },
        { type: 'ore', id: 'ore_silver', amount: 8 },
        { type: 'loot', id: 'aile_chauve_souris', amount: 15 },  // DROP RÉGION 2
        { type: 'loot', id: 'essence_vegetale_instable', amount: 2 }  // DROP RARE
    ],

    craftTime: 5000,

    stats: {
        damage: 30,
        agility: 15,
        force: 8,
        attackSpeed: 1.15  // +15% vitesse
    },

    description: 'Arc puissant en bois d\'if, corde en crin argenté.'
}
```

---

### **Niveau 15-25 : Avancé**

#### **Lame d'Obsidienne**

```javascript
{
    id: 'obsidian_blade',
    name: 'Lame d\'Obsidienne',
    slot: 'weapon',
    rarity: 'epic',
    requiredLevel: 15,
    professionLevel: 12,

    materials: [
        { type: 'ore', id: 'ore_obsidian', amount: 30 },
        { type: 'ore', id: 'ore_steel', amount: 20 },
        { type: 'wood', id: 'wood_cedar', amount: 10 },
        { type: 'loot', id: 'os_massif', amount: 3 },      // DROP ÉLITE
        { type: 'loot', id: 'sang_concentre', amount: 2 }, // DROP ÉLITE
        { type: 'gem', id: 'gem_onyx', amount: 1 }         // GEMME RARE
    ],

    craftTime: 8000,

    stats: {
        damage: 45,
        force: 20,
        agility: 10,
        criticalDamage: 2.5,  // Critiques ×2.5 au lieu de ×2
        lifesteal: 5  // +5% vol de vie
    },

    description: 'Épée noire tranchante comme un rasoir, infusée d\'énergie sombre.'
}
```

#### **Marteau de Guerre Runique**

```javascript
{
    id: 'runic_warhammer',
    name: 'Marteau de Guerre Runique',
    slot: 'weapon',
    rarity: 'epic',
    requiredLevel: 20,
    professionLevel: 15,

    materials: [
        { type: 'ore', id: 'ore_mithril', amount: 40 },
        { type: 'ore', id: 'ore_platinum', amount: 15 },
        { type: 'wood', id: 'wood_ironwood', amount: 25 },
        { type: 'loot', id: 'fragment_golem', amount: 10 },    // DROP RÉGION 2
        { type: 'loot', id: 'armure_cabossee', amount: 5 },    // DROP ÉLITE
        { type: 'loot', id: 'essence_elementaire_terre', amount: 3 },  // DROP RÉGION 3
        { type: 'gem', id: 'gem_topaz', amount: 2 }
    ],

    craftTime: 12000,

    stats: {
        damage: 60,
        force: 30,
        endurance: 15,
        stunChance: 10,  // +10% chance d'étourdir
        armorPenetration: 20  // +20% pénétration armure
    },

    description: 'Marteau massif gravé de runes de puissance, écrase les armures.'
}
```

#### **Arc du Phénix**

```javascript
{
    id: 'phoenix_bow',
    name: 'Arc du Phénix',
    slot: 'weapon',
    rarity: 'legendary',
    requiredLevel: 25,
    professionLevel: 20,

    materials: [
        { type: 'wood', id: 'wood_phoenix', amount: 50 },
        { type: 'ore', id: 'ore_electrum', amount: 30 },
        { type: 'gem', id: 'gem_ruby', amount: 3 },
        { type: 'loot', id: 'plume_phoenix', amount: 10 },     // DROP BOSS RÉGION 3
        { type: 'loot', id: 'essence_feu_primordial', amount: 5 },  // DROP LÉGENDAIRE
        { type: 'loot', id: 'corde_araignee_geante', amount: 20 }  // DROP RÉGION 3
    },

    craftTime: 20000,

    stats: {
        damage: 85,
        agility: 40,
        force: 20,
        intelligence: 15,
        attackSpeed: 1.40,  // +40% vitesse
        fireDamage: 30,     // +30 dégâts de feu
        phoenixRebirth: true  // Revive 1 fois par combat
    },

    description: 'Arc légendaire imprégné du feu du phénix, les flèches s\'enflamment.'
}
```

---

## 🛡️ ARMURES - ARMURIER

### **Niveau 1-5 : Débutant**

#### **Tunique de Cuir**

```javascript
{
    id: 'leather_tunic',
    name: 'Tunique de Cuir',
    slot: 'chest',
    rarity: 'common',
    requiredLevel: 1,
    professionLevel: 1,  // Armurier

    materials: [
        { type: 'loot', id: 'peau_animale', amount: 15 },  // DROP MONSTRE
        { type: 'wood', id: 'wood_oak', amount: 5 }
    ],

    craftTime: 2000,

    stats: {
        defense: 5,
        hp: 20,
        endurance: 3
    },

    description: 'Armure légère en cuir tanné, offre une protection de base.'
}
```

#### **Casque de Fer**

```javascript
{
    id: 'iron_helmet',
    name: 'Casque de Fer',
    slot: 'helmet',
    rarity: 'common',
    requiredLevel: 2,
    professionLevel: 1,

    materials: [
        { type: 'ore', id: 'ore_iron', amount: 15 },
        { type: 'loot', id: 'cuir_robuste', amount: 3 },  // DROP RARE
        { type: 'loot', id: 'griffes_usees', amount: 2 }
    ],

    craftTime: 2500,

    stats: {
        defense: 8,
        hp: 15,
        endurance: 5
    },

    description: 'Casque en fer forgé avec doublure en cuir.'
}
```

#### **Bottes de Cuir Renforcé**

```javascript
{
    id: 'reinforced_leather_boots',
    name: 'Bottes de Cuir Renforcé',
    slot: 'boots',
    rarity: 'uncommon',
    requiredLevel: 4,
    professionLevel: 3,

    materials: [
        { type: 'loot', id: 'cuir_robuste', amount: 10 },
        { type: 'ore', id: 'ore_copper', amount: 8 },
        { type: 'loot', id: 'fourrure_epaisse', amount: 5 },  // DROP RÉGION 2
        { type: 'wood', id: 'wood_ash', amount: 5 }
    ],

    craftTime: 3000,

    stats: {
        defense: 6,
        hp: 10,
        agility: 8,
        movementSpeed: 1.05  // +5% vitesse déplacement
    },

    description: 'Bottes robustes avec semelles renforcées, idéales pour l\'exploration.'
}
```

---

### **Niveau 10-20 : Intermédiaire**

#### **Plastron d'Acier**

```javascript
{
    id: 'steel_chestplate',
    name: 'Plastron d\'Acier',
    slot: 'chest',
    rarity: 'rare',
    requiredLevel: 10,
    professionLevel: 8,

    materials: [
        { type: 'ore', id: 'ore_steel', amount: 35 },
        { type: 'ore', id: 'ore_silver', amount: 15 },
        { type: 'loot', id: 'armure_cabossee', amount: 3 },  // DROP ÉLITE
        { type: 'loot', id: 'os_massif', amount: 5 },
        { type: 'loot', id: 'corne_bouc', amount: 8 }
    },

    craftTime: 6000,

    stats: {
        defense: 30,
        hp: 80,
        endurance: 15,
        force: 10,
        damageReduction: 5  // -5% dégâts reçus
    },

    description: 'Plastron massif en acier de haute qualité, très résistant.'
}
```

#### **Heaume de Mithril**

```javascript
{
    id: 'mithril_helm',
    name: 'Heaume de Mithril',
    slot: 'helmet',
    rarity: 'rare',
    requiredLevel: 15,
    professionLevel: 10,

    materials: [
        { type: 'ore', id: 'ore_mithril', amount: 25 },
        { type: 'ore', id: 'ore_gold', amount: 10 },
        { type: 'loot', id: 'fragment_golem', amount: 5 },
        { type: 'loot', id: 'corne_bouc', amount: 3 },
        { type: 'gem', id: 'gem_jade', amount: 1 }
    },

    craftTime: 7000,

    stats: {
        defense: 22,
        hp: 50,
        intelligence: 10,
        wisdom: 10,
        magicResist: 10  // +10% résistance magique
    },

    description: 'Heaume léger en mithril, protège physiquement et magiquement.'
}
```

#### **Gantelets du Golem**

```javascript
{
    id: 'golem_gauntlets',
    name: 'Gantelets du Golem',
    slot: 'gloves',
    rarity: 'epic',
    requiredLevel: 18,
    professionLevel: 12,

    materials: [
        { type: 'ore', id: 'ore_cobalt', amount: 20 },
        { type: 'loot', id: 'fragment_golem', amount: 25 },  // DROP RÉGION 2
        { type: 'loot', id: 'coeur_golem', amount: 1 },      // DROP BOSS RÉGION 2
        { type: 'loot', id: 'essence_elementaire_terre', amount: 5 },
        { type: 'gem', id: 'gem_topaz', amount: 2 }
    },

    craftTime: 10000,

    stats: {
        defense: 18,
        hp: 40,
        force: 25,
        endurance: 20,
        blockChance: 15,  // +15% chance bloquer attaque
        thorns: 20  // Renvoie 20 dégâts quand touché
    },

    description: 'Gantelets massifs forgés avec essence de golem, incroyablement solides.'
}
```

---

### **Niveau 25-40 : Légendaire**

#### **Armure du Dragon Noir**

```javascript
{
    id: 'black_dragon_armor',
    name: 'Armure du Dragon Noir',
    slot: 'chest',
    rarity: 'legendary',
    requiredLevel: 30,
    professionLevel: 25,

    materials: [
        { type: 'ore', id: 'ore_draconium', amount: 50 },
        { type: 'loot', id: 'ecaille_dragon_noir', amount: 100 },  // DROP DRAGON
        { type: 'loot', id: 'coeur_dragon', amount: 1 },           // DROP BOSS RÉGION 4
        { type: 'loot', id: 'sang_ancien', amount: 10 },
        { type: 'gem', id: 'gem_diamond', amount: 5 },
        { type: 'gem', id: 'gem_ruby', amount: 3 }
    ],

    craftTime: 30000,

    stats: {
        defense: 80,
        hp: 250,
        force: 40,
        endurance: 50,
        agility: 20,
        fireResist: 50,  // +50% résistance feu
        damageReduction: 20,  // -20% dégâts
        dragonBreath: true  // Souffle de dragon (compétence active)
    },

    setBonus: {
        pieces: 4,  // Bonus si 4 pièces set dragon
        bonus: {
            allStats: 50,  // +50 toutes stats
            dragonForm: true  // Transformation dragon 30s (ultimate)
        }
    },

    description: 'Armure légendaire forgée avec écailles de dragon ancien, imbattable.'
}
```

---

## 💍 BIJOUX - JOAILLIER

### **Niveau 10-15 : Débutant**

#### **Anneau de Force**

```javascript
{
    id: 'ring_of_strength',
    name: 'Anneau de Force',
    slot: 'ring',
    rarity: 'uncommon',
    requiredLevel: 10,
    professionLevel: 3,  // Joaillier

    materials: [
        { type: 'ore', id: 'ore_silver', amount: 5 },
        { type: 'gem', id: 'gem_quartz', amount: 1 },
        { type: 'loot', id: 'griffes_usees', amount: 5 }
    ],

    craftTime: 3000,

    stats: {
        force: 10,
        damage: 5
    },

    description: 'Anneau simple rehaussé de quartz, augmente la force.'
}
```

#### **Collier du Loup**

```javascript
{
    id: 'wolf_necklace',
    name: 'Collier du Loup',
    slot: 'necklace',
    rarity: 'rare',
    requiredLevel: 12,
    professionLevel: 5,

    materials: [
        { type: 'ore', id: 'ore_gold', amount: 10 },
        { type: 'gem', id: 'gem_onyx', amount: 1 },
        { type: 'loot', id: 'croc_acere', amount: 10 },
        { type: 'loot', id: 'fourrure_epaisse', amount: 5 },
        { type: 'loot', id: 'essence_bestiale', amount: 2 }  // DROP BOSS LOUP
    ],

    craftTime: 5000,

    stats: {
        force: 15,
        agility: 15,
        criticalChance: 8,
        packHunter: 10  // +10% dégâts si HP > 80%
    },

    description: 'Collier orné de crocs de loup, confère agilité et férocité.'
}
```

---

### **Niveau 20-30 : Avancé**

#### **Bague du Phénix**

```javascript
{
    id: 'phoenix_ring',
    name: 'Bague du Phénix',
    slot: 'ring',
    rarity: 'epic',
    requiredLevel: 22,
    professionLevel: 15,

    materials: [
        { type: 'ore', id: 'ore_electrum', amount: 15 },
        { type: 'gem', id: 'gem_ruby', amount: 2 },
        { type: 'loot', id: 'plume_phoenix', amount: 5 },
        { type: 'loot', id: 'essence_feu_primordial', amount: 3 },
        { type: 'loot', id: 'cendre_sacree', amount: 10 }
    ],

    craftTime: 12000,

    stats: {
        intelligence: 30,
        wisdom: 20,
        hp: 100,
        fireResist: 30,
        phoenixRebirth: true  // Revive 1 fois avec 50% HP
    },

    description: 'Bague enchantée du phénix, permet la renaissance après la mort.'
}
```

#### **Collier des Titans**

```javascript
{
    id: 'titan_necklace',
    name: 'Collier des Titans',
    slot: 'necklace',
    rarity: 'legendary',
    requiredLevel: 30,
    professionLevel: 25,

    materials: [
        { type: 'ore', id: 'ore_adamantite', amount: 30 },
        { type: 'ore', id: 'ore_orichalcum', amount: 20 },
        { type: 'gem', id: 'gem_diamond', amount: 3 },
        { type: 'gem', id: 'gem_sapphire', amount: 5 },
        { type: 'loot', id: 'coeur_titan', amount: 1 },      // DROP BOSS RÉGION 5
        { type: 'loot', id: 'sang_ancien', amount: 15 },
        { type: 'loot', id: 'essence_titanesque', amount: 10 }
    ],

    craftTime: 25000,

    stats: {
        allStats: 40,  // +40 TOUTES stats
        hp: 200,
        titanStrength: true,  // +30% dégâts et défense
        giantSlayer: 50  // +50% dégâts contre boss
    },

    description: 'Collier légendaire forgé avec cœur de titan, puissance immense.'
}
```

---

## 🧪 POTIONS - ALCHIMISTE (FUTUR)

### **Potions de Combat**

#### **Potion de Vie Mineure**

```javascript
{
    id: 'minor_health_potion',
    name: 'Potion de Vie Mineure',
    type: 'consumable',
    rarity: 'common',
    requiredLevel: 5,
    professionLevel: 1,  // Alchimiste

    materials: [
        { type: 'plant', id: 'herbe_curative', amount: 5 },
        { type: 'loot', id: 'sang_concentre', amount: 1 },
        { type: 'water', id: 'eau_pure', amount: 1 }
    ],

    craftTime: 1000,

    effect: {
        instantHeal: 100,  // Restore 100 HP
        cooldown: 30000    // 30s cooldown
    },

    description: 'Restore instantanément 100 HP.'
}
```

#### **Élixir de Force**

```javascript
{
    id: 'strength_elixir',
    name: 'Élixir de Force',
    type: 'consumable',
    rarity: 'uncommon',
    requiredLevel: 10,
    professionLevel: 5,

    materials: [
        { type: 'plant', id: 'racine_puissance', amount: 3 },
        { type: 'loot', id: 'os_massif', amount: 2 },
        { type: 'loot', id: 'essence_bestiale', amount: 1 },
        { type: 'ore', id: 'ore_iron', amount: 5 }
    ],

    craftTime: 3000,

    effect: {
        buffDuration: 600000,  // 10 minutes
        damageBonus: 0.25,     // +25% dégâts
        forceBonus: 20         // +20 Force
    },

    description: 'Augmente force et dégâts pendant 10 minutes.'
}
```

---

## 📊 RÉCAPITULATIF DROPS PAR RÉGION

### **Région 1 : Plaines Verdoyantes**

| Drop           | Rareté | Monstres       | Utilisation                 |
| -------------- | ------ | -------------- | --------------------------- |
| Peau Animale   | Common | Loup, Sanglier | Armures légères niveau 1-10 |
| Griffes Usées  | Common | Loup, Corbeau  | Armes niveau 1-5            |
| Plumes Sombres | Common | Corbeau        | Arcs niveau 3-8             |
| Cuir Robuste   | Rare   | Ours           | Armures niveau 5-15         |
| Os Massif      | Elite  | Troll          | Armes lourdes niveau 10-20  |
| Sang Concentré | Elite  | Élites         | Potions, enchantements      |

### **Région 2 : Montagnes Grises**

| Drop               | Rareté   | Monstres       | Utilisation                   |
| ------------------ | -------- | -------------- | ----------------------------- |
| Aile Chauve-souris | Common   | Chauve-souris  | Arcs niveau 8-15              |
| Croc Acéré         | Common   | Loups montagne | Armes perforantes niveau 5-12 |
| Fourrure Épaisse   | Common   | Loups, Boucs   | Armures chaudes niveau 8-18   |
| Corne de Bouc      | Uncommon | Bouc Sauvage   | Casques niveau 10-20          |
| Fragment Golem     | Uncommon | Golem          | Armures lourdes niveau 15-30  |
| Cœur Golem         | Boss     | Boss Région 2  | Équipement légendaire         |

### **Région 3 : Forêt Ancestrale**

| Drop                   | Rareté    | Monstres             | Utilisation                  |
| ---------------------- | --------- | -------------------- | ---------------------------- |
| Essence Végétale       | Rare      | Épouvantail          | Bâtons magiques niveau 15-25 |
| Plume Phénix           | Legendary | Phoenix (rare spawn) | Arcs légendaires niveau 25+  |
| Essence Feu Primordial | Legendary | Boss Région 3        | Armes élémentaires           |
| Corde Araignée         | Uncommon  | Araignée Géante      | Arcs niveau 20-30            |

### **Région 4 : Marais Maudits**

| Drop                | Rareté | Monstres      | Utilisation                          |
| ------------------- | ------ | ------------- | ------------------------------------ |
| Écaille Dragon Noir | Epic   | Dragon Noir   | Armures niveau 30-40                 |
| Sang Ancien         | Rare   | Démons        | Potions puissantes, craft légendaire |
| Cœur Dragon         | Boss   | Boss Région 4 | Set Dragon complet                   |

### **Région 5 : Terres Désolées**

| Drop               | Rareté    | Monstres           | Utilisation                 |
| ------------------ | --------- | ------------------ | --------------------------- |
| Cœur Titan         | Legendary | Titan (Boss Final) | Colliers/Bijoux légendaires |
| Essence Titanesque | Epic      | Géants             | Craft mythique/divin        |
| Fragment Étoile    | Divine    | Rare spawn         | Craft divin ultime          |

---

## 🎯 SYNERGIE COMPLÈTE

### **Exemple Build Complet Niveau 30**

```
JOUEUR ARCHER NIVEAU 30

ARMES:
- Arc du Phénix (Forgeron 20 + Drops Région 3)

ARMURES:
- Heaume de Mithril (Armurier 10 + Drops Région 2)
- Plastron d'Acier (Armurier 8 + Drops Région 2)
- Gantelets du Golem (Armurier 12 + Boss Région 2)
- Jambières Renforcées (Armurier 8 + Drops Région 1-2)
- Bottes de Vitesse (Armurier 10 + Drops Région 2)

BIJOUX:
- Collier du Loup (Joaillier 5 + Drops Boss Loup)
- Bague du Phénix ×2 (Joaillier 15 + Drops Région 3)

STATS TOTALES:
- HP: 800 (base 550 + équipement 250)
- Dégâts: 150 (85 arc + 65 stats/équipement)
- Vitesse: +60% (agilité + arc + talents)
- Critique: 25% chance, ×3 dégâts
- Survie: Rebirth phénix 1×/combat

RESSOURCES NÉCESSAIRES:
- 50+ heures farming
- Tous métiers niveau 15-20
- Boss Régions 1-3 tués multiple fois
- 100+ crafts différents
```

---

**Navigation** :

- [← Métiers](BALANCE-PROFESSIONS.md)
- [→ Bâtiments et synergies](BALANCE-BUILDINGS.md)
- [→ Combat et monstres](BALANCE-COMBAT.md)
