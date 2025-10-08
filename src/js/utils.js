/**
 * Fonctions utilitaires globales
 */

const Utils = {
    /**
     * Formatte un nombre pour l'affichage
     * @param {number} num - Le nombre à formatter
     * @param {number} decimals - Nombre de décimales (défaut: 0)
     * @returns {string} Le nombre formatté
     */
    formatNumber(num, decimals = 0) {
        if (num === null || num === undefined || isNaN(num)) return '0';
        
        const absNum = Math.abs(num);
        
        // Moins de 1000 : affichage normal
        if (absNum < 1000) {
            return num.toFixed(decimals);
        }
        
        // Format abrégé : 1.5K, 2.3M, 4.7B, etc.
        const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
        const order = Math.floor(Math.log10(absNum) / 3);
        const unitIndex = Math.min(order, units.length - 1);
        const value = num / Math.pow(1000, unitIndex);
        
        return value.toFixed(decimals) + units[unitIndex];
    },

    /**
     * Formate un temps en secondes en format lisible
     * @param {number} seconds - Nombre de secondes
     * @returns {string} Temps formatté (ex: "1h 23m 45s")
     */
    formatTime(seconds) {
        if (seconds < 60) return `${Math.floor(seconds)}s`;
        if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}m ${secs}s`;
        }
        
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${mins}m`;
    },

    /**
     * Génère un nombre aléatoire entre min et max (inclus)
     * @param {number} min - Valeur minimale
     * @param {number} max - Valeur maximale
     * @returns {number} Nombre aléatoire
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Génère un nombre aléatoire flottant entre min et max
     * @param {number} min - Valeur minimale
     * @param {number} max - Valeur maximale
     * @returns {number} Nombre aléatoire
     */
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Retourne true avec une probabilité donnée
     * @param {number} probability - Probabilité entre 0 et 1 (ex: 0.3 = 30%)
     * @returns {boolean}
     */
    chance(probability) {
        return Math.random() < probability;
    },

    /**
     * Clamp une valeur entre min et max
     * @param {number} value - Valeur à clamper
     * @param {number} min - Minimum
     * @param {number} max - Maximum
     * @returns {number} Valeur clampée
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Interpolation linéaire
     * @param {number} start - Valeur de départ
     * @param {number} end - Valeur de fin
     * @param {number} t - Facteur (0 à 1)
     * @returns {number} Valeur interpolée
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    /**
     * Calcule le pourcentage d'une valeur par rapport à un total
     * @param {number} value - Valeur actuelle
     * @param {number} total - Valeur totale
     * @returns {number} Pourcentage (0 à 100)
     */
    percentage(value, total) {
        if (total === 0) return 0;
        return this.clamp((value / total) * 100, 0, 100);
    },

    /**
     * Crée un délai (Promise)
     * @param {number} ms - Millisecondes d'attente
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Debounce une fonction
     * @param {Function} func - Fonction à debouncer
     * @param {number} wait - Délai en millisecondes
     * @returns {Function} Fonction debouncée
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Deep clone un objet
     * @param {Object} obj - Objet à cloner
     * @returns {Object} Clone profond
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Ajoute une entrée dans un log avec limite de taille
     * @param {Array} logArray - Tableau du log
     * @param {string} message - Message à ajouter
     * @param {number} maxEntries - Nombre max d'entrées
     */
    addToLog(logArray, message, maxEntries = 10) {
        logArray.unshift({
            message,
            timestamp: Date.now()
        });
        
        if (logArray.length > maxEntries) {
            logArray.pop();
        }
    },

    /**
     * Obtient le timestamp actuel
     * @returns {number} Timestamp en millisecondes
     */
    now() {
        return Date.now();
    },

    /**
     * Formate une date
     * @param {number} timestamp - Timestamp en ms
     * @returns {string} Date formatée
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('fr-FR');
    }
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}
