
import React from 'react';
import { Layout } from './Layout';
import { Button } from './Button';

interface MotivationPageProps {
  quote: string;
  onContinue: () => void;
}

export const MotivationPage: React.FC<MotivationPageProps> = ({ quote, onContinue }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center py-32 animate-in fade-in zoom-in-95 duration-1000">
        <p className="text-2xl font-light text-zinc-400 italic mb-16 leading-relaxed max-w-lg">
          “{quote}”
        </p>
        <Button variant="ghost" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </Layout>
  );
};
