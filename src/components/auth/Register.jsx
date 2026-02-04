
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, UserPlus, Shield, GraduationCap, Microscope } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('DOCENTE');
    const [career, setCareer] = useState('Psicologia');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = register({ name, email, password, role, career });
        if (result.success) {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] p-4 transition-colors">
            <div className="card w-full max-w-lg p-10 animate-fade-in shadow-2xl bg-white dark:bg-slate-800 border-none ring-1 ring-black/5">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-900/20">
                        <UserPlus size={24} />
                    </div>
                    <h1 className="text-2xl font-black text-[var(--accent-dark)]">Crear Cuenta</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">SISTEMA INTEGRADO DE PLANIFICACIÓN</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                <input
                                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-xl outline-none text-sm font-medium"
                                    placeholder="Nombre Apellido"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Institucional</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                <input
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-xl outline-none text-sm font-medium"
                                    placeholder="usuario@ups.edu.ec"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-xl outline-none text-sm font-medium"
                                placeholder="Mínimo 8 caracteres"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Selecciona tu Rol</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: 'DIRECTOR', label: 'DIRECTOR', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                                { id: 'DOCENTE', label: 'ROL DOCENTE', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                                { id: 'ACREDITACIÓN', label: 'ACREDITACIÓN', icon: Microscope, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-500/10' }
                            ].map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRole(r.id)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === r.id ? 'border-blue-500 shadow-lg shadow-blue-500/10 ' + r.bg : 'border-transparent bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                                >
                                    <r.icon size={20} className={role === r.id ? r.color : 'text-gray-400'} />
                                    <span className={`text-[10px] font-black uppercase tracking-tight ${role === r.id ? 'text-[var(--accent-dark)]' : 'text-gray-500'}`}>{r.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {role === 'DOCENTE' && (
                        <div className="space-y-1.5 animate-fade-in">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Carrera Asignada</label>
                            <select
                                value={career}
                                onChange={(e) => setCareer(e.target.value)}
                                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-200"
                            >
                                <option value="Psicologia">C. Psicología</option>
                                <option value="Clinica">C. Psicología Clínica</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-4 text-xs shadow-lg shadow-blue-500/20 mt-4 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Creando cuenta...' : (
                            <>
                                <UserPlus size={16} strokeWidth={3} />
                                Registrarse Ahora
                            </>
                        )}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            ¿Ya tienes una cuenta? {' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700">Inicia sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
