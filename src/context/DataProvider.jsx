import React, { useState } from 'react';
import rawData from '../data.json';
import { processData } from '../utils/dataHelpers';
import { DataContext } from './DataContext';

export const DataProvider = ({ children }) => {
    const [data] = useState({
        Psicologia: processData(rawData.Psicologia),
        Clinica: processData(rawData.Clinica),
        strategic: rawData.strategic || {}
    });

    const [currentUser] = useState({
        name: "Dr. Admin",
        role: "DIRECTOR",
        level: 5,
        badges: ["Verificador Pro", "Early Adopter"],
        avatar: "https://ui-avatars.com/api/?name=Dr+Admin&background=003366&color=fff"
    });

    const getSmartAlerts = () => {
        const alerts = [];
        Object.keys(data).forEach(segment => {
            if (segment === 'strategic') return;
            data[segment].processedInitiatives?.forEach(init => {
                if (init.percentage < 40) {
                    alerts.push({
                        id: init.id,
                        segment,
                        title: init.name,
                        type: 'danger',
                        message: `Bajo avance (${init.percentage}%) detectado en iniciativa clave.`
                    });
                }
            });
        });
        return alerts;
    };

    return (
        <DataContext.Provider value={{ data, currentUser, getSmartAlerts }}>
            {children}
        </DataContext.Provider>
    );
};
