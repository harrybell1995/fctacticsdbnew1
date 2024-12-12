import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

// Generate dynamic routes for Playlists, Decades, Styles, and Tactics
const playlistIds = Array.from({ length: 13 }, (_, i) => i + 1); // IDs 1 to 13
const decades = ['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s']; // Decades 2020s to 1960s
const styles = ['counter-attack', 'defensive', 'high-press', 'possession-based']; // 4 playing styles
const tacticIds = Array.from({ length: 33 }, (_, i) => i + 56); // Tactics IDs 56 to 88

// Combine all dynamic routes
const dynamicRoutes = [
  ...playlistIds.map(id => `/playlist/${id}`),       // Playlists
  ...decades.map(decade => `/decade/${decade}`),     // Decades
  ...styles.map(style => `/style/${style}`),         // Playing styles
  ...tacticIds.map(id => `/tactic/${id}`),           // Tactics
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.fctacticdb.com',
      dynamicRoutes,            // Include dynamic routes
      outDir: 'dist',           // Output directory for sitemap
      changefreq: 'daily',      // Change frequency
      priority: 0.7,            // Priority of the pages
    }),
  ],
});
