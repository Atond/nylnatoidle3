/**
 * DragonManager - Gestion de la collection, reproduction et génétique
 */

class DragonManager {
    constructor(player) {
        this.player = player;

        // Collection de dragons
        this.dragons = []; // Tous les dragons vivants et morts
        this.equippedDragonId = null;

        // Ressources
        this.dragonFood = 0;
        this.dragonEssences = 0;

        // Reproduction
        this.selectedDragonsForBreeding = [null, null]; // [dragon1, dragon2]

        // Stats
        this.totalDragonsBorn = 0;
        this.totalDragonsDied = 0;

        // Bestiaire : suivi des découvertes
        // Structure: { 'type': {tier0: bool, ...}, 'type1-type2': {tier0: bool, ...}, ... }
        this.bestiary = this.initializeBestiary();
    }

    /**
     * Initialise le bestiaire vide (dragons purs ET hybrides)
     */
    initializeBestiary() {
        const bestiary = {};

        // Dragons purs (5 types)
        for (const type in DragonsConfig.TYPES) {
            bestiary[type] = {};
            for (const tier in DragonsConfig.TIERS) {
                bestiary[type][tier] = false;
            }
        }

        // Dragons hybrides (tous les croisements)
        for (const hybridKey in DragonsConfig.HYBRID_NAMES) {
            bestiary[hybridKey] = {};
            for (const tier in DragonsConfig.TIERS) {
                bestiary[hybridKey][tier] = false;
            }
        }

        return bestiary;
    }

    /**
     * Débloque une entrée du bestiaire (pur ou hybride)
     */
    unlockBestiaryEntry(raceKey, tier) {
        if (!this.bestiary[raceKey]) return;
        if (!this.bestiary[raceKey][tier]) {
            this.bestiary[raceKey][tier] = true;
            if (GameConfig.DEBUG.enabled) {
                const tierConfig = DragonsConfig.TIERS[tier];
                let raceName;
                if (DragonsConfig.TYPES[raceKey]) {
                    raceName = DragonsConfig.TYPES[raceKey].raceName;
                } else {
                    raceName = DragonsConfig.HYBRID_NAMES[raceKey];
                }
                console.log(`📖 Bestiaire débloqué: ${raceName} ${tierConfig.name}`);
            }
        }
    }

    /**
     * Vérifie si une entrée est découverte
     */
    isBestiaryEntryUnlocked(raceKey, tier) {
        return this.bestiary[raceKey] && this.bestiary[raceKey][tier];
    }

    /**
     * Récupère les stats du bestiaire
     */
    getBestiaryStats() {
        let total = 0;
        let unlocked = 0;
        for (const raceKey in this.bestiary) {
            for (const tier in this.bestiary[raceKey]) {
                total++;
                if (this.bestiary[raceKey][tier]) unlocked++;
            }
        }
        return { unlocked, total, percentage: Math.round((unlocked / total) * 100) };
    }

    // ========== COLLECTION ==========

    addDragon(dragon) {
        if (this.dragons.length >= this.getMaxCapacity()) {
            return { success: false, message: 'Collection pleine !' };
        }

        this.dragons.push(dragon);
        this.totalDragonsBorn++;

        // Débloquer dans le bestiaire
        if (dragon.types.length === 1) {
            // Dragon pur
            this.unlockBestiaryEntry(dragon.types[0], dragon.tier);
        } else {
            // Dragon hybride : débloquer avec la clé triée
            const sortedTypes = [...dragon.types].sort();
            const hybridKey = sortedTypes.join('-');
            this.unlockBestiaryEntry(hybridKey, dragon.tier);
        }

        if (GameConfig.DEBUG.enabled) {
            console.log(`🐉 Nouveau dragon ajouté : ${dragon.name}`);
        }

        return { success: true, dragon: dragon };
    }

    removeDragon(dragonId) {
        const index = this.dragons.findIndex(d => d.id === dragonId);
        if (index === -1) return false;

        // Si équipé, déséquiper
        if (this.equippedDragonId === dragonId) {
            this.unequipDragon();
        }

        this.dragons.splice(index, 1);
        return true;
    }

    getDragon(dragonId) {
        return this.dragons.find(d => d.id === dragonId);
    }

    getAliveDragons() {
        return this.dragons.filter(d => d.isAlive);
    }

    getDeadDragons() {
        return this.dragons.filter(d => !d.isAlive);
    }

    getMaxCapacity() {
        // TODO: Gérer les expansions plus tard
        return DragonsConfig.COLLECTION.maxDragons;
    }

    // ========== ÉQUIPEMENT ==========

    equipDragon(dragonId) {
        const dragon = this.getDragon(dragonId);

        if (!dragon) {
            return { success: false, message: 'Dragon introuvable' };
        }

        if (!dragon.isAlive) {
            return { success: false, message: 'Impossible d\'équiper un dragon mort' };
        }

        // Déséquiper l'ancien
        if (this.equippedDragonId) {
            this.unequipDragon();
        }

        this.equippedDragonId = dragonId;

        // Recalculer les stats du joueur
        if (this.player) {
            this.player.updateEquipmentStats();
        }

        return { success: true, dragon: dragon };
    }

    unequipDragon() {
        this.equippedDragonId = null;

        // Recalculer les stats du joueur
        if (this.player) {
            this.player.updateEquipmentStats();
        }
    }

    getEquippedDragon() {
        if (!this.equippedDragonId) return null;
        return this.getDragon(this.equippedDragonId);
    }

    // ========== REPRODUCTION ==========

    selectDragonForBreeding(slot, dragonId) {
        if (slot < 0 || slot > 1) return false;

        const dragon = this.getDragon(dragonId);
        if (!dragon || !dragon.isAlive) return false;

        this.selectedDragonsForBreeding[slot] = dragon;
        return true;
    }

    clearBreedingSelection() {
        this.selectedDragonsForBreeding = [null, null];
    }

    canBreed() {
        const [parent1, parent2] = this.selectedDragonsForBreeding;

        if (!parent1 || !parent2) {
            return { can: false, reason: 'Sélectionnez deux dragons' };
        }

        if (parent1.id === parent2.id) {
            return { can: false, reason: 'Impossible de reproduire un dragon avec lui-même' };
        }

        if (!parent1.isAlive || !parent2.isAlive) {
            return { can: false, reason: 'Les deux dragons doivent être vivants' };
        }

        const cost = this.getBreedingCost(parent1, parent2);
        if (this.player.resources.gold < cost) {
            return { can: false, reason: `Coût: ${cost} or (insuffisant)` };
        }

        if (this.dragons.length >= this.getMaxCapacity()) {
            return { can: false, reason: 'Collection pleine' };
        }

        return { can: true, cost: cost };
    }

    getBreedingCost(parent1, parent2) {
        const maxTier = Math.max(parent1.tier, parent2.tier);
        return DragonsConfig.TIERS[maxTier].reproductionCost;
    }

    breed() {
        const canBreedResult = this.canBreed();
        if (!canBreedResult.can) {
            return { success: false, message: canBreedResult.reason };
        }

        const [parent1, parent2] = this.selectedDragonsForBreeding;

        // Payer le coût
        this.player.resources.gold -= canBreedResult.cost;

        // Créer le bébé dragon
        const baby = this.createOffspring(parent1, parent2);

        // Ajouter à la collection
        this.addDragon(baby);

        // Clear selection
        this.clearBreedingSelection();

        return {
            success: true,
            dragon: baby,
            message: `${baby.name} est né ! (${DragonsConfig.TIERS[baby.tier].name})`
        };
    }

    createOffspring(parent1, parent2) {
        // Déterminer le tier du bébé
        const tier = this.calculateOffspringTier(parent1, parent2);

        // Déterminer les types (génétique)
        const types = this.calculateOffspringTypes(parent1, parent2);

        // Calculer le génome
        const genome = this.inheritGenome(parent1, parent2);

        // Vérifier mutation
        const isMutation = Math.random() < DragonsConfig.GENETICS.MUTATION_CHANCE;

        // Créer la généalogie
        const genealogy = this.buildGenealogy(parent1, parent2);

        // Créer le dragon
        const baby = new Dragon({
            types: types,
            tier: tier,
            parentIds: [parent1.id, parent2.id],
            genealogy: genealogy,
            generation: Math.max(parent1.generation, parent2.generation) + 1,
            genome: genome,
            isMutation: isMutation
        });

        // Recalculer la pureté avec la généalogie
        baby.purity = baby.calculatePurity();

        return baby;
    }

    calculateOffspringTier(parent1, parent2) {
        const minTier = Math.min(parent1.tier, parent2.tier);
        const maxTier = Math.max(parent1.tier, parent2.tier);

        // Calculer les probabilités avec bonus génétiques
        let tierUpChance = DragonsConfig.GENETICS.BASE_PROBABILITIES.tier_up;

        // Bonus si haute pureté
        const avgPurity = (parent1.purity + parent2.purity) / 2;
        if (avgPurity > 0.8) {
            tierUpChance += DragonsConfig.GENETICS.PURITY_BONUS.high_purity;
        }

        // Bonus si parents même tier
        if (parent1.tier === parent2.tier) {
            tierUpChance += DragonsConfig.GENETICS.PURITY_BONUS.same_tier_parents;
        }

        // Bonus si lignée pure (4 grands-parents même type)
        if (this.hasUnifiedLineage(parent1, parent2)) {
            tierUpChance += DragonsConfig.GENETICS.PURITY_BONUS.same_lineage;
        }

        // Malus si hybrides
        const hybridPenalty = this.calculateHybridPenalty(parent1, parent2);
        tierUpChance -= hybridPenalty;

        // Roll
        const roll = Math.random();
        const failureChance = DragonsConfig.GENETICS.BASE_PROBABILITIES.failure;

        if (roll < failureChance) {
            // Échec = perte d'un tier
            return Math.max(0, minTier - 1);
        } else if (roll < failureChance + tierUpChance) {
            // Succès = montée d'un tier
            return Math.min(5, maxTier + 1);
        } else {
            // Normal = tier aléatoire entre min et max
            return minTier + Math.floor(Math.random() * (maxTier - minTier + 1));
        }
    }

    calculateOffspringTypes(parent1, parent2) {
        // Fusionner les types uniques des parents
        const allTypes = [...new Set([...parent1.types, ...parent2.types])];

        // Si un seul type, 90% de garder, 10% de muter
        if (allTypes.length === 1) {
            if (Math.random() < 0.1) {
                // Mutation vers un type aléatoire
                const randomType = Object.keys(DragonsConfig.TYPES)[
                    Math.floor(Math.random() * Object.keys(DragonsConfig.TYPES).length)
                ];
                return [allTypes[0], randomType];
            }
            return [allTypes[0]];
        }

        // Si plusieurs types, hériter aléatoirement
        // 50% de garder tous les types, 30% d'en garder un, 20% d'en garder plusieurs
        const roll = Math.random();

        if (roll < 0.5) {
            return allTypes; // Tous
        } else if (roll < 0.8) {
            return [allTypes[Math.floor(Math.random() * allTypes.length)]]; // Un seul
        } else {
            // Plusieurs aléatoires
            const count = 1 + Math.floor(Math.random() * allTypes.length);
            return allTypes.sort(() => 0.5 - Math.random()).slice(0, count);
        }
    }

    inheritGenome(parent1, parent2) {
        const genome = {};
        const stats = ['force', 'agility', 'intelligence', 'wisdom', 'endurance'];

        stats.forEach(stat => {
            // Moyenne des génomes + petite variation
            const avg = (parent1.genome[stat] + parent2.genome[stat]) / 2;
            const variation = (Math.random() - 0.5) * 0.2; // ±10%
            genome[stat] = Math.max(0, Math.min(1, avg + variation));
        });

        return genome;
    }

    buildGenealogy(parent1, parent2) {
        // Créer les objets parents avec les infos nécessaires pour l'affichage
        const parent1Data = {
            id: parent1.id,
            name: parent1.name,
            types: parent1.types,
            tier: parent1.tier,
            purity: Math.round(parent1.purity * 100),
            icon: DragonsConfig.TYPES[parent1.types[0]].icon,
            tierColor: DragonsConfig.TIERS[parent1.tier].color,
            tierName: DragonsConfig.TIERS[parent1.tier].name
        };

        const parent2Data = {
            id: parent2.id,
            name: parent2.name,
            types: parent2.types,
            tier: parent2.tier,
            purity: Math.round(parent2.purity * 100),
            icon: DragonsConfig.TYPES[parent2.types[0]].icon,
            tierColor: DragonsConfig.TIERS[parent2.tier].color,
            tierName: DragonsConfig.TIERS[parent2.tier].name
        };

        // Structure attendue par l'UI
        return {
            parents: {
                father: parent1Data,
                mother: parent2Data
            },
            grandparents: {
                paternalGrandfather: parent1.genealogy?.parents?.father || null,
                paternalGrandmother: parent1.genealogy?.parents?.mother || null,
                maternalGrandfather: parent2.genealogy?.parents?.father || null,
                maternalGrandmother: parent2.genealogy?.parents?.mother || null
            }
        };
    }

    hasUnifiedLineage(parent1, parent2) {
        // Vérifier que les deux parents ont une généalogie complète
        if (!parent1.genealogy?.parents || !parent2.genealogy?.parents) {
            return false;
        }

        // Récupérer les 4 grands-parents (parents des parents)
        const allGrandparents = [
            parent1.genealogy.parents.father,
            parent1.genealogy.parents.mother,
            parent2.genealogy.parents.father,
            parent2.genealogy.parents.mother
        ];

        // Vérifier qu'on a bien 4 grands-parents
        if (allGrandparents.some(gp => !gp)) return false;

        // Vérifier si tous ont le même type principal
        const firstType = allGrandparents[0]?.types?.[0];
        if (!firstType) return false;

        return allGrandparents.every(gp => gp?.types?.includes(firstType));
    }

    calculateHybridPenalty(parent1, parent2) {
        const allTypes = new Set([...parent1.types, ...parent2.types]);
        const typeCount = allTypes.size;

        if (typeCount === 1) return 0;
        if (typeCount === 2) return DragonsConfig.GENETICS.HYBRID_PENALTY.two_types;
        if (typeCount === 3) return DragonsConfig.GENETICS.HYBRID_PENALTY.three_types;
        return DragonsConfig.GENETICS.HYBRID_PENALTY.four_types;
    }

    // ========== NOURRISSAGE ==========

    feedDragon(dragonId) {
        const dragon = this.getDragon(dragonId);

        if (!dragon || !dragon.isAlive) {
            return { success: false, message: 'Dragon introuvable ou mort' };
        }

        if (dragon.isFed) {
            return { success: false, message: 'Dragon déjà nourri' };
        }

        if (this.dragonFood < 1) {
            return { success: false, message: 'Nourriture insuffisante' };
        }

        this.dragonFood--;
        dragon.feed();

        return { success: true, message: `${dragon.name} a été nourri` };
    }

    feedAllDragons() {
        const hungry = this.getAliveDragons().filter(d => !d.isFed);

        if (hungry.length === 0) {
            return { success: false, message: 'Aucun dragon affamé' };
        }

        if (this.dragonFood < hungry.length) {
            return { success: false, message: 'Nourriture insuffisante' };
        }

        let fed = 0;
        hungry.forEach(dragon => {
            if (this.dragonFood > 0) {
                this.dragonFood--;
                dragon.feed();
                fed++;
            }
        });

        return { success: true, message: `${fed} dragons nourris` };
    }

    // ========== ENTRAÎNEMENT ==========

    trainDragon(dragonId) {
        const dragon = this.getDragon(dragonId);

        if (!dragon || !dragon.isAlive) {
            return { success: false, message: 'Dragon introuvable ou mort' };
        }

        if (!dragon.canTrainNow()) {
            return { success: false, message: 'Dragon en cooldown ou niveau max' };
        }

        const cost = DragonsConfig.TRAINING.trainingCost(dragon.level);

        if (this.player.resources.gold < cost) {
            return { success: false, message: `Coût: ${cost} or (insuffisant)` };
        }

        this.player.resources.gold -= cost;

        const success = dragon.train();

        if (success) {
            // Recalculer les stats si équipé
            if (this.equippedDragonId === dragonId && this.player) {
                this.player.updateEquipmentStats();
            }

            return { success: true, message: `${dragon.name} a gagné de l'XP !` };
        }

        return { success: false, message: 'Échec de l\'entraînement' };
    }

    // ========== ESSENCE ==========

    applyEssence(dragonId) {
        const dragon = this.getDragon(dragonId);

        if (!dragon || !dragon.isAlive) {
            return { success: false, message: 'Dragon introuvable ou mort' };
        }

        if (this.dragonEssences < 1) {
            return { success: false, message: 'Aucune essence disponible' };
        }

        const success = dragon.applyEssence();

        if (!success) {
            return { success: false, message: 'Dragon déjà au maximum d\'essences' };
        }

        this.dragonEssences--;

        // Recalculer les stats si équipé
        if (this.equippedDragonId === dragonId && this.player) {
            this.player.updateEquipmentStats();
        }

        return {
            success: true,
            message: `${dragon.name} a reçu +${DragonsConfig.ESSENCE.boostAmount} stats !`
        };
    }

    handleDragonDeath(dragon) {
        this.totalDragonsDied++;
        this.dragonEssences += DragonsConfig.ESSENCE.droppedOnDeath;

        // Si équipé, déséquiper
        if (this.equippedDragonId === dragon.id) {
            this.unequipDragon();
        }

        if (GameConfig.DEBUG.enabled) {
            console.log(`💀 ${dragon.name} est mort. +${DragonsConfig.ESSENCE.droppedOnDeath} essence`);
        }
    }

    // ========== UPDATE LOOP ==========

    update(deltaTime) {
        const aliveDragons = this.getAliveDragons();

        aliveDragons.forEach(dragon => {
            const wasAlive = dragon.isAlive;
            dragon.update(deltaTime);

            // Vérifier si mort pendant l'update
            if (wasAlive && !dragon.isAlive) {
                this.handleDragonDeath(dragon);
            }
        });
    }

    // ========== SAVE/LOAD ==========

    toJSON() {
        return {
            dragons: this.dragons.map(d => d.toJSON()),
            equippedDragonId: this.equippedDragonId,
            dragonFood: this.dragonFood,
            dragonEssences: this.dragonEssences,
            totalDragonsBorn: this.totalDragonsBorn,
            totalDragonsDied: this.totalDragonsDied
        };
    }

    fromJSON(data) {
        if (!data) return;

        this.dragons = (data.dragons || []).map(d => Dragon.fromJSON(d));
        this.equippedDragonId = data.equippedDragonId || null;
        this.dragonFood = data.dragonFood || 0;
        this.dragonEssences = data.dragonEssences || 0;
        this.totalDragonsBorn = data.totalDragonsBorn || 0;
        this.totalDragonsDied = data.totalDragonsDied || 0;
    }
}

// Rendre disponible globalement
if (typeof window !== 'undefined') {
    window.DragonManager = DragonManager;
}
