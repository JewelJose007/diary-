
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { DailyPrompt } from '../types';

interface DailyPageProps {
  day: number;
  promptData: DailyPrompt;
  onSave: (text: string) => Promise<string>;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const DailyPage: React.FC<DailyPageProps> = ({ day, promptData, onSave, onNext, onBack, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!inputText.trim()) return;
    setIsSubmitting(true);
    const result = await onSave(inputText);
    setInsight(result);
    setIsSubmitting(false);
  };

  const handleNext = () => {
    setInsight(null);
    setInputText('');
    onNext();
  };

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Layout>
      <header className="mb-12 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium">
            Day {day}
          </span>
          <span className="text-xs text-zinc-300 italic font-light">
            {dateStr}
          </span>
        </div>
        <h2 className="text-3xl font-serif italic text-zinc-800 leading-tight pr-8">
          {promptData.line}
        </h2>
      </header>

      <div className="flex-1 mb-16">
        <p className="text-sm text-zinc-400 mb-8 font-medium italic tracking-wide">
          {promptData.prompt}
        </p>
        
        {insight ? (
          <div className="bg-zinc-50 border border-zinc-100 p-10 mb-8 animate-in slide-in-from-bottom-4 duration-700">
             <p className="text-zinc-600 leading-relaxed font-light italic text-lg">"{insight}"</p>
             <div className="mt-10">
               <Button onClick={handleNext} variant="secondary">Next Day</Button>
             </div>
          </div>
        ) : (
          <div className="relative group">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isSubmitting}
              className="w-full min-h-[300px] bg-transparent border-none focus:ring-0 text-xl text-zinc-800 leading-relaxed resize-none outline-none placeholder:text-zinc-200 transition-opacity"
              placeholder="Write here..."
              autoFocus
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-100 group-focus-within:bg-zinc-900 transition-all duration-700"></div>
          </div>
        )}
      </div>

      {!insight && (
        <footer className="flex justify-between items-center py-4">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <div className="flex gap-6">
            <Button variant="ghost" className="text-zinc-300" onClick={onClose}>Close</Button>
            <Button 
              onClick={handleSave} 
              disabled={!inputText.trim() || isSubmitting}
            >
              {isSubmitting ? 'Listening...' : 'Save & Reflect'}
            </Button>
          </div>
        </footer>
      )}
    </Layout>
  );
};
