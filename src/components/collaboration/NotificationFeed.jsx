import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Clock, MessageSquare } from 'lucide-react';

const notifications = [
    { id: 1, type: 'success', title: 'Hito Validado', message: 'La Dirección de Innovación ha validado el hito "Revisión Curricular".', time: 'hace 5 min' },
    { id: 2, type: 'warning', title: 'Hito Retrasado', message: 'El hito "Capacitación Docente" ha superado su fecha límite.', time: 'hace 2 horas' },
    { id: 3, type: 'info', title: 'Nuevo Comentario', message: 'Juan Pérez dejó un comentario en la iniciativa "Red de Laboratorios".', time: 'hace 3 horas' },
];

const NotificationFeed = () => {
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
                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 truncate">{n.title}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{n.message}</p>
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
