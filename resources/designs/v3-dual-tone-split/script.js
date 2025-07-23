// Dual-Tone Split - Interactive Elements

'use strict';

class DualToneSplit {
    constructor() {
        this.currentZone = 'neutral';
        this.logo = document.getElementById('dynamicLogo');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupZoneDetection();
        this.setupDynamicLogo();
        this.setupZoneTransitions();
        this.setupTimelineAnimations();
        this.setupSplitInteractions();
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close menu when clicking nav links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    toggle.textContent = '☰';
                });
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupZoneDetection() {
        const zones = document.querySelectorAll('.logic-zone, .ai-zone');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-40% 0px -40% 0px'
        };

        const zoneObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('logic-zone')) {
                        this.enterZone('logic');
                    } else if (entry.target.classList.contains('ai-zone')) {
                        this.enterZone('ai');
                    }
                }
            });
        }, observerOptions);

        zones.forEach(zone => {
            zoneObserver.observe(zone);
        });

        // Scroll-based zone detection for split sections
        window.addEventListener('scroll', () => {
            this.detectCurrentZone();
        });
    }

    detectCurrentZone() {
        const splitSections = document.querySelectorAll('.split-container');
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        splitSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                const centerX = window.innerWidth / 2;
                const mouseX = this.lastMouseX || centerX;
                
                if (mouseX < centerX) {
                    this.enterZone('logic');
                } else {
                    this.enterZone('ai');
                }
            }
        });
    }

    enterZone(zone) {
        if (this.currentZone === zone) return;
        
        this.currentZone = zone;
        this.updateUI(zone);
        this.updateLogo(zone);
        this.updateCursor(zone);
    }

    updateUI(zone) {
        document.body.classList.remove('in-logic-zone', 'in-ai-zone', 'in-neutral-zone');
        document.body.classList.add(`in-${zone}-zone`);

        // Update header based on zone
        const header = document.querySelector('.header');
        if (header) {
            header.classList.remove('logic-header', 'ai-header');
            if (zone !== 'neutral') {
                header.classList.add(`${zone}-header`);
            }
        }
    }

    updateLogo(zone) {
        if (!this.logo) return;

        this.logo.classList.remove('logo-in-logic-zone', 'logo-in-ai-zone');
        
        if (zone === 'logic') {
            this.logo.classList.add('logo-in-logic-zone');
        } else if (zone === 'ai') {
            this.logo.classList.add('logo-in-ai-zone');
        }
    }

    updateCursor(zone) {
        const cursor = zone === 'logic' ? 'crosshair' : 
                     zone === 'ai' ? 'pointer' : 'default';
        document.body.style.cursor = cursor;
    }

    setupDynamicLogo() {
        if (!this.logo) return;

        // Logo hover animations
        this.logo.addEventListener('mouseenter', () => {
            this.animateLogoHover(true);
        });

        this.logo.addEventListener('mouseleave', () => {
            this.animateLogoHover(false);
        });
    }

    animateLogoHover(isHovering) {
        const logicPart = this.logo.querySelector('.logic-part');
        const aiPart = this.logo.querySelector('.ai-part');

        if (isHovering) {
            logicPart.style.transform = 'scale(1.1) rotate(-5deg)';
            aiPart.style.transform = 'scale(1.1) rotate(5deg)';
            logicPart.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
            aiPart.style.textShadow = '0 0 15px rgba(77, 148, 219, 0.8)';
        } else {
            logicPart.style.transform = 'scale(1) rotate(0deg)';
            aiPart.style.transform = 'scale(1) rotate(0deg)';
            logicPart.style.textShadow = '';
            aiPart.style.textShadow = '';
        }
    }

    setupZoneTransitions() {
        const splitContainers = document.querySelectorAll('.split-container');

        splitContainers.forEach(container => {
            // Mouse tracking for zone interactions
            container.addEventListener('mousemove', (e) => {
                this.lastMouseX = e.clientX;
                const centerX = window.innerWidth / 2;
                const logicZone = container.querySelector('.logic-zone');
                const aiZone = container.querySelector('.ai-zone');

                if (e.clientX < centerX) {
                    this.highlightZone(logicZone, aiZone, 'logic');
                } else {
                    this.highlightZone(aiZone, logicZone, 'ai');
                }
            });

            container.addEventListener('mouseleave', () => {
                this.resetZoneHighlight(container);
            });
        });
    }

    highlightZone(activeZone, inactiveZone, zoneType) {
        activeZone.style.transform = 'scale(1.02)';
        activeZone.style.filter = 'brightness(1.1)';
        inactiveZone.style.transform = 'scale(0.98)';
        inactiveZone.style.filter = 'brightness(0.9)';

        // Update zone content animations
        this.animateZoneContent(activeZone, true);
        this.animateZoneContent(inactiveZone, false);
    }

    resetZoneHighlight(container) {
        const zones = container.querySelectorAll('.logic-zone, .ai-zone');
        zones.forEach(zone => {
            zone.style.transform = 'scale(1)';
            zone.style.filter = 'brightness(1)';
            this.animateZoneContent(zone, false);
        });
    }

    animateZoneContent(zone, isActive) {
        const features = zone.querySelectorAll('.feature-item, .expertise-list li');
        features.forEach((feature, index) => {
            if (isActive) {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.background = 'rgba(255, 255, 255, 0.2)';
                }, index * 100);
            } else {
                feature.style.transform = 'translateX(0)';
                feature.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    }

    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.animateTimelineItem(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            timelineObserver.observe(item);
        });
    }

    animateTimelineItem(item) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Animate the service split percentages
        const percentages = item.querySelectorAll('.logic-percentage, .ai-percentage');
        percentages.forEach((percentage, index) => {
            setTimeout(() => {
                percentage.style.transform = 'scale(1.2)';
                percentage.style.fontWeight = '700';
                
                setTimeout(() => {
                    percentage.style.transform = 'scale(1)';
                }, 300);
            }, 500 + (index * 200));
        });
    }

    setupSplitInteractions() {
        // Intersection point interaction
        const intersectionPoints = document.querySelectorAll('.intersection-point');
        
        intersectionPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                point.style.transform = 'translate(-50%, -50%) scale(1.3) rotate(45deg)';
                point.style.background = 'linear-gradient(45deg, #333333, #3d85c6)';
                
                const plusSymbol = point.querySelector('.plus-symbol');
                if (plusSymbol) {
                    plusSymbol.style.color = '#ffffff';
                    plusSymbol.textContent = '⚡';
                }
            });

            point.addEventListener('mouseleave', () => {
                point.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
                point.style.background = '#ffffff';
                
                const plusSymbol = point.querySelector('.plus-symbol');
                if (plusSymbol) {
                    plusSymbol.style.color = '#5a6b7a';
                    plusSymbol.textContent = '+';
                }
            });
        });

        // Fusion cards interaction
        const fusionCards = document.querySelectorAll('.fusion-card');
        
        fusionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateFusionCard(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateFusionCard(card, false);
            });
        });
    }

    animateFusionCard(card, isHovering) {
        const icon = card.querySelector('.card-icon');
        const header = card.querySelector('.card-header h3');

        if (isHovering) {
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            }
            if (header) {
                if (card.classList.contains('logic-influenced')) {
                    header.style.color = '#333333';
                } else if (card.classList.contains('ai-influenced')) {
                    header.style.color = '#3d85c6';
                } else {
                    header.style.background = 'linear-gradient(45deg, #333333, #3d85c6)';
                    header.style.webkitBackgroundClip = 'text';
                    header.style.webkitTextFillColor = 'transparent';
                }
            }
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            }
            if (header) {
                header.style.color = '';
                header.style.background = '';
                header.style.webkitBackgroundClip = '';
                header.style.webkitTextFillColor = '';
            }
        }
    }

    // Utility method for creating dynamic visual effects
    createZoneParticles(zone, count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${zone === 'logic' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(77, 148, 219, 0.6)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-zone-particle ${Math.random() * 5 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 1;
            `;

            const zoneElement = document.querySelector(`.${zone}-zone`);
            if (zoneElement) {
                zoneElement.appendChild(particle);
                
                setTimeout(() => particle.remove(), 8000);
            }
        }
    }

    // Enhanced scroll-based logo animation
    updateScrollBasedEffects() {
        const scrollPercent = window.pageYOffset / document.body.scrollHeight;
        
        // Logo rotation based on scroll
        if (this.logo) {
            const logicPart = this.logo.querySelector('.logic-part');
            const aiPart = this.logo.querySelector('.ai-part');
            
            if (logicPart && aiPart) {
                logicPart.style.transform = `rotate(${scrollPercent * -180}deg)`;
                aiPart.style.transform = `rotate(${scrollPercent * 180}deg)`;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dualToneSplit = new DualToneSplit();
    
    // Enhanced scroll effects
    window.addEventListener('scroll', () => {
        dualToneSplit.updateScrollBasedEffects();
    });
});

// Add additional CSS animations
document.addEventListener('DOMContentLoaded', () => {
    const additionalStyles = `
        <style>
            @keyframes float-zone-particle {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-30px) rotate(180deg);
                    opacity: 1;
                }
            }

            .logic-header {
                background: linear-gradient(135deg, #333333 0%, #4a4a4a 100%);
            }

            .ai-header {
                background: linear-gradient(135deg, #3d85c6 0%, #2196F3 100%);
            }

            .in-logic-zone .nav-links a:hover {
                color: #ffffff;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }

            .in-ai-zone .nav-links a:hover {
                color: #4d94db;
                text-shadow: 0 0 10px rgba(77, 148, 219, 0.5);
            }

            .zone-content {
                animation: gentle-float 6s ease-in-out infinite;
            }

            @keyframes gentle-float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .timeline-marker {
                animation: pulse-marker 2s ease-in-out infinite;
            }

            @keyframes pulse-marker {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.2); }
            }

            .plus-symbol {
                animation: rotate-plus 8s linear infinite;
            }

            @keyframes rotate-plus {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
});