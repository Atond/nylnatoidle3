# 🧪 Guide de Test - Phase 1-2-3

## ✅ Checklist de Test Rapide (5 min)

### 1. Démarrage

```bash
# Le serveur est déjà démarré sur http://localhost:8080
# Ouvrir dans le navigateur
```

### 2. Test Armurier Level 1-2 ⚔️

#### Test 1: Brassards de Fer (Level 1)

- [ ] Ouvrir l'onglet **Craft**
- [ ] Sélectionner profession **Armorsmith**
- [ ] Chercher **"Brassards de Fer" (iron_bracers)**
- [ ] Vérifier matériaux requis:
  - [ ] 6x Minerai de Fer
  - [ ] 2x Lin
- [ ] Vérifier stats:
  - [ ] Armor: 3
  - [ ] Defense: 4
  - [ ] Force: 2
  - [ ] Endurance: 2
  - [ ] Health: 15
- [ ] **Tenter de crafter** (si ressources disponibles)

#### Test 2: Bottes de Fer Simples (Level 2)

- [ ] Chercher **"Bottes de Fer Simples" (iron_boots_basic)**
- [ ] Vérifier matériaux requis:
  - [ ] 10x Minerai de Fer
  - [ ] 3x Cuivre
  - [ ] 3x Chanvre
- [ ] Vérifier stats:
  - [ ] Armor: 4
  - [ ] Defense: 6
  - [ ] Endurance: 3
  - [ ] Health: 20
  - [ ] Agility: -1 (malus normal pour armure lourde)

#### Test 3: Casque de Fer (Level 3 - DOIT EXISTER)

- [ ] Chercher **"Casque de Fer" (iron_helmet)**
- [ ] Vérifier qu'il est **toujours là** (professionLevel 3)
- [ ] Confirmer progression: Level 1 → 2 → 3 ✅

---

### 3. Test Blacksmith Level 1 ⚒️

#### Test 4: Épée de Fer (Quest Item)

- [ ] Sélectionner profession **Blacksmith**
- [ ] Chercher **"Épée de Fer" (iron_sword)**
- [ ] Vérifier matériaux requis:
  - [ ] 10x Minerai de Fer
  - [ ] 5x Bois de Chêne
- [ ] Vérifier stats:
  - [ ] Force: 3
  - [ ] Damage: 4
- [ ] **Tenter de crafter** (pour la quête)

---

### 4. Test Recettes Drops Monstres 🐉

#### Test 5: Fiole de Poison (Alchemist)

- [ ] Sélectionner profession **Alchemist**
- [ ] Chercher **"Fiole de Poison" (poison_vial)**
- [ ] Vérifier matériaux requis:
  - [ ] 3x Crocs Venimeux (DROP)
  - [ ] 5x Plumes Sombres (DROP)
  - [ ] 4x Belladone
- [ ] Vérifier rareté: **Uncommon**
- [ ] Vérifier level requis: 8

#### Test 6: Collier de Crocs (Jeweler)

- [ ] Sélectionner profession **Jeweler**
- [ ] Chercher **"Collier de Crocs" (fang_necklace)**
- [ ] Vérifier matériaux requis:
  - [ ] 5x Croc Acéré (DROP)
  - [ ] 8x Argent
  - [ ] 4x Lin
- [ ] Vérifier stats:
  - [ ] Force: 8
  - [ ] Crit Chance: 5%
  - [ ] Lifesteal: 3%

#### Test 7: Hache de Guerre en Os (Blacksmith)

- [ ] Chercher **"Hache de Guerre en Os" (bone_war_axe)**
- [ ] Vérifier matériaux requis:
  - [ ] 8x Os Massif (DROP)
  - [ ] 15x Minerai de Fer
  - [ ] 10x Bois de Frêne
- [ ] Vérifier stats:
  - [ ] Force: 22
  - [ ] Damage: 28
  - [ ] Crit Chance: 10%

#### Test 8: Gilet Fourrure Épaisse (Armorsmith)

- [ ] Sélectionner profession **Armorsmith**
- [ ] Chercher **"Gilet en Fourrure Épaisse" (thick_hide_vest)**
- [ ] Vérifier matériaux requis:
  - [ ] 10x Fourrure Épaisse (DROP)
  - [ ] 6x Cuir Robuste (DROP)
  - [ ] 5x Coton
- [ ] Vérifier stats:
  - [ ] Armor: 18
  - [ ] Cold Resist: 15

#### Test 9: Cuir de Harpie (Tanner)

- [ ] Sélectionner profession **Tanner**
- [ ] Chercher **"Cuir de Harpie" (harpy_leather)**
- [ ] Vérifier matériaux requis:
  - [ ] 15x Plume de Harpie (DROP)
  - [ ] 8x Peau Robuste
  - [ ] 5x Sauge
- [ ] Vérifier qu'il **produit 5x cuir de harpie** (material)

---

### 5. Test DropChance Équilibrés 🎲

#### Test 10: Vérifier Drops en Combat

- [ ] Combattre un **Loup** (Common)
  - [ ] Vérifier drop **Griffes Usées** (~35% de chance)
  - [ ] Vérifier drop **Plumes Sombres** (~50% de chance)
- [ ] Combattre un **Serpent** (Rare)
  - [ ] Vérifier drop **Crocs Venimeux** (~10% de chance) - RARE maintenant
- [ ] Combattre un **Boss Région 1**
  - [ ] Vérifier drop **Corne Ancienne** (100% garanti)
  - [ ] Vérifier drop **Cuir Légendaire** (100% garanti)

---

## 🐛 Bugs Connus à Vérifier

### Possible Issues

1. **TypeScript warnings** (window.CraftRecipesArmors) - Bénin, ignore
2. **Icône monstre** (🦌 mal affiché) - Problème d'encodage UTF-8
3. **Ressources manquantes** - Si certaines ressources n'existent pas encore (plant_nightshade, etc.)

### Si un drop ne s'affiche pas:

```javascript
// Vérifier dans Console (F12):
console.log(DropsData.crocs_venimeux);
// Devrait afficher: { dropChance: 0.10, ... }
```

---

## 📊 Résultat Attendu

### ✅ Success Criteria

- [ ] **2/2 recettes armurier** level 1-2 visibles
- [ ] **1/1 épée de fer** (blacksmith) visible
- [ ] **15/15 nouvelles recettes** visibles (alchemist, jeweler, blacksmith, armorsmith, tanner, tailor)
- [ ] **Drops rares** apparaissent moins souvent (~10% au lieu de 50%)
- [ ] **Drops boss** garantis (100%)

### ❌ Fail Criteria

- Aucune nouvelle recette n'apparaît → Vérifier console pour erreurs JS
- Drops toujours à 50% → Script fix-drop-chances.ps1 n'a pas fonctionné
- Épée de fer manquante → Problème dans craft-recipes-data.js

---

## 🎯 Quick Test (1 minute)

**Test Minimum Viable:**

```
1. Ouvrir http://localhost:8080
2. Aller dans Craft → Armorsmith
3. Voir "Brassards de Fer" en premier (level 1) ✅
4. Aller dans Craft → Blacksmith
5. Voir "Épée de Fer" (level 1) ✅
6. Aller dans Craft → Alchemist
7. Voir "Fiole de Poison" avec drops requis ✅
```

**Si ces 3 tests passent → TOUT FONCTIONNE !** 🎉

---

## 📝 Rapport de Test

### Remplir après test:

```
Date: __________
Testeur: __________

✅ Armurier level 1-2: [ ] OK  [ ] FAIL
✅ Blacksmith iron_sword: [ ] OK  [ ] FAIL
✅ 15 recettes drops: [ ] OK  [ ] FAIL
✅ DropChance équilibrés: [ ] OK  [ ] FAIL

Bugs trouvés:
1. ___________________________________
2. ___________________________________
3. ___________________________________

Notes:
_______________________________________
_______________________________________
```

---

**Bon test !** 🎮
