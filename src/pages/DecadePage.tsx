import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { PlaylistCard } from '../components/PlaylistCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useTactics } from '../context/TacticsContext';

export const DecadePage = () => {
  const { decade } = useParams<{ decade: string }>();
  const { tactics, loading, error, loadTacticsByDecade } = useTactics();

  useEffect(() => {
    if (decade) {
      loadTacticsByDecade(decade);
    }
  }, [decade]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="text-primary-500" size={24} />
          <h1 className="text-2xl font-bold">{decade}s Tactics</h1>
        </div>

        {tactics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tactics.map((tactic) => (
              <PlaylistCard key={tactic.id} playlist={tactic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold mb-2">No tactics found for this decade</h2>
            <p className="text-gray-400">
              Try exploring tactics from a different time period
            </p>
          </div>
        )}
      </div>
    </div>
  );
};