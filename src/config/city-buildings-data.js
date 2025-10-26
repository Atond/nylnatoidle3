/**
 * Configuration des Bâtiments de Ville
 * 
 * Système de population inspiré d'Evolve Idle
 * - Logements : Augmentent la capacité de population
 * - Production nourriture : Nourrir les habitants
 * - Revenus : Collecter des impôts
 * - Services : Bonus divers
 */

const CityBuildingsData = {
    
    // ========================================
    // LOGEMENTS (HOUSING)
    // ========================================
    
    hut: {
        id: 'hut',
        name: 'Cabane',
        icon: '🛖',
        category: 'housing',
        description: 'Abri simple en bois pouvant loger 2 habitants',
        
        housingCapacity: 2,  // +2 habitants par cabane
        
        baseCost: {
            gold: 50,
            wood_oak: 50,      // Seulement du bois au début
            ore_iron: 15       // Un peu de fer pour les clous
        },
        costMultiplier: 1.15,  // Coût augmente de 15% par cabane
        
        // Pas de condition - disponible immédiatement
    },
    
    house: {
        id: 'house',
        name: 'Maison',
        icon: '�',
        category: 'housing',
        description: 'Habitation solide avec fondations en pierre (5 habitants)',
        
        housingCapacity: 5,  // +5 habitants par maison
        
        baseCost: {
            gold: 200,
            wood_oak: 100,     // Charpente en bois
            ore_iron: 80       // Ferrures et outils
        },
        costMultiplier: 1.2,
        
        unlockConditions: {
            playerLevel: 5,
            buildings: {
                hut: 3  // Requis 3 cabanes construites
            }
        }
    },
    
    manor: {
        id: 'manor',
        name: 'Manoir',
        icon: '🏛️',
        category: 'housing',
        description: 'Demeure spacieuse de noble (10 habitants)',
        
        housingCapacity: 10,  // +10 habitants par manoir
        
        baseCost: {
            gold: 1000,
            wood_maple: 150,   // Bois noble pour finitions
            ore_iron: 200,     // Renforts métalliques
            ore_silver: 50,    // Décorations
            gem_ruby: 5        // Ornements précieux
        },
        costMultiplier: 1.25,
        
        unlockConditions: {
            playerLevel: 10,
            buildings: {
                house: 2  // Requis 2 maisons construites
            }
        }
    },
    
    castle: {
        id: 'castle',
        name: 'Château',
        icon: '🏰',
        category: 'housing',
        description: 'Forteresse majestueuse abritant 25 âmes',
        
        housingCapacity: 25,  // +25 habitants par château
        
        baseCost: {
            gold: 5000,
            wood_ebony: 300,   // Bois rare
            ore_iron: 500,     // Structure
            ore_mithril: 100,  // Renforts magiques
            gem_diamond: 10    // Gemmes de pouvoir
        },
        costMultiplier: 1.5,
        
        unlockConditions: {
            playerLevel: 20,
            buildings: {
                manor: 2  // Requis 2 manoirs construits
            }
        }
    },
    
    // ========================================
    // PRODUCTION DE NOURRITURE
    // ========================================
    
    hunting_lodge: {
        id: 'hunting_lodge',
        name: 'Cabane de Chasse',
        icon: '🏹',
        category: 'food',
        description: 'Produit 10 nourriture/min grâce à la chasse',
        
        baseProduction: {
            food: 10  // 10 nourriture/min niveau 1
        },
        productionMultiplier: 2.0,  // Production double à chaque niveau
        canUpgrade: true,  // Peut être amélioré
        
        baseCost: {
            gold: 100,
            wood_oak: 80,
            ore_iron: 25      // Pointes de flèches
        },
        costMultiplier: 1.5,
        
        // Pas de condition - disponible immédiatement
    },
    
    farm: {
        id: 'farm',
        name: 'Ferme',
        icon: '🌾',
        category: 'food',
        description: 'Production 25/min (+10% si 10+ habitants)',
        
        baseProduction: {
            food: 25  // 25 nourriture/min niveau 1
        },
        productionMultiplier: 2.0,
        
        // Bonus si population >= 10
        populationBonus: {
            threshold: 10,
            multiplier: 1.1  // +10% production
        },
        
        baseCost: {
            gold: 300,
            wood_oak: 120,
            wood_maple: 50,   // Outils en bois de qualité
            ore_iron: 80      // Charrues et outils
        },
        costMultiplier: 1.6,
        
        unlockConditions: {
            playerLevel: 8,
            buildings: {
                hunting_lodge: 2
            }
        }
    },
    
    fishing_dock: {
        id: 'fishing_dock',
        name: 'Quai de Pêche',
        icon: '🎣',
        category: 'food',
        description: 'Pêche productive: 50 nourriture/min',
        
        baseProduction: {
            food: 50  // 50 nourriture/min niveau 1
        },
        productionMultiplier: 2.0,
        
        baseCost: {
            gold: 800,
            wood_oak: 250,
            ore_iron: 150,
            ore_silver: 30    // Hameçons et filets renforcés
        },
        costMultiplier: 1.7,
        
        unlockConditions: {
            playerLevel: 15,
            buildings: {
                farm: 1
            }
        }
    },
    
    // ========================================
    // REVENUS (IMPÔTS)
    // ========================================
    
    tax_office: {
        id: 'tax_office',
        name: 'Bureau des Impôts',
        icon: '💰',
        category: 'income',
        description: 'Collecte 5 or/min par habitant (+2 par niveau)',
        
        baseTaxRate: 5,  // 5 or/min par habitant (niveau 1)
        taxRatePerLevel: 2,  // +2 or/min par niveau
        canUpgrade: true,  // Peut être amélioré
        
        baseCost: {
            gold: 500,
            wood_maple: 150,
            ore_iron: 180
        },
        costMultiplier: 1.8,
        
        unlockConditions: {
            population: 2  // Requis 2 habitants minimum
        },
        
        notes: 'Les habitants doivent être logés ET nourris pour payer des impôts'
    },
    
    finance_hall: {
        id: 'finance_hall',
        name: 'Hôtel des Finances',
        icon: '🏦',
        category: 'income',
        description: 'Augmente les revenus d\'impôts de 50%',
        
        taxMultiplier: 1.5,  // +50% revenus impôts
        maxCount: 1,  // Bâtiment unique
        
        baseCost: {
            gold: 5000,
            wood_ebony: 400,
            ore_iron: 500,
            ore_gold: 200,
            gem_emerald: 20
        },
        
        unlockConditions: {
            playerLevel: 25,
            buildings: {
                tax_office: 1
            },
            population: 30
        }
    },
    
    // ========================================
    // SERVICES & BONUS
    // ========================================
    
    school: {
        id: 'school',
        name: 'École',
        icon: '🎓',
        category: 'service',
        description: 'Augmente l\'XP de tous les métiers de 10%',
        
        bonus: {
            type: 'profession_xp',
            value: 0.10  // +10% XP
        },
        maxCount: 1,
        
        baseCost: {
            gold: 2000,
            wood_maple: 300,
            ore_iron: 350
        },
        
        unlockConditions: {
            playerLevel: 15,
            population: 20
        }
    },
    
    temple: {
        id: 'temple',
        name: 'Temple',
        icon: '⛪',
        category: 'service',
        description: 'Augmente la chance de drop légendaire de 15%',
        
        bonus: {
            type: 'legendary_drop_chance',
            value: 0.15  // +15% chance
        },
        maxCount: 1,
        
        baseCost: {
            gold: 3000,
            wood_ebony: 400,
            ore_gold: 200,
            gem_sapphire: 30,
            gem_emerald: 30
        },
        
        unlockConditions: {
            playerLevel: 20,
            population: 30
        }
    },
    
    barracks: {
        id: 'barracks',
        name: 'Caserne',
        icon: '🛡️',
        category: 'service',
        description: 'Augmente les dégâts en combat de 20%',
        
        bonus: {
            type: 'combat_damage',
            value: 0.20  // +20% dégâts
        },
        maxCount: 1,
        
        baseCost: {
            gold: 2500,
            wood_maple: 400,
            ore_iron: 500,
            ore_steel: 150
        },
        
        unlockConditions: {
            playerLevel: 18,
            population: 25
        }
    },
    
    hospital: {
        id: 'hospital',
        name: 'Hôpital',
        icon: '🏥',
        category: 'service',
        description: 'Réduit la consommation de nourriture de 25%',
        
        bonus: {
            type: 'food_consumption',
            value: -0.25  // -25% consommation
        },
        maxCount: 1,
        
        baseCost: {
            gold: 4000,
            wood_ebony: 500,
            ore_silver: 300,
            gem_emerald: 15
        },
        
        unlockConditions: {
            playerLevel: 30,
            population: 40
        }
    },
    
    marketplace: {
        id: 'marketplace',
        name: 'Marché',
        icon: '🏪',
        category: 'service',
        description: 'Augmente les prix de vente de 20%',
        
        bonus: {
            type: 'sell_price',
            value: 0.20  // +20% prix vente
        },
        maxCount: 1,
        
        baseCost: {
            gold: 3500,
            wood_maple: 500,
            ore_iron: 500
        },
        
        unlockConditions: {
            playerLevel: 22,
            population: 35
        }
    },
    
    library: {
        id: 'library',
        name: 'Bibliothèque',
        icon: '📚',
        category: 'service',
        description: 'Augmente la vitesse de craft de 15%',
        
        bonus: {
            type: 'craft_speed',
            value: 0.15  // +15% vitesse
        },
        maxCount: 1,
        
        baseCost: {
            gold: 2800,
            wood_ebony: 400,
            ore_iron: 200,
            gem_sapphire: 10
        },
        
        unlockConditions: {
            playerLevel: 16,
            population: 22
        }
    }
};

// ========================================
// CONFIGURATION SYSTÈME VILLE
// ========================================

const CityConfig = {
    // Croissance de population
    populationGrowthInterval: 30000,  // +1 habitant toutes les 30 secondes
    
    // Consommation de nourriture
    foodConsumptionPerCitizen: 2,  // 2 nourriture/min par habitant
    foodConsumptionInterval: 1000,  // Vérifié toutes les secondes
    
    // Stockage
    baseFoodStorage: 1000,  // Stockage de base
    foodStoragePerWarehouse: 500,  // Bonus si entrepôt construit
    
    // Impôts
    taxCollectionInterval: 1000,  // Or collecté toutes les secondes
    
    // Pénalités
    starvationPenalty: {
        enabled: true,
        populationLossInterval: 60000,  // -1 habitant/minute sans nourriture
        taxPenalty: 0.5  // -50% impôts si nourriture < 0
    }
};

// ========================================
// HELPERS
// ========================================

/**
 * Calculer le coût d'un bâtiment de ville
 */
function calculateCityBuildingCost(buildingId, currentCount = 0) {
    const building = CityBuildingsData[buildingId];
    if (!building) return null;
    
    const cost = {};
    const multiplier = Math.pow(building.costMultiplier, currentCount);
    
    for (const [resource, baseAmount] of Object.entries(building.baseCost)) {
        cost[resource] = Math.floor(baseAmount * multiplier);
    }
    
    return cost;
}

/**
 * Calculer la production de nourriture d'un bâtiment
 */
function calculateFoodProduction(buildingId, level, population = 0) {
    const building = CityBuildingsData[buildingId];
    if (!building || !building.baseProduction) return 0;
    
    let production = building.baseProduction.food || 0;
    
    // Appliquer le multiplicateur de niveau
    if (building.productionMultiplier && level > 1) {
        production *= Math.pow(building.productionMultiplier, level - 1);
    }
    
    // Appliquer le bonus de population si applicable
    if (building.populationBonus && population >= building.populationBonus.threshold) {
        production *= building.populationBonus.multiplier;
    }
    
    return Math.floor(production);
}

/**
 * Calculer le taux d'impôt
 */
function calculateTaxRate(taxOfficeLevel, hasFinanceHall = false) {
    const taxOffice = CityBuildingsData.tax_office;
    let rate = taxOffice.baseTaxRate + (taxOffice.taxRatePerLevel * (taxOfficeLevel - 1));
    
    // Appliquer le bonus de l'Hôtel des Finances
    if (hasFinanceHall) {
        rate *= CityBuildingsData.finance_hall.taxMultiplier;
    }
    
    return rate;
}

/**
 * Calculer la consommation de nourriture totale
 */
function calculateFoodConsumption(population, hasHospital = false) {
    let consumption = population * CityConfig.foodConsumptionPerCitizen;
    
    // Appliquer la réduction de l'Hôpital
    if (hasHospital) {
        consumption *= (1 + CityBuildingsData.hospital.bonus.value);  // -25%
    }
    
    return consumption;
}

// Export
if (typeof window !== 'undefined') {
    window.CityBuildingsData = CityBuildingsData;
    window.CityConfig = CityConfig;
    window.calculateCityBuildingCost = calculateCityBuildingCost;
    window.calculateFoodProduction = calculateFoodProduction;
    window.calculateTaxRate = calculateTaxRate;
    window.calculateFoodConsumption = calculateFoodConsumption;
    console.log('✅ CityBuildingsData chargé:', Object.keys(CityBuildingsData).length, 'bâtiments de ville');
}
