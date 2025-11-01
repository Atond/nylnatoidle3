# 🎯 PLAN D'ACTION - CORRECTIONS SYSTÈME CRAFTING

**Date:** 27 octobre 2025  
**Objectif:** Rendre le système de crafting cohérent, équilibré et jouable

---

## 🚨 PHASE 1 : CORRECTIONS CRITIQUES (URGENCE)

### ✅ TÂCHE 1.1 : Débloquer le métier ARMURIER

**Problème:** Première recette au niveau 3 → Impossible de gagner XP

**Solution:** Ajouter dans `craft-recipes-armors.js`

```javascript
// INSERTION au début du fichier, après le commentaire
{
    id: 'iron_bracers_basic',
    name: 'Bracelets de Fer Basiques',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'gloves',
    icon: '🧤',
    rarity: 'common',
    professionLevel: 1,  // ✅ NIVEAU 1
    requiredLevel: 1,
    materials: [
        { resourceId: 'ore_iron', amount: 4 },
        { resourceId: 'fabric_linen', amount: 1 }
    ],
    produces: { resourceId: 'iron_bracers_basic', amount: 1 },
    craftTime: 15,
    stats: {
        armor: 2,
        defense: 3,
        endurance: 1
    }
},

{
    id: 'iron_boots_basic',
    name: 'Bottes de Fer Basiques',
    archetype: 'tank',
    category: 'armor',
    profession: 'armorsmith',
    tier: 1,
    type: 'armor',
    slot: 'boots',
    icon: '👢',
    rarity: 'common',
    professionLevel: 2,  // ✅ NIVEAU 2
    requiredLevel: 2,
    materials: [
        { resourceId: 'ore_iron', amount: 6 },
        { resourceId: 'ore_copper', amount: 2 },
        { resourceId: 'fabric_hemp', amount: 1 }
    ],
    produces: { resourceId: 'iron_boots_basic', amount: 1 },
    craftTime: 20,
    stats: {
        armor: 4,
        defense: 4,
        endurance: 2,
        movementSpeed: -3
    }
},
```

**XP Estimée:**

- Niveau 1→2 : Craft 5-6 bracelets
- Niveau 2→3 : Craft 8-10 bottes
- **Total craft requis : ~15 objets pour débloquer iron_helmet (niveau 3)**

---

### ✅ TÂCHE 1.2 : Créer la chaîne de production CUIR

**Problème:** `fabric_simple_leather` demandé mais introuvable

**Solution:** Compléter `craft-recipes-tanner.js`

```javascript
/**
 * CRAFT RECIPES - TANNER (Tanneur)
 *
 * Le Tanneur transforme les peaux brutes des monstres en cuir utilisable
 *
 * CHAÎNE DE PRODUCTION :
 * 1. Monstres droppent monster_hide (Peau brute) - 40% drop
 * 2. Tanneur niveau 1 : 2x monster_hide → 1x fabric_simple_leather
 * 3. Monstres R2+ droppent robust_hide (Peau robuste) - 35% drop
 * 4. Tanneur niveau 10 : 2x robust_hide → 1x fabric_tanned_leather
 * 5. Monstres R4+ droppent thick_hide (Peau épaisse) - 25% drop
 * 6. Tanneur niveau 20 : 2x thick_hide → 1x fabric_hardened_leather
 */

window.CraftRecipesTanner = [
  // ============================================
  // NIVEAU 1 : CUIR SIMPLE
  // ============================================
  {
    id: "tanner_simple_leather",
    name: "Tanner le Cuir Simple",
    category: "tanning",
    profession: "tanner",
    tier: 1,
    type: "resource",
    icon: "🎒",
    rarity: "common",
    professionLevel: 1,
    requiredLevel: 1,
    materials: [
      { resourceId: "monster_hide", amount: 2 }, // Drop monstre commun
    ],
    produces: {
      resourceId: "fabric_simple_leather",
      amount: 1,
    },
    craftTime: 5,
    description: "Transforme 2 peaux brutes en 1 cuir simple utilisable pour le crafting.",
  },

  // ============================================
  // NIVEAU 10 : CUIR TANNÉ
  // ============================================
  {
    id: "tanner_tanned_leather",
    name: "Tanner le Cuir Robuste",
    category: "tanning",
    profession: "tanner",
    tier: 2,
    type: "resource",
    icon: "🎒",
    rarity: "uncommon",
    professionLevel: 10,
    requiredLevel: 10,
    materials: [
      { resourceId: "robust_hide", amount: 2 }, // Drop monstre R2+
    ],
    produces: {
      resourceId: "fabric_tanned_leather",
      amount: 1,
    },
    craftTime: 10,
    description: "Transforme 2 peaux robustes en 1 cuir tanné de haute qualité.",
  },

  // ============================================
  // NIVEAU 20 : CUIR DURCI
  // ============================================
  {
    id: "tanner_hardened_leather",
    name: "Durcir le Cuir Épais",
    category: "tanning",
    profession: "tanner",
    tier: 3,
    type: "resource",
    icon: "🎒",
    rarity: "rare",
    professionLevel: 20,
    requiredLevel: 20,
    materials: [
      { resourceId: "peau_epaisse", amount: 2 }, // Drop monstre R3+
      { resourceId: "plant_medicinal_herb", amount: 3 }, // Agent tannant
    ],
    produces: {
      resourceId: "fabric_hardened_leather",
      amount: 1,
    },
    craftTime: 15,
    description:
      "Durcie le cuir épais avec des herbes spéciales pour créer un matériau très résistant.",
  },

  // ============================================
  // NIVEAU 30 : CUIR DRACONIQUE
  // ============================================
  {
    id: "tanner_dragon_leather",
    name: "Tanner la Peau de Dragon",
    category: "tanning",
    profession: "tanner",
    tier: 4,
    type: "resource",
    icon: "🐉",
    rarity: "epic",
    professionLevel: 30,
    requiredLevel: 30,
    materials: [
      { resourceId: "dragon_scale", amount: 5 }, // Drop dragon
      { resourceId: "fabric_tanned_leather", amount: 3 },
      { resourceId: "gem_ruby", amount: 1 },
    ],
    produces: {
      resourceId: "fabric_dragon_leather",
      amount: 1,
    },
    craftTime: 30,
    description: "Tanne les écailles de dragon pour créer le cuir le plus résistant qui soit.",
  },
];
```

**Impact:**

- Tous les drops `monster_hide` deviennent utiles
- Progression claire : Niveau 1 (simple) → 10 (robuste) → 20 (durci) → 30 (dragon)
- Compatible avec système existant

---

### ✅ TÂCHE 1.3 : Corriger l'épée de fer pour la quête

**Problème:** Quête demande iron_sword mais métier blacksmith pas débloqué niveau 1

**Vérification dans quests-data.js:**

```javascript
// Chercher la quête qui demande iron_sword
```

**Solutions possibles:**

1. **Option A:** Changer la quête pour donner l'épée en récompense (au lieu de la crafter)
2. **Option B:** Débloquer blacksmith plus tôt
3. **Option C:** Changer la quête pour demander un autre craft niveau 1

**Recommandation:** Option A (moins de changements)

```javascript
// MODIFICATION dans quests-data.js
{
    id: 'main_002',
    title: '⚔️ Chasseur Débutant',
    description: 'Tuez 5 Loups Gris pour prouver votre valeur.',
    type: 'kill',
    target: 5,
    requirements: {
        quest: 'main_001',
        monsterName: 'Loup Gris'
    },
    rewards: {
        xp: 100,
        gold: 50,
        unlocks: ['gathering_tab', 'profession_woodcutting', 'profession_mining', 'profession_blacksmith'], // ✅ AJOUTER blacksmith
        items: [
            { id: 'iron_sword', amount: 1 }  // ✅ DONNER l'épée au lieu de la crafter
        ],
        message: '🌲 Onglet Récolte débloqué ! 🔨 Métier Forgeron débloqué !'
    }
}
```

---

### ✅ TÂCHE 1.4 : Ajouter recettes Forgeron niveau 1-5

**Problème:** Peu de recettes débutant pour blacksmith

**Solution:** Ajouter dans `craft-recipes-extended.js`

```javascript
// AJOUTER CES RECETTES
{
    id: 'copper_dagger',
    name: 'Dague de Cuivre',
    profession: 'blacksmith',
    professionLevel: 1,  // ✅ NIVEAU 1
    tier: 1,
    type: 'weapon',
    slot: 'weapon',
    icon: '🗡️',
    rarity: 'common',
    requiredLevel: 1,
    materials: [
        { resourceId: 'ore_copper', amount: 5 },
        { resourceId: 'wood_oak', amount: 2 }
    ],
    craftTime: 15,
    stats: {
        damage: 3,
        agility: 2,
        force: 1
    },
    description: 'Une simple dague en cuivre. Rapide mais peu puissante.'
},

{
    id: 'iron_mace',
    name: 'Masse de Fer',
    profession: 'blacksmith',
    professionLevel: 3,  // ✅ NIVEAU 3
    tier: 1,
    type: 'weapon',
    slot: 'weapon',
    icon: '🔨',
    rarity: 'common',
    requiredLevel: 3,
    materials: [
        { resourceId: 'ore_iron', amount: 12 },
        { resourceId: 'wood_ash', amount: 4 }
    ],
    craftTime: 20,
    stats: {
        damage: 6,
        force: 4,
        agility: -1
    },
    description: 'Une masse lourde qui frappe fort mais lentement.'
},

{
    id: 'copper_axe',
    name: 'Hache de Combat en Cuivre',
    profession: 'blacksmith',
    professionLevel: 4,  // ✅ NIVEAU 4
    tier: 1,
    type: 'weapon',
    slot: 'weapon',
    icon: '🪓',
    rarity: 'uncommon',
    requiredLevel: 4,
    materials: [
        { resourceId: 'ore_copper', amount: 14 },
        { resourceId: 'ore_iron', amount: 6 },
        { resourceId: 'wood_maple', amount: 5 }
    ],
    craftTime: 25,
    stats: {
        damage: 8,
        force: 5,
        endurance: 2
    },
    description: 'Hache polyvalente pour le combat rapproché.'
}
```

---

## ⚡ PHASE 2 : UTILISATION DES DROPS

### ✅ TÂCHE 2.1 : Recettes avec griffes_usees

```javascript
// AJOUTER dans craft-recipes-extended.js

{
    id: 'claw_dagger',
    name: 'Dague à Griffes',
    profession: 'blacksmith',
    professionLevel: 5,
    tier: 1,
    type: 'weapon',
    slot: 'weapon',
    icon: '🗡️',
    rarity: 'uncommon',
    requiredLevel: 5,
    materials: [
        { resourceId: 'ore_iron', amount: 8 },
        { resourceId: 'griffes_usees', amount: 6 },  // ✅ DROP utilisé
        { resourceId: 'wood_oak', amount: 3 }
    ],
    craftTime: 25,
    stats: {
        damage: 10,
        agility: 4,
        force: 2,
        critChance: 5  // Bonus critique grâce aux griffes
    },
    description: 'Dague renforcée avec des griffes acérées. Augmente les chances de coup critique.'
},

{
    id: 'claw_gauntlets',
    name: 'Gantelets à Griffes',
    profession: 'armorsmith',
    professionLevel: 8,
    tier: 2,
    type: 'armor',
    slot: 'gloves',
    icon: '🧤',
    rarity: 'uncommon',
    requiredLevel: 8,
    materials: [
        { resourceId: 'ore_tin', amount: 10 },
        { resourceId: 'griffes_usees', amount: 8 },  // ✅ DROP utilisé
        { resourceId: 'fabric_simple_leather', amount: 2 }
    ],
    craftTime: 30,
    stats: {
        armor: 5,
        defense: 4,
        force: 3,
        agility: 2
    },
    description: 'Gantelets dotés de griffes rétractables pour attaquer et défendre.'
}
```

---

### ✅ TÂCHE 2.2 : Recettes avec plumes_sombres

```javascript
// AJOUTER dans craft-recipes-data.js (section Tailleur)

{
    id: 'feather_cloak',
    name: 'Cape à Plumes',
    profession: 'tailor',
    professionLevel: 4,
    tier: 1,
    type: 'cloth',
    slot: 'back',
    icon: '🧥',
    rarity: 'uncommon',
    requiredLevel: 4,
    materials: [
        { resourceId: 'fabric_linen', amount: 10 },
        { resourceId: 'plumes_sombres', amount: 15 },  // ✅ DROP utilisé
        { resourceId: 'fabric_hemp', amount: 4 }
    ],
    craftTime: 20,
    stats: {
        defense: 4,
        agility: 6,
        intelligence: 2,
        movementSpeed: 5  // Bonus vitesse grâce aux plumes
    },
    description: 'Cape légère ornée de plumes. Augmente la vitesse de déplacement.'
},

{
    id: 'feather_boots',
    name: 'Bottes à Plumes',
    profession: 'tailor',
    professionLevel: 6,
    tier: 1,
    type: 'cloth',
    slot: 'boots',
    icon: '👞',
    rarity: 'rare',
    requiredLevel: 6,
    materials: [
        { resourceId: 'fabric_cotton', amount: 8 },
        { resourceId: 'plumes_sombres', amount: 20 },  // ✅ DROP utilisé
        { resourceId: 'fabric_simple_leather', amount: 3 }
    ],
    craftTime: 25,
    stats: {
        defense: 3,
        agility: 8,
        movementSpeed: 8,
        dodgeChance: 5  // Bonus esquive grâce aux plumes
    },
    description: 'Bottes ultra-légères permettant de se déplacer silencieusement.'
}
```

---

### ✅ TÂCHE 2.3 : Recettes avec crocs_venimeux

```javascript
// AJOUTER dans craft-recipes-consumables.js

{
    id: 'venom_antidote',
    name: 'Antidote au Venin',
    profession: 'alchemist',
    professionLevel: 5,
    tier: 1,
    type: 'consumable',
    slot: 'consumable',
    icon: '💊',
    rarity: 'uncommon',
    requiredLevel: 5,
    materials: [
        { resourceId: 'plant_medicinal_herb', amount: 4 },
        { resourceId: 'crocs_venimeux', amount: 2 },  // ✅ DROP utilisé
        { resourceId: 'plant_sage', amount: 2 }
    ],
    produces: { resourceId: 'venom_antidote', amount: 3 },
    craftTime: 18,
    effects: {
        removePoison: true,
        healAmount: 40,
        duration: 0,
        description: 'Retire le poison et restaure 40 PV.'
    }
},

{
    id: 'poison_vial',
    name: 'Fiole de Poison',
    profession: 'alchemist',
    professionLevel: 8,
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🧪',
    rarity: 'rare',
    requiredLevel: 8,
    materials: [
        { resourceId: 'crocs_venimeux', amount: 4 },  // ✅ DROP utilisé
        { resourceId: 'plant_nettle', amount: 6 },
        { resourceId: 'fish_deep_eel', amount: 1 }
    ],
    produces: { resourceId: 'poison_vial', amount: 2 },
    craftTime: 30,
    effects: {
        applyPoison: true,
        poisonDamage: 10,  // 10 dégâts/sec pendant 10 sec
        poisonDuration: 10,
        description: 'Applique un poison mortel infligeant 100 dégâts sur 10 secondes.'
    }
},

{
    id: 'venom_blade_oil',
    name: 'Huile de Lame Venimeuse',
    profession: 'alchemist',
    professionLevel: 12,
    tier: 2,
    type: 'consumable',
    slot: 'consumable',
    icon: '🗡️',
    rarity: 'epic',
    requiredLevel: 12,
    materials: [
        { resourceId: 'crocs_venimeux', amount: 6 },  // ✅ DROP utilisé
        { resourceId: 'plant_ghostbloom', amount: 3 },
        { resourceId: 'ore_tin', amount: 2 }
    ],
    produces: { resourceId: 'venom_blade_oil', amount: 1 },
    craftTime: 45,
    effects: {
        weaponEnchant: 'poison',
        poisonDamage: 20,
        duration: 600,  // 10 minutes
        description: 'Enduire l\'arme de poison. Chaque coup inflige 20 dégâts de poison supplémentaires pendant 10 minutes.'
    }
}
```

---

## 🎯 PHASE 3 : ÉQUILIBRAGE DROPS

### ✅ TÂCHE 3.1 : Réviser drops-data.js

**Tableau de référence pour dropChance:**

```javascript
/**
 * GUIDE TAUX DE DROP
 *
 * MONSTRES COMMUNS (Common Monsters)
 * - Drops communs (common) : 50-60%
 * - Drops peu communs (uncommon) : 20-30%
 * - Drops rares (rare) : 5-10%
 *
 * MONSTRES RARES (Rare Monsters)
 * - Drops communs : 70-80%
 * - Drops peu communs : 40-50%
 * - Drops rares : 15-25%
 *
 * MONSTRES ÉLITES (Elite Monsters)
 * - Drops peu communs : 80-90%
 * - Drops rares : 50-60%
 * - Drops épiques : 20-30%
 *
 * BOSS
 * - Drops rares : 100% (garanti)
 * - Drops épiques : 60-80%
 * - Drops légendaires : 30-40%
 */
```

**Exemples de corrections à apporter:**

```javascript
// AVANT (incohérent)
monster_hide: {
  dropChance: 0.4; // 40% OK pour monstre commun
}

// APRÈS (ajustements)
monster_hide: {
  dropChance: 0.55; // 55% pour assurer approvisionnement régulier
}

// AVANT (trop bas)
griffes_usees: {
  dropChance: 0.25; // 25% trop rare
}

// APRÈS
griffes_usees: {
  dropChance: 0.35; // 35% meilleur pour craft
}

// AVANT (trop haut)
robust_hide: {
  dropChance: 0.35; // Sur monstre commun R2
}

// APRÈS
robust_hide: {
  dropChance: 0.28; // Légèrement plus rare (uncommon drop)
}
```

---

### ✅ TÂCHE 3.2 : Ajouter drops manquants

**Nouveaux drops à ajouter pour compléter le système:**

```javascript
// AJOUTER dans drops-data.js

// ========== DROPS CRAFT MATÉRIAUX ==========

monster_fang: {
    id: 'monster_fang',
    name: "Croc de Monstre",
    description: "Croc solide pouvant servir de renfort pour les armures.",
    icon: "🦷",
    type: "resource",
    rarity: "common",
    dropChance: 0.30,
    quantity: { min: 1, max: 2 },
    sellPrice: 6,
    usage: "Utilisé dans craft d'armures lourdes (renfort)"
},

monster_bone: {
    id: 'monster_bone',
    name: "Os de Monstre",
    description: "Os robuste pouvant être utilisé pour fabriquer des armes ou des armures.",
    icon: "🦴",
    type: "resource",
    rarity: "common",
    dropChance: 0.25,
    quantity: { min: 1, max: 3 },
    sellPrice: 5,
    usage: "Utilisé dans craft d'armes (manches) et d'armures (renforts)"
},

monster_scale: {
    id: 'monster_scale',
    name: "Écaille de Monstre",
    description: "Écaille dure offrant une excellente protection.",
    icon: "🐉",
    type: "resource",
    rarity: "uncommon",
    dropChance: 0.20,  // Monstre R2+
    quantity: { min: 1, max: 2 },
    sellPrice: 15,
    usage: "Utilisé dans craft d'armures moyennes/lourdes (protection)"
},

monster_heart: {
    id: 'monster_heart',
    name: "Cœur de Monstre",
    description: "Cœur pulsant d'énergie magique. Ingrédient alchimique précieux.",
    icon: "❤️",
    type: "resource",
    rarity: "rare",
    dropChance: 0.08,  // Monstre R3+
    quantity: { min: 1, max: 1 },
    sellPrice: 50,
    usage: "Utilisé dans potions puissantes et enchantements"
},

monster_essence: {
    id: 'monster_essence',
    name: "Essence de Monstre",
    description: "Essence magique concentrée extraite d'une créature puissante.",
    icon: "✨",
    type: "resource",
    rarity: "epic",
    dropChance: 0.05,  // Monstre élite/boss
    quantity: { min: 1, max: 1 },
    sellPrice: 100,
    usage: "Utilisé dans craft légendaire et transmutation avancée"
},

dragon_scale: {
    id: 'dragon_scale',
    name: "Écaille de Dragon",
    description: "Écaille quasi-indestructible d'un dragon. Matériau légendaire.",
    icon: "🐲",
    type: "resource",
    rarity: "legendary",
    dropChance: 0.80,  // Boss dragon uniquement
    quantity: { min: 2, max: 5 },
    sellPrice: 500,
    usage: "Utilisé dans craft épique/légendaire et équipement dragon"
}
```

---

## 🏆 PHASE 4 : SYSTÈME DE PROGRESSION MÉTIERS

### ✅ TÂCHE 4.1 : Implémenter bonus par niveau

**Modifier crafting-manager.js pour ajouter:**

```javascript
/**
 * Calcul des bonus de métier par niveau
 * Plus le niveau est élevé, plus on craft vite et avec meilleure qualité
 */
getProfessionBonuses(profession, level) {
    const bonuses = {
        craftSpeed: 0,      // Réduction temps de craft (%)
        qualityBonus: 0,    // Bonus qualité items (%)
        multiCraftChance: 0, // Chance de craft double (%)
        materialSaving: 0   // Chance d'économiser 1 matériau (%)
    };

    // Paliers de bonus tous les 5 niveaux
    if (level >= 5) {
        bonuses.craftSpeed = 10;
        bonuses.qualityBonus = 5;
    }
    if (level >= 10) {
        bonuses.craftSpeed = 20;
        bonuses.qualityBonus = 10;
        bonuses.multiCraftChance = 5;
    }
    if (level >= 15) {
        bonuses.craftSpeed = 30;
        bonuses.qualityBonus = 15;
        bonuses.multiCraftChance = 10;
    }
    if (level >= 20) {
        bonuses.craftSpeed = 40;
        bonuses.qualityBonus = 20;
        bonuses.multiCraftChance = 15;
        bonuses.materialSaving = 5;
    }
    if (level >= 25) {
        bonuses.craftSpeed = 50;
        bonuses.qualityBonus = 25;
        bonuses.multiCraftChance = 20;
        bonuses.materialSaving = 10;
    }
    if (level >= 30) {
        bonuses.craftSpeed = 60;
        bonuses.qualityBonus = 30;
        bonuses.multiCraftChance = 25;
        bonuses.materialSaving = 15;
    }
    if (level >= 40) {
        bonuses.craftSpeed = 80;
        bonuses.qualityBonus = 40;
        bonuses.multiCraftChance = 35;
        bonuses.materialSaving = 20;
    }
    if (level >= 50) {  // MASTER CRAFTSMAN
        bonuses.craftSpeed = 100;   // Craft 2x plus vite
        bonuses.qualityBonus = 50;  // +50% qualité
        bonuses.multiCraftChance = 50;  // 50% double craft
        bonuses.materialSaving = 25;    // 25% économie matériaux
    }

    return bonuses;
}

/**
 * Appliquer les bonus lors du craft
 */
startCraft(recipeId, sellDirectly = false) {
    // ... code existant ...

    const recipe = this.getAllRecipes().find(r => r.id === recipeId);
    const profession = this.game.professionManager.getProfession(recipe.profession);

    // 🎯 APPLIQUER BONUS
    const bonuses = this.getProfessionBonuses(recipe.profession, profession.level);

    // 1. Réduction temps de craft
    const craftTime = recipe.craftTime * (1 - bonuses.craftSpeed / 100);

    // 2. Chance d'économiser matériaux
    for (const material of recipe.materials) {
        if (Math.random() * 100 < bonuses.materialSaving) {
            console.log(`✨ Économie de matériaux ! -1 ${material.resourceId}`);
            material.amount = Math.max(1, material.amount - 1);
        }
    }

    // ... consommer matériaux ...

    // 3. Chance de craft double
    let craftAmount = 1;
    if (Math.random() * 100 < bonuses.multiCraftChance) {
        craftAmount = 2;
        console.log(`🎉 DOUBLE CRAFT ! x2 ${recipe.name}`);
    }

    // 4. Bonus qualité
    const quality = this.generateQuality(recipe.profession, bonuses.qualityBonus);

    // ... donner items ...
}
```

---

### ✅ TÂCHE 4.2 : Recettes Milestone (Niveaux 10, 20, 30, 50)

**Ajouter ces recettes spéciales:**

```javascript
// ============================================
// RECETTES MILESTONE - Récompenses de progression
// ============================================

// FORGERON NIVEAU 10
{
    id: 'master_hammer',
    name: '🔨 Marteau de Maître Forgeron',
    profession: 'blacksmith',
    professionLevel: 10,  // MILESTONE
    tier: 2,
    type: 'tool',
    slot: 'tool',
    icon: '🔨',
    rarity: 'rare',
    requiredLevel: 10,
    materials: [
        { resourceId: 'ore_tin', amount: 20 },
        { resourceId: 'ore_iron', amount: 15 },
        { resourceId: 'wood_walnut', amount: 10 },
        { resourceId: 'gem_sapphire', amount: 1 }
    ],
    craftTime: 60,
    stats: {
        professionXP: 25,  // +25% XP Forgeron
        craftSpeed: 15,    // +15% vitesse craft Forgeron
        force: 5
    },
    description: '⭐ RECETTE MILESTONE - Outil de maître augmentant l\'efficacité du forgeron.'
},

// ARMURIER NIVEAU 20
{
    id: 'master_anvil',
    name: '🔥 Enclume du Maître Armurier',
    profession: 'armorsmith',
    professionLevel: 20,  // MILESTONE
    tier: 3,
    type: 'tool',
    slot: 'tool',
    icon: '⚒️',
    rarity: 'epic',
    requiredLevel: 20,
    materials: [
        { resourceId: 'ore_mithril', amount: 30 },
        { resourceId: 'ore_obsidian', amount: 20 },
        { resourceId: 'monster_essence', amount: 5 }
    ],
    craftTime: 90,
    stats: {
        professionXP: 35,      // +35% XP Armurier
        qualityBonus: 20,      // +20% qualité armures
        defense: 10
    },
    description: '⭐ RECETTE MILESTONE - Enclume légendaire améliorant toute production d\'armures.'
},

// ALCHIMISTE NIVEAU 30
{
    id: 'philosophers_stone',
    name: '💎 Pierre Philosophale',
    profession: 'alchemist',
    professionLevel: 30,  // MILESTONE
    tier: 4,
    type: 'artifact',
    slot: 'artifact',
    icon: '💎',
    rarity: 'legendary',
    requiredLevel: 30,
    materials: [
        { resourceId: 'gem_diamond', amount: 5 },
        { resourceId: 'plant_soulroot', amount: 20 },
        { resourceId: 'monster_essence', amount: 10 },
        { resourceId: 'ore_orichalcum', amount: 15 }
    ],
    craftTime: 180,
    stats: {
        professionXP: 50,          // +50% XP Alchimiste
        multiCraftChance: 25,      // +25% double potion
        intelligence: 15,
        wisdom: 15
    },
    description: '⭐ RECETTE MILESTONE - Artefact légendaire doublant l\'efficacité alchimique.'
},

// TANNEUR NIVEAU 50 (MASTER)
{
    id: 'master_tanning_kit',
    name: '🎖️ Kit de Tannage Légendaire',
    profession: 'tanner',
    professionLevel: 50,  // MILESTONE MASTER
    tier: 5,
    type: 'artifact',
    slot: 'artifact',
    icon: '🎖️',
    rarity: 'mythic',
    requiredLevel: 50,
    materials: [
        { resourceId: 'fabric_dragon_leather', amount: 10 },
        { resourceId: 'dragon_scale', amount: 20 },
        { resourceId: 'monster_essence', amount: 50 },
        { resourceId: 'gem_eternal', amount: 3 }
    ],
    craftTime: 300,
    stats: {
        professionXP: 100,         // DOUBLE XP Tanneur
        materialSaving: 50,        // 50% économie matériaux
        craftSpeed: 75,            // 75% vitesse craft
        agility: 25,
        endurance: 25
    },
    description: '⭐ MASTER CRAFTSMAN - Kit ultime réservé aux maîtres tanneurs légendaires.'
}
```

---

## 📚 PHASE 5 : DOCUMENTATION

### ✅ TÂCHE 5.1 : Créer GUIDE-RESSOURCES.md

```markdown
# 📖 Guide des Ressources - Idle RPG

## 🌲 BOIS (Woodcutting)

**Déblocage:** Quête M02  
**Source:** Auto-récolte (Gathering)  
**Progression:** Tier 1 (niveau 1) → Tier 7 (niveau 70)

| Ressource     | Niveau | Rareté   | Usage Principal           |
| ------------- | ------ | -------- | ------------------------- |
| Bois de Chêne | 1      | Common   | Armes niveau 1-5, manches |
| Bois de Frêne | 4      | Common   | Armes niveau 4-8          |
| Bois d'Érable | 8      | Uncommon | Armes niveau 8-12         |

... (compléter)

---

## ⛏️ MINERAIS (Mining)

**Déblocage:** Quête M02  
**Source:** Auto-récolte (Gathering)  
**Progression:** Tier 1 (niveau 1) → Tier 7 (niveau 70)

| Ressource | Niveau | Rareté   | Usage Principal           |
| --------- | ------ | -------- | ------------------------- |
| Fer       | 1      | Common   | Armes/Armures niveau 1-10 |
| Cuivre    | 4      | Common   | Armes/Armures niveau 4-10 |
| Étain     | 8      | Uncommon | Armures niveau 8-15       |

... (compléter)

---

## 🌿 PLANTES (Herbalist)

**Déblocage:** Quête M16  
**Source:** Métier Herboriste  
**Usage:** Potions (Alchimiste)

... (compléter)

---

## 🎣 POISSONS (Fisher)

**Déblocage:** Quête M17  
**Source:** Métier Pêcheur  
**Usage:** Plats (Poissonnier)

... (compléter)

---

## 🧵 TISSUS & FIBRES (Farming/Tanning)

**Déblocage:** Ferme (niveau 15) ou Métier Tanneur  
**Sources multiples:**

1. **Ferme (ville)** : Fibres végétales (lin, chanvre, coton, laine, soie)
2. **Tanneur (métier)** : Cuirs (simple, tanné, durci, draconique)

### Tissus de Ferme

| Ressource        | Source      | Usage                       |
| ---------------- | ----------- | --------------------------- |
| Fibre de Lin     | Ferme Niv.1 | Vêtements légers, doublures |
| Fibre de Chanvre | Ferme Niv.1 | Renforts, cordes            |
| Coton            | Ferme Niv.2 | Vêtements confortables      |
| Laine            | Ferme Niv.3 | Vêtements chauds            |
| Soie             | Ferme Niv.5 | Vêtements de luxe           |

### Cuirs (Tanneur)

| Ressource       | Recette Tanneur | Matériau Drop   | Usage                        |
| --------------- | --------------- | --------------- | ---------------------------- |
| Cuir Simple     | Niveau 1        | 2x monster_hide | Armures légères niveau 1-10  |
| Cuir Tanné      | Niveau 10       | 2x robust_hide  | Armures légères niveau 10-20 |
| Cuir Durci      | Niveau 20       | 2x peau_epaisse | Armures légères niveau 20-30 |
| Cuir Draconique | Niveau 30       | 5x dragon_scale | Armures légères endgame      |

---

## 🦴 DROPS DE MONSTRES

**Source:** Combat (manuel ou auto)  
**Usage:** Crafting spécialisé

### Drops Craft Essentiels

| Drop               | Monstre     | Drop% | Recettes                  |
| ------------------ | ----------- | ----- | ------------------------- |
| Peau de Monstre    | Communs     | 55%   | → Cuir Simple (Tanneur)   |
| Peau Robuste       | R2+         | 28%   | → Cuir Tanné (Tanneur)    |
| Griffes Usées      | Loups       | 35%   | Dague/Gantelets à Griffes |
| Plumes Sombres     | Corbeaux    | 50%   | Cape/Bottes à Plumes      |
| Crocs Venimeux     | Serpents    | 50%   | Antidote, Poison, Huile   |
| Os de Monstre      | Tous        | 25%   | Armes (manches), Armures  |
| Croc de Monstre    | Prédateurs  | 30%   | Armures (renforts)        |
| Écaille de Monstre | R2+         | 20%   | Armures moyennes/lourdes  |
| Cœur de Monstre    | R3+         | 8%    | Potions puissantes        |
| Essence de Monstre | Élites/Boss | 5%    | Craft légendaire          |
| Écaille de Dragon  | Dragons     | 80%   | Équipement draconique     |

---

## 💎 GEMMES (Mining avancé)

**Déblocage:** Niveau mining 10+  
**Source:** Auto-récolte rare  
**Usage:** Bijoux (Bijoutier), Enchantements

... (compléter)

---

## 🔄 TRANSMUTATION

**Déblocage:** Quête M18  
**Usage:** Convertir ressources basses → hautes

**Ratio standard:** 100:1 pour toutes conversions  
**Temps:** Variable selon tier

### Exemples

- 100x Bois de Chêne → 1x Bois d'Érable (5 sec)
- 100x Fer → 1x Cuivre (5 sec)
- 100x Peau de Monstre → 1x Cuir Simple (10 sec) _[À ajouter]_

**Conseil:** Utiliser transmutation uniquement en endgame quand vous avez millions/milliards de ressources T1
```

---

### ✅ TÂCHE 5.2 : Créer GUIDE-PROGRESSION-METIERS.md

```markdown
# 🎓 Guide de Progression des Métiers

## 🔨 FORGERON (Blacksmith)

**Déblocage:** Quête M02  
**Spécialité:** Armes métalliques

### Progression Rapide

1. **Niveau 1-3** : Craft Dague de Cuivre (×15)
2. **Niveau 3-5** : Craft Épée de Fer (×20)
3. **Niveau 5-8** : Craft Masse de Fer (×25)
4. **Niveau 8-10** : Craft Hache de Combat (×30)
5. **Niveau 10** : ⭐ MILESTONE - Crafter Marteau de Maître (+25% XP permanent)

### Recettes Clés

- **Dague de Cuivre** (Niv.1) : Première arme craftable
- **Épée de Fer** (Niv.1) : Arme de base polyvalente
- **Dague à Griffes** (Niv.5) : Utilise drops (griffes_usees)
- **Marteau de Maître** (Niv.10) : ⭐ Outil milestone (+25% XP)

---

## 🛡️ ARMURIER (Armorsmith)

**Déblocage:** Quête M05 (après Forgeron)  
**Spécialité:** Armures métalliques lourdes

### Progression Rapide

1. **Niveau 1-2** : Craft Bracelets de Fer Basiques (×12)
2. **Niveau 2-3** : Craft Bottes de Fer Basiques (×10)
3. **Niveau 3-5** : Craft Casque de Fer (×15)
4. **Niveau 5-8** : Craft Plastron de Fer (×20)
5. **Niveau 8-12** : Craft Gantelets à Griffes (×25) _[Utilise drops]_
6. **Niveau 12-20** : Craft armures Acier
7. **Niveau 20** : ⭐ MILESTONE - Enclume de Maître (+35% XP, +20% qualité)

### Recettes Clés

- **Bracelets de Fer** (Niv.1) : Première recette - Débute le métier ✅
- **Bottes de Fer** (Niv.2) : Montée niveau 2-3
- **Gantelets à Griffes** (Niv.8) : Utilise drops (griffes_usees)

---

## 🎒 TANNEUR (Tanner)

**Déblocage:** Quête M04  
**Spécialité:** Transformation peaux → cuir, armures légères

### Progression Rapide

1. **Niveau 1-5** : Craft Cuir Simple (×50) _[Transforme monster_hide]_
2. **Niveau 5-10** : Craft armures cuir (tuniques, capuches, pantalons)
3. **Niveau 10-15** : Craft Cuir Tanné (×40) _[Transforme robust_hide]_
4. **Niveau 15-20** : Craft armures cuir robuste
5. **Niveau 20** : Débloquer Cuir Durci
6. **Niveau 30** : Craft Cuir Draconique _[Utilise dragon_scale]_
7. **Niveau 50** : ⭐ MASTER - Kit Légendaire (double XP, 50% économie)

### Recettes Clés

- **Cuir Simple** (Niv.1) : 2x monster_hide → 1x cuir ✅ ESSENTIEL
- **Tunique de Cuir** (Niv.2) : Première armure craftable
- **Cuir Tanné** (Niv.10) : 2x robust_hide → 1x cuir tanné ✅
- **Cuir Durci** (Niv.20) : 2x peau_epaisse → 1x cuir durci ✅

### ⭐ CHAÎNE DE PRODUCTION
```

Combat Monstres → monster_hide (55% drop)
↓
Tanneur Niv.1 → Cuir Simple
↓
Tanneur Niv.2+ → Tunique/Cape/Pantalon de Cuir

```

---

## 💎 BIJOUTIER (Jeweler)
**Déblocage:** Quête M07
**Spécialité:** Bijoux, accessoires

### Progression Rapide
1. **Niveau 1-3** : Craft Anneau de Bronze (×12)
2. **Niveau 3-5** : Craft Amulette d'Argent (×15)
3. **Niveau 5-10** : Craft bijoux améthyste/saphir
4. **Niveau 10+** : Craft bijoux diamant/rubis

---

## 🧪 ALCHIMISTE (Alchemist)
**Déblocage:** Quête M16
**Spécialité:** Potions, élixirs, poisons

### Progression Rapide
1. **Niveau 1-3** : Craft Petite Potion de Vie (×20)
2. **Niveau 3-5** : Craft Potion de Vie (×25)
3. **Niveau 5-8** : Craft Antidote au Venin (×15) *[Utilise crocs_venimeux]*
4. **Niveau 8-12** : Craft Fiole de Poison (×20) *[Utilise drops]*
5. **Niveau 12-20** : Craft Potions de stats (Force, Agilité, Intelligence)
6. **Niveau 20-30** : Craft élixirs puissants
7. **Niveau 30** : ⭐ MILESTONE - Pierre Philosophale (+50% XP, +25% double craft)

### Recettes Clés
- **Petite Potion de Vie** (Niv.1) : Soin basique
- **Antidote au Venin** (Niv.5) : Utilise drops (crocs_venimeux) ✅
- **Fiole de Poison** (Niv.8) : Utilise drops (crocs_venimeux) ✅
- **Huile de Lame** (Niv.12) : Enchantement arme temporaire

---

## 👗 TAILLEUR (Tailor)
**Déblocage:** Quête M08
**Spécialité:** Vêtements en tissu, robes mages

### Progression Rapide
1. **Niveau 1-3** : Craft Tunique de Lin (×15)
2. **Niveau 3-5** : Craft Robe de Laine (×20)
3. **Niveau 4-6** : Craft Cape à Plumes (×18) *[Utilise plumes_sombres]*
4. **Niveau 6-8** : Craft Bottes à Plumes (×15) *[Utilise drops]*
5. **Niveau 8+** : Craft Gants Enchantés, robes soie

### Recettes Clés
- **Tunique de Lin** (Niv.1) : Vêtement de base
- **Cape à Plumes** (Niv.4) : Utilise drops (plumes_sombres) ✅
- **Bottes à Plumes** (Niv.6) : Utilise drops (plumes_sombres) ✅
- **Gants Enchantés** (Niv.8) : +10% XP métiers

---

## 🐟 POISSONNIER (Fishmonger)
**Déblocage:** Quête M17
**Spécialité:** Plats cuisinés, buffs temporaires

### Progression Rapide
1. **Niveau 1-3** : Craft Poisson Grillé (×20)
2. **Niveau 3-5** : Craft Soupe de Poisson (×25)
3. **Niveau 5-10** : Craft Sushi de Qualité (×30)
4. **Niveau 10+** : Craft Festin de la Mer

---

## 🎯 CONSEILS GÉNÉRAUX

### Synergie Métiers
1. **Mining + Woodcutting** → Forgeron + Armurier
2. **Combat (Drops)** → Tanneur
3. **Herbalist** → Alchimiste
4. **Fisher** → Poissonnier
5. **Farming (Ville)** → Tailleur

### Ordre Optimal de Déblocage
1. **Forgeron** (M02) - Armes de base
2. **Tanneur** (M04) - Armures légères + transformer drops
3. **Armurier** (M05) - Armures lourdes
4. **Bijoutier** (M07) - Accessoires
5. **Tailleur** (M08) - Vêtements mages
6. **Alchimiste** (M16) - Potions
7. **Poissonnier** (M17) - Buffs nourriture

### Erreurs à Éviter
❌ Ne pas vendre monster_hide/robust_hide → Les garder pour Tanneur
❌ Ne pas ignorer les drops (griffes, plumes, crocs) → Craft spécialisé
❌ Ne pas rush trop vite → Monter TOUS les métiers progressivement
❌ Ne pas gaspiller ressources rares sur crafts inutiles

### Bonus par Niveau
- **Niveau 5** : +10% vitesse, +5% qualité
- **Niveau 10** : +20% vitesse, +10% qualité, 5% double craft, ⭐ MILESTONE
- **Niveau 15** : +30% vitesse, +15% qualité, 10% double craft
- **Niveau 20** : +40% vitesse, +20% qualité, 15% double craft, 5% économie, ⭐ MILESTONE
- **Niveau 30** : +60% vitesse, +30% qualité, 25% double craft, 15% économie, ⭐ MILESTONE
- **Niveau 50** : +100% vitesse, +50% qualité, 50% double craft, 25% économie, ⭐ MASTER
```

---

## ✅ CHECKLIST FINALE

### Phase 1 : Corrections Critiques

- [ ] Ajouter 2 recettes Armurier niveau 1-2
- [ ] Compléter craft-recipes-tanner.js (4 recettes cuir)
- [ ] Corriger quête épée de fer
- [ ] Ajouter 3 recettes Forgeron niveau 1-5

### Phase 2 : Utilisation Drops

- [ ] 2 recettes avec griffes_usees
- [ ] 2 recettes avec plumes_sombres
- [ ] 3 recettes avec crocs_venimeux
- [ ] Ajouter 6 nouveaux drops (fang, bone, scale, heart, essence, dragon_scale)

### Phase 3 : Équilibrage

- [ ] Réviser dropChance de TOUS les drops selon tableau
- [ ] Tester drops sur 100 combats
- [ ] Valider cohérence taux par rareté monstre

### Phase 4 : Système Métiers

- [ ] Implémenter getProfessionBonuses() dans crafting-manager.js
- [ ] Ajouter 4 recettes milestone (niveaux 10, 20, 30, 50)
- [ ] Tester progression 1-50 pour chaque métier

### Phase 5 : Documentation

- [ ] Créer GUIDE-RESSOURCES.md
- [ ] Créer GUIDE-PROGRESSION-METIERS.md
- [ ] Mettre à jour README.md avec liens guides

### Tests Finaux

- [ ] Tester armurier niveau 1 → 10
- [ ] Tester tanneur transformation peaux → cuir
- [ ] Vérifier toutes quêtes faisables
- [ ] Valider drops utilisés dans au moins 2 recettes
- [ ] Tester transmutation drops

---

**Temps estimé total : 12-15 heures**  
**Impact : Système crafting cohérent, équilibré et jouable du début à la fin**
