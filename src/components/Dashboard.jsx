
import React from 'react';
import { useData } from '../context/useData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, AlertCircle, CheckCircle, TrendingUp, Star, Shield, Activity, Zap, Maximize2, Moon } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

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
    const isSuccess = progress >= 90;
    const isWarning = progress >= 70 && progress < 90;

    const statusColor = isSuccess ? 'rgb(34, 197, 94)' : isWarning ? 'rgb(245, 158, 11)' : 'rgb(244, 63, 94)';
    const statusBg = isSuccess ? 'rgba(34, 197, 94, 0.1)' : isWarning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)';

    return (
        <Motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="iridescent-border rounded-[2rem] group"
        >
            <div className="card p-6 !rounded-[2rem] glass-premium flex flex-col gap-4 h-full relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-all group-hover:opacity-40" style={{ backgroundColor: statusColor }}></div>
                
                <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-xl ${statusBg}`} style={{ color: statusColor }}>
                        {isSuccess ? <CheckCircle size={18} /> : <Activity size={18} />}
                    </div>
                    <Motion.div whileTap={{ scale: 1.5 }}>
                        <Star 
                            size={18} 
                            className={`cursor-pointer transition-all ${isFavorite ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-slate-300'}`} 
                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                        />
                    </Motion.div>
                </div>

                <div className="space-y-1">
                    <h3 className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] leading-snug line-clamp-2 min-h-[2.5em]" title={title}>
                        {title}
                    </h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">
                            {progress}
                            <span className="text-xl opacity-50">%</span>
                        </span>
                    </div>
                </div>

                <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>RENDIMIENTO</span>
                        <span>{target} META</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-[2px]">
                        <Motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                            style={{ backgroundColor: statusColor }}
                        />
                    </div>
                </div>
            </div>
        </Motion.div>
    );
};

const Dashboard = () => {
    const { data } = useData();
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('fav_kpis') || '[]'));
    const [isWarRoom, setIsWarRoom] = React.useState(false);
    
    const allInitiatives = [...data.Psicologia, ...data.Clinica];

    const toggleFavorite = (id) => {
        const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem('fav_kpis', JSON.stringify(newFavs));
    };

    const total = allInitiatives.length || 1;
    const completed = allInitiatives.filter(i => i.progress >= 90).length;
    const atRisk = allInitiatives.filter(i => i.progress >= 70 && i.progress < 90).length;
    const critical = allInitiatives.filter(i => i.progress < 70).length;

    const dataPie = [
        { name: 'Óptimo', value: completed, color: '#22c55e' },
        { name: 'Riesgo', value: atRisk, color: '#f59e0b' },
        { name: 'Crítico', value: critical, color: '#f43f5e' },
    ];

    return (
        <div className={`overflow-x-hidden pb-12 px-2 transition-all duration-700 ${isWarRoom ? 'war-room-mode p-8' : ''}`}>
            <div className="space-y-12 animate-fade-in">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
                                <Zap size={20} className="fill-current" />
                            </span>
                            <h2 className={`text-5xl font-black tracking-tighter ${isWarRoom ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                Centro de Control
                            </h2>
                        </div>
                        <p className="text-xs font-black text-blue-500 tracking-[0.3em] uppercase opacity-70">
                            Vigilancia Estratégica &bull; UPS 2026
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsWarRoom(!isWarRoom)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                isWarRoom ? 'bg-red-600 text-white animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-slate-900 text-white'
                            }`}
                        >
                            {isWarRoom ? <Maximize2 size={16} /> : <Activity size={16} />}
                            {isWarRoom ? 'War Room Active' : 'Strategic View'}
                        </button>
                    </div>
                </header>

                {/* High Level Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: 'Eficiencia Operada', val: completed, color: 'text-green-500', bg: 'bg-green-500/10', icon: Shield, trend: '+12%' },
                        { label: 'Hitos en Latencia', val: atRisk, color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Activity, trend: '-2%' },
                        { label: 'Alertas de Bloqueo', val: critical, color: 'text-rose-500', bg: 'bg-rose-500/10', icon: Zap, trend: '+4%' }
                    ].map((stat, i) => (
                        <Motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="card p-8 glass-premium !rounded-[2.5rem] flex items-center justify-between group cursor-default hover:border-blue-500/50 transition-all duration-500"
                        >
                            <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-6xl font-black ${stat.color} tracking-tighter`}>{stat.val}</span>
                                    <span className="text-xs font-bold text-slate-500 mb-2">{stat.trend}</span>
                                </div>
                            </div>
                            <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
                                <stat.icon size={36} strokeWidth={2.5} />
                            </div>
                        </Motion.div>
                    ))}
                </div>

                {/* High Level Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'META ALCANZADA', val: completed, color: 'text-green-600', bg: 'bg-green-100/50 dark:bg-green-500/10', icon: CheckCircle },
                        { label: 'HITOS PENDIENTES', val: atRisk, color: 'text-amber-600', bg: 'bg-amber-100/50 dark:bg-amber-500/10', icon: AlertCircle },
                        { label: 'CRÍTICO / ALERTA', val: critical, color: 'text-rose-600', bg: 'bg-rose-100/50 dark:bg-rose-500/10', icon: AlertCircle }
                    ].map((stat, i) => (
                        <div key={i} className="card p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300 overflow-visible border border-white/60 dark:border-slate-700/60">
                            <div className="min-w-0 flex-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight mb-1 leading-normal whitespace-normal w-full" title={stat.label}>{stat.label}</p>
                                <p className={`text-5xl font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                                <stat.icon size={32} strokeWidth={2} />
                            </div>
                        </div>
                    ))}
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Visual Analytics */}
                    <div className="card p-10 glass-premium !rounded-[2.5rem] border-white/10">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="font-black text-2xl text-[var(--accent-primary)] flex items-center gap-3 tracking-tighter uppercase">
                                    Métricas de Segmento
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Desempeño por categoría operativa</p>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
                                <Activity size={20} className="text-blue-500" />
                            </div>
                        </div>
                        <div className="overflow-x-auto pb-4">
                            <div className="h-80 min-w-[500px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataPie} margin={{ left: -20, right: 10 }}>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800, fontFamily: 'Outfit' }}
                                            dy={15}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 16 }} />
                                        <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={56}>
                                            {dataPie.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={entry.color} 
                                                    style={{ filter: `drop-shadow(0 0 10px ${entry.color}44)` }} 
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="card p-10 glass-premium !rounded-[2.5rem] border-white/10 flex flex-col items-center justify-center">
                        <div className="mb-8 text-center space-y-1">
                            <h3 className="font-black text-2xl text-[var(--accent-primary)] tracking-tighter uppercase">Estado Global</h3>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Distribución de cumplimiento total</p>
                        </div>
                        <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-12">
                            <div className="h-72 w-72 relative group">
                                <Motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-dashed border-slate-200 dark:border-slate-800 opacity-50"
                                />
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dataPie}
                                            innerRadius={85}
                                            outerRadius={110}
                                            paddingAngle={8}
                                            cornerRadius={8}
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
                                    <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter">
                                        {Math.round((completed / total) * 100) || 0}%
                                    </span>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1">Efectividad</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-5 w-full">
                                {dataPie.map((item, i) => (
                                    <Motion.div 
                                        key={i} 
                                        whileHover={{ x: 10 }}
                                        className="flex items-center justify-between p-5 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/30 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-4 h-4 rounded-lg shadow-sm" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-slate-400">{(item.value / total * 100).toFixed(0)}%</span>
                                            <div className="h-1 w-12 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full" style={{ backgroundColor: item.color, width: `${(item.value / total * 100)}%` }}></div>
                                            </div>
                                        </div>
                                    </Motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Targeted Initiatives */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
                                <Zap size={24} className="fill-current" />
                            </div>
                            <div>
                                <h3 className="font-black text-2xl text-slate-800 dark:text-white uppercase tracking-tighter">
                                    Iniciativas de Alto Impacto
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">Iniciativas Prioritarias Nivel 1</p>
                            </div>
                        </div>
                        <Motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                            Explorar Todas
                        </Motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {allInitiatives
                                .filter(i => i.meta > 0)
                                .sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id))
                                .slice(0, 8) // Limit to top 8 for better UI
                                .map((item, idx) => (
                                <Motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <KPICard
                                        title={item.iniciativa}
                                        target={item.meta}
                                        progress={item.progress}
                                        isFavorite={favorites.includes(item.id)}
                                        onToggleFavorite={() => toggleFavorite(item.id)}
                                    />
                                </Motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
