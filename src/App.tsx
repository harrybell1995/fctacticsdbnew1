import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TacticsProvider } from './context/TacticsContext';
import { useThemeStore } from './store/themeStore';
import { AppRoutes } from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={`${theme} transition-colors`}>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <HelmetProvider>
        <BrowserRouter>
          <TacticsProvider>
            <AppRoutes />
          </TacticsProvider>
        </BrowserRouter>
      </HelmetProvider>
      </div>
    </div>
  );
}

export default App;