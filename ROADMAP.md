# 🗺️ Roadmap du Projet - Idle Game

## 📌 Vue d'ensemble

Ce document définit le plan de développement progressif du jeu, organisé en sprints et phases pour assurer une progression structurée.

---

## 🎯 Phase 1 - MVP (Minimum Viable Product)
**Objectif : Avoir un jeu jouable et amusant en 2-3 jours**
**Date cible : Semaine 1**

### Sprint 1 : Core Mechanics ⚡ (4-6h)
**Priorité : CRITIQUE**

- [ ] **Structure HTML de base**
  - Squelette de page avec zones principales
  - Chargement des scripts en module ES6
  - Meta tags et responsive

- [ ] **Compteur de ressources**
  - Affichage du nombre de cookies
  - Affichage des cookies par seconde
  - Formatage des nombres (1K, 1M, 1B)

- [ ] **Bouton de clic principal**
  - Clic fonctionnel
  - Animation au clic
  - Particules de feedback (+1)

- [ ] **Boucle de jeu basique**
  - Game loop avec requestAnimationFrame
  - Calcul de deltaTime
  - Mise à jour de l'UI

**✅ Critère de succès** : On peut cliquer et voir le compteur augmenter

---

### Sprint 2 : Premiers Bâtiments 🏗️ (4-6h)
**Priorité : CRITIQUE**

- [ ] **Classe Building**
  - Constructeur avec config
  - Méthodes getCurrentCost() et getCurrentProduction()
  - Gestion du compte de bâtiments possédés

- [ ] **BuildingManager**
  - Liste des bâtiments instanciés
  - Méthodes add(), canAfford(), calculateTotalProduction()

- [ ] **3 types de bâtiments initiaux**
  - Curseur (basique, toujours débloqué)
  - Grand-mère (débloqué à 50 cookies)
  - Ferme (débloqué à 500 cookies)

- [ ] **Interface d'achat**
  - Carte de bâtiment avec infos
  - Bouton d'achat (enabled/disabled selon ressources)
  - Affichage du coût et de la production

- [ ] **Production automatique**
  - Calcul de la production totale
  - Ajout automatique des cookies chaque frame

**✅ Critère de succès** : On peut acheter des bâtiments qui produisent automatiquement

---

### Sprint 3 : Sauvegarde 💾 (3-4h)
**Priorité : HAUTE**

- [ ] **Classe SaveManager**
  - Sérialisation de l'état du jeu en JSON
  - Sauvegarde dans LocalStorage
  - Chargement depuis LocalStorage

- [ ] **Format de sauvegarde**
  - Version du jeu
  - Timestamp
  - Données du jeu (cookies, bâtiments, stats)

- [ ] **Auto-save**
  - Sauvegarde automatique toutes les 30 secondes
  - Indicateur visuel "Sauvegarde..."

- [ ] **Boutons manuels**
  - Bouton "Sauvegarder"
  - Bouton "Export" (copie Base64 dans clipboard)
  - Bouton "Import" (charge depuis Base64)
  - Bouton "Reset" (avec confirmation)
  - Modal pour afficher/copier la sauvegarde exportée

- [ ] **Production offline**
  - Calcul du temps écoulé depuis la dernière session
  - Ajout des cookies produits pendant l'absence

**✅ Critère de succès** : Le jeu se sauvegarde et se recharge correctement

---

### Sprint 4 : UI/UX de Base 🎨 (4-5h)
**Priorité : HAUTE**

- [ ] **CSS structuré**
  - Variables CSS pour couleurs et tailles
  - Grid/Flexbox pour layout responsive
  - Mobile-first approach

- [ ] **Styles des composants**
  - Header avec titre et compteur principal
  - Cards pour les bâtiments
  - Boutons avec états (hover, active, disabled)

- [ ] **Animations simples**
  - Transition sur hover
  - Animation du bouton principal au clic
  - Particules qui montent (+X cookies)
  - Toast de notification

- [ ] **Responsive**
  - Breakpoint mobile (< 768px)
  - Breakpoint tablet (768-1024px)
  - Breakpoint desktop (> 1024px)

- [ ] **Accessibilité**
  - Contraste suffisant
  - Tailles de police lisibles
  - Focus visible au clavier

**✅ Critère de succès** : Le jeu est beau et agréable à utiliser sur tous les écrans

---

## 🚀 Phase 2 - Enrichissement
**Objectif : Ajouter de la profondeur et de la rétention**
**Date cible : Semaine 2**

### Sprint 5 : Système d'Upgrades 🔧 (5-6h)

- [ ] **Classe Upgrade**
  - Types : production, click, global, unlock
  - Application des effets

- [ ] **UpgradeManager**
  - Liste des upgrades disponibles
  - Vérification des conditions de déblocage
  - Application des multiplicateurs

- [ ] **10-15 upgrades variés**
  - Par bâtiment (x2 production)
  - Pour les clics (+1 par clic, multiplicateurs)
  - Globaux (+5%, +10% production)

- [ ] **Interface d'upgrades**
  - Grille d'upgrades par catégorie
  - Tooltips informatifs
  - États : locked, available, purchased

**✅ Critère de succès** : Les upgrades débloquent progressivement et améliorent le jeu

---

### Sprint 6 : Plus de Contenu 📦 (4-5h)

- [ ] **7-10 bâtiments supplémentaires**
  - Mine, Usine, Banque, Temple, etc.
  - Progression exponentielle équilibrée

- [ ] **Conditions de déblocage variées**
  - Par cookies totaux
  - Par nombre de bâtiments possédés
  - Par upgrades achetés

- [ ] **Équilibrage**
  - Courbe de progression testée
  - Temps de payback raisonnable
  - Pas de stratégie dominante

**✅ Critère de succès** : Progression fluide et engageante sur plusieurs heures

---

### Sprint 7 : Achievements 🏆 (4-5h)

- [ ] **Classe Achievement**
  - Conditions variées
  - Récompenses optionnelles
  - Achievements cachés

- [ ] **AchievementManager**
  - Vérification périodique des conditions
  - Notification au déblocage
  - Persistence

- [ ] **20-30 achievements**
  - Production (atteindre X cookies)
  - Bâtiments (posséder X du type Y)
  - Clics (cliquer X fois)
  - Secrets (découvertes cachées)

- [ ] **Interface achievements**
  - Liste avec progression
  - Filtres par catégorie
  - Barre de progression globale

**✅ Critère de succès** : Les achievements motivent à continuer de jouer

---

### Sprint 8 : Statistiques 📊 (3-4h)

- [ ] **Classe Statistics**
  - Métriques à tracker
  - Mise à jour en temps réel

- [ ] **Métriques implémentées**
  - Cookies totaux gagnés
  - Temps de jeu total
  - Clics totaux
  - Bâtiments achetés
  - Record de cookies/seconde

- [ ] **Interface stats**
  - Page dédiée ou onglet
  - Graphiques simples si possible
  - Comparaisons (sessions, records)

**✅ Critère de succès** : On peut voir sa progression et ses records

---

## 🎨 Phase 3 - Polish et Qualité
**Objectif : Rendre le jeu professionnel**
**Date cible : Semaine 3**

### Sprint 9 : Design Avancé 🎭 (6-8h)

- [ ] **Thème visuel cohérent**
  - Palette de couleurs harmonieuse
  - Typographie soignée
  - Icônes/emojis consistants

- [ ] **Animations avancées**
  - Transitions fluides entre états
  - Micro-interactions sur tous les éléments
  - Système de particules amélioré
  - Animations de déblocage

- [ ] **Effets visuels**
  - Glow sur éléments importants
  - Shake au gros achat
  - Confettis pour milestones

- [ ] **Dark/Light mode**
  - Toggle dans les options
  - Persistence du choix
  - Transition smooth

**✅ Critère de succès** : Le jeu a un aspect professionnel et soigné

---

### Sprint 10 : Optimisation 🚀 (4-5h)

- [ ] **Performance**
  - Profiling des fonctions critiques
  - Optimisation de la game loop
  - Réduction des reflows/repaints
  - Lazy loading si nécessaire

- [ ] **Gestion mémoire**
  - Pas de fuites détectées
  - Event listeners nettoyés
  - Object pooling pour particules

- [ ] **Compression sauvegardes**
  - Format optimisé
  - Validation des données

**✅ Critère de succès** : 60 FPS constant, pas de lag

---

### Sprint 11 : Tests et Debug 🧪 (4-5h)

- [ ] **Tests manuels complets**
  - Checklist de tous les cas d'usage
  - Tests sur différents navigateurs
  - Tests sur mobile/tablette

- [ ] **Corrections de bugs**
  - Fix de tous les bugs trouvés
  - Gestion d'erreur robuste

- [ ] **QA finale**
  - Vérification sauvegarde/chargement
  - Test de production offline
  - Validation accessibilité

**✅ Critère de succès** : Aucun bug bloquant, expérience fluide

---

## 🔮 Phase 4 - Fonctionnalités Avancées (Optionnel)
**Objectif : Augmenter la rétention long terme**
**Date cible : Semaine 4+**

### Backlog de fonctionnalités futures

- [ ] **Système de Prestige**
  - Reset avec bonus permanent
  - Heavenly chips
  - Nouvelles upgrades prestige

- [ ] **Événements temporaires**
  - Golden cookies
  - Bonus temporaires
  - Événements saisonniers

- [ ] **Mini-jeux**
  - Jardin (plantes)
  - Bourse (spéculation)
  - Panthéon (buffs)

- [ ] **Système de quêtes**
  - Objectifs quotidiens
  - Défis hebdomadaires
  - Récompenses spéciales

- [ ] **Effets sonores**
  - Son au clic
  - Son à l'achat
  - Musique de fond (optionnelle)

- [ ] **Partage social**
  - Screenshot de progression
  - Comparaison avec amis
  - Leaderboards (nécessite backend)

---

## 📋 Checklist avant lancement

### Technique
- [ ] Code commenté et documenté
- [ ] Pas de console.log en production
- [ ] Variables sensibles sécurisées
- [ ] Performance validée
- [ ] Compatibilité navigateurs testée

### Contenu
- [ ] Équilibrage validé
- [ ] Textes relus (orthographe)
- [ ] Tutoriel/instructions claires
- [ ] Crédits et mentions légales

### Déploiement
- [ ] Build de production créé
- [ ] Testé sur environnement de production
- [ ] Analytics configurées (optionnel)
- [ ] Backup de la version stable

---

## 📅 Timeline estimé

- **Semaine 1** : Phase 1 (MVP) - Jeu jouable ✅
- **Semaine 2** : Phase 2 (Enrichissement) - Jeu complet ✅
- **Semaine 3** : Phase 3 (Polish) - Jeu professionnel ✅
- **Semaine 4+** : Phase 4 (Optionnel) - Contenu additionnel

**Total estimé : 60-80 heures de développement**

---

## 🎯 Priorités si temps limité

Si vous devez réduire le scope :

**🔴 Obligatoire (Phase 1)**
- Clic + compteur
- 3 bâtiments
- Production auto
- Sauvegarde
- UI basique responsive

**🟡 Important (Phase 2)**
- 5-6 upgrades minimum
- 5-7 bâtiments total
- Quelques achievements

**🟢 Nice to have (Phase 3-4)**
- Design avancé
- Optimisations poussées
- Prestige et mini-jeux

---

*Ce roadmap est un guide flexible. N'hésitez pas à ajuster selon vos découvertes et priorités !*
