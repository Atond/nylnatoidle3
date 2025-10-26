/**
 * 🐉 Helper utilitaire pour tester le système de dragons
 * Utilisable via la console navigateur ou pour debug
 */

const DragonTestHelper = {
    /**
     * Crée un dragon de test avec des paramètres simples
     * @param {string} type - Type du dragon ('force', 'dexterite', 'endurance', 'intelligence', 'chance')
     * @param {number} tier - Tier du dragon (0-5)
     * @returns {Dragon} Le dragon créé
     */
    createTestDragon(type = 'force', tier = 0) {
        const dragon = new Dragon({
            types: [type],
            tier: tier,
            genealogy: null
        });

        console.log(`✅ Dragon créé:`, {
            id: dragon.id,
            name: dragon.name,
            type: dragon.types[0],
            tier: dragon.tier,
            stats: dragon.getTotalStats(),
            purity: dragon.purity
        });

        return dragon;
    },

    /**
     * Crée plusieurs dragons de test et les ajoute au manager
     * @param {number} count - Nombre de dragons à créer
     */
    createTestCollection(count = 5) {
        if (!game || !game.dragonManager) {
            console.error('❌ Game ou DragonManager non initialisé');
            return;
        }

        console.log(`🐉 Création de ${count} dragons de test...`);

        const types = Object.keys(DragonsConfig.TYPES);
        const createdDragons = [];

        for (let i = 0; i < count; i++) {
            const randomType = types[Math.floor(Math.random() * types.length)];
            const randomTier = Math.floor(Math.random() * 3); // T0-T2 pour commencer

            const dragon = this.createTestDragon(randomType, randomTier);
            game.dragonManager.addDragon(dragon);
            createdDragons.push(dragon);
        }

        console.log(`✅ ${count} dragons créés et ajoutés à la collection`);
        console.log('🎮 Ouvre l\'onglet Dragons pour les voir !');

        return createdDragons;
    },

    /**
     * Donne des ressources pour tester le système
     */
    giveTestResources() {
        if (!game || !game.dragonManager || !game.player) {
            console.error('❌ Game non initialisé');
            return;
        }

        // Donne de la nourriture pour dragons
        game.dragonManager.dragonFood = 1000;

        // Donne de l'or pour l'entraînement
        game.player.resources.gold = 100000;

        // Donne des essences
        game.dragonManager.dragonEssences = 50;

        console.log('✅ Ressources de test données:');
        console.log(`  🍖 Nourriture: ${game.dragonManager.dragonFood}`);
        console.log(`  💰 Or: ${game.player.resources.gold}`);
        console.log(`  ✨ Essences: ${game.dragonManager.dragonEssences}`);
    },

    /**
     * Teste le système de reproduction avec deux dragons
     */
    testBreeding() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        // Libère de la place si collection pleine
        if (game.dragonManager.dragons.length >= game.dragonManager.getMaxCapacity()) {
            console.log('⚠️ Collection pleine, suppression de 2 dragons...');
            const toRemove = game.dragonManager.dragons.slice(-2);
            toRemove.forEach(d => game.dragonManager.removeDragon(d.id));
        }

        // Crée deux dragons T1 de type force
        const parent1 = this.createTestDragon('force', 1);
        const parent2 = this.createTestDragon('force', 1);

        game.dragonManager.addDragon(parent1);
        game.dragonManager.addDragon(parent2);

        // Ressuscite-les immédiatement
        parent1.isAlive = true;
        parent1.remainingLife = parent1.lifespan;
        parent1.hungerStacks = 0;
        parent1.isFed = true;
        parent1.lastFedAt = Date.now();

        parent2.isAlive = true;
        parent2.remainingLife = parent2.lifespan;
        parent2.hungerStacks = 0;
        parent2.isFed = true;
        parent2.lastFedAt = Date.now();

        console.log('👪 Test de reproduction avec deux parents T1 Force...');
        console.log(`Parent 1: ${parent1.name} (Pureté: ${parent1.purity.toFixed(2)}%)`);
        console.log(`Parent 2: ${parent2.name} (Pureté: ${parent2.purity.toFixed(2)}%)`);

        // Sélectionne les parents pour reproduction
        game.dragonManager.selectedDragonsForBreeding[0] = parent1;
        game.dragonManager.selectedDragonsForBreeding[1] = parent2;

        // Tente la reproduction
        const result = game.dragonManager.breed();

        if (result.success) {
            const offspring = result.dragon; // Correct: c'est 'dragon' pas 'offspring'
            console.log('✅ Reproduction réussie!');
            console.log(`  🐉 Bébé: ${offspring.name}`);
            console.log(`  🎯 Tier: T${offspring.tier}`);
            console.log(`  🧬 Pureté: ${offspring.purity.toFixed(2)}%`);
            console.log(`  📊 Stats:`, offspring.getTotalStats());
            console.log(`  👨‍👩‍👧 Généalogie:`, offspring.genealogy);
        } else {
            console.log('❌ Reproduction échouée:', result.message);
        }

        return result;
    },

    /**
     * Teste le système d'entraînement
     */
    testTraining() {
        if (!game || !game.dragonManager || game.dragonManager.dragons.length === 0) {
            console.error('❌ Aucun dragon disponible');
            return;
        }

        const dragon = game.dragonManager.dragons[0];
        const initialLevel = dragon.level;
        const initialStats = dragon.getTotalStats();

        console.log(`🏋️ Test d'entraînement avec ${dragon.name}...`);
        console.log(`  Niveau initial: ${initialLevel}`);
        console.log(`  Stats initiales:`, initialStats);

        // Donne de l'or si nécessaire
        if (game.player.resources.gold < 10000) {
            game.player.resources.gold = 10000;
        }

        // Entraîne plusieurs fois
        let trainings = 0;
        while (dragon.level < initialLevel + 2 && trainings < 50) {
            const result = game.dragonManager.trainDragon(dragon.id);
            if (result.success) {
                trainings++;
            } else {
                break;
            }
        }

        const finalLevel = dragon.level;
        const finalStats = dragon.getTotalStats();

        console.log(`✅ Entraînement terminé après ${trainings} sessions`);
        console.log(`  Niveau final: ${finalLevel} (+${finalLevel - initialLevel})`);
        console.log(`  Stats finales:`, finalStats);
        console.log(`  Progression:`, {
            force: finalStats.force - initialStats.force,
            agility: finalStats.agility - initialStats.agility,
            endurance: finalStats.endurance - initialStats.endurance,
            intelligence: finalStats.intelligence - initialStats.intelligence,
            wisdom: finalStats.wisdom - initialStats.wisdom
        });
    },

    /**
     * Affiche l'état complet du système dragons
     */
    showStatus() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        const dm = game.dragonManager;

        console.log('🐉 === STATUT DU SYSTÈME DRAGONS ===');
        console.log(`\n📊 Collection:`);
        console.log(`  Total dragons: ${dm.dragons.length}/${dm.getMaxCapacity()}`);
        console.log(`  Dragon équipé: ${dm.equippedDragonId || 'Aucun'}`);

        console.log(`\n🍖 Ressources:`);
        console.log(`  Nourriture: ${dm.dragonFood}`);
        console.log(`  Essences: ${dm.dragonEssences}`);

        console.log(`\n👥 Reproduction:`);
        const parent1 = dm.selectedDragonsForBreeding[0];
        const parent2 = dm.selectedDragonsForBreeding[1];
        console.log(`  Parent 1: ${parent1 ? parent1.name : 'Vide'}`);
        console.log(`  Parent 2: ${parent2 ? parent2.name : 'Vide'}`);

        if (dm.dragons.length > 0) {
            console.log(`\n🐉 Dragons de la collection:`);
            dm.dragons.forEach((dragon, index) => {
                console.log(`\n  ${index + 1}. ${dragon.name} (${dragon.id.substring(0, 8)})`);
                console.log(`     Types: ${dragon.types.join(', ')}`);
                console.log(`     Tier: T${dragon.tier}`);
                console.log(`     Niveau: ${dragon.level}`);
                console.log(`     Pureté: ${dragon.purity.toFixed(2)}%`);
                console.log(`     Vie restante: ${dragon.getRemainingLifeDays().toFixed(1)} jours`);
                console.log(`     Faim: ${dragon.hungerStacks}/10`);
                console.log(`     Stats:`, dragon.getTotalStats());
            });
        }
    },

    /**
     * Nettoie complètement le système de dragons
     */
    cleanStart() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        console.log('🧹 Nettoyage complet du système dragons...');

        // Supprime tous les dragons
        game.dragonManager.dragons = [];
        game.dragonManager.equippedDragonId = null;
        game.dragonManager.selectedDragonsForBreeding = [null, null];
        game.dragonManager.dragonFood = 0;
        game.dragonManager.dragonEssences = 0;

        console.log('✅ Système dragons nettoyé !');

        // Lance le test complet
        console.log('\n🚀 Lancement du test complet...\n');
        this.runFullTest();
    },

    /**
     * Ressuscite tous les dragons morts (pour debug)
     */
    reviveAllDragons() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        console.log('💊 Résurrection de tous les dragons...');

        game.dragonManager.dragons.forEach(dragon => {
            if (!dragon.isAlive) {
                dragon.isAlive = true;
                dragon.remainingLife = dragon.lifespan;
                dragon.hungerStacks = 0;
                dragon.isFed = true;
                dragon.lastFedAt = Date.now();
                console.log(`  ✅ ${dragon.name} ressuscité`);
            }
        });

        console.log('✅ Tous les dragons sont vivants !');
        game.ui.updateDragonsTab();
    },

    /**
     * Debug de l'affichage UI
     */
    debugUI() {
        console.log('🔍 === DEBUG UI DRAGONS ===');
        console.log('\n📊 Dragons dans le manager:');
        console.log('  Total:', game.dragonManager.dragons.length);
        console.log('  Vivants:', game.dragonManager.getAliveDragons().length);
        console.log('  Liste:', game.dragonManager.dragons);

        // Détails du premier dragon
        if (game.dragonManager.dragons.length > 0) {
            const d = game.dragonManager.dragons[0];
            console.log('\n🐉 Détails premier dragon:');
            console.log('  Nom:', d.name);
            console.log('  isAlive:', d.isAlive);
            console.log('  remainingLife:', d.remainingLife);
            console.log('  hungerStacks:', d.hungerStacks);
            console.log('  isFed:', d.isFed);
            console.log('  bornAt:', new Date(d.bornAt));
            console.log('  lastFedAt:', new Date(d.lastFedAt));
        }

        console.log('\n🎮 État de l\'interface:');
        const dragonsGrid = document.getElementById('dragonsGrid');
        const emptyCollection = document.getElementById('emptyCollection');
        const activeTab = document.querySelector('.tab.active');

        console.log('  Onglet actif:', activeTab?.dataset.tab);
        console.log('  dragonsGrid existe:', !!dragonsGrid);
        console.log('  dragonsGrid display:', dragonsGrid?.style.display);
        console.log('  emptyCollection display:', emptyCollection?.style.display);
        console.log('  dragonsGrid innerHTML length:', dragonsGrid?.innerHTML.length);

        console.log('\n🔄 Forçage mise à jour UI...');
        game.ui.updateDragonsTab();
        console.log('✅ Mise à jour forcée');
    },

    /**
     * Lance un scénario de test complet
     */
    runFullTest() {
        console.log('🧪 === TEST COMPLET DU SYSTÈME DRAGONS ===\n');

        // 1. Donne des ressources
        console.log('1️⃣ Préparation des ressources...');
        this.giveTestResources();

        // 2. Crée des dragons
        console.log('\n2️⃣ Création de dragons de test...');
        this.createTestCollection(5);

        // 2b. Ressuscite les dragons (ils meurent pendant la game loop)
        console.log('\n2️⃣b Résurrection des dragons...');
        this.reviveAllDragons();

        // 3. Équipe un dragon
        console.log('\n3️⃣ Équipement d\'un dragon...');
        if (game.dragonManager.dragons.length > 0) {
            const dragonId = game.dragonManager.dragons[0].id;
            game.dragonManager.equipDragon(dragonId);
            console.log(`✅ Dragon ${game.dragonManager.dragons[0].name} équipé`);
        }

        // 4. Teste l'entraînement
        console.log('\n4️⃣ Test du système d\'entraînement...');
        this.testTraining();

        // 5. Teste la reproduction
        console.log('\n5️⃣ Test du système de reproduction...');
        this.testBreeding();

        // 6. Affiche le statut final
        console.log('\n6️⃣ Statut final du système:');
        this.showStatus();

        console.log('\n✅ === TEST COMPLET TERMINÉ ===');
        console.log('🎮 Va voir l\'onglet Dragons dans le jeu !');
        console.log('⚠️ Si les dragons meurent, tape: DragonTestHelper.reviveAllDragons()');
    },

    /**
     * Crée un dragon hybride de test
     * @param {string} type1 - Premier type
     * @param {string} type2 - Deuxième type
     * @param {number} tier - Tier du dragon (0-5)
     * @returns {Dragon} Le dragon hybride créé
     */
    createHybridDragon(type1 = 'force', type2 = 'agility', tier = 1) {
        const dragon = new Dragon({
            types: [type1, type2],
            tier: tier,
            genealogy: null
        });

        const hybridName = DragonsConfig.getHybridName(type1, type2);

        console.log(`✅ Dragon hybride créé:`, {
            id: dragon.id,
            name: dragon.name,
            raceName: dragon.getRaceName(),
            hybridName: hybridName,
            types: dragon.types,
            tier: dragon.tier,
            stats: dragon.getTotalStats(),
            purity: dragon.purity
        });

        return dragon;
    },

    /**
     * Crée une collection de tous les hybrides possibles
     */
    createAllHybrids() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        console.log('🌟 Création de tous les dragons hybrides...');

        const hybrids = DragonsConfig.getAllHybrids();
        const createdDragons = [];

        for (const hybrid of hybrids) {
            const dragon = this.createHybridDragon(hybrid.type1, hybrid.type2, 1);
            const result = game.dragonManager.addDragon(dragon);

            if (result.success) {
                createdDragons.push(dragon);
                console.log(`  ✅ ${hybrid.name} créé (${hybrid.type1} × ${hybrid.type2})`);
            } else {
                console.log(`  ⚠️ ${hybrid.name} - ${result.message}`);
            }
        }

        console.log(`\n✅ ${createdDragons.length}/${hybrids.length} hybrides créés !`);
        console.log('🎮 Ouvre l\'onglet Dragons puis le Bestiaire pour les voir !');

        // Rafraîchir l'UI
        if (game.ui) {
            game.ui.updateDragonsTab();
        }

        return createdDragons;
    },

    /**
     * Test complet des hybrides
     */
    testHybrids() {
        console.log('🌟 === TEST DES DRAGONS HYBRIDES ===\n');

        // 1. Ressources
        console.log('1️⃣ Préparation des ressources...');
        this.giveTestResources();

        // 2. Création de tous les hybrides
        console.log('\n2️⃣ Création de tous les hybrides...');
        const hybrids = this.createAllHybrids();

        // 3. Affiche les détails
        console.log('\n3️⃣ Détails des hybrides:');
        console.table(hybrids.map(d => ({
            Nom: d.name,
            Race: d.getRaceName(),
            Types: d.types.join(' × '),
            Tier: DragonsConfig.TIERS[d.tier].name,
            Pureté: Math.round(d.purity * 100) + '%',
            Stats: Object.entries(d.getTotalStats())
                .filter(([_, v]) => v > 0)
                .map(([k, v]) => `${k}:${v}`)
                .join(', ')
        })));

        console.log('\n✅ Test des hybrides terminé !');
        console.log('📖 Ouvre le Bestiaire pour voir tous les hybrides');
    },

    /**
     * Crée un exemple de CHAQUE type d'hybride (2, 3, 4, 5 types) - 1 par race
     */
    createBestiaryShowcase() {
        if (!game || !game.dragonManager) {
            console.error('❌ DragonManager non initialisé');
            return;
        }

        console.log('📖 === CRÉATION VITRINE DU BESTIAIRE ===\n');

        const allHybrids = DragonsConfig.getAllHybrids();
        const created = [];

        // Créer 1 exemplaire de chaque race (tier 1-3 aléatoire)
        Object.values(allHybrids).flat().forEach(hybridData => {
            const randomTier = Math.floor(Math.random() * 3) + 1; // T1-T3
            const dragon = new Dragon({
                types: hybridData.types,
                tier: randomTier,
                genealogy: null
            });

            const result = game.dragonManager.addDragon(dragon);
            if (result.success) {
                created.push({ name: hybridData.name, tier: randomTier, types: hybridData.types.length });
                console.log(`✅ ${hybridData.name} T${randomTier} créé (${hybridData.types.length} types)`);
            }
        });

        console.log(`\n✅ ${created.length} dragons créés pour le bestiaire !`);
        console.log('📊 Résumé par nombre de types:');
        console.table(created.reduce((acc, d) => {
            const key = `${d.types} types`;
            if (!acc[key]) acc[key] = 0;
            acc[key]++;
            return acc;
        }, {}));

        // Rafraîchir l'UI
        if (game.ui) {
            game.ui.updateDragonsTab();
        }

        console.log('\n📖 Ouvre le Bestiaire pour voir TOUTES les races !');
    }
};

// Rend accessible globalement pour la console
window.DragonTestHelper = DragonTestHelper;

console.log('🐉 DragonTestHelper chargé!');
console.log('📖 Commandes disponibles:');
console.log('  - DragonTestHelper.cleanStart() : ✨ RECOMMENCER à zéro + tests');
console.log('  - DragonTestHelper.runFullTest() : Lance tous les tests');
console.log('  - DragonTestHelper.testHybrids() : 🌟 Teste les dragons hybrides');
console.log('  - DragonTestHelper.createBestiaryShowcase() : 📖 Crée 1 de chaque race pour le bestiaire');
console.log('  - DragonTestHelper.createAllHybrids() : Crée tous les hybrides 2 types');
console.log('  - DragonTestHelper.createHybridDragon(type1, type2, tier) : Crée un hybride');
console.log('  - DragonTestHelper.reviveAllDragons() : Ressuscite tous les dragons');
console.log('  - DragonTestHelper.debugUI() : Debug l\'affichage UI');
console.log('  - DragonTestHelper.createTestCollection(5) : Crée 5 dragons');
console.log('  - DragonTestHelper.giveTestResources() : Donne ressources');
console.log('  - DragonTestHelper.testBreeding() : Teste reproduction');
console.log('  - DragonTestHelper.testTraining() : Teste entraînement');
console.log('  - DragonTestHelper.showStatus() : Affiche le statut');
