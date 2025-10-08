# 🎲 Système de Qualité d'Équipement

## Vue d'ensemble

Le système de qualité ajoute une dimension RNG (Random Number Generation) au craft, rendant chaque objet unique et potentiellement plus puissant que prévu.

## Qualités disponibles

### 📊 Table des qualités

| Qualité          | Multiplicateur | Probabilité de base | Icône | Couleur          | Effet visuel                |
| ---------------- | -------------- | ------------------- | ----- | ---------------- | --------------------------- |
| **Normal**       | ×1.0           | ~69%                | -     | Gris (#9E9E9E)   | Standard                    |
| **Supérieur**    | ×1.2           | ~20%                | ✨    | Vert (#4CAF50)   | Lueur verte                 |
| **Exceptionnel** | ×1.5           | ~8%                 | 💎    | Bleu (#2196F3)   | Lueur bleue animée          |
| **Parfait**      | ×2.0           | ~2%                 | ⭐    | Violet (#9C27B0) | Lueur violette pulsante     |
| **Œuvre Maître** | ×3.0           | ~0.5%               | 👑    | Or (#FFD700)     | Lueur dorée + particules ✨ |

## Mécaniques

### 🎯 Génération de qualité

Chaque fois qu'un équipement est crafté, une qualité est déterminée aléatoirement :

```javascript
// Probabilités ajustées selon le niveau de profession
const baseRoll = Math.random() * 100;
const levelBonus = (professionLevel - 1) * 0.5; // +0.5% par niveau

if (baseRoll < 0.5) → Œuvre Maître
else if (baseRoll < 3) → Parfait
else if (baseRoll < 11 + levelBonus) → Exceptionnel
else if (baseRoll < 31 + (levelBonus × 2)) → Supérieur
else → Normal
```

### 📈 Impact du niveau de profession

Plus votre profession est élevée, meilleures sont vos chances d'obtenir des qualités supérieures :

- **Niveau 1** : Probabilités de base
- **Niveau 10** : +4.5% pour Exceptionnel, +9% pour Supérieur
- **Niveau 20** : +9.5% pour Exceptionnel, +19% pour Supérieur
- **Niveau 50** : +24.5% pour Exceptionnel, +49% pour Supérieur

Les probabilités d'**Œuvre Maître** et **Parfait** augmentent très légèrement (restent ultra-rares).

### 💪 Effet sur les stats

Toutes les stats de l'équipement sont multipliées par le multiplicateur de qualité :

**Exemple : Épée de Fer (stats de base)**

- Force: +5
- Dégâts: +3

**Qualités possibles :**

- Normal (×1.0) : Force +5, Dégâts +3
- Supérieur (×1.2) : Force +6, Dégâts +3
- Exceptionnel (×1.5) : Force +7, Dégâts +4
- Parfait (×2.0) : Force +10, Dégâts +6
- **Œuvre Maître (×3.0)** : Force +15, Dégâts +9 🤯

### 💰 Prix de vente

Le prix de vente est également multiplié par la qualité :

```javascript
prixFinal = (prixBase + bonusNiveau) × multiplicateurQualité
```

**Exemple :**

- Épée de Fer normale : 12 or
- Épée de Fer Supérieure : 14 or
- Épée de Fer Exceptionnelle : 18 or
- Épée de Fer Parfaite : 24 or
- **Épée de Fer Œuvre Maître : 36 or** 💎

## Affichage visuel

### 🎨 Dans l'inventaire

Les cartes d'équipement affichent :

1. **Bordure de couleur** (gauche) selon la qualité
2. **Icône de qualité** à côté du nom
3. **Nom de la qualité** sous le nom de l'objet
4. **Effets visuels** : lueurs, animations, particules

### ✨ Effets spéciaux

- **Supérieur** : Légère lueur verte + bordure gauche verte
- **Exceptionnel** : Lueur bleue + bordure gauche bleue
- **Parfait** : Lueur violette pulsante + bordure gauche violette
- **Œuvre Maître** : Lueur dorée intense + particules scintillantes ✨ + bordure gauche dorée

### 🔔 Notifications

Les notifications de craft affichent la qualité obtenue :

- Normal : Notification standard
- Supérieur+ : Notification avec icône de qualité
- Parfait+ : Notification colorée selon la qualité
- **Œuvre Maître** : Notification dorée avec animation de pulse !

## Stratégies

### 🎲 Pour maximiser les chances

1. **Monter le niveau de profession** : +0.5% de chance par niveau
2. **Crafter en quantité** : Plus vous craftez, plus vous avez de chances de drop rare
3. **Auto-craft + vente** : Génère de l'or et cherche les qualités rares
4. **Garder les Parfait/Œuvre Maître** : Extrêmement rares, valent cher et très puissants

### 💎 Objets rares

- Un **Parfait** apparaît environ tous les 50 crafts
- Un **Œuvre Maître** apparaît environ tous les 200 crafts (avec niveau bas)
- Avec niveau 50+ : ~1 Œuvre Maître tous les 100-150 crafts

### 🏆 Objectifs de collection

- Avoir au moins 1 Parfait dans chaque slot
- Obtenir votre première Œuvre Maître
- Full équipement Exceptionnel minimum
- Le Saint Graal : Full équipement Œuvre Maître 👑

## Évolutions futures

### 🔮 Idées potentielles

- **Traits bonus sur Œuvre Maître** : Stats supplémentaires uniques
- **Équipement de set** : Bonus si plusieurs pièces de même qualité
- **Amélioration de qualité** : Fusionner 10 Parfaits = 1 Œuvre Maître
- **Chance de craft bonus** : Équipements ou potions augmentant les probabilités
- **Qualité Légendaire** : Au-delà d'Œuvre Maître (×5.0, 0.1% de chance)

## FAQ

**Q : La qualité affecte-t-elle toutes les stats ?**
R : Oui, absolument toutes (Force, Agilité, Intelligence, Sagesse, Endurance, Dégâts, Défense, XP Métiers, Drop Rate).

**Q : Puis-je améliorer la qualité d'un équipement existant ?**
R : Non, pas pour l'instant. La qualité est fixée à la création.

**Q : Est-ce que l'auto-craft génère des qualités ?**
R : Oui ! Chaque craft automatique a les mêmes chances qu'un craft manuel.

**Q : Les probabilités sont-elles vraiment si basses pour Œuvre Maître ?**
R : Oui, c'est volontaire. Un Œuvre Maître doit être extrêmement rare et excitant à obtenir !

**Q : Ça vaut le coup de vendre les Œuvre Maître ?**
R : Financièrement oui (×3 le prix), mais équipé c'est ×3 les stats... À vous de choisir ! 😉

---

_Ce système a été implémenté le 5 octobre 2025. Les probabilités et multiplicateurs peuvent être ajustés selon le feedback des joueurs._
