# 🔧 CORRECTIONS UX - Déblocage Équipement + Aide Métiers

**Date** : 28 octobre 2025  
**Statut** : ✅ Complété (MAJ : M06 au lieu de M07)

---

## 📋 Changements Effectués

### 1. **Report Déblocage Onglet Équipement**

**Problème** : L'onglet Équipement était débloqué dès la quête M01 (1er monstre tué) mais le joueur ne pouvait rien y faire avant d'avoir crafté son premier équipement.

**Solution** : Déplacer le déblocage de M01 vers M06 (première arme craftée)

#### Quête M01 - "Les Premiers Pas"

**Fichier** : `src/config/quests-data.js` ligne 47

```javascript
// AVANT
unlocks: ["combat_log", "equipment_tab"];
message: "Vous avez appris les bases du combat !";

// APRÈS
unlocks: ["combat_log"];
message: "Vous avez appris les bases du combat !";
```

**Résultat** : L'onglet Équipement n'est plus débloqué dès le premier combat ✅

---

#### Quête M06 - "Première Forge"

**Fichier** : `src/config/quests-data.js` ligne 163-167

```javascript
// AVANT
rewards: {
    xp: 200,
    gold: 80,
    unlocks: ['profession_blacksmith'],
    message: 'Vous êtes maintenant Forgeron !'
}

// APRÈS
rewards: {
    xp: 200,
    gold: 80,
    unlocks: ['profession_blacksmith', 'equipment_tab'],
    message: 'Vous êtes maintenant Forgeron ! Équipez votre épée pour devenir plus fort.'
}
```

**Résultat** : L'onglet Équipement est débloqué quand le joueur craft sa première arme (Épée de Fer) ✅

---

#### Quête M07 - "Se Protéger"

**Fichier** : `src/config/quests-data.js` ligne 186-191

```javascript
// AVANT (après premier changement)
rewards: {
    xp: 180,
    gold: 60,
    unlocks: ['profession_armorsmith', 'equipment_tab'],
    message: 'Vous êtes maintenant Armurier ! Équipez vos créations pour devenir plus fort.'
}

// APRÈS (correction finale)
rewards: {
    xp: 180,
    gold: 60,
    unlocks: ['profession_armorsmith'],
    message: 'Vous êtes maintenant Armurier !'
}
```

**Résultat** : M07 ne débloque plus l'onglet (déjà fait en M06) ✅

---

### 2. **Mise à Jour Aide Métiers de Récolte**

**Fichier** : `src/js/ui.js` - Méthode `showGatheringHelp()`

#### Section "Les 4 Métiers"

```javascript
// AVANT
<li><strong>🌿 Herboriste :</strong> Récolte des plantes (Sauge, Gingembre, Chardon...)</li>
<li><strong>🎣 Pêcheur :</strong> Récolte des poissons (Poisson-chat, Saumon, Espadon...)</li>

// APRÈS
<li><strong>🌿 Herboriste :</strong> Récolte des plantes (débloqué niveau 10)</li>
<li><strong>🎣 Pêcheur :</strong> Récolte des poissons (débloqué niveau 10)</li>
```

**Raison** : Simplification + indication du niveau de déblocage ✅

---

#### Section "Auto-Récolte"

```javascript
// AVANT
<h3>⚡ Auto-Récolte</h3>
<p>Construisez des bâtiments dans l'onglet <strong>🏘️ Ville</strong> pour automatiser la récolte :</p>
<ul>
    <li><strong>Scierie :</strong> Auto-bois (1 bois/10s)</li>
    <li><strong>Mine :</strong> Auto-minerai (1 minerai/10s)</li>
    <li><strong>Jardin d'Herbes :</strong> Auto-plantes (1 plante/10s)</li>
    <li><strong>Étang de Pêche :</strong> Auto-poisson (1 poisson/10s)</li>
</ul>

// APRÈS
<h3>⚡ Auto-Récolte</h3>
<p>Débloquez l'auto-récolte en atteignant <strong>niveau 50</strong> pour Bûcheron et Mineur :</p>
<ul>
    <li><strong>🪓 Auto-Bûcheron :</strong> 1 bois toutes les 60 secondes (Coût : 50🪵 50⚒️)</li>
    <li><strong>⛏️ Auto-Mineur :</strong> 1 minerai toutes les 60 secondes (Coût : 50🪵 50⚒️)</li>
    <li><strong>🌿 Herboriste :</strong> Déblocage automatique au niveau 10 du joueur</li>
    <li><strong>🎣 Pêcheur :</strong> Déblocage automatique au niveau 10 du joueur</li>
</ul>
```

**Raison** :

- Correction du système actuel (pas de bâtiments de ville, mais déblocage niveau 50)
- Ajout du coût réel (50🪵 50⚒️)
- Intervalle correct (60s au lieu de 10s)
  ✅

---

### 3. **Mise à Jour Aide Métiers de Fabrication**

**Fichier** : `src/js/ui.js` - Méthode `showCraftingHelp()`

#### Section "Les Métiers"

```javascript
// AVANT
<h3>📋 Les 4 Métiers</h3>
<ul>
    <li><strong>⚒️ Forgeron :</strong> Fabrique des armes (épées, arcs, bâtons...)</li>
    <li><strong>🛡️ Armurier :</strong> Fabrique des armures (casques, plastrons, bottes...)</li>
    <li><strong>💍 Joaillier :</strong> Fabrique des accessoires (anneaux, amulettes...)</li>
    <li><strong>⚗️ Alchimiste :</strong> Transmute les ressources (T1 → T2 → T3)</li>
</ul>

// APRÈS
<h3>📋 Les 5 Métiers</h3>
<ul>
    <li><strong>⚔️ Forgeron :</strong> Fabrique des armes (épées, arcs, bâtons...)</li>
    <li><strong>🛡️ Armurier :</strong> Fabrique des armures (casques, plastrons, bottes...)</li>
    <li><strong>🎒 Tanneur :</strong> Traite les peaux en cuir de qualité (débloqué niveau 10)</li>
    <li><strong>💍 Joaillier :</strong> Fabrique des accessoires avec gemmes (anneaux, amulettes...)</li>
    <li><strong>⚗️ Alchimiste :</strong> Transmute les ressources (T1 → T2 → T3, débloqué niveau 20)</li>
</ul>
```

**Raison** :

- Ajout du métier **Tanneur** (nouveau système)
- Indication des niveaux de déblocage
- Correction icône Forgeron (⚔️ au lieu de ⚒️)
  ✅

---

## 🧪 Tests à Effectuer

### Test 1 : Déblocage Équipement

1. **Nouveau personnage** → Tuer premier monstre
2. ✅ Vérifier : Onglet Équipement **NON** débloqué
3. **Progresser** jusqu'à quête M06 (crafter Épée de Fer)
4. ✅ Vérifier : Onglet Équipement débloqué avec message "Équipez votre épée pour devenir plus fort."
5. **Cliquer** sur l'onglet Équipement
6. ✅ Vérifier : Épée de Fer disponible pour équipement

### Test 2 : Aide Récolte

1. Ouvrir onglet Métiers
2. Cliquer **❓ Aide**
3. ✅ Vérifier : Section "Auto-Récolte" mentionne niveau 50 + coût 50🪵 50⚒️
4. ✅ Vérifier : Herboriste/Pêcheur marqués "débloqué niveau 10"

### Test 3 : Aide Fabrication

1. Ouvrir onglet Craft
2. Cliquer **❓ Aide**
3. ✅ Vérifier : 5 métiers listés (inclut Tanneur)
4. ✅ Vérifier : Tanneur marqué "débloqué niveau 10"
5. ✅ Vérifier : Alchimiste marqué "débloqué niveau 20"

---

## 📊 Récapitulatif

| Changement                    | Fichier          | Lignes    | Impact             |
| ----------------------------- | ---------------- | --------- | ------------------ |
| Retrait equipment_tab de M01  | `quests-data.js` | 47        | UX améliorée       |
| Ajout equipment_tab à M06     | `quests-data.js` | 165       | Déblocage cohérent |
| Retrait equipment_tab de M07  | `quests-data.js` | 189       | Pas de doublon     |
| Update Aide Récolte - Métiers | `ui.js`          | 5163-5168 | Info précise       |
| Update Aide Récolte - Auto    | `ui.js`          | 5183-5193 | Correction système |
| Update Aide Craft - Métiers   | `ui.js`          | 5232-5239 | Ajout Tanneur      |

**Total** : 6 modifications sur 2 fichiers ✅

---

## 💡 Bénéfices

1. **Meilleure UX** : L'onglet Équipement s'ouvre dès que le joueur craft sa première arme (M06)
2. **Feedback immédiat** : Le joueur peut équiper son Épée de Fer directement après l'avoir craftée
3. **Aide précise** : Les informations correspondent au système réel (pas de bâtiments fantômes)
4. **Progression claire** : Les niveaux de déblocage sont indiqués explicitement
5. **Documentation à jour** : Les 5 métiers de craft sont listés correctement

---

## 🔜 Prochaines Étapes

- [ ] Tester en jeu la nouvelle progression
- [ ] Vérifier que le message de quête M07 s'affiche correctement
- [ ] Valider que l'aide correspond bien au gameplay actuel
