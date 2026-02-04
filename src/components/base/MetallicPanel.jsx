import React from 'react';
import { motion as Motion } from 'framer-motion';

const MetallicPanel = ({ children, className = '', title, icon: Icon, delay = 0 }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`metallic-panel p-8 rounded-[2.5rem] shadow-2xl relative ${className}`}
    >
      {/* Internal Reflective Layer */}
      <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-3xl pointer-events-none" />
      
      {title && (
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600">
                <Icon size={24} />
              </div>
            )}
            <h3 className="text-xl font-black text-[var(--accent-dark)] tracking-normal py-1 leading-tight">{title}</h3>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </Motion.div>
  );
};

export default MetallicPanel;
