
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-[100dvh] relative flex flex-col items-center justify-center px-6 md:px-12 py-12 safe-top safe-bottom overflow-hidden transition-colors duration-1000 ${className}`}>
      {/* Soft breathing background circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-stone-100/40 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-zinc-100/40 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '12s' }}></div>
      
      <div className="w-full max-w-xl flex flex-col flex-1 relative z-10 animate-in fade-in duration-1000">
        {children}
      </div>
    </div>
  );
};
