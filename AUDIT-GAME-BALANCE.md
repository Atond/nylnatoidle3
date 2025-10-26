# 🔍 AUDIT COMPLET - ÉQUILIBRAGE DU JEU

> **Date** : 24 Octobre 2025  
> **Objectif** : Analyser TOUT le jeu pour détecter les incohérences avant de créer les quêtes

---

## 📊 MÉTHODOLOGIE

1. **Analyser** : Lire tous les fichiers de config
2. **Mapper** : Créer des tableaux de référence
3. **Détecter** : Identifier les incohérences
4. **Proposer** : Solutions d'équilibrage

---

## 🪵 RESSOURCES - UNLOCK LEVELS

### **Bois (Wood)**

| Ressource       | Unlock Level | Rareté    | Tier   | Notes                 |
| --------------- | ------------ | --------- | ------ | --------------------- |
| Chêne           | 1            | Common    | T1     | ✅ OK                 |
| Frêne           | 3            | Common    | T1     | ✅ OK                 |
| Érable          | 5            | Uncommon  | **T2** | 🔴 T2 dès niveau 5 !  |
| Bouleau         | 7            | Uncommon  | T2     |                       |
| Noyer           | 10           | Uncommon  | T2     |                       |
| Cèdre           | 12           | Rare      | **T3** | 🔴 T3 dès niveau 12 ! |
| If              | 15           | Rare      | T3     |                       |
| Orme            | 18           | Rare      | T3     |                       |
| Séquoia         | 20           | Epic      | **T4** | 🔴 T4 dès niveau 20 ! |
| Bambou          | 23           | Epic      | T4     |                       |
| Ébène           | 25           | Epic      | T4     |                       |
| Baobab          | 28           | Legendary | **T5** | 🔴 T5 dès niveau 28 ! |
| Saule lunaire   | 30           | Legendary | T5     |                       |
| Bois de Sang    | 35           | Legendary | T5     |                       |
| Bois de Fer     | 40           | Mythic    | **T6** |                       |
| Bois d'Esprit   | 45           | Mythic    | T6     |                       |
| Bois de Cristal | 50           | Mythic    | T6     |                       |
| Bois Ombreux    | 55           | Mythic    | T6     |                       |
| Bois du Phénix  | 60           | Divine    | **T7** |                       |
| Bois Éternel    | 70           | Divine    | T7     |                       |

### **Minerai (Ore)**

| Ressource   | Unlock Level | Rareté    | Tier   | Notes                 |
| ----------- | ------------ | --------- | ------ | --------------------- |
| Fer         | 1            | Common    | T1     | ✅ OK                 |
| Cuivre      | 3            | Common    | T1     | ✅ OK                 |
| Étain       | 5            | Uncommon  | **T2** | 🔴 T2 dès niveau 5 !  |
| Bronze      | 7            | Uncommon  | T2     |                       |
| Argent      | 10           | Uncommon  | T2     |                       |
| Or          | 12           | Rare      | **T3** | 🔴 T3 dès niveau 12 ! |
| Acier       | 15           | Rare      | T3     |                       |
| Mithril     | 18           | Rare      | T3     |                       |
| Obsidienne  | 20           | Epic      | **T4** | 🔴 T4 dès niveau 20 ! |
| Platine     | 23           | Epic      | T4     |                       |
| Cobalt      | 25           | Epic      | T4     |                       |
| Adamantite  | 28           | Legendary | **T5** | 🔴 T5 dès niveau 28 ! |
| Électrum    | 30           | Legendary | T5     |                       |
| Runite      | 35           | Legendary | T5     |                       |
| Orichalque  | 40           | Mythic    | **T6** |                       |
| Cristallium | 45           | Mythic    | T6     |                       |
| Étherium    | 50           | Mythic    | T6     |                       |
| Draconium   | 55           | Mythic    | T6     |                       |
| Ombrium     | 60           | Divine    | **T7** |                       |
| Astralite   | 70           | Divine    | T7     |                       |

### **🌿 Plantes (Plants)**

| Ressource           | Unlock Level | Rareté   | Tier |
| ------------------- | ------------ | -------- | ---- |
| Pissenlit           | 1            | Common   | T1   |
| Herbe médicinale    | 1            | Common   | T1   |
| Ortie               | 2            | Common   | T1   |
| Trèfle              | 3            | Common   | T1   |
| Sauge               | 5            | Uncommon | T2   |
| Lavande             | 7            | Uncommon | T2   |
| Romarin             | 10           | Uncommon | T2   |
| Champignon des bois | 12           | Uncommon | T2   |
| Menthe sauvage      | 15           | Rare     | T3   |
| Mandragore          | 18           | Rare     | T3   |
| Ginseng             | 20           | Rare     | T3   |

---

## 🔨 RECETTES DE CRAFT - REQUIRED LEVELS

### **Forgeron (Blacksmith)**

| Recette      | Profession Level | Required Player Level | Matériaux             | Notes                                              |
| ------------ | ---------------- | --------------------- | --------------------- | -------------------------------------------------- |
| Épée de Fer  | 1                | 1                     | 10 Fer + 5 Chêne      | ✅ OK                                              |
| Épée d'Acier | 5                | 5                     | 15 Cuivre + 8 Bouleau | 🟡 Utilise Bouleau (unlock 7) mais requis niveau 5 |

### **Armurier (Armorsmith)**

| Recette          | Profession Level | Required Player Level | Matériaux             | Notes                          |
| ---------------- | ---------------- | --------------------- | --------------------- | ------------------------------ |
| Tunique de Cuir  | 1                | 1                     | 8 Chêne               | ✅ OK                          |
| Plastron de Fer  | 3                | 3                     | 20 Fer + 5 Chêne      | ✅ OK                          |
| Plastron d'Acier | 7                | 7                     | 15 Cuivre + 8 Bouleau | 🟡 Bouleau unlock 7 = juste OK |

---

## 🔥 INCOHÉRENCES DÉTECTÉES

### **🔴 INCOHÉRENCE #1 : Ressources T2/T3 trop tôt**

**Problème** :

```
Les ressources Tier 2 se débloquent dès niveau 5
Les ressources Tier 3 se débloquent dès niveau 12
Mais la Transmutation (T1→T2) se débloque niveau 30 dans les quêtes !
```

**Impact** :

- Si Transmutation = niveau 30, à quoi sert-elle ?
- Les joueurs ont déjà accès à T2/T3 naturellement bien avant
- La récompense de Q25 perd tout son intérêt

**Solutions possibles** :

#### **Solution A : Retarder les unlock levels**

```
T1 (Common) : Niveau 1-10
T2 (Uncommon) : Niveau 15-25 (au lieu de 5-10)
T3 (Rare) : Niveau 30-40 (au lieu de 12-18)
T4 (Epic) : Niveau 45-55
T5+ (Legendary+) : Niveau 60-70
```

✅ Avantages : Transmutation devient utile  
❌ Inconvénients : Faut tout rebalancer

#### **Solution B : Débloquer Transmutation plus tôt**

```
Transmutation débloquée niveau 12 (au lieu de 30)
Permet de convertir T1→T2 dès qu'on en a besoin
```

✅ Avantages : Minimal change  
❌ Inconvénients : Moins de "milestone" au niveau 30

#### **Solution C : Système hybride**

```
- Ressources T2/T3 disponibles naturellement (drops)
- Transmutation = boost de production (10 T1 → 1 T2 au lieu de farmer)
- Transmutation devient un "raccourci" pas une "source unique"
```

✅ Avantages : Meilleur game design  
✅ Recommandation : **JE RECOMMANDE CETTE SOLUTION**

---

### **🔴 INCOHÉRENCE #2 : Craft utilise ressources non unlock**

**Problème** :

```
Épée d'Acier (niveau 5) utilise Bois de Bouleau
Mais Bois de Bouleau unlock = niveau 7 !
```

**Impact** :

- Le joueur ne peut pas craft la recette niveau 5
- Frustration : "Pourquoi je ne peux pas craft ?"

**Solution** :

```
Ajuster les recettes pour utiliser SEULEMENT des ressources
disponibles au requiredLevel ou avant
```

Exemple fix :

```javascript
// AVANT
{
  id: 'steel_sword',
  requiredLevel: 5,
  materials: [
    { resourceId: 'ore_copper', amount: 15 }, // Unlock 3 ✅
    { resourceId: 'wood_birch', amount: 8 }   // Unlock 7 ❌
  ]
}

// APRÈS
{
  id: 'steel_sword',
  requiredLevel: 5,
  materials: [
    { resourceId: 'ore_copper', amount: 15 }, // Unlock 3 ✅
    { resourceId: 'wood_maple', amount: 8 }   // Unlock 5 ✅
  ]
}
```

---

### **🔴 INCOHÉRENCE #3 : Progression des régions vs ressources**

**Problème** :

```
Région 1 (1-10) : Devrait drop ressources T1 uniquement
Région 2 (11-20) : Devrait drop ressources T2
Région 3 (21-30) : Devrait drop ressources T3
etc.
```

**Mais actuellement** :

- Ressources T2 unlock dès niveau 5 (milieu Région 1 !)
- Ressources T3 unlock niveau 12 (début Région 2)

**Solution** :

```
Aligner unlock levels des ressources avec les régions :

Région 1 (1-10) : T1 (Common)
Région 2 (11-20) : T2 (Uncommon)
Région 3 (21-30) : T3 (Rare)
Région 4 (31-40) : T4 (Epic)
Région 5 (41-50) : T5 (Legendary)
Région 6+ (51-70) : T6-T7 (Mythic/Divine)
```

---

### **🟡 INCOHÉRENCE #4 : Métiers XP non définie**

**Problème** :

```
Pas de progression XP claire pour les métiers
Combien d'XP pour passer niveau 1→2 ?
Combien de clics nécessaires ?
```

**Impact** :

- Impossible de balancer les quêtes
- "Herboriste niveau 5" = combien de temps ?

**Solution** :

```
Définir une formule XP pour les métiers :
- XP par clic : Varie selon la ressource (T1=10 XP, T2=20 XP, etc.)
- XP requis : Exponentiel (100 → 150 → 225 → 337...)
- Exemple : Niveau 1→5 = ~1000 XP = 100 clics de T1
```

---

### **🟡 INCOHÉRENCE #5 : Bâtiments production**

**Problème** :

```
Ferme d'Élevage débloquée niveau 25 (Q23)
Mais produit des tissus Tier 1 (Lin, Laine, Coton)
Au niveau 25, le joueur devrait avoir besoin de Tier 3 !
```

**Impact** :

- La Ferme arrive trop tard pour les tissus T1
- Le Tailleur ne peut pas craft avant niveau 25

**Solution** :

```
Option A : Débloquer Ferme plus tôt (niveau 15 ?)
Option B : La Ferme produit des tissus selon son niveau
  - Niveau 1-3 : Tissus T1
  - Niveau 4-6 : Tissus T2
  - Niveau 7-10 : Tissus T3
```

---

## 📊 TABLEAUX DE RÉFÉRENCE

### **Tiers de Ressources par Niveau**

#### **SYSTÈME ACTUEL (INCOHÉRENT)**

| Niveau | Bois             | Minerai             | Problème        |
| ------ | ---------------- | ------------------- | --------------- |
| 1      | T1 (Chêne)       | T1 (Fer)            | ✅ OK           |
| 5      | **T2** (Érable)  | **T2** (Étain)      | 🔴 T2 trop tôt  |
| 12     | **T3** (Cèdre)   | **T3** (Or)         | 🔴 T3 trop tôt  |
| 20     | **T4** (Séquoia) | **T4** (Obsidienne) | 🔴 T4 trop tôt  |
| 30     | **T5** (Saule)   | **T5** (Électrum)   | Transmutation ? |

#### **SYSTÈME PROPOSÉ (COHÉRENT)**

| Niveau | Région          | Tier   | Ressources Disponibles                |
| ------ | --------------- | ------ | ------------------------------------- |
| 1-10   | Plaines         | **T1** | Common (Chêne, Fer, Plantes basiques) |
| 11-20  | Montagnes       | **T2** | Uncommon (Érable, Étain, Plantes T2)  |
| 21-30  | Forêt           | **T3** | Rare (Cèdre, Or, Plantes rares)       |
| 31-40  | Marais          | **T4** | Epic (Séquoia, Obsidienne)            |
| 41-50  | Terres Désolées | **T5** | Legendary (Saule, Électrum)           |
| 51-60  | ???             | **T6** | Mythic                                |
| 61-70  | ???             | **T7** | Divine                                |

---

## 🎯 RECOMMANDATIONS FINALES

### **Option 1 : ÉQUILIBRAGE LÉGER (Quick Fix)**

**Durée** : 2-3 heures

1. **Ajuster les unlock levels** des ressources pour aligner avec les régions
2. **Fixer les recettes** pour utiliser seulement ressources disponibles
3. **Débloquer Transmutation niveau 15** (au lieu de 30)
4. **Débloquer Ferme niveau 15** (au lieu de 25)

✅ Avantages : Rapide à faire  
❌ Inconvénients : Pas optimal

---

### **Option 2 : ÉQUILIBRAGE COMPLET (Proper Rebalance)**

**Durée** : 1-2 jours

1. **Refaire TOUS les unlock levels** selon le tableau proposé
2. **Réécrire TOUTES les recettes** selon les nouveaux tiers
3. **Ajuster la production des bâtiments** selon les tiers
4. **Créer un système XP métiers** cohérent
5. **Réajuster les quêtes** selon le nouvel équilibrage

✅ Avantages : Jeu cohérent et équilibré  
❌ Inconvénients : Beaucoup de travail

---

### **Option 3 : SYSTÈME HYBRIDE (RECOMMANDÉ)**

**Durée** : 4-6 heures

**Philosophie** :

```
Les ressources T2/T3 existent naturellement (drops en combat)
Mais elles sont RARES (faible drop rate)

La Transmutation permet de les avoir FACILEMENT
→ Devient un "boost de production" pas une "source unique"
```

**Changements** :

1. **Garder les unlock levels actuels** (T2 dès niveau 5)
2. **Mais RÉDUIRE les drop rates** drastiquement
   - T1 : 100% drop rate (farming)
   - T2 : 10% drop rate (rare)
   - T3 : 1% drop rate (très rare)
   - T4+ : 0.1% drop rate (extrêmement rare)
3. **Transmutation (niveau 15)** :
   - Permet de convertir 10 T1 → 1 T2 (100% garanti)
   - Plus efficace que de farmer les drops rares
4. **Bâtiments** :
   - Produisent seulement T1 au début
   - Peuvent être améliorés pour produire T2/T3 aux niveaux supérieurs
5. **Quêtes ajustées** selon ce système

✅ Avantages :

- Meilleur game design
- Transmutation utile
- Pas besoin de tout refaire
- Progression satisfaisante

❌ Inconvénients :

- Un peu plus complexe à expliquer au joueur

---

## ❓ DÉCISION REQUISE

**Quelle option choisissez-vous ?**

### **A. Équilibrage Léger** ⚡

_"Quick fix, on ajuste juste les trucs cassés"_

- Temps : 2-3h
- Impact : Moyen

### **B. Équilibrage Complet** 🔨

_"On refait tout proprement"_

- Temps : 1-2 jours
- Impact : Maximum

### **C. Système Hybride** 🎯 **(RECOMMANDÉ)**

_"On garde l'existant mais on change la philosophie"_

- Temps : 4-6h
- Impact : Élevé
- Game design : Meilleur

---

## 📝 PROCHAINE ÉTAPE

Une fois que vous choisissez une option, je vais :

1. **Implémenter les changements** dans les fichiers de config
2. **Ajuster les quêtes** selon le nouvel équilibrage
3. **Documenter les valeurs finales**
4. **Créer un guide joueur** pour expliquer la progression

**Votre choix ?** A, B ou C ? 😊
