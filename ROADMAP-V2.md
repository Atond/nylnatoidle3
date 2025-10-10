# 🗺️ ROADMAP IDLE RPG - VERSION 2.0

> **Date** : 9 Octobre 2025  
> **Vision** : Idle RPG moderne avec progression exponentielle et endgame riche  
> **Statut** : 📋 Planning Phase

---

## 🎯 VUE D'ENSEMBLE

### **Ce qui change par rapport à la V1**

| Aspect            | V1 (Actuel)        | V2 (Nouvelle Vision)                |
| ----------------- | ------------------ | ----------------------------------- |
| **Niveau perso**  | Exponentiel infini | ✅ CAP 50 (linéaire, histoire)      |
| **Métiers**       | Cap niveau 50      | ✅ INFINI (exponentiel, millions)   |
| **Ville**         | Production modeste | ✅ MILLIONS/min (exponentiel)       |
| **Prestige**      | Pas implémenté     | ✅ Multi-persos (héritage ville)    |
| **Endgame**       | Pas défini         | ✅ Donjons (3 persos) + Raids (20+) |
| **Ressources T1** | Obsolètes lategame | ✅ TOUJOURS utilisées               |
| **Gros chiffres** | Absents            | ✅ Millions/Milliards/Trillions     |

---

## 📅 PHASES D'IMPLÉMENTATION

### **PHASE 0 : Documentation** ✅ (FAIT)

**Durée** : 1-2 jours  
**Objectif** : Définir vision complète avant code

- [x] BALANCE-ENDGAME-VISION.md (vision globale)
- [x] BALANCE-PROFESSIONS-EXPONENTIAL.md (métiers infinis)
- [x] BALANCE-STAT-CHANGES.md (nouveau système stats)
- [x] ROADMAP.md (ce fichier)

**Résultat** : Vision claire et cohérente du jeu final ✅

---

### **PHASE 1 : Système Stats Critiques** 🔥

**Durée** : 3-5 jours  
**Priorité** : HAUTE (améliore immédiatement le gameplay)  
**Fichiers** : `player.js`, `combat.js`, `ui.js`

#### **Tasks**

- [ ] **1.1** Modifier `player.js` - Calcul stats

  ```javascript
  // Nouveau calcul HP/défense/critique
  this.maxHP = 100 + (this.stats.endurance × 15)
  this.defense = this.stats.endurance × 1.0
  this.critChance = this.stats.agility × 0.005  // 0.5% par point
  this.critMultiplier = 2.0  // Base ×2

  // Préparer mana (pas encore utilisé)
  this.maxMana = this.stats.wisdom × 2
  this.manaRegen = this.stats.wisdom × 0.1
  ```

- [ ] **1.2** Modifier `combat.js` - Système critique

  ```javascript
  // Ajouter roll critique
  if (Math.random() < attacker.critChance) {
    damage *= attacker.critMultiplier;
    this.displayCriticalHit();
  }
  ```

- [ ] **1.3** Supprimer vitesse basée agilité

  ```javascript
  // ANCIEN (supprimer)
  attackSpeed = baseSpeed / (1 + agility × 0.02)

  // NOUVEAU (vitesse fixe)
  attackSpeed = weapon.speed || 2000
  ```

- [ ] **1.4** Créer animations critiques (`animations.css`)

  ```css
  .critical-hit-text {
    animation: critBounce 0.5s ease-out;
    font-size: 48px;
    color: #ff0000;
  }
  ```

- [ ] **1.5** Mettre à jour UI stats (`ui.js`)
  - Afficher chance critique
  - Afficher mana (grisé si 0)
  - Tooltip explications

**Test** : Archer niveau 20 doit avoir ~52% critiques visibles

---

### **PHASE 2 : Métiers Exponentiels** 🌲

**Durée** : 5-7 jours  
**Priorité** : HAUTE (cœur du gameplay idle)  
**Fichiers** : `profession-manager.js`, `profession.js`, `utils/number-formatter.js`

#### **Tasks**

- [ ] **2.1** Créer formateur grands nombres

  ```javascript
  // number-formatter.js
  formatNumber(num) {
      const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc']
      // ... logique formatage
  }
  ```

- [ ] **2.2** Modifier formule XP métiers

  ```javascript
  // profession.js
  getXPRequired(level) {
      return Math.floor(100 × (1.5 ** level))  // EXPONENTIEL
  }
  ```

- [ ] **2.3** Système tiers infinis

  ```javascript
  // Pas de cap niveau
  MAX_PROFESSION_LEVEL: Infinity

  // Déblocage tiers dynamique
  getTierForLevel(level) {
      if (level < 5) return 1
      if (level < 10) return 2
      if (level < 20) return 3
      if (level < 30) return 4
      if (level < 50) return 5
      if (level < 100) return 6
      return Math.floor(level / 100) + 6  // Tier 7, 8, 9...
  }
  ```

- [ ] **2.4** Bonus quantité par niveau

  ```javascript
  getAmountBonus(level) {
      return 1 + (level × 0.1)  // +10% par niveau
  }
  ```

- [ ] **2.5** Ajouter nouveaux tiers ressources
  - Bois : T1 Oak → T7 Eternal → T8+ (futurs)
  - Minerais : T1 Copper → T7 Eternium → T8+ (futurs)

- [ ] **2.6** Mettre à jour UI métiers
  - Afficher grands nombres (1.5M XP)
  - Progress bar exponentielle
  - Liste tiers débloqués/à débloquer

**Test** : Atteindre niveau 20 doit montrer ~332K XP requis, production ×3

---

### **PHASE 3 : Ville Production Massive** 🏙️

**Durée** : 5-7 jours  
**Priorité** : HAUTE (synergie avec métiers)  
**Fichiers** : `building-manager.js`, `building.js`, `buildings-data.js`

#### **Tasks**

- [ ] **3.1** Production exponentielle bâtiments

  ```javascript
  // building.js
  getProduction(level) {
      const BASE = this.baseProduction  // 10/min
      return BASE × (1.5 ** level)
  }
  ```

- [ ] **3.2** Supprimer cap niveau bâtiments

  ```javascript
  MAX_BUILDING_LEVEL: Infinity; // Au lieu de 10
  ```

- [ ] **3.3** Coût multi-tiers

  ```javascript
  getUpgradeCost(level) {
      return {
          t1: 1000 × (2 ** level),  // TOUJOURS nécessaire
          t2: level >= 5 ? 500 × (2 ** (level - 5)) : 0,
          t3: level >= 10 ? 200 × (2 ** (level - 10)) : 0,
          t4: level >= 20 ? 100 × (2 ** (level - 20)) : 0,
          gold: 10000 × (3 ** level)
      }
  }
  ```

- [ ] **3.4** UI production en temps réel
  - Afficher "Produit: 43.5K bois/min"
  - Notifications "Vous avez produit 1M de bois!"
  - Graphique production (optionnel)

- [ ] **3.5** Système de collecte passive
  - Calculer production pendant AFK
  - Limiter à 24h max (éviter exploits)
  - Message "Vous avez récolté 3.5B de bois pendant votre absence"

**Test** : Ville niveau 20 doit produire 43K bois/min

---

### **PHASE 4 : Cap Niveau 50 Personnage** 🎯

**Durée** : 2-3 jours  
**Priorité** : MOYENNE (prépare prestige)  
**Fichiers** : `player.js`, `game-config.js`

#### **Tasks**

- [ ] **4.1** Définir cap niveau

  ```javascript
  MAX_PLAYER_LEVEL: 50;
  ```

- [ ] **4.2** Bloquer gain XP après cap

  ```javascript
  gainXP(amount) {
      if (this.level >= MAX_PLAYER_LEVEL) {
          this.showMessage("Niveau maximum atteint! Créez un nouveau personnage.")
          return
      }
      // ... reste du code
  }
  ```

- [ ] **4.3** Message encouragement prestige
  - "Vous avez atteint le niveau max!"
  - "Créez un nouveau personnage pour débloquer les Donjons"
  - Bouton "Créer nouveau personnage" (désactivé si pas assez gold)

- [ ] **4.4** Ajuster formule XP (linéaire)
  ```javascript
  // S'assurer que niveau 50 = 50-75 heures
  xpRequired(level) {
      return 100 × (level ** 2.2)  // Ajuster exposant
  }
  ```

**Test** : Atteindre niveau 50 en ~60 heures de jeu

---

### **PHASE 5 : Multi-Personnages (Prestige)** 🔄

**Durée** : 7-10 jours  
**Priorité** : HAUTE (feature centrale endgame)  
**Fichiers** : `character-manager.js` (nouveau), `storage-manager.js`, `ui.js`

#### **Tasks**

- [ ] **5.1** Créer système personnages

  ```javascript
  // character-manager.js
  class CharacterManager {
      constructor() {
          this.characters = []  // Liste persos
          this.activeCharacterId = null
          this.sharedResources = {}  // Banque partagée
      }

      createCharacter(name, class) { ... }
      switchCharacter(id) { ... }
      getCharacter(id) { ... }
  }
  ```

- [ ] **5.2** Banque partagée

  ```javascript
  // Ressources partagées entre TOUS les persos
  sharedResources: {
      wood: {},      // { oak: 1000000, maple: 500000, ... }
      ore: {},       // { copper: 2000000, iron: 1000000, ... }
      gold: 0,
      gems: {}
  }
  ```

- [ ] **5.3** Éléments partagés vs individuels

  ```javascript
  // PARTAGÉ (tous persos)
  - Ville (niveaux bâtiments)
  - Métiers (niveaux)
  - Ressources (banque)
  - Recettes craft (débloquées)
  - Donjons/Raids (accès)

  // INDIVIDUEL (par perso)
  - Niveau (1-50)
  - Stats (force, agilité, etc.)
  - Équipement (inventaire)
  - Quêtes histoire (progression)
  ```

- [ ] **5.4** UI sélecteur personnages
  - Liste persos (card avec nom, classe, niveau)
  - Bouton "Créer nouveau" (coût: 1M gold)
  - Bouton "Jouer" (switch active character)
  - Bouton "Supprimer" (confirmation)

- [ ] **5.5** Système déblocages

  ```javascript
  PRESTIGE_UNLOCKS: {
      3: "Donjons débloqués",
      5: "+10% XP tous persos",
      10: "+25% XP tous persos",
      20: "Raids débloqués",
      40: "+50% production ville"
  }
  ```

- [ ] **5.6** Bonus leveling persos suivants
  ```javascript
  getXPMultiplier() {
      const numChars = this.characters.length
      return 1 + (numChars × 0.5)  // +50% par perso existant
  }
  ```

**Test** : Créer 3 persos, switch entre eux, ville/ressources partagées

---

### **PHASE 6 : Donjons (3-5 Personnages)** 🏰

**Durée** : 10-14 jours  
**Priorité** : MOYENNE (contenu endgame)  
**Fichiers** : `dungeon-manager.js` (nouveau), `dungeon.js` (nouveau)

#### **Tasks**

- [ ] **6.1** Système donjons basique

  ```javascript
  class Dungeon {
      constructor(name, requiredChars, bosses) {
          this.name = name
          this.requiredChars = requiredChars  // 3-5
          this.bosses = bosses  // Liste boss
          this.difficulty = 'normal'  // normal/heroic/mythic
      }

      start(characters) { ... }
      fight(bossIndex) { ... }
      complete() { ... }
  }
  ```

- [ ] **6.2** Premiers donjons
  - Temple de l'Ombre (3 persos, 3 boss)
  - Forteresse Gelée (3 persos, 4 boss)
  - Sanctuaire Sacré (4 persos, 5 boss)
  - Tour du Mage Noir (5 persos, 7 boss)

- [ ] **6.3** Système composition équipe
  - Sélectionner 3-5 persos (niveau 50 requis)
  - Rôles : Tank, Healer, DPS
  - Validation composition (au moins 1 tank)

- [ ] **6.4** Sets équipement (bonus 2/4/6)

  ```javascript
  SET_SHADOW: {
      pieces: 6,
      bonuses: {
          2: "+10% crit damage",
          4: "+20% physical damage",
          6: "Skill 'Stealth': +50% DPS 10sec (CD 60s)"
      }
  }
  ```

- [ ] **6.5** Loot table donjons
  - Boss 1-3: Pièces set garanties
  - Boss final: Chance arme légendaire
  - Coffres: Gold, ressources rares

- [ ] **6.6** UI donjons
  - Liste donjons disponibles
  - Sélection équipe
  - Combat auto (comme zones)
  - Résumé loot

**Test** : 3 persos niveau 50 peuvent compléter Temple Ombre

---

### **PHASE 7 : Raids (20-40 Personnages)** 👑

**Durée** : 14-21 jours  
**Priorité** : BASSE (endgame avancé)  
**Fichiers** : `raid-manager.js` (nouveau), `raid.js` (nouveau)

#### **Tasks**

- [ ] **7.1** Système raids (similaire donjons mais scale ×10)

  ```javascript
  class Raid {
      requiredChars: 20-40
      bosses: 10-20
      mechanics: ["Phase 1", "Phase 2", "Phase 3"]
      loot: { legendary: 5%, mythic: 10%, divine: 20% }
  }
  ```

- [ ] **7.2** Premiers raids
  - Citadelle des Anciens (20 persos, 10 boss)
  - Nexus du Chaos (25 persos, 12 boss)
  - Palais du Roi Dragon (30 persos, 15 boss)
  - Abysse Éternel (40 persos, 20 boss)

- [ ] **7.3** Boss raid avec mechanics

  ```javascript
  BOSS_DRAGON_KING: {
      hp: 100000000,  // 100M HP
      phases: [
          { threshold: 70, mechanic: "AoE Fire Breath" },
          { threshold: 30, mechanic: "Summon Adds" },
          { threshold: 0, mechanic: "Enrage" }
      ]
  }
  ```

- [ ] **7.4** Difficulté Mythique+
  - Scaling infini (Mythic+1, +2, +3...)
  - Loot scaling avec difficulté
  - Leaderboard (optionnel)

- [ ] **7.5** Équipement Légendaire/Mythique/Divin
  - Stats exponentielles
  - Effets uniques
  - Système craft (fragments)

**Test** : 20 persos niveau 50 peuvent tenter Citadelle

---

### **PHASE 8 : Polish & Balance** ✨

**Durée** : 7-14 jours  
**Priorité** : HAUTE (qualité finale)  
**Fichiers** : Tous

#### **Tasks**

- [ ] **8.1** Balance général
  - Tester progression 1 → 50 (temps)
  - Ajuster formules si trop lent/rapide
  - Valider coûts craft
  - Valider production ville

- [ ] **8.2** Animations/VFX
  - Critiques (💥 bounce)
  - Level up (confetti)
  - Loot drop (sparkle)
  - Production ville (compteur animé)

- [ ] **8.3** Sons/Musique
  - SFX critique
  - SFX level up
  - SFX loot rare
  - Musique donjons/raids (optionnel)

- [ ] **8.4** Tutorial/Onboarding
  - Guide création perso
  - Expliquer métiers exponentiels
  - Expliquer prestige/multi-persos
  - Expliquer donjons/raids

- [ ] **8.5** QoL (Quality of Life)
  - Auto-sell items
  - Filtres inventaire
  - Notifications customisables
  - Raccourcis clavier

- [ ] **8.6** Performance
  - Optimiser boucle jeu (already done)
  - Lazy loading grandes listes
  - Web workers (calculs lourds)

**Test** : Expérience joueur fluide et satisfaisante

---

### **PHASE 9 : Contenu Additionnel** 🎁

**Durée** : ∞ (post-launch)  
**Priorité** : VARIABLE  
**Fichiers** : Nouveaux

#### **Ideas**

- [ ] **9.1** Système de Sorts/Mana
  - Utiliser Intelligence/Sagesse
  - Sorts actifs (fireball, heal, etc.)
  - Cooldowns, coûts mana

- [ ] **9.2** PvP (Arène)
  - Combats entre persos joueurs
  - Classement, récompenses
  - Saison compétitive

- [ ] **9.3** Guildes
  - Créer guilde
  - Bonus guilde
  - Raids guilde (coopération)

- [ ] **9.4** Événements
  - Boss mondial
  - Double XP weekend
  - Drop rate événements

- [ ] **9.5** Cosmétiques
  - Skins personnages
  - Effets d'armes
  - Montures
  - Titres

- [ ] **9.6** Nouveaux tiers infinis
  - T8, T9, T10...
  - Régions supplémentaires
  - Boss légendaires

**Test** : Contenu frais régulier pour rétention joueurs

---

## 📊 TIMELINE GLOBALE

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 0: Documentation              [✅ FAIT]     1-2 jours  │
├─────────────────────────────────────────────────────────────┤
│ PHASE 1: Stats Critiques            [⏳ TODO]    3-5 jours  │
├─────────────────────────────────────────────────────────────┤
│ PHASE 2: Métiers Exponentiels       [⏳ TODO]    5-7 jours  │
├─────────────────────────────────────────────────────────────┤
│ PHASE 3: Ville Production Massive   [⏳ TODO]    5-7 jours  │
├─────────────────────────────────────────────────────────────┤
│ PHASE 4: Cap Niveau 50              [⏳ TODO]    2-3 jours  │
├─────────────────────────────────────────────────────────────┤
│ PHASE 5: Multi-Personnages          [⏳ TODO]    7-10 jours │
├─────────────────────────────────────────────────────────────┤
│ PHASE 6: Donjons                    [⏳ TODO]    10-14 jours│
├─────────────────────────────────────────────────────────────┤
│ PHASE 7: Raids                      [⏳ TODO]    14-21 jours│
├─────────────────────────────────────────────────────────────┤
│ PHASE 8: Polish & Balance           [⏳ TODO]    7-14 jours │
└─────────────────────────────────────────────────────────────┘

TOTAL: 54-83 jours (8-12 semaines de développement)
```

**Estimation réaliste** : 3 mois pour V2.0 complète

---

## 🎯 MILESTONES

### **Milestone 1 : MVP Amélioré** (Fin Phase 3)

- ✅ Système critiques
- ✅ Métiers exponentiels
- ✅ Ville production massive
- **Résultat** : Jeu déjà beaucoup plus satisfaisant

### **Milestone 2 : Prestige Ready** (Fin Phase 5)

- ✅ Cap niveau 50
- ✅ Multi-personnages
- **Résultat** : Loop prestige fonctionnel

### **Milestone 3 : Endgame Content** (Fin Phase 7)

- ✅ Donjons
- ✅ Raids
- **Résultat** : Contenu infini disponible

### **Milestone 4 : Release 2.0** (Fin Phase 8)

- ✅ Polish complet
- ✅ Balance finale
- **Résultat** : Jeu prêt pour "release"

---

## 🔥 PRIORITÉS IMMÉDIATES

Si vous voulez des **résultats rapides et satisfaisants** :

### **Sprint 1 (Semaine 1-2)** 🚀

1. **Système critiques** (Phase 1) → Impact gameplay immédiat
2. **Formateur grands nombres** (Phase 2.1) → Prépare métiers
3. **Formule XP exponentielle** (Phase 2.2) → Métiers infinis

**Résultat** : Jeu plus fun + fondations métiers exponentiels

### **Sprint 2 (Semaine 3-4)** 🌲

1. **Métiers tiers infinis** (Phase 2.3-2.5)
2. **UI métiers grands nombres** (Phase 2.6)
3. **Production ville exponentielle** (Phase 3.1-3.2)

**Résultat** : Voir les MILLIONS de ressources !

### **Sprint 3 (Semaine 5-6)** 🏙️

1. **Coût ville multi-tiers** (Phase 3.3)
2. **UI production temps réel** (Phase 3.4)
3. **Cap niveau 50** (Phase 4)

**Résultat** : Core loop complet (level → métiers → ville)

---

## 📋 CHECKLIST VALIDATION

Avant de passer à la phase suivante, valider :

### **Validation Phase 1 (Critiques)**

- [ ] Archer niveau 20 a 52% critique visible
- [ ] Message "💥 COUP CRITIQUE!" s'affiche
- [ ] Dégâts × 2 calculés correctement
- [ ] UI montre chance critique
- [ ] Vitesse d'attaque n'est plus affectée par agilité

### **Validation Phase 2 (Métiers Exponentiels)**

- [ ] Niveau 20 métier = 332K XP requis (affiché "332K")
- [ ] Tiers T1-T5 débloqués progressivement
- [ ] Production × 3 à niveau 20
- [ ] Pas de cap niveau (peut aller 51+)
- [ ] Grands nombres formatés (1.5M, 3.2B)

### **Validation Phase 3 (Ville)**

- [ ] Niveau 20 ville = 43K ressources/min
- [ ] Coûts demandent T1+T2+T3
- [ ] T1 toujours nécessaire même niveau 50+
- [ ] Production affichée en temps réel
- [ ] Collecte passive fonctionne (AFK)

### **Validation Phase 4 (Cap 50)**

- [ ] Impossible de gagner XP après niveau 50
- [ ] Message encouragement prestige
- [ ] Temps 1 → 50 = 50-75 heures

### **Validation Phase 5 (Multi-Persos)**

- [ ] Peut créer 2e perso (coût 1M gold)
- [ ] Switch entre persos fonctionne
- [ ] Banque ressources partagée
- [ ] Ville/métiers conservés
- [ ] 2e perso level plus vite (+50% XP)

### **Validation Phase 6 (Donjons)**

- [ ] Déblocage à 3 persos niveau 50
- [ ] Combat donjon fonctionne (auto)
- [ ] Loot set équipement
- [ ] Bonus 2/4/6 pièces calculs
- [ ] Difficulté Normal/Héroïque/Mythique

### **Validation Phase 7 (Raids)**

- [ ] Déblocage à 20 persos niveau 50
- [ ] Boss 100M HP combattable
- [ ] Loot légendaire/mythique
- [ ] Mythique+ fonctionne
- [ ] Équipe 20-40 persos gérée

---

## ✅ RÉSUMÉ

Vous avez maintenant **3 documents complets** pour guider l'implémentation :

1. **BALANCE-ENDGAME-VISION.md** → Vision globale
2. **BALANCE-PROFESSIONS-EXPONENTIAL.md** → Détails métiers
3. **ROADMAP.md** (ce fichier) → Plan d'implémentation

**Prochaine étape** : Commencer Phase 1 (Système Critiques) ! 🚀

---

**Date** : 9 Octobre 2025  
**Auteur** : Vision utilisateur + AI  
**Statut** : ✅ Prêt à démarrer développement
