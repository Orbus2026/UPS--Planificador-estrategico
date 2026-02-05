
import React from 'react';
import { useData } from '../context/useData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, AlertCircle, CheckCircle, TrendingUp, Star } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 shadow-xl rounded-2xl border border-white/20 dark:border-slate-700/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 tracking-wider uppercase">{payload[0].name}</p>
                <p className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
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
            whileHover={{ scale: 1.02, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            className="card p-6 flex flex-col gap-4 border-t-4 relative group cursor-pointer"
            style={{ borderTopColor: isDark ? '#10B981' : isWarning ? '#F59E0B' : '#EF4444' }}
        >
            <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider pb-1 flex-1 leading-tight" title={title}>{title}</h3>
                <div className="flex items-center gap-2">
                    <Star 
                        size={16} 
                        className={`cursor-pointer transition-all ${isFavorite ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-300 hover:text-amber-300'}`} 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                    />
                    <TrendingUp size={16} className={bgColor} />
                </div>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[var(--text-primary)] tracking-tight">{progress}%</span>
                <span className="text-[10px] text-[var(--text-secondary)] font-medium">de {target}</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                <Motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-green-400 to-green-600' : isWarning ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-rose-400 to-rose-600'}`}
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
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">Panel de Control</h2>
                        <p className="text-sm font-bold text-[var(--accent-primary)] tracking-widest uppercase mt-1">
                            Vigilancia Estratégica &bull; Ciclo 2026
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-5 py-2.5 glass-effect rounded-2xl shadow-sm border border-white/50 dark:border-white/10 flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                            <div className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase block leading-none mb-0.5">Estado Operativo</span>
                                <span className="text-xs font-bold text-[var(--text-primary)]">Sincronizado</span>
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
                        <div key={i} className="card p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300">
                            <div>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                                <stat.icon size={32} strokeWidth={2} />
                            </div>
                        </div>
                    ))}
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Analytics */}
                    <div className="card p-8 metallic-panel">
                        <h3 className="font-bold text-xl mb-8 text-[var(--accent-primary)] flex items-center gap-2">
                            <TrendingUp size={20} />
                            Avance por Segmento
                        </h3>
                        <div className="overflow-x-auto pb-2">
                            <div className="h-72 min-w-[500px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataPie} margin={{ left: -20, right: 10 }}>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600, fontFamily: 'Outfit' }}
                                            dy={10}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--accent-glow)', opacity: 0.1, radius: 8 }} />
                                        <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={48}>
                                            {dataPie.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="transparent" />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="card p-8 metallic-panel flex flex-col">
                        <h3 className="font-bold text-xl mb-8 text-[var(--accent-primary)] text-center lg:text-left">Salud Estratégica Integral</h3>
                        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
                            <div className="h-64 w-64 relative flex-shrink-0">
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
