
import React from 'react';
import { useData } from '../context/useData';
import { Layers, Users, Cog, LineChart, ChevronRight, Target } from 'lucide-react';

const PerspectiveCard = ({ title, icon: Icon, color, items, isLast }) => (
    <div className="relative">
        <div className={`p-8 rounded-[2.5rem] metallic-panel border-none shadow-2xl hover:shadow-blue-500/10 transition-all group relative z-10`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 ${color.replace('border-', 'bg-').split(' ')[0]}`}></div>
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-3xl ${color.replace('border-', 'bg-').split(' ')[0]} text-white shadow-lg`}>
                    {React.createElement(Icon, { size: 24 })}
                </div>
                <h3 className="font-black text-lg text-[var(--accent-dark)] uppercase tracking-tight">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[300px]">
                    {items.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-transparent hover:border-black/5 transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tighter truncate">{item.iniciativa}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {!isLast && (
            <div className="flex justify-center my-4">
                <div className="h-12 w-1 bg-gradient-to-b from-gray-200 to-transparent dark:from-slate-700"></div>
            </div>
        )}
    </div>
);


const StrategicMap = () => {
    const { data } = useData();
    const [career, setCareer] = React.useState('Psicologia');

    const careerData = data[career] || [];

    const getItemsByEje = (eje) => careerData.filter(i => i.eje.toLowerCase().includes(eje.toLowerCase()));

    const mapConfigs = [
        { title: "Sostenibilidad e Impacto", icon: LineChart, color: "border-emerald-500 shadow-emerald-500/10", eje: "Gesti\u00f3n" },
        { title: "Usuarios y Beneficiarios", icon: Users, color: "border-blue-500 shadow-blue-500/10", eje: "Vinculaci\u00f3n" },
        { title: "Procesos Internos", icon: Cog, color: "border-amber-500 shadow-amber-500/10", eje: "Docencia" },
        { title: "Capacidades y Aprendizaje", icon: Layers, color: "border-rose-500 shadow-rose-500/10", eje: "Investigaci\u00f3n" }
    ];

    return (
        <div className="space-y-10 animate-fade-in pb-16 overflow-x-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)] tracking-tight">Mapa Estratégico</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">VISUALIZACIÓN DE DESPLIEGUE POR PERSPECTIVAS</p>
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

            <div className="max-w-4xl mx-auto space-y-2">
                {mapConfigs.map((config, idx) => (
                    <PerspectiveCard
                        key={idx}
                        {...config}
                        items={getItemsByEje(config.eje)}
                        isLast={idx === mapConfigs.length - 1}
                    />
                ))}
            </div>

            <footer className="metallic-canvas rounded-[3rem] p-12 text-[var(--text-primary)] relative border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-md">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6">
                            <Target size={32} className="text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-[var(--accent-dark)]">Misión UPS 2026</h3>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium">
                            Asegurar la excelencia académica y el impacto social mediante un modelo de gestión basado en la mejora continua y la identidad salesiana.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center p-6 border border-blue-500/10 rounded-[2rem] bg-blue-500/5 backdrop-blur-md">
                            <p className="text-3xl font-black mb-1 text-blue-600">94%</p>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Alineación</p>
                        </div>
                        <div className="text-center p-6 border border-blue-500/10 rounded-[2rem] bg-blue-500/5 backdrop-blur-md">
                            <p className="text-3xl font-black mb-1 text-blue-600">12</p>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Objetivos</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StrategicMap;
