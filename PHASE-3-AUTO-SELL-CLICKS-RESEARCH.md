# 🚀 PHASE 3 : AUTO-SELL + CLICS PASSIFS + RECHERCHES

## 📋 OBJECTIF

Implémenter 3 systèmes endgame essentiels :

1. **Auto-Sell Excess** : Vente automatique ressources >80% capacité
2. **Clics Passifs Niveau 50** : Bonus 5% production passive sur clics (reward late-game)
3. **Système de Recherches** : Arbre technologique avec upgrades permanents

---

## 🎯 TÂCHE 1 : AUTO-SELL EXCESS (1h - 🟢 Important)

### **Concept**

Vendre automatiquement les ressources en excédent pour éviter overflow stockage.

### **Spécifications**

- **Déclencheur** : Ressource > 80% capacité stockage
- **Vente** : Vend jusqu'à 70% capacité (laisse 10% marge)
- **Prix** : Prix de base × 0.9 (10% taxe vendeur)
- **Fréquence** : Vérifie toutes les 60 secondes
- **Toggle** : On/Off par ressource dans UI

### **Implémentation**

#### A. Fichier : `src/js/building-manager.js`

```javascript
// Ajouter dans constructor()
this.autoSellEnabled = {
    wood: false,
    ore: false,
    plants: false,
    fish: false
};

this.autoSellInterval = null;
this.autoSellCheckTime = 60000; // 60s

// Ajouter méthode
/**
 * Active/désactive l'auto-sell pour une catégorie
 */
toggleAutoSell(category) {
    this.autoSellEnabled[category] = !this.autoSellEnabled[category];

    // Démarrer interval si au moins 1 activé
    if (Object.values(this.autoSellEnabled).some(v => v)) {
        if (!this.autoSellInterval) {
            this.autoSellInterval = setInterval(() => this.autoSellExcess(), this.autoSellCheckTime);
        }
    } else {
        // Arrêter si tous désactivés
        if (this.autoSellInterval) {
            clearInterval(this.autoSellInterval);
            this.autoSellInterval = null;
        }
    }
}

/**
 * Vend automatiquement les ressources en excédent
 */
autoSellExcess() {
    const resourcePrices = {
        // WOOD
        'wood_oak': 1,
        'wood_pine': 1,
        'wood_cedar': 2,
        'wood_sequoia': 3,
        'wood_ironwood': 5,
        'wood_moonwillow': 8,
        'wood_crystal': 12,

        // ORE
        'ore_copper': 1.5,
        'ore_iron': 2,
        'ore_silver': 3,
        'ore_gold': 5,
        'ore_mithril': 8,
        'ore_adamantite': 12,
        'ore_orichalcum': 20,

        // PLANTS
        'plant_wild_mint': 1.5,
        'plant_lavender': 2,
        'plant_chamomile': 2,
        'plant_rosemary': 3,
        'plant_saffron': 5,
        'plant_mandrake': 8,
        'plant_moonflower': 12,

        // FISH
        'fish_sardine': 2,
        'fish_bass': 2,
        'fish_salmon': 3,
        'fish_tuna': 5,
        'fish_swordfish': 8,
        'fish_blue_marlin': 12,
        'fish_dragon_fish': 20
    };

    let totalGold = 0;
    let soldItems = [];

    for (const [resourceId, price] of Object.entries(resourcePrices)) {
        // Vérifier catégorie activée
        const category = this.getResourceCategory(resourceId);
        if (!this.autoSellEnabled[category]) continue;

        const current = this.game.professionManager.getInventoryAmount(resourceId);
        const max = this.getMaxStorage(resourceId); // À implémenter

        // Vendre si > 80% stockage
        if (current > max * 0.8) {
            const toSell = Math.floor(current - (max * 0.7));
            const goldEarned = Math.floor(toSell * price * 0.9); // 10% taxe

            this.game.professionManager.removeFromInventory(resourceId, toSell);
            totalGold += goldEarned;

            soldItems.push({ resource: resourceId, amount: toSell, gold: goldEarned });
        }
    }

    // Ajouter l'or gagné
    if (totalGold > 0) {
        this.game.player.resources.gold += totalGold;

        if (this.game.ui) {
            this.game.ui.showNotification(
                `💰 Auto-vendu ${soldItems.length} type(s) de ressources pour ${totalGold} or`,
                'success'
            );
        }
    }
}

/**
 * Détermine la catégorie d'une ressource
 */
getResourceCategory(resourceId) {
    if (resourceId.startsWith('wood_')) return 'wood';
    if (resourceId.startsWith('ore_')) return 'ore';
    if (resourceId.startsWith('plant_')) return 'plants';
    if (resourceId.startsWith('fish_')) return 'fish';
    return 'other';
}

/**
 * Obtient le stockage max pour une ressource
 */
getMaxStorage(resourceId) {
    const category = this.getResourceCategory(resourceId);

    // Stockage de base
    let baseStorage = 1000;

    // Bonus par bâtiment (exemple : warehouse)
    const warehouse = this.buildings.get('warehouse');
    if (warehouse && warehouse.level > 0) {
        baseStorage += warehouse.level * 500;
    }

    return baseStorage;
}

// Ajouter dans toJSON()
toJSON() {
    return {
        buildings: Array.from(this.buildings.entries()),
        autoSellEnabled: this.autoSellEnabled
    };
}

// Ajouter dans fromJSON()
fromJSON(data) {
    // ... code existant
    if (data.autoSellEnabled) {
        this.autoSellEnabled = data.autoSellEnabled;

        // Redémarrer interval si nécessaire
        if (Object.values(this.autoSellEnabled).some(v => v)) {
            this.autoSellInterval = setInterval(() => this.autoSellExcess(), this.autoSellCheckTime);
        }
    }
}
```

#### B. Fichier : `src/js/ui.js`

Ajouter dans l'onglet **Ville** (Town) :

```html
<div
  class="auto-sell-panel"
  style="margin-top: 20px; padding: 15px; background: rgba(50, 50, 80, 0.3); border-radius: 10px;"
>
  <h3>💰 Vente Automatique</h3>
  <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">
    Vend automatiquement les ressources quand le stockage dépasse 80%
  </p>

  <div
    class="auto-sell-toggles"
    style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;"
  >
    <button class="btn btn-toggle" id="toggle-autosell-wood" data-category="wood">
      <span class="toggle-icon">🪵</span> Bois <span class="toggle-status">OFF</span>
    </button>
    <button class="btn btn-toggle" id="toggle-autosell-ore" data-category="ore">
      <span class="toggle-icon">⛏️</span> Minerais <span class="toggle-status">OFF</span>
    </button>
    <button class="btn btn-toggle" id="toggle-autosell-plants" data-category="plants">
      <span class="toggle-icon">🌿</span> Plantes <span class="toggle-status">OFF</span>
    </button>
    <button class="btn btn-toggle" id="toggle-autosell-fish" data-category="fish">
      <span class="toggle-icon">🐟</span> Poissons <span class="toggle-status">OFF</span>
    </button>
  </div>
</div>
```

Event listeners :

```javascript
// Dans initEventListeners()
document.querySelectorAll('[id^="toggle-autosell-"]').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        this.game.buildingManager.toggleAutoSell(category);
        this.updateAutoSellToggles();
    });
});

// Nouvelle méthode
updateAutoSellToggles() {
    const autoSellEnabled = this.game.buildingManager.autoSellEnabled;

    for (const [category, enabled] of Object.entries(autoSellEnabled)) {
        const btn = document.getElementById(`toggle-autosell-${category}`);
        if (btn) {
            const statusSpan = btn.querySelector('.toggle-status');
            statusSpan.textContent = enabled ? 'ON' : 'OFF';

            if (enabled) {
                btn.classList.add('active');
                btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            } else {
                btn.classList.remove('active');
                btn.style.background = 'linear-gradient(135deg, #555, #666)';
            }
        }
    }
}
```

---

## 🎯 TÂCHE 2 : CLICS PASSIFS NIVEAU 50 (2h - 🔵 Important)

### **Concept**

**Reward late-game** : Au niveau 50, les clics donnent +5% de la production passive des bâtiments.

### **Spécifications**

- **Déblocage** : Niveau 50 métier de récolte
- **Bonus** : +5% production passive par clic (fixe, ne scale pas)
- **Calcul** : `bonus = (productionBâtiment/min ÷ 60) × 5%`
- **Notification** : Message spécial au premier déblocage niveau 50

### **Implémentation**

#### A. Fichier : `src/js/profession-manager.js`

```javascript
/**
 * 🆕 Calculer le bonus de clic passif (niveau 50+)
 * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
 * @param {number} level - Niveau du métier
 * @returns {number} Ressources bonus par clic
 */
getPassiveClickBonus(professionId, level) {
    // 🔒 DÉBLOCAGE : Niveau 50 requis
    if (level < 50) return 0;

    const buildingProduction = this.getBuildingProductionPerMin(professionId);
    if (!buildingProduction || buildingProduction === 0) return 0;

    // Bonus fixe de 5% production passive
    const bonusPercent = 5.0;
    const productionPerSecond = buildingProduction / 60;
    return Math.floor(productionPerSecond * (bonusPercent / 100));
}

/**
 * 🆕 Obtient la production passive par minute pour un métier
 * @param {string} professionId - 'woodcutter', 'miner', 'herbalist', 'fisher'
 * @returns {number} Production par minute
 */
getBuildingProductionPerMin(professionId) {
    const buildingMap = {
        woodcutter: 'sawmill',
        miner: 'quarry',
        herbalist: 'greenhouse',
        fisher: 'fishery'
    };

    const buildingId = buildingMap[professionId];
    if (!buildingId) return 0;

    const buildingManager = this.game?.buildingManager;
    if (!buildingManager) return 0;

    const building = buildingManager.buildings.get(buildingId);
    if (!building || building.level === 0) return 0;

    // Production = baseProduction × level
    const baseProduction = building.baseProduction || 0;
    return baseProduction * building.level;
}

// Modifier gather() pour ajouter le bonus
gather(professionId) {
    const profession = this.professions.get(professionId);
    if (!profession) return;

    // Quantité de base
    const baseAmount = this.calculateGatherAmount(professionId, profession.level);

    // 🆕 BONUS PASSIF (niveau 50+)
    const passiveBonus = this.getPassiveClickBonus(professionId, profession.level);

    const totalAmount = baseAmount + passiveBonus;

    // Ajouter à l'inventaire
    const resourceType = this.getResourceTypeForProfession(professionId);
    this.addToInventory(resourceType, totalAmount);

    // Notification avec célébration niveau 50
    if (this.game && this.game.ui) {
        if (passiveBonus > 0) {
            this.game.ui.showNotification(
                `+${totalAmount} ${resourceType} (dont ${passiveBonus} bonus passif niveau 50 ! 🎉)`,
                'success'
            );
        } else {
            this.game.ui.showNotification(`+${totalAmount} ${resourceType}`, 'success');
        }
    }

    // Notification spéciale au premier déblocage niveau 50
    if (profession.level === 50 && !profession.passiveBonusUnlocked) {
        profession.passiveBonusUnlocked = true;

        if (this.game && this.game.ui) {
            this.game.ui.showNotification(
                '🎉 BONUS PASSIF DÉBLOQUÉ ! Vos clics donnent maintenant 5% de la production passive !',
                'legendary',
                5000
            );
        }
    }

    // Gagner XP
    this.gainXP(professionId, profession.xpPerAction);
}

// Ajouter dans toJSON() pour sauvegarder le flag
toJSON() {
    return {
        professions: Array.from(this.professions.entries()).map(([id, prof]) => [
            id,
            {
                ...prof,
                passiveBonusUnlocked: prof.passiveBonusUnlocked || false
            }
        ]),
        inventory: Array.from(this.inventory.entries()),
        autoGatherState: this.autoGatherState
    };
}
```

#### B. Fichier : `src/js/ui.js`

Afficher le bonus dans le tooltip des professions :

```javascript
updateProfessionsTab() {
    // ... code existant

    // Pour chaque profession, ajouter indication niveau 50
    const professionIds = ['woodcutter', 'miner', 'herbalist', 'fisher'];

    professionIds.forEach(professionId => {
        const profession = this.game.professionManager.professions.get(professionId);
        if (!profession) return;

        const tile = document.getElementById(`profession-${professionId}`);
        if (tile && profession.level >= 50) {
            // Ajouter badge niveau 50
            let badge = tile.querySelector('.level-50-badge');
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'level-50-badge';
                badge.innerHTML = '🎉 BONUS PASSIF +5%';
                badge.style.cssText = `
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: linear-gradient(135deg, #f39c12, #e74c3c);
                    color: white;
                    padding: 3px 8px;
                    border-radius: 5px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                `;
                tile.appendChild(badge);
            }
        }
    });
}
```

---

## 🎯 TÂCHE 3 : SYSTÈME DE RECHERCHES (3-4h - 🟣 Endgame)

### **Concept**

Arbre technologique avec 50+ upgrades permanents utilisant ressources + or comme resource sink.

### **Spécifications**

- **Déblocage** : Niveau 30 (mid-endgame)
- **Catégories** : Production, Combat, Craft, Récolte, Économie
- **Coûts** : Or + Ressources T3-T5
- **Progression** : Recherches débloquent d'autres recherches (arbre)
- **Sauvegarde** : Upgrades permanents (même après prestige si acheté depuis prestige shop)

### **Implémentation**

#### A. Fichier : `src/config/research-data.js`

```javascript
/**
 * Configuration des recherches (technologies)
 */
window.ResearchData = {
  // ========== CATÉGORIE : PRODUCTION ==========
  production: [
    {
      id: "prod_sawmill_boost_1",
      name: "Scierie Améliorée I",
      description: "+25% production Scierie",
      icon: "🪚",
      category: "production",
      tier: 1,

      cost: {
        gold: 10000,
        resources: [
          { resourceId: "wood_cedar", amount: 100 },
          { resourceId: "ore_iron", amount: 50 },
        ],
      },

      requirements: {
        playerLevel: 30,
        buildingLevel: { building: "sawmill", level: 5 },
      },

      effect: {
        type: "building_production",
        target: "sawmill",
        multiplier: 1.25,
      },
    },

    {
      id: "prod_sawmill_boost_2",
      name: "Scierie Améliorée II",
      description: "+50% production Scierie",
      icon: "🪚",
      category: "production",
      tier: 2,

      cost: {
        gold: 50000,
        resources: [
          { resourceId: "wood_sequoia", amount: 200 },
          { resourceId: "ore_silver", amount: 100 },
        ],
      },

      requirements: {
        playerLevel: 35,
        research: "prod_sawmill_boost_1", // Nécessite recherche précédente
      },

      effect: {
        type: "building_production",
        target: "sawmill",
        multiplier: 1.5,
      },
    },

    {
      id: "prod_all_buildings_1",
      name: "Architecture Avancée",
      description: "+15% production TOUS les bâtiments",
      icon: "🏛️",
      category: "production",
      tier: 3,

      cost: {
        gold: 100000,
        resources: [
          { resourceId: "wood_ironwood", amount: 300 },
          { resourceId: "ore_gold", amount: 200 },
          { resourceId: "plant_saffron", amount: 150 },
        ],
      },

      requirements: {
        playerLevel: 40,
        research: "prod_sawmill_boost_2",
      },

      effect: {
        type: "global_production",
        multiplier: 1.15,
      },
    },
  ],

  // ========== CATÉGORIE : CRAFT ==========
  craft: [
    {
      id: "craft_speed_1",
      name: "Artisan Expérimenté",
      description: "-25% temps de craft",
      icon: "⚒️",
      category: "craft",
      tier: 1,

      cost: {
        gold: 15000,
        resources: [
          { resourceId: "ore_iron", amount: 100 },
          { resourceId: "wood_oak", amount: 100 },
        ],
      },

      requirements: {
        playerLevel: 30,
        professionLevel: { profession: "blacksmith", level: 20 },
      },

      effect: {
        type: "craft_speed",
        reduction: 0.25,
      },
    },

    {
      id: "craft_quality_1",
      name: "Maître Artisan",
      description: "+10% chance qualité supérieure",
      icon: "✨",
      category: "craft",
      tier: 2,

      cost: {
        gold: 30000,
        resources: [
          { resourceId: "ore_mithril", amount: 50 },
          { resourceId: "wood_cedar", amount: 100 },
        ],
      },

      requirements: {
        playerLevel: 35,
        research: "craft_speed_1",
      },

      effect: {
        type: "craft_quality",
        bonus: 0.1,
      },
    },

    {
      id: "craft_double_1",
      name: "Production de Masse",
      description: "+15% chance de doubler le craft",
      icon: "🎲",
      category: "craft",
      tier: 3,

      cost: {
        gold: 75000,
        resources: [
          { resourceId: "ore_adamantite", amount: 100 },
          { resourceId: "wood_moonwillow", amount: 150 },
        ],
      },

      requirements: {
        playerLevel: 40,
        research: "craft_quality_1",
      },

      effect: {
        type: "craft_double",
        chance: 0.15,
      },
    },
  ],

  // ========== CATÉGORIE : RÉCOLTE ==========
  gathering: [
    {
      id: "gather_speed_1",
      name: "Récolte Rapide",
      description: "-30% intervalle auto-récolte",
      icon: "⚡",
      category: "gathering",
      tier: 1,

      cost: {
        gold: 12000,
        resources: [{ resourceId: "wood_pine", amount: 150 }],
      },

      requirements: {
        playerLevel: 30,
      },

      effect: {
        type: "gather_speed",
        reduction: 0.3,
      },
    },

    {
      id: "gather_yield_1",
      name: "Récolte Abondante",
      description: "+25% ressources récoltées",
      icon: "🌾",
      category: "gathering",
      tier: 2,

      cost: {
        gold: 25000,
        resources: [{ resourceId: "plant_lavender", amount: 200 }],
      },

      requirements: {
        playerLevel: 35,
        research: "gather_speed_1",
      },

      effect: {
        type: "gather_yield",
        multiplier: 1.25,
      },
    },
  ],

  // ========== CATÉGORIE : ÉCONOMIE ==========
  economy: [
    {
      id: "eco_storage_1",
      name: "Entrepôt Amélioré",
      description: "+500 capacité stockage",
      icon: "📦",
      category: "economy",
      tier: 1,

      cost: {
        gold: 20000,
        resources: [
          { resourceId: "wood_oak", amount: 300 },
          { resourceId: "ore_iron", amount: 150 },
        ],
      },

      requirements: {
        playerLevel: 30,
      },

      effect: {
        type: "storage_capacity",
        bonus: 500,
      },
    },

    {
      id: "eco_sell_price_1",
      name: "Négociation",
      description: "+10% prix de vente équipement",
      icon: "💰",
      category: "economy",
      tier: 2,

      cost: {
        gold: 40000,
        resources: [{ resourceId: "ore_gold", amount: 100 }],
      },

      requirements: {
        playerLevel: 35,
        research: "eco_storage_1",
      },

      effect: {
        type: "sell_price",
        multiplier: 1.1,
      },
    },
  ],

  // ========== CATÉGORIE : COMBAT ==========
  combat: [
    {
      id: "combat_damage_1",
      name: "Entraînement au Combat",
      description: "+15% dégâts",
      icon: "⚔️",
      category: "combat",
      tier: 1,

      cost: {
        gold: 18000,
        resources: [{ resourceId: "ore_iron", amount: 150 }],
      },

      requirements: {
        playerLevel: 30,
      },

      effect: {
        type: "combat_damage",
        multiplier: 1.15,
      },
    },

    {
      id: "combat_health_1",
      name: "Vigueur du Guerrier",
      description: "+20% HP max",
      icon: "❤️",
      category: "combat",
      tier: 2,

      cost: {
        gold: 35000,
        resources: [{ resourceId: "plant_rosemary", amount: 100 }],
      },

      requirements: {
        playerLevel: 35,
        research: "combat_damage_1",
      },

      effect: {
        type: "combat_health",
        multiplier: 1.2,
      },
    },
  ],
};

console.log("✅ Research data loaded");
```

#### B. Fichier : `src/js/research-manager.js`

```javascript
/**
 * ResearchManager - Gère le système de recherches (technologies)
 */
class ResearchManager {
  constructor(game) {
    this.game = game;
    this.unlockedResearches = new Set(); // IDs des recherches débloquées
    this.activeEffects = new Map(); // Effets actifs
  }

  /**
   * Vérifie si une recherche peut être achetée
   */
  canPurchase(researchId) {
    const research = this.getResearchData(researchId);
    if (!research) return false;

    // Déjà débloquée ?
    if (this.unlockedResearches.has(researchId)) return false;

    // Vérifier requirements
    const reqs = research.requirements;

    // Niveau joueur
    if (reqs.playerLevel && this.game.player.level < reqs.playerLevel) {
      return false;
    }

    // Recherche prérequise
    if (reqs.research && !this.unlockedResearches.has(reqs.research)) {
      return false;
    }

    // Niveau bâtiment
    if (reqs.buildingLevel) {
      const building = this.game.buildingManager.buildings.get(reqs.buildingLevel.building);
      if (!building || building.level < reqs.buildingLevel.level) {
        return false;
      }
    }

    // Niveau profession
    if (reqs.professionLevel) {
      const profession = this.game.professionManager.professions.get(
        reqs.professionLevel.profession
      );
      if (!profession || profession.level < reqs.professionLevel.level) {
        return false;
      }
    }

    // Vérifier coûts
    if (this.game.player.resources.gold < research.cost.gold) {
      return false;
    }

    for (const resource of research.cost.resources) {
      const amount = this.game.professionManager.getInventoryAmount(resource.resourceId);
      if (amount < resource.amount) {
        return false;
      }
    }

    return true;
  }

  /**
   * Achète une recherche
   */
  purchaseResearch(researchId) {
    if (!this.canPurchase(researchId)) return false;

    const research = this.getResearchData(researchId);

    // Consommer les ressources
    this.game.player.resources.gold -= research.cost.gold;

    for (const resource of research.cost.resources) {
      this.game.professionManager.removeFromInventory(resource.resourceId, resource.amount);
    }

    // Débloquer
    this.unlockedResearches.add(researchId);

    // Appliquer l'effet
    this.applyEffect(research.effect);

    // Notification
    if (this.game.ui) {
      this.game.ui.showNotification(`🔬 Recherche débloquée : ${research.name}`, "legendary");
    }

    return true;
  }

  /**
   * Applique un effet de recherche
   */
  applyEffect(effect) {
    const effectKey = `${effect.type}_${effect.target || "global"}`;

    // Stocker l'effet actif
    if (!this.activeEffects.has(effectKey)) {
      this.activeEffects.set(effectKey, []);
    }
    this.activeEffects.get(effectKey).push(effect);
  }

  /**
   * Obtient le multiplicateur total pour un type d'effet
   */
  getEffectMultiplier(type, target = null) {
    const effectKey = `${type}_${target || "global"}`;
    const effects = this.activeEffects.get(effectKey) || [];

    let totalMultiplier = 1.0;

    for (const effect of effects) {
      if (effect.multiplier) {
        totalMultiplier *= effect.multiplier;
      }
    }

    return totalMultiplier;
  }

  /**
   * Obtient le bonus total pour un type d'effet
   */
  getEffectBonus(type, target = null) {
    const effectKey = `${type}_${target || "global"}`;
    const effects = this.activeEffects.get(effectKey) || [];

    let totalBonus = 0;

    for (const effect of effects) {
      if (effect.bonus !== undefined) {
        totalBonus += effect.bonus;
      }
      if (effect.reduction !== undefined) {
        totalBonus += effect.reduction;
      }
    }

    return totalBonus;
  }

  /**
   * Obtient toutes les recherches par catégorie
   */
  getAllResearches() {
    return window.ResearchData || {};
  }

  /**
   * Obtient les données d'une recherche
   */
  getResearchData(researchId) {
    const allResearches = this.getAllResearches();

    for (const category of Object.values(allResearches)) {
      const research = category.find((r) => r.id === researchId);
      if (research) return research;
    }

    return null;
  }

  /**
   * Vérifie si une recherche est débloquée
   */
  isUnlocked(researchId) {
    return this.unlockedResearches.has(researchId);
  }

  /**
   * Sérialisation
   */
  toJSON() {
    return {
      unlockedResearches: Array.from(this.unlockedResearches),
      activeEffects: Array.from(this.activeEffects.entries()),
    };
  }

  /**
   * Désérialisation
   */
  fromJSON(data) {
    if (data.unlockedResearches) {
      this.unlockedResearches = new Set(data.unlockedResearches);
    }

    if (data.activeEffects) {
      this.activeEffects = new Map(data.activeEffects);
    }
  }
}
```

#### C. Fichier : `index.html`

Ajouter dans `<head>` :

```html
<!-- Research System -->
<script src="src/config/research-data.js"></script>
<script src="src/js/research-manager.js"></script>
```

Ajouter nouvel onglet **Recherches** dans la navigation :

```html
<button class="tab-btn" data-tab="research">🔬 Recherches</button>
```

Créer le contenu de l'onglet :

```html
<div class="tab-content" id="research-tab" style="display: none;">
  <h2>🔬 Technologies</h2>

  <div id="research-categories" class="research-categories">
    <!-- Sera rempli dynamiquement par UI -->
  </div>
</div>
```

#### D. Fichier : `src/js/ui.js`

```javascript
// Ajouter dans initEventListeners()
document.querySelector('[data-tab="research"]')?.addEventListener('click', () => {
    this.switchTab('research');
});

// Nouvelle méthode
updateResearchTab() {
    const container = document.getElementById('research-categories');
    if (!container) return;

    const allResearches = this.game.researchManager.getAllResearches();

    container.innerHTML = '';

    for (const [categoryName, researches] of Object.entries(allResearches)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'research-category';
        categoryDiv.innerHTML = `
            <h3>${this.getCategoryName(categoryName)}</h3>
            <div class="research-list" id="research-${categoryName}"></div>
        `;

        container.appendChild(categoryDiv);

        const listDiv = document.getElementById(`research-${categoryName}`);

        for (const research of researches) {
            const isUnlocked = this.game.researchManager.isUnlocked(research.id);
            const canPurchase = this.game.researchManager.canPurchase(research.id);

            const card = document.createElement('div');
            card.className = `research-card ${isUnlocked ? 'unlocked' : ''} ${canPurchase ? 'can-purchase' : ''}`;

            // Construire coûts
            let costsHTML = `<div class="research-cost">💰 ${research.cost.gold} or`;
            for (const res of research.cost.resources) {
                const resourceData = window.ResourcesData[res.resourceId];
                const icon = resourceData?.icon || '❓';
                const current = this.game.professionManager.getInventoryAmount(res.resourceId);
                costsHTML += `<br>${icon} ${current}/${res.amount}`;
            }
            costsHTML += `</div>`;

            card.innerHTML = `
                <div class="research-icon">${research.icon}</div>
                <div class="research-info">
                    <h4>${research.name}</h4>
                    <p>${research.description}</p>
                    ${costsHTML}
                    ${isUnlocked ? '<div class="unlocked-badge">✅ Débloqué</div>' : ''}
                </div>
            `;

            if (!isUnlocked && canPurchase) {
                card.addEventListener('click', () => {
                    if (this.game.researchManager.purchaseResearch(research.id)) {
                        this.updateResearchTab();
                        this.updateInventory();
                        this.update();
                    }
                });
            }

            listDiv.appendChild(card);
        }
    }
}

getCategoryName(category) {
    const names = {
        production: '🏗️ Production',
        craft: '⚒️ Artisanat',
        gathering: '🌾 Récolte',
        economy: '💰 Économie',
        combat: '⚔️ Combat'
    };
    return names[category] || category;
}
```

#### E. Fichier : `src/css/main.css`

```css
/* RESEARCH TAB */
.research-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.research-category h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--color-primary);
}

.research-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.research-card {
  background: rgba(40, 40, 60, 0.6);
  border: 2px solid rgba(100, 100, 120, 0.3);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.research-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.research-card.can-purchase {
  border-color: rgba(46, 204, 113, 0.6);
  background: rgba(46, 204, 113, 0.1);
}

.research-card.can-purchase:hover {
  border-color: rgba(46, 204, 113, 1);
  background: rgba(46, 204, 113, 0.2);
}

.research-card.unlocked {
  opacity: 0.6;
  cursor: default;
  background: rgba(40, 40, 60, 0.3);
}

.research-card.unlocked:hover {
  transform: none;
}

.research-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.research-info {
  flex: 1;
}

.research-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.research-info p {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.research-cost {
  font-size: 0.85rem;
  opacity: 0.9;
}

.unlocked-badge {
  display: inline-block;
  background: rgba(46, 204, 113, 0.3);
  color: #2ecc71;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 5px;
}

/* Auto-Sell Toggles */
.btn-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: linear-gradient(135deg, #555, #666);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-toggle:hover {
  transform: scale(1.02);
}

.btn-toggle.active {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-color: rgba(46, 204, 113, 0.5);
}

.toggle-icon {
  font-size: 1.2rem;
}

.toggle-status {
  font-weight: bold;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 0.75rem;
}
```

#### F. Fichier : `src/js/game.js`

Ajouter dans le constructor :

```javascript
this.researchManager = new ResearchManager(this);
```

Ajouter dans `saveGame()` :

```javascript
researchManager: this.researchManager.toJSON(),
```

Ajouter dans `loadGame()` :

```javascript
if (saveData.researchManager) {
  this.researchManager.fromJSON(saveData.researchManager);
}
```

---

## ✅ VALIDATION

### Tests Auto-Sell

1. Aller dans onglet Ville
2. Activer Auto-Sell pour Bois
3. Remplir stockage bois à 90%
4. Attendre 60s
5. Vérifier que bois vendu automatiquement
6. Vérifier or augmenté

### Tests Clics Passifs Niveau 50

1. Monter Bûcheron à niveau 50
2. Construire Scierie niveau 5 (production 40/min)
3. Cliquer sur "Couper du Bois"
4. Vérifier notification avec bonus passif (2 bois bonus = 5% × 40/min)
5. Vérifier message "BONUS PASSIF DÉBLOQUÉ"

### Tests Recherches

1. Atteindre niveau 30
2. Aller dans onglet Recherches
3. Acheter "Scierie Améliorée I"
4. Vérifier coûts consommés
5. Vérifier production scierie augmentée de 25%
6. Vérifier que recherche Tier 2 débloquée

---

## 📊 ESTIMATION TEMPS

| Tâche                   | Temps    | Priorité     |
| ----------------------- | -------- | ------------ |
| Auto-Sell Excess        | 1h       | 🟢 Important |
| Clics Passifs Niveau 50 | 2h       | 🔵 Important |
| Système Recherches      | 3-4h     | 🟣 Endgame   |
| **TOTAL**               | **6-7h** |              |

---

## 🚀 NEXT STEPS APRÈS PHASE 3

### Phase 4 : Prestige System (3-4h)

- Implémenter système prestige niveau 50
- 11 upgrades permanents prestige shop
- Reset personnage avec héritage

### Phase 5 : Donjons (4-5h)

- 5 donjons niveaux 10/20/30/40/50
- Boss fights avec récompenses T2-T7
- Ascension Tokens & Divine Fragments

---

**Phase 3 prête à être implémentée ! 🎉**
