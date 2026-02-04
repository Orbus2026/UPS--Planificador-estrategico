import { createContext } from 'react';

export const ProspectivaContext = createContext({
    signals: [],
    scenarios: [],
    ewis: [],
    decisions: [],
    recommendations: [],
    windTunnelingResults: [],
    backcastingData: [],
    addSignal: () => { },
    updateSignal: () => { },
    deleteSignal: () => { },
    addScenario: () => { },
    updateScenario: () => { },
    deleteScenario: () => { },
    addEWI: () => { },
    updateEWI: () => { },
    deleteEWI: () => { },
    addDecision: () => { },
    updateDecision: () => { },
    deleteDecision: () => { },
    addRecommendation: () => { },
    updateRecommendation: () => { },
    saveWindTunneling: () => { },
    saveBackcasting: () => { }
});
