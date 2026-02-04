import React, { useState } from 'react';
import { Target, Calendar, Users, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const PlanningExecution = () => {
    const [activeView, setActiveView] = useState('okrs');

    const okrs = [
        {
            objective: 'Mejorar Experiencia Estudiantil',
            keyResults: [
                { name: 'Aumentar satisfacción a 90%', current: 85, target: 90, status: 'on-track' },
                { name: 'Reducir tiempo respuesta a 24h', current: 30, target: 24, status: 'at-risk' },
                { name: 'Implementar 5 nuevos servicios', current: 3, target: 5, status: 'on-track' },
            ],
        },
        {
            objective: 'Fortalecer Investigación',
            keyResults: [
                { name: 'Publicar 50 papers', current: 32, target: 50, status: 'on-track' },
                { name: 'Incrementar financiamiento 30%', current: 15, target: 30, status: 'behind' },
            ],
        },
    ];

    const roadmapItems = [
        { id: 1, name: 'Acreditación Internacional', startDate: 'Ene 2026', endDate: 'Jun 2026', progress: 45, status: 'active' },
        { id: 2, name: 'Transformación Digital', startDate: 'Feb 2026', endDate: 'Dic 2026', progress: 30, status: 'active' },
        { id: 3, name: 'Campus Verde', startDate: 'Mar 2026', endDate: 'Sep 2026', progress: 0, status: 'planned' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            'on-track': 'text-green-600 bg-green-50 dark:bg-green-900/20',
            'at-risk': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
            'behind': 'text-red-600 bg-red-50 dark:bg-red-900/20',
        };
        return colors[status] || colors['on-track'];
    };

    const renderOKRs = () => (
        <div className="space-y-6">
            {okrs.map((okr, idx) => (
                <MetallicPanel key={idx} className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">{okr.objective}</h3>
                        </div>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Editar</button>
                    </div>

                    <div className="space-y-4">
                        {okr.keyResults.map((kr, krIdx) => (
                            <div key={krIdx} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{kr.name}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(kr.status)}`}>
                                        {kr.status === 'on-track' ? 'En camino' : kr.status === 'at-risk' ? 'En riesgo' : 'Atrasado'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${kr.status === 'on-track' ? 'bg-green-500' : kr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${(kr.current / kr.target) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 min-w-[60px] text-right">
                                        {kr.current} / {kr.target}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </MetallicPanel>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors font-bold">
                + Añadir Objetivo
            </button>
        </div>
    );

    const renderRoadmap = () => (
        <div className="space-y-6">
            <MetallicPanel className="p-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Roadmap Estratégico 2026
                </h3>
                <div className="space-y-4">
                    {roadmapItems.map((item) => (
                        <div key={item.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'active' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-slate-200 text-slate-600 dark:bg-slate-700'}`}>
                                    {item.status === 'active' ? 'Activo' : 'Planificado'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mb-3">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.startDate} - {item.endDate}
                                </span>
                                <span className="font-bold">{item.progress}% completado</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all" style={{ width: `${item.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </MetallicPanel>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Planificación y Ejecución</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Gestión de OKRs y roadmaps estratégicos
                </p>
            </div>

            {/* View Selector */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveView('okrs')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'okrs'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    OKRs
                </button>
                <button
                    onClick={() => setActiveView('roadmap')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'roadmap'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Roadmap
                </button>
                <button
                    onClick={() => setActiveView('resources')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'resources'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Recursos
                </button>
            </div>

            {/* Content */}
            <div>
                {activeView === 'okrs' && renderOKRs()}
                {activeView === 'roadmap' && renderRoadmap()}
                {activeView === 'resources' && (
                    <div className="text-center py-20 text-slate-500">Optimización de Recursos - En desarrollo</div>
                )}
            </div>
        </div>
    );
};

export default PlanningExecution;
