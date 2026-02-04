import { useContext } from 'react';
import { ProspectivaContext } from './ProspectivaContext';

export const useProspectiva = () => {
    const context = useContext(ProspectivaContext);
    if (!context) {
        throw new Error('useProspectiva must be used within ProspectivaProvider');
    }
    return context;
};
