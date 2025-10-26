# 🐛 Corrections des 6 Bugs (27 Octobre 2025)

## ✅ Bug 1 : Troll des Collines trop fort (CONSEIL UNIQUEMENT)

**Réponse au joueur :**

Le **Troll des Collines** est un monstre **ELITE** qui apparaît dans les zones niveau 4-6. Ses statistiques sont :

- **150 HP** (3× plus de PV qu'un monstre normal)
- **20 attaque** (très forte)
- **10 défense**
- **Vitesse : 4000ms** (attaque toutes les 4 secondes)

**Ce que vous devez faire :**

1. **Évitez-le pour l'instant** - Changez de zone pour combattre des monstres communs/rares
2. **Revenez plus tard** avec :
   - Niveau 7-8 minimum
   - Équipement Tier 2 (Acier/Étain) au minimum
   - Une arme qui fait au moins 15-20 dégâts
   - Une armure complète (casque, plastron, jambières, bottes, gants)
   - Un bouclier pour augmenter votre défense

Le Troll est **intentionnellement difficile** pour encourager la progression d'équipement et de niveau. C'est normal de ne pas pouvoir le vaincre immédiatement.

---

## ✅ Bug 2 : Monstres gardent leurs PV en changeant de zone

### 📁 Fichier : `src/js/combat.js` (méthode `restoreOrSpawnMonster()`)

**Problème :** Quand on changeait de zone puis revenait, le monstre était restauré avec ses **PV actuels**. Cela permettait de fuir un combat difficile et de revenir plus tard sans que le monstre soit soigné.

**Solution :** Restaurer le monstre avec ses **PV au maximum**.

**Code modifié :**

```javascript
restoreOrSpawnMonster() {
    const zoneKey = `${this.currentRegion}_${this.currentZone}`;
    const savedMonster = this.monstersByZone[zoneKey];

    if (savedMonster && savedMonster.isAlive) {
        // Restaurer le monstre existant AVEC PV AU MAXIMUM (pas d'exploit)
        savedMonster.currentHp = savedMonster.maxHp; // 🛡️ Réinitialiser les PV
        this.currentMonster = savedMonster;
        this.addLog(`🔄 ${this.currentMonster.getName()} vous attend toujours... (PV restaurés)`);
    } else {
        // Spawner un nouveau monstre
        this.spawnMonster();
    }
}
```

**Impact :**

- ✅ Impossible de fuir et revenir pour exploiter le système
- ✅ Le monstre reste le même (pas de re-roll) mais avec ses PV pleins
- ✅ Combat équitable et cohérent

---

## ✅ Bug 3 : Recettes ne s'affichent pas immédiatement après level-up

### 📁 Fichier : `src/js/ui.js` (méthode `updateCraftRecipes()`)

**Problème :** Une optimisation empêchait de recréer le HTML des recettes si la profession n'avait pas changé. Quand on montait de niveau, les nouvelles recettes débloquées n'apparaissaient pas immédiatement.

**Solution :** Ajouter un paramètre `forceRefresh` pour forcer le rafraîchissement lors d'un level-up.

**Code modifié :**

```javascript
updateCraftRecipes(forceRefresh = false) {
    const recipesList = document.getElementById('craftRecipesList');
    if (!recipesList) return;

    const selectedProfession = document.querySelector('.craft-profession-card.selected');
    const professionId = selectedProfession ? selectedProfession.dataset.profession : 'blacksmith';

    // 🛡️ OPTIMISATION: Ne rafraîchir que si la profession a changé
    // SAUF si forceRefresh=true (pour level-up de profession)
    if (!forceRefresh && this.lastCraftProfession === professionId && recipesList.children.length > 0) {
        this.updateCraftRecipesQuantities();
        return;
    }

    // ... reste du code ...
}
```

### 📁 Fichier : `src/js/profession.js` (méthode `levelUp()`)

**Code modifié :**

```javascript
levelUp() {
    const xpNeeded = this.getXpForNextLevel();
    this.xp -= xpNeeded;
    this.level++;

    if (window.game && window.game.ui) {
        window.game.ui.showNotification(
            `⭐ ${this.name} niveau ${this.level} !`,
            'success'
        );

        // 🛡️ FORCE REFRESH pour afficher les nouvelles recettes immédiatement
        window.game.ui.updateCraftRecipes(true);
        window.game.ui.updateCraftingTab();
    }
}
```

**Impact :**

- ✅ Les recettes débloquées s'affichent immédiatement après un level-up
- ✅ Pas besoin de changer d'onglet et revenir
- ✅ Optimisation préservée pour les autres cas

---

## ✅ Bug 4 : Joueur bloqué sur quête niveau 5

### 📁 Fichier : `src/js/quest-manager.js` (méthode `fromJSON()`)

**Problème :** Même avec la correction précédente dans `activateQuest()`, les joueurs qui avaient déjà une sauvegarde avec la quête M08 active mais bloquée à 0/5 restaient bloqués.

**Solution :** Ajouter une vérification au **chargement de la sauvegarde** pour valider toutes les quêtes level_up déjà remplies.

**Code ajouté (après le chargement des quêtes) :**

```javascript
// 🎯 VÉRIFICATION POST-CHARGEMENT : Valider les quêtes level_up déjà remplies
this.activeQuests.forEach((quest) => {
  if (quest.type === "level_up" && !quest.isCompleted && this.player.level >= quest.target) {
    quest.progress = quest.target;
    const completed = quest.complete();

    if (completed !== false) {
      this.onQuestComplete(quest);
      if (GameConfig.DEBUG.enabled) {
        console.log(`✅ Quête ${quest.title} auto-validée au chargement (niveau déjà atteint)`);
      }
    }
  }
});
```

**Impact :**

- ✅ Au chargement de la sauvegarde, toutes les quêtes level_up bloquées se valident automatiquement
- ✅ Résout le problème pour les joueurs existants
- ✅ Fonctionne en combinaison avec la correction de `activateQuest()`

---

## ✅ Bug 5 : Bouclier n'apparaît pas dans l'équipement

### 📁 Fichier : `src/config/craft-recipes-extended.js`

**Problème :** Les recettes de boucliers utilisaient `slot: 'shield'` mais le HTML de l'onglet Équipement cherchait `data-slot="offhand"`. Mismatch entre les deux noms de slot.

**Solution :** Changer tous les boucliers pour utiliser `slot: 'offhand'`.

**Code modifié (3 boucliers) :**

#### Bouclier de Bois

```javascript
{
    id: 'wooden_shield',
    name: 'Bouclier de Bois',
    type: 'shield',
    slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
    icon: '🛡️',
    // ...
}
```

#### Bouclier de Fer

```javascript
{
    id: 'iron_shield',
    name: 'Bouclier de Fer',
    type: 'shield',
    slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
    icon: '🛡️',
    // ...
}
```

#### Bouclier-Tour

```javascript
{
    id: 'tower_shield',
    name: 'Bouclier-Tour',
    type: 'shield',
    slot: 'offhand', // 🛡️ FIX: Utiliser 'offhand' comme dans le HTML
    icon: '🛡️',
    // ...
}
```

**Impact :**

- ✅ Les boucliers apparaissent maintenant correctement dans le slot "Bouclier" (offhand)
- ✅ Les statistiques du bouclier s'appliquent au joueur
- ✅ Possibilité d'équiper/déséquiper normalement

---

## ✅ Bug 6 : Objet saute au hover + barre jaune confuse

### 📁 Fichier : `src/css/main.css`

**Problème 1 :** L'effet `transform: translateX(-5px)` au hover faisait que l'objet se déplaçait de 5px vers la gauche, ce qui pouvait faire sortir la souris de l'élément, donc l'effet disparaissait, puis revenait = saut permanent.

**Problème 2 :** La classe `.locked-item` appliquait une bordure **jaune** (`#FFD700`) qui ressemble à une rareté légendaire/œuvre, créant de la confusion.

**Solutions :**

#### 1. Retirer le transform au hover

```css
.equipment-item-card:hover {
  border-color: var(--color-success);
  box-shadow: var(--shadow-md);
  /* 🛡️ FIX: Retirer le transform qui cause le saut permanent au hover */
}
```

#### 2. Changer la bordure jaune en gris

```css
.equipment-item-card.locked-item {
  /* 🛡️ FIX: Changer la bordure jaune (#FFD700) en gris pour éviter confusion avec rareté légendaire */
  background: rgba(150, 150, 150, 0.05);
  border-left: 4px solid #888 !important;
}

.equipment-item-card.locked-item::before {
  content: "🔒";
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.2rem;
  opacity: 0.5; /* 🛡️ FIX: Augmenter opacité pour mieux voir le cadenas */
}
```

**Impact :**

- ✅ Plus de saut au hover de la souris
- ✅ Bordure grise (#888) indique clairement le lock (pas de confusion avec rareté)
- ✅ Cadenas plus visible (opacité 0.5 au lieu de 0.3)
- ✅ UX plus fluide et compréhensible

---

## 📊 Récapitulatif des Modifications

| #   | Bug                       | Fichier(s) Modifié(s)       | Type               |
| --- | ------------------------- | --------------------------- | ------------------ |
| 1   | Troll trop fort           | -                           | Conseil uniquement |
| 2   | Monstres gardent PV       | `combat.js`                 | Fix exploit        |
| 3   | Recettes pas affichées    | `ui.js`, `profession.js`    | Fix UX             |
| 4   | Quête niveau 5 bloquée    | `quest-manager.js`          | Fix progression    |
| 5   | Bouclier invisible        | `craft-recipes-extended.js` | Fix slot mismatch  |
| 6   | Objet saute + barre jaune | `main.css`                  | Fix UX + clarté    |

---

## 🧪 Tests à Effectuer

### Test Bug 2 : Monstres PV restaurés

1. Combattre un monstre et lui retirer des PV
2. Changer de zone
3. Revenir sur la zone précédente
4. Vérifier que le monstre a ses **PV au maximum** ✅

### Test Bug 3 : Recettes affichées immédiatement

1. Avoir un métier de craft niveau 1
2. Récolter pour gagner de l'XP et monter niveau 2
3. Vérifier que les recettes niveau 2 **s'affichent immédiatement** ✅

### Test Bug 4 : Quête niveau 5 auto-validée

1. Charger une sauvegarde où le joueur est niveau 5+ avec quête M08 active
2. Vérifier que M08 se **complète automatiquement** au chargement ✅
3. Vérifier les récompenses : +300 XP, +100 or, unlock Transmutation ⚗️

### Test Bug 5 : Bouclier visible

1. Crafter un Bouclier de Bois/Fer/Tour
2. L'équiper
3. Vérifier qu'il **apparaît dans le slot Bouclier** (offhand) ✅
4. Vérifier que les **stats s'appliquent** (défense, endurance, etc.) ✅

### Test Bug 6 : Pas de saut + bordure grise

1. Aller dans l'inventaire d'équipement
2. Passer la souris sur un objet
3. Vérifier qu'il ne **saute plus** ✅
4. Verrouiller un objet (lock)
5. Vérifier que la bordure est **grise** (#888) et non jaune ✅

---

## ✅ Statut Final

**Toutes les corrections sont terminées et testables !**

- ✅ **Bug 2 corrigé** : Monstres PV restaurés
- ✅ **Bug 3 corrigé** : Recettes affichées immédiatement
- ✅ **Bug 4 corrigé** : Quête niveau 5 auto-validée
- ✅ **Bug 5 corrigé** : Boucliers visibles
- ✅ **Bug 6 corrigé** : Pas de saut + bordure claire

Le jeu est maintenant plus équilibré et sans exploits majeurs !
