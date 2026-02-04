import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import { useData } from '../../context/useData';
import { Wind, Save } from 'lucide-react';

// Memoized component for individual initiative evaluation
const InitiativeEvaluator = React.memo(({ initiative, currentScore, onEvaluate }) => {
    return (
        <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">{initiative.iniciativa}</h4>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {currentScore}
                </span>
            </div>
            <input
                type="range"
                min="0"
                max="10"
                value={currentScore}
                onChange={(e) => onEvaluate(initiative.iniciativa, parseInt(e.target.value))}
                className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Sin impacto</span>
                <span>Impacto crítico</span>
            </div>
        </div>
    );
});

const WindTunneling = () => {
    const { scenarios, saveWindTunneling } = useProspectiva();
    const { data } = useData();
    const [selectedScenario, setSelectedScenario] = useState('');
    const [evaluations, setEvaluations] = useState({});

    // Combine initiatives but limit initial view or implement pagination in future if needed
    // For now, removing the strict slice(0, 10) but we should be mindful of list size
    const allInitiatives = React.useMemo(() => [...data.Psicologia, ...data.Clinica], [data]);
    const activeScenarios = scenarios.filter(s => s.status === 'active');

    const handleEvaluation = React.useCallback((initiativeId, score) => {
        setEvaluations(prev => ({ ...prev, [initiativeId]: score }));
    }, []);

    const handleSave = () => {
        Object.entries(evaluations).forEach(([initiativeId, score]) => {
            const initiative = allInitiatives.find(i => i.iniciativa === initiativeId);
            saveWindTunneling({
                scenarioId: parseInt(selectedScenario),
                initiativeId,
                initiativeName: initiative?.iniciativa || initiativeId,
                impactScore: score,
                notes: ''
            });
        });
        alert('Evaluaciones guardadas exitosamente');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Wind className="text-blue-600 dark:text-blue-400" size={32} />
                <div>
                    <h2 className="text-2xl font-black text-[var(--accent-dark)]">Wind Tunneling</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Evalúa el impacto de iniciativas bajo diferentes escenarios</p>
                </div>
            </div>

            <div className="card p-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Seleccionar Escenario</label>
                <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)] font-bold"
                >
                    <option value="">-- Seleccionar escenario --</option>
                    {activeScenarios.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </div>

            {selectedScenario && (
                <>
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--accent-dark)] mb-4">Evaluar Iniciativas</h3>
                        <div className="overflow-y-auto max-h-[600px] pr-2">
                            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {allInitiatives.map((initiative, idx) => (
                                    <InitiativeEvaluator
                                        key={idx}
                                        initiative={initiative}
                                        currentScore={evaluations[initiative.iniciativa] || 5}
                                        onEvaluate={handleEvaluation}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg"
                    >
                        <Save size={20} />
                        Guardar Evaluaciones
                    </button>
                </>
            )}
        </div>
    );
};

export default WindTunneling;
