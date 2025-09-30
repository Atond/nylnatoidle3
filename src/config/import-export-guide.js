/**
 * Guide d'implémentation : Système d'Import/Export de sauvegarde
 * 
 * Ce système permet aux joueurs d'exporter leur sauvegarde en format Base64
 * et de l'importer sur un autre navigateur/appareil ou de la partager.
 */

// ============================================================================
// POURQUOI UTILISER BASE64 ?
// ============================================================================

/**
 * Avantages du format Base64 pour les sauvegardes :
 * 
 * ✅ Portabilité : Peut être copié/collé facilement
 * ✅ Compact : Réduit la taille de la chaîne
 * ✅ Sûr : Pas de caractères spéciaux qui posent problème
 * ✅ Standard : Fonctionne sur tous les navigateurs
 * ✅ Partage : Facile à partager sur forums/Discord
 * 
 * ⚠️ ATTENTION : Base64 n'est PAS de la sécurité !
 * C'est juste un encodage, n'importe qui peut le décoder.
 */

// ============================================================================
// STRUCTURE DES DONNÉES
// ============================================================================

/**
 * Format de la sauvegarde (avant encodage)
 */
export const SAVE_FORMAT = {
  // Métadonnées
  version: "1.0.0",              // Version du format de sauvegarde
  timestamp: 0,                  // Date de la sauvegarde
  checksum: "",                  // Hash MD5/SHA pour valider l'intégrité
  
  // Données du jeu
  game: {
    // Ressources
    cookies: 0,
    totalCookiesEarned: 0,
    clickPower: 1,
    
    // Bâtiments (optimisé)
    buildings: [
      // Format : [id, count]
      ["cursor", 10],
      ["grandma", 5]
    ],
    
    // Upgrades (liste des IDs achetés)
    upgrades: [
      "cursor_upgrade_1",
      "grandma_upgrade_1"
    ],
    
    // Achievements (liste des IDs débloqués)
    achievements: [
      "first_click",
      "first_building"
    ],
    
    // Statistiques
    statistics: {
      totalClicks: 0,
      totalPlaytime: 0,
      sessionsPlayed: 0,
      recordCookiesPerSecond: 0
    },
    
    // Paramètres utilisateur
    settings: {
      soundEnabled: true,
      notificationsEnabled: true,
      theme: "dark"
    }
  }
};

// ============================================================================
// IMPLÉMENTATION : ENCODAGE
// ============================================================================

/**
 * Encode une sauvegarde en Base64
 * @param {Object} saveData - Données à encoder
 * @returns {string} Chaîne Base64
 */
export function encodeSaveData(saveData) {
  try {
    // 1. Convertir l'objet en JSON string
    const jsonString = JSON.stringify(saveData);
    
    // 2. Encoder en Base64
    // Note : btoa() ne fonctionne qu'avec des caractères ASCII
    // Pour supporter l'Unicode, on utilise TextEncoder
    const utf8Bytes = new TextEncoder().encode(jsonString);
    const base64String = btoa(String.fromCharCode(...utf8Bytes));
    
    console.log("✅ Sauvegarde encodée avec succès");
    console.log(`📦 Taille originale: ${jsonString.length} caractères`);
    console.log(`📦 Taille encodée: ${base64String.length} caractères`);
    
    return base64String;
    
  } catch (error) {
    console.error("❌ Erreur lors de l'encodage:", error);
    throw new Error("Impossible d'encoder la sauvegarde");
  }
}

/**
 * Version alternative avec compression (optionnel)
 * Utilise LZString pour réduire davantage la taille
 */
export function encodeSaveDataCompressed(saveData) {
  try {
    const jsonString = JSON.stringify(saveData);
    
    // Si vous ajoutez la librairie LZ-String :
    // const compressed = LZString.compressToBase64(jsonString);
    // return compressed;
    
    // Pour l'instant, version simple
    return encodeSaveData(saveData);
    
  } catch (error) {
    console.error("❌ Erreur lors de la compression:", error);
    throw new Error("Impossible de compresser la sauvegarde");
  }
}

// ============================================================================
// IMPLÉMENTATION : DÉCODAGE
// ============================================================================

/**
 * Décode une sauvegarde Base64
 * @param {string} base64String - Chaîne Base64 à décoder
 * @returns {Object} Données de sauvegarde
 * @throws {Error} Si le format est invalide
 */
export function decodeSaveData(base64String) {
  try {
    // 1. Nettoyer la chaîne (enlever espaces, retours à la ligne)
    const cleaned = base64String.trim().replace(/\s/g, "");
    
    // 2. Décoder Base64 vers UTF-8
    const binaryString = atob(cleaned);
    const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const jsonString = new TextDecoder().decode(bytes);
    
    // 3. Parser le JSON
    const saveData = JSON.parse(jsonString);
    
    console.log("✅ Sauvegarde décodée avec succès");
    
    return saveData;
    
  } catch (error) {
    console.error("❌ Erreur lors du décodage:", error);
    
    // Messages d'erreur plus spécifiques
    if (error.name === "InvalidCharacterError") {
      throw new Error("Format Base64 invalide. Vérifiez que vous avez copié toute la sauvegarde.");
    }
    if (error.name === "SyntaxError") {
      throw new Error("Données corrompues. Le format JSON est invalide.");
    }
    
    throw new Error("Impossible de décoder la sauvegarde");
  }
}

// ============================================================================
// VALIDATION DES DONNÉES
// ============================================================================

/**
 * Valide une sauvegarde décodée
 * @param {Object} saveData - Données à valider
 * @returns {boolean} True si valide
 */
export function validateSaveData(saveData) {
  try {
    // Vérifications de base
    if (!saveData || typeof saveData !== "object") {
      console.error("❌ Sauvegarde invalide : pas un objet");
      return false;
    }
    
    // Vérifier la version
    if (!saveData.version) {
      console.warn("⚠️ Pas de numéro de version (ancienne sauvegarde ?)");
    }
    
    // Vérifier la structure game
    if (!saveData.game || typeof saveData.game !== "object") {
      console.error("❌ Structure 'game' manquante ou invalide");
      return false;
    }
    
    // Vérifier les types des champs critiques
    const game = saveData.game;
    
    if (typeof game.cookies !== "number" || game.cookies < 0) {
      console.error("❌ Nombre de cookies invalide");
      return false;
    }
    
    if (!Array.isArray(game.buildings)) {
      console.error("❌ Liste des bâtiments invalide");
      return false;
    }
    
    if (!Array.isArray(game.upgrades)) {
      console.error("❌ Liste des upgrades invalide");
      return false;
    }
    
    // Vérifier qu'il n'y a pas de valeurs absurdes
    if (game.cookies > Number.MAX_SAFE_INTEGER) {
      console.error("❌ Nombre de cookies trop élevé (probable triche)");
      return false;
    }
    
    console.log("✅ Sauvegarde validée avec succès");
    return true;
    
  } catch (error) {
    console.error("❌ Erreur lors de la validation:", error);
    return false;
  }
}

// ============================================================================
// CHECKSUM POUR DÉTECTION DE CORRUPTION
// ============================================================================

/**
 * Génère un checksum simple pour détecter la corruption de données
 * Note : Ce n'est PAS de la sécurité, juste une vérification d'intégrité
 */
export function generateChecksum(data) {
  const jsonString = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

/**
 * Vérifie le checksum d'une sauvegarde
 */
export function verifyChecksum(saveData) {
  if (!saveData.checksum) {
    return true; // Pas de checksum = ancienne sauvegarde, on accepte
  }
  
  const dataCopy = { ...saveData };
  const originalChecksum = dataCopy.checksum;
  delete dataCopy.checksum; // Enlever le checksum avant de recalculer
  
  const calculatedChecksum = generateChecksum(dataCopy);
  
  if (originalChecksum !== calculatedChecksum) {
    console.warn("⚠️ Checksum invalide : données peut-être modifiées");
    return false;
  }
  
  return true;
}

// ============================================================================
// UTILISATION DANS LE JEU
// ============================================================================

/**
 * Exemple d'utilisation complète
 */
export class SaveExportImport {
  
  /**
   * Exporter la sauvegarde actuelle
   */
  exportSave(game) {
    // 1. Préparer les données
    const saveData = {
      version: "1.0.0",
      timestamp: Date.now(),
      game: {
        cookies: game.cookies,
        totalCookiesEarned: game.statistics.totalCookiesEarned,
        clickPower: game.clickPower,
        buildings: game.buildings.getSaveData(),
        upgrades: game.upgrades.getPurchasedIds(),
        achievements: game.achievements.getUnlockedIds(),
        statistics: game.statistics.getSaveData(),
        settings: game.settings
      }
    };
    
    // 2. Ajouter checksum
    saveData.checksum = generateChecksum(saveData);
    
    // 3. Encoder en Base64
    const base64String = encodeSaveData(saveData);
    
    // 4. Copier dans le clipboard
    this.copyToClipboard(base64String);
    
    // 5. Notifier l'utilisateur
    console.log("✅ Sauvegarde exportée !");
    return base64String;
  }
  
  /**
   * Importer une sauvegarde
   */
  importSave(base64String, game) {
    try {
      // 1. Décoder
      const saveData = decodeSaveData(base64String);
      
      // 2. Valider
      if (!validateSaveData(saveData)) {
        throw new Error("Sauvegarde invalide");
      }
      
      // 3. Vérifier checksum
      if (!verifyChecksum(saveData)) {
        const confirm = window.confirm(
          "⚠️ Cette sauvegarde semble avoir été modifiée. Voulez-vous continuer ?"
        );
        if (!confirm) return false;
      }
      
      // 4. Demander confirmation (perte de la sauvegarde actuelle)
      const confirmLoad = window.confirm(
        "⚠️ Charger cette sauvegarde écrasera votre partie actuelle. Continuer ?"
      );
      if (!confirmLoad) return false;
      
      // 5. Charger les données
      game.loadFromSaveData(saveData);
      
      console.log("✅ Sauvegarde importée avec succès !");
      return true;
      
    } catch (error) {
      console.error("❌ Erreur lors de l'import:", error);
      alert(`Impossible d'importer la sauvegarde : ${error.message}`);
      return false;
    }
  }
  
  /**
   * Copier dans le clipboard
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("📋 Copié dans le presse-papier !");
      return true;
    } catch (error) {
      console.error("❌ Impossible de copier:", error);
      // Fallback : afficher dans une modal pour copie manuelle
      this.showCopyModal(text);
      return false;
    }
  }
  
  /**
   * Afficher modal de copie manuelle (fallback)
   */
  showCopyModal(text) {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                  background: rgba(0,0,0,0.8); display: flex; align-items: center; 
                  justify-content: center; z-index: 9999;">
        <div style="background: white; padding: 20px; border-radius: 10px; 
                    max-width: 600px; width: 90%;">
          <h3>📋 Votre sauvegarde</h3>
          <p>Copiez cette chaîne pour sauvegarder votre partie :</p>
          <textarea readonly style="width: 100%; height: 150px; 
                    font-family: monospace; font-size: 12px; padding: 10px;"
          >${text}</textarea>
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="margin-top: 10px; padding: 10px 20px; 
                  background: #4CAF50; color: white; border: none; 
                  border-radius: 5px; cursor: pointer;">
            Fermer
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// ============================================================================
// BONNES PRATIQUES
// ============================================================================

/**
 * ✅ À FAIRE :
 * 
 * - Toujours valider les données importées
 * - Demander confirmation avant d'écraser la sauvegarde actuelle
 * - Ajouter un checksum pour détecter la corruption
 * - Logger les erreurs pour le débogage
 * - Permettre l'export/import via boutons UI
 * - Afficher un feedback visuel (toast, modal)
 * 
 * ❌ À NE PAS FAIRE :
 * 
 * - Ne pas compter sur Base64 pour la sécurité
 * - Ne pas charger des données sans validation
 * - Ne pas stocker de données sensibles (mots de passe, etc.)
 * - Ne pas faire confiance aveuglément aux données importées
 * 
 * 💡 AMÉLIORATIONS POSSIBLES :
 * 
 * - Compression avec LZ-String pour réduire la taille
 * - Versionning pour migrer les anciennes sauvegardes
 * - Sauvegarde cloud (Firebase, Supabase) pour sync multi-device
 * - QR Code pour partage facile sur mobile
 */

export default {
  encodeSaveData,
  decodeSaveData,
  validateSaveData,
  generateChecksum,
  verifyChecksum,
  SaveExportImport
};
