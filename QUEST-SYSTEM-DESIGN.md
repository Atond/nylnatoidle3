# 🗺️ SYSTÈME DE QUÊTES - PLAN COMPLET

> **Date** : 25 Octobre 2025  
> **Objectif** : Créer 30+ quêtes pour guider la progression et débloquer toutes les fonctionnalités

---

## 🎯 PHILOSOPHIE DU SYSTÈME

### **Principe 1 : Tout est Débloqué par Quêtes**

```
❌ AVANT : Le joueur peut tout faire dès le début
- Auto-combat disponible immédiatement
- Tous les onglets visibles
- Tous les métiers accessibles
- Confusion totale (trop de choix)

✅ APRÈS : Progression guidée par quêtes
- Tutoriel quête par quête
- Déblocage progressif des fonctionnalités
- Récompenses claires et satisfaisantes
- Le joueur sait toujours quoi faire
```

---

### **Principe 2 : Les Niveaux de Métiers ont un Sens**

```
❌ AVANT : Niveau métier = juste débloquer recettes
✅ APRÈS : Niveau métier = quêtes spéciales + bonus

Exemple Forgeron :
- Niveau 1 : Débloquer métier
- Niveau 3 : Quête "Maître Apprenti" → Récompense +5% vitesse craft
- Niveau 5 : Débloquer Steel recipes
- Niveau 10 : Quête "Forgeron Compétent" → Récompense +10% stats armes craftées
- Niveau 15 : Débloquer Mithril recipes
- Niveau 20 : Quête "Maître Forgeron" → Titre + Recette légendaire
```

---

### **Principe 3 : Auto-Features = Récompenses de Quêtes**

```
Fonctionnalités automatiques débloquées par quêtes :

🔒 Auto-Combat → Quête "Guerrier Aguerri" (niveau 5, 50 kills)
🔒 Auto-Récolte Bois → Quête "Bûcheron Expert" (métier 5)
🔒 Auto-Récolte Minerai → Quête "Mineur Expert" (métier 5)
🔒 Auto-Pêche → Quête "Pêcheur Expert" (métier 5)
🔒 Auto-Herboristerie → Quête "Herboriste Expert" (métier 5)
🔒 Onglet Ville → Quête "Fondateur" (tuer Boss R1)
🔒 Onglet Dragons → Quête "Dompteur" (niveau 15, Boss R2)
```

---

## 📜 STRUCTURE DES QUÊTES

### **Quêtes Principales (Main Quests)** 🌟

Progression narrative et déblocage des régions.

```javascript
{
  id: 'main_001',
  title: '🌟 Les Premiers Pas',
  description: 'Tuez votre premier monstre pour commencer l\'aventure.',
  type: 'kill',
  target: 1,
  difficulty: 'tutorial',
  isMainQuest: true,

  requirements: {},

  rewards: {
    xp: 50,
    gold: 20,
    unlocks: ['combat_log', 'inventory'],
    message: 'Vous avez appris les bases du combat !'
  },

  nextQuest: 'main_002'
}
```

---

### **Quêtes de Métier (Profession Quests)** 🔨

Déblocage et maîtrise des métiers.

```javascript
{
  id: 'prof_blacksmith_001',
  title: '🔨 Apprenti Forgeron',
  description: 'Craftez votre première arme en fer.',
  type: 'craft',
  target: 1,
  profession: 'blacksmith',

  requirements: {
    quest: 'main_005', // Débloquer onglet Crafting
    professionLevel: 1
  },

  rewards: {
    xp: 100,
    gold: 50,
    professionXP: { blacksmith: 200 },
    unlocks: ['blacksmith_tier_2'],
    item: { id: 'steel_ingot', amount: 5 }
  }
}
```

---

### **Quêtes d'Automatisation (Automation Quests)** ⚙️

Déblocage des fonctionnalités automatiques.

```javascript
{
  id: 'auto_combat',
  title: '⚔️ Guerrier Aguerri',
  description: 'Prouvez votre expérience en tuant 50 monstres.',
  type: 'kill',
  target: 50,

  requirements: {
    level: 5
  },

  rewards: {
    xp: 500,
    gold: 200,
    unlocks: ['auto_combat'], // ⚡ DÉBLOCAGE AUTO-COMBAT
    message: 'Vous pouvez maintenant combattre automatiquement !'
  }
}
```

---

### **Quêtes de Zone (Zone Quests)** 🗺️

Déblocage des nouvelles régions.

```javascript
{
  id: 'zone_r2',
  title: '⛰️ Vers les Montagnes',
  description: 'Battez le Boss des Plaines pour débloquer la Région 2.',
  type: 'boss_kill',
  target: 1,
  boss: 'bete_prairies',

  requirements: {
    level: 8,
    quest: 'main_010'
  },

  rewards: {
    xp: 1000,
    gold: 500,
    unlocks: ['region_2', 'town_tab'],
    message: 'La Région 2 : Les Montagnes Grises est débloquée !'
  }
}
```

---

## 🎮 LISTE COMPLÈTE DES 40 QUÊTES

### **📖 CHAPITRE 1 : TUTORIEL (Niveau 1-5)** - 10 Quêtes

| ID      | Titre                  | Type    | Objectif                | Récompense Clé            |
| ------- | ---------------------- | ------- | ----------------------- | ------------------------- |
| **M01** | 🌟 Les Premiers Pas    | Kill    | Tuer 1 monstre          | Débloquer inventaire      |
| **M02** | ⚔️ Chasseur Débutant   | Kill    | Tuer 5 Loups            | +100 XP, Iron Sword       |
| **M03** | 📦 Premiers Butins     | Collect | Ramasser 10 drops       | Débloquer stockage        |
| **M04** | 🪵 Apprenti Bûcheron   | Gather  | Récolter 20 Chêne       | Débloquer métier Bûcheron |
| **M05** | ⛏️ Apprenti Mineur     | Gather  | Récolter 20 Fer         | Débloquer métier Mineur   |
| **M06** | 🔨 Première Forge      | Craft   | Crafter 1 Iron Sword    | Débloquer onglet Crafting |
| **M07** | 🛡️ Se Protéger         | Craft   | Crafter 1 Leather Chest | +200 XP                   |
| **M08** | 💪 Monter en Puissance | Level   | Atteindre niveau 5      | +300 XP, 100 Gold         |
| **M09** | ⚡ Combat Intensif     | Kill    | Tuer 50 monstres        | **DÉBLOQUER AUTO-COMBAT** |
| **M10** | 👑 Boss des Plaines    | Boss    | Tuer Bête des Prairies  | **DÉBLOQUER RÉGION 2**    |

---

### **🏔️ CHAPITRE 2 : EXPLORATION (Niveau 6-10)** - 8 Quêtes

| ID      | Titre                        | Type       | Objectif                    | Récompense Clé              |
| ------- | ---------------------------- | ---------- | --------------------------- | --------------------------- |
| **M11** | 🏙️ Fondateur de Ville        | Unlock     | Débloquer Ville             | Débloquer onglet Ville      |
| **M12** | 🏗️ Premier Bâtiment          | Build      | Construire Scierie          | +500 XP                     |
| **M13** | 🌲 Production Passive        | Wait       | Récolter 100 bois (Scierie) | Débloquer Mine              |
| **M14** | 🪵 Maître Bûcheron           | Profession | Bûcheron niveau 5           | **AUTO-RÉCOLTE BOIS**       |
| **M15** | ⛏️ Maître Mineur             | Profession | Mineur niveau 5             | **AUTO-RÉCOLTE MINERAI**    |
| **M16** | 🎣 Découvrir la Pêche        | Gather     | Pêcher 30 poissons          | Débloquer métier Pêcheur    |
| **M17** | 🌿 Découvrir l'Herboristerie | Gather     | Cueillir 30 plantes         | Débloquer métier Herboriste |
| **M18** | 🔥 Boss de la Forge          | Boss       | Tuer Forgemort (R2)         | **DÉBLOQUER RÉGION 3**      |

---

### **🌳 CHAPITRE 3 : MAÎTRISE (Niveau 11-20)** - 10 Quêtes

| ID      | Titre                  | Type       | Objectif                  | Récompense Clé                |
| ------- | ---------------------- | ---------- | ------------------------- | ----------------------------- |
| **M19** | 🛡️ Armurier Apprenti   | Craft      | Crafter 5 armures         | Débloquer Armurier niveau 3   |
| **M20** | 💍 Bijoutier Apprenti  | Craft      | Crafter 3 accessoires     | Débloquer Bijoutier niveau 3  |
| **M21** | 🧪 Alchimiste Apprenti | Craft      | Crafter 10 potions        | Débloquer Alchimiste niveau 3 |
| **M22** | 👗 Tailleur Apprenti   | Craft      | Crafter 5 armures légères | Débloquer Tailleur niveau 3   |
| **M23** | 🐟 Pêcheur Expert      | Profession | Pêcheur niveau 5          | **AUTO-PÊCHE**                |
| **M24** | 🌿 Herboriste Expert   | Profession | Herboriste niveau 5       | **AUTO-HERBORISTERIE**        |
| **M25** | 🐉 Dompteur de Dragons | Special    | Capturer 1er dragon       | **DÉBLOQUER ONGLET DRAGONS**  |
| **M26** | 💰 Millionnaire        | Collect    | Posséder 10,000 Or        | +1000 XP, Coffre Rare         |
| **M27** | 🏆 Chasseur d'Élite    | Kill       | Tuer 10 Elite monsters    | +1500 XP, Équipement Epic     |
| **M28** | 🧝 Boss de la Forêt    | Boss       | Tuer Nymphe Sombre (R3)   | **DÉBLOQUER RÉGION 4**        |

---

### **🔥 CHAPITRE 4 : ENDGAME (Niveau 21-35)** - 8 Quêtes

| ID      | Titre                 | Type       | Objectif                       | Récompense Clé              |
| ------- | --------------------- | ---------- | ------------------------------ | --------------------------- |
| **M29** | 🔨 Forgeron Maître    | Profession | Forgeron niveau 15             | +10% Stats Armes Craftées   |
| **M30** | 🛡️ Armurier Maître    | Profession | Armurier niveau 15             | +10% Stats Armures Craftées |
| **M31** | 🐉 Éleveur de Dragons | Dragons    | Élever 5 dragons               | Débloquer Hybridation       |
| **M32** | ⚗️ Transmutateur      | Special    | Transmuter 10 items            | Débloquer Transmutation T2  |
| **M33** | 🏰 Baron de Ville     | Build      | Améliorer 5 bâtiments niveau 3 | +Production 20%             |
| **M34** | ⚔️ Tueur de Boss      | Boss       | Tuer 5 Boss différents         | Titre "Tueur de Boss"       |
| **M35** | 🔥 Prêtre du Brasier  | Boss       | Tuer Prêtre du Brasier (R4)    | **DÉBLOQUER RÉGION 5**      |
| **M36** | ❄️ Conquérant du Nord | Boss       | Tuer Héraut Blizzard (R5)      | **DÉBLOQUER MODE INFINI**   |

---

### **⭐ QUÊTES BONUS (Répétables)** - 4 Quêtes

| ID      | Titre                  | Type   | Objectif                | Récompense Clé                |
| ------- | ---------------------- | ------ | ----------------------- | ----------------------------- |
| **B01** | 🔄 Chasseur Quotidien  | Kill   | Tuer 100 monstres       | +500 XP, 200 Gold (répétable) |
| **B02** | 🔄 Artisan Quotidien   | Craft  | Crafter 20 items        | +300 XP, Matériaux rares      |
| **B03** | 🔄 Récolteur Quotidien | Gather | Récolter 200 ressources | +400 XP, Coffre mystère       |
| **B04** | 🔄 Boss Hebdomadaire   | Boss   | Tuer 3 Boss             | +2000 XP, Item Légendaire     |

---

## 🎁 SYSTÈME DE RÉCOMPENSES

### **Types de Récompenses**

```javascript
rewards: {
  // Récompenses de base
  xp: 500,           // XP joueur
  gold: 200,         // Or

  // Items
  items: [
    { id: 'iron_sword', amount: 1 },
    { id: 'health_potion', amount: 5 }
  ],

  // XP Métiers
  professionXP: {
    blacksmith: 200,
    armorsmith: 100
  },

  // Déblocages (IMPORTANT!)
  unlocks: [
    'auto_combat',        // Auto-combat
    'auto_gather_wood',   // Auto-récolte bois
    'auto_gather_ore',    // Auto-récolte minerai
    'auto_fishing',       // Auto-pêche
    'auto_herbalism',     // Auto-herboristerie
    'region_2',           // Région 2
    'town_tab',           // Onglet Ville
    'dragons_tab',        // Onglet Dragons
    'profession_tier_2'   // Tier 2 d'un métier
  ],

  // Bonus permanents
  permanentBonus: {
    craftSpeed: 1.05,     // +5% vitesse craft
    gatherSpeed: 1.10,    // +10% vitesse récolte
    dropChance: 1.15      // +15% chance de drop
  },

  // Message
  message: 'Vous pouvez maintenant combattre automatiquement !'
}
```

---

## 🔓 SYSTÈME DE DÉBLOCAGES

### **Flags de Déblocage (Game State)**

```javascript
// Dans Game class
this.unlocks = {
  // Combat
  autoCombat: false,          // Auto-combat activé
  combatLog: true,            // Log de combat (toujours actif)

  // Récolte
  autoGatherWood: false,      // Auto-récolte bois
  autoGatherOre: false,       // Auto-récolte minerai
  autoFishing: false,         // Auto-pêche
  autoHerbalism: false,       // Auto-herboristerie

  // Onglets
  combatTab: true,            // Combat (toujours actif)
  gatheringTab: false,        // Récolte
  professions Tab: false,     // Métiers
  townTab: false,             // Ville
  dragonsTab: false,          // Dragons

  // Régions
  region1: true,              // R1 (toujours actif)
  region2: false,             // R2
  region3: false,             // R3
  region4: false,             // R4
  region5: false,             // R5

  // Métiers
  professions: {
    woodcutting: false,
    mining: false,
    herbalism: false,
    fishing: false,
    blacksmith: false,
    armorsmith: false,
    jeweler: false,
    alchemist: false,
    fishmonger: false,
    tailor: false,
    transmutation: false
  },

  // Dragons
  dragonCapture: false,       // Capturer dragons
  dragonBreeding: false,      // Reproduction
  dragonHybridization: false  // Hybridation
};
```

---

## 🎯 INTÉGRATION NIVEAUX MÉTIERS

### **Quêtes par Niveau de Métier**

```javascript
// Forgeron
{
  id: 'prof_blacksmith_master',
  title: '🔨 Maître Forgeron',
  description: 'Atteignez le niveau 15 en Forgeron.',
  type: 'profession_level',
  profession: 'blacksmith',
  target: 15,

  requirements: {
    professionLevel: { blacksmith: 10 }
  },

  rewards: {
    xp: 2000,
    gold: 1000,
    permanentBonus: {
      // Toutes les armes craftées ont +10% stats
      weaponCraftBonus: 1.10
    },
    unlocks: ['blacksmith_legendary_recipes'],
    title: 'Maître Forgeron'
  }
}
```

### **Bonus par Niveau**

| Métier         | Niveau 5           | Niveau 10         | Niveau 15     | Niveau 20            |
| -------------- | ------------------ | ----------------- | ------------- | -------------------- |
| **Forgeron**   | Auto-craft         | +5% Stats Armes   | +10% Stats    | Recette Légendaire   |
| **Armurier**   | Auto-craft         | +5% Stats Armures | +10% Stats    | Recette Légendaire   |
| **Bûcheron**   | Auto-récolte       | +10% Vitesse      | +20% Quantité | Double drop 10%      |
| **Mineur**     | Auto-récolte       | +10% Vitesse      | +20% Quantité | Double drop 10%      |
| **Alchimiste** | Auto-craft potions | +25% Durée effets | +50% Durée    | Potions permanentes  |
| **Pêcheur**    | Auto-pêche         | +15% Rares        | +30% Rares    | Poissons légendaires |

---

## 📋 PLAN D'IMPLÉMENTATION

### **Étape 1 : Créer quests-data.js** ✅

Fichier avec les 40 quêtes complètes.

### **Étape 2 : Modifier Game.js** ✅

Ajouter `this.unlocks` pour gérer les déblocages.

### **Étape 3 : Modifier UI.js** ✅

Cacher/afficher onglets selon déblocages.

### **Étape 4 : Ajouter Auto-Features** ✅

Vérifier `game.unlocks.autoCombat` avant d'activer.

### **Étape 5 : Intégrer Métiers** ✅

Quêtes déclenchées à chaque niveau de métier.

---

## 🚀 PROCHAINES ACTIONS

**Voulez-vous que je :**

**Option A** : Créer le fichier `quests-data.js` complet avec les 40 quêtes ?

**Option B** : Modifier `Game.js` pour ajouter le système de déblocages ?

**Option C** : Tout faire d'un coup (A + B + intégrations) ?

**Je recommande Option C** pour avoir un système complet fonctionnel ! 🎯
