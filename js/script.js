/**
 * LogicLAI Corporate Website JavaScript
 * Professional interactive functionality
 */

'use strict';

// ============================================
// Global Variables and Configuration
// ============================================
const CONFIG = {
    cookieExpirationDays: 30,
    headerHideDelay: 100,
    animationDelay: 150,
    smoothScrollOffset: 80
};

const SELECTORS = {
    header: '.header',
    mobileMenuToggle: '.mobile-menu-toggle',
    navLinks: '.nav-links',
    navLinkItems: '.nav-links a',
    cookieBanner: '.cookie-banner',
    cookieAccept: '#cookieAccept',
    cookieDecline: '#cookieDecline',
    cookieSettings: '#cookieSettings',
    readMoreLinks: '.read-more',
    blogPostDetail: '#blog-post-detail',
    sections: '.section',
    hiddenSections: '.section-hidden',
    animatedElements: '.fade-in, .slide-in-left, .slide-in-right'
};

// ============================================
// Utility Functions
// ============================================
class Utils {
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static smoothScrollTo(target, offset = CONFIG.smoothScrollOffset) {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    static isElementInViewport(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementHeight = rect.height;
        const elementTop = rect.top;
        
        return (elementTop + (elementHeight * threshold)) < windowHeight && 
               (elementTop + elementHeight - (elementHeight * threshold)) > 0;
    }

    static addClass(element, className) {
        if (element && !element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    static removeClass(element, className) {
        if (element && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    static toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    }
}

// ============================================
// Navigation Module
// ============================================
class Navigation {
    constructor() {
        this.header = document.querySelector(SELECTORS.header);
        this.mobileMenuToggle = document.querySelector(SELECTORS.mobileMenuToggle);
        this.navLinks = document.querySelector(SELECTORS.navLinks);
        this.navLinkItems = document.querySelectorAll(SELECTORS.navLinkItems);
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupHeaderScroll();
        this.setupActiveNavigation();
    }

    setupMobileMenu() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                Utils.toggleClass(this.navLinks, 'active');
                this.updateMobileMenuIcon();
            });
        }

        // Close mobile menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                Utils.removeClass(this.navLinks, 'active');
                this.updateMobileMenuIcon();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinks && this.navLinks.classList.contains('active')) {
                if (!e.target.closest(SELECTORS.navLinks) && 
                    !e.target.closest(SELECTORS.mobileMenuToggle)) {
                    Utils.removeClass(this.navLinks, 'active');
                    this.updateMobileMenuIcon();
                }
            }
        });
    }

    updateMobileMenuIcon() {
        if (this.mobileMenuToggle) {
            const isOpen = this.navLinks && this.navLinks.classList.contains('active');
            this.mobileMenuToggle.innerHTML = isOpen ? '✕' : '☰';
            this.mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.handleSectionNavigation(target);
                    Utils.smoothScrollTo(target);
                }
            });
        });
    }

    handleSectionNavigation(target) {
        // Hide all hidden sections first
        document.querySelectorAll(SELECTORS.hiddenSections).forEach(section => {
            Utils.addClass(section, 'section-hidden');
        });

        // Show target section if it was hidden
        if (target.classList.contains('section-hidden')) {
            Utils.removeClass(target, 'section-hidden');
        }
    }

    setupHeaderScroll() {
        const handleScroll = Utils.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > this.lastScrollTop && scrollTop > CONFIG.headerHideDelay) {
                Utils.addClass(this.header, 'hidden');
            } else {
                Utils.removeClass(this.header, 'hidden');
            }
            
            this.lastScrollTop = Math.max(0, scrollTop);
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        const updateActiveNav = Utils.throttle(() => {
            let current = '';
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            sections.forEach(section => {
                if (!section.classList.contains('section-hidden')) {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                }
            });

            navLinks.forEach(link => {
                Utils.removeClass(link, 'active');
                if (link.getAttribute('href') === `#${current}`) {
                    Utils.addClass(link, 'active');
                }
            });
        }, 100);

        window.addEventListener('scroll', updateActiveNav, { passive: true });
    }
}

// ============================================
// Blog Module
// ============================================
class Blog {
    constructor() {
        this.readMoreLinks = document.querySelectorAll(SELECTORS.readMoreLinks);
        this.blogPostDetail = document.querySelector(SELECTORS.blogPostDetail);
        this.init();
    }

    init() {
        this.setupReadMore();
    }

    setupReadMore() {
        this.readMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBlogDetail();
            });
        });
    }

    showBlogDetail() {
        if (this.blogPostDetail) {
            Utils.removeClass(this.blogPostDetail, 'section-hidden');
            Utils.smoothScrollTo(this.blogPostDetail);
        }
    }
}

// ============================================
// Cookie Banner Module
// ============================================
class CookieBanner {
    constructor() {
        this.banner = document.querySelector(SELECTORS.cookieBanner);
        this.acceptBtn = document.querySelector(SELECTORS.cookieAccept);
        this.declineBtn = document.querySelector(SELECTORS.cookieDecline);
        this.settingsBtn = document.querySelector(SELECTORS.cookieSettings);
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkCookieConsent();
    }

    setupEventListeners() {
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => this.acceptCookies());
        }

        if (this.declineBtn) {
            this.declineBtn.addEventListener('click', () => this.declineCookies());
        }

        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCookieSettings();
            });
        }
    }

    checkCookieConsent() {
        try {
            const consent = localStorage.getItem('cookieConsent');
            const consentDate = localStorage.getItem('cookieConsentDate');
            
            if (!consent || !consentDate || this.isConsentExpired(consentDate)) {
                setTimeout(() => this.showBanner(), 1000);
            }
        } catch (error) {
            console.warn('Unable to access localStorage for cookie consent:', error);
            setTimeout(() => this.showBanner(), 1000);
        }
    }

    isConsentExpired(consentDate) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - CONFIG.cookieExpirationDays);
        return new Date(consentDate) < expirationDate;
    }

    showBanner() {
        if (this.banner) {
            Utils.addClass(this.banner, 'show');
        }
    }

    hideBanner() {
        if (this.banner) {
            Utils.removeClass(this.banner, 'show');
        }
    }

    acceptCookies() {
        try {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            this.hideBanner();
            this.enableTracking();
            console.log('Cookies accepted - tracking and analytics enabled');
        } catch (error) {
            console.warn('Unable to save cookie consent:', error);
        }
    }

    declineCookies() {
        try {
            localStorage.setItem('cookieConsent', 'declined');
            localStorage.setItem('cookieConsentDate', new Date().toISOString());
            this.hideBanner();
            this.disableTracking();
            console.log('Cookies declined - only essential cookies will be used');
        } catch (error) {
            console.warn('Unable to save cookie decline:', error);
        }
    }

    showCookieSettings() {
        try {
            localStorage.removeItem('cookieConsent');
            localStorage.removeItem('cookieConsentDate');
            this.showBanner();
        } catch (error) {
            console.warn('Unable to reset cookie settings:', error);
        }
    }

    enableTracking() {
        // Placeholder for enabling analytics/tracking scripts
        // Example: gtag('consent', 'update', { 'analytics_storage': 'granted' });
        document.dispatchEvent(new CustomEvent('cookiesAccepted'));
    }

    disableTracking() {
        // Placeholder for disabling analytics/tracking scripts
        // Example: gtag('consent', 'update', { 'analytics_storage': 'denied' });
        document.dispatchEvent(new CustomEvent('cookiesDeclined'));
    }
}

// ============================================
// Animation Module
// ============================================
class Animations {
    constructor() {
        this.animatedElements = document.querySelectorAll(SELECTORS.animatedElements);
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupInitialAnimations();
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            Utils.addClass(entry.target, 'visible');
                        }, index * 100);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            this.animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.animatedElements.forEach(element => {
                Utils.addClass(element, 'visible');
            });
        }
    }

    setupInitialAnimations() {
        // Add animation classes to specific elements
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        document.querySelectorAll('.blog-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.15}s`;
        });

        // About section animations
        const aboutText = document.querySelector('.about-content');
        const aboutImage = document.querySelector('.about-image');
        
        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutImage) aboutImage.classList.add('slide-in-right');
    }
}

// ============================================
// Performance and Accessibility Module
// ============================================
class Performance {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.updateCopyright();
    }

    setupLazyLoading() {
        // Placeholder for lazy loading images when added
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window && images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu on escape
                const navLinks = document.querySelector(SELECTORS.navLinks);
                if (navLinks && navLinks.classList.contains('active')) {
                    Utils.removeClass(navLinks, 'active');
                    const mobileToggle = document.querySelector(SELECTORS.mobileMenuToggle);
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '☰';
                        mobileToggle.focus();
                    }
                }
            }
        });

        // Skip to content link
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const main = document.querySelector('main');
                if (main) {
                    main.focus();
                    main.scrollIntoView();
                }
            });
        }
    }

    setupFocusManagement() {
        // Manage focus for better accessibility
        const focusableElements = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('focusin', (e) => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.closest('.nav-links')) {
                // Ensure mobile menu is visible when navigating with keyboard
                const navLinks = document.querySelector(SELECTORS.navLinks);
                if (window.innerWidth <= 768 && navLinks && !navLinks.classList.contains('active')) {
                    Utils.addClass(navLinks, 'active');
                }
            }
        });
    }

    updateCopyright() {
        const currentYear = new Date().getFullYear();
        const copyrightElements = document.querySelectorAll('.copyright-year');
        
        copyrightElements.forEach(element => {
            element.textContent = currentYear;
        });

        // Update generic copyright text
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom) {
            footerBottom.innerHTML = footerBottom.innerHTML.replace(/\d{4}/, currentYear);
        }
    }
}

// ============================================
// Form Validation Module (for future forms)
// ============================================
class FormValidation {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.setupFormValidation();
    }

    setupFormValidation() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', Utils.debounce(() => this.validateField(input), 300));
            });
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }

        // Email validation
        if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }

        // Phone validation
        if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }

        this.displayFieldError(field, isValid, errorMessage);
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    displayFieldError(field, isValid, message) {
        const errorElement = field.nextElementSibling?.classList.contains('error-message') 
            ? field.nextElementSibling 
            : null;

        if (!isValid) {
            field.classList.add('error');
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = message;
                field.parentNode.insertBefore(error, field.nextSibling);
            } else {
                errorElement.textContent = message;
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }
}

// ============================================
// Main Application Class
// ============================================
class LogicLAIWebsite {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Initialize all modules
            this.modules.navigation = new Navigation();
            this.modules.blog = new Blog();
            this.modules.cookieBanner = new CookieBanner();
            this.modules.animations = new Animations();
            this.modules.performance = new Performance();
            this.modules.formValidation = new FormValidation();

            // Setup global event listeners
            this.setupGlobalEvents();
            
            console.log('LogicLAI website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    setupGlobalEvents() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Resume animations or refresh content if needed
                this.onPageVisible();
            } else {
                // Pause animations or save state
                this.onPageHidden();
            }
        });

        // Handle resize events
        window.addEventListener('resize', Utils.debounce(() => {
            this.onWindowResize();
        }, 250));

        // Handle online/offline events
        window.addEventListener('online', () => this.onConnectionChange(true));
        window.addEventListener('offline', () => this.onConnectionChange(false));
    }

    onPageVisible() {
        // Restart paused animations or refresh content
        console.log('Page is now visible');
    }

    onPageHidden() {
        // Pause non-essential animations
        console.log('Page is now hidden');
    }

    onWindowResize() {
        // Handle responsive adjustments
        const navLinks = document.querySelector(SELECTORS.navLinks);
        if (navLinks && window.innerWidth > 768) {
            Utils.removeClass(navLinks, 'active');
            const mobileToggle = document.querySelector(SELECTORS.mobileMenuToggle);
            if (mobileToggle) mobileToggle.innerHTML = '☰';
        }
    }

    onConnectionChange(isOnline) {
        console.log(`Connection status: ${isOnline ? 'online' : 'offline'}`);
        
        // Show/hide offline indicator
        const offlineIndicator = document.querySelector('.offline-indicator');
        if (offlineIndicator) {
            offlineIndicator.style.display = isOnline ? 'none' : 'block';
        }
    }
}

// ============================================
// Initialize Application
// ============================================
const app = new LogicLAIWebsite();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LogicLAIWebsite, Utils };
}