/**
 * Classe Dragon - Représente un dragon individuel avec génétique et généalogie
 */

class Dragon {
    constructor(data = {}) {
        // Identité
        this.id = data.id || this.generateId();
        this.name = data.name || this.generateName();

        // Génétique (peut être hybride)
        this.types = data.types || [this.randomType()]; // Array de types
        this.tier = data.tier !== undefined ? data.tier : 0;

        // Généalogie
        this.parentIds = data.parentIds || null; // [parent1Id, parent2Id] ou null
        this.genealogy = data.genealogy || null; // Arbre généalogique complet
        this.generation = data.generation || 0; // Génération (0 = sauvage)

        // Génome (coefficients génétiques 0-1 pour chaque stat)
        this.genome = data.genome || this.generateGenome();
        this.purity = data.purity || this.calculatePurity();
        this.isMutation = data.isMutation || false;

        // Stats
        this.baseStats = data.baseStats || this.generateBaseStats();
        this.level = data.level || 1;
        this.experience = data.experience || 0;
        this.bonusStats = data.bonusStats || this.calculateBonusStats();
        this.essenceBoosts = data.essenceBoosts || 0; // Nombre d'essences utilisées

        // Vie & Santé
        this.bornAt = data.bornAt || Date.now();
        this.lifespan = data.lifespan || DragonsConfig.LIFESPAN.duration;
        this.remainingLife = data.remainingLife || this.lifespan;
        this.isAlive = data.isAlive !== undefined ? data.isAlive : true;

        // Nourriture
        this.lastFedAt = data.lastFedAt || Date.now();
        this.hungerStacks = data.hungerStacks || 0;
        this.isFed = data.isFed !== undefined ? data.isFed : true;

        // Entraînement
        this.lastTrainedAt = data.lastTrainedAt || 0;
        this.canTrain = true;
    }

    // ========== GÉNÉRATION INITIALE ==========

    generateId() {
        return 'dragon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateName() {
        const config = DragonsConfig.NAMES;

        // 10% de chance d'avoir un nom spécial
        if (Math.random() < 0.1) {
            return config.special[Math.floor(Math.random() * config.special.length)];
        }

        const prefix = config.prefixes[Math.floor(Math.random() * config.prefixes.length)];
        const suffix = config.suffixes[Math.floor(Math.random() * config.suffixes.length)];
        return prefix + suffix;
    }

    randomType() {
        const types = Object.keys(DragonsConfig.TYPES);
        return types[Math.floor(Math.random() * types.length)];
    }

    generateGenome() {
        // Génome aléatoire pour un dragon sauvage (première génération)
        const genome = {};
        const stats = ['force', 'agility', 'intelligence', 'wisdom', 'endurance'];

        stats.forEach(stat => {
            genome[stat] = Math.random(); // 0 à 1
        });

        return genome;
    }

    generateBaseStats() {
        const tierConfig = DragonsConfig.TIERS[this.tier];
        const stats = {};

        // Pour chaque type du dragon, distribuer les stats
        const totalStats = Math.floor(
            Math.random() * (tierConfig.maxStat - tierConfig.minStat + 1)
            + tierConfig.minStat
        );

        // Si dragon pur (1 seul type)
        if (this.types.length === 1) {
            const stat = DragonsConfig.TYPES[this.types[0]].stat;
            stats[stat] = totalStats;
        }
        // Si dragon hybride
        else {
            const perType = Math.floor(totalStats / this.types.length);
            this.types.forEach(type => {
                const stat = DragonsConfig.TYPES[type].stat;
                stats[stat] = perType;
            });
        }

        return stats;
    }

    // ========== CALCULS GÉNÉTIQUES ==========

    calculatePurity() {
        if (!this.genealogy || this.types.length > 1) {
            return this.types.length === 1 ? 1.0 : 0.5;
        }

        const mainType = this.types[0];
        const calc = DragonsConfig.GENETICS.PURITY_CALCULATION;

        let purityScore = calc.self; // 50% pour soi-même

        // Vérifier les parents (structure: { father: {...}, mother: {...} })
        if (this.genealogy.parents) {
            let parentsOfType = 0;
            const { father, mother } = this.genealogy.parents;

            if (father && father.types && father.types.includes(mainType)) parentsOfType++;
            if (mother && mother.types && mother.types.includes(mainType)) parentsOfType++;

            purityScore += (parentsOfType / 2) * calc.parents; // 15% par parent
        }

        // Vérifier les grands-parents (structure: { paternalGrandfather, paternalGrandmother, ... })
        if (this.genealogy.grandparents) {
            let grandparentsOfType = 0;
            const gp = this.genealogy.grandparents;

            if (gp.paternalGrandfather && gp.paternalGrandfather.types && gp.paternalGrandfather.types.includes(mainType)) grandparentsOfType++;
            if (gp.paternalGrandmother && gp.paternalGrandmother.types && gp.paternalGrandmother.types.includes(mainType)) grandparentsOfType++;
            if (gp.maternalGrandfather && gp.maternalGrandfather.types && gp.maternalGrandfather.types.includes(mainType)) grandparentsOfType++;
            if (gp.maternalGrandmother && gp.maternalGrandmother.types && gp.maternalGrandmother.types.includes(mainType)) grandparentsOfType++;

            purityScore += (grandparentsOfType / 4) * calc.grandparents; // 5% par grand-parent
        }

        return Math.min(purityScore, 1.0);
    }

    calculateBonusStats() {
        const bonus = {};
        const statsPerLevel = DragonsConfig.TRAINING.statsPerLevel;
        const essenceBoost = DragonsConfig.ESSENCE.boostAmount;

        // Bonus d'entraînement
        const trainingBonus = (this.level - 1) * statsPerLevel;

        // Bonus d'essence
        const essenceBonusTotal = this.essenceBoosts * essenceBoost;

        // Appliquer aux stats principales
        this.types.forEach(type => {
            const stat = DragonsConfig.TYPES[type].stat;
            bonus[stat] = (bonus[stat] || 0) + trainingBonus + essenceBonusTotal;
        });

        // Bonus de mutation
        if (this.isMutation) {
            Object.keys(bonus).forEach(stat => {
                bonus[stat] += DragonsConfig.GENETICS.MUTATION_BONUS;
            });
        }

        return bonus;
    }

    getTotalStats() {
        // Initialise toutes les stats à 0
        const total = {
            force: 0,
            agility: 0,
            intelligence: 0,
            wisdom: 0,
            endurance: 0
        };

        // Ajoute baseStats
        Object.keys(this.baseStats).forEach(stat => {
            total[stat] = (total[stat] || 0) + (this.baseStats[stat] || 0);
        });

        // Ajoute bonusStats
        Object.keys(this.bonusStats).forEach(stat => {
            total[stat] = (total[stat] || 0) + (this.bonusStats[stat] || 0);
        });

        return total;
    }

    // ========== VIE & SANTÉ ==========

    update(deltaTime) {
        if (!this.isAlive) return;

        // IMPORTANT: Limiter le deltaTime pour éviter que les dragons meurent instantanément
        // après un long temps d'inactivité (ex: fermer le jeu pendant des heures)
        const MAX_DELTA_TIME = 5 * 60 * 1000; // Maximum 5 minutes par tick
        const safeDeltaTime = Math.min(deltaTime, MAX_DELTA_TIME);

        const now = Date.now();

        // Vérifier la faim (seulement si 1h s'est écoulée depuis le dernier repas)
        const timeSinceLastFed = now - this.lastFedAt;
        if (timeSinceLastFed >= DragonsConfig.LIFESPAN.feedingInterval) {
            // Calculer combien d'heures de faim se sont accumulées
            const hoursMissed = Math.floor(timeSinceLastFed / DragonsConfig.LIFESPAN.feedingInterval);
            this.hungerStacks = Math.min(this.hungerStacks + hoursMissed, DragonsConfig.LIFESPAN.maxHungerStacks);
            this.isFed = false;

            // Réduire la durée de vie à cause de la faim
            const hungerPenalty = hoursMissed * DragonsConfig.LIFESPAN.hungerDamage * 60 * 60 * 1000; // Heures en ms
            this.remainingLife -= hungerPenalty;

            // Mettre à jour le lastFedAt pour éviter de recalculer
            this.lastFedAt = now;

            if (this.hungerStacks >= DragonsConfig.LIFESPAN.maxHungerStacks) {
                this.kill('hunger');
                return;
            }
        }

        // Décrémenter la durée de vie restante (limitée à safeDeltaTime)
        this.remainingLife -= safeDeltaTime;

        if (this.remainingLife <= 0) {
            this.kill('old_age');
        }
    }

    feed() {
        if (!this.isAlive) return false;

        this.lastFedAt = Date.now();
        this.hungerStacks = 0;
        this.isFed = true;

        return true;
    }

    kill(reason = 'unknown') {
        this.isAlive = false;
        this.remainingLife = 0;

        if (GameConfig.DEBUG.enabled) {
            console.log(`💀 Dragon ${this.name} est mort (raison: ${reason})`);
        }
    }

    // ========== ENTRAÎNEMENT ==========

    canTrainNow() {
        if (this.level >= DragonsConfig.TRAINING.maxLevel) return false;
        if (!this.isAlive) return false;

        const now = Date.now();
        const cooldown = DragonsConfig.TRAINING.cooldown;

        return (now - this.lastTrainedAt) >= cooldown;
    }

    train() {
        if (!this.canTrainNow()) return false;

        const xpGained = DragonsConfig.TRAINING.xpPerTraining;
        this.experience += xpGained;
        this.lastTrainedAt = Date.now();

        // Vérifier montée de niveau
        const xpRequired = DragonsConfig.TRAINING.xpRequired(this.level);
        if (this.experience >= xpRequired) {
            this.levelUp();
        }

        return true;
    }

    levelUp() {
        if (this.level >= DragonsConfig.TRAINING.maxLevel) return;

        this.level++;
        this.experience = 0;
        this.bonusStats = this.calculateBonusStats();

        if (GameConfig.DEBUG.enabled) {
            console.log(`✨ ${this.name} monte au niveau ${this.level}!`);
        }
    }

    applyEssence() {
        const maxEssence = DragonsConfig.ESSENCE.maxEssencePerDragon;

        if (this.essenceBoosts >= maxEssence) {
            return false; // Déjà au maximum
        }

        this.essenceBoosts++;
        this.bonusStats = this.calculateBonusStats();

        return true;
    }

    // ========== AFFICHAGE ==========

    getRaceName() {
        // Retourne le nom de race complet (ex: "Rousse Épique" ou "Flamboiement Légendaire")
        const tierName = DragonsConfig.TIERS[this.tier].name;

        if (this.types.length === 1) {
            // Dragon pur
            const raceName = DragonsConfig.TYPES[this.types[0]].raceName;
            return `${raceName} ${tierName}`;
        } else {
            // Dragon hybride - utilise les noms de croisements
            const sortedTypes = [...this.types].sort(); // Trie pour cohérence
            const hybridKey = sortedTypes.join('-');
            const hybridName = DragonsConfig.HYBRID_NAMES[hybridKey];

            if (hybridName) {
                return `${hybridName} ${tierName}`;
            } else {
                // Fallback si le croisement n'est pas défini
                const raceNames = this.types.map(t => DragonsConfig.TYPES[t].raceName).join('-');
                return `${raceNames} ${tierName}`;
            }
        }
    }

    getDisplayInfo() {
        const total = this.getTotalStats();
        const typeNames = this.types.map(t => DragonsConfig.TYPES[t].name).join(' / ');
        const tierInfo = DragonsConfig.TIERS[this.tier];

        // Calcul du nom de race court
        let raceNameShort;
        if (this.types.length === 1) {
            raceNameShort = DragonsConfig.TYPES[this.types[0]].raceName;
        } else {
            const sortedTypes = [...this.types].sort();
            const hybridKey = sortedTypes.join('-');
            raceNameShort = DragonsConfig.HYBRID_NAMES[hybridKey] || this.types.map(t => DragonsConfig.TYPES[t].raceName).join('-');
        }

        return {
            id: this.id,
            name: this.name,
            raceName: this.getRaceName(),
            raceNameShort: raceNameShort,
            types: this.types,
            typeNames: typeNames,
            tier: this.tier,
            tierName: tierInfo.name,
            tierColor: tierInfo.color,
            level: this.level,
            stats: total,
            purity: Math.round(this.purity * 100),
            isAlive: this.isAlive,
            remainingLifeDays: this.getRemainingLifeDays(),
            isFed: this.isFed,
            hungerStacks: this.hungerStacks,
            generation: this.generation,
            isMutation: this.isMutation
        };
    }

    getRemainingLifeDays() {
        if (!this.isAlive) return 0;
        const days = this.remainingLife / (24 * 60 * 60 * 1000);
        return Math.max(0, parseFloat(days.toFixed(2)));
    }

    // ========== SAVE/LOAD ==========

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            types: this.types,
            tier: this.tier,
            parentIds: this.parentIds,
            genealogy: this.genealogy,
            generation: this.generation,
            genome: this.genome,
            purity: this.purity,
            isMutation: this.isMutation,
            baseStats: this.baseStats,
            level: this.level,
            experience: this.experience,
            bonusStats: this.bonusStats,
            essenceBoosts: this.essenceBoosts,
            bornAt: this.bornAt,
            lifespan: this.lifespan,
            remainingLife: this.remainingLife,
            isAlive: this.isAlive,
            lastFedAt: this.lastFedAt,
            hungerStacks: this.hungerStacks,
            isFed: this.isFed,
            lastTrainedAt: this.lastTrainedAt
        };
    }

    static fromJSON(data) {
        return new Dragon(data);
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.Dragon = Dragon;
}
