import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

export const HomePageSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Navigate to the search page when the user starts typing
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search tactics, teams, or managers..."
        className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};
