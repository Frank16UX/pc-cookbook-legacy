# Pampered Chef Cookbook Design System

This project implements the Pampered Chef Cookbook design system using SCSS and Base UI components.

## Primary Approach: SCSS-based Design System

The **SCSS files** in `src/scss/` are the main source of truth for this project. These styles were extracted directly from the official Pampered Chef Cookbook website at https://www.pamperedchef.com/pc-cookbook/color using a browser extension, then refined and organized into a modular SCSS architecture.

### Quick Commands

**Compile SCSS to CSS:**
```bash
npx sass src/scss/index.scss src/css/cookbook.css
```

**Watch mode for development:**
```bash
npx sass --watch src/scss/index.scss src/css/cookbook.css
```

**Preview the design system:**
```bash
open index.html
```

## Project Structure

```
src/
├── scss/              # Production SCSS (PRIMARY - use these!)
│   ├── index.scss    # Main entry point - imports all modules
│   ├── *-variables.scss  # Design token variables
│   ├── font-mixins.scss  # Typography mixins
│   └── *.scss        # Component styles
│
├── css/              # Compiled CSS output
│   ├── cookbook.css  # Main compiled stylesheet
│   ├── cookbook.css.map
│   └── *.css         # Legacy generated token files
│
└── tokens.json       # Figma token export (legacy reference)
```

## Component Usage

All components use the `.pc-*` class prefix:

```html
<!-- Buttons -->
<button class="pc-btn-primary">Primary Button</button>
<button class="pc-btn-secondary">Secondary Button</button>
<button class="pc-btn-ghost">Ghost Button</button>

<!-- Form Input with floating label -->
<div class="pc-form-container">
  <input type="text" class="pc-form-control" placeholder=" " id="field">
  <label class="pc-label" for="field">Label text</label>
</div>

<!-- Checkbox -->
<div class="pc-checkbox">
  <input type="checkbox" id="check">
  <label class="pc-label" for="check">Checkbox label</label>
</div>

<!-- Radio -->
<div class="pc-radio">
  <input type="radio" id="radio" name="group">
  <label class="pc-label" for="radio">Radio label</label>
</div>
```

## Legacy: Token Generation (Educational Reference)

The `generate-css.js` script was an initial exercise to convert Figma design tokens from `tokens.json` into CSS. This approach has been superseded by the SCSS implementation, but the script remains for educational purposes.

**What it did:**
- Read `src/tokens.json` (exported from Figma using Tokens Studio)
- Generated `colors.css`, `typography.css`, `spacing.css`
- Created utility classes and CSS custom properties
- Mapped font weights (Regular/Roman → 400, Bold → 700)

**To run (legacy):**
```bash
node generate-css.js
```

**Why we moved to SCSS:**
- Direct extraction from the production Pampered Chef website
- More maintainable and modular
- Better integration with Base UI components
- Full preprocessor features (mixins, nesting, variables)
- Compile-time optimizations

## Design Tokens

### Colors
Use CSS custom properties for colors:
```css
var(--pc-text-primary)
var(--pc-surface-default)
var(--pc-base-accent-one)
var(--pc-interactive-default)
```

### Spacing
```css
var(--pc-spacer-xs)     /* 5px */
var(--pc-spacer-sm)     /* 10px */
var(--pc-spacer-md)     /* 15px */
var(--pc-spacer-lg)     /* 20px */
var(--pc-spacer-xl)     /* 25px */
var(--pc-spacer-2xl)    /* 30px */
/* ... up to 5xl (60px) */
```

### Typography
Use utility classes:
```html
<h1 class="pc-heading-5">Largest heading</h1>
<h2 class="pc-heading-4">Large heading</h2>
<p class="pc-copy-2">Body text</p>
<p class="pc-copy-strong-2">Bold body text</p>
<a class="pc-link">Link</a>
<small class="pc-meta">Small text</small>
```

## Base UI Integration

This project uses [@mui/base](https://mui.com/base-ui/) v5.0.0-beta.70 for accessible, unstyled component primitives. The SCSS files provide all visual styling.

## Development Workflow

1. **Edit SCSS files** in `src/scss/`
2. **Compile** using the sass command above
3. **Preview** in `index.html` to see changes
4. **Use** compiled `src/css/cookbook.css` in your project

## Font Loading

Three font families are used:
- **Antonio** - Headings (Google Fonts)
- **Inter** - Body text (Google Fonts)
- **Questa** - Display text (local files in `assets/fonts/`)

Fonts are loaded automatically via `src/scss/fonts.scss`.

## Key Resources

- **Source of truth**: https://www.pamperedchef.com/pc-cookbook/color
- **Preview**: `index.html` (tabbed interface with Foundations + Components)
- **Main stylesheet**: `src/css/cookbook.css`
- **SCSS entry**: `src/scss/index.scss`
