
import React, { useState } from 'react';
import { useData } from '../context/useData';
import { Download, FilePieChart, FileSpreadsheet, FileJson, Calendar, Share2, ClipboardList, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-3 shadow-lg rounded-xl border border-gray-100 dark:border-slate-700">
                <p className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-tighter">{payload[0].name}</p>
                <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                    {payload[0].value} Iniciativas
                </p>
            </div>
        );
    }
    return null;
};

const ExportOption = ({ title, icon: Icon, color, desc, onClick }) => (
    <button onClick={onClick} className="card p-8 flex flex-col items-center hover:scale-[1.03] transition-all text-center group border-none ring-1 ring-black/5">
        <div className={`p-5 rounded-3xl mb-4 ${color} transition-all shadow-lg group-hover:rotate-6`}>
            {React.createElement(Icon, { size: 34, className: "text-white" })}
        </div>
        <h4 className="font-black text-gray-800 dark:text-white uppercase tracking-tight text-sm">{title}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{desc}</p>
    </button>
);

const Reports = () => {
    const { data } = useData();

    const [downloading, setDownloading] = useState(null);

    const psiCount = data.Psicologia.length;
    const clinCount = data.Clinica.length;

    const summaryData = [
        { name: 'Psicología', value: psiCount, color: '#003366' },
        { name: 'Psicología Clínica', value: clinCount, color: '#0056B3' },
    ];

    const handleDownload = (name) => {
        setDownloading(name);
        setTimeout(() => setDownloading(null), 3000);
    };

    return (
        <div className="space-y-10 animate-fade-in pb-12 overflow-x-auto">
            {downloading && (
                <div className="fixed top-8 right-8 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 animate-slide-in">
                    <CheckCircle className="animate-bounce" />
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest">Generando Reporte</p>
                        <p className="text-[10px] font-medium opacity-80">{downloading} preparado para descarga.</p>
                    </div>
                </div>
            )}

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-[var(--accent-dark)]">Resultados y Reportes</h2>
                    <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">SISTEMA INTEGRAL DE REPORTING EJECUTIVO</p>
                </div>
                <div className="flex bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-6 py-3 rounded-2xl shadow-sm items-center gap-4">
                    <Calendar size={18} className="text-blue-500" />
                    <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">CICLO ANUAL 2026</span>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ExportOption onClick={() => handleDownload('Informe Ejecutivo')} title="Informe Ejecutivo" desc="PDF • Análisis de Hitos" icon={FilePieChart} color="bg-rose-500" />
                <ExportOption onClick={() => handleDownload('Matriz de KPIs')} title="Matriz de KPIs" desc="XLSX • Full Dataset" icon={FileSpreadsheet} color="bg-emerald-600" />
                <ExportOption onClick={() => handleDownload('JSON Feed')} title="Interoperabilidad" desc="JSON • API Endpoint" icon={FileJson} color="bg-slate-800 dark:bg-slate-600" />
                <ExportOption onClick={() => handleDownload('Presentación')} title="Resumen Gerencial" desc="PPTX • Presentación" icon={ClipboardList} color="bg-indigo-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 card p-10 bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-800 dark:to-slate-800">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="font-bold text-lg text-[var(--accent-dark)] uppercase">Cumplimiento Global</h3>
                        <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-gray-400 transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="h-72 min-w-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 0, bottom: 20 }}>
                                    <Pie
                                        data={summaryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={105}
                                        paddingAngle={8}
                                        cornerRadius={6}
                                        stroke="none"
                                        dataKey="value"
                                    >
                                        {summaryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 card p-10 flex flex-col">
                    <h3 className="font-bold text-lg mb-8 text-[var(--accent-dark)] uppercase">Repositorio Operativo</h3>
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {[
                            { name: "Informe_Anual_Psicologia.pdf", type: "PDF", date: "Hace 10 min", size: "2.4 MB" },
                            { name: "Matriz_Excel_Clinica_T1.xlsx", type: "XLSX", date: "Hoy, 08:30 AM", size: "856 KB" },
                            { name: "Auditoria_Estrategica.pdf", type: "PDF", date: "Ayer", size: "1.2 MB" },
                            { name: "KPI_Summary_2026.json", type: "JSON", date: "24 Ene", size: "45 KB" },
                        ].map((report, i) => (
                            <div key={i} onClick={() => handleDownload(report.name)} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-500/20 cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                                        <Download size={18} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-black text-gray-800 dark:text-gray-200 uppercase tracking-tight truncate w-32 sm:w-44">{report.name}</p>
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">{report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <div className="p-1 px-2 rounded-md bg-gray-200 dark:bg-slate-700 text-[7px] font-black text-gray-500 uppercase">{report.type}</div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary w-full mt-8 shadow-lg shadow-blue-500/20">
                        Ver todo el historial
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
