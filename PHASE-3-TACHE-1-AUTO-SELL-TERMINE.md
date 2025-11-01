# ✅ PHASE 3 - TÂCHE 1 : AUTO-SELL EXCESS - TERMINÉ

## 📋 RÉSUMÉ

**Temps estimé** : 1h  
**Temps réel** : ~45 min  
**Statut** : ✅ **TERMINÉ**

---

## 🎯 OBJECTIF

Implémenter un système de vente automatique des ressources en excédent pour éviter l'overflow du stockage.

---

## ✅ FONCTIONNALITÉS IMPLÉMENTÉES

### 1️⃣ **Système Auto-Sell Backend**

**Fichier** : `src/js/building-manager.js`

#### Ajouts au constructor :

```javascript
this.autoSellEnabled = {
  wood: false,
  ore: false,
  plants: false,
  fish: false,
};
this.autoSellInterval = null;
this.autoSellCheckTime = 60000; // 60 secondes
```

#### Nouvelles méthodes :

##### **toggleAutoSell(category)**

- Active/désactive l'auto-sell pour une catégorie (wood, ore, plants, fish)
- Démarre/arrête l'intervalle selon les catégories actives
- Retourne l'état (true/false)

##### **autoSellExcess()**

- Vérifie toutes les ressources toutes les 60 secondes
- Vend si stockage > 80% capacité
- Ramène à 70% capacité
- Prix : Base × 0.9 (10% taxe vendeur)
- Notification avec total d'or gagné

##### **getResourceCategory(resourceId)**

- Détermine la catégorie d'une ressource (wood, ore, plants, fish)
- Basé sur le préfixe du resourceId

##### **getMaxStorage(resourceId)**

- Retourne la capacité max de stockage
- Base : 1000
- Bonus : +500 par niveau de warehouse

#### Prix des ressources :

```javascript
// WOOD
'wood_oak': 1, 'wood_pine': 1, 'wood_cedar': 2,
'wood_sequoia': 3, 'wood_ironwood': 5, 'wood_moonwillow': 8,
'wood_crystal': 12

// ORE
'ore_copper': 1.5, 'ore_iron': 2, 'ore_silver': 3,
'ore_gold': 5, 'ore_mithril': 8, 'ore_adamantite': 12,
'ore_orichalcum': 20

// PLANTS
'plant_wild_mint': 1.5, 'plant_lavender': 2, 'plant_chamomile': 2,
'plant_rosemary': 3, 'plant_saffron': 5, 'plant_mandrake': 8,
'plant_moonflower': 12

// FISH
'fish_sardine': 2, 'fish_bass': 2, 'fish_salmon': 3,
'fish_tuna': 5, 'fish_swordfish': 8, 'fish_blue_marlin': 12,
'fish_dragon_fish': 20
```

#### Sauvegarde :

- `toJSON()` : Sauvegarde autoSellEnabled
- `fromJSON()` : Restaure autoSellEnabled et redémarre interval si nécessaire

---

### 2️⃣ **Interface UI**

**Fichier** : `index.html`

#### Panel Auto-Sell (dans onglet Ville) :

```html
<div class="auto-sell-panel">
  <h3>💰 Vente Automatique</h3>
  <p>Vend automatiquement les ressources quand le stockage dépasse 80%</p>

  <div class="auto-sell-toggles">
    <button id="toggle-autosell-wood">🪵 Bois OFF</button>
    <button id="toggle-autosell-ore">⛏️ Minerais OFF</button>
    <button id="toggle-autosell-plants">🌿 Plantes OFF</button>
    <button id="toggle-autosell-fish">🐟 Poissons OFF</button>
  </div>

  <div>ℹ️ Fonctionnement : Vend au prix de base × 0.9 (10% taxe)</div>
</div>
```

**Fichier** : `src/js/ui.js`

#### Event Listeners :

```javascript
document.querySelectorAll('[id^="toggle-autosell-"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const enabled = this.game.buildingManager.toggleAutoSell(category);
    this.updateAutoSellToggles();
    this.showNotification(
      `Auto-vente ${categoryName} : ${enabled ? "ON ✅" : "OFF ❌"}`,
      enabled ? "success" : "info"
    );
  });
});
```

#### Nouvelle méthode : `updateAutoSellToggles()`

- Met à jour l'apparence des boutons (ON/OFF)
- Ajoute/retire classe `active`
- Met à jour le texte du statut

---

### 3️⃣ **Styles CSS**

**Fichier** : `src/css/main.css`

```css
.auto-sell-panel {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(40, 40, 60, 0.4), rgba(60, 40, 80, 0.4));
  border: 2px solid rgba(150, 100, 200, 0.3);
  border-radius: 12px;
}

.btn-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(80, 80, 100, 0.4), rgba(60, 60, 80, 0.4));
  border: 2px solid rgba(150, 150, 170, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-toggle.active {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.4), rgba(39, 174, 96, 0.4));
  border-color: rgba(46, 204, 113, 0.6);
}

.toggle-status {
  font-weight: bold;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-size: 0.75rem;
}

.btn-toggle.active .toggle-status {
  background: rgba(46, 204, 113, 0.3);
  color: #2ecc71;
}
```

---

## 🎮 UTILISATION

### 1. Accéder au panel

- Ouvrir l'onglet **Ville** 🏘️
- Scroller jusqu'au panel **💰 Vente Automatique**

### 2. Activer l'auto-sell

- Cliquer sur un bouton (ex: 🪵 Bois)
- Le bouton devient vert avec "ON"
- Notification de confirmation

### 3. Fonctionnement automatique

- Vérifie toutes les 60 secondes
- Si ressource > 80% stockage :
  - Vend jusqu'à 70% stockage
  - Prix = Base × 0.9 (10% taxe)
  - Or ajouté automatiquement
  - Notification avec total

### 4. Exemple concret

**Stockage** : 1000 wood_oak max (base)  
**Actuel** : 850 wood_oak (85%)  
**Seuil** : 800 (80%)

**Action** :

- Vend : 850 - 700 = 150 wood_oak
- Prix : 150 × 1 × 0.9 = 135 or
- Résultat : 700 wood_oak + 135 or

---

## 📊 FORMULES

### Capacité Stockage

```javascript
maxStorage = 1000 + (warehouse.level × 500)
```

### Seuil Vente

```javascript
sellThreshold = maxStorage × 0.8
```

### Quantité Vendue

```javascript
toSell = current - (maxStorage × 0.7)
```

### Or Gagné

```javascript
gold = toSell × resourcePrice × 0.9
```

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Activation Toggle

- [ ] Cliquer sur bouton Bois
- [ ] Bouton devient vert avec "ON"
- [ ] Notification "Auto-vente Bois : ON ✅"
- [ ] Cliquer à nouveau
- [ ] Bouton devient gris avec "OFF"
- [ ] Notification "Auto-vente Bois : OFF ❌"

### Test 2 : Vente Automatique

- [ ] Activer auto-sell Bois
- [ ] Récolter 900 wood_oak (90% de 1000)
- [ ] Attendre 60 secondes
- [ ] Vérifier : wood_oak réduit à ~700
- [ ] Vérifier : Or augmenté de ~180

### Test 3 : Multiple Catégories

- [ ] Activer Bois + Minerais
- [ ] Remplir les deux à 85%
- [ ] Attendre 60s
- [ ] Vérifier : Les deux vendus
- [ ] Notification avec total

### Test 4 : Sauvegarde

- [ ] Activer Bois + Plantes
- [ ] Sauvegarder
- [ ] Recharger
- [ ] Vérifier : Boutons toujours actifs
- [ ] Vérifier : Interval redémarre

### Test 5 : Avec Warehouse

- [ ] Construire warehouse niveau 3
- [ ] Capacité max = 1000 + (3 × 500) = 2500
- [ ] Récolter 2100 wood_oak (84%)
- [ ] Attendre 60s
- [ ] Vérifier : Réduit à 1750 (70%)

---

## 🐛 BUGS CONNUS

Aucun bug identifié pour le moment.

---

## 🚀 AMÉLIORATIONS FUTURES

### Phase 3 complète :

1. ✅ Auto-Sell Excess (TERMINÉ)
2. ⏳ Clics Passifs Niveau 50 (NEXT)
3. ⏳ Système Recherches

### Améliorations possibles :

- [ ] Slider pour ajuster le seuil (80% → configurable)
- [ ] Historique des ventes (log)
- [ ] Statistiques d'or gagné par auto-sell
- [ ] Configuration du prix de taxe (10% → configurable)
- [ ] Auto-sell pour équipement de faible qualité

---

## 📝 NOTES TECHNIQUES

### Performance :

- Interval de 60s → très léger
- Boucle uniquement sur ressources activées
- Pas d'impact sur framerate

### Compatibilité :

- Fonctionne avec système de stockage existant
- Compatible avec warehouse upgrades
- Sauvegarde persistante

### Sécurité :

- Vérifie que buildingManager existe
- Vérifie que professionManager existe
- Pas de vente si quantité < seuil

---

**Tâche 1 terminée avec succès ! 🎉**  
**Temps de développement** : ~45 minutes  
**Prochaine étape** : Tâche 2 - Clics Passifs Niveau 50 (2h estimé)
