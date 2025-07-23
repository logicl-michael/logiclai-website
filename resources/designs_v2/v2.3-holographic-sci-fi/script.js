// V2.3: Holographic Sci-Fi - Professional Interface Interactions

'use strict';

class HolographicInterface {
    constructor() {
        this.dataPoints = [];
        this.mouse = { x: 0, y: 0 };
        this.scanLines = [];
        this.interfaceElements = [];
        this.init();
    }

    init() {
        this.setupHolographicCursor();
        this.setupMobileInterface();
        this.setupSmoothScrolling();
        this.setupDataLayers();
        this.setupInterfaceAnimations();
        this.setupScrollEffects();
        this.setupRevealAnimations();
        this.setupInteractiveElements();
        this.setupSystemMonitoring();
        this.initializeInterface();
    }

    setupHolographicCursor() {
        if (window.innerWidth <= 768) return;

        const cursor = document.getElementById('holoCursor');
        const crosshair = cursor.querySelector('.cursor-crosshair');
        const scanLine = cursor.querySelector('.cursor-scan-line');
        
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

        // Enhanced cursor interactions
        document.querySelectorAll('.holo-button, .nav-link, .logo-holo').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                crosshair.style.filter = 'brightness(1.5)';
                this.createTargetLock(el);
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                crosshair.style.filter = 'brightness(1)';
                this.clearTargetLock(el);
            });
        });

        // Interface panel interactions
        document.querySelectorAll('.matrix-item, .app-module, .paradigm-panel').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                this.activateInterfaceScanning(el);
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                this.deactivateInterfaceScanning(el);
            });
        });
    }

    createTargetLock(element) {
        const lock = document.createElement('div');
        lock.className = 'target-lock';
        lock.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border: 1px solid #00bcd4;
            pointer-events: none;
            opacity: 0;
            animation: target-lock 0.3s ease forwards;
            z-index: 100;
        `;

        element.style.position = 'relative';
        element.appendChild(lock);
    }

    clearTargetLock(element) {
        const lock = element.querySelector('.target-lock');
        if (lock) {
            lock.style.animation = 'target-unlock 0.2s ease forwards';
            setTimeout(() => lock.remove(), 200);
        }
    }

    activateInterfaceScanning(element) {
        // Create scanning lines
        for (let i = 0; i < 3; i++) {
            const scanLine = document.createElement('div');
            scanLine.className = 'interface-scan-line';
            scanLine.style.cssText = `
                position: absolute;
                top: ${20 + i * 30}%;
                left: 0;
                width: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, #3d85c6, transparent);
                animation: interface-scan 1.5s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
                z-index: 10;
            `;
            
            element.appendChild(scanLine);
        }
    }

    deactivateInterfaceScanning(element) {
        element.querySelectorAll('.interface-scan-line').forEach(line => {
            line.remove();
        });
    }

    setupMobileInterface() {
        const toggle = document.getElementById('mobileInterfaceToggle');
        const nav = document.getElementById('navInterface');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                this.animateToggle(toggle, nav.classList.contains('active'));
                
                if (nav.classList.contains('active')) {
                    this.initializeMobileInterface();
                }
            });

            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    this.animateToggle(toggle, false);
                });
            });
        }
    }

    animateToggle(toggle, isActive) {
        const lines = toggle.querySelectorAll('.toggle-line');
        if (isActive) {
            lines[0].style.transform = 'rotate(45deg) translateY(5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translateY(-5px)';
        } else {
            lines[0].style.transform = 'rotate(0) translateY(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translateY(0)';
        }
    }

    initializeMobileInterface() {
        const menuItems = document.querySelectorAll('.nav-interface .nav-link');
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
                    this.executeScrollProtocol(target);
                }
            });
        });
    }

    executeScrollProtocol(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const scrollAnimation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, 1000);
            window.scrollTo(0, run);
            if (timeElapsed < 1000) requestAnimationFrame(scrollAnimation);
        };

        requestAnimationFrame(scrollAnimation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    setupDataLayers() {
        const container = document.getElementById('dataLayers');
        if (!container) return;

        // Create holographic data points
        for (let i = 0; i < 20; i++) {
            this.createDataPoint(container);
        }

        this.animateDataLayers();
    }

    createDataPoint(container) {
        const point = document.createElement('div');
        point.className = 'data-point';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.3 + 0.1;
        
        point.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #3d85c6;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 3}px #3d85c6;
            pointer-events: none;
            z-index: 1;
        `;

        container.appendChild(point);
        
        this.dataPoints.push({
            element: point,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: size,
            opacity: opacity,
            phase: Math.random() * Math.PI * 2
        });
    }

    animateDataLayers() {
        this.dataPoints.forEach((point) => {
            point.x += point.vx;
            point.y += point.vy;
            point.phase += 0.01;

            // Bounce off edges
            if (point.x <= 0 || point.x >= window.innerWidth) point.vx *= -1;
            if (point.y <= 0 || point.y >= window.innerHeight) point.vy *= -1;

            // Subtle pulsing
            const pulseOpacity = point.opacity + Math.sin(point.phase) * 0.1;

            point.element.style.left = point.x + 'px';
            point.element.style.top = point.y + 'px';
            point.element.style.opacity = Math.max(0.05, pulseOpacity);
        });

        requestAnimationFrame(() => this.animateDataLayers());
    }

    setupInterfaceAnimations() {
        // Animate intelligence graph
        const graph = document.getElementById('intelligenceGraph');
        if (graph) {
            this.initializeIntelligenceGraph(graph);
        }

        // Status indicators
        this.animateStatusIndicators();
    }

    initializeIntelligenceGraph(graph) {
        // Create data visualization
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: ${20 + i * 30}px;
                width: 20px;
                height: 0;
                background: linear-gradient(180deg, #3d85c6, #00bcd4);
                animation: bar-grow 2s ease ${i * 0.2}s forwards;
                box-shadow: 0 0 10px rgba(61, 133, 198, 0.5);
            `;
            
            const targetHeight = Math.random() * 120 + 40;
            bar.style.setProperty('--target-height', targetHeight + 'px');
            
            graph.appendChild(bar);
        }
    }

    animateStatusIndicators() {
        setInterval(() => {
            document.querySelectorAll('.status-indicator, .status-light').forEach(indicator => {
                if (Math.random() < 0.1) {
                    indicator.style.animation = 'none';
                    setTimeout(() => {
                        indicator.style.animation = '';
                    }, 100);
                }
            });
        }, 3000);
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
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.9)';
                header.style.boxShadow = 'none';
            }
            
            // Auto-hide header
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Update interface based on scroll
            this.updateInterfaceState(scrollProgress);
        });
    }

    updateInterfaceState(progress) {
        // Update data layers based on scroll
        const dataLayers = document.getElementById('dataLayers');
        if (dataLayers) {
            const intensity = 0.5 + progress * 0.5;
            dataLayers.style.opacity = intensity;
        }

        // Update grid intensity
        const grid = document.querySelector('.holographic-grid');
        if (grid) {
            const gridOpacity = 0.3 + progress * 0.3;
            grid.style.opacity = Math.min(gridOpacity, 0.6);
        }
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.matrix-item, .app-module, .paradigm-panel'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.activateInterfaceElement(entry.target);
                    }, index * 200);
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -30px 0px' 
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    activateInterfaceElement(element) {
        // Create activation effect
        const activation = document.createElement('div');
        activation.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 30%, 
                rgba(61, 133, 198, 0.1) 50%, 
                transparent 70%);
            background-size: 200% 200%;
            opacity: 0;
            z-index: -1;
            animation: interface-activation 1.5s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.appendChild(activation);
        setTimeout(() => activation.remove(), 1500);
    }

    setupInteractiveElements() {
        // Button interactions
        document.querySelectorAll('.holo-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.activateButton(button);
            });

            button.addEventListener('mouseleave', () => {
                this.deactivateButton(button);
            });

            button.addEventListener('click', (e) => {
                this.executeButtonProtocol(e);
            });
        });

        // Panel interactions
        document.querySelectorAll('.paradigm-panel').forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                this.highlightParadigm(panel);
            });
            
            panel.addEventListener('mouseleave', () => {
                this.resetParadigmView();
            });
        });

        // Logo interactions
        const logo = document.getElementById('logoHolo');
        if (logo) {
            logo.addEventListener('click', () => {
                this.executeSystemDiagnostic();
            });
        }
    }

    activateButton(button) {
        const scanner = button.querySelector('.btn-scanner');
        if (scanner) {
            scanner.style.animation = 'btn-scan 0.8s ease-out';
        }

        // Create activation indicators
        this.createButtonIndicators(button);
    }

    deactivateButton(button) {
        // Remove temporary indicators
        button.querySelectorAll('.btn-indicator').forEach(indicator => {
            indicator.remove();
        });
    }

    createButtonIndicators(button) {
        for (let i = 0; i < 4; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'btn-indicator';
            indicator.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00bcd4;
                border-radius: 50%;
                top: ${10 + i * 5}px;
                right: 10px;
                animation: indicator-blink 0.3s ease ${i * 0.1}s;
                box-shadow: 0 0 5px #00bcd4;
                z-index: 10;
            `;
            
            button.appendChild(indicator);
        }
    }

    executeButtonProtocol(e) {
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
            background: radial-gradient(circle, rgba(61, 133, 198, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: protocol-ripple 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 15;
        `;

        e.currentTarget.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    highlightParadigm(activePanel) {
        document.querySelectorAll('.paradigm-panel').forEach(panel => {
            if (panel !== activePanel) {
                panel.style.opacity = '0.5';
                panel.style.filter = 'blur(1px)';
            }
        });

        // Highlight synthesis node
        const synthesisNode = document.querySelector('.connection-node');
        if (synthesisNode) {
            synthesisNode.style.transform = 'scale(1.2)';
            synthesisNode.style.filter = 'brightness(1.5)';
        }
    }

    resetParadigmView() {
        document.querySelectorAll('.paradigm-panel').forEach(panel => {
            panel.style.opacity = '1';
            panel.style.filter = 'none';
        });

        const synthesisNode = document.querySelector('.connection-node');
        if (synthesisNode) {
            synthesisNode.style.transform = 'scale(1)';
            synthesisNode.style.filter = 'brightness(1)';
        }
    }

    executeSystemDiagnostic() {
        const logo = document.getElementById('logoHolo');
        const interface = logo.querySelector('.logo-interface');
        
        // Animate logo diagnostic
        interface.style.animation = 'system-diagnostic 2s ease-out';
        
        // Create diagnostic overlay
        const diagnostic = document.createElement('div');
        diagnostic.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(61, 133, 198, 0.05);
            z-index: 9990;
            animation: diagnostic-sweep 2s ease-out forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(diagnostic);
        setTimeout(() => diagnostic.remove(), 2000);
    }

    setupSystemMonitoring() {
        // Monitor performance bars
        document.querySelectorAll('.performance-bar .bar-fill').forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animatePerformanceBar(bar);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(bar);
        });

        // System status monitoring
        this.startSystemMonitoring();
    }

    animatePerformanceBar(bar) {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-out';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    }

    startSystemMonitoring() {
        setInterval(() => {
            // Randomly update status indicators
            document.querySelectorAll('.status-indicator.active').forEach(indicator => {
                if (Math.random() < 0.05) {
                    indicator.style.animation = 'status-alert 0.5s ease-out';
                    setTimeout(() => {
                        indicator.style.animation = '';
                    }, 500);
                }
            });
        }, 2000);
    }

    initializeInterface() {
        // System boot sequence
        this.executeBootSequence();
    }

    executeBootSequence() {
        const bootMessages = [
            'Initializing holographic interface...',
            'Loading KI-Solver protocols...',
            'Establishing neural connections...',
            'System ready.'
        ];

        let messageIndex = 0;
        const showMessage = () => {
            if (messageIndex < bootMessages.length) {
                console.log(`%c${bootMessages[messageIndex]}`, 
                    'color: #3d85c6; font-family: monospace; font-size: 12px;');
                messageIndex++;
                setTimeout(showMessage, 800);
            }
        };

        setTimeout(showMessage, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HolographicInterface();
});

// Add CSS animations via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            @keyframes target-lock {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes target-unlock {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.1); }
            }
            
            @keyframes interface-scan {
                0% { width: 0; left: 0; }
                50% { width: 100%; left: 0; }
                100% { width: 0; left: 100%; }
            }
            
            @keyframes btn-scan {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            @keyframes indicator-blink {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
            
            @keyframes protocol-ripple {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 150px; height: 150px; opacity: 0; }
            }
            
            @keyframes interface-activation {
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
            
            @keyframes system-diagnostic {
                0% { border-color: transparent; }
                25% { border-color: #3d85c6; box-shadow: 0 0 20px #3d85c6; }
                50% { border-color: #00bcd4; box-shadow: 0 0 20px #00bcd4; }
                75% { border-color: #3d85c6; box-shadow: 0 0 20px #3d85c6; }
                100% { border-color: transparent; box-shadow: none; }
            }
            
            @keyframes diagnostic-sweep {
                0% { 
                    background: linear-gradient(90deg, transparent 0%, rgba(61, 133, 198, 0.1) 50%, transparent 100%);
                    background-position: -100% center;
                    background-size: 100% 100%;
                }
                100% { 
                    background-position: 200% center;
                }
            }
            
            @keyframes bar-grow {
                0% { height: 0; }
                100% { height: var(--target-height); }
            }
            
            @keyframes status-alert {
                0%, 100% { background: #00bcd4; }
                50% { background: #ff9800; box-shadow: 0 0 15px #ff9800; }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
});