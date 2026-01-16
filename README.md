# Pampered Chef Cookbook Design System

A comprehensive design system implementation for the Pampered Chef Cookbook, featuring SCSS-based components styled with Base UI and design tokens.

## Overview

This repository contains a complete design system implementation with two main approaches:

1. **SCSS Implementation** (Primary) - Production-ready styles extracted from the official Pampered Chef Cookbook at https://www.pamperedchef.com/pc-cookbook/color
2. **Token-based CSS Generation** (Legacy/Exercise) - Initial approach using Tokens Studio exports from Figma

## Project Structure

```
pc-cookbook-legacy/
├── src/
│   ├── scss/                    # Production SCSS files (PRIMARY)
│   │   ├── index.scss          # Main entry point
│   │   ├── breakpoint-variables.scss
│   │   ├── color-variables.scss
│   │   ├── color.scss
│   │   ├── font-mixins.scss
│   │   ├── fonts.scss
│   │   ├── spacing.scss
│   │   ├── buttons.scss
│   │   ├── cards.scss
│   │   ├── form.scss
│   │   ├── grid.scss
│   │   ├── interactive.scss
│   │   ├── lists.scss
│   │   ├── loaders.scss
│   │   └── progressbars.scss
│   │
│   ├── css/                     # Compiled CSS output
│   │   ├── cookbook.css        # Main compiled stylesheet
│   │   ├── cookbook.css.map    # Source map
│   │   ├── tokens.css          # Token-based styles (legacy)
│   │   ├── colors.css          # Generated color tokens
│   │   ├── typography.css      # Generated typography tokens
│   │   └── spacing.css         # Generated spacing utilities
│   │
│   ├── tokens.json             # Design tokens (Figma export)
│   └── tokens-original.json    # Original token backup
│
├── assets/fonts/               # Custom font files (Questa)
├── index.html                  # Design system preview/showcase
├── generate-css.js             # Legacy CSS generator script
└── package.json
```

## Quick Start

### Installation

```bash
npm install
```

### Compile SCSS

Compile the SCSS files to CSS:

```bash
npx sass src/scss/index.scss src/css/cookbook.css
```

For development with watch mode:

```bash
npx sass --watch src/scss/index.scss src/css/cookbook.css
```

### Preview the Design System

Open `index.html` in your browser to see a live preview of:
- Design tokens (colors, typography, spacing)
- Base UI components with Cookbook styling
- Interactive component states

```bash
open index.html
```

## Using the Design System

### SCSS-based Approach (Recommended)

The SCSS files in `src/scss/` are the primary source of truth. They contain styles extracted from the official Pampered Chef Cookbook website and are ready for production use.

#### Import in your project:

```scss
// Import the entire design system
@import 'src/scss/index.scss';
```

#### Or import specific modules:

```scss
// Variables first
@import 'src/scss/breakpoint-variables';
@import 'src/scss/color-variables';

// Then mixins
@import 'src/scss/font-mixins';

// Then components as needed
@import 'src/scss/buttons';
@import 'src/scss/form';
@import 'src/scss/cards';
```

#### Using in HTML:

```html
<!-- Link compiled CSS -->
<link rel="stylesheet" href="src/css/cookbook.css">

<!-- Use component classes -->
<button class="pc-btn-primary">Primary Button</button>
<input type="text" class="pc-form-control" placeholder="Enter text">
<div class="pc-card">Card content</div>
```

### Available Components

The SCSS design system includes styled components for:

- **Buttons**: Primary, secondary, ghost variants with states
- **Forms**: Text inputs, textareas, checkboxes, radio buttons, selects
- **Cards**: Container components with consistent spacing
- **Grid System**: Responsive layout utilities
- **Progress Bars**: Loading indicators with multiple variants
- **Loaders**: Animated loading spinners
- **Typography**: Heading and body text styles
- **Colors**: Complete color palette with semantic naming
- **Spacing**: Consistent spacing scale and utilities

## Design Token Evolution

### Initial Approach (Legacy)

Initially, we used Tokens Studio to export design tokens from Figma into `tokens.json`, then used `generate-css.js` to convert them into CSS custom properties and utility classes.

**Files involved:**
- `src/tokens.json` - Token definitions from Figma
- `generate-css.js` - Node script to generate CSS
- `src/css/colors.css` - Generated color tokens
- `src/css/typography.css` - Generated typography utilities
- `src/css/spacing.css` - Generated spacing utilities

**To regenerate (legacy approach):**

```bash
node generate-css.js
```

### Current Approach (Production)

We discovered the official Pampered Chef Cookbook design system at https://www.pamperedchef.com/pc-cookbook/color and used a browser extension to extract all the styles directly from the source. These styles were then refined and organized into the SCSS files in `src/scss/`.

**Why SCSS is better:**
- Direct extraction from production Pampered Chef website
- More maintainable and modular structure
- Better integration with Base UI components
- Compile-time optimizations
- Full feature set (mixins, variables, nesting)
- Already applied to Base UI component library

## Base UI Integration

This project uses [@mui/base](https://mui.com/base-ui/) (v5.0.0-beta.70) as the component library foundation. The SCSS styles provide the visual design while Base UI handles the component behavior and accessibility.

### Component Styling Pattern

Base UI components are styled using Cookbook design tokens and SCSS:

```html
<!-- Form Input with floating label -->
<div class="pc-form-container">
  <input type="text" class="pc-form-control" placeholder=" " id="username">
  <label class="pc-label" for="username">Username</label>
</div>

<!-- Button variants -->
<button class="pc-btn-primary">Primary</button>
<button class="pc-btn-secondary">Secondary</button>
<button class="pc-btn-ghost">Ghost</button>

<!-- Checkbox -->
<div class="pc-checkbox">
  <input type="checkbox" id="agree">
  <label class="pc-label" for="agree">I agree</label>
</div>

<!-- Radio buttons -->
<div class="pc-radio">
  <input type="radio" id="option1" name="choice">
  <label class="pc-label" for="option1">Option 1</label>
</div>
```

## Design System Preview

The `index.html` file provides a comprehensive preview with two tabs:

### Tab 1: Foundations
- **Colors**: All color tokens with swatches
- **Typography**: Font styles, sizes, and weights
- **Spacing**: Spacing scale visualization
- **Interactive Examples**: Button states and alerts

### Tab 2: Components
Showcase of all Base UI components including:
- Buttons (primary, secondary, ghost)
- Text inputs (with floating labels)
- Checkboxes and radio buttons
- Select dropdowns
- Badges
- Alerts (success, error, warning, info)
- Textareas
- Component states (hover, active, disabled, focused)

## Font Loading

The design system uses three font families:

- **Antonio**: Headings (loaded from Google Fonts)
- **Inter**: Body text (loaded from Google Fonts)
- **Questa**: Display text (custom fonts in `assets/fonts/`)

Fonts are automatically loaded via the HTML preview and SCSS font definitions.

## Color System

Colors follow a semantic naming convention:

```scss
// Text colors
--pc-text-primary
--pc-text-secondary
--pc-text-tertiary
--pc-text-base
--pc-text-success
--pc-text-error

// Surface colors
--pc-surface-default
--pc-surface-tint-1
--pc-surface-tint-2
--pc-surface-information
--pc-surface-success
--pc-surface-error

// Brand colors
--pc-base-primary
--pc-base-accent-one through --pc-base-accent-seven

// Interactive colors
--pc-interactive-default
--pc-interactive-hovered
--pc-interactive-pressed
--pc-interactive-disabled
```

## Spacing Scale

Consistent spacing tokens:

```scss
--pc-spacer-mini   // 2px
--pc-spacer-xs     // 5px
--pc-spacer-sm     // 10px
--pc-spacer-md     // 15px
--pc-spacer-lg     // 20px
--pc-spacer-xl     // 25px
--pc-spacer-2xl    // 30px
--pc-spacer-3xl    // 40px
--pc-spacer-4xl    // 50px
--pc-spacer-5xl    // 60px
```

## Typography Utilities

Typography classes follow the pattern `.pc-[style]-[size]`:

```html
<!-- Headings -->
<h1 class="pc-heading-5">Largest heading</h1>
<h2 class="pc-heading-4">Large heading</h2>
<h3 class="pc-heading-3">Medium heading</h3>

<!-- Body text -->
<p class="pc-copy-2">Regular body text</p>
<p class="pc-copy-strong-2">Bold body text</p>

<!-- Subheadings -->
<h4 class="pc-subheading-1">Subheading</h4>

<!-- Special styles -->
<a class="pc-link">Link text</a>
<small class="pc-meta">Meta text</small>
```

## Browser Support

The design system uses modern CSS features:
- CSS Custom Properties (CSS Variables)
- CSS Grid
- Flexbox
- Modern selectors (`:focus-visible`, `:has()` where supported)

Recommended browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Development Notes

### Token Generation Script

The `generate-css.js` script (legacy) reads `tokens.json` and generates:
- Color tokens as CSS custom properties
- Typography utility classes with fallback fonts
- Spacing utilities (margin, padding, gap)
- Automatic font-weight mapping (Regular/Roman → 400, Bold → 700)

### SCSS Architecture

The SCSS files follow a modular architecture:

1. **Variables** - Define all design tokens
2. **Mixins** - Reusable style patterns
3. **Base** - Foundation styles (colors, fonts, spacing)
4. **Components** - Individual component styles
5. **Layout** - Grid system and responsive utilities

### Compilation

SCSS is compiled using Dart Sass (included as dev dependency):

```bash
npx sass src/scss/index.scss src/css/cookbook.css --style=compressed
```

## Contributing

When adding new components or styles:

1. Add SCSS files to `src/scss/`
2. Import in `src/scss/index.scss` (order matters!)
3. Compile to `src/css/cookbook.css`
4. Add examples to `index.html` for preview
5. Follow existing naming conventions (`.pc-*` prefix)

## License

ISC

## Resources

- [Official Pampered Chef Cookbook](https://www.pamperedchef.com/pc-cookbook/color)
- [Base UI Documentation](https://mui.com/base-ui/)
- [Sass Documentation](https://sass-lang.com/documentation/)
