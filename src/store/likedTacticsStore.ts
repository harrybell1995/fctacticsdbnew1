import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TacticsPlaylist } from '../types/database';

interface LikedTacticsState {
  likedTactics: TacticsPlaylist[];
  toggleLike: (tactic: TacticsPlaylist) => void;
  isLiked: (id: string) => boolean;
}

export const useLikedTacticsStore = create<LikedTacticsState>()(
  persist(
    (set, get) => ({
      likedTactics: [],
      toggleLike: (tactic) => set((state) => {
        const isLiked = state.likedTactics.some(t => t.id === tactic.id);
        return {
          likedTactics: isLiked
            ? state.likedTactics.filter(t => t.id !== tactic.id)
            : [...state.likedTactics, tactic]
        };
      }),
      isLiked: (id) => get().likedTactics.some(t => t.id === id),
    }),
    {
      name: 'liked-tactics-storage',
    }
  )
);