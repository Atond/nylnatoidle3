# 🧪 CHECKLIST DE TEST - SYSTÈME ALCHIMIE

**Date:** 12 octobre 2025  
**Version:** V1.0 - Implémentation initiale  
**Durée estimée:** 2 heures

---

## 📋 PHASE 5.1 - Préparation (5 min)

### Environnement de test

- [x] ✅ Serveur de développement lancé sur http://localhost:8080
- [ ] Console du navigateur ouverte (F12) pour surveiller les erreurs
- [ ] Onglet Network pour vérifier le chargement des modules
- [ ] Sauvegarde existante supprimée pour test propre (localStorage.clear())

### Vérifications initiales

- [ ] Onglet 🧪 Alchimie visible dans la navigation
- [ ] Onglet désactivé avant niveau 10
- [ ] Import des modules alchemy-data.js et alchemy-manager.js réussi (pas d'erreur console)
- [ ] CSS alchemy.css chargé correctement

---

## 🌱 PHASE 5.2 - Test Conversions Basiques (20 min)

### Objectif

Valider le mécanisme de conversion de base T1→T2 avec un personnage niveau 10-15.

### Prérequis

- [ ] Créer un personnage ou charger une sauvegarde niveau 10+
- [ ] Obtenir 100 Cuivre (copper_ore) via minage
- [ ] Obtenir 100 Chêne (wood_oak) via bûcheronnage
- [ ] Débloquer l'onglet Alchimie (niveau 10)

### Test Conversion Cuivre → Fer

- [ ] Onglet Alchimie ouvert, section "Minerais" visible
- [ ] Carte "Cuivre → Fer" affichée avec icônes correctes
- [ ] Coût affiché : "100 Cuivre" avec quantité disponible
- [ ] Temps affiché : "5 secondes"
- [ ] Récompense affichée : "1 Fer + 10 XP"
- [ ] Bouton "Convertir" cliquable (pas de classe `locked`)
- [ ] Clic sur "Convertir" → Confirmation visuelle (modal ou direct)
- [ ] **VÉRIFICATION 1 :** Inventaire Cuivre passe de 100 → 0
- [ ] **VÉRIFICATION 2 :** Conversion apparaît dans la Queue avec barre de progression
- [ ] **VÉRIFICATION 3 :** Après 5 secondes, conversion complète
- [ ] **VÉRIFICATION 4 :** Inventaire Fer passe de 0 → 1
- [ ] **VÉRIFICATION 5 :** XP Alchimie affichée : "10 / 100 XP" (niveau 1)

### Test Conversion Chêne → Érable

- [ ] Carte "Chêne → Érable" visible dans section "Bois"
- [ ] Clic sur "Convertir" avec 100 Chêne disponible
- [ ] Conversion démarre (5 secondes)
- [ ] **VÉRIFICATION 1 :** 100 Chêne consommés
- [ ] **VÉRIFICATION 2 :** 1 Érable ajouté après 5 secondes
- [ ] **VÉRIFICATION 3 :** 10 XP gagnés (total 20 XP)

### Test Ressources Insuffisantes

- [ ] Tenter conversion sans ressources suffisantes
- [ ] Bouton "Convertir" désactivé ou message d'erreur
- [ ] Quantité affichée en rouge : "Disponible: 0 / 100"

---

## 🔄 PHASE 5.3 - Test Système Queue (20 min)

### Objectif

Valider la file d'attente (max 5 conversions simultanées) et les annulations.

### Prérequis

- [ ] Personnage niveau 10+
- [ ] 500 Cuivre + 500 Chêne disponibles

### Test Queue Multiple

- [ ] Lancer conversion Cuivre → Fer (×1)
- [ ] Lancer conversion Chêne → Érable (×1)
- [ ] **VÉRIFICATION 1 :** 2 conversions affichées dans Queue panel
- [ ] **VÉRIFICATION 2 :** Barres de progression animées simultanément
- [ ] **VÉRIFICATION 3 :** Temps restant décrémente en temps réel
- [ ] Lancer 3 conversions supplémentaires (total 5)
- [ ] **VÉRIFICATION 4 :** Queue affiche "5 / 5" conversions actives

### Test Limite Queue (Max 5)

- [ ] Tenter lancer une 6ème conversion
- [ ] **VÉRIFICATION 1 :** Message d'erreur affiché : "Queue pleine (max 5)"
- [ ] **VÉRIFICATION 2 :** Conversion non ajoutée à la queue
- [ ] **VÉRIFICATION 3 :** Ressources NON consommées

### Test Annulation Conversion

- [ ] Lancer conversion Cuivre → Fer (5 secondes)
- [ ] Attendre 2.5 secondes (50% progression)
- [ ] Cliquer sur bouton "Annuler" (❌)
- [ ] **VÉRIFICATION 1 :** Conversion retirée de la queue
- [ ] **VÉRIFICATION 2 :** Remboursement ressources : 50-100 Cuivre (basé sur progression)
- [ ] **VÉRIFICATION 3 :** Aucun output produit
- [ ] **VÉRIFICATION 4 :** Aucun XP gagné

### Test Annulation Précoce (90%+)

- [ ] Lancer conversion, attendre 4.5 secondes (90%)
- [ ] Annuler → Remboursement 90-100 Cuivre
- [ ] **VÉRIFICATION :** Pas de "triche" pour obtenir l'output

---

## 📈 PHASE 5.4 - Test Progression XP (25 min)

### Objectif

Valider la formule XP (100 × 1.5^level), les level up, et le déverrouillage progressif.

### Test Niveau 1 → 2

- [ ] XP actuelle : 0 / 100 (niveau 1)
- [ ] Faire 10 conversions Cuivre → Fer (10 XP × 10 = 100 XP)
- [ ] **VÉRIFICATION 1 :** Barre XP se remplit progressivement
- [ ] **VÉRIFICATION 2 :** À 100 XP, level up automatique → Niveau 2
- [ ] **VÉRIFICATION 3 :** Notification affichée : "🎉 Alchimie niveau 2 !"
- [ ] **VÉRIFICATION 4 :** XP requise pour niveau 3 : 150 XP (100 × 1.5^2)
- [ ] **VÉRIFICATION 5 :** XP actuelle reset à 0 / 150

### Test Niveau 2 → 10 (Déverrouillage Bonus)

- [ ] Farmer suffisamment de ressources T1
- [ ] Faire conversions jusqu'à niveau 10
- [ ] **VÉRIFICATION 1 :** À niveau 10, bonus déverrouillé : "🎁 Batch ×2"
- [ ] **VÉRIFICATION 2 :** Panneau Bonus affiche palier 10 actif (vert)
- [ ] **VÉRIFICATION 3 :** Paliers 20/30/40... affichés en gris (verrouillés)
- [ ] **VÉRIFICATION 4 :** Notification : "🎁 Bonus déverrouillé : Batch ×2 !"

### Test Déverrouillage Conversions T2→T3

- [ ] Niveau 10 atteint
- [ ] Obtenir 100 Fer (via conversions Cuivre → Fer)
- [ ] **VÉRIFICATION 1 :** Carte "Fer → Acier" maintenant déverrouillée
- [ ] **VÉRIFICATION 2 :** Temps conversion : 10 secondes (2× plus long)
- [ ] **VÉRIFICATION 3 :** Coût : 100 Fer → 1 Acier
- [ ] **VÉRIFICATION 4 :** XP gain : 15 XP (formule : base 10 + tier bonus)

### Test Progression Niveau 20

- [ ] Continuer conversions jusqu'à niveau 20
- [ ] **VÉRIFICATION 1 :** XP requise niveau 20 : 100 × 1.5^20 = ~3,325,256 XP
- [ ] **VÉRIFICATION 2 :** Conversions T3→T4 (Acier → Mithril) déverrouillées
- [ ] **VÉRIFICATION 3 :** Bonus niveau 20 actif : "🎁 Batch ×3 + 2% chance ×2"
- [ ] **VÉRIFICATION 4 :** Temps T3→T4 : 20 secondes

---

## 🎁 PHASE 5.5 - Test Bonus Paliers (20 min)

### Objectif

Valider les 8 paliers de bonus (niveaux 10/20/30/40/50/60/75/100).

### Test Bonus Batch ×2 (Niveau 10)

- [ ] Atteindre niveau 10
- [ ] **VÉRIFICATION 1 :** Panneau Bonus affiche "🎁 Niveau 10 : Batch ×2"
- [ ] **VÉRIFICATION 2 :** Classe CSS `active` appliquée (fond vert)
- [ ] **NOTE :** Batch multiplier n'est PAS testé ici (modal quantité pas encore implémentée)

### Test Bonus Chance ×2 Output (Niveau 20)

- [ ] Atteindre niveau 20
- [ ] **VÉRIFICATION 1 :** Panneau affiche "🎁 Niveau 20 : Batch ×3 + 2% chance ×2"
- [ ] Lancer 50 conversions Cuivre → Fer
- [ ] **VÉRIFICATION 2 :** ~1 conversion (2%) donne 2 Fer au lieu de 1
- [ ] **VÉRIFICATION 3 :** Message console : "🎲 Bonus output ! Quantité ×2"

### Test Bonus Niveau 30 (5% chance)

- [ ] Atteindre niveau 30
- [ ] Lancer 50 conversions
- [ ] **VÉRIFICATION :** ~2-3 conversions (5%) donnent ×2 output

### Test Tous les Paliers

- [ ] Vérifier activation séquentielle :
  - [ ] Niveau 10 : Batch ×2
  - [ ] Niveau 20 : Batch ×3 + 2% chance
  - [ ] Niveau 30 : Batch ×4 + 5% chance
  - [ ] Niveau 40 : Batch ×5 + 8% chance
  - [ ] Niveau 50 : Batch ×6 + 12% chance
  - [ ] Niveau 60 : Batch ×8 + 15% chance
  - [ ] Niveau 75 : Batch ×10 + 20% chance
  - [ ] Niveau 100 : Batch ×15 + 30% chance

---

## 🏗️ PHASE 5.6 - Test Laboratoire Passif (30 min)

### Objectif

Valider le bâtiment Laboratoire avec production passive et scaling exponentiel.

### Prérequis

- [ ] Personnage niveau 15+
- [ ] Alchimie niveau 10+
- [ ] 5,000 Or + 500 Chêne + 500 Fer disponibles

### Test Déverrouillage Laboratoire

- [ ] Ouvrir onglet 🏰 Ville (Town)
- [ ] **VÉRIFICATION 1 :** Laboratoire visible dans liste bâtiments
- [ ] **VÉRIFICATION 2 :** Si niveau < 15 OU alchemy < 10 → Cadenas affiché
- [ ] **VÉRIFICATION 3 :** Tooltip explique conditions : "Niveau 15 + Alchimie 10"
- [ ] Atteindre niveau 15 + alchemy 10
- [ ] **VÉRIFICATION 4 :** Cadenas retiré, bouton "🏗️ Construire" actif

### Test Construction Niveau 1

- [ ] Cliquer "Construire" sur Laboratoire
- [ ] **VÉRIFICATION 1 :** 5,000 Or consommés
- [ ] **VÉRIFICATION 2 :** 500 Chêne + 500 Fer consommés
- [ ] **VÉRIFICATION 3 :** Laboratoire niveau 1 construit
- [ ] **VÉRIFICATION 4 :** Production affichée : "🧪 10 conversions/heure"
- [ ] **VÉRIFICATION 5 :** Détails : "(0.17 conversions/min • 0.003 conversions/sec)"
- [ ] **VÉRIFICATION 6 :** Info-bulle : "💡 Convertit automatiquement vos ressources T1→T2→T3"

### Test Production Passive Niveau 1

- [ ] Ajouter 1,000 Cuivre à l'inventaire
- [ ] Attendre 6 minutes (360 secondes)
- [ ] **VÉRIFICATION 1 :** ~1 conversion Cuivre → Fer effectuée automatiquement
- [ ] **VÉRIFICATION 2 :** Inventaire Cuivre : 1000 - 100 = 900
- [ ] **VÉRIFICATION 3 :** Inventaire Fer : +1
- [ ] **VÉRIFICATION 4 :** XP Alchimie : +2.5 XP (10 XP × 0.25 penalty)
- [ ] **VÉRIFICATION 5 :** Message console : "🧪 [Lab] Converted 100 copper_ore → 1 iron_ore..."

### Test Production Continue (10 minutes AFK)

- [ ] Ajouter 10,000 Cuivre + 10,000 Chêne
- [ ] Laisser tourner 10 minutes (600 sec)
- [ ] **VÉRIFICATION 1 :** ~1.67 conversions effectuées (10 conv/h = 1/6 min)
- [ ] **VÉRIFICATION 2 :** Ressources consommées : ~167 Cuivre + ~167 Chêne
- [ ] **VÉRIFICATION 3 :** Outputs produits : ~1-2 Fer + ~1-2 Érable
- [ ] **VÉRIFICATION 4 :** XP gagnée : ~4-5 XP

### Test Upgrade Niveau 2

- [ ] Cliquer "⬆️ Améliorer" sur Laboratoire
- [ ] **VÉRIFICATION 1 :** Coût affiché : 11,000 Or (5000 × 2.2)
- [ ] **VÉRIFICATION 2 :** Coût : 1,100 Chêne + 1,100 Fer
- [ ] **VÉRIFICATION 3 :** Aperçu production : "🧪 20 conversions/heure (×2)"
- [ ] Améliorer au niveau 2
- [ ] **VÉRIFICATION 4 :** Production affichée : "20 conversions/heure"
- [ ] **VÉRIFICATION 5 :** Gain affiché : "(+10 conversions/heure supplémentaires)"

### Test Production Niveau 2

- [ ] Ajouter 1,000 Cuivre
- [ ] Attendre 3 minutes (180 sec)
- [ ] **VÉRIFICATION :** ~1 conversion effectuée (20 conv/h = 1/3 min)

### Test Scaling Exponentiel (Niveau 5)

- [ ] Améliorer Laboratoire jusqu'au niveau 5
- [ ] **VÉRIFICATION 1 :** Production niveau 5 : 10 × 2^4 = 160 conv/h
- [ ] **VÉRIFICATION 2 :** Production affichée : "160 conversions/heure"
- [ ] **VÉRIFICATION 3 :** "(2.67 conversions/min • 0.044 conversions/sec)"
- [ ] Attendre 1 minute avec 10,000 Cuivre disponible
- [ ] **VÉRIFICATION 4 :** ~2-3 conversions effectuées

### Test Priorité Conversions (T1 → T2 prioritaire)

- [ ] Avoir : 1,000 Cuivre (T1) + 500 Fer (T2) + 200 Acier (T3)
- [ ] Niveau Alchimie 20+ (conversions T1→T2→T3 déverrouillées)
- [ ] Laboratoire niveau 5 (160 conv/h)
- [ ] Attendre 1 minute
- [ ] **VÉRIFICATION 1 :** Conversions Cuivre → Fer effectuées EN PREMIER
- [ ] **VÉRIFICATION 2 :** Si Cuivre épuisé, ALORS conversions Fer → Acier
- [ ] **VÉRIFICATION 3 :** Si Fer épuisé, ALORS conversions Chêne → Érable
- [ ] **VÉRIFICATION 4 :** Priorité respectée : T1→T2 avant T2→T3

### Test Bonus Output Passif

- [ ] Niveau Alchimie 20+ (2% chance ×2)
- [ ] Laisser Laboratoire faire 50 conversions passives
- [ ] **VÉRIFICATION :** ~1 conversion donne ×2 output (chance appliquée)

---

## 💾 PHASE 5.7 - Test Save/Load (20 min)

### Objectif

Valider la persistance des conversions en cours et de l'état du Laboratoire.

### Test Save avec Queue Active

- [ ] Lancer 3 conversions avec temps restant différents :
  - [ ] Conversion 1 : Cuivre → Fer (2 sec restantes)
  - [ ] Conversion 2 : Chêne → Érable (4 sec restantes)
  - [ ] Conversion 3 : Fer → Acier (8 sec restantes)
- [ ] Appuyer sur F12, console : `localStorage.getItem('idlegame_save')`
- [ ] **VÉRIFICATION 1 :** JSON contient `"alchemy": {...}`
- [ ] **VÉRIFICATION 2 :** `conversionQueue` array avec 3 items
- [ ] **VÉRIFICATION 3 :** Chaque item a `timeRemaining` > 0
- [ ] **VÉRIFICATION 4 :** Level et XP sauvegardés

### Test Load avec Queue Active

- [ ] Recharger la page (F5) immédiatement
- [ ] **VÉRIFICATION 1 :** Onglet Alchimie toujours déverrouillé
- [ ] **VÉRIFICATION 2 :** Queue panel affiche les 3 conversions
- [ ] **VÉRIFICATION 3 :** Temps restants sont CORRECTS (pas reset à 0)
- [ ] **VÉRIFICATION 4 :** Barres de progression reprennent là où elles étaient
- [ ] Attendre la complétion des conversions
- [ ] **VÉRIFICATION 5 :** Outputs produits correctement
- [ ] **VÉRIFICATION 6 :** XP gagnée comme prévu

### Test Save Laboratoire

- [ ] Laboratoire niveau 3 construit
- [ ] Sauvegarder et recharger
- [ ] **VÉRIFICATION 1 :** Laboratoire toujours niveau 3
- [ ] **VÉRIFICATION 2 :** Production affichée correcte (40 conv/h)
- [ ] **VÉRIFICATION 3 :** Production passive continue après load

### Test Save État Complet

- [ ] État complexe :
  - [ ] Alchimie niveau 15
  - [ ] 2,500 XP vers niveau 16
  - [ ] 4 conversions en queue
  - [ ] Laboratoire niveau 5
  - [ ] Bonus niveaux 10 et 20 déverrouillés
- [ ] Sauvegarder (Ctrl+S ou auto-save)
- [ ] **VÉRIFICATION 1 :** localStorage contient toutes les données
- [ ] Fermer onglet, rouvrir
- [ ] **VÉRIFICATION 2 :** Tout l'état restauré parfaitement
- [ ] **VÉRIFICATION 3 :** Aucune perte de progression

### Test Offline Progress (Laboratoire)

- [ ] Laboratoire niveau 5 (160 conv/h)
- [ ] 10,000 Cuivre en inventaire
- [ ] Sauvegarder et fermer le jeu
- [ ] Attendre 10 minutes (temps réel)
- [ ] Rouvrir le jeu
- [ ] **VÉRIFICATION 1 :** Temps offline calculé (~600 secondes)
- [ ] **VÉRIFICATION 2 :** Conversions passives effectuées : ~26 conversions (160/h × 10min/60)
- [ ] **VÉRIFICATION 3 :** Ressources consommées : ~2,600 Cuivre
- [ ] **VÉRIFICATION 4 :** Outputs produits : ~26 Fer
- [ ] **VÉRIFICATION 5 :** XP gagnée : ~65 XP (10 × 26 × 0.25)

---

## 🎯 PHASE 5.8 - Test Progression Complète 1→30 (20 min)

### Objectif

Simuler une progression naturelle du niveau 1 à 30 pour valider l'économie globale.

### Niveau 1-10 (Conversions T1→T2)

- [ ] Démarrer personnage niveau 10
- [ ] Farmer 10,000 Cuivre via minage
- [ ] Faire conversions Cuivre → Fer jusqu'à niveau 10 Alchimie
- [ ] **VÉRIFICATION 1 :** ~100 conversions nécessaires (1,000 XP total)
- [ ] **VÉRIFICATION 2 :** Temps total : ~8.3 minutes (5 sec × 100)
- [ ] **VÉRIFICATION 3 :** Bonus niveau 10 déverrouillé

### Niveau 10-20 (Conversions T2→T3)

- [ ] Farmer/Convertir 10,000 Fer
- [ ] Débloquer conversions Fer → Acier (niveau 10+)
- [ ] Faire conversions jusqu'à niveau 20
- [ ] **VÉRIFICATION 1 :** ~200-250 conversions nécessaires (XP scaling)
- [ ] **VÉRIFICATION 2 :** Temps total : ~33-41 minutes (10 sec × 200-250)
- [ ] **VÉRIFICATION 3 :** Conversions T3→T4 déverrouillées

### Niveau 20-30 (Conversions T3→T4)

- [ ] Farmer/Convertir Acier
- [ ] Débloquer conversions Acier → Mithril (niveau 20+)
- [ ] Faire conversions jusqu'à niveau 30
- [ ] **VÉRIFICATION 1 :** ~500-700 conversions nécessaires (XP exponentiel)
- [ ] **VÉRIFICATION 2 :** Temps total : ~2.8-3.9 heures (20 sec × 500-700)
- [ ] **VÉRIFICATION 3 :** Bonus niveau 30 déverrouillé (Batch ×4 + 5% chance)

### Économie Globale

- [ ] **VÉRIFICATION 1 :** Temps total 1→30 : ~4-5 heures gameplay actif
- [ ] **VÉRIFICATION 2 :** Avec Laboratoire niveau 5 : ~2-3 heures (production passive)
- [ ] **VÉRIFICATION 3 :** Coûts ressources cohérents avec farming rate
- [ ] **VÉRIFICATION 4 :** Progression "fun" et pas trop grind

---

## 🐛 PHASE 5.9 - Tests Edge Cases (15 min)

### Objectif

Identifier bugs potentiels et cas limites.

### Test Inventaire Plein

- [ ] Remplir inventaire à la limite de stockage
- [ ] Tenter conversion qui produirait overflow
- [ ] **VÉRIFICATION :** Conversion bloquée OU excès stocké sans crash

### Test Ressources Exactes

- [ ] Avoir exactement 100 Cuivre (pas plus)
- [ ] Lancer conversion Cuivre → Fer
- [ ] **VÉRIFICATION :** 0 Cuivre restant (pas de -1 ou bug)

### Test Conversion Pendant Level Up

- [ ] XP à 95/100, lancer conversion qui donne +10 XP
- [ ] **VÉRIFICATION 1 :** Level up se déclenche
- [ ] **VÉRIFICATION 2 :** XP overflow reportée : 5/150 (niveau 2)
- [ ] **VÉRIFICATION 3 :** Conversion complète normalement

### Test Annulation Multiple Rapide

- [ ] Lancer 5 conversions
- [ ] Annuler toutes rapidement (spam clic)
- [ ] **VÉRIFICATION :** Pas de crash, remboursements corrects

### Test Laboratoire Sans Ressources

- [ ] Laboratoire actif, inventaire vide
- [ ] Attendre 10 minutes
- [ ] **VÉRIFICATION 1 :** Aucune conversion tentée
- [ ] **VÉRIFICATION 2 :** Pas d'erreur console
- [ ] **VÉRIFICATION 3 :** Pas de ressources négatives

### Test Double-Clic Conversion

- [ ] Avoir 200 Cuivre
- [ ] Double-cliquer rapidement "Convertir"
- [ ] **VÉRIFICATION 1 :** UNE seule conversion lancée (pas 2)
- [ ] **VÉRIFICATION 2 :** 100 Cuivre consommés (pas 200)

---

## 📊 RÉSULTATS ATTENDUS

### Critères de Succès ✅

- [ ] **0 erreur JavaScript** dans la console
- [ ] **Toutes les conversions T1→T7** fonctionnent
- [ ] **Queue max 5** respectée strictement
- [ ] **XP formula** correcte : 100 × 1.5^level
- [ ] **Bonus paliers** activent aux bons niveaux
- [ ] **Laboratoire** production = 10 × 2^(level-1) conv/h
- [ ] **Save/Load** preserve 100% de l'état
- [ ] **Temps conversions** respectés (5s/10s/20s/40s/80s/160s)
- [ ] **Bonus chance ×2** appliqué selon %
- [ ] **UI responsive** et fluide

### Bugs Critiques 🚨

Liste des bugs bloquants trouvés :

- [ ] _Aucun pour l'instant_

### Bugs Mineurs ⚠️

Liste des bugs non-bloquants :

- [ ] _À compléter pendant les tests_

### Ajustements de Balance 🎲

Modifications suggérées :

- [ ] _À noter pendant les tests_

---

## 📝 NOTES DE TEST

### Session 1 - [Date/Heure]

- **Testeur :**
- **Durée :**
- **Navigateur :**
- **Notes :**

---

**Prochaine étape après Phase 5 :** Phase 6 - Polish & Ajustements (modal quantité, tooltips, balance finale)
