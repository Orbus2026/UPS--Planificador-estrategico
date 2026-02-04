import React from 'react';

const MetallicInput = ({ label, icon: Icon, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          className={`w-full ${Icon ? 'pl-12' : 'px-6'} pr-6 py-3 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium border border-white/20 shadow-inner`}
        />
      </div>
    </div>
  );
};

export default MetallicInput;
