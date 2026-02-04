import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import StatusBadge from './shared/StatusBadge';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Filter } from 'lucide-react';

const Signals = () => {
    const { signals, addSignal, updateSignal, deleteSignal } = useProspectiva();
    const [showModal, setShowModal] = useState(false);
    const [editingSignal, setEditingSignal] = useState(null);
    const [filter, setFilter] = useState('all'); // all, validated, unvalidated
    const [categoryFilter, setCategoryFilter] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        source: '',
        category: 'Social',
        impact: 50,
        uncertainty: 50
    });

    const categories = ['Social', 'Tecnológico', 'Económico', 'Político', 'Ambiental', 'Regulatorio'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSignal) {
            updateSignal(editingSignal.id, { ...formData, date: new Date().toISOString().split('T')[0] });
        } else {
            addSignal({ ...formData, date: new Date().toISOString().split('T')[0] });
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', source: '', category: 'Social', impact: 50, uncertainty: 50 });
        setEditingSignal(null);
        setShowModal(false);
    };

    const handleEdit = (signal) => {
        setEditingSignal(signal);
        setFormData({
            title: signal.title,
            description: signal.description,
            source: signal.source,
            category: signal.category,
            impact: signal.impact,
            uncertainty: signal.uncertainty
        });
        setShowModal(true);
    };

    const toggleValidation = (signal) => {
        updateSignal(signal.id, { validated: !signal.validated });
    };

    const filteredSignals = signals.filter(s => {
        if (filter === 'validated' && !s.validated) return false;
        if (filter === 'unvalidated' && s.validated) return false;
        if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Filter size={20} className="text-gray-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    >
                        <option value="all">Todas las señales</option>
                        <option value="validated">Solo validadas</option>
                        <option value="unvalidated">Sin validar</option>
                    </select>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    >
                        <option value="all">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                    <Plus size={20} />
                    Nueva Señal
                </button>
            </div>

            {/* Signals Grid */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredSignals.map((signal) => (
                        <div key={signal.id} className="card p-6 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{signal.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{signal.description}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-3">
                                    <button
                                        onClick={() => toggleValidation(signal)}
                                        className={`p-2 rounded-lg transition-colors ${signal.validated ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-slate-700'}`}
                                        title={signal.validated ? 'Validada' : 'Sin validar'}
                                    >
                                        {signal.validated ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <StatusBadge status={signal.category.toLowerCase()} size="sm" />
                                {signal.validated && <StatusBadge status="validated" size="sm" />}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Impacto</p>
                                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{signal.impact}</p>
                                </div>
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Incertidumbre</p>
                                    <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{signal.uncertainty}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                                <span className="font-bold">Fuente: {signal.source}</span>
                                <span>{signal.date}</span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(signal)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <Edit2 size={16} />
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteSignal(signal.id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {filteredSignals.length === 0 && (
                <div className="card p-12 text-center">
                    <p className="text-gray-400 italic">No hay señales que coincidan con los filtros seleccionados</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black text-[var(--accent-dark)] mb-6">
                            {editingSignal ? 'Editar Señal' : 'Nueva Señal'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Título</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Fuente</label>
                                    <input
                                        type="text"
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Categoría</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Impacto: {formData.impact}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.impact}
                                        onChange={(e) => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Incertidumbre: {formData.uncertainty}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.uncertainty}
                                        onChange={(e) => setFormData({ ...formData, uncertainty: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    {editingSignal ? 'Actualizar' : 'Crear'}
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

export default Signals;
