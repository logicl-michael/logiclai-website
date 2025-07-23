// Minimalist Professional - Subtle Interactions

'use strict';

class MinimalistProfessional {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupSubtleAnimations();
        this.setupReadingProgress();
        this.setupMinimalInteractions();
        this.setupStatCounters();
        this.setupScrollEffects();
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
        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 100; // More generous offset for minimal design
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Custom smooth scrolling with easing
                    this.smoothScrollTo(offsetPosition, 800);
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration = 600) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation.bind(this));
        }

        requestAnimationFrame(animation.bind(this));
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    setupSubtleAnimations() {
        // Intersection Observer for subtle fade-ins
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Subtle staggered animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Apply to service items, process steps, and sections
        const animatedElements = document.querySelectorAll(
            '.service-item, .process-step, .stat-item, .about-text, .contact-info'
        );

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupReadingProgress() {
        // Subtle reading progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 1px;
            background: var(--accent-primary);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupMinimalInteractions() {
        // Subtle button hover effects
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
                button.style.boxShadow = '0 4px 12px rgba(61, 133, 198, 0.2)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        });

        // Service item subtle hover effects
        document.querySelectorAll('.service-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightServiceItem(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.highlightServiceItem(item, false);
            });
        });

        // Process step hover effects
        document.querySelectorAll('.process-step').forEach(step => {
            step.addEventListener('mouseenter', () => {
                const title = step.querySelector('h4');
                if (title) {
                    title.style.color = 'var(--accent-primary)';
                }
            });

            step.addEventListener('mouseleave', () => {
                const title = step.querySelector('h4');
                if (title) {
                    title.style.color = 'var(--text-primary)';
                }
            });
        });

        // Logo minimal animation
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                const aiPart = logo.querySelector('.ai-part');
                if (aiPart) {
                    aiPart.style.transform = 'scale(1.05)';
                }
            });

            logo.addEventListener('mouseleave', () => {
                const aiPart = logo.querySelector('.ai-part');
                if (aiPart) {
                    aiPart.style.transform = 'scale(1)';
                }
            });
        }
    }

    highlightServiceItem(item, isHighlighted) {
        const number = item.querySelector('.service-number');
        const title = item.querySelector('h3');

        if (isHighlighted) {
            if (number) {
                number.style.color = 'var(--accent-primary)';
                number.style.fontWeight = 'var(--font-weight-bold)';
            }
            if (title) {
                title.style.color = 'var(--accent-primary)';
            }
            item.style.borderLeftColor = 'var(--accent-primary)';
        } else {
            if (number) {
                number.style.color = 'var(--text-muted)';
                number.style.fontWeight = 'var(--font-weight-bold)';
            }
            if (title) {
                title.style.color = 'var(--text-primary)';
            }
            item.style.borderLeftColor = 'transparent';
        }
    }

    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatNumber(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }

    animateStatNumber(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (!number) return;

        const suffix = text.replace(/[\d]/g, '');
        const duration = 1500; // Slightly slower for elegance
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

    setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Minimal header hide/show effect
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            // Add subtle shadow when scrolled
            if (scrollTop > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            }

            lastScrollTop = Math.max(0, scrollTop);
        });

        // Subtle parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.1; // Very subtle
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Typography enhancement - improve readability
    enhanceTypography() {
        // Add subtle text shadows for better readability
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-title');
        textElements.forEach(element => {
            element.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
        });

        // Improve link interactions
        const links = document.querySelectorAll('a:not(.cta-button)');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.textDecoration = 'underline';
                link.style.textDecorationThickness = '2px';
                link.style.textUnderlineOffset = '3px';
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('nav-links')) {
                    link.style.textDecoration = 'none';
                }
            });
        });
    }

    // Accessibility enhancements
    enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                background: var(--accent-primary);
                color: white;
                padding: var(--space-sm) var(--space-md);
                z-index: 1002;
                text-decoration: none;
            `;
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main landmark
        const mainContent = document.querySelector('.hero');
        if (mainContent) {
            mainContent.setAttribute('id', 'main');
            mainContent.setAttribute('role', 'main');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const minimalistProfessional = new MinimalistProfessional();
    minimalistProfessional.enhanceTypography();
    minimalistProfessional.enhanceAccessibility();
});

// Add minimal CSS enhancements
document.addEventListener('DOMContentLoaded', () => {
    const additionalStyles = `
        <style>
            /* Subtle focus indicators */
            .service-item:focus-within,
            .process-step:focus-within {
                outline: 1px solid var(--accent-primary);
                outline-offset: 4px;
            }

            /* Improved link underlines */
            .nav-links a::after {
                transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Service item border accent */
            .service-item {
                border-left: 2px solid transparent;
                transition: all 0.3s ease;
            }

            /* Subtle text selection */
            ::selection {
                background: rgba(61, 133, 198, 0.2);
                color: var(--text-primary);
            }

            /* Minimal scrollbar styling */
            ::-webkit-scrollbar {
                width: 6px;
            }

            ::-webkit-scrollbar-track {
                background: var(--bg-secondary);
            }

            ::-webkit-scrollbar-thumb {
                background: var(--border-dark);
                border-radius: 3px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: var(--accent-primary);
            }

            /* Improve button states */
            .cta-button:active {
                transform: translateY(0);
            }

            /* Subtle animation for stat items */
            .stat-item:hover .stat-number {
                transform: scale(1.05);
                transition: transform 0.2s ease;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
});