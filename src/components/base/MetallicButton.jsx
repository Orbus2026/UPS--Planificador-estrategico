import React from 'react';
import { motion as Motion } from 'framer-motion';

const MetallicButton = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "relative px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all overflow-hidden border border-transparent";
  
  const variants = {
    primary: "text-white bg-blue-600 shadow-lg shadow-blue-500/20",
    secondary: "text-gray-400 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200",
    outline: "border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/5"
  };

  return (
    <Motion.button
      whileHover={{ scale: 1.02, translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </Motion.button>
  );
};

export default MetallicButton;
