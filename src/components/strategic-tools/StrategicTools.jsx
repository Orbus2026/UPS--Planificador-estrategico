import React, { useState } from 'react';
import { Grid, Target, TrendingUp, Award, Zap, Brain } from 'lucide-react';
import MetallicPanel from '../base/MetallicPanel';

const StrategicTools = () => {
    const [activeTool, setActiveTool] = useState('swot');

    const tools = [
        { id: 'swot', name: 'FODA', icon: Grid, description: 'Análisis de fortalezas, debilidades, oportunidades y amenazas' },
        { id: 'pestel', name: 'PESTEL', icon: TrendingUp, description: 'Análisis del entorno político, económico, social, tecnológico, ambiental y legal' },
        { id: 'porter', name: 'Porter', icon: Target, description: 'Cinco fuerzas competitivas de Porter' },
        { id: 'bcg', name: 'Matriz BCG', icon: Award, description: 'Matriz de crecimiento-participación (Boston Consulting Group)' },
        { id: 'came', name: 'CAME', icon: Zap, description: 'Estrategias: Corregir, Afrontar, Mantener, Explotar' },
    ];

    // SWOT Mock Data
    const swotData = {
        strengths: ['Excelencia académica reconocida', 'Infraestructura moderna y equipada', 'Profesores altamente calificados', 'Programas acreditados internacionalmente'],
        weaknesses: ['Presupuesto limitado para investigación', 'Procesos administrativos lentos', 'Baja presencia en rankings internacionales'],
        opportunities: ['Demanda creciente de educación online', 'Alianzas internacionales potenciales', 'Nuevos programas de posgrado', 'Fondos de investigación disponibles'],
        threats: ['Competencia de universidades privadas', 'Cambios regulatorios en educación', 'Fuga de talento docente', 'Reducción de matrícula estudiantil'],
    };

    // PESTEL Mock Data
    const pestelData = {
        political: ['Estabilidad política nacional', 'Políticas de educación superior favorables', 'Acreditación obligatoria de programas'],
        economic: ['Crecimiento económico del país', 'Inversión pública en educación', 'Poder adquisitivo de las familias'],
        social: ['Valoración social de la educación superior', 'Migración de estudiantes a otras regiones', 'Demanda por educación flexible'],
        technological: ['Adopción de plataformas e-learning', 'Infraestructura tecnológica en mejora', 'Inteligencia artificial en educación'],
        environmental: ['Sostenibilidad en campus universitario', 'Programas de responsabilidad ambiental', 'Certificaciones verdes'],
        legal: ['Normativa de educación superior', 'Derechos estudiantiles protegidos', 'Regulación de títulos y grados'],
    };

    // Porter's Five Forces Mock Data
    const porterData = [
        { force: 'Amenaza de Nuevos Entrantes', level: 'Media', description: 'Barreras moderadas de entrada al mercado educativo', color: 'blue' },
        { force: 'Poder de Negociación de Proveedores', level: 'Bajo', description: 'Múltiples proveedores de tecnología y servicios', color: 'green' },
        { force: 'Poder de Negociación de Estudiantes', level: 'Alto', description: 'Amplia oferta de universidades disponibles', color: 'red' },
        { force: 'Amenaza de Productos Sustitutos', level: 'Alta', description: 'Educación online, bootcamps, cursos certificados', color: 'red' },
        { force: 'Rivalidad entre Competidores', level: 'Alta', description: 'Competencia intensa en educación superior', color: 'red' },
    ];

    // BCG Matrix Mock Data
    const bcgData = {
        stars: ['Ingeniería de Sistemas', 'Medicina'],
        cashCows: ['Derecho', 'Administración'],
        questionMarks: ['Biotecnología', 'Data Science'],
        dogs: ['Filosofía', 'Lenguas Clásicas'],
    };

    // CAME Mock Data
    const cameData = {
        corregir: ['Mejorar procesos administrativos digitales', 'Aumentar presupuesto de investigación', 'Capacitación continua docente'],
        afrontar: ['Desarrollar programas online competitivos', 'Crear alianzas con universidades internacionales', 'Implementar marketing digital agresivo'],
        mantener: ['Sostener excelencia académica actual', 'Preservar calidad de infraestructura', 'Retener talento docente clave'],
        explotar: ['Expandir programas de posgrado', 'Aprovechar fondos de investigación disponibles', 'Posicionar marca UPS como líder regional'],
    };

    const renderSWOT = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetallicPanel className="p-6 border-2 border-green-200 dark:border-green-900">
                <h3 className="text-lg font-black text-green-700 dark:text-green-400 mb-4">Fortalezas (S)</h3>
                <ul className="space-y-2">
                    {swotData.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-green-600 hover:text-green-700">+ Añadir fortaleza</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-red-200 dark:border-red-900">
                <h3 className="text-lg font-black text-red-700 dark:text-red-400 mb-4">Debilidades (W)</h3>
                <ul className="space-y-2">
                    {swotData.weaknesses.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-red-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-red-600 hover:text-red-700">+ Añadir debilidad</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-blue-200 dark:border-blue-900">
                <h3 className="text-lg font-black text-blue-700 dark:text-blue-400 mb-4">Oportunidades (O)</h3>
                <ul className="space-y-2">
                    {swotData.opportunities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700">+ Añadir oportunidad</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-yellow-200 dark:border-yellow-900">
                <h3 className="text-lg font-black text-yellow-700 dark:text-yellow-400 mb-4">Amenazas (T)</h3>
                <ul className="space-y-2">
                    {swotData.threats.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-yellow-600 hover:text-yellow-700">+ Añadir amenaza</button>
            </MetallicPanel>
        </div>
    );

    const renderPESTEL = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(pestelData).map(([key, items]) => {
                const titles = {
                    political: 'Político',
                    economic: 'Económico',
                    social: 'Social',
                    technological: 'Tecnológico',
                    environmental: 'Ambiental',
                    legal: 'Legal',
                };
                const colors = {
                    political: 'purple',
                    economic: 'green',
                    social: 'blue',
                    technological: 'indigo',
                    environmental: 'emerald',
                    legal: 'orange',
                };
                const color = colors[key];
                return (
                    <MetallicPanel key={key} className={`p-6 border-2 border-${color}-200 dark:border-${color}-900`}>
                        <h3 className={`text-lg font-black text-${color}-700 dark:text-${color}-400 mb-4`}>{titles[key]}</h3>
                        <ul className="space-y-2">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                    <span className={`text-${color}-600 mt-1`}>•</span>
                                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className={`mt-4 text-xs font-bold text-${color}-600 hover:text-${color}-700`}>+ Añadir factor</button>
                    </MetallicPanel>
                );
            })}
        </div>
    );

    const renderPorter = () => (
        <div className="space-y-4">
            {porterData.map((force, idx) => {
                const getLevelColor = (level) => {
                    if (level === 'Alta' || level === 'Alto') return 'red';
                    if (level === 'Media' || level === 'Medio') return 'yellow';
                    return 'green';
                };
                const color = getLevelColor(force.level);
                return (
                    <MetallicPanel key={idx} className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{force.force}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{force.description}</p>
                            </div>
                            <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold bg-${color}-50 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-400`}>
                                {force.level}
                            </span>
                        </div>
                        <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-${color}-500`}
                                style={{ width: force.level === 'Alta' || force.level === 'Alto' ? '80%' : force.level === 'Media' || force.level === 'Medio' ? '50%' : '30%' }}
                            />
                        </div>
                    </MetallicPanel>
                );
            })}
        </div>
    );

    const renderBCG = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetallicPanel className="p-6 border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10">
                <h3 className="text-lg font-black text-yellow-700 dark:text-yellow-400 mb-3">⭐ Estrellas</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Alto crecimiento, alta participación - Invertir</p>
                <ul className="space-y-2">
                    {bcgData.stars.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded text-sm font-bold">
                            ⭐ {item}
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-yellow-600 hover:text-yellow-700">+ Añadir programa</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-green-400 bg-green-50 dark:bg-green-900/10">
                <h3 className="text-lg font-black text-green-700 dark:text-green-400 mb-3">💰 Vacas Lecheras</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Bajo crecimiento, alta participación - Mantener</p>
                <ul className="space-y-2">
                    {bcgData.cashCows.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded text-sm font-bold">
                            💰 {item}
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-green-600 hover:text-green-700">+ Añadir programa</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-red-400 bg-red-50 dark:bg-red-900/10">
                <h3 className="text-lg font-black text-red-700 dark:text-red-400 mb-3">❓ Interrogantes</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Alto crecimiento, baja participación - Analizar</p>
                <ul className="space-y-2">
                    {bcgData.questionMarks.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded text-sm font-bold">
                            ❓ {item}
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-red-600 hover:text-red-700">+ Añadir programa</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-slate-400 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-lg font-black text-slate-700 dark:text-slate-400 mb-3">🐕 Perros</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Bajo crecimiento, baja participación - Desinvertir</p>
                <ul className="space-y-2">
                    {bcgData.dogs.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded text-sm font-bold">
                            🐕 {item}
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-slate-600 hover:text-slate-700">+ Añadir programa</button>
            </MetallicPanel>
        </div>
    );

    const renderCAME = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetallicPanel className="p-6 border-2 border-red-200 dark:border-red-900">
                <h3 className="text-lg font-black text-red-700 dark:text-red-400 mb-3">Corregir Debilidades</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Estrategias defensivas para mejorar puntos débiles internos</p>
                <ul className="space-y-2">
                    {cameData.corregir.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-red-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-red-600 hover:text-red-700">+ Añadir estrategia</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-orange-200 dark:border-orange-900">
                <h3 className="text-lg font-black text-orange-700 dark:text-orange-400 mb-3">Afrontar Amenazas</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Estrategias de supervivencia para enfrentar amenazas externas</p>
                <ul className="space-y-2">
                    {cameData.afrontar.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-orange-600 hover:text-orange-700">+ Añadir estrategia</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-green-200 dark:border-green-900">
                <h3 className="text-lg font-black text-green-700 dark:text-green-400 mb-3">Mantener Fortalezas</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Estrategias de reorientación para consolidar ventajas competitivas</p>
                <ul className="space-y-2">
                    {cameData.mantener.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-green-600 hover:text-green-700">+ Añadir estrategia</button>
            </MetallicPanel>

            <MetallicPanel className="p-6 border-2 border-blue-200 dark:border-blue-900">
                <h3 className="text-lg font-black text-blue-700 dark:text-blue-400 mb-3">Explotar Oportunidades</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Estrategias ofensivas para capitalizar oportunidades del entorno</p>
                <ul className="space-y-2">
                    {cameData.explotar.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-slate-700 dark:text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700">+ Añadir estrategia</button>
            </MetallicPanel>
        </div>
    );

    const renderToolContent = () => {
        switch (activeTool) {
            case 'swot':
                return renderSWOT();
            case 'pestel':
                return renderPESTEL();
            case 'porter':
                return renderPorter();
            case 'bcg':
                return renderBCG();
            case 'came':
                return renderCAME();
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Herramientas avanzadas de Análisis estratégico</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Frameworks estratégicos para análisis profundo y toma de decisiones
                </p>
            </div>

            {/* Tool Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                activeTool === tool.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                            }`}
                        >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${activeTool === tool.id ? 'text-blue-600' : 'text-slate-400'}`} />
                            <p className={`text-xs font-bold ${activeTool === tool.id ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                {tool.name}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Tool Description */}
            <MetallicPanel className="p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    {tools.find((t) => t.id === activeTool)?.description}
                </p>
            </MetallicPanel>

            {/* Tool Content */}
            <div>{renderToolContent()}</div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Guardar Análisis
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    Generar Reporte
                </button>
            </div>
        </div>
    );
};

export default StrategicTools;
