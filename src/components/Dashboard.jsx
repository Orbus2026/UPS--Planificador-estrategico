
import React from 'react';
import { useData } from '../context/useData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, AlertCircle, CheckCircle, TrendingUp, Star } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-3 shadow-lg rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-1">{payload[0].name}</p>
                <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                    {payload[0].value} Iniciativas
                </p>
            </div>
        );
    }
    return null;
};

const KPICard = ({ title, target, progress, isFavorite, onToggleFavorite }) => {
    const isDark = progress >= 90;
    const isWarning = progress >= 70 && progress < 90;

    const bgColor = isDark ? 'text-green-600' : isWarning ? 'text-amber-500' : 'text-rose-500';

    return (
        <Motion.div 
            whileHover={{ scale: 1.05, perspective: 1000, rotateX: 2, rotateY: -2 }}
            className="card p-6 flex flex-col gap-4 border-t-2 relative group cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20"
        >
            <div className={`absolute top-0 left-0 w-full h-[3px] ${isDark ? 'bg-green-500' : isWarning ? 'bg-amber-500' : 'bg-rose-500'} opacity-30 group-hover:opacity-100 transition-opacity`}></div>

            <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider pb-1 flex-1 leading-tight" title={title}>{title}</h3>
                <div className="flex items-center gap-2">
                    <Star 
                        size={14} 
                        className={`cursor-pointer transition-colors ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-200'}`} 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                    />
                    <TrendingUp size={16} className={bgColor} />
                </div>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[var(--text-primary)]">{progress}%</span>
                <span className="text-[10px] text-[var(--text-secondary)] font-medium">de {target}</span>
            </div>

            <div className="w-full bg-gray-100 dark:bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                <Motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${isDark ? 'bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : isWarning ? 'bg-amber-500' : 'bg-rose-500'}`}
                ></Motion.div>
            </div>
        </Motion.div>
    );
};

const Dashboard = () => {
    const { data } = useData();
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('fav_kpis') || '[]'));
    const allInitiatives = [...data.Psicologia, ...data.Clinica];

    const toggleFavorite = (id) => {
        const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem('fav_kpis', JSON.stringify(newFavs));
    };

    const total = allInitiatives.length;
    const completed = allInitiatives.filter(i => i.progress >= 90).length;
    const atRisk = allInitiatives.filter(i => i.progress >= 70 && i.progress < 90).length;
    const critical = allInitiatives.filter(i => i.progress < 70).length;

    const dataPie = [
        { name: 'Óptimo', value: completed, color: '#10B981' },
        { name: 'Riesgo', value: atRisk, color: '#F59E0B' },
        { name: 'Crítico', value: critical, color: '#EF4444' },
    ];

    return (
        <div className="overflow-x-auto pb-4">
            <div className="space-y-10 animate-fade-in">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-[var(--accent-dark)]">Panel de Control</h2>
                        <p className="text-sm font-medium text-[var(--text-secondary)] tracking-wide">
                            VIGILANCIA ESTRATÉGICA • CICLO 2026
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-5 py-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <span className="text-[10px] font-black text-gray-400 uppercase block mb-0.5">Estado Operativo</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-sm font-bold text-[var(--text-primary)]">Sincronizado</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* High Level Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'META ALCANZADA', val: completed, color: 'text-green-600', bg: 'bg-green-100/50 dark:bg-green-500/10', icon: CheckCircle },
                        { label: 'HITOS PENDIENTES', val: atRisk, color: 'text-amber-600', bg: 'bg-amber-100/50 dark:bg-amber-500/10', icon: AlertCircle },
                        { label: 'CRÍTICO / ALERTA', val: critical, color: 'text-rose-600', bg: 'bg-rose-100/50 dark:bg-rose-500/10', icon: AlertCircle }
                    ].map((stat, i) => (
                        <div key={i} className="card p-6 flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                                <stat.icon size={28} strokeWidth={2.5} />
                            </div>
                        </div>
                    ))}
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Analytics */}
                    <div className="card p-8 metallic-panel border-none shadow-xl rounded-[2.5rem]">
                        <h3 className="font-bold text-lg mb-8 text-[var(--accent-dark)]">Avance por Segmento</h3>
                        <div className="overflow-x-auto pb-2">
                            <div className="h-72 min-w-[600px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataPie} margin={{ left: -20, right: 10 }}>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                            {dataPie.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="card p-8 metallic-panel border-none shadow-xl rounded-[2.5rem] flex flex-col">
                        <h3 className="font-bold text-lg mb-8 text-[var(--accent-dark)] text-center lg:text-left">Salud Estratégica Integral</h3>
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
                            <div className="h-56 w-56 relative flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataPie}
                                            innerRadius={70}
                                            outerRadius={95}
                                            paddingAngle={6}
                                            cornerRadius={4}
                                            stroke="none"
                                            dataKey="value"
                                        >
                                            {dataPie.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                    <span className="text-4xl font-black text-[var(--accent-dark)]">
                                        {Math.round((completed / total) * 100) || 0}%
                                    </span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">EFECTIVIDAD</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                {dataPie.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700 transition-transform hover:translate-x-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-[var(--text-primary)]">{Math.round((item.value / total) * 100)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Targeted Initiatives */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl text-[var(--accent-dark)] flex items-center gap-2">
                            <ArrowUpRight size={24} className="text-blue-500" />
                            Iniciativas de Alto Impacto
                        </h3>
                        <button className="text-sm font-bold text-blue-600 hover:underline">Ver todas</button>
                    </div>
                    <div className="overflow-y-auto max-h-[500px] pr-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {allInitiatives
                                .filter(i => i.meta > 0)
                                .sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id))
                                .map((item, idx) => (
                                <KPICard
                                    key={idx}
                                    title={item.iniciativa}
                                    target={item.meta}
                                    progress={item.progress}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={() => toggleFavorite(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
