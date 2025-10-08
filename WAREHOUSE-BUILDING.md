# Ajout du Bâtiment Entrepôt + Repositionnement Roue

## ✅ Modifications Effectuées

### 1. 🎯 Repositionnement de la Roue Crantée

**Fichier**: `src/css/enhancements.css`

**Avant** :

- Position: `top: 70px; left: 50%` (centré horizontalement)
- Taille: `2rem`

**Après** :

- Position: `top: 85px; left: 32px` (en bas à gauche de l'icône)
- Taille: `1.5rem` (plus petite)
- Opacité: `0.4` (plus visible)

**Résultat** : La roue ⚙️ est maintenant positionnée **en dessous de l'icône du bâtiment, à gauche**.

---

### 2. 🏚️ Nouveau Bâtiment : Entrepôt

**Fichier**: `src/config/buildings-data.js`

#### Caractéristiques

```javascript
warehouse: {
    id: 'warehouse',
    name: 'Entrepôt',
    icon: '🏚️',
    description: 'Augmente la capacité de stockage de toutes les ressources',
    baseProduction: {}, // Pas de production
    baseCost: {
        gold: 500,
        wood_oak: 200,
        ore_iron: 100
    },
    costMultiplier: 2.5,  // Coût augmente fortement
    storageBonus: 500,  // +500 de stockage par niveau
}
```

#### Fonctionnement

- **Coût de base** : 500 or + 200 Bois de Chêne + 100 Fer
- **Coût par niveau** : Multiplicateur de 2.5 (coût augmente rapidement)
- **Bonus** : +500 de stockage **pour TOUTES les ressources** par niveau
- **Pas de prérequis** de profession
- **Pas de production** : C'est un bâtiment utilitaire

#### Exemple de Progression

- Niveau 1 : Limite passe de 1000 → 1500 pour toutes les ressources
- Niveau 2 : 1000 → 2000 (+1000)
- Niveau 3 : 1000 → 2500 (+1500)
- Niveau 5 : 1000 → 3500 (+2500)
- Niveau 10 : 1000 → 6000 (+5000)

---

### 3. 📊 Système de Bonus de Stockage

**Fichier**: `src/js/storage-manager.js`

#### Nouvelle Méthode

```javascript
getWarehouseBonus() {
    const warehouse = this.game.buildingManager.getBuilding('warehouse');
    if (!warehouse || !warehouse.isBuilt()) return 0;

    const storageBonus = 500; // Par niveau
    return storageBonus * warehouse.level;
}
```

#### Intégration

```javascript
getLimit(resourceId) {
    const baseLimit = this.limits[resourceId] || this.baseLimit;
    const warehouseBonus = this.getWarehouseBonus();
    return baseLimit + warehouseBonus; // 1000 + (500 * niveau)
}
```

**Résultat** : Toutes les méthodes utilisant `getLimit()` bénéficient automatiquement du bonus :

- Affichage dans l'inventaire (X / limite)
- Vérification si stockage plein
- Calcul du pourcentage de remplissage
- Résumé de production en ville

---

### 4. 🎨 Affichage Spécial pour l'Entrepôt

**Fichier**: `src/js/ui.js`

#### Production Actuelle (lignes 1310-1323)

Au lieu d'afficher "Production actuelle", l'entrepôt affiche :

```
📦 Bonus de stockage actuel :
📦 +1000 pour toutes les ressources
Limite actuelle : 2000
```

#### Prochain Niveau (lignes 1367-1375)

Au lieu d'afficher "Production", l'entrepôt affiche :

```
📦 Bonus prochain niveau : +1500 total (soit +500)
```

---

## 📋 Structure des Coûts

### Tableau de Coûts par Niveau

| Niveau | Or     | Bois  | Fer   | Bonus Total | Limite Totale |
| ------ | ------ | ----- | ----- | ----------- | ------------- |
| 1      | 500    | 200   | 100   | +500        | 1500          |
| 2      | 1 250  | 500   | 250   | +1000       | 2000          |
| 3      | 3 125  | 1 250 | 625   | +1500       | 2500          |
| 4      | 7 813  | 3 125 | 1 563 | +2000       | 3000          |
| 5      | 19 531 | 7 813 | 3 906 | +2500       | 3500          |
| 10     | ~9.5M  | ~3.8M | ~1.9M | +5000       | 6000          |

**Note** : Le coût augmente rapidement (×2.5 par niveau), ce qui équilibre le jeu en rendant les niveaux élevés très coûteux.

---

## 🧪 Tests à Effectuer

### Test 1 : Position de la Roue

1. Aller dans Ville
2. Observer un bâtiment construit (Scierie ou Mine)
3. ✅ La roue ⚙️ devrait être **en dessous de l'icône, alignée à gauche**
4. ✅ Plus petite qu'avant (1.5rem)

### Test 2 : Construction de l'Entrepôt

1. Aller dans Ville
2. Trouver le nouveau bâtiment "🏚️ Entrepôt"
3. Vérifier le coût : 500 or + 200 Bois + 100 Fer
4. Construire le niveau 1
5. ✅ Pas de roue crantée (pas de production)

### Test 3 : Bonus de Stockage

1. Après construction de l'Entrepôt Niv. 1
2. Aller dans Récolte → Inventaire
3. ✅ Les limites devraient afficher `X / 1500` (au lieu de 1000)
4. En haut de Ville, le résumé devrait afficher les nouvelles limites

### Test 4 : Affichage Entrepôt

1. Cliquer sur l'Entrepôt construit
2. ✅ Devrait afficher "📦 Bonus de stockage actuel : +500"
3. ✅ "Limite actuelle : 1500"
4. ✅ "Prochain niveau : +1000 total (soit +500)"

### Test 5 : Amélioration Niveau 2

1. Améliorer l'Entrepôt au niveau 2
2. ✅ Coût devrait être : 1250 or + 500 Bois + 250 Fer
3. ✅ Bonus devrait passer à +1000
4. ✅ Toutes les limites devraient être à 2000

### Test 6 : Impact sur Production

1. Avoir l'Entrepôt Niv. 2 (limite 2000)
2. Laisser les bâtiments produire
3. ✅ Production devrait s'arrêter à 2000 (au lieu de 1000)
4. ✅ Warnings orange à partir de 1800 (90% de 2000)

---

## 🎮 Stratégie de Jeu

### Timing Recommandé

1. **Début** : Construire Scierie + Mine niveau 1-2
2. **Mi-jeu** : Débloquer Entrepôt dès que possible
3. **Progression** : Alterner entre améliorer production et stockage
4. **Late-game** : Entrepôt niveau élevé pour stocker massivement

### Équilibrage

- **Coût élevé** empêche de spam l'Entrepôt
- **Bonus fixe** (+500/niveau) encourage la diversification
- **Pas de production** = investissement pur dans la capacité
- **Utile pour tous** : Bois, Minerais, Gemmes bénéficient du bonus

---

## 🔧 Détails Techniques

### Architecture

```
Entrepôt construit
    ↓
StorageManager.getWarehouseBonus()
    ↓
Ajoute (niveau × 500) à toutes les limites
    ↓
getLimit() retourne (baseLimit + bonus)
    ↓
Utilisé partout : UI, production, vérifications
```

### Fichiers Modifiés

1. `src/css/enhancements.css` - Position roue crantée
2. `src/config/buildings-data.js` - Définition Entrepôt
3. `src/js/storage-manager.js` - Calcul bonus
4. `src/js/ui.js` - Affichage spécial Entrepôt

---

## 📝 Notes

### Pourquoi +500 par niveau ?

- 1000 (base) → 1500 (+50%) au niveau 1
- Progression régulière et prévisible
- Pas trop puissant pour ne pas rendre le jeu facile
- Encourage à améliorer plutôt que construire plusieurs entrepôts (un seul possible)

### Pourquoi multiplicateur 2.5 ?

- Plus élevé que Scierie/Mine (1.8)
- Rend les niveaux élevés très chers
- Force à faire des choix : production ou stockage ?
- Équilibre le jeu à long terme

### Extensibilité Future

- [ ] Entrepôts spécialisés (Bois, Minerais, Gemmes séparés)
- [ ] Amélioration du bonus (+600, +700 aux niveaux élevés)
- [ ] Déblocage progressif (niveau 1 = +500, niveau 5 = +750, etc.)
- [ ] Stockage illimité (niveau max déblocable)
