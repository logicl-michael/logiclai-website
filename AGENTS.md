# Repository Guidelines

## Project Structure & Module Organization
- `index.html` hosts the single-page layout; extend sections within existing semantic wrappers so anchors remain stable.
- `css/styles.css` centralizes design tokens and component blocks; append scoped rules near related sections instead of duplicating variables.
- `js/script.js` defines the `UltimateCorporate` controller orchestrating navigation, animations, and forms; add features as class methods and register them in `init()`.
- `images/` stores production assets, while `resources/designs*/` holds drafts and inspiration; move finalized art into `images/` alongside favicon updates.
- `.gitlab-ci.yml` publishes GitLab Pages by copying `index.html`, `css/`, `js/`, and `images/` into `public/`; mirror new top-level folders here to ship them.

## Build, Test, and Development Commands
- `python3 -m http.server 3000` — serve the site locally at http://localhost:3000 for iterative UI checks.
- `npm exec --yes browser-sync start --server --files "css/*.css, js/*.js, index.html"` — optional live-reload workflow matching static hosting.
- `npx prettier@3 --check index.html css/styles.css js/script.js` — lightweight formatting audit prior to commits.

## Coding Style & Naming Conventions
- Maintain four-space indentation; keep JS in `'use strict';` mode with camelCase methods and SCREAMING_SNAKE constants if introduced.
- Reuse hyphenated CSS class naming (`corporate-header`, `hero-effects`) and add modifiers as `component--variant`.
- Extend the design system by declaring new tokens under `:root`; avoid hard-coded colors or spacing within components.

## Testing Guidelines
- No automated suite yet; smoke test via the local server, confirming hero animations, cookie banner consent, and mobile navigation.
- Use browser devtools to watch for console warnings and run Lighthouse Performance and Accessibility checks before merges.
- Document any EmailJS or reCAPTCHA adjustments so reviewers can verify integrations remain functional.

## Commit & Pull Request Guidelines
- Write concise, sentence-case commit titles similar to `Fix CI/CD pipeline to include all assets`, grouping related UI changes together with linked issue IDs when available.
- PRs should summarise scope, list manual test steps (device sizes, Lighthouse scores), and attach before/after screenshots for visual changes.
- Call out asset additions that require `.gitlab-ci.yml` updates so reviewers confirm deployment coverage.

## Deployment Notes
- Merges to the default branch trigger the `pages` job; verify pipeline success and confirm new static files appear in the artifact.
- For hotfixes, use short-lived branches, validate locally, then fast-forward merge once GitLab Pages finishes rebuilding.
