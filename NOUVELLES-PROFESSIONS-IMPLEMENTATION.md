# 🎯 Implémentation des Nouvelles Professions - Guide Complet

## 📋 Vue d'ensemble

Ce document résume l'implémentation complète du nouveau système de professions pour Nyln'ato Idle RPG v0.1.0-alpha.

---

## ✅ Travaux Terminés

### 1. 📦 Nouvelles Ressources Ajoutées (60 items)

#### 🌿 Plantes (20 items) - `resources-data.js`

Ajoutées pour la profession **Herboriste**:

- **Tier 1**: Feuille de Pissenlit, Menthe Sauvage, Thym Commun, Trèfle à Trois Feuilles
- **Tier 2**: Camomille des Champs, Sauge Argentée, Racine de Bardane, Fleur de Lavande
- **Tier 3**: Belladone des Marais, Champignon Lumineux, Orchidée Noire, Mousse de Chêne Ancien
- **Tier 4**: Racine de Mandragore, Pétale de Rose Éternelle, Baie de Sureau Doré, Écorce d'Arbre-Monde
- **Tier 5**: Essence de l'Ancien Monde, Fleur de Lotus Céleste, Racine du Chaos, Herbe du Néant

#### 🐟 Poissons (20 items) - `resources-data.js`

Ajoutés pour la profession **Pêcheur**:

- **Tier 1**: Poisson de ruisseau, Truite commune, Perche, Gardon
- **Tier 2**: Brochet, Carpe dorée, Anguille, Saumon argenté
- **Tier 3**: Esturgeon, Poisson-chat géant, Piranha des profondeurs, Raie électrique
- **Tier 4**: Thon rouge, Requin blanc, Espadon, Poisson-lune
- **Tier 5**: Âme de l'océan, Léviathan miniature, Kraken bébé, Poisson du vide

#### 🧵 Tissus (20 items) - `resources-data.js`

Ajoutés pour le bâtiment **Ferme** (production automatique):

- **Tier 1**: Fibre de Lin, Laine de Mouton, Coton Brut, Soie de Ver à Soie
- **Tier 2**: Tissu de Lin, Laine Cardée, Coton Filé, Soie Fine
- **Tier 3**: Velours, Satin, Brocart, Damas
- **Tier 4**: Tissu Enchanté, Soie Lunaire, Laine Céleste, Coton Étoilé
- **Tier 5**: Tissu du Néant, Étoffe Dimensionnelle, Fibre Temporelle, Tissu Éternel

---

### 2. 👷 Nouvelles Professions (7 professions)

#### Professions de Récolte (Gathering)

**🌿 Herboriste** - `profession-manager.js`

- Type: `plants`
- XP par action: 10
- Cadence auto-récolte: 3 secondes
- Bouton UI: "🌱 Cueillir des Plantes"
- Objectif: Récolter des plantes médicinales et magiques

**🎣 Pêcheur** - `profession-manager.js`

- Type: `fish`
- XP par action: 15
- Cadence auto-récolte: **5 secondes** (plus lent que les autres)
- Bouton UI: "🐟 Pêcher du Poisson"
- Objectif: Attraper des poissons pour la cuisine

#### Professions de Craft (Crafting)

**🧪 Alchimiste** - `profession-manager.js`

- Type: `alchemy`
- XP par craft: 15
- Recettes: Potions de restauration et buffs (à partir de plantes)
- Bouton UI: Carte de profession dans l'onglet Fabrication
- Objectif: Créer des potions à partir de plantes

**🍽️ Poissonnier** - `profession-manager.js`

- Type: `cooking`
- XP par craft: 15
- Recettes: Plats de poisson (restauration + buffs)
- Bouton UI: Carte de profession dans l'onglet Fabrication
- Objectif: Cuisiner des plats à partir de poissons

**🧵 Tailleur** - `profession-manager.js`

- Type: `tailoring`
- XP par craft: 15
- Recettes: Vêtements et armures légères (à partir de tissus)
- Bouton UI: Carte de profession dans l'onglet Fabrication
- Objectif: Confectionner des vêtements et armures

**⚗️ Transmutation** - `profession-manager.js`

- Type: `transmutation`
- XP par transmutation: 20
- Système existant renommé
- Objectif: Convertir des ressources en d'autres ressources

---

### 3. 🎨 Interface Utilisateur (HTML)

#### Onglet Récolte - `index.html`

✅ Ajout de 2 nouvelles tuiles de profession:

```html
<!-- Herboriste -->
<div class="profession-tile" id="profession-herbalist">
  <div class="profession-icon">🌿</div>
  <h3 class="profession-name">Herboriste</h3>
  <!-- Niveau, XP, Boutons -->
</div>

<!-- Pêcheur -->
<div class="profession-tile" id="profession-fisher">
  <div class="profession-icon">🎣</div>
  <h3 class="profession-name">Pêcheur</h3>
  <!-- Niveau, XP, Boutons -->
</div>
```

✅ Ajout de filtres d'inventaire:

- 🌿 Plantes
- 🐟 Poissons

#### Onglet Fabrication - `index.html`

✅ Ajout de 3 nouvelles cartes de profession:

```html
<!-- Alchimiste -->
<div class="crafting-profession-card craft-profession-card" data-profession="alchemist">
  <div class="profession-icon">🧪</div>
  <h4>Alchimiste</h4>
  <!-- Niveau, XP -->
</div>

<!-- Poissonnier -->
<div class="crafting-profession-card craft-profession-card" data-profession="fishmonger">
  <div class="profession-icon">🍽️</div>
  <h4>Poissonnier</h4>
  <!-- Niveau, XP -->
</div>

<!-- Tailleur -->
<div class="crafting-profession-card craft-profession-card" data-profession="tailor">
  <div class="profession-icon">🧵</div>
  <h4>Tailleur</h4>
  <!-- Niveau, XP -->
</div>
```

✅ Ajout de filtres de recettes:

- 🧪 Potions
- 🍽️ Plats
- 🧵 Vêtements

#### Navigation - `index.html`

✅ Renommage du bouton onglet:

- ~~🧪 Alchimie~~ → **⚗️ Transmutation**

✅ Mise à jour du titre de section:

- `<h2>⚗️ Transmutation</h2>`

---

### 4. ⚙️ Configuration Backend

#### `profession-manager.js`

✅ Mise à jour de `autoGatherState`:

```javascript
autoGatherState: {
    woodcutter: false,
    miner: false,
    herbalist: false,  // NOUVEAU
    fisher: false       // NOUVEAU
}
```

✅ Ajout dans `initProfessions()`:

```javascript
// Herboriste
herbalist: {
    level: 1,
    xp: 0,
    type: 'plants',
    xpPerAction: 10
},

// Pêcheur
fisher: {
    level: 1,
    xp: 0,
    type: 'fish',
    xpPerAction: 15
},

// Alchimiste
alchemist: {
    level: 1,
    xp: 0,
    type: 'alchemy',
    xpPerCraft: 15
},

// Poissonnier
fishmonger: {
    level: 1,
    xp: 0,
    type: 'cooking',
    xpPerCraft: 15
},

// Tailleur
tailor: {
    level: 1,
    xp: 0,
    type: 'tailoring',
    xpPerCraft: 15
},

// Transmutation
transmutation: {
    level: 1,
    xp: 0,
    type: 'transmutation',
    xpPerAction: 20
}
```

✅ Modification de `startAutoGather()`:

- Support pour différentes cadences de récolte
- Pêcheur: 5000ms (5 secondes)
- Autres: 3000ms (3 secondes)

---

## 🔄 Travaux en Cours / À Faire

### 1. 🏗️ Bâtiment Ferme (Farm)

**Objectif**: Production automatique de tissus pour le Tailleur

**À créer dans `buildings-data.js`**:

```javascript
{
    id: 'farm',
    name: 'Ferme',
    icon: '🐑',
    category: 'production',
    description: 'Élève des animaux et cultive du lin pour produire des tissus',
    baseCost: {
        wood: 500,
        ore: 300,
        gold: 1000
    },
    baseProduction: {
        // Produit automatiquement des tissus de Tier 1
        'fabric-tier1-linen': 1,      // Fibre de Lin - 1 par minute
        'fabric-tier1-wool': 1,        // Laine de Mouton - 1 par minute
        'fabric-tier1-cotton': 0.5,    // Coton Brut - 0.5 par minute
        'fabric-tier1-silk': 0.2       // Soie de Ver à Soie - 0.2 par minute
    },
    productionInterval: 60000, // 60 secondes
    maxLevel: 10,
    unlockCondition: {
        playerLevel: 15,
        questCompleted: 'unlock_professions_tier2'
    }
}
```

**Actions nécessaires**:

- [ ] Ajouter la définition du bâtiment dans `buildings-data.js`
- [ ] Créer l'UI dans l'onglet Ville
- [ ] Implémenter la logique de production dans `BuildingManager`
- [ ] Ajouter les upgrades de niveau (production +20% par niveau)

---

### 2. 📜 Recettes de Craft

#### 🧪 Alchimiste - Potions

**À créer dans `craft-recipes-data.js`**:

**Potions de Restauration**:

```javascript
// Tier 1: Petite Potion de Vie
{
    id: 'potion-health-small',
    name: 'Petite Potion de Vie',
    profession: 'alchemist',
    category: 'potion',
    tier: 1,
    requirements: {
        'plant-tier1-dandelion': 5,
        'plant-tier1-mint': 3
    },
    result: {
        id: 'potion-health-small',
        effect: { hp: 50 }
    }
}

// Tier 2: Potion de Vie
{
    id: 'potion-health-medium',
    name: 'Potion de Vie',
    profession: 'alchemist',
    category: 'potion',
    tier: 2,
    requirements: {
        'plant-tier2-chamomile': 5,
        'plant-tier2-sage': 3,
        'potion-health-small': 2
    },
    result: {
        id: 'potion-health-medium',
        effect: { hp: 150 }
    }
}

// Tier 3: Grande Potion de Vie
{
    id: 'potion-health-large',
    name: 'Grande Potion de Vie',
    profession: 'alchemist',
    category: 'potion',
    tier: 3,
    requirements: {
        'plant-tier3-belladonna': 5,
        'plant-tier3-mushroom': 3,
        'potion-health-medium': 2
    },
    result: {
        id: 'potion-health-large',
        effect: { hp: 300 }
    }
}
```

**Potions de Buff**:

```javascript
// Potion de Force (ATK +10%)
{
    id: 'potion-strength',
    name: 'Potion de Force',
    profession: 'alchemist',
    category: 'potion',
    tier: 2,
    requirements: {
        'plant-tier2-sage': 5,
        'plant-tier1-thyme': 10
    },
    result: {
        id: 'potion-strength',
        effect: { atkBonus: 0.1, duration: 300 } // 5 minutes
    }
}

// Potion de Défense (DEF +10%)
{
    id: 'potion-defense',
    name: 'Potion de Défense',
    profession: 'alchemist',
    category: 'potion',
    tier: 2,
    requirements: {
        'plant-tier2-burdock': 5,
        'plant-tier1-clover': 10
    },
    result: {
        id: 'potion-defense',
        effect: { defBonus: 0.1, duration: 300 } // 5 minutes
    }
}

// Potion de Vitesse (SPD +15%)
{
    id: 'potion-speed',
    name: 'Potion de Vitesse',
    profession: 'alchemist',
    category: 'potion',
    tier: 3,
    requirements: {
        'plant-tier3-orchid': 3,
        'plant-tier2-lavender': 8
    },
    result: {
        id: 'potion-speed',
        effect: { spdBonus: 0.15, duration: 300 } // 5 minutes
    }
}
```

#### 🍽️ Poissonnier - Plats de Poisson

**À créer dans `craft-recipes-data.js`**:

**Plats de Restauration**:

```javascript
// Tier 1: Poisson Grillé
{
    id: 'food-fish-grilled',
    name: 'Poisson Grillé',
    profession: 'fishmonger',
    category: 'food',
    tier: 1,
    requirements: {
        'fish-tier1-stream': 3
    },
    result: {
        id: 'food-fish-grilled',
        effect: { hp: 40, mana: 20 }
    }
}

// Tier 2: Soupe de Poisson
{
    id: 'food-fish-soup',
    name: 'Soupe de Poisson',
    profession: 'fishmonger',
    category: 'food',
    tier: 2,
    requirements: {
        'fish-tier2-pike': 2,
        'fish-tier2-carp': 2,
        'plant-tier1-thyme': 5
    },
    result: {
        id: 'food-fish-soup',
        effect: { hp: 120, mana: 60 }
    }
}

// Tier 3: Sushi de Qualité
{
    id: 'food-sushi-quality',
    name: 'Sushi de Qualité',
    profession: 'fishmonger',
    category: 'food',
    tier: 3,
    requirements: {
        'fish-tier3-tuna': 2,
        'fish-tier3-salmon': 2
    },
    result: {
        id: 'food-sushi-quality',
        effect: { hp: 250, mana: 150 }
    }
}
```

**Plats de Buff**:

```javascript
// Ragoût de Poisson (HP Regen +5/s)
{
    id: 'food-fish-stew',
    name: 'Ragoût de Poisson',
    profession: 'fishmonger',
    category: 'food',
    tier: 2,
    requirements: {
        'fish-tier2-eel': 3,
        'plant-tier2-sage': 5
    },
    result: {
        id: 'food-fish-stew',
        effect: { hpRegen: 5, duration: 300 } // 5 minutes
    }
}

// Festin de la Mer (All Stats +5%)
{
    id: 'food-sea-feast',
    name: 'Festin de la Mer',
    profession: 'fishmonger',
    category: 'food',
    tier: 4,
    requirements: {
        'fish-tier4-swordfish': 1,
        'fish-tier4-shark': 1,
        'plant-tier3-belladonna': 3
    },
    result: {
        id: 'food-sea-feast',
        effect: {
            atkBonus: 0.05,
            defBonus: 0.05,
            spdBonus: 0.05,
            duration: 600 // 10 minutes
        }
    }
}
```

#### 🧵 Tailleur - Vêtements et Armures

**À créer dans `craft-recipes-data.js`**:

**Armures Légères**:

```javascript
// Tier 1: Tunique de Lin
{
    id: 'armor-linen-tunic',
    name: 'Tunique de Lin',
    profession: 'tailor',
    category: 'cloth',
    slot: 'chest',
    tier: 1,
    requirements: {
        'fabric-tier1-linen': 10,
        'fabric-tier1-wool': 5
    },
    result: {
        id: 'armor-linen-tunic',
        stats: { def: 5, hp: 20 }
    }
}

// Tier 2: Robe de Satin
{
    id: 'armor-satin-robe',
    name: 'Robe de Satin',
    profession: 'tailor',
    category: 'cloth',
    slot: 'chest',
    tier: 2,
    requirements: {
        'fabric-tier2-satin': 15,
        'fabric-tier2-silk': 8
    },
    result: {
        id: 'armor-satin-robe',
        stats: { def: 15, hp: 60, mana: 30 }
    }
}

// Tier 3: Armure de Velours Enchantée
{
    id: 'armor-velvet-enchanted',
    name: 'Armure de Velours Enchantée',
    profession: 'tailor',
    category: 'cloth',
    slot: 'chest',
    tier: 3,
    requirements: {
        'fabric-tier3-velvet': 20,
        'fabric-tier3-brocade': 15,
        'gem-sapphire': 3
    },
    result: {
        id: 'armor-velvet-enchanted',
        stats: { def: 30, hp: 150, mana: 80, spd: 5 }
    }
}
```

**Accessoires**:

```javascript
// Tier 2: Cape de Voyage
{
    id: 'accessory-travel-cloak',
    name: 'Cape de Voyage',
    profession: 'tailor',
    category: 'cloth',
    slot: 'back',
    tier: 2,
    requirements: {
        'fabric-tier2-wool': 12,
        'fabric-tier2-cotton': 8
    },
    result: {
        id: 'accessory-travel-cloak',
        stats: { def: 8, spd: 3 }
    }
}

// Tier 4: Manteau Céleste
{
    id: 'accessory-celestial-mantle',
    name: 'Manteau Céleste',
    profession: 'tailor',
    category: 'cloth',
    slot: 'back',
    tier: 4,
    requirements: {
        'fabric-tier4-moonsilk': 25,
        'fabric-tier4-celestial': 15,
        'gem-diamond': 5
    },
    result: {
        id: 'accessory-celestial-mantle',
        stats: { def: 40, hp: 100, mana: 100, spd: 10, allStats: 5 }
    }
}
```

**Actions nécessaires**:

- [ ] Créer le fichier `craft-recipes-data.js` s'il n'existe pas
- [ ] Ajouter toutes les recettes ci-dessus
- [ ] Implémenter la logique de craft dans `ProfessionManager`
- [ ] Ajouter la gestion des buffs temporaires dans `Player` ou `BuffManager`

---

### 3. 🎮 Mise à Jour de l'UI JavaScript

#### `ui.js` - Méthodes à Modifier

**`updateProfessions()`**:

```javascript
updateProfessions() {
    // ... code existant pour woodcutter, miner ...

    // AJOUTER: Herboriste
    if (this.game.professionManager.professions.herbalist) {
        const herbalist = this.game.professionManager.professions.herbalist;
        document.getElementById('herbalist-level').textContent = herbalist.level;
        document.getElementById('herbalist-xp').textContent = Math.floor(herbalist.xp);
        document.getElementById('herbalist-xp-required').textContent = herbalist.xpToNextLevel;
        const herbalistProgress = (herbalist.xp / herbalist.xpToNextLevel) * 100;
        document.getElementById('herbalist-xp-bar').style.width = `${herbalistProgress}%`;

        // Mise à jour du bouton auto-récolte
        const btnAutoHerbalist = document.getElementById('btn-auto-herbalist');
        if (this.game.professionManager.autoGatherState.herbalist) {
            btnAutoHerbalist.disabled = false;
            btnAutoHerbalist.classList.add('active');
            btnAutoHerbalist.querySelector('.btn-label').textContent = '⚡ Auto-Récolte Active';
        }
    }

    // AJOUTER: Pêcheur
    if (this.game.professionManager.professions.fisher) {
        const fisher = this.game.professionManager.professions.fisher;
        document.getElementById('fisher-level').textContent = fisher.level;
        document.getElementById('fisher-xp').textContent = Math.floor(fisher.xp);
        document.getElementById('fisher-xp-required').textContent = fisher.xpToNextLevel;
        const fisherProgress = (fisher.xp / fisher.xpToNextLevel) * 100;
        document.getElementById('fisher-xp-bar').style.width = `${fisherProgress}%`;

        // Mise à jour du bouton auto-récolte
        const btnAutoFisher = document.getElementById('btn-auto-fisher');
        if (this.game.professionManager.autoGatherState.fisher) {
            btnAutoFisher.disabled = false;
            btnAutoFisher.classList.add('active');
            btnAutoFisher.querySelector('.btn-label').textContent = '⚡ Auto-Récolte Active';
        }
    }

    // AJOUTER: Mise à jour des professions de craft
    ['alchemist', 'fishmonger', 'tailor'].forEach(profId => {
        if (this.game.professionManager.professions[profId]) {
            const prof = this.game.professionManager.professions[profId];
            const xpBar = document.getElementById(`${profId}-xp-bar`);
            if (xpBar) {
                const progress = (prof.xp / prof.xpToNextLevel) * 100;
                xpBar.style.width = `${progress}%`;
            }
        }
    });
}
```

**`onProfessionClick(professionId)`**:

```javascript
onProfessionClick(professionId) {
    // ... code existant ...

    // AJOUTER: Support pour herbalist et fisher
    if (professionId === 'herbalist' || professionId === 'fisher') {
        const btn = document.getElementById(`btn-${professionId}`);
        if (btn) {
            btn.disabled = true;
            setTimeout(() => {
                btn.disabled = false;
            }, professionId === 'fisher' ? 5000 : 3000); // Fisher plus lent
        }
    }
}
```

**`onAutoGatherClick(professionId)`**:

```javascript
onAutoGatherClick(professionId) {
    // ... code existant ...

    // AJOUTER: Support pour herbalist et fisher
    if (professionId === 'herbalist' || professionId === 'fisher') {
        const canUnlock = this.game.professionManager.unlockAutoGather(professionId);
        if (canUnlock) {
            this.game.professionManager.startAutoGather(professionId);
            this.updateProfessions();
            this.updateInventory();
        }
    }
}
```

**Actions nécessaires**:

- [ ] Modifier `updateProfessions()` dans `ui.js`
- [ ] Modifier `onProfessionClick()` dans `ui.js`
- [ ] Modifier `onAutoGatherClick()` dans `ui.js`
- [ ] Ajouter les event listeners pour les nouveaux boutons

---

### 4. 💾 Gestion du Stockage

#### `storage-manager.js` - Limites à Ajouter

**Actions nécessaires**:

- [ ] Ajouter les limites de stockage pour les nouvelles ressources:

```javascript
initStorageLimits() {
    // ... existant ...

    // AJOUTER: Limites pour plantes
    this.storageLimits['plants'] = {
        tier1: 100,
        tier2: 50,
        tier3: 25,
        tier4: 10,
        tier5: 5
    };

    // AJOUTER: Limites pour poissons
    this.storageLimits['fish'] = {
        tier1: 100,
        tier2: 50,
        tier3: 25,
        tier4: 10,
        tier5: 5
    };

    // AJOUTER: Limites pour tissus
    this.storageLimits['fabrics'] = {
        tier1: 100,
        tier2: 50,
        tier3: 25,
        tier4: 10,
        tier5: 5
    };
}
```

---

### 5. 📊 Système de Buffs

#### Nouveau Manager à Créer: `buff-manager.js`

**Objectif**: Gérer les buffs temporaires des potions et plats

**Actions nécessaires**:

- [ ] Créer `src/js/buff-manager.js`
- [ ] Implémenter la logique de buffs temporaires:

```javascript
class BuffManager {
  constructor(player) {
    this.player = player;
    this.activeBuffs = [];
  }

  applyBuff(buffData) {
    const buff = {
      id: buffData.id,
      effect: buffData.effect,
      duration: buffData.duration || 0,
      startTime: Date.now(),
    };

    this.activeBuffs.push(buff);
    this.applyBuffEffect(buff);

    if (buff.duration > 0) {
      setTimeout(() => {
        this.removeBuff(buff.id);
      }, buff.duration * 1000);
    }
  }

  applyBuffEffect(buff) {
    // Appliquer les bonus aux stats du joueur
    if (buff.effect.atkBonus) {
      this.player.stats.atk *= 1 + buff.effect.atkBonus;
    }
    if (buff.effect.defBonus) {
      this.player.stats.def *= 1 + buff.effect.defBonus;
    }
    if (buff.effect.spdBonus) {
      this.player.stats.spd *= 1 + buff.effect.spdBonus;
    }
    if (buff.effect.hpRegen) {
      this.startHpRegen(buff.effect.hpRegen, buff.duration);
    }
  }

  removeBuff(buffId) {
    const buff = this.activeBuffs.find((b) => b.id === buffId);
    if (buff) {
      this.removeBuffEffect(buff);
      this.activeBuffs = this.activeBuffs.filter((b) => b.id !== buffId);
    }
  }

  removeBuffEffect(buff) {
    // Retirer les bonus des stats du joueur
    if (buff.effect.atkBonus) {
      this.player.stats.atk /= 1 + buff.effect.atkBonus;
    }
    if (buff.effect.defBonus) {
      this.player.stats.def /= 1 + buff.effect.defBonus;
    }
    if (buff.effect.spdBonus) {
      this.player.stats.spd /= 1 + buff.effect.spdBonus;
    }
  }

  getActiveBuffs() {
    return this.activeBuffs;
  }
}

window.BuffManager = BuffManager;
```

- [ ] Intégrer `BuffManager` dans `Game.js`
- [ ] Ajouter l'UI pour afficher les buffs actifs

---

## 🎯 Prochaines Étapes Prioritaires

1. **Créer les recettes de craft** (3-4h de travail)
   - Alchimiste: 15-20 recettes de potions
   - Poissonnier: 15-20 recettes de plats
   - Tailleur: 15-20 recettes d'équipement

2. **Implémenter le bâtiment Ferme** (2h de travail)
   - Définition dans `buildings-data.js`
   - UI dans l'onglet Ville
   - Logique de production automatique

3. **Mettre à jour `ui.js`** (1h de travail)
   - Support pour herbalist/fisher dans les méthodes existantes
   - Event listeners pour nouveaux boutons

4. **Créer le BuffManager** (2h de travail)
   - Système de buffs temporaires
   - UI pour afficher les buffs actifs
   - Intégration dans le combat

5. **Tests complets** (2h de travail)
   - Tester la récolte de plantes/poissons
   - Tester l'auto-récolte
   - Tester le craft de recettes
   - Tester le bâtiment Ferme
   - Tester les buffs

---

## 📝 Notes Techniques

### Différences de Cadence

- **Bûcheron, Mineur, Herboriste**: 3 secondes par action
- **Pêcheur**: 5 secondes par action (plus lent, plus rare)

### Système de Qualité

Le système de qualité existant s'applique également aux nouvelles professions:

- Normal (100% chance)
- Supérieur ✨ (×1.2 stats)
- Exceptionnel 💎 (×1.5 stats)
- Parfait ⭐ (×2.0 stats)
- Œuvre Maître 👑 (×3.0 stats)

### TypeScript

Les erreurs TypeScript actuelles sont normales et attendues. Elles proviennent de l'extension de l'interface `Window` et sont gérées par `src/types/global.d.ts`.

---

## ✅ Checklist Finale

### Backend

- [x] Ressources ajoutées (plants, fish, fabrics)
- [x] Professions ajoutées (herbalist, fisher, alchemist, fishmonger, tailor, transmutation)
- [x] Auto-gather supporté (herbalist, fisher)
- [ ] Recettes de craft créées
- [ ] BuffManager implémenté
- [ ] Bâtiment Ferme créé
- [ ] Limites de stockage ajoutées

### Frontend

- [x] UI Herboriste ajoutée
- [x] UI Pêcheur ajoutée
- [x] UI Alchimiste ajoutée
- [x] UI Poissonnier ajoutée
- [x] UI Tailleur ajoutée
- [x] Filtres d'inventaire ajoutés (plants, fish)
- [x] Filtres de craft ajoutés (potion, food, cloth)
- [x] Tab "Transmutation" renommé
- [ ] Event listeners connectés
- [ ] UI BuffManager créée

### Tests

- [ ] Test récolte plantes
- [ ] Test récolte poissons
- [ ] Test auto-récolte herbalist
- [ ] Test auto-récolte fisher
- [ ] Test craft potions
- [ ] Test craft plats
- [ ] Test craft vêtements
- [ ] Test production Ferme
- [ ] Test buffs temporaires

---

## 🚀 Estimation Totale

- **Travail terminé**: 40% ✅
- **Travail restant**: 60% 🔄
- **Temps estimé restant**: 10-12 heures

---

**Date de création**: $(date)
**Statut**: EN COURS 🔄
**Version du jeu**: v0.1.0-alpha
