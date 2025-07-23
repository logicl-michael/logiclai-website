// Clean Corporate Gradient - Interactive Elements

'use strict';

class CleanCorporateGradient {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupEnhancedInteractions();
        this.setupParallaxEffects();
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

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    toggle.textContent = '☰';
                }
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
            lastScrollTop = Math.max(0, scrollTop);

            // Active navigation highlighting
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Animate cards and sections on scroll
        const animatedElements = document.querySelectorAll('.service-card, .stat-card, .about-content, .about-visual');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    setupEnhancedInteractions() {
        // Enhanced button hover effects
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Service card enhanced interactions
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, false);
            });
        });

        // Stat card counter animation
        this.setupCounterAnimation();

        // Enhanced logo interaction
        this.setupLogoAnimation();
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
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
            background: rgba(255, 255, 255, 0.6);
            transform: translate(-50%, -50%);
            animation: ripple-clean 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        button.style.position = button.style.position || 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    animateServiceCard(card, isEntering) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        const text = card.querySelector('p');

        if (isEntering) {
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 4px 8px rgba(61, 133, 198, 0.3))';
            }
            if (title) {
                title.style.color = '#3d85c6';
            }
            if (text) {
                text.style.color = '#555555';
            }
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            }
            if (title) {
                title.style.color = '';
            }
            if (text) {
                text.style.color = '';
            }
        }
    }

    setupCounterAnimation() {
        const counterElements = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (!number) return;

        const suffix = text.replace(/[\d]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    setupLogoAnimation() {
        const logos = document.querySelectorAll('.logo');
        
        logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                const aiPart = logo.querySelector('.ai-part');
                const logicPart = logo.querySelector('.logic-part');
                
                if (aiPart) {
                    aiPart.style.transform = 'scale(1.1)';
                    aiPart.style.textShadow = '0 0 10px rgba(61, 133, 198, 0.5)';
                }
                if (logicPart) {
                    logicPart.style.transform = 'scale(1.05)';
                }
            });

            logo.addEventListener('mouseleave', () => {
                const aiPart = logo.querySelector('.ai-part');
                const logicPart = logo.querySelector('.logic-part');
                
                if (aiPart) {
                    aiPart.style.transform = 'scale(1)';
                    aiPart.style.textShadow = 'none';
                }
                if (logicPart) {
                    logicPart.style.transform = 'scale(1)';
                }
            });
        });
    }

    setupParallaxEffects() {
        const shapes = document.querySelectorAll('.shape');
        const floatingElements = document.querySelectorAll('.floating-element');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const scrollPercent = scrollTop / window.innerHeight;

            // Parallax for background shapes
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                shape.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollPercent * 30}deg)`;
            });

            // Enhanced floating animation based on scroll
            floatingElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform += ` translateY(${scrollTop * speed}px)`;
            });
        });
    }

    // Utility method to add smooth transitions to elements
    addSmoothTransitions() {
        const elements = document.querySelectorAll('.service-card, .stat-card, .cta-button, .nav-links a');
        elements.forEach(element => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CleanCorporateGradient();
});

// Add additional CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const additionalStyles = `
        <style>
            @keyframes ripple-clean {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }

            .nav-links a.active {
                color: #3d85c6;
                background: #f0f7ff;
            }

            .nav-links a.active::after {
                width: 80%;
            }

            .service-card h3,
            .service-card p {
                transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .logo .ai-part,
            .logo .logic-part {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .hero-title {
                animation: gentle-glow 4s ease-in-out infinite alternate;
            }

            @keyframes gentle-glow {
                from {
                    filter: drop-shadow(0 0 5px rgba(61, 133, 198, 0.2));
                }
                to {
                    filter: drop-shadow(0 0 15px rgba(61, 133, 198, 0.4));
                }
            }

            .floating-element {
                animation: float-gentle 6s ease-in-out infinite;
            }

            @keyframes float-gentle {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-15px) rotate(180deg);
                }
            }

            .stat-card:hover .stat-number {
                animation: pulse-stat 0.6s ease;
                color: #2196F3;
            }

            @keyframes pulse-stat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
});