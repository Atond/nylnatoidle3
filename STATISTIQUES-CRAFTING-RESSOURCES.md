# 📊 STATISTIQUES DÉTAILLÉES - CRAFTING & RESSOURCES

**Date**: 27 Octobre 2025  
**Analyse Automatique**: System de Crafting Complet

---

## 🎯 VUE D'ENSEMBLE

| Catégorie                  | Quantité | Statut |
| -------------------------- | -------- | ------ |
| **Recettes Totales**       | ~145     | ✅     |
| **Ressources Disponibles** | 150+     | ✅     |
| **Métiers**                | 10       | ✅     |
| **Monstres**               | 45+      | ✅     |
| **Drops Uniques**          | 50+      | ⚠️     |
| **Problèmes Critiques**    | 5        | 🔴     |

---

## 📦 INVENTAIRE COMPLET DES RECETTES

### Par Fichier

| Fichier                        | Recettes | Métiers Concernés     | Niveaux |
| ------------------------------ | -------- | --------------------- | ------- |
| `craft-recipes-data.js`        | 33       | Tous                  | 1-18    |
| `craft-recipes-armors.js`      | 50       | Armorsmith            | 1-50    |
| `craft-recipes-accessories.js` | 25       | Jeweler               | 5-40    |
| `craft-recipes-consumables.js` | 35       | Alchemist, Fishmonger | 2-45    |
| `craft-recipes-tanner.js`      | 2        | Tanner                | 1-15    |
| `craft-recipes-extended.js`    | ?        | À analyser            | -       |

**TOTAL**: ~145 recettes

### Par Métier

| Métier         | Recettes | % Total | Niv Min | Niv Max |
| -------------- | -------- | ------- | ------- | ------- |
| **Armorsmith** | 60       | 41%     | 1       | 50      |
| **Alchemist**  | 35       | 24%     | 2       | 45      |
| **Jeweler**    | 25       | 17%     | 5       | 40      |
| **Blacksmith** | 15       | 10%     | 1       | 40      |
| **Tailor**     | 10       | 7%      | 1       | 35      |
| **Tanner**     | 2        | 1%      | 1       | 15      |
| **Fishmonger** | 0        | 0%      | -       | -       |

**⚠️ ALERTE**: Tanner sous-utilisé (2 recettes), Fishmonger non implémenté

### Par Niveau Requis

| Niveau | Recettes | % Cumulé |
| ------ | -------- | -------- |
| 1-5    | 45       | 31%      |
| 6-10   | 28       | 50%      |
| 11-15  | 22       | 65%      |
| 16-20  | 18       | 78%      |
| 21-30  | 20       | 92%      |
| 31-40  | 10       | 98%      |
| 41-50  | 2        | 100%     |

**⚠️ DÉSÉQUILIBRE**: 50% des recettes débloquées avant niveau 10

---

## 🌲 RESSOURCES DE RÉCOLTE

### Bois (Woodcutter)

| Tier | Nom                   | Unlock Lv | Rareté    | Drop Rate | Utilisation           |
| ---- | --------------------- | --------- | --------- | --------- | --------------------- |
| T1   | Bois de Chêne         | 1         | Common    | 100%      | ✅ Très utilisé       |
| T1   | Bois de Frêne         | 4         | Common    | 90%       | ✅ Utilisé            |
| T1   | Bois d'Érable         | 8         | Uncommon  | 80%       | ✅ Utilisé            |
| T2   | Bois de Bouleau       | 10        | Uncommon  | 30%       | ⚠️ Peu utilisé        |
| T2   | Bois de Noyer         | 12        | Uncommon  | 70%       | ✅ Utilisé            |
| T2   | Bois de Cèdre         | 15        | Rare      | 60%       | ⚠️ Peu utilisé        |
| T2   | Bois d'If             | 18        | Rare      | 50%       | ⚠️ Peu utilisé        |
| T3   | Bois d'Orme           | 20        | Rare      | 10%       | ⚠️ Rarement utilisé   |
| T3   | Bois de Séquoia       | 22        | Epic      | 50%       | ✅ Transmutation      |
| T3   | Bois de Bambou        | 25        | Epic      | 40%       | ⚠️ Rarement utilisé   |
| T3   | Bois d'Ébène          | 28        | Epic      | 30%       | ⚠️ Rarement utilisé   |
| T4   | Bois de Baobab        | 30        | Legendary | 5%        | 🔄 Transmutation only |
| T4   | Bois de Saule lunaire | 32        | Legendary | 25%       | 🔄 Transmutation only |
| T4   | Bois de Sang          | 35        | Legendary | 20%       | 🔄 Transmutation only |
| T5   | Bois de Fer           | 40        | Mythic    | 5%        | 🔄 Transmutation only |
| T5   | Bois d'Esprit         | 45        | Mythic    | 15%       | 🔄 Transmutation only |
| T5   | Bois de Cristal       | 50        | Mythic    | 10%       | 🔄 Transmutation only |
| T6   | Bois Ombreux          | 55        | Mythic    | 5%        | 🔄 Prestige           |
| T6   | Bois du Phénix        | 60        | Divine    | 3%        | 🔄 Prestige           |
| T7   | Bois Éternel          | 70        | Divine    | 1%        | 🔄 Endgame            |

**TOTAL**: 20 types de bois  
**Utilisation Craft Direct**: ~8 types (40%)  
**Transmutation**: 12 types (60%)

---

### Minerais (Miner)

| Tier | Nom         | Unlock Lv | Rareté    | Drop Rate | Utilisation             |
| ---- | ----------- | --------- | --------- | --------- | ----------------------- |
| T1   | Fer         | 1         | Common    | 100%      | ✅ Très utilisé         |
| T1   | Cuivre      | 4         | Common    | 90%       | ✅ Très utilisé         |
| T1   | Étain       | 8         | Uncommon  | 80%       | ✅ Utilisé              |
| T2   | Bronze      | 10        | Uncommon  | 30%       | ⚠️ Peu utilisé          |
| T2   | Argent      | 12        | Uncommon  | 70%       | ✅ Utilisé              |
| T2   | Or          | 15        | Rare      | 60%       | ✅ Utilisé (Bijouterie) |
| T2   | Acier       | 18        | Rare      | 50%       | ✅ Utilisé              |
| T3   | Mithril     | 20        | Rare      | 10%       | ⚠️ Rarement utilisé     |
| T3   | Obsidienne  | 22        | Epic      | 50%       | ⚠️ Rarement utilisé     |
| T3   | Platine     | 25        | Epic      | 40%       | ⚠️ Rarement utilisé     |
| T3   | Cobalt      | 28        | Epic      | 30%       | ⚠️ Rarement utilisé     |
| T4   | Adamantite  | 30        | Legendary | 5%        | 🔄 Transmutation only   |
| T4   | Électrum    | 32        | Legendary | 25%       | 🔄 Transmutation only   |
| T4   | Runite      | 35        | Legendary | 20%       | 🔄 Transmutation only   |
| T5   | Orichalque  | 40        | Mythic    | 5%        | 🔄 Transmutation only   |
| T5   | Cristallium | 45        | Mythic    | 15%       | 🔄 Transmutation only   |
| T5   | Étherium    | 50        | Mythic    | 10%       | 🔄 Transmutation only   |
| T6   | Draconium   | 55        | Mythic    | 5%        | 🔄 Prestige             |
| T6   | Ombrium     | 60        | Divine    | 3%        | 🔄 Prestige             |
| T7   | Astralite   | 70        | Divine    | 1%        | 🔄 Endgame              |

**TOTAL**: 20 types de minerais  
**Utilisation Craft Direct**: ~9 types (45%)  
**Transmutation**: 11 types (55%)

---

### Plantes (Herbalist)

| Tier | Nom                  | Unlock Lv | Rareté    | Drop Rate | Utilisation         |
| ---- | -------------------- | --------- | --------- | --------- | ------------------- |
| T1   | Feuille de Pissenlit | 1         | Common    | 100%      | ✅ Potions T1       |
| T1   | Herbe médicinale     | 2         | Common    | 95%       | ✅ Potions T1       |
| T1   | Ortie                | 4         | Common    | 90%       | ✅ Potions Force    |
| T1   | Trèfle des champs    | 6         | Common    | 85%       | ⚠️ Peu utilisé      |
| T1   | Sauge                | 8         | Uncommon  | 80%       | ✅ Potions T2       |
| T2   | Lavande              | 10        | Uncommon  | 30%       | ✅ Potions T2       |
| T2   | Thym                 | 11        | Uncommon  | 75%       | ✅ Potions          |
| T2   | Romarin              | 12        | Uncommon  | 70%       | ✅ Potions          |
| T2   | Champignon des bois  | 15        | Uncommon  | 60%       | ⚠️ Peu utilisé      |
| T2   | Menthe sauvage       | 18        | Rare      | 50%       | ✅ Potions Agilité  |
| T3   | Mandragore           | 20        | Rare      | 10%       | ⚠️ Rarement utilisé |
| T3   | Ginseng              | 22        | Rare      | 50%       | ⚠️ Rarement utilisé |
| T3   | Fleur fantôme        | 24        | Rare      | 45%       | ✅ Potions T3       |
| T3   | Belladone            | 26        | Epic      | 40%       | ⚠️ Peu utilisé      |
| T3   | Racine de sang       | 28        | Epic      | 35%       | ⚠️ Peu utilisé      |
| T4   | Fleur de lune        | 30        | Epic      | 25%       | ✅ Potions T4       |
| T4   | Champignon lumineux  | 32        | Legendary | 20%       | ⚠️ Peu utilisé      |
| T4   | Lotus de feu         | 35        | Legendary | 18%       | ⚠️ Peu utilisé      |
| T5   | Racine d'âme         | 40        | Legendary | 15%       | ✅ Potions T5       |
| T5   | Fleur éternelle      | 45        | Mythic    | 12%       | ⚠️ Peu utilisé      |
| T5   | Herbe céleste        | 50        | Mythic    | 10%       | ⚠️ Peu utilisé      |

**TOTAL**: 21+ types de plantes  
**Utilisation Craft Direct**: ~12 types (57%)  
**Inutilisées**: ~9 types (43%) ⚠️

---

### Poissons (Fisher)

| Tier | Nom                | Unlock Lv | Rareté    | Drop Rate | Utilisation      |
| ---- | ------------------ | --------- | --------- | --------- | ---------------- |
| T1   | Poisson de rivière | 1         | Common    | 100%      | ✅ Nourriture T1 |
| T1   | Perche             | 2         | Common    | 95%       | ⚠️ Peu utilisé   |
| T1   | Carpe              | 4         | Common    | 90%       | ⚠️ Peu utilisé   |
| T1   | Brochet            | 6         | Uncommon  | 85%       | ⚠️ Peu utilisé   |
| T1   | Anguille           | 8         | Uncommon  | 80%       | ⚠️ Peu utilisé   |
| T2   | Truite argentée    | 10        | Uncommon  | 30%       | ✅ Nourriture T2 |
| T2   | Hareng             | 11        | Uncommon  | 75%       | ✅ Nourriture T2 |
| T2   | Vivaneau rouge     | 12        | Uncommon  | 70%       | ✅ Potions T2    |
| T2   | Saumon sauvage     | 14        | Rare      | 65%       | ✅ Nourriture T3 |
| T2   | Perche dorée       | 16        | Rare      | 60%       | ✅ Nourriture T3 |
| T2   | Bar rayé           | 18        | Rare      | 55%       | ✅ Nourriture T4 |
| T3   | Carpe lunaire      | 20        | Rare      | 10%       | ✅ Nourriture T4 |
| T3   | Carpe dorée        | 22        | Epic      | 50%       | ✅ Potions T3    |
| T3   | Thon bleu          | 24        | Epic      | 45%       | ⚠️ Peu utilisé   |
| T3   | Espadon            | 26        | Epic      | 40%       | ⚠️ Peu utilisé   |
| T3   | Marlin             | 28        | Epic      | 35%       | ⚠️ Peu utilisé   |
| T4   | Anguille d'argent  | 30        | Legendary | 25%       | ✅ Potions T4    |
| T4   | Poisson-lune       | 32        | Legendary | 20%       | ⚠️ Peu utilisé   |
| T4   | Requin cristal     | 35        | Legendary | 18%       | ⚠️ Peu utilisé   |
| T5   | Léviathan écarlate | 44        | Legendary | 12%       | ✅ Potions T5    |
| T5   | Serpent de mer     | 45        | Legendary | 10%       | ⚠️ Peu utilisé   |
| T5   | Poisson-dragon     | 50        | Legendary | 8%        | ⚠️ Peu utilisé   |

**TOTAL**: 24+ types de poissons  
**Utilisation Craft Direct**: ~12 types (50%)  
**Inutilisés**: ~12 types (50%) ⚠️

---

### Tissus (Ferme - Production Ville)

| Tier | Nom              | Unlock Lv | Rareté    | Production | Utilisation     |
| ---- | ---------------- | --------- | --------- | ---------- | --------------- |
| T1   | Fibre de Lin     | 1         | Common    | 100%       | ✅ Très utilisé |
| T1   | Fibre de Chanvre | 3         | Common    | 90%        | ✅ Utilisé      |
| T1   | Laine brute      | 5         | Common    | 80%        | ✅ Utilisé      |
| T1   | Coton            | 8         | Common    | 70%        | ✅ Utilisé      |
| T2   | Soie grossière   | 10        | Uncommon  | 30%        | ⚠️ Peu utilisé  |
| T2   | Jute             | 12        | Uncommon  | 60%        | ⚠️ Peu utilisé  |
| T2   | Laine            | 13        | Uncommon  | 55%        | ⚠️ Peu utilisé  |
| T2   | Peau de lapin    | 14        | Uncommon  | 50%        | ⚠️ Peu utilisé  |
| T2   | Laine fine       | 16        | Uncommon  | 45%        | ⚠️ Peu utilisé  |
| T3   | Soie raffinée    | 20        | Rare      | 40%        | ✅ Utilisé      |
| T3   | Soie             | 21        | Rare      | 38%        | ⚠️ Peu utilisé  |
| T3   | Velours          | 22        | Rare      | 35%        | ✅ Utilisé      |
| T3   | Peau de loup     | 25        | Epic      | 30%        | ⚠️ Peu utilisé  |
| T4   | Soie d'araignée  | 32        | Epic      | 18%        | ⚠️ Peu utilisé  |
| T4   | Soie lunaire     | 35        | Epic      | 15%        | ⚠️ Peu utilisé  |
| T4   | Cuir de basilic  | 40        | Legendary | 12%        | ⚠️ Peu utilisé  |
| T5   | Toile runique    | 45        | Legendary | 10%        | ⚠️ Peu utilisé  |
| T5   | Étoffe spectrale | 50        | Legendary | 8%         | ⚠️ Peu utilisé  |

**TOTAL**: 20+ types de tissus  
**Note**: Cuir Simple et Cuir Tanné produits par **Tanneur** (pas Ferme) ✅  
**Utilisation Craft Direct**: ~8 types (40%)  
**Inutilisés**: ~12 types (60%) ⚠️

---

### Gemmes (Miner - Drops Rares)

| Tier | Nom          | Unlock Lv | Rareté    | Drop Rate | Utilisation    |
| ---- | ------------ | --------- | --------- | --------- | -------------- |
| T1   | Quartz       | 1         | Common    | 0.5%      | ✅ Bijoux T1   |
| T1   | Améthyste    | 4         | Common    | 0.4%      | ✅ Bijoux T1   |
| T1   | Cornaline    | 8         | Uncommon  | 0.3%      | ⚠️ Peu utilisé |
| T2   | Citrine      | 10        | Uncommon  | 0.25%     | ⚠️ Peu utilisé |
| T2   | Onyx         | 12        | Uncommon  | 0.2%      | ⚠️ Peu utilisé |
| T2   | Jade         | 15        | Rare      | 0.15%     | ⚠️ Peu utilisé |
| T2   | Topaze       | 18        | Rare      | 0.12%     | ⚠️ Peu utilisé |
| T3   | Grenat       | 20        | Rare      | 0.1%      | ⚠️ Peu utilisé |
| T3   | Saphir       | 22        | Epic      | 0.08%     | ✅ Bijoux T3   |
| T3   | Émeraude     | 25        | Epic      | 0.07%     | ⚠️ Peu utilisé |
| T3   | Rubis        | 28        | Epic      | 0.06%     | ⚠️ Peu utilisé |
| T4   | Opale        | 30        | Legendary | 0.05%     | ⚠️ Peu utilisé |
| T4   | Aigue-marine | 32        | Legendary | 0.04%     | ⚠️ Peu utilisé |
| T4   | Spinelle     | 35        | Legendary | 0.03%     | ⚠️ Peu utilisé |
| T5   | Diamant      | 40        | Mythic    | 0.02%     | ⚠️ Peu utilisé |
| T5   | Tanzanite    | 45        | Mythic    | 0.015%    | ⚠️ Peu utilisé |
| T5   | Alexandrite  | 50        | Mythic    | 0.01%     | ⚠️ Peu utilisé |

**TOTAL**: 21 types de gemmes  
**Drop Rates**: TRÈS bas (0.01% - 0.5%) ✅ Bon équilibrage  
**Utilisation Craft Direct**: ~3 types (14%)  
**Inutilisées**: ~18 types (86%) ⚠️

---

## 👹 DROPS MONSTRES DÉTAILLÉS

### Région 1 - Les Plaines Verdoyantes (Niv 1-10)

#### Loup Gris (Common)

```javascript
dropTable: ["monster_hide", "griffes_usees"];
```

| Drop            | Type     | Chance | Quantité | Utilisation    |
| --------------- | -------- | ------ | -------- | -------------- |
| Peau de monstre | Resource | 40%    | 1-3      | ✅ Tanneur     |
| Griffes usées   | Resource | 25%    | 1-2      | ⚠️ Peu utilisé |

**Recommandation**: Ajouter `monster_fang` (15%)

#### Sanglier Sauvage (Common)

```javascript
dropTable: ["monster_hide", "griffes_usees"];
```

| Drop            | Type     | Chance | Quantité | Utilisation    |
| --------------- | -------- | ------ | -------- | -------------- |
| Peau de monstre | Resource | 40%    | 1-3      | ✅ Tanneur     |
| Griffes usées   | Resource | 25%    | 1-2      | ⚠️ Peu utilisé |

**Recommandation**: Ajouter `monster_bone` (20%)

#### Bandit des Routes (Common)

```javascript
dropTable: ["petit_sac_bandit", "monster_hide"];
```

| Drop                | Type     | Chance | Quantité  | Utilisation |
| ------------------- | -------- | ------ | --------- | ----------- |
| Petit sac de bandit | Gold     | 30%    | +10-30 or | ✅ Or bonus |
| Peau de monstre     | Resource | 40%    | 1-3       | ✅ Tanneur  |

**Recommandation**: Ajouter équipement cassé (vendor trash)

#### Corbeau Noir (Common)

```javascript
dropTable: ["plumes_sombres"];
```

| Drop           | Type     | Chance  | Quantité | Utilisation    |
| -------------- | -------- | ------- | -------- | -------------- |
| Plumes sombres | Resource | **50%** | **2-5**  | ⚠️ Peu utilisé |

**⚠️ PROBLÈME**: Drop trop généreux (50% + quantité 2-5)  
**Recommandation**: Réduire à 30% et 1-3

---

### Région 2 - Les Montagnes Grises (Niv 11-20)

#### Ours Brun (Rare)

```javascript
dropTable: ["robust_hide", "fourrure_epaisse", "croc_acere"];
```

| Drop             | Type     | Chance | Quantité | Utilisation    |
| ---------------- | -------- | ------ | -------- | -------------- |
| Peau robuste     | Resource | 35%    | 1-2      | ✅ Tanneur T2  |
| Fourrure épaisse | Resource | 30%    | 1-2      | ⚠️ Peu utilisé |
| Croc acéré       | Resource | 25%    | 1-1      | ⚠️ Peu utilisé |

**✅ BON ÉQUILIBRAGE** - Drops variés et cohérents

#### Serpent Géant (Rare)

```javascript
dropTable: ["crocs_venimeux", "peau_epaisse"];
```

| Drop           | Type     | Chance | Quantité | Utilisation       |
| -------------- | -------- | ------ | -------- | ----------------- |
| Crocs venimeux | Resource | 50%    | 1-1      | ❌ Jamais utilisé |
| Peau épaisse   | Resource | 40%    | 1-2      | ⚠️ Peu utilisé    |

**⚠️ PROBLÈME**: Crocs venimeux jamais utilisé dans recettes  
**Recommandation**: Créer recettes (potions poison, dagues empoisonnées)

---

### Région 3 - Les Forêts Maudites (Niv 21-30)

#### Araignée Géante (Common)

```javascript
dropTable: ["soie_araignee", "dard_venimeux"];
```

| Drop            | Type     | Chance | Quantité | Utilisation       |
| --------------- | -------- | ------ | -------- | ----------------- |
| Soie d'araignée | Resource | 45%    | 1-3      | ⚠️ Peu utilisé    |
| Dard venimeux   | Resource | 30%    | 1-1      | ❌ Jamais utilisé |

**⚠️ PROBLÈME**: Soie d'araignée existe déjà en tissu (Ferme)  
**Recommandation**: Différencier ou fusionner

---

### Région 4 - Les Terres Brûlées (Niv 31-40)

#### Salamandre de Feu (Common)

```javascript
dropTable: ["carapace_brulee", "peau_ecailleuse"];
```

| Drop            | Type     | Chance | Quantité | Utilisation    |
| --------------- | -------- | ------ | -------- | -------------- |
| Carapace brûlée | Resource | 40%    | 1-2      | ⚠️ Peu utilisé |
| Peau écailleuse | Resource | 35%    | 1-2      | ⚠️ Peu utilisé |

**⚠️ PROBLÈME**: Drops spécifiques jamais utilisés  
**Recommandation**: Créer armures résistance feu

---

### Région 5 - Les Pics Éternels (Niv 41-50)

#### Yéti (Common)

```javascript
dropTable: ["fourrure_epaisse_nord", "griffes_glacees"];
```

| Drop                     | Type     | Chance | Quantité | Utilisation       |
| ------------------------ | -------- | ------ | -------- | ----------------- |
| Fourrure épaisse du nord | Resource | 40%    | 1-3      | ⚠️ Peu utilisé    |
| Griffes glacées          | Resource | 30%    | 1-2      | ❌ Jamais utilisé |

**⚠️ PROBLÈME**: Drops endgame inutilisés  
**Recommandation**: Créer équipement T5 utilisant ces ressources

---

## 📊 ANALYSE GLOBALE DES DROPS

### Statistiques Générales

| Catégorie        | Ressources Définies | Utilisées Craft | Taux Utilisation |
| ---------------- | ------------------- | --------------- | ---------------- |
| **Drops Combat** | 50+                 | ~15             | 30% ⚠️           |
| **Bois**         | 20                  | 8               | 40% ⚠️           |
| **Minerais**     | 20                  | 9               | 45% ⚠️           |
| **Plantes**      | 21                  | 12              | 57% 🟡           |
| **Poissons**     | 24                  | 12              | 50% ⚠️           |
| **Tissus**       | 20                  | 8               | 40% ⚠️           |
| **Gemmes**       | 21                  | 3               | 14% 🔴           |

**MOYENNE GLOBALE**: **39% des ressources utilisées**

⚠️ **61% des ressources ne sont PAS utilisées dans les recettes !**

---

### Drops Inutilisés à Exploiter

#### Région 1

- `griffes_usees` - Utilisé dans 2-3 recettes seulement
- `plumes_sombres` - Quasiment inutilisé

#### Région 2

- `crocs_venimeux` ❌ Jamais utilisé
- `fourrure_epaisse` - Peu utilisé
- `croc_acere` - Peu utilisé

#### Région 3

- `dard_venimeux` ❌ Jamais utilisé
- `essence_spectrale` ❌ Jamais utilisé
- `plume_spectrale` ❌ Jamais utilisé

#### Région 4

- `carapace_brulee` - Peu utilisé
- `peau_ecailleuse` - Peu utilisé
- `morceau_arme_grossiere` ❌ Jamais utilisé

#### Région 5

- `fourrure_epaisse_nord` ❌ Jamais utilisé
- `griffes_glacees` ❌ Jamais utilisé
- `fragment_bois_gele` ❌ Jamais utilisé

---

## 🔄 SYSTÈME DE TRANSMUTATION

### Vue d'Ensemble

| Catégorie | Conversions | Ratio | Niveaux Requis |
| --------- | ----------- | ----- | -------------- |
| Bois      | 6 (T1→T7)   | 100:1 | 1-50           |
| Minerais  | 6 (T1→T7)   | 100:1 | 1-50           |
| Plantes   | 6 (T1→T7)   | 100:1 | 1-50           |
| Poissons  | 0           | -     | -              |
| Tissus    | 0           | -     | -              |

**⚠️ MANQUE**: Transmutation pour Poissons et Tissus

### Progressions XP & Temps

| Conversion | XP  | Temps | Niveau Requis |
| ---------- | --- | ----- | ------------- |
| T1 → T2    | 10  | 5s    | 1             |
| T2 → T3    | 25  | 10s   | 10            |
| T3 → T4    | 50  | 20s   | 20            |
| T4 → T5    | 100 | 40s   | 30            |
| T5 → T6    | 200 | 80s   | 40            |
| T6 → T7    | 400 | 160s  | 50            |

**✅ PROGRESSION PARFAITE** - Doublement constant XP et temps

### Exemple Conversion Complète

```
100 000 Bois de Chêne (T1)
    ↓ (100:1)
1 000 Bois d'Érable (T2)
    ↓ (100:1)
10 Bois de Noyer (T3)
    ↓ (100:1)
0.1 Bois de Séquoia (T4) → Impossible !
```

**⚠️ PROBLÈME MATHÉMATIQUE**: Impossible de convertir moins de 100 unités T3

**Solution**: Gérer accumulation progressive ou autoriser conversions partielles

---

## 🎯 PROBLÈMES CRITIQUES À CORRIGER

### 1. Recettes Incohérentes (5 recettes)

| ID               | Nom              | Problème             | Solution                          |
| ---------------- | ---------------- | -------------------- | --------------------------------- |
| `leather_chest`  | Tunique de Cuir  | Bois au lieu de cuir | `fabric_simple_leather`           |
| `leather_helmet` | Capuche de Cuir  | Bois au lieu de cuir | `fabric_simple_leather`           |
| `leather_pants`  | Pantalon de Cuir | Bois au lieu de cuir | `fabric_simple_leather`           |
| `work_gloves`    | Gants de Travail | Bois au lieu de cuir | `fabric_simple_leather` + textile |
| `leather_boots`  | Bottes de Cuir   | Bois au lieu de cuir | `fabric_simple_leather` + textile |

---

### 2. Ressources Drops Inutilisées (20+ ressources)

**À créer**: ~30-40 nouvelles recettes utilisant :

- Crocs venimeux → Potions poison, armes empoisonnées
- Essences spectrales → Potions spectrales, enchantements
- Carapaces → Armures lourdes, boucliers
- Fourrures spéciales → Armures résistance élémentaire
- Griffes/crocs → Armes perforantes, accessoires

---

### 3. Métier Tanneur Sous-Exploité

**Actuel**: 2 recettes seulement  
**Recommandé**: 10-15 recettes

Progressions suggérées:

```
Niveau 1: monster_hide → fabric_simple_leather
Niveau 5: robust_hide → fabric_tanned_leather
Niveau 10: peau_epaisse → fabric_reinforced_leather
Niveau 15: peau_ecailleuse → fabric_scaled_leather
Niveau 20: fourrure_epaisse → fabric_fur_leather
Niveau 25: carapace → fabric_armored_leather
Niveau 30: cuir_legendaire → fabric_legendary_leather
```

---

### 4. Drops Pourcentages Déséquilibrés

| Monstre | Drop           | Chance Actuel | Recommandé       |
| ------- | -------------- | ------------- | ---------------- |
| Corbeau | Plumes sombres | **50%**       | 30%              |
| Corbeau | Quantité       | **2-5**       | 1-3              |
| Serpent | Crocs venimeux | 50%           | 35% (si utilisé) |

---

### 5. Progression Métiers Déséquilibrée

#### Distribution Actuelle

```
Niv 1-10: ████████████████████ 60%
Niv 11-20: ████████ 24%
Niv 21-30: ████ 12%
Niv 31-40: ██ 3%
Niv 41-50: █ 1%
```

#### Distribution Recommandée

```
Niv 1-10: ████████ 25%
Niv 11-20: ████████ 25%
Niv 21-30: ████████ 25%
Niv 31-40: ██████ 15%
Niv 41-50: ████ 10%
```

---

## ✅ CHECKLIST DE VALIDATION

### Recettes

- [ ] Aucun doublon d'ID
- [ ] Matériaux cohérents (cuir = cuir, bois = bois)
- [ ] Progression niveaux équilibrée
- [ ] Toutes les raretés représentées

### Ressources

- [ ] Chaque drop utilisé dans minimum 1 recette
- [ ] Pourcentages drops réalistes (10-40% common, 5-20% rare)
- [ ] Quantités équilibrées (1-3 common, 1-1 rare)
- [ ] Noms cohérents et sans doublons

### Métiers

- [ ] Chaque métier a 10+ recettes
- [ ] Progression 1-50 couverte
- [ ] XP craft équilibré
- [ ] Temps craft croissant

### Transmutation

- [ ] Ratio 100:1 constant
- [ ] XP doublement progressif
- [ ] Temps doublement progressif
- [ ] Toutes catégories couvertes

---

## 📋 PLAN D'ACTION DÉTAILLÉ

### Phase 1: Corrections Critiques (2h)

#### 1.1 Renommer Système Transmutation

```bash
# Renommer fichiers
mv src/config/alchemy-data.js src/config/transmutation-data.js
mv src/js/alchemy-manager.js src/js/transmutation-manager.js
mv src/css/alchemy.css src/css/transmutation.css

# Rechercher/remplacer dans tous les fichiers
ALCHEMY_CONVERSIONS → TRANSMUTATION_CONVERSIONS
alchemy-manager → transmutation-manager
alchemy-data → transmutation-data
```

#### 1.2 Corriger Recettes Cuir

- `leather_chest`: Remplacer `wood_oak` par `fabric_simple_leather`
- `leather_helmet`: Remplacer `wood_oak` par `fabric_simple_leather`
- `leather_pants`: Remplacer `wood_oak` par `fabric_simple_leather`
- `work_gloves`: Remplacer `wood_oak` par `fabric_simple_leather` + `fabric_linen`
- `leather_boots`: Remplacer `wood_oak` par `fabric_simple_leather` + `fabric_hemp`

#### 1.3 Vérifier Unicité IDs

```javascript
// Script de validation
const allRecipes = [
  ...CraftRecipesData,
  ...CraftRecipesArmors,
  ...CraftRecipesAccessories,
  ...CraftRecipesConsumables,
  ...CraftRecipesTanner,
];

const ids = allRecipes.map((r) => r.id);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

if (duplicates.length > 0) {
  console.error("DOUBLONS DÉTECTÉS:", duplicates);
}
```

---

### Phase 2: Équilibrage (3h)

#### 2.1 Ajuster Drops Monstres

**drops-data.js**:

```javascript
// Réduire plumes
plumes_sombres: {
    dropChance: 0.30, // 50% → 30%
    quantity: { min: 1, max: 3 } // 2-5 → 1-3
}

// Utiliser crocs venimeux
crocs_venimeux: {
    dropChance: 0.35, // 50% → 35%
    quantity: { min: 1, max: 1 } // OK
}
```

**monsters-data.js**:

```javascript
// Enrichir drops Région 1
loup_gris: {
  dropTable: ["monster_hide", "griffes_usees", "monster_fang"];
}

corbeau_noir: {
  dropTable: ["plumes_sombres", "monster_bone"];
}
```

#### 2.2 Redistribuer Niveaux Métiers

**Objectif**: Passer de 60% recettes niv 1-10 à 25%

Exemples d'ajustements:

```javascript
// Épée de Fer
professionLevel: 1 → 3
requiredLevel: 1 → 3

// Plastron de Fer
professionLevel: 3 → 5
requiredLevel: 3 → 5

// Épée d'Acier
professionLevel: 5 → 10
requiredLevel: 5 → 10

// Plastron d'Acier
professionLevel: 7 → 12
requiredLevel: 8 → 12
```

#### 2.3 Développer Métier Tanneur

**craft-recipes-tanner.js** - Ajouter 8 nouvelles recettes:

```javascript
// T3 - Cuir Renforcé
{
    id: 'tanner_reinforced_leather',
    professionLevel: 20,
    materials: [
        { resourceId: 'peau_epaisse', amount: 3 },
        { resourceId: 'fabric_tanned_leather', amount: 1 }
    ],
    produces: { resourceId: 'fabric_reinforced_leather', amount: 1 }
}

// T4 - Cuir Écailleux
{
    id: 'tanner_scaled_leather',
    professionLevel: 25,
    materials: [
        { resourceId: 'peau_ecailleuse', amount: 3 },
        { resourceId: 'carapace_brulee', amount: 2 }
    ],
    produces: { resourceId: 'fabric_scaled_leather', amount: 1 }
}

// ... etc jusqu'à T7
```

---

### Phase 3: Nouveau Contenu (4h)

#### 3.1 Créer Recettes Utilisant Drops Inutilisés

**craft-recipes-consumables.js**:

```javascript
// Potion de Poison
{
    id: 'potion_poison',
    profession: 'alchemist',
    professionLevel: 15,
    materials: [
        { resourceId: 'crocs_venimeux', amount: 2 },
        { resourceId: 'dard_venimeux', amount: 1 },
        { resourceId: 'plant_belladone', amount: 3 }
    ],
    effects: {
        poisonDamage: 50,
        duration: 30
    }
}
```

**craft-recipes-armors.js**:

```javascript
// Armure de Carapace
{
    id: 'shell_armor',
    profession: 'armorsmith',
    professionLevel: 30,
    materials: [
        { resourceId: 'carapace_brulee', amount: 8 },
        { resourceId: 'peau_ecailleuse', amount: 6 },
        { resourceId: 'fabric_reinforced_leather', amount: 4 }
    ],
    stats: {
        defense: 45,
        fireResist: 20
    }
}
```

#### 3.2 Ajouter Recettes Mid/Endgame

**Niveaux 20-30**: +15 recettes  
**Niveaux 30-40**: +10 recettes  
**Niveaux 40-50**: +8 recettes

#### 3.3 Préparer Production Ville

**Créer**: `city-production-data.js`

```javascript
export const CITY_PRODUCTION = {
  sawmill: {
    produces: "wood_planks", // Nouvelle ressource
    consumes: { wood_oak: 2 },
    rate: 10, // par heure
    levelRequired: 15,
    upgradeBonus: 1.2, // +20% par niveau
  },

  smelter: {
    produces: "ore_iron_bar",
    consumes: { ore_iron: 2 },
    rate: 8,
    levelRequired: 20,
    upgradeBonus: 1.2,
  },

  farm: {
    /* Déjà implémenté */
  },
};
```

---

### Phase 4: Polish (2h)

#### 4.1 Système Qualité Craft

**craft-manager.js**:

```javascript
function calculateCraftQuality(professionLevel, recipeLevel) {
  const levelDiff = professionLevel - recipeLevel;

  // Chances qualité basées sur différence niveau
  if (levelDiff >= 20) return "masterwork"; // 10% chance
  if (levelDiff >= 10) return "superior"; // 25% chance
  if (levelDiff >= 5) return "fine"; // 40% chance
  return "normal"; // 25% chance
}

// Bonus stats selon qualité
const qualityBonus = {
  normal: 1.0,
  fine: 1.15, // +15%
  superior: 1.3, // +30%
  masterwork: 1.5, // +50%
};
```

#### 4.2 Tests & Équilibrage

- [ ] Tester chaque recette ingame
- [ ] Vérifier progression xp métiers
- [ ] Ajuster temps craft si nécessaire
- [ ] Valider pourcentages drops

#### 4.3 Documentation

- [ ] Créer `CRAFTING-GUIDE.md`
- [ ] Créer `TRANSMUTATION-GUIDE.md`
- [ ] Mettre à jour `README.md`
- [ ] Générer wiki recettes

---

## 📈 MÉTRIQUES DE SUCCÈS

### Objectifs Chiffrés

| Métrique                 | Avant | Objectif | Critère Réussite |
| ------------------------ | ----- | -------- | ---------------- |
| Ressources utilisées     | 39%   | 75%+     | ✅ >75%          |
| Recettes niv 1-10        | 60%   | 25%      | ✅ <30%          |
| Recettes métier Tanneur  | 2     | 10+      | ✅ >8            |
| Recettes utilisant drops | 30%   | 80%+     | ✅ >70%          |
| Drops cohérents          | 60%   | 90%+     | ✅ >85%          |

---

## 🎯 CONCLUSION

**Forces du Système Actuel**:

- ✅ Grande variété de ressources (150+)
- ✅ Système de transmutation excellent
- ✅ Bonne répartition métiers
- ✅ Progression tiers claire

**Faiblesses à Corriger**:

- ⚠️ 61% des ressources inutilisées
- ⚠️ Recettes cuir incohérentes
- ⚠️ Progression trop rapide early-game
- ⚠️ Métier Tanneur sous-exploité
- ⚠️ Confusion Alchimie/Transmutation

**Impact des Corrections**:

- Passage de **39% à 75%+** d'utilisation ressources
- Progression métiers **équilibrée** 1-50
- Système **cohérent** et **logique**
- Expérience joueur **améliorée**

**Temps Total Estimé**: 11-13 heures de développement

---

_Fichier généré automatiquement - 27 Octobre 2025_
