# ✅ PHASE 2 - PROGRESSION (EN COURS)

> **Date** : 24 Octobre 2025  
> **Statut** : 🔄 EN COURS - 40% terminé

---

## ✅ PARTIE A : CORRECTIONS (TERMINÉ)

### **Bugs fixés** :

1. ✅ **linen_tunic** : Duplicate `materials:` array corrigé
2. ✅ **steel_sword** : wood_birch (unlock 10) → wood_oak (unlock 1)
3. ✅ **steel_chestplate** : ore_silver (unlock 12) → ore_tin (unlock 8)
4. ✅ **silver_amulet** : ore_silver (unlock 12) → ore_tin (unlock 8), requiredLevel 3→8
5. ✅ **potion_strength** : plant_rosemary (unlock 12) → plant_sage (unlock 8), requiredLevel 5→8
6. ✅ **potion_agility** : plant_wild_mint (unlock 18) → plant_lavender (unlock 10), requiredLevel 7→10
7. ✅ **seafood_feast** : fish_blue_tuna (unlock 20) → fish_striped_bass (unlock 18), requiredLevel 10→18

### **Archétypes ajoutés** :

✅ Toutes les recettes existantes ont maintenant un champ `archetype`:

- `tank` : Épées, armures lourdes
- `archer` : Arcs, dagues
- `mage` : Bâtons, robes
- `healer` : Totems, équipement de soin
- `universal` : Accessoires, potions, nourriture

---

## 🚧 PARTIE B : NOUVELLES RECETTES (EN COURS)

### **Fichier créé** : `craft-recipes-extended.js`

### **Recettes créées** : 35/160

#### **FORGERON - ARMES** : 35 recettes ✅

##### **Tank (Épées lourdes + Boucliers)** : 10 armes

```
T1 (1-10) :
  - bronze_sword_tank (niveau 4) : Épée de Bronze
  - wooden_shield (niveau 2) : Bouclier de Bois
  - reinforced_mace (niveau 8) : Masse Renforcée

T2 (11-20) :
  - iron_longsword_tank (niveau 10) : Longue Épée de Fer
  - iron_shield (niveau 12) : Bouclier de Fer
  - war_axe (niveau 15) : Hache de Guerre

T3 (21-30) :
  - steel_greatsword (niveau 20) : Grande Épée d\'Acier
  - tower_shield (niveau 22) : Bouclier-Tour
```

**Stats Tank** :

- Force : 15-35
- Defense : 15-40
- Endurance : 10-30
- Damage : 20-45
- Block Chance : 10-25%
- Malus Agility : -2 à -8 (armure lourde)

---

##### **Archer (Arcs + Dagues)** : 9 armes

```
T1 (1-10) :
  - simple_bow (niveau 1) : Arc Simple
  - iron_dagger (niveau 3) : Dague de Fer
  - hunter_bow (niveau 8) : Arc de Chasseur

T2 (11-20) :
  - ranger_longbow (niveau 12) : Arc Long de Rôdeur
  - assassin_dagger (niveau 15) : Dague d\'Assassin

T3 (21-30) :
  - elven_bow (niveau 22) : Arc Elfique
```

**Stats Archer** :

- Agility : 8-30
- Damage : 10-45
- Crit Chance : 5-28%
- Dexterity : 5-15
- Range : 15-20 (arcs)
- Poison/Backstab : Dagues spéciales

---

##### **Mage (Bâtons + Sceptres)** : 8 armes

```
T1 (1-10) :
  - oak_wand (niveau 1) : Baguette de Chêne
  - apprentice_staff (niveau 2) : Bâton d\'Apprenti
  - mystic_staff (niveau 8) : Bâton Mystique

T2 (11-20) :
  - sorcerer_staff (niveau 12) : Bâton de Sorcier
  - arcane_scepter (niveau 15) : Sceptre Arcane

T3 (21-30) :
  - archmage_staff (niveau 22) : Bâton d\'Archimage
```

**Stats Mage** :

- Intelligence : 8-45
- Wisdom : 5-30
- Damage : 6-35
- Mana Regen : 2-18
- Spell Power : 5-30
- Crit Spell : 10-20%
- Spell Penetration : 15% (T3)

---

##### **Healer (Totems + Bâtons de soin)** : 8 armes

```
T1 (1-10) :
  - healing_wand (niveau 2) : Baguette de Soin
  - wooden_totem (niveau 3) : Totem de Bois
  - life_staff (niveau 8) : Bâton de Vie

T2 (11-20) :
  - sacred_staff (niveau 12) : Bâton Sacré
  - restoration_totem (niveau 15) : Totem de Restauration

T3 (21-30) :
  - divine_staff (niveau 22) : Bâton Divin
```

**Stats Healer** :

- Wisdom : 10-50
- Intelligence : 6-30
- Healing : 15-80
- Mana Regen : 3-15
- HP Regen : 2-12
- Heal Bonus : 15-30%
- AoE Heal : 10-20%
- Resurrection : 1 (T3 uniquement)

---

### **🎯 LOOTS UTILISÉS DANS CES RECETTES** :

```javascript
loot_peau_animale → 3 recettes (boucliers, armures légères)
loot_griffes_usees → 1 recette (iron_dagger)
loot_plumes_sombres → 3 recettes (arcs)
loot_cuir_robuste → 2 recettes (épées, arcs T2)
loot_crocs_venimeux → 1 recette (assassin_dagger)
loot_essence_vegetale_instable → 4 recettes (bâtons mage/heal)
loot_os_massif → 1 recette (reinforced_mace)
loot_armure_cabossee → 1 recette (iron_shield)
loot_essence_vie_sauvage → 3 recettes (heal weapons)
loot_corne_ancienne → 1 recette (war_axe)
```

**Total loots intégrés** : 10/12 ✅

---

## 📊 STATS PAR ARCHETYPE

### **Comparaison niveau 15** :

| Archetype  | Arme               | Damage | Defense | Agility | Intelligence | Healing |
| ---------- | ------------------ | ------ | ------- | ------- | ------------ | ------- |
| **Tank**   | Hache de Guerre    | 35     | 8       | -3      | 0            | 0       |
| **Archer** | Dague d'Assassin   | 25     | 0       | 25      | 0            | 0       |
| **Mage**   | Sceptre Arcane     | 28     | 0       | 0       | 30           | 0       |
| **Healer** | Totem Restauration | 0      | 0       | 0       | 20           | 55      |

### **Spécialisations** :

- **Tank** : Survivabilité (Defense, Endurance, Block)
- **Archer** : Dégâts critiques (Crit, Backstab, Poison)
- **Mage** : Dégâts magiques (Spell Power, Mana, Crit Spell)
- **Healer** : Soins (Healing, Heal Bonus, AoE Heal)

---

## 🔄 PROCHAINES ÉTAPES

### **À créer** : 125 recettes restantes

#### **1. ARMURIER (50 recettes)** :

```
Armures lourdes (Tank) : 20 recettes
  - Helm (casques) : 5
  - Chest (plastrons) : 5
  - Legs (jambières) : 5
  - Boots (bottes) : 3
  - Gloves (gantelets) : 2

Armures légères (Archer) : 20 recettes
  - Helm (capuches) : 5
  - Chest (tuniques) : 5
  - Legs (pantalons) : 5
  - Boots (bottes) : 3
  - Gloves (gants) : 2

Armures magiques (Mage/Heal) : 10 recettes
  - Robes : 5
  - Capuches : 3
  - Gants : 2
```

#### **2. BIJOUTIER (25 recettes)** :

```
Anneaux : 10 (tank, archer, mage, healer)
Amulettes : 10 (tank, archer, mage, healer)
Talismans : 5 (universal buffs)
```

#### **3. ALCHIMISTE (20 recettes)** :

```
Potions de vie : 5 (petit → grand)
Potions de stats : 10 (force, agi, int, def...)
Elixirs endgame : 5 (buffs permanents)
```

#### **4. POISSONNIER (15 recettes)** :

```
Buffs de combat : 10
Buffs de profession : 5
```

#### **5. TAILLEUR (15 recettes)** :

```
Robes de mage : 5
Capes/Gants : 5
Équipement de soigneur : 5
```

---

## ⏱️ TEMPS ESTIMÉ RESTANT

- **Armures** : 2h (50 recettes)
- **Accessoires** : 1h (25 recettes)
- **Consommables** : 1h (35 recettes)
- **Tests & ajustements** : 1h

**TOTAL** : ~5h de travail restant

---

## 🎮 VALIDATION GAMEPLAY

### **Questions à valider** :

1. **Équilibrage stats** : Les armes sont-elles bien balancées ?
2. **Progression** : Y a-t-il assez de choix à chaque niveau ?
3. **Loots** : Tous les loots sont-ils utilisés de manière cohérente ?
4. **Archétypes** : Les 4 archétypes sont-ils bien différenciés ?

---

**VOULEZ-VOUS QUE JE CONTINUE ?** 🚀

Options :

- **A** : Continuer avec les armures (50 recettes)
- **B** : Tester les 35 armes d'abord
- **C** : Ajuster les stats avant de continuer
