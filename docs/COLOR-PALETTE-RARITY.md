# 🎨 Palette de Couleurs - Raretés

**Date** : 5 Octobre 2025  
**Statut** : ✅ Standardisé et cohérent dans tout le jeu

---

## 🌈 Échelle de Rareté Unifiée

Toutes les raretés utilisent **les mêmes couleurs** partout dans le jeu :

- Bordures d'équipement équipé
- Cartes d'inventaire
- Noms de recettes
- Textes de qualité

---

## 📊 Table des Couleurs

| Rareté    | Couleur | Code Hex  | Utilisation                          |
| --------- | ------- | --------- | ------------------------------------ |
| Common    | Gris    | `#9e9e9e` | Équipement de base                   |
| Uncommon  | Vert    | `#4caf50` | Équipement amélioré                  |
| Rare      | Bleu    | `#2196f3` | Équipement rare                      |
| Epic      | Violet  | `#9c27b0` | Équipement épique                    |
| Legendary | Orange  | `#ff9800` | Équipement légendaire                |
| Mythic    | Rose    | `#e91e63` | Équipement mythique                  |
| Divine    | Or      | `#ffd700` | Équipement divin (plus haute rareté) |

---

## 🎯 Principe de Design

### Simplicité

- **Une bordure colorée** = Une information claire
- Pas d'effets superflus (pas de glow, pas d'animation)
- La couleur suffit à identifier la rareté instantanément

### Cohérence

- **Même palette partout** : équipement, inventaire, recettes
- Hiérarchie visuelle claire : Gris → Or
- Facile à mémoriser

### Lisibilité

- Couleurs suffisamment contrastées
- Visibles sur fond sombre
- Distinguables pour les daltoniens (sauf cas extrêmes)

---

## 📂 Implémentation Technique

### JavaScript - `src/js/equipment.js`

```javascript
getRarityColor() {
    const colors = {
        common: '#9e9e9e',      // Gris
        uncommon: '#4caf50',    // Vert
        rare: '#2196f3',        // Bleu
        epic: '#9c27b0',        // Violet
        legendary: '#ff9800',   // Orange
        mythic: '#e91e63',      // Rose
        divine: '#ffd700'       // Or
    };
    return colors[this.rarity] || colors.common;
}
```

### CSS - `src/css/main.css`

```css
/* Couleurs de texte pour les noms de recettes */
.recipe-name.common {
  color: #9e9e9e;
}
.recipe-name.uncommon {
  color: #4caf50;
}
.recipe-name.rare {
  color: #2196f3;
}
.recipe-name.epic {
  color: #9c27b0;
}
.recipe-name.legendary {
  color: #ff9800;
}
.recipe-name.mythic {
  color: #e91e63;
}
.recipe-name.divine {
  color: #ffd700;
}
```

### Application sur les Slots Équipés

```javascript
// Dans updateEquipment()
const rarityColor = equipment.getRarityColor();
slotElement.style.borderColor = rarityColor;
slotElement.style.borderWidth = "3px";
slotElement.style.borderStyle = "solid";
```

---

## 🎨 Exemples Visuels

### Épée Commune

```
┌─────────────┐
│   GRIS      │  ← Bordure grise #9e9e9e
│   Épée      │
└─────────────┘
```

### Plastron Uncommon

```
┌─────────────┐
│   VERT      │  ← Bordure verte #4caf50
│  Plastron   │
└─────────────┘
```

### Casque Rare

```
┌─────────────┐
│   BLEU      │  ← Bordure bleue #2196f3
│   Casque    │
└─────────────┘
```

### Anneau Epic

```
┌─────────────┐
│  VIOLET     │  ← Bordure violette #9c27b0
│   Anneau    │
└─────────────┘
```

### Arme Legendary

```
┌─────────────┐
│  ORANGE     │  ← Bordure orange #ff9800
│    Arme     │
└─────────────┘
```

### Amulette Mythic

```
┌─────────────┐
│   ROSE      │  ← Bordure rose #e91e63
│  Amulette   │
└─────────────┘
```

### Relique Divine

```
┌─────────────┐
│    OR       │  ← Bordure or #ffd700
│  Relique    │
└─────────────┘
```

---

## 🔄 Distinction Rareté vs Qualité

### Rareté (Bordure)

- **Visuel** : Couleur de la bordure (3px solid)
- **Où** : Partout (slots équipés, inventaire, recettes)
- **Échelle** : Common → Divine (7 niveaux)

### Qualité (Icône + Texte)

- **Visuel** : Icône emoji (✨ 💎 ⭐ 👑) + texte
- **Où** : Nom de l'objet, tooltip
- **Échelle** : Normal → Masterwork (5 niveaux)

### Exemple Combiné

```
Plastron de Fer Uncommon Exceptionnel
├─ Bordure VERTE (Uncommon = rareté)
├─ Icône 💎 (Exceptionnel = qualité)
└─ Texte "Exceptionnel" sous le nom
```

---

## 📝 Avantages du Système

### 1. Clarté Immédiate

- Un coup d'œil = rareté identifiée
- Pas de confusion possible
- Information unique (pas de superposition)

### 2. Performance

- Pas d'animations CPU-intensives
- Pas de box-shadow complexes
- Rendu instantané

### 3. Accessibilité

- Contrastes élevés
- Couleurs distinctes
- Lisible même avec daltonisme modéré

### 4. Évolutivité

- Facile d'ajouter une nouvelle rareté
- Une seule ligne à modifier par fichier
- Cohérence garantie

---

## 🧪 Validation

### Cas Testés

- ✅ Équipement Common → Bordure grise
- ✅ Équipement Uncommon → Bordure verte
- ✅ Équipement Rare → Bordure bleue
- ✅ Équipement Epic → Bordure violette
- ✅ Équipement Legendary → Bordure orange
- ✅ Équipement Mythic → Bordure rose
- ✅ Équipement Divine → Bordure or

### Cohérence Vérifiée

- ✅ Slots équipés : Bonnes couleurs
- ✅ Inventaire (cartes) : Bonnes couleurs (borderLeft)
- ✅ Recettes : Bons textes colorés
- ✅ Tooltips : Informations correctes

---

## 🎯 Guidelines pour Développement Futur

### Ajouter une Nouvelle Rareté

1. **equipment.js** - Ajouter dans `getRarityColor()`

```javascript
newrarity: "#hexcode";
```

2. **main.css** - Ajouter le style de texte

```css
.recipe-name.newrarity {
  color: #hexcode;
}
```

3. **Aucune autre modification nécessaire** - Le système est automatique

### Règles de Couleur

- Utiliser des couleurs **saturées** (pas de pastel)
- Éviter le rouge pur (réservé aux erreurs/dangers)
- Tester le contraste sur fond sombre
- Vérifier la distinction avec les couleurs existantes

---

## 📊 Hiérarchie Visuelle

### Impact Visuel Croissant

```
Common    ████  (Gris - neutre)
Uncommon  ████  (Vert - positif)
Rare      ████  (Bleu - spécial)
Epic      ████  (Violet - rare)
Legendary ████  (Orange - très rare)
Mythic    ████  (Rose - exceptionnel)
Divine    ████  (Or - ultime)
```

### Progressivité des Couleurs

- **Début** : Neutre/froid (Gris, Vert)
- **Milieu** : Froid/neutre (Bleu)
- **Haut** : Chaud/intense (Violet, Orange, Rose)
- **Sommet** : Précieux (Or)

Cette progression suit l'intuition naturelle :

- Froid/neutre = commun
- Chaud/vif = rare
- Or = suprême

---

## ✅ Statut Final

**Système de couleurs** : ✅ Unifié et cohérent  
**Fichiers concernés** : 3

- `src/js/equipment.js` (getRarityColor)
- `src/css/main.css` (recipe-name colors)
- `src/css/quality-system.css` (effets supprimés)

**Design** : Simple, clair, efficace  
**Performance** : Optimale (pas d'effets superflus)  
**Cohérence** : 100% (même palette partout)

---

**Version** : 2.0  
**Principe** : "Keep It Simple" - Une bordure, une couleur, une information claire.
