import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
    const variants = {
        draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        archived: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
        proposed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        implemented: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        closed: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        yellow: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm'
    };

    const labels = {
        draft: 'Borrador',
        active: 'Activo',
        archived: 'Archivado',
        proposed: 'Propuesto',
        approved: 'Aprobado',
        implemented: 'Implementado',
        closed: 'Cerrado',
        pending: 'Pendiente',
        accepted: 'Aceptado',
        rejected: 'Rechazado',
        validated: 'Validado',
        green: 'Verde',
        yellow: 'Amarillo',
        red: 'Crítico'
    };

    return (
        <span className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider ${variants[status] || variants.draft} ${sizes[size]}`}>
            {labels[status] || status}
        </span>
    );
};

export default StatusBadge;
