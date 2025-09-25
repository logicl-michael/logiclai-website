# Repository Guidelines

## Project Structure & Module Organization
Keep the single-page layout inside `index.html`, expanding existing `<section>` landmarks so in-page anchors remain predictable. Centralize visual updates in `css/styles.css`, placing new tokens near `:root` variables and appending component rules beside their current counterparts. Add behaviours as methods on the `UltimateCorporate` controller in `js/script.js` and register them in `init()` to preserve load order. Ship production-ready media from `images/` and stash working drafts under `resources/designs*/`. When introducing top-level directories, mirror them in `.gitlab-ci.yml` so GitLab Pages copies them into `public/`.

## Build, Test, and Development Commands
Run `python3 -m http.server 3000` for a quick static preview at http://localhost:3000. Use `npm exec --yes browser-sync start --server --files "css/*.css, js/*.js, index.html"` for live reload while editing assets. Execute `npx prettier@3 --check index.html css/styles.css js/script.js` before commits to confirm formatting matches the house style.

## Coding Style & Naming Conventions
Indent HTML, CSS, and JS with four spaces and keep JavaScript in `'use strict';` mode. Name JS methods and variables in camelCase; reserve SCREAMING_SNAKE for shared constants. Follow hyphenated CSS class names such as `corporate-header` and use modifiers like `component--variant`. Declare new colors, spacing, or typography tokens in `:root` instead of hard-coding values inside component blocks.

## Testing Guidelines
Automated tests are not yet defined, so rely on manual smoke checks. Verify hero animations, navigation toggles, and the cookie banner while serving locally. Inspect the browser console for warnings, and capture Lighthouse Performance and Accessibility scores after significant UI changes. Note any updates to integrations like EmailJS or reCAPTCHA so reviewers can revalidate credentials.

## Commit & Pull Request Guidelines
Write concise, sentence-case commit titles similar to `Refine hero animation timing`, grouping related UI work together. Pull requests should summarize the scope, link issues when applicable, list manual test steps (device widths, Lighthouse results), and attach before/after screenshots for visual edits. Highlight newly added assets or directories that require `.gitlab-ci.yml` adjustments to keep deployments complete.

## Deployment Notes
Merges to the default branch trigger the `pages` job; confirm the pipeline passes and that the artifact contains `index.html`, `css/`, `js/`, and `images/`. For urgent fixes, branch briefly, validate locally, and fast-forward merge after GitLab Pages finishes rebuilding.
