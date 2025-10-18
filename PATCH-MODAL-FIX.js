/**
 * 🔧 PATCH - CORRECTION MODAL ALCHIMIE
 * 
 * PROBLÈME:
 * - Modal apparaît à gauche au lieu du centre
 * - Modal disparaît automatiquement après 2 secondes
 * 
 * SOLUTION:
 * - Forcer les styles CSS en inline avec !important
 * - Ajouter directement à document.body
 * - Empêcher propagation des événements
 * 
 * À APPLIQUER DANS: src/js/ui.js
 * LIGNE: ~2291 (fonction openConversionModal)
 */

// ========== CODE À REMPLACER ==========

// ANCIEN CODE (lignes 2291-2310 environ):
/*
        // Créer overlay
        const overlay = document.createElement('div');
        overlay.className = 'conversion-modal-overlay';
        
        // Fermer seulement si clic sur le fond noir (pas sur la modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeConversionModal();
            }
        });

        // Créer modal
        const modal = document.createElement('div');
        modal.className = 'conversion-modal';
        
        // Empêcher la propagation des clics dans la modal
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
*/

// ========== NOUVEAU CODE ==========

// Créer overlay avec styles inline FORCÉS pour garantir le centrage
const overlay = document.createElement('div');
overlay.className = 'conversion-modal-overlay';
overlay.id = 'alchemy-conversion-overlay';

// FORCER tous les styles en inline pour éviter conflits CSS
overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 999999 !important;
    background: rgba(0, 0, 0, 0.85) !important;
`;

// Fermer UNIQUEMENT si clic sur le fond noir (pas sur la modal)
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        this.closeConversionModal();
    }
});

// Créer modal avec styles inline FORCÉS
const modal = document.createElement('div');
modal.className = 'conversion-modal';
modal.id = 'alchemy-conversion-modal';

// FORCER le centrage et la taille de la modal
modal.style.cssText = `
    position: relative !important;
    margin: auto !important;
    max-width: 500px !important;
    width: 90% !important;
`;

// Empêcher la propagation des clics dans la modal
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// ========== EXPLICATIONS ==========

/**
 * POURQUOI CES CHANGEMENTS ?
 * 
 * 1. CENTRAGE:
 *    - Styles inline avec !important écrasent TOUS les CSS existants
 *    - display: flex + align-items: center + justify-content: center = centrage parfait
 *    - z-index: 999999 pour être AU-DESSUS de tout
 * 
 * 2. PERSISTANCE:
 *    - stopPropagation() empêche les clics internes de fermer la modal
 *    - addEventListener au lieu de onclick pour meilleur contrôle
 *    - e.target === overlay vérifie qu'on clique VRAIMENT sur le fond
 * 
 * 3. POSITIONNEMENT:
 *    - position: fixed sur l'overlay (pas relative)
 *    - width: 100vw et height: 100vh couvrent TOUT l'écran
 *    - top/left/right/bottom: 0 pour ancrer aux 4 coins
 */

// ========== TEST APRÈS APPLICATION ==========

/**
 * 1. Recharger la page (F5)
 * 2. Cliquer sur une conversion (ex: "Chêne → Érable")
 * 3. Vérifier:
 *    ✅ Modal au centre de l'écran
 *    ✅ Modal reste ouverte indéfiniment
 *    ✅ Boutons ×1/×5/×10/MAX fonctionnent
 *    ✅ Slider fonctionne
 *    ✅ Fermeture uniquement sur fond noir ou bouton ×
 */
