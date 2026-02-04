import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import { ArrowLeftRight, Plus, Save } from 'lucide-react';

const Backcasting = () => {
    const { scenarios, saveBackcasting } = useProspectiva();
    const [selectedScenario, setSelectedScenario] = useState('');
    const [milestones, setMilestones] = useState({
        2027: { milestone: '', actions: [''] },
        2028: { milestone: '', actions: [''] },
        2030: { milestone: '', actions: [''] }
    });

    const activeScenarios = scenarios.filter(s => s.status === 'active');

    const updateMilestone = (year, field, value) => {
        setMilestones({
            ...milestones,
            [year]: { ...milestones[year], [field]: value }
        });
    };

    const addAction = (year) => {
        setMilestones({
            ...milestones,
            [year]: { ...milestones[year], actions: [...milestones[year].actions, ''] }
        });
    };

    const updateAction = (year, index, value) => {
        const newActions = [...milestones[year].actions];
        newActions[index] = value;
        setMilestones({
            ...milestones,
            [year]: { ...milestones[year], actions: newActions }
        });
    };

    const handleSave = () => {
        Object.entries(milestones).forEach(([year, data]) => {
            if (data.milestone.trim()) {
                saveBackcasting({
                    scenarioId: parseInt(selectedScenario),
                    year: parseInt(year),
                    milestone: data.milestone,
                    actions: data.actions.filter(a => a.trim() !== '')
                });
            }
        });
        alert('Roadmap guardado exitosamente');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <ArrowLeftRight className="text-purple-600 dark:text-purple-400" size={32} />
                <div>
                    <h2 className="text-2xl font-black text-[var(--accent-dark)]">Backcasting</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Construye roadmaps desde el futuro hacia el presente</p>
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
                    {[2030, 2028, 2027].map(year => (
                        <div key={year} className="card p-6 border-l-4 border-purple-500">
                            <h3 className="text-xl font-black text-purple-600 dark:text-purple-400 mb-4">{year}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hito / Milestone</label>
                                    <input
                                        type="text"
                                        value={milestones[year].milestone}
                                        onChange={(e) => updateMilestone(year, 'milestone', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        placeholder={`¿Qué se habrá logrado en ${year}?`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Acciones necesarias desde 2026</label>
                                    {milestones[year].actions.map((action, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            value={action}
                                            onChange={(e) => updateAction(year, idx, e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)] mb-2"
                                            placeholder={`Acción ${idx + 1}`}
                                        />
                                    ))}
                                    <button
                                        onClick={() => addAction(year)}
                                        className="text-sm font-bold text-purple-600 hover:underline flex items-center gap-1"
                                    >
                                        <Plus size={16} />
                                        Agregar acción
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg"
                    >
                        <Save size={20} />
                        Guardar Roadmap
                    </button>
                </>
            )}
        </div>
    );
};

export default Backcasting;
