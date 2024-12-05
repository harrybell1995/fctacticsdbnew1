import React, { useState } from 'react';
import { X } from 'lucide-react';
import { decodeShareCode, decodePlayerRole, getFormationName, getFormationPositions } from '../../utils/shareCodeDecoder';
import { clubs } from '../../utils/clubData';
import { TacticForm } from './TacticForm';
import { TacticPreview } from './TacticPreview';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTacticModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    tacticname: '',
    manager: '',
    year: new Date().getFullYear().toString(),
    club: '',
    clubcountry: '',
    league: '',
    notes: '',
    shareCode: ''
  });

  const [decodedTactic, setDecodedTactic] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showClubSuggestions, setShowClubSuggestions] = useState(false);
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  const handleFormDataChange = (newData: any) => {
    setFormData(newData);
    if (newData.shareCode.length === 11) {
      try {
        const decoded = decodeShareCode(newData.shareCode);
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
      <div className="bg-gray-900 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Tactic</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TacticForm
                formData={formData}
                setFormData={handleFormDataChange}
                error={error}
                handleClubChange={handleClubChange}
                selectClub={selectClub}
                showClubSuggestions={showClubSuggestions}
                setShowClubSuggestions={setShowClubSuggestions}
                filteredClubs={filteredClubs}
              />
              
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
            </div>

            <div className="lg:border-l lg:border-gray-800 lg:pl-6">
              <TacticPreview decodedTactic={decodedTactic} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};