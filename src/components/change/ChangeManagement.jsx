import React, { useState } from 'react';
import { Users, MessageSquare, AlertCircle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const ChangeManagement = () => {
    const [activeView, setActiveView] = useState('plans');

    const changePlans = [
        {
            id: 1,
            initiative: 'Transformación Digital',
            status: 'active',
            stakeholderEngagement: 75,
            resistanceLevel: 'low',
            adoptionRate: 68,
        },
        {
            id: 2,
            initiative: 'Nuevo Modelo Educativo',
            status: 'planning',
            stakeholderEngagement: 45,
            resistanceLevel: 'medium',
            adoptionRate: 0,
        },
    ];

    const stakeholders = [
        { id: 1, name: 'Estudiantes', influence: 'high', support: 'high', priority: 'key' },
        { id: 2, name: 'Docentes', influence: 'high', support: 'medium', priority: 'key' },
        { id: 3, name: 'Personal Administrativo', influence: 'medium', support: 'high', priority: 'supportive' },
        { id: 4, name: 'Autoridades', influence: 'high', support: 'high', priority: 'sponsor' },
        { id: 5, name: 'Alumni', influence: 'low', support: 'medium', priority: 'informed' },
    ];

    const communicationPlans = [
        { id: 1, audience: 'Toda la Comunidad', message: 'Lanzamiento Transformación Digital', channel: 'Email, Web', date: '15 Feb 2026' },
        { id: 2, audience: 'Docentes', message: 'Workshop Nuevas Herramientas', channel:'Presencial', date: '20 Feb 2026' },
        { id: 3, audience: 'Estudiantes', message: 'Tutorial Plataforma Online', channel: 'Video, App', date: '25 Feb 2026' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            active: 'text-green-600 bg-green-50 dark:bg-green-900/20',
            planning: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
            completed: 'text-slate-600 bg-slate-50 dark:bg-slate-900/20',
        };
        return colors[status] || colors.planning;
    };

    const getResistanceColor = (level) => {
        if (level === 'low') return 'text-green-600 bg-green-50 dark:bg-green-900/20';
        if (level === 'medium') return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
    };

    const getPriorityColor = (priority) => {
        if (priority === 'sponsor') return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
        if (priority === 'key') return 'text-red-600 bg-red-50 dark:bg-red-900/20';
        if (priority === 'supportive') return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
        return 'text-slate-600 bg-slate-50 dark:bg-slate-900/20';
    };

    const renderPlans = () => (
        <div className="space-y-4">
            {changePlans.map((plan) => (
                <MetallicPanel key={plan.id} className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.initiative}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(plan.status)}`}>
                                    {plan.status === 'active' ? 'Activo' : plan.status === 'planning' ? 'Planificación' : 'Completado'}
                                </span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${getResistanceColor(plan.resistanceLevel)}`}>
                                Resistencia: {plan.resistanceLevel === 'low' ? 'Baja' : plan.resistanceLevel === 'medium' ? 'Media' : 'Alta'}
                            </span>
                        </div>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Ver Plan Completo</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Compromiso Stakeholders</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{plan.stakeholderEngagement}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${plan.stakeholderEngagement}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Tasa de Adopción</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{plan.adoptionRate}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${plan.adoptionRate}%` }} />
                            </div>
                        </div>
                    </div>
                </MetallicPanel>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors font-bold">
                + Nuevo Plan de Cambio
            </button>
        </div>
    );

    const renderStakeholders = () => (
        <div className="space-y-6">
            <MetallicPanel className="p-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Mapeo de Stakeholders
                </h3>
                <div className="space-y-3">
                    {stakeholders.map((stakeholder) => (
                        <div key={stakeholder.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{stakeholder.name}</h4>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-slate-600 dark:text-slate-400">
                                            Influencia: <span className={`font-bold ${stakeholder.influence === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                {stakeholder.influence === 'high' ? 'Alta' : stakeholder.influence === 'medium' ? 'Media' : 'Baja'}
                                            </span>
                                        </span>
                                        <span className="text-slate-600 dark:text-slate-400">
                                            Apoyo: <span className={`font-bold ${stakeholder.support === 'high' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                {stakeholder.support === 'high' ? 'Alto' : stakeholder.support === 'medium' ? 'Medio' : 'Bajo'}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded ${getPriorityColor(stakeholder.priority)}`}>
                                    {stakeholder.priority === 'sponsor' ? 'Sponsor' : stakeholder.priority === 'key' ? 'Clave' : stakeholder.priority === 'supportive' ? 'Apoyo' : 'Informado'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </MetallicPanel>

            {/* Stakeholder Matrix Placeholder */}
            <MetallicPanel className="p-6">
                <div className="flex flex-col items-center justify-center h-64 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <Users className="w-12 h-12 text-slate-400 mb-3" />
                    <p className="text-slate-500 text-sm">Matriz Influencia vs Interés - Visualización interactiva</p>
                </div>
            </MetallicPanel>
        </div>
    );

    const renderCommunication = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Plan de comunicaciones para gestión del cambio</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold">
                    + Nueva Comunicación
                </button>
            </div>
            {communicationPlans.map((comm) => (
                <MetallicPanel key={comm.id} className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{comm.message}</h4>
                                <div className="flex items-center gap-4 mt-1 text-xs text-slate-600 dark:text-slate-400">
                                    <span>Audiencia: <span className="font-bold">{comm.audience}</span></span>
                                    <span>Canal: <span className="font-bold">{comm.channel}</span></span>
                                    <span>Fecha: <span className="font-bold">{comm.date}</span></span>
                                </div>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Editar</button>
                    </div>
                </MetallicPanel>
            ))}
        </div>
    );

    const renderAdoption = () => (
        <MetallicPanel className="p-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Métricas de Adopción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-black text-slate-900 dark:text-white">68%</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Usuarios Activos</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-black text-slate-900 dark:text-white">2,450</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total Usuarios</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-center">
                    <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-black text-slate-900 dark:text-white">32%</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Resistencia</p>
                </div>
            </div>
            <div className="h-48 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-slate-500">Gráfico de adopción en el tiempo</p>
            </div>
        </MetallicPanel>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Gestión del Cambio</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Planes de cambio, stakeholders y comunicación
                </p>
            </div>

            {/* View Selector */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveView('plans')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'plans'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Planes de Cambio
                </button>
                <button
                    onClick={() => setActiveView('stakeholders')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'stakeholders'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Stakeholders
                </button>
                <button
                    onClick={() => setActiveView('communication')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'communication'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Comunicación
                </button>
                <button
                    onClick={() => setActiveView('adoption')}
                    className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                        activeView === 'adoption'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    Métricas de Adopción
                </button>
            </div>

            {/* Content */}
            <div>
                {activeView === 'plans' && renderPlans()}
                {activeView === 'stakeholders' && renderStakeholders()}
                {activeView === 'communication' && renderCommunication()}
                {activeView === 'adoption' && renderAdoption()}
            </div>
        </div>
    );
};

export default ChangeManagement;
