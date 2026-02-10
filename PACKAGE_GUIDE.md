# Cookbook Design System Package Guide

A step-by-step guide to publishing changes from this repository and using the `@frank16ux/pc-cookbook-legacy` package in your projects.

---

## Part 1: How to Publish Changes to the Package

When you update components, SCSS styles, or assets, follow this workflow to release a new version.

### Step 1: Make Changes

Edit components in `src/components/`, SCSS files in `src/scss/`, or assets in `assets/`.

Example: Update Button styles:

```bash
# Edit src/components/button/button.tsx or src/scss/buttons.scss
# Commit your changes
git add .
git commit -m "feat: update button hover states"
git push origin my-feature-branch
```

### Step 2: Create a PR and Merge to Main

1. Create a pull request on GitHub
2. Have it reviewed
3. Merge to `main`

### Step 3: Update the Version Number

After merging, update the version in `package.json`:

```bash
npm version patch
```

This command:
- Updates `package.json` from `1.0.0` to `1.0.1`
- Creates a git commit
- Creates a git tag `v1.0.1`

**Understanding version numbers:**

Semantic Versioning (semver) uses `MAJOR.MINOR.PATCH`:

- **PATCH** (e.g., `1.0.0` → `1.0.1`): Bug fixes, small tweaks
- **MINOR** (e.g., `1.0.0` → `1.1.0`): New features, backwards compatible
- **MAJOR** (e.g., `1.0.0` → `2.0.0`): Breaking changes

For most updates, use `patch`:

```bash
npm version patch
```

### Step 4: Push the Tag

```bash
git push origin v1.0.1
```

The moment you push the tag, GitHub Actions automatically:
- Compiles SCSS to CSS
- Builds the component library (ESM + CJS + TypeScript declarations)
- Publishes to GitHub Packages
- Your users can now install the new version

### Step 5: Verify the Release

Check GitHub Actions to see if it succeeded:

1. Go to https://github.com/Frank16UX/pc-cookbook-legacy/actions
2. Look for "Publish to GitHub Packages" workflow
3. It should show a green checkmark after ~30 seconds

Or check the Packages page:

1. Go to https://github.com/Frank16UX/pc-cookbook-legacy/packages
2. Click on `pc-cookbook-legacy`
3. You should see the new version listed

### Testing Locally Before Publishing

Before publishing a release, test it locally:

```bash
# Build the package
npm run build:package

# See what gets published
npm pack --dry-run

# Actually create a tarball (for manual testing)
npm pack
```

This creates a `.tgz` file you can inspect or install locally in another project with `npm install ./path-to-file.tgz`.

---

## Part 2: How to Use the Package in a New Project

Follow these steps to use the cookbook design system in any new project.

### Step 1: Create a GitHub Personal Access Token (PAT)

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "npm-packages"
4. Check the `read:packages` scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)

### Step 2: Create `.npmrc` in Your Project

In your new project root, create a `.npmrc` file:

```
@frank16ux:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token you just created.

**Alternatively, set it globally** (one time setup):

```bash
npm config set @frank16ux:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN_HERE
```

### Step 3: Install the Package

```bash
npm install @frank16ux/pc-cookbook-legacy
```

If it fails with a 404 error, check:
- Your token is correct
- Your token has `read:packages` scope
- The package is published (check https://github.com/Frank16UX/pc-cookbook-legacy/packages)

### Step 4: Import Components

In your React code:

```tsx
import { CCButton, CCInput, CCCard } from '@frank16ux/pc-cookbook-legacy';
import '@frank16ux/pc-cookbook-legacy/dist/index.css';

export function MyComponent() {
  return (
    <CCButton variant="primary">
      Click me
    </CCButton>
  );
}
```

The CSS import is important — it styles the components!

**Available components:**

```tsx
// Form components
import { Button, Input, Checkbox, Radio, RadioGroup, Select } from '@frank16ux/pc-cookbook-legacy';

// Consultant's Corner components
import {
  CCBadge,
  CCNavigationMain,
  CCNavigationPrimaryButton,
  CCNavigationSecondaryTabs,
  CCNavigationUsefulLinksMenu,
} from '@frank16ux/pc-cookbook-legacy';

// Layout
import { Card } from '@frank16ux/pc-cookbook-legacy';
```

### Step 5: Import the Full Cookbook Stylesheet (CSS)

If you want the complete Pampered Chef Cookbook styles (typography, colors, spacing, buttons, forms, cards, grid, etc.) without using individual React components:

```css
@import '@frank16ux/pc-cookbook-legacy/styles';
```

This imports the compiled `cookbook.css` — the full design system stylesheet with all `.pc-*` utility classes.

### Step 6: Import Design Tokens (SCSS)

In your SCSS files, you can import individual token files:

```scss
@import '@frank16ux/pc-cookbook-legacy/scss';

// Or import specific token files:
@import '@frank16ux/pc-cookbook-legacy/scss/color-variables';
@import '@frank16ux/pc-cookbook-legacy/scss/breakpoint-variables';
@import '@frank16ux/pc-cookbook-legacy/scss/font-mixins';
```

Then use the variables and mixins in your styles:

```scss
.my-element {
  color: var(--pc-text-primary);
  padding: var(--pc-spacer-md);
  background: var(--pc-surface-default);

  @media (min-width: $breakpoint-md) {
    padding: var(--pc-spacer-xl);
  }
}
```

### Step 7: Access Icons and Assets

Icons are available at:

```
@frank16ux/pc-cookbook-legacy/assets/icons/base/check.svg
@frank16ux/pc-cookbook-legacy/assets/icons/cc-icons/dashboard.svg
@frank16ux/pc-cookbook-legacy/assets/logos/cc-logo-desktop.svg
```

You can import them as URLs in your code:

```tsx
import checkIcon from '@frank16ux/pc-cookbook-legacy/assets/icons/base/check.svg';

export function IconExample() {
  return <img src={checkIcon} alt="check" />;
}
```

Or reference them as paths in CSS:

```css
.icon::before {
  background-image: url('@frank16ux/pc-cookbook-legacy/assets/icons/base/check.svg');
}
```

---

## Part 3: How to Update the Package in a Consumer Project

When a new version is released, update it in your projects.

### Update to the Latest Version

```bash
npm update @frank16ux/pc-cookbook-legacy
```

This updates to the newest compatible version (respects semver ranges).

### Update to a Specific Version

```bash
npm install @frank16ux/pc-cookbook-legacy@1.0.2
```

### Check Your Current Version

```bash
npm list @frank16ux/pc-cookbook-legacy
```

This shows you which version is installed.

### See All Available Versions

```bash
npm view @frank16ux/pc-cookbook-legacy versions
```

Lists all published versions.

---

## Part 4: Helpful Tips & Troubleshooting

### Understanding Semantic Versioning (semver)

When you see `^1.0.0` in your package.json, the `^` means:
- Update to any version up to (but not including) `2.0.0`
- So `1.5.3` is allowed, but `2.0.0` is not

Use these ranges:
- `^1.0.0` — compatible with version (default)
- `~1.0.0` — only patch updates
- `1.0.0` — exact version only

### Common Errors and Fixes

**Error: 404 Not Found**

```
npm ERR! 404 Not Found
```

Fix:
- Check your token is in `.npmrc`
- Verify the token has `read:packages` scope
- Make sure you're using the correct registry URL

**Error: Authentication error**

```
npm ERR! 401 Unauthorized
```

Fix:
- Your token may have expired
- Generate a new PAT and update `.npmrc`

**Error: Package not found**

```
npm ERR! code E404
```

Fix:
- The package may not be published yet (check the Packages page)
- Verify the package name is `@frank16ux/pc-cookbook-legacy` (with `@`)
- Wait a few seconds — GitHub may need time to register the package

### Setting Up CI/CD for Your Project

If you want automatic deployments when your design system updates, add to your consumer project:

1. Check for updates periodically with `npm outdated`
2. Create an automated PR when a new version is available
3. Review and merge to deploy

Tools like Dependabot can do this automatically (GitHub-native option).

---

## Summary

Publishing updates to the cookbook design system is a simple workflow: make changes, merge to main, bump the version, and push a tag. GitHub Actions handles the rest automatically.

For questions or updates to this guide, reference the repository: https://github.com/Frank16UX/pc-cookbook-legacy
