
import React from 'react';
import { MOODS } from '../constants';
import { MoodType } from '../types';

interface MoodTrackerProps {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="py-6 border-t border-zinc-100 mt-12">
      <p className="text-xs uppercase tracking-widest text-zinc-400 mb-6 font-medium">
        Tracking for awareness, not correction.
      </p>
      <div className="flex flex-wrap gap-3">
        {MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => onSelect(m.label)}
            className={`px-4 py-2 text-xs transition-all duration-300 border ${
              selectedMood === m.label
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-transparent text-zinc-500 border-zinc-100 hover:border-zinc-300'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
