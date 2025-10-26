# 📋 ANALYSE DES RECETTES ACTUELLES & PLAN COMPLET

> **Date** : 24 Octobre 2025  
> **Objectif** : Créer un système de craft complet pour tous les archétypes (Tank, Archer, Mage, Soigneur)

---

## 🔍 ANALYSE DE L'EXISTANT

### **Recettes actuelles** : 25 recettes

```
Forgeron (Blacksmith) : 2 armes
Armurier (Armorsmith) : 8 armures
Bijoutier (Jeweler) : 2 accessoires
Alchimiste (Alchemist) : 4 potions
Poissonnier (Fishmonger) : 4 plats
Tailleur (Tailor) : 4 vêtements (1 avec BUG)
```

### **🔴 PROBLÈMES DÉTECTÉS** :

#### **1. Bug Syntax - linen_tunic** :

```javascript
materials: [
    materials: [  // ❌ DUPLICATE !
        { resourceId: 'fabric_coarse_silk', amount: 20 },
        { resourceId: 'fabric_fine_wool', amount: 10 }
    ],
],
```

#### **2. Conflits matériaux/unlock** :

| Recette          | Required Level | Matériau        | Unlock Level | État          |
| ---------------- | -------------- | --------------- | ------------ | ------------- |
| steel_sword      | 5              | wood_birch      | 10           | ❌ IMPOSSIBLE |
| steel_chestplate | 7              | ore_silver      | 12           | ❌ IMPOSSIBLE |
| silver_amulet    | 3              | ore_silver      | 12           | ❌ IMPOSSIBLE |
| potion_strength  | 5              | plant_rosemary  | 12           | ❌ IMPOSSIBLE |
| potion_agility   | 7              | plant_wild_mint | 18           | ❌ IMPOSSIBLE |
| seafood_feast    | 10             | fish_blue_tuna  | 20           | ❌ IMPOSSIBLE |

#### **3. Manque de couverture niveau 1-50** :

```
Niveau 1-5 : 10 recettes ✅
Niveau 6-10 : 4 recettes ⚠️
Niveau 11-20 : 0 recette ❌ VIDE !
Niveau 21-30 : 0 recette ❌ VIDE !
Niveau 31-40 : 0 recette ❌ VIDE !
Niveau 41-50 : 0 recette ❌ VIDE !
```

#### **4. Manque d'archétypes** :

```
Tank : 5 recettes (armures lourdes) ⚠️ Insuffisant
Archer : 0 recette ❌ ABSENT !
Mage : 2 recettes (robes) ❌ Insuffisant !
Soigneur : 2 recettes ❌ Insuffisant !
```

#### **5. Pas de loot de monstres utilisé** :

```
loot_peau_animale : Non utilisé ❌
loot_griffes_usees : Non utilisé ❌
loot_cuir_robuste : Non utilisé ❌
loot_crocs_venimeux : Non utilisé ❌
loot_essence_vegetale_instable : Non utilisé ❌
... 12 ressources de loot INUTILISÉES !
```

---

## 🎯 PLAN DE CORRECTION

### **PHASE 2A : Corrections urgentes** (30 min)

1. ✅ Fixer le bug `linen_tunic`
2. ✅ Ajuster tous les `requiredLevel` pour cohérence
3. ✅ Remplacer matériaux par des alternatives disponibles

### **PHASE 2B : Création système complet** (2-3h)

1. ✅ Créer archétypes (Tank, Archer, Mage, Soigneur)
2. ✅ Créer 160+ recettes couvrant niveau 1-50
3. ✅ Intégrer TOUS les loots de monstres
4. ✅ Équilibrer les stats selon archétype

---

## 🛡️ SYSTÈME D'ARCHÉTYPES

### **1. TANK (Heavy Armor)** 🛡️

**Stats primaires** : Defense, Endurance, Force  
**Équipement** :

- Armures lourdes (Plate, Chainmail)
- Épées à une main + Boucliers
- Focus : Survie, Aggro

### **2. ARCHER (Light Armor)** 🏹

**Stats primaires** : Agility, Dexterity, Crit  
**Équipement** :

- Armures légères (Leather, Ranger)
- Arcs, Dagues
- Focus : Esquive, Dégâts critiques

### **3. MAGE (Cloth Armor)** 🔮

**Stats primaires** : Intelligence, Wisdom, Mana  
**Équipement** :

- Robes, Capuches
- Bâtons, Sceptres
- Focus : Magie, Régénération mana

### **4. SOIGNEUR (Support)** ⚕️

**Stats primaires** : Wisdom, Intelligence, Healing  
**Équipement** :

- Robes sacrées
- Bâtons de soins, Totems
- Focus : Soins, Buffs d'équipe

---

## 📊 PLAN DE RECETTES (160 TOTAL)

### **Par métier** :

```
Forgeron (Blacksmith) : 35 recettes
  - Armes lourdes : 15 (Épées, Haches, Masses)
  - Armes magiques : 10 (Sceptres, Bâtons)
  - Boucliers : 10

Armurier (Armorsmith) : 50 recettes
  - Armures lourdes (Tank) : 20
  - Armures légères (Archer) : 20
  - Armures magiques (Mage/Heal) : 10

Bijoutier (Jeweler) : 25 recettes
  - Anneaux : 10
  - Amulettes : 10
  - Talismans : 5

Alchimiste (Alchemist) : 20 recettes
  - Potions de vie : 5
  - Potions de stats : 10
  - Elixirs endgame : 5

Poissonnier (Fishmonger) : 15 recettes
  - Buffs de combat : 10
  - Buffs de profession : 5

Tailleur (Tailor) : 15 recettes
  - Robes de mage : 5
  - Capes/Gants : 5
  - Équipement de soigneur : 5
```

### **Par tier (niveau)** :

```
T1 (1-10) : 40 recettes (base gameplay)
T2 (11-20) : 40 recettes (progression)
T3 (21-30) : 40 recettes (équipement rare)
T4 (31-40) : 25 recettes (équipement épique)
T5 (41-50) : 15 recettes (équipement légendaire)
```

---

## 🏗️ STRUCTURE DES RECETTES

### **Template de base** :

```javascript
{
  id: 'unique_id',
  name: 'Nom de l\'item',
  type: 'weapon|armor|accessory|potion|food',
  slot: 'weapon|helmet|chest|legs|boots|gloves|ring1|amulet|consumable',
  icon: 'emoji',
  rarity: 'common|uncommon|rare|epic|legendary|mythic',
  archetype: 'tank|archer|mage|healer|universal', // NOUVEAU !
  profession: 'blacksmith|armorsmith|jeweler|alchemist|fishmonger|tailor',
  professionLevel: 1-20,
  materials: [
    { resourceId: 'xxx', amount: X },
    { resourceId: 'loot_xxx', amount: X } // Loots de monstres
  ],
  craftTime: milliseconds,
  stats: {
    // Stats combat
    force: 0-50,
    defense: 0-50,
    endurance: 0-100,
    agility: 0-50,
    intelligence: 0-50,
    wisdom: 0-50,

    // Stats spéciaux
    crit: 0-25, // % chance coup critique
    dodge: 0-25, // % chance esquive
    healing: 0-50, // Puissance soins

    // Stats utilitaires
    professionXP: 0-50, // % bonus XP métiers
    dropRate: 0-25, // % bonus drop
    goldGain: 0-50 // % bonus gold
  },
  requiredLevel: 1-50,
  description: 'Description RP'
}
```

---

## 💎 UTILISATION DES LOOTS

### **Loot Région 1** (utilisés dans recettes T1-T2) :

```javascript
loot_peau_animale → Armures légères niveau 1-5
loot_griffes_usees → Armes légères (dagues) niveau 1-5
loot_plumes_sombres → Capes, flèches niveau 3-8
loot_cuir_robuste → Armures médium niveau 5-10
loot_crocs_venimeux → Armes empoisonnées niveau 5-10
loot_essence_vegetale_instable → Potions alchimie niveau 5-10
loot_os_massif → Boucliers, armures lourdes niveau 8-12
loot_armure_cabossee → Recyclage en armures niveau 10-15
loot_sang_concentre → Potions puissantes niveau 10-15
loot_corne_ancienne → Armes légendaires niveau 15-20
loot_cuir_legendaire → Armures légendaires niveau 15-20
loot_essence_vie_sauvage → Équipement de soigneur niveau 15-20
```

---

## 🎨 EXEMPLES DE RECETTES PAR ARCHETYPE

### **TANK - Niveau 10** :

```javascript
{
  id: 'iron_plate_chest_tank',
  name: 'Plastron de Plates Renforcé',
  archetype: 'tank',
  profession: 'armorsmith',
  professionLevel: 5,
  materials: [
    { resourceId: 'ore_bronze', amount: 25 },
    { resourceId: 'loot_os_massif', amount: 5 },
    { resourceId: 'wood_birch', amount: 10 }
  ],
  stats: {
    defense: 35,
    endurance: 50,
    force: 10,
    dodge: -5 // Malus : armure lourde
  },
  requiredLevel: 10
}
```

### **ARCHER - Niveau 10** :

```javascript
{
  id: 'ranger_bow',
  name: 'Arc de Rôdeur',
  archetype: 'archer',
  profession: 'blacksmith',
  professionLevel: 5,
  materials: [
    { resourceId: 'wood_birch', amount: 20 },
    { resourceId: 'loot_plumes_sombres', amount: 10 },
    { resourceId: 'ore_bronze', amount: 5 }
  ],
  stats: {
    damage: 25,
    agility: 15,
    crit: 10, // 10% chance critique
    force: 5
  },
  requiredLevel: 10
}
```

### **MAGE - Niveau 10** :

```javascript
{
  id: 'apprentice_staff',
  name: 'Bâton d\'Apprenti',
  archetype: 'mage',
  profession: 'blacksmith',
  professionLevel: 5,
  materials: [
    { resourceId: 'wood_walnut', amount: 15 },
    { resourceId: 'gem_sapphire', amount: 2 },
    { resourceId: 'loot_essence_vegetale_instable', amount: 5 }
  ],
  stats: {
    intelligence: 20,
    wisdom: 10,
    damage: 18,
    manaRegen: 5
  },
  requiredLevel: 10
}
```

### **HEALER - Niveau 10** :

```javascript
{
  id: 'healer_totem',
  name: 'Totem du Guérisseur',
  archetype: 'healer',
  profession: 'blacksmith',
  professionLevel: 5,
  materials: [
    { resourceId: 'wood_cedar', amount: 12 },
    { resourceId: 'loot_essence_vie_sauvage', amount: 3 },
    { resourceId: 'plant_rosemary', amount: 8 }
  ],
  stats: {
    wisdom: 25,
    intelligence: 15,
    healing: 30,
    hpRegen: 5
  },
  requiredLevel: 10
}
```

---

## ✅ PROCHAINES ACTIONS

### **1. Fixer les bugs** (MAINTENANT)

- Corriger `linen_tunic` duplicate materials
- Ajuster tous les requiredLevel

### **2. Créer nouvelles recettes** (APRÈS)

- Générer 160 recettes avec template
- Équilibrer les stats par tier
- Intégrer tous les loots

### **3. Tester** (FINAL)

- Vérifier craft en jeu
- Tester équilibrage archétypes
- Valider progression 1-50

---

**PRÊT À COMMENCER ?** ⚡
