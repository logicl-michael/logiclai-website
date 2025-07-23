// Dynamic Interactive - Advanced Interactions

'use strict';

class DynamicInteractive {
    constructor() {
        this.particles = [];
        this.cursorTrail = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupParticleSystem();
        this.setupInteractiveTimeline();
        this.setupMorphingElements();
        this.setupScrollEffects();
        this.setupStatCounters();
        this.setupRevealAnimations();
        this.setupParallaxEffects();
        this.setupAdvancedInteractions();
    }

    setupCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursorTrail = document.getElementById('cursorTrail');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursorTrail.style.left = cursorX + 'px';
            cursorTrail.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor interactions
        document.addEventListener('mouseenter', () => {
            cursorTrail.style.transform = 'scale(1)';
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.style.transform = 'scale(0)';
        });

        // Interactive elements
        document.querySelectorAll('.morphing-button, .morphing-card, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorTrail.style.transform = 'scale(2)';
                cursorTrail.style.opacity = '0.5';
            });
            el.addEventListener('mouseleave', () => {
                cursorTrail.style.transform = 'scale(1)';
                cursorTrail.style.opacity = '0.7';
            });
        });
    }

    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
                
                // Animate menu items
                if (navLinks.classList.contains('active')) {
                    this.animateMenuItems();
                }
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    toggle.textContent = '☰';
                });
            });
        }
    }

    animateMenuItems() {
        const menuItems = document.querySelectorAll('.nav-links li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 100);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target, 1000);
                }
            });
        });
    }

    smoothScrollTo(target, duration = 800) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    setupParticleSystem() {
        const heroParticles = document.getElementById('heroParticles');
        if (!heroParticles) return;

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            this.createParticle(heroParticles);
        }

        // Animate particles
        this.animateParticles();
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #3d85c6, #2196F3);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
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
            size: size
        });
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

            // Update position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animateParticles());
    }

    setupInteractiveTimeline() {
        const timeline = document.getElementById('interactiveTimeline');
        const progress = document.getElementById('timelineProgress');
        const items = document.querySelectorAll('.timeline-item');
        
        if (!timeline || !progress || !items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    this.updateTimelineProgress();
                }
            });
        }, { threshold: 0.3 });

        items.forEach(item => observer.observe(item));

        // Interactive hover effects
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.highlightTimelineItem(item, true);
            });
            item.addEventListener('mouseleave', () => {
                this.highlightTimelineItem(item, false);
            });
        });
    }

    updateTimelineProgress() {
        const progress = document.getElementById('timelineProgress');
        const items = document.querySelectorAll('.timeline-item.animate');
        const totalItems = document.querySelectorAll('.timeline-item').length;
        
        if (progress) {
            const progressPercent = (items.length / totalItems) * 100;
            progress.style.height = `${progressPercent}%`;
        }
    }

    highlightTimelineItem(item, highlight) {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        if (highlight) {
            if (marker) marker.style.transform = 'scale(1.5)';
            if (content) {
                content.style.transform = 'translateY(-10px) scale(1.02)';
                content.style.boxShadow = '0 20px 60px rgba(33, 150, 243, 0.3)';
            }
        } else {
            if (marker) marker.style.transform = 'scale(1)';
            if (content) {
                content.style.transform = 'translateY(0) scale(1)';
                content.style.boxShadow = '0 4px 20px rgba(33, 150, 243, 0.15)';
            }
        }
    }

    setupMorphingElements() {
        // Morphing buttons
        document.querySelectorAll('.morphing-button').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
                this.morphButton(button, true);
            });
            
            button.addEventListener('mouseleave', () => {
                this.morphButton(button, false);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });

        // Morphing cards
        document.querySelectorAll('.morphing-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.morphCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.morphCard(card, false);
            });
        });

        // Interactive logo
        const logo = document.getElementById('interactiveLogo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.animateLogo();
            });
        }
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = button.querySelector('.button-ripple');
        
        if (ripple) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            
            requestAnimationFrame(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                ripple.style.opacity = '0';
            });
        }
    }

    createClickEffect(e) {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Create expanding circle effect
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: expand-click 0.6s ease-out;
            pointer-events: none;
        `;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        circle.style.left = x - 25 + 'px';
        circle.style.top = y - 25 + 'px';
        circle.style.width = '50px';
        circle.style.height = '50px';
        
        button.appendChild(circle);
        
        setTimeout(() => circle.remove(), 600);
    }

    morphButton(button, isHovered) {
        const text = button.querySelector('.button-text');
        
        if (isHovered) {
            text.style.transform = 'scale(1.05)';
            button.style.letterSpacing = '0.1em';
        } else {
            text.style.transform = 'scale(1)';
            button.style.letterSpacing = '0';
        }
    }

    morphCard(card, isHovered) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        
        if (isHovered) {
            if (title) {
                title.style.transform = 'scale(1.05)';
                title.style.letterSpacing = '0.05em';
            }
            
            // Add floating particles to card
            this.addCardParticles(card);
        } else {
            if (title) {
                title.style.transform = 'scale(1)';
                title.style.letterSpacing = '0';
            }
            
            // Remove particles
            card.querySelectorAll('.card-particle').forEach(p => p.remove());
        }
    }

    addCardParticles(card) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'card-particle';
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #2196F3;
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-card-particle 2s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            
            card.appendChild(particle);
        }
    }

    animateLogo() {
        const logo = document.getElementById('interactiveLogo');
        const logicPart = logo.querySelector('.logic-part');
        const aiPart = logo.querySelector('.ai-part');
        
        // Complex animation sequence
        logo.style.animation = 'logo-spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            logicPart.style.animation = 'bounce-logic 0.6s ease';
            aiPart.style.animation = 'bounce-ai 0.6s ease 0.2s';
        }, 200);
        
        setTimeout(() => {
            logo.style.animation = '';
            logicPart.style.animation = '';
            aiPart.style.animation = '';
        }, 1500);
    }

    setupScrollEffects() {
        const header = document.getElementById('dynamicHeader');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Header effects
            if (scrollTop > 100) {
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
            
            // Update background shapes
            this.updateBackgroundShapes(scrollTop);
        });
    }

    updateBackgroundShapes(scrollTop) {
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const y = scrollTop * speed;
            const rotation = scrollTop * (0.1 + index * 0.02);
            shape.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
        });
    }

    setupStatCounters() {
        const statCards = document.querySelectorAll('.stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatCard(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }

    animateStatCard(card) {
        const numberElement = card.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-target'));
        
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                numberElement.textContent = target;
                clearInterval(counter);
                
                // Add celebration effect
                this.celebrateStatCard(card);
            } else {
                numberElement.textContent = Math.floor(current);
            }
        }, 16);
    }

    celebrateStatCard(card) {
        // Create mini fireworks effect
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #2196F3;
                border-radius: 50%;
                pointer-events: none;
                left: 50%;
                top: 30%;
                animation: firework-spark 1s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                transform-origin: center;
            `;
            
            const angle = (i * 45) * Math.PI / 180;
            spark.style.setProperty('--dx', Math.cos(angle) * 30 + 'px');
            spark.style.setProperty('--dy', Math.sin(angle) * 30 + 'px');
            
            card.appendChild(spark);
            
            setTimeout(() => spark.remove(), 1000);
        }
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-animation');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 200);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.02);
                const y = scrolled * speed;
                element.style.transform = `translate3d(0, ${y}px, 0)`;
            });
        });
    }

    setupAdvancedInteractions() {
        // Magnetic button effect
        document.querySelectorAll('.morphing-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        // Floating network interactions
        const networkNodes = document.querySelectorAll('.network-node');
        networkNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'scale(2)';
                node.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.8)';
                
                // Animate connections
                document.querySelectorAll('.connection').forEach(conn => {
                    conn.style.strokeWidth = '4';
                    conn.style.opacity = '1';
                });
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = 'scale(1)';
                node.style.boxShadow = 'none';
                
                document.querySelectorAll('.connection').forEach(conn => {
                    conn.style.strokeWidth = '2';
                    conn.style.opacity = '0.3';
                });
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicInteractive();
});

// Add CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            @keyframes expand-click {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes float-card-particle {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 0.5;
                }
            }
            
            @keyframes logo-spin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes bounce-logic {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.3) rotate(-10deg); }
            }
            
            @keyframes bounce-ai {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.4) rotate(15deg); }
            }
            
            @keyframes firework-spark {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--dx), var(--dy)) scale(0);
                    opacity: 0;
                }
            }
            
            .hero-particle {
                animation: particle-float 8s ease-in-out infinite;
            }
            
            @keyframes particle-float {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translateY(-30px) rotate(180deg);
                    opacity: 1;
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
});