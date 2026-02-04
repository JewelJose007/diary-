
import React from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { CLOSING_NOTE } from '../constants';

interface ClosingPageProps {
  onReturn: () => void;
}

export const ClosingPage: React.FC<ClosingPageProps> = ({ onReturn }) => {
  return (
    <Layout>
      <div className="max-w-md">
        <h1 className="font-serif italic text-4xl mb-8 text-zinc-800 tracking-tight">
          {CLOSING_NOTE.title}
        </h1>
        <p className="text-lg leading-relaxed text-zinc-500 mb-12">
          {CLOSING_NOTE.text}
        </p>
        <div className="flex justify-start">
          <Button onClick={onReturn}>Return home</Button>
        </div>
      </div>
    </Layout>
  );
};
