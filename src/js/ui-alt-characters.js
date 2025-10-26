/**
 * 🎭 UI Alt Characters - Interface pour la gestion des personnages alternatifs
 * 
 * Fonctionnalités :
 * - Création et gestion d'alts
 * - Switch entre personnages
 * - Carry Mode & AFK Farm
 * - Coffre Partagé
 * - Système d'aide complet (❓ Guide)
 */

class AltCharactersUI {
    constructor(game) {
        this.game = game;
        this.selectedAltId = null;
        
        // Référence aux éléments DOM
        this.container = null;
        this.charactersList = null;
        this.sharedStorageSection = null;
    }

    /**
     * Initialise l'UI Alt Characters
     */
    initialize() {
        this.container = document.getElementById('characters_content');
        if (!this.container) {
            console.error('❌ Container #characters_content introuvable');
            return;
        }
        
        this.render();
    }

    /**
     * Render complet de l'UI
     */
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="alt-characters-ui">
                <!-- Header avec aide -->
                <div class="alt-header">
                    <h2>🎭 Personnages Alternatifs</h2>
                    <button class="btn-help" onclick="window.game.ui.altCharactersUI.showHelpModal()">
                        ❓ Guide Alt Characters
                    </button>
                </div>
                
                <!-- Main Character (toujours affiché) -->
                <div class="main-character-section">
                    <h3>⭐ Personnage Principal</h3>
                    <div id="main_character_card"></div>
                </div>
                
                <!-- Alt Characters List -->
                <div class="alt-characters-section">
                    <div class="section-header">
                        <h3>👥 Personnages Alternatifs (${this.game.altCharacterManager.characters.size - 1}/40)</h3>
                        <button class="btn-primary" onclick="window.game.ui.altCharactersUI.showCreateAltModal()">
                            ➕ Créer Alt
                        </button>
                    </div>
                    <div id="alt_characters_list" class="characters-grid"></div>
                </div>
                
                <!-- Shared Storage -->
                <div class="shared-storage-section">
                    <h3>📦 Coffre Partagé</h3>
                    <div id="shared_storage_content"></div>
                </div>
                
                <!-- Carry Mode / AFK Farm Actions -->
                <div class="power-leveling-section">
                    <h3>💪 Power Leveling</h3>
                    <div id="power_leveling_actions"></div>
                </div>
            </div>
        `;
        
        // Render chaque section
        this.renderMainCharacter();
        this.renderAltCharacters();
        this.renderSharedStorage();
        this.renderPowerLevelingActions();
    }

    /**
     * Render Main Character Card
     */
    renderMainCharacter() {
        const mainCard = document.getElementById('main_character_card');
        if (!mainCard) return;
        
        const main = this.game.altCharacterManager.getMainCharacter();
        if (!main) return;
        
        const isActive = this.game.altCharacterManager.activeCharacterId === main.id;
        
        mainCard.innerHTML = `
            <div class="character-card ${isActive ? 'active' : ''}" data-character-id="${main.id}">
                <div class="char-header">
                    <span class="char-icon">${main.gender === 'male' ? '👨' : '👩'}</span>
                    <div class="char-info">
                        <h4>${main.name}</h4>
                        <span class="char-class">${main.className}</span>
                    </div>
                    ${isActive ? '<span class="active-badge">✓ Actif</span>' : ''}
                </div>
                <div class="char-stats">
                    <div class="stat-row">
                        <span>Niveau :</span>
                        <span>${main.level}</span>
                    </div>
                    <div class="stat-row">
                        <span>Rôle :</span>
                        <span>${this.getRoleIcon(main.role)} ${this.getRoleName(main.role)}</span>
                    </div>
                    <div class="stat-row">
                        <span>Stats :</span>
                        <span>❤️ ${main.maxHp} | ⚔️ ${main.attack} | 🛡️ ${main.defense}</span>
                    </div>
                </div>
                ${!isActive ? `
                    <button class="btn-switch" onclick="window.game.ui.altCharactersUI.switchCharacter('${main.id}')">
                        🔄 Passer à ce personnage
                    </button>
                ` : ''}
            </div>
        `;
    }

    /**
     * Render Alt Characters List
     */
    renderAltCharacters() {
        const altList = document.getElementById('alt_characters_list');
        if (!altList) return;
        
        const alts = Array.from(this.game.altCharacterManager.characters.values())
            .filter(char => char.id !== 'main')
            .sort((a, b) => b.level - a.level);
        
        if (alts.length === 0) {
            altList.innerHTML = `
                <div class="empty-state">
                    <p>🎭 Aucun personnage alternatif</p>
                    <p class="hint">Créez votre premier alt pour débloquer le Power Leveling !</p>
                </div>
            `;
            return;
        }
        
        altList.innerHTML = alts.map(alt => {
            const isActive = this.game.altCharacterManager.activeCharacterId === alt.id;
            const mentorBonus = this.game.altCharacterManager.getMentorBonus(alt.id);
            
            return `
                <div class="character-card ${isActive ? 'active' : ''}" data-character-id="${alt.id}">
                    <div class="char-header">
                        <span class="char-icon">${alt.gender === 'male' ? '👨' : '👩'}</span>
                        <div class="char-info">
                            <h4>${alt.name}</h4>
                            <span class="char-class">${alt.className}</span>
                        </div>
                        ${isActive ? '<span class="active-badge">✓ Actif</span>' : ''}
                    </div>
                    <div class="char-stats">
                        <div class="stat-row">
                            <span>Niveau :</span>
                            <span>${alt.level}</span>
                        </div>
                        <div class="stat-row">
                            <span>Rôle :</span>
                            <span>${this.getRoleIcon(alt.role)} ${this.getRoleName(alt.role)}</span>
                        </div>
                        ${mentorBonus > 1 ? `
                            <div class="stat-row mentor-bonus">
                                <span>Bonus Mentor :</span>
                                <span>+${Math.round((mentorBonus - 1) * 100)}% XP 🎓</span>
                            </div>
                        ` : ''}
                        <div class="stat-row">
                            <span>Stats :</span>
                            <span>❤️ ${alt.maxHp} | ⚔️ ${alt.attack} | 🛡️ ${alt.defense}</span>
                        </div>
                    </div>
                    ${!isActive ? `
                        <button class="btn-switch" onclick="window.game.ui.altCharactersUI.switchCharacter('${alt.id}')">
                            🔄 Passer à ce personnage
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    /**
     * Render Shared Storage
     */
    renderSharedStorage() {
        const storageContent = document.getElementById('shared_storage_content');
        if (!storageContent) return;
        
        const storage = this.game.altCharacterManager.sharedStorage;
        const usedSlots = storage.getCurrentUsedSlots();
        const totalSlots = storage.maxCapacity;
        
        storageContent.innerHTML = `
            <div class="storage-header">
                <span>Slots utilisés : ${usedSlots} / ${totalSlots}</span>
                <div class="storage-progress">
                    <div class="storage-progress-bar" style="width: ${(usedSlots / totalSlots) * 100}%"></div>
                </div>
            </div>
            
            <!-- Ressources -->
            <div class="storage-category">
                <h4>📦 Ressources</h4>
                <div class="storage-items" id="shared_resources"></div>
            </div>
            
            <!-- Or -->
            <div class="storage-category">
                <h4>💰 Or Partagé</h4>
                <div class="storage-gold">
                    <span class="gold-amount">${storage.gold}</span>
                    <div class="gold-actions">
                        <button class="btn-small" onclick="window.game.ui.altCharactersUI.depositGold()">⬇️ Déposer</button>
                        <button class="btn-small" onclick="window.game.ui.altCharactersUI.withdrawGold()">⬆️ Retirer</button>
                    </div>
                </div>
            </div>
            
            <!-- Équipement -->
            <div class="storage-category">
                <h4>⚔️ Équipement Partagé</h4>
                <div class="storage-items" id="shared_equipment"></div>
            </div>
        `;
        
        this.renderSharedResources();
        this.renderSharedEquipment();
    }

    /**
     * Render Shared Resources
     */
    renderSharedResources() {
        const resourcesDiv = document.getElementById('shared_resources');
        if (!resourcesDiv) return;
        
        const storage = this.game.altCharacterManager.sharedStorage;
        const resources = Array.from(storage.resources.entries())
            .filter(([id, amount]) => amount > 0);
        
        if (resources.length === 0) {
            resourcesDiv.innerHTML = '<p class="empty">Aucune ressource partagée</p>';
            return;
        }
        
        resourcesDiv.innerHTML = resources.map(([id, amount]) => {
            const resourceData = window.ResourcesData.resources.find(r => r.id === id);
            if (!resourceData) return '';
            
            return `
                <div class="storage-item">
                    <span class="item-icon">${resourceData.icon}</span>
                    <span class="item-name">${resourceData.name}</span>
                    <span class="item-amount">${amount}</span>
                    <button class="btn-withdraw" onclick="window.game.ui.altCharactersUI.withdrawResource('${id}')">⬆️</button>
                </div>
            `;
        }).join('');
    }

    /**
     * Render Shared Equipment
     */
    renderSharedEquipment() {
        const equipmentDiv = document.getElementById('shared_equipment');
        if (!equipmentDiv) return;
        
        const storage = this.game.altCharacterManager.sharedStorage;
        
        if (storage.equipment.length === 0) {
            equipmentDiv.innerHTML = '<p class="empty">Aucun équipement partagé</p>';
            return;
        }
        
        equipmentDiv.innerHTML = storage.equipment.map(eq => {
            const rarityColor = window.RarityColors?.[eq.rarity] || '#fff';
            
            return `
                <div class="storage-equipment-item" style="border-color: ${rarityColor};">
                    <span class="eq-name" style="color: ${rarityColor};">${eq.name}</span>
                    <span class="eq-slot">${eq.slot}</span>
                    <button class="btn-withdraw" onclick="window.game.ui.altCharactersUI.withdrawEquipment('${eq.id}')">⬆️</button>
                </div>
            `;
        }).join('');
    }

    /**
     * Render Power Leveling Actions
     */
    renderPowerLevelingActions() {
        const actionsDiv = document.getElementById('power_leveling_actions');
        if (!actionsDiv) return;
        
        const carryState = this.game.altCharacterManager.getCarryState();
        const afkFarmState = this.game.altCharacterManager.getAFKFarmState();
        
        actionsDiv.innerHTML = `
            <!-- Carry Mode -->
            <div class="power-leveling-action">
                <div class="action-header">
                    <h4>💪 Carry Mode</h4>
                    <span class="action-hint" title="Le Main + Alt combattent ensemble. Alt gagne +75% XP. Cooldown 24h.">ℹ️</span>
                </div>
                ${carryState.isActive ? `
                    <div class="active-carry">
                        <p>✅ Carry actif sur <strong>${this.game.altCharacterManager.getCharacter(carryState.altId)?.name}</strong></p>
                        <p>⏱️ Temps restant : ${this.formatTimeRemaining(carryState.endTime)}</p>
                        <button class="btn-danger" onclick="window.game.ui.altCharactersUI.stopCarryMode()">❌ Arrêter Carry</button>
                    </div>
                ` : `
                    <button class="btn-primary" onclick="window.game.ui.altCharactersUI.showStartCarryModal()">
                        ▶️ Démarrer Carry Mode
                    </button>
                `}
            </div>
            
            <!-- AFK Farm -->
            <div class="power-leveling-action">
                <div class="action-header">
                    <h4>🏭 AFK Farm</h4>
                    <span class="action-hint" title="Alt farm passivement. Gagne 1% XP Main/h + Ressources T1.">ℹ️</span>
                </div>
                ${afkFarmState.activeAlts.length > 0 ? `
                    <div class="active-afk">
                        <p>✅ ${afkFarmState.activeAlts.length} alt(s) en AFK Farm</p>
                        <ul>
                            ${afkFarmState.activeAlts.map(altId => {
                                const alt = this.game.altCharacterManager.getCharacter(altId);
                                return `<li>${alt?.name} (Lvl ${alt?.level})</li>`;
                            }).join('')}
                        </ul>
                        <button class="btn-primary" onclick="window.game.ui.altCharactersUI.showManageAFKModal()">
                            ⚙️ Gérer AFK Farm
                        </button>
                    </div>
                ` : `
                    <button class="btn-primary" onclick="window.game.ui.altCharactersUI.showStartAFKModal()">
                        ▶️ Démarrer AFK Farm
                    </button>
                `}
            </div>
        `;
    }

    // ==================== MODALS ====================

    /**
     * Affiche le modal d'aide complet
     */
    showHelpModal() {
        const modal = this.game.ui.showModal('Guide Alt Characters', `
            <div class="help-modal">
                <section class="help-section">
                    <h3>❓ Qu'est-ce qu'un Alt ?</h3>
                    <p>Un <strong>Alt (Alternate Character)</strong> est un personnage secondaire que vous pouvez créer en plus de votre personnage principal.</p>
                    <ul>
                        <li>🎭 Créez jusqu'à <strong>40 alts</strong></li>
                        <li>💪 <strong>Mentor Bonus</strong> : +50% XP si alt < main -10 niveaux</li>
                        <li>⚔️ Rôles <strong>Trinity</strong> : Tank, Heal, DPS</li>
                        <li>📦 Partagez ressources, or et équipement via le <strong>Coffre Partagé</strong></li>
                    </ul>
                </section>
                
                <section class="help-section">
                    <h3>💪 Power Leveling</h3>
                    <h4>Carry Mode</h4>
                    <p>Le personnage principal et l'alt combattent ensemble. L'alt gagne <strong>+75% XP</strong>.</p>
                    <ul>
                        <li>⚠️ <strong>Restrictions</strong> : Zone Level ≤ Alt Level + 10</li>
                        <li>⏰ <strong>Cooldown</strong> : 1/jour, 3h maximum</li>
                    </ul>
                    
                    <h4>AFK Farm</h4>
                    <p>L'alt farm passivement pendant que vous jouez votre personnage principal.</p>
                    <ul>
                        <li>📊 <strong>Gains</strong> : 1% XP Main/heure + Ressources Tier 1</li>
                        <li>🔁 Pas de cooldown, peut tourner en continu</li>
                    </ul>
                </section>
                
                <section class="help-section">
                    <h3>🛡️ Système Trinity</h3>
                    <p>Chaque classe a un <strong>rôle principal</strong> pour les donjons :</p>
                    <ul>
                        <li><strong>🛡️ Tank</strong> : Encaisse les dégâts (Guerrier)</li>
                        <li><strong>💚 Heal</strong> : Soigne l'équipe (Mage)</li>
                        <li><strong>⚔️ DPS</strong> : Inflige des dégâts (Archer, Tank secondaire)</li>
                    </ul>
                    <p>Les donjons nécessitent <strong>exactement 1 Tank + 1 Heal + 1 DPS</strong>.</p>
                </section>
                
                <section class="help-section">
                    <h3>📦 Coffre Partagé</h3>
                    <p>Transférez ressources, or et équipement entre tous vos personnages.</p>
                    <ul>
                        <li><strong>Capacité</strong> : 5000 slots</li>
                        <li><strong>Utilisation</strong> : Déposez depuis personnage actif, retirez vers personnage actif</li>
                    </ul>
                </section>
            </div>
        `, [
            { text: 'Fermer', action: () => this.game.ui.hideModal() }
        ]);
    }

    /**
     * Affiche le modal de création d'alt
     */
    showCreateAltModal() {
        const maxAlts = 40;
        const currentAlts = this.game.altCharacterManager.characters.size - 1;
        
        if (currentAlts >= maxAlts) {
            this.game.ui.showNotification('❌ Limite atteinte : 40 alts maximum', 'error');
            return;
        }
        
        const modal = this.game.ui.showModal('Créer un Alt', `
            <div class="create-alt-form">
                <div class="form-group">
                    <label for="alt_name">Nom :</label>
                    <input type="text" id="alt_name" placeholder="Nom du personnage" maxlength="20">
                </div>
                
                <div class="form-group">
                    <label>Genre :</label>
                    <div class="radio-group">
                        <label><input type="radio" name="alt_gender" value="male" checked> 👨 Masculin</label>
                        <label><input type="radio" name="alt_gender" value="female"> 👩 Féminin</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Classe :</label>
                    <select id="alt_class">
                        <option value="warrior">⚔️ Guerrier (Tank)</option>
                        <option value="tank">🛡️ Tank (Tank/DPS)</option>
                        <option value="healer">💚 Soigneur (Heal)</option>
                        <option value="mage">🔮 Mage (Heal/DPS)</option>
                        <option value="archer">🏹 Archer (DPS)</option>
                    </select>
                </div>
                
                <div class="class-preview" id="class_preview">
                    <p>Rôle : <strong>🛡️ Tank</strong></p>
                    <p>Stats de base : HP +20%, DEF +15%</p>
                </div>
            </div>
        `, [
            { text: 'Annuler', action: () => this.game.ui.hideModal() },
            { text: 'Créer', action: () => this.createAlt(), primary: true }
        ]);
        
        // Update preview when class changes
        document.getElementById('alt_class').addEventListener('change', (e) => {
            const preview = document.getElementById('class_preview');
            const classData = {
                warrior: { role: '🛡️ Tank', stats: 'HP +20%, DEF +15%' },
                tank: { role: '🛡️ Tank / ⚔️ DPS', stats: 'HP +25%, DEF +20%' },
                healer: { role: '💚 Heal', stats: 'INT +20%, WIS +15%' },
                mage: { role: '💚 Heal / ⚔️ DPS', stats: 'INT +25%, WIS +10%' },
                archer: { role: '⚔️ DPS', stats: 'ATK +20%, STR +15%' }
            };
            
            const data = classData[e.target.value];
            preview.innerHTML = `
                <p>Rôle : <strong>${data.role}</strong></p>
                <p>Stats de base : ${data.stats}</p>
            `;
        });
    }

    /**
     * Crée un alt
     */
    createAlt() {
        const name = document.getElementById('alt_name').value.trim();
        const gender = document.querySelector('input[name="alt_gender"]:checked').value;
        const className = document.getElementById('alt_class').value;
        
        if (!name) {
            this.game.ui.showNotification('❌ Veuillez entrer un nom', 'error');
            return;
        }
        
        const result = this.game.altCharacterManager.createAlt(name, gender, className);
        
        if (result.success) {
            this.game.ui.showNotification(`✅ ${result.character.name} créé !`, 'success');
            this.game.ui.hideModal();
            this.render(); // Refresh UI
        } else {
            this.game.ui.showNotification(`❌ ${result.error}`, 'error');
        }
    }

    /**
     * Switch vers un personnage
     */
    switchCharacter(characterId) {
        const result = this.game.altCharacterManager.switchCharacter(characterId);
        
        if (result.success) {
            const char = this.game.altCharacterManager.getCharacter(characterId);
            this.game.ui.showNotification(`✅ Vous jouez maintenant ${char.name}`, 'success');
            this.render();
            this.game.ui.updatePlayerUI(); // Update main UI
        } else {
            this.game.ui.showNotification(`❌ ${result.error}`, 'error');
        }
    }

    // ==================== HELPERS ====================

    getRoleIcon(role) {
        const icons = {
            'tank': '🛡️',
            'healer': '💚',
            'dps': '⚔️'
        };
        return icons[role] || '❓';
    }

    getRoleName(role) {
        const names = {
            'tank': 'Tank',
            'healer': 'Soigneur',
            'dps': 'DPS'
        };
        return names[role] || 'Inconnu';
    }

    formatTimeRemaining(endTime) {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}min`;
    }

    // Stubs pour les modals non implémentés
    showStartCarryModal() { console.log('TODO: Start Carry Modal'); }
    stopCarryMode() { console.log('TODO: Stop Carry'); }
    showStartAFKModal() { console.log('TODO: Start AFK Modal'); }
    showManageAFKModal() { console.log('TODO: Manage AFK Modal'); }
    depositGold() { console.log('TODO: Deposit Gold'); }
    withdrawGold() { console.log('TODO: Withdraw Gold'); }
    withdrawResource(id) { console.log('TODO: Withdraw Resource', id); }
    withdrawEquipment(id) { console.log('TODO: Withdraw Equipment', id); }
}
