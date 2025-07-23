// V2.1: Cyberpunk Neon - Enhanced 2025 Interactive Effects

'use strict';

class CyberpunkNeon {
    constructor() {
        this.particles = [];
        this.lightningBolts = [];
        this.dataStreams = [];
        this.isAnimating = false;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupCyberpunkCursor();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupNeonParticles();
        this.setupLightningEffects();
        this.setupDataStreams();
        this.setupGlitchEffects();
        this.setupScrollEffects();
        this.setupStatCounters();
        this.setupRevealAnimations();
        this.setupElectricInteractions();
        this.startCyberpunkAnimations();
    }

    setupCyberpunkCursor() {
        if (window.innerWidth <= 768) return;

        const cursor = document.getElementById('cyberpunkCursor');
        const cursorCore = cursor.querySelector('.cursor-core');
        const cursorGlow = cursor.querySelector('.cursor-glow');
        const cursorRing = cursor.querySelector('.cursor-ring');
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.mouse.x = mouseX;
            this.mouse.y = mouseY;
        });

        const animateCursor = () => {
            const ease = 0.15;
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Enhanced cursor interactions
        document.querySelectorAll('.cyber-button, .nav-link, .cyber-logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorCore.style.background = '#00FF88';
                cursorRing.style.borderColor = '#00FF88';
                this.createCursorExplosion();
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorCore.style.background = '#00D4FF';
                cursorRing.style.borderColor = '#00D4FF';
            });
        });

        // Cyber hover effects
        document.querySelectorAll('.cyber-card, .solution-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 0, 128, 0.8) 0%, transparent 70%)';
                this.createElectricField(el);
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.5) 0%, transparent 70%)';
                this.clearElectricField(el);
            });
        });
    }

    createCursorExplosion() {
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            width: 50px;
            height: 50px;
            left: ${this.mouse.x - 25}px;
            top: ${this.mouse.y - 25}px;
            background: radial-gradient(circle, #00D4FF 0%, #FF0080 50%, transparent 70%);
            border-radius: 50%;
            animation: cursor-explosion 0.5s ease-out forwards;
        `;

        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 500);
    }

    createElectricField(element) {
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'electric-spark';
            spark.style.cssText = `
                position: absolute;
                width: 2px;
                height: 20px;
                background: linear-gradient(180deg, #00D4FF, transparent);
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0;
                animation: electric-spark ${0.3 + Math.random() * 0.4}s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                transform-origin: bottom;
                z-index: 10;
            `;

            element.appendChild(spark);
        }
    }

    clearElectricField(element) {
        element.querySelectorAll('.electric-spark').forEach(spark => {
            spark.remove();
        });
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('cyberNav');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
                
                if (nav.classList.contains('active')) {
                    this.animateMobileMenu();
                }
            });

            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    toggle.textContent = '☰';
                });
            });
        }
    }

    animateMobileMenu() {
        const menuItems = document.querySelectorAll('.cyber-nav .nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.3s ease';
            }, index * 100);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, 1000);
            window.scrollTo(0, run);
            if (timeElapsed < 1000) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    setupNeonParticles() {
        const container = document.getElementById('neonParticles');
        if (!container) return;

        // Create floating neon particles
        for (let i = 0; i < 50; i++) {
            this.createNeonParticle(container);
        }

        this.animateNeonParticles();
    }

    createNeonParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'neon-particle';
        
        const colors = ['#00D4FF', '#FF0080', '#00FF88', '#FFFF00', '#8A2BE2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.8 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 4}px ${color};
            pointer-events: none;
            z-index: 1;
        `;

        container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            color: color,
            pulse: Math.random() * Math.PI * 2
        });
    }

    animateNeonParticles() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += 0.02;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

            // Pulsing effect
            const pulseScale = 0.5 + Math.sin(particle.pulse) * 0.3;
            const pulseOpacity = 0.3 + Math.sin(particle.pulse) * 0.5;

            // Update position and effects
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.transform = `scale(${pulseScale})`;
            particle.element.style.opacity = pulseOpacity;
        });

        requestAnimationFrame(() => this.animateNeonParticles());
    }

    setupLightningEffects() {
        const heroLightning = document.getElementById('heroLightning');
        if (!heroLightning) return;

        setInterval(() => {
            this.createLightningBolt(heroLightning);
        }, 2000 + Math.random() * 3000);
    }

    createLightningBolt(container) {
        const lightning = document.createElement('div');
        lightning.className = 'lightning-bolt';
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const height = Math.random() * 300 + 100;
        
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: ${startX}px;
            width: 3px;
            height: ${height}px;
            background: linear-gradient(180deg, 
                transparent 0%, 
                #00D4FF 10%, 
                #FFFFFF 50%, 
                #00D4FF 90%, 
                transparent 100%);
            box-shadow: 0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF;
            opacity: 0;
            animation: lightning-strike 0.3s ease-out forwards;
            transform: skewX(${Math.random() * 20 - 10}deg);
            z-index: 2;
        `;

        container.appendChild(lightning);

        // Create branching effects
        setTimeout(() => {
            this.createLightningBranch(container, startX, height * 0.3);
            this.createLightningBranch(container, startX, height * 0.7);
        }, 100);

        setTimeout(() => lightning.remove(), 500);
    }

    createLightningBranch(container, originX, originY) {
        const branch = document.createElement('div');
        branch.className = 'lightning-branch';
        
        const angle = (Math.random() - 0.5) * 90;
        const length = Math.random() * 100 + 50;
        
        branch.style.cssText = `
            position: absolute;
            left: ${originX}px;
            top: ${originY}px;
            width: 2px;
            height: ${length}px;
            background: linear-gradient(180deg, #00D4FF, transparent);
            box-shadow: 0 0 5px #00D4FF;
            opacity: 0;
            transform-origin: top;
            transform: rotate(${angle}deg);
            animation: lightning-branch 0.2s ease-out 0.1s forwards;
        `;

        container.appendChild(branch);
        setTimeout(() => branch.remove(), 400);
    }

    setupDataStreams() {
        const dataStream = document.getElementById('dataStream');
        if (!dataStream) return;

        setInterval(() => {
            this.createDataCode(dataStream);
        }, 500);
    }

    createDataCode(container) {
        const code = document.createElement('div');
        code.className = 'data-code';
        
        const binaryStrings = [
            '01001000', '11010011', '10101010', '01110100',
            '11001101', '00110110', '10011001', '01101001'
        ];
        const binaryString = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
        
        code.textContent = binaryString;
        code.style.cssText = `
            position: absolute;
            right: ${Math.random() * 100}px;
            top: -20px;
            color: #00FF88;
            font-family: 'JetBrains Mono', monospace;
            font-size: ${Math.random() * 8 + 8}px;
            opacity: 0.8;
            animation: data-fall 4s linear forwards;
            text-shadow: 0 0 5px #00FF88;
            white-space: nowrap;
        `;

        container.appendChild(code);
        setTimeout(() => code.remove(), 4000);
    }

    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.cyber-title .glitch');
        
        setInterval(() => {
            glitchElements.forEach(element => {
                if (Math.random() < 0.3) {
                    this.triggerGlitchEffect(element);
                }
            });
        }, 3000);
    }

    triggerGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchText = '';
        
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.5) {
                glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchText += originalText[i];
            }
        }
        
        element.textContent = glitchText;
        element.style.color = '#FF0080';
        element.style.textShadow = '0 0 10px #FF0080';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
            element.style.textShadow = '';
        }, 150);
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Header effects
            if (scrollTop > 100) {
                header.style.background = 'rgba(10, 10, 15, 0.98)';
                header.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Parallax effects
            this.updateParallaxEffects(scrollTop);
        });
    }

    updateParallaxEffects(scrollTop) {
        const parallaxElements = document.querySelectorAll('.cyberpunk-background > div');
        parallaxElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.02);
            const y = scrollTop * speed;
            element.style.transform = `translateY(${y}px)`;
        });
    }

    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateStatCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
                this.createStatExplosion(element);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    createStatExplosion(element) {
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: absolute;
                width: 3px;
                height: 15px;
                background: linear-gradient(180deg, #00D4FF, transparent);
                top: 20%;
                left: 50%;
                transform-origin: bottom;
                animation: stat-explosion 1s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                transform: rotate(${i * 30}deg);
                box-shadow: 0 0 10px #00D4FF;
            `;
            
            element.parentElement.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.cyber-card, .solution-card, .arch-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.createRevealEffect(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
            observer.observe(el);
        });
    }

    createRevealEffect(element) {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #00D4FF, #FF0080, #00FF88, #FFFF00);
            background-size: 400% 400%;
            opacity: 0;
            z-index: -1;
            animation: reveal-pulse 0.8s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(pulse);
        setTimeout(() => pulse.remove(), 800);
    }

    setupElectricInteractions() {
        // Electric button effects
        document.querySelectorAll('.cyber-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createButtonLightning(button);
            });

            button.addEventListener('click', (e) => {
                this.createClickWave(e);
                this.createElectricBurst(button);
            });
        });

        // Card electric border effects
        document.querySelectorAll('.cyber-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.activateElectricBorder(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.deactivateElectricBorder(card);
            });
        });
    }

    createButtonLightning(button) {
        const lightning = button.querySelector('.button-lightning');
        if (lightning) {
            lightning.style.opacity = '1';
            lightning.style.animation = 'lightning-sweep 0.6s ease-out';
        }
    }

    createClickWave(e) {
        const wave = document.createElement('div');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        wave.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: click-wave 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 100;
        `;

        e.currentTarget.appendChild(wave);
        setTimeout(() => wave.remove(), 600);
    }

    createElectricBurst(button) {
        for (let i = 0; i < 8; i++) {
            const burst = document.createElement('div');
            burst.style.cssText = `
                position: absolute;
                width: 2px;
                height: 20px;
                background: linear-gradient(180deg, #00D4FF, #FF0080);
                top: 50%;
                left: 50%;
                transform-origin: bottom;
                transform: translate(-50%, -100%) rotate(${i * 45}deg);
                animation: electric-burst 0.4s ease-out forwards;
                box-shadow: 0 0 10px currentColor;
                pointer-events: none;
            `;
            
            button.appendChild(burst);
            setTimeout(() => burst.remove(), 400);
        }
    }

    activateElectricBorder(card) {
        const border = card.querySelector('.card-lightning-border');
        if (border) {
            border.style.opacity = '1';
            border.style.animation = 'electric-border-flow 1s linear infinite';
        }
    }

    deactivateElectricBorder(card) {
        const border = card.querySelector('.card-lightning-border');
        if (border) {
            border.style.opacity = '0';
            border.style.animation = 'none';
        }
    }

    startCyberpunkAnimations() {
        // Start continuous background effects
        this.animateLightningGrid();
        this.animateCircuitFlow();
    }

    animateLightningGrid() {
        const grid = document.querySelector('.lightning-grid');
        if (grid) {
            setInterval(() => {
                grid.style.backgroundImage = `
                    linear-gradient(rgba(0, 212, 255, ${0.1 + Math.random() * 0.2}) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 136, ${0.1 + Math.random() * 0.2}) 1px, transparent 1px)
                `;
            }, 2000);
        }
    }

    animateCircuitFlow() {
        const circuit = document.querySelector('.circuit-lines');
        if (circuit) {
            setInterval(() => {
                const colors = ['#00D4FF', '#00FF88', '#FF0080', '#FFFF00'];
                const color1 = colors[Math.floor(Math.random() * colors.length)];
                const color2 = colors[Math.floor(Math.random() * colors.length)];
                
                circuit.style.backgroundImage = `
                    radial-gradient(circle at 20% 20%, rgba(${this.hexToRgb(color1)}, 0.3) 2px, transparent 2px),
                    radial-gradient(circle at 80% 80%, rgba(${this.hexToRgb(color2)}, 0.3) 2px, transparent 2px)
                `;
            }, 3000);
        }
    }

    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkNeon();
});

// Add CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            @keyframes cursor-explosion {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(4); opacity: 0; }
            }
            
            @keyframes electric-spark {
                0% { opacity: 0; transform: scaleY(0); }
                50% { opacity: 1; transform: scaleY(1); }
                100% { opacity: 0; transform: scaleY(1.2); }
            }
            
            @keyframes lightning-strike {
                0% { opacity: 0; }
                10% { opacity: 1; }
                20% { opacity: 0.8; }
                30% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes lightning-branch {
                0% { opacity: 0; transform: scaleY(0); }
                50% { opacity: 1; transform: scaleY(1); }
                100% { opacity: 0; transform: scaleY(1); }
            }
            
            @keyframes data-fall {
                0% { transform: translateY(-100vh); opacity: 0.8; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
            
            @keyframes lightning-sweep {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
            @keyframes click-wave {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 200px; height: 200px; opacity: 0; }
            }
            
            @keyframes electric-burst {
                0% { height: 0; opacity: 1; }
                100% { height: 30px; opacity: 0; }
            }
            
            @keyframes electric-border-flow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes reveal-pulse {
                0% { opacity: 0; background-position: 0% 50%; }
                50% { opacity: 0.6; background-position: 100% 50%; }
                100% { opacity: 0; background-position: 0% 50%; }
            }
            
            @keyframes stat-explosion {
                0% { height: 0; opacity: 1; }
                50% { height: 25px; opacity: 0.8; }
                100% { height: 40px; opacity: 0; }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
});