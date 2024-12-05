import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Heart } from 'lucide-react';
import { useLikedTacticsStore } from '../store/likedTacticsStore';
import type { TacticsPlaylist } from '../types/database';

interface PlaylistCardProps {
  playlist: TacticsPlaylist;
  onTagClick?: (tag: string) => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onTagClick }) => {
  const navigate = useNavigate();
  const { toggleLike, isLiked } = useLikedTacticsStore();
  const liked = isLiked(playlist.id);

  const handleClick = () => {
    navigate(`/playlist/${playlist.id}`);
    window.scrollTo(0, 0);  // Scrolls the page to the top
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(playlist);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300"
    >
<div className="relative aspect-square">
  {playlist.image?.[0]?.image?.url ? (
    <img
      src={playlist.image[0].image.url}
      alt={playlist.image[0].image.alt || playlist.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-500/10 flex items-center justify-center">
      <ClipboardList size={48} className="text-primary-500" />
    </div>
  )}
  <button
    onClick={handleLike}
    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm transition-transform transform hover:scale-110"
  >
    <Heart
      size={20}
      className={`${liked ? 'fill-primary-500 text-primary-500' : 'text-white'}`}
    />
  </button>
</div>

      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{playlist.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {playlist.tags?.slice(0, 3).map((tag, index) => (
            <button
              key={index}
              onClick={(e) => handleTagClick(e, tag)}
              className="px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
            >
              {tag}
            </button>
          ))}
          {playlist.tags?.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
              +{playlist.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};