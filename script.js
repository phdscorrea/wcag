/* ================================================================
   GUIA DE BOAS PRÁTICAS EM DESIGN INSTRUCIONAL ACESSÍVEL NA EaD
   Arquivo JavaScript - Funcionalidades
   ================================================================ */

/* ================================================================
   INICIALIZAÇÃO E CONFIGURAÇÃO DE VARIÁVEIS
   ================================================================ */
const app = {
    nav: document.querySelector('nav'),
    navToggle: document.querySelector('.nav-toggle'),
    navMenu: document.querySelector('nav ul'),
    navLinks: document.querySelectorAll('nav a[href^="#"]'),
    sections: document.querySelectorAll('section[id]'),
    lastScrollTop: 0,
    
    // Configurações
    config: {
        scrollHideThreshold: 100,
        smoothScrollBehavior: 'smooth'
    },

    /* ================================================================
       INICIALIZAÇÃO
       ================================================================ */
    init() {
        this.setupEventListeners();
        this.setupNavigation();
    },

    /* ================================================================
       CONFIGURAÇÃO DE EVENT LISTENERS
       ================================================================ */
    setupEventListeners() {
        // Scroll - mostrar/ocultar navegação
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.enforceGridSymmetry());
        
        // Toggle menu mobile
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Navegação - fechar menu ao clicar
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    },

    /* ================================================================
       CONTROLE DE NAVEGAÇÃO EM SCROLL
       ================================================================ */
    handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Esconder/mostrar barra de navegação
        if (currentScroll > this.lastScrollTop && currentScroll > this.config.scrollHideThreshold) {
            // Scrolling down - hide nav
            this.nav.classList.add('hidden');
        } else {
            // Scrolling up - show nav
            this.nav.classList.remove('hidden');
        }
        
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        
        // Destacar link ativo na navegação
        this.updateActiveLink();
    },

    /* ================================================================
       ATUALIZAR LINK ATIVO
       ================================================================ */
    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    },

    /* ================================================================
       TOGGLE DO MENU MOBILE
       ================================================================ */
    toggleMobileMenu() {
        this.navMenu.classList.toggle('show');
        const isOpen = this.navMenu.classList.contains('show');
        
        this.navToggle.setAttribute('aria-label', 
            isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
        );
        this.navToggle.textContent = isOpen ? '✕' : '☰';
    },

    /* ================================================================
       TRATAMENTO DO CLIQUE NA NAVEGAÇÃO
       ================================================================ */
    handleNavClick(e) {
        e.preventDefault();
        
        // Fechar menu mobile
        this.navMenu.classList.remove('show');
        this.navToggle.textContent = '☰';
        this.navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        
        // Scroll suave para a seção
        const href = e.target.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: this.config.smoothScrollBehavior,
                block: 'start'
            });
        }
    },

    /* ================================================================
       FORÇAR 2x2 EM GRID COM 4 CARDS
       ================================================================ */
    enforceGridSymmetry() {
        document.querySelectorAll('.cards-grid').forEach(grid => {
            const cardCount = grid.querySelectorAll('.card').length;
            if (cardCount === 4 && window.innerWidth >= 768) {
                grid.classList.add('force-2x2');
            } else {
                grid.classList.remove('force-2x2');
            }
        });
    },

    /* ================================================================
       CONFIGURAÇÃO DE NAVEGAÇÃO
       ================================================================ */
    setupNavigation() {
        // Placeholder para futuras configurações de navegação
        console.log('Navegação inicializada com sucesso');
    }
};

/* ================================================================
   ACESSIBILIDADE: CONTROLES USUÁRIO
   ================================================================ */
const accessibility = {
    state: {
        fontSize: 100,
        highContrast: false,
        largeSpacing: false,
        reducedMotion: false,
        colorBlindMode: ''
    },
    STORAGE_KEY: 'wcag-a11y-settings',

    load() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                this.state = {...this.state, ...JSON.parse(saved)};
            } catch (e) {
                console.warn('Acessibilidade: não foi possível carregar estado', e);
            }
        }
    },

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    },

    apply() {
        document.documentElement.style.fontSize = `${this.state.fontSize}%`;
        document.documentElement.classList.toggle('high-contrast', this.state.highContrast);
        document.documentElement.classList.toggle('large-spacing', this.state.largeSpacing);
        document.documentElement.classList.toggle('reduced-motion', this.state.reducedMotion);

        document.documentElement.classList.toggle('protanopia-mode', this.state.colorBlindMode === 'protanopia');
        document.documentElement.classList.toggle('deuteranopia-mode', this.state.colorBlindMode === 'deuteranopia');
        document.documentElement.classList.toggle('tritanopia-mode', this.state.colorBlindMode === 'tritanopia');
        document.documentElement.classList.toggle('achromatopsia-mode', this.state.colorBlindMode === 'achromatopsia');

        this.updateButtonStates();
        if (this.state.highContrast) {
            this.checkContrast();
        } else {
            document.querySelectorAll('.low-contrast-warning').forEach(el => el.classList.remove('low-contrast-warning'));
        }
    },

    announce(message) {
        const announcer = document.getElementById('a11y-announce');
        if (!announcer) return;
        announcer.textContent = message;
    },

    getRgbFromColor(color) {
        const rgba = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/);
        if (!rgba) return null;
        return {
            r: Number(rgba[1]),
            g: Number(rgba[2]),
            b: Number(rgba[3]),
            a: rgba[4] !== undefined ? Number(rgba[4]) : 1
        };
    },

    getLuminance(rgb) {
        const chan = (c) => {
            const v = c / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * chan(rgb.r) + 0.7152 * chan(rgb.g) + 0.0722 * chan(rgb.b);
    },

    contrastRatio(color1, color2) {
        const c1 = this.getRgbFromColor(color1);
        const c2 = this.getRgbFromColor(color2);
        if (!c1 || !c2) return 1;
        const l1 = this.getLuminance(c1);
        const l2 = this.getLuminance(c2);
        const brightest = Math.max(l1, l2);
        const darkest = Math.min(l1, l2);
        return (brightest + 0.05) / (darkest + 0.05);
    },

    checkContrast() {
        const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, td, th, button, label, span');
        elements.forEach(el => {
            const cs = getComputedStyle(el);
            const textColor = cs.color;
            let bgColor = cs.backgroundColor;

            if (!bgColor || bgColor === 'transparent') {
                const parent = el.closest('section, .card, .table-container, nav, footer, body');
                if (parent) bgColor = getComputedStyle(parent).backgroundColor;
            }

            if (!textColor || !bgColor || textColor === 'transparent' || bgColor === 'transparent') {
                el.classList.remove('low-contrast-warning');
                return;
            }

            const ratio = this.contrastRatio(textColor, bgColor);
            if (ratio < 4.5) {
                el.classList.add('low-contrast-warning');
            } else {
                el.classList.remove('low-contrast-warning');
            }
        });
    },

    updateButtonStates() {
        const a11yBar = document.getElementById('a11y-bar');
        if (!a11yBar) return;

        const actions = [
            { key: 'highContrast', selector: '[data-action="toggle-contrast"]', label: 'Contraste' },
            { key: 'largeSpacing', selector: '[data-action="toggle-spacing"]', label: 'Espaçamento' },
            { key: 'reducedMotion', selector: '[data-action="toggle-reduced-motion"]', label: 'Sem animação' }
        ];

        actions.forEach(({ key, selector, label }) => {
            const btn = a11yBar.querySelector(selector);
            if (btn) {
                const active = Boolean(this.state[key]);
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', String(active));
                btn.textContent = `${label}${active ? ' ✓' : ''}`;
            }
        });

    },

    setColorBlindMode(mode) {
        if (!mode || this.state.colorBlindMode === mode) {
            this.state.colorBlindMode = '';
            this.announce('Modo daltônico desativado');
        } else {
            this.state.colorBlindMode = mode;
            this.announce(`Modo daltônico ${mode} ativado`);
        }
        this.save();
        this.apply();
    },

    action(type) {
        switch (type) {
            case 'increase-font':
                this.state.fontSize = Math.min(200, this.state.fontSize + 10);
                this.announce(`Tamanho da fonte definido para ${this.state.fontSize}%`);
                break;
            case 'decrease-font':
                this.state.fontSize = Math.max(80, this.state.fontSize - 10);
                this.announce(`Tamanho da fonte definido para ${this.state.fontSize}%`);
                break;
            case 'toggle-contrast':
                this.state.highContrast = !this.state.highContrast;
                this.announce(`Alto contraste ${this.state.highContrast ? 'ativado' : 'desativado'}`);
                break;
            case 'toggle-spacing':
                this.state.largeSpacing = !this.state.largeSpacing;
                this.announce(`Espaçamento ${this.state.largeSpacing ? 'ativado' : 'desativado'}`);
                break;
            case 'toggle-reduced-motion':
                this.state.reducedMotion = !this.state.reducedMotion;
                this.announce(`Modo sem animação ${this.state.reducedMotion ? 'ativado' : 'desativado'}`);
                break;
            case 'toggle-a11y-bar':
                const bar = document.getElementById('a11y-bar');
                const showBtn = document.getElementById('a11y-show-button');
                if (bar) {
                    if (bar.classList.contains('hidden')) {
                        bar.classList.remove('hidden');
                        if (showBtn) showBtn.hidden = true;
                        this.announce('Barra de acessibilidade exibida');
                    } else {
                        bar.classList.add('hidden');
                        if (showBtn) showBtn.hidden = false;
                    }
                }
                break;
            case 'reset':
                if (!confirm('Deseja realmente redefinir as configurações de acessibilidade?')) {
                    return;
                }
                this.state = {fontSize: 100, highContrast: false, largeSpacing: false, reducedMotion: false, colorBlindMode: ''};
                this.announce('Configurações de acessibilidade redefinidas');
                break;
            default:
                return;
        }
        this.save();
        this.apply();
    },

    init() {
        this.load();
        this.apply();

        // Mostrar botão de opções se a barra estiver oculta
        const a11yBar = document.getElementById('a11y-bar');
        const a11yShowButton = document.getElementById('a11y-show-button');
        if (a11yBar && a11yShowButton) {
            if (a11yBar.classList.contains('hidden')) {
                a11yShowButton.hidden = false;
            }
        }

        if (a11yBar) {
            a11yBar.addEventListener('click', (event) => {
                const action = event.target.closest('button')?.dataset.action;
                if (action) {
                    this.action(action);
                }
            });
        }

        if (a11yShowButton) {
            a11yShowButton.addEventListener('click', () => {
                if (a11yBar) {
                    a11yBar.classList.remove('hidden');
                }
                a11yShowButton.hidden = true;
            });
        }

        const daltonismButtons = [
            { selector: '#daltonism-protanopia', mode: 'protanopia' },
            { selector: '#daltonism-deuteranopia', mode: 'deuteranopia' },
            { selector: '#daltonism-tritanopia', mode: 'tritanopia' },
            { selector: '#daltonism-achromatopsia', mode: 'achromatopsia' }
        ];

        daltonismButtons.forEach(({ selector, mode }) => {
            const button = document.querySelector(selector);
            if (button) {
                button.addEventListener('click', () => this.setColorBlindMode(mode));
            }
        });

        const daltonismReset = document.querySelector('#daltonism-reset');
        if (daltonismReset) {
            daltonismReset.addEventListener('click', () => this.setColorBlindMode(''));
        }

        const easterEggTrigger = document.querySelector('#easteregg-trigger');
        if (easterEggTrigger) {
            easterEggTrigger.addEventListener('click', () => {
                const buttons = document.querySelector('.easteregg-buttons');
                if (buttons) {
                    buttons.classList.toggle('visible');
                }
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'c') {
                event.preventDefault();
                this.action('toggle-contrast');
            }
        });
    }
};

/* ================================================================
   FUNÇÕES UTILITÁRIAS GLOBAIS
   ================================================================ */

/**
 * Scroll suave para o topo da página
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ================================================================
   INICIALIZAÇÃO DA APLICAÇÃO
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    app.enforceGridSymmetry();
    accessibility.init();
});