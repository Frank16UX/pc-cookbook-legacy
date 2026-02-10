import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@scss': resolve(__dirname, './src/scss'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
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
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'index.[ext]',
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
