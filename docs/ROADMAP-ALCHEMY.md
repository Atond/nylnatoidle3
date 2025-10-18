# 🗺️ ROADMAP VISUELLE - SYSTÈME ALCHIMIE

> **Timeline** : 2-3 semaines  
> **Effort** : 20 heures  
> **Status** : 🟡 En Attente

---

## 📅 PLANNING DÉTAILLÉ

```
SEMAINE 1 : BACKEND & DATA
═══════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────┐
│ JOUR 1-2 : DATA & CONFIGURATION (2h)                    │
├─────────────────────────────────────────────────────────┤
│ ✅ Créer alchemy-data.js                                │
│ ✅ Définir conversions T1→T7                            │
│ ✅ Config bâtiment Laboratoire                          │
│ ✅ Mettre à jour game-config.js                         │
│                                                          │
│ 📁 Fichiers : 4 modifiés                                │
│ 🔧 Difficulté : Facile                                  │
│ ⏱️ Temps : 2h                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JOUR 3-5 : ALCHEMY MANAGER (6h)                         │
├─────────────────────────────────────────────────────────┤
│ ✅ Classe AlchemyManager complète                       │
│ ✅ Système conversion (input → output)                  │
│ ✅ Queue conversions (max 5)                            │
│ ✅ Progression XP + level up                            │
│ ✅ Bonus paliers (10, 20, 30...)                        │
│ ✅ Save/Load état                                       │
│ ✅ Intégration game.js                                  │
│                                                          │
│ 📁 Fichiers : 1 nouveau + 3 modifiés                    │
│ 🔧 Difficulté : Moyenne                                 │
│ ⏱️ Temps : 6h                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JOUR 6-7 : TESTS BACKEND (Inclus dans 6h)              │
├─────────────────────────────────────────────────────────┤
│ ✅ Test conversions basiques                            │
│ ✅ Test queue (max 5, refus si plein)                   │
│ ✅ Test XP et level up                                  │
│ ✅ Test bonus output                                    │
│ ✅ Test save/load                                       │
│                                                          │
│ 🧪 Tests : 10+ scenarios                                │
│ 🔧 Difficulté : Facile                                  │
└─────────────────────────────────────────────────────────┘


SEMAINE 2 : FRONTEND & UX
═══════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────┐
│ JOUR 1-3 : UI/UX ALCHIMIE (5h)                          │
├─────────────────────────────────────────────────────────┤
│ ✅ Onglet Alchimie dans professions                     │
│ ✅ Liste conversions disponibles                        │
│ ✅ Modal "Nouvelle conversion"                          │
│ ✅ Slider quantité (1-100+)                             │
│ ✅ Queue visuelle (progress bars)                       │
│ ✅ Affichage équivalences T1                            │
│ ✅ Notifications conversions                            │
│ ✅ CSS animations                                       │
│                                                          │
│ 📁 Fichiers : 1 CSS nouveau + 2 modifiés                │
│ 🎨 Qualité : Polish professionnel                       │
│ ⏱️ Temps : 5h                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JOUR 4-5 : BÂTIMENT LABORATOIRE (3h)                    │
├─────────────────────────────────────────────────────────┤
│ ✅ Logique production passive                           │
│ ✅ Intégration BuildingManager                          │
│ ✅ Bonus vitesse conversion                             │
│ ✅ UI upgrade laboratoire                               │
│ ✅ Affichage prod temps réel                            │
│                                                          │
│ 📁 Fichiers : 3 modifiés                                │
│ 🔧 Difficulté : Facile                                  │
│ ⏱️ Temps : 3h                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JOUR 6 : CRAFT UPDATE (2h)                              │
├─────────────────────────────────────────────────────────┤
│ ✅ Remplacer tous les coûts craft                       │
│ ✅ Appliquer formule : 10 tier N                        │
│ ✅ Tooltips équivalence T1                              │
│ ✅ Tests craft T1-T5                                    │
│                                                          │
│ 📁 Fichiers : 2 modifiés                                │
│ 🔧 Difficulté : Facile                                  │
│ ⏱️ Temps : 2h                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ JOUR 7 : TESTS FINAUX & POLISH (2h)                     │
├─────────────────────────────────────────────────────────┤
│ ✅ Playtest complet niveau 1-30                         │
│ ✅ Vérifier balance conversions                         │
│ ✅ Ajuster temps si nécessaire                          │
│ ✅ Polish UI/UX                                         │
│ ✅ Documentation inline (JSDoc)                         │
│ ✅ Prêt pour Alpha                                      │
│                                                          │
│ 🧪 Tests : Parcours complet                             │
│ ✨ Qualité : Production-ready                           │
│ ⏱️ Temps : 2h                                            │
└─────────────────────────────────────────────────────────┘


TOTAL : 20 HEURES
════════════════════════════════════════════════════════════
```

---

## 🎯 MILESTONES

### **Milestone 1 : Backend Fonctionnel (Jour 5)**

```
✅ AlchemyManager opérationnel
✅ Conversions fonctionnelles
✅ XP et level up OK
✅ Save/Load OK

→ DEMO POSSIBLE (console uniquement)
```

### **Milestone 2 : UI Complète (Jour 10)**

```
✅ Onglet Alchimie visible
✅ Conversions cliquables
✅ Queue affichée
✅ Laboratoire intégré
✅ Craft mis à jour

→ ALPHA PLAYABLE
```

### **Milestone 3 : Release Candidate (Jour 14)**

```
✅ Tests complets passés
✅ Balance validée
✅ Polish UI terminé
✅ Documentation complète

→ PRÊT POUR BETA
```

---

## 📊 DÉPENDANCES

```
┌─────────────────┐
│  PHASE 1: DATA  │
│     (Jour 1)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ PHASE 2: BACKEND│
│   (Jour 2-5)    │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌─────────┐
│ PHASE 3│ │ PHASE 6 │
│   UI   │ │  CRAFT  │
│(Jour   │ │ (Jour   │
│ 6-8)   │ │  11)    │
└───┬────┘ └────┬────┘
    │           │
    └─────┬─────┘
          ↓
    ┌──────────┐
    │ PHASE 4  │
    │BUILDING  │
    │(Jour     │
    │ 9-10)    │
    └────┬─────┘
         │
         ↓
    ┌──────────┐
    │ PHASE 5  │
    │  TESTS   │
    │(Jour     │
    │  12-14)  │
    └──────────┘
```

---

## 👥 RESSOURCES NÉCESSAIRES

### **Développeur Full-Stack (1 personne)**

```
Compétences requises :
├─ JavaScript ES6+
├─ HTML/CSS
├─ Architecture MVC
├─ Game loops & timing
└─ Data structures (queues)

Expérience souhaitée :
├─ Idle games (bonus)
├─ VS Code
└─ Git/GitHub

Charge : 20 heures sur 2-3 semaines
```

### **Testeur QA (0.5 personne)**

```
Rôle :
├─ Playtest phase alpha
├─ Rapport bugs
└─ Validation balance

Charge : 4-6 heures (Jour 12-14)
```

### **Designer UX (Optionnel)**

```
Rôle :
├─ Review mockups UI
├─ Feedback ergonomie
└─ Validation icônes

Charge : 2 heures (Jour 6-7)
```

---

## 🚦 GATES DE VALIDATION

### **Gate 1 : Go/No-Go Développement**

```
✅ Budget approuvé (20h × taux horaire)
✅ Développeur assigné
✅ Specs validées (BALANCE-ALCHEMY.md)
✅ Timeline acceptée

→ SI OUI : Démarrer Phase 1
→ SI NON : Bloquer + réunion clarification
```

### **Gate 2 : Validation Backend**

```
✅ Tests unitaires passent (100%)
✅ Conversions fonctionnent
✅ Save/Load OK
✅ Pas de bugs critiques

→ SI OUI : Continuer Phase 3 (UI)
→ SI NON : Debug + retests
```

### **Gate 3 : Go/No-Go Alpha**

```
✅ UI fonctionnelle
✅ Playtest 1-30 OK
✅ Balance cohérente
✅ Pas de bugs bloquants

→ SI OUI : Alpha release interne
→ SI NON : Itération polish
```

### **Gate 4 : Go/No-Go Beta Publique**

```
✅ Alpha feedback intégré
✅ Tous bugs critiques fixés
✅ Performance OK (60 FPS)
✅ Documentation complète

→ SI OUI : Beta publique
→ SI NON : Extended alpha
```

---

## 📈 KPIs DE SUCCÈS

### **Techniques**

| Métrique              | Cible  | Mesure          |
| --------------------- | ------ | --------------- |
| Performance (FPS)     | ≥60    | Chrome DevTools |
| Temps sauvegarde      | <100ms | Console.time()  |
| Bugs critiques        | 0      | Tracker GitHub  |
| Code coverage (tests) | ≥80%   | Jest/Coverage   |

### **Gameplay**

| Métrique                  | Cible  | Mesure         |
| ------------------------- | ------ | -------------- |
| Temps progression 1→30    | 50-75h | Playtest       |
| Satisfaction conversions  | ≥7/10  | Survey joueurs |
| Taux utilisation alchimie | ≥90%   | Analytics      |
| Rétention J7              | +25%   | Analytics      |

### **Qualité**

| Métrique                 | Cible   | Mesure        |
| ------------------------ | ------- | ------------- |
| Bugs rapportés (Alpha)   | <5      | GitHub Issues |
| Temps fix bugs moyens    | <2h     | Time tracking |
| Score UX (SUS)           | ≥75/100 | Survey        |
| NPS (Net Promoter Score) | ≥40     | Survey        |

---

## ⚠️ PLAN DE CONTINGENCE

### **Risque : Développeur Malade**

```
Impact : 🔴 CRITIQUE (bloque tout)

Mitigation :
├─ Backup developer (junior) disponible
├─ Documentation détaillée (IMPLEMENTATION-GUIDE)
├─ Code review quotidien (pas de blocage fin sprint)
└─ Buffer 2-3 jours dans planning

Action si trigger :
→ Basculer sur backup dev (perte 30% vitesse)
→ Prioriser Phases 1-2 (backend critique)
→ Report Phase 4 (laboratoire) si nécessaire
```

### **Risque : Bugs Critiques Découverts Tard**

```
Impact : 🟡 MOYEN (retard 2-5 jours)

Mitigation :
├─ Tests continus (pas seulement fin)
├─ Demo backend Jour 5 (catch early)
├─ Code review avant chaque phase
└─ Buffer intégré (2-3 jours)

Action si trigger :
→ Freeze nouvelles features
→ Focus 100% debug
→ Extend Alpha phase
→ Décaler Beta release
```

### **Risque : Balance Déséquilibrée**

```
Impact : 🟢 FAIBLE (ajustements config)

Mitigation :
├─ Ratios basés sur idle games prouvés
├─ Config data (pas hardcodé)
├─ Ajustable sans recompile
└─ Playtest niveau 1-30 complet

Action si trigger :
→ Ajuster temps conversions (fichier config)
→ Modifier ratios 100:1 → 50:1 ou 200:1
→ Hotfix rapide (<1h)
→ Pas de retard timeline
```

---

## 📊 REPORTING HEBDOMADAIRE

### **Format Rapport**

```markdown
## RAPPORT SEMAINE N

### Avancement

- [x] Phase 1 : Data ✅ (2h)
- [ ] Phase 2 : Backend 🔄 (4h/6h)
- [ ] Phase 3 : UI ⏸️ (0h/5h)

### Accomplissements

1. AlchemyManager créé et fonctionnel
2. System conversion opérationnel
3. Tests unitaires passent (8/10)

### Blocages

- ❌ AUCUN

### Prochaine Semaine

1. Finir tests backend
2. Démarrer UI (Phase 3)
3. Première demo visuelle

### Risques Identifiés

- 🟢 Planning OK
- 🟢 Qualité OK
- 🟡 Besoin review UX avant finir UI
```

---

## 🎉 LIVRAISON FINALE

### **Package Release**

```
📦 ALCHIMIE V1.0.0
├─ 📁 Code
│   ├─ src/js/alchemy-manager.js
│   ├─ src/config/alchemy-data.js
│   ├─ src/css/alchemy.css
│   └─ ... (fichiers modifiés)
├─ 📄 Documentation
│   ├─ BALANCE-ALCHEMY.md
│   ├─ IMPLEMENTATION-GUIDE-ALCHEMY.md
│   └─ API.md (JSDoc généré)
├─ 🧪 Tests
│   ├─ alchemy.test.js
│   └─ coverage-report/
├─ 📊 Data
│   ├─ balance-sheet.xlsx
│   └─ playtest-results.csv
└─ 📝 Changelog
    └─ CHANGELOG-ALCHEMY.md
```

### **Checklist Pre-Release**

```
Code :
✅ Tous fichiers commités
✅ Pas de console.log() oubliés
✅ Variables bien nommées
✅ JSDoc complet

Tests :
✅ 100% tests passent
✅ Coverage ≥80%
✅ Playtest 1-50 complet
✅ Performance validée

Documentation :
✅ README.md mis à jour
✅ CHANGELOG complet
✅ Guide joueur créé
✅ API documentée

Déploiement :
✅ Build production OK
✅ Pas de warnings
✅ Minification OK
✅ Backup BD créé
```

---

## 📅 DATE CIBLES

```
🗓️ PLANNING

┌──────────────────────────────────────────────┐
│ 14 OCT 2025  │ Validation Specs            │
│ 15 OCT 2025  │ Go/No-Go Développement      │
│              │                              │
│ 16-17 OCT    │ Phase 1 : Data              │
│ 18-21 OCT    │ Phase 2 : Backend           │
│ 21 OCT       │ 🎯 MILESTONE 1              │
│              │                              │
│ 22-24 OCT    │ Phase 3 : UI/UX             │
│ 25-26 OCT    │ Phase 4 : Laboratoire       │
│ 27 OCT       │ Phase 6 : Craft Update      │
│ 28 OCT       │ 🎯 MILESTONE 2 (ALPHA)      │
│              │                              │
│ 29-30 OCT    │ Phase 5 : Tests & Polish    │
│ 31 OCT       │ 🎯 MILESTONE 3 (RC)         │
│              │                              │
│ 1-5 NOV      │ Beta Testing                │
│ 6 NOV        │ 🚀 RELEASE PUBLIQUE         │
└──────────────────────────────────────────────┘
```

---

## ✅ ACCEPTATION FINALE

### **Critères Release**

```
Technique :
✅ Code compile sans erreurs
✅ Tests passent (100%)
✅ Performance validée (≥60 FPS)
✅ Pas de memory leaks
✅ Compatible Chrome/Firefox/Safari

Gameplay :
✅ Conversions fonctionnent T1-T7
✅ Laboratoire produit passivement
✅ Craft T1-T5 équilibré
✅ Save/Load préserve état
✅ Offline conversions OK

UX :
✅ UI responsive
✅ Tooltips explicatifs partout
✅ Notifications claires
✅ Pas de bugs visuels
✅ Mobile friendly (optionnel)

Documentation :
✅ Guide joueur disponible
✅ Tutorial in-game
✅ FAQ complète
✅ Support préparé
```

---

## 🎊 POST-RELEASE

### **Semaine 1 Après Release**

```
Mon : Monitoring métriques (rétention, bugs)
Mar : Hotfix si bugs critiques
Mer : Analyse feedback joueurs
Jeu : Ajustements balance si nécessaire
Ven : Rapport post-mortem

KPIs à surveiller :
├─ Taux utilisation alchimie
├─ Temps moyen conversions
├─ Bugs rapportés
└─ Satisfaction (NPS)
```

### **Améliorations Futures (V1.1+)**

```
Priorité Haute :
□ Conversion de masse (1000× en une fois)
□ Auto-conversion intelligente
□ Talents spécifiques alchimie

Priorité Moyenne :
□ Skip tiers (T1→T3 direct, niveau 100+)
□ Quêtes alchimie
□ Achievements alchimie

Priorité Basse :
□ Skins laboratoire
□ Effets visuels conversions
□ Leaderboard conversions
```

---

**🚀 Prêt à démarrer ? GO ! 🚀**
