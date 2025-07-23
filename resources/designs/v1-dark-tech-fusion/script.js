// Dark Tech Fusion - Interactive Elements

'use strict';

class DarkTechFusion {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupParticleAnimation();
        this.setupGlowEffects();
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

    setupScrollEffects() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header hide/show effect
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;

            // Parallax effect for hero glow
            const heroGlow = document.querySelector('.hero-glow');
            if (heroGlow) {
                const scrollPercent = scrollTop / window.innerHeight;
                heroGlow.style.transform = `translate(-50%, -50%) rotate(${scrollPercent * 180}deg)`;
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate sections on scroll
        document.querySelectorAll('.service-card, .stat-card').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    setupParticleAnimation() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(61, 133, 198, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroParticles.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: scale(1);
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupGlowEffects() {
        // Add glow effect to buttons and cards on hover
        const glowElements = document.querySelectorAll('.cta-button, .service-card, .stat-card');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createGlowRipple(e);
            });
        });
    }

    createGlowRipple(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(61, 133, 198, 0.3) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: ripple-glow 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = element.style.position || 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Add ripple animation
        if (!document.querySelector('#ripple-glow-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-glow-styles';
            style.textContent = `
                @keyframes ripple-glow {
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => ripple.remove(), 600);
    }

    // Typing animation for hero title
    setupTypingAnimation() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #3d85c6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkTechFusion();
});

// Add CSS animations for enhanced interactivity
document.addEventListener('DOMContentLoaded', () => {
    const additionalStyles = `
        <style>
            .service-card:hover .service-icon {
                transform: scale(1.2) rotate(10deg);
                transition: transform 0.3s ease;
            }
            
            .stat-card {
                transform-origin: center;
            }
            
            .stat-card:hover .stat-number {
                animation: pulse-number 0.6s ease;
            }
            
            @keyframes pulse-number {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .hero-title {
                animation: glow-text 3s ease-in-out infinite alternate;
            }
            
            @keyframes glow-text {
                from {
                    text-shadow: 0 0 5px rgba(61, 133, 198, 0.3);
                }
                to {
                    text-shadow: 0 0 20px rgba(61, 133, 198, 0.6), 
                                 0 0 30px rgba(61, 133, 198, 0.4);
                }
            }
            
            .nav-links a {
                position: relative;
                overflow: hidden;
            }
            
            .nav-links a::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(61, 133, 198, 0.2), transparent);
                transition: left 0.5s;
            }
            
            .nav-links a:hover::before {
                left: 100%;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
});