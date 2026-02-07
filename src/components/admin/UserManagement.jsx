import React, { useState } from 'react';
import { Users, Shield, ShieldAlert, UserCheck, MoreVertical, Search, Filter, Camera, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserManagement = () => {
    const { user, users, getRoleLabel, updateUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    if (!user || user.role !== 'DIRECTOR') {
        return null;
    }

    const handleToggleStatus = async (uid, currentStatus) => {
        const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
        await updateUser({ status: newStatus }, uid);
    };

    const handleAvatarChange = async (uid, e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Upload to Firebase Storage
                const timestamp = new Date().getTime();
                const storagePath = `avatars/${uid}_${timestamp}_${file.name}`;
                const storageRef = ref(storage, storagePath);
                
                // Show local preview immediately if needed, or wait for upload
                // For now, blocking upload for simplicity as per request
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                await updateUser({ avatar: downloadURL }, uid);
                alert("Avatar actualizado correctamente.");
            } catch (error) {
                console.error("Error uploading avatar:", error);
                alert("Error al subir el avatar: " + error.message);
            }
        }
    };

    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Faceless silhouette placeholder
    const FACELESS_AVATAR = "https://www.w3schools.com/howto/img_avatar.png"; // Generic faceless silhouette

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)] uppercase tracking-tight">Gestión de Usuarios</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">CONTROL DE ACCESOS Y ROLES INSTITUCIONALES</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20 flex items-center gap-2">
                        <Users size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">{filteredUsers.length} Usuarios</span>
                    </div>
                </div>
            </header>

            <div className="card overflow-hidden border-none ring-1 ring-black/5 bg-white dark:bg-slate-800">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o correo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-5 py-3 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-xl text-sm font-medium outline-none border-focus-blue"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-slate-900/50">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuario</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rol</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Carrera</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                            {filteredUsers.map((u) => (
                                <tr key={u.uid} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="relative group/user-avatar">
                                                <input
                                                    type="file"
                                                    id={`avatar-upload-${u.uid}`}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleAvatarChange(u.uid, e)}
                                                />
                                                <label
                                                    htmlFor={`avatar-upload-${u.uid}`}
                                                    className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center font-black text-xs cursor-pointer overflow-hidden relative"
                                                >
                                                    {u.avatar ? (
                                                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={FACELESS_AVATAR} alt="Placeholder" className="w-full h-full object-cover opacity-60" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/user-avatar:opacity-100 transition-opacity">
                                                        <Camera size={12} className="text-white" />
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[var(--text-primary)]">{u.name}</p>
                                                <p className="text-xs text-gray-400 font-medium">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {getRoleLabel(u.role)}
                                            {u.role === 'DIRECTOR' && <ShieldCheck size={12} className="text-blue-500" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{u.career || 'General'}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${u.status === 'Activo' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : u.status === 'Pendiente' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' : 'bg-rose-50 text-rose-600'}`}>
                                            {u.status || 'Activo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleToggleStatus(u.uid, u.status || 'Active')}
                                                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg text-blue-600 transition-colors"
                                                title="Cambiar estado"
                                            >
                                                <ShieldAlert size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-3xl p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h4 className="text-lg font-black text-amber-800 dark:text-amber-400 uppercase tracking-tight">Protocolo de Validación</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-500/80 font-medium max-w-2xl">
                        Como DIRECTOR, tienes la responsabilidad de validar las evidencias subidas por los docentes. Una vez validada, la evidencia es auditada por el departamento de Acreditación para asegurar los estándares de calidad.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
