import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TacticCard } from '../components/TacticCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLikedTacticsStore } from '../store/likedTacticsStore';
import type { Tactic, TacticsPlaylist } from '../types/database';

export const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<TacticsPlaylist | null>(null);
  const [tactics, setTactics] = useState<Tactic[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTacticId, setExpandedTacticId] = useState<string | null>(null);
  const { toggleLike, isLiked } = useLikedTacticsStore();

  useEffect(() => {
    const fetchPlaylistAndTactics = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch playlist details
        const { data: playlistData, error: playlistError } = await supabase
          .from('tacticsPlaylists')
          .select('*')
          .eq('id', id)
          .single();

        if (playlistError) throw playlistError;
        setPlaylist(playlistData);

        // Ensure the playlist has tags before searching
        if (!playlistData?.tags || playlistData.tags.length < 3) {
          console.warn('Playlist does not have sufficient tags for search');
          setTactics([]);
          setLoading(false);
          return;
        }

        const [tag1, tag2, tag3] = playlistData.tags;

        // Fetch all tactics and filter based on tag matching
        const { data: tacticsData, error: tacticsError } = await supabase
          .from('tacticsTable')
          .select('*');

        if (tacticsError) throw tacticsError;

        // Filter tactics based on tag matching logic
        const filteredTactics = (tacticsData || []).map((tactic) => {
          const matchedTags = [tag1, tag2, tag3].filter(tag => tactic.tags.includes(tag));

          return {
            ...tactic,
            matchCount: matchedTags.length,
            isPerfectMatch: matchedTags.length === 3,
          };
        }).filter(tactic => tactic.matchCount >= 2); // Only show tactics with at least 2 matching tags

        setTactics(filteredTactics);
      } catch (error) {
        console.error('Error fetching playlist or tactics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistAndTactics();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="top-0 z-10 bg-gradient-to-b from-gray-900 via-gray-900 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>

          <div className="flex items-start gap-8">
            {playlist.image?.[0]?.image?.url ? (
              <img
                src={playlist.image[0].image.url}
                alt={playlist.image[0].image.alt || playlist.title}
                className="w-48 h-48 object-cover rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-48 h-48 bg-gradient-to-br from-primary-500/20 to-primary-500/10 rounded-lg shadow-xl flex items-center justify-center">
                <Clock size={48} className="text-primary-500" />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{playlist.title}</h1>
              <p className="text-gray-300 mb-6">{playlist.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {playlist.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => playlist && toggleLike(playlist)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isLiked(playlist.id) ? 'fill-white' : ''}
                  />
                  <span>Like</span>
                </button>
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tactics List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {tactics.map((tactic) => (
            <TacticCard
              key={tactic.id}
              tactic={tactic}
              isExpanded={expandedTacticId === tactic.id}
              onToggle={() => setExpandedTacticId(
                expandedTacticId === tactic.id ? null : tactic.id
              )}
              highlightPerfectMatch={tactic.isPerfectMatch}
            />
          ))}
        </div>

        {tactics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tactics found with matching tags</p>
          </div>
        )}
      </div>
    </div>
  );
};
