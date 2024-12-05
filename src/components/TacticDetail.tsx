import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTactics } from '../context/TacticsContext';
import { TacticCard } from './TacticCard';

export const TacticDetail = () => {
  const { selectedTactic, setSelectedTactic, tacticDetails } = useTactics();
  const [expandedTacticId, setExpandedTacticId] = useState<string | null>(null);

  if (!selectedTactic) return null;

  // Ensure tags is an array before mapping
  const tags = Array.isArray(selectedTactic.tags) ? selectedTactic.tags : [];

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-auto pt-16 md:pt-0">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900 to-transparent p-8">
        <button
          onClick={() => setSelectedTactic(null)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={24} />
          <span>Back to Playlists</span>
        </button>
        <div className="flex items-end gap-6">
          <div>
            <p className="text-sm font-semibold mb-2">Tactical Collection</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{selectedTactic.title}</h1>
            <p className="text-gray-300">{selectedTactic.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="space-y-4 max-w-4xl mx-auto">
          {tacticDetails.map((tactic) => (
            <TacticCard
              key={tactic.id}
              tactic={tactic}
              isExpanded={expandedTacticId === tactic.id}
              onToggle={() => setExpandedTacticId(
                expandedTacticId === tactic.id ? null : tactic.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};