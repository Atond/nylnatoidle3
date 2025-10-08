# 🎒 Système de Gestion d'Inventaire

## Vue d'ensemble

Le système de gestion d'inventaire a été conçu pour protéger vos équipements précieux contre les ventes accidentelles. Avec l'auto-craft qui génère jusqu'à 60 objets par minute, il est crucial d'avoir des outils de gestion efficaces.

## 🔒 Système de Verrouillage

### Fonctionnalités

- **Verrouiller/Déverrouiller** : Cliquez sur le bouton 🔒/🔓 en haut à droite de chaque carte d'équipement
- **Protection totale** : Les objets verrouillés **NE PEUVENT PAS** être vendus
- **Indicateurs visuels** :
  - Bordure dorée sur la carte
  - Icône 🔒 semi-transparente en coin supérieur droit
  - Fond légèrement doré
- **Persistance** : L'état verrouillé est sauvegardé avec votre partie

### Quand verrouiller ?

- ✅ Équipements **Masterwork** (×3.0) - Extrêmement rares (0.5%)
- ✅ Équipements **Perfect** (×2.0) - Très rares (2%)
- ✅ Objets avec stats parfaites pour votre build
- ✅ Équipements haute rareté (Légendaire, Épique)

## 💰 Vente Sélective

### Boutons disponibles

#### 1. **💰 Normal**

- Vend **uniquement** les objets de qualité Normal (×1.0)
- Idéal pour nettoyer l'inventaire quotidiennement
- Conserve tous les objets de qualité supérieure

#### 2. **💰 ≤ Supérieur**

- Vend les objets Normal **ET** Supérieur (×1.2)
- Bon compromis entre nettoyage et sécurité
- Conserve Exceptionnel, Perfect, Masterwork

#### 3. **💰 ≤ Exceptionnel**

- Vend Normal, Supérieur **ET** Exceptionnel (×1.5)
- Pour un nettoyage plus agressif
- Conserve Perfect et Masterwork

#### 4. **⚠️ TOUT Vendre**

- Vend **TOUS** les objets (sauf verrouillés)
- Bouton en rouge pour avertir du danger
- Utilisez avec précaution !

### Système de Confirmation

Avant chaque vente, une fenêtre de confirmation affiche :

```
⚠️ CONFIRMATION DE VENTE ⚠️

Êtes-vous sûr de vouloir vendre ces équipements ?

Normal : 15 × (450 or)
Supérieur ✨ : 8 × (380 or)
⚠️ Parfait ⭐ : 2 × (200 or)

💰 TOTAL : 25 équipements pour 1030 or

🔒 3 équipements verrouillés ne seront PAS vendus

Cette action est IRRÉVERSIBLE !
```

**Détails affichés** :

- Nombre d'objets par qualité
- Or gagné par qualité
- Total global
- Avertissement spécial pour Perfect et Masterwork (⚠️)
- Nombre d'objets verrouillés protégés

## 📊 Tri de l'Inventaire

### Options de tri disponibles

Menu déroulant **"Trier par"** :

#### **Qualité** (par défaut)

- Ordre : Masterwork → Perfect → Exceptional → Superior → Normal
- Les objets verrouillés apparaissent **toujours en premier**
- Idéal pour identifier rapidement les objets précieux

#### **Rareté**

- Ordre : Divine → Mythic → Legendary → Epic → Rare → Uncommon → Common
- Utile pour gérer l'équipement par puissance base

#### **Niveau**

- Ordre : Niveau requis décroissant
- Pratique pour voir les objets haute-level

#### **Nom**

- Ordre alphabétique
- Pour retrouver un objet spécifique

### Tri automatique

- Les objets **verrouillés** sont **toujours affichés en premier**
- Puis tri selon le critère sélectionné
- Le tri est appliqué instantanément

## 💡 Stratégies Recommandées

### Stratégie Conservative 🛡️

```
1. Verrouiller TOUS les Perfect et Masterwork
2. Verrouiller les Exceptional avec bonnes stats
3. Vendre quotidiennement avec "💰 Normal"
4. Vendre hebdomadairement avec "💰 ≤ Supérieur"
```

### Stratégie Équilibrée ⚖️

```
1. Verrouiller uniquement Perfect et Masterwork
2. Vendre avec "💰 ≤ Supérieur" régulièrement
3. Trier par Qualité pour surveiller les Exceptional
4. Vendre les Exceptional avec stats faibles
```

### Stratégie Aggressive 💸

```
1. Verrouiller seulement 2-3 meilleurs Masterwork
2. Vendre avec "💰 ≤ Exceptionnel" fréquemment
3. Privilégier l'or et le reroll rapide
4. Rotation rapide de l'équipement
```

## 📈 Calcul du Prix de Vente

### Formule

```
Prix = (Valeur Base + Bonus Niveau) × Multiplicateur Qualité
```

### Valeurs de Base par Rareté

- **Common** : 10 or
- **Uncommon** : 25 or
- **Rare** : 50 or
- **Epic** : 100 or
- **Legendary** : 250 or
- **Mythic** : 500 or
- **Divine** : 1000 or

### Bonus Niveau

```
Bonus = Niveau requis × 2
```

### Multiplicateurs Qualité

- **Normal** : ×1.0
- **Superior** : ×1.2
- **Exceptional** : ×1.5
- **Perfect** : ×2.0
- **Masterwork** : ×3.0

### Exemples de Prix

#### Épée Épique Niveau 10

```
Base: 100 or (Epic)
Bonus: 10 × 2 = 20 or
Total base: 120 or

Normal: 120 × 1.0 = 120 or
Superior: 120 × 1.2 = 144 or
Exceptional: 120 × 1.5 = 180 or
Perfect: 120 × 2.0 = 240 or
Masterwork: 120 × 3.0 = 360 or
```

#### Anneau Légendaire Niveau 20

```
Base: 250 or (Legendary)
Bonus: 20 × 2 = 40 or
Total base: 290 or

Normal: 290 × 1.0 = 290 or
Superior: 290 × 1.2 = 348 or
Exceptional: 290 × 1.5 = 435 or
Perfect: 290 × 2.0 = 580 or
Masterwork: 290 × 3.0 = 870 or
```

## 🎯 Conseils Pratiques

### Gestion Quotidienne

1. **Matin** : Vendre tous les Normal avec "💰 Normal"
2. **Midi** : Trier par Qualité et vérifier les Exceptional
3. **Soir** : Verrouiller les nouveaux Perfect/Masterwork
4. **Avant de quitter** : Vérifier que les objets précieux sont verrouillés

### Avant une Longue Session d'Auto-Craft

1. Vendre tout sauf les objets verrouillés
2. Vérifier l'espace disponible
3. Trier par Qualité pour surveiller facilement
4. Préparer à vendre régulièrement pendant le craft

### En Cas d'Inventaire Plein

1. Trier par Qualité
2. Vendre "💰 Normal" d'abord
3. Si insuffisant, vendre "💰 ≤ Supérieur"
4. En dernier recours, déverrouiller les Exceptional faibles

## 🔐 Sécurité Multi-Couches

Le système offre 4 niveaux de protection :

### Niveau 1 : Verrouillage

- Protection mécanique
- Objets verrouillés exclus de toute vente
- Indicateurs visuels clairs

### Niveau 2 : Vente Sélective

- Contrôle fin sur ce qui est vendu
- Évite de vendre par accident les hautes qualités
- Boutons séparés par palier de qualité

### Niveau 3 : Confirmation Détaillée

- Aperçu complet avant validation
- Décompte par qualité
- Avertissements visuels pour Perfect/Masterwork

### Niveau 4 : Tri Automatique

- Objets verrouillés toujours visibles en premier
- Tri par qualité pour identifier rapidement les précieux
- Organisation visuelle claire

## ❓ FAQ

### Q : Puis-je vendre un objet verrouillé ?

**R** : Non, c'est impossible. Vous devez d'abord le déverrouiller en cliquant sur 🔒.

### Q : Que se passe-t-il si je clique sur "TOUT Vendre" ?

**R** : Tous les objets NON verrouillés seront vendus après confirmation. Les objets verrouillés sont toujours protégés.

### Q : Le verrouillage est-il sauvegardé ?

**R** : Oui, l'état verrouillé/déverrouillé est sauvegardé avec votre partie.

### Q : Combien d'objets puis-je verrouiller ?

**R** : Autant que vous voulez ! Il n'y a pas de limite.

### Q : Le tri affecte-t-il l'ordre réel de l'inventaire ?

**R** : Non, c'est juste l'affichage. L'ordre physique dans le code change, mais ça n'affecte pas le gameplay.

### Q : Puis-je annuler une vente ?

**R** : Non, une fois confirmée, la vente est définitive. C'est pourquoi la confirmation est si détaillée.

### Q : Les objets équipés peuvent-ils être vendus ?

**R** : Non, seuls les objets dans le sac peuvent être vendus. Les objets équipés sont automatiquement protégés.

## 🚀 Mises à Jour Futures Envisagées

- Filtres par qualité (afficher/masquer certaines qualités)
- Vente automatique des Normal/Superior
- Présets de verrouillage (ex: "Verrouiller tous les Perfect+")
- Statistiques de vente (or gagné par qualité)
- Historique des ventes avec annulation possible
- Tags personnalisés pour organiser l'équipement
- Comparaison rapide avec équipement actuel

---

**Version** : 1.0  
**Date** : Janvier 2025  
**Auteur** : Équipe de développement IdleRPG
