
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Lock, UserPlus, Shield, GraduationCap, Microscope, LayoutDashboard, Target } from 'lucide-react';
import NeuralBackground from '../ui/FlowFieldBackground';
import { InfiniteGridBackground } from '../ui/TheInfiniteGrid';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('DOCENTE');
    const [career, setCareer] = useState('Psicologia');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await register({ name, email, password, role, career });
        
        if (result.success) {
            toast.success('¡Cuenta creada exitosamente! Bienvenido al sistema.');
            navigate('/');
        } else {
            toast.error(result.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950 overflow-hidden">
             {/* Left Side: Illustration & Branding (Hidden on mobile) */}
             <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--accent-dark)] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <NeuralBackground 
                        color="#60a5fa" 
                        speed={1.5}
                        particleCount={800}
                        trailOpacity={0.2}
                        backgroundColor="rgba(30, 41, 59, 0.4)" 
                        className="opacity-60 mix-blend-screen" 
                    />
                    {/* Centered Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-transparent to-blue-900/80 pointer-events-none"></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-12 text-center text-white animate-fade-in">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-[2rem] flex items-center justify-center mb-10 border border-white/20 shadow-2xl ring-1 ring-white/30 transform hover:scale-110 transition-transform duration-500">
                        <span className="text-5xl font-black italic tracking-tighter text-white drop-shadow-lg" translate="no">UPS</span>
                    </div>
                    
                    <div className="max-w-2xl space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-6xl xl:text-7xl font-black tracking-tighter leading-none text-white drop-shadow-2xl" translate="no">
                                UPS <span className="text-blue-400">Planner</span>
                            </h1>
                            <span className="block text-3xl xl:text-4xl font-light text-white/80 uppercase tracking-[0.4em] mb-6">2026</span>
                        </div>

                        <div className="space-y-6 px-4">
                            <p className="text-2xl xl:text-3xl font-bold leading-tight text-white drop-shadow-lg">
                                Únete a la plataforma líder en gestión académica.
                            </p>
                            
                            <p className="text-lg xl:text-xl text-white/70 font-medium leading-relaxed max-w-xl mx-auto italic border-y border-white/10 py-4">
                            Regístrate para acceder a herramientas avanzadas de planificación y seguimiento.
                            </p>
                        </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg-secondary)] dark:bg-slate-900 overflow-hidden relative">
                <InfiniteGridBackground className="absolute inset-0 z-0 pointer-events-auto" />

                <div className="w-full max-w-lg animate-fade-in relative z-10 p-8 sm:p-12 md:p-16 overflow-y-auto max-h-screen">
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-[var(--accent-dark)] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <span className="text-xl font-black italic">UPS</span>
                        </div>
                        <h1 className="text-2xl font-black text-[var(--accent-dark)] dark:text-blue-400" translate="no">UPS Planner</h1>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Crear Cuenta</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">Completa tus datos para registrarte en el sistema.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-main)] transition-colors" size={16} />
                                    <input
                                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-11 pr-5 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] transition-all rounded-xl outline-none text-sm font-medium shadow-sm"
                                        placeholder="Nombre Apellido"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Institucional</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-main)] transition-colors" size={16} />
                                    <input
                                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-5 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] transition-all rounded-xl outline-none text-sm font-medium shadow-sm"
                                        placeholder="usuario@ups.edu.ec"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-main)] transition-colors" size={16} />
                                <input
                                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-5 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] transition-all rounded-xl outline-none text-sm font-medium shadow-sm"
                                    placeholder="Mínimo 8 caracteres"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecciona tu Rol</p>
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
                                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === r.id ? 'border-blue-500 shadow-lg shadow-blue-500/10 ' + r.bg : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                    >
                                        <r.icon size={20} className={role === r.id ? r.color : 'text-slate-400'} />
                                        <span className={`text-[10px] font-black uppercase tracking-tight ${role === r.id ? 'text-[var(--accent-dark)]' : 'text-slate-500'}`}>{r.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {role === 'DOCENTE' && (
                            <div className="space-y-1.5 animate-fade-in">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Carrera Asignada</label>
                                <select
                                    value={career}
                                    onChange={(e) => setCareer(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] transition-all rounded-xl outline-none text-sm font-bold text-slate-700 dark:text-gray-200 shadow-sm"
                                >
                                    <option value="Psicologia">C. Psicología</option>
                                    <option value="Clinica">C. Psicología Clínica</option>
                                </select>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 bg-[var(--accent-dark)] hover:bg-[var(--accent-main)] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? 'Creando cuenta...' : (
                                <>
                                    <UserPlus size={16} strokeWidth={3} />
                                    Registrarse Ahora
                                </>
                            )}
                        </button>

                        <div className="text-center mt-8">
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                ¿Ya tienes una cuenta? {' '}
                                <Link to="/login" className="text-[var(--accent-main)] hover:text-blue-700 hover:underline">Inicia sesión</Link>
                            </p>
                        </div>
                    </form>
                    
                    {/* App Version or Info */}
                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">
                            UPS Planner v2.0 • 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
