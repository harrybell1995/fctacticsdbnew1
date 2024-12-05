import React, { useState } from 'react';
import { decodeShareCode, decodePlayerRole, getFormationName, getFormationPositions } from '../utils/shareCodeDecoder';
import { FormationDisplay } from './FormationDisplay';

export const ShareCodeInput = () => {
  const [shareCode, setShareCode] = useState('');
  const [decodedTactic, setDecodedTactic] = useState<any>(null);
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      const decoded = decodeShareCode(shareCode);
      if (!decoded) {
        setError('Invalid share code');
        return;
      }

      const positions = getFormationPositions(decoded.formation);
      const formationName = getFormationName(decoded.formation);
      
      // Create position roles mapping
      const positionsRolesFocuses: Record<string, [string, string]> = {};
      
      decoded.instructions.forEach((instruction, index) => {
        const position = positions[index];
        const roleName = decodePlayerRole(instruction, position);
        const [role, focus] = roleName.split(' - ');
        positionsRolesFocuses[`Player ${index + 1}`] = [role, focus || 'Balanced'];
      });

      setDecodedTactic({
        ...decoded,
        formationName,
        positionsRolesFocuses
      });
      setError('');
    } catch (err) {
      setError('Failed to decode share code');
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">
          Share Code
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={shareCode}
            onChange={(e) => setShareCode(e.target.value)}
            placeholder="Enter share code..."
            className="flex-1 bg-gray-800 rounded-md border-gray-700 text-white px-4 py-2"
          />
          <button
            onClick={handleDecode}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Decode
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      {decodedTactic && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Formation: {decodedTactic.formationName}</h3>
              <FormationDisplay
                formation={decodedTactic.formationName}
                positionsRolesFocuses={decodedTactic.positionsRolesFocuses}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-300">Build-up Style</h4>
                <p className="text-white">{decodedTactic.buildup}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-300">Defensive Approach</h4>
                <p className="text-white">{decodedTactic.defensive}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-300">Player Instructions</h4>
                <div className="space-y-2 mt-2">
                  {Object.entries(decodedTactic.positionsRolesFocuses).map(([position, [role, focus]]) => (
                    <div key={position} className="flex justify-between text-sm">
                      <span className="text-gray-400">{position}:</span>
                      <span className="text-white">{role} - {focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};