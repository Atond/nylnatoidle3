/**
 * CHARACTER CREATION MANAGER
 * Gestion de l'écran de création de personnage
 */

class CharacterCreationManager {
    constructor(game) {
        this.game = game;
        this.currentStep = 0;
        this.steps = ['name', 'gender', 'class'];
        
        // Données de création
        this.characterData = {
            name: '',
            gender: null,
            class: null
        };
        
        // Éléments DOM
        this.modal = null;
        this.nameInput = null;
        this.genderButtons = [];
        this.classCards = [];
        this.btnPrev = null;
        this.btnNext = null;
        this.btnConfirm = null;
        
        this.initialize();
    }

    /**
     * Initialise les éléments DOM et les événements
     */
    initialize() {
        this.modal = document.getElementById('characterCreationModal');
        this.nameInput = document.getElementById('characterName');
        this.btnPrev = document.getElementById('btnPrevStep');
        this.btnNext = document.getElementById('btnNextStep');
        this.btnConfirm = document.getElementById('btnConfirmCreation');
        
        // Boutons de genre
        this.genderButtons = document.querySelectorAll('.gender-btn');
        this.genderButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectGender(btn.dataset.gender));
        });
        
        // Cartes de classe
        this.classCards = document.querySelectorAll('.class-card');
        this.classCards.forEach(card => {
            card.addEventListener('click', () => this.selectClass(card.dataset.class));
        });
        
        // Input nom
        this.nameInput.addEventListener('input', () => this.validateName());
        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.isStepValid()) {
                this.nextStep();
            }
        });
        
        // Boutons de navigation
        this.btnPrev.addEventListener('click', () => this.previousStep());
        this.btnNext.addEventListener('click', () => this.nextStep());
        this.btnConfirm.addEventListener('click', () => this.confirmCreation());
    }

    /**
     * Affiche le modal de création
     */
    show() {
        this.modal.style.display = 'flex';
        this.currentStep = 0;
        this.showStep(0);
        
        // Focus sur l'input de nom
        setTimeout(() => {
            this.nameInput.focus();
        }, 100);
    }

    /**
     * Cache le modal
     */
    hide() {
        this.modal.style.display = 'none';
    }

    /**
     * Affiche une étape spécifique
     */
    showStep(stepIndex) {
        // Cacher toutes les étapes
        document.querySelectorAll('.creation-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Afficher l'étape actuelle
        const stepId = `step-${this.steps[stepIndex]}`;
        const stepElement = document.getElementById(stepId);
        if (stepElement) {
            stepElement.classList.add('active');
        }
        
        // Gérer les boutons
        this.btnPrev.style.display = stepIndex > 0 ? 'block' : 'none';
        this.btnNext.style.display = stepIndex < this.steps.length - 1 ? 'block' : 'none';
        this.btnConfirm.style.display = stepIndex === this.steps.length - 1 ? 'block' : 'none';
        
        // Désactiver le bouton suivant si étape invalide
        this.updateNextButton();
    }

    /**
     * Étape suivante
     */
    nextStep() {
        if (!this.isStepValid()) return;
        
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    }

    /**
     * Étape précédente
     */
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    /**
     * Valide l'étape actuelle
     */
    isStepValid() {
        const step = this.steps[this.currentStep];
        
        switch(step) {
            case 'name':
                return this.characterData.name.length >= 3 && this.characterData.name.length <= 20;
            case 'gender':
                return this.characterData.gender !== null;
            case 'class':
                return this.characterData.class !== null;
            default:
                return false;
        }
    }

    /**
     * Met à jour l'état du bouton Suivant
     */
    updateNextButton() {
        if (this.btnNext) {
            this.btnNext.disabled = !this.isStepValid();
            this.btnNext.style.opacity = this.isStepValid() ? '1' : '0.5';
            this.btnNext.style.cursor = this.isStepValid() ? 'pointer' : 'not-allowed';
        }
        
        if (this.btnConfirm) {
            this.btnConfirm.disabled = !this.isStepValid();
            this.btnConfirm.style.opacity = this.isStepValid() ? '1' : '0.5';
            this.btnConfirm.style.cursor = this.isStepValid() ? 'pointer' : 'not-allowed';
        }
    }

    /**
     * Valide et enregistre le nom
     */
    validateName() {
        let name = this.nameInput.value.trim();
        
        // Supprimer les caractères spéciaux dangereux
        name = name.replace(/[<>\/\\]/g, '');
        
        // Limiter à 20 caractères
        if (name.length > 20) {
            name = name.substring(0, 20);
            this.nameInput.value = name;
        }
        
        this.characterData.name = name;
        this.updateNextButton();
    }

    /**
     * Sélectionne un genre
     */
    selectGender(gender) {
        this.characterData.gender = gender;
        
        // Mettre à jour l'UI
        this.genderButtons.forEach(btn => {
            if (btn.dataset.gender === gender) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        
        this.updateNextButton();
    }

    /**
     * Sélectionne une classe
     */
    selectClass(className) {
        this.characterData.class = className;
        
        // Mettre à jour l'UI
        this.classCards.forEach(card => {
            if (card.dataset.class === className) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
        
        this.updateNextButton();
    }

    /**
     * Confirme et finalise la création du personnage
     */
    confirmCreation() {
        if (!this.isStepValid()) return;
        
        // Appliquer les données au joueur
        this.game.player.initializeCharacter(
            this.characterData.name,
            this.characterData.gender,
            this.characterData.class
        );
        
        // Mettre à jour l'UI
        this.game.ui.updatePlayerInfo();
        this.game.ui.updateStats();
        
        // Sauvegarder
        this.game.save();
        
        // Cacher le modal
        this.hide();
        
        // Message de bienvenue
        if (this.game.ui && this.game.ui.addCombatLog) {
            this.game.ui.addCombatLog(`✨ Bienvenue, ${this.characterData.name} ! Votre aventure commence...`, 'system');
        }
        
        if (GameConfig.DEBUG.enabled) {
            console.log('✅ Personnage créé avec succès :', this.characterData);
        }
    }

    /**
     * Vérifie si le joueur a déjà créé un personnage
     * 🛡️ FIX: Vérifier si le personnage a une classe ET un nom personnalisé
     */
    shouldShow() {
        // Afficher seulement si:
        // - Pas de classe OU
        // - Nom par défaut ET pas de classe
        // Ne PAS afficher si le joueur a déjà une classe (même avec nom "Aventurier")
        const hasClass = this.game.player.class !== null;
        const hasDefaultName = this.game.player.name === 'Aventurier';
        
        // Si le joueur a une classe, ne jamais afficher (même si nom = "Aventurier")
        if (hasClass) {
            return false;
        }
        
        // Sinon, afficher seulement si vraiment nouveau (pas de classe)
        return !hasClass;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.CharacterCreationManager = CharacterCreationManager;
}
