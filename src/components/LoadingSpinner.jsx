import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-blue-600 dark:text-blue-400">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="text-lg font-bold animate-pulse">Cargando...</p>
        </div>
    );
};

export default LoadingSpinner;
