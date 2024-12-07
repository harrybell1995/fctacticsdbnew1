import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Adjust path as needed
import { decodeShareCode,   decodePlayerRole,   getFormationName,   getFormationPositions } from '../utils/shareCodeDecoder';
import { clubs, leagues } from '../utils/clubData';
import { ROLES, TACTIC_TAGS } from '../utils/constants';

// Interfaces for type safety
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
  tacticTags: string[]; 
  positions_focuses_roles: string[]; 
  verified: string;
  formation_id: string[]; 
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Constants for dropdown options
const BUILDUP_STYLES = ['Balanced', 'Counter', 'Short Passing'];
const DEFENSIVE_APPROACHES = ['Deep', 'Normal', 'High', 'Aggressive'];

interface TacticTagsSelectorProps {
  formData: {
    tacticTags?: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function decodeShareCodeToPlayerRoles(shareCode: string): Record<string, [string, string]> {
  const decodedTactics = decodeShareCode(shareCode);
  if (!decodedTactics) return {};

  const formationPositions = getFormationPositions(decodedTactics.formation);

  const playerRoles = decodedTactics.instructions.map((instruction, index) => {
    const positionGroup = formationPositions[index];
    const roleName = decodePlayerRole(instruction, positionGroup);
    
    const roleTypes: Record<string, string> = {
      'Defend': 'Defend',
      'Support': 'Balanced',
      'Attack': 'Wide'
    };

    const positionKey = Object.keys(ROLES).find(key => 
      ROLES[key as keyof typeof ROLES].some(role => role.name.toLowerCase() === roleName.toLowerCase())
    );

    const roleType = positionKey 
      ? ROLES[positionKey as keyof typeof ROLES].find(
          role => role.name.toLowerCase() === roleName.toLowerCase()
        )?.type 
      : 'Support';

    const finalRoleType = roleTypes[roleType || 'Support'] || 'Balanced';

    return { [`Player ${index + 1}`]: [roleName, finalRoleType] };
  });

  return Object.assign({}, ...playerRoles);
}

export const CreateTacticModal: React.FC<Props> = ({ isOpen, onClose }) => {
  // Initial form state
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
    shareCode: '',
    tacticTags: [],
    formation_id: [],
    positions_focuses_roles: [],
    verified: 'FALSE'
  });

  const handleTagSelection = (tag: string) => {
    setFormData((prev) => {
      const currentTags = prev.tacticTags || [];
      
      // If tag is already selected, remove it
      if (currentTags.includes(tag)) {
        return {
          ...prev,
          tacticTags: currentTags.filter(t => t !== tag)
        };
      }
      
      // If less than 3 tags are selected, add the tag
      if (currentTags.length < 3) {
        return {
          ...prev,
          tacticTags: [...currentTags, tag]
        };
      }
      
      // If 3 tags are already selected, replace the first tag
      return {
        ...prev,
        tacticTags: [tag, ...currentTags.slice(1)]
      };
    });
  };

  // State for decoded tactic, errors, and UI interactions
  const [decodedTactic, setDecodedTactic] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClubSuggestions, setShowClubSuggestions] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  // Handle share code input and decoding
  const handleShareCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, shareCode: code }));
    
    if (code.length === 11) {
      try {
        const decoded = decodeShareCode(code);
        if (decoded) {
          const formationId = decoded.formation;
          const positions = getFormationPositions(decoded.formation);
          
          const positionsRolesFocuses: Record<string, [string, string]> = {};
          decoded.instructions.forEach((instruction, index) => {
            const position = positions[index];
            const roleName = decodePlayerRole(instruction, position);
            const [role, focus] = roleName.split(' - ');
            positionsRolesFocuses[`Player ${index + 1}`] = [role, focus || 'Balanced'];
          });

          setDecodedTactic({
            formation: formationId,
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

  // Handle club input and suggestions
  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, club: value }));
    
    const filtered = clubs.filter(club => 
      club.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClubs(filtered);
    setShowClubSuggestions(true);
  };

  // Select a club from suggestions
  const selectClub = (club: typeof clubs[0]) => {
    setFormData(prev => ({
      ...prev,
      club: club.name,
      league: club.league,
      clubcountry: club.country
    }));
    setShowClubSuggestions(false);
  };

  // Submit form to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate share code
    if (!formData.shareCode || formData.shareCode.length !== 11) {
      setError('Share code is required and must be 11 characters');
      return;
    }
  
    // Validate tactic tags (exactly 3 required)
    if (!formData.tacticTags || formData.tacticTags.length !== 3) {
      setError('Please select exactly 3 tactic tags');
      return;
    }
  
    setIsSubmitting(true);
    setError('');
    const finalformationid = { id: decodedTactic?.formation };
    try {
      // Insert tactic into Supabase
      const { data, error } = await supabase
      .from('tacticsTable')
      .insert({
        tactic_name: formData.tacticname,
        manager_name: formData.manager,
        year: formData.year,
        club: formData.club,
        club_country: formData.clubcountry,
        league: formData.league,
        description: formData.notes,
        share_code: formData.shareCode,
        tags: formData.tacticTags,         
        // Optional: Store decoded tactic details
        formation_id: finalformationid,
        build_up_style: decodedTactic ? BUILDUP_STYLES[decodedTactic.buildup] : null,
        defensive_approach: decodedTactic ? DEFENSIVE_APPROACHES[decodedTactic.defensive] : null,
        positions_focuses_roles: decodedTactic ? decodedTactic.positionsRolesFocuses : null,
        verified: 'FALSE',
      });
  
      if (error) {
        console.error('Supabase insertion error:', error);
        throw error;
      }
      
      // Reset form and close modal
      setFormData({
        tacticname: '',
        manager: '',
        year: new Date().getFullYear().toString(),
        club: '',
        clubcountry: '',
        league: '',
        buildupstyle: 'Balanced',
        defensiveapproach: 'Normal',
        notes: '',
        shareCode: '',
        tacticTags: [], // Reset tactic tags
        positions_focuses_roles: [],
        verified: 'FALSE',
        formation_id: [],
      });
      
      onClose(); // Close the modal
    } catch (err) {
      // Handle submission errors
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the tactic');
      console.error('Supabase insertion error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Render submit button with loading state
  const renderSubmitButton = () => {
    if (isSubmitting) {
      return (
        <button 
          type="submit" 
          disabled 
          className="px-4 py-2 bg-green-500 text-white rounded-md opacity-50 cursor-not-allowed"
        >
          Creating Tactic...
        </button>
      );
    }

    return (
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Create Tactic
      </button>
    );
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-[90%] sm:max-w-xl md:max-w-4xl lg:max-w-6xl max-h-screen overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-900 p-4 sm:p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold">Create New Tactic</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Share Code Input */}
          <div>
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
  
          {/* Decoded Tactic Display */}
          {decodedTactic && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Decoded Tactic</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-400">Formation: <span className="text-white">{getFormationName(decodedTactic.formation)}</span></p>
                  <p className="text-gray-400">Build-up Style: <span className="text-white">{BUILDUP_STYLES[decodedTactic.buildup]}</span></p>
                  <p className="text-gray-400">Defensive Approach: <span className="text-white">{DEFENSIVE_APPROACHES[decodedTactic.defensive]}</span></p>
                </div>
              </div>
            </div>
          )}
  
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Tactic Name */}
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
  
            {/* Manager Name */}
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
          </div>
  
          {/* Tags Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tactic Tags (Select 3) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(TACTIC_TAGS).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagSelection(tag)}
                  className={`px-3 py-2 rounded-md text-sm ${formData.tacticTags?.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {formData.tacticTags && (
              <div className="mt-2 text-sm text-gray-400">
                Selected Tags: {formData.tacticTags.join(', ')}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Club Input with Suggestions */}
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

            {/* League Input */}
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


            {/* Year Input */}
 
              {/* Year Input */}
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


          {/* Notes */}
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
  
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            {renderSubmitButton()}
          </div>
        </form>
      </div>
    </div>
  );
  
};