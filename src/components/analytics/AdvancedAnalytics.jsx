import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const AdvancedAnalytics = () => {

    const kpis = [
        { id: 1, name: 'Cumplimiento Estratégico', value: 87, target: 90, trend: 'up', change: 5 },
        { id: 2, name: 'Ejecución de Iniciativas', value: 72, target: 85, trend: 'up', change: 8 },
        { id: 3, name: 'Satisfacción Stakeholders', value: 91, target: 88, trend: 'up', change: 3 },
        { id: 4, name: 'ROI de Proyectos', value: 65, target: 75, trend: 'down', change: -4 },
    ];

    const risks = [
        { id: 1, name: 'Retraso en Acreditación', probability: 'high', impact: 'high', status: 'critical' },
        { id: 2, name: 'Rotación Docente', probability: 'medium', impact: 'high', status: 'warning' },
        { id: 3, name: 'Presupuesto Insuficiente', probability: 'low', impact: 'medium', status: 'monitor' },
    ];

    const getStatusColor = (value, target) => {
        const percentage = (value / target) * 100;
        if (percentage >= 95) return 'text-green-600 bg-green-50 dark:bg-green-900/20';
        if (percentage >= 80) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    };

    const getRiskColor = (status) => {
        if (status === 'critical') return 'bg-red-500';
        if (status === 'warning') return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Análisis y Métricas Avanzadas</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Monitoreo en tiempo real de indicadores clave de desempeño
                    </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Exportar Reporte
                </button>
            </div>

            {/* KPI Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                    <MetallicPanel key={kpi.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
                                kpi.trend === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                            }`}>
                                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {Math.abs(kpi.change)}%
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">{kpi.name}</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-black text-slate-900 dark:text-white">{kpi.value}%</span>
                            <span className="text-sm text-slate-500 mb-1">/ {kpi.target}%</span>
                        </div>
                        <div className="mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all ${getStatusColor(kpi.value, kpi.target).includes('green') ? 'bg-green-500' : getStatusColor(kpi.value, kpi.target).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${(kpi.value / kpi.target) * 100}%` }}
                            />
                        </div>
                    </MetallicPanel>
                ))}
            </div>

            {/* Trend Analysis */}
            <MetallicPanel className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Análisis de Tendencias</h2>
                </div>
                <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-slate-500">Gráfico de tendencias - Integración con Recharts</p>
                </div>
            </MetallicPanel>

            {/* Risk Management Matrix */}
            <MetallicPanel className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">Matriz de Riesgos</h2>
                </div>
                <div className="space-y-3">
                    {risks.map((risk) => (
                        <div key={risk.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className={`w-3 h-3 rounded-full ${getRiskColor(risk.status)}`} />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 dark:text-white">{risk.name}</h4>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        Probabilidad: <span className="font-bold capitalize">{risk.probability}</span>
                                    </span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        Impacto: <span className="font-bold capitalize">{risk.impact}</span>
                                    </span>
                                </div>
                            </div>
                            <button className="px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                                Ver Plan
                            </button>
                        </div>
                    ))}
                </div>
            </MetallicPanel>
        </div>
    );
};

export default AdvancedAnalytics;
