import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, PlusCircle, Clock, Share2 } from 'lucide-react';
import { CreateTacticModal } from './CreateTacticModal';
import { ThemeToggle } from './ThemeToggle';
import { useLikedTacticsStore } from '../store/likedTacticsStore';
import { useTactics } from '../context/TacticsContext';
import { supabase } from '../lib/supabase';

const DECADES = ['1960', '1970', '1980', '1990', '2000', '2010', '2020'];

export const Sidebar = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const likedTactics = useLikedTacticsStore(state => state.likedTactics);
  const { setSelectedCategory, setSelectedDecade } = useTactics();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('tacticsPlaylists')
        .select('category')
        .not('category', 'is', null);

      if (!error && data) {
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)))
          .filter(Boolean)
          .sort();
        setCategories(uniqueCategories);
      }
    };

    fetchCategories();
  }, []);

  const handleStyleClick = async (style: string) => {
    setSelectedStyle(style);
    setSelectedDecade(null);
    setSelectedCategory(style);
    navigate(`/style/${style.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleDecadeClick = (decade: string) => {
    setSelectedStyle(null);
    setSelectedCategory('');
    setSelectedDecade(decade);
    navigate(`/decade/${decade}`);
  };

  return (
    <>
      <div className="w-64 bg-gray-50 dark:bg-black p-6 flex flex-col gap-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800 h-full">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">Tactics Library</Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-full">
            <Home size={24} />
            <span className="font-semibold">Home</span>
          </Link>
          <Link to="/search" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-full">
            <Search size={24} />
            <span className="font-semibold">Search</span>
          </Link>
          <Link to="/liked" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-full">
            <Heart size={24} />
            <span className="font-semibold">Liked Tactics</span>
            {likedTactics.length > 0 && (
              <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                {likedTactics.length}
              </span>
            )}
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
          >
            <PlusCircle size={24} />
            <span className="font-semibold">Create Tactic</span>
          </button>
          
          <div className="mt-4">
            <h3 className="text-sm uppercase text-gray-500 font-bold mb-2">Playing Styles</h3>
            <div className="space-y-2">
              {categories.map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleClick(style)}
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
                    selectedStyle === style 
                      ? 'bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm uppercase text-gray-500 font-bold mb-2">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                Tactics by Era
              </span>
            </h3>
            <div className="space-y-2">
              {DECADES.map((decade) => (
                <button
                  key={decade}
                  onClick={() => handleDecadeClick(decade)}
                  className="w-full text-left py-2 px-4 rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {decade}s
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateTacticModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};