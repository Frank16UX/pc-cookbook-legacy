import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@scss': path.resolve(__dirname, './src/scss'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make SCSS variables and mixins available globally
        additionalData: `
          @use "sass:map";
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
          @import "@scss/breakpoint-variables";
          @import "@scss/color-variables";
          @import "@scss/font-mixins";
        `,
      },
    },
    modules: {
      // CSS Modules configuration for .module.scss files
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
