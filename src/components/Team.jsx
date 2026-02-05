
import React from 'react';
import { 
    Share2, Users, Download, Activity, Search, Shield, 
    UserCheck, ShieldCheck, History, MessageSquare, 
    UserPlus, Clock, MoreHorizontal 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ActivityItem = ({ user, action, time, detail, avatar }) => {
    const FACELESS_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";
    return (
        <div className="flex gap-4 relative pb-10 last:pb-0">
            <div className="absolute left-6 top-12 bottom-0 w-[2px] bg-gray-100 dark:bg-slate-700/50"></div>
            <div className="relative z-10">
                <img src={avatar || FACELESS_AVATAR} className="w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl object-cover" alt={user} />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center ${action.includes('validó') ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                    {action.includes('validó') ? <ShieldCheck size={10} className="text-white" /> : <Clock size={10} className="text-white" />}
                </div>
            </div>
            <div className="flex-1 pt-1">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <span className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">{user}</span>
                        <span className="text-xs font-bold text-gray-400 lowercase tracking-tight"> {action} </span>
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md self-start sm:self-auto">{detail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-black tracking-widest bg-gray-50 dark:bg-slate-900 px-2 py-1 rounded-lg">
                        {time}
                    </div>
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm leading-relaxed max-w-2xl">
                    "Actividad registrada automáticamente en el sistema UPS Planner."
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    const { getRoleLabel, users } = useAuth();
    const FACELESS_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";

    // Replicate activity feed logic for real users
    const activities = users.slice(0, 4).map((u, i) => ({
        user: u.name,
        action: i % 2 === 0 ? "actualizó el KPI" : "subió evidencia a",
        detail: `DOC-${i + 10}`,
        time: "Reciente",
        avatar: u.avatar || FACELESS_AVATAR
    }));

    return (
        <div className="space-y-10 animate-fade-in pb-12 overflow-x-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)] tracking-tight">Estructura Colaborativa</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">MONITOREO DE ACTIVIDAD Y JERARQUÍA DE USUARIOS</p>
                </div>
                <button className="btn btn-primary px-8 py-3 shadow-xl shadow-blue-500/30">
                    <UserPlus size={18} strokeWidth={2.5} />
                    Gestión de Equipo
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Activity Feed */}
                <div className="lg:col-span-8 card p-10 bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="font-bold text-xl text-[var(--accent-dark)] flex items-center gap-3">
                            <History size={24} className="text-blue-500" />
                            Log Transaccional
                        </h3>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-400 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    <div className="space-y-4 overflow-x-auto">
                        <div className="min-w-[400px]">
                            {activities.map((a, i) => (
                                <ActivityItem key={i} {...a} />
                            ))}
                        </div>
                    </div>
                    <button className="w-full mt-10 py-4 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-200 hover:text-blue-500 transition-all">
                        Cargar historial completo
                    </button>
                </div>

                {/* Team Members */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card p-8 h-fit">
                        <h3 className="font-bold text-xl mb-8 text-[var(--accent-dark)] flex items-center gap-3">
                            <MessageSquare size={24} className="text-emerald-500" />
                            Roles y Accesos
                        </h3>
                        <div className="space-y-5">
                            {users.map((m, i) => (
                                <div key={m.uid} className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50 p-3 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-blue-500/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={m.avatar || FACELESS_AVATAR} className="w-12 h-12 rounded-2xl object-cover bg-gray-100 dark:bg-slate-700" alt={m.name} />
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-white dark:border-slate-900 rounded-full ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight truncate w-32">{m.name}</p>
                                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest">{getRoleLabel(m.role)}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 rounded-xl text-blue-500 shadow-sm transition-all hover:scale-110">
                                        <MessageSquare size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-black text-lg mb-2">Seguridad Activa</h4>
                            <p className="text-xs text-blue-100 font-medium leading-relaxed">Solo los directores pueden validar evidencias de alto impacto.</p>
                        </div>
                        <ShieldCheck size={120} className="absolute -bottom-4 -right-10 text-white opacity-10 rotate-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
