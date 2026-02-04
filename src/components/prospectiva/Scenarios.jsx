import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import StatusBadge from './shared/StatusBadge';
import { Plus, Edit2, Trash2, Map } from 'lucide-react';

const Scenarios = () => {
    const { scenarios, addScenario, updateScenario, deleteScenario } = useProspectiva();
    const [showModal, setShowModal] = useState(false);
    const [editingScenario, setEditingScenario] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        axisX: '',
        axisY: '',
        narrative: '',
        assumptions: ['']
    });

    const commonAxes = [
        'Adopción Tecnológica', 'Regulación', 'Financiamiento', 'Demanda Estudiantil',
        'Conciencia Social', 'Políticas Públicas', 'Innovación', 'Competencia',
        'Globalización', 'Sostenibilidad'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedAssumptions = formData.assumptions.filter(a => a.trim() !== '');
        if (editingScenario) {
            updateScenario(editingScenario.id, { ...formData, assumptions: cleanedAssumptions });
        } else {
            addScenario({ ...formData, assumptions: cleanedAssumptions });
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', axisX: '', axisY: '', narrative: '', assumptions: [''] });
        setEditingScenario(null);
        setShowModal(false);
    };

    const handleEdit = (scenario) => {
        setEditingScenario(scenario);
        setFormData({
            name: scenario.name,
            axisX: scenario.axisX,
            axisY: scenario.axisY,
            narrative: scenario.narrative,
            assumptions: scenario.assumptions.length > 0 ? scenario.assumptions : ['']
        });
        setShowModal(true);
    };

    const addAssumption = () => {
        setFormData({ ...formData, assumptions: [...formData.assumptions, ''] });
    };

    const updateAssumption = (index, value) => {
        const newAssumptions = [...formData.assumptions];
        newAssumptions[index] = value;
        setFormData({ ...formData, assumptions: newAssumptions });
    };

    const removeAssumption = (index) => {
        setFormData({ ...formData, assumptions: formData.assumptions.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-6 overflow-x-auto pb-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-[var(--accent-dark)]">Escenarios Estratégicos</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                    <Plus size={20} />
                    Nuevo Escenario
                </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {scenarios.map((scenario) => (
                        <div key={scenario.id} className="card p-6 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Map className="text-blue-600 dark:text-blue-400" size={24} />
                                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{scenario.name}</h3>
                                </div>
                                <StatusBadge status={scenario.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Eje X</p>
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{scenario.axisX}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Eje Y</p>
                                    <p className="text-sm font-bold text-green-600 dark:text-green-400">{scenario.axisY}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">"{scenario.narrative}"</p>

                            <div className="mb-4">
                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Supuestos:</p>
                                <ul className="space-y-1">
                                    {scenario.assumptions.map((assumption, idx) => (
                                        <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">•</span>
                                            <span>{assumption}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-xs text-gray-500 mb-4">Creado: {scenario.createdDate}</div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(scenario)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <Edit2 size={16} />
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteScenario(scenario.id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black text-[var(--accent-dark)] mb-6">
                            {editingScenario ? 'Editar Escenario' : 'Nuevo Escenario'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre del Escenario</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Eje X</label>
                                    <select
                                        value={formData.axisX}
                                        onChange={(e) => setFormData({ ...formData, axisX: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        required
                                    >
                                        <option value="">Seleccionar...</option>
                                        {commonAxes.map(axis => (
                                            <option key={axis} value={axis}>{axis}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Eje Y</label>
                                    <select
                                        value={formData.axisY}
                                        onChange={(e) => setFormData({ ...formData, axisY: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        required
                                    >
                                        <option value="">Seleccionar...</option>
                                        {commonAxes.map(axis => (
                                            <option key={axis} value={axis}>{axis}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Narrativa</label>
                                <textarea
                                    value={formData.narrative}
                                    onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Supuestos</label>
                                {formData.assumptions.map((assumption, idx) => (
                                    <div key={idx} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={assumption}
                                            onChange={(e) => updateAssumption(idx, e.target.value)}
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                            placeholder={`Supuesto ${idx + 1}`}
                                        />
                                        {formData.assumptions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeAssumption(idx)}
                                                className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAssumption}
                                    className="text-sm font-bold text-blue-600 hover:underline"
                                >
                                    + Agregar supuesto
                                </button>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    {editingScenario ? 'Actualizar' : 'Crear'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scenarios;
