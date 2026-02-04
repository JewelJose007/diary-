
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2 transition-all duration-300 text-sm font-medium tracking-wide outline-none";
  const variants = {
    primary: "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-900",
    secondary: "bg-transparent text-zinc-900 border border-zinc-200 hover:border-zinc-400",
    ghost: "bg-transparent text-zinc-500 hover:text-zinc-900"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
