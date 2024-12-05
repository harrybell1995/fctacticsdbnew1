import React from 'react';
import { Heart } from 'lucide-react';
import { useLikedTacticsStore } from '../store/likedTacticsStore';
import { PlaylistCard } from '../components/PlaylistCard';

export const LikedTactics = () => {
  const { likedTactics } = useLikedTacticsStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-primary-500" size={24} />
          <h1 className="text-2xl font-bold">Liked Tactics</h1>
        </div>

        {likedTactics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedTactics.map((tactic) => (
              <PlaylistCard key={tactic.id} playlist={tactic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">No liked tactics yet</h2>
            <p className="text-gray-400">
              Start exploring and like some tactics to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};