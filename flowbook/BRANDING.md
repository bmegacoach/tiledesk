# Flowbook Branding Guide

**Goal:** Rebrand Tiledesk Dashboard to "Flowbook" (Camp Alpha).

## 1. Assets
- **Logo:** Use `moltworker/assets/logo.png` (Camp Alpha Logo).
- **Name:** Change "Tiledesk" to "Flowbook".
- **Theme:** Dark mode, Premium gradients.

## 2. Code Changes
**Repository:** `flowbook/tiledesk-dashboard`

### A. Environment Configuration
File: `src/environments/environment.ts` & `src/environments/environment.prod.ts`
- `brand_name`: "Flowbook"
- `dashboard_base_url`: (Update to deployment URL)

### B. Styling (`src/assets/scss`)
- `_variables.scss`: Update primary colors.
- `styles.scss`: Global overrides for dark mode/glassmorphism.

### C. Assets (`src/assets`)
- Replace `logo.png`
- Replace `favicon.ico`
- Update `brand` folder images.

## 3. Build & Deploy
```bash
npm install
npm run build:prod
# Copy dist/ to web server
```
