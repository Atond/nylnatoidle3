# ⚖️ ÉQUILIBRAGE : Récolte Aléatoire + Transmutation Améliorée

**Date** : 28 octobre 2025  
**Objectif** : Équilibrer les 3 systèmes d'acquisition de ressources

---

## 📊 DÉCISION : Option A - Récolte Aléatoire + Transmutation Équilibrée

### 🎯 Philosophie du Design

Le jeu propose **3 systèmes complémentaires** pour obtenir des ressources :

1. **🌾 RÉCOLTE (Métiers de récolte)**
   - Variété mais quantités limitées
   - Accès à toutes les ressources débloquées selon le niveau
   - Sélection aléatoire à chaque clic
   - Idéal pour : Petites quantités variées, exploration

2. **⚗️ TRANSMUTATION**
   - Conversion efficace T1 → T2 → T3...
   - Ratios optimisés pour compenser la récolte aléatoire
   - Idéal pour : Grandes quantités ciblées, optimisation

3. **🏛️ VILLE (Bâtiments)**
   - Production massive de ressources T1
   - Production passive automatique
   - Idéal pour : Alimenter la transmutation en masse

---

## 🔄 MODIFICATIONS EFFECTUÉES

### 1️⃣ RÉCOLTE ALÉATOIRE (profession.js)

**AVANT** : Bloqué sur la première ressource

```javascript
if (!this.targetResource) {
  this.targetResource = resources[0].id; // ❌ Toujours la même
}
```

**APRÈS** : Sélection aléatoire parmi toutes les ressources débloquées

```javascript
const resources = this.getAvailableResources();
const randomIndex = Math.floor(Math.random() * resources.length);
const resource = resources[randomIndex]; // ✅ Variété
```

**Impact** :

- Herboriste niveau 10 : Peut obtenir Feuille de Pissenlit, Herbe médicinale, Ortie, Trèfle, Sauge
- Bûcheron niveau 20 : Peut obtenir Chêne, Érable, Noyer, Séquoia
- Mineur niveau 15 : Peut obtenir Fer, Cuivre, Étain, Bronze

---

### 2️⃣ TRANSMUTATION AMÉLIORÉE (transmutation-data.js)

#### 📉 Nouveaux Ratios (vs Ancien 100:1 constant)

| Conversion  | Ancien Ratio | Nouveau Ratio | Amélioration           |
| ----------- | ------------ | ------------- | ---------------------- |
| **T1 → T2** | 100:1        | **20:1**      | **5× plus efficace**   |
| **T2 → T3** | 100:1        | **15:1**      | **6.7× plus efficace** |
| **T3 → T4** | 100:1        | **10:1**      | **10× plus efficace**  |
| **T4 → T5** | 100:1        | **5:1**       | **20× plus efficace**  |
| **T5 → T6** | 100:1        | **5:1**       | **20× plus efficace**  |
| **T6 → T7** | 100:1        | **5:1**       | **20× plus efficace**  |

#### ⚡ Temps de Conversion Réduits

| Conversion  | Ancien Temps | Nouveau Temps | Amélioration      |
| ----------- | ------------ | ------------- | ----------------- |
| **T1 → T2** | 5 sec        | **3 sec**     | 40% plus rapide   |
| **T2 → T3** | 10 sec       | **6 sec**     | 40% plus rapide   |
| **T3 → T4** | 20 sec       | **12 sec**    | 40% plus rapide   |
| **T4 → T5** | 40 sec       | **25 sec**    | 37.5% plus rapide |
| **T5 → T6** | 80 sec       | **50 sec**    | 37.5% plus rapide |
| **T6 → T7** | 160 sec      | **100 sec**   | 37.5% plus rapide |

---

## 🎮 GAMEPLAY ATTENDU

### 🌱 Early Game (Niveau 1-20)

**Récolte** :

- Clics manuels → Ressources aléatoires (T1-T2)
- Quantités limitées mais variées
- Permet d'explorer différentes ressources

**Transmutation** :

- Non débloquée avant niveau 20
- Les joueurs récoltent manuellement

**Ville** :

- Scierie, Mine, Ferme → Production passive T1
- Alimente les futures transmutations

---

### 🏗️ Mid Game (Niveau 20-40)

**Récolte** :

- Auto-récolte activée
- Accès à ressources T1-T4 selon niveau métier
- Utile pour obtenir rapidement des petites quantités

**Transmutation** (DÉBLOQUÉE niveau 20) :

- **Stratégie principale pour T2+**
- Exemple : 20 Chêne (T1) → 1 Érable (T2) en 3 secondes
- Permet de cibler précisément les ressources nécessaires au craft

**Ville** :

- Production massive de T1 pour alimenter transmutations
- Exemple : Scierie produit 100 Chêne/heure → 5 Érable via transmutation

**Boucle de gameplay optimale** :

1. Ville produit massivement du T1 (Chêne, Fer, etc.)
2. Transmutation convertit T1 → T2 → T3 (ciblé, efficace)
3. Récolte complète occasionnellement (variété, exploration)

---

### 🚀 Late Game (Niveau 40+)

**Récolte** :

- Accès à toutes les ressources T1-T7
- Utile pour découverte et petites quantités

**Transmutation** :

- **Système principal pour ressources haute tier**
- Ratios très efficaces (5:1 pour T4+)
- Exemple : 5 Argent (T5) → 1 Or (T6) en 50 secondes
- Avec bonus niveau : conversion ×10 ou ×50 plus rapide

**Ville** :

- Production passive massive de T1
- Alimente en continu la chaîne de transmutation

**Boucle endgame** :

1. Ville produit 1000+ T1/heure
2. Transmutation T1→T2→T3→T4→T5→T6→T7 (chaîne complète)
3. Recherches améliorent vitesse/efficacité transmutation
4. Récolte occasionnelle pour ressources spécifiques

---

## 📈 COMPARAISON : Récolte vs Transmutation

### Exemple Concret : Obtenir 10 Bois d'Érable (T2)

#### Via Récolte Aléatoire :

- **Niveau métier requis** : 10 (débloque Érable)
- **Probabilité** : ~20% par clic (1 ressource sur 5 débloquées)
- **Clics nécessaires** : ~50 clics en moyenne
- **Temps** : Variable selon vitesse de récolte
- **Avantage** : Obtient aussi autres ressources (Pissenlit, Herbe, Ortie, Trèfle)
- **Inconvénient** : Non ciblé, incertain

#### Via Transmutation :

- **Ressources nécessaires** : 200 Chêne (T1)
- **Temps de conversion** : 10 × 3 sec = **30 secondes**
- **Niveau transmu requis** : 1
- **Avantage** : Précis, prévisible, rapide
- **Inconvénient** : Nécessite stock de T1

#### Via Ville + Transmutation :

- **Scierie produit** : 100 Chêne/heure (passif)
- **En 2 heures** : 200 Chêne → 10 Érable (via transmutation)
- **Avantage** : Totalement passif, aucun clic
- **Inconvénient** : Nécessite bâtiment construit

---

## ⚖️ ÉQUILIBRAGE FINAL

### ✅ Récolte Aléatoire Justifiée

**Pourquoi garder la récolte aléatoire ?**

1. **Exploration** : Découverte naturelle de nouvelles ressources
2. **Variété** : Évite la monotonie de farmer 1 seule ressource
3. **Early game** : Pas d'accès à transmutation avant niveau 20
4. **Craft rapide** : Besoin de 3 Herbe médicinale ? Récolte 10-15 fois
5. **Complémentarité** : Ne remplace pas la transmutation (ciblée)

### ✅ Transmutation Renforcée

**Pourquoi améliorer les ratios ?**

1. **Compétitivité** : Doit rester attractive vs récolte directe
2. **Spécialisation** : Transmutation = route optimale pour grosses quantités
3. **Progression** : Bonnes raisons de monter niveau transmutation
4. **Endgame** : T4+ nécessitent transmutation (récolte trop aléatoire)

### ✅ Ville Indispensable

**Pourquoi produire T1 en masse ?**

1. **Carburant transmutation** : Nourrit la chaîne de conversion
2. **Production passive** : AFK progression
3. **Économie** : 100 T1 en ville + transmutation > 100 clics récolte

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Récolte Aléatoire

1. ✅ Herboriste niveau 10 : Cliquer 20 fois
2. ✅ Vérifier obtention de 3-5 ressources différentes
3. ✅ Vérifier aucun blocage sur Pissenlit uniquement

### Test 2 : Transmutation T1→T2

1. Farmer 20 Chêne (T1)
2. Onglet Transmutation : Lancer Chêne → Érable
3. ✅ Vérifier temps : 3 secondes
4. ✅ Vérifier obtention : 1 Érable (T2)

### Test 3 : Transmutation T2→T3

1. Farmer 15 Érable (T2)
2. Lancer Érable → Noyer
3. ✅ Vérifier temps : 6 secondes
4. ✅ Vérifier obtention : 1 Noyer (T3)

### Test 4 : Boucle Complète Ville → Transmutation

1. Construire Scierie (produit Chêne T1)
2. Attendre 30 minutes → ~50 Chêne
3. Transmuter 40 Chêne → 2 Érable
4. ✅ Vérifier chaîne de production passive

---

## 📝 FICHIERS MODIFIÉS

### 1. `src/js/profession.js`

- Méthode `click()` : Sélection aléatoire au lieu de `resources[0]`
- Ligne 74-87

### 2. `src/config/transmutation-data.js`

- TOUS les ratios : 100:1 → (20:1, 15:1, 10:1, 5:1)
- TOUS les temps : Réduits de 30-40%
- Ligne 10-177

---

## 🎯 CONCLUSION

### Design Final : 3 Systèmes Complémentaires

```
🌾 RÉCOLTE
├─ Variété (aléatoire)
├─ Quantités limitées
└─ Early/Mid game

⚗️ TRANSMUTATION
├─ Ciblée (précise)
├─ Efficace (ratios optimisés)
└─ Mid/Late game

🏛️ VILLE
├─ Massive (production passive)
├─ T1 uniquement
└─ All game (carburant transmutation)
```

### Boucle de Gameplay Optimale

1. **Niveau 1-20** : Récolte manuelle → Ville (T1 passif)
2. **Niveau 20-40** : Ville (T1) → Transmutation (T2-T4)
3. **Niveau 40+** : Ville (T1) → Transmutation (T5-T7) → Craft équipement légendaire

### Choix du Joueur Respecté

- Farmer manuellement ? ✅ Récolte aléatoire variée
- Optimiser production ? ✅ Ville + Transmutation
- Cibler ressource précise ? ✅ Transmutation
- AFK progression ? ✅ Ville passive

**Tous les styles de jeu sont viables !** 🎮

---

## 📊 MÉTRIQUES D'ÉQUILIBRAGE

### Coût d'Opportunité (pour obtenir 1 ressource T3)

| Méthode                          | Ressources Nécessaires | Temps Actif | Temps Passif | Efficacité           |
| -------------------------------- | ---------------------- | ----------- | ------------ | -------------------- |
| **Récolte directe**              | ~50 clics (aléatoire)  | 2-5 min     | -            | ⭐⭐ (incertain)     |
| **Ville → T1 → Transmu T2 → T3** | 300 T1 (passif)        | 30 sec      | 3 heures     | ⭐⭐⭐⭐⭐ (optimal) |
| **Récolte T1 → Transmu T2 → T3** | 300 T1 (clics)         | 10 min      | -            | ⭐⭐⭐ (actif)       |

**Verdict** : Transmutation + Ville = route optimale pour endgame 🏆
