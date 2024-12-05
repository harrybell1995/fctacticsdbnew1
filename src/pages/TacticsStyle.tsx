import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTactics } from '../context/TacticsContext';
import { PlaylistCard } from '../components/PlaylistCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TacticsStyle = () => {
  const { tag } = useParams<{ tag: string }>();
  const { tactics, loading, error, loadTacticsByCategory } = useTactics();

  useEffect(() => {
    if (tag) {
      const formattedTag = tag.replace(/-/g, ' ');
      loadTacticsByCategory(formattedTag);
    }
  }, [tag]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading tactics: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {tag?.replace(/-/g, ' ')} Tactics
        </h1>

        {tactics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tactics.map((tactic) => (
              <PlaylistCard key={tactic.id} playlist={tactic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No tactics found for this style
            </p>
          </div>
        )}
      </div>
    </div>
  );
};