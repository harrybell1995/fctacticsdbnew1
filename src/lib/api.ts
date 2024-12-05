import { supabase } from './supabase';
import type { TacticsPlaylist, Tactic } from '../types/database';

export async function fetchTacticsPlaylists(): Promise<TacticsPlaylist[]> {
  const { data, error } = await supabase
    .from('tacticsPlaylists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics playlists:', error);
    return [];
  }

  return data?.map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  })) || [];
}

export async function fetchTacticsByCategory(category: string): Promise<TacticsPlaylist[]> {
  const { data, error } = await supabase
    .from('tacticsPlaylists')
    .select('*')
    .ilike('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics by category:', error);
    return [];
  }

  return data?.map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  })) || [];
}

export async function fetchTacticsByDecade(decade: string): Promise<TacticsPlaylist[]> {
  const startDecade = parseInt(decade);
  const endDecade = startDecade + 9;

  const { data, error } = await supabase
    .from('tacticsPlaylists')
    .select('*')
    .gte('decade', startDecade)
    .lte('decade', endDecade)
    .order('decade', { ascending: false });

  if (error) {
    console.error('Error fetching tactics by decade:', error);
    return [];
  }

  return data?.map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  })) || [];
}

export async function fetchTacticsByTag(tag: string): Promise<Tactic[]> {
  const { data, error } = await supabase
    .from('tacticsTable')
    .select('*')
    .contains('tags', [tag])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics by tag:', error);
    return [];
  }

  return data?.map(tactic => ({
    ...tactic,
    tags: Array.isArray(tactic.tags) ? tactic.tags : [],
    matchScore: 1
  })) || [];
}

export async function fetchTacticsByPlaylistId(playlistId: string): Promise<Tactic[]> {
  const { data: playlist, error: playlistError } = await supabase
    .from('tacticsPlaylists')
    .select('tags')
    .eq('id', playlistId)
    .single();

  if (playlistError || !playlist) {
    console.error('Error fetching playlist:', playlistError);
    return [];
  }

  const playlistTags = Array.isArray(playlist.tags) ? playlist.tags : [];
  
  if (playlistTags.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('tacticsTable')
    .select('*')
    .contains('tags', playlistTags)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics:', error);
    return [];
  }

  const processedTactics = (data || [])
    .map(tactic => {
      const tacticTags = Array.isArray(tactic.tags) ? tactic.tags : [];
      const matchingTags = playlistTags.filter(tag => tacticTags.includes(tag));
      return {
        ...tactic,
        tags: tacticTags,
        matchScore: matchingTags.length
      };
    })
    .filter(tactic => tactic.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  return processedTactics;
}

export async function fetchRandomTactics(limit: number = 4): Promise<Tactic[]> {
  const { data, error } = await supabase
    .from('tacticsTable')
    .select('*')
    .limit(limit);

  if (error) {
    console.error('Error fetching random tactics:', error);
    return [];
  }

  return shuffleArray(data || []);
}

export async function fetchFeaturedTactics(): Promise<TacticsPlaylist[]> {
  const { data, error } = await supabase
    .from('tacticsPlaylists')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching featured tactics:', error);
    return [];
  }

  return shuffleArray(data || []).map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  }));
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}