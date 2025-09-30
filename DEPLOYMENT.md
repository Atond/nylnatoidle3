# 🍪 Idle Game - Guide de Déploiement

## 📋 Options d'hébergement pour votre jeu

Votre idle game est un site **100% statique** (HTML + CSS + JavaScript), donc vous n'avez besoin **d'aucun serveur backend**. Voici les meilleures options :

---

## 🚀 Option 1 : Azure Static Web Apps (Recommandé pour Azure)

### ✅ Avantages
- **GRATUIT** jusqu'à 100 GB de bande passante/mois
- SSL automatique (HTTPS)
- CDN mondial intégré
- CI/CD avec GitHub Actions
- Domaine personnalisé gratuit
- Staging environments

### 💰 Coût
- **Gratuit** pour un projet comme le vôtre
- Pas de carte de crédit requise pour le tier gratuit

### 📝 Étapes de déploiement

1. **Créer une ressource Azure Static Web Apps**
   ```bash
   # Depuis le portail Azure ou Azure CLI
   az staticwebapp create \
     --name idle-game \
     --resource-group votre-resource-group \
     --source https://github.com/votre-username/idle-game-v1 \
     --location "westeurope" \
     --branch main \
     --app-location "/" \
     --output-location "/"
   ```

2. **Configuration automatique**
   - Azure crée automatiquement un workflow GitHub Actions
   - À chaque push sur `main`, le site se déploie automatiquement

3. **Structure requise**
   ```
   /
   ├── index.html (à la racine)
   ├── src/
   ├── package.json
   └── .github/workflows/azure-static-web-apps-xxx.yml (généré auto)
   ```

4. **URL générée**
   - `https://idle-game-xxxx.azurestaticapps.net`
   - Vous pouvez ajouter un domaine personnalisé

### 🔗 Documentation
- [Azure Static Web Apps - Quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started)

---

## 🐙 Option 2 : GitHub Pages (Le plus simple)

### ✅ Avantages
- **Complètement GRATUIT**
- Hébergé directement depuis votre repo GitHub
- SSL automatique
- Très simple à configurer
- Pas de compte Azure nécessaire

### 💰 Coût
- **0€** - Totalement gratuit

### 📝 Étapes de déploiement

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/idle-game-v1.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main` / folder: `/ (root)`
   - Save

3. **Votre site est en ligne !**
   - `https://votre-username.github.io/idle-game-v1/`
   - Délai: 1-2 minutes

4. **Domaine personnalisé (optionnel)**
   - Ajouter un fichier `CNAME` avec votre domaine
   - Configurer les DNS chez votre registrar

### 🔗 Documentation
- [GitHub Pages - Getting Started](https://pages.github.com/)

---

## 🟢 Option 3 : Netlify

### ✅ Avantages
- **GRATUIT** pour projets personnels
- Déploiement ultra-rapide
- Preview des Pull Requests
- Formulaires et Functions serverless (si besoin futur)
- Interface intuitive

### 💰 Coût
- **Gratuit** : 100 GB/mois, 300 build minutes/mois
- Plus que suffisant pour votre projet

### 📝 Étapes de déploiement

1. **Via l'interface Netlify**
   - Connecter votre repo GitHub
   - Build command: (laisser vide)
   - Publish directory: `/`
   - Deploy!

2. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **URL générée**
   - `https://random-name-xxxxx.netlify.app`
   - Renommable dans les settings

### 🔗 Documentation
- [Netlify - Deploy from Git](https://docs.netlify.com/site-deploys/create-deploys/)

---

## 🟦 Option 4 : Vercel

### ✅ Avantages
- **GRATUIT** pour hobby projects
- Très performant (CDN Edge)
- Preview deployments
- Analytics intégrés

### 💰 Coût
- **Gratuit** pour usage personnel
- 100 GB bande passante

### 📝 Étapes de déploiement

1. **Via l'interface Vercel**
   - Import Git Repository
   - Framework Preset: Other
   - Deploy

2. **Via Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

### 🔗 Documentation
- [Vercel - Get Started](https://vercel.com/docs)

---

## 📊 Comparaison rapide

| Service | Coût | Setup | Performance | CI/CD | Notes |
|---------|------|-------|-------------|-------|-------|
| **Azure Static Web Apps** | Gratuit | Moyen | Excellent | ✅ | Intégré Azure |
| **GitHub Pages** | Gratuit | Très facile | Bon | ✅ | Le plus simple |
| **Netlify** | Gratuit | Facile | Excellent | ✅ | Interface top |
| **Vercel** | Gratuit | Facile | Excellent | ✅ | Très rapide |

---

## 🎯 Ma recommandation

### Pour apprendre Azure : **Azure Static Web Apps**
- Bon pour le CV
- Intégration avec l'écosystème Azure
- Gratuit pour votre usage

### Pour la simplicité maximale : **GitHub Pages**
- Zéro configuration
- Gratuit à vie
- Parfait pour commencer

### Pour la meilleure expérience développeur : **Netlify**
- Interface ultra-intuitive
- Features avancées disponibles
- Déploiements rapides

---

## ❌ Ce dont vous N'AVEZ PAS besoin

### Pas de Base de Données SQL
**Pourquoi ?** Votre jeu utilise LocalStorage dans le navigateur.
- Pas de serveur nécessaire
- Pas de coût
- Plus simple
- Plus rapide

### Pas de Backend API
**Pourquoi ?** Le jeu fonctionne 100% côté client.
- Pas de Node.js, .NET, PHP nécessaire
- Tout le code tourne dans le navigateur

### Pas de Container/Kubernetes
**Pourquoi ?** C'est un site statique simple.
- Azure Container Apps : ❌ Non nécessaire
- AKS : ❌ Overkill total
- Docker : ❌ Pas nécessaire

### Pas de VM (Virtual Machine)
**Pourquoi ?** Pas de serveur à gérer.
- Azure VM : ❌ Trop complexe et coûteux
- Hébergement statique suffit largement

---

## 🔮 Si vous voulez ajouter des features serveur (futur)

Si plus tard vous voulez ajouter :
- **Leaderboard en ligne** → Azure Functions (serverless, gratuit jusqu'à 1M requests)
- **Authentification** → Azure AD B2C ou Firebase Auth
- **Base de données cloud** → Azure Cosmos DB (gratuit tier) ou Firebase Firestore
- **API REST** → Azure Functions ou Azure API Management

Mais pour l'instant : **Pas besoin !**

---

## 📝 Fichier de déploiement Azure (workflow)

Quand vous créerez votre Azure Static Web App, ce fichier sera auto-généré :

```yaml
# .github/workflows/azure-static-web-apps-xxx.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
      
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/" 
          api_location: "" 
          output_location: ""
```

---

## ✅ Checklist avant déploiement

- [ ] Le jeu fonctionne en local (npm run dev)
- [ ] Pas de console.log en production
- [ ] Tous les chemins sont relatifs (pas de `C:\...`)
- [ ] Les assets sont dans le bon dossier
- [ ] Le fichier `.gitignore` est configuré
- [ ] README.md avec instructions
- [ ] License file (MIT recommandé)

---

## 🎉 Résumé

**Pour votre idle game :**
1. Choisissez **GitHub Pages** (le plus simple) ou **Azure Static Web Apps** (si vous voulez apprendre Azure)
2. **Aucun service payant nécessaire**
3. **Aucune base de données requise**
4. **Tout est gratuit**

Le jeu fonctionnera parfaitement avec juste de l'hébergement statique ! 🚀
