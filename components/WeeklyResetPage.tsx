
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { WeeklyReset } from '../types';

interface WeeklyResetPageProps {
  data: WeeklyReset;
  onComplete: (responses: string[], carryingForward: string) => void;
  onBack: () => void;
}

export const WeeklyResetPage: React.FC<WeeklyResetPageProps> = ({ data, onComplete, onBack }) => {
  const [responses, setResponses] = useState(['', '', '']);
  const [carryingForward, setCarryingForward] = useState('');

  const handleResponseChange = (idx: number, val: string) => {
    const next = [...responses];
    next[idx] = val;
    setResponses(next);
  };

  return (
    <Layout>
      <header className="mb-16 border-b border-zinc-100 pb-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 font-medium">Weekly Reset</h2>
        <p className="text-zinc-600 font-serif italic text-2xl leading-snug">“{data.quote}”</p>
      </header>

      <div className="space-y-16 mb-16">
        {data.questions.map((q, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wider">{q}</label>
            <textarea
              value={responses[idx]}
              onChange={(e) => handleResponseChange(idx, e.target.value)}
              className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-900 py-2 outline-none transition-all text-zinc-800 resize-none min-h-[60px] font-light"
              placeholder="..."
            />
          </div>
        ))}

        <div className="flex flex-col pt-4">
          <label className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wider">What I’m carrying forward</label>
          <textarea
            value={carryingForward}
            onChange={(e) => setCarryingForward(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-100 p-8 focus:border-zinc-200 focus:bg-white outline-none transition-all text-zinc-800 resize-none min-h-[160px] leading-relaxed"
            placeholder="Quiet thoughts for the coming week..."
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={() => onComplete(responses, carryingForward)}>Reset Complete</Button>
      </div>
    </Layout>
  );
};
