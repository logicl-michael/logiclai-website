# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Serving the Website
- **Development server**: `python3 -m http.server 3000`
  - Serves the website on http://localhost:3000
  - Alternative: Use VS Code Live Server extension (configured for port 3000)
- **Browser opening**: `xdg-open http://localhost:3000` (Linux) or open manually

### VS Code Integration
- The project is configured with VS Code tasks that can be run via Command Palette:
  - "Serve Website" - Starts the Python HTTP server
  - "Open in Browser" - Opens the site in default browser
- Chrome debugging is configured via launch.json for step-through debugging

## Architecture Overview

This is a **static website** built with vanilla HTML, CSS, and JavaScript - no build system or framework dependencies. The architecture is:

### File Structure
- `index.html` - Single-page application with all content sections
- `css/styles.css` - Complete stylesheet with CSS custom properties design system
- `js/script.js` - Modular JavaScript with class-based architecture
- `images/` - Assets (currently contains logo.svg)

### JavaScript Architecture
The JavaScript follows a modular class-based pattern:

- **Main App Class**: `LogicLAIWebsite` - Initializes all modules
- **Core Modules**:
  - `Navigation` - Header, mobile menu, smooth scrolling, active navigation
  - `Blog` - Blog post navigation and read-more functionality
  - `CookieBanner` - GDPR cookie consent management
  - `Animations` - Intersection Observer-based animations
  - `Performance` - Lazy loading, accessibility, keyboard navigation
  - `FormValidation` - Form validation utilities (for future forms)
- **Utility Class**: `Utils` - Common functions (debounce, throttle, DOM manipulation)

### CSS Architecture
- **Design System**: CSS custom properties for colors, spacing, typography, shadows
- **Component-based**: Each section has its own CSS block
- **Responsive**: Mobile-first approach with specific breakpoints
- **Animations**: Fade-in, slide-in animations with fallbacks

### Content Sections
The single-page site includes:
1. Hero section with CTA buttons
2. About section with company stats
3. Services/Features grid (6 services)
4. Blog section with placeholder posts
5. Contact CTA section
6. Footer with social links
7. Hidden sections: Imprint, Privacy Policy, Blog post details

## Key Technical Details

### Navigation System
- Smooth scrolling navigation between sections
- Hidden sections (imprint, privacy, blog details) are shown/hidden dynamically
- Mobile hamburger menu with accessibility features
- Auto-hiding header on scroll down

### Cookie Management
- GDPR-compliant cookie banner
- LocalStorage-based consent tracking with expiration
- Hooks for analytics integration (currently placeholder)

### Accessibility Features
- ARIA labels and roles throughout
- Skip-to-content link
- Keyboard navigation support
- Focus management for mobile menu
- Semantic HTML structure

### Performance Optimizations
- Intersection Observer for animations
- Throttled scroll events
- Lazy loading hooks (for future images)
- Minimal DOM manipulation

## Development Notes

- **No Build Process**: Direct file editing - changes are immediately visible
- **No Package Dependencies**: Pure vanilla JavaScript/CSS/HTML
- **Responsive Design**: Test at mobile (480px), tablet (768px), and desktop breakpoints
- **Browser Support**: Modern browsers with fallbacks for older ones

## Content Placeholders
Several elements contain placeholder content that should be replaced:
- Company images in About and Blog sections show "[Replace with your company image]" and "[Blog Image]"
- Legal sections (Imprint, Privacy Policy) contain Swiss legal requirement placeholders
- Contact information uses placeholder phone/email addresses
- Social media links point to "#" placeholders

The website is production-ready but requires content updates for actual deployment.