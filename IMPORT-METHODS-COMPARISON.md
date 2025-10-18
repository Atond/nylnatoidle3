# 📥 Méthodes d'Import de Sauvegarde

Le jeu propose **3 méthodes** pour importer une sauvegarde. Chacune a ses avantages et inconvénients.

---

## ✨ Import Sécurisé (Recommandé)

**Accès :** Menu ⚙️ → "✨ Import Sécurisé (Recommandé)"

**Comment ça marche :**

- Redirige vers une page dédiée (`import-save.html`)
- Interface graphique simple
- Sélection de fichier JSON
- Protection contre l'écrasement par `beforeunload`
- Redirection automatique vers le jeu

**Avantages :**

- ✅ **100% fiable** - Utilise un flag localStorage pour éviter l'écrasement
- ✅ Simple et visuel
- ✅ Détecte les erreurs automatiquement
- ✅ Pas de copier-coller manuel

**Inconvénients :**

- ⚠️ Nécessite un serveur web (http://localhost:8080)

**Quand l'utiliser :**

- **TOUJOURS si possible** - C'est la méthode la plus sûre !

---

## 📂 Charger depuis Fichier

**Accès :** Menu ⚙️ → "📂 Charger depuis Fichier"

**Comment ça marche :**

- Input file standard
- Lecture du JSON
- Import direct via `game.ui.handleImportFile()`

**Avantages :**

- ✅ Rapide (pas de redirection)
- ✅ Interface intégrée au jeu

**Inconvénients :**

- ⚠️ **RISQUE D'ÉCRASEMENT** - Peut être écrasé par `beforeunload`
- ⚠️ Nécessite un rechargement manuel pour voir les changements

**Quand l'utiliser :**

- Pour des tests rapides
- Si vous savez ce que vous faites
- Si vous ne rechargez pas la page immédiatement après

**⚠️ ATTENTION :** Si vous rechargez la page (F5) juste après l'import, l'événement `beforeunload` peut sauvegarder l'ancien état et écraser l'import !

---

## 📋 Coller depuis Texte

**Accès :** Menu ⚙️ → "📋 Coller depuis Texte"

**Comment ça marche :**

- Ouvre une boîte de dialogue
- Copier-coller du contenu JSON
- Import direct

**Avantages :**

- ✅ Fonctionne sans fichier
- ✅ Utile pour partager des sauvegardes (Base64)

**Inconvénients :**

- ⚠️ **MÊME RISQUE** que "Charger depuis Fichier"
- ⚠️ Manipulation manuelle du JSON

**Quand l'utiliser :**

- Pour des sauvegardes partagées en Base64
- Pour des tests de développement

---

## 🔧 Pour les développeurs : Script Console

**Fichier :** `IMPORT-SAVE-FIX.js`

**Comment ça marche :**

- Modifier le script pour coller votre JSON
- Exécuter dans la console (F12)
- Bloque `beforeunload` avec `isResetting = true`

**Avantages :**

- ✅ Contrôle total
- ✅ Pas besoin de serveur web

**Inconvénients :**

- ⚠️ Nécessite des connaissances techniques
- ⚠️ Édition manuelle du fichier

---

## 📊 Comparaison

| Méthode            | Fiabilité  | Simplicité | Serveur requis | Risque écrasement |
| ------------------ | ---------- | ---------- | -------------- | ----------------- |
| ✨ Import Sécurisé | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Oui         | ❌ Aucun          |
| 📂 Depuis Fichier  | ⭐⭐⭐     | ⭐⭐⭐⭐   | ❌ Non         | ⚠️ Possible       |
| 📋 Depuis Texte    | ⭐⭐⭐     | ⭐⭐⭐     | ❌ Non         | ⚠️ Possible       |
| 🔧 Script Console  | ⭐⭐⭐⭐⭐ | ⭐⭐       | ❌ Non         | ❌ Aucun          |

---

## 💡 Recommandation

**Pour les utilisateurs normaux :**
→ Utilisez **"✨ Import Sécurisé"** (bouton vert dans le menu)

**Pour les développeurs :**
→ Utilisez **IMPORT-SAVE-FIX.js** via la console

**À éviter :**
→ "📂 Charger depuis Fichier" + rechargement immédiat de la page

---

## 🐛 Pourquoi le risque d'écrasement ?

Les méthodes "📂 Depuis Fichier" et "📋 Depuis Texte" importent directement dans la session en cours. Si vous rechargez la page juste après :

```
1. Import réussi → localStorage = "Atond" ✅
2. Vous rechargez (F5)
3. beforeunload se déclenche → game.save() → localStorage = "eaz" ❌ (écrase Atond !)
4. Nouvelle page charge → game.load() → charge "eaz" ❌
```

**L'Import Sécurisé** évite ce problème en utilisant un flag `nylnato_importing` qui bloque `beforeunload` pendant l'import.

---

**Documentation complète :** Voir `SOLUTION-IMPORT-BUG.md`
