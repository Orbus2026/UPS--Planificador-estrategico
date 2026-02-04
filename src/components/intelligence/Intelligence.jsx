import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, AlertCircle, FileText, Zap } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const Intelligence = () => {
    const [activeTab, setActiveTab] = useState('insights');

    const insights = [
        {
            id: 1,
            type: 'prediction',
            title: 'Alta probabilidad de éxito en Acreditación Internacional',
            confidence: 87,
            description: 'Basado en datos históricos y progreso actual, la acreditación tiene 87% de probabilidad de éxito.',
            impact: 'high',
        },
        {
            id: 2,
            type: 'anomaly',
            title: 'Desviación detectada en presupuesto de investigación',
            confidence: 92,
            description: 'El gasto está 15% por debajo del proyectado en Q1 2026.',
            impact: 'medium',
        },
        {
            id: 3,
            type: 'recommendation',
            title: 'Incrementar inversión en tecnología educativa',
            confidence: 78,
            description: 'Las tendencias muestran ROI  positivo del 34% en herramientas educativas digitales.',
            impact: 'high',
        },
    ];

    const automatedReports = [
        { id: 1, name: 'Reporte Ejecutivo Mensual', frequency: 'Mensual', nextRun: '1 Marzo 2026', recipients: 5 },
        { id: 2, name: 'Dashboard KPIs Semanal', frequency: 'Semanal', nextRun: '10 Febrero 2026', recipients: 12 },
        { id: 3, name: 'Análisis de Riesgos Trimestral', frequency: 'Trimestral', nextRun: '1 Abril 2026', recipients: 8 },
    ];

    const getImpactColor = (impact) => {
        if (impact === 'high') return 'text-red-600 bg-red-50 dark:bg-red-900/20';
        if (impact === 'medium') return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    };

    const getTypeIcon = (type) => {
        if (type === 'prediction') return TrendingUp;
        if (type === 'anomaly') return AlertCircle;
        return Sparkles;
    };

    const renderInsights = () => (
        <div className="space-y-4">
            {insights.map((insight) => {
                const Icon = getTypeIcon(insight.type);
                return (
                    <MetallicPanel key={insight.id} className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                <Icon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-black text-slate-900 dark:text-white">{insight.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${getImpactColor(insight.impact)}`}>
                                            {insight.impact === 'high' ? 'Alto impacto' : insight.impact === 'medium' ? 'Medio impacto' : 'Bajo impacto'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{insight.description}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Confianza:</span>
                                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500" style={{ width: `${insight.confidence}%` }} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{insight.confidence}%</span>
                                    </div>
                                    <button className="ml-auto text-xs font-bold text-blue-600 hover:text-blue-700">Ver detalles →</button>
                                </div>
                            </div>
                        </div>
                    </MetallicPanel>
                );
            })}
        </div>
    );

    const renderReports = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Reportes programados para generación automática</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold">
                    + Nuevo Reporte
                </button>
            </div>
            {automatedReports.map((report) => (
                <MetallicPanel key={report.id} className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{report.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        Frecuencia: <span className="font-bold">{report.frequency}</span>
                                    </span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        Próxima ejecución: <span className="font-bold">{report.nextRun}</span>
                                    </span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        {report.recipients} destinatarios
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <Zap className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Editar</button>
                        </div>
                    </div>
                </MetallicPanel>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Inteligencia y Automatización</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Insights impulsados por IA y automatización de procesos
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">AI Habilitada</span>
                </div>
            </div>

            {/* Tab Selector */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveTab('insights')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeTab === 'insights'
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Insights IA
                </button>
                <button
                    onClick={() => setActiveTab('predictive')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeTab === 'predictive'
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Analítica Predictiva
                </button>
                <button
                    onClick={() => setActiveTab('reports')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeTab === 'reports'
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Reportes Automáticos
                </button>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'insights' && renderInsights()}
                {activeTab === 'predictive' && (
                    <div className="text-center py-20 text-slate-500">Analítica Predictiva - En desarrollo</div>
                )}
                {activeTab === 'reports' && renderReports()}
            </div>
        </div>
    );
};

export default Intelligence;
