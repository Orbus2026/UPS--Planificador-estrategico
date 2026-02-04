import React, { useState } from 'react';
import { useProspectiva } from '../../context/useProspectiva';
import StatusBadge from './shared/StatusBadge';
import { CheckSquare, Plus, ArrowRight } from 'lucide-react';

const Decisions = () => {
    const { decisions, addDecision, updateDecision } = useProspectiva();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rationale: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addDecision(formData);
        setFormData({ title: '', description: '', rationale: '' });
        setShowModal(false);
    };

    const moveDecision = (id, newStatus) => {
        const updates = { status: newStatus };
        if (newStatus === 'implemented') {
            updates.implementedDate = new Date().toISOString().split('T')[0];
        }
        updateDecision(id, updates);
    };

    const columns = [
        { status: 'proposed', label: 'Propuestas', color: 'blue' },
        { status: 'approved', label: 'Aprobadas', color: 'green' },
        { status: 'implemented', label: 'Implementadas', color: 'purple' },
        { status: 'closed', label: 'Cerradas', color: 'gray' }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <CheckSquare className="text-blue-600 dark:text-blue-400" size={32} />
                    <div>
                        <h2 className="text-2xl font-black text-[var(--accent-dark)]">Registro de Decisiones</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Seguimiento del ciclo de vida de decisiones estratégicas</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                    <Plus size={20} />
                    Nueva Decisión
                </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map(column => {
                    const columnDecisions = decisions.filter(d => d.status === column.status);
                    return (
                        <div key={column.status} className="space-y-3">
                            <div className={`p-3 bg-${column.color}-100 dark:bg-${column.color}-900/20 rounded-xl`}>
                                <h3 className={`font-black text-sm uppercase tracking-wide text-${column.color}-700 dark:text-${column.color}-400`}>
                                    {column.label} ({columnDecisions.length})
                                </h3>
                            </div>
                            <div className="space-y-3 min-h-[400px] overflow-y-auto max-h-[600px] pr-2">
                                {columnDecisions.map(decision => (
                                    <div key={decision.id} className="card p-4 hover:shadow-lg transition-all cursor-move">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-sm font-bold text-[var(--text-primary)] flex-1">{decision.title}</h4>
                                            <StatusBadge status={decision.status} size="sm" />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{decision.description}</p>
                                        <div className="text-[10px] text-gray-500 mb-3">
                                            <p><strong>Rationale:</strong> {decision.rationale}</p>
                                            <p className="mt-1">Propuesta: {decision.proposedDate}</p>
                                            {decision.implementedDate && <p>Implementada: {decision.implementedDate}</p>}
                                            {decision.evidence && <p><strong>Evidencia:</strong> {decision.evidence}</p>}
                                        </div>
                                        {decision.status !== 'closed' && (
                                            <button
                                                onClick={() => {
                                                    const nextStatus = {
                                                        proposed: 'approved',
                                                        approved: 'implemented',
                                                        implemented: 'closed'
                                                    }[decision.status];
                                                    moveDecision(decision.id, nextStatus);
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                            >
                                                Mover a {columns.find(c => c.status === {
                                                    proposed: 'approved',
                                                    approved: 'implemented',
                                                    implemented: 'closed'
                                                }[decision.status])?.label}
                                                <ArrowRight size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full">
                        <h2 className="text-2xl font-black text-[var(--accent-dark)] mb-6">Nueva Decisión</h2>
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
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Rationale / Justificación</label>
                                <textarea
                                    value={formData.rationale}
                                    onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Crear Decisión
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
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

export default Decisions;
