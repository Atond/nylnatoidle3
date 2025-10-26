# 🌟 SYSTÈME PRESTIGE + DONJONS + TRINITÉ - DESIGN COMPLET

## 📋 **Vue d'ensemble**

Le système Prestige/Donjons/Trinité est le **système endgame principal** du jeu, permettant :

- **Prestige** : Recommencer avec des bonus permanents
- **Multi-personnages** : Créer 3+ personnages pour la Trinité (Tank, Heal, DPS)
- **Donjons** : Content 3 joueurs avec drops uniques
- **Raids** : Content 5-10 joueurs avec équipement légendaire

---

## ⚠️ **STATUT ACTUEL**

| Système          | Config               | Code | UI  | Quêtes | État           |
| ---------------- | -------------------- | ---- | --- | ------ | -------------- |
| **Prestige**     | ✅ endgame-config.js | ❌   | ❌  | ❌     | Non implémenté |
| **Multi-persos** | ❌                   | ❌   | ❌  | ❌     | Non implémenté |
| **Donjons**      | ✅ endgame-config.js | ❌   | ❌  | ❌     | Non implémenté |
| **Trinité**      | ❌                   | ❌   | ❌  | ❌     | Non implémenté |
| **Raids**        | ⚠️ Partiel           | ❌   | ❌  | ❌     | Non implémenté |

**Conclusion** : Seule la configuration existe (endgame-config.js), **RIEN n'est codé**.

---

## 🎯 **PHASE 1 : SYSTÈME PRESTIGE (Niveau 50)**

### **A. Déblocage Prestige**

**Conditions** :

- Niveau 50 atteint
- Quête finale complétée (M36 : Conquérant du Nord)
- Boss R5 (Héraut du Blizzard) tué

**Quête de déblocage** :

```javascript
{
    id: 'main_037',
    title: '🌟 Ascension Ultime',
    description: 'Vous avez atteint le sommet. Il est temps de transcender vos limites.',
    type: 'level_up',
    target: 50,
    chapter: 5,
    difficulty: 'legendary',
    isMainQuest: true,

    requirements: {
        quest: 'main_036', // Conquérant du Nord
        level: 50
    },

    rewards: {
        xp: 0,
        gold: 0,
        unlocks: ['prestige_system', 'infinite_mode'],
        message: '🌟 PRESTIGE DÉBLOQUÉ ! Vous pouvez maintenant transcender et recommencer avec des bonus permanents !'
    }
}
```

### **B. Interface Prestige**

**Nouvel onglet : "⭐ Prestige"**

```
┌─────────────────────────────────────────────────┐
│ 🌟 SYSTÈME DE PRESTIGE                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  Niveau Prestige actuel : 0                     │
│  Tokens d'Ascension : 0                         │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ ⚠️ TRANSCENDER                            │ │
│  │                                           │ │
│  │ En transcendant, vous allez :             │ │
│  │ ✅ Gagner +1 niveau Prestige              │ │
│  │ ✅ Obtenir 100 Tokens d'Ascension         │ │
│  │ ✅ Conserver : Recettes, Bâtiments,       │ │
│  │              Dragons, Upgrades Prestige   │ │
│  │ ⚠️ PERDRE : Niveau, XP, Ressources,       │ │
│  │            Or, Équipement, Quêtes         │ │
│  │                                           │ │
│  │ Bonus permanents après Prestige 1 :       │ │
│  │ • +10% XP gain                            │ │
│  │ • +15% Gold gain                          │ │
│  │ • +5% Drop rate                           │ │
│  │ • Débloque ressources 2 niveaux plus tôt  │ │
│  │                                           │ │
│  │  [🌟 TRANSCENDER] [❌ Annuler]            │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 🛒 BOUTIQUE PRESTIGE (Upgrades permanents)      │
│                                                 │
│ [✅] Auto-Récolte Universelle    100 Tokens    │
│      Active auto-gather niveau 1               │
│                                                 │
│ [ ] Craft Instantané             250 Tokens    │
│      Toutes les recettes instant               │
│                                                 │
│ [ ] Coffre Partagé               150 Tokens    │
│      Accès immédiat au stockage                │
│                                                 │
│ [ ] Production x2                500 Tokens    │
│      Double production bâtiments               │
│                                                 │
│ [ ] Récolte x1.5                 300 Tokens    │
│      +50% ressources récoltées                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **C. Fichiers à créer**

```javascript
// src/js/prestige-manager.js
class PrestigeManager {
  constructor(game) {
    this.game = game;
    this.prestigeLevel = 0;
    this.ascensionTokens = 0;
    this.purchasedUpgrades = [];
  }

  canPrestige() {
    return this.game.player.level >= 50 && this.game.unlocks.prestige_system === true;
  }

  prestige() {
    if (!this.canPrestige()) return false;

    // Calculer tokens gagnés
    const tokensGained = this.calculateTokensGained();

    // Sauvegarder ce qu'on garde
    const preserved = {
      craftRecipes: [...this.game.craftingManager.unlockedRecipes],
      buildings: this.game.buildingManager.toJSON(),
      dragons: this.game.dragonManager.toJSON(),
      prestigeLevel: this.prestigeLevel + 1,
      ascensionTokens: this.ascensionTokens + tokensGained,
      purchasedUpgrades: [...this.purchasedUpgrades],
    };

    // Reset complet
    this.game.resetGame(preserved);

    // Appliquer bonus prestige
    this.applyPrestigeBonuses();

    return true;
  }

  calculateTokensGained() {
    // 100 * prestigeLevel^1.5
    return Math.floor(100 * Math.pow(this.prestigeLevel + 1, 1.5));
  }

  purchaseUpgrade(upgradeId) {
    const upgrade = EndgameConfig.prestige.prestigeShop.find((u) => u.id === upgradeId);
    if (!upgrade) return false;

    if (this.ascensionTokens < upgrade.cost) return false;
    if (this.purchasedUpgrades.includes(upgradeId)) return false;

    this.ascensionTokens -= upgrade.cost;
    this.purchasedUpgrades.push(upgradeId);

    this.applyUpgradeEffect(upgrade);
    return true;
  }
}
```

---

## 🎭 **PHASE 2 : MULTI-PERSONNAGES (Niveau 20)**

### **A. Déblocage Multi-Personnages**

**Quête de déblocage** :

```javascript
{
    id: 'main_011_alt',
    title: '👥 Créer un Allié',
    description: 'Vous êtes maintenant assez puissant pour entraîner un second personnage.',
    type: 'level_up',
    target: 20,
    chapter: 2,
    difficulty: 'medium',
    isMainQuest: true,

    requirements: {
        quest: 'main_018', // Boss Forgemort
        level: 20
    },

    rewards: {
        xp: 0,
        gold: 1000,
        unlocks: ['multi_characters', 'shared_storage'],
        message: '👥 MULTI-PERSONNAGES DÉBLOQUÉ ! Vous pouvez maintenant créer d\'autres personnages !'
    }
}
```

### **B. Interface Multi-Personnages**

**Nouvel onglet : "👥 Personnages"**

```
┌─────────────────────────────────────────────────┐
│ 👥 MES PERSONNAGES (2/5)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 🎮 ACTIF                                    ┃ │
│ ┃ ⚔️ Ragnar le Berserker - Lvl 35 (Guerrier) ┃ │
│ ┃ 💰 12,450 or | 🎒 45/100 items             ┃ │
│ ┃ 🌟 Prestige 0                               ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🛡️ Brunhilde la Gardienne - Lvl 22 (Tank)  │ │
│ │ 💰 3,200 or | 🎒 12/100 items               │ │
│ │ 🌟 Prestige 0                               │ │
│ │                [🎮 Jouer] [⚙️ Gérer]        │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ ➕ CRÉER UN NOUVEAU PERSONNAGE              │ │
│ │                                             │ │
│ │ Slots disponibles : 3/5                     │ │
│ │                                             │ │
│ │ ⚠️ Choisissez une classe complémentaire :   │ │
│ │                                             │ │
│ │ Vous avez déjà : Guerrier DPS, Tank         │ │
│ │ Manque pour Trinité : Heal                  │ │
│ │                                             │ │
│ │       [➕ CRÉER UN PERSONNAGE]              │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 📦 COFFRE PARTAGÉ (1000/1000 slots)            │
│                                                 │
│ [Bois de Chêne x500] [Fer x300] [Or x12,450]   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **C. Création de personnage**

**Écran de création** :

```
┌─────────────────────────────────────────────────┐
│ 🎭 CRÉER UN NOUVEAU PERSONNAGE                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Nom : [________________]                        │
│                                                 │
│ Sexe : ⚪ Homme  ⚪ Femme  ⚪ Neutre              │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ CHOISIR UNE CLASSE :                            │
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ ⚔️ GUERRIER (DPS)                           ┃ │
│ ┃ Rôle : Dégâts physiques élevés              ┃ │
│ ┃ Stats : +Force, +Agilité                    ┃ │
│ ┃ Gameplay : Attaque automatique optimisée    ┃ │
│ ┃ Trinité : ⚔️ DPS                            ┃ │
│ ┃ ✅ Recommandé si vous n'avez pas de DPS     ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🛡️ TANK                                     │ │
│ │ Rôle : Absorber les dégâts, protéger équipe │ │
│ │ Stats : +Endurance, +Défense                │ │
│ │ Gameplay : Survie, aggro des boss           │ │
│ │ Trinité : 🛡️ TANK                          │ │
│ │ ✅ NÉCESSAIRE pour donjons 3 joueurs        │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ ❤️ PRÊTRE (HEAL)                            │ │
│ │ Rôle : Soigner l'équipe, maintenir en vie   │ │
│ │ Stats : +Sagesse, +Intelligence             │ │
│ │ Gameplay : Heals over time, résurrection    │ │
│ │ Trinité : ❤️ HEAL                           │ │
│ │ ⚠️ MANQUE pour compléter la Trinité !       │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🏹 ARCHER                                    │ │
│ │ Rôle : Dégâts à distance, critique          │ │
│ │ Stats : +Agilité, +Perception               │ │
│ │ Gameplay : Crits, vitesse d'attaque         │ │
│ │ Trinité : ⚔️ DPS                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🔮 MAGE                                      │ │
│ │ Rôle : Dégâts magiques AoE                  │ │
│ │ Stats : +Intelligence, +Sagesse             │ │
│ │ Gameplay : Sorts de zone, mana management   │ │
│ │ Trinité : ⚔️ DPS                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│              [✅ CRÉER] [❌ Annuler]            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **D. Fichiers à créer**

```javascript
// src/js/character-manager.js
class CharacterManager {
  constructor(game) {
    this.game = game;
    this.characters = []; // Liste de tous les personnages
    this.activeCharacterId = null;
    this.maxCharacters = 5;
    this.sharedStorage = new SharedStorage();
  }

  createCharacter(name, gender, characterClass) {
    if (this.characters.length >= this.maxCharacters) return false;

    const character = new Character({
      id: this.generateId(),
      name: name,
      gender: gender,
      class: characterClass,
      level: 1,
      prestigeLevel: this.game.prestigeManager.prestigeLevel,
    });

    // Appliquer bonus prestige au nouveau personnage
    if (this.game.prestigeManager.prestigeLevel > 0) {
      character.applyPrestigeBonuses(this.game.prestigeManager.prestigeLevel);
    }

    this.characters.push(character);
    return character;
  }

  switchCharacter(characterId) {
    // Sauvegarder le personnage actuel
    this.saveActiveCharacter();

    // Charger le nouveau personnage
    const character = this.characters.find((c) => c.id === characterId);
    if (!character) return false;

    this.activeCharacterId = characterId;
    this.loadCharacter(character);
    return true;
  }

  getTrinityStatus() {
    const roles = this.characters.map((c) => c.getTrinityRole());
    return {
      hasTank: roles.includes("tank"),
      hasHeal: roles.includes("heal"),
      hasDPS: roles.some((r) => r === "dps"),
      isComplete:
        roles.includes("tank") && roles.includes("heal") && roles.some((r) => r === "dps"),
    };
  }
}

// src/js/shared-storage.js
class SharedStorage {
  constructor() {
    this.items = {}; // Map<itemId, amount>
    this.gold = 0;
    this.capacity = 1000;
  }

  deposit(itemId, amount) {
    // Transférer de l'inventaire du personnage actif vers coffre partagé
  }

  withdraw(itemId, amount) {
    // Transférer du coffre vers inventaire du personnage actif
  }
}
```

---

## 🏰 **PHASE 3 : DONJONS (Trinité 3 Joueurs)**

### **A. Déblocage Donjons**

**Quête de déblocage** :

```javascript
{
    id: 'main_012_dungeon',
    title: '🏰 Première Expédition',
    description: 'Formez une équipe de 3 personnages pour affronter le Donjon des Ombres.',
    type: 'trinity_ready',
    target: 1, // Avoir Tank + Heal + DPS
    chapter: 2,
    difficulty: 'hard',
    isMainQuest: true,

    requirements: {
        quest: 'main_011_alt',
        level: 25,
        hasTrinity: true // Tank + Heal + DPS
    },

    rewards: {
        xp: 0,
        gold: 0,
        unlocks: ['dungeons'],
        message: '🏰 DONJONS DÉBLOQUÉS ! Vous pouvez maintenant affronter les donjons avec votre équipe !'
    }
}
```

### **B. Interface Donjons**

**Nouvel onglet : "🏰 Donjons"**

```
┌─────────────────────────────────────────────────┐
│ 🏰 DONJONS (Équipe de 3)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│ ⚠️ COMPOSITION REQUISE : Tank + Heal + DPS      │
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 👥 VOTRE ÉQUIPE                             ┃ │
│ ┃                                             ┃ │
│ ┃ 🛡️ TANK : Brunhilde (Lvl 22)               ┃ │
│ ┃    HP: 450 | Déf: 50 | ❤️ [=========]      ┃ │
│ ┃                                             ┃ │
│ ┃ ❤️ HEAL : Freya (Lvl 20)                   ┃ │
│ ┃    HPS: 25/sec | Mana: 300 | 💙 [=====]    ┃ │
│ ┃                                             ┃ │
│ ┃ ⚔️ DPS : Ragnar (Lvl 35)                    ┃ │
│ ┃    DMG: 180 | Crit: 45% | ❤️ [=======]     ┃ │
│ ┃                                             ┃ │
│ ┃           [⚙️ MODIFIER L'ÉQUIPE]            ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ DONJONS DISPONIBLES :                           │
│                                                 │
│ ✅ Caverne des Ombres (Lvl 10)                 │
│    Difficulté : ⭐⭐☆☆☆                         │
│    Récompenses : Bois T2, Minerai T2, 1000 or  │
│                  [🎮 COMMENCER]                 │
│                                                 │
│ ✅ Temple Oublié (Lvl 20)                      │
│    Difficulté : ⭐⭐⭐☆☆                        │
│    Récompenses : Bois T3, Minerai T3, 5000 or  │
│                  [🎮 COMMENCER]                 │
│                                                 │
│ ⚠️ Forteresse du Dragon (Lvl 30)               │
│    Difficulté : ⭐⭐⭐⭐☆                       │
│    Récompenses : Oeuf Dragon, 15000 or         │
│                  [🔒 Niveau 30 requis]          │
│                                                 │
│ 🔒 Sanctuaire Élémentaire (Lvl 40)             │
│    Difficulté : ⭐⭐⭐⭐⭐                      │
│    Récompenses : 1 Token Ascension, 50000 or   │
│                  [🔒 Niveau 40 requis]          │
│                                                 │
│ 🔒 Citadelle du Néant (Lvl 50)                 │
│    Difficulté : ⭐⭐⭐⭐⭐+                     │
│    Récompenses : 5 Tokens, Fragments Divins    │
│                  [🔒 Niveau 50 requis]          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **C. Combat de Donjon**

**Interface de combat 3v1 Boss** :

```
┌─────────────────────────────────────────────────┐
│ 🏰 CAVERNE DES OMBRES - Boss : Ombre Primordiale│
├─────────────────────────────────────────────────┤
│                                                 │
│         👹 OMBRE PRIMORDIALE (Boss)             │
│         ❤️ [████████████████] 12,000/12,000    │
│         💢 Attaque prochaine : Tank             │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 🛡️ Brunhilde (Tank)                            │
│    ❤️ [███████___] 315/450 HP (70%)            │
│    🛡️ Taunt actif : Boss attaque le tank       │
│    💥 Dégâts reçus : 35/sec                     │
│                                                 │
│ ❤️ Freya (Heal)                                │
│    ❤️ [██████████] 180/180 HP (100%)           │
│    💙 [███___] 180/300 Mana (60%)               │
│    ✨ Heal : +25 HP/sec sur Tank                │
│                                                 │
│ ⚔️ Ragnar (DPS)                                 │
│    ❤️ [████████__] 290/350 HP (83%)            │
│    💥 DPS : 180/sec                             │
│    💥 CRITIQUE ! +360 dégâts                    │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 📊 COMBAT LOGS :                                │
│ • Tank encaisse 35 dégâts (-7% HP)             │
│ • Heal soigne Tank +25 HP                      │
│ • DPS inflige 180 dégâts au Boss               │
│ • Boss HP : 11,820 / 12,000 (-1.5%)            │
│                                                 │
│              [⏸️ PAUSE] [❌ FUIR]               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **D. Drops Uniques Donjons**

Les donjons **droppent des ressources exclusives** :

- **Set Gear** : Équipement avec bonus de set (3/5/7 pièces)
- **Ressources T+1** : Permet de débloquer un tier plus tôt
- **Tokens Ascension** : Currency pour Prestige Shop
- **Fragments Divins** : Ultra-rare, craft légendaire

Exemple :

```javascript
{
    id: 'armor_dungeon_tank_t2',
    name: 'Armure du Gardien des Ombres',
    rarity: 'epic',
    type: 'armor',
    slot: 'chest',
    archetype: 'tank',

    stats: {
        defense: 50,
        armor: 30,
        endurance: 15,
        hp: 100
    },

    setBonus: {
        set: 'guardian_shadows',
        bonuses: {
            2: '+10% HP',
            4: '+15% Block Chance',
            6: 'Reflect 5% damage'
        }
    },

    source: 'Donjon : Caverne des Ombres',
    canCraftUpgrade: true, // Peut être amélioré via métiers
    upgradeRecipe: 'armor_dungeon_tank_t3'
}
```

### **E. Fichiers à créer**

```javascript
// src/js/dungeon-manager.js
class DungeonManager {
  constructor(game) {
    this.game = game;
    this.activeDungeon = null;
    this.team = { tank: null, heal: null, dps: null };
  }

  canEnterDungeon(dungeonId) {
    const dungeon = EndgameConfig.dungeons.levels.find((d) => d.level === dungeonId);
    if (!dungeon) return false;

    // Vérifier trinité
    if (!this.team.tank || !this.team.heal || !this.team.dps) return false;

    // Vérifier niveau minimum
    const minLevel = Math.min(this.team.tank.level, this.team.heal.level, this.team.dps.level);

    return minLevel >= dungeon.requiredPlayerLevel;
  }

  startDungeon(dungeonId) {
    if (!this.canEnterDungeon(dungeonId)) return false;

    this.activeDungeon = new Dungeon(dungeonId, this.team);
    this.activeDungeon.start();
    return true;
  }
}

// src/js/dungeon.js
class Dungeon {
  constructor(dungeonId, team) {
    this.config = EndgameConfig.dungeons.levels.find((d) => d.level === dungeonId);
    this.team = team;
    this.boss = this.spawnBoss();
    this.isCompleted = false;
  }

  update(deltaTime) {
    // Tank prend aggro
    this.boss.attack(this.team.tank);

    // Heal soigne
    this.team.heal.healTarget(this.team.tank);

    // DPS attaque boss
    const damage = this.team.dps.attack(this.boss);

    // Vérifier victoire
    if (this.boss.hp <= 0) {
      this.onVictory();
    }

    // Vérifier défaite
    if (this.team.tank.hp <= 0) {
      this.onDefeat();
    }
  }

  onVictory() {
    this.isCompleted = true;
    this.distributeRewards();
  }
}
```

---

## 🎖️ **PHASE 4 : RAIDS (5-10 Joueurs)**

### **A. Déblocage Raids**

**Conditions** :

- Niveau 50
- Prestige 1+
- Avoir complété tous les donjons au moins une fois

**Quête** :

```javascript
{
    id: 'main_038',
    title: '👑 Assemblée des Héros',
    description: 'Réunissez 5 champions pour affronter les Raids légendaires.',
    type: 'prestige_level',
    target: 1,
    chapter: 5,
    difficulty: 'legendary',

    requirements: {
        quest: 'main_037',
        prestigeLevel: 1,
        completedAllDungeons: true
    },

    rewards: {
        unlocks: ['raids'],
        message: '👑 RAIDS DÉBLOQUÉS ! Assemblez 5 héros pour affronter les boss légendaires !'
    }
}
```

### **B. Composition Raid**

**Raid 5 joueurs** :

- 1 Tank principal
- 1 Heal principal
- 3 DPS (dont 1 peut être off-tank ou off-heal)

**Raid 10 joueurs** :

- 2 Tanks
- 2-3 Heals
- 5-6 DPS

### **C. Drops Raid**

- **Gear Légendaire** : BiS items
- **Tier Tokens** : Échange contre set complet
- **Mount Tokens** : Montures (futur)
- **Cosmetics** : Titres, apparences

---

## 📋 **RÉCAPITULATIF IMPLÉMENTATION**

### **Ordre de développement recommandé** :

1. **Phase 1 : Prestige System** (2-3h)
   - [ ] prestige-manager.js
   - [ ] UI Prestige tab
   - [ ] Quête M37 Ascension
   - [ ] Save/Load prestige data

2. **Phase 2 : Multi-Personnages** (4-5h)
   - [ ] character-manager.js
   - [ ] shared-storage.js
   - [ ] UI Personnages tab
   - [ ] Character creation screen
   - [ ] Switch character system

3. **Phase 3 : Donjons** (6-8h)
   - [ ] dungeon-manager.js
   - [ ] dungeon.js
   - [ ] Combat UI 3v1
   - [ ] Loot system dungeon-specific
   - [ ] 5 donjons configurés

4. **Phase 4 : Raids** (8-10h)
   - [ ] raid-manager.js
   - [ ] raid.js
   - [ ] UI Raid composition
   - [ ] Mechanics boss complexes

**TOTAL : ~25 heures de développement**

---

## ✅ **CHECKLIST POUR TOI**

Veux-tu que je :

1. ⚡ **Ajoute les quêtes Prestige/Multi-persos** dans quests-data.js ?
2. 🏗️ **Crée prestige-manager.js** avec le système complet ?
3. 👥 **Crée character-manager.js** pour multi-personnages ?
4. 🏰 **Crée dungeon-manager.js** pour le système de donjons ?
5. 📝 **Modifie QUEST-SYSTEM-DESIGN.md** pour intégrer ces quêtes ?

**Dis-moi par où tu veux commencer !** 🚀
