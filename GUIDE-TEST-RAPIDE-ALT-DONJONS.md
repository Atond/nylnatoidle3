# 🧪 GUIDE DE TEST RAPIDE - ALT CHARACTERS + DONJONS

**Objectif** : Valider toutes les fonctionnalités en 15 minutes

---

## ⚡ TESTS RAPIDES (Console)

### 1️⃣ Setup Initial (30 sec)

```javascript
// Charger le jeu
// Ouvrir console (F12)

// Niveau up rapide pour débloquer système
game.player.level = 30;
game.questManager.checkLevelUpQuests();
// → Devrait compléter M11 "Académie des Héros"
// → Débloquer onglet "🎭 Personnages"

// Vérifier unlock
console.log(game.unlocks.characters_tab); // → true
```

---

### 2️⃣ Test Alt Characters (3 min)

```javascript
// A. Créer 3 alts (Tank, Heal, DPS)
const tank = game.altCharacterManager.createAlt("Thor", "male", "tank");
const heal = game.altCharacterManager.createAlt("Freya", "female", "healer");
const dps = game.altCharacterManager.createAlt("Bjorn", "male", "archer");

console.log(tank); // → { success: true, character: {...} }
console.log(game.altCharacterManager.characters.size); // → 4 (main + 3 alts)

// B. Vérifier quêtes
console.log(game.questManager.getActiveQuests());
// → M12 devrait être complétée (créer 1 alt)
// → M13 devrait être complétée (créer 3 alts)
// → dungeons_tab devrait être débloqué

// C. Test Switch Character
game.altCharacterManager.switchCharacter(tank.character.id);
console.log(game.altCharacterManager.activeCharacterId); // → 'alt_...'
console.log(game.player.name); // → 'Thor'

// Revenir au main
game.altCharacterManager.switchCharacter("main");

// D. Test Mentor Bonus
const altChar = tank.character;
altChar.level = 10;
game.altCharacterManager.getMainCharacter().level = 30;
const bonus = game.altCharacterManager.getMentorBonus(altChar.id);
console.log(bonus); // → 1.50 (+50% car alt = 10, main = 30, diff = 20)

// E. Test Shared Storage
const storage = game.altCharacterManager.sharedStorage;
storage.addResource("wood", 100);
storage.addGold(500);
console.log(storage.resources.get("wood")); // → 100
console.log(storage.gold); // → 500

// Switch vers alt, withdraw
game.altCharacterManager.switchCharacter(altChar.id);
storage.withdrawResource("wood", 50);
console.log(storage.resources.get("wood")); // → 50
console.log(game.player.resources.wood); // → +50 (alt reçoit)
```

**Validation visuelle** :

- Ouvrir onglet "🎭 Personnages"
- Vérifier que les 3 alts s'affichent
- Cliquer "❓ Guide Alt Characters" → Lire le guide
- Vérifier Shared Storage affiche 50 wood + 500 gold

---

### 3️⃣ Test Carry Mode (2 min)

```javascript
// A. Activer Carry Mode
const altId = tank.character.id;
const targetZone = { id: "zone_1_5", level: 15 };

const result = game.altCharacterManager.startCarryMode(altId, targetZone);
console.log(result); // → { success: true } (si alt.level + 10 >= 15)

// B. Vérifier état
const carryState = game.altCharacterManager.getCarryState();
console.log(carryState);
// → { isActive: true, altId: '...', startTime: ..., endTime: ... }

// C. Simuler combat pour tester XP
game.combat.onMonsterDeath(); // Kill un monstre
// → Dans console, devrait voir "💪 Thor (Carry) : +XXX XP"
// → Alt devrait gagner 75% de l'XP

// D. Stop Carry
game.altCharacterManager.stopCarryMode();
console.log(game.altCharacterManager.getCarryState().isActive); // → false
```

---

### 4️⃣ Test AFK Farm (2 min)

```javascript
// A. Démarrer AFK Farm
game.altCharacterManager.startAFKFarm(heal.character.id);
const afkState = game.altCharacterManager.getAFKFarmState();
console.log(afkState.activeAlts); // → ['alt_...']

// B. Simuler update (1 minute)
game.altCharacterManager.updateAFKFarm(60000); // 60 secondes
// → Alt devrait gagner 1% Main XP/h = 0.0167% XP
// → Ressources Tier 1 ajoutées

console.log(heal.character.xp); // → Devrait avoir augmenté

// C. Stop AFK
game.altCharacterManager.stopAFKFarm(heal.character.id);
console.log(game.altCharacterManager.getAFKFarmState().activeAlts); // → []
```

---

### 5️⃣ Test Donjons (5 min)

```javascript
// A. Vérifier donjons chargés
console.log(game.dungeonManager.getDungeons());
// → 5 donjons (caverne_ombres, temple_oublie, forteresse_dragon, ...)

// B. Level up alts pour donjon
tank.character.level = 25;
heal.character.level = 25;
dps.character.level = 25;

// Équiper rapidement (optionnel)
// ... (craft équipement de base si nécessaire)

// C. Check Team Readiness
const dungeonId = "caverne_ombres";
const team = [tank.character, heal.character, dps.character];

const readiness = game.dungeonManager.checkTeamReadiness(dungeonId, team);
console.log(readiness);
// → { winChance: XX%, warnings: [...], recommendations: [...] }

// D. Entrer dans donjon
const enterResult = game.dungeonManager.enterDungeon(dungeonId, team);
console.log(enterResult); // → { success: true }
console.log(game.dungeonManager.combatState);
// → { dungeonId: 'caverne_ombres', team: [...], bossHp: 12000, ... }

// E. Démarrer combat (automatique dans UI, manuel ici)
game.dungeonManager.startCombat();

// F. Observer combat (logs dans combatState.log)
setInterval(() => {
  console.log("Boss HP:", game.dungeonManager.combatState.bossHp);
  console.log("Tank HP:", game.dungeonManager.combatState.tankHp);
}, 2000);

// G. Attendre fin combat (ou forcer victory)
// Victory si Boss HP = 0
// Defeat si Tank HP = 0

// Forcer victory pour test rapide :
game.dungeonManager.combatState.bossHp = 0;
game.dungeonManager.onVictory();

// Vérifier rewards
console.log(game.dungeonManager.combatState.rewards);
// → { xp: XXX, gold: XXX, resources: [...], equipment: [...] }

// Vérifier quête M14 complétée
console.log(game.questManager.getCompletedQuests());
// → Devrait inclure M14 "Première Conquête"
```

**Validation visuelle** :

- Ouvrir onglet "🏰 Donjons"
- Sélectionner "Caverne Ombres"
- Sélectionner Tank/Heal/DPS dans dropdowns
- Vérifier Win Chance % (color-coded)
- Voir warnings/recommendations
- Cliquer "Entrer Donjon"
- Observer combat UI (HP bars, timer, log)
- Voir Victory Modal avec loot

---

### 6️⃣ Test Help System (1 min)

```javascript
// A. Alt Characters Guide
// → Ouvrir onglet "🎭 Personnages"
// → Cliquer "❓ Guide Alt Characters"
// → Vérifier 4 sections :
//   1. ❓ Qu'est-ce qu'un Alt ?
//   2. 💪 Power Leveling
//   3. 🛡️ Système Trinity
//   4. 📦 Coffre Partagé

// B. Dungeons Guide
// → Ouvrir onglet "🏰 Donjons"
// → Cliquer "❓ Guide Donjons"
// → Vérifier 6 sections :
//   1. 🏰 Système de Donjons
//   2. 🛡️ Système Trinity
//   3. 📊 Stats Importantes
//   4. 🎯 Comment Gagner ?
//   5. 💡 Si Vous Échouez
//   6. 🎁 Récompenses

// C. Tooltips
// → Hover sur "💪 Carry Mode" → Voir tooltip
// → Hover sur "🏭 AFK Farm" → Voir tooltip
// → Hover sur Win Chance % → Voir tooltip
```

---

### 7️⃣ Test Défaite (2 min)

```javascript
// A. Créer team faible
const weakTank = game.altCharacterManager.createAlt("Weak", "male", "warrior");
weakTank.character.level = 1; // Très faible

const weakTeam = [weakTank.character, heal.character, dps.character];

// B. Entrer donjon
game.dungeonManager.enterDungeon("caverne_ombres", weakTeam);
game.dungeonManager.startCombat();

// C. Forcer défaite
game.dungeonManager.combatState.tankHp = 0;
game.dungeonManager.onDefeat();

// D. Vérifier analyse
console.log(game.dungeonManager.combatState.defeatAnalysis);
// → { mainProblem: '...', recommendations: [...], statsNeeded: [...] }
```

**Validation visuelle** :

- Voir Defeat Modal
- Lire Main Problem (Tank/Heal/DPS identifié)
- Lire Recommendations (crafts spécifiques)

---

### 8️⃣ Test Save/Load (1 min)

```javascript
// A. Save
const saveData = game.save();
console.log(saveData.altCharacters);
// → { mainCharacterId: 'main', characters: [{...}, ...], sharedStorage: {...}, ... }

// B. Load
game.load(saveData);
console.log(game.altCharacterManager.characters.size); // → 4 (main + 3 alts)
console.log(game.dungeonManager.completedDungeons);
// → { caverne_ombres: 1 }
```

---

## ✅ CHECKLIST VALIDATION

- [ ] **Onglet Personnages** visible après M11
- [ ] **Créer 3 alts** (Tank, Heal, DPS)
- [ ] **M12 + M13** complétées
- [ ] **Switch character** fonctionne (UI update)
- [ ] **Mentor Bonus** affiché (+50% XP si alt < main -10)
- [ ] **Shared Storage** : Deposit/Withdraw ressources + or
- [ ] **Carry Mode** : Alt gagne +75% XP en combat
- [ ] **AFK Farm** : Alt gagne 1% XP Main/h
- [ ] **Onglet Donjons** visible après M13
- [ ] **5 donjons** listés (status locked/accessible)
- [ ] **Team Selection** : Dropdowns Tank/Heal/DPS
- [ ] **Team Readiness** : Win Chance %, warnings, recommendations
- [ ] **Combat Simulation** : HP bars, timer, log
- [ ] **Victory** : Loot display (XP, gold, resources, equipment)
- [ ] **Defeat** : Analyse (main problem, recommendations)
- [ ] **M14** complétée après 1er dungeon
- [ ] **Help Guides** : Alt Characters (4 sections), Dungeons (6 sections)
- [ ] **Tooltips** : Tous les boutons ont hints (ℹ️)
- [ ] **Save/Load** : Alts + dungeons persistent

---

## 🐛 BUGS POTENTIELS À SURVEILLER

1. **TypeError: Cannot read property 'X' of undefined**
   - Si `game.altCharacterManager` non initialisé → Vérifier game.js constructor
   - Si `character.role` undefined → Vérifier Character.getClassRole()

2. **Quest not completing**
   - M12/M13 : Vérifier `questManager.updateCreateAltQuest(altId)` appelé dans `createAlt()`
   - M14 : Vérifier `questManager.updateCompleteDungeonQuest(dungeonId)` appelé dans `onVictory()`

3. **UI not updating**
   - Onglet Personnages : Vérifier `ui.initializeAltCharactersUI()` appelé dans `switchTab('characters')`
   - Onglet Donjons : Vérifier `ui.initializeDungeonsUI()` appelé dans `switchTab('dungeons')`

4. **Combat stuck**
   - Vérifier `combatInterval` cleared dans `onVictory()` / `onDefeat()`
   - Vérifier `combatState.ended = true` set

5. **ReferenceError: AltCharactersUI is not defined**
   - Vérifier import dans index.html : `<script src="src/js/ui-alt-characters.js"></script>`
   - Vérifier ordre : ui-alt-characters.js AVANT game.js

---

## 🎯 SUCCESS CRITERIA

✅ **Toutes les fonctionnalités testées sans erreur**  
✅ **15 quests complétées (M11-M15)**  
✅ **3+ alts créés et switchables**  
✅ **1+ donjon complété avec victory**  
✅ **Help guides affichés et lisibles**  
✅ **Save/Load fonctionne (alts + dungeons persistent)**

**Si tous les critères sont remplis → Système validé ! 🎉**

---

## 📞 DEBUG RAPIDE

Si erreur, ouvrir console et vérifier :

```javascript
// 1. Managers existent ?
console.log(game.altCharacterManager); // → AltCharacterManager { ... }
console.log(game.dungeonManager); // → DungeonManager { ... }

// 2. Unlocks corrects ?
console.log(game.unlocks.characters_tab); // → true (après M11)
console.log(game.unlocks.dungeons_tab); // → true (après M13)

// 3. Quests actives ?
console.log(game.questManager.getActiveQuests());
console.log(game.questManager.getCompletedQuests());

// 4. Characters chargés ?
console.log(game.altCharacterManager.characters); // → Map(4) { 'main' => {...}, 'alt_...' => {...}, ... }

// 5. Dungeons chargés ?
console.log(game.dungeonManager.dungeons); // → Array(5) [ {...}, {...}, ... ]

// 6. UI initialisée ?
console.log(game.ui.altCharactersUI); // → AltCharactersUI { ... }
console.log(game.ui.dungeonsUI); // → DungeonsUI { ... }
```

---

**Bon test ! 🚀**
