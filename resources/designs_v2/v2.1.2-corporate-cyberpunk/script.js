// V2.1.2: Corporate Cyberpunk - Professional with Refined Effects

'use strict';

class CorporateCyberpunk {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupCorporateCursor();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupCorporateParticles();
        this.setupSubtleEffects();
        this.setupScrollEffects();
        this.setupStatCounters();
        this.setupRevealAnimations();
        this.setupProfessionalInteractions();
        this.startCorporateAnimations();
    }

    setupCorporateCursor() {
        if (window.innerWidth <= 768) return;

        const cursor = document.getElementById('corporateCursor');
        const cursorCore = cursor.querySelector('.cursor-core');
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
            const ease = 0.12;
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Professional cursor interactions
        document.querySelectorAll('.corporate-button, .nav-link, .corporate-logo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.3)';
                cursorCore.style.background = '#5ba0f2';
                cursorRing.style.borderColor = '#5ba0f2';
                this.createSubtlePulse(el);
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorCore.style.background = '#3d85c6';
                cursorRing.style.borderColor = 'rgba(61, 133, 198, 0.4)';
            });
        });

        // Card hover effects
        document.querySelectorAll('.vision-card, .solution-card, .arch-content').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.8)';
                this.createFocusIndicator(el);
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                this.clearFocusIndicator(el);
            });
        });
    }

    createSubtlePulse(element) {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            width: 20px;
            height: 20px;
            left: ${this.mouse.x - 10}px;
            top: ${this.mouse.y - 10}px;
            border: 1px solid rgba(61, 133, 198, 0.6);
            border-radius: 50%;
            animation: subtle-pulse 0.6s ease-out forwards;
        `;

        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 600);
    }

    createFocusIndicator(element) {
        const indicator = document.createElement('div');
        indicator.className = 'focus-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            width: 8px;
            height: 8px;
            background: #3d85c6;
            border-radius: 50%;
            box-shadow: 0 0 10px #3d85c6;
            animation: focus-blink 1.5s ease-in-out infinite;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.appendChild(indicator);
    }

    clearFocusIndicator(element) {
        const indicator = element.querySelector('.focus-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('corporateNav');

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
        const menuItems = document.querySelectorAll('.corporate-nav .nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-15px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.3s ease';
            }, index * 80);
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

    setupCorporateParticles() {
        const container = document.getElementById('corporateParticles');
        if (!container) return;

        // Create fewer, more subtle particles for corporate feel
        for (let i = 0; i < 12; i++) {
            this.createCorporateParticle(container);
        }

        this.animateCorporateParticles();
    }

    createCorporateParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'corporate-particle';
        
        const size = Math.random() * 2 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #3d85c6;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 2}px #3d85c6;
            pointer-events: none;
            z-index: 1;
        `;

        container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: size,
            opacity: opacity,
            pulse: Math.random() * Math.PI * 2
        });
    }

    animateCorporateParticles() {
        this.particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += 0.008;

            // Gentle bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

            // Subtle pulsing
            const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.1;

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = Math.max(0.05, pulseOpacity);
        });

        requestAnimationFrame(() => this.animateCorporateParticles());
    }

    setupSubtleEffects() {
        const heroEffects = document.getElementById('heroEffects');
        if (!heroEffects) return;

        // Create subtle professional effects
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createDataPoint(heroEffects);
            }
        }, 3000);
    }

    createDataPoint(container) {
        const point = document.createElement('div');
        point.className = 'data-point';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        point.style.cssText = `
            position: absolute;
            width: 1px;
            height: 20px;
            background: linear-gradient(180deg, #3d85c6, transparent);
            left: ${x}px;
            top: ${y}px;
            opacity: 0;
            animation: data-appear 2s ease-out forwards;
            box-shadow: 0 0 5px #3d85c6;
        `;

        container.appendChild(point);
        setTimeout(() => point.remove(), 2000);
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Header effects
            if (scrollTop > 50) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Auto-hide header
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Subtle parallax effects
            this.updateParallaxEffects(scrollTop);
        });
    }

    updateParallaxEffects(scrollTop) {
        const depthLayers = document.querySelector('.depth-layers');
        if (depthLayers) {
            const translateY = scrollTop * 0.05;
            depthLayers.style.transform = `translateY(${translateY}px)`;
        }
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
        const duration = 1500;
        const increment = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
                this.createStatGlow(element);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    createStatGlow(element) {
        element.style.animation = 'stat-complete 1s ease-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.vision-card, .solution-card, .arch-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.createRevealGlow(entry.target);
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    createRevealGlow(element) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 40%, 
                rgba(61, 133, 198, 0.1) 50%, 
                transparent 60%);
            background-size: 200% 200%;
            opacity: 0;
            border-radius: inherit;
            z-index: -1;
            animation: reveal-sweep 1s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(glow);
        setTimeout(() => glow.remove(), 1000);
    }

    setupProfessionalInteractions() {
        // Button interactions
        document.querySelectorAll('.corporate-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.activateButton(button);
            });

            button.addEventListener('mouseleave', () => {
                this.deactivateButton(button);
            });

            button.addEventListener('click', (e) => {
                this.createProfessionalClickEffect(e);
            });
        });

        // Logo interactions
        const logo = document.getElementById('corporateLogo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.animateLogo();
            });
        }
    }

    activateButton(button) {
        const effect = button.querySelector('.button-effect');
        const glow = button.querySelector('.button-glow');
        
        if (effect) {
            effect.style.opacity = '0.2';
        }
        
        if (glow) {
            glow.style.animation = 'button-glow-expand 0.8s ease-out';
        }
    }

    deactivateButton(button) {
        const effect = button.querySelector('.button-effect');
        if (effect) {
            effect.style.opacity = '0';
        }
    }

    createProfessionalClickEffect(e) {
        const ripple = document.createElement('div');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(91, 160, 242, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: professional-ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;

        e.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    animateLogo() {
        const logo = document.getElementById('corporateLogo');
        const logoAccent = logo.querySelector('.logo-accent');
        
        logoAccent.style.opacity = '1';
        logoAccent.style.animation = 'logo-professional-glow 1.2s ease-out';
        
        setTimeout(() => {
            logoAccent.style.opacity = '0';
            logoAccent.style.animation = '';
        }, 1200);
    }

    startCorporateAnimations() {
        // Subtle continuous animations
        this.animateDataStream();
    }

    animateDataStream() {
        const dataStream = document.getElementById('dataStream');
        if (!dataStream) return;

        setInterval(() => {
            this.createDataCode(dataStream);
        }, 2000);
    }

    createDataCode(container) {
        const code = document.createElement('div');
        code.className = 'data-code';
        
        const codeStrings = ['01', '10', '11', '00'];
        const codeString = codeStrings[Math.floor(Math.random() * codeStrings.length)];
        
        code.textContent = codeString;
        code.style.cssText = `
            position: absolute;
            right: ${Math.random() * 50}px;
            top: -15px;
            color: rgba(61, 133, 198, 0.6);
            font-family: 'JetBrains Mono', monospace;
            font-size: ${Math.random() * 4 + 8}px;
            opacity: 0.7;
            animation: data-fall-subtle 6s linear forwards;
            text-shadow: 0 0 3px rgba(61, 133, 198, 0.5);
        `;

        container.appendChild(code);
        setTimeout(() => code.remove(), 6000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CorporateCyberpunk();
});

// Add CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            @keyframes subtle-pulse {
                0% { width: 20px; height: 20px; opacity: 0.8; }
                100% { width: 40px; height: 40px; opacity: 0; }
            }
            
            @keyframes focus-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            @keyframes data-appear {
                0% { opacity: 0; transform: translateY(10px); }
                30% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
            
            @keyframes button-glow-expand {
                0% { width: 0; height: 0; opacity: 0.3; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
            
            @keyframes professional-ripple {
                0% { width: 0; height: 0; opacity: 0.6; }
                100% { width: 80px; height: 80px; opacity: 0; }
            }
            
            @keyframes logo-professional-glow {
                0% { border-color: transparent; }
                30% { border-color: #3d85c6; box-shadow: 0 0 15px #3d85c6; }
                70% { border-color: #5ba0f2; box-shadow: 0 0 20px #5ba0f2; }
                100% { border-color: transparent; box-shadow: none; }
            }
            
            @keyframes reveal-sweep {
                0% { 
                    opacity: 0; 
                    background-position: -200% center; 
                }
                50% { 
                    opacity: 1; 
                    background-position: center center; 
                }
                100% { 
                    opacity: 0; 
                    background-position: 200% center; 
                }
            }
            
            @keyframes stat-complete {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); text-shadow: 0 0 20px #3d85c6; }
                100% { transform: scale(1); }
            }
            
            @keyframes data-fall-subtle {
                0% { transform: translateY(-50px); opacity: 0.7; }
                10% { opacity: 0.8; }
                90% { opacity: 0.6; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
});