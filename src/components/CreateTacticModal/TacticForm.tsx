import React from 'react';
import { Search } from 'lucide-react';
import { clubs, leagues } from '../../utils/clubData';

interface TacticFormProps {
  formData: any;
  setFormData: (data: any) => void;
  error: string;
  handleClubChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectClub: (club: any) => void;
  showClubSuggestions: boolean;
  setShowClubSuggestions: (show: boolean) => void;
  filteredClubs: any[];
}

export const TacticForm: React.FC<TacticFormProps> = ({
  formData,
  setFormData,
  error,
  handleClubChange,
  selectClub,
  showClubSuggestions,
  setShowClubSuggestions,
  filteredClubs,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Share Code *
        </label>
        <input
          type="text"
          value={formData.shareCode}
          onChange={(e) => setFormData({ ...formData, shareCode: e.target.value })}
          className={`w-full bg-gray-800 rounded-md border ${error ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2`}
          required
          maxLength={11}
          placeholder="Enter 11-character share code"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tactic Name *
          </label>
          <input
            type="text"
            value={formData.tacticname}
            onChange={(e) => setFormData({ ...formData, tacticname: e.target.value })}
            className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Manager Name *
          </label>
          <input
            type="text"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Club *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.club}
              onChange={handleClubChange}
              onFocus={() => setShowClubSuggestions(true)}
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2 pr-10"
              required
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {showClubSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredClubs.map((club) => (
                <button
                  key={club.name}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                  onClick={() => selectClub(club)}
                >
                  <div>{club.name}</div>
                  <div className="text-sm text-gray-400">{club.league}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            League *
          </label>
          <input
            type="text"
            value={formData.league}
            onChange={(e) => setFormData({ ...formData, league: e.target.value })}
            className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            required
            list="leagues"
          />
          <datalist id="leagues">
            {leagues.map(league => (
              <option key={league} value={league} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Year *
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
        />
      </div>
    </div>
  );
};