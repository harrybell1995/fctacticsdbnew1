import React from 'react';
import { FormationDisplay } from '../FormationDisplay';

interface TacticPreviewProps {
  decodedTactic: any;
}

const BUILDUP_STYLES = ['Balanced', 'Counter', 'Short Passing'];
const DEFENSIVE_APPROACHES = ['Deep', 'Normal', 'High', 'Aggressive'];

export const TacticPreview: React.FC<TacticPreviewProps> = ({ decodedTactic }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Formation Preview</h3>
      <div className="space-y-6">
        <FormationDisplay
          formation={decodedTactic?.formation || '4-4-2'}
          positionsRolesFocuses={decodedTactic?.positionsRolesFocuses || {}}
        />
        
        {decodedTactic && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-400">Formation:</p>
              <p className="text-white font-medium">{decodedTactic.formation}</p>
            </div>
            <div>
              <p className="text-gray-400">Build-up Style:</p>
              <p className="text-white font-medium">{BUILDUP_STYLES[decodedTactic.buildup]}</p>
            </div>
            <div>
              <p className="text-gray-400">Defensive Approach:</p>
              <p className="text-white font-medium">{DEFENSIVE_APPROACHES[decodedTactic.defensive]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};