import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import StatusBadge from './shared/StatusBadge';
import { AlertTriangle, Plus, Edit2, Trash2 } from 'lucide-react';

const EarlyWarning = () => {
    const { ewis, addEWI, updateEWI, deleteEWI } = useProspectiva();
    const [showModal, setShowModal] = useState(false);
    const [editingEWI, setEditingEWI] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        metric: '',
        currentValue: 0,
        yellowThreshold: 0,
        redThreshold: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEWI) {
            updateEWI(editingEWI.id, formData);
        } else {
            addEWI(formData);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', metric: '', currentValue: 0, yellowThreshold: 0, redThreshold: 0 });
        setEditingEWI(null);
        setShowModal(false);
    };

    const handleEdit = (ewi) => {
        setEditingEWI(ewi);
        setFormData({
            name: ewi.name,
            metric: ewi.metric,
            currentValue: ewi.currentValue,
            yellowThreshold: ewi.yellowThreshold,
            redThreshold: ewi.redThreshold
        });
        setShowModal(true);
    };

    const alertEWIs = ewis.filter(e => e.status !== 'green');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="text-amber-600 dark:text-amber-400" size={32} />
                    <div>
                        <h2 className="text-2xl font-black text-[var(--accent-dark)]">Indicadores de Alerta Temprana (EWI)</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Monitoreo de indicadores críticos</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                    <Plus size={20} />
                    Nuevo EWI
                </button>
            </div>

            {alertEWIs.length > 0 && (
                <div className="card p-6 bg-gradient-to-br from-amber-50 to-red-50 dark:from-amber-900/10 dark:to-red-900/10 border-2 border-amber-300 dark:border-amber-800">
                    <h3 className="font-bold text-lg text-[var(--accent-dark)] mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-amber-600" size={24} />
                        Alertas Activas ({alertEWIs.length})
                    </h3>
                    <div className="overflow-y-auto max-h-[300px] pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {alertEWIs.map(ewi => (
                                <div key={ewi.id} className={`p-4 rounded-xl border-2 ${ewi.status === 'red' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-400'}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{ewi.name}</h4>
                                        <StatusBadge status={ewi.status} size="sm" />
                                    </div>
                                    <p className="text-2xl font-black text-[var(--text-primary)] mb-1">{ewi.currentValue} <span className="text-sm font-normal text-gray-600">{ewi.metric}</span></p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Umbral {ewi.status}: {ewi.status === 'red' ? ewi.redThreshold : ewi.yellowThreshold}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-y-auto max-h-[calc(100vh-250px)] pr-2 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {ewis.map(ewi => (
                        <div key={ewi.id} className="card p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{ewi.name}</h3>
                                    <p className="text-xs text-gray-500">Actualizado: {ewi.lastUpdate}</p>
                                </div>
                                <StatusBadge status={ewi.status} />
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl mb-4">
                                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Valor Actual</p>
                                <p className="text-4xl font-black text-[var(--text-primary)]">{ewi.currentValue} <span className="text-lg text-gray-500">{ewi.metric}</span></p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Umbral Amarillo</p>
                                    <p className="text-xl font-black text-amber-600 dark:text-amber-400">{ewi.yellowThreshold}</p>
                                </div>
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Umbral Rojo</p>
                                    <p className="text-xl font-black text-red-600 dark:text-red-400">{ewi.redThreshold}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(ewi)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <Edit2 size={16} />
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteEWI(ewi.id)}
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
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full">
                        <h2 className="text-2xl font-black text-[var(--accent-dark)] mb-6">
                            {editingEWI ? 'Editar EWI' : 'Nuevo EWI'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre del Indicador</label>
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
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Métrica</label>
                                    <input
                                        type="text"
                                        value={formData.metric}
                                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        placeholder="ej: Porcentaje, Cantidad"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Valor Actual</label>
                                    <input
                                        type="number"
                                        value={formData.currentValue}
                                        onChange={(e) => setFormData({ ...formData, currentValue: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        step="0.1"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Umbral Amarillo</label>
                                    <input
                                        type="number"
                                        value={formData.yellowThreshold}
                                        onChange={(e) => setFormData({ ...formData, yellowThreshold: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Umbral Rojo</label>
                                    <input
                                        type="number"
                                        value={formData.redThreshold}
                                        onChange={(e) => setFormData({ ...formData, redThreshold: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        step="0.1"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    {editingEWI ? 'Actualizar' : 'Crear'}
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

export default EarlyWarning;
