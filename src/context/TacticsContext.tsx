import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTacticsPlaylists, fetchTacticsByTag, fetchTacticsByPlaylistId, fetchTacticsByCategory, fetchTacticsByDecade } from '../lib/api';
import type { TacticsPlaylist, Tactic } from '../types/database';

interface TacticsContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDecade: string | null;
  setSelectedDecade: (decade: string | null) => void;
  selectedTactic: TacticsPlaylist | null;
  setSelectedTactic: (tactic: TacticsPlaylist | null) => void;
  tactics: TacticsPlaylist[];
  loading: boolean;
  error: Error | null;
  tacticDetails: Tactic[];
  loadTacticDetails: (playlistId: string) => Promise<void>;
  loadTacticsByTag: (tag: string) => Promise<void>;
  loadTacticsByCategory: (category: string) => Promise<void>;
  loadTacticsByDecade: (decade: string) => Promise<void>;
  refreshTactics: () => Promise<void>;
}

const TacticsContext = createContext<TacticsContextType | undefined>(undefined);

export function TacticsProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [selectedTactic, setSelectedTactic] = useState<TacticsPlaylist | null>(null);
  const [tactics, setTactics] = useState<TacticsPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tacticDetails, setTacticDetails] = useState<Tactic[]>([]);

  const loadTactics = async () => {
    try {
      setLoading(true);
      const data = await fetchTacticsPlaylists();
      setTactics(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tactics:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadTacticsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await fetchTacticsByCategory(category);
      setTactics(data);
      setTacticDetails(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tactics by category:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadTacticsByDecade = async (decade: string) => {
    try {
      setLoading(true);
      const data = await fetchTacticsByDecade(decade);
      setTactics(data);
      setTacticDetails(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tactics by decade:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadTacticsByTag = async (tag: string) => {
    try {
      setLoading(true);
      const data = await fetchTacticsByTag(tag);
      setTacticDetails(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tactics by tag:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const loadTacticDetails = async (playlistId: string) => {
    try {
      setLoading(true);
      const data = await fetchTacticsByPlaylistId(playlistId);
      setTacticDetails(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tactic details:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTactics();
  }, []);

  useEffect(() => {
    if (selectedTactic?.id) {
      loadTacticDetails(selectedTactic.id);
    }
  }, [selectedTactic]);

  return (
    <TacticsContext.Provider value={{ 
      selectedCategory, 
      setSelectedCategory,
      selectedDecade,
      setSelectedDecade,
      selectedTactic,
      setSelectedTactic,
      tactics,
      loading,
      error,
      tacticDetails,
      loadTacticDetails,
      loadTacticsByTag,
      loadTacticsByCategory,
      loadTacticsByDecade,
      refreshTactics: loadTactics
    }}>
      {children}
    </TacticsContext.Provider>
  );
}

export function useTactics() {
  const context = useContext(TacticsContext);
  if (context === undefined) {
    throw new Error('useTactics must be used within a TacticsProvider');
  }
  return context;
}