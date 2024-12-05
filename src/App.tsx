import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TacticsProvider } from './context/TacticsContext';
import { useThemeStore } from './store/themeStore';
import { AppRoutes } from './routes';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={`${theme} transition-colors`}>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        <BrowserRouter>
          <TacticsProvider>
            <AppRoutes />
          </TacticsProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;