const fs = require('fs');
const path = require('path');

// Read tokens.json
const tokensPath = path.join(__dirname, 'src', 'tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Font weight mapping
const fontWeightMap = {
  'Regular': 400,
  'Roman': 400,
  'Bold': 700
};

// Categorize tokens by type
const tokensByType = {};

Object.entries(tokens).forEach(([name, token]) => {
  const type = token.type;
  if (!tokensByType[type]) {
    tokensByType[type] = [];
  }
  tokensByType[type].push({ name, value: token.value });
});

// Generate colors.css
if (tokensByType.color) {
  let colorsCss = `/* Color Tokens */\n:root {\n`;
  tokensByType.color.forEach(({ name, value }) => {
    colorsCss += `  --${name}: ${value};\n`;
  });
  colorsCss += `}\n`;

  const outputDir = path.join(__dirname, 'src');
  fs.writeFileSync(path.join(outputDir, 'colors.css'), colorsCss);
  console.log(`✓ Generated colors.css (${tokensByType.color.length} tokens)`);
}

// Generate typography.css
if (tokensByType.typography) {
  let typographyCss = `/* Typography Tokens */\n\n`;

  // Font family with fallbacks
  const getFontFamilyWithFallback = (fontFamily) => {
    const fallbacks = {
      'Antonio': '"Antonio", "Helvetica Neue", Arial, sans-serif',
      'Questa': '"Questa", Georgia, "Times New Roman", serif',
      'Inter': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    };
    return fallbacks[fontFamily] || `"${fontFamily}", sans-serif`;
  };

  // Generate utility classes
  tokensByType.typography.forEach(({ name, value }) => {
    const className = name;
    const fontWeight = fontWeightMap[value.fontWeight] || 400;
    const fontFamilyWithFallback = getFontFamilyWithFallback(value.fontFamily);

    typographyCss += `.${className} {\n`;
    typographyCss += `  font-family: ${fontFamilyWithFallback};\n`;
    typographyCss += `  font-weight: ${fontWeight};\n`;
    typographyCss += `  line-height: ${value.lineHeight};\n`;
    typographyCss += `  font-size: ${value.fontSize}px;\n`;
    typographyCss += `  letter-spacing: ${value.letterSpacing};\n`;

    if (value.textDecoration && value.textDecoration !== 'none') {
      typographyCss += `  text-decoration: ${value.textDecoration};\n`;
    }

    if (value.textCase && value.textCase !== 'none') {
      typographyCss += `  text-transform: ${value.textCase};\n`;
    }

    typographyCss += `}\n\n`;
  });

  // Skipping generation of CSS custom properties for typography because class rules already include explicit values

  const outputDir = path.join(__dirname, 'src');
  fs.writeFileSync(path.join(outputDir, 'typography.css'), typographyCss);
  console.log(`✓ Generated typography.css (${tokensByType.typography.length} tokens)`);
}

// Generate spacing.css (for dimension tokens)
if (tokensByType.dimension) {
  let spacingCss = `/* Spacing Tokens */\n\n`;

  // Generate utility classes for spacing
  spacingCss += `/* Margin Utilities */\n`;
  tokensByType.dimension.forEach(({ name, value }) => {
    const className = name;
    spacingCss += `.m-${className} { margin: ${value}px; }\n`;
    spacingCss += `.mt-${className} { margin-top: ${value}px; }\n`;
    spacingCss += `.mr-${className} { margin-right: ${value}px; }\n`;
    spacingCss += `.mb-${className} { margin-bottom: ${value}px; }\n`;
    spacingCss += `.ml-${className} { margin-left: ${value}px; }\n`;
    spacingCss += `.mx-${className} { margin-left: ${value}px; margin-right: ${value}px; }\n`;
    spacingCss += `.my-${className} { margin-top: ${value}px; margin-bottom: ${value}px; }\n`;
    spacingCss += `\n`;
  });

  spacingCss += `/* Padding Utilities */\n`;
  tokensByType.dimension.forEach(({ name, value }) => {
    const className = name;
    spacingCss += `.p-${className} { padding: ${value}px; }\n`;
    spacingCss += `.pt-${className} { padding-top: ${value}px; }\n`;
    spacingCss += `.pr-${className} { padding-right: ${value}px; }\n`;
    spacingCss += `.pb-${className} { padding-bottom: ${value}px; }\n`;
    spacingCss += `.pl-${className} { padding-left: ${value}px; }\n`;
    spacingCss += `.px-${className} { padding-left: ${value}px; padding-right: ${value}px; }\n`;
    spacingCss += `.py-${className} { padding-top: ${value}px; padding-bottom: ${value}px; }\n`;
    spacingCss += `\n`;
  });

  spacingCss += `/* Gap Utilities */\n`;
  tokensByType.dimension.forEach(({ name, value }) => {
    const className = name;
    spacingCss += `.gap-${className} { gap: ${value}px; }\n`;
    spacingCss += `.gap-x-${className} { column-gap: ${value}px; }\n`;
    spacingCss += `.gap-y-${className} { row-gap: ${value}px; }\n`;
    spacingCss += `\n`;
  });

  // Generate CSS custom properties
  spacingCss += `/* Spacing Custom Properties */\n:root {\n`;
  tokensByType.dimension.forEach(({ name, value }) => {
    spacingCss += `  --${name}: ${value}px;\n`;
  });
  spacingCss += `}\n`;

  const outputDir = path.join(__dirname, 'src');
  fs.writeFileSync(path.join(outputDir, 'spacing.css'), spacingCss);
  console.log(`✓ Generated spacing.css (${tokensByType.dimension.length} tokens)`);
}

// Update tokens.css to import all generated files
const outputDir = path.join(__dirname, 'src');
let tokensCss = `/**
 * Design Tokens - All tokens in one file
 *
 * This file imports all generated token CSS files.
 * Import this single file to get access to all design tokens.
 */

@import './fonts.css';
`;

if (tokensByType.color) {
  tokensCss += `@import './colors.css';\n`;
}
if (tokensByType.typography) {
  tokensCss += `@import './typography.css';\n`;
}
if (tokensByType.dimension) {
  tokensCss += `@import './spacing.css';\n`;
}

fs.writeFileSync(path.join(outputDir, 'tokens.css'), tokensCss);
console.log('✓ Updated tokens.css');

console.log('\n📊 Summary:');
console.log(`   Total token types: ${Object.keys(tokensByType).length}`);
Object.entries(tokensByType).forEach(([type, tokens]) => {
  console.log(`   - ${type}: ${tokens.length} tokens`);
});
