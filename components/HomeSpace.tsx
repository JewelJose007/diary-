
import React from 'react';
import { Layout } from './Layout';
import { DiaryView } from '../types';

interface HomeSpaceProps {
  onNavigate: (view: DiaryView) => void;
  dayCount: number;
}

export const HomeSpace: React.FC<HomeSpaceProps> = ({ onNavigate, dayCount }) => {
  const choices: { id: DiaryView; label: string; desc: string; pos: string }[] = [
    { id: 'write', label: 'Write', desc: 'Capture a thought', pos: 'top-[10%] left-[15%]' },
    { id: 'permission', label: 'Pause', desc: 'Find permission', pos: 'top-[40%] right-[10%]' },
    { id: 'reflect', label: 'Reflect', desc: 'Look inward', pos: 'bottom-[35%] left-[5%]' },
    { id: 'journal', label: 'Archive', desc: 'Your history', pos: 'bottom-[10%] right-[20%]' }
  ];

  return (
    <Layout>
      <div className="text-center mt-8 mb-16">
        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-300 font-medium block mb-4">Steady Heart Sanctuary</span>
        <h1 className="font-serif italic text-4xl text-zinc-800 tracking-tight leading-tight">
          Where shall we go?
        </h1>
      </div>

      <div className="relative flex-1 w-full max-w-sm mx-auto">
        {/* Decorative connecting lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20,20 L80,45 L15,65 L70,90" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </svg>
        </div>

        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onNavigate(choice.id)}
            className={`absolute ${choice.pos} group flex flex-col items-center p-6 transition-all duration-700 active:scale-90`}
          >
            <div className="w-3 h-3 bg-zinc-200 rounded-full group-hover:bg-zinc-800 transition-colors mb-4 shadow-sm border border-white"></div>
            <h3 className="text-[12px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-900 transition-colors font-medium whitespace-nowrap">
              {choice.label}
            </h3>
            <p className="text-[10px] text-zinc-300 italic font-serif absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
              {choice.desc}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-auto py-8 text-center flex flex-col gap-6">
        <div className="flex justify-center gap-12">
          <button 
            onClick={() => onNavigate('reset')}
            className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 hover:text-zinc-600 active:text-zinc-900 transition-colors"
          >
            Weekly Reset
          </button>
          <button 
            onClick={() => onNavigate('closing')}
            className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 hover:text-zinc-600 active:text-zinc-900 transition-colors"
          >
            Goodbye
          </button>
        </div>
        <p className="text-[9px] text-zinc-200 tracking-[0.2em] uppercase">Day {dayCount} in the sanctuary</p>
      </div>
    </Layout>
  );
};
