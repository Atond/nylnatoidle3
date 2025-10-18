# 📚 INDEX DOCUMENTATION - IDLE RPG V2

> **Table des matières complète** pour la refonte du jeu  
> **Dernière mise à jour** : 12 Octobre 2025  
> **Version** : 0.2.0-alpha (🧪 Système Alchimie)

---

## 🎯 PAR OÙ COMMENCER ?

### **🔥 NOUVEAUTÉ - SYSTÈME ALCHIMIE**

**Problème résolu** : Comment gérer la progression exponentielle des métiers (millions de ressources) avec des coûts de craft RP-friendly ?

**Solution** : Nouveau métier **Alchimiste** qui convertit ressources T1 → T2 → T3 (ratio 100:1)

→ **LISEZ D'ABORD** : [BALANCE-RESOURCE-ECONOMY.md](BALANCE-RESOURCE-ECONOMY.md)

### **Vous êtes développeur ?**

→ Lisez d'abord **[ROADMAP-V2.md](../ROADMAP-V2.md)** (plan d'implémentation)

### **Vous voulez comprendre la vision globale ?**

→ Lisez **[BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md)** (philosophie)

### **Vous voulez voir les chiffres ?**

→ Lisez **[BALANCE-GRAPHS.md](BALANCE-GRAPHS.md)** (visualisations)

---

## 📖 DOCUMENTS EXISTANTS

### **Vue d'Ensemble**

| Fichier                                                | Description             | Statut             | Priorité |
| ------------------------------------------------------ | ----------------------- | ------------------ | -------- |
| [BALANCE-OVERVIEW.md](BALANCE-OVERVIEW.md)             | Philosophie générale V1 | ⚠️ À mettre à jour | Moyenne  |
| [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) | **Vision complète V2**  | ✅ Complet         | 🔥 HAUTE |
| [BALANCE-GRAPHS.md](BALANCE-GRAPHS.md)                 | Graphiques progression  | ✅ Complet         | Moyenne  |

### **Joueur & Stats**

| Fichier                                            | Description                 | Statut           | Priorité |
| -------------------------------------------------- | --------------------------- | ---------------- | -------- |
| [BALANCE-PLAYER.md](BALANCE-PLAYER.md)             | Stats, XP, classes, talents | ✅ Mis à jour V2 | Haute    |
| [BALANCE-STAT-CHANGES.md](BALANCE-STAT-CHANGES.md) | Changements système stats   | ✅ Complet       | Haute    |

### **Métiers & Économie** 🧪

| Fichier                                                                  | Description                       | Statut             | Priorité |
| ------------------------------------------------------------------------ | --------------------------------- | ------------------ | -------- |
| [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) | **Métiers V2 (infini)**           | ✅ Complet         | 🔥 HAUTE |
| [BALANCE-RESOURCE-ECONOMY.md](BALANCE-RESOURCE-ECONOMY.md) 🆕            | **Économie & Alchimie**           | ✅ Nouveau         | 🔥 HAUTE |
| [BALANCE-ALCHEMY.md](BALANCE-ALCHEMY.md) 🆕                              | **Spécifications Alchimiste**     | ✅ Nouveau         | 🔥 HAUTE |
| [BALANCE-CRAFTING-REVISED.md](BALANCE-CRAFTING-REVISED.md) 🆕            | **Nouveaux coûts craft**          | ✅ Nouveau         | 🔥 HAUTE |
| [BALANCE-COMPARISON-IDLE-GAMES.md](BALANCE-COMPARISON-IDLE-GAMES.md) 🆕  | **Validation vs références**      | ✅ Nouveau         | Moyenne  |
| [BALANCE-CRAFTING.md](BALANCE-CRAFTING.md)                               | Recettes craft (ancienne version) | ⚠️ Obsolète        | Basse    |
| [BALANCE-BUILDINGS.md](BALANCE-BUILDINGS.md)                             | Ville production                  | ⚠️ À mettre à jour | Haute    |

### **Implémentation & Guides** 🛠️

| Fichier                                                               | Description                          | Statut     | Priorité |
| --------------------------------------------------------------------- | ------------------------------------ | ---------- | -------- |
| [ROADMAP-V2.md](../ROADMAP-V2.md)                                     | **Plan implémentation V2**           | ✅ Complet | 🔥 HAUTE |
| [IMPLEMENTATION-GUIDE-ALCHEMY.md](IMPLEMENTATION-GUIDE-ALCHEMY.md) 🆕 | **Guide dev Alchimie (20h)**         | ✅ Nouveau | 🔥 HAUTE |
| [ROADMAP-ALCHEMY.md](ROADMAP-ALCHEMY.md) 🆕                           | **Planning Alchimie (2-3 semaines)** | ✅ Nouveau | 🔥 HAUTE |
| [EXECUTIVE-SUMMARY-ALCHEMY.md](EXECUTIVE-SUMMARY-ALCHEMY.md) 🆕       | **Résumé exécutif Alchimie**         | ✅ Nouveau | 🔥 HAUTE |
| [QUICKSTART-ALCHEMY.md](QUICKSTART-ALCHEMY.md) 🆕                     | **Quick Start Alchimie (5 min)**     | ✅ Nouveau | Haute    |
| [PACKAGE-SUMMARY-ALCHEMY.md](PACKAGE-SUMMARY-ALCHEMY.md) 🆕           | **Récap package complet**            | ✅ Nouveau | Moyenne  |

---

## 🔥 DOCUMENTS PRIORITAIRES - SYSTÈME ALCHIMIE

### **📋 Pour Chef de Projet / Product Owner**

**[EXECUTIVE-SUMMARY-ALCHEMY.md](EXECUTIVE-SUMMARY-ALCHEMY.md)** (5 min) 🆕

- Résumé problème + solution
- ROI et coûts
- Décision Go/No-Go
- Métriques clés

### **🗺️ Pour Planning**

**[ROADMAP-ALCHEMY.md](ROADMAP-ALCHEMY.md)** (10 min) 🆕

- Timeline 2-3 semaines
- Milestones et gates
- Ressources nécessaires
- Plan de contingence

### **🛠️ Pour Développeurs**

**[IMPLEMENTATION-GUIDE-ALCHEMY.md](IMPLEMENTATION-GUIDE-ALCHEMY.md)** (30 min) 🆕

- Checklist complète (20h)
- Code examples
- Structure fichiers
- Tests à effectuer

### **📊 Pour Comprendre le Système**

**[BALANCE-RESOURCE-ECONOMY.md](BALANCE-RESOURCE-ECONOMY.md)** (15 min) 🆕

- Analyse problème actuel
- Solution détaillée
- Exemples gameplay
- Comparaison idle games

**[BALANCE-ALCHEMY.md](BALANCE-ALCHEMY.md)** (20 min) 🆕

- Spécifications métier
- Conversions T1-T7
- Bonus par niveau
- Bâtiment Laboratoire

**[BALANCE-CRAFTING-REVISED.md](BALANCE-CRAFTING-REVISED.md)** (10 min) 🆕

- Nouveaux coûts craft
- Tables complètes
- Progression équilibrée

**[BALANCE-COMPARISON-IDLE-GAMES.md](BALANCE-COMPARISON-IDLE-GAMES.md)** (15 min) 🆕

- Validation vs Melvor, NGU, Cookie Clicker
- Best practices industrie

---

## 🔥 DOCUMENTS PRIORITAIRES V2 (Anciens)

Ces documents contiennent la vision globale V2 :

### **1. BALANCE-ENDGAME-VISION.md** 🌟

**Pourquoi le lire ?** Vision globale du jeu final

- Niveau perso cap 50 (linéaire)
- Métiers infini (exponentiel)
- Multi-personnages (prestige)
- Donjons (3-5 persos)
- Raids (20-40 persos)
- Timeline complète

### **2. BALANCE-PROFESSIONS-EXPONENTIAL.md** 🌲

**Pourquoi le lire ?** Détails métiers exponentiels

- Formule XP (100 × 1.5^level)
- Tiers infinis (T1 → T7 → T∞)
- Production ville massive (millions/min)
- Coûts multi-tiers (T1 toujours utilisé)
- Synergies ville/métiers

### **3. BALANCE-STAT-CHANGES.md** ⚔️

**Pourquoi le lire ?** Nouveau système stats

- Agilité = Critiques (plus de vitesse)
- HP fusionné avec Endurance
- Sagesse = Mana (système futur)
- Formules combat détaillées
- Code d'exemple

### **4. ROADMAP-V2.md** 📅

**Pourquoi le lire ?** Plan d'implémentation complet

- 9 phases développement
- 54-83 jours estimés (3 mois)
- Tasks détaillées par phase
- Checklist validation
- Priorités/Milestones

---

## 📊 DOCUMENTS SECONDAIRES

### **BALANCE-PLAYER.md** 👤

Progression joueur, classes, talents

- **Mis à jour** : Nouveau système stats (critiques)
- **À garder** : XP tables, classes, talents
- **À mettre à jour** : Intégrer cap niveau 50

### **BALANCE-GRAPHS.md** 📈

Visualisations courbes progression

- Comparaison V1 vs V2
- Graphiques exponentiels
- Timeline déblocages
- Satisfaction joueur

### **BALANCE-CRAFTING.md** 🔨

Recettes craft avec drops monstres

- **À mettre à jour** : Intégrer tiers T6-T7
- **À garder** : Recettes existantes T1-T5
- **À ajouter** : Craft équipement set (donjons/raids)

### **BALANCE-BUILDINGS.md** 🏙️

Bâtiments ville production

- **À mettre à jour** : Production exponentielle (×1.5)
- **À mettre à jour** : Coûts multi-tiers
- **À supprimer** : Cap niveau 10

---

## 🗂️ ORGANISATION FICHIERS

```
e:\IdleV1\
├── 📄 ROADMAP-V2.md              ← 🔥 PLAN IMPLÉMENTATION
├── 📄 README.md
├── 📄 package.json
├── 📄 index.html
│
├── docs/
│   ├── 📄 INDEX.md               ← CE FICHIER
│   │
│   ├── 🌟 VISION V2 (NOUVEAUX)
│   ├── 📄 BALANCE-ENDGAME-VISION.md          ← Vision globale
│   ├── 📄 BALANCE-PROFESSIONS-EXPONENTIAL.md ← Métiers infini
│   ├── 📄 BALANCE-STAT-CHANGES.md            ← Stats critiques
│   ├── 📄 BALANCE-GRAPHS.md                  ← Graphiques
│   │
│   ├── ✅ MIS À JOUR V2
│   ├── 📄 BALANCE-PLAYER.md      ← Stats/Classes/Talents
│   │
│   ├── ⚠️ À METTRE À JOUR
│   ├── 📄 BALANCE-OVERVIEW.md    ← Philosophie générale
│   ├── 📄 BALANCE-CRAFTING.md    ← Recettes craft
│   ├── 📄 BALANCE-BUILDINGS.md   ← Ville production
│   │
│   ├── 📚 DOCUMENTATION SYSTÈME
│   ├── 📄 QUALITY-SYSTEM.md      ← Système qualité équipement
│   ├── 📄 COMBAT-DATA-GUIDE.md   ← Guide fichiers données
│   ├── 📄 INVENTORY-MANAGEMENT.md ← Gestion inventaire
│   ├── 📄 COLOR-PALETTE-RARITY.md ← Palette couleurs
│   │
│   └── 📁 Autres docs...
│
└── src/
    ├── config/
    ├── css/
    └── js/
```

---

## 🎯 GUIDE DE LECTURE PAR RÔLE

### **Product Owner / Game Designer**

1. [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Vision complète
2. [BALANCE-GRAPHS.md](BALANCE-GRAPHS.md) - Visualisation courbes
3. [BALANCE-PLAYER.md](BALANCE-PLAYER.md) - Détails progression
4. [ROADMAP-V2.md](../ROADMAP-V2.md) - Timeline/Milestones

**Objectif** : Comprendre le jeu final et valider vision

---

### **Développeur Frontend**

1. [ROADMAP-V2.md](../ROADMAP-V2.md) - Plan technique
2. [BALANCE-STAT-CHANGES.md](BALANCE-STAT-CHANGES.md) - Code stats/critiques
3. [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - Métiers/Ville
4. [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Features donjons/raids

**Objectif** : Implémenter les 9 phases

---

### **QA / Testeur**

1. [ROADMAP-V2.md](../ROADMAP-V2.md) - Checklist validation
2. [BALANCE-PLAYER.md](BALANCE-PLAYER.md) - Valeurs attendues
3. [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - Formules métiers
4. [BALANCE-GRAPHS.md](BALANCE-GRAPHS.md) - Courbes à valider

**Objectif** : Tester progression et balance

---

### **Community Manager**

1. [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Vision communiquer
2. [BALANCE-GRAPHS.md](BALANCE-GRAPHS.md) - Visuels pour annonces
3. [ROADMAP-V2.md](../ROADMAP-V2.md) - Timeline features

**Objectif** : Communiquer updates et hype features

---

## 📅 TIMELINE DOCUMENTATION

### **9 Octobre 2025** ✅

- Création BALANCE-ENDGAME-VISION.md
- Création BALANCE-PROFESSIONS-EXPONENTIAL.md
- Création BALANCE-STAT-CHANGES.md
- Création ROADMAP-V2.md
- Création BALANCE-GRAPHS.md
- Création INDEX.md (ce fichier)
- **Statut** : Documentation V2 complète

### **À venir** ⏳

- Mise à jour BALANCE-OVERVIEW.md (intégrer V2)
- Mise à jour BALANCE-CRAFTING.md (tiers T6-T7)
- Mise à jour BALANCE-BUILDINGS.md (production exponentielle)
- Archivage BALANCE-PROFESSIONS.md (V1 obsolète)

---

## 🔍 INDEX PAR SUJET

### **Système de Stats**

- [BALANCE-PLAYER.md](BALANCE-PLAYER.md) - Stats de base
- [BALANCE-STAT-CHANGES.md](BALANCE-STAT-CHANGES.md) - Changements V2 (critiques)

### **Progression XP**

- [BALANCE-PLAYER.md](BALANCE-PLAYER.md) - XP personnage (cap 50)
- [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - XP métiers (infini)
- [BALANCE-GRAPHS.md](BALANCE-GRAPHS.md) - Courbes XP

### **Métiers**

- [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - V2 (exponentiel)

### **Ville / Bâtiments**

- [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - Production V2
- [BALANCE-BUILDINGS.md](BALANCE-BUILDINGS.md) - V1 (à mettre à jour)

### **Craft / Équipement**

- [BALANCE-CRAFTING.md](BALANCE-CRAFTING.md) - Recettes
- [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Sets donjons/raids

### **Multi-Personnages / Prestige**

- [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Système complet
- [ROADMAP-V2.md](../ROADMAP-V2.md) - Phase 5 (implémentation)

### **Donjons / Raids**

- [BALANCE-ENDGAME-VISION.md](BALANCE-ENDGAME-VISION.md) - Détails complets
- [ROADMAP-V2.md](../ROADMAP-V2.md) - Phase 6-7 (implémentation)

### **Implémentation Technique**

- [ROADMAP-V2.md](../ROADMAP-V2.md) - Plan complet
- [BALANCE-STAT-CHANGES.md](BALANCE-STAT-CHANGES.md) - Code stats
- [BALANCE-PROFESSIONS-EXPONENTIAL.md](BALANCE-PROFESSIONS-EXPONENTIAL.md) - Code métiers

---

## ✅ CHECKLIST COMPLÉTUDE DOCUMENTATION

### **Phase Documentation** ✅

- [x] Vision globale V2 (BALANCE-ENDGAME-VISION.md)
- [x] Système stats V2 (BALANCE-STAT-CHANGES.md)
- [x] Métiers exponentiels (BALANCE-PROFESSIONS-EXPONENTIAL.md)
- [x] Graphiques progression (BALANCE-GRAPHS.md)
- [x] Plan implémentation (ROADMAP-V2.md)
- [x] Index documentation (INDEX.md - ce fichier)

### **Phase Mise à Jour** ⏳

- [ ] Intégrer V2 dans BALANCE-OVERVIEW.md
- [ ] Mettre à jour BALANCE-CRAFTING.md (tiers T6-T7)
- [ ] Mettre à jour BALANCE-BUILDINGS.md (production exponentielle)
- [x] Nettoyage fichiers obsolètes V1 (11 fichiers supprimés)

### **Phase Implémentation** ⏳

- [ ] Phase 1: Stats critiques (3-5 jours)
- [ ] Phase 2: Métiers exponentiels (5-7 jours)
- [ ] Phase 3: Ville production massive (5-7 jours)
- [ ] Phase 4: Cap niveau 50 (2-3 jours)
- [ ] Phase 5: Multi-personnages (7-10 jours)
- [ ] Phase 6: Donjons (10-14 jours)
- [ ] Phase 7: Raids (14-21 jours)
- [ ] Phase 8: Polish & Balance (7-14 jours)

---

## 🚀 PROCHAINES ÉTAPES

### **Immédiat**

1. **Valider** la vision V2 avec l'équipe
2. **Choisir** la première phase à implémenter
3. **Préparer** environnement de développement

### **Court Terme (Semaine 1-2)**

1. **Implémenter** Phase 1 (Stats critiques)
2. **Créer** formateur grands nombres
3. **Modifier** formule XP métiers

### **Moyen Terme (Mois 1-2)**

1. **Compléter** Phases 1-4 (Core gameplay)
2. **Tester** balance progression
3. **Ajuster** formules si nécessaire

### **Long Terme (Mois 3)**

1. **Implémenter** Phases 5-7 (Endgame)
2. **Polish** complet
3. **Release** V2.0

---

## 📞 CONTACT / SUPPORT

**Questions sur la documentation ?**
→ Vérifiez d'abord l'index par sujet ci-dessus

**Besoin de clarifications ?**
→ Consultez les graphiques (BALANCE-GRAPHS.md)

**Prêt à développer ?**
→ Suivez la roadmap (ROADMAP-V2.md)

---

**Date** : 9 Octobre 2025  
**Version Documentation** : 2.0  
**Statut** : ✅ Complet et prêt
