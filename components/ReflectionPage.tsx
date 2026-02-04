
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';

interface ReflectionPageProps {
  prompt: string;
  onComplete: (response: string) => void;
  onBack: () => void;
}

export const ReflectionPage: React.FC<ReflectionPageProps> = ({ prompt, onComplete, onBack }) => {
  const [response, setResponse] = useState('');

  return (
    <Layout>
      <header className="mb-16">
        <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-300 mb-6 font-medium">A Moment of Reflection</h2>
        <p className="text-2xl font-serif italic text-zinc-800 leading-snug">{prompt}</p>
      </header>

      <div className="flex-1 mb-16">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="w-full min-h-[300px] bg-transparent border-none focus:ring-0 text-xl text-zinc-700 leading-relaxed resize-none outline-none placeholder:text-zinc-200"
          placeholder="No right or wrong answers..."
          autoFocus
        />
      </div>

      <footer className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={() => onComplete(response)}>Save Reflection</Button>
      </footer>
    </Layout>
  );
};
