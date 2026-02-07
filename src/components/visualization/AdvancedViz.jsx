import React, { useState } from 'react';
import { Eye, Layers, Network, BarChart4, Map } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const AdvancedViz = () => {
    const [activeViz, setActiveViz] = useState('canvas');

    const visualizations = [
        { id: 'canvas', name: 'Canvas Estratégico', icon: BarChart4, description: 'Curva de valor y océanos azules' },
        { id: '3dmap', name: 'Mapa 3D', icon: Layers, description: 'Visualización tridimensional de estrategia' },
        { id: 'network', name: 'Red Estratégica', icon: Network, description: 'Relaciones entre iniciativas y objetivos' },
        { id: 'geographic', name: 'Mapa Geográfico', icon: Map, description: 'Distribución geográfica de impacto' },
    ];

    // Mock data for Strategy Canvas
    const canvasFactors = [
        { name: 'Calidad Académica', us: 9, competitor1: 7, competitor2: 8 },
        { name: 'Investigación', us: 6, competitor1: 9, competitor2: 7 },
        { name: 'Precios', us: 8, competitor1: 5, competitor2: 6 },
        { name: 'Infraestructura', us: 7, competitor1: 8, competitor2: 9 },
        { name: 'Empleabilidad', us: 9, competitor1: 7, competitor2: 8 },
        { name: 'Innovación', us: 6, competitor1: 8, competitor2: 7 },
    ];

    const renderStrategyCanvas = () => (
        <MetallicPanel className="p-6">
            <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Canvas Estratégico - Análisis de Valor</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Comparación de curva de valor vs competidores principales
                </p>
            </div>

            {/* Simple visualization placeholder */}
            <div className="space-y-4">
                {canvasFactors.map((factor, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{factor.name}</span>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    UPS: {factor.us}
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    Comp 1: {factor.competitor1}
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    Comp 2: {factor.competitor2}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                            <div className="absolute h-full bg-blue-500/30" style={{ width: `${factor.us * 10}%` }} />
                            <div className="absolute h-full border-l-2 border-blue-600" style={{ left: `${factor.us * 10}%` }} />
                            <div className="absolute h-full border-l-2 border-red-600" style={{ left: `${factor.competitor1 * 10}%` }} />
                            <div className="absolute h-full border-l-2 border-green-600" style={{ left: `${factor.competitor2 * 10}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm mb-2">Insights del Canvas</h4>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• UPS lidera en Calidad Académica y Empleabilidad</li>
                    <li>• Oportunidad de diferenciación en Investigación e Innovación</li>
                    <li>• Ventaja competitiva en relación Calidad-Precio</li>
                </ul>
            </div>
        </MetallicPanel>
    );



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Visualización Avanzada</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Herramientas de visualización estratégica interactiva
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-bold text-indigo-600">Vista Mejorada</span>
                </div>
            </div>

            {/* Visualization Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {visualizations.map((viz) => {
                    const Icon = viz.icon;
                    return (
                        <button
                            key={viz.id}
                            onClick={() => setActiveViz(viz.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                activeViz === viz.id
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                            }`}
                        >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${activeViz === viz.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <p className={`text-xs font-bold ${activeViz === viz.id ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                {viz.name}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Visualization Description */}
            <MetallicPanel className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {visualizations.find((v) => v.id === activeViz)?.description}
                </p>
            </MetallicPanel>

            {/* Content */}
            <div className="min-h-[500px]">
                {activeViz === 'canvas' && renderStrategyCanvas()}
                
                {activeViz === '3dmap' && (
                    <MetallicPanel className="p-10 flex items-center justify-center overflow-hidden relative min-h-[500px]">
                         <div className="perspective-container relative w-full max-w-lg h-[400px] flex items-center justify-center">
                            {/* Layer 1: Finance */}
                            <div className="absolute transform translate-y-[-100px] hover:translate-y-[-110px] transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                                <div className="w-64 h-64 bg-emerald-500/20 border-2 border-emerald-500 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center relative">
                                    <div className="absolute -top-10 text-emerald-600 font-black uppercase text-xs bg-white/80 px-2 py-1 rounded">Sostenibilidad</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-10 h-10 bg-emerald-500 rounded shadow-lg animate-pulse"></div>
                                        <div className="w-10 h-10 bg-emerald-400 rounded shadow-lg"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Layer 2: Customers */}
                            <div className="absolute transform translate-y-[-30px] hover:translate-y-[-40px] transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                                <div className="w-64 h-64 bg-blue-500/20 border-2 border-blue-500 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center relative">
                                    <div className="absolute -top-10 text-blue-600 font-black uppercase text-xs bg-white/80 px-2 py-1 rounded">Vinculación</div>
                                    <div className="grid grid-cols-2 gap-4">
                                         <div className="w-12 h-12 bg-blue-500 rounded shadow-lg"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Layer 3: Internal Processes */}
                            <div className="absolute transform translate-y-[40px] hover:translate-y-[30px] transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                                <div className="w-64 h-64 bg-amber-500/20 border-2 border-amber-500 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center relative">
                                    <div className="absolute -top-10 text-amber-600 font-black uppercase text-xs bg-white/80 px-2 py-1 rounded">Docencia</div>
                                    <div className="w-20 h-2 bg-amber-500 rounded shadow-lg mb-2"></div>
                                    <div className="w-16 h-2 bg-amber-400 rounded shadow-lg"></div>
                                </div>
                            </div>
                            
                            {/* Layer 4: Learning */}
                            <div className="absolute transform translate-y-[110px] hover:translate-y-[100px] transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(45deg)' }}>
                                <div className="w-64 h-64 bg-rose-500/20 border-2 border-rose-500 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center relative">
                                    <div className="absolute -top-10 text-rose-600 font-black uppercase text-xs bg-white/80 px-2 py-1 rounded">Investigación</div>
                                    <div className="w-8 h-8 rounded-full bg-rose-500 shadow-lg"></div>
                                </div>
                            </div>
                         </div>
                    </MetallicPanel>
                )}

                {activeViz === 'network' && (
                    <MetallicPanel className="p-4 h-[500px] relative overflow-hidden bg-slate-900">
                        {/* Static Network Visualization with Framer Motion */}
                        <svg className="w-full h-full"> 
                            {/* Connections */}
                            <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#475569" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#475569" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="#475569" strokeWidth="1" />
                            <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#475569" strokeWidth="1" />

                            {/* Center Node */}
                            <circle cx="50%" cy="50%" r="30" fill="#2563EB" className="animate-pulse" />
                            <text x="50%" y="50%" dy="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">UPS 2026</text>

                            {/* Satellite Nodes */}
                            <g className="cursor-pointer hover:opacity-80 transition-opacity">
                                <circle cx="20%" cy="30%" r="20" fill="#10B981" />
                                <text x="20%" y="30%" dy="4" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Gestión</text>
                            </g>
                             <g className="cursor-pointer hover:opacity-80 transition-opacity">
                                <circle cx="80%" cy="30%" r="20" fill="#F59E0B" />
                                <text x="80%" y="30%" dy="4" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Docencia</text>
                            </g>
                             <g className="cursor-pointer hover:opacity-80 transition-opacity">
                                <circle cx="20%" cy="70%" r="20" fill="#3B82F6" />
                                <text x="20%" y="70%" dy="4" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Vínculos</text>
                            </g>
                             <g className="cursor-pointer hover:opacity-80 transition-opacity">
                                <circle cx="80%" cy="70%" r="20" fill="#EF4444" />
                                <text x="80%" y="70%" dy="4" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">I+D+i</text>
                            </g>
                        </svg>
                        <div className="absolute bottom-4 right-4 bg-black/50 p-2 rounded text-xs text-white">
                            * Visualización conceptual de red
                        </div>
                    </MetallicPanel>
                )}

                {activeViz === 'geographic' && (
                     <MetallicPanel className="p-4 h-[500px] relative bg-blue-50/50 dark:bg-slate-900/50 flex items-center justify-center">
                        <div className="relative w-full max-w-2xl aspect-[4/3]">
                            {/* Simplified SVG Map of Ecuador Area */}
                            <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-xl">
                                <path 
                                    d="M200,100 Q400,50 600,150 T800,400 Q600,550 400,500 T100,300 Z" 
                                    fill="#e2e8f0" 
                                    stroke="#cbd5e1" 
                                    strokeWidth="2"
                                    className="dark:fill-slate-700 dark:stroke-slate-600"
                                />
                                {/* Hotspots */}
                                <g className="group cursor-pointer text-blue-600">
                                    <circle cx="300" cy="250" r="8" fill="currentColor" className="animate-ping opacity-75" />
                                    <circle cx="300" cy="250" r="4" fill="currentColor" />
                                    <rect x="310" y="235" width="80" height="30" rx="4" fill="white" className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                                    <text x="320" y="255" fontSize="10" fill="black" className="opacity-0 group-hover:opacity-100">Quito: 12 Proy</text>
                                </g>

                                <g className="group cursor-pointer text-emerald-600">
                                    <circle cx="500" cy="350" r="10" fill="currentColor" className="animate-ping opacity-75" />
                                    <circle cx="500" cy="350" r="5" fill="currentColor" />
                                     <rect x="510" y="335" width="90" height="30" rx="4" fill="white" className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                                    <text x="520" y="355" fontSize="10" fill="black" className="opacity-0 group-hover:opacity-100">Cuenca: 8 Proy</text>
                                </g>

                                 <g className="group cursor-pointer text-rose-600">
                                    <circle cx="200" cy="400" r="12" fill="currentColor" className="animate-ping opacity-75" />
                                    <circle cx="200" cy="400" r="6" fill="currentColor" />
                                     <rect x="210" y="385" width="100" height="30" rx="4" fill="white" className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                                    <text x="220" y="405" fontSize="10" fill="black" className="opacity-0 group-hover:opacity-100">Guayaquil: 15 Proy</text>
                                </g>
                            </svg>
                            <div className="absolute top-4 left-4 bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl backdrop-blur-sm border border-white/50">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300">Impacto Regional</h4>
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="w-2 h-2 rounded-full bg-rose-600"></div> Costanera
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div> Norte
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div> Sur
                                    </div>
                                </div>
                            </div>
                        </div>
                     </MetallicPanel>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Exportar Imagen
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                    Compartir Vista
                </button>
            </div>
        </div>
    );
};

export default AdvancedViz;
