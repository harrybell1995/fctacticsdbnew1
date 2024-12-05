import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

interface Position {
  id: string;
  role: string;
  focus: string;
  x: number;
  y: number;
}

interface Props {
  positions: Position[];
  onChange: (positions: Position[]) => void;
  formation: string;
}

const ROLES = {
  GK: ['Sweeper Keeper', 'Traditional'],
  DEF: ['Full Back', 'Wing Back', 'Center Back', 'Ball Playing Defender'],
  MID: ['Deep Lying Playmaker', 'Box to Box', 'Advanced Playmaker', 'Defensive Mid'],
  ATT: ['Inside Forward', 'Complete Forward', 'Target Man', 'False 9']
};

const FOCUSES = ['Support', 'Attack', 'Defend', 'Automatic'];

export const FormationEditor: React.FC<Props> = ({ positions, onChange, formation }) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePositionClick = (position: Position) => {
    setSelectedPosition(position);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, position: Position) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedPosition(position);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const pitch = (moveEvent.target as HTMLElement).closest('.pitch');
      if (!pitch) return;

      const rect = pitch.getBoundingClientRect();
      const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      // Clamp values between 0 and 100
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      updatePosition(position.id, { x: clampedX, y: clampedY });
    };

    const handleEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  const updatePosition = (id: string, updates: Partial<Position>) => {
    const newPositions = positions.map(pos => 
      pos.id === id ? { ...pos, ...updates } : pos
    );
    onChange(newPositions);
  };

  const getRoleOptions = (y: number) => {
    if (y < 20) return ROLES.GK;
    if (y < 40) return ROLES.DEF;
    if (y < 70) return ROLES.MID;
    return ROLES.ATT;
  };

  return (
    <div className="mt-6 flex gap-6">
      <div className="relative w-96 h-[600px] bg-green-800 rounded-lg overflow-hidden pitch">
        {/* Pitch markings */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/30 rounded-full" />
          <div className="absolute top-1/2 w-full border border-white/30" />
        </div>

        {/* Player positions */}
        {positions.map((pos) => (
          <button
            key={pos.id}
            className={`absolute w-8 h-8 rounded-full bg-white/90 shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-sm transition-colors cursor-move ${
              selectedPosition?.id === pos.id ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              touchAction: 'none'
            }}
            onClick={() => handlePositionClick(pos)}
            onMouseDown={(e) => handleDragStart(e, pos)}
            onTouchStart={(e) => handleDragStart(e, pos)}
          >
            {pos.id}
          </button>
        ))}
      </div>

      {/* Position configuration panel */}
      {selectedPosition && (
        <div className="flex-1 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Position {selectedPosition.id}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <GripVertical size={20} />
              <span>{Math.round(selectedPosition.x)}%, {Math.round(selectedPosition.y)}%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <select
                value={selectedPosition.role}
                onChange={(e) => updatePosition(selectedPosition.id, { role: e.target.value })}
                className="w-full bg-gray-700 rounded-md border-gray-600 text-white px-4 py-2"
              >
                {getRoleOptions(selectedPosition.y).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Focus
              </label>
              <select
                value={selectedPosition.focus}
                onChange={(e) => updatePosition(selectedPosition.id, { focus: e.target.value })}
                className="w-full bg-gray-700 rounded-md border-gray-600 text-white px-4 py-2"
              >
                {FOCUSES.map(focus => (
                  <option key={focus} value={focus}>{focus}</option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Position Instructions</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Mark Tighter', 'Stay Wide', 'Get Forward', 'Stay Back'].map((instruction) => (
                  <label key={instruction} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                    <span className="text-sm text-gray-300">{instruction}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};