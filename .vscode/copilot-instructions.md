# Instructions globales pour l'agent IA - Projet Idle Game

## 🎯 Contexte du projet
Vous travaillez sur un **idle game** (jeu incrémental) inspiré de Cookie Clicker et Dodecadragons. Le jeu sera développé pour navigateur web avec les technologies suivantes :

- **Frontend** : HTML5, CSS3, JavaScript ES6+ (vanilla)
- **Stockage** : LocalStorage pour la sauvegarde
- **Architecture** : Modulaire et extensible
- **Design** : Responsive et attrayant

## 🛡️ Principes de développement à respecter

### Code Quality
- **Toujours** commenter le code de manière explicative
- Utiliser des noms de variables/fonctions **descriptifs** en anglais
- Structurer le code de manière **modulaire**
- Préférer la **lisibilité** à la performance prématurée

### Architecture
- Séparer clairement la **logique métier**, l'**interface** et la **persistance**
- Créer des **classes** pour les entités principales (Game, Building, Upgrade, etc.)
- Utiliser des **événements personnalisés** pour la communication entre modules
- Implémenter un **système de sauvegarde automatique**

### Interface utilisateur
- Design **responsive** (mobile-first)
- Animations **fluides** et **non-intrusives**
- Feedback visuel **immédiat** sur les interactions
- Accessibilité (contraste, tailles de police, navigation clavier)

### Performance
- Éviter les **fuites mémoire** (clearInterval, removeEventListener)
- Optimiser les **boucles de rendu** (requestAnimationFrame)
- **Lazy loading** pour les ressources non critiques
- **Debounce** les événements fréquents

## 📁 Structure de fichiers à maintenir

```
/src/
  /js/
    game.js          // Classe principale du jeu
    buildings.js     // Gestion des bâtiments
    upgrades.js      // Système d'améliorations
    ui.js           // Interface utilisateur
    save.js         // Système de sauvegarde
    utils.js        // Fonctions utilitaires
  /css/
    main.css        // Styles principaux
    components.css  // Composants UI
    animations.css  // Animations
  /assets/
    /images/        // Images du jeu
    /sounds/        // Effets sonores (futur)
index.html          // Point d'entrée
```

## 🔧 Guidelines spécifiques

### Quand vous créez du code :
1. **Expliquez** toujours votre approche avant de coder
2. **Montrez** le résultat attendu
3. **Anticipez** les cas d'erreur et les cas limites
4. **Proposez** des alternatives si pertinent

### Quand vous déboguez :
1. **Identifiez** d'abord la cause racine
2. **Expliquez** pourquoi le bug survient
3. **Proposez** une solution minimale
4. **Vérifiez** que la correction n'introduit pas de régressions

### Quand vous améliorez l'UI :
1. **Justifiez** vos choix de design
2. **Considérez** l'expérience utilisateur globale
3. **Testez** sur différentes tailles d'écran
4. **Gardez** la cohérence visuelle

## 🚫 Ce qu'il faut éviter
- Modifications **non-demandées** du code existant
- Solutions **sur-complexes** pour des problèmes simples
- **Réécritures** complètes sauf demande explicite
- Code **non-documenté** ou **non-testé**
- **Dépendances externes** sans justification

## 💡 Approche recommandée
- **Une fonctionnalité à la fois**
- **Tests manuels** après chaque modification
- **Commits logiques** avec messages descriptifs
- **Communication claire** sur les changements proposés