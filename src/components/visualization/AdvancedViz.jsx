import React, { useState } from 'react';
import { Eye, Layers, Network, BarChart4, Map } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const AdvancedViz = () => {
    const [activeViz, setActiveViz] = useState('canvas');

    const visualizations = [
        { id: 'canvas', name: 'Strategy Canvas', icon: BarChart4, description: 'Curva de valor y océanos azules' },
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
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Strategy Canvas - Análisis de Valor</h3>
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

    const render3DMap = () => (
        <MetallicPanel className="p-6">
            <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                <Layers className="w-16 h-16 text-slate-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Mapa Estratégico 3D</h3>
                <p className="text-sm text-slate-500 text-center max-w-md">
                    Visualización tridimensional interactiva que muestra relaciones entre objetivos estratégicos, iniciativas y KPIs
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">
                    Activar Vista 3D
                </button>
            </div>
        </MetallicPanel>
    );

    const renderNetwork = () => (
        <MetallicPanel className="p-6">
            <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                <Network className="w-16 h-16 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Red Estratégica</h3>
                <p className="text-sm text-slate-500 text-center max-w-md">
                    Diagrama de red que visualiza las conexiones entre objetivos estratégicos, iniciativas y stakeholders
                </p>
                <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold">
                    Ver Red Completa
                </button>
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
            <div>
                {activeViz === 'canvas' && renderStrategyCanvas()}
                {activeViz === '3dmap' && render3DMap()}
                {activeViz === 'network' && renderNetwork()}
                {activeViz === 'geographic' && (
                    <div className="text-center py-20 text-slate-500">Mapa Geográfico - En desarrollo</div>
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
