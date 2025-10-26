# 🎯 PROJET ÉQUILIBRAGE & PROGRESSION

> **Date création** : 24 Octobre 2025  
> **Statut** : 📋 PLANIFICATION  
> **Objectif** : Système de progression cohérent avec quêtes, déblocages et équilibrage

---

## 📊 ÉTAT DES LIEUX (AUDIT)

### ✅ Ce qui existe déjà

#### **Systèmes Fonctionnels**

- ✅ **Combat** : 5 régions, zones, monstres, boss
- ✅ **Métiers** : 11 professions (4 récolte + 7 craft)
  - Bûcheron, Mineur, Herboriste, Pêcheur
  - Forgeron, Armurier, Bijoutier, Alchimiste, Poissonnier, Tailleur, Transmutation
- ✅ **Craft** : Système de recettes avec matériaux
- ✅ **Ville** : Bâtiments de production (Scierie, Mine, Ferme)
- ✅ **Dragons** : Système complet d'élevage et hybridation
- ✅ **Quêtes** : QuestManager + Quest class fonctionnels
- ✅ **UI** : Système d'onglets avec déblocage progressif

#### **Ressources Disponibles**

- 🪵 **Bois** : 20 types (Chêne → Éternel)
- ⚒️ **Minerais** : 20 types (Fer → Adamantine)
- 💎 **Gemmes** : 20 types (Quartz → Étoile)
- 🎁 **Butin** : Par région (R1-R5)
- 🌿 **Plantes** : 20 types (Pissenlit → Essence Ancienne)
- 🐟 **Poissons** : 20 types (Ruisseau → Âme Océanique)
- 🧵 **Tissus** : 20 types (Lin → Tissu du Néant)

#### **Documentation Existante**

- 📚 `BALANCE-OVERVIEW.md` : Vision globale niveau 1-50
- 📚 `ROADMAP.md` : Phases d'implémentation V2
- 📚 `BALANCE-PROFESSIONS-EXPONENTIAL.md` : Métiers infinis
- 📚 `BALANCE-STAT-CHANGES.md` : Nouveau système stats

### ⚠️ Ce qui manque

#### **Déblocages Non Structurés**

- ❌ Pas de progression claire des métiers (quand débloquer Alchimiste ?)
- ❌ Pas de quêtes pour débloquer les nouveaux métiers
- ❌ Onglets débloqués trop vite (Récolte = 10 kills, Ville = 50 kills)
- ❌ Dragons débloqués à 100 kills (trop tôt ?)
- ❌ Aucune quête pour guider le joueur

#### **Équilibrage Incomplet**

- ❌ Recettes trop peu nombreuses (4 par craft profession)
- ❌ Pas de lien entre niveau joueur et métiers
- ❌ Bâtiments débloqués arbitrairement
- ❌ Ressources T1 vs T2 vs T3 non équilibrées

#### **Progression Floue**

- ❌ Pas de "milestone" clairs (niveau 5, 10, 15, 20...)
- ❌ Pas de récompenses pour atteindre un niveau
- ❌ Pas de tutoriel intégré
- ❌ Joueur peut se perdre (trop de choix d'un coup)

---

## 🎯 OBJECTIFS DU PROJET

### **Vision Globale**

Créer une progression **linéaire et guidée** de niveau 1 à 50 avec :

1. **Quêtes narratives** qui racontent une histoire
2. **Déblocages progressifs** des onglets, métiers, bâtiments
3. **Équilibrage cohérent** des coûts, temps, récompenses
4. **Milestones** gratifiants tous les 5 niveaux

### **Principes de Design**

#### 🎮 **Progression Satisfaisante**

```
Niveau 1-10  : TUTORIEL    (1-2h)  → Apprendre les bases
Niveau 11-20 : EXPLORATION (3-5h)  → Débloquer tous les systèmes
Niveau 21-35 : MAÎTRISE    (8-12h) → Optimiser son build
Niveau 36-50 : ENDGAME     (15-25h)→ Contenu difficile
```

#### ⚔️ **Boucle de Gameplay**

```
Combat → XP/Gold/Drops → Level Up
   ↓                         ↑
Quêtes → Déblocages → Métiers/Craft → Équipement meilleur
   ↓                                        ↑
Ville → Production passive → Ressources ───┘
```

#### 🔓 **Déblocages Progressifs**

- **Niveau 1** : Combat uniquement
- **Niveau 3** : Récolte (Bûcheron + Mineur)
- **Niveau 5** : Équipement + Craft basique
- **Niveau 8** : Ville (Scierie, Mine)
- **Niveau 10** : Herboriste + Pêcheur
- **Niveau 12** : Alchimiste
- **Niveau 15** : Poissonnier + Tailleur
- **Niveau 20** : Dragons
- **Niveau 25** : Ferme (tissus)
- **Niveau 30** : Transmutation
- **Niveau 40** : Guilde (préparation multi-joueur)

---

## 📋 PLAN D'ACTION (6 PHASES)

### **PHASE 1 : SYSTÈME DE QUÊTES** 🎯 (PRIORITÉ HAUTE)

**Durée estimée** : 1-2 jours  
**Objectif** : Créer 20-30 quêtes qui guident le joueur de 1 à 50

#### Tasks

- [ ] **1.1** Concevoir l'arbre de quêtes (diagramme)
  - Quêtes principales (storyline)
  - Quêtes secondaires (métiers, craft)
  - Quêtes optionnelles (bonus)

- [ ] **1.2** Écrire les quêtes niveau 1-10 (Tutoriel)
  - Q1 : "Premiers Pas" (tuer 5 monstres) → Débloquer XP
  - Q2 : "Chasseur Novice" (tuer 15 monstres) → Débloquer Récolte
  - Q3 : "Récolter du bois" (10 chêne) → Débloquer Bûcheron niveau 2
  - Q4 : "Récolter du fer" (10 fer) → Débloquer Mineur niveau 2
  - Q5 : "Artisan Débutant" (niveau 5) → Débloquer Équipement + Craft
  - Q6 : "Premier équipement" (craft 1 arme) → Débloquer Forgeron
  - Q7 : "Chasseur Confirmé" (tuer 50 monstres) → Débloquer Ville
  - Q8 : "Construire une Scierie" → Production passive bois
  - Q9 : "Construire une Mine" → Production passive minerai
  - Q10 : "Boss des Plaines" (tuer boss R1) → Débloquer Région 2

- [ ] **1.3** Écrire les quêtes niveau 11-20 (Exploration)
  - Débloquer Herboriste (niveau 10)
  - Débloquer Pêcheur (niveau 10)
  - Débloquer Alchimiste (niveau 12)
  - Débloquer Poissonnier (niveau 15)
  - Débloquer Tailleur (niveau 15)
  - Débloquer Dragons (niveau 20)

- [ ] **1.4** Écrire les quêtes niveau 21-35 (Maîtrise)
  - Débloquer Ferme (niveau 25)
  - Débloquer Transmutation (niveau 30)
  - Améliorer bâtiments niveau 5+

- [ ] **1.5** Écrire les quêtes niveau 36-50 (Endgame)
  - Débloquer Guilde (niveau 40)
  - Préparer Prestige (niveau 50)

- [ ] **1.6** Implémenter dans `quests-data.js`
  - Ajouter toutes les quêtes
  - Configurer rewards
  - Configurer requirements (chaîne de quêtes)

- [ ] **1.7** Tester le flow complet de quêtes
  - Vérifier qu'on peut aller de 1 à 50
  - Vérifier que tous les déblocages fonctionnent
  - Ajuster les valeurs si nécessaire

**Fichiers concernés** :

- `src/config/quests-data.js`
- `src/js/quest-manager.js`
- `src/js/ui.js` (affichage quêtes)

---

### **PHASE 2 : DÉBLOCAGES PROGRESSIFS** 🔓 (PRIORITÉ HAUTE)

**Durée estimée** : 1 jour  
**Objectif** : Lier les déblocages aux quêtes et niveaux

#### Tasks

- [ ] **2.1** Refactoriser `unlockTab()` pour supporter les conditions

  ```javascript
  unlockTab(tabName, conditions = {}) {
    // Vérifier niveau minimum
    if (conditions.level && player.level < conditions.level) return false;
    // Vérifier quête complétée
    if (conditions.quest && !questManager.isCompleted(conditions.quest)) return false;
    // Débloquer
    this.tabs[tabName].locked = false;
  }
  ```

- [ ] **2.2** Configurer les conditions de déblocage
      | Onglet | Niveau Min | Quête Requise |
      |--------|-----------|---------------|
      | Combat | 1 | - |
      | Récolte | 3 | "Premiers Pas" |
      | Équipement | 5 | "Artisan Débutant" |
      | Craft | 5 | "Artisan Débutant" |
      | Ville | 8 | "Chasseur Confirmé" |
      | Alchimie | 12 | "Débloquer Alchimiste" |
      | Dragons | 20 | "Maître Dragon" |
      | Guilde | 40 | "Héros Légendaire" |

- [ ] **2.3** Ajouter déblocage progressif des MÉTIERS
  - Bûcheron : niveau 1 (auto)
  - Mineur : niveau 1 (auto)
  - Herboriste : niveau 10 + quête
  - Pêcheur : niveau 10 + quête
  - Forgeron : niveau 5 + craft 1 arme
  - Armurier : niveau 5 + craft 1 armure
  - Bijoutier : niveau 8 + avoir 1 gemme
  - Alchimiste : niveau 12 + Herboriste 5
  - Poissonnier : niveau 15 + Pêcheur 5
  - Tailleur : niveau 15 + Ferme construite
  - Transmutation : niveau 30 + Alchimiste 10

- [ ] **2.4** Ajouter déblocage progressif des BÂTIMENTS
  - Scierie : niveau 8 + quête Ville
  - Mine : niveau 8 + quête Ville
  - Entrepôt : niveau 10 + Scierie niveau 2
  - Trésorerie : niveau 12 + Mine niveau 2
  - Labo Alchimie : niveau 15 + Alchimiste débloqué
  - Ferme : niveau 25 + Herboriste niveau 10
  - Ferme Dragons : niveau 20 + Dragons débloqués

- [ ] **2.5** Créer UI de "locked state"
  - Afficher l'icône cadenas 🔒
  - Tooltip : "Requis : Niveau X + Quête Y"
  - Griser l'élément non débloqué

- [ ] **2.6** Tester tous les déblocages
  - Vérifier que tout se débloque dans l'ordre
  - Vérifier qu'on ne peut pas tricher
  - Vérifier les messages de déblocage

**Fichiers concernés** :

- `src/js/ui.js`
- `src/js/profession-manager.js`
- `src/js/building-manager.js`
- `src/config/buildings-data.js`

---

### **PHASE 3 : ÉQUILIBRAGE ÉCONOMIE** 💰 (PRIORITÉ MOYENNE)

**Durée estimée** : 2-3 jours  
**Objectif** : Rééquilibrer coûts, drops, production

#### Tasks

- [ ] **3.1** Analyser les courbes actuelles
  - Combien d'or gagne-t-on par niveau ?
  - Combien de ressources par minute ?
  - Quel est le coût des crafts ?

- [ ] **3.2** Créer un fichier de balance

  ```javascript
  // balance-config.js
  const BalanceConfig = {
    goldPerLevel: (level) => 50 + level * 25, // Gold/kill
    xpPerLevel: (level) => 100 * Math.pow(1.15, level - 1),
    craftCostMultiplier: 1.5, // Coût augmente de 50% par tier
    productionMultiplier: 2.0, // Production ×2 par niveau de bâtiment
  };
  ```

- [ ] **3.3** Rééquilibrer les drops de monstres
  - Région 1 (niveau 1-10) : 10-30 gold/kill
  - Région 2 (niveau 11-20) : 50-100 gold/kill
  - Région 3 (niveau 21-30) : 150-300 gold/kill
  - Région 4 (niveau 31-40) : 500-1000 gold/kill
  - Région 5 (niveau 41-50) : 1500-3000 gold/kill

- [ ] **3.4** Rééquilibrer les coûts de craft
  - Tier 1 (niveau 1-10) : 50-200 gold + ressources T1
  - Tier 2 (niveau 11-20) : 500-1000 gold + ressources T2
  - Tier 3 (niveau 21-30) : 2000-5000 gold + ressources T3
  - Tier 4 (niveau 31-40) : 10K-20K gold + ressources T4
  - Tier 5 (niveau 41-50) : 50K-100K gold + ressources T5

- [ ] **3.5** Rééquilibrer la production des bâtiments
  - Scierie niveau 1 : 10 bois/min (600/h)
  - Mine niveau 1 : 10 minerai/min (600/h)
  - Ferme niveau 1 : 5 tissu/min (300/h)
  - Multiplier par 1.5 à chaque niveau

- [ ] **3.6** Créer un simulateur de progression
  - Script qui simule un joueur de niveau 1 à 50
  - Vérifier que tout est achetable
  - Vérifier qu'il n'y a pas de "mur"

- [ ] **3.7** Documenter les valeurs finales
  - Créer `BALANCE-FINAL-VALUES.md`
  - Tableau récapitulatif de tous les coûts

**Fichiers concernés** :

- `src/config/balance-config.js` (NOUVEAU)
- `src/config/regions-data.js`
- `src/config/craft-recipes-data.js`
- `src/config/buildings-data.js`

---

### **PHASE 4 : CONTENU (RECETTES)** 📜 (PRIORITÉ MOYENNE)

**Durée estimée** : 2-3 jours  
**Objectif** : Créer 100+ recettes de craft

#### Tasks

- [ ] **4.1** Définir le nombre de recettes par profession
  - Forgeron : 20 recettes (armes + outils)
  - Armurier : 25 recettes (5 slots × 5 tiers)
  - Bijoutier : 15 recettes (accessoires)
  - Alchimiste : 20 recettes (potions)
  - Poissonnier : 15 recettes (nourriture)
  - Tailleur : 20 recettes (armures légères)
  - Transmutation : 10 recettes (conversions)

- [ ] **4.2** Créer template de recette

  ```javascript
  {
    id: 'recipe_xxx',
    name: 'Nom',
    profession: 'xxx',
    professionLevel: X,
    tier: X,
    materials: [
      { resourceId: 'xxx', amount: X },
      { resourceId: 'yyy', amount: Y }
    ],
    craftTime: XXXX,
    result: { type: 'equipment/consumable', ... },
    requiredLevel: X
  }
  ```

- [ ] **4.3** Générer recettes Forgeron (armes)
  - Tier 1 : Épée de fer, Hache de fer, Arc de bois
  - Tier 2 : Épée d'acier, Hache d'acier, Arc renforcé
  - Tier 3 : Épée de mithril, Hache de mithril, Arc composite
  - Tier 4 : Épée d'adamantine, Hache d'adamantine, Arc runique
  - Tier 5 : Épée divine, Hache divine, Arc céleste

- [ ] **4.4** Générer recettes Armurier (armures)
  - 5 slots : Casque, Plastron, Jambes, Bottes, Bouclier
  - 5 tiers : Fer, Acier, Mithril, Adamantine, Divin
  - 25 recettes au total

- [ ] **4.5** Générer recettes Bijoutier
  - Anneaux : +Force, +Agilité, +Intelligence, etc.
  - Amulettes : +HP, +Défense, +Critique, etc.
  - 3 tiers par type

- [ ] **4.6** Générer recettes Alchimiste
  - Potions HP : Mineure, Normale, Majeure, Supérieure, Divine
  - Potions Stats : Force, Agilité, Intelligence (temporaires)
  - Élixirs : Bonus permanents

- [ ] **4.7** Générer recettes Poissonnier
  - Plats HP : Soupe, Ragoût, Festin
  - Buffs combat : +Dégâts, +Défense, +Vitesse
  - Buffs métiers : +XP, +Production

- [ ] **4.8** Générer recettes Tailleur
  - Robes : Mage (Intelligence)
  - Tuniques : Archer (Agilité)
  - Capes : Universelles
  - Gants/Bottes légères

- [ ] **4.9** Générer recettes Transmutation
  - Bois T1 → T2 (10:1)
  - Minerai T1 → T2 (10:1)
  - Gemmes T1 → T2 (5:1)

- [ ] **4.10** Implémenter dans `craft-recipes-data.js`
  - Ajouter toutes les recettes
  - Vérifier les IDs de ressources
  - Tester le craft

**Fichiers concernés** :

- `src/config/craft-recipes-data.js`

---

### **PHASE 5 : UI/UX AMÉLIORATION** 🎨 (PRIORITÉ BASSE)

**Durée estimée** : 1-2 jours  
**Objectif** : Améliorer l'expérience utilisateur

#### Tasks

- [ ] **5.1** Créer tracker de progression
  - Barre de progression niveau joueur
  - Liste des quêtes actives (côté droit ?)
  - Prochains déblocages à venir

- [ ] **5.2** Améliorer tooltips
  - Expliquer chaque stat
  - Expliquer chaque métier
  - Expliquer chaque bâtiment

- [ ] **5.3** Ajouter notifications visuelles
  - "Level Up !" avec animation
  - "Quête complétée !" avec son
  - "Nouveau déblocage !" avec popup

- [ ] **5.4** Créer guide du débutant
  - Modal au premier lancement
  - Étapes 1-2-3 pour commencer
  - "Skip Tutorial" pour les pros

- [ ] **5.5** Améliorer inventaire
  - Filtres par tier (T1, T2, T3...)
  - Tri par rareté
  - Afficher quantité/limite

**Fichiers concernés** :

- `src/js/ui.js`
- `src/css/main.css`
- `index.html`

---

### **PHASE 6 : TESTING & POLISSAGE** 🧪 (PRIORITÉ HAUTE)

**Durée estimée** : 2-3 jours  
**Objectif** : Tester et corriger tous les bugs

#### Tasks

- [ ] **6.1** Test complet niveau 1-50
  - Jouer de façon normale
  - Noter tous les problèmes
  - Noter tous les déséquilibres

- [ ] **6.2** Test des edge cases
  - Sauvegarde/Chargement à chaque niveau
  - Refresh de la page
  - Déblocages multiples simultanés

- [ ] **6.3** Test de balance
  - Est-ce qu'on a assez d'or ?
  - Est-ce qu'on a assez de ressources ?
  - Est-ce que les crafts sont utiles ?

- [ ] **6.4** Corrections de bugs
  - Fixer tous les bugs trouvés
  - Re-tester après chaque fix

- [ ] **6.5** Documentation finale
  - CHANGELOG.md à jour
  - README.md à jour
  - Guide joueur

**Fichiers concernés** :

- Tous les fichiers modifiés
- `CHANGELOG.md`
- `README.md`

---

## 📊 SUIVI DU PROJET

### **Timeline Estimée**

- **Phase 1** : Quêtes (1-2j) → Semaine 1
- **Phase 2** : Déblocages (1j) → Semaine 1
- **Phase 3** : Équilibrage (2-3j) → Semaine 2
- **Phase 4** : Recettes (2-3j) → Semaine 2-3
- **Phase 5** : UI/UX (1-2j) → Semaine 3
- **Phase 6** : Testing (2-3j) → Semaine 3-4

**Durée totale** : 3-4 semaines (à temps partiel)

### **Priorités**

1. 🔥 **PHASE 1 + 2** : Quêtes & Déblocages (CRITIQUE)
2. 🔥 **PHASE 6** : Testing (CRITIQUE)
3. ⚠️ **PHASE 3** : Équilibrage (IMPORTANT)
4. ⚠️ **PHASE 4** : Recettes (IMPORTANT)
5. ℹ️ **PHASE 5** : UI/UX (NICE TO HAVE)

---

## 🎯 MILESTONE 1 (MVP)

**Objectif** : Avoir une progression jouable de niveau 1 à 20  
**Durée** : 1 semaine

### Tasks Milestone 1

- [x] Audit complet (FAIT - ce document)
- [ ] Phase 1.2 : Quêtes niveau 1-10 (Tutoriel)
- [ ] Phase 1.3 : Quêtes niveau 11-20 (Exploration)
- [ ] Phase 2 : Déblocages progressifs (complet)
- [ ] Phase 6.1 : Test niveau 1-20

**Critères de succès** :

- ✅ Joueur peut aller de niveau 1 à 20 sans bloquer
- ✅ Tous les onglets se débloquent progressivement
- ✅ Tous les métiers de base sont débloqués
- ✅ Quêtes guident le joueur
- ✅ Pas de bugs critiques

---

## 🚀 DÉMARRAGE

**Prochaine action** : Commencer PHASE 1 - Système de Quêtes

Par quoi commencer ?

1. **Conception arbre de quêtes** (diagramme visuel)
2. **Écriture quêtes tutoriel** (niveau 1-10)
3. **Implémentation dans code**

**Question** : Voulez-vous que je commence par l'arbre de quêtes ou directement par l'écriture des quêtes ?
