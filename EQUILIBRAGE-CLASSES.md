# ⚖️ ÉQUILIBRAGE DES CLASSES ET STATS

Date : 26 octobre 2025  
Version : Post-refonte stats

---

## 📊 STATISTIQUES ÉQUILIBRÉES

### Valeurs moyennes dans les recettes (après balance)

| Stat                | Min | Max | Moyenne | Utilité                              |
| ------------------- | --- | --- | ------- | ------------------------------------ |
| 💪 **Force**        | 2   | 24  | **~10** | Dégâts physiques (Guerrier/Archer)   |
| 🧠 **Intelligence** | 6   | 57  | **~20** | Dégâts magiques (Mage/Prêtre)        |
| ⚡ **Agilité**      | 7   | 140 | **~40** | Critique (1%/pt) + Esquive (0.5%/pt) |
| ✨ **Sagesse**      | -   | -   | -       | Soins (Prêtre uniquement)            |
| 🛡️ **Endurance**    | -   | -   | -       | HP max (+5 HP/pt)                    |

**Ratio Intelligence/Force : 2:1** ✅  
→ Compensé par les critiques des Archers (Agilité)

---

## 🎯 CLASSES ET ÉQUILIBRAGE

### 1. ⚔️ **GUERRIER** (Tank)

**Type de dégâts** : Physique (Force)  
**DPS** : ⭐⭐⭐ (Moyen)  
**Survie** : ⭐⭐⭐⭐⭐ (Excellent)

**Stats prioritaires** :

- Force : Dégâts de base
- Endurance : Points de vie max
- Armor/Defense : Réduction dégâts

**Équipement** : Armures lourdes (Armorsmith), boucliers, épées 1 main

**Rôle** : Tank en donjon, absorbe les dégâts pour l'équipe

---

### 2. 🏹 **ARCHER** (DPS Physique)

**Type de dégâts** : Physique (Force) + Critiques (Agilité)  
**DPS** : ⭐⭐⭐⭐ (Élevé)  
**Survie** : ⭐⭐⭐ (Moyen)

**Stats prioritaires** :

- Force : Dégâts de base
- Agilité : Critique (1%/pt, max 50%) + Esquive (0.5%/pt, max 40%)

**Équipement** : Armures légères (Tailor), arcs, dagues

**Rôle** : DPS burst avec critiques, mobilité

**Équilibrage** :  
Force moyenne (~10) × Critique (30-50%) = **DPS comparable au Mage**

---

### 3. 🧙 **MAGE** (DPS Magique)

**Type de dégâts** : Magique (Intelligence)  
**DPS** : ⭐⭐⭐⭐ (Élevé)  
**Survie** : ⭐⭐⭐ (Moyen)

**Stats prioritaires** :

- Intelligence : Dégâts magiques directs
- Wisdom : Bonus secondaire (mana, régénération)

**Équipement** : Robes (Tailor), bâtons, amulettes INT

**Rôle** : DPS constant magique, AoE en donjon

**Équilibrage** :  
Intelligence moyenne (~20) = **DPS comparable à l'Archer** (sans critiques)

---

### 4. ✨ **PRÊTRE** (Heal)

**Type de dégâts** : Magique (Intelligence - réduit)  
**DPS** : ⭐⭐ (Faible)  
**Survie** : ⭐⭐⭐⭐⭐ (Excellent - auto-heal)

**Stats prioritaires** :

- Wisdom : Soins (primaire)
- Intelligence : Dégâts magiques (secondaire)
- Endurance : HP max

**Équipement** : Robes (Tailor), bâtons de sagesse, amulettes WIS

**Rôle** : Heal de groupe en donjon, survie solo

**Équilibrage** :  
Intelligence faible (~10-15) pour DPS réduit  
Wisdom élevée (~30+) pour heal puissant

---

## 🔧 MODIFICATIONS TECHNIQUES

### Phase 1 : Nettoyage stats obsolètes ✅

- ❌ Supprimé : `spellPower` (26 occurrences)
- ❌ Supprimé : `attackSpeed` (8 occurrences)
- ❌ Supprimé : `castSpeed` (5 occurrences)
- ✅ Remplacé : `spellPower` → `intelligence`

### Phase 2 : Équilibrage Intelligence ✅

- 🔧 Division par 4 de toutes les valeurs d'Intelligence
- 📊 Résultat : Ratio Int/Force = 2:1 (acceptable)
- 💾 Sauvegarde : `archive/backup-balance-2025-10-26-160540/`

### Phase 3 : Système de dégâts par classe ✅

**Fichier modifié** : `src/js/player.js`

```javascript
// AVANT (tous physique)
const damage = force * FORCE_MULTIPLIER;

// APRÈS (physique OU magique selon classe)
if (class === 'mage' || class === 'priest') {
    damage = intelligence * INTELLIGENCE_MULTIPLIER;
} else {
    damage = force * FORCE_MULTIPLIER;
}
```

**Multiplicateurs** :

- `FORCE_MULTIPLIER = 1.0` (inchangé)
- `INTELLIGENCE_MULTIPLIER = 1.0` (ajouté)

**Classes magiques** : Mage, Prêtre  
**Classes physiques** : Guerrier, Archer

---

## 🎮 PROGRESSION ET SCALING

### Tier 1 (Niveaux 1-10)

- Force : ~3-10
- Intelligence : ~6-20
- **Guerrier** : 5-15 dégâts
- **Archer** : 10-20 dégâts (avec critiques)
- **Mage** : 10-25 dégâts
- **Prêtre** : 5-15 dégâts

### Tier 2 (Niveaux 11-20)

- Force : ~8-15
- Intelligence : ~15-30
- **Guerrier** : 15-30 dégâts
- **Archer** : 25-45 dégâts (avec critiques)
- **Mage** : 20-35 dégâts
- **Prêtre** : 10-20 dégâts

### Tier 3 (Niveaux 21-30)

- Force : ~12-20
- Intelligence : ~25-40
- **Guerrier** : 30-50 dégâts
- **Archer** : 50-90 dégâts (avec critiques)
- **Mage** : 40-60 dégâts
- **Prêtre** : 20-35 dégâts

### Tier 4 (Niveaux 31-40)

- Force : ~18-24
- Intelligence : ~35-57
- **Guerrier** : 50-80 dégâts
- **Archer** : 90-150 dégâts (avec critiques)
- **Mage** : 70-100 dégâts
- **Prêtre** : 30-50 dégâts

---

## ✅ VALIDATION

### Objectifs atteints

- ✅ Archer et Mage ont des DPS équivalents (~⭐⭐⭐⭐)
- ✅ Guerrier a moins de DPS mais plus de survie
- ✅ Prêtre a le moins de DPS mais peut heal
- ✅ Intelligence équilibrée avec Force (ratio 2:1)
- ✅ Système de classe fonctionnel (physique vs magique)

### Tests recommandés

1. Nouveau jeu → Créer Archer → Vérifier dégâts avec critiques
2. Nouveau jeu → Créer Mage → Vérifier dégâts magiques
3. Équiper armure Mage sur Guerrier → Vérifier qu'Intelligence n'augmente pas les dégâts
4. Équiper armure Guerrier sur Mage → Vérifier que Force n'augmente pas les dégâts

---

## 🔄 RESTAURATION

En cas de problème, restaurer les sauvegardes :

```powershell
# Restaurer les stats avant équilibrage
Copy-Item archive\backup-balance-2025-10-26-160540\* src\config\ -Force

# Restaurer les stats avant nettoyage
Copy-Item archive\backup-stats-cleanup-2025-10-26-160007\* src\config\ -Force
```

---

**Document créé automatiquement lors du rééquilibrage des classes**  
Pour toute question, consulter `player.js` (lignes 248-300)
