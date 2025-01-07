import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

// Your existing dynamic routes setup remains the same
const playlistIds = Array.from({ length: 13 }, (_, i) => i + 1);
const decades = ['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s'];
const styles = ['counter-attack', 'defensive', 'high-press', 'possession-based'];
const tacticIds = Array.from({ length: 33 }, (_, i) => i + 56);

const dynamicRoutes = [
  ...playlistIds.map(id => `/playlist/${id}`),
  ...decades.map(decade => `/decade/${decade}`),
  ...styles.map(style => `/style/${style}`),
  ...tacticIds.map(id => `/tactic/${id}`)
];

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.fctacticdb.com',
      dynamicRoutes,
      outDir: 'dist',
      changefreq: 'daily',
      priority: 0.7,
    }),
  ],
  // This is the correct way to configure client-side routing in Vite
  server: {
    middlewareMode: false,
    fs: {
      strict: true
    }
  }
});