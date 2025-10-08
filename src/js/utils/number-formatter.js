/**
 * Utilitaires de formatage des nombres
 * Convertit les grands nombres en format lisible (K, M, B, T, etc.)
 */

const NumberFormatter = {
    /**
     * Suffixes pour les grands nombres
     */
    suffixes: [
        { value: 1e63, suffix: 'V' },      // Vigintillion
        { value: 1e60, suffix: 'N' },      // Novemdecillion
        { value: 1e57, suffix: 'O' },      // Octodecillion
        { value: 1e54, suffix: 'Sp' },     // Septendecillion
        { value: 1e51, suffix: 'Sx' },     // Sexdecillion
        { value: 1e48, suffix: 'Qd' },     // Quindecillion
        { value: 1e45, suffix: 'Qad' },    // Quattuordecillion
        { value: 1e42, suffix: 'Td' },     // Tredecillion
        { value: 1e39, suffix: 'Dd' },     // Duodecillion
        { value: 1e36, suffix: 'Ud' },     // Undecillion
        { value: 1e33, suffix: 'D' },      // Decillion
        { value: 1e30, suffix: 'N' },      // Nonillion
        { value: 1e27, suffix: 'O' },      // Octillion
        { value: 1e24, suffix: 'Sp' },     // Septillion
        { value: 1e21, suffix: 'Sx' },     // Sextillion
        { value: 1e18, suffix: 'Qi' },     // Quintillion
        { value: 1e15, suffix: 'Qa' },     // Quadrillion
        { value: 1e12, suffix: 'T' },      // Trillion
        { value: 1e9, suffix: 'B' },       // Billion
        { value: 1e6, suffix: 'M' },       // Million
        { value: 1e3, suffix: 'K' }        // Thousand
    ],

    /**
     * Formate un nombre en version lisible
     * @param {number} value - Le nombre à formater
     * @param {number} decimals - Nombre de décimales (défaut: 2)
     * @param {boolean} showDecimals - Afficher décimales même si 0 (défaut: false)
     * @returns {string} - Nombre formaté
     */
    format(value, decimals = 2, showDecimals = false) {
        // Gérer les cas spéciaux
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }

        // Convertir en nombre si c'est une string
        value = Number(value);

        // Gérer les nombres négatifs
        const isNegative = value < 0;
        value = Math.abs(value);

        // Pour les petits nombres (< 1000), afficher en entier
        if (value < 1000) {
            const result = Math.floor(value).toString();
            return isNegative ? `-${result}` : result;
        }

        // Trouver le suffixe approprié
        for (const { value: threshold, suffix } of this.suffixes) {
            if (value >= threshold) {
                const scaled = value / threshold;
                let formatted;

                // Si le nombre est rond (ex: 1.0M), afficher sans décimales
                if (!showDecimals && scaled === Math.floor(scaled)) {
                    formatted = Math.floor(scaled) + suffix;
                } else {
                    // Sinon, afficher avec décimales
                    formatted = scaled.toFixed(decimals) + suffix;
                }

                return isNegative ? `-${formatted}` : formatted;
            }
        }

        // Fallback : afficher le nombre normalement
        return isNegative ? `-${Math.floor(value)}` : Math.floor(value).toString();
    },

    /**
     * Formate un nombre avec séparateurs de milliers (espaces)
     * Ex: 1234567 → 1 234 567
     * @param {number} value - Le nombre à formater
     * @returns {string} - Nombre formaté avec espaces
     */
    formatWithSpaces(value) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }

        value = Math.floor(Number(value));
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    /**
     * Formate un nombre en notation scientifique
     * Ex: 1234567 → 1.23e6
     * @param {number} value - Le nombre à formater
     * @param {number} decimals - Nombre de décimales (défaut: 2)
     * @returns {string} - Nombre en notation scientifique
     */
    formatScientific(value, decimals = 2) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }

        value = Number(value);

        if (value < 1000) {
            return Math.floor(value).toString();
        }

        return value.toExponential(decimals);
    },

    /**
     * Formate un ratio ou pourcentage
     * Ex: formatRatio(567, 1000) → "567 / 1000 (56.7%)"
     * @param {number} current - Valeur actuelle
     * @param {number} max - Valeur maximum
     * @param {boolean} showPercent - Afficher le pourcentage (défaut: true)
     * @returns {string} - Ratio formaté
     */
    formatRatio(current, max, showPercent = true) {
        current = Math.floor(Number(current) || 0);
        max = Math.floor(Number(max) || 0);

        if (max === 0) {
            return `${current} / ${max}`;
        }

        const percent = ((current / max) * 100).toFixed(1);
        
        if (showPercent) {
            return `${this.format(current)} / ${this.format(max)} (${percent}%)`;
        } else {
            return `${this.format(current)} / ${this.format(max)}`;
        }
    },

    /**
     * Formate une production par seconde/minute
     * Ex: formatRate(10, 'min') → "10/min"
     * @param {number} value - Valeur de production
     * @param {string} unit - Unité de temps ('sec', 'min', 'hour')
     * @returns {string} - Production formatée
     */
    formatRate(value, unit = 'sec') {
        const formatted = this.format(value, 1);
        return `${formatted}/${unit}`;
    },

    /**
     * Formate un temps en format lisible
     * Ex: 3665 → "1h 1m 5s"
     * @param {number} seconds - Nombre de secondes
     * @param {boolean} short - Format court (défaut: false)
     * @returns {string} - Temps formaté
     */
    formatTime(seconds, short = false) {
        if (seconds < 0 || isNaN(seconds)) {
            return short ? '0s' : '0 seconde';
        }

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const parts = [];

        if (days > 0) parts.push(short ? `${days}j` : `${days} jour${days > 1 ? 's' : ''}`);
        if (hours > 0) parts.push(short ? `${hours}h` : `${hours} heure${hours > 1 ? 's' : ''}`);
        if (minutes > 0) parts.push(short ? `${minutes}m` : `${minutes} minute${minutes > 1 ? 's' : ''}`);
        if (secs > 0 || parts.length === 0) parts.push(short ? `${secs}s` : `${secs} seconde${secs > 1 ? 's' : ''}`);

        return parts.join(' ');
    }
};

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.NumberFormatter = NumberFormatter;
}
