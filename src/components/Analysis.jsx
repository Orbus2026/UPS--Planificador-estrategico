
import React, { useState } from 'react';
import { useData } from '../context/useData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Sliders, Zap, Target, TrendingUp, Info, Activity, Shield, ExternalLink, Columns } from 'lucide-react';

const Card = ({ children, className = "" }) => (
    <div className={`card p-6 ${className} ring-1 ring-black/5 border-none shadow-sm`}>
        {children}
    </div>
);

const Analysis = () => {
    const { data } = useData();
    const [career, setCareer] = useState('Psicologia');
    const [view, setView] = useState('prospectiva'); // prospectiva, pestel, swot, tows

    const strategicData = data.strategic?.[career] || {};
    const { pestel = [], swot = {}, tows = {} } = strategicData;

    // Simulation logic for Prospectiva
    const [factors, setFactors] = useState({ budget: 65, efficiency: 75, external: 50 });
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const generateCurve = (bias) => months.map((m, i) => Math.min(100, Math.round((i + 1) * 8.3 + (bias - 50) / 100 * (i + 1) * 8.3)));
    const mergedData = months.map((m, i) => ({
        name: m,
        Optimista: generateCurve(factors.budget * 1.2)[i],
        Realista: generateCurve((factors.budget + factors.efficiency) / 2)[i],
        Pesimista: generateCurve(factors.external * 0.8)[i]
    }));

    return (
        <div className="space-y-8 animate-fade-in pb-12 overflow-x-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)]">Formulación Estratégica</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">DIAGNÓSTICO Y MODELADO PROSPECTIVO 2026</p>
                </div>
                <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700">
                    {['Psicologia', 'Clinica'].map(t => (
                        <button
                            key={t}
                            onClick={() => setCareer(t)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${career === t ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t === 'Psicologia' ? 'Psicología' : 'Psicología Clínica'}
                        </button>
                    ))}
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-gray-100 dark:border-slate-800 pb-1">
                {[
                    { id: 'prospectiva', label: 'Escenarios', icon: Activity },
                    { id: 'pestel', label: 'Análisis PESTEL', icon: ExternalLink },
                    { id: 'swot', label: 'Matriz EFI/EFE', icon: Shield },
                    { id: 'tows', label: 'Estrategias TOWS', icon: Columns }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${view === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Logic for each view */}
            {view === 'prospectiva' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <Card>
                            <h3 className="font-bold text-lg mb-8 flex items-center gap-3 text-[var(--accent-dark)]">
                                <Sliders size={20} className="text-blue-500" />
                                Variables de Impacto
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { id: 'budget', label: 'Recursos Financieros', icon: Zap },
                                    { id: 'efficiency', label: 'Capacidad de Gestión', icon: Target },
                                    { id: 'external', label: 'Entorno Externo', icon: TrendingUp }
                                ].map((slider) => (
                                    <div key={slider.id} className="group">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2">
                                                <slider.icon size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-tight">{slider.label}</label>
                                            </div>
                                            <span className="text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">{factors[slider.id]}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100"
                                            value={factors[slider.id]}
                                            onChange={(e) => setFactors({ ...factors, [slider.id]: parseInt(e.target.value) })}
                                            className="w-full h-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0056B3]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-500/20 flex gap-4">
                            <Info size={24} className="text-amber-500 shrink-0" />
                            <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
                                <strong>Nota:</strong> Los cambios en las variables afectan proporcionalmente el cálculo de la curva de aprendizaje y ejecución proyectada.
                            </div>
                        </div>
                    </div>
                    <Card className="lg:col-span-8 bg-gradient-to-tr from-white to-blue-50/30">
                        <div className="flex justify-between mb-8">
                            <h3 className="font-bold text-lg text-[var(--accent-dark)]">Proyección de Avance 2026</h3>
                            <div className="flex gap-4">
                                {['Optimista', 'Realista', 'Pesimista'].map((type) => (
                                    <div key={type} className="flex items-center gap-2 text-[8px] font-black text-gray-500 uppercase">
                                        <div className={`w-2 h-2 rounded-full ${type === 'Optimista' ? 'bg-emerald-500' : type === 'Realista' ? 'bg-blue-500' : 'bg-rose-500'}`}></div>
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mergedData}>
                                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} domain={[0, 100]} />
                                    <RechartsTooltip />
                                    <Line type="monotone" dataKey="Optimista" stroke="#10B981" strokeWidth={4} dot={false} />
                                    <Line type="monotone" dataKey="Realista" stroke="#3B82F6" strokeWidth={4} dot={false} />
                                    <Line type="monotone" dataKey="Pesimista" stroke="#EF4444" strokeWidth={4} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}

            {view === 'pestel' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pestel.map((item, idx) => (
                        <Card key={idx} className="hover:ring-blue-500/20 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 font-black text-xs">
                                    {item.dimension.substring(0, 3).toUpperCase()}
                                </div>
                                <h4 className="font-black text-sm text-[var(--accent-dark)] uppercase tracking-tight">{item.dimension}</h4>
                            </div>
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2 leading-tight">{item.factor}</p>
                            <p className="text-[10px] text-gray-500 font-medium italic border-t border-gray-50 dark:border-slate-700 pt-2 leading-relaxed">
                                {item.impacto}
                            </p>
                        </Card>
                    ))}
                </div>
            )}

            {view === 'swot' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-emerald-50/30 border-emerald-100 ring-emerald-500/10 transition-colors">
                        <h3 className="font-black text-emerald-700 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <div className="w-2 h-4 bg-emerald-500 rounded-sm"></div>
                            Análisis EFI - Factores Internos
                        </h3>
                        <div className="space-y-6">
                            {['Fortalezas', 'Debilidades'].map(cat => (
                                <div key={cat}>
                                    <h4 className={`text-[10px] font-black uppercase tracking-tighter mb-4 ${cat === 'Fortalezas' ? 'text-emerald-600' : 'text-rose-600'}`}>{cat}</h4>
                                    <div className="space-y-3">
                                        {swot.efi?.[cat]?.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center bg-white/70 dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-black/5 group hover:border-blue-200 transition-all">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 pr-4">{item.item}</span>
                                                <div className="flex gap-2 shrink-0">
                                                    <span className="text-[9px] font-black bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded uppercase text-gray-500">P: {item.peso}</span>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${item.calificacion >= 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>C: {item.calificacion}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="bg-blue-50/30 border-blue-100 ring-blue-500/10 transition-colors">
                        <h3 className="font-black text-blue-700 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                            <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                            Análisis EFE - Factores Externos
                        </h3>
                        <div className="space-y-6">
                            {['Oportunidades', 'Amenazas'].map(cat => (
                                <div key={cat}>
                                    <h4 className={`text-[10px] font-black uppercase tracking-tighter mb-4 ${cat === 'Oportunidades' ? 'text-blue-600' : 'text-amber-600'}`}>{cat}</h4>
                                    <div className="space-y-3">
                                        {swot.efe?.[cat]?.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center bg-white/70 dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-black/5 group hover:border-blue-200 transition-all">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 pr-4">{item.item}</span>
                                                <div className="flex gap-2 shrink-0">
                                                    <span className="text-[9px] font-black bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded uppercase text-gray-500">P: {item.peso}</span>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${item.calificacion >= 3 ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>C: {item.calificacion}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {view === 'tows' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(tows).map(([key, strategies]) => (
                        <Card key={key} className="hover:scale-[1.01] transition-transform">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`font-black text-lg p-3 rounded-2xl ${key === 'FO' ? 'bg-emerald-500' : key === 'DO' ? 'bg-blue-500' : key === 'FA' ? 'bg-amber-500' : 'bg-rose-600'} text-white shadow-lg w-16 h-16 flex items-center justify-center`}>
                                    {key}
                                </h3>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Tipo de Estrategia</span>
                                    <p className="text-xs font-bold text-[var(--accent-dark)] uppercase">
                                        {key === 'FO' ? 'Maxi-Maxi (Potenciar)' : key === 'DO' ? 'Mini-Maxi (Superar)' : key === 'FA' ? 'Maxi-Mini (Diferenciar)' : 'Mini-Mini (Sobrevivir)'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {strategies.map((str, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-transparent hover:border-black/5 transition-all">
                                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 shrink-0"></div>
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{str}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Analysis;
