import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'images/apple-touch-icon-180x180.png',
        'images/apple-touch-icon-152x152.png',
        'images/apple-touch-icon-120x120.png',
        'images/apple-touch-icon-76x76.png',
      ],
      manifest: {
        name: 'Al-jeed Transport Dashboard',
        short_name: 'Al-jeed',
        description: 'Dashboard for Aljeed Transport management and operations.',
        icons: [
          {
            src: '/images/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#DD7E1F',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  build: {
    outDir: 'dist',
  },
});
