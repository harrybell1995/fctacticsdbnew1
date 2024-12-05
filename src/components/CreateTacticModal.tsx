import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { FormationDisplay } from './FormationDisplay';
import { decodeShareCode, decodePlayerRole, getFormationName, getFormationPositions } from '../utils/shareCodeDecoder';
import { clubs, leagues } from '../utils/clubData';

interface Position {
  id: string;
  role: string;
  focus: string;
  x: number;
  y: number;
}

interface TacticFormData {
  tacticname: string;
  manager: string;
  year: string;
  club: string;
  clubcountry: string;
  league: string;
  buildupstyle: string;
  defensiveapproach: string;
  notes: string;
  shareCode: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BUILDUP_STYLES = ['Balanced', 'Counter', 'Short Passing'];
const DEFENSIVE_APPROACHES = ['Deep', 'Normal', 'High', 'Aggressive'];

export const CreateTacticModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<TacticFormData>({
    tacticname: '',
    manager: '',
    year: new Date().getFullYear().toString(),
    club: '',
    clubcountry: '',
    league: '',
    buildupstyle: 'Balanced',
    defensiveapproach: 'Normal',
    notes: '',
    shareCode: ''
  });

  const [decodedTactic, setDecodedTactic] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showClubSuggestions, setShowClubSuggestions] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  const handleShareCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, shareCode: code }));
    
    if (code.length === 11) {
      try {
        const decoded = decodeShareCode(code);
        if (decoded) {
          const formationName = getFormationName(decoded.formation);
          const positions = getFormationPositions(decoded.formation);
          
          const positionsRolesFocuses: Record<string, [string, string]> = {};
          decoded.instructions.forEach((instruction, index) => {
            const position = positions[index];
            const roleName = decodePlayerRole(instruction, position);
            const [role, focus] = roleName.split(' - ');
            positionsRolesFocuses[`Player ${index + 1}`] = [role, focus || 'Balanced'];
          });

          setDecodedTactic({
            formation: formationName,
            buildup: decoded.buildup,
            defensive: decoded.defensive,
            positionsRolesFocuses
          });
          setError('');
        }
      } catch (err) {
        setError('Invalid share code');
        setDecodedTactic(null);
      }
    } else {
      setDecodedTactic(null);
      setError('');
    }
  };

  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, club: value }));
    
    const filtered = clubs.filter(club => 
      club.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClubs(filtered);
    setShowClubSuggestions(true);
  };

  const selectClub = (club: typeof clubs[0]) => {
    setFormData(prev => ({
      ...prev,
      club: club.name,
      league: club.league,
      clubcountry: club.country
    }));
    setShowClubSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.shareCode || formData.shareCode.length !== 11) {
      setError('Share code is required and must be 11 characters');
      return;
    }
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Tactic</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Share Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Share Code *
            </label>
            <input
              type="text"
              name="shareCode"
              value={formData.shareCode}
              onChange={handleShareCodeChange}
              className={`w-full bg-gray-800 rounded-md border ${error ? 'border-red-500' : 'border-gray-700'} text-white px-4 py-2`}
              required
              maxLength={11}
              placeholder="Enter 11-character share code"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {decodedTactic && (
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Decoded Tactic</h3>
              <div className="grid grid-cols-2 gap-6">
                <FormationDisplay
                  formation={decodedTactic.formation}
                  positionsRolesFocuses={decodedTactic.positionsRolesFocuses}
                />
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Formation: <span className="text-white">{decodedTactic.formation}</span></p>
                    <p className="text-gray-400">Build-up Style: <span className="text-white">{BUILDUP_STYLES[decodedTactic.buildup]}</span></p>
                    <p className="text-gray-400">Defensive Approach: <span className="text-white">{DEFENSIVE_APPROACHES[decodedTactic.defensive]}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tactic Name *
              </label>
              <input
                type="text"
                name="tacticname"
                value={formData.tacticname}
                onChange={(e) => setFormData(prev => ({ ...prev, tacticname: e.target.value }))}
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
                name="manager"
                value={formData.manager}
                onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
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
                  name="club"
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
                name="league"
                value={formData.league}
                onChange={(e) => setFormData(prev => ({ ...prev, league: e.target.value }))}
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
                name="year"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
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
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Create Tactic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};