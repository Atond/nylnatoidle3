# 🎣 REFONTE QUÊTE "MÉTIERS DE LA NATURE"

**Date** : 28 octobre 2025  
**Priorité** : MOYENNE (Amélioration gameplay)

---

## 📋 PROBLÈME INITIAL

**Quête Ancienne** : "Débloquez la Pêche et l'Herboristerie"

**Symptômes** :

- ❌ Pêche et Herboristerie débloquées automatiquement au niveau 5
- ❌ Quête demande de débloquer ce qui est déjà débloqué
- ❌ Objectif impossible/inutile
- ❌ Mauvaise expérience joueur

---

## ✅ NOUVELLE CONCEPTION

### Objectif Transformé

**Avant** : Débloquer 2 professions (trop facile, déjà fait)  
**Après** : Atteindre **niveau 10** dans 2 professions (challenge progressif)

---

### Nouvelle Quête

**Fichier** : `src/config/quests-data.js` (ligne 514)

```javascript
{
    id: 'main_017',
    title: '🎣 Maître des Métiers de la Nature',
    description: 'Atteignez le niveau 10 en Pêche ET en Herboristerie pour maîtriser ces métiers.',
    type: 'profession_level', // ✅ Nouveau type
    target: 2, // 2 professions à niveau 10
    requirements: {
        quest: 'main_016',
        level: 10,
        professions: ['fishing', 'herbalism'],
        professionLevel: 10 // ✅ Niveau requis
    },
    chapter: 3,
    difficulty: 'medium', // ✅ Plus difficile qu'avant
    isMainQuest: true,

    rewards: {
        xp: 1200,   // ✅ Doublé (600 → 1200)
        gold: 600,  // ✅ Doublé (300 → 600)
        unlocks: [],
        message: '🌿 Vous maîtrisez maintenant la Pêche et l\'Herboristerie ! Les ressources rares vous attendent.'
    }
}
```

**Changements** :
| Propriété | Avant | Après | Impact |
|-----------|-------|-------|--------|
| `title` | Métiers de la Nature | **Maître** des Métiers de la Nature | Plus épique |
| `description` | Débloquez... | Atteignez le **niveau 10**... | Objectif clair |
| `type` | `unlock_professions` | **`profession_level`** | Nouveau système |
| `professionLevel` | N/A | **10** | Niveau requis |
| `difficulty` | easy | **medium** | Challenge réel |
| `rewards.xp` | 600 | **1200** | Récompense doublée |
| `rewards.gold` | 300 | **600** | Récompense doublée |
| `rewards.unlocks` | [fishing, herbalism] | **[]** | Déjà débloqués |

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### 1. Nouveau Type de Quête : `profession_level`

**Fichier** : `src/js/quest-manager.js` (ligne 668)

**Logique d'initialisation** :

```javascript
// À l'activation de la quête
if (quest.type === "profession_level" && quest.requirements.professions) {
  let professionsAtLevel = 0;

  // Compter combien de professions ont déjà le niveau requis
  quest.requirements.professions.forEach((professionId) => {
    const profession = window.game?.professionManager?.getProfession(professionId);
    if (profession && profession.level >= quest.requirements.professionLevel) {
      professionsAtLevel++;
    }
  });

  quest.progress = professionsAtLevel;

  // Auto-complétion si déjà au niveau requis
  if (professionsAtLevel >= quest.target) {
    quest.complete();
    this.onQuestComplete(quest);
  }
}
```

**Cas d'usage** :

- Joueur niveau 15, Pêche niv. 12, Herboristerie niv. 8
- Quête activée → `progress: 1 / 2` (Pêche ≥ 10 ✅, Herboristerie < 10 ❌)

---

### 2. Mise à Jour Dynamique de la Progression

**Fichier** : `src/js/quest-manager.js` (ligne 300)

**Nouvelle méthode** :

```javascript
updateProfessionLevelQuest(professionId, newLevel) {
    this.activeQuests.forEach(quest => {
        if (quest.type === 'profession_level' && !quest.isCompleted) {
            // Vérifier si cette profession est concernée
            if (quest.requirements.professions.includes(professionId)) {
                // Vérifier si le niveau requis est atteint
                if (newLevel >= quest.requirements.professionLevel) {
                    // Recompter toutes les professions
                    let professionsAtLevel = 0;

                    quest.requirements.professions.forEach(profId => {
                        const profession = window.game?.professionManager?.getProfession(profId);
                        if (profession && profession.level >= quest.requirements.professionLevel) {
                            professionsAtLevel++;
                        }
                    });

                    quest.progress = professionsAtLevel;

                    // Complétion si toutes au niveau requis
                    if (professionsAtLevel >= quest.target) {
                        quest.complete();
                        this.onQuestComplete(quest);
                    }
                }
            }
        }
    });
}
```

**Déclenchement** : Appelée quand une profession gagne un niveau

---

### 3. Intégration dans Profession.levelUp()

**Fichier** : `src/js/profession.js` (ligne 63)

**Ajout** :

```javascript
levelUp() {
    const xpNeeded = this.getXpForNextLevel();
    this.xp -= xpNeeded;
    this.level++;

    // Notification
    if (window.game && window.game.ui) {
        window.game.ui.showNotification(
            `⭐ ${this.name} niveau ${this.level} !`,
            'success'
        );
    }

    // 🎯 Mettre à jour les quêtes de type 'profession_level'
    if (window.game && window.game.questManager) {
        window.game.questManager.updateProfessionLevelQuest(this.id, this.level);
    }
}
```

**Impact** : Chaque level up de profession vérifie et met à jour les quêtes actives

---

## 🎮 SCÉNARIOS DE GAMEPLAY

### Scénario 1 : Joueur Débutant

**Timeline** :

```
Niveau 10 : Tue Boss 1 → Quête activée (0 / 2)
    ↓
Pêche → Gain XP → Niveau 10 Pêche ✅ (1 / 2)
    ↓
Herboristerie → Gain XP → Niveau 10 Herboristerie ✅ (2 / 2)
    ↓
Quête complétée ! +1200 XP, +600 gold
```

**Durée estimée** : 30-60 minutes de jeu actif

---

### Scénario 2 : Joueur Avancé (1 Profession au Niveau)

**État initial** :

- Pêche niveau 15 ✅
- Herboristerie niveau 7 ❌

**Progression** :

```
Quête activée → Vérification auto → progress: 1 / 2
    ↓
Herboriste niveau 8 → Notification : "⭐ Herboristerie niveau 8 !"
Quête mise à jour → Toujours 1 / 2
    ↓
Herboriste niveau 9 → Toujours 1 / 2
    ↓
Herboriste niveau 10 → "⭐ Herboristerie niveau 10 !"
Quête vérifiée → 2 professions ≥ 10 → COMPLÉTÉE ✅
    ↓
Récompenses : +1200 XP, +600 gold
Message : "🌿 Vous maîtrisez maintenant la Pêche et l'Herboristerie !"
```

---

### Scénario 3 : Joueur Expert (2 Professions Déjà au Niveau)

**État initial** :

- Pêche niveau 20 ✅
- Herboristerie niveau 15 ✅

**Comportement** :

```
Quête activée → Vérification auto
    ↓
Pêche ≥ 10 ? OUI (20 ≥ 10) ✅
Herboristerie ≥ 10 ? OUI (15 ≥ 10) ✅
    ↓
progress: 2 / 2 → AUTO-COMPLÉTION IMMÉDIATE
    ↓
Récompenses appliquées : +1200 XP, +600 gold
Message affiché : "🌿 Vous maîtrisez maintenant..."
Quête disparaît (déjà complétée)
```

**Note** : Comme pour les quêtes `level_up`, pas de notification "Quête complétée" (transparent)

---

## 🧪 TESTS DE VALIDATION

### Test 1 : Progression Normale

**Prérequis** :

- Nouveau personnage
- Pêche niveau 1
- Herboristerie niveau 1

**Étapes** :

1. ✅ Atteindre niveau 10
2. ✅ Tuer Boss 1
3. ✅ Vérifier quête activée : "🎣 Maître des Métiers de la Nature (0 / 2)"
4. ✅ Pêcher jusqu'à niveau 10 Pêche
5. ✅ Vérifier notification : "⭐ Pêche niveau 10 !"
6. ✅ Vérifier progression quête : `1 / 2`
7. ✅ Herboriser jusqu'à niveau 10 Herboristerie
8. ✅ Vérifier notification : "⭐ Herboristerie niveau 10 !"
9. ✅ Vérifier quête complétée automatiquement
10. ✅ Vérifier récompenses : +1200 XP, +600 gold
11. ✅ Vérifier message : "🌿 Vous maîtrisez maintenant..."

---

### Test 2 : Une Profession Déjà au Niveau

**Prérequis** :

- Pêche niveau 12
- Herboristerie niveau 5

**Étapes** :

1. ✅ Tuer Boss 1 → Quête activée
2. ✅ Vérifier progression : `1 / 2` (Pêche déjà ✅)
3. ✅ Herboriser jusqu'à niveau 10
4. ✅ Vérifier auto-complétion à niveau 10
5. ✅ Récompenses reçues

---

### Test 3 : Deux Professions Déjà au Niveau

**Prérequis** :

- Pêche niveau 15
- Herboristerie niveau 20

**Étapes** :

1. ✅ Tuer Boss 1 → Quête activée
2. ✅ Vérifier auto-complétion immédiate
3. ✅ Vérifier progression jamais visible (`0 / 2` → complétée)
4. ✅ Récompenses appliquées
5. ✅ Quête suivante activée

---

### Test 4 : Rechargement avec Progression Partielle

**Étapes** :

1. ✅ Quête active : `1 / 2` (Pêche ✅, Herboristerie ❌)
2. ✅ Sauvegarder
3. ✅ F5 recharger
4. ✅ Vérifier quête toujours active : `1 / 2`
5. ✅ Level up Herboristerie → 10
6. ✅ Vérifier complétion fonctionne

---

### Test 5 : Interface de Quête

**Vérifications** :

1. ✅ Titre affiché : "🎣 Maître des Métiers de la Nature"
2. ✅ Description : "Atteignez le niveau 10 en Pêche ET en Herboristerie..."
3. ✅ Progression : `X / 2` (avec barre visuelle)
4. ✅ Mise à jour temps réel quand profession level up
5. ✅ Disparition après complétion

---

## 📊 COMPARAISON ANCIENNE VS NOUVELLE

### Ancienne Quête

| Aspect           | Valeur                             |
| ---------------- | ---------------------------------- |
| **Titre**        | Métiers de la Nature               |
| **Objectif**     | Débloquer Pêche + Herboristerie    |
| **Difficulté**   | Triviale (auto-débloqué niveau 5)  |
| **Temps requis** | 0 secondes (déjà fait)             |
| **Récompenses**  | 600 XP, 300 gold                   |
| **Expérience**   | ❌ Frustrante (impossible/inutile) |

---

### Nouvelle Quête

| Aspect           | Valeur                              |
| ---------------- | ----------------------------------- |
| **Titre**        | **Maître** des Métiers de la Nature |
| **Objectif**     | Niveau 10 Pêche + Herboristerie     |
| **Difficulté**   | Moyenne (30-60 min)                 |
| **Temps requis** | 30-60 minutes gameplay actif        |
| **Récompenses**  | **1200 XP, 600 gold** (doublé)      |
| **Expérience**   | ✅ Gratifiante (challenge réel)     |

---

## 🎯 AVANTAGES DE LA REFONTE

### Pour le Joueur

1. **Objectif Clair** : "Niveau 10" au lieu de "Débloquer"
2. **Challenge Réel** : Nécessite investissement temps
3. **Progression Visible** : `0/2 → 1/2 → 2/2`
4. **Récompenses Adaptées** : Doublées pour compenser difficulté
5. **Cohérence** : Métiers déjà débloqués, quête fait sens

---

### Pour le Système

1. **Nouveau Type Réutilisable** : `profession_level` pour futures quêtes
2. **Auto-Complétion** : Si déjà au niveau (comme `level_up`)
3. **Mise à Jour Dynamique** : Progression temps réel
4. **Flexibilité** : Facile d'ajouter quêtes similaires

**Exemples futures quêtes** :

```javascript
// Niveau 20 en 3 professions
{
    type: 'profession_level',
    target: 3,
    requirements: {
        professions: ['blacksmith', 'armorsmith', 'jeweler'],
        professionLevel: 20
    }
}

// Niveau 50 en 1 profession (endgame)
{
    type: 'profession_level',
    target: 1,
    requirements: {
        professions: ['fishing'],
        professionLevel: 50
    }
}
```

---

## 🔗 FICHIERS MODIFIÉS

**1. `src/config/quests-data.js`** (ligne 514)

- **Modification** : Quête `main_017` transformée
- **Type** : `unlock_professions` → `profession_level`
- **Récompenses** : XP/gold doublés

**2. `src/js/quest-manager.js`** (ligne 668)

- **Ajout** : Logique initialisation `profession_level`
- **Ajout** : Méthode `updateProfessionLevelQuest()` (ligne 300)

**3. `src/js/profession.js`** (ligne 63)

- **Ajout** : Appel `questManager.updateProfessionLevelQuest()` dans `levelUp()`

---

## 💡 NOTES DE DESIGN

### Pourquoi Niveau 10 ?

**Trop facile** : Niveau 5 = quelques minutes  
**Équilibré** : **Niveau 10** = 30-60 minutes actives  
**Trop dur** : Niveau 20 = plusieurs heures

**Niveau 10 = Sweet spot** pour quête mid-game (après Boss 1)

---

### Pourquoi 2 Professions ?

**Challenge progressif** :

- 1 profession = trop facile (focus unique)
- **2 professions** = nécessite alterner activités
- 3+ professions = trop long pour quête principale

---

### Pourquoi Récompenses Doublées ?

**Ancienne quête** : 0 effort → 600 XP, 300 gold  
**Nouvelle quête** : 30-60 min → **1200 XP, 600 gold**

**Ratio effort/récompense** maintenu cohérent

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Refonte** :

- ✅ Quête `main_017` : "Débloquer" → "Niveau 10"
- ✅ Nouveau type de quête : `profession_level`
- ✅ Système auto-complétion si professions déjà au niveau
- ✅ Mise à jour progression temps réel
- ✅ Récompenses doublées (1200 XP, 600 gold)

**Impact** :

- ✅ Quête maintenant gratifiante et cohérente
- ✅ Challenge réel au lieu d'objectif impossible
- ✅ Système réutilisable pour futures quêtes profession

**Quêtes affectées** :

- `main_017` : 🎣 Maître des Métiers de la Nature

---

**Fin du document** 🎣
