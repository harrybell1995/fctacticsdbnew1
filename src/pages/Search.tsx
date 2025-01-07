import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TacticsPlaylist, Tactic } from '../types/database';
import { PlaylistCard } from '../components/PlaylistCard';
import { TacticCard } from '../components/TacticCard';
import { useLocation } from 'react-router-dom';

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryParam = new URLSearchParams(location.search).get('query') || '';

  const [query, setQuery] = useState(queryParam);
  const [playlists, setPlaylists] = useState<TacticsPlaylist[]>([]);
  const [tactics, setTactics] = useState<Tactic[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedTacticId, setExpandedTacticId] = useState<string | null>(null);

  useEffect(() => {
    // Focus the input field whenever the location changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [location]);
  useEffect(() => {
    // Automatically perform a search when query changes
    const searchItems = async () => {
      if (!query.trim()) {
        setPlaylists([]);
        setTactics([]);
        return;
      }   
      setLoading(true);
      try {
        const { data: playlistData } = await supabase
          .from('tacticsPlaylists')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(5);

        const { data: tacticsData } = await supabase
          .from('tacticsTable')
          .select('*')
          .or(`tactic_name.ilike.%${query}%,description.ilike.%${query}%`);

        setPlaylists(playlistData || []);
        setTactics(tacticsData || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Update the URL with the new query
    navigate(`/search?query=${encodeURIComponent(value.trim())}`);
  };


  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search tactics, teams, or managers..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          {loading && (
            <Loader className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" size={20} />
          )}
        </div>

        {query.trim() && (
          <div className="space-y-8">
            {/* Playlists Results */}
            {playlists.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Tactical Collections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

        {!query.trim() && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Search Football Tactics</h2>
            <p className="text-gray-400">
              Search for tactics by team, manager, formation, or playing style
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
