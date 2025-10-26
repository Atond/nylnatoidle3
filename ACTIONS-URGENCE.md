# 🚨 ACTIONS D'URGENCE - Si quelque chose ne fonctionne pas

## ⚠️ Si le jeu ne se charge pas

### 1. Vérifier la console du navigateur

**Action :** Appuyez sur F12 → Onglet "Console"

**Erreurs possibles :**

#### ❌ "Cannot find name 'AlchemyManager'"

**Solution :** Vérifier que tous les scripts sont chargés dans `index.html`

```html
<!-- Vérifier que ces lignes existent -->
<script src="src/js/alchemy-manager.js"></script>
<script src="src/js/dragon-manager.js"></script>
<script src="src/js/alt-character-manager.js"></script>
<script src="src/js/dungeon-manager.js"></script>
```

---

#### ❌ "localStorage is null"

**Solution :** Mode privé bloque localStorage

```javascript
// Tester dans la console
localStorage.setItem("test", "ok");
// Si erreur → Désactiver mode privé ou utiliser navigateur normal
```

---

### 2. Réinitialiser complètement le jeu

**Action :** Ouvrir la console du navigateur (F12) et taper :

```javascript
// Supprimer TOUTE la sauvegarde
localStorage.clear();

// Recharger la page
location.reload();
```

**Résultat :** Le jeu recommence à zéro

---

## 🐛 Si un bug apparaît après modification

### 1. Revenir à la version précédente (Git)

```powershell
# Voir les derniers commits
git log --oneline -5

# Revenir au commit précédent
git checkout HEAD~1

# Ou revenir à un commit spécifique
git checkout <commit-id>

# Pour revenir à la dernière version
git checkout main
```

---

### 2. Restaurer un backup

**Backups disponibles :**

```
archive/backup-balance-2025-10-26-160540/
archive/backup-stats-cleanup-2025-10-26-160007/
```

**Action :**

```powershell
# Copier les fichiers du backup
Copy-Item -Path "archive\backup-balance-2025-10-26-160540\*" -Destination "src\config\" -Force
```

---

## ⚡ Si le jeu est lent

### 1. Vérifier le mode DEBUG

**Fichier :** `src/config/game-config.js`

```javascript
DEBUG: {
  enabled: false, // ❌ Si true, mettre à false
  showFPS: false,
  logCombat: false,
  logSaves: false,
}
```

---

### 2. Vider le cache du navigateur

**Action :**

1. Ctrl + Shift + Delete
2. Cocher "Cache" et "Cookies"
3. Cliquer "Effacer les données"
4. Recharger la page (Ctrl + F5)

---

### 3. Désactiver temporairement certains systèmes

**Fichier :** `src/config/game-config.js`

```javascript
FEATURES: {
  enableProfessions: true,
  enableTown: true,
  enableQuests: false, // Désactiver temporairement
  enableDragons: false, // Désactiver temporairement
  enableGuild: false,
  enableSounds: false
}
```

---

## 💾 Si la sauvegarde ne fonctionne pas

### 1. Tester localStorage

**Console (F12) :**

```javascript
// Test écriture
localStorage.setItem("test", "ok");

// Test lecture
console.log(localStorage.getItem("test"));

// Si null ou erreur → Problème navigateur
```

---

### 2. Exporter manuellement

**Console (F12) :**

```javascript
// Copier la sauvegarde
copy(localStorage.getItem("nylnatoIdleSave_v1"));

// Coller dans un fichier texte
// Sauvegarder comme "save-backup.json"
```

---

### 3. Importer manuellement

**Console (F12) :**

```javascript
// Coller le contenu de save-backup.json
const saveData = {
  /* ... */
};

// Importer
localStorage.setItem("nylnatoIdleSave_v1", JSON.stringify(saveData));

// Recharger
location.reload();
```

---

## 🔧 Si cleanup-files.ps1 ne fonctionne pas

### Erreur : "Impossible d'exécuter le script"

**Solution :**

```powershell
# Autoriser l'exécution de scripts (une seule fois)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Puis relancer
.\cleanup-files.ps1
```

---

### Erreur : "Fichier introuvable"

**Solution :**

```powershell
# Vérifier que vous êtes dans le bon dossier
Get-Location
# Doit afficher : e:\IdleV1

# Si non, aller dans le bon dossier
cd e:\IdleV1

# Relancer
.\cleanup-files.ps1
```

---

## 📊 Si les erreurs TypeScript persistent

### Solution 1 : Recharger VS Code

**Action :**

1. Ctrl + Shift + P
2. Taper "Reload Window"
3. Appuyer sur Entrée

---

### Solution 2 : Vérifier global.d.ts

**Fichier :** `src/types/global.d.ts`

**Vérifier qu'il existe et contient :**

```typescript
interface Window {
  game: any;
  Game: any;
  MonstersData: any;
  RegionsData: any;
  // ... etc
}
```

Si absent → Le recréer avec le contenu du RAPPORT-ANALYSE-FINALE.md

---

### Solution 3 : Vérifier jsconfig.json

**Fichier :** `jsconfig.json`

**Contenu minimal :**

```json
{
  "compilerOptions": {
    "checkJs": true,
    "target": "ES2020",
    "module": "ESNext"
  },
  "include": ["src/**/*"]
}
```

---

## 🆘 CONTACT D'URGENCE

### Si rien ne fonctionne

1. **Sauvegarder vos modifications** (si importantes)

```powershell
# Créer un backup complet
Copy-Item -Path "src" -Destination "backup-urgence-$(Get-Date -Format 'yyyy-MM-dd-HHmmss')" -Recurse
```

2. **Revenir au dernier commit stable**

```powershell
git status
git stash  # Sauvegarder les modifications en cours
git checkout main
git pull origin main
```

3. **Réinstaller les dépendances**

```powershell
npm install
```

4. **Tester le jeu de base**

```powershell
python -m http.server 8080 --directory .
# Ouvrir http://localhost:8080
```

---

## 📞 RESSOURCES UTILES

### Documentation

- 📄 **RAPPORT-ANALYSE-FINALE.md** → Rapport complet
- 📝 **TACHES-FUTURES.md** → Liste des tâches
- 🏗️ **docs/INDEX.md** → Documentation générale

### Fichiers Critiques

- `src/js/game.js` → Point d'entrée principal
- `src/config/game-config.js` → Configuration globale
- `index.html` → Chargement des scripts

### Logs de Debug

**Activer temporairement :**

```javascript
// src/config/game-config.js
DEBUG: {
  enabled: true,  // ✅ Activer
  logCombat: true,
  logSaves: true,
}
```

**Consulter :** Ouvrir Console (F12) pour voir les logs

---

## ✅ CHECKLIST DE DÉPANNAGE

- [ ] Vérifier console navigateur (F12)
- [ ] Tester localStorage
- [ ] Vérifier que tous les scripts sont chargés
- [ ] Vider cache navigateur
- [ ] Recharger VS Code
- [ ] Vérifier mode DEBUG désactivé
- [ ] Tester en navigation privée
- [ ] Revenir au dernier commit Git
- [ ] Créer un backup avant toute modification

---

**Dernière mise à jour :** 26 octobre 2025

**Note :** Si le problème persiste, consultez les logs de la console (F12) et recherchez l'erreur spécifique dans Google ou ChatGPT.
