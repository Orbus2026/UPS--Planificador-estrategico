import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className="bg-white dark:bg-slate-800 p-4 shadow-xl rounded-xl border border-gray-200 dark:border-slate-700 max-w-xs">
                <p className="text-sm font-bold text-[var(--text-primary)] mb-2">{item.title || item.name}</p>
                <div className="space-y-1 text-xs">
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-bold">Impacto:</span> {item.impact}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-bold">Incertidumbre:</span> {item.uncertainty}
                    </p>
                    {item.category && (
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-bold">Categoría:</span> {item.category}
                        </p>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

const ImpactUncertaintyMap = ({ data, onPointClick }) => {


    const getQuadrantColor = (impact, uncertainty) => {
        if (impact >= 50 && uncertainty < 50) return '#10B981'; // High impact, low uncertainty - Green
        if (impact >= 50 && uncertainty >= 50) return '#F59E0B'; // High impact, high uncertainty - Amber
        if (impact < 50 && uncertainty < 50) return '#3B82F6'; // Low impact, low uncertainty - Blue
        return '#94A3B8'; // Low impact, high uncertainty - Gray
    };

    return (
        <div className="w-full h-full overflow-auto bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="min-w-[800px] min-h-[600px] w-full h-full relative p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            type="number"
                            dataKey="uncertainty"
                            name="Incertidumbre"
                            domain={[0, 100]}
                            label={{ value: 'Incertidumbre', position: 'bottom', style: { fill: '#6B7280', fontSize: 12, fontWeight: 600 } }}
                            tick={{ fill: '#9CA3AF', fontSize: 11 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="impact"
                            name="Impacto"
                            domain={[0, 100]}
                            label={{ value: 'Impacto', angle: -90, position: 'left', style: { fill: '#6B7280', fontSize: 12, fontWeight: 600 } }}
                            tick={{ fill: '#9CA3AF', fontSize: 11 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        <ReferenceLine x={50} stroke="#D1D5DB" strokeDasharray="5 5" />
                        <ReferenceLine y={50} stroke="#D1D5DB" strokeDasharray="5 5" />
                        <Scatter
                            data={data}
                            onClick={onPointClick}
                            cursor="pointer"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getQuadrantColor(entry.impact, entry.uncertainty)} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Quadrant Labels */}
                <div className="absolute top-8 left-8 text-xs font-bold text-green-600 dark:text-green-400 uppercase bg-white/80 dark:bg-slate-800/80 p-1 rounded backdrop-blur-sm">
                    Alto Impacto<br />Baja Incertidumbre
                </div>
                <div className="absolute top-8 right-8 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase text-right bg-white/80 dark:bg-slate-800/80 p-1 rounded backdrop-blur-sm">
                    Alto Impacto<br />Alta Incertidumbre
                </div>
                <div className="absolute bottom-8 left-8 text-xs font-bold text-gray-400 uppercase bg-white/80 dark:bg-slate-800/80 p-1 rounded backdrop-blur-sm">
                    Bajo Impacto<br />Baja Incertidumbre
                </div>
                <div className="absolute bottom-8 right-8 text-xs font-bold text-gray-400 uppercase text-right bg-white/80 dark:bg-slate-800/80 p-1 rounded backdrop-blur-sm">
                    Bajo Impacto<br />Alta Incertidumbre
                </div>
            </div>
        </div>
    );
};

export default ImpactUncertaintyMap;
