# 📚 Guide d'Utilisation - Système de Prompts pour Idle Game

## 🎯 Vue d'ensemble

Ce système de prompts a été conçu pour maximiser l'efficacité de votre collaboration avec l'agent IA de VS Code lors du développement de votre idle game. Voici comment utiliser chaque composant.

## 📁 Structure des fichiers créés

```
.vscode/
├── copilot-instructions.md   # Instructions globales pour l'IA
├── tasks.json               # Tâches VS Code automatisées
├── launch.json              # Configuration de débogage
├── extensions.json          # Extensions recommandées
└── settings.json           # Paramètres optimisés

.prompts/
├── debugging.md             # Stratégies de débogage
├── ui-design.md            # Guidelines d'interface
├── game-architecture.md    # Architecture du jeu
├── performance-optimization.md  # Optimisation perf
├── testing-strategies.md   # Méthodologies de test
├── game-mechanics.md       # Mécaniques de jeu
└── expert-prompts.md       # Prompts prêts à l'emploi

tsconfig.json              # Configuration TypeScript
```

## 🚀 Comment utiliser efficacement

### 1. **Démarrage d'une session**
Avant de commencer à coder, dites à l'IA :
```
"Lire les instructions dans .vscode/copilot-instructions.md 
et se familiariser avec l'architecture du projet définie 
dans .prompts/game-architecture.md"
```

### 2. **Développement de fonctionnalités**
Utilisez les prompts de `.prompts/expert-prompts.md` :
- Copiez le prompt adapté à votre besoin
- Personnalisez les paramètres entre crochets `[nom]`
- Ajoutez vos spécifications spécifiques

### 3. **Débogage efficace**
Consultez `.prompts/debugging.md` et utilisez le template :
```
🔴 BUG DÉTECTÉ
- Fichier(s) concerné(s) : [nom des fichiers]
- Fonction/Méthode : [nom de la fonction problématique]
- Comportement actuel : [ce qui se passe]
- Comportement attendu : [ce qui devrait se passer]
- Console d'erreur : [messages d'erreur JavaScript]
```

### 4. **Amélioration de l'interface**
Référez-vous à `.prompts/ui-design.md` pour :
- Palette de couleurs cohérente
- Composants UI standardisés
- Animations et transitions
- Guidelines responsive

## 🔧 Utilisation des tâches VS Code

### Tâches disponibles (Ctrl+Shift+P → "Tasks: Run Task")

1. **🎮 Start Development Server**
   - Lance un serveur local sur port 8080
   - Utilisation : Développement et test

2. **🧪 Run Tests**
   - Exécute tous les tests du projet
   - À utiliser après chaque modification

3. **🎨 Format Code**
   - Formate automatiquement le code
   - Maintient la consistance

4. **🔍 Lint Code**
   - Vérifie et corrige les erreurs
   - Améliore la qualité du code

### Configuration de débogage (F5)

1. **🎮 Debug Idle Game**
   - Lance Chrome avec DevTools
   - Démarre automatiquement le serveur

2. **🧪 Debug Tests**
   - Debug les tests en mode Node.js

## 💡 Bonnes pratiques avec l'IA

### ✅ **DO - À faire**

1. **Soyez spécifique** :
   ```
   "Modifier la fonction calculateProduction() dans game.js 
   pour corriger le bug où les multiplicateurs ne s'appliquent pas"
   ```

2. **Donnez du contexte** :
   ```
   "En respectant l'architecture modulaire définie dans 
   .prompts/game-architecture.md, ajouter un nouveau bâtiment..."
   ```

3. **Demandez des explications** :
   ```
   "Expliquer pourquoi cette solution fonctionne et 
   quels sont les risques potentiels"
   ```

4. **Testez progressivement** :
   ```
   "Implémenter cette fonctionnalité étape par étape, 
   en testant après chaque modification"
   ```

### ❌ **DON'T - À éviter**

1. **Demandes trop vagues** :
   ```
   "Améliore le jeu"  // Trop général
   ```

2. **Modifications massives** :
   ```
   "Refactoriser tout le code"  // Risque de casser
   ```

3. **Sans tests** :
   ```
   "Ajouter cette feature sans vérification"  // Dangereux
   ```

## 🎯 Workflow recommandé

### Phase 1 : Planification (5-10 min)
1. Consultez `.prompts/game-mechanics.md` pour l'inspiration
2. Définissez précisément ce que vous voulez implémenter
3. Choisissez le prompt approprié dans `expert-prompts.md`

### Phase 2 : Développement (20-40 min)
1. Utilisez le prompt choisi avec vos spécifications
2. Demandez à l'IA de commenter son approche
3. Implémentez par petites étapes
4. Testez après chaque modification importante

### Phase 3 : Validation (5-10 min)
1. Exécutez les tests (tâche "🧪 Run Tests")
2. Testez manuellement la fonctionnalité
3. Vérifiez l'absence de régression
4. Formatez le code (tâche "🎨 Format Code")

### Phase 4 : Documentation (5 min)
1. Mettez à jour les commentaires si nécessaire
2. Documentez les nouvelles APIs
3. Commitez avec un message descriptif

## 🔄 Itération et amélioration

### Après chaque session de dev :
1. **Notez** les prompts qui ont bien fonctionné
2. **Adaptez** ceux qui n'étaient pas assez précis
3. **Ajoutez** de nouveaux prompts selon vos besoins
4. **Partagez** les bonnes trouvailles dans `expert-prompts.md`

### Maintenance des prompts :
- **Mettez à jour** quand l'architecture évolue
- **Précisez** les prompts ambigus découverts
- **Supprimez** les prompts obsolètes
- **Organisez** par catégories logiques

## 🎮 Exemple concret : Ajouter un nouveau bâtiment

### Étape 1 : Prompt initial
```
En respectant l'architecture définie dans .prompts/game-architecture.md, 
créer un nouveau bâtiment "Mine" avec :
- Coût de base : 12000 cookies
- Production : 47 cookies/seconde  
- Condition de déblocage : posséder 50 fermes
- Animation d'achat fluide selon .prompts/ui-design.md
```

### Étape 2 : Tests
```
Créer les tests unitaires pour le bâtiment "Mine" selon 
.prompts/testing-strategies.md :
- Test de calcul de coût
- Test de production
- Test de condition de déblocage
```

### Étape 3 : Intégration UI
```
Intégrer l'interface du bâtiment "Mine" en suivant les 
guidelines de .prompts/ui-design.md avec animations 
fluides et feedback visuel immédiat
```

## 🆘 En cas de problème

### L'IA ne comprend pas votre demande :
1. Consultez `.prompts/expert-prompts.md`
2. Utilisez un prompt similaire comme base
3. Ajoutez plus de contexte spécifique
4. Décomposez en étapes plus petites

### Bug ou comportement inattendu :
1. Utilisez le template de `.prompts/debugging.md`
2. Incluez le maximum d'informations contextuelles
3. Demandez une analyse étape par étape
4. Testez la correction sur cas isolé d'abord

### Performance dégradée :
1. Consultez `.prompts/performance-optimization.md`
2. Demandez un profiling des fonctions critiques
3. Implémentez les optimisations une par une
4. Mesurez l'impact de chaque changement

---

Ce système de prompts est évolutif. N'hésitez pas à l'adapter selon votre style de développement et vos découvertes ! 🚀