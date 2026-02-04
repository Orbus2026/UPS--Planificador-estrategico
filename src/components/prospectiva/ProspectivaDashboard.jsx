import React from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import ImpactUncertaintyMap from './shared/ImpactUncertaintyMap';
import StatusBadge from './shared/StatusBadge';
import { CheckCircle, AlertTriangle, TrendingUp, Radio } from 'lucide-react';

const ProspectivaDashboard = () => {
    const { signals, ewis, scenarios } = useProspectiva();

    // Filter validated signals from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentValidatedSignals = signals
        .filter(s => s.validated && new Date(s.date) >= thirtyDaysAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    // Count EWIs by status
    const yellowEWIs = ewis.filter(e => e.status === 'yellow').length;
    const redEWIs = ewis.filter(e => e.status === 'red').length;

    // Prepare data for impact/uncertainty map
    const mapData = signals.filter(s => s.validated).map(s => ({
        title: s.title,
        impact: s.impact,
        uncertainty: s.uncertainty,
        category: s.category
    }));

    const stats = [
        { label: 'Señales Validadas', value: signals.filter(s => s.validated).length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100/50 dark:bg-green-500/10' },
        { label: 'Escenarios Activos', value: scenarios.filter(s => s.status === 'active').length, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100/50 dark:bg-blue-500/10' },
        { label: 'EWI Amarillos', value: yellowEWIs, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100/50 dark:bg-amber-500/10' },
        { label: 'EWI Rojos', value: redEWIs, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100/50 dark:bg-rose-500/10' }
    ];

    return (
        <div className="space-y-8 overflow-x-auto pb-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card p-6 flex items-center justify-between group">
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                            <stat.icon size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Validated Signals */}
                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Radio className="text-blue-600 dark:text-blue-400" size={24} />
                        <h3 className="font-bold text-lg text-[var(--accent-dark)]">Señales Validadas (Últimos 30 días)</h3>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2">
                        {recentValidatedSignals.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">No hay señales validadas recientes</p>
                        ) : (
                            recentValidatedSignals.map((signal) => (
                                <div key={signal.id} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h4 className="text-sm font-bold text-[var(--text-primary)] flex-1">{signal.title}</h4>
                                        <StatusBadge status={signal.category.toLowerCase()} size="sm" />
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{signal.description}</p>
                                    <div className="flex items-center gap-4 text-[10px] text-gray-500 dark:text-gray-500">
                                        <span className="font-bold">Impacto: {signal.impact}</span>
                                        <span className="font-bold">Incertidumbre: {signal.uncertainty}</span>
                                        <span className="ml-auto">{signal.date}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Impact/Uncertainty Map */}
                <div className="card p-8">
                    <h3 className="font-bold text-lg mb-6 text-[var(--accent-dark)]">Mapa Impacto / Incertidumbre</h3>
                    <div className="h-96">
                        {mapData.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <p className="text-sm italic">No hay señales validadas para visualizar</p>
                            </div>
                        ) : (
                            <ImpactUncertaintyMap data={mapData} />
                        )}
                    </div>
                </div>
            </div>

            {/* EWI Alerts Section */}
            {(yellowEWIs > 0 || redEWIs > 0) && (
                <div className="card p-8 bg-gradient-to-br from-amber-50 to-red-50 dark:from-amber-900/10 dark:to-red-900/10 border-2 border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-amber-600 dark:text-amber-400" size={24} />
                        <h3 className="font-bold text-lg text-[var(--accent-dark)]">Alertas Activas</h3>
                    </div>
                    <div className="overflow-y-auto max-h-[300px] pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ewis.filter(e => e.status !== 'green').map((ewi) => (
                                <div key={ewi.id} className={`p-4 rounded-xl border-2 ${ewi.status === 'red' ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800'}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{ewi.name}</h4>
                                        <StatusBadge status={ewi.status} size="sm" />
                                    </div>
                                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                        <p><span className="font-bold">Valor actual:</span> {ewi.currentValue} {ewi.metric}</p>
                                        <p><span className="font-bold">Umbral {ewi.status}:</span> {ewi.status === 'red' ? ewi.redThreshold : ewi.yellowThreshold}</p>
                                        <p className="text-[10px] text-gray-500">Actualizado: {ewi.lastUpdate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="#/prospectiva/signals" className="card p-6 hover:shadow-xl transition-all group cursor-pointer">
                    <Radio className="text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-[var(--text-primary)] mb-2">Gestionar Señales</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Agregar, validar y categorizar señales estratégicas</p>
                </a>
                <a href="#/prospectiva/scenarios" className="card p-6 hover:shadow-xl transition-all group cursor-pointer">
                    <TrendingUp className="text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-[var(--text-primary)] mb-2">Construir Escenarios</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Crear y analizar escenarios estratégicos</p>
                </a>
                <a href="#/prospectiva/decisions" className="card p-6 hover:shadow-xl transition-all group cursor-pointer">
                    <CheckCircle className="text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-[var(--text-primary)] mb-2">Registrar Decisiones</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Documentar y dar seguimiento a decisiones estratégicas</p>
                </a>
            </div>
        </div>
    );
};

export default ProspectivaDashboard;
