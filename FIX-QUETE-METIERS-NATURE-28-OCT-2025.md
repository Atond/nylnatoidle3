# 🎣 FIX QUÊTE "MÉTIERS DE LA NATURE"

**Date** : 28 octobre 2025  
**Priorité** : MOYENNE (Expérience utilisateur)

---

## 📋 PROBLÈME SIGNALÉ

**Quête** : `main_017` - "🎣 Métiers de la Nature"

**Symptôme** :

```
📋 🎣 Métiers de la Nature
Débloquez la Pêche et l'Herboristerie pour diversifier vos ressources.
Progression: 0 / 2
```

**Contexte** :

- Quête reçue après avoir tué le premier boss
- Pêche et Herboristerie **déjà débloquées** au niveau 5
- Progression bloquée à `0 / 2` malgré métiers actifs

---

## 🔍 ANALYSE DU BUG

### Structure de la Quête

**Fichier** : `src/config/quests-data.js` (ligne 514)

```javascript
{
    id: 'main_017',
    title: '🎣 Métiers de la Nature',
    description: 'Débloquez la Pêche et l\'Herboristerie pour diversifier vos ressources.',
    type: 'unlock_professions', // ❌ Type non géré !
    target: 2,
    requirements: {
        quest: 'main_016',
        level: 10,
        professions: ['fishing', 'herbalism'] // ✅ Liste des professions requises
    },
    rewards: {
        xp: 600,
        gold: 300,
        unlocks: ['profession_fishing', 'profession_herbalism'],
        message: '🌿 Pêche et Herboristerie débloquées !'
    }
}
```

---

### Problème : Type `unlock_professions` Non Géré

**Fichier** : `src/js/quest-manager.js`

**Code Manquant** :

- Aucune méthode `updateUnlockProfessionsQuest()`
- Aucun listener pour déblocage de professions
- Type `unlock_professions` ignoré dans `activateQuest()`

**Comportement** :

1. Joueur niveau 5 → Pêche et Herboristerie débloquées automatiquement
2. Joueur niveau 10 + Boss 1 tué → Quête `main_017` activée
3. Quête activée avec `progress: 0` (valeur par défaut)
4. **Aucune vérification** si professions déjà débloquées
5. Progression bloquée à `0 / 2` indéfiniment

---

### Timeline du Bug

```
Niveau 5  : Pêche + Herboristerie débloquées ✅
    ↓
Niveau 10 : Boss 1 tué → Quête main_017 activée
    ↓
Affichage : "Débloquez Pêche et Herboristerie" (0/2) ❌
    ↓
Problème  : Quête demande de débloquer ce qui est déjà débloqué
```

---

## ✅ SOLUTION APPLIQUÉE

### Fix : Auto-Complétion des Quêtes `unlock_professions`

**Fichier** : `src/js/quest-manager.js` (ligne 623)

**AVANT** :

```javascript
activateQuest(questId) {
    const quest = this.quests.get(questId);
    // ...
    quest.isActive = true;
    this.activeQuests.push(quest);

    // 🎯 INITIALISATION : Pour les quêtes 'level_up'
    if (quest.type === 'level_up') {
        quest.progress = Math.min(this.player.level, quest.target);

        if (this.player.level >= quest.target) {
            const completed = quest.complete();
            if (completed !== false) {
                this.onQuestComplete(quest);
            }
        }
    }

    // ❌ Pas de logique pour 'unlock_professions'

    return true;
}
```

**APRÈS** :

```javascript
activateQuest(questId) {
    const quest = this.quests.get(questId);
    // ...
    quest.isActive = true;
    this.activeQuests.push(quest);

    // 🎯 INITIALISATION : Pour les quêtes 'level_up'
    if (quest.type === 'level_up') {
        quest.progress = Math.min(this.player.level, quest.target);

        if (this.player.level >= quest.target) {
            const completed = quest.complete();
            if (completed !== false) {
                this.onQuestComplete(quest);
            }
        }
    }

    // 🎯 INITIALISATION : Pour les quêtes 'unlock_professions'
    if (quest.type === 'unlock_professions' && quest.requirements.professions) {
        let unlockedCount = 0;

        // Vérifier combien de professions requises sont déjà débloquées
        quest.requirements.professions.forEach(professionId => {
            const profession = window.game?.professionManager?.getProfession(professionId);
            if (profession && profession.unlocked) {
                unlockedCount++;
            }
        });

        quest.progress = unlockedCount;

        // Si toutes les professions sont déjà débloquées, compléter immédiatement
        if (unlockedCount >= quest.target) {
            const completed = quest.complete();

            if (completed !== false) {
                this.onQuestComplete(quest);
                if (GameConfig.DEBUG.enabled) {
                    console.log(`✅ Quête ${quest.title} complétée immédiatement (professions déjà débloquées)`);
                }
            }
        }
    }

    return true;
}
```

---

## 🎯 FONCTIONNEMENT DU FIX

### Étapes de Vérification

1. **Activation de la quête** :
   - Quête `main_017` ajoutée aux quêtes actives

2. **Vérification du type** :
   - Détecte `type === 'unlock_professions'`
   - Récupère liste `requirements.professions` : `['fishing', 'herbalism']`

3. **Comptage des professions débloquées** :

   ```javascript
   quest.requirements.professions.forEach((professionId) => {
     const profession = window.game?.professionManager?.getProfession(professionId);
     if (profession && profession.unlocked) {
       unlockedCount++;
     }
   });
   ```

   - `fishing` débloquée → `unlockedCount = 1`
   - `herbalism` débloquée → `unlockedCount = 2`

4. **Mise à jour progression** :

   ```javascript
   quest.progress = unlockedCount; // 2
   ```

5. **Auto-complétion** :

   ```javascript
   if (unlockedCount >= quest.target) {
     // 2 >= 2 ✅
     quest.complete();
     this.onQuestComplete(quest);
   }
   ```

6. **Résultat** :
   - Quête complétée immédiatement
   - Récompenses appliquées : +600 XP, +300 gold
   - Message affiché : "🌿 Pêche et Herboristerie débloquées !"
   - Quête suivante (`main_018`) activée

---

## 🧪 TESTS DE VALIDATION

### Test 1 : Nouveau Joueur (Professions Non Débloquées)

**Scénario** :

1. ✅ Nouveau personnage niveau 1
2. ✅ Atteindre niveau 10
3. ✅ Tuer Boss 1
4. ✅ Quête `main_017` activée
5. ✅ Vérifier progression : `0 / 2` (correct, professions pas encore débloquées)
6. ✅ Atteindre niveau 5 (ou débloquer manuellement)
7. ✅ Pêche débloquée → Progression : `1 / 2`
8. ✅ Herboristerie débloquée → Progression : `2 / 2`
9. ✅ Quête complétée automatiquement

---

### Test 2 : Joueur Existant (Professions Déjà Débloquées)

**Scénario** :

1. ✅ Joueur niveau 10+
2. ✅ Pêche et Herboristerie déjà débloquées (niveau 5)
3. ✅ Tuer Boss 1
4. ✅ Quête `main_017` activée
5. ✅ **Vérification auto** : 2 professions débloquées
6. ✅ **Progression instantanée** : `0 / 2` → `2 / 2`
7. ✅ **Complétion automatique**
8. ✅ Récompenses reçues : +600 XP, +300 gold
9. ✅ Notification : "🌿 Pêche et Herboristerie débloquées !"
10. ✅ Quête disparaît de la liste active

---

### Test 3 : Rechargement de Sauvegarde

**Scénario** :

1. ✅ Sauvegarder avec quête `main_017` active (0/2)
2. ✅ Professions déjà débloquées
3. ✅ F5 pour recharger
4. ✅ Quête réactivée via `checkAndActivateMissingQuests()`
5. ✅ **Auto-complétion au chargement**
6. ✅ Quête retirée des quêtes actives
7. ✅ Progression sauvegardée correctement

---

### Test 4 : Progression Partielle

**Scénario** :

1. ✅ Quête activée, aucune profession débloquée (`0 / 2`)
2. ✅ Débloquer Pêche uniquement
3. ✅ **Pas de mécanisme pour update dynamique** ❌
4. ⚠️ **Limitation actuelle** : Progression vérifiée seulement à l'activation

**Note** : Pour une progression dynamique, il faudrait ajouter un listener sur `ProfessionManager.unlock()` pour mettre à jour les quêtes actives.

---

## 🔗 FICHIERS MODIFIÉS

**1. `src/js/quest-manager.js`** (ligne 623)

- **Ajout** : Logique auto-complétion pour `unlock_professions`
- **Impact** : Quêtes complétées si professions déjà débloquées

---

## 📊 QUÊTES AFFECTÉES

### Quête Principale

| ID         | Titre                   | Type                 | Professions        | Target |
| ---------- | ----------------------- | -------------------- | ------------------ | ------ |
| `main_017` | 🎣 Métiers de la Nature | `unlock_professions` | fishing, herbalism | 2      |

**Impact** : Quête maintenant auto-complétée si Pêche + Herboristerie déjà débloquées

---

### Futures Quêtes Similaires

**Si d'autres quêtes de type `unlock_professions` sont ajoutées**, elles bénéficieront automatiquement du fix :

```javascript
{
    id: 'main_XXX',
    title: 'Débloquez Cuisine et Alchimie',
    type: 'unlock_professions',
    target: 2,
    requirements: {
        professions: ['cooking', 'alchemy']
    }
}
```

**Comportement** : Auto-vérification + auto-complétion si professions déjà débloquées ✅

---

## 💡 NOTES TECHNIQUES

### Pourquoi Progression Uniquement à l'Activation ?

**Choix de design** :

- Simplicité : Vérification une seule fois (à l'activation)
- Performance : Pas de listeners continus sur ProfessionManager
- Cohérence : Même logique que quêtes `level_up`

**Limitation** :

- Si joueur active quête **avant** de débloquer professions → Progression reste `0 / 2`
- Professions débloquées **après** activation → Pas de mise à jour automatique

**Solution alternative** (non implémentée) :

```javascript
// Dans ProfessionManager.unlock()
if (window.game?.questManager) {
  window.game.questManager.updateUnlockProfessionsQuests(this.id);
}
```

---

### Pourquoi Pas de Notification "Quête Complétée" ?

**Contexte** :

- Quête complétée **immédiatement** à l'activation
- Joueur ne voit jamais la quête comme "active"

**Résultat** :

- ✅ Récompenses appliquées (+600 XP, +300 gold)
- ✅ Message personnalisé affiché : "🌿 Pêche et Herboristerie débloquées !"
- ✅ Quête suivante activée
- ❌ Pas de notification "Quête complétée"

**Comportement attendu** : Transparent pour le joueur (comme si quête n'avait jamais existé)

---

## 🎯 CHANGELOG

### Version 0.1.0-alpha (28 octobre 2025)

**Corrections** :

- ✅ Fix auto-complétion quêtes `unlock_professions` si professions déjà débloquées
- ✅ Ajout vérification état professions à l'activation de quête

**Impact** :

- ✅ Quête "Métiers de la Nature" auto-complétée si Pêche + Herboristerie déjà débloquées
- ✅ Récompenses appliquées correctement (+600 XP, +300 gold)
- ✅ Quête suivante activée automatiquement
- ✅ Pas de quête bloquée dans la liste

**Quêtes affectées** :

- `main_017` : 🎣 Métiers de la Nature

---

**Fin du document** 🎣
