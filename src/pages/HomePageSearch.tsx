import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TacticsPlaylist, Tactic } from '../types/database';
import { PlaylistCard } from '../components/PlaylistCard';
import { TacticCard } from '../components/TacticCard';

export const HomePageSearch = () => {
  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState<TacticsPlaylist[]>([]);
  const [tactics, setTactics] = useState<Tactic[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedTacticId, setExpandedTacticId] = useState<string | null>(null);

  useEffect(() => {
    const searchItems = async () => {
      if (!query.trim()) {
        setPlaylists([]);
        setTactics([]);
        return;
      }

      setLoading(true);
      try {
        // Search in tacticsPlaylists
        const { data: playlistData, error: playlistError } = await supabase
          .from('tacticsPlaylists')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(5);

        if (playlistError) {
          console.error('Playlist search error:', playlistError);
        }

        // Search in tacticsTable
        const { data: tacticsData, error: tacticsError } = await supabase
          .from('tacticsTable')
          .select('*')
          .or(`tactic_name.ilike.%${query}%,description.ilike.%${query}%,club.ilike.%${query}%`)
          .limit(10);

        if (tacticsError) {
          console.error('Tactic search error:', tacticsError);
        }

        setPlaylists(playlistData || []);
        setTactics(tacticsData || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      const debounce = setTimeout(searchItems, 300);
      return () => clearTimeout(debounce);
    }
  }, [query]);

  const handleClearSearch = () => {
    setQuery('');
    setPlaylists([]);
    setTactics([]);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative mb-8 max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tactics, teams, managers, or tags..."
          className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <SearchIcon 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        {query && (
          <button 
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="space-y-8">
          {/* Playlists Results */}
          {playlists.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Tactical Collections</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                  <PlaylistCard 
                    key={playlist.id} 
                    playlist={playlist}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Individual Tactics Results */}
          {tactics.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Individual Tactics</h2>
              <div className="space-y-4">
                {tactics.map((tactic) => (
                  <TacticCard
                    key={tactic.id}
                    tactic={tactic}
                    isExpanded={expandedTacticId === tactic.id}
                    onToggle={() => setExpandedTacticId(
                      expandedTacticId === tactic.id ? null : tactic.id
                    )}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && playlists.length === 0 && tactics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
