
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { MoodTracker } from './MoodTracker';
import { MoodType } from '../types';
import { DIARY_TITLES } from '../constants';

interface UnstructuredDiaryPageProps {
  day: number;
  onSave: (data: { content: string; mood?: MoodType; gratitude: string[] }) => Promise<void>;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

export const UnstructuredDiaryPage: React.FC<UnstructuredDiaryPageProps> = ({ day, onSave, onNext, onBack, onClose }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType | undefined>();
  const [gratitude, setGratitude] = useState(['', '']);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const title = DIARY_TITLES[day % DIARY_TITLES.length];

  const handleSave = async () => {
    if (!content.trim() && gratitude.every(g => !g.trim())) return;
    setIsSaving(true);
    // Simulate a brief cloud sync delay for "backend" feel
    await new Promise(r => setTimeout(r, 800));
    await onSave({ content, mood, gratitude: gratitude.filter(g => g.trim() !== '') });
    setIsSaving(false);
    setSaved(true);
  };

  const updateGratitude = (idx: number, val: string) => {
    const next = [...gratitude];
    next[idx] = val;
    setGratitude(next);
  };

  if (saved) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-40 animate-in fade-in duration-700">
           <p className="text-zinc-400 italic font-serif text-xl mb-12 text-center">Your thoughts have been safely stored.</p>
           <Button onClick={onNext}>Next Page</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 font-medium block mb-1">Page {day}</span>
          <h2 className="text-3xl font-serif italic text-zinc-800">{title}</h2>
        </div>
        <span className="text-[10px] text-zinc-300 italic mb-1">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </header>

      <div className="flex-1 space-y-8 mb-8 overflow-y-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[300px] bg-transparent border-none focus:ring-0 text-lg text-zinc-800 leading-relaxed resize-none outline-none placeholder:text-zinc-200"
          placeholder="Messy thoughts are welcome..."
          autoFocus
        />

        <div className="space-y-8 py-8 border-t border-zinc-100">
           <div>
             <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-4 block">Small Gratitudes (Optional)</label>
             <div className="space-y-3">
                {gratitude.map((g, i) => (
                  <input
                    key={i}
                    value={g}
                    onChange={(e) => updateGratitude(i, e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-50 focus:border-zinc-300 py-1 outline-none text-sm text-zinc-600 transition-colors"
                    placeholder={`Moment ${i+1}...`}
                  />
                ))}
             </div>
           </div>
           <MoodTracker selectedMood={mood} onSelect={setMood} />
        </div>
      </div>

      <footer className="flex justify-between items-center py-6 sticky bottom-0 bg-[#fafafa]/95 backdrop-blur-md">
        <Button variant="ghost" onClick={onBack} disabled={isSaving}>Back</Button>
        <div className="flex gap-4 items-center">
          {isSaving && <span className="text-[10px] text-zinc-300 animate-pulse uppercase tracking-widest">Syncing...</span>}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Finish Page'}
          </Button>
        </div>
      </footer>
    </Layout>
  );
};
