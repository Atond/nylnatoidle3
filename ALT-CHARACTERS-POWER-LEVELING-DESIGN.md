# 🎭 SYSTÈME ALT CHARACTERS + POWER LEVELING - DESIGN COMPLET

## 🎯 **Concept Principal**

**Au lieu de Prestige** : Tu gardes ton personnage principal ET tu crées des "alts" (personnages secondaires).

**Avantages** :

- ✅ **Pas de reset frustrant** : Ton main reste intact
- ✅ **Synergie multi-persos** : Alts farmaient pour le main, main aide les alts
- ✅ **Power Leveling humoristique** : Mécaniques fun pour "boost" les alts
- ✅ **Endgame sans redondance** : Chaque perso a un rôle unique
- ✅ **Pas de limite** : 20-40 personnages possibles

---

## 🏆 **PHASE 1 : DÉBLOCAGE ALT CHARACTERS (Niveau 30)**

### **A. Quête de déblocage**

```javascript
{
    id: 'main_020_alt_unlock',
    title: '🎓 Académie des Héros',
    description: 'Vous êtes maintenant assez renommé pour entraîner de jeunes apprentis.',
    type: 'level_up',
    target: 30,
    chapter: 3,
    difficulty: 'medium',
    isMainQuest: true,

    requirements: {
        quest: 'main_028', // Boss Nymphe Sombre
        level: 30
    },

    rewards: {
        xp: 0,
        gold: 5000,
        unlocks: ['alt_characters', 'power_leveling', 'shared_storage'],
        message: '🎓 ALT CHARACTERS DÉBLOQUÉS ! Vous pouvez maintenant recruter et entraîner des apprentis !'
    }
}
```

### **B. Interface Alt Characters**

**Nouvel onglet : "🎭 Personnages"**

```
┌─────────────────────────────────────────────────┐
│ 🎭 MES PERSONNAGES (3/40)                       │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 👑 PERSONNAGE PRINCIPAL                     ┃ │
│ ┃ ⚔️ Ragnar le Conquérant - Lvl 35 (Guerrier)┃ │
│ ┃ 💰 45,230 or | 🎒 78/150 items             ┃ │
│ ┃ 🏆 Boss R3 tué | 🗺️ Région 3 débloquée     ┃ │
│ ┃                                             ┃ │
│ ┃ 🎯 Ce perso peut :                          ┃ │
│ ┃ • Farmer des ressources pour les alts      ┃ │
│ ┃ • Crafter équipement pour les alts         ┃ │
│ ┃ • Power Level les alts (boost XP)          ┃ │
│ ┃ • Accéder à tout le contenu                ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 📚 ALTS (APPRENTIS) :                           │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🛡️ Brunhilde - Lvl 15 (Tank)                │ │
│ │ 💼 Rôle : Mule Tank pour Donjons            │ │
│ │ 🎓 Entraînée par : Ragnar (+50% XP)         │ │
│ │ 📦 Équipée par Main (Set Fer complet)       │ │
│ │                                             │ │
│ │ [🎮 Jouer] [⚡ Power Level] [📦 Équiper]    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ ❤️ Freya - Lvl 12 (Prêtre)                  │ │
│ │ 💼 Rôle : Heal pour Donjons                 │ │
│ │ 🎓 Entraînée par : Ragnar (+50% XP)         │ │
│ │ ⚠️ Manque équipement (Intelligence)         │ │
│ │                                             │ │
│ │ [🎮 Jouer] [⚡ Power Level] [📦 Équiper]    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ ➕ RECRUTER UN NOUVEL APPRENTI              │ │
│ │                                             │ │
│ │ Slots : 3/40 (Débloquer +5 par boss tué)    │ │
│ │                                             │ │
│ │ ⚠️ Conseil : Créez Tank + Heal pour Donjons │ │
│ │ 💡 Main peut farmer pour équiper les alts   │ │
│ │                                             │ │
│ │       [➕ RECRUTER UN APPRENTI]             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 📦 COFFRE PARTAGÉ (2500/5000 slots)            │
│                                                 │
│ [Bois de Chêne x1200] [Fer x800] [Or x45,230]  │
│ [Épée de Fer +3 x2] [Armure Bronze x1]         │
│                                                 │
│ 💡 Le Main farm, les Alts piochent dedans !    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🚀 **PHASE 2 : POWER LEVELING SYSTEM**

### **A. Mécaniques de Power Leveling**

**Concept humoristique** : Ton main "booste" les alts avec des mécaniques fun :

#### **1. 🎓 Mentor Bonus (Passif)**

Quand un alt est créé :

- **+50% XP gain** tant que son niveau < Main Level - 10
- **+25% XP gain** tant que son niveau < Main Level - 5
- S'arrête quand Alt Level = Main Level

```javascript
calculateMentorBonus(altLevel, mainLevel) {
    const levelDiff = mainLevel - altLevel;

    if (levelDiff >= 10) return 1.50; // +50% XP
    if (levelDiff >= 5)  return 1.25; // +25% XP
    return 1.0; // Pas de bonus
}
```

#### **2. 📦 Twink Gear (Équipement du Main)**

Le Main peut **donner son équipement** aux alts :

- Équipement stocké dans **Coffre Partagé**
- Alts peuvent équiper **sans restriction de niveau** (Twinking classique)
- Message humoristique : _"Votre apprenti porte une armure 20 niveaux trop puissante. Classique."_

Exemple :

```
🎒 Inventaire de Brunhilde (Lvl 15)
┌────────────────────────────────────┐
│ ⚔️ Épée d'Acier +5 (Requis: Lvl 30)│
│ 🎓 TWINK GEAR : Aucune restriction  │
│ 💪 DMG: 180 (normalement 45)        │
│ 😏 "T'es un gros noob boosted lol"  │
└────────────────────────────────────┘
```

#### **3. 🏃 Carry Mode (Actif)**

Le Main peut **carry un alt** dans les zones :

- Main + Alt combattent **ensemble** le même monstre
- Alt gagne **100% XP** même si Main one-shot
- Main ne gagne **rien** (c'est un sacrifice)
- Cooldown : 1 carry/jour/alt

```
┌─────────────────────────────────────────────────┐
│ 🏃 CARRY MODE ACTIF                             │
├─────────────────────────────────────────────────┤
│                                                 │
│ 👑 Main : Ragnar (Lvl 35)                       │
│ 🎓 Alt : Brunhilde (Lvl 15)                     │
│                                                 │
│ ⚔️ Combat contre : Loup des Montagnes (R2)      │
│                                                 │
│ Main one-shot le mob                            │
│ Alt gagne : +250 XP (×2 bonus carry)            │
│ Main gagne : 0 XP (sacrifice)                   │
│                                                 │
│ 💬 Ragnar : "Regarde et apprends, gamin."       │
│ 💬 Brunhilde : "Wow... t'es cheat."             │
│                                                 │
│ Cooldown : 0/1 carry aujourd'hui                │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### **4. 🏭 AFK Leveling (Pour les Mules)**

Les alts peuvent **farmer AFK** dans le coffre :

- Alt défini en "Mode AFK Farm"
- Gagne **1% XP/heure** du Main (passif)
- Farm des **ressources T1** automatiquement
- Message : _"Votre mule farm du bois pendant que vous dormez. Vie de mule."_

```
┌─────────────────────────────────────────────────┐
│ 🏭 MODE AFK FARM                                │
├─────────────────────────────────────────────────┤
│                                                 │
│ 🎓 Freya (Prêtre Lvl 12)                        │
│                                                 │
│ Statut : 💤 AFK Farm depuis 6h32                │
│                                                 │
│ XP gagnée : +320 XP (1% de Ragnar/heure)        │
│ Ressources farmées :                            │
│ • Bois de Chêne : +240                          │
│ • Fer : +180                                    │
│ • Or : +450                                     │
│                                                 │
│ 💬 "Votre prêtre farm du bois. Logique."        │
│                                                 │
│         [⏸️ ARRÊTER LE FARM]                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### **5. 🎯 Quêtes Partagées (Account-wide)**

Certaines quêtes sont **partagées** entre tous les persos :

- Tuer 1000 monstres → Complété par **tous** les persos
- Récolter 5000 bois → **Pool commun**
- Message : _"Quête de guilde : Votre armée de mules a tué 1000 loups. Écologie -100."_

---

## 🏰 **PHASE 3 : DONJONS AVEC ALTS**

### **A. Composition Donjon**

**Système simple** :

- **3 persos minimum** : 1 Tank, 1 Heal, 1 DPS
- Tu **choisis** lesquels de tes alts envoyer
- Combat **automatique** (idle game)
- Tu regardes le résultat

```
┌─────────────────────────────────────────────────┐
│ 🏰 DONJON : CAVERNE DES OMBRES (Niveau 25)      │
├─────────────────────────────────────────────────┤
│                                                 │
│ ⚠️ Sélectionnez 3 personnages :                 │
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 🛡️ TANK : [▼ Brunhilde Lvl 27] ✅          ┃ │
│ ┃           Équipée : Set Acier Tank +5       ┃ │
│ ┃           Stats : 450 HP, 85 DEF, 40 END    ┃ │
│ ┃           Évaluation : ⭐⭐⭐⭐☆ (BON)     ┃ │
│ ┃ ✅ Peut tanker le boss (survie 80%)         ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ ❤️ HEAL : [▼ Freya Lvl 24] ⚠️              ┃ │
│ ┃           Équipée : Bâton Bronze +2         ┃ │
│ ┃           Stats : 30 INT, 15 WIS, 20 HPS    ┃ │
│ ┃           Évaluation : ⭐⭐☆☆☆ (FAIBLE)    ┃ │
│ ┃ ⚠️ RISQUE : Heal insuffisant (-20%)         ┃ │
│ ┃ 💡 Recommandé : Bâton Acier +5 (INT +50)    ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ ⚔️ DPS : [▼ Kael Lvl 26] ✅                ┃ │
│ ┃          Équipé : Set Acier DPS +5          ┃ │
│ ┃          Stats : 180 ATK, 120 STR, 200 DPS  ┃ │
│ ┃          Évaluation : ⭐⭐⭐⭐☆ (BON)      ┃ │
│ ┃ ✅ DPS suffisant pour tuer le boss (4min)   ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                 │
│ 📊 ESTIMATION FINALE :                          │
│ • Chance victoire : 55% ⚠️ (Heal sous-équipé)  │
│ • Durée estimée : ~5 minutes                    │
│ • Coût entrée : 500 or                          │
│ • Loot si victoire : Équipement Epic, 2000 or  │
│                                                 │
│ ⚠️ AVERTISSEMENT :                              │
│ Si échec → Perte de 500 or + 0 loot             │
│                                                 │
│ 💡 CONSEIL :                                    │
│ Améliorez Freya avant d'entrer (craft Bâton T2)│
│                                                 │
│    [🎮 LANCER MALGRÉ TOUT] [❌ Annuler]         │
│    [🛠️ Améliorer équipement d'abord]           │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **B. Combat Donjon (Auto - SIMULATION RÉELLE)**

```
┌─────────────────────────────────────────────────┐
│ 🏰 CAVERNE DES OMBRES - COMBAT EN COURS...      │
├─────────────────────────────────────────────────┤
│                                                 │
│ ⏱️ Temps écoulé : 3m 47s / ~5m                  │
│                                                 │
│ 🛡️ Brunhilde (Tank) : ❤️ [███_______] 135/450 │
│    • Encaisse 45 dégâts/sec du Boss             │
│    • Tank courageusement                        │
│    • ⚠️ HP critique bientôt ! (30%)             │
│                                                 │
│ ❤️ Freya (Heal) : ❤️ [████████__] 120/150      │
│    • Heal +20 HP/sec sur Brunhilde ⚠️ LENT      │
│    • Boss inflige 45 DPS > Heal 20 HPS !        │
│    • 🔴 PROBLÈME : Tank perd -25 HP/sec net     │
│    • Mana : 45% (diminue lentement)             │
│                                                 │
│ ⚔️ Kael (DPS) : ❤️ [██████████] 280/280         │
│    • Inflige 95 dégâts/sec au Boss              │
│    • Tape régulièrement (pas de crit)           │
│    • Boss résiste bien (-10% DEF)               │
│                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                 │
│ 👹 BOSS : Ombre Primordiale (Lvl 25)            │
│    ❤️ [████████__] 8,500/12,000 HP (71%)       │
│    • Attaque : 45 DPS sur Tank                  │
│    • Résistance : -10% dégâts physiques         │
│                                                 │
│ � ANALYSE :                                    │
│ ⚠️ Tank mourra dans ~90 secondes                │
│ ⚠️ Boss mourra dans ~120 secondes               │
│ 🔴 DÉFAITE PROBABLE : Heal trop faible !        │
│                                                 │
│ 💬 Freya : "Je heal aussi vite que possible !"  │
│ 💬 Brunhilde : "J'encaisse... mais ça fait mal."│
│                                                 │
│          [⏸️ PAUSE] [❌ ABANDONNER]             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **C. Défaite (si mal équipé)**

```
┌─────────────────────────────────────────────────┐
│ 💀 DONJON ÉCHOUÉ : DÉFAITE                      │
├─────────────────────────────────────────────────┤
│                                                 │
│ Durée : 4m 18s                                  │
│                                                 │
│ ⚰️ Brunhilde (Tank) est tombée au combat        │
│    HP : 0/450 (Heal insuffisant)                │
│                                                 │
│ 😢 AUCUNE RÉCOMPENSE                            │
│                                                 │
│ 💸 Pertes :                                     │
│ • Coût d'entrée : -500 or (perdu)               │
│ • Temps perdu : 4m 18s                          │
│                                                 │
│ 📊 RAPPORT POST-MORTEM :                        │
│                                                 │
│ 🔴 Problème identifié :                         │
│ • Freya (Heal) : 20 HPS < 45 DPS Boss           │
│ • Tank perdait -25 HP/sec net                   │
│ • Mort inévitable après 3min 30s                │
│                                                 │
│ 💡 RECOMMANDATIONS :                            │
│ 1. Améliorer Freya :                            │
│    • Craft Bâton d'Acier +5 (+30 INT)           │
│    • Équiper Robe Intelligence (+20 WIS)        │
│    → Heal attendu : 35 HPS (suffisant)          │
│                                                 │
│ 2. Alternative : Améliorer Tank                 │
│    • +50 DEF pour réduire dégâts à 35 DPS       │
│    → Survivable avec 20 HPS heal                │
│                                                 │
│ 3. Alternative : Améliorer DPS                  │
│    • +50% DPS pour tuer boss en 3min            │
│    → Tuer avant que Tank meurt                  │
│                                                 │
│ 💬 "Vous avez besoin de mieux vous équiper      │
│     avant de tenter les donjons difficiles."    │
│                                                 │
│    [🛠️ Améliorer équipement] [❌ Fermer]       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### **D. Victoire (si bien équipé)**

```
┌─────────────────────────────────────────────────┐
│ 🎉 DONJON TERMINÉ : VICTOIRE !                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Durée : 6m 12s (combat serré !)                 │
│                                                 │
│ 🏆 PERFORMANCE DE L'ÉQUIPE :                    │
│                                                 │
│ 🛡️ Brunhilde (Tank) : ⭐⭐⭐⭐☆              │
│    • A survécu avec 78/450 HP (17%)             │
│    • A encaissé 2,340 dégâts total              │
│    • MVP Tank : Résistance héroïque             │
│                                                 │
│ ❤️ Freya (Heal) : ⭐⭐⭐☆☆                    │
│    • A heal 2,180 HP total                      │
│    • Combat difficile (heal limite)             │
│    • Mana épuisée à la fin (5%)                 │
│                                                 │
│ ⚔️ Kael (DPS) : ⭐⭐⭐⭐☆                     │
│    • 12,000 dégâts infligés                     │
│    • 95 DPS constant                            │
│    • Bon DPS, boss tué à temps                  │
│                                                 │
│ 🏆 RÉCOMPENSES :                                │
│                                                 │
│ 💰 Or : +2,500                                  │
│ 🎒 Ressources :                                 │
│ • Bois de Frêne (T2) : +50                      │
│ • Acier (T2) : +50                              │
│ • Essence Magique : +10                         │
│                                                 │
│ 🎁 LOOT UNIQUE :                                │
│ • [EPIC] Casque du Gardien des Ombres          │
│   (Tank, +50 DEF, +30 END, +100 HP)             │
│ • [RARE] Bâton de Sagesse                       │
│   (Heal, +40 INT, +20 WIS, +15 HPS)             │
│                                                 │
│ 📊 XP GAGNÉE :                                  │
│ • Brunhilde : +800 XP                           │
│ • Freya : +800 XP                               │
│ • Kael : +800 XP                                │
│                                                 │
│ 💬 Commentaire :                                │
│ "Combat difficile mais victoire méritée !       │
│  Votre équipe était juste assez forte."         │
│                                                 │
│ 💡 Pour les donjons +difficiles, améliorez      │
│    encore votre équipement !                    │
│                                                 │
│         [✅ RÉCUPÉRER LE LOOT]                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 😂 **PHASE 4 : HUMOUR & MESSAGES**

### **A. Dialogues humoristiques**

**À la création d'un alt** :

```
💬 Ragnar : "Un autre apprenti ? J'ai pas assez de mules ?"
💬 Système : "Vous créez votre 5ème Tank. Vraiment ?"
💬 Système : "Encore un DPS. Personne veut heal, évidemment."
```

**En Power Leveling** :

```
💬 Alt Lvl 5 : "Wow, tu m'as donné une épée level 40 !"
💬 Main : "Oui, c'est du twinking. C'est légal, promis."
💬 Système : "Votre alt one-shot des mobs 20 niveaux au-dessus. Équilibrage 10/10."
```

**En Donjon** :

```
💬 Tank Lvl 10 : "Boss niveau 30 ?! Je vais mourir !"
💬 Main Lvl 50 : "T'inquiète, je one-shot."
💬 Heal : "À quoi je sers alors ?"
💬 Main : "Tu heal le tank pour qu'il survive 2 secondes."
💬 Système : "Le boss meurt avant que le tank perde 10% HP. Félicitations."
```

**En AFK Farm** :

```
💬 Système : "Votre prêtre farm du bois depuis 8 heures."
💬 Système : "Il a l'air de regretter ses choix de vie."
💬 Alt : "Je suis devenu bûcheron... avec un bâton magique."
```

### **B. Achievements humoristiques**

```javascript
{
    id: 'achievement_army_of_alts',
    name: '🎭 Armée de Clones',
    description: 'Créer 10 personnages alternatifs',
    reward: '+10 slots coffre partagé',
    message: 'Vous êtes officiellement schizophrène. Bravo.'
},
{
    id: 'achievement_twink_master',
    name: '💪 Maître du Twinking',
    description: 'Équiper un alt avec de l\'équipement 20+ niveaux trop haut',
    reward: '+25% XP twink gear',
    message: 'Votre alt est plus puissant que des gens 30 niveaux au-dessus. C\'est beau.'
},
{
    id: 'achievement_carry_god',
    name: '🏃 Dieu du Carry',
    description: 'Carry un alt sur 20 niveaux en une session',
    reward: 'Unlock : Carry illimité',
    message: 'Vous avez porté votre alt comme un sac de patates. Respect.'
},
{
    id: 'achievement_mule_life',
    name: '🏭 Vie de Mule',
    description: 'Laisser un alt AFK farm pendant 24h',
    reward: '+50% vitesse AFK farm',
    message: 'Votre personnage farm pendant que vous dormez. Le rêve absolu.'
},
{
    id: 'achievement_all_tanks',
    name: '🛡️ Collection de Tanks',
    description: 'Créer 5 Tanks',
    reward: '+10% DEF tous Tanks',
    message: 'Qui a besoin de DPS ou Heal ? Les tanks règnent.'
}
```

---

## 📊 **PHASE 5 : FICHIERS À CRÉER**

### **A. alt-character-manager.js**

```javascript
class AltCharacterManager {
  constructor(game) {
    this.game = game;
    this.mainCharacter = null; // Le perso principal
    this.altCharacters = []; // Liste des alts
    this.maxAlts = 40;
    this.activeCharacterId = null;
    this.sharedStorage = new SharedStorage();
  }

  createAlt(name, gender, characterClass) {
    if (this.altCharacters.length >= this.maxAlts) {
      return { success: false, message: "Nombre max d'alts atteint (40)" };
    }

    const alt = new Character({
      id: this.generateId(),
      name: name,
      gender: gender,
      class: characterClass,
      level: 1,
      isAlt: true,
      mainLevel: this.mainCharacter.level,
      mentorBonus: this.calculateMentorBonus(1, this.mainCharacter.level),
    });

    this.altCharacters.push(alt);

    return {
      success: true,
      message: `✅ ${name} recruté(e) ! Mentor Bonus : +${((alt.mentorBonus - 1) * 100).toFixed(0)}% XP`,
      alt: alt,
    };
  }

  calculateMentorBonus(altLevel, mainLevel) {
    const levelDiff = mainLevel - altLevel;

    if (levelDiff >= 10) return 1.5; // +50% XP
    if (levelDiff >= 5) return 1.25; // +25% XP
    return 1.0; // Pas de bonus
  }

  startCarryMode(altId) {
    const alt = this.altCharacters.find((a) => a.id === altId);
    if (!alt) return false;

    // Vérifier cooldown carry
    const lastCarry = alt.lastCarryTime || 0;
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24h

    if (now - lastCarry < cooldown) {
      const remainingTime = Math.ceil((cooldown - (now - lastCarry)) / 1000 / 60);
      return {
        success: false,
        message: `Cooldown carry : encore ${remainingTime} minutes`,
      };
    }

    // Activer carry mode
    this.game.combat.carryMode = true;
    this.game.combat.carriedAlt = alt;
    alt.lastCarryTime = now;

    return {
      success: true,
      message: `💪 Carry Mode activé ! ${this.mainCharacter.name} boost ${alt.name}`,
    };
  }

  startAFKFarm(altId) {
    const alt = this.altCharacters.find((a) => a.id === altId);
    if (!alt) return false;

    alt.isAFKFarming = true;
    alt.afkFarmStartTime = Date.now();

    return {
      success: true,
      message: `🏭 ${alt.name} commence à AFK farm`,
    };
  }

  updateAFKFarm(deltaTime) {
    this.altCharacters.forEach((alt) => {
      if (!alt.isAFKFarming) return;

      const hoursElapsed = (Date.now() - alt.afkFarmStartTime) / 1000 / 60 / 60;

      // 1% XP du main par heure
      const xpGain = Math.floor(this.mainCharacter.xp * 0.01 * hoursElapsed);
      alt.gainXp(xpGain);

      // Farm ressources T1 aléatoires
      const woodGain = Math.floor(Math.random() * 50 * hoursElapsed);
      const oreGain = Math.floor(Math.random() * 40 * hoursElapsed);

      this.sharedStorage.addResource("wood_oak", woodGain);
      this.sharedStorage.addResource("ore_iron", oreGain);
    });
  }
}
```

### **B. shared-storage.js**

```javascript
class SharedStorage {
  constructor() {
    this.resources = {};
    this.gold = 0;
    this.equipment = [];
    this.capacity = 5000;
    this.usedSlots = 0;
  }

  addResource(resourceId, amount) {
    if (!this.resources[resourceId]) {
      this.resources[resourceId] = 0;
    }

    this.resources[resourceId] += amount;
    this.usedSlots += amount;

    return {
      success: this.usedSlots <= this.capacity,
      message: this.usedSlots > this.capacity ? "Coffre plein !" : `+${amount} ${resourceId}`,
    };
  }

  addEquipment(equipment) {
    if (this.usedSlots >= this.capacity) {
      return { success: false, message: "Coffre plein !" };
    }

    this.equipment.push(equipment);
    this.usedSlots++;

    return { success: true, message: `Équipement ajouté au coffre partagé` };
  }

  withdrawEquipment(equipmentId, characterId) {
    const index = this.equipment.findIndex((e) => e.id === equipmentId);
    if (index === -1) return { success: false };

    const equipment = this.equipment.splice(index, 1)[0];
    this.usedSlots--;

    // Équiper le personnage (sans restriction de niveau = Twinking)
    return { success: true, equipment: equipment };
  }
}
```

---

## ✅ **CHECKLIST IMPLÉMENTATION**

### **Phase 1 : Alt Characters Base** (3-4h)

- [ ] alt-character-manager.js
- [ ] shared-storage.js
- [ ] UI onglet "👥 Personnages"
- [ ] Création d'alt (formulaire)
- [ ] Switch entre persos
- [ ] Sauvegarde/Chargement multi-persos

### **Phase 2 : Power Leveling** (2-3h)

- [ ] Mentor Bonus (calcul dynamique)
- [ ] Twink Gear (équipement sans restriction)
- [ ] Carry Mode (main boost alt)
- [ ] AFK Farm (alts farm passif)
- [ ] Messages humoristiques

### **Phase 3 : Donjons Multi-Persos** (4-5h)

- [ ] Composition 3 persos (Tank/Heal/DPS)
- [ ] Combat automatique donjon
- [ ] Loot distribution
- [ ] UI Sélection équipe

### **Phase 4 : Polish & Humour** (2h)

- [ ] Achievements humoristiques
- [ ] Dialogues contextuels
- [ ] Statistiques (total alts, carry count, etc.)

**TOTAL : ~12h de développement**

---

## ⚖️ **SYSTÈME D'ÉQUILIBRAGE DES DONJONS**

### **A. Calcul de difficulté automatique**

```javascript
calculateDungeonChance(tank, heal, dps, dungeon) {
    // TANK : Vérifier survie
    const tankEHP = tank.hp * (1 + tank.defense / 100); // Effective HP
    const bossDPS = dungeon.boss.attack;
    const tankSurvivalTime = tankEHP / bossDPS; // Temps avant mort

    // HEAL : Vérifier heal/sec
    const healPerSec = heal.intelligence * 0.5 + heal.wisdom * 0.3;
    const netDamage = bossDPS - healPerSec; // Dégâts net sur Tank

    // DPS : Vérifier temps pour tuer
    const dpsPerSec = dps.attack * (1 + dps.strength / 100);
    const timeToKillBoss = dungeon.boss.hp / dpsPerSec;

    // SIMULATION : Tank survit jusqu'à mort du boss ?
    let actualSurvivalTime;
    if (netDamage > 0) {
        // Heal insuffisant → Tank perd HP
        actualSurvivalTime = tank.hp / netDamage;
    } else {
        // Heal suffisant → Tank survit indéfiniment
        actualSurvivalTime = Infinity;
    }

    // VICTOIRE si Tank survit jusqu'à mort boss
    const willWin = actualSurvivalTime >= timeToKillBoss;
    const winChance = Math.min(100, (actualSurvivalTime / timeToKillBoss) * 100);

    return {
        willWin: willWin,
        chance: Math.round(winChance),
        timeToKill: timeToKillBoss,
        tankSurvival: actualSurvivalTime,
        warnings: [
            netDamage > 0 ? `⚠️ Tank perd ${netDamage.toFixed(1)} HP/sec net` : '✅ Tank stable',
            timeToKillBoss > 180 ? '⚠️ Combat très long (>3min)' : '✅ Combat rapide',
            winChance < 70 ? '🔴 Échec probable, améliorez équipement' : '✅ Victoire probable'
        ]
    };
}
```

### **B. Stats requises par donjon (guide)**

```javascript
const dungeonRequirements = {
  caverne_ombres: {
    level: 25,
    recommendedStats: {
      tank: {
        hp: 400,
        defense: 80,
        endurance: 35,
        minSurvival: "5 minutes avec heal moyen",
      },
      heal: {
        intelligence: 50,
        wisdom: 25,
        healPerSec: 30,
        note: "Boss fait 40 DPS, il faut 30+ HPS",
      },
      dps: {
        attack: 150,
        strength: 100,
        dpsPerSec: 80,
        note: "Boss a 12,000 HP, il faut 80+ DPS",
      },
    },
    boss: {
      hp: 12000,
      attack: 40,
      defense: 10,
      mechanics: "Attaque simple sur Tank",
    },
    estimatedTime: "4-6 minutes",
    failureCost: 500,
    successReward: "Epic Tank/Heal gear, 2500 or",
  },

  temple_oublie: {
    level: 35,
    recommendedStats: {
      tank: {
        hp: 600,
        defense: 120,
        endurance: 50,
      },
      heal: {
        intelligence: 80,
        wisdom: 40,
        healPerSec: 50,
        note: "Boss fait 65 DPS avec spikes à 100",
      },
      dps: {
        attack: 250,
        strength: 150,
        dpsPerSec: 140,
        note: "Boss a 25,000 HP avec phases",
      },
    },
    boss: {
      hp: 25000,
      attack: 65,
      defense: 20,
      mechanics: "Spike damage toutes les 30s (+50% dégâts)",
    },
    estimatedTime: "6-8 minutes",
    failureCost: 1500,
    successReward: "Epic+ gear avec set bonus, 7500 or",
  },
};
```

### **C. Messages d'avertissement intelligents**

```javascript
function checkTeamReadiness(tank, heal, dps, dungeon) {
  const warnings = [];
  const recommendations = [];

  // Vérifier Tank
  const tankEHP = tank.hp * (1 + tank.defense / 100);
  const requiredEHP = dungeon.boss.attack * 180; // Doit survivre 3min minimum
  if (tankEHP < requiredEHP) {
    warnings.push("🔴 Tank : HP/DEF trop faibles");
    recommendations.push(
      `Craft armure ${dungeon.level} (+${Math.round(requiredEHP - tankEHP)} EHP requis)`
    );
  }

  // Vérifier Heal
  const healPower = heal.intelligence * 0.5 + heal.wisdom * 0.3;
  const requiredHeal = dungeon.boss.attack * 0.7; // Doit heal 70% des dégâts minimum
  if (healPower < requiredHeal) {
    warnings.push("🔴 Heal : Intelligence/Sagesse trop faibles");
    recommendations.push(
      `Craft bâton/robe Intelligence (+${Math.round(requiredHeal - healPower)} INT requis)`
    );
  }

  // Vérifier DPS
  const dpsOutput = dps.attack * (1 + dps.strength / 100);
  const requiredDPS = dungeon.boss.hp / 240; // Doit tuer en 4min maximum
  if (dpsOutput < requiredDPS) {
    warnings.push("🔴 DPS : Attaque/Force trop faibles");
    recommendations.push(
      `Craft épée/armure Force (+${Math.round(requiredDPS - dpsOutput)} ATK requis)`
    );
  }

  return {
    isReady: warnings.length === 0,
    warnings: warnings,
    recommendations: recommendations,
    estimatedChance: calculateWinChance(tank, heal, dps, dungeon),
  };
}
```

---

## 🎯 **AVANTAGES DE CE SYSTÈME ÉQUILIBRÉ**

✅ **Pas frustrant** : Main jamais reset, toujours disponible  
✅ **Challenge réel** : Donjons difficiles = besoin d'équipement optimal  
✅ **Rejouabilité** : Tester toutes les classes sans perdre le main  
✅ **Progression claire** : Stats calculées = savoir exactement quoi améliorer  
✅ **Humour intact** : Messages auto-mockery même en cas d'échec  
✅ **Idle-friendly** : AFK farm = parfait pour idle game  
✅ **Pas de carry facile** : Carry limité aux zones ±10 niveaux  
✅ **Récompenses méritées** : Loot Epic seulement si victoire

---

## 💬 **Question pour toi**

**Veux-tu que je :**

1. ⚡ **Crée les fichiers maintenant** (alt-character-manager.js + shared-storage.js) ?
2. 📋 **Ajoute les quêtes** de déblocage dans quests-data.js ?
3. 🎨 **Commence par l'UI** (onglet Personnages) ?
4. 😂 **Écris tous les messages humoristiques** en premier ?

**Dis-moi par où commencer !** 🚀
