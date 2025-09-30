# 🍪 Idle Game V1

Un jeu incrémental (idle game) inspiré de Cookie Clicker et Dodecadragons, développé en HTML5/CSS3/JavaScript vanilla.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎮 À propos

Idle Game V1 est un jeu incrémental où vous devez accumuler des cookies en cliquant et en achetant des bâtiments automatiques. Votre objectif : devenir le plus grand producteur de cookies de tous les temps !

### ✨ Fonctionnalités

- 🖱️ **Système de clics** : Gagnez des cookies en cliquant
- 🏗️ **10 bâtiments différents** : Curseur, Grand-mère, Ferme, Mine, etc.
- 🔧 **Système d'upgrades** : Améliorez votre production
- 💾 **Sauvegarde automatique** : Vos progrès sont sauvegardés automatiquement
- 📊 **Production offline** : Continuez à gagner des cookies même hors ligne
- 📱 **Design responsive** : Jouable sur mobile, tablette et desktop
- 🎨 **Animations fluides** : Interface réactive et agréable

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 16+ (pour le serveur de développement)
- Un navigateur moderne (Chrome, Firefox, Edge, Safari)

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-username/idle-game-v1.git
   cd idle-game-v1
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - Le jeu s'ouvre automatiquement sur `http://localhost:3000`
   - Ou ouvrez manuellement `index.html` dans votre navigateur

---

## 📁 Structure du projet

```
idle-game-v1/
├── .vscode/                    # Configuration VS Code et Copilot
│   ├── copilot-instructions.md # Instructions pour l'IA
│   ├── tasks.json             # Tâches automatisées
│   └── settings.json          # Paramètres de l'éditeur
│
├── .prompts/                   # Bibliothèque de prompts pour l'IA
│   ├── debugging.md           # Stratégies de débogage
│   ├── ui-design.md          # Guidelines d'interface
│   ├── game-architecture.md  # Architecture du jeu
│   ├── performance-optimization.md
│   ├── testing-strategies.md
│   ├── game-mechanics.md
│   └── expert-prompts.md
│
├── src/                       # Code source (à créer)
│   ├── js/
│   │   ├── main.js           # Point d'entrée
│   │   ├── game.js           # Classe principale
│   │   ├── buildings.js      # Gestion des bâtiments
│   │   ├── upgrades.js       # Système d'améliorations
│   │   ├── ui.js             # Interface utilisateur
│   │   ├── save.js           # Système de sauvegarde
│   │   └── utils.js          # Fonctions utilitaires
│   │
│   ├── css/
│   │   ├── main.css          # Styles principaux
│   │   ├── components.css    # Composants UI
│   │   └── animations.css    # Animations
│   │
│   ├── config/
│   │   ├── game-config.js    # Configuration du jeu
│   │   ├── buildings-data.js # Données des bâtiments
│   │   └── upgrades-data.js  # Données des upgrades
│   │
│   └── assets/
│       ├── images/           # Images du jeu
│       └── sounds/           # Effets sonores (futur)
│
├── index.html                 # Point d'entrée HTML (à créer)
├── package.json              # Dépendances Node.js
├── .gitignore               # Fichiers ignorés par Git
├── ROADMAP.md               # Plan de développement
├── TEST-CHECKLIST.md        # Tests manuels
├── DEPLOYMENT.md            # Guide de déploiement
└── README.md                # Ce fichier
```

---

## 🎯 Roadmap

Le développement est organisé en 4 phases :

### Phase 1 - MVP (Semaine 1) ✅
- Clic et compteur
- 3 bâtiments de base
- Production automatique
- Sauvegarde LocalStorage
- UI responsive basique

### Phase 2 - Enrichissement (Semaine 2)
- Système d'upgrades complet
- 10 bâtiments au total
- Achievements
- Statistiques

### Phase 3 - Polish (Semaine 3)
- Design avancé
- Animations complexes
- Optimisations performance
- Tests et debug

### Phase 4 - Fonctionnalités avancées (Optionnel)
- Système de prestige
- Événements temporaires
- Mini-jeux
- Effets sonores

Voir [ROADMAP.md](ROADMAP.md) pour le détail complet.

---

## 🛠️ Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Styles et animations
- **JavaScript ES6+** - Logique du jeu (vanilla, pas de framework)
- **LocalStorage** - Sauvegarde des données
- **requestAnimationFrame** - Boucle de jeu optimisée

---

## 📖 Documentation

- [ROADMAP.md](ROADMAP.md) - Plan de développement détaillé
- [TEST-CHECKLIST.md](TEST-CHECKLIST.md) - Checklist de tests manuels
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement
- [README-PROMPTS.md](README-PROMPTS.md) - Utilisation des prompts IA
- [.prompts/](./prompts/) - Bibliothèque de prompts pour l'IA

---

## 🧪 Tests

### Tests manuels
```bash
# Lancer le jeu en local et suivre la checklist
npm run dev
```

Voir [TEST-CHECKLIST.md](TEST-CHECKLIST.md) pour la liste complète des tests.

### Tests automatisés
```bash
# À implémenter dans une future version
npm test
```

---

## 🚀 Déploiement

Le jeu peut être déployé sur :
- **GitHub Pages** (gratuit, le plus simple)
- **Azure Static Web Apps** (gratuit, recommandé pour Azure)
- **Netlify** (gratuit, excellent pour hobby projects)
- **Vercel** (gratuit, très rapide)

Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour les instructions détaillées.

---

## 🤝 Contribution

Ce projet est actuellement en développement solo, mais les suggestions sont les bienvenues !

### Comment contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité X'`)
4. Push sur la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- Inspiré par [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) d'Orteil
- Inspiré par [Dodecadragons](https://demonin.com/games/dodecaDragons/)
- Développé avec l'aide de GitHub Copilot

---

## 📧 Contact

Pour toute question ou suggestion :
- **GitHub Issues** : [Ouvrir un ticket](https://github.com/votre-username/idle-game-v1/issues)
- **Email** : votre.email@example.com

---

## 🎮 Amusez-vous bien !

Bon courage pour devenir le plus grand producteur de cookies de tous les temps ! 🍪
