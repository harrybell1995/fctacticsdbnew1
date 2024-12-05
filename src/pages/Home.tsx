import React, { useEffect, useState, useRef } from 'react';
import { ClipboardList, TrendingUp, Clock, Star } from 'lucide-react';
import { PlaylistCard } from '../components/PlaylistCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FormationDisplay } from '../components/FormationDisplay';
import { CreateTacticModal } from '../components/CreateTacticModal';
import { fetchFeaturedTactics, fetchRandomTactics } from '../lib/api';
import type { TacticsPlaylist, Tactic } from '../types/database';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [featuredTactics, setFeaturedTactics] = useState<TacticsPlaylist[]>([]);
  const [randomTactics, setRandomTactics] = useState<Tactic[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const featuredSectionRef = useRef<HTMLElement>(null);

  // Example formation data for the hero section
  const heroTactic = {
    formation: "4-4-2",
    positionsRolesFocuses: {
  "Player 1": ["Sweeper Keeper", "Support"],
  "Player 2": ["Full Back", "Support"],
  "Player 3": ["Central Defender", "Defend"],
  "Player 4": ["Central Defender", "Defend"],
  "Player 5": ["Full Back", "Support"],
  "Player 8": ["Deep Lying Playmaker", "Support"],
  "Player 7": ["Ball Winning Midfielder", "Support"],
  "Player 9": ["Wide Midfielder", "Attack"],
  "Player 6": ["Wide Midfielder", "Attack"],
  "Player 10": ["Advanced Forward", "Attack"],
  "Player 11": ["Deep Lying Forward", "Support"]
    }
  };

  const scrollToFeatured = () => {
    featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [featured, random] = await Promise.all([
          fetchFeaturedTactics(),
          fetchRandomTactics(4)
        ]);
        setFeaturedTactics(featured);
        setRandomTactics(random);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary-500/10 rounded-full">
                <p className="text-primary-400 text-sm font-medium">
                  Revolutionizing Football Analysis
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                The Ultimate Platform for
                <span className="bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text"> Football Tactics</span>
              </h1>
              
              <p className="text-lg text-gray-300 max-w-xl">
                Explore an extensive collection of tactical analyses, formations, and strategies 
                from legendary managers throughout football history.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={scrollToFeatured}
                  className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                >
                  Explore Tactics
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Create Tactic
                </button>
              </div>

              {/* Sponsors/Stats Section */}
              <div className="pt-8 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-4">Trusted by top football clubs</p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-3xl font-bold text-white">100+</h4>
                    <p className="text-gray-400">Tactics</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white">50+</h4>
                    <p className="text-gray-400">Formations</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white">10,000+</h4>
                    <p className="text-gray-400">Daily Users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tactics Display */}
            <div className="relative lg:block">
              <div className="relative w-full max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-500/5 rounded-2xl"></div>
                
                {/* Tactics Card */}
                <div className="relative bg-gray-900/90 rounded-2xl p-6 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">Total Football</h3>
                    <p className="text-sm text-gray-400">Ajax 1974</p>
                  </div>
                  
                  {/* Formation Display */}
                  <div className="aspect-[3/4]">
                    <FormationDisplay
                      formation={heroTactic.formation}
                      positionsRolesFocuses={heroTactic.positionsRolesFocuses}
                    />
                  </div>
                  
                  {/* Formation Details */}
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Formation</p>
                      <p className="text-lg font-semibold text-white">{heroTactic.formation}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 text-sm">
                        Possession
                      </span>
                      <span className="px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 text-sm">
                        Attack
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Featured Tactics */}
          <section ref={featuredSectionRef}>
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-primary-500" size={24} />
              <h2 className="text-2xl font-bold">Featured Tactics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTactics.map((tactic) => (
                <PlaylistCard key={tactic.id} playlist={tactic} />
              ))}
            </div>
          </section>

          {/* Random Tactics */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-primary-500" size={24} />
              <h2 className="text-2xl font-bold">Discover Tactics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {randomTactics.map((tactic) => (
                <PlaylistCard 
                  key={tactic.id} 
                  playlist={{
                    id: tactic.id,
                    title: tactic.tactic_name,
                    description: tactic.description,
                    tags: tactic.tags,
                    created_at: tactic.created_at
                  }} 
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <CreateTacticModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};