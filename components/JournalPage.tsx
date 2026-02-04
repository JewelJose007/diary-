
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { DiaryEntry } from '../types';

interface JournalPageProps {
  entries: DiaryEntry[];
  onBack: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ entries, onBack }) => {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (selectedEntry) {
    return (
      <Layout>
        <header className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium block mb-2">
            {new Date(selectedEntry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <h2 className="text-3xl font-serif italic text-zinc-800">
            {selectedEntry.type === 'daily' ? 'Journal Entry' : selectedEntry.type.charAt(0).toUpperCase() + selectedEntry.type.slice(1)}
          </h2>
        </header>

        <div className="flex-1 space-y-12 mb-16">
          <p className="text-lg text-zinc-700 leading-relaxed whitespace-pre-wrap font-light">
            {selectedEntry.content || (selectedEntry.type === 'permission' ? "A moment of stillness." : "No text captured.")}
          </p>

          {selectedEntry.mood && (
            <div className="pt-8 border-t border-zinc-100">
              <span className="text-[10px] uppercase tracking-widest text-zinc-300 block mb-2">Atmosphere</span>
              <span className="text-sm italic text-zinc-500">{selectedEntry.mood}</span>
            </div>
          )}

          {selectedEntry.gratitude && selectedEntry.gratitude.length > 0 && (
            <div className="pt-8 border-t border-zinc-100">
              <span className="text-[10px] uppercase tracking-widest text-zinc-300 block mb-4">Small Lights</span>
              <ul className="space-y-2">
                {selectedEntry.gratitude.map((g, i) => (
                  <li key={i} className="text-sm text-zinc-600 italic">• {g}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button variant="ghost" onClick={() => setSelectedEntry(null)}>Back to Archive</Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="mb-16">
        <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-300 mb-4 font-medium">Archive</h2>
        <h1 className="text-4xl font-serif italic text-zinc-800">Your Story</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 mb-16">
        {sortedEntries.length === 0 ? (
          <p className="text-zinc-400 italic py-20 text-center">The pages are still waiting to be filled.</p>
        ) : (
          sortedEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="text-left p-8 bg-white border border-zinc-50 hover:border-zinc-200 transition-all duration-500 rounded-xl group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-medium">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                {entry.mood && (
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 italic">
                    {entry.mood}
                  </span>
                )}
              </div>
              <p className="text-zinc-500 text-sm line-clamp-2 italic font-serif group-hover:text-zinc-800 transition-colors">
                {entry.content || "A silent entry."}
              </p>
            </button>
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" onClick={onBack}>Return Home</Button>
      </div>
    </Layout>
  );
};
