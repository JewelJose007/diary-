
import React, { useState } from 'react';
import { Layout } from './Layout';
import { Button } from './Button';

interface PermissionPageProps {
  line: string;
  onContinue: () => void;
}

export const PermissionPage: React.FC<PermissionPageProps> = ({ line, onContinue }) => {
  const [releaseText, setReleaseText] = useState('');
  const [isReleased, setIsReleased] = useState(false);

  const handleRelease = () => {
    if (!releaseText.trim()) return;
    setIsReleased(true);
    setTimeout(() => {
      setReleaseText('');
      setIsReleased(false);
    }, 2000);
  };

  return (
    <Layout className="bg-stone-50/20">
      <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in-95 duration-1000">
        <h2 className="text-3xl md:text-4xl font-serif italic text-zinc-800 leading-relaxed max-w-lg mb-12">
          {line}
        </h2>
        
        <div className="w-full max-w-sm mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-zinc-300 font-medium">
            Is there something you want to let go of?
          </p>
          <div className="relative">
            <input
              type="text"
              value={releaseText}
              onChange={(e) => setReleaseText(e.target.value)}
              disabled={isReleased}
              className={`w-full bg-transparent border-b border-zinc-100 py-3 text-center text-zinc-500 outline-none focus:border-zinc-300 transition-all duration-700 italic font-serif ${isReleased ? 'opacity-0 scale-95 blur-md' : 'opacity-100'}`}
              placeholder="Write and release..."
              onKeyPress={(e) => e.key === 'Enter' && handleRelease()}
            />
          </div>
          {releaseText.trim() && !isReleased && (
            <button 
              onClick={handleRelease}
              className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-800 transition-colors"
            >
              Release
            </button>
          )}
        </div>

        <Button variant="ghost" className="text-zinc-300 hover:text-zinc-900" onClick={onContinue}>
          Return
        </Button>
      </div>
    </Layout>
  );
};
