# 🎨 Guide d'Interface Utilisateur - Idle Game

## 🎯 Principes de design pour idle games

### Hiérarchie visuelle
- **Cookie counter** : Élément le plus proéminent (grande police, couleur vive)
- **Bouton de clic** : Facilement accessible, feedback visuel immédiat
- **Bâtiments** : Liste organisée avec informations claires (coût, production)
- **Upgrades** : Groupées logiquement, état visible (acheté/disponible/locked)

### Feedback utilisateur
- **Clics** : Animation du bouton + particules/nombres qui apparaissent
- **Achats** : Transition smooth + son + mise à jour immédiate des stats
- **Progression** : Barres de progression, notifications de déblocage
- **État** : Couleurs différentes selon disponibilité (vert=achetable, gris=trop cher, or=acheté)

## 🎨 Palette de couleurs recommandée

```css
:root {
  /* Couleurs principales */
  --primary-gold: #FFD700;
  --primary-dark: #2C1810;
  --primary-light: #F5E6D3;
  
  /* États */
  --success-green: #4CAF50;
  --warning-orange: #FF9800;
  --error-red: #F44336;
  --disabled-gray: #9E9E9E;
  
  /* UI */
  --background-dark: #1A1A1A;
  --background-medium: #2D2D2D;
  --background-light: #3D3D3D;
  --text-primary: #FFFFFF;
  --text-secondary: #CCCCCC;
  --border-color: #444444;
}
```

## 📱 Layout responsive

### Structure générale
```
[Header - Cookie Counter & Stats]
[Main Clicker Button]
[Sidebar - Buildings & Upgrades]
[Footer - Options & Save Info]
```

### Breakpoints
- **Mobile** : < 768px → Layout vertical, sidebar devient onglets
- **Tablet** : 768px - 1024px → Layout hybride
- **Desktop** : > 1024px → Layout sidebar classique

## 🧩 Composants UI essentiels

### 1. Cookie Counter
```html
<div class="cookie-counter">
  <div class="cookie-amount">1,234,567</div>
  <div class="cookie-per-second">per second: 890</div>
</div>
```

### 2. Building Card
```html
<div class="building-card" data-building="cursor">
  <img src="cursor-icon.png" alt="Cursor" class="building-icon">
  <div class="building-info">
    <h3 class="building-name">Cursor</h3>
    <p class="building-description">Clicks automatically</p>
    <div class="building-stats">
      <span class="building-count">Owned: 15</span>
      <span class="building-production">Produces: 150/s</span>
    </div>
  </div>
  <div class="building-purchase">
    <div class="building-cost">Cost: 1,500</div>
    <button class="buy-button" data-action="buy-building">BUY</button>
  </div>
</div>
```

### 3. Upgrade Panel
```html
<div class="upgrade-panel">
  <h2>Upgrades</h2>
  <div class="upgrade-grid">
    <div class="upgrade-item available" data-upgrade="cursor-upgrade-1">
      <img src="upgrade-icon.png" alt="Upgrade">
      <div class="upgrade-tooltip">
        <h4>Double Cursor Power</h4>
        <p>Cursors are twice as efficient</p>
        <span class="upgrade-cost">Cost: 10,000</span>
      </div>
    </div>
  </div>
</div>
```

## 🎭 Animations et transitions

### Animations de clic
```css
@keyframes click-animation {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.main-button:active {
  animation: click-animation 0.1s ease-out;
}
```

### Transitions d'achat
```css
.building-card {
  transition: all 0.3s ease;
}

.building-card.just-bought {
  transform: scale(1.05);
  box-shadow: 0 0 20px var(--primary-gold);
}
```

### Particules de clic
```javascript
function createClickParticle(x, y, value) {
  const particle = document.createElement('div');
  particle.className = 'click-particle';
  particle.textContent = '+' + formatNumber(value);
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  
  document.body.appendChild(particle);
  
  // Animation CSS + suppression automatique
  setTimeout(() => particle.remove(), 1000);
}
```

## 📊 Affichage des nombres

### Formatage des grands nombres
```javascript
function formatNumber(num) {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
  
  if (num < 1000) return num.toFixed(0);
  
  const tier = Math.floor(Math.log10(num) / 3);
  const suffix = suffixes[tier] || 'e' + (tier * 3);
  const scale = Math.pow(10, tier * 3);
  
  return (num / scale).toFixed(2) + suffix;
}
```

### Animations de compteur
```javascript
function animateNumber(element, from, to, duration = 1000) {
  const start = performance.now();
  
  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    const current = from + (to - from) * easeOutQuart(progress);
    element.textContent = formatNumber(Math.floor(current));
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

## 🎛️ États des éléments UI

### Système de classes CSS
```css
/* États des boutons d'achat */
.buy-button.affordable { 
  background: var(--success-green);
  cursor: pointer;
}

.buy-button.too-expensive { 
  background: var(--disabled-gray);
  cursor: not-allowed;
  opacity: 0.6;
}

.buy-button.max-level {
  background: var(--primary-gold);
  cursor: default;
}

/* États des bâtiments */
.building-card.locked {
  opacity: 0.5;
  filter: grayscale(1);
}

.building-card.unlocked {
  opacity: 1;
  filter: none;
  animation: unlock-glow 1s ease-out;
}
```

## 🔧 Prompts spécifiques pour l'UI

### Pour créer un nouveau composant :
```
"Créer un composant [nom du composant] pour l'idle game avec :
- Structure HTML sémantique
- Styles CSS responsive avec les variables CSS définies
- Animations fluides et accessibles
- États visuels clairs (disponible/indisponible/acheté)
- Intégration avec le système d'événements existant"
```

### Pour améliorer l'UX :
```
"Améliorer l'expérience utilisateur de [composant] en ajoutant :
- Feedback visuel immédiat sur les interactions
- Transitions smoothes entre les états
- Tooltips informatifs
- Raccourcis clavier appropriés
- Accessibilité (ARIA labels, contraste)"
```

### Pour optimiser les performances UI :
```
"Optimiser les performances d'affichage de [composant] :
- Réduire les reflows/repaints
- Utiliser CSS transforms au lieu de layout properties
- Implémenter lazy loading si nécessaire
- Gérer efficacement les event listeners"
```

## 📐 Guidelines de mise en page

### Espacements
- **Marge externe** : 16px (mobile), 24px (desktop)
- **Marge interne** : 12px (petits éléments), 20px (grands éléments)
- **Espacement vertical** : 16px entre sections
- **Espacement horizontal** : 12px entre éléments liés

### Typographie
- **Titre principal** : 2.5rem, bold
- **Compteur de cookies** : 3rem, bold
- **Titres de section** : 1.5rem, semi-bold
- **Texte normal** : 1rem, regular
- **Texte secondaire** : 0.875rem, regular

### Tailles d'éléments
- **Boutons principaux** : min-height 44px (touchable)
- **Boutons secondaires** : min-height 36px
- **Icônes** : 24px x 24px (petites), 48px x 48px (moyennes)
- **Cards** : min-width 280px, max-width 400px