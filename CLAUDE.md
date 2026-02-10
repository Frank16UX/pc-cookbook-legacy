# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Pampered Chef Cookbook Design System

A comprehensive design system implementation featuring SCSS-based styles and React/TypeScript components built on Base UI primitives. Styles were extracted from the official Pampered Chef Cookbook at https://www.pamperedchef.com/pc-cookbook/color.

## Quick Commands

### Development
```bash
npm run dev              # Start Vite dev server (React app on port 3000)
npm run build            # Build React app for production (compiles SCSS + bundles React)
npm run preview          # Preview production build
npm run scss:build       # Compile SCSS to CSS only
npm run scss:watch       # Watch SCSS files and auto-compile
```

### Package Publishing
```bash
npm run build:package    # Build library for publishing (SCSS + Vite lib + TypeScript declarations)
npm run build:lib        # Build Vite library + TypeScript declarations only
npm pack --dry-run       # Preview what will be published
npm version patch        # Bump version, create git tag (then push tag to trigger CI publish)
```

### Legacy Token Generation
```bash
node generate-css.js     # Generate CSS from tokens.json (educational reference only)
```

### Preview
```bash
open index.html          # Static HTML preview (legacy)
# OR
npm run dev              # React app preview (current)
```

## Architecture Overview

This project has two complementary layers that work together:

### 1. SCSS Design System (Foundation)
**Location:** `src/scss/`
**Output:** `src/css/cookbook.css`

The SCSS layer is the **primary source of truth** for all visual styling. It provides:
- Design token variables (colors, spacing, breakpoints)
- Typography mixins and utilities
- Component styles with `.pc-*` class prefix
- Compiled standalone CSS for use in any project

**Import order matters** - see [src/scss/index.scss](src/scss/index.scss#L1-L27) for the correct dependency order:
1. Variables (`*-variables.scss`)
2. Mixins (`font-mixins.scss`)
3. Base styles (`fonts.scss`, `color.scss`, `spacing.scss`, etc.)
4. Component styles (`buttons.scss`, `form.scss`, `cards.scss`, etc.)
5. Layout (`grid.scss`)

### 2. React Component Library (Implementation)
**Location:** `src/components/cc/`
**Entry:** `src/App.tsx` → `src/main.tsx`

React components built on [@mui/base](https://mui.com/base-ui/) v5.0.0-beta.70 that use the SCSS styles. All components:
- Use Base UI primitives for behavior and accessibility
- Apply SCSS-generated classes for styling
- Follow naming convention: `CC[ComponentName]` (e.g., `CCButton`, `CCInput`)
- Export from barrel file at [src/components/index.ts](src/components/index.ts#L1-L14)

## Project Structure

```
pc-cookbook-legacy/
├── src/
│   ├── scss/                          # SCSS design system (PRIMARY)
│   │   ├── index.scss                 # Main entry - imports all modules
│   │   ├── breakpoint-variables.scss  # Responsive breakpoints
│   │   ├── color-variables.scss       # Color palette
│   │   ├── font-mixins.scss           # Typography mixins
│   │   ├── fonts.scss                 # Font loading
│   │   ├── color.scss                 # Color utilities
│   │   ├── spacing.scss               # Spacing utilities
│   │   ├── interactive.scss           # Interactive states
│   │   ├── lists.scss                 # List styles
│   │   ├── buttons.scss               # Button components
│   │   ├── form.scss                  # Form components
│   │   ├── cards.scss                 # Card components
│   │   ├── progressbars.scss          # Progress indicators
│   │   ├── loaders.scss               # Loading spinners
│   │   └── grid.scss                  # Layout system
│   │
│   ├── css/                           # Compiled CSS output
│   │   ├── cookbook.css               # Main compiled stylesheet
│   │   └── cookbook.css.map           # Source map
│   │
│   ├── components/                    # React components
│   │   ├── cc/                        # Cookbook components (cc-*)
│   │   │   ├── cc-badge/
│   │   │   ├── cc-button/
│   │   │   ├── cc-card/
│   │   │   ├── cc-checkbox/
│   │   │   ├── cc-input/
│   │   │   ├── cc-radio/
│   │   │   ├── cc-select/
│   │   │   ├── cc-navigation-primary-button/
│   │   │   ├── cc-navigation-secondary-tabs/
│   │   │   ├── cc-navigation-main/
│   │   │   └── cc-navigation-useful-links-menu/
│   │   └── index.ts                   # Component exports
│   │
│   ├── App.tsx                        # Main React app (component demos)
│   ├── main.tsx                       # Vite entry point
│   └── tokens.json                    # Figma tokens (legacy reference)
│
├── assets/
│   ├── fonts/                         # Questa font files (local)
│   ├── icons/                         # SVG icons and animated Lottie files
│   └── logos/                         # Brand logos
│
├── index.html                         # Vite HTML entry / Static preview
├── vite.config.ts                     # Vite configuration (dev + app build)
├── vite.config.lib.ts                 # Vite configuration (library build)
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.build.json                # TypeScript build config (declarations)
├── .npmrc                             # GitHub Packages registry config
├── .github/workflows/publish.yml      # CI/CD for auto-publishing on version tags
├── generate-css.js                    # Legacy token generator
├── PACKAGE_GUIDE.md                   # Package publishing and usage guide
└── package.json                       # Dependencies and scripts
```

## Component Development

### Creating New Components

1. **Create component directory:**
   ```
   src/components/cc/cc-[component-name]/
   └── cc-[component-name].tsx
   ```

2. **Use Base UI primitives** when available (Button, Input, Select, etc.)

3. **Apply SCSS classes** with `.pc-*` prefix for styling

4. **Export from barrel file** at [src/components/index.ts](src/components/index.ts#L1-L14)

5. **Add to demo app** in [src/App.tsx](src/App.tsx#L1) for testing

### Component Pattern Example

```tsx
// src/components/cc/cc-example/cc-example.tsx
interface CCExampleProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const CCExample = ({ variant = 'primary', children }: CCExampleProps) => {
  return (
    <div className={`pc-example pc-example-${variant}`}>
      {children}
    </div>
  );
};
```

## SCSS Development

### Adding New Styles

1. Create new SCSS file in `src/scss/` (e.g., `tooltips.scss`)
2. Add to [src/scss/index.scss](src/scss/index.scss#L1-L27) in appropriate section
3. Use variables from `*-variables.scss` files
4. Follow `.pc-*` naming convention
5. Compile with `npm run scss:build`

### Using SCSS Variables and Mixins

Variables and mixins are automatically available in React component `.module.scss` files via Vite configuration:

```scss
// Automatically imported (see vite.config.ts):
// - @scss/breakpoint-variables
// - @scss/color-variables
// - @scss/font-mixins
// - $spacers map

.myComponent {
  @include heading-5;              // Typography mixin
  color: var(--pc-text-primary);   // Color variable
  padding: map.get($spacers, 'lg'); // Spacing from map

  @media (min-width: $breakpoint-md) { // Breakpoint variable
    padding: map.get($spacers, 'xl');
  }
}
```

## Vite Configuration

Key features in [vite.config.ts](vite.config.ts#L1-L58):

- **Path aliases:** `@/`, `@components/`, `@scss/`
- **Auto-imported SCSS:** Variables and mixins available globally
- **Dev server:** Port 3000, auto-opens browser
- **CSS Modules:** `.module.scss` files with camelCase exports

## TypeScript Configuration

Path mappings in [tsconfig.json](tsconfig.json#L23-L29) match Vite aliases:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@scss/*` → `src/scss/*`

## Design Tokens

### Colors (CSS Custom Properties)
```scss
// Text
--pc-text-primary
--pc-text-secondary
--pc-text-tertiary
--pc-text-base
--pc-text-success
--pc-text-error

// Surface
--pc-surface-default
--pc-surface-tint-1
--pc-surface-tint-2

// Brand
--pc-base-primary
--pc-base-accent-one through --pc-base-accent-seven

// Interactive
--pc-interactive-default
--pc-interactive-hovered
--pc-interactive-pressed
--pc-interactive-disabled
```

### Spacing (SCSS Map + CSS Vars)
```scss
// SCSS map (use in .module.scss files)
$spacers: (
  mini: 2px,
  xs: 5px,
  sm: 10px,
  md: 15px,
  lg: 20px,
  xl: 25px,
  '2xl': 30px,
  '3xl': 40px,
  '4xl': 50px,
  '5xl': 60px
);

// CSS custom properties (use in HTML/CSS)
var(--pc-spacer-mini)   /* 2px */
var(--pc-spacer-xs)     /* 5px */
var(--pc-spacer-sm)     /* 10px */
var(--pc-spacer-md)     /* 15px */
// ... up to 5xl (60px)
```

### Typography Classes
```html
<!-- Headings -->
<h1 class="pc-heading-5">Largest</h1>
<h2 class="pc-heading-4">Large</h2>
<h3 class="pc-heading-3">Medium</h3>

<!-- Body text -->
<p class="pc-copy-2">Regular</p>
<p class="pc-copy-strong-2">Bold</p>

<!-- Special -->
<a class="pc-link">Link</a>
<small class="pc-meta">Meta text</small>
```

### Breakpoints (SCSS Variables)
```scss
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1440px;
```

## Fonts

Three font families are used:
- **Antonio** - Headings (Google Fonts)
- **Inter** - Body text (Google Fonts)
- **Questa** - Display text (local files in `assets/fonts/`)

Fonts are loaded automatically via [src/scss/fonts.scss](src/scss/fonts.scss#L1).

## Base UI Integration

This project uses [@mui/base](https://mui.com/base-ui/) v5.0.0-beta.70 for:
- Accessible, unstyled component primitives
- Keyboard navigation and focus management
- ARIA attributes and semantic HTML

SCSS provides all visual styling while Base UI handles behavior.

## Available Components

### Form Components
- `CCButton` - Primary, secondary, ghost variants
- `CCInput` - Text input with floating labels
- `CCCheckbox` - Custom styled checkbox
- `CCRadio` / `CCRadioGroup` - Radio buttons with group management
- `CCSelect` - Dropdown select with floating label

### Layout Components
- `CCCard` - Container with variants (default, light, dark)

### Navigation Components
- `CCBadge` - Label badges (yellow, red, primary variants)
- `CCNavigationPrimaryButton` - Top-level nav buttons
- `CCNavigationSecondaryTabs` - Tab navigation
- `CCNavigationMain` - Complete navigation system
- `CCNavigationUsefulLinksMenu` - Dropdown menu

All components support:
- Validation states (success, error, warning)
- Disabled states
- Mobile/responsive variants
- Custom className for extension

## Legacy Token Generation

The `generate-css.js` script was an initial approach to convert Figma tokens from `tokens.json` into CSS. This has been superseded by the SCSS implementation but remains for reference.

**What it did:**
- Generated `colors.css`, `typography.css`, `spacing.css` from `tokens.json`
- Created utility classes and CSS custom properties
- Mapped font weights (Regular/Roman → 400, Bold → 700)

**Why we moved to SCSS:**
- Direct extraction from production Pampered Chef website
- More maintainable modular architecture
- Better preprocessor features (mixins, nesting, functions)
- Compile-time optimizations

## Package Publishing

This project is published as `@frank16ux/pc-cookbook-legacy` on GitHub Packages. For full details see [PACKAGE_GUIDE.md](PACKAGE_GUIDE.md).

### Package Name
`@frank16ux/pc-cookbook-legacy`

### Build Pipeline

The project has two separate build modes:
- **App build** (`npm run build`) — Builds the demo React app to `dist/` (HTML + bundled assets)
- **Library build** (`npm run build:package`) — Builds the publishable package to `dist/` (ESM + CJS + TypeScript declarations + CSS)

Key files:
- [vite.config.lib.ts](vite.config.lib.ts#L1) — Vite library build config (separate from app config)
- [tsconfig.build.json](tsconfig.build.json#L1) — TypeScript declaration generation config
- [src/index.ts](src/index.ts#L1) — Package entry point (barrel export)
- [.github/workflows/publish.yml](.github/workflows/publish.yml#L1) — CI/CD workflow

### Package Exports

Consumers can import:
- `@frank16ux/pc-cookbook-legacy` — React components (ESM/CJS)
- `@frank16ux/pc-cookbook-legacy/dist/index.css` — Component CSS (from Vite library build)
- `@frank16ux/pc-cookbook-legacy/styles` — Full cookbook stylesheet (`cookbook.css`)
- `@frank16ux/pc-cookbook-legacy/scss` — SCSS entry point (all variables, mixins, styles)
- `@frank16ux/pc-cookbook-legacy/scss/*` — Individual SCSS files
- `@frank16ux/pc-cookbook-legacy/assets/*` — Icons, fonts, logos

### Publishing Workflow
1. Merge changes to `main`
2. Run `npm version patch` (or `minor`/`major`)
3. Push the tag: `git push origin v<version>`
4. GitHub Actions automatically builds and publishes to GitHub Packages

### Peer Dependencies
- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0

## Key Resources

- **Design source:** https://www.pamperedchef.com/pc-cookbook/color
- **Package guide:** [PACKAGE_GUIDE.md](PACKAGE_GUIDE.md)
- **SCSS entry point:** [src/scss/index.scss](src/scss/index.scss#L1)
- **Package entry point:** [src/index.ts](src/index.ts#L1)
- **React entry point:** [src/main.tsx](src/main.tsx#L1)
- **Component demos:** [src/App.tsx](src/App.tsx#L1)
- **Compiled CSS:** [src/css/cookbook.css](src/css/cookbook.css#L1)
- **GitHub Packages:** https://github.com/Frank16UX/pc-cookbook-legacy/packages
