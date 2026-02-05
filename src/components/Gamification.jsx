
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/useData';
import { Award, Trophy, Star, TrendingUp, CheckCircle2, ChevronRight, Zap, Users2, Target } from 'lucide-react';
import MetallicPanel from './base/MetallicPanel';

const Badge = ({ name, description, icon: Icon, unlocked }) => {
    return (
        <div className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-500 group relative ${unlocked ? 'bg-white dark:bg-slate-800 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-xl hover:-translate-y-2' : 'bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 grayscale opacity-40'}`}>
            {unlocked && <div className="absolute top-2 right-2"><Zap size={12} className="text-amber-400 fill-amber-400" /></div>}
            <div className={`p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 ${unlocked ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' : 'bg-gray-200 dark:bg-slate-700 text-gray-400'}`}>
                {React.createElement(Icon, { size: 28 })}
            </div>
            <h4 className="text-xs font-black text-center mb-1 uppercase tracking-tight text-[var(--text-primary)]">{name}</h4>
            <p className="text-[10px] text-gray-400 font-bold text-center leading-tight uppercase tracking-tighter">{description}</p>
        </div>
    );
};




const UserRank = ({ name, role, score, rank, avatar, highlight }) => {
    const { getRoleLabel } = useAuth();
    return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${highlight ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white' : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-blue-200'}`}>
        <span className={`text-xl font-black w-8 ${highlight ? 'text-blue-200' : 'text-gray-200 dark:text-gray-700'}`}>#{rank}</span>
        <div className="relative">
            <img src={avatar} className="w-12 h-12 rounded-xl object-cover border-2 border-white/20" alt={name} />
            {highlight && <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-blue-600 flex items-center justify-center"><Trophy size={8} className="text-blue-900" /></div>}
        </div>
        <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black truncate uppercase tracking-tight">{name}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${highlight ? 'text-blue-100/70' : 'text-gray-400'}`}>
                {getRoleLabel(role)}
            </p>
        </div>
        <div className="text-right">
            <p className={`text-sm font-black ${highlight ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>{score} <span className="text-[10px]">PTS</span></p>
            <p className={`text-[9px] font-black tracking-widest ${highlight ? 'text-blue-100' : 'text-emerald-500'}`}>+12% SEM</p>
        </div>
    </div>
    );
};


const Gamification = () => {
    const { data } = useData();
    const { user } = useAuth();
    const currentUser = user || { name: 'Usuario', role: 'INVITADO', avatar: 'https://i.pravatar.cc/150' };

    const allInitiatives = [...(data.Psicologia || []), ...(data.Clinica || [])];

    // Calculate Scores (Real Logic)
    const completed = allInitiatives.filter(i => i.progress >= 90).length;
    const atRisk = allInitiatives.filter(i => i.progress >= 70 && i.progress < 90).length;
    const totalPoints = (completed * 100) + (atRisk * 50) + 1500; // Base score for being active

    // Badge Logic
    const evidenceCount = allInitiatives.reduce((acc, curr) => acc + (curr.hasEvidence ? 1 : 0), 0);
    
    const badges = [
        { name: "Primer Paso", description: "Iniciar 1 hito", icon: Star, unlocked: allInitiatives.some(i => i.progress > 0) },
        { name: "Verificador", description: "5 Evidencias", icon: CheckCircle2, unlocked: evidenceCount >= 5 },
        { name: "100% Anual", description: "Meta 2026", icon: Award, unlocked: completed === allInitiatives.length && allInitiatives.length > 0 },
        { name: "Líder UPS", description: "Top 1 General", icon: Trophy, unlocked: totalPoints > 2000 },
        { name: "Ejecutor", description: "3 Completados", icon: TrendingUp, unlocked: completed >= 3 },
    ];

    const leaderboard = [
        { name: "Dra. Eliana M.", role: "ROL DOCENTE", score: 2150, rank: 1, avatar: "https://i.pravatar.cc/150?u=1" },
        { name: currentUser?.name || "Usuario", role: currentUser?.role || "DIRECTOR", score: totalPoints, rank: 2, avatar: currentUser?.avatar || "https://i.pravatar.cc/150?u=2", highlight: true },
        { name: "Lic. Carlos R.", role: "ROL DOCENTE", score: 1800, rank: 3, avatar: "https://i.pravatar.cc/150?u=3" },
        { name: "Msc. Silvia P.", role: "ACREDITACIÓN", score: 1540, rank: 4, avatar: "https://i.pravatar.cc/150?u=4" },
    ];

    return (
        <div className="space-y-10 animate-fade-in pb-10 overflow-x-auto">
            <header>
                <h2 className="text-3xl font-black text-[var(--accent-dark)]">Reconocimientos</h2>
                <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">SISTEMA DE MÉRITOS Y GESTIÓN DE TALENTO</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-4">
                    <MetallicPanel className="text-center" delay={0.1}>
                        <div className="relative mb-8 flex justify-center">
                            <div className="relative w-44 h-44 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                                    <circle cx="64" cy="64" r="58" stroke="rgba(0,86,179,0.1)" strokeWidth="8" fill="transparent" />
                                    <circle cx="64" cy="64" r="58" stroke="url(#metallicGradient)" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * 0.25} strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#2563eb" />
                                            <stop offset="50%" stopColor="#60a5fa" />
                                            <stop offset="100%" stopColor="#2563eb" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center p-5">
                                    <img src={currentUser.avatar} className="w-full h-full rounded-full border-4 border-white/20 shadow-2xl object-cover" alt="profile" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-[var(--accent-dark)] mb-1 uppercase tracking-tight">{currentUser.name}</h3>
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-8">Estratega Senior Nv. 5</p>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-white/20 backdrop-blur-md">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Puntos</p>
                                <p className="text-xl font-black text-blue-600">{totalPoints.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-white/20 backdrop-blur-md">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Rango</p>
                                <p className="text-xl font-black text-emerald-500">Top 5</p>
                            </div>
                        </div>

                        {/* Team Achievement Board */}
                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
                             <div className="flex items-center gap-3 mb-4 justify-center">
                                <Users2 size={16} className="text-blue-500" />
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hito Grupal</h4>
                             </div>
                             <div className="bg-blue-600 rounded-2xl p-4 text-left relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-white text-[11px] font-bold mb-2 uppercase">Misión: Acreditación 2026</p>
                                    <div className="w-full bg-blue-400/30 h-1.5 rounded-full mb-3">
                                        <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <p className="text-blue-100 text-[9px] font-medium">+15% para el siguiente bono</p>
                                </div>
                             </div>
                        </div>
                    </MetallicPanel>
                </div>

                {/* Badges Grid */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="card p-8 bg-transparent border-none shadow-none ring-0">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-xl text-[var(--accent-dark)]">Insignias Alcanzadas</h3>
                            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Ver catálogo</button>
                        </div>
                        <div className="overflow-x-auto pb-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 min-w-[500px]">
                                {badges.map((b, i) => (
                                    <Badge key={i} {...b} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-xl text-[var(--accent-dark)]">Ranking de Excelencia</h3>
                            <div className="flex gap-4">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Semanal</span>
                                <ChevronRight size={14} className="text-gray-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {leaderboard.map((u, i) => (
                                <UserRank key={i} {...u} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
