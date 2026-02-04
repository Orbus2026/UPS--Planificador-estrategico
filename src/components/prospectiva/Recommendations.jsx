import React from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import StatusBadge from './shared/StatusBadge';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';

const Recommendations = () => {
    const { recommendations, updateRecommendation } = useProspectiva();

    const handleDecision = (id, status) => {
        updateRecommendation(id, { status });
    };

    const pendingRecs = recommendations.filter(r => r.status === 'pending');
    const decidedRecs = recommendations.filter(r => r.status !== 'pending');

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="text-amber-600 dark:text-amber-400" size={32} />
                <div>
                    <h2 className="text-2xl font-black text-[var(--accent-dark)]">Recomendaciones</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ajustes sugeridos al portafolio y KPIs</p>
                </div>
            </div>

            {pendingRecs.length > 0 && (
                <div>
                    <h3 className="font-bold text-lg text-[var(--accent-dark)] mb-4">Pendientes de Decisión</h3>
                    <div className="overflow-y-auto max-h-[400px] pr-2 pb-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {pendingRecs.map(rec => (
                                <div key={rec.id} className="card p-6 border-l-4 border-amber-500">
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-base font-bold text-[var(--text-primary)] flex-1">{rec.title}</h4>
                                        <StatusBadge status={rec.status} size="sm" />
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">Origen</p>
                                            <p className="text-sm text-[var(--text-primary)]">{rec.source}</p>
                                        </div>
                                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">KPI Objetivo</p>
                                            <p className="text-sm text-[var(--text-primary)]">{rec.targetKPI}</p>
                                        </div>
                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">Cambio Sugerido</p>
                                            <p className="text-sm font-bold text-green-700 dark:text-green-400">{rec.suggestedChange}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Impacto:</span>
                                            <StatusBadge status={rec.impact.toLowerCase()} size="sm" />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDecision(rec.id, 'accepted')}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                                        >
                                            <CheckCircle size={16} />
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => handleDecision(rec.id, 'rejected')}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                                        >
                                            <XCircle size={16} />
                                            Rechazar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {decidedRecs.length > 0 && (
                <div>
                    <h3 className="font-bold text-lg text-[var(--accent-dark)] mb-4">Historial de Decisiones</h3>
                    <div className="overflow-y-auto max-h-[300px] pr-2">
                        <div className="space-y-3">
                            {decidedRecs.map(rec => (
                                <div key={rec.id} className="card p-4 flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{rec.title}</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{rec.suggestedChange}</p>
                                    </div>
                                    <StatusBadge status={rec.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {recommendations.length === 0 && (
                <div className="card p-12 text-center">
                    <Lightbulb className="mx-auto text-gray-300 mb-4" size={64} />
                    <p className="text-gray-400 italic">No hay recomendaciones disponibles</p>
                </div>
            )}
        </div>
    );
};

export default Recommendations;
