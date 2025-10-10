# 🌟 VISION ENDGAME - IDLE RPG EXPONENTIEL

> **Date** : 9 Octobre 2025  
> **Version** : 2.0 Vision  
> **Objectif** : Créer un idle RPG moderne avec progression exponentielle et endgame riche

---

## 🎯 PHILOSOPHIE GÉNÉRALE

### **Les 3 Piliers du Jeu**

```
┌─────────────────────────────────────────────────────────────┐
│  1. EARLY GAME (Niveaux 1-50)                               │
│     → Histoire / Régions / Premier personnage               │
│     → Progression linéaire et rapide                        │
│     → Découverte des mécaniques                             │
├─────────────────────────────────────────────────────────────┤
│  2. MID GAME (Métiers exponentiels)                         │
│     → Métiers niveau 1 → 1000+ (millions de ressources)    │
│     → Ville = production passive MASSIVE                    │
│     → Déblocage multi-personnages (prestige)                │
├─────────────────────────────────────────────────────────────┤
│  3. ENDGAME (Donjons + Raids)                               │
│     → Level cap 50 atteint                                  │
│     → Focus équipement légendaire/mythique                  │
│     → Donjons (3-5 persos) → Raids (20-40 persos)          │
│     → Contenu infini                                        │
└─────────────────────────────────────────────────────────────┘
```

**Comme WoW, le vrai jeu commence au niveau max !**

---

## 📊 PARTIE 1 : NIVEAU PERSONNAGE (CAP 50)

### **Concept**

- **Niveau maximum = 50** (atteint en 30-50 heures)
- **Linéaire et narratif** : Progression à travers les régions/histoire
- **Pas exponentiel** : Courbe XP raisonnable (base × niveau²)
- **Objectif** : Découvrir le monde, débloquer mécaniques, finir l'histoire

### **Progression Type**

| Niveau | XP Total    | Temps Cumulé | Milestone                          |
| ------ | ----------- | ------------ | ---------------------------------- |
| 1      | 0           | 0h           | Début                              |
| 10     | 5 000       | 3h           | Boss Région 1, Premier craft       |
| 20     | 40 000      | 10h          | Boss Région 2, Métiers débloqués   |
| 30     | 135 000     | 25h          | Boss Région 3, Équipement rare     |
| 40     | 320 000     | 45h          | Boss Région 4, Prépa endgame       |
| **50** | **625 000** | **75h**      | **CAP ATTEINT** → Endgame débloqué |

**Après niveau 50** :

- ✅ Plus de XP personnage (cap permanent)
- ✅ Focus 100% équipement/métiers/donjons
- ✅ Déblocage système prestige (nouveau perso)

---

## ⛏️ PARTIE 2 : MÉTIERS EXPONENTIELS

### **Concept**

> **"Les métiers c'est là où on voit des MILLIONS de ressources !"**

- **Pas de cap niveau** : Métiers niveau 1 → 100 → 1000 → ∞
- **Progression exponentielle** : Chaque niveau demande 50% de plus d'XP
- **Ressources massives** : Ville produit 100K bois/min à haut niveau
- **Tous les tiers utilisés** : T1 toujours nécessaire (craft, ville, upgrades)

### **Formule XP Métiers**

```javascript
// XP pour atteindre niveau N
xpRequired(level) {
    return 100 × (1.5 ** level)  // +50% par niveau (EXPONENTIEL)
}

// Exemples
Level 10:  57 000 XP
Level 20:  3 325 000 XP (3.3M)
Level 30:  191 751 000 XP (191M)
Level 50:  637 621 973 000 XP (637 MILLIARDS)
Level 100: 4.38e27 XP (ASTRONOMIQUE)
```

### **Déblocages par Niveau**

#### **Woodcutter (Bûcheron)**

| Niveau  | Déblocage              | Production/Récolte  | Temps          |
| ------- | ---------------------- | ------------------- | -------------- |
| **1**   | Bois Normal (T1)       | 1 bois/coup         | Instantané     |
| **5**   | Bois de Chêne (T2)     | 1 chêne/coup        | 1 heure        |
| **10**  | Bois Ancien (T3)       | 1 ancien/coup       | 5 heures       |
| **20**  | Bois Mystique (T4)     | 1 mystique/coup     | 1 jour         |
| **30**  | Bois Divin (T5)        | 1 divin/coup        | 3 jours        |
| **50**  | Bois Primordial (T6)   | 1 primordial/coup   | 1 semaine      |
| **100** | Bois Transcendant (T7) | 1 transcendant/coup | 1 mois         |
| **∞**   | Tiers infinis...       | Scaling infini      | Scaling infini |

**Important** : La quantité récoltée reste **1 par coup**, mais :

- La **valeur** augmente (T7 > T1)
- La **rareté** augmente (utilisé pour craft rare)
- Les **bonus métier** augmentent la quantité

#### **Bonus de Niveau Métier**

```javascript
// Bonus EXPONENTIEL sur quantité récoltée
bonusAmount(level) {
    return 1 + (level × 0.1)  // +10% par niveau
}

// Exemples
Niveau 1:   ×1.1  (1.1 bois/coup)
Niveau 10:  ×2.0  (2 bois/coup)
Niveau 50:  ×6.0  (6 bois/coup)
Niveau 100: ×11.0 (11 bois/coup)
```

**Combiné avec la ville** :

- Ville niveau 1 : +10 bois/min
- Ville niveau 10 : +1000 bois/min
- Ville niveau 50 : +100K bois/min
- Ville niveau 100 : +10M bois/min (DIX MILLIONS par minute !)

---

## 🏙️ PARTIE 3 : VILLE (PRODUCTION PASSIVE MASSIVE)

### **Concept**

> **"La ville produit des CENTAINES de MILLIERS de ressources T1/T2/T3"**

- **Scaling exponentiel** : Chaque niveau = ×1.5 production
- **Coût exponentiel** : Demande de plus en plus de ressources T1+T2+T3
- **Multi-tiers** : Toujours besoin de T1 même à haut niveau
- **Production passive** : Fonctionne même AFK

### **Formule Production Ville**

```javascript
// Production par minute
production(building, level) {
    const BASE = {
        sawmill: 10,      // 10 bois/min niveau 1
        mine: 10,         // 10 minerai/min niveau 1
        farm: 20,         // 20 nourriture/min niveau 1
        quarry: 5         // 5 pierre/min niveau 1
    }

    return BASE[building] × (1.5 ** level)
}

// Coût upgrade (demande TOUS les tiers précédents)
upgradeCost(building, level) {
    return {
        t1: 1000 × (2 ** level),      // Toujours nécessaire
        t2: 500 × (2 ** (level - 5)),  // Si niveau > 5
        t3: 200 × (2 ** (level - 10)), // Si niveau > 10
        gold: 10000 × (3 ** level)
    }
}
```

### **Exemple : Sawmill (Scierie)**

| Niveau | Production Bois/min | Coût Upgrade (Bois T1 + Chêne T2 + Ancien T3 + Gold) |
| ------ | ------------------- | ---------------------------------------------------- |
| **1**  | 10/min              | -                                                    |
| **5**  | 75/min              | 32K T1 + 0 T2 + 50K gold                             |
| **10** | 575/min             | 1M T1 + 16K T2 + 500K gold                           |
| **20** | 43K/min             | 1B T1 + 512K T2 + 4K T3 + 3.5B gold                  |
| **30** | 3.3M/min            | 1T T1 + 524M T2 + 1M T3 + 205T gold                  |
| **50** | 1.8B/min            | ASTRONOMIQUE                                         |

**Clé** : On utilise **toujours** le bois T1, même à niveau 50 !

---

## 🔄 PARTIE 4 : SYSTÈME PRESTIGE (NOUVEAU PERSONNAGE)

### **Concept**

> **"Au lieu de reset, on crée un NOUVEAU personnage qui hérite de la ville"**

- **Pas de reset** : L'ancien perso reste jouable
- **Multi-persos** : Switch entre personnages (comme WoW)
- **Héritage ville** : Tous les persos partagent la même ville/métiers
- **Déblocages progressifs** : 3 persos → Donjons, 20 persos → Raids

### **Déblocage Nouveau Personnage**

```javascript
PRESTIGE_UNLOCK: {
    firstCharacter: { level: 50, cost: 0 },           // Gratuit (histoire)
    secondCharacter: { level: 50, cost: 1000000 },    // 1M gold
    thirdCharacter: { level: 50, cost: 5000000 },     // 5M gold + Donjons débloqués
    fifthCharacter: { level: 50, cost: 50000000 },    // 50M gold + Bonus
    tenthCharacter: { level: 50, cost: 500000000 },   // 500M gold + Bonus
    twentyPersos: { dungeonRaids: true }              // Raids débloqués
}
```

### **Bonus Hérités (Partagés entre Persos)**

| Élément Partagé     | Description                                 |
| ------------------- | ------------------------------------------- |
| **Ville**           | ✅ Tous niveaux bâtiments conservés         |
| **Métiers**         | ✅ Niveaux métiers (bûcheron, mineur, etc.) |
| **Ressources**      | ✅ Banque partagée (bois, minerai, gold)    |
| **Recettes**        | ✅ Toutes recettes craft débloquées         |
| **Donjons/Raids**   | ✅ Accès permanent                          |
| **Montures/Titres** | ✅ Collection partagée                      |

| Élément Individuel  | Description                             |
| ------------------- | --------------------------------------- |
| **Niveau**          | ❌ Repart niveau 1                      |
| **Stats**           | ❌ Stats de base (force, agilité, etc.) |
| **Équipement**      | ❌ Inventaire vide                      |
| **Quêtes histoire** | ❌ Refaire régions 1-5                  |

**Avantages** :

- Le 2e perso level beaucoup **plus vite** (ville boost XP, ressources abondantes)
- Diversité classes (1er = Guerrier, 2e = Mage, etc.)
- Préparation donjons (need équipe de 3-5 persos)

### **Exemple Timeline**

```
Jour 1-30:   Premier personnage (Guerrier) niveau 1 → 50
Jour 31:     Débloquer Archer, remonter niveau 1 → 50 (2x plus rapide)
Jour 45:     Débloquer Mage, niveau 1 → 50 (3x plus rapide)
Jour 50:     3 PERSOS NIVEAU 50 → DONJONS DÉBLOQUÉS
Jour 60:     5 persos niveau 50
Jour 100:    10 persos niveau 50
Jour 200:    20 persos niveau 50 → RAIDS DÉBLOQUÉS
```

---

## 🏰 PARTIE 5 : ENDGAME PvE

### **5.1 Donjons (3-5 Personnages)**

**Déblocage** : 3 personnages niveau 50

#### **Mécanique**

- **Composition** : 1 Tank + 1 Healer + 1-3 DPS
- **Durée** : 15-30 minutes par run
- **Difficulté** : Normal / Héroïque / Mythique
- **Récompenses** : Équipement Set (bonus 2/4/6 pièces)

#### **Premiers Donjons**

| Donjon                | Niveau Requis | Boss | Loot Principal     |
| --------------------- | ------------- | ---- | ------------------ |
| **Temple de l'Ombre** | 50 (3 persos) | 3    | Set Ombre (DPS)    |
| **Forteresse Gelée**  | 50 (3 persos) | 4    | Set Glace (Tank)   |
| **Sanctuaire Sacré**  | 50 (4 persos) | 5    | Set Lumière (Heal) |
| **Tour du Mage Noir** | 50 (5 persos) | 7    | Set Arcane (Mage)  |

#### **Exemple Set Équipement**

```javascript
SET_SHADOW: {
    name: "Ensemble de l'Ombre",
    pieces: ["Casque", "Plastron", "Gants", "Jambes", "Bottes", "Cape"],
    bonuses: {
        2: "+10% dégâts critiques",
        4: "+20% dégâts physiques",
        6: "Compétence 'Furtivité' : +50% DPS pendant 10 sec (CD 60 sec)"
    },
    stats: {
        casque: { agility: 50, endurance: 30, critChance: 5 },
        // ... etc
    }
}
```

---

### **5.2 Raids (20-40 Personnages)**

**Déblocage** : 20 personnages niveau 50

#### **Mécanique**

- **Composition** : 5-8 Tanks + 5-8 Healers + 10-24 DPS
- **Durée** : 1-3 heures par run
- **Difficulté** : Normal / Héroïque / Mythique / Mythique+
- **Récompenses** : Équipement Légendaire/Mythique unique

#### **Premiers Raids**

| Raid                      | Persos Requis | Boss | Loot Principal          |
| ------------------------- | ------------- | ---- | ----------------------- |
| **Citadelle des Anciens** | 20            | 10   | Armes Légendaires       |
| **Nexus du Chaos**        | 25            | 12   | Armures Mythiques       |
| **Palais du Roi Dragon**  | 30            | 15   | Bijoux Divins           |
| **Abysse Éternel**        | 40            | 20   | Équipement Transcendant |

#### **Exemple Boss Raid**

```javascript
RAID_BOSS_DRAGON_KING: {
    name: "Roi Dragon Infernus",
    level: 50,
    hp: 100000000,  // 100 MILLIONS HP
    damage: 5000,
    mechanics: [
        "Phase 1 (100-70%): Souffle de feu AoE (need 5 tanks)",
        "Phase 2 (70-30%): Invoque adds (need DPS focus)",
        "Phase 3 (30-0%): Enrage (need max DPS + heal)"
    ],
    loot: {
        guaranteed: "Fragment Légendaire (10 needed pour craft arme)",
        chance: {
            legendary_weapon: 5,   // 5% drop
            mythic_armor: 10,      // 10% drop
            divine_gem: 20         // 20% drop
        }
    },
    difficulty: {
        normal: { hp: 1x, damage: 1x, loot: 1x },
        heroic: { hp: 2x, damage: 1.5x, loot: 2x },
        mythic: { hp: 5x, damage: 2x, loot: 5x },
        mythicPlus: { hp: 10x, damage: 3x, loot: 10x, unique: true }
    }
}
```

---

## 🎮 BOUCLE DE JEU COMPLÈTE

### **Phase 1 : Early Game (Jours 1-30)**

```
Level 1 → 50 premier perso
  ↓
Finir histoire Régions 1-5
  ↓
Métiers niveau 10-20 (premières millions ressources)
  ↓
Ville niveau 5-10 (production passive démarrée)
  ↓
Premier set rare/épique craft
```

### **Phase 2 : Mid Game (Jours 30-100)**

```
Débloquer 2-5 nouveaux persos
  ↓
Métiers niveau 50+ (centaines de millions ressources)
  ↓
Ville niveau 20+ (millions de ressources/min)
  ↓
Donjons débloqués (3+ persos niveau 50)
  ↓
Farmer sets donjons (bonus 2/4/6 pièces)
```

### **Phase 3 : Endgame (Jours 100+)**

```
20+ persos niveau 50
  ↓
Raids débloqués (boss 100M+ HP)
  ↓
Métiers niveau 100+ (MILLIARDS de ressources)
  ↓
Ville niveau 50+ (MILLIARDS ressources/min)
  ↓
Farm équipement Légendaire/Mythique/Divin
  ↓
Progression infinie (Mythique+, nouveau contenu)
```

---

## 📊 COURBES DE PROGRESSION VISUELLES

### **Niveau Personnage (Linéaire)**

```
Niveau
  50 |                                    ████ (CAP)
  40 |                          ████████
  30 |                ████████
  20 |      ████████
  10 | ████
   1 |█
     └────────────────────────────────────────→ Temps
      5h  10h  20h  30h  40h  50h  60h  70h
```

### **Métiers (Exponentiel)**

```
Niveau
1000 |                                         █
 500 |                                    █
 200 |                               █
 100 |                          █
  50 |                     █
  20 |           █
  10 |      █
   1 |  █
     └─────────────────────────────────────────→ Temps
      1j   1w   1m   3m   6m   1y   2y   ∞
```

### **Production Ville (Exponentiel)**

```
Ressources/min
10B |                                      █
 1B |                                 █
100M|                            █
 10M|                       █
  1M|                  █
100K|             █
 10K|        █
  1K|   █
   10|█
     └─────────────────────────────────────────→ Niveau Ville
      1   5   10  15  20  25  30  35  40  45  50
```

---

## 🎯 RÉSUMÉ DES CHANGEMENTS CLÉS

### **Ce qui change par rapport au plan original**

| Aspect            | Avant               | Après (Nouvelle Vision)         |
| ----------------- | ------------------- | ------------------------------- |
| **Niveau perso**  | Scaling exponentiel | ✅ CAP 50 (linéaire)            |
| **Métiers**       | Cap niveau 50       | ✅ INFINI (exponentiel)         |
| **Ville**         | Production modeste  | ✅ MILLIONS/min (exponentiel)   |
| **Prestige**      | Reset complet       | ✅ Nouveau perso (héritage)     |
| **Endgame**       | Farm équipement     | ✅ Donjons + Raids (PvE riche)  |
| **Ressources T1** | Obsolètes late game | ✅ TOUJOURS utilisées           |
| **Gros chiffres** | Absents             | ✅ MILLIONS/MILLIARDS (métiers) |

---

## 📋 TODO - IMPLÉMENTATION

### **Phase 1 : Métiers Exponentiels** 🔥

- [ ] Modifier formule XP métiers (×1.5 par niveau)
- [ ] Ajouter tiers infinis (T1 → T7 → T∞)
- [ ] Système bonus niveau métier (+10% par niveau)
- [ ] Formatter grands nombres (1.5M, 3.2B, etc.)
- [ ] UI métiers avec progression exponentielle

### **Phase 2 : Ville Scaling** 🏙️

- [ ] Production exponentielle (×1.5 par niveau)
- [ ] Coût multi-tiers (T1+T2+T3 toujours nécessaires)
- [ ] Pas de cap niveau bâtiments
- [ ] UI production avec grands chiffres
- [ ] Notifications "Vous avez produit 1M de bois!"

### **Phase 3 : Multi-Personnages** 🔄

- [ ] Système création nouveau perso (après niveau 50)
- [ ] Banque partagée (ressources/gold)
- [ ] Sélecteur personnage (switch)
- [ ] Bonus leveling persos suivants
- [ ] UI gestion multi-persos

### **Phase 4 : Donjons** 🏰

- [ ] Système composition équipe (3-5 persos)
- [ ] Premiers donjons (Temple Ombre, etc.)
- [ ] Sets équipement (bonus 2/4/6)
- [ ] Difficulté Normal/Héroïque/Mythique
- [ ] Loot table donjons

### **Phase 5 : Raids** 👑

- [ ] Déblocage 20 persos niveau 50
- [ ] Système composition raid (20-40 persos)
- [ ] Boss raid (100M+ HP, mechanics)
- [ ] Équipement Légendaire/Mythique
- [ ] Mythique+ (difficulté infinie)

---

## ✨ CONCLUSION

Votre vision crée un jeu qui combine :

1. **Accessible** : Niveau 50 = cap rapide (50-75h)
2. **Infini** : Métiers/Ville progression sans fin
3. **Satisfaisant** : Gros chiffres (millions/milliards)
4. **Stratégique** : Multi-persos, composition équipe
5. **Endgame riche** : Donjons, Raids, Mythique+

C'est un **idle RPG moderne** qui respecte les codes du genre (gros chiffres, prestige) tout en ajoutant une **profondeur stratégique** (multi-persos, raids) !

**Prêt à implémenter ?** 🚀

---

**Date** : 9 Octobre 2025  
**Auteur** : Vision utilisateur + AI  
**Statut** : ✅ Approuvé pour documentation
