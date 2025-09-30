# ✅ Checklist de Tests Manuels

## 🎯 À effectuer après chaque modification majeure

---

## 🍪 Fonctionnalités de Base

### Clic Manuel
- [ ] Le clic sur le bouton principal augmente le compteur
- [ ] L'animation du bouton fonctionne (scale/transition)
- [ ] Les particules apparaissent au bon endroit (+X)
- [ ] Le compteur de clics totaux augmente
- [ ] Les clics rapides (spam) fonctionnent sans lag
- [ ] Le son du clic joue (si activé)

### Compteur Principal
- [ ] Le nombre de cookies s'affiche correctement
- [ ] Le nombre se met à jour en temps réel
- [ ] Les cookies par seconde s'affichent
- [ ] Les très grands nombres sont formatés (K, M, B, T)
- [ ] Pas de nombre négatif possible
- [ ] Pas d'overflow (Infinity)

### Formatage des Nombres
- [ ] 1234 → 1,234 ou 1.23K (selon config)
- [ ] 1234567 → 1.23M
- [ ] 1e12 → 1.00T
- [ ] Décimales correctes (config: 2 par défaut)
- [ ] Pas de "NaN" ou "undefined"

---

## 🏗️ Système de Bâtiments

### Affichage des Bâtiments
- [ ] Tous les bâtiments débloqués s'affichent
- [ ] Les bâtiments locked sont grisés/masqués
- [ ] Les icônes/emojis s'affichent correctement
- [ ] Le nom et la description sont lisibles
- [ ] Le coût actuel s'affiche
- [ ] La production par bâtiment s'affiche
- [ ] Le nombre possédé s'affiche

### Achat de Bâtiments
- [ ] Le bouton "Acheter" est cliquable quand on a les ressources
- [ ] Le bouton est disabled quand on n'a pas les ressources
- [ ] L'achat déduit le bon montant de cookies
- [ ] Le compteur de bâtiments possédés augmente
- [ ] Le coût augmente après l'achat (formule: base × 1.15^count)
- [ ] Impossible d'acheter sans ressources suffisantes
- [ ] Animation/feedback visuel à l'achat
- [ ] Notification "Bâtiment acheté" (optionnel)

### Production Automatique
- [ ] Chaque bâtiment produit des cookies par seconde
- [ ] La production totale est calculée correctement
- [ ] L'affichage "X/sec" se met à jour
- [ ] La production continue même sans interagir
- [ ] Les multiplicateurs s'appliquent correctement

### Déblocage Progressif
- [ ] Curseur : toujours disponible dès le début
- [ ] Grand-mère : apparaît à 50 cookies
- [ ] Ferme : apparaît à 500 cookies
- [ ] Autres bâtiments : selon conditions définies
- [ ] Animation de déblocage (optionnel)

---

## 🔧 Système d'Upgrades

### Affichage des Upgrades
- [ ] Upgrades organisés par catégorie
- [ ] États visuels clairs : locked, available, purchased
- [ ] Icône et nom visibles
- [ ] Description explicite de l'effet
- [ ] Coût affiché
- [ ] Tooltip avec détails complets

### Achat d'Upgrades
- [ ] L'achat déduit les cookies
- [ ] L'upgrade passe en état "purchased"
- [ ] Impossible de racheter un upgrade
- [ ] L'effet s'applique immédiatement
- [ ] Notification de déblocage

### Effets des Upgrades
- [ ] **Production** : multiplie la production du bâtiment ciblé
- [ ] **Click** : augmente les cookies par clic
- [ ] **Click multiplier** : multiplie la valeur des clics
- [ ] **Global** : affecte toute la production
- [ ] **Unlock** : débloque un bâtiment plus tôt
- [ ] Les effets se cumulent correctement

### Conditions de Déblocage
- [ ] Par nombre de bâtiments possédés
- [ ] Par nombre de clics totaux
- [ ] Par cookies par seconde
- [ ] Par cookies totaux gagnés
- [ ] Par upgrades prérequis

---

## 💾 Système de Sauvegarde

### Auto-Save
- [ ] Sauvegarde automatique toutes les 30 secondes
- [ ] Indicateur visuel "Sauvegarde..." apparaît
- [ ] Pas de lag pendant la sauvegarde
- [ ] La sauvegarde fonctionne même en arrière-plan

### Chargement au Démarrage
- [ ] Le jeu charge la dernière sauvegarde
- [ ] Tous les cookies sont restaurés
- [ ] Tous les bâtiments sont restaurés (quantité)
- [ ] Tous les upgrades achetés sont restaurés
- [ ] Les statistiques sont restaurées
- [ ] Pas d'erreur si pas de sauvegarde existante

### Production Offline
- [ ] Le temps écoulé est calculé correctement
- [ ] Les cookies produits sont ajoutés
- [ ] Notification "Vous avez gagné X cookies" (optionnel)
- [ ] Maximum plafonné (ex: 24h max) si configuré

### Export/Import
- [ ] Bouton "Export" copie le JSON dans le clipboard
- [ ] Le JSON exporté est valide
- [ ] Bouton "Import" ouvre un prompt/dialog
- [ ] L'import valide le format avant de charger
- [ ] Message de confirmation après import réussi
- [ ] Message d'erreur si JSON invalide

### Reset
- [ ] Bouton "Reset" demande confirmation
- [ ] Le reset efface tout (cookies, bâtiments, upgrades)
- [ ] Le jeu redémarre à l'état initial
- [ ] La sauvegarde est supprimée de LocalStorage
- [ ] Pas de résidus de l'ancienne partie

### Gestion des Erreurs
- [ ] Si LocalStorage est plein, message d'erreur clair
- [ ] Si données corrompues, retour à l'état initial
- [ ] Pas de crash si version incompatible

---

## 🎨 Interface Utilisateur

### Layout Général
- [ ] Header avec titre et compteur principal
- [ ] Zone de clic bien visible et accessible
- [ ] Sidebar/zone pour les bâtiments
- [ ] Zone pour les upgrades
- [ ] Footer avec options/save info

### Responsive Design
- [ ] **Mobile (< 768px)**
  - Layout vertical
  - Boutons suffisamment grands (44px min)
  - Texte lisible
  - Pas de débordement horizontal
  
- [ ] **Tablet (768-1024px)**
  - Layout adapté
  - Sidebar ou onglets
  
- [ ] **Desktop (> 1024px)**
  - Layout horizontal optimisé
  - Sidebar fixe
  - Toutes les infos visibles sans scroll

### Couleurs et Contraste
- [ ] Contraste suffisant (WCAG AA minimum)
- [ ] Couleurs cohérentes avec la palette définie
- [ ] États des boutons visuellement distincts
- [ ] Mode sombre/clair fonctionnel (si implémenté)

### Typographie
- [ ] Police lisible sur tous les écrans
- [ ] Hiérarchie claire (titres, texte, valeurs)
- [ ] Pas de texte trop petit (14px minimum)

### Accessibilité
- [ ] Navigation possible au clavier (Tab)
- [ ] Focus visible sur les éléments interactifs
- [ ] Alt text sur les images (si applicable)
- [ ] Aria labels si nécessaire

---

## ✨ Animations et Feedback

### Animations de Clic
- [ ] Bouton principal se scale au clic
- [ ] Particules montent et disparaissent
- [ ] Smooth sans saccades
- [ ] Pas de lag même avec spam de clics

### Animations d'Achat
- [ ] Transition sur hover des boutons
- [ ] Animation à l'achat (scale, glow)
- [ ] Mise à jour immédiate de l'UI
- [ ] Toast/notification visible

### Transitions
- [ ] Transitions fluides entre états
- [ ] Pas de flash/saut brusque
- [ ] Duration appropriée (200-300ms)

### Notifications
- [ ] Apparaissent au bon endroit (top-right par défaut)
- [ ] Auto-dismiss après 3 secondes
- [ ] Maximum 3 visibles en même temps
- [ ] Empilées correctement si multiples

---

## 🚀 Performance

### FPS et Fluidité
- [ ] Le jeu tourne à 60 FPS constant
- [ ] Pas de lag visible
- [ ] Smooth même avec beaucoup de bâtiments
- [ ] Pas de freeze pendant les calculs

### Utilisation Mémoire
- [ ] Pas de fuite mémoire après 5-10 minutes de jeu
- [ ] Utilisation RAM raisonnable (< 100 MB)
- [ ] Pas de croissance infinie de la mémoire

### LocalStorage
- [ ] Taille de sauvegarde raisonnable (< 1 MB)
- [ ] Pas d'abus de LocalStorage
- [ ] Nettoyage des anciennes sauvegardes

### Temps de Chargement
- [ ] Page charge en < 2 secondes
- [ ] Pas de flash of unstyled content
- [ ] Loading indicator si nécessaire

---

## 🏆 Achievements (si implémenté)

### Déblocage
- [ ] Les achievements se débloquent au bon moment
- [ ] Notification visible lors du déblocage
- [ ] Son/animation de célébration (optionnel)
- [ ] Pas de déblocage en double

### Affichage
- [ ] Liste des achievements accessible
- [ ] Progression visible (ex: 15/50)
- [ ] États : locked, in progress, unlocked
- [ ] Filtres par catégorie fonctionnels
- [ ] Achievements cachés masqués jusqu'au déblocage

### Récompenses
- [ ] Les récompenses s'appliquent correctement
- [ ] Bonus permanent persisté dans la sauvegarde

---

## 📊 Statistiques (si implémenté)

### Métriques Affichées
- [ ] Cookies totaux gagnés
- [ ] Temps de jeu total
- [ ] Clics totaux
- [ ] Bâtiments achetés (par type)
- [ ] Record de cookies/seconde
- [ ] Nombre de sessions

### Précision
- [ ] Les valeurs sont exactes
- [ ] Mise à jour en temps réel
- [ ] Formatage lisible
- [ ] Pas de reset accidentel

---

## 🌐 Compatibilité Navigateurs

### Desktop
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Edge (dernière version)
- [ ] Safari (dernière version)

### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet

### Fonctionnalités
- [ ] LocalStorage supporté
- [ ] ES6 modules fonctionnent
- [ ] requestAnimationFrame disponible
- [ ] Pas d'erreur dans la console

---

## 🔍 Tests Spécifiques

### Cas Limites
- [ ] Comportement avec 0 cookies
- [ ] Comportement avec des nombres très grands (1e15+)
- [ ] Comportement avec beaucoup de bâtiments (100+)
- [ ] Sauvegarde vide ou corrompue
- [ ] LocalStorage désactivé
- [ ] JavaScript désactivé (message d'erreur)

### Scénarios Utilisateur
- [ ] Premier lancement (nouveau joueur)
- [ ] Retour après 1 heure
- [ ] Retour après 1 jour
- [ ] Import d'une sauvegarde externe
- [ ] Jeu en multitâche/background

---

## 📝 Checklist Pré-Déploiement

### Code
- [ ] Pas de console.log en production
- [ ] Pas de debugger statements
- [ ] Code minifié/optimisé
- [ ] Variables sensibles sécurisées

### Contenu
- [ ] Tous les textes relus (orthographe)
- [ ] Équilibrage testé et validé
- [ ] Pas de placeholder/lorem ipsum
- [ ] Crédits et mentions légales

### Tests Finaux
- [ ] Tous les tests ci-dessus passent ✅
- [ ] Testé sur au moins 3 navigateurs différents
- [ ] Testé sur mobile et desktop
- [ ] Aucun bug critique

---

## 🎯 Résultat attendu

✅ **PASS** : Le jeu fonctionne parfaitement, aucun bug bloquant
⚠️ **ATTENTION** : Quelques bugs mineurs, à corriger avant prod
❌ **FAIL** : Bugs critiques, ne pas déployer

---

*Gardez cette checklist à portée et cochez après chaque session de test !*
