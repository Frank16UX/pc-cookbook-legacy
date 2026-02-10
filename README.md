# Pampered Chef Cookbook Design System

A comprehensive design system implementation featuring SCSS-based styles and React/TypeScript components built on Base UI primitives. Styles were extracted from the official Pampered Chef Cookbook at https://www.pamperedchef.com/pc-cookbook/color.

## Overview

This repository contains a complete design system with two complementary layers:

1. **SCSS Design System** (Foundation) - Production-ready styles extracted from the official Pampered Chef Cookbook
2. **React Component Library** (Implementation) - React/TypeScript components using Base UI primitives styled with the SCSS system

## Quick Start

### Installation

```bash
npm install
```

### Development

Start the Vite dev server with hot module replacement:

```bash
npm run dev
```

Open your browser to http://localhost:3000 to see the interactive component showcase.

### Build for Production

```bash
npm run build        # Compiles SCSS + builds React app
npm run preview      # Preview production build
```

### SCSS Development

Compile SCSS to standalone CSS:

```bash
npm run scss:build   # Compile once
npm run scss:watch   # Watch mode for development
```

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
│   │   ├── button/                    # Button component
│   │   ├── card/                      # Card component
│   │   ├── checkbox/                  # Checkbox component
│   │   ├── input/                     # Input component
│   │   ├── radio/                     # Radio component
│   │   ├── select/                    # Select component
│   │   ├── cc/                        # Consultant's Corner components
│   │   │   ├── cc-badge/
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
├── index.html                         # Vite HTML entry
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── generate-css.js                    # Legacy token generator
└── package.json                       # Dependencies and scripts
```

## Available Components

### Form Components
- **Button** - Primary, secondary, and ghost variants with all interactive states
- **Input** - Text input with floating labels and validation states
- **Checkbox** - Custom styled checkbox with inline option
- **Radio / RadioGroup** - Radio buttons with controlled group management
- **Select** - Dropdown select with floating labels and validation

### Layout Components
- **Card** - Container component with variants (default, light, dark)

### Consultant's Corner Components (CC-prefixed)
- **CCBadge** - Label badges with three color variants (yellow, red, primary)
- **CCNavigationPrimaryButton** - Top-level navigation buttons with badge/dot variants
- **CCNavigationSecondaryTabs** - Tab navigation with badge support
- **CCNavigationMain** - Complete navigation system integrating primary and secondary nav
- **CCNavigationUsefulLinksMenu** - Dropdown menu for utility links

All components support:
- Validation states (success, error, warning)
- Disabled states
- Mobile/responsive variants
- Custom className for extension
- Full accessibility (ARIA attributes, keyboard navigation)

## Using the Design System

### SCSS-based Approach (Standalone CSS)

The SCSS files in `src/scss/` compile to a standalone stylesheet that can be used in any project:

```html
<!-- Link compiled CSS -->
<link rel="stylesheet" href="src/css/cookbook.css">

<!-- Use component classes -->
<button class="pc-btn-primary">Primary Button</button>
<input type="text" class="pc-form-control" placeholder="Enter text">
<div class="pc-card">Card content</div>
```

All component classes use the `.pc-*` prefix:
- `.pc-btn-primary`, `.pc-btn-secondary`, `.pc-btn-ghost`
- `.pc-form-control`, `.pc-checkbox`, `.pc-radio`
- `.pc-card`, `.pc-card-light`, `.pc-card-dark`
- `.pc-heading-1` through `.pc-heading-5`
- `.pc-copy-1`, `.pc-copy-2`, `.pc-copy-strong-1`, etc.

### React Component Approach

Import and use React components with TypeScript:

```tsx
import { Button, Input, Checkbox, Card } from './components';

function MyApp() {
  return (
    <Card variant="light">
      <Input
        id="email"
        label="Email Address"
        type="email"
        validationState="success"
        helperText="Looks good!"
      />
      <Checkbox
        id="agree"
        label="I agree to the terms"
      />
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Submit
      </Button>
    </Card>
  );
}
```

Components are built on [@mui/base](https://mui.com/base-ui/) v5.0.0-beta.70 for accessibility and behavior, styled with the SCSS design system.

## Design Tokens

### Colors (CSS Custom Properties)

```css
/* Text */
--pc-text-primary
--pc-text-secondary
--pc-text-tertiary
--pc-text-base
--pc-text-success
--pc-text-error

/* Surface */
--pc-surface-default
--pc-surface-tint-1
--pc-surface-tint-2
--pc-surface-information
--pc-surface-success
--pc-surface-error

/* Brand */
--pc-base-primary
--pc-base-accent-one
--pc-base-accent-two
/* ... through accent-seven */

/* Interactive */
--pc-interactive-default
--pc-interactive-hovered
--pc-interactive-pressed
--pc-interactive-disabled
```

### Spacing Scale

```css
--pc-spacer-mini    /* 2px */
--pc-spacer-xs      /* 5px */
--pc-spacer-sm      /* 10px */
--pc-spacer-md      /* 15px */
--pc-spacer-lg      /* 20px */
--pc-spacer-xl      /* 25px */
--pc-spacer-2xl     /* 30px */
--pc-spacer-3xl     /* 40px */
--pc-spacer-4xl     /* 50px */
--pc-spacer-5xl     /* 60px */
```

### Typography Classes

```html
<!-- Headings (largest to smallest) -->
<h1 class="pc-heading-5">Largest heading</h1>
<h2 class="pc-heading-4">Large heading</h2>
<h3 class="pc-heading-3">Medium heading</h3>
<h4 class="pc-heading-2">Small heading</h4>
<h5 class="pc-heading-1">Smallest heading</h5>

<!-- Body text -->
<p class="pc-copy-2">Regular body text (larger)</p>
<p class="pc-copy-1">Regular body text (smaller)</p>
<p class="pc-copy-strong-2">Bold body text (larger)</p>
<p class="pc-copy-strong-1">Bold body text (smaller)</p>

<!-- Subheadings -->
<h4 class="pc-subheading-1">Subheading</h4>

<!-- Special styles -->
<a class="pc-link">Link text</a>
<small class="pc-meta">Meta/caption text</small>
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

## Font Loading

Three font families are used:
- **Antonio** - Headings (Google Fonts)
- **Inter** - Body text (Google Fonts)
- **Questa** - Display text (local files in `assets/fonts/`)

Fonts are automatically loaded via SCSS and included in the compiled CSS.

## Interactive Component Showcase

The React app (`npm run dev`) provides an interactive showcase featuring:

### Tab 1: Form Components
- **Buttons** - All variants and states (hover, active, disabled)
- **Cards** - Default, light, and dark variants
- **Input Fields** - Floating labels, validation states, disabled states
- **Checkboxes** - Standard and inline layouts with validation
- **Radio Buttons** - Controlled groups with validation
- **Select Dropdowns** - Floating labels with validation

### Tab 2-5: Consultant's Corner Components
- **CCBadge** - Color variants and usage examples
- **CCNavigationPrimaryButton** - States and variants with interactive demo
- **CCNavigationSecondaryTabs** - Tab switching with badges
- **CCNavigationMain** - Full navigation system with responsive layout

## Browser Support

Modern CSS features are used throughout:
- CSS Custom Properties (CSS Variables)
- CSS Grid
- Flexbox
- Modern selectors (`:focus-visible`, `:has()` where supported)

Recommended browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Development Workflow

### Adding New SCSS Styles

1. Create new SCSS file in `src/scss/` (e.g., `tooltips.scss`)
2. Add to `src/scss/index.scss` in the appropriate section (order matters!)
3. Use variables from `*-variables.scss` files
4. Follow `.pc-*` naming convention
5. Compile with `npm run scss:build`

### Creating New React Components

1. Create component directory in `src/components/[component-name]/`
2. Create component file: `[component-name].tsx`
3. Use Base UI primitives when available
4. Apply SCSS classes with `.pc-*` prefix
5. Export from `src/components/index.ts`
6. Add to `src/App.tsx` for demo/testing

### Vite Configuration

The project uses Vite with several key features:
- **Path aliases**: `@/`, `@components/`, `@scss/`
- **Auto-imported SCSS**: Variables and mixins available globally in `.module.scss` files
- **Dev server**: Port 3000 with auto-open
- **CSS Modules**: Support for scoped styles

## Design Token Evolution

### Legacy Approach (Educational Reference)

Initially, we used Tokens Studio to export design tokens from Figma into `tokens.json`, then used `generate-css.js` to convert them into CSS:

```bash
node generate-css.js  # Generates colors.css, typography.css, spacing.css
```

This approach has been superseded by the SCSS implementation but remains for educational purposes.

### Current Approach (Production)

Styles were extracted directly from the official Pampered Chef Cookbook website at https://www.pamperedchef.com/pc-cookbook/color and organized into a modular SCSS architecture.

**Why SCSS is better:**
- Direct extraction from production source
- More maintainable modular structure
- Better integration with Base UI components
- Full preprocessor features (mixins, nesting, functions)
- Compile-time optimizations

## Base UI Integration

This project uses [@mui/base](https://mui.com/base-ui/) v5.0.0-beta.70 as the foundation for React components. Base UI provides:
- Accessible, unstyled component primitives
- Keyboard navigation and focus management
- ARIA attributes and semantic HTML
- WAI-ARIA compliant behaviors

The SCSS design system provides all visual styling while Base UI handles behavior and accessibility.

## Contributing

When adding new components or styles:

1. Add SCSS files to `src/scss/`
2. Import in `src/scss/index.scss` (order matters!)
3. Compile to `src/css/cookbook.css`
4. Create React components in `src/components/`
5. Export from `src/components/index.ts`
6. Add examples to `src/App.tsx` for demo
7. Follow existing naming conventions (`.pc-*` prefix for CSS, PascalCase for React components)

## License

ISC

## Resources

- [Official Pampered Chef Cookbook](https://www.pamperedchef.com/pc-cookbook/color) - Design source
- [Base UI Documentation](https://mui.com/base-ui/) - Component primitives
- [Sass Documentation](https://sass-lang.com/documentation/) - SCSS reference
- [Vite Documentation](https://vite.dev/) - Build tool
