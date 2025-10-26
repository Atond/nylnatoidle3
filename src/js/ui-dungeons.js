/**
 * 🏰 UI Donjons - Interface pour le système de donjons Trinity
 * 
 * Fonctionnalités :
 * - Liste des donjons avec progression
 * - Sélection d'équipe Trinity (Tank/Heal/DPS)
 * - Analyse de préparation (stats, chance de victoire, warnings)
 * - Combat en temps réel
 * - Résultats (victoire/défaite avec loot/analyse)
 * - Système d'aide complet (❓ Guide)
 */

class DungeonsUI {
    constructor(game) {
        this.game = game;
        this.selectedDungeonId = null;
        this.selectedTeam = {
            tank: null,
            healer: null,
            dps: null
        };
        
        this.container = null;
        this.inCombat = false;
    }

    /**
     * Initialise l'UI Donjons
     */
    initialize() {
        this.container = document.getElementById('dungeons_content');
        if (!this.container) {
            console.error('❌ Container #dungeons_content introuvable');
            return;
        }
        
        this.render();
    }

    /**
     * Render complet de l'UI
     */
    render() {
        if (!this.container) return;
        
        if (this.inCombat) {
            this.renderCombat();
        } else {
            this.renderDungeonSelection();
        }
    }

    /**
     * Render Dungeon Selection
     */
    renderDungeonSelection() {
        this.container.innerHTML = `
            <div class="dungeons-ui">
                <!-- Header avec aide -->
                <div class="dungeons-header">
                    <h2>🏰 Donjons Trinity</h2>
                    <button class="btn-help" onclick="window.game.ui.dungeonsUI.showHelpModal()">
                        ❓ Guide Donjons
                    </button>
                </div>
                
                <!-- Dungeons List -->
                <div class="dungeons-list-section">
                    <h3>📜 Donjons Disponibles</h3>
                    <div id="dungeons_list" class="dungeons-grid"></div>
                </div>
                
                <!-- Team Selection -->
                <div class="team-selection-section" id="team_selection_section" style="display: none;">
                    <h3>👥 Composition d'Équipe</h3>
                    <div id="team_selection"></div>
                    <div id="team_readiness"></div>
                    <div id="team_actions"></div>
                </div>
            </div>
        `;
        
        this.renderDungeonsList();
    }

    /**
     * Render Dungeons List
     */
    renderDungeonsList() {
        const dungeonsList = document.getElementById('dungeons_list');
        if (!dungeonsList) return;
        
        const dungeons = this.game.dungeonManager.getDungeons();
        
        dungeonsList.innerHTML = dungeons.map(dungeon => {
            const isAccessible = this.isDungeonAccessible(dungeon);
            const isCompleted = this.game.dungeonManager.completedDungeons[dungeon.id] > 0;
            const completionCount = this.game.dungeonManager.completedDungeons[dungeon.id] || 0;
            
            return `
                <div class="dungeon-card ${isAccessible ? 'accessible' : 'locked'} ${this.selectedDungeonId === dungeon.id ? 'selected' : ''}"
                     onclick="window.game.ui.dungeonsUI.selectDungeon('${dungeon.id}')">
                    <div class="dungeon-header">
                        <h4>${dungeon.name}</h4>
                        ${isCompleted ? '<span class="completed-badge">✓</span>' : ''}
                    </div>
                    <div class="dungeon-info">
                        <p class="dungeon-level">Niveau requis : ${dungeon.requiredLevel}</p>
                        <p class="dungeon-cost">Coût : ${dungeon.cost} or</p>
                        <p class="dungeon-boss">Boss : ${dungeon.boss.name}</p>
                        <p class="dungeon-completions">Complété : ${completionCount}x</p>
                    </div>
                    ${!isAccessible ? '<p class="locked-msg">🔒 Niveau insuffisant</p>' : ''}
                </div>
            `;
        }).join('');
    }

    /**
     * Sélectionne un donjon
     */
    selectDungeon(dungeonId) {
        this.selectedDungeonId = dungeonId;
        
        // Afficher la section de sélection d'équipe
        const teamSection = document.getElementById('team_selection_section');
        if (teamSection) {
            teamSection.style.display = 'block';
        }
        
        this.renderDungeonsList(); // Refresh selection
        this.renderTeamSelection();
        this.updateTeamReadiness();
    }

    /**
     * Render Team Selection
     */
    renderTeamSelection() {
        const teamSelection = document.getElementById('team_selection');
        if (!teamSelection) return;
        
        const characters = Array.from(this.game.altCharacterManager.characters.values());
        
        teamSelection.innerHTML = `
            <div class="team-slots">
                <!-- Tank Slot -->
                <div class="team-slot">
                    <h4>🛡️ Tank</h4>
                    <select id="team_tank" onchange="window.game.ui.dungeonsUI.onTeamChange()">
                        <option value="">-- Sélectionner --</option>
                        ${characters.filter(c => c.role === 'tank').map(c => `
                            <option value="${c.id}">${c.name} (Lvl ${c.level})</option>
                        `).join('')}
                    </select>
                    <div id="tank_preview" class="character-preview"></div>
                </div>
                
                <!-- Healer Slot -->
                <div class="team-slot">
                    <h4>💚 Soigneur</h4>
                    <select id="team_healer" onchange="window.game.ui.dungeonsUI.onTeamChange()">
                        <option value="">-- Sélectionner --</option>
                        ${characters.filter(c => c.role === 'healer').map(c => `
                            <option value="${c.id}">${c.name} (Lvl ${c.level})</option>
                        `).join('')}
                    </select>
                    <div id="healer_preview" class="character-preview"></div>
                </div>
                
                <!-- DPS Slot -->
                <div class="team-slot">
                    <h4>⚔️ DPS</h4>
                    <select id="team_dps" onchange="window.game.ui.dungeonsUI.onTeamChange()">
                        <option value="">-- Sélectionner --</option>
                        ${characters.filter(c => c.role === 'dps').map(c => `
                            <option value="${c.id}">${c.name} (Lvl ${c.level})</option>
                        `).join('')}
                    </select>
                    <div id="dps_preview" class="character-preview"></div>
                </div>
            </div>
        `;
        
        // Restore previous selection
        if (this.selectedTeam.tank) {
            document.getElementById('team_tank').value = this.selectedTeam.tank;
        }
        if (this.selectedTeam.healer) {
            document.getElementById('team_healer').value = this.selectedTeam.healer;
        }
        if (this.selectedTeam.dps) {
            document.getElementById('team_dps').value = this.selectedTeam.dps;
        }
        
        this.updateTeamPreviews();
    }

    /**
     * Callback quand l'équipe change
     */
    onTeamChange() {
        this.selectedTeam.tank = document.getElementById('team_tank').value || null;
        this.selectedTeam.healer = document.getElementById('team_healer').value || null;
        this.selectedTeam.dps = document.getElementById('team_dps').value || null;
        
        this.updateTeamPreviews();
        this.updateTeamReadiness();
    }

    /**
     * Update Team Previews
     */
    updateTeamPreviews() {
        const roles = ['tank', 'healer', 'dps'];
        
        roles.forEach(role => {
            const characterId = this.selectedTeam[role];
            const preview = document.getElementById(`${role}_preview`);
            
            if (!preview) return;
            
            if (!characterId) {
                preview.innerHTML = '<p class="empty">Aucun personnage sélectionné</p>';
                return;
            }
            
            const character = this.game.altCharacterManager.getCharacter(characterId);
            if (!character) return;
            
            // Calculer stats clés selon le rôle
            let keyStats = '';
            if (role === 'tank') {
                const ehp = character.maxHp * (1 + character.defense / 100);
                keyStats = `
                    <div class="stat">❤️ HP: ${character.maxHp}</div>
                    <div class="stat">🛡️ DEF: ${character.defense}</div>
                    <div class="stat">💪 EHP: ${Math.floor(ehp)}</div>
                `;
            } else if (role === 'healer') {
                const hps = (character.intelligence * 0.5) + (character.wisdom * 0.3);
                keyStats = `
                    <div class="stat">🔮 INT: ${character.intelligence}</div>
                    <div class="stat">🧠 WIS: ${character.wisdom}</div>
                    <div class="stat">💚 HPS: ${Math.floor(hps)}</div>
                `;
            } else { // dps
                const dps = character.attack * (1 + character.strength / 100);
                keyStats = `
                    <div class="stat">⚔️ ATK: ${character.attack}</div>
                    <div class="stat">💪 STR: ${character.strength}</div>
                    <div class="stat">⚡ DPS: ${Math.floor(dps)}</div>
                `;
            }
            
            preview.innerHTML = `
                <div class="character-mini">
                    <p class="char-name">${character.name} (Lvl ${character.level})</p>
                    <div class="char-stats">
                        ${keyStats}
                    </div>
                </div>
            `;
        });
    }

    /**
     * Update Team Readiness (Warnings, Recommendations, Win Chance)
     */
    updateTeamReadiness() {
        const readinessDiv = document.getElementById('team_readiness');
        const actionsDiv = document.getElementById('team_actions');
        
        if (!readinessDiv || !actionsDiv) return;
        
        // Vérifier si équipe complète
        if (!this.selectedTeam.tank || !this.selectedTeam.healer || !this.selectedTeam.dps) {
            readinessDiv.innerHTML = '<p class="warning">⚠️ Sélectionnez une équipe Trinity complète (Tank + Heal + DPS)</p>';
            actionsDiv.innerHTML = '';
            return;
        }
        
        // Récupérer les personnages
        const team = [
            this.game.altCharacterManager.getCharacter(this.selectedTeam.tank),
            this.game.altCharacterManager.getCharacter(this.selectedTeam.healer),
            this.game.altCharacterManager.getCharacter(this.selectedTeam.dps)
        ];
        
        // Vérifier la préparation
        const readiness = this.game.dungeonManager.checkTeamReadiness(this.selectedDungeonId, team);
        
        // Afficher chance de victoire
        const chanceColor = readiness.winChance >= 70 ? '#4CAF50' : 
                           readiness.winChance >= 50 ? '#FFC107' : '#F44336';
        
        let html = `
            <div class="team-readiness-display">
                <div class="win-chance" style="color: ${chanceColor};">
                    <h4>Chance de Victoire : ${readiness.winChance}%</h4>
                    <div class="chance-bar">
                        <div class="chance-fill" style="width: ${readiness.winChance}%; background-color: ${chanceColor};"></div>
                    </div>
                </div>
        `;
        
        // Afficher warnings
        if (readiness.warnings.length > 0) {
            html += `
                <div class="warnings-section">
                    <h4>⚠️ Problèmes Détectés</h4>
                    <ul>
                        ${readiness.warnings.map(w => `<li class="warning">${w}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Afficher recommandations
        if (readiness.recommendations.length > 0) {
            html += `
                <div class="recommendations-section">
                    <h4>💡 Améliorations Recommandées</h4>
                    <ul>
                        ${readiness.recommendations.map(r => `<li class="recommendation">${r}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Message positif si bonne chance
        if (readiness.winChance >= 70) {
            html += `<p class="success">✅ Équipe bien préparée ! Bonne chance !</p>`;
        }
        
        html += `</div>`;
        readinessDiv.innerHTML = html;
        
        // Bouton d'entrée
        const canEnter = readiness.winChance >= 30; // Minimum 30% pour tenter
        actionsDiv.innerHTML = `
            <button class="btn-enter-dungeon ${canEnter ? 'btn-primary' : 'btn-disabled'}" 
                    ${canEnter ? '' : 'disabled'}
                    onclick="window.game.ui.dungeonsUI.enterDungeon()">
                ⚔️ Entrer dans le Donjon
            </button>
            ${!canEnter ? '<p class="error">❌ Chance trop faible (< 30%) - Améliorez votre équipement</p>' : ''}
        `;
    }

    /**
     * Entrer dans le donjon
     */
    enterDungeon() {
        if (!this.selectedDungeonId) return;
        if (!this.selectedTeam.tank || !this.selectedTeam.healer || !this.selectedTeam.dps) return;
        
        const team = [
            this.game.altCharacterManager.getCharacter(this.selectedTeam.tank),
            this.game.altCharacterManager.getCharacter(this.selectedTeam.healer),
            this.game.altCharacterManager.getCharacter(this.selectedTeam.dps)
        ];
        
        const result = this.game.dungeonManager.enterDungeon(this.selectedDungeonId, team);
        
        if (result.success) {
            this.inCombat = true;
            this.renderCombat();
            
            // Démarrer le combat
            this.game.dungeonManager.startCombat();
        } else {
            this.game.ui.showNotification(`❌ ${result.error}`, 'error');
        }
    }

    /**
     * Render Combat UI
     */
    renderCombat() {
        if (!this.container) return;
        
        const combatState = this.game.dungeonManager.combatState;
        if (!combatState) return;
        
        const dungeon = this.game.dungeonManager.getDungeonById(combatState.dungeonId);
        
        this.container.innerHTML = `
            <div class="dungeon-combat-ui">
                <div class="combat-header">
                    <h2>⚔️ ${dungeon.name}</h2>
                    <p class="combat-boss">Boss : ${dungeon.boss.name}</p>
                </div>
                
                <!-- Boss HP Bar -->
                <div class="boss-section">
                    <div class="hp-bar-container">
                        <div class="hp-label">💀 Boss HP</div>
                        <div class="hp-bar">
                            <div class="hp-fill boss-hp" id="boss_hp_fill" style="width: 100%;"></div>
                            <span class="hp-text" id="boss_hp_text">${combatState.bossHp} / ${combatState.maxBossHp}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Tank HP Bar -->
                <div class="tank-section">
                    <div class="hp-bar-container">
                        <div class="hp-label">🛡️ Tank HP</div>
                        <div class="hp-bar">
                            <div class="hp-fill tank-hp" id="tank_hp_fill" style="width: 100%;"></div>
                            <span class="hp-text" id="tank_hp_text">${combatState.tankHp} / ${combatState.maxTankHp}</span>
                        </div>
                        <div class="heal-indicator" id="heal_indicator">💚 +0 HPS</div>
                    </div>
                </div>
                
                <!-- Combat Timer -->
                <div class="combat-timer">
                    <p>⏱️ Temps écoulé : <span id="combat_time">0</span>s</p>
                </div>
                
                <!-- Combat Log -->
                <div class="combat-log">
                    <h4>📜 Journal de Combat</h4>
                    <div id="combat_log_content"></div>
                </div>
            </div>
        `;
        
        // Démarrer update loop
        this.startCombatUpdateLoop();
    }

    /**
     * Start Combat Update Loop
     */
    startCombatUpdateLoop() {
        this.combatUpdateInterval = setInterval(() => {
            this.updateCombatUI();
            
            // Check si combat terminé
            const combatState = this.game.dungeonManager.combatState;
            if (!combatState || combatState.ended) {
                clearInterval(this.combatUpdateInterval);
                
                // Afficher résultat après 1 sec
                setTimeout(() => {
                    this.showCombatResult();
                }, 1000);
            }
        }, 100); // Update 10x/sec
    }

    /**
     * Update Combat UI
     */
    updateCombatUI() {
        const combatState = this.game.dungeonManager.combatState;
        if (!combatState) return;
        
        // Update Boss HP
        const bossHpPercent = Math.max(0, (combatState.bossHp / combatState.maxBossHp) * 100);
        const bossHpFill = document.getElementById('boss_hp_fill');
        const bossHpText = document.getElementById('boss_hp_text');
        if (bossHpFill) bossHpFill.style.width = `${bossHpPercent}%`;
        if (bossHpText) bossHpText.textContent = `${Math.floor(combatState.bossHp)} / ${combatState.maxBossHp}`;
        
        // Update Tank HP
        const tankHpPercent = Math.max(0, (combatState.tankHp / combatState.maxTankHp) * 100);
        const tankHpFill = document.getElementById('tank_hp_fill');
        const tankHpText = document.getElementById('tank_hp_text');
        if (tankHpFill) tankHpFill.style.width = `${tankHpPercent}%`;
        if (tankHpText) tankHpText.textContent = `${Math.floor(combatState.tankHp)} / ${combatState.maxTankHp}`;
        
        // Update Heal Indicator
        const healIndicator = document.getElementById('heal_indicator');
        if (healIndicator && combatState.healPower) {
            healIndicator.textContent = `💚 +${Math.floor(combatState.healPower)} HPS`;
        }
        
        // Update Timer
        const combatTime = document.getElementById('combat_time');
        if (combatTime) {
            const elapsed = Math.floor((Date.now() - combatState.startTime) / 1000);
            combatTime.textContent = elapsed;
        }
        
        // Update Combat Log
        const combatLog = document.getElementById('combat_log_content');
        if (combatLog && combatState.log) {
            combatLog.innerHTML = combatState.log.slice(-10).reverse().map(msg => `<p>${msg}</p>`).join('');
            combatLog.scrollTop = 0;
        }
    }

    /**
     * Affiche le résultat du combat
     */
    showCombatResult() {
        const combatState = this.game.dungeonManager.combatState;
        if (!combatState) return;
        
        this.inCombat = false;
        
        if (combatState.victory) {
            this.showVictoryResult(combatState.rewards);
        } else {
            this.showDefeatResult(combatState.defeatAnalysis);
        }
    }

    /**
     * Affiche résultat Victoire
     */
    showVictoryResult(rewards) {
        this.game.ui.showModal('🎉 VICTOIRE !', `
            <div class="victory-result">
                <h3>✅ Donjon Terminé !</h3>
                
                <div class="rewards-section">
                    <h4>🎁 Récompenses</h4>
                    
                    <!-- XP & Gold -->
                    <div class="reward-basic">
                        <p>✨ XP : +${rewards.xp}</p>
                        <p>💰 Or : +${rewards.gold}</p>
                    </div>
                    
                    <!-- Ressources -->
                    ${rewards.resources.length > 0 ? `
                        <div class="reward-resources">
                            <h5>📦 Ressources</h5>
                            <ul>
                                ${rewards.resources.map(r => `
                                    <li>${r.icon} ${r.name} x${r.quantity}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <!-- Équipement -->
                    ${rewards.equipment.length > 0 ? `
                        <div class="reward-equipment">
                            <h5>⚔️ Équipement</h5>
                            <ul>
                                ${rewards.equipment.map(eq => {
                                    const rarityColor = window.RarityColors?.[eq.rarity] || '#fff';
                                    return `<li style="color: ${rarityColor};">${eq.name} (${eq.slot})</li>`;
                                }).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `, [
            { text: 'Retour aux Donjons', action: () => {
                this.game.ui.hideModal();
                this.render();
            }, primary: true }
        ]);
    }

    /**
     * Affiche résultat Défaite
     */
    showDefeatResult(analysis) {
        this.game.ui.showModal('💀 DÉFAITE', `
            <div class="defeat-result">
                <h3>❌ Échec du Donjon</h3>
                
                <div class="analysis-section">
                    <h4>🔍 Analyse de l'Échec</h4>
                    
                    <div class="main-problem">
                        <h5>Problème Principal :</h5>
                        <p class="problem">${analysis.mainProblem}</p>
                    </div>
                    
                    ${analysis.recommendations.length > 0 ? `
                        <div class="recommendations">
                            <h5>💡 Recommandations :</h5>
                            <ul>
                                ${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="stats-needed">
                        <h5>📊 Stats Requises :</h5>
                        <ul>
                            ${analysis.statsNeeded.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `, [
            { text: 'Retour aux Donjons', action: () => {
                this.game.ui.hideModal();
                this.render();
            }, primary: true }
        ]);
    }

    // ==================== MODALS ====================

    /**
     * Affiche le modal d'aide complet
     */
    showHelpModal() {
        this.game.ui.showModal('Guide Donjons Trinity', `
            <div class="help-modal">
                <section class="help-section">
                    <h3>🏰 Système de Donjons</h3>
                    <p>Les <strong>Donjons</strong> sont des combats de groupe qui nécessitent une composition Trinity bien équipée.</p>
                    <ul>
                        <li>⚔️ Combats <strong>automatiques</strong> (simulation en temps réel)</li>
                        <li>🎁 Récompenses : <strong>Équipement Légendaire/Mythique</strong> + Ressources rares</li>
                        <li>💀 Difficulté croissante : Niveaux 25, 35, 45, 55, 65</li>
                    </ul>
                </section>
                
                <section class="help-section">
                    <h3>🛡️ Système Trinity</h3>
                    <p>Chaque donjon nécessite <strong>exactement 3 personnages</strong> avec les rôles suivants :</p>
                    <ul>
                        <li><strong>🛡️ Tank</strong> : Encaisse les dégâts du boss</li>
                        <li><strong>💚 Soigneur</strong> : Soigne le tank en continu</li>
                        <li><strong>⚔️ DPS</strong> : Inflige des dégâts au boss</li>
                    </ul>
                    <p class="warning">⚠️ Sans les 3 rôles, vous ne pourrez pas entrer dans le donjon.</p>
                </section>
                
                <section class="help-section">
                    <h3>📊 Stats Importantes</h3>
                    
                    <h4>🛡️ Tank</h4>
                    <ul>
                        <li><strong>HP</strong> : Points de vie (combien vous pouvez encaisser)</li>
                        <li><strong>DEF</strong> : Défense (réduit les dégâts reçus)</li>
                        <li><strong>EHP (Effective HP)</strong> = HP × (1 + DEF/100)</li>
                    </ul>
                    
                    <h4>💚 Soigneur</h4>
                    <ul>
                        <li><strong>INT</strong> : Intelligence (puissance des soins)</li>
                        <li><strong>WIS</strong> : Sagesse (efficacité des soins)</li>
                        <li><strong>HPS (Heal Per Second)</strong> = (INT × 0.5) + (WIS × 0.3)</li>
                    </ul>
                    
                    <h4>⚔️ DPS</h4>
                    <ul>
                        <li><strong>ATK</strong> : Attaque (dégâts de base)</li>
                        <li><strong>STR</strong> : Force (multiplicateur de dégâts)</li>
                        <li><strong>DPS (Damage Per Second)</strong> = ATK × (1 + STR/100)</li>
                    </ul>
                </section>
                
                <section class="help-section">
                    <h3>🎯 Comment Gagner ?</h3>
                    <p>La simulation calcule en temps réel :</p>
                    <ul>
                        <li>Boss inflige <strong>X DPS</strong> au Tank</li>
                        <li>Soigneur soigne <strong>Y HPS</strong> au Tank</li>
                        <li>Dégâts nets = <strong>Boss DPS - Heal HPS</strong></li>
                        <li>Tank survit si : <strong>Temps Survie > Temps Kill Boss</strong></li>
                    </ul>
                    <p class="success">✅ Victoire si le boss meurt avant le tank !</p>
                </section>
                
                <section class="help-section">
                    <h3>💡 Si Vous Échouez</h3>
                    <p>Le système analyse votre échec et vous donne des recommandations :</p>
                    <ul>
                        <li>Quel rôle a posé problème (Tank/Heal/DPS)</li>
                        <li>Quelles stats améliorer</li>
                        <li>Quels crafts/équipements fabriquer</li>
                    </ul>
                    <p>Exemple : <em>"Tank : +50 DEF requis (craft Bouclier Acier +5)"</em></p>
                </section>
                
                <section class="help-section">
                    <h3>🎁 Récompenses</h3>
                    <p>Chaque victoire rapporte :</p>
                    <ul>
                        <li>✨ <strong>XP</strong> pour tous les membres</li>
                        <li>💰 <strong>Or</strong></li>
                        <li>📦 <strong>Ressources</strong> rares</li>
                        <li>⚔️ <strong>Équipement</strong> Epic/Legendary/Mythic (chance de drop)</li>
                    </ul>
                    <p>Plus le donjon est difficile, meilleures sont les récompenses !</p>
                </section>
            </div>
        `, [
            { text: 'Fermer', action: () => this.game.ui.hideModal() }
        ]);
    }

    // ==================== HELPERS ====================

    isDungeonAccessible(dungeon) {
        const mainLevel = this.game.altCharacterManager.getMainCharacter()?.level || 1;
        return mainLevel >= dungeon.requiredLevel;
    }
}
