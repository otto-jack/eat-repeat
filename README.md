# Food OS

Food OS is a local-first static PWA for meal planning, daily food logging, recipe ingredients, shopping lists, and backup export/import.

The app stores data in the browser with `localStorage`. There is no backend, login, analytics, or cloud sync.

## Files

- `index.html` - app shell
- `src/` - app logic, storage helpers, seed data, and styles
- `manifest.webmanifest` - install metadata
- `sw.js` - offline cache/service worker
- `icons/` - PWA icons
- `.nojekyll` - tells GitHub Pages to serve the static files directly

## Run Locally

From this folder:

```powershell
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy

This repo is intended for GitHub Pages. Publish the `main` branch from `/` and open the Pages URL over HTTPS.

## Current App Capabilities

- Track daily logged macros and estimated micronutrients from the meal plan.
- Generate shopping items from the active weekly meal plan.
- Add recipe ingredients to shopping.
- Export/import full local backup JSON.
- Copy AI handoff JSON from Settings so another assistant can return recipes, shopping items, or meal-plan updates.
- Import AI JSON that adds recipes/shopping items or applies a local meal-plan override.
