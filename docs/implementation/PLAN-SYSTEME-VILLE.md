# 🏘️ Plan : Système de Ville et d'Habitants

> **Date** : 18 Octobre 2025  
> **Inspiration** : Evolve Idle  
> **Objectif** : Système de gestion de population avec logements, nourriture et impôts

---

## 🎯 Vue d'Ensemble

### Concept Principal

Un système où les habitants génèrent des revenus (impôts) mais nécessitent :

- **Logements** pour vivre
- **Nourriture** pour survivre
- **Emplois** optionnels pour bonus

### Boucle de Gameplay

1. Construire des **Logements** → Augmente capacité population
2. Produire de la **Nourriture** → Nourrit les habitants
3. Collecter des **Impôts** → Revenus passifs en or
4. Développer des **Services** → Bonus divers

---

## 🏗️ Bâtiments à Ajouter

### 1. Logements (Housing)

#### 🏠 Cabane

- **Capacité** : 2 habitants
- **Coût** : 50 or, 30 bois
- **Temps construction** : Instantané
- **Débloqué** : Début du jeu

#### 🏘️ Maison

- **Capacité** : 5 habitants
- **Coût** : 200 or, 100 bois, 50 fer
- **Temps construction** : Instantané
- **Débloqué** : Niveau joueur 5

#### 🏛️ Manoir

- **Capacité** : 10 habitants
- **Coût** : 1000 or, 300 bois, 200 fer
- **Temps construction** : Instantané
- **Débloqué** : Niveau joueur 10

#### 🏰 Château

- **Capacité** : 25 habitants
- **Coût** : 5000 or, 1000 bois, 500 fer, 100 pierre
- **Temps construction** : Instantané
- **Débloqué** : Niveau joueur 20

---

### 2. Production de Nourriture

#### 🏹 Cabane de Chasse

- **Production** : 10 nourriture/min (niveau 1)
- **Coût** : 100 or, 50 bois
- **Scaling** : x2 par niveau
- **Débloqué** : Niveau joueur 3

#### 🌾 Ferme

- **Production** : 25 nourriture/min (niveau 1)
- **Coût** : 300 or, 150 bois, 50 fer
- **Scaling** : x2 par niveau
- **Débloqué** : Niveau joueur 8
- **Bonus** : +10% production si >= 10 habitants

#### 🎣 Quai de Pêche

- **Production** : 50 nourriture/min (niveau 1)
- **Coût** : 800 or, 200 bois, 100 fer
- **Scaling** : x2 par niveau
- **Débloqué** : Niveau joueur 15

---

### 3. Collecte d'Impôts

#### 💰 Bureau des Impôts

- **Production** : 5 or/minute/habitant (niveau 1)
- **Coût** : 500 or, 200 bois, 100 fer
- **Scaling** : +2 or/min par niveau
- **Débloqué** : Niveau joueur 5
- **Notes** : Nécessite des habitants logés ET nourris

#### 🏦 Hôtel des Finances

- **Production** : +50% revenus impôts
- **Coût** : 5000 or, 1000 bois, 500 fer
- **Unique** : Maximum 1
- **Débloqué** : Niveau joueur 25

---

### 4. Services et Bonus

#### 🎓 École

- **Effet** : +10% XP pour tous les métiers
- **Coût** : 2000 or, 500 bois, 200 fer
- **Requis** : 20 habitants minimum
- **Débloqué** : Niveau joueur 15

#### ⛪ Temple

- **Effet** : +15% chance de drop légendaire
- **Coût** : 3000 or, 800 bois, 400 fer, 100 gemmes
- **Requis** : 30 habitants minimum
- **Débloqué** : Niveau joueur 20

#### 🛡️ Caserne

- **Effet** : +20% dégâts en combat
- **Coût** : 2500 or, 600 bois, 400 fer
- **Requis** : 25 habitants minimum
- **Débloqué** : Niveau joueur 18

#### 🏥 Hôpital

- **Effet** : Les habitants consomment -25% nourriture
- **Coût** : 4000 or, 1000 bois, 500 fer
- **Requis** : 40 habitants minimum
- **Débloqué** : Niveau joueur 30

---

## 📊 Système de Population

### Mécaniques

#### Capacité de Logement

```
Capacité Totale = Σ (Nombre de bâtiments × Capacité)
Exemple: 3 Cabanes + 2 Maisons = (3×2) + (2×5) = 16 habitants max
```

#### Croissance de Population

- **Automatique** si : Logement disponible ET Nourriture > 0
- **Taux** : +1 habitant toutes les 30 secondes
- **Max** : Limité par capacité de logement

#### Consommation de Nourriture

```
Consommation = Population × 2 nourriture/min
Exemple: 10 habitants = 20 nourriture/min
```

#### Génération d'Impôts

```
Impôts = Population × Taux de base × Multiplicateurs
- Taux de base: 5 or/min (Bureau des Impôts niveau 1)
- Multiplicateur bureau: +2 or/min par niveau
- Multiplicateur finances: +50% si Hôtel construit
```

---

## 🎮 Intégration dans l'UI

### Onglet Ville - Sections

#### Section 1 : Vue d'Ensemble

```
┌─────────────────────────────────┐
│ 👥 Population: 45 / 50          │
│ 🍖 Nourriture: 850 / 1000       │
│ 💰 Impôts: +225 or/min          │
│ 📈 Croissance: +1 hab/30s       │
└─────────────────────────────────┘
```

#### Section 2 : Logements

```
🏠 Cabane (x3)       [+] Capacité: 6/6
🏘️ Maison (x2)       [+] Capacité: 10/10
🏛️ Manoir (x1)       [+] Capacité: 10/10
```

#### Section 3 : Nourriture

```
🏹 Cabane de Chasse (Niv 2)  [↑] +20 🍖/min
🌾 Ferme (Niv 1)             [↑] +25 🍖/min
```

#### Section 4 : Revenus

```
💰 Bureau des Impôts (Niv 3)  [↑] +7 💰/hab/min
🏦 Hôtel des Finances         [Construire]
```

#### Section 5 : Services

```
🎓 École                      [Construire]
⛪ Temple                     [🔒 Requis: 30 habitants]
```

---

## 🔧 Architecture Technique

### Fichiers à Créer/Modifier

#### 1. `src/config/city-buildings-data.js` (NOUVEAU)

```javascript
const CityBuildingsData = {
    // Logements
    hut: { ... },
    house: { ... },
    manor: { ... },
    castle: { ... },

    // Nourriture
    hunting_lodge: { ... },
    farm: { ... },
    fishing_dock: { ... },

    // Revenus
    tax_office: { ... },
    finance_hall: { ... },

    // Services
    school: { ... },
    temple: { ... },
    barracks: { ... },
    hospital: { ... }
}
```

#### 2. `src/js/city-manager.js` (NOUVEAU)

```javascript
class CityManager {
  constructor(game) {
    this.game = game;
    this.buildings = {};
    this.population = 0;
    this.maxPopulation = 0;
    this.food = 100;
    this.maxFood = 1000;
    this.taxRate = 5; // or/min par habitant
  }

  update(deltaTime) {
    this.produceFood(deltaTime);
    this.consumeFood(deltaTime);
    this.growPopulation(deltaTime);
    this.collectTaxes(deltaTime);
  }

  // Méthodes principales...
}
```

#### 3. Modifier `src/js/building-manager.js`

- Ajouter référence au CityManager
- Séparer logique bâtiments production vs ville

#### 4. Modifier `src/js/ui.js`

- Ajouter section "Ville - Habitants"
- Afficher stats population
- UI pour construire bâtiments ville

---

## 📈 Balance et Progression

### Early Game (Niv 1-10)

- **Focus** : Construire 2-3 Cabanes + Cabane de Chasse
- **Population** : 4-6 habitants
- **Revenus** : +20-30 or/min
- **Nourriture** : Simple équilibre

### Mid Game (Niv 11-25)

- **Focus** : Upgrade vers Maisons + Ferme
- **Population** : 15-30 habitants
- **Revenus** : +150-300 or/min
- **Services** : Débloquer École, Temple, Caserne

### Late Game (Niv 26+)

- **Focus** : Manoirs/Châteaux + Optimisation
- **Population** : 50-100+ habitants
- **Revenus** : +500-1000+ or/min
- **Services** : Tous services actifs

---

## ✅ Checklist d'Implémentation

### Phase 1 : Infrastructure

- [ ] Créer `city-buildings-data.js`
- [ ] Créer `city-manager.js`
- [ ] Ajouter système de nourriture
- [ ] Ajouter système de population

### Phase 2 : Bâtiments de Base

- [ ] Implémenter Logements (Cabane, Maison)
- [ ] Implémenter Cabane de Chasse
- [ ] Implémenter Bureau des Impôts

### Phase 3 : UI

- [ ] Créer section Vue d'Ensemble
- [ ] Créer section Logements
- [ ] Créer section Nourriture
- [ ] Créer section Revenus

### Phase 4 : Bâtiments Avancés

- [ ] Ajouter Manoir, Château
- [ ] Ajouter Ferme, Quai de Pêche
- [ ] Ajouter Hôtel des Finances
- [ ] Ajouter Services (École, Temple, etc.)

### Phase 5 : Balance & Polish

- [ ] Tester progression
- [ ] Ajuster coûts
- [ ] Ajuster production
- [ ] Tests complets

---

## 🎯 Objectifs de Gameplay

### Court Terme

- Donner un revenu passif alternatif au combat
- Introduire gestion de ressources (nourriture)
- Créer une boucle d'investissement

### Long Terme

- Débloquer bonus via services
- Créer synergie entre systèmes
- Ajouter profondeur stratégique

---

**Prêt à implémenter ! 🚀**
