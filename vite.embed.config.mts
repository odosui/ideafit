import { defineConfig } from 'vite'

// Builds the embeddable widget as a plain script served at /embed.js
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: false,
    lib: {
      entry: 'embed/embed.ts',
      formats: ['iife'],
      name: 'IdeaFitEmbed',
      fileName: () => 'embed.js',
    },
  },
})
