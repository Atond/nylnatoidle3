/**
 * Définitions TypeScript globales
 * Élimine les erreurs "Property does not exist on type 'Window'"
 */

// Imports des types (si nécessaires dans le futur)
// import { Game } from '../js/game';

/**
 * Extension de l'interface Window pour inclure les objets globaux du jeu
 */
interface Window {
    // Classes principales
    game: any; // Instance de Game
    Game: any; // Classe Game
    Combat: any; // Classe Combat
    Player: any; // Classe Player
    Monster: any; // Classe Monster
    UI: any; // Classe UI
    
    // Managers
    QuestManager: any;
    ProfessionManager: any;
    EquipmentManager: any;
    CraftingManager: any;
    BuildingManager: any;
    CityManager: any;
    DragonManager: any;
    AlchemyManager: any;
    StorageManager: any;
    CharacterCreationManager: any;
    
    // Données de configuration
    MonstersData: {
        common: Record<string, any>;
        rare: Record<string, any>;
        elite: Record<string, any>;
        boss: Record<string, any>;
        getMonster(id: string): any;
        getRandomMonster(monsterIds: string[]): any;
        calculateStats(monsterData: any, level: number): any;
    };
    
    RegionsData: {
        regions: any[];
        getRegion(regionId: number): any;
        getZone(regionId: number, zoneId: number): any;
    };
    
    DropsData: {
        calculateDrops(monsterData: any): any[];
        applyDrops(game: any, drops: any[]): any;
    };
    
    GameConfig: any;
    DragonsConfig: any;
    
    // Utilitaires
    RarityColors: Record<string, string>;
    NumberFormatter: {
        format(num: number): string;
    };
    Utils: any;
    
    // Autres classes du jeu
    Building: any;
    Dragon: any;
    DragonTestHelper: any;
    Equipment: any;
    Profession: any;
    Quest: any;
}

/**
 * Extension de HTMLElement pour les propriétés data-*
 */
interface HTMLElement {
    dataset: DOMStringMap;
}

/**
 * Extension de Element pour dataset
 */
interface Element {
    dataset: DOMStringMap;
}

/**
 * Types personnalisés pour le jeu
 */

type RarityType = 'common' | 'rare' | 'elite' | 'legendary' | 'boss';

type MonsterType = 'beast' | 'humanoid' | 'undead' | 'construct' | 'dragon' | 'monstrous' | 'giant';

type EquipmentSlot = 'weapon' | 'armor' | 'accessory';

type ProfessionType = 'woodcutter' | 'miner' | 'hunter' | 'fisher';

type CharacterClass = 'warrior' | 'archer' | 'mage' | 'priest';

type CharacterGender = 'male' | 'female' | 'neutral';

/**
 * Export pour utilisation dans d'autres fichiers
 */
export {};
