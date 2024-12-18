import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Share2, Copy, User, Calendar, Trophy, Globe, Flag, Building2, MessageSquare } from 'lucide-react';
import { FormationDisplay } from './FormationDisplay';
import type { Tactic } from './types';

interface TacticCardProps {
  tactic: Tactic;
  isExpanded: boolean;
  onToggle: () => void;
  onTagClick?: (tag: string) => void;
}

export const TacticCard: React.FC<TacticCardProps> = ({ 
  tactic, 
  isExpanded, 
  onToggle, 
  onTagClick 
}) => {
  const [copied, setCopied] = useState(false);

  // Detailed positions logging with correct property name
  const copyShareCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(tactic.share_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  const formationId = tactic.formation_id.id || '';  // The formation ID (e.g., '36')
  const positions = tactic.positions_focuses_roles || {};
  // Log positions before passing to FormationDisplay
  console.log("Formation ID:", formationId);
  console.log("Positions data:", positions);
  console.log("Tactic data:", tactic);

  return (
    <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg overflow-hidden">
      <div 
        onClick={onToggle}
        className="p-4 cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-primary-500/20 rounded-md flex items-center justify-center">
            <Trophy className="text-primary-500" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{tactic.tactic_name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tactic.tags?.map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormationDisplay
              formationId={formationId}  // Pass the formation ID ('36')
              positionsRolesFocuses={positions}  // Pass the positions and roles data
              onRender={() => {
                console.log('FormationDisplay positions data:', {
                  inputPositions: positions,
                  hasData: Object.keys(positions).length > 0,
                  structure: Object.entries(positions).map(([key, value]) => ({
                    position: key,
                    data: value,
                  })),
                });
              }}
            />
            {/* Share Code and other details */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4 text-lg">Share Code</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tactic.share_code}
                    readOnly
                    className="flex-1 bg-black/20 rounded-md px-3 py-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={copyShareCode}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors"
                    title="Copy share code"
                  >
                    {copied ? <Share2 size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/90">
                  <span>{tactic.description || 'No description given.'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/90">
                  <User size={18} />
                  <span>Manager: {tactic.manager_name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar size={18} />
                  <span>Year: {tactic.year || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Trophy size={18} />
                  <span>Achievements: {tactic.achievements || 'None'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Flag size={18} />
                  <span>Region: {tactic.clubcountry || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Building2 size={18} />
                  <span>Club: {tactic.club || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <ChevronUp size={18} />
                  <span>Verified: {tactic.verified ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
