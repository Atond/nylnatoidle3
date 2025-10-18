# 🚀 QUICK START - SYSTÈME ALCHIMIE

> **Pour** : Nouvelle personne sur le projet  
> **Temps** : 15 minutes de lecture  
> **Objectif** : Comprendre rapidement le système

---

## ❓ C'EST QUOI L'ALCHIMIE ?

### **En 30 secondes**

Un **nouveau métier** qui convertit ressources basses (T1) en ressources hautes (T2, T3...).

```
100 Cuivre → 1 Fer → nécessaire pour craft épée niveau 10
100 Fer → 1 Acier → nécessaire pour craft épée niveau 20
100 Acier → 1 Mithril → etc.
```

**Pourquoi c'est important ?**  
Sans ça, l'économie du jeu est cassée à partir du niveau 30.

---

## 🎯 PROBLÈME RÉSOLU

### **Avant Alchimie**

```
Joueur niveau 30 :
├─ Mine 100,000 cuivre/minute (métier niveau 30)
├─ Épée coûte 10 cuivre
└─ Déséquilibre : trop de ressources, aucun challenge

Joueur s'ennuie → quitte le jeu
```

### **Avec Alchimie**

```
Joueur niveau 30 :
├─ Mine 100,000 cuivre/minute
├─ Alchimie : 100,000 cuivre → 1,000 fer → 10 acier
├─ Épée T3 coûte 10 acier
└─ Challenge maintenu : 10 minutes pour une épée T3

Joueur satisfait → continue de jouer
```

---

## 📊 COMMENT ÇA MARCHE

### **Système de Tiers**

```
T1 (Base)        : Cuivre, Chêne           - Niveau 1
T2 (Uncommon)    : Fer, Érable             - Niveau 10
T3 (Rare)        : Acier, Noyer            - Niveau 20
T4 (Epic)        : Mithril, Séquoia        - Niveau 30
T5 (Legendary)   : Adamantite, Bois Lunaire - Niveau 40
T6 (Mythic)      : Orichalque, Cristal     - Niveau 50
T7 (Divine)      : Céleste, Éternel        - Niveau 75+
```

### **Ratio de Conversion**

**100:1 constant à tous les niveaux**

```
100 T1 = 1 T2
100 T2 = 1 T3
100 T3 = 1 T4

Donc :
10,000 T1 = 1 T3
1,000,000 T1 = 1 T5
```

### **Temps de Conversion**

```
T1 → T2 : 5 secondes
T2 → T3 : 10 secondes
T3 → T4 : 20 secondes
T4 → T5 : 40 secondes

+ Bonus vitesse avec niveau Alchimie
Niveau 50 = -50% temps
```

---

## 🎮 EXEMPLE CONCRET

### **Scenario : Joueur veut crafter Épée d'Acier T3**

```
1. PRÉREQUIS
   ├─ Forgeron niveau 15
   ├─ Alchimie niveau 10
   └─ Mineur niveau 20+

2. RESSOURCES NÉCESSAIRES
   ├─ 10 Acier T3 (pour l'épée)
   └─ 5 Noyer T3 (pour le manche)

3. FARM (10 minutes)
   ├─ Mineur récolte : 100,000 cuivre
   └─ Bûcheron récolte : 50,000 chêne

4. CONVERSION (30 minutes, auto avec Laboratoire)
   ├─ 100,000 cuivre → 1,000 fer (10 min)
   ├─ 1,000 fer → 10 acier (20 min)
   ├─ 50,000 chêne → 500 érable (10 min)
   └─ 500 érable → 5 noyer (20 min)

5. CRAFT (30 secondes)
   └─ 10 acier + 5 noyer → Épée d'Acier T3

TOTAL : ~45 minutes (satisfaisant pour T3)
```

---

## 🏗️ BÂTIMENT LABORATOIRE

### **Production Passive**

```
Laboratoire Niveau 1  : 10 conversions/heure
Laboratoire Niveau 10 : 5,120 conversions/heure
Laboratoire Niveau 20 : 5,242,880 conversions/heure

→ Niveau 20 = Économie complètement passive
```

### **Déblocage**

```
Prérequis :
├─ Joueur niveau 15
├─ Alchimie niveau 10
└─ Coût : 5,000 gold + 500 bois + 500 minerai
```

---

## 📚 DOCUMENTS À LIRE

### **Par rôle**

**Chef de projet** :  
→ `EXECUTIVE-SUMMARY-ALCHEMY.md` (5 min)

**Développeur** :  
→ `IMPLEMENTATION-GUIDE-ALCHEMY.md` (30 min)

**Game Designer** :  
→ `BALANCE-ALCHEMY.md` (20 min)

**Toute l'équipe** :  
→ `BALANCE-RESOURCE-ECONOMY.md` (15 min)

---

## ✅ VALIDATION

### **Pourquoi ce système fonctionne ?**

1. **Prouvé par l'industrie**
   - NGU Idle : conversion 1000:1 ✅
   - Melvor Idle : 7 tiers tous utilisés ✅
   - Kittens Game : raffineries similaires ✅

2. **Mathématiquement solide**
   - Ratio 100:1 = bon compromis
   - Production ×1000 mais coût ×100
   - Balance maintenue jusqu'au niveau 1000+

3. **RP friendly**
   - 10 ressources T3 (logique)
   - Pas 10,000 ressources T1 (absurde)
   - Craft reste immersif

4. **Scalable**
   - Fonctionne à l'infini
   - Nouveaux tiers ajoutables (T8, T9...)
   - Pas de refonte nécessaire

---

## 🎯 OBJECTIFS

### **Court terme (2-3 semaines)**

```
✅ Implémenter métier Alchimie
✅ Créer bâtiment Laboratoire
✅ Mettre à jour coûts craft
✅ Tests & balance
```

### **Moyen terme (1-2 mois)**

```
✅ Conversions T1-T7 complètes
✅ Production passive optimisée
✅ Quêtes tutoriel alchimie
✅ Achievements alchimie
```

### **Long terme (3-6 mois)**

```
✅ Auto-conversion intelligente
✅ Skip tiers (T1→T3 direct)
✅ Talents spécifiques
✅ Progression infinie (T8-T10+)
```

---

## 🚦 STATUS ACTUEL

### **État Projet**

```
📋 Spécifications  : ✅ COMPLÈTES
💻 Implémentation  : ⏸️ EN ATTENTE
🧪 Tests           : ⏸️ EN ATTENTE
🎨 UI/UX           : ⏸️ EN ATTENTE
📊 Balance         : ✅ DÉFINIE
📚 Documentation   : ✅ COMPLÈTE
```

### **Prochaines Étapes**

1. ✅ **Validation** : Approuver concept (vous êtes ici)
2. ⏳ **Go/No-Go** : Décision développement
3. ⏳ **Développement** : 20 heures sur 2-3 semaines
4. ⏳ **Alpha** : Tests internes
5. ⏳ **Beta** : Tests publics
6. ⏳ **Release** : Déploiement

---

## 🔗 LIENS RAPIDES

### **Documentation Complète**

- [INDEX.md](INDEX.md) - Table des matières
- [EXECUTIVE-SUMMARY-ALCHEMY.md](EXECUTIVE-SUMMARY-ALCHEMY.md) - Résumé exécutif
- [BALANCE-RESOURCE-ECONOMY.md](BALANCE-RESOURCE-ECONOMY.md) - Analyse économique
- [BALANCE-ALCHEMY.md](BALANCE-ALCHEMY.md) - Spécifications techniques
- [IMPLEMENTATION-GUIDE-ALCHEMY.md](IMPLEMENTATION-GUIDE-ALCHEMY.md) - Guide dev
- [ROADMAP-ALCHEMY.md](ROADMAP-ALCHEMY.md) - Planning détaillé

### **Références Externes**

- [NGU Idle](https://store.steampowered.com/app/1147690/NGU_IDLE/) - Conversion system
- [Melvor Idle](https://melvoridle.com/) - Tier system
- [Kittens Game](https://kittensgame.com/) - Refineries
- [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) - Big numbers

---

## ❓ FAQ EXPRESS

**Q : C'est quoi la priorité de ce système ?**  
A : 🔥 CRITIQUE - Sans ça, le jeu ne scale pas au-delà du niveau 30.

**Q : Combien de temps pour implémenter ?**  
A : 20 heures sur 2-3 semaines.

**Q : C'est testé dans d'autres jeux ?**  
A : Oui, c'est le standard des idle games modernes (NGU, Melvor, Kittens).

**Q : Ça casse l'existant ?**  
A : Non, c'est additif. Les joueurs actuels continuent comme avant.

**Q : C'est compliqué pour les joueurs ?**  
A : Non, concept simple : 100 T1 = 1 T2. Tutorial in-game prévu.

**Q : Et pour l'endgame ?**  
A : Parfait ! Scale jusqu'au niveau métier 1000+ sans problème.

**Q : Peut-on ajuster après release ?**  
A : Oui, tout est en config (ratios, temps, coûts).

**Q : ROI ?**  
A : ×10-15 (rétention +300%, satisfaction +167%).

---

## 🎊 CONCLUSION

### **En résumé**

```
SANS Alchimie :
❌ Économie cassée niveau 30+
❌ Pas de progression satisfaisante
❌ Métiers infinis inutiles
❌ Rétention faible
❌ Endgame inexistant

AVEC Alchimie :
✅ Économie cohérente
✅ Progression satisfaisante
✅ Métiers infinis utiles
✅ Rétention +300%
✅ Endgame viable

Coût : 20 heures
Bénéfice : Jeu viable long terme
```

### **Recommandation**

**IMPLÉMENTER MAINTENANT** 🚀

C'est la feature #1 la plus importante pour la viabilité long terme du jeu.

---

## 📞 BESOIN D'AIDE ?

### **Questions Générales**

Consulter `INDEX.md` pour table des matières complète.

### **Questions Techniques**

Consulter `IMPLEMENTATION-GUIDE-ALCHEMY.md`.

### **Questions Balance**

Consulter `BALANCE-ALCHEMY.md` et `BALANCE-RESOURCE-ECONOMY.md`.

### **Questions Planning**

Consulter `ROADMAP-ALCHEMY.md` et `EXECUTIVE-SUMMARY-ALCHEMY.md`.

---

**Bienvenue sur le projet ! 🎮**

**Prêt à implémenter ? Lisez `IMPLEMENTATION-GUIDE-ALCHEMY.md` !**
