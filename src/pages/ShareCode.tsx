import React from 'react';
import { ShareCodeInput } from '../components/ShareCodeInput';

export const ShareCode = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tactic Share Code</h1>
        <div className="bg-gray-800/50 rounded-lg">
          <ShareCodeInput />
        </div>
      </div>
    </div>
  );
};