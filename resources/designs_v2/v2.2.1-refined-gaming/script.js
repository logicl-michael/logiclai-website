// V2.2.1: Refined Gaming - No Custom Cursor, Optimized Performance

'use strict';

class RefinedGaming {
    constructor() {
        this.floatingOrbs = [];
        this.init();
    }

    init() {
        // No custom cursor setup - using default browser cursor
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupFloatingOrbs();
        this.setupScrollEffects();
        this.setupRevealAnimations();
        this.setupInteractiveElements();
        this.setupGlowEffects();
        this.startBackgroundAnimations();
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const nav = document.getElementById('navLinks');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
                
                if (nav.classList.contains('active')) {
                    this.animateMobileMenuItems();
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

    animateMobileMenuItems() {
        const menuItems = document.querySelectorAll('.nav-links .nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
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

    setupFloatingOrbs() {
        const container = document.getElementById('floatingOrbs');
        if (!container) return;

        // Create subtle floating orbs
        for (let i = 0; i < 6; i++) {
            this.createFloatingOrb(container);
        }

        this.animateFloatingOrbs();
    }

    createFloatingOrb(container) {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        
        const size = Math.random() * 80 + 40;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.1 + 0.05;
        
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(61, 133, 198, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            filter: blur(1px);
            z-index: 1;
        `;

        container.appendChild(orb);
        
        this.floatingOrbs.push({
            element: orb,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: size,
            opacity: opacity,
            pulse: Math.random() * Math.PI * 2
        });
    }

    animateFloatingOrbs() {
        this.floatingOrbs.forEach((orb) => {
            orb.x += orb.vx;
            orb.y += orb.vy;
            orb.pulse += 0.01;

            // Bounce off edges
            if (orb.x <= 0 || orb.x >= window.innerWidth - orb.size) orb.vx *= -1;
            if (orb.y <= 0 || orb.y >= window.innerHeight - orb.size) orb.vy *= -1;

            // Subtle pulsing
            const pulseOpacity = orb.opacity + Math.sin(orb.pulse) * 0.02;

            orb.element.style.left = orb.x + 'px';
            orb.element.style.top = orb.y + 'px';
            orb.element.style.background = 
                `radial-gradient(circle, rgba(61, 133, 198, ${pulseOpacity}) 0%, transparent 70%)`;
        });

        requestAnimationFrame(() => this.animateFloatingOrbs());
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrollTop / documentHeight;
            
            // Header effects
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Update background animations based on scroll
            this.updateScrollBasedAnimations(scrollTop);
        });
    }

    updateScrollBasedAnimations(scrollTop) {
        // Parallax effect for background mesh
        const mesh = document.getElementById('gradientMesh');
        if (mesh) {
            const translateY = scrollTop * 0.1;
            mesh.style.transform = `translate(0, ${translateY}px) rotate(${scrollTop * 0.01}deg)`;
        }

        // Update grid opacity based on scroll
        const grid = document.querySelector('.subtle-grid');
        if (grid) {
            const opacity = 0.5 + (scrollTop / window.innerHeight * 0.3);
            grid.style.opacity = Math.min(opacity, 0.8);
        }
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.arch-card, .showcase-item, .intelligence-card, .result-card'
        );
        
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
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        });

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
            background: linear-gradient(45deg, transparent 30%, rgba(61, 133, 198, 0.1) 50%, transparent 70%);
            background-size: 200% 200%;
            opacity: 0;
            border-radius: inherit;
            z-index: -1;
            animation: reveal-glow 1s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(glow);
        setTimeout(() => glow.remove(), 1000);
    }

    setupInteractiveElements() {
        // Button interactions - no cursor effects, just visual feedback
        document.querySelectorAll('.refined-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.activateButtonGlow(button);
            });

            button.addEventListener('mouseleave', () => {
                this.deactivateButtonGlow(button);
            });

            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });

        // Card interactions
        document.querySelectorAll('.arch-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.activateCardEffects(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.deactivateCardEffects(card);
            });
        });

        // Intelligence card comparisons
        document.querySelectorAll('.intelligence-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightComparison(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetComparison();
            });
        });
    }

    activateButtonGlow(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.opacity = '0.4';
            glow.style.animation = 'glow-pulse 0.6s ease-out';
        }
    }

    deactivateButtonGlow(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    }

    createClickEffect(e) {
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
            background: radial-gradient(circle, rgba(91, 160, 242, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: click-ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;

        e.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    activateCardEffects(card) {
        const glowEffect = card.querySelector('.card-glow-effect');
        if (glowEffect) {
            glowEffect.style.opacity = '1';
        }

        // Add subtle floating effect without cursor dependency
        this.createFloatingSparkles(card);
    }

    deactivateCardEffects(card) {
        const glowEffect = card.querySelector('.card-glow-effect');
        if (glowEffect) {
            glowEffect.style.opacity = '0';
        }

        // Remove sparkles
        card.querySelectorAll('.floating-sparkle').forEach(sparkle => {
            sparkle.remove();
        });
    }

    createFloatingSparkles(card) {
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'floating-sparkle';
            
            sparkle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #3d85c6;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: sparkle-float 2s ease-in-out infinite;
                animation-delay: ${i * 0.3}s;
                box-shadow: 0 0 6px #3d85c6;
                z-index: 5;
            `;
            
            card.appendChild(sparkle);
        }
    }

    highlightComparison(activeCard) {
        document.querySelectorAll('.intelligence-card').forEach(card => {
            if (card !== activeCard) {
                card.style.opacity = '0.6';
                card.style.filter = 'blur(1px)';
            }
        });

        // Highlight the connector
        const connector = document.querySelector('.synthesis-connector');
        if (connector) {
            connector.style.transform = 'scale(1.1)';
            const connectorNode = connector.querySelector('.connector-node');
            if (connectorNode) {
                connectorNode.style.animation = 'connector-pulse 0.5s ease-in-out';
            }
        }
    }

    resetComparison() {
        document.querySelectorAll('.intelligence-card').forEach(card => {
            card.style.opacity = '1';
            card.style.filter = 'none';
        });

        const connector = document.querySelector('.synthesis-connector');
        if (connector) {
            connector.style.transform = 'scale(1)';
        }
    }

    setupGlowEffects() {
        // Metric item interactions
        document.querySelectorAll('.metric-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = '0 0 30px rgba(61, 133, 198, 0.3)';
                item.style.borderColor = 'rgba(61, 133, 198, 0.5)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = 'none';
                item.style.borderColor = 'rgba(61, 133, 198, 0.2)';
            });
        });

        // Logo interactions
        const logo = document.getElementById('logoRefined');
        if (logo) {
            logo.addEventListener('click', () => {
                this.animateLogo();
            });
        }
    }

    animateLogo() {
        const logo = document.getElementById('logoRefined');
        const logicPart = logo.querySelector('.logic-part');
        const aiPart = logo.querySelector('.ai-part');
        const logoGlow = logo.querySelector('.logo-glow');
        
        logoGlow.style.opacity = '1';
        logoGlow.style.animation = 'logo-glow-pulse 1s ease-out';
        
        logicPart.style.animation = 'logo-bounce 0.6s ease-out';
        aiPart.style.animation = 'logo-bounce 0.6s ease-out 0.2s';
        
        setTimeout(() => {
            logoGlow.style.opacity = '0';
            logicPart.style.animation = '';
            aiPart.style.animation = '';
        }, 1200);
    }

    startBackgroundAnimations() {
        // Start continuous subtle animations
        this.animateGradientMesh();
    }

    animateGradientMesh() {
        const mesh = document.getElementById('gradientMesh');
        if (!mesh) return;

        setInterval(() => {
            const randomX = Math.sin(Date.now() * 0.001) * 5;
            const randomY = Math.cos(Date.now() * 0.001) * 3;
            const rotation = Math.sin(Date.now() * 0.0005) * 2;
            
            mesh.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg)`;
        }, 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RefinedGaming();
});

// Add CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            @keyframes reveal-glow {
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
            
            @keyframes glow-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes click-ripple {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 100px; height: 100px; opacity: 0; }
            }
            
            @keyframes sparkle-float {
                0%, 100% { 
                    opacity: 0; 
                    transform: translateY(0) scale(0.5); 
                }
                50% { 
                    opacity: 1; 
                    transform: translateY(-10px) scale(1); 
                }
            }
            
            @keyframes connector-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes logo-glow-pulse {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
                100% { opacity: 0; transform: scale(1.1); }
            }
            
            @keyframes logo-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
});