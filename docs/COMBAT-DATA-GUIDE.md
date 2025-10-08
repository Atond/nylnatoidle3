# 📚 Guide des Fichiers de Données - Système de Combat

## 🎯 Vue d'ensemble

J'ai créé **3 fichiers de données** pour structurer tout le système de combat :

```
src/config/
├── regions-data.js    ← Régions, Zones, Capitales, Villes, Lore
├── monsters-data.js   ← Tous les types de monstres et leurs stats
└── drops-data.js      ← Ressources droppées par les monstres
```

---

## 📁 regions-data.js

### Structure complète de la Région 1

✅ **Les 5 régions** avec noms et icônes
✅ **Région 1 complète** : Les Plaines Verdoyantes
✅ **10 zones** avec noms, descriptions, niveaux, monstres
✅ **Capitale** : Érialis (accessible niveau 1)
✅ **3 villes** : Clairval, Fonterive, Brumechêne
✅ **Faction** : Les Humains d'Érialis (lore complet)
✅ **Antagoniste** : L'Ombre (force corrompue)
✅ **Boss** : La Bête des Prairies

### Exemple d'utilisation dans le code :

```javascript
// Obtenir la région 1
const region = RegionsData.getRegion(1);
console.log(region.name); // "Les Plaines Verdoyantes"

// Obtenir une zone spécifique
const zone = RegionsData.getZone(1, 5); // Région 1, Zone 5
console.log(zone.name); // "Collines Dorées"
console.log(zone.monsters.common); // ['loup_gris', 'sanglier_sauvage', 'bandit_routes']

// Obtenir le boss
const boss = RegionsData.getBoss(1);
console.log(boss.name); // "La Bête des Prairies"
```

### Ce qui reste à compléter :

- Régions 2-5 : zones, villes, capitales (structure déjà en place)

---

## 📁 monsters-data.js

### Tous les monstres de la Région 1

✅ **4 monstres communs** : Loup Gris, Sanglier Sauvage, Bandit des Routes, Corbeau Noir
✅ **3 monstres rares** : Ours Brun (8%), Serpent Venimeux (6%), Épouvantail Animé (5%)
✅ **2 monstres élites** : Troll des Collines (2%), Chevalier Renégat (1.5%)
✅ **1 boss** : La Bête des Prairies

### Stats pour chaque monstre :

- **HP, Attaque, Défense, Vitesse** (baseStats)
- **Récompenses** : XP et Or
- **Drop table** : Références vers drops-data.js
- **Spawn chance** : Pour rares/élites (RNG)

### Exemple d'utilisation :

```javascript
// Obtenir un monstre
const loup = MonstersData.getMonster("loup_gris");
console.log(loup.name); // "Loup Gris"
console.log(loup.baseStats.hp); // 25

// Calculer les stats avec scaling de niveau
const statsNiveau5 = MonstersData.calculateStats(loup, 5);
console.log(statsNiveau5.hp); // 25 * (1 + 4 * 0.3) = 55 HP

// Obtenir un monstre aléatoire d'une zone
const zone5Monsters = [
  "loup_gris",
  "sanglier_sauvage",
  "bandit_routes",
  "ours_brun",
  "troll_collines",
];
const randomMonster = MonstersData.getRandomMonster(zone5Monsters);
// Peut retourner : Troll (2% chance), Ours (8% chance), sinon un commun
```

### Ce qui reste à compléter :

- Monstres des régions 2-5 (même structure)

---

## 📁 drops-data.js

### Toutes les ressources de la Région 1

✅ **4 drops communs** : Peau Animale, Griffes Usées, Plumes Sombres, Petit Sac de Bandit
✅ **3 drops rares** : Cuir Robuste, Crocs Venimeux, Essence Végétale Instable
✅ **3 drops élites** : Os Massif, Armure Cabossée, Sang Concentré
✅ **3 drops boss** : Corne Ancienne, Cuir Légendaire, Essence de la Vie Sauvage (100% garanti)

### Pour chaque drop :

- **Chance de drop** : 25% à 100%
- **Quantité** : Min-Max
- **Prix de vente** : Or
- **Rareté** : common, rare, elite, legendary

### Exemple d'utilisation :

```javascript
// Calculer les drops d'un monstre tué
const loup = MonstersData.getMonster("loup_gris");
const drops = DropsData.calculateDrops(loup);
// Retourne : [{ id: 'peau_animale', quantity: 2, ... }, { id: 'griffes_usees', quantity: 1, ... }]

// Appliquer les drops au joueur
const result = DropsData.applyDrops(game, drops);
console.log(`Vous avez obtenu : ${result.items.length} objets + ${result.goldBonus} or bonus !`);
```

### Ce qui reste à compléter :

- Drops des régions 2-5 (même structure)

---

## 🔗 Comment tout est lié

### Flow de combat :

```
1. Joueur dans Région 1, Zone 5 (Collines Dorées)
   ↓
2. RegionsData.getZone(1, 5) → monsters: ['loup_gris', 'sanglier_sauvage', 'bandit_routes', 'ours_brun', 'troll_collines']
   ↓
3. MonstersData.getRandomMonster(monsterIds) → Spawn "Troll des Collines" (2% chance)
   ↓
4. Combat → Joueur tue le Troll
   ↓
5. DropsData.calculateDrops(troll) → ['os_massif' x2, 'sang_concentre' x1]
   ↓
6. DropsData.applyDrops(game, drops) → Ajoute 2 Os Massif + 1 Sang Concentré à l'inventaire
   ↓
7. Joueur gagne : 80 XP + 60 or (du monstre) + ressources
```

---

## 📊 Avantages de cette structure

✅ **Séparation des responsabilités** : Régions / Monstres / Drops séparés
✅ **Facilement extensible** : Ajouter une région = copier la structure
✅ **Données centralisées** : Tout est dans `/config`, pas dans le code
✅ **Facile à balancer** : Changer les stats = modifier un seul fichier
✅ **Support du RNG** : Spawn chances pour rares/élites
✅ **Lore intégré** : Faction, antagoniste, descriptions
✅ **Prêt pour l'UI** : Icônes, descriptions, tout est là

---

## 🎯 Prochaines étapes

### 1. Intégrer les fichiers dans index.html (5min)

Ajouter avant `game.js` :

```html
<script src="src/config/regions-data.js"></script>
<script src="src/config/monsters-data.js"></script>
<script src="src/config/drops-data.js"></script>
```

### 2. Modifier combat.js pour utiliser les nouvelles données (30min-1h)

- Remplacer le système de zones hardcodé
- Utiliser `RegionsData` et `MonstersData`
- Implémenter spawn de monstres rares/élites
- Ajouter système de drops

### 3. Modifier monster.js (30min)

- Utiliser les données de `MonstersData`
- Supprimer les stats hardcodées
- Ajouter support pour boss

### 4. Créer UI de navigation Région/Zone (1h)

- Afficher régions disponibles
- Afficher zones de la région actuelle
- Boutons de navigation
- Affichage du boss

### 5. Compléter les données des 4 autres régions (2-3h)

- Copier-coller la structure de Région 1
- Remplir avec tes données Excel
- Ajuster les niveaux/stats

---

## ❓ Questions ?

**Q : Comment ajouter un nouveau monstre ?**
→ Ajoute-le dans `monsters-data.js` dans la bonne catégorie (common/rare/elite)

**Q : Comment changer les stats d'un monstre ?**
→ Modifie `baseStats` dans `monsters-data.js`

**Q : Comment ajouter une nouvelle ressource ?**
→ Ajoute-la dans `drops-data.js` avec chance, quantité, prix

**Q : Comment équilibrer les drops ?**
→ Modifie `dropChance` et `quantity` dans `drops-data.js`

**Q : Les boss apparaissent comment ?**
→ Après `spawnAfterKills` kills dans la région (ex: 100)

---

## 🎉 Résultat

Tu as maintenant une **base solide et extensible** pour tout ton système de combat !

- ✅ Région 1 **100% complète** avec données
- ✅ Structure **prête** pour les 4 autres régions
- ✅ Système de **RNG** pour monstres rares/élites
- ✅ Système de **drops** avec chances
- ✅ **Lore intégré** (factions, antagonistes)
- ✅ Facile à **balancer** et **modifier**

**Prochaine étape : On intègre tout ça dans le code du jeu ?** 😊
