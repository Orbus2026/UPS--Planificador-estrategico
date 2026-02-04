import React, { useState } from 'react';
import { Calendar, CheckCircle2, TrendingUp, DollarSign, FileCheck, Award } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const Evaluation = () => {
    const [activeView, setActiveView] = useState('cycles');

    const reviewCycles = [
        { id: 1, name: 'Revisión Q1 2026', date: '31 Marzo 2026', status: 'upcoming', initiatives: 12 },
        { id: 2, name: 'Revisión Anual 2025', date: '15 Enero 2026', status: 'completed', initiatives: 45, rating: 4.2 },
        { id: 3, name: 'Revisión Q4 2025', date: '20 Diciembre 2025', status: 'completed', initiatives: 38, rating: 4.5 },
    ];

    const impactMetrics = [
        { id: 1, initiative: 'Transformación Digital', roi: 145, impact: 'Alto', beneficiaries: 3500 },
        { id: 2, initiative: 'Programa Excelencia Docente', roi: 89, impact: 'Medio', beneficiaries: 1200 },
        { id: 3, initiative: 'Campus Verde', roi: 56, impact: 'Medio', beneficiaries: 8000 },
    ];

    const successStories = [
        {
            id: 1,
            title: 'Acreditación Internacional Lograda',
            date: 'Enero 2026',
            description: 'Primera universidad pública en obtener acreditación ABET para ingeniería.',
            impact: 'Alto',
        },
        {
            id: 2,
            title: 'Ranking QS Mejora 50 Posiciones',
            date: 'Diciembre 2025',
            description: 'Salto significativo en ranking global gracias a mejoras en investigación.',
            impact: 'Alto',
        },
    ];

    const getStatusColor = (status) => {
        if (status === 'completed') return 'text-green-600 bg-green-50 dark:bg-green-900/20';
        if (status === 'upcoming') return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
        return 'text-slate-600 bg-slate-50 dark:bg-slate-900/20';
    };

    const renderCycles = () => (
        <div className="space-y-4">
            {reviewCycles.map((cycle) => (
                <MetallicPanel key={cycle.id} className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{cycle.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-slate-600 dark:text-slate-400">{cycle.date}</span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">{cycle.initiatives} iniciativas</span>
                                    {cycle.rating && (
                                        <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                            <Award className="w-3 h-3" />
                                            Rating: {cycle.rating}/5.0
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold px-3 py-1 rounded ${getStatusColor(cycle.status)}`}>
                                {cycle.status === 'completed' ? 'Completado' : 'Próximo'}
                            </span>
                            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
                                {cycle.status === 'completed' ? 'Ver Resultados' : 'Programar'}
                            </button>
                        </div>
                    </div>
                </MetallicPanel>
            ))}
        </div>
    );

    const renderImpact = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetallicPanel className="p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-3xl font-black text-slate-900 dark:text-white">$2.5M</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Valor Generado</p>
                </MetallicPanel>
                <MetallicPanel className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-3xl font-black text-slate-900 dark:text-white">97%</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">ROI Promedio</p>
                </MetallicPanel>
                <MetallicPanel className="p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-3xl font-black text-slate-900 dark:text-white">12.8K</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Beneficiarios</p>
                </MetallicPanel>
            </div>

            <MetallicPanel className="p-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Medición de Impacto por Iniciativa</h3>
                <div className="space-y-3">
                    {impactMetrics.map((metric) => (
                        <div key={metric.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-slate-900 dark:text-white">{metric.initiative}</h4>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-green-50 text-green-600 dark:bg-green-900/20">
                                    ROI: {metric.roi}%
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                                <span>Impacto: <span className="font-bold">{metric.impact}</span></span>
                                <span>Beneficiarios: <span className="font-bold">{metric.beneficiaries.toLocaleString()}</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </MetallicPanel>
        </div>
    );

    const renderStories = () => (
        <div className="space-y-4">
            {successStories.map((story) => (
                <MetallicPanel key={story.id} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-black text-slate-900 dark:text-white">{story.title}</h3>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-red-50 text-red-600 dark:bg-red-900/20">
                                    {story.impact} Impacto
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{story.description}</p>
                            <span className="text-xs text-slate-500">{story.date}</span>
                        </div>
                    </div>
                </MetallicPanel>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors font-bold">
                + Añadir Historia de Éxito
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Seguimiento y Evaluación</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Ciclos de revisión, medición de impacto y auditoría
                </p>
            </div>

            {/* View Selector */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveView('cycles')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'cycles'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Ciclos de Revisión
                </button>
                <button
                    onClick={() => setActiveView('impact')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'impact'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Medición de Impacto
                </button>
                <button
                    onClick={() => setActiveView('stories')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'stories'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Historias de Éxito
                </button>
                <button
                    onClick={() => setActiveView('audit')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'audit'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Auditoría
                </button>
            </div>

            {/* Content */}
            <div>
                {activeView === 'cycles' && renderCycles()}
                {activeView === 'impact' && renderImpact()}
                {activeView === 'stories' && renderStories()}
                {activeView === 'audit' && <div className="text-center py-20 text-slate-500">Auditoría y Compliance - En desarrollo</div>}
            </div>
        </div>
    );
};

export default Evaluation;
