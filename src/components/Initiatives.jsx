
import React, { useState } from 'react';
import { useData } from '../context/useData';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, ChevronDown, CheckSquare, Square, FileUp, MoreVertical, X, Calendar, User, Info, ShieldCheck } from 'lucide-react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const InitiativeDetail = ({ item, onClose, canUpload, canValidate, onUpload, onValidate, user }) => {
    const fileInputRef = React.useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Detail: File selected:", file?.name);
        if (file) {
            onUpload(item.id, file);
            // Reset value so same file can be selected again
            e.target.value = '';
        }
    };

    const triggerUpload = (e) => {
        e.stopPropagation();
        console.log("Detail: Triggering upload for", item.id);
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] w-full max-w-2xl shadow-2xl border border-white/20">
                <div className="p-8 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/50">
                    <div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.id}</span>
                        <h3 className="text-xl font-black text-[var(--accent-dark)] mt-1">{item.iniciativa}</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Indicador</p>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{item.indicador}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta</p>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{item.meta}</p>
                        </div>
                    </div>

                    <div className="flex gap-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600">
                                <User size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Responsable</p>
                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate w-32">{item.responsable}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600">
                                <Calendar size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Periodicidad</p>
                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.periodicidad}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/10">
                        <div className="flex items-center gap-2 mb-3">
                            <Info size={14} className="text-blue-500" />
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Definición Estratégica</p>
                        </div>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-relaxed uppercase tracking-tight">
                            Eje: {item.eje} • TOWS: {item.tows || 'N/A'} • Impacto: {item.impacto}/5
                        </p>
                    </div>
                </div>
                <div className="p-8 pt-0 flex gap-4">
                    {canUpload && (
                        <div className="flex-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                onClick={triggerUpload}
                                className="btn btn-primary w-full shadow-lg shadow-blue-500/20 flex items-center justify-center"
                            >
                                <FileUp size={18} className="mr-2" />
                                {item.hasEvidence ? 'Actualizar Evidencia' : 'Subir Evidencia'}
                            </button>
                        </div>
                    )}
                    {canValidate && (item.hasEvidence || user?.role?.toUpperCase() === 'DIRECTOR') && (
                        <button 
                            onClick={() => onValidate(item.id)}
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex-1 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={18} />
                            Validar Hito
                        </button>
                    )}
                    <button onClick={onClose} className="btn bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-600 dark:text-gray-300 px-8">Cerrar</button>
                </div>
            </div>
        </div>
    );
};

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const InitiativeRow = ({ item, onSelect, canUpload, onUpload, onValidate, user }) => {
    const fileInputRef = React.useRef(null);
    const isSuccess = item.progress >= 90;
    const isWarning = item.progress >= 70 && item.progress < 90;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Row: File selected:", file?.name, "for", item.id);
        if (file) {
            onUpload(item.id, file);
            e.target.value = '';
        }
    };

    const triggerUpload = (e) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    return (
        <motion.tr 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group border-b border-gray-100 dark:border-slate-700/50 relative"
        >
            <td className="py-5 px-6">
                <span className="text-xs font-black text-gray-400 font-mono tracking-tighter">{item.id}</span>
            </td>
            <td className="py-5 px-6 max-w-md">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-tight mb-1">{item.iniciativa}</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{item.eje}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-medium text-gray-400 truncate">{item.indicador}</span>
                </div>
            </td>
            <td className="py-5 px-6">
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-1.5 w-32 relative overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${isSuccess ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-blue-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                    </div>
                    <span className="text-xs font-black text-gray-700 dark:text-gray-200">{item.progress}%</span>
                </div>
            </td>
            <td className="py-5 px-6">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${isSuccess ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : isWarning ? 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' : 'text-rose-600 bg-rose-50 dark:bg-rose-500/10'}`}>
                    {isSuccess ? 'Válido' : isWarning ? 'Riesgo' : 'Pendiente'}
                </span>
            </td>
            <td className="py-5 px-6">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.tows === 'FO' ? 'bg-emerald-100 text-emerald-700' : item.tows === 'DO' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.tows || 'S/E'}
                </span>
            </td>
            <td className="py-5 px-6 text-right">
                <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    {canUpload && (
                        <div className="relative">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={triggerUpload} 
                                className="p-2 bg-white dark:bg-slate-700 shadow-sm hover:shadow-md text-blue-600 rounded-xl transition-all" 
                                title="Subir evidencia"
                            >
                                <FileUp size={16} strokeWidth={2.5} />
                            </motion.button>
                        </div>
                    )}
                    {item.hasEvidence && !item.validated && (user?.role?.toUpperCase() === 'DIRECTOR' || user?.role?.toUpperCase() === 'ACREDITACIÓN') && (
                        <button 
                            onClick={() => onValidate(item.id)}
                            className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg text-emerald-600 transition-colors" 
                            title="Validar Hito"
                        >
                            <ShieldCheck size={16} strokeWidth={2.5} />
                        </button>
                    )}
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelect(item)} 
                        className="p-2 bg-white dark:bg-slate-700 shadow-sm hover:shadow-md text-gray-500 rounded-xl transition-all" 
                        title="Detalles"
                    >
                        <MoreVertical size={16} />
                    </motion.button>
                </div>
            </td>
        </motion.tr>
    );
};

const Initiatives = () => {
    const { data, updateInitiative, loading, resetData } = useData();
    const { hasPermission, user } = useAuth();
    const normalizeTab = (c) => {
        if (!c) return 'Psicologia';
        if (c.includes('Clinica') || c.includes('Clínica')) return 'Clinica';
        return 'Psicologia';
    };

    const initialTab = normalizeTab(user?.career);
    const [tab, setTab] = useState(initialTab);
    const [searchTerm, setSearchTerm] = useState('');
    const [towsFilter, setTowsFilter] = useState('ALL');
    const [selectedItem, setSelectedItem] = useState(null);

    const canUpload = hasPermission('upload_evidence') || user?.role?.toUpperCase() === 'DIRECTOR';
    const canValidate = hasPermission('validate_evidence') || user?.role?.toUpperCase() === 'DIRECTOR';

    const filtered = (data[tab] || []).filter(item => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = item.iniciativa?.toLowerCase().includes(query) || 
                              item.id?.toLowerCase().includes(query) ||
                              item.responsable?.toLowerCase().includes(query);
        const matchesTows = towsFilter === 'ALL' || item.tows === towsFilter;
        return matchesSearch && matchesTows;
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sincronizando con Firestore...</p>
            </div>
        );
    }
    const handleUpload = async (id, file) => {
        if (!file) return;

        try {
            console.log(`Procesando carga de evidencia para ${id}:`, file.name);
            
            // Generate a unique path: evidence/{initiativeId}/{timestamp}_{filename}
            const timestamp = new Date().toISOString();
            const safeFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const storagePath = `evidence/${id}/${Date.now()}_${safeFileName}`;
            const storageRef = ref(storage, storagePath);

            // Upload file
            const snapshot = await uploadBytes(storageRef, file);
            console.log("File uploaded successfully:", snapshot);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File available at:", downloadURL);

            // Update Firestore document
            const success = await updateInitiative(tab, id, {
                hasEvidence: true,
                evidenceFile: file.name,
                evidenceUrl: downloadURL,
                evidencePath: storagePath,
                evidenceType: file.type,
                evidenceDate: timestamp,
                lastUpdated: timestamp
            });
            
            if (success) {
                alert(`Evidencia "${file.name}" subida y registrada correctamente.`);
            } else {
                throw new Error("Falló la actualización en base de datos tras la subida.");
            }
        } catch (error) {
            console.error("Error en carga de evidencia:", error);
            alert("Error al subir la evidencia: " + error.message);
        }
    };

    const handleValidate = async (id) => {
        const item = data[tab]?.find(i => i.id === id);
        if (!item) return;

        if (window.confirm(`¿Confirmar validación del hito ${id}? Esto marcará la iniciativa como completada.`)) {
            try {
                const timestamp = new Date().toISOString();
                await updateInitiative(tab, id, {
                    validated: true,
                    validationDate: timestamp,
                    validatedBy: user?.email || 'Director',
                    status: 'Validado',
                    progress: 100 // Asumimos que validado implica 100%
                });
                alert("Hito validado exitosamente.");
            } catch (error) {
                console.error("Error al validar:", error);
                alert("No se pudo validar el hito.");
            }
        }
    };

    // ... render ... 
    return (
        <div className="space-y-8 animate-fade-in overflow-x-auto pb-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)]">Seguimiento Operativo</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">CONTROL DE HITOS Y EVIDENCIAS 2026</p>
                    <button 
                        onClick={() => {
                            if(window.confirm('¿Estás seguro de reiniciar la base de datos? Esto borrará todas las evidencias y re-cargará los datos originales conm los nuevos tipos TOWS.')) {
                                resetData().then(() => {
                                    alert('Base de datos reiniciada. Los datos se recargarán automáticamente.');
                                });
                            }
                        }}
                        className="text-[10px] text-red-400 hover:text-red-600 underline mt-1 cursor-pointer"
                        id="reset-db-btn"
                    >
                        [DEV: Reiniciar Base de Datos]
                    </button>
                </div>
                <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700">
                    {['Psicologia', 'Clinica'].map(t => {
                        return (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setTowsFilter('ALL'); }}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t === 'Psicologia' ? 'Psicología' : 'Psicología Clínica'}
                            </button>
                        );
                    })}
                </div>
            </header>

            <div className="card metallic-panel shadow-xl border-none ring-1 ring-black/5 rounded-[2.5rem]">
                <div className="p-6 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative w-full md:w-[450px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar iniciativa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium"
                        />
                    </div>
                    <div className="flex gap-4 shrink-0 overflow-x-auto pb-2 md:pb-0">
                        {['ALL', 'FO', 'DO', 'FA', 'DA'].map(f => (
                            <button
                                key={f}
                                onClick={() => setTowsFilter(f)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${towsFilter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 dark:bg-slate-700 text-gray-400 hover:bg-gray-200'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto overflow-y-auto max-h-[700px] custom-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className="sticky top-0 z-10 shadow-sm">
                            <tr className="bg-gray-50 dark:bg-slate-800">
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Ref</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Definición</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Avance</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Status</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">TOWS</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                            <AnimatePresence>
                                {filtered.length > 0 ? (
                                    filtered.map((item) => (
                                        <InitiativeRow
                                            key={item.id}
                                            item={item}
                                            onSelect={setSelectedItem}
                                            canUpload={canUpload}
                                            onUpload={handleUpload}
                                            onValidate={handleValidate}
                                            user={user}
                                        />
                                    ))
                                ) : (
                                    <motion.tr 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan="6" className="py-20 text-center">
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No se encontraron iniciativas para esta categoría</p>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedItem && (
                <InitiativeDetail
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    canUpload={canUpload}
                    canValidate={canValidate}
                    onUpload={handleUpload}
                    onValidate={handleValidate}
                    user={user}
                />
            )}
        </div>
    );
};

export default Initiatives;
