# ⚖️ ANALYSE ÉQUILIBRAGE : Récolte vs Transmutation vs Ville

**Date** : 28 octobre 2025  
**Question** : Les 3 systèmes sont-ils équilibrés ?

---

## 📊 DONNÉES DE BASE

### 🌾 RÉCOLTE MANUELLE/AUTO

- **Intervalle de base** : 5 secondes (3000ms après auto-gather)
- **Bonus recherches** : -30% temps (Récolte Rapide III)
- **Bonus auto-gather** : -25% temps supplémentaire
- **Résultat optimisé** : ~2.6 secondes/clic
- **Production théorique** : ~1380 clics/heure

### 🏛️ BÂTIMENTS VILLE (Scierie/Mine)

- **Production niveau 1** : 10 ressources/minute (600/heure)
- **Multiplicateur par niveau** : ×2.0
- **Production niveau 5** : 160 ressources/minute (9,600/heure)
- **Production niveau 10** : 5,120 ressources/minute (307,200/heure)

### ⚗️ TRANSMUTATION

- **Ratio T1→T2** : 20:1 (nouveau)
- **Ratio T2→T3** : 15:1 (nouveau)
- **Ratio T3→T4** : 10:1 (nouveau)
- **Ratio T4+** : 5:1 (nouveau)
- **Temps de conversion** : 3-12 secondes selon tier

---

## 🎯 SCÉNARIOS COMPARATIFS

### Scénario 1 : Obtenir 100 Bois d'Érable (T2)

#### Option A : Récolte Directe (Bûcheron niveau 10)

- **Ressources débloquées** : 4 (Chêne, Frêne, Érable, Bouleau)
- **Probabilité Érable** : 25% par clic
- **Drop rate Érable** : 80%
- **Succès réel** : 25% × 80% = 20% par clic
- **Clics nécessaires** : 100 / 0.20 = **500 clics**
- **Temps sans bonus** : 500 × 5s = **2,500 secondes (41.7 minutes)**
- **Temps optimisé** : 500 × 2.6s = **1,300 secondes (21.7 minutes)**

**Ressources secondaires obtenues** :

- Chêne : ~100 unités
- Frêne : ~90 unités
- Bouleau : ~15 unités (drop rate 30%)

**Verdict** : ✅ Acceptable pour early game, mais aléatoire

---

#### Option B : Récolte Auto (niveau 10 + recherches)

- **Intervalle optimisé** : 2.6 secondes
- **Production/heure** : 1,380 clics
- **Érable/heure** : 1,380 × 0.20 = **276 Érable**
- **Temps pour 100** : (100 / 276) × 60 min = **21.7 minutes**

**Verdict** : ⚠️ Même vitesse que récolte manuelle, mais **AFK** (gros avantage)

---

#### Option C : Transmutation (T1 → T2)

- **Ressources nécessaires** : 100 Érable = 2,000 Chêne
- **Temps de conversion** : 100 × 3s = **300 secondes (5 minutes)**
- **Temps récolte Chêne** :
  - Récolte directe : 2,000 clics × 5s = 10,000s = **2.78 heures**
  - Récolte auto optimisée : 2,000 / (1,380 × 0.25) = **5.8 heures**

**Temps total** : 5.8h récolte + 5min conversion = **~6 heures**

**Verdict** : ❌ BEAUCOUP plus lent que récolte directe pour T2

---

#### Option D : Ville (Scierie) + Transmutation

- **Scierie niveau 5** : 160 Chêne/minute = 9,600/heure
- **Temps production** : 2,000 Chêne = **12.5 minutes**
- **Temps conversion** : 100 × 3s = **5 minutes**
- **Temps total** : **17.5 minutes (passif)**

**Verdict** : ✅ **OPTIMAL** - Plus rapide ET totalement AFK

---

### Scénario 2 : Obtenir 10 Bois de Séquoia (T4)

#### Option A : Récolte Directe (Bûcheron niveau 35)

- **Ressources débloquées** : 14 ressources
- **Probabilité Séquoia** : 7.14% par clic
- **Drop rate Séquoia** : 25%
- **Succès réel** : 7.14% × 25% = **1.79% par clic**
- **Clics nécessaires** : 10 / 0.0179 = **560 clics**
- **Temps optimisé** : 560 × 2.6s = **1,456 secondes (24.3 minutes)**

**Verdict** : ⚠️ Très aléatoire, beaucoup de ressources non désirées

---

#### Option B : Transmutation (T1 → T2 → T3 → T4)

- **Chaîne complète** :
  - 10 Séquoia = 100 Noyer (ratio 10:1)
  - 100 Noyer = 1,500 Érable (ratio 15:1)
  - 1,500 Érable = 30,000 Chêne (ratio 20:1)

- **Temps conversions** :
  - T1→T2 : 1,500 × 3s = 4,500s (75 min)
  - T2→T3 : 100 × 6s = 600s (10 min)
  - T3→T4 : 10 × 12s = 120s (2 min)
  - **Total conversions** : 87 minutes

- **Temps récolte 30,000 Chêne** :
  - Scierie niveau 10 : 307,200/heure → **5.9 minutes**

**Temps total** : 5.9 min + 87 min = **~93 minutes (1h33)**

**Verdict** : ✅ Plus prévisible que récolte directe

---

#### Option C : Ville niveau 10 + Transmutation

- **Production Scierie niv 10** : 5,120 Chêne/min
- **Temps production 30,000 Chêne** : **5.9 minutes**
- **Temps conversions** : **87 minutes**
- **Temps total** : **~93 minutes (100% AFK)**

**Verdict** : ✅✅ **OPTIMAL LATE GAME**

---

## 🔍 ANALYSE CRITIQUE

### ❌ PROBLÈME IDENTIFIÉ : Récolte Directe T2+ Non Compétitive

**Pourquoi ?**

1. **Drop rates trop faibles** :
   - T2 : 30-70% → Acceptable mais aléatoire
   - T3 : 10-50% → Très frustrant
   - T4+ : 5-25% → Quasi inutilisable

2. **Dilution probabiliste** :
   - Bûcheron niveau 20 : 11 ressources débloquées
   - Probabilité ressource précise : 9.1%
   - Avec drop rate 50% : **4.5% succès réel**
   - **22 clics en moyenne** pour 1 ressource T3

3. **Transmutation plus efficace** :
   - Route Ville → Transmutation = **6-10× plus rapide** pour T3+
   - Route totalement AFK
   - Quantités garanties (pas d'aléatoire)

---

## 💡 SOLUTIONS POSSIBLES

### Option 1 : ✅ Garder l'état actuel (RECOMMANDÉ)

**Justification** :

- Récolte directe = **Early game** (T1-T2)
- Transmutation = **Mid/Late game** (T3+)
- Ville = **Endgame** (production massive)

**Progression naturelle** :

1. Niveau 1-10 : Récolte manuelle (drop rates élevés)
2. Niveau 10-20 : Auto-récolte + début transmutation
3. Niveau 20-40 : Ville + transmutation (route principale)
4. Niveau 40+ : Ville haute niveau + transmutation optimisée

**Avantages** :

- ✅ Encourage la progression des systèmes
- ✅ Reward l'investissement (construire bâtiments)
- ✅ Différenciation claire des systèmes
- ✅ Route AFK viable (important pour idle game)

**Inconvénients** :

- ⚠️ Récolte directe devient obsolète après niveau 20
- ⚠️ Frustration si joueur ne comprend pas la transmutation

---

### Option 2 : Augmenter les Drop Rates T2+

**Modifications** :

- T2 : 30-70% → **50-90%**
- T3 : 10-50% → **30-70%**
- T4 : 5-25% → **20-50%**

**Avantages** :

- ✅ Récolte directe viable jusqu'au niveau 30-40
- ✅ Moins de frustration sur ressources rares

**Inconvénients** :

- ❌ Transmutation devient moins utile (why bother?)
- ❌ Ville moins attractive
- ❌ Perd l'intérêt de progression des systèmes
- ❌ Trop facile = moins de challenge

**Verdict** : ❌ **NON RECOMMANDÉ** - Casse l'équilibre global

---

### Option 3 : Système de Ciblage Manuel

**Concept** : Joueur peut choisir quelle ressource récolter

**Avantages** :

- ✅ Contrôle total du joueur
- ✅ Pas de frustration sur aléatoire

**Inconvénients** :

- ❌ Complexité UI (sélecteur de ressource)
- ❌ Retire l'aspect "découverte"
- ❌ Demande développement supplémentaire
- ❌ Transmutation encore plus inutile

**Verdict** : ⚠️ Possible mais demande refonte UI

---

### Option 4 : Bonus "Focus" par Niveau Métier

**Concept** : Plus le niveau métier est élevé, plus la probabilité des ressources hautes augmente

**Exemple** :

- Niveau 10 : Distribution égale (20% chacune)
- Niveau 20 : Bonus +50% sur T3 (30% vs 15% pour T1)
- Niveau 30 : Bonus +100% sur T4 (40% vs 10% pour T1)

**Avantages** :

- ✅ Récolte directe reste viable
- ✅ Reward progression métier
- ✅ Garde l'aléatoire mais guidé

**Inconvénients** :

- ⚠️ Complexité formule
- ⚠️ Peut déséquilibrer la transmutation

**Verdict** : 🤔 Intéressant mais risqué

---

## 📈 COMPARAISON CHIFFRÉE : 3 SYSTÈMES

### Production de Bois d'Érable (T2) sur 1 heure

| Méthode              | Niveau requis          | Quantité/heure | AFK ? | Coût initial |
| -------------------- | ---------------------- | -------------- | ----- | ------------ |
| **Récolte manuelle** | Métier 10              | ~276           | ❌    | 0 gold       |
| **Auto-récolte**     | Métier 10 + Recherche  | ~276           | ✅    | 3,000 gold   |
| **Transmutation**    | Joueur 20 + Métier 10  | ~120           | Semi  | 0 gold       |
| **Scierie niv 5**    | Métier 5 + 2,000 gold  | ~480           | ✅    | 2,000 gold   |
| **Scierie niv 10**   | Métier 5 + 50,000 gold | ~15,360        | ✅    | 50,000 gold  |

**Analyse** :

- ✅ **Scierie niveau 5** = **1.74× plus rapide** que récolte
- ✅ **Scierie niveau 10** = **55× plus rapide** que récolte
- ⚠️ Transmutation **2.3× plus lente** que récolte (pour T2)
- ✅ Mais transmutation devient **dominante** pour T3+

---

### Production de Bois de Séquoia (T4) sur 1 heure

| Méthode                        | Quantité/heure | Temps pour 100 unités | AFK ? |
| ------------------------------ | -------------- | --------------------- | ----- |
| **Récolte directe**            | ~25            | 4 heures              | ❌    |
| **Auto-récolte**               | ~25            | 4 heures              | ✅    |
| **Transmutation** (Scierie 10) | ~65            | 1.5 heures            | ✅    |

**Analyse** :

- ✅ Transmutation **2.6× plus rapide** que récolte pour T4
- ✅ Gap augmente avec les tiers : T5 = **5×**, T6 = **10×**
- ✅ Confirme : Transmutation = route optimale pour endgame

---

## 🎮 ÉQUILIBRAGE FINAL RECOMMANDÉ

### ✅ GARDER L'ÉTAT ACTUEL avec Ajustements Mineurs

#### 1. Communication au Joueur

**Problème** : Joueur ne comprend pas pourquoi récolte T4 est si lente

**Solution** : Tooltips explicites

```
"🌲 Bois de Séquoia (T4)"
Drop rate : 25% (RARE)
⚠️ Recommandation : Utilisez la Transmutation pour obtenir cette ressource efficacement
Ratio : 10 Noyer (T3) → 1 Séquoia (T4)
```

---

#### 2. Buff Léger des Drop Rates T3

**Modification** :

- T3 première ressource : 10% → **20%**
- T3 ressources suivantes : +10% sur toutes

**Exemple** :

- Avant : Bois d'Orme (10% drop)
- Après : Bois d'Orme (20% drop)

**Impact** :

- Récolte T3 devient **2× plus efficace**
- Reste inférieure à transmutation (bon équilibre)
- Permet exploration early T3 avant déblocage transmutation niveau 20

---

#### 3. Recherche "Transmutation Rapide"

**Nouvelle recherche Tier 3** :

```javascript
{
    id: 'fast_transmutation',
    name: 'Transmutation Rapide',
    description: 'Temps de transmutation -50%',
    cost: { gold: 15000, gems_ruby: 10 },
    effect: { transmutationSpeed: 0.5 },
    tier: 3
}
```

**Impact** :

- T1→T2 : 3s → **1.5s**
- T2→T3 : 6s → **3s**
- T3→T4 : 12s → **6s**

**Résultat** : Chaîne complète T1→T4 passe de 87min à **43.5 minutes**

---

## 📊 ÉQUILIBRAGE FINAL : TABLEAU RÉCAPITULATIF

### Niveau 1-20 (Early Game)

| Système           | Efficacité | Utilisation | Notes                       |
| ----------------- | ---------- | ----------- | --------------------------- |
| **Récolte**       | ⭐⭐⭐⭐⭐ | Principale  | Drop rates élevés (80-100%) |
| **Ville**         | ⭐⭐⭐     | Complément  | Scierie niv 1-5 aide        |
| **Transmutation** | ❌         | Bloquée     | Débloquée niveau 20         |

### Niveau 20-40 (Mid Game)

| Système           | Efficacité | Utilisation    | Notes                         |
| ----------------- | ---------- | -------------- | ----------------------------- |
| **Récolte**       | ⭐⭐⭐     | Complément     | Variété, petites quantités    |
| **Ville**         | ⭐⭐⭐⭐   | Importante     | Scierie niv 5-7 = 600-2,400/h |
| **Transmutation** | ⭐⭐⭐⭐⭐ | **Principale** | Route optimale T3+            |

### Niveau 40+ (Late Game)

| Système           | Efficacité | Utilisation    | Notes                           |
| ----------------- | ---------- | -------------- | ------------------------------- |
| **Récolte**       | ⭐⭐       | Occasionnelle  | Drop rates 5-15% (inutilisable) |
| **Ville**         | ⭐⭐⭐⭐⭐ | **Carburant**  | Scierie niv 10 = 307,200/h      |
| **Transmutation** | ⭐⭐⭐⭐⭐ | **Principale** | Seule route viable T5-T7        |

---

## 🎯 CONCLUSION

### ✅ L'ÉQUILIBRAGE ACTUEL EST BON avec 2 ajustements :

1. **Buff léger T3 drop rates** : 10-50% → 20-60%
   - Impact : Exploration T3 plus agréable avant transmutation
   - Garde la dominance transmutation pour T3+

2. **Recherche Transmutation Rapide (-50% temps)**
   - Impact : Endgame plus fluide
   - Reward progression recherches

### 🎮 Philosophie de Design Validée

```
📈 PROGRESSION NATURELLE

Niveau 1-10   : Récolte manuelle (clics actifs)
Niveau 10-20  : Auto-récolte + Ville (mix actif/passif)
Niveau 20-40  : Transmutation + Ville (optimisation)
Niveau 40+    : Ville max + Transmutation (AFK total)
```

### ⚖️ Équilibre des 3 Systèmes

- **Récolte** : Découverte, variété, early game
- **Transmutation** : Ciblage, efficacité, mid/late game
- **Ville** : Production massive, AFK, carburant transmutation

**Tous les systèmes ont leur place !** 🎯✨

---

## 🛠️ MODIFICATIONS RECOMMANDÉES

### 1. Ajuster Drop Rates T3 (resources-data.js)

```javascript
// T3 - Région 3 (21-30)
{ id: 'wood_elm', name: 'Bois d\'Orme', unlockLevel: 20, rarity: 'rare', dropRate: 0.2 }, // 10% → 20%
{ id: 'wood_sequoia', name: 'Bois de Séquoia', unlockLevel: 22, rarity: 'epic', dropRate: 0.6 }, // 50% → 60%
{ id: 'wood_bamboo', name: 'Bois de Bambou', unlockLevel: 25, rarity: 'epic', dropRate: 0.5 }, // 40% → 50%
{ id: 'wood_ebony', name: 'Bois d\'Ébène', unlockLevel: 28, rarity: 'epic', dropRate: 0.4 }, // 30% → 40%
```

### 2. Ajouter Recherche Transmutation (research-data.js)

```javascript
{
    id: 'fast_transmutation',
    name: 'Alchimie Accélérée',
    description: 'Temps de transmutation -50%',
    icon: '⚗️',
    cost: { gold: 15000, gems_ruby: 10 },
    effect: { transmutationSpeed: 0.5 },
    tier: 3,
    requires: ['alchemy_boost']
}
```

**Estimation impact** :

- T3 devient **1.5× plus farmable** (acceptable)
- Transmutation **2× plus rapide** en late game
- Ville reste dominante (307,200/h >> 800/h récolte)

**Verdict final** : ✅ **Équilibrage solide avec ajustements mineurs !**
