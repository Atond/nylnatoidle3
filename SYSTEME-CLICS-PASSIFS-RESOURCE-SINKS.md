# 🎯 SYSTÈME CLICS PASSIFS NIVEAU 50 + RESOURCE SINKS

> **Date** : 27 Octobre 2025  
> **Ajusté** : Late-game reward exclusif (niveau 50)  
> **Problème** : Ressources abondantes inutilisées + Clics manuels peu rewarding  
> **Solution** : 2 nouveaux systèmes complémentaires

---

## ❌ PROBLÈME IDENTIFIÉ

### 1. **Trop de Ressources, Pas Assez de Dépenses**

**Production actuelle** :
- Scierie niveau 10 : **10,000 bois/min** (passive)
- Bûcheron niveau 50 : **360 bois/min** (active)
- **Total : 10,360 bois/min**

**Consommation actuelle** :
- Craft équipement : ~50-100 bois/craft
- Bâtiments : 100-500 bois (one-time)
- **Total : ~200 bois/min maximum**

**Résultat** : **+10,000 bois/min excédent** → Stockage plein → Ressources perdues ❌

---

### 2. **Clics Manuels Peu Rewarding**

**Actuellement** :
- Clic manuel : **1-6 ressources** (selon niveau)
- Auto-gather : **1-6 ressources toutes les 1-5s**
- **Problème** : Pourquoi cliquer si l'auto fait pareil ? 🤔

---

## ✅ SOLUTION 1 : CLICS PASSIFS NIVEAU 50 (LATE GAME REWARD)

### 🎯 Concept

**🔒 Déblocage niveau 50 : Les clics donnent 5% de la production passive des bâtiments !**

- **Niveau 1-49** : Clics normaux (pas de bonus)
- **Niveau 50** : 🎉 **REWARD MAJEUR** → Clics donnent +5% production passive

### 📋 Formule (AJUSTÉE)

```javascript
/**
 * Calculer le bonus de clic passif (LATE GAME)
 * @param {string} professionId - 'woodcutter', 'miner', etc.
 * @param {number} professionLevel - Niveau du métier
 * @returns {number} Ressources bonus par clic
 */
function getPassiveClickBonus(professionId, professionLevel) {
    // 🔒 DÉBLOCAGE : Niveau 50 requis
    if (professionLevel < 50) return 0;
    
    const buildingProduction = getBuildingProductionPerMin(professionId);
    if (!buildingProduction || buildingProduction === 0) return 0;
    
    // Bonus fixe de 5% production passive (pas de scaling)
    const bonusPercent = 5.0;
    
    // Convertir production/min en production/seconde puis appliquer %
    const productionPerSecond = buildingProduction / 60;
    const bonus = Math.floor(productionPerSecond * (bonusPercent / 100));
    
    return bonus;
}

/**
 * Exemple d'utilisation
 */
function getBuildingProductionPerMin(professionId) {
    const buildingMap = {
        'woodcutter': 'sawmill',
        'miner': 'mine'
    };
    
    const buildingId = buildingMap[professionId];
    if (!buildingId) return 0;
    
    const building = buildingManager.getBuilding(buildingId);
    if (!building || building.level === 0) return 0;
    
    // Calcul production (baseProduction × multiplier^level)
    const buildingData = buildingsData[buildingId];
    return buildingData.baseProduction * Math.pow(buildingData.productionMultiplier, building.level - 1);
}
```

---

### 📊 Exemples Concrets

| Niveau | Scierie | Production/min | Bonus | Base Clic | Bonus Passif | Total | Gain |
|--------|---------|----------------|-------|-----------|--------------|-------|------|
| 1      | 0       | 0              | 🔒    | 1         | 0            | 1     | +0%  |
| 10     | 3       | 80             | 🔒    | 2         | 0            | 2     | +0%  |
| 20     | 5       | 320            | 🔒    | 3         | 0            | 3     | +0%  |
| 30     | 8       | 2,560          | 🔒    | 4         | 0            | 4     | +0%  |
| 40     | 9       | 5,120          | 🔒    | 5         | 0            | 5     | +0%  |
| **50** | 10      | 10,240         | ✅ 5% | 6         | **9**        | **15**| **+150%** 🎉 |

**🎉 Niveau 50 = Moment de célébration majeur !**

---

### 🎮 Impact Gameplay

| Aspect | Avant | Après |
|--------|-------|-------|
| Clics niveau 1 | 1 bois | 1 bois (identique) |
| Clics niveau 30 | 4 bois | 4 bois (identique) |
| **Clics niveau 50** | 6 bois | **15 bois (+150%)** ⭐ |
| Actif vs Passif | Identique | Actif > Passif (niveau 50) |
| Synergie bâtiments | Aucune | Forte (niveau 50) |
| Pacing | Linéaire | **LATE GAME REWARD** 🎉 |

**🎯 Avantages** :
- ✅ Pas de power creep précoce (niveau 1-49 identique)
- ✅ Niveau 50 devient un **jalon majeur** avec reward visible
- ✅ Synergie bâtiments ↔ clics (niveau 50)
- ✅ Joueurs actifs niveau 50 récompensés (+150%)
- ✅ Notification spéciale au déblocage

---

## ✅ SOLUTION 2 : RESOURCE SINKS (5 SYSTÈMES)

### 1️⃣ **Maintenance Bâtiments**

**Concept** : Les bâtiments consomment des ressources pour fonctionner.

```javascript
// buildings-data.js (AJOUTER)
{
    id: 'sawmill',
    maintenanceCost: {
        wood_oak: 0.125  // 12.5% de la production
    },
    maintenancePenalty: 0.5  // -50% production si pas de ressources
}
```

**Impact** :
- Scierie 10 : Produit 10,240 bois/min → Consomme 1,280 bois/min
- Réduit excédent de **12%**
- Désactiver maintenance = -50% production

---

### 2️⃣ **Recherches (Tech Tree)**

**Concept** : Débloquer des upgrades permanents contre des ressources massives.

**Exemples** :
| Recherche | Coût | Effet |
|-----------|------|-------|
| Outils Affûtés | 5,000 bois | +10% vitesse gather |
| Forge Maîtrisée | 20,000 fer | +15% qualité craft |
| Architecture Avancée | 50,000 bois + 30,000 pierre | +20% production bâtiments |
| Alchimie Supérieure | 100,000 herbes + 50 gemmes | +25% potions XP |

**Impact** :
- **50+ recherches** disponibles
- Coût total : **500,000+ ressources**
- Objectifs long-terme massifs
- Permanent upgrades (+10-25%)

---

### 3️⃣ **Rituels Continus**

**Concept** : Activer des buffs puissants qui consomment ressources/min.

**Exemples** :
| Rituel | Coût/min | Effet |
|--------|----------|-------|
| Forge Éternelle | 200 fer + 150 bois + 50 or | +30% craft speed |
| Bénédiction Natura | 300 herbes + 100 or | +40% gather speed |
| Nexus Arcanique | 500 mana + 200 gemmes + 100 or | +50% XP |

**Impact** :
- 3-5 rituels actifs simultanément
- Choix stratégiques (buffs vs coût)
- Consommation : 500-1,500 ressources/min

---

### 4️⃣ **Auto-Sell Excess**

**Concept** : Vendre automatiquement les ressources en excédent.

```javascript
// building-manager.js (AJOUTER)
autoSellExcess() {
    const resources = ['wood_oak', 'ore_iron', 'herb_common'];
    const prices = {
        'wood_oak': 1,
        'ore_iron': 2,
        'herb_common': 1.5
    };
    
    resources.forEach(resource => {
        const current = inventory.get(resource);
        const max = inventory.getMax(resource);
        
        // Vendre si > 80% stockage
        if (current > max * 0.8) {
            const toSell = current - (max * 0.7);
            const goldEarned = Math.floor(toSell * prices[resource] * 0.9); // 10% taxe
            
            inventory.remove(resource, toSell);
            inventory.add('gold', goldEarned);
            
            console.log(`Auto-vendu ${toSell} ${resource} pour ${goldEarned} or`);
        }
    });
}
```

**Impact** :
- Stockage **ne sature JAMAIS**
- Excédent converti en **or**
- Or utilisé pour : Recherches, Rituels, Bâtiments
- Économie fluide

---

### 5️⃣ **Donations Habitants**

**Concept** : Donner des ressources pour des bonus ville temporaires (24h).

**Tiers** :
| Tier | Coût | Bonus 24h |
|------|------|-----------|
| 1 | 1,000 ressources | +5% production |
| 2 | 5,000 ressources | +15% production + XP |
| 3 | 10,000 ressources | +25% TOUT |

**Impact** :
- **1,000-10,000 ressources/jour**
- Bonus puissants temporaires
- Renouvellement quotidien

---

## 📊 BILAN ÉCONOMIQUE

### ❌ Avant

| Flux | Quantité |
|------|----------|
| Production | +10,000 bois/min |
| Consommation | -200 bois/min |
| **Excédent** | **+9,800 bois/min** ❌ |
| Stockage plein | 5 minutes |

---

### ✅ Après

| Flux | Quantité |
|------|----------|
| Production | +10,000 bois/min |
| | |
| **Consommation** : | |
| - Craft | -200/min |
| - Maintenance | -1,280/min |
| - Rituels | -250/min |
| - Recherches | -500/min (moyenne) |
| - Donations | -140/min (moyenne) |
| **Total** | **-2,370 bois/min** |
| | |
| **Excédent** | +7,630 bois/min |
| → Auto-sell | **+6,867 or/min** ✅ |

**Résultat** :
- ✅ Stockage ne sature JAMAIS
- ✅ Ressources toujours utiles (→ Or)
- ✅ Or utilisé pour upgrades permanents
- ✅ Économie fluide et équilibrée

---

## 📅 PLAN D'IMPLÉMENTATION COMPLET

### ⚠️ ORDRE PRIORITAIRE

| Priorité | Tâche | Temps | Statut |
|----------|-------|-------|--------|
| 🔴 **1** | **Bonus Métiers** | 3-4h | ⏳ CRITIQUE |
| 🟡 **2** | **15 Armures Healer** | 2h | ⏳ CRITIQUE |
| 🟢 **3** | **Auto-Sell Excess** | 1h | ⏳ Important |
| 🔵 **4** | **Clics Passifs Niveau 50** | 2h | ⏳ Important |
| 🟣 **5** | **Recherches** | 3-4h | ⏳ Endgame |

**⏱️ Temps total** : 11-15 heures

---

### Phase 1 : Bonus Métiers (3-4h) 🔴 PRIORITÉ 1

**Document** : `PLAN-IMPLEMENTATION-BONUS-METIERS.md`

**Crafting** :
- Speed : -2% craft time par niveau (niveau 50 = instant)
- Quality : +1% qualité par niveau (niveau 50 = +50%)
- Double : +1% chance par niveau (niveau 50 = 50%)
- Saving : +0.5% économie par niveau (niveau 50 = 25%)

**Gathering** :
- Auto speed : -1.6% interval par niveau (5000ms → 1000ms niveau 50)
- Double : +1% chance par niveau (niveau 50 = 50%)
- Storage : +2% capacité par niveau (niveau 50 = +100%)

**Fichiers** : `crafting-manager.js`, `profession-manager.js`

---

### Phase 2 : 15 Armures Healer (2h) 🟡 PRIORITÉ 2

**Document** : `RAPPORT-ANALYSE-EQUILIBRAGE-COMPLET.md`

**Ajouter** :
- 5 Tier 1 (levels 1-5) : Intelligence, Armor, HealingPower
- 5 Tier 3 (levels 10-20) : Intelligence, Armor, HealingPower, ManaRegen
- 5 Tier 4 (levels 25-35) : Intelligence, Armor, HealingPower, ManaRegen

**Fichier** : `equipment-data.js`

---

### Phase 3 : Auto-Sell Excess (1h) 🟢 PRIORITÉ 3

**Fichier** : `building-manager.js`

**Code** :

```javascript
autoSellExcess() {
    const resourcePrices = {
        'wood_oak': 1,
        'wood_pine': 1,
        'ore_iron': 2,
        'ore_copper': 1.5,
        'herb_common': 1.5,
        'herb_rare': 3,
        'fish_common': 2
    };
    
    Object.keys(resourcePrices).forEach(resource => {
        const current = this.inventoryManager.getResourceAmount(resource);
        const max = this.inventoryManager.getMaxStorage(resource);
        
        // Vendre si > 80% stockage
        if (current > max * 0.8) {
            const toSell = Math.floor(current - (max * 0.7));
            const goldEarned = Math.floor(toSell * resourcePrices[resource] * 0.9);
            
            this.inventoryManager.removeResource(resource, toSell);
            this.inventoryManager.addGold(goldEarned);
            
            this.notificationManager.show(`Auto-vendu ${toSell} ${resource} pour ${goldEarned} or`);
        }
    });
}

update(deltaTime) {
    this.updateInterval += deltaTime;
    
    // Auto-sell toutes les 60s
    if (this.updateInterval >= 60000) {
        this.autoSellExcess();
        this.updateInterval = 0;
    }
    
    // ... reste du code
}
```

---

### Phase 4 : Clics Passifs Niveau 50 (2h) 🔵 PRIORITÉ 4

**Fichier** : `profession-manager.js`

**Code** :

```javascript
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

getBuildingProductionPerMin(professionId) {
    const buildingMap = {
        'woodcutter': 'sawmill',
        'miner': 'mine'
    };
    
    const buildingId = buildingMap[professionId];
    if (!buildingId) return 0;
    
    const building = this.buildingManager.getBuilding(buildingId);
    if (!building || building.level === 0) return 0;
    
    const buildingData = buildingsData[buildingId];
    return buildingData.baseProduction * Math.pow(buildingData.productionMultiplier, building.level - 1);
}

clickProfession(professionId) {
    const profession = this.professions[professionId];
    const level = profession.level;
    
    // Base amount
    const baseAmount = this.calculateGatherAmount(professionId, level);
    
    // Passive bonus (niveau 50+)
    const passiveBonus = this.getPassiveClickBonus(professionId, level);
    
    const totalAmount = baseAmount + passiveBonus;
    
    // Add to inventory
    this.inventoryManager.addResource(profession.resourceType, totalAmount);
    
    // Notification avec célébration niveau 50
    if (passiveBonus > 0) {
        this.notificationManager.show(`+${totalAmount} ${profession.resourceType} (dont ${passiveBonus} bonus passif niveau 50 ! 🎉)`);
    } else {
        this.notificationManager.show(`+${totalAmount} ${profession.resourceType}`);
    }
    
    // Notification spéciale au premier déblocage niveau 50
    if (level === 50 && !profession.passiveBonusUnlocked) {
        profession.passiveBonusUnlocked = true;
        this.notificationManager.showBig('🎉 BONUS PASSIF DÉBLOQUÉ ! Vos clics donnent maintenant 5% de la production passive !');
    }
    
    // XP
    this.addXP(professionId, 5);
}
```

---

### Phase 5 : Recherches (3-4h) 🟣 PRIORITÉ 5

**Fichier** : `research-data.js` (à créer)

**Exemples** :

```javascript
export const researchData = {
    // Tier 1 : Basics (5,000-10,000 ressources)
    'sharp_tools': {
        id: 'sharp_tools',
        name: 'Outils Affûtés',
        description: '+10% vitesse de récolte',
        cost: { wood_oak: 5000 },
        requirements: [],
        effect: { gatherSpeed: 0.1 }
    },
    
    'improved_forge': {
        id: 'improved_forge',
        name: 'Forge Améliorée',
        description: '+15% qualité craft',
        cost: { ore_iron: 10000 },
        requirements: [],
        effect: { craftQuality: 0.15 }
    },
    
    // Tier 2 : Advanced (20,000-50,000 ressources)
    'advanced_architecture': {
        id: 'advanced_architecture',
        name: 'Architecture Avancée',
        description: '+20% production bâtiments',
        cost: { wood_oak: 50000, ore_iron: 30000 },
        requirements: ['sharp_tools', 'improved_forge'],
        effect: { buildingProduction: 0.2 }
    },
    
    // ... 50+ recherches
};
```

**Fichier** : `research-manager.js` (à créer)

**UI** : Nouvel onglet "Recherches" dans l'interface

---

## 🎯 RÉSUMÉ FINAL

### ✅ Ce qui change

| Aspect | Avant | Après |
|--------|-------|-------|
| **Clics niveau 1-49** | 1-6 ressources | 1-6 ressources (identique) |
| **Clics niveau 50** | 6 ressources | **15 ressources (+150%)** 🎉 |
| **Excédent bois** | +9,800/min (perdu) | 0 (auto-vendu → or) |
| **Objectifs long-terme** | Aucun | 50+ recherches permanentes |
| **Économie** | Saturée (5min) | Fluide (infinie) |
| **Niveau 50** | Juste un nombre | **REWARD MAJEUR** 🎉 |

---

### 🎮 Bénéfices Gameplay

1. **Clics rewarding (niveau 50)** : +150% ressources
2. **Synergie bâtiments** : Construire scierie = clics plus forts (niveau 50)
3. **Actif > Passif** : Joueurs actifs niveau 50 récompensés
4. **Ressources utiles** : Excédent → Or → Upgrades
5. **Late-game content** : 50+ recherches permanentes
6. **Économie équilibrée** : Stockage ne sature jamais
7. **Niveau 50 valorisé** : Déblocage majeur avec célébration

---

### 📝 Checklist Implémentation

- [ ] **Phase 1** : Bonus Métiers (3-4h) 🔴
- [ ] **Phase 2** : 15 Armures Healer (2h) 🟡
- [ ] **Phase 3** : Auto-Sell Excess (1h) 🟢
- [ ] **Phase 4** : Clics Passifs Niveau 50 (2h) 🔵
- [ ] **Phase 5** : Recherches (3-4h) 🟣

**⏱️ Temps total** : 11-15 heures

---

**✅ Prêt à implémenter Phase 1 (Bonus Métiers) ?**
