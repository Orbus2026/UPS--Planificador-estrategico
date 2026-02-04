import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, LayoutDashboard, Target, Users } from 'lucide-react';
import illustration from '../../assets/login-illustration.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950 overflow-hidden">
            {/* Left Side: Illustration & Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--accent-dark)] overflow-hidden">
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[var(--accent-dark)]">
                    <img 
                        src={illustration} 
                        alt="UPS Planner Illustration" 
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    {/* Centered Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-transparent to-blue-900/80"></div>
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
                                Transformando la Educación Superior con Planificación Estratégica y Prospectiva.
                            </p>
                            
                            <p className="text-lg xl:text-xl text-white/70 font-medium leading-relaxed max-w-xl mx-auto italic border-y border-white/10 py-4">
                                Gestión académica de vanguardia, aseguramiento de la calidad y visión institucional conectada.
                            </p>
                        </div>

                        <div className="pt-12 grid grid-cols-2 gap-6 max-w-lg mx-auto w-full">
                            <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group">
                                <div className="p-3 rounded-2xl bg-white/10 group-hover:bg-blue-400/20 transition-colors">
                                    <LayoutDashboard size={28} className="text-white group-hover:text-blue-400" />
                                </div>
                                <span className="font-bold text-xs tracking-widest uppercase text-white/90">Dashboards Interactivos</span>
                            </div>
                            <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group">
                                <div className="p-3 rounded-2xl bg-white/10 group-hover:bg-blue-400/20 transition-colors">
                                    <Target size={28} className="text-white group-hover:text-blue-400" />
                                </div>
                                <span className="font-bold text-xs tracking-widest uppercase text-white/90">Mapa Estratégico Institucional</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-[var(--bg-secondary)] dark:bg-slate-900 overflow-y-auto">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 bg-[var(--accent-dark)] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <span className="text-xl font-black italic">UPS</span>
                        </div>
                        <h1 className="text-2xl font-black text-[var(--accent-dark)] dark:text-blue-400" translate="no">UPS Planner</h1>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Bienvenido de nuevo</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">Ingresa tus credenciales institucionales para continuar.</p>
                    </div>

                    {error && (
                        <div className="p-4 mb-8 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-600 animate-shake">
                            <AlertCircle size={18} />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Correo Institucional</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-main)] transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] dark:focus:border-blue-500 transition-all rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-medium shadow-sm"
                                    placeholder="usuario@ups.edu.ec"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent-main)] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[var(--accent-main)] dark:focus:border-blue-500 transition-all rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-medium shadow-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold">
                            <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[var(--accent-main)] focus:ring-[var(--accent-main)]" />
                                Recordarme
                            </label>
                            <a href="#" className="text-[var(--accent-main)] dark:text-blue-400 hover:underline">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 bg-[var(--accent-dark)] hover:bg-[var(--accent-main)] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Validando...
                                </span>
                            ) : (
                                <>
                                    <LogIn size={18} strokeWidth={3} />
                                    Entrar al Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            ¿No tienes acceso? {' '}
                            <Link to="/register" className="text-[var(--accent-main)] dark:text-blue-400 hover:underline">Contactar Soporte</Link>
                        </p>
                    </div>

                    {/* App Version or Info */}
                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">
                            UPS Planner v2.0 • 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
