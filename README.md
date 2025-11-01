# 🎮 Nyln'ato Idle RPG

Un RPG incrémental (idle game) avec combat, crafting, professions et construction de ville, développé en HTML5/CSS3/JavaScript vanilla.

![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Alpha-orange)

---

## 📖 À propos

**Nyln'ato Idle** est un RPG incrémental où vous incarnez un aventurier explorant 5 régions, combattant des monstres, craftant de l'équipement et développant votre propre ville. Votre objectif : devenir le héros le plus puissant du royaume !

### ✨ Fonctionnalités principales

#### ⚔️ Combat

- **5 régions explorables** avec environnements uniques
- **50 zones** à débloquer progressivement
- **45+ monstres** (communs, rares, élites, boss)
- **Système de combat automatique** ou manuel
- **Progression de niveau** avec gains de stats

#### 🎒 Équipement & Crafting

- **Système de crafting complet** (armes, armures, accessoires)
- **Système de qualité** (Normal → Superior → Exceptional → Perfect → Masterwork)
- **7 raretés d'équipement** (Common → Divine)
- **Drops aléatoires** depuis les monstres
- **Gestion d'inventaire** avec tri et filtres

#### 🌳 Professions

- **Bûcheron** : Récolte de bois (Chêne, Pin, etc.)
- **Mineur** : Extraction de minerais (Fer, Cuivre, etc.)
- **Auto-récolte** déblocable
- **Progression de niveau** pour chaque profession

#### 🏘️ Système de Ville

- **15+ bâtiments** constructibles
- **Production automatique** de ressources
- **Gestion de population** et nourriture
- **Taxes et économie**

#### 🧪 Alchimie

- **Conversion de ressources** (ex: bois → charbon)
- **Recettes déblocables** par niveau
- **Production automatique**

#### 🎭 Personnalisation

- **Création de personnage** (nom, genre, classe)
- **4 classes** : Guerrier, Archer, Mage, Prêtre
- **Bonus de classe** uniques

#### 💾 Sauvegarde

- **Sauvegarde automatique** (toutes les 30s)
- **Import/Export** de sauvegarde
- **Production offline** (jusqu'à 24h)

---

## 🎯 Objectif du jeu

1. **Explorer** les 5 régions (Plaines Verdoyantes → Montagnes Grises → Désert de Cendres → Terres Glacées → Terres Démoniaques)
2. **Combattre** les monstres et battre les boss de région
3. **Crafter** l'équipement le plus puissant
4. **Développer** votre ville et vos professions
5. **Atteindre le niveau maximum** et dominer le royaume

---

## � ANALYSE DU SYSTÈME DE CRAFTING (27 Oct 2025)

Une **analyse complète** du système de crafting, métiers et ressources a été réalisée.

### 📁 Documents d'Analyse

- **[📋 INDEX - Commencer ici](./INDEX-ANALYSE-CRAFTING.md)** ← Point d'entrée
- **[📊 RAPPORT COMPLET](./RAPPORT-ANALYSE-CRAFTING-COMPLET.md)** (analyse détaillée, 45 pages)
- **[🎯 PLAN D'ACTION](./PLAN-ACTION-CORRECTIONS-CRAFTING.md)** (code à implémenter, 60 pages)
- **[🎨 SYNTHÈSE VISUELLE](./SYNTHESE-VISUELLE-CRAFTING.md)** (vue d'ensemble rapide, 25 pages)

### 🔴 Problèmes Identifiés

1. **Métier Armurier bloqué** (pas de recette niveau 1)
2. **Chaîne de production cuir cassée** (`fabric_simple_leather` introuvable)
3. **70% des drops monstres inutilisés**
4. **Aucun bonus de progression métiers**
5. **Taux de drop incohérents** (2%-100%)
6. **Documentation absente**

### ✅ Solutions Proposées

- Ajouter 2 recettes Armurier niveau 1-2
- Créer 4 recettes Tanneur (monster_hide → cuir)
- Ajouter 15+ recettes utilisant drops (griffes, plumes, crocs)
- Implémenter bonus par niveau (+vitesse, +qualité, +double craft)
- Rééquilibrer tous les drops selon tableau de référence
- Créer 2 guides joueurs complets

**⏱️ Temps estimé :** 12-17 heures  
**🏆 Résultat attendu :** Système cohérent du niveau 1 à 50, 100% des quêtes faisables

---

## �🚀 Démarrage rapide

### 🌐 Jouer en ligne

**[▶️ Jouer maintenant](https://atond.github.io/nylnatoidle3/)** (GitHub Pages)

### 💻 Installation locale

#### Prérequis

- Un navigateur moderne (Chrome, Firefox, Edge, Safari)
- Python 3 (pour serveur local) OU Node.js

#### Méthode 1 : Serveur Python (recommandé)

```bash
# Cloner le projet
git clone https://github.com/Atond/nylnatoidle3.git
cd nylnatoidle3

# Lancer le serveur
python -m http.server 8080

# Ouvrir http://localhost:8080
```

#### Méthode 2 : Serveur Node.js

```bash
# Cloner le projet
git clone https://github.com/Atond/nylnatoidle3.git
cd nylnatoidle3

# Installer dépendances
npm install

# Lancer le serveur
npm run dev

# Ouvrir http://localhost:8080
```

#### Méthode 3 : Ouvrir directement

```bash
# Simplement ouvrir index.html dans votre navigateur
# Note : Certaines fonctionnalités peuvent être limitées sans serveur
```

---

## 📚 Documentation

### 📊 Analyse & Rapports

- **[INDEX-ANALYSE.md](INDEX-ANALYSE.md)** - Index de la documentation d'analyse
- **[RECAP-VISUEL.md](RECAP-VISUEL.md)** - Vue d'ensemble rapide (⭐ Recommandé)
- **[ANALYSE-COMPLETE-RAPPORT.md](ANALYSE-COMPLETE-RAPPORT.md)** - Rapport détaillé
- **[FIX-BUGS-CRITIQUES.md](FIX-BUGS-CRITIQUES.md)** - Guide de correction
- **[ACTION-PLAN-PRIORITAIRE.md](ACTION-PLAN-PRIORITAIRE.md)** - Roadmap v1.0

### 🎮 Guides de jeu

- **[GUIDE-TEST-RAPIDE.md](docs/guides/GUIDE-TEST-RAPIDE.md)** - Guide de test
- **[RESOURCES-OVERVIEW.md](docs/RESOURCES-OVERVIEW.md)** - Vue d'ensemble des ressources

### ⚖️ Équilibrage

- **[docs/balance/](docs/balance/)** - Documentation d'équilibrage complet
  - BALANCE-OVERVIEW.md
  - BALANCE-CRAFTING.md
  - BALANCE-PLAYER.md
  - etc.

### 🏗️ Architecture

Voir [docs/implementation/](docs/implementation/) pour les détails d'implémentation

---

## 🎮 Comment jouer

### Premiers pas

1. **Créez votre personnage**
   - Choisissez nom, genre et classe
   - Confirmez pour commencer

2. **Combattez votre premier monstre**
   - Cliquez sur "Attaquer" ou appuyez sur **Espace**
   - Activez l'auto-combat avec le bouton ou **A**

3. **Équipez-vous**
   - Récoltez du bois et des minerais (onglet Métiers)
   - Craftez votre premier équipement (onglet Crafting)
   - Équipez vos créations (onglet Équipement)

4. **Progressez**
   - Tuez 10 monstres pour débloquer la zone suivante
   - Montez de niveau pour devenir plus fort
   - Battez les boss de région (zone 10)

5. **Développez votre ville**
   - Construisez des bâtiments (onglet Ville)
   - Gérez population et ressources
   - Améliorez vos bâtiments

### ⌨️ Raccourcis clavier

| Touche      | Action                   |
| ----------- | ------------------------ |
| **Espace**  | Attaquer manuellement    |
| **A**       | Toggle auto-combat       |
| **I**       | Ouvrir l'inventaire      |
| **C**       | Ouvrir le crafting       |
| **←** **→** | Changer de zone          |
| **Ctrl+S**  | Sauvegarder manuellement |

---

## 🗺️ Régions du jeu

### 🌾 Région 1 : Les Plaines Verdoyantes

- **Niveaux** : 1-10
- **Faction** : Les Humains d'Érialis
- **Monstres** : Loups, Sangliers, Bandits
- **Boss** : La Bête des Prairies

### ⛰️ Région 2 : Les Montagnes Grises

- **Niveaux** : 11-20
- **Faction** : Les Nains de Karak-Thar
- **Monstres** : Chauves-souris, Gobelins, Trolls
- **Boss** : Le Roi Troll Ancestral

### 🏜️ Région 3 : Le Désert de Cendres

- **Niveaux** : 21-30
- **Faction** : Les Nomades du Sable
- **Monstres** : Scorpions, Serpents de sable, Momies
- **Boss** : Le Wyrm des Sables

### ❄️ Région 4 : Les Terres Glacées

- **Niveaux** : 31-40
- **Faction** : Les Guerriers du Nord
- **Monstres** : Yetis, Loups des glaces, Dragons de glace
- **Boss** : Le Seigneur de Glace

### 🔥 Région 5 : Les Terres Démoniaques

- **Niveaux** : 41-50
- **Faction** : Résistance contre les Démons
- **Monstres** : Diablotins, Succubes, Chevaliers des Enfers
- **Boss** : Le Seigneur Démon

---

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Architecture** : MVC-like pattern
- **Sauvegarde** : LocalStorage API
- **Animations** : CSS Animations + requestAnimationFrame
- **Icônes** : Emojis Unicode
- **Serveur dev** : Python http.server / Node.js http-server

---

## 📊 État du projet

### Version actuelle : 0.1.0-alpha

#### ✅ Fonctionnalités implémentées

- [x] Système de combat (manuel + auto)
- [x] 5 régions, 50 zones, 45+ monstres
- [x] Système de crafting complet
- [x] Professions (Bûcheron, Mineur)
- [x] Système de ville avec 15+ bâtiments
- [x] Alchimie (conversion de ressources)
- [x] Création de personnage (genre, classe)
- [x] Sauvegarde/Chargement
- [x] Import/Export de sauvegarde
- [x] Production offline
- [x] Système de qualité d'équipement

#### 🚧 En cours de développement

- [ ] Quêtes (système existant mais incomplet)
- [ ] Achievements
- [ ] Statistiques détaillées
- [ ] Tooltips informatifs
- [ ] Raccourcis clavier
- [ ] Mobile responsiveness complet

#### 🔮 Fonctionnalités futures (v0.2+)

- [ ] PvP / Arène
- [ ] Guildes
- [ ] Événements temporaires
- [ ] Système de mascottes/dragons
- [ ] Enchantement d'équipement
- [ ] Mode prestige

---

## 🐛 Bugs connus

### 🔴 Critiques (à corriger immédiatement)

1. **Duplication `exportSave()`** - Deux fonctions identiques
2. **StorageManager méthodes manquantes** - `getSaveData()` et `loadSaveData()`
3. **Debug mode actif** - Logs en production

👉 Voir [FIX-BUGS-CRITIQUES.md](FIX-BUGS-CRITIQUES.md) pour les corrections

### 🟡 Non critiques

- 89 erreurs TypeScript (non bloquantes)
- Query selectors répétés (impact performance léger)

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment participer :

1. **Fork** le projet
2. **Créer une branche** (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add: Amazing feature'`)
4. **Push** sur la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir une Pull Request**

### Conventions de commit

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Tâches diverses

---

## 📜 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique complet des modifications.

### [0.1.0-alpha] - 2025-10-19

- ✅ Version initiale fonctionnelle
- ✅ Système de combat complet
- ✅ Crafting et professions
- ✅ Système de ville
- 🐛 3 bugs critiques identifiés

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Atond**

- GitHub: [@Atond](https://github.com/Atond)
- Projet: [nylnatoidle3](https://github.com/Atond/nylnatoidle3)

---

## 🙏 Remerciements

- Inspiration : Cookie Clicker, Dodecadragons, Melvor Idle
- Communauté des idle games sur Reddit
- GitHub Copilot pour l'analyse et l'assistance

---

## 📞 Support

- **Bugs** : Ouvrir une [issue](https://github.com/Atond/nylnatoidle3/issues)
- **Questions** : Discussions GitHub
- **Suggestions** : Feature requests dans issues

---

## 🎉 Fun Facts

- **Lignes de code** : ~15,000+
- **Fichiers JS** : 18 fichiers
- **Temps de développement** : Plusieurs semaines
- **Monstres créés** : 45+ avec lore complet
- **Crafting recipes** : 50+ recettes
- **Bâtiments** : 15+ dans le système de ville

---

**⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub ! ⭐**

---

**Dernière mise à jour** : 19 Octobre 2025  
**Version** : 0.1.0-alpha  
**Status** : 🎮 Jouable (avec corrections mineures recommandées)
