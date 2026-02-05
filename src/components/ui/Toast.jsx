import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const ToastItem = ({ id, type, message }) => {
  const { removeToast } = useToast();

  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-rose-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  const bgColors = {
    success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800',
    error: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
  };

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-center gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md min-w-[300px] max-w-md pointer-events-auto ${bgColors[type] || bgColors.info}`}
    >
      <div className="shrink-0">{icons[type] || icons.info}</div>
      <p className="flex-1 text-sm font-bold text-gray-700 dark:text-gray-200">{message}</p>
      <button 
        onClick={() => removeToast(id)} 
        className="shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={16} className="text-gray-400" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
