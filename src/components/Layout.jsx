import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Target, BarChart3, Users, Award,
    FileText, ChevronLeft, ChevronRight, Moon, Sun,
    Layers, Telescope, LogOut, Settings, ShieldCheck, Camera,
    TrendingUp, Zap, CheckSquare, Brain, Activity, Eye, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationFeed from './collaboration/NotificationFeed';
import Copilot from './collaboration/Copilot';

const SidebarItem = ({ to, icon: Icon, label, collapsed, restricted }) => {
    if (restricted) return null;
    return (
        <NavLink
            to={to}
            title={collapsed ? label : ""}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-blue-800/10 text-[#0056B3] font-semibold border-r-2 border-[#003366]'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-[#003366] dark:hover:text-blue-400'
                } ${collapsed ? 'justify-center px-2' : ''}`
            }
        >
            {React.createElement(Icon, { size: 20, className: "shrink-0" })}
            {!collapsed && <span className="transition-opacity duration-300 truncate" title={label}>{label}</span>}
        </NavLink>
    );
};


const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { user, logout, getRoleLabel, updateUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    const sidebarWidth = collapsed ? '80px' : '220px';

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden font-inter text-slate-700 dark:text-slate-300">
            {/* Sidebar */}
            <Motion.aside
                initial={false}
                animate={{ width: sidebarWidth }}
                className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/20 dark:border-slate-800 z-40 transition-all duration-300 ease-in-out metallic-panel"
                style={{ overflow: 'visible' }}
            >
                <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex items-center ${collapsed ? 'justify-center p-4' : 'justify-between'}`}>
                    {!collapsed && (
                        <div>
                            <h1 className="text-xl font-black text-[var(--accent-dark)] leading-tight" translate="no">UPS Planner</h1>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Estrategia</p>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-400 transition-colors"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className="p-3 space-y-1 flex-1">
                    <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
                    <SidebarItem to="/initiatives" icon={Target} label="Iniciativas" collapsed={collapsed} />
                    <SidebarItem to="/map" icon={Layers} label="Mapa" collapsed={collapsed} />
                    <SidebarItem to="/prospectiva" icon={Telescope} label="Prospectiva" collapsed={collapsed} />
                    <SidebarItem to="/analysis" icon={BarChart3} label="Escenarios" collapsed={collapsed} />
                    <SidebarItem to="/team" icon={Users} label="Equipo" collapsed={collapsed} />
                    <SidebarItem to="/gamification" icon={Award} label="Logros" collapsed={collapsed} />
                    <SidebarItem to="/reports" icon={FileText} label="Reportes" collapsed={collapsed} />

                    {/* Advanced Strategy Modules Section - Director Only */}
                    {user?.role === 'DIRECTOR' && (
                        <>
                            {!collapsed && <div className="px-2 pt-4 pb-2 text-xs font-bold text-slate-400 tracking-widest uppercase">Módulos Avanzados</div>}
                            <SidebarItem to="/advanced-analytics" icon={TrendingUp} label="Análisis Avanzado" collapsed={collapsed} />
                            <SidebarItem to="/strategic-tools" icon={Zap} label="Herramientas Estratégicas" collapsed={collapsed} />
                            <SidebarItem to="/planning-execution" icon={CheckSquare} label="Planificación y Ejecución" collapsed={collapsed} />
                            <SidebarItem to="/intelligence-automation" icon={Brain} label="Inteligencia y Automatización" collapsed={collapsed} />
                            <SidebarItem to="/tracking-evaluation" icon={Activity} label="Seguimiento y Evaluación" collapsed={collapsed} />
                            <SidebarItem to="/advanced-visualization" icon={Eye} label="Visualización Avanzada" collapsed={collapsed} />
                            <SidebarItem to="/change-management" icon={RefreshCw} label="Gestión del Cambio" collapsed={collapsed} />
                        </>
                    )}

                    {/* Admin Panel Link - Director Only */}
                    <SidebarItem
                        to="/admin"
                        icon={ShieldCheck}
                        label="Panel Admin"
                        collapsed={collapsed}
                        restricted={user?.role !== 'DIRECTOR'}
                    />
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${collapsed ? 'justify-center' : ''}`}
                        title="Cambiar tema"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        {!collapsed && <span className="text-sm font-bold">Modo {theme === 'light' ? 'Oscuro' : 'Claro'}</span>}
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
                        title="Cerrar sesión"
                    >
                        <LogOut size={18} />
                        {!collapsed && <span className="text-sm font-bold">Salir</span>}
                    </button>

                    <div className={`mt-4 flex items-center gap-3 p-2 bg-blue-50/50 dark:bg-blue-500/10 rounded-xl ${collapsed ? 'justify-center p-1' : ''}`}>
                        <div className="relative group/avatar">
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="w-8 h-8 rounded-lg bg-[var(--accent-dark)] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm uppercase cursor-pointer relative overflow-hidden group-hover/avatar:opacity-90 transition-opacity"
                            >
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    user?.name.split(' ').map(n => n[0]).join('') || 'U'
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                    <Camera size={12} className="text-white" />
                                </div>
                            </label>
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-black text-[var(--text-primary)] truncate uppercase tracking-tighter">{user?.name}</p>
                                <p className="text-[9px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                                    {getRoleLabel(user?.role)}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Notification Feed (Only if not collapsed) */}
                    {!collapsed && (
                        <div className="mt-auto border-t border-gray-100 dark:border-slate-800">
                            <NotificationFeed />
                        </div>
                    )}
                </div>
            </Motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 transition-all duration-300 ease-in-out professional-canvas" style={{ marginLeft: sidebarWidth }}>
                <main className="p-8 max-w-7xl mx-auto min-h-screen">
                    <AnimatePresence mode="wait">
                        <Motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Outlet />
                        </Motion.div>
                    </AnimatePresence>
                </main>
            </div>
            
            {/* AI Assistant */}
            <Copilot />
        </div>
    );
};

export default Layout;
