# Logicl AI Website

Static single-page site articulating Logicl AI's vision for hybrid intelligence that blends generative AI with mathematical solvers. Content reflects the aspirational roadmap described in the corporate identity manifest while outlining current pilot focus areas and services.

## Local Preview

Serve the project from the repository root and open <http://localhost:3000>:

```bash
python3 -m http.server 3000
```

Optional live-reload workflow:

```bash
npm exec --yes browser-sync start --server --files "css/*.css, js/*.js, index.html"
```

## Structure

- `index.html` – single-page layout with anchored sections
- `css/` – design tokens and component styles
- `js/` – interactive behaviours via `UltimateCorporate`
- `images/` – production assets
