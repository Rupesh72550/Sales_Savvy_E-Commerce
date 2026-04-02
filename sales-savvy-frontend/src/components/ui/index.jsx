import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md',
    blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    outline: 'border-2 border-gray-400 bg-transparent hover:bg-gray-50 text-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
    link: 'text-orange-500 underline-offset-4 hover:underline font-bold',
  };

  return (
    <button 
      className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-50 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-14 w-full rounded-xl border-2 border-gray-300 bg-white px-6 py-4 text-base text-black transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${className}`}
      {...props}
    />
  );
};

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg border border-gray-100 rounded-2xl p-8 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-accent text-white',
    secondary: 'bg-gray-100 text-gray-800',
    outline: 'text-primary border border-border',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
