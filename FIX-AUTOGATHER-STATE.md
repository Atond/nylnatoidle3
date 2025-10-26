# 🔧 Correction Bug: autoGatherState undefined

## 🐛 Problème

Erreur au chargement de la page :

```
TypeError: Cannot read properties of undefined (reading 'unlocked')
at ui.js:1100:23
```

## 🔍 Cause

Deux problèmes combinés :

1. **Anciennes sauvegardes** : Les sauvegardes créées avant l'ajout de `herbalist` et `fisher` ne contiennent pas ces professions dans `autoGatherState`
2. **Pas de vérification** : Le code dans `ui.js` accédait directement à `state.unlocked` sans vérifier si `state` existe

## ✅ Corrections Appliquées

### 1. Protection dans `ui.js` (ligne 1075)

```javascript
updateAutoGatherButtons() {
    ['woodcutter', 'miner', 'herbalist', 'fisher'].forEach(profId => {
        const btn = document.getElementById(`btn-auto-${profId}`);
        if (!btn) return;

        const state = this.game.professionManager.autoGatherState[profId];
        if (!state) return; // 🛡️ PROTECTION: Si state n'existe pas, on skip

        // ... reste du code
    });
}
```

**Effet** : Si `state` est `undefined`, la boucle passe simplement à la profession suivante au lieu de planter.

---

### 2. Fusion des états dans `profession-manager.js` (ligne 397)

```javascript
fromJSON(data) {
    // ... chargement professions et inventory ...

    if (data.autoGatherState) {
        // 🛡️ PROTECTION: Fusionner avec l'état par défaut pour les nouvelles professions
        // Cela garantit que herbalist et fisher existent même dans les anciennes sauvegardes
        this.autoGatherState = {
            woodcutter: data.autoGatherState.woodcutter || { enabled: false, unlocked: false },
            miner: data.autoGatherState.miner || { enabled: false, unlocked: false },
            herbalist: data.autoGatherState.herbalist || { enabled: false, unlocked: false },
            fisher: data.autoGatherState.fisher || { enabled: false, unlocked: false }
        };

        // Redémarrer les auto-récoltes actives
        for (const [profId, state] of Object.entries(this.autoGatherState)) {
            if (state.enabled) {
                this.startAutoGather(profId);
            }
        }
    }
}
```

**Effet** : Lors du chargement d'une sauvegarde :

- Si `herbalist` ou `fisher` n'existent pas dans la sauvegarde, ils sont créés avec `{ enabled: false, unlocked: false }`
- Les anciennes sauvegardes fonctionnent maintenant avec les nouvelles professions

---

## 🎯 Résultat

✅ **Nouvelle partie** : `autoGatherState` contient dès le départ `woodcutter`, `miner`, `herbalist`, `fisher`

✅ **Ancienne sauvegarde** : Les professions manquantes sont automatiquement ajoutées lors du chargement

✅ **Aucun crash** : Le code vérifie toujours si `state` existe avant d'accéder à ses propriétés

---

## 🧪 Test

1. **Effacer le localStorage** (pour simuler une nouvelle partie) :

   ```javascript
   // Dans la console du navigateur
   localStorage.clear();
   location.reload();
   ```

2. **Charger une ancienne sauvegarde** (si vous en avez une)

3. **Vérifier** :
   - ✅ Aucune erreur dans la console
   - ✅ Les boutons Herboriste/Pêcheur fonctionnent
   - ✅ Les barres d'XP augmentent
   - ✅ Les ressources apparaissent dans l'inventaire

---

**Date** : 24 octobre 2025
**Fichiers modifiés** :

- `src/js/ui.js` (ligne 1075)
- `src/js/profession-manager.js` (ligne 397)
