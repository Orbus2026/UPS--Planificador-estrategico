import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Telescope, Radio, Map, Wind, ArrowLeftRight, AlertTriangle, Lightbulb, CheckSquare } from 'lucide-react';

const ProspectivaLayout = () => {
    const tabs = [
        { to: '/prospectiva', label: 'Dashboard', icon: Telescope, end: true },
        { to: '/prospectiva/signals', label: 'Señales', icon: Radio },
        { to: '/prospectiva/scenarios', label: 'Escenarios', icon: Map },
        { to: '/prospectiva/wind-tunneling', label: 'Wind Tunneling', icon: Wind },
        { to: '/prospectiva/backcasting', label: 'Backcasting', icon: ArrowLeftRight },
        { to: '/prospectiva/ewi', label: 'EWI', icon: AlertTriangle },
        { to: '/prospectiva/recommendations', label: 'Recomendaciones', icon: Lightbulb },
        { to: '/prospectiva/decisions', label: 'Decisiones', icon: CheckSquare }
    ];

    return (
        <div className="space-y-8">
            <header className="border-b border-gray-200 dark:border-slate-700 pb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                        <Telescope className="text-blue-600 dark:text-blue-400" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[var(--accent-dark)]">Prospectiva Estratégica</h1>
                        <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">
                            Vigilancia • Escenarios • Decisiones
                        </p>
                    </div>
                </div>

                <nav className="flex gap-2 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            end={tab.end}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                                }`
                            }
                        >
                            {React.createElement(tab.icon, { size: 16 })}
                            <span>{tab.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </header>

            <div className="animate-fade-in">
                <Outlet />
            </div>
        </div>
    );
};

export default ProspectivaLayout;
