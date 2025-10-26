# 🗺️ SYSTÈME DE QUÊTES COMPLET - NYLN'ATO IDLE RPG

> **Date** : 24 Octobre 2025  
> **Version** : 1.0  
> **Objectif** : Progression narrative et guidée de niveau 1 à 50

---

## 📜 PHILOSOPHIE DES QUÊTES

### **Principes Fondamentaux**

#### 🎯 **Pas de récompenses arbitraires**

```
❌ MAUVAIS : "Tuer 10 monstres → 100 XP + 50 gold"
✅ BON     : "Tuer 10 monstres → Débloquer l'onglet Récolte"
```

#### 📖 **Narration intégrée**

Chaque quête raconte une histoire :

- Le joueur arrive dans un monde inconnu
- Il apprend à se battre
- Il découvre les ressources
- Il construit une ville
- Il devient un héros légendaire
- Il dompte les dragons

#### 🔓 **Déblocages progressifs**

```
Quête → Nouveau système → Maîtriser → Quête suivante
  ↓                           ↓
Frustration                Satisfaction
"Je suis bloqué"          "Ah ! Nouvelle mécanique !"
```

#### 🎮 **Guidance naturelle**

Le joueur ne doit JAMAIS se demander "Qu'est-ce que je fais maintenant ?"

- La quête active montre toujours l'objectif
- La récompense montre toujours ce qui vient après
- Le joueur a toujours envie de voir la suite

---

## 🌳 ARBRE DE QUÊTES (NIVEAU 1-50)

### **Légende**

- 📌 **Quête principale** : Obligatoire pour progresser
- 🔵 **Quête métier** : Débloquer/améliorer un métier
- 🏗️ **Quête ville** : Construction/amélioration
- 🐉 **Quête dragon** : Système dragons
- ⭐ **Quête milestone** : Récompense importante tous les 5-10 niveaux

---

## 📊 PHASE 1 : RÉVEIL (NIVEAU 1-5) - TUTORIEL

**Narration** : _Vous vous réveillez dans un monde inconnu. Il faut survivre._

### 📌 Q1 : "L'Éveil" (OBLIGATOIRE)

- **ID** : `quest_awakening`
- **Trigger** : Démarrage du jeu
- **Objectif** : Tuer votre premier monstre
- **Texte** : _"Vous ouvrez les yeux dans les Plaines Verdoyantes. Un Slime des Plaines s'approche. Défendez-vous !"_
- **Progression** : Tuer 1 monstre (n'importe lequel)
- **Récompense** :
  - 🎯 **Tutorial popup** : "Félicitations ! Vous venez de gagner de l'XP et de l'or."
  - 🔓 **Débloquer** : Interface de combat visible

---

### 📌 Q2 : "Premiers Pas de Guerrier" (OBLIGATOIRE)

- **ID** : `quest_first_steps`
- **Prérequis** : Q1 complétée
- **Objectif** : Tuer 10 monstres
- **Texte** : _"Vous commencez à comprendre. Pour survivre ici, il faut devenir plus fort. Battez 10 créatures pour prouver votre valeur."_
- **Progression** : Tuer 10 monstres (n'importe lesquels, zone 1-1)
- **Récompense** :
  - 🔓 **Débloquer** : Onglet "⚔️ Équipement"
  - 💬 **Message** : "Vous pouvez maintenant équiper des armes et armures ! Vérifiez vos drops de combat."

---

### 📌 Q3 : "S'équiper pour Survivre" (OBLIGATOIRE)

- **ID** : `quest_equip_first_gear`
- **Prérequis** : Q2 complétée
- **Objectif** : Équiper 1 arme OU 1 armure
- **Texte** : _"Vos poings ne suffiront pas longtemps. Utilisez l'équipement que vous avez trouvé sur vos ennemis."_
- **Progression** : Équiper n'importe quel item dans n'importe quel slot
- **Récompense** :
  - 🔓 **Débloquer** : Bouton "Auto-combat" (simplifie le grinding)
  - 💬 **Message** : "Auto-combat débloqué ! Le jeu peut maintenant jouer pour vous en arrière-plan."

---

### ⭐ Q4 : "Explorer les Alentours" (MILESTONE)

- **ID** : `quest_explore_zone1`
- **Prérequis** : Q3 complétée
- **Objectif** : Atteindre niveau 3
- **Texte** : _"Vous êtes prêt. Explorez les Plaines Verdoyantes et devenez plus fort."_
- **Progression** : Atteindre niveau personnage 3
- **Récompense** :
  - 🔓 **Débloquer** : Onglet "⛏️ Métiers" (Bûcheron + Mineur visibles)
  - 🔓 **Débloquer** : Zone 1-2 "Pâturages Paisibles"
  - 💬 **Message** : "Nouveau pouvoir débloqué ! Vous pouvez maintenant récolter des ressources en cliquant sur les boutons Bûcheron et Mineur."

---

### 🔵 Q5 : "Le Bois, Ressource Précieuse"

- **ID** : `quest_learn_woodcutting`
- **Prérequis** : Q4 complétée
- **Objectif** : Récolter 20 Bois de Chêne
- **Texte** : _"Le bois est partout autour de vous. Apprenez à l'exploiter."_
- **Progression** : Avoir 20 wood_oak dans l'inventaire (via clics manuels)
- **Récompense** :
  - 🔓 **Débloquer** : Auto-récolte Bûcheron (bouton visible)
  - 💬 **Message** : "Vous pouvez maintenant activer la récolte automatique de bois !"

---

### 🔵 Q6 : "Le Fer, Métal des Rois"

- **ID** : `quest_learn_mining`
- **Prérequis** : Q4 complétée (parallèle à Q5)
- **Objectif** : Récolter 20 Fer
- **Texte** : _"Le minerai est la base de toute civilisation. Récoltez du fer."_
- **Progression** : Avoir 20 ore_iron dans l'inventaire
- **Récompense** :
  - 🔓 **Débloquer** : Auto-récolte Mineur (bouton visible)
  - 💬 **Message** : "Vous pouvez maintenant activer la récolte automatique de minerai !"

---

### 📌 Q7 : "Artisan Débutant" (OBLIGATOIRE)

- **ID** : `quest_become_crafter`
- **Prérequis** : Q5 + Q6 complétées
- **Objectif** : Atteindre niveau 5
- **Texte** : _"Avec bois et fer, vous pouvez créer des merveilles. Mais d'abord, devenez plus expérimenté."_
- **Progression** : Atteindre niveau personnage 5
- **Récompense** :
  - 🔓 **Débloquer** : Onglet "🔨 Artisanat" (Forgeron, Armurier, Bijoutier visibles mais grisés)
  - 💬 **Message** : "L'artisanat est maintenant accessible ! Mais vous devez d'abord maîtriser chaque métier..."

---

## 📊 PHASE 2 : ARTISAN (NIVEAU 5-10) - CRAFT

**Narration** : _Vous ne vous contentez plus de survivre. Il est temps de créer._

### 🔵 Q8 : "Forger sa Première Arme"

- **ID** : `quest_unlock_blacksmith`
- **Prérequis** : Q7 complétée
- **Objectif** : Bûcheron niveau 3 + Mineur niveau 3
- **Texte** : _"Un vrai forgeron connaît ses matériaux. Maîtrisez d'abord la récolte."_
- **Progression** : Monter Bûcheron ET Mineur à niveau 3
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Forgeron" (utilisable)
  - 🎁 **Cadeau** : 1× Recette "Épée de Fer" débloquée automatiquement
  - 💬 **Message** : "Forgeron débloqué ! Vous pouvez maintenant crafter des armes dans l'onglet Artisanat."

---

### 🔵 Q9 : "Forger l'Acier"

- **ID** : `quest_craft_first_weapon`
- **Prérequis** : Q8 complétée
- **Objectif** : Crafter 1 arme (n'importe laquelle)
- **Texte** : _"La théorie c'est bien, la pratique c'est mieux. Forgez votre première arme !"_
- **Progression** : Crafter n'importe quelle arme
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Armurier" (utilisable)
  - 🎁 **Cadeau** : 1× Recette "Casque de Fer" débloquée
  - 💬 **Message** : "Armurier débloqué ! Vous pouvez maintenant crafter des armures."

---

### 🔵 Q10 : "Polir les Gemmes"

- **ID** : `quest_unlock_jeweler`
- **Prérequis** : Q7 complétée (parallèle à Q8-Q9)
- **Objectif** : Obtenir 1 gemme (n'importe laquelle)
- **Texte** : _"Vous trouvez une gemme brillante sur un cadavre. Les pierres précieuses peuvent être travaillées..."_
- **Progression** : Avoir 1 gemme dans l'inventaire (drop de combat)
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Bijoutier" (utilisable)
  - 🎁 **Cadeau** : 1× Recette "Anneau de Quartz" débloquée
  - 💬 **Message** : "Bijoutier débloqué ! Vous pouvez transformer les gemmes en bijoux puissants."

---

### ⭐ Q11 : "Chasseur de Boss" (MILESTONE)

- **ID** : `quest_boss_plains`
- **Prérequis** : Q8 + Q9 + Q10 complétées
- **Objectif** : Vaincre le Boss de la Région 1
- **Texte** : _"Un monstre redoutable terrorise les Plaines. Êtes-vous prêt à l'affronter ?"_
- **Progression** : Tuer "Géant des Plaines" (boss zone 1-4, niveau 10)
- **Récompense** :
  - 🔓 **Débloquer** : Région 2 "Montagnes Grises"
  - 🔓 **Débloquer** : Onglet "🏘️ Ville"
  - 🎁 **Cadeau** : 500 gold (pour construire premier bâtiment)
  - 💬 **Message** : "Région 2 débloquée ! Vous pouvez maintenant construire une ville pour automatiser la production de ressources."

---

## 📊 PHASE 3 : BÂTISSEUR (NIVEAU 10-15) - VILLE

**Narration** : _Vous avez prouvé votre valeur. Il est temps de fonder une civilisation._

### 🏗️ Q12 : "Première Pierre"

- **ID** : `quest_build_sawmill`
- **Prérequis** : Q11 complétée
- **Objectif** : Construire une Scierie (niveau 1)
- **Texte** : _"Vous ne pouvez pas tout faire manuellement. Construisez une Scierie pour produire du bois automatiquement."_
- **Progression** : Construire building "sawmill"
- **Récompense** :
  - 💬 **Message** : "Votre Scierie produit maintenant 10 bois/minute ! Vous pouvez l'améliorer pour augmenter la production."
  - 🎯 **Hint** : "Astuce : Les bâtiments continuent de produire même quand vous êtes déconnecté !"

---

### 🏗️ Q13 : "Mine d'Or... de Fer !"

- **ID** : `quest_build_mine`
- **Prérequis** : Q12 complétée
- **Objectif** : Construire une Mine (niveau 1)
- **Texte** : _"Le bois c'est bien, mais le fer c'est indispensable. Creusez une mine !"_
- **Progression** : Construire building "mine"
- **Récompense** :
  - 🔓 **Débloquer** : Bâtiment "Entrepôt" (visible dans l'onglet Ville)
  - 💬 **Message** : "Mine construite ! Vous produisez maintenant 10 minerai/minute."

---

### 🏗️ Q14 : "Agrandir les Réserves"

- **ID** : `quest_build_warehouse`
- **Prérequis** : Q13 complétée
- **Objectif** : Construire un Entrepôt (niveau 1)
- **Texte** : _"Vos coffres débordent. Vous avez besoin de plus d'espace de stockage."_
- **Progression** : Construire building "warehouse"
- **Récompense** :
  - 💬 **Message** : "Limite de stockage augmentée ! Vous pouvez maintenant stocker plus de ressources."
  - 🎯 **Hint** : "Améliorez vos bâtiments pour augmenter leur efficacité !"

---

### 🔵 Q15 : "Découvrir la Flore"

- **ID** : `quest_unlock_herbalist`
- **Prérequis** : Q11 complétée (niveau 10+)
- **Objectif** : Atteindre niveau 12
- **Texte** : _"En explorant les montagnes, vous découvrez des plantes étranges. Peut-être ont-elles des propriétés utiles ?"_
- **Progression** : Atteindre niveau personnage 12
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Herboriste" (visible et utilisable)
  - 💬 **Message** : "Herboriste débloqué ! Vous pouvez maintenant récolter des plantes pour l'alchimie."

---

### 🔵 Q16 : "Les Rivières Regorgent de Vie"

- **ID** : `quest_unlock_fisher`
- **Prérequis** : Q11 complétée (parallèle à Q15)
- **Objectif** : Explorer la Zone 2-2 "Vallées Neigeuses"
- **Texte** : _"Les rivières de montagne sont pleines de poissons. Apprenez à les pêcher."_
- **Progression** : Débloquer zone 2-2 (atteindre niveau requis + tuer monstres zone 2-1)
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Pêcheur" (visible et utilisable)
  - 💬 **Message** : "Pêcheur débloqué ! Les poissons ont des propriétés nutritives et peuvent être cuisinés."

---

### ⭐ Q17 : "Le Pouvoir de l'Alchimie" (MILESTONE)

- **ID** : `quest_unlock_alchemist`
- **Prérequis** : Q15 complétée + Herboriste niveau 5
- **Objectif** : Récolter 50 plantes (n'importe lesquelles)
- **Texte** : _"Vous maîtrisez la cueillette. Il est temps d'apprendre à transformer ces plantes en potions."_
- **Progression** : Avoir 50 plantes au total dans l'inventaire
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Alchimiste" (utilisable)
  - 🔓 **Débloquer** : Onglet "🧪 Alchimie" (Transmutation)
  - 🎁 **Cadeau** : 3× Recettes de potions basiques débloquées
  - 💬 **Message** : "Alchimiste débloqué ! Vous pouvez créer des potions de soin et des élixirs."

---

### 🔵 Q18 : "L'Art Culinaire"

- **ID** : `quest_unlock_fishmonger`
- **Prérequis** : Q16 complétée + Pêcheur niveau 5
- **Objectif** : Récolter 50 poissons (n'importe lesquels)
- **Texte** : _"Les poissons crus, c'est bon. Mais cuits, c'est mieux !"_
- **Progression** : Avoir 50 poissons au total dans l'inventaire
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Poissonnier" (utilisable)
  - 🎁 **Cadeau** : 3× Recettes de plats de poisson débloquées
  - 💬 **Message** : "Poissonnier débloqué ! Vos plats donnent des bonus temporaires au combat."

---

## 📊 PHASE 4 : CONQUÉRANT (NIVEAU 15-25) - EXPANSION

**Narration** : _Votre ville prospère. Il est temps de conquérir de nouveaux territoires._

### ⭐ Q19 : "Maître des Montagnes" (MILESTONE)

- **ID** : `quest_boss_mountains`
- **Prérequis** : Q17 + Q18 complétées + Niveau 20
- **Objectif** : Vaincre le Boss de la Région 2
- **Texte** : _"Un dragon des glaces règne sur les sommets. Prouvez que vous êtes digne de le défier."_
- **Progression** : Tuer "Dragon de Glace" (boss zone 2-4, niveau 20)
- **Récompense** :
  - 🔓 **Débloquer** : Région 3 "Forêt Ancestrale"
  - 🔓 **Débloquer** : Onglet "🐉 Dragons"
  - 💬 **Message** : "Dragons débloqués ! Vous pouvez maintenant capturer et élever des dragons pour vous aider au combat."

---

### 🐉 Q20 : "Premier Compagnon"

- **ID** : `quest_first_dragon`
- **Prérequis** : Q19 complétée
- **Objectif** : Capturer votre premier dragon
- **Texte** : _"Les dragons peuvent être vos alliés. Capturez-en un et domptez-le."_
- **Progression** : Avoir 1 dragon dans l'écurie
- **Récompense** :
  - 🎯 **Tutorial** : "Les dragons peuvent combattre à vos côtés et produire des ressources !"
  - 🔓 **Débloquer** : Bâtiment "Ferme Dragons" (visible)

---

### 🐉 Q21 : "Reproduction Draconique"

- **ID** : `quest_breed_dragon`
- **Prérequis** : Q20 complétée
- **Objectif** : Avoir 2 dragons + Construire Ferme Dragons
- **Texte** : _"Avec deux dragons, vous pouvez créer des hybrides. Mais il vous faut un habitat adapté."_
- **Progression** : Construire "dragon_farm" + avoir 2 dragons
- **Récompense** :
  - 🎯 **Tutorial** : "Vous pouvez maintenant croiser vos dragons pour créer des hybrides plus puissants !"
  - 🎁 **Cadeau** : 1× Œuf de dragon bonus

---

### 🏗️ Q22 : "Le Laboratoire"

- **ID** : `quest_build_alchemy_lab`
- **Prérequis** : Q17 complétée + Alchimiste niveau 10
- **Objectif** : Construire un Laboratoire d'Alchimie
- **Texte** : _"Vos potions sont puissantes, mais vous pouvez faire mieux avec un vrai laboratoire."_
- **Progression** : Construire "alchemy_lab"
- **Récompense** :
  - 💬 **Message** : "Laboratoire construit ! Les conversions alchimiques se font maintenant automatiquement."
  - 🎯 **Effet** : Conversion passive T1→T2→T3

---

### 🔵 Q23 : "L'Élevage de Moutons"

- **ID** : `quest_unlock_farm`
- **Prérequis** : Q19 complétée + Niveau 25
- **Objectif** : Atteindre Herboriste niveau 10
- **Texte** : _"Vous connaissez maintenant l'agriculture. Il est temps d'élever des animaux pour produire du tissu."_
- **Progression** : Herboriste niveau 10
- **Récompense** :
  - 🔓 **Débloquer** : Bâtiment "Ferme d'Élevage" (visible)
  - 💬 **Message** : "Vous pouvez maintenant construire une Ferme pour produire des tissus automatiquement."

---

### 🔵 Q24 : "Tisser l'Avenir"

- **ID** : `quest_unlock_tailor`
- **Prérequis** : Q23 complétée
- **Objectif** : Construire une Ferme + Avoir 20 tissus
- **Texte** : _"Le tissu est là. Mais encore faut-il savoir le travailler."_
- **Progression** : Construire "farm" + avoir 20 tissus au total
- **Récompense** :
  - 🔓 **Débloquer** : Métier "Tailleur" (utilisable)
  - 🎁 **Cadeau** : 3× Recettes d'armures légères débloquées
  - 💬 **Message** : "Tailleur débloqué ! Vous pouvez créer des armures légères avec bonus d'agilité."

---

### ⭐ Q25 : "Seigneur de la Forêt" (MILESTONE)

- **ID** : `quest_boss_forest`
- **Prérequis** : Q21 + Q24 complétées + Niveau 30
- **Objectif** : Vaincre le Boss de la Région 3
- **Texte** : _"Un Ancien Ent protège la forêt ancestrale. Seul un vrai héros peut le vaincre."_
- **Progression** : Tuer "Ent Ancestral" (boss zone 3-4, niveau 30)
- **Récompense** :
  - 🔓 **Débloquer** : Région 4 "Marais Maudits"
  - 🔓 **Débloquer** : Métier "Transmutation" (utilisable)
  - 💬 **Message** : "Région 4 débloquée ! La Transmutation vous permet de convertir les ressources entre elles."

---

## 📊 PHASE 5 : LÉGENDE (NIVEAU 30-40) - MASTERY

**Narration** : _Vous êtes maintenant un héros reconnu. Mais les défis les plus grands vous attendent._

### ⭐ Q26 : "Maître de la Transmutation"

- **ID** : `quest_master_transmutation`
- **Prérequis** : Q25 complétée
- **Objectif** : Effectuer 50 transmutations
- **Texte** : _"L'alchimie suprême : transformer la matière elle-même."_
- **Progression** : Faire 50 conversions alchimiques (n'importe lesquelles)
- **Récompense** :
  - 🎁 **Cadeau** : Toutes les recettes de transmutation Tier 1-2 débloquées
  - 💬 **Message** : "Vous maîtrisez la transmutation basique ! Les conversions T1→T2 sont plus efficaces."

---

### 🏗️ Q27 : "Métropole Prospère"

- **ID** : `quest_upgrade_city`
- **Prérequis** : Q25 complétée
- **Objectif** : Avoir tous les bâtiments niveau 5+
- **Texte** : _"Votre ville est modeste. Il est temps d'en faire une métropole !"_
- **Progression** : Scierie 5, Mine 5, Ferme 5, Entrepôt 5, Trésorerie 5
- **Récompense** :
  - 🎁 **Cadeau** : 5000 gold (pour constructions futures)
  - 💬 **Message** : "Votre ville produit maintenant des ressources en masse !"

---

### 🐉 Q28 : "Collection de Dragons"

- **ID** : `quest_dragon_collection`
- **Prérequis** : Q21 complétée
- **Objectif** : Avoir 5 dragons différents
- **Texte** : _"Un dresseur de dragons se doit d'avoir une collection variée."_
- **Progression** : Posséder 5 dragons de types différents
- **Récompense** :
  - 🎁 **Cadeau** : 1× Dragon rare garanti (tier supérieur)
  - 💬 **Message** : "Votre ménagerie s'agrandit ! Les hybrides sont maintenant plus puissants."

---

### 🐉 Q29 : "Dragon Légendaire"

- **ID** : `quest_legendary_dragon`
- **Prérequis** : Q28 complétée
- **Objectif** : Créer un dragon hybride de rareté Légendaire+
- **Texte** : _"Les dragons les plus puissants naissent de l'hybridation. Créez une légende."_
- **Progression** : Faire naître 1 dragon Legendary/Mythic/Divine
- **Récompense** :
  - 🎯 **Bonus permanent** : +10% chances d'hybrides rares
  - 💬 **Message** : "Vous êtes un maître dresseur ! Vos dragons sont exceptionnels."

---

### ⭐ Q30 : "Conquérant des Marais" (MILESTONE)

- **ID** : `quest_boss_swamp`
- **Prérequis** : Q27 + Q29 + Niveau 40
- **Objectif** : Vaincre le Boss de la Région 4
- **Texte** : _"Le Roi Liche règne sur les marais depuis des siècles. Êtes-vous assez puissant ?"_
- **Progression** : Tuer "Roi Liche" (boss zone 4-4, niveau 40)
- **Récompense** :
  - 🔓 **Débloquer** : Région 5 "Terres Désolées"
  - 🔓 **Débloquer** : Onglet "👥 Guilde" (placeholder pour futur contenu)
  - 💬 **Message** : "Région 5 débloquée ! La fin approche... Êtes-vous prêt pour l'ultime défi ?"

---

## 📊 PHASE 6 : APOTHÉOSE (NIVEAU 40-50) - ENDGAME

**Narration** : _Vous avez conquis le monde. Mais un dernier défi vous attend..._

### 🏆 Q31 : "Équipement Parfait"

- **ID** : `quest_perfect_gear`
- **Prérequis** : Q30 complétée
- **Objectif** : Avoir un équipement complet de rareté Épique+
- **Texte** : _"Pour affronter l'ultime Boss, vous devez être parfaitement équipé."_
- **Progression** : Tous les slots équipés avec Epic/Legendary/Mythic/Divine
- **Récompense** :
  - 🎯 **Bonus permanent** : +5% toutes stats
  - 💬 **Message** : "Vous êtes au sommet de votre puissance !"

---

### 🏆 Q32 : "Maître Artisan"

- **ID** : `quest_master_all_professions`
- **Prérequis** : Q30 complétée
- **Objectif** : Avoir tous les métiers niveau 20+
- **Texte** : _"La vraie maîtrise vient de la connaissance de tous les arts."_
- **Progression** : Tous les 11 métiers à niveau 20 minimum
- **Récompense** :
  - 🎁 **Titre** : "Maître Artisan"
  - 🎯 **Bonus permanent** : +20% XP métiers
  - 💬 **Message** : "Vous avez atteint la maîtrise absolue de tous les métiers !"

---

### 🏆 Q33 : "Empire Prospère"

- **ID** : `quest_max_city`
- **Prérequis** : Q30 complétée
- **Objectif** : Avoir tous les bâtiments niveau 10
- **Texte** : _"Votre ville doit être à son apogée pour soutenir vos ambitions."_
- **Progression** : Tous les bâtiments à niveau 10
- **Récompense** :
  - 🎁 **Titre** : "Empereur"
  - 🎯 **Bonus permanent** : +50% production de tous les bâtiments
  - 💬 **Message** : "Votre empire est le plus prospère du monde !"

---

### 🐉 Q34 : "Ménagerie Divine"

- **ID** : `quest_dragon_mastery`
- **Prérequis** : Q30 complétée
- **Objectif** : Avoir 10 dragons dont 1 Divine
- **Texte** : _"Les dragons les plus rares du monde doivent vous obéir."_
- **Progression** : 10 dragons total + 1 rareté Divine
- **Récompense** :
  - 🎁 **Titre** : "Seigneur des Dragons"
  - 🎯 **Bonus permanent** : Dragons +25% stats en combat
  - 💬 **Message** : "Vous êtes le plus grand dresseur de dragons de tous les temps !"

---

### ⭐⭐⭐ Q35 : "L'ULTIME DÉFI" (FINALE)

- **ID** : `quest_final_boss`
- **Prérequis** : Q31 + Q32 + Q33 + Q34 + Niveau 50
- **Objectif** : Vaincre le Boss Final de la Région 5
- **Texte** : _"Le Dragon Ancien, créateur du monde, vous met à l'épreuve. Prouvez que vous êtes digne d'être le nouveau Gardien."_
- **Progression** : Tuer "Dragon Ancien" (boss zone 5-4, niveau 50)
- **Récompense** :
  - 🎁 **Titre** : "Héros de Nyln'ato"
  - 🔓 **Débloquer** : Mode Prestige (placeholder)
  - 💬 **Message FIN** :

    ```
    ═══════════════════════════════════════
    🎉 FÉLICITATIONS ! 🎉

    Vous avez vaincu le Dragon Ancien !
    Vous êtes maintenant le Gardien de Nyln'ato.

    🏆 Niveau 50 atteint
    🐉 Maître des Dragons
    ⚒️ Maître Artisan
    🏰 Empereur

    Continuez à explorer et améliorer votre empire...
    Ou attendez le Mode Prestige (bientôt disponible) !
    ═══════════════════════════════════════
    ```

---

## 📋 TABLEAU RÉCAPITULATIF

### **Distribution par Type**

| Type           | Nombre | %        |
| -------------- | ------ | -------- |
| 📌 Principales | 10     | 29%      |
| 🔵 Métiers     | 12     | 34%      |
| 🏗️ Ville       | 6      | 17%      |
| 🐉 Dragons     | 5      | 14%      |
| 🏆 Endgame     | 4      | 11%      |
| ⭐ Milestones  | 8      | 23%      |
| **TOTAL**      | **35** | **100%** |

### **Distribution par Phase**

| Phase          | Niveaux | Quêtes      | Focus                        |
| -------------- | ------- | ----------- | ---------------------------- |
| 1 : Réveil     | 1-5     | Q1-Q7 (7)   | Tutoriel combat + équipement |
| 2 : Artisan    | 5-10    | Q8-Q11 (4)  | Débloquer craft (3 métiers)  |
| 3 : Bâtisseur  | 10-15   | Q12-Q18 (7) | Ville + nouveaux métiers     |
| 4 : Conquérant | 15-25   | Q19-Q25 (7) | Dragons + expansion          |
| 5 : Légende    | 30-40   | Q26-Q30 (5) | Optimisation                 |
| 6 : Apothéose  | 40-50   | Q31-Q35 (5) | Perfection + Boss Final      |

---

## 🎯 DÉBLOCAGES RÉSUMÉS

### **Onglets**

- Niveau 1 : ⚔️ Combat (auto)
- Niveau 3 : ⛏️ Métiers (Q4)
- Niveau 3 : 🎒 Équipement (Q2)
- Niveau 5 : 🔨 Artisanat (Q7)
- Niveau 10 : 🏘️ Ville (Q11)
- Niveau 12 : 🧪 Alchimie (Q17)
- Niveau 20 : 🐉 Dragons (Q19)
- Niveau 40 : 👥 Guilde (Q30)

### **Métiers de Récolte**

- Niveau 1 : Bûcheron (auto)
- Niveau 1 : Mineur (auto)
- Niveau 12 : Herboriste (Q15)
- Niveau 12 : Pêcheur (Q16)

### **Métiers de Craft**

- Niveau 5 : Forgeron (Q8)
- Niveau 5 : Armurier (Q9)
- Niveau 5 : Bijoutier (Q10)
- Niveau 12 : Alchimiste (Q17)
- Niveau 15 : Poissonnier (Q18)
- Niveau 25 : Tailleur (Q24)
- Niveau 30 : Transmutation (Q25)

### **Bâtiments**

- Niveau 10 : Scierie (Q12)
- Niveau 10 : Mine (Q13)
- Niveau 10 : Entrepôt (Q14)
- Niveau 12 : Trésorerie (après Q14)
- Niveau 15 : Labo Alchimie (Q22)
- Niveau 20 : Ferme Dragons (Q21)
- Niveau 25 : Ferme Élevage (Q23)

### **Régions**

- Niveau 1 : Région 1 - Plaines Verdoyantes (auto)
- Niveau 10 : Région 2 - Montagnes Grises (Q11)
- Niveau 20 : Région 3 - Forêt Ancestrale (Q19)
- Niveau 30 : Région 4 - Marais Maudits (Q25)
- Niveau 40 : Région 5 - Terres Désolées (Q30)

---

## 🎮 IMPLÉMENTATION TECHNIQUE

### **Structure Quest Object**

```javascript
{
  id: 'quest_xxx',
  title: 'Nom de la quête',
  description: 'Texte narratif qui guide le joueur',
  type: 'kill' | 'collect' | 'level' | 'craft' | 'build' | 'dragon' | 'equip',

  requirements: {
    level: X,              // Niveau minimum
    quest: 'quest_yyy',    // Quête prérequise
    profession: {          // Métier requis
      name: 'xxx',
      level: X
    }
  },

  objectives: {
    type: 'kill',          // Type d'objectif
    target: 10,            // Quantité
    specific: 'boss_xxx'   // Cible spécifique (optionnel)
  },

  rewards: {
    unlocks: [             // Déblocages
      { type: 'tab', id: 'xxx' },
      { type: 'profession', id: 'xxx' },
      { type: 'building', id: 'xxx' },
      { type: 'region', id: X }
    ],
    items: [               // Items donnés
      { id: 'xxx', amount: X }
    ],
    bonus: {               // Bonus permanents
      type: 'stat',
      value: 0.05          // +5%
    },
    title: 'Nom du titre' // Titre accordé
  },

  message: 'Message affiché au joueur'
}
```

---

## 🔄 CHAÎNES DE DÉPENDANCES

```
Q1 (Éveil)
 └─> Q2 (Premiers Pas)
      └─> Q3 (S'équiper)
           └─> Q4 (Niveau 3) ──┬─> Q5 (Bûcheron) ─┐
                               └─> Q6 (Mineur) ────┤
                                                    └─> Q7 (Artisan) ──┬─> Q8 (Forgeron) ──┐
                                                                       ├─> Q9 (Armurier) ──┤
                                                                       └─> Q10 (Bijoutier)─┤
                                                                                           └─> Q11 (Boss R1) ─┐
                                                                                                               │
Q11 (Boss R1 + Ville) ──┬─> Q12 (Scierie) ──> Q13 (Mine) ──> Q14 (Entrepôt)                                │
                        ├─> Q15 (Herboriste) ──> Q17 (Alchimiste) ──> Q22 (Labo)                           │
                        └─> Q16 (Pêcheur) ──> Q18 (Poissonnier)                                             │
                                                                                                              │
Q17 + Q18 ─────────────────────────────────────────────────────────────────────────────> Q19 (Boss R2) ─────┤
                                                                                                              │
Q19 (Boss R2 + Dragons) ──> Q20 (1er Dragon) ──> Q21 (Ferme Dragons)                                        │
                        └──> Q23 (Débloquer Ferme) ──> Q24 (Tailleur)                                        │
                                                                                                              │
Q21 + Q24 ─────────────────────────────────────────────────────────────────────────────> Q25 (Boss R3) ─────┤
                                                                                                              │
Q25 (Boss R3 + Transmutation) ──┬─> Q26 (Maître Transmutation)                                              │
                                 ├─> Q27 (Ville niveau 5)                                                     │
                                 ├─> Q28 (5 dragons)                                                          │
                                 └─> Q29 (Dragon légendaire)                                                  │
                                                                                                              │
Q26 + Q27 + Q29 ───────────────────────────────────────────────────────────────────────> Q30 (Boss R4) ─────┤
                                                                                                              │
Q30 (Boss R4 + Guilde) ──┬─> Q31 (Équipement parfait)                                                       │
                         ├─> Q32 (Tous métiers 20)                                                           │
                         ├─> Q33 (Ville niveau 10)                                                           │
                         └─> Q34 (10 dragons + 1 Divine)                                                     │
                                                                                                              │
Q31 + Q32 + Q33 + Q34 ─────────────────────────────────────────────────────────────────> Q35 (BOSS FINAL) ──┘
                                                                                              🏆 FIN
```

---

## ✅ VALIDATION DU SYSTÈME

### **Critères de Succès**

✅ **Narration cohérente** : Raconte une histoire du début à la fin  
✅ **Progression fluide** : Pas de "mur", toujours quelque chose à faire  
✅ **Déblocages significatifs** : Chaque quête débloque quelque chose d'important  
✅ **Pas de récompenses vides** : Pas d'or/XP arbitraires  
✅ **Guidance claire** : Le joueur sait toujours quoi faire  
✅ **Milestones gratifiants** : Récompenses importantes tous les 5-10 niveaux  
✅ **Équilibrage respecté** : Déblocages au bon moment  
✅ **Fun factor** : Envie de voir la suite

---

## 🎯 PROCHAINES ÉTAPES

1. **Valider ce document** avec vous
2. **Implémenter dans `quests-data.js`**
3. **Coder les nouveaux types de quêtes** (level, craft, build, dragon, equip)
4. **Tester la progression complète** 1-50
5. **Ajuster les valeurs** selon les retours

**Prêt à passer à l'implémentation ?** 🚀
