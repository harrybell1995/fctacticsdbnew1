import React, { useState } from 'react';
import { Tooltip } from './Tooltip';

interface FormationDisplayProps {
  formation: string;
  positionsRolesFocuses: Record<string, [string, string]>;
}

const getPositionCoordinates = (formation: string, playerNumber: number): { x: number, y: number } => {
  const formationCoords: Record<string, Array<{ x: number, y: number }>> = {
    '4-4-2': [
      { x: 50, y: 10 },  // GK
      { x: 20, y: 30 },  // LB
      { x: 35, y: 30 },  // LCB
      { x: 65, y: 30 },  // RCB
      { x: 80, y: 30 },  // RB
      { x: 20, y: 60 },  // LM
      { x: 35, y: 60 },  // LCM
      { x: 65, y: 60 },  // RCM
      { x: 80, y: 60 },  // RM
      { x: 35, y: 85 },  // LS
      { x: 65, y: 85 }   // RS
    ],
    '4-1-4-1': [
      { x: 50, y: 10 },  // GK
      { x: 20, y: 30 },  // LB
      { x: 35, y: 30 },  // LCB
      { x: 65, y: 30 },  // RCB
      { x: 80, y: 30 },  // RB
      { x: 50, y: 45 },  // DM
      { x: 20, y: 60 },  // LM
      { x: 35, y: 60 },  // LCM
      { x: 65, y: 60 },  // RCM
      { x: 80, y: 60 },  // RM
      { x: 50, y: 85 }   // ST
    ],
    '4-2-1-3': [
      { x: 50, y: 10 },  // GK
      { x: 20, y: 30 },  // LB
      { x: 35, y: 30 },  // LCB
      { x: 65, y: 30 },  // RCB
      { x: 80, y: 30 },  // RB
      { x: 35, y: 45 },  // LDM
      { x: 65, y: 45 },  // RDM
      { x: 50, y: 60 },  // CAM
      { x: 20, y: 80 },  // LW
      { x: 50, y: 85 },  // ST
      { x: 80, y: 80 }   // RW
    ],
    '3-4-2-1': [
      { x: 50, y: 10 },  // GK
      { x: 30, y: 30 },  // LCB
      { x: 50, y: 30 },  // CB
      { x: 70, y: 30 },  // RCB
      { x: 20, y: 50 },  // LWB
      { x: 40, y: 50 },  // LCM
      { x: 60, y: 50 },  // RCM
      { x: 80, y: 50 },  // RWB
      { x: 35, y: 70 },  // LAM
      { x: 65, y: 70 },  // RAM
      { x: 50, y: 85 }   // ST
    ],
    '3-5-2': [
      { x: 50, y: 10 },  // GK
      { x: 30, y: 30 },  // LCB
      { x: 50, y: 30 },  // CB
      { x: 70, y: 30 },  // RCB
      { x: 20, y: 50 },  // LWB
      { x: 35, y: 45 },  // LDM
      { x: 65, y: 45 },  // RDM
      { x: 80, y: 50 },  // RWB
      { x: 50, y: 70 },  // CAM
      { x: 35, y: 85 },  // LS
      { x: 65, y: 85 }   // RS
    ]
  };

  const coords = formationCoords[formation] || formationCoords['4-4-2'];
  return coords[playerNumber - 1] || { x: 50, y: 50 };
};

export const FormationDisplay: React.FC<FormationDisplayProps> = ({ 
  formation, 
  positionsRolesFocuses 
}) => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[3/4] bg-green-800 rounded-lg overflow-hidden">
      {/* Pitch markings */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Center circle */}
        <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Halfway line */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.3" />
        {/* Penalty areas */}
        <rect x="30" y="0" width="40" height="20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        <rect x="30" y="80" width="40" height="20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Goal areas */}
        <rect x="40" y="0" width="20" height="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        <rect x="40" y="92" width="20" height="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
      </svg>

      {/* Player positions */}
      {Object.entries(positionsRolesFocuses).map(([position, [role, focus]]) => {
        const playerNumber = parseInt(position.split(' ')[1]);
        const coords = getPositionCoordinates(formation, playerNumber);
        
        return (
          <div
            key={position}
            className="absolute w-10 h-10 rounded-full bg-white/90 shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors group"
            style={{ 
              left: `${coords.x}%`, 
              top: `${coords.y}%`,
            }}
            onMouseEnter={() => setHoveredPosition(position)}
            onMouseLeave={() => setHoveredPosition(null)}
          >
            <div className="text-lg font-bold text-gray-900 group-hover:text-white">
              {playerNumber}
            </div>
            {hoveredPosition === position && (
              <Tooltip>
                <div className="font-semibold">{role}</div>
                <div className="opacity-75">{focus}</div>
              </Tooltip>
            )}
          </div>
        );
      })}

      {/* Formation label */}
      <div className="absolute bottom-2 right-2 text-white/70 text-sm font-medium">
        {formation}
      </div>
    </div>
  );
};