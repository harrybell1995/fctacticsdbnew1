import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useTactics } from '../context/TacticsContext';
import { TacticDetail } from './TacticDetail';

export const MainContent = () => {
  const { selectedCategory, selectedDecade, selectedTactic, setSelectedTactic, tactics } = useTactics();
  
  const filteredTactics = tactics.filter(tactic => {
    if (selectedDecade) {
      return tactic.decade === selectedDecade;
    }
    return tactic.category === selectedCategory;
  });

  if (selectedTactic) {
    return <TacticDetail />;
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-black overflow-auto pt-16 md:pt-0">
        {console.log("tactic" + tactic)} {/* Log the entire tactic object */}
        <header className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          {selectedDecade ? `Tactics from the ${selectedDecade}` : selectedCategory}
        </h1>
      </header>

<div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-8">
  {filteredTactics.map((tactic) => (
    <div
      key={tactic.id}
      className="bg-white dark:bg-gray-800/40 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer shadow-sm"
      onClick={() => setSelectedTactic(tactic)}
    >
      <div className="relative">
        <img
          src={tactic.image}
          alt={tactic.title}
          className="w-full aspect-square object-cover rounded-md mb-4"
        />
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform">
          <Play fill="white" size={24} />
        </button>
      </div>
      <h3 className="font-semibold text-lg mb-1">{tactic.title || 'Untitled Tactic'}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{tactic.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{tactic.formation}</span>
        <button 
          className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart size={20} />
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};