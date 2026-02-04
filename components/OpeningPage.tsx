
import React from 'react';
import { Layout } from './Layout';
import { Button } from './Button';
import { OPENING_NOTE } from '../constants';

interface OpeningPageProps {
  onEnter: () => void;
}

export const OpeningPage: React.FC<OpeningPageProps> = ({ onEnter }) => {
  return (
    <Layout>
      <div className="max-w-md">
        <h1 className="font-serif italic text-4xl mb-8 text-zinc-800 tracking-tight">
          {OPENING_NOTE.title}
        </h1>
        <p className="text-lg leading-relaxed text-zinc-500 mb-12">
          {OPENING_NOTE.text}
        </p>
        <div className="flex justify-start">
          <Button onClick={onEnter}>Enter</Button>
        </div>
      </div>
    </Layout>
  );
};
