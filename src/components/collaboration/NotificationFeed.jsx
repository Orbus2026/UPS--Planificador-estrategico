import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Clock, MessageSquare } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const NotificationFeed = () => {
    const { getSmartAlerts } = React.useContext(DataContext);
    const notifications = getSmartAlerts().slice(0, 5); // Limit to 5 for UI clarity

    if (notifications.length === 0) {
        return (
            <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-[10px] text-slate-400 font-medium italic">No hay alertas críticas en este momento</p>
            </div>
        );
    }
    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Bell size={12} className="text-blue-500" />
                    Actividad Reciente
                </h4>
            </div>
            <div className="space-y-3">
                <AnimatePresence>
                    {notifications.map((n, index) => (
                        <Motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                        >
                            <div className="flex gap-3">
                                <div className={`p-2 rounded-lg shrink-0 ${
                                    n.type === 'success' ? 'bg-green-100 text-green-600' :
                                    n.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                    'bg-blue-100 text-blue-600'
                                }`}>
                                    {n.type === 'success' ? <CheckCircle2 size={14} /> :
                                     n.type === 'warning' ? <AlertCircle size={14} /> :
                                     <MessageSquare size={14} />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-tight mb-0.5">{n.title}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-snug">{n.message}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-400">
                                        <Clock size={10} />
                                        <span>{n.time}</span>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NotificationFeed;
