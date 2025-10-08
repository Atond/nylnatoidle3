# 🚀 Features Backlog - Nyln'ato Idle

> **Note**: Ce document contient les features avancées planifiées pour le jeu.  
> Ces features seront implémentées **après la Phase 1 (MVP)** du ROADMAP.

---

## 📋 Table des matières

1. [⚔️ Système de Combat](#️-système-de-combat) **← CENTRAL**
2. [🎯 Système de Quêtes](#-système-de-quêtes)
3. [👷 Système de Métiers](#-système-de-métiers)
4. [🐾 Système de Familiers & Reproduction](#-système-de-familiers--reproduction)
5. [Autres Features](#autres-features)

---

## ⚔️ Système de Combat

### Concept général

- **Phase initiale** : Le joueur clique manuellement pour infliger 1 dégât par click
- **Progression** : Gagne des niveaux → augmente les dégâts par click
- **Déblocage auto-combat** : Après une quête spécifique, le joueur peut combattre automatiquement
- **Mécanique centrale** : Le combat est le cœur du jeu (pas les cookies/clickers classiques)

### Monstres & Ennemis

**Structure hiérarchique** :

- **Régions** → contiennent plusieurs **Zones** (ex: 10 zones par région)
- **Zones** → contiennent des monstres variés avec types différents
- **Progression** : Tuer X monstres (ex: 10) pour débloquer la zone suivante
- **Difficulté croissante** : Plus le joueur avance, plus les monstres sont forts
- **Boss** : Apparaissent périodiquement, nécessitent farming pour les battre
  - Avantages des boss : XP bonus, drops rares/spéciaux

**Exemple de structure** :

```
Région 1 : Forêt des Débutants
  ├─ Zone 1 : Clairière (Slimes, Lapins)
  ├─ Zone 2 : Sous-bois (Loups, Araignées)
  ├─ Zone 5 : Boss - Ours Géant
  └─ Zone 10 : Boss - Gardien de la Forêt
```

### Statistiques du joueur

**Stats principales** :

- **PV / Endurance** : Points de vie, capacité à encaisser
- **Force** : Dégâts physiques, puissance d'attaque
- **Agilité** : Vitesse d'attaque, esquive, critiques
- **Intelligence** : Dégâts magiques, capacités spéciales
- **Sagesse** : Résistance magique, régénération, XP bonus

**Stats dérivées possibles** (à confirmer) :

- Défense physique (Force + Endurance)
- Défense magique (Intelligence + Sagesse)
- Vitesse d'attaque (Agilité)
- Taux critique (Agilité)
- Régénération HP (Endurance + Sagesse)

### Progression & Zones

- **Système de niveau** : XP gagnée en tuant des monstres
- **Montée de niveau** : Gain de stats automatique + points à distribuer ?
- **Déblocage zones** : Linéaire (tuer X monstres) ou par niveau requis ?
- **Farming** : Possibilité de rester dans une zone pour farmer XP/loot

### Butin & Récompenses

**Drops de monstres** :

- **Ressources** : Selon la zone (bois en forêt, minerais en mine...)
- **Or/Gold** : Monnaie principale
- **Équipement** : Armes, armures (à préciser)
- **Matériaux rares** : Pour crafting/métiers

### Système de combat confirmé

**Combat en temps réel** :

- Le joueur attaque à sa vitesse (basée sur Agilité)
- Le monstre attaque à sa propre vitesse
- Chaque entité a des HP

**Mécaniques de mort/échec** :

- **Option HP** : Si le joueur meurt → retour à la zone précédente
- **Option Timer** (à confirmer) : Timer par zone, si écoulé → retour zone précédente
- ⚠️ **Décision à prendre** : HP seul, Timer seul, ou Hybride (HP joueur + Timer zone) ?

### Auto-combat détaillé

✅ **Combat hors-ligne** : Le joueur continue automatiquement après déblocage via quête
✅ **Changement de zone manuel d'abord** : Déblocable plus tard dans la progression
✅ **Boss** : Passage automatique à la prochaine zone après victoire
✅ **Retour en arrière** : Possibilité de farm des zones précédentes pour ressources spécifiques

### Équipement & Craft

✅ **Pas de drop d'équipement** : Uniquement des ressources
✅ **Craft obligatoire** : Forgeron (armes/armures métal), Travailleur du cuir (armures légères), Tailleur (robes/vêtements)
✅ **Drops** : Ressources brutes (minerai, cuir, tissu, bois) sur monstres + métiers

### Notes techniques

- Gestion des **animations** de combat (important pour le feel)
- Système de **drops probabilistes** (rareté : commun, rare, épique, légendaire)
- **Offline progression** : Calcul des combats manqués au retour du joueur

---

## 🎯 Système de Quêtes

### Concept général

_[À compléter]_

### Types de quêtes

_[À compléter]_

### Récompenses

_[À compléter]_

### Progression & Déblocage

_[À compléter]_

### Intégration avec le jeu

_[À compléter]_

### Notes techniques

_[À compléter]_

---

## 👷 Système de Métiers

### Concept général

- **Phase initiale** : Le joueur clique manuellement pour récolter (1 minerai, 1 bois...)
- **Progression** : Déblocage de bâtiments qui automatisent la production
- **Objectif final** : Construire une **ville complète** montrant l'évolution du joueur

### Types de métiers

**Métiers MVP (Phase 1)** :

- 🪓 **Bûcheron** : Récolte du bois (10-20 types différents)
  - Bois commun, Chêne, Pin, Bois rare, Bois ancien, Bois magique...
  - Clics manuels → Scierie automatique (1 bâtiment upgradable)
- ⛏️ **Mineur** : Récolte de minerais (10-20 types + pierres précieuses)
  - Pierre, Fer, Cuivre, Argent, Or, Mithril, Adamantium...
  - **Pierres précieuses** : Drop rare (Rubis, Émeraude, Diamant...)
  - Clics manuels → Mine automatique (1 bâtiment upgradable)
- ⚒️ **Forgeron** : Transformation minerais + bois → équipement
  - **Craft instantané** (pas de timer)
  - Exemple recette : 10 Minerai Fer + 5 Bois = Épée en Fer
  - Interface : Onglet Métiers → Forgeron → Liste de recettes craftables

**Métiers Futurs (Post-MVP)** :

- 🌾 **Fermier** : Production de nourriture
- 🎣 **Pêcheur** : Récolte de poissons
- 🪡 **Travailleur du cuir** : Armures légères (cuir fourni par chasseurs de ville)
- 🧵 **Tailleur** : Robes et vêtements
- 🧪 **Alchimiste** : Potions, buffs
- 📜 **Enchanteur** : Amélioration d'équipement

### Progression & Niveaux

✅ **XP de métier séparée** : Couper du bois = +XP Bûcheron (indépendant du niveau de combat)
✅ **Déblocage progressif** : Niveau de métier débloque nouveaux bâtiments et recettes
✅ **Clics améliorés** : Niveau métier augmente les ressources par clic (+1 → +2 → +3...)
✅ **Outils craftés** : Pioche en fer → bonus de récolte supplémentaire

**Évolution des bâtiments** (1 seul par métier, amélioration continue) :

- **Niveau 1** : Campement de bûcherons (+ X bois commun/sec)
- **Niveau 5** : Scierie (+ XX bois/sec, déblocage bois rares)
- **Niveau 10** : Forêt enchantée (+ XXX bois/sec, bois légendaires)

### Bonus & Avantages

- **Production passive** : Remplacement progressif des clics manuels par bâtiments
- **Ressources évolutives** : Déblocage de bois/minerais rares à haut niveau
- **Synergie combat/métiers** :
  - Joueur bloqué sur boss → farm métiers → craft meilleur équipement
  - Équilibrage : Combat pour XP/stats OU métiers pour équipement
- **Engagement continu** : Trouver mécaniques pour garder le joueur actif même avec automatisation

### Intégration avec le jeu

- **Bâtiments = Buildings du jeu** (remplacent Cursor, Grandma, Farm...)
- Ressources nécessaires pour crafting d'équipement
- Construction progressive de la **ville** (aspect visuel important)

### Ressources confirmées

**Bois** : 10-20 types (Bois commun, Chêne, Pin, Saule, Érable, Bois ancien, Bois magique, Bois céleste...)
**Minerais** : 10-20 types (Pierre, Fer, Cuivre, Argent, Or, Platine, Mithril, Adamantium, Orichalque...)
**Pierres précieuses** : Drop rare pendant minage (Rubis, Saphir, Émeraude, Diamant, Améthyste...)
**Cuir** : Fourni par bâtiment "Chasseurs" dans la ville (Phase 2+)
**Tissu** : Fourni par autre source à définir (Phase 2+)
**Or** : Drop des monstres + possiblement métier

### Notes techniques

- Gestion de **20-40 types de ressources** différentes
- Interface **village/ville** séparée (onglet dédié)
- **1 bâtiment unique par métier** (upgradable infiniment ou jusqu'à niveau max)
- Système de **craft instantané** (pas de temps d'attente)
- **Base de données de recettes** extensible

---

## 🐾 Système de Familiers & Reproduction

### Concept général

- **Familiers principaux** : **Dragons** 🐉
- Système de **reproduction** entre dragons
- **Races différentes** avec attributs uniques

### Types de familiers

**Dragons par élément/type** (exemples) :

- 🔥 Dragon de Feu (bonus attaque)
- ❄️ Dragon de Glace (bonus défense)
- ⚡ Dragon de Foudre (bonus vitesse)
- 🌿 Dragon de Nature (bonus régénération)
- 🌑 Dragon des Ténèbres (bonus critique)
- ✨ Dragon Céleste (bonus XP)

### Système de reproduction

- **Croisement de races** → nouvelles races hybrides ?
- **Héritage de traits** : stats, couleurs, capacités
- **Rareté** : Commun, Rare, Épique, Légendaire
- **Temps d'incubation** des œufs (idle mechanic)

### Bonus & Compétences

- **Bonus passifs** : % attaque, défense, XP, drop rate
- **Capacités actives** : Attaques spéciales en combat ?
- **Évolution** : Les dragons grandissent et deviennent plus puissants

### Intégration avec le jeu

- Dragons accompagnent le joueur au combat ?
- Synergie avec les métiers (dragons mineurs, dragons bûcherons ?)
- Collection de dragons (aspect pokémon/élevage)

### Interface & Navigation

**Layout confirmé** :

```
┌─────────────────────────────────────────────────┐
│ [Combat] [Métiers] [Ville] [Dragons] [Guilde]  │ ← Onglets en haut
├─────────────────────────────────────────────────┤
│                                                 │
│           Zone de Combat Centrale               │
│        (Joueur vs Monstre, animations)          │
│                                                 │
├──────────────────┬──────────────────────────────┤
│   Quêtes actives │  Info Zone / Région          │
│   (sidebar ?)    │  (nom, progression)          │
└──────────────────┴──────────────────────────────┘
```

### Notes techniques

- **Interface d'élevage** dédiée (nurserie de dragons)
- **Algorithme génétique** pour la reproduction
- **Progression longue** (endgame content)

---

## 🌟 Autres Features

### 🎭 Système de Classes (Trinité RPG)

**Classes principales** :

- �️ **Tank** : Points de vie élevés, défense, protège l'équipe
  - Stats principales : Endurance, Force
  - Capacités : Provocation, Bouclier, Résistance aux dégâts
  - Équipement : Armures lourdes, boucliers, armes à une main

- ❤️ **Healer / Soigneur** : Soigne et supporte l'équipe
  - Stats principales : Sagesse, Intelligence
  - Capacités : Soins, Buffs, Régénération, Résurrection
  - Équipement : Robes, bâtons, objets magiques

- ⚔️ **DPS (Damage Dealer)** : Inflige des dégâts massifs
  - **DPS Physique** : Force, Agilité (guerrier, archer)
  - **DPS Magique** : Intelligence, Sagesse (mage, sorcier)
  - Capacités : Attaques puissantes, critiques, dégâts en zone
  - Équipement : Armes à deux mains, dagues, bâtons magiques

- 🎯 **Support / Soutien** : Utilitaire, contrôle, buffs/debuffs
  - Stats principales : Agilité, Sagesse
  - Capacités : Buffs d'équipe, Debuffs ennemis, Contrôle de foule
  - Équipement : Équipement mixte, accessoires spéciaux

**Progression des classes** :

- Choix de classe à la création du personnage
- Évolution de classe : Guerrier → Chevalier → Paladin / Berserker
- Compétences uniques par classe déblocables avec les niveaux
- Équipement spécialisé par classe (bonus si classe appropriée)

---

### �🔄 Système de Prestige / Réincarnation

**Concept** : Le joueur "recommence" avec un nouveau personnage

- **Option 1** : Nouveau personnage, garde ville/ressources/dragons
- **Option 2** : Reset complet avec bonus permanents

**Guildes & Multi-personnages** :

- **Guilde** : Collection de tous les personnages créés
- **Activation guilde** : Se déclenche au premier "recommencement" (nouveau personnage)
- **Donjons de Guilde** : Combat avec plusieurs personnages simultanément
- **Raids** : Contenu endgame nécessitant plusieurs personnages (composition équilibrée Tank/Heal/DPS)
- **Récompenses** : Ressources uniques, équipement légendaire

**Système confirmé** :
✅ **Conservation totale** : Ville, bâtiments, ressources, dragons, tous les personnages
✅ **Guilde persistante** : Ancien personnage rejoint la guilde automatiquement
✅ **Bonus de guilde** : Les anciens personnages donnent des bonus au nouveau personnage
✅ **Donjons/Raids** : Utilisation des personnages de la guilde en multi-combat
✅ **Composition d'équipe** : Besoin d'équilibrer Tank/Heal/DPS pour raids difficiles
✅ **Affectation ville** : Personnages de guilde assignables aux bâtiments pour boost production

**Affectation aux bâtiments** :

- 👷 **Personnages travaillent en ville** : Assigner des personnages de guilde aux bâtiments
  - Scierie : Personnage avec équipement "bonus bûcheron" → production +X%
  - Mine : Personnage avec équipement "bonus mineur" → production +X%
  - Forge : Personnage forgeron → craft plus rapide, meilleure qualité
- ⚒️ **Équipement dédié craft** : Nouveaux types d'équipements
  - Pioche du Maître Mineur (+50% production mine)
  - Hache du Bûcheron Légendaire (+50% production scierie)
  - Marteau du Forgeron Expert (craft qualité supérieure)
- 🎯 **Stratégie** : Personnage actif au combat OU affecté en ville (choix stratégique)
- 📊 **Synergies** : Classe appropriée = meilleur bonus (guerrier en mine, mage en laboratoire)

**Questions restantes** :

- Combien de personnages max dans la guilde ? (illimité ou limite ?)
- Type de bonus : % stats, % XP, déblocages permanents ?
- En donjon/raid : Contrôle manuel des persos ou auto-combat intelligent ?
- Personnage affecté en ville peut-il participer aux raids simultanément ?

### 🏛️ Système de Ville / Construction

**Bâtiments de production (1 par métier)** :

- 🏗️ **Scierie** (Bûcheron) : Production bois/sec, upgradable
- ⛰️ **Mine** (Mineur) : Production minerais/sec, upgradable
- 🏭 **Forge** (Forgeron) : Interface de craft, amélioration avec niveaux
- 🌾 **Fermes** (Fermier - Phase 2) : Production nourriture
- 🎣 **Port de pêche** (Pêcheur - Phase 2)
- 🏹 **Camp de chasseurs** : Production cuir automatique (Phase 2)

**Bâtiments spéciaux** :

- 🏠 **Habitations** : Déblocage de slots de personnages pour la guilde ?
- 🏛️ **Hôtel de Guilde** : Gestion multi-personnages, donjons/raids
- 🧪 **Laboratoire** : Alchimie (Phase 3)
- 📜 **Tour d'enchantement** : Enchantements (Phase 3)

**Évolution visuelle** :

- Village → Ville → Cité → Métropole
- **Aspect visuel crucial** pour montrer la progression du joueur
- Bâtiments évoluent visuellement avec leurs niveaux

---

### 🏘️ Système de Gestion de Ville (Inspiré de "Evolve Idle")

**Gestion des villageois** :

- 👥 **Population** : Nombre de villageois dans la ville
- 🏠 **Maisons** : Construction nécessaire pour augmenter la population max
  - Maison basique → Maison en pierre → Manoir → Tour d'habitation
  - Chaque niveau augmente la capacité de population
- 💼 **Affectation des villageois** : Les villageois travaillent dans les bâtiments
  - Scierie : besoin de X villageois pour production maximale
  - Mine : besoin de X villageois pour production maximale
  - Plus de villageois = production plus rapide

**Système de stockage** :

- 📦 **Entrepôts** : Limite de stockage pour chaque type de ressource
  - **Entrepôt de bois** : Stocke max X bois (upgradable)
  - **Entrepôt de minerai** : Stocke max X minerais (upgradable)
  - **Entrepôt général** : Stocke toutes les ressources (plus cher)
- 🚫 **Limite de stockage** : Production s'arrête quand l'entrepôt est plein
- 📈 **Upgrades** : Augmenter la capacité des entrepôts
  - Niveau 1 : 1 000 ressources
  - Niveau 2 : 5 000 ressources
  - Niveau 3 : 25 000 ressources
  - Etc. (croissance exponentielle)

**Système d'économie et revenus** :

- 💰 **Impôts** : Les villageois paient des impôts automatiquement
  - Génère de l'or par seconde basé sur la population
  - Taux d'impôt ajustable (bas = villageois heureux, haut = plus d'or mais moral bas ?)
- 🏛️ **Hôtel de ville** : Bâtiment central gérant les impôts et la population
  - Niveau supérieur = meilleurs taux d'impôts, plus de population max
- 💵 **Revenus passifs** : Source d'or indépendante du combat
  - Équilibre : Combat = XP/équipement, Ville = Or/ressources

**Mécanique de bonheur/moral (optionnel)** :

- 😊 **Moral des villageois** : Affecté par :
  - Taux d'impôts (élevés = moral bas)
  - Nombre de maisons disponibles
  - Nourriture disponible (fermes)
- 📉 **Pénalités moral bas** : Production réduite, revenus d'impôts réduits
- 📈 **Bonus moral haut** : Production augmentée, plus de villageois arrivent

**Référence** : S'inspirer de "Evolve Idle" pour :

- La gestion de population et affectation des travailleurs
- Le système de stockage avec limites
- L'équilibre entre production et capacité
- Les décisions stratégiques (construire maisons vs entrepôts vs production)

---

### 🎲 Système de Traits / Talents

**Concept** : Traits spéciaux obtenus en battant des boss

**Obtention des traits** :

- � **Boss de Région** : Drop de traits Common et Uncommon (20-30% chance)
- 🏰 **Boss de Donjon** : Drop de traits Rare et Epic (10-15% chance)
- 👑 **Boss de Raid** : Drop de traits Legendary (5% chance)
- 🌟 **Rareté des traits** : Common, Uncommon, Rare, Epic, Legendary
- � **Équipement de traits** : Slots de traits débloqués par progression (3 → 5 → 7 slots)
- 🔄 **Swap de traits** : Possibilité de changer les traits équipés (pas de limite)

**Exemples de traits** :

- **Combat** :
  - "Chanceux" (+10% taux de drop rare) - Uncommon - Boss Région 2
  - "Robuste" (+15% HP maximum) - Common - Boss Région 1
  - "Véloce" (+20% vitesse d'attaque) - Rare - Donjon Forêt
  - "Critique Mortel" (+10% chances de coup critique) - Epic - Donjon Cavernes
  - "Régénération" (+2% HP/seconde en combat) - Legendary - Raid Dragon
- **Métiers** :
  - "Maître Bûcheron" (+25% production bois) - Uncommon - Boss Forêt
  - "Mineur Expert" (+25% production minerai) - Uncommon - Boss Mines
  - "Artisan Prodige" (craft -15% coût ressources) - Rare - Donjon Forge
  - "Collecteur Rapide" (+30% XP métier) - Epic - Donjon Temple
- **Ville** :
  - "Leader Né" (+20% revenus d'impôts) - Rare - Boss Région 3
  - "Architecte" (-10% coût construction bâtiments) - Epic - Donjon Citadelle
  - "Inspirant" (+10% moral villageois) - Legendary - Raid Roi

**Utilité stratégique** :

- 🎯 **Farming ciblé** : Farmer un boss spécifique pour obtenir le trait désiré
- 💎 **Collection de traits** : Débloquer tous les traits = achievement
- 🏆 **Build optimisés** : Combiner traits pour spécialisation (tank, DPS, farmer)
- � **Progression verticale** : Traits légendaires = endgame content puissant
- 📊 **Liste de traits** : Interface montrant tous les traits découverts + source

---

### ⭐ Système de Prestige par Bâtiment

**Concept** : Prestige indépendant pour chaque bâtiment

**Mécanique** :

- 🔄 **Reset bâtiment** : Remet le bâtiment au niveau 1
- ✨ **Bonus permanent** : +5% production par prestige (cumulatif)
- 🏅 **Étoiles de prestige** : Affichage visuel (★★★★★)
- 📈 **Progression exponentielle** : Chaque prestige nécessite niveau plus élevé
  - Prestige 1 : Niveau 20 requis
  - Prestige 2 : Niveau 40 requis
  - Prestige 3 : Niveau 60 requis

**Déblocages spéciaux** :

- ⭐⭐⭐ **3 Prestiges** : Bâtiment "Amélioré" (nouveau skin, +10% production bonus)
- ⭐⭐⭐⭐⭐ **5 Prestiges** : Bâtiment "Légendaire" (produit ressources rares automatiquement)
  - Scierie Légendaire → produit Bois d'Érable directement (pas que Chêne)
  - Mine Légendaire → produit Minerai d'Argent directement

**Stratégie** :

- Balance : Prestige tôt (bonus rapide) vs attendre haut niveau (plus de production avant reset)
- Prestige ville entière = bonus massif mais investissement énorme

---

### 🌍 Système d'Expéditions / Explorations

**Concept** : Envoyer personnages de guilde en missions temporelles

**Types d'expéditions** :

- ⏰ **Durées variables** : 1h, 4h, 8h, 12h, 24h
- 🗺️ **Destinations** :
  - Forêt Profonde (ressources bois rares)
  - Cavernes Oubliées (minerais précieux)
  - Ruines Anciennes (équipement légendaire)
  - Îles Lointaines (dragons rares)
  - Terres Inconnues (découverte de nouvelles zones de combat)

**Mécanique** :

- 👥 **Équipe requise** : 1-5 personnages selon difficulté
- 📊 **Chances de succès** : Basées sur niveaux et équipement des personnages
- 🎲 **Récompenses aléatoires** : Plus l'expédition est longue, meilleures les récompenses
- ⚠️ **Risques** :
  - Échec : Personnages "blessés" (indisponibles 1h)
  - Échec critique : Perte d'une partie de l'équipement
  - Succès critique : Récompenses doublées

**Récompenses** :

- 💎 Ressources rares (quantités importantes)
- 🗡️ Équipement épique/légendaire
- 🐉 Œufs de dragons
- 🗺️ Nouveaux emplacements de combat débloqués
- 📜 Fragments de reliques

**Interface** :

- Sélection des personnages disponibles (pas en combat/ville)
- Aperçu des récompenses potentielles
- Timer en temps réel + notification à la fin

---

### 🏆 Système d'Accomplissements / Achievements

**Catégories** :

**Combat** :

- "Tueur en Série" : Tuer 100 / 1K / 10K monstres
- "Chasseur de Boss" : Tuer 10 / 50 / 100 boss
- "Survivant" : Survivre 100 combats sans mourir
- "Perfectionniste" : Finir un combat sans prendre de dégâts (100x)

**Métiers** :

- "Maître Bûcheron" : Récolter 10K / 100K / 1M bois
- "Roi de la Mine" : Récolter 10K / 100K / 1M minerais
- "Artisan Légendaire" : Crafter 100 / 1K / 10K objets

**Ville** :

- "Maire" : 50 villageois
- "Seigneur" : 250 villageois
- "Empereur" : 1000 villageois
- "Architecte Suprême" : 20 bâtiments niveau 10+

**Collection** :

- "Collectionneur" : Posséder 100 équipements différents
- "Maître Dresseur" : Posséder 20 dragons
- "Assembleur de Guilde" : 10 personnages dans la guilde

**Récompenses** :

- 🏅 **Titres** : Affichage cosmétique sous le nom
- ⚡ **Bonus permanents** :
  - +5% dégâts vs boss
  - Craft -10% coût
  - +10% revenus impôts
  - +5% XP global
- 🎨 **Cosmétiques** : Skins de personnages, effets visuels

---

### ⚗️ Système de Transmutation / Alchimie Avancée

**Concept** : Convertir ressources basses en ressources hautes

**Mécaniques de base** :

- 🔄 **Conversion ascendante** : Transformer ressources communes en rares
- ⚖️ **Ratio de conversion** : 100:10:1 (100 commun = 10 rare = 1 épique)
- 💰 **Coût** : Or + temps + niveau alchimiste requis
- ⏰ **Temps de transmutation** : Instantané (début) → plusieurs minutes (ressources légendaires)

**Exemples de recettes** :

- **Bois** :
  - 100 Bois de Chêne → 10 Bois d'Érable (Coût: 1K or, Niveau 5)
  - 10 Bois d'Érable → 1 Bois de Cèdre (Coût: 10K or, Niveau 10)
  - 100 Bois de Cèdre → 10 Bois Éternel (Coût: 1M or, Niveau 50)

- **Minerais** :
  - 100 Fer → 10 Argent (Coût: 2K or, Niveau 5)
  - 10 Argent → 1 Or (Coût: 20K or, Niveau 10)
  - 100 Mithril → 10 Adamantite (Coût: 500K or, Niveau 40)

- **Spécial** :
  - 1000 ressources communes mixtes → 1 Gemme aléatoire
  - 100 Gemmes communes → 1 Gemme légendaire

**Bâtiment requis** :

- 🧪 **Laboratoire d'Alchimie** : Bâtiment spécial en ville
  - Niveau 1 : Conversions basiques
  - Niveau 10 : Conversions rares
  - Niveau 20 : Conversions épiques/légendaires
  - Upgrades : Temps réduit, coût réduit, ratios améliorés

**Stratégie** :

- Utile pour convertir surplus de ressources obsolètes
- Accélérer craft d'équipement haut niveau
- Alternative au farming intensif

---

### 🎪 Système d'Événements Temporaires

**Types d'événements** :

**Événements saisonniers** :

- 🎃 **Halloween** : Boss Citrouille, décors spooky, drop bonbons → cosmétiques
- ❄️ **Hiver / Noël** : Boss Bonhomme de Neige, drops flocons → cadeaux spéciaux
- 🌸 **Printemps** : Boss Lapin Géant, drops œufs → pets exclusifs
- ☀️ **Été** : Boss Élémentaire de Feu, drops coquillages → équipement été

**Événements récurrents** :

- 💪 **Double XP Weekend** : XP combat et métiers x2 (tous les weekends)
- 🏭 **Production Boostée** : Production bâtiments x2 (aléatoire, 2x/mois)
- 💰 **Marché Spécial** : Vendeurs PNJ avec offres limitées (hebdomadaire)
- 🐉 **Invasion de Dragons** : Dragons sauvages attaquent, défendre = récompenses

**Boss événementiels** :

- 👹 **Boss uniques** : Apparaissent seulement pendant l'événement
- 🎁 **Drops exclusifs** : Équipement, cosmétiques, ressources événementielles
- 🏆 **Classement** : Qui tue le plus de boss événementiels = récompenses top
- ⏰ **Durée limitée** : 1-2 semaines max

**Ressources événementielles** :

- Exemple : "Bonbons d'Halloween" → craft citrouille cosmétique pour personnage
- Non transmuables, limitées dans le temps
- Encourage participation active pendant événement

**Calendrier** :

- Interface montrant événements à venir
- Countdown timer jusqu'au prochain événement
- Historique des événements passés + récompenses obtenues

---

### 💰 Système de Commerce / Marché (PNJ)

**Concept** : Échanger ressources avec marchands PNJ

**Marchands types** :

- 🪙 **Marchand Général** : Achète/vend ressources communes
  - Achète vos surplus à prix de base
  - Vend ressources à prix majoré (+20%)
- 💎 **Joaillier** : Spécialisé en gemmes
  - Achète gemmes à bon prix
  - Vend gemmes rares (très cher)
- 🗡️ **Marchand d'Équipement** : Équipements aléatoires
  - Offres changent quotidiennement
  - Peut vendre équipements épiques (rare)
- 🎲 **Marchand Mystérieux** : Apparaît aléatoirement
  - Offres très avantageuses (temps limité)
  - Peut demander échanges inhabituels (100 Fer contre 1 Rubis)

**Mécanique de prix** :

- 📊 **Prix fluctuants** : Basés sur vos actions
  - Beaucoup de bois récolté → prix du bois baisse
  - Peu de minerai en stock → prix du minerai monte
- 💹 **Cycles économiques** : Changent chaque semaine
  - "Semaine du Bois" : Prix bois +50%
  - "Pénurie de Fer" : Prix fer +100%

**Interface** :

- Liste des ressources avec prix achat/vente
- Graphique des prix historiques (voir tendances)
- "Meilleure offre du jour" mise en avant
- Limite de transactions par jour (éviter exploit)

**Stratégie** :

- Vendre surplus de ressources pour or
- Acheter ressources rares manquantes
- Spéculer : acheter bas, stocker, vendre haut
- Source d'or alternative au combat/impôts

---

### 🏅 Système de Rangs / Compétition

**Catégories de classements** :

**Classement Global** :

- 🏆 **Niveau le plus élevé** : Top joueurs par niveau de combat
- ⚔️ **Boss tués** : Nombre total de boss vaincus
- 🏘️ **Meilleure ville** : Score basé sur bâtiments, population, production
- 💰 **Plus riche** : Or total possédé
- 🐉 **Collection de dragons** : Nombre et rareté des dragons

**Classement Hebdomadaire** :

- 📅 **Reset chaque lundi** : Nouveaux classements
- 🎁 **Récompenses automatiques** :
  - Top 1 : Titre "Champion de la Semaine" + 1M or + équipement légendaire
  - Top 10 : 500K or + équipement épique
  - Top 100 : 100K or + ressources rares

**Classement Saisonnier** (3 mois) :

- 🌟 **Saisons** : Printemps, Été, Automne, Hiver
- 🔄 **Reset partiel** : Certaines progressions réinitialisées
- 🏆 **Récompenses exclusives** :
  - Top 1 : Relique unique + titre permanent
  - Top 10 : Dragon légendaire exclusif
  - Top 100 : Cosmétique saison exclusif

**Système de points** :

- Toutes les actions donnent des points :
  - Tuer monstre : +1 point
  - Tuer boss : +10 points
  - Crafter équipement : +5 points
  - Améliorer bâtiment : +20 points
  - Compléter quête : +50 points

**Interface** :

- Tableau des leaders avec noms et scores
- Position du joueur mise en évidence
- Aperçu des récompenses par rang
- Temps restant jusqu'au reset
- Historique des classements précédents

**Motivation** :

- Encourage engagement régulier
- Donne objectifs court/moyen/long terme
- Récompense performance et optimisation
- Crée émulation entre joueurs (même solo)

---

## 📊 Priorités d'implémentation

> **Architecture multi-systèmes** - Ordre suggéré :

### Phase 1 : MVP Combat (Semaines 1-2)

1. ⚔️ Système de combat basique (clic manuel, HP, dégâts)
2. 🗺️ Zones & monstres (3 zones test)
3. 📊 Stats joueur (Force, PV de base)
4. 💾 Sauvegarde de base

### Phase 2 : Progression (Semaines 3-4)

5. 📈 Système de niveau & XP
6. 🗡️ Équipement basique
7. 🎯 Quêtes simples (déblocage auto-combat)
8. 🏆 Drops & loot

### Phase 3 : Métiers & Économie (Semaines 5-6)

9. ⛏️ Métiers de récolte (clics manuels)
10. 🏗️ Premiers bâtiments (production passive)
11. 💰 Système de craft basique
12. 🏘️ Vue ville (visualisation)

### Phase 4 : Contenu Avancé (Semaines 7-8+)

13. 🐉 Système de familiers (dragons basiques)
14. 🔄 Prestige / Nouveau personnage
15. 👥 Guildes & multi-personnages
16. 🏰 Donjons & Raids

---

## 🔄 Statut du document

- **Créé le** : 30 septembre 2025
- **Dernière mise à jour** : 30 septembre 2025
- **Statut** : 🚧 En cours de définition
- **Phase ciblée** : Phase 5 (après MVP)
