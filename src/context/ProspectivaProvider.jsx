import React, { useState, useMemo, useCallback } from 'react';
import { ProspectivaContext } from './ProspectivaContext';

export const ProspectivaProvider = ({ children }) => {
    // Signals State
    const [signals, setSignals] = useState([
        { id: 1, title: 'Aumento demanda salud mental post-pandemia', description: 'Incremento 40% en consultas psicológicas', source: 'OMS 2025', category: 'Social', impact: 85, uncertainty: 20, validated: true, date: '2026-01-15' },
        { id: 2, title: 'Regulación IA en diagnóstico clínico', description: 'Nueva normativa europea sobre uso de IA', source: 'EU Health Tech', category: 'Regulatorio', impact: 75, uncertainty: 60, validated: true, date: '2026-01-20' },
        { id: 3, title: 'Terapias digitales certificadas', description: 'Apps de terapia cognitiva con certificación oficial', source: 'FDA', category: 'Tecnológico', impact: 70, uncertainty: 45, validated: false, date: '2026-01-22' },
        { id: 4, title: 'Reducción presupuesto salud pública', description: 'Recorte 15% en financiamiento universitario', source: 'Ministerio Educación', category: 'Económico', impact: 90, uncertainty: 30, validated: true, date: '2026-01-10' }
    ]);

    // Scenarios State
    const [scenarios, setScenarios] = useState([
        {
            id: 1,
            name: 'Transformación Digital Acelerada',
            axisX: 'Adopción Tecnológica',
            axisY: 'Regulación',
            narrative: 'Las universidades adoptan masivamente plataformas digitales con regulación favorable que impulsa la innovación educativa.',
            assumptions: ['Inversión tecnológica sostenida', 'Capacitación docente efectiva', 'Infraestructura digital robusta'],
            status: 'active',
            createdDate: '2026-01-05'
        },
        {
            id: 2,
            name: 'Crisis de Recursos',
            axisX: 'Financiamiento',
            axisY: 'Demanda Estudiantil',
            narrative: 'Reducción drástica de presupuesto público con alta demanda estudiantil genera tensión en calidad educativa.',
            assumptions: ['Recortes presupuestarios continuos', 'Aumento matrícula sin recursos', 'Competencia por fondos privados'],
            status: 'active',
            createdDate: '2026-01-08'
        },
        {
            id: 3,
            name: 'Salud Mental Prioritaria',
            axisX: 'Conciencia Social',
            axisY: 'Políticas Públicas',
            narrative: 'La salud mental se posiciona como prioridad nacional con políticas públicas robustas y financiamiento específico.',
            assumptions: ['Cambio cultural sostenido', 'Políticas de Estado a largo plazo', 'Alianzas público-privadas'],
            status: 'draft',
            createdDate: '2026-01-12'
        }
    ]);

    // Early Warning Indicators State
    const [ewis, setEwis] = useState([
        { id: 1, name: 'Tasa de deserción estudiantil', metric: 'Porcentaje', currentValue: 18, yellowThreshold: 15, redThreshold: 20, status: 'yellow', lastUpdate: '2026-01-25' },
        { id: 2, name: 'Satisfacción docente', metric: 'Escala 1-10', currentValue: 6.2, yellowThreshold: 7, redThreshold: 6, status: 'red', lastUpdate: '2026-01-24' },
        { id: 3, name: 'Empleabilidad graduados', metric: 'Porcentaje', currentValue: 82, yellowThreshold: 80, redThreshold: 75, status: 'green', lastUpdate: '2026-01-20' },
        { id: 4, name: 'Publicaciones científicas', metric: 'Cantidad anual', currentValue: 45, yellowThreshold: 50, redThreshold: 40, status: 'yellow', lastUpdate: '2026-01-22' }
    ]);

    // Decisions State
    const [decisions, setDecisions] = useState([
        { id: 1, title: 'Implementar plataforma telemedicina', description: 'Servicio de consultas psicológicas virtuales', rationale: 'Respuesta a señal de demanda post-pandemia', status: 'approved', proposedDate: '2026-01-10', evidence: null },
        { id: 2, title: 'Crear laboratorio IA clínica', description: 'Espacio de investigación en IA aplicada a diagnóstico', rationale: 'Anticipación a regulación europea', status: 'proposed', proposedDate: '2026-01-18', evidence: null },
        { id: 3, title: 'Programa retención estudiantil', description: 'Tutorías y apoyo psicológico preventivo', rationale: 'EWI de deserción en zona amarilla', status: 'implemented', proposedDate: '2026-01-05', evidence: 'Informe Q1 2026', implementedDate: '2026-01-15' }
    ]);

    // Recommendations State
    const [recommendations, setRecommendations] = useState([
        { id: 1, title: 'Aumentar inversión en infraestructura digital', source: 'Escenario: Transformación Digital', impact: 'Alto', targetKPI: 'Adopción tecnológica docente', suggestedChange: '+25% presupuesto TIC', status: 'pending' },
        { id: 2, title: 'Diversificar fuentes de financiamiento', source: 'Escenario: Crisis de Recursos', impact: 'Crítico', targetKPI: 'Sostenibilidad financiera', suggestedChange: 'Crear 3 convenios privados', status: 'accepted' },
        { id: 3, title: 'Fortalecer programa bienestar estudiantil', source: 'EWI: Deserción estudiantil', impact: 'Medio', targetKPI: 'Tasa de retención', suggestedChange: '+2 psicólogos tiempo completo', status: 'pending' }
    ]);

    // Wind Tunneling Results State
    const [windTunnelingResults, setWindTunnelingResults] = useState([
        { id: 1, scenarioId: 1, initiativeId: 'INI-001', initiativeName: 'Aulas virtuales interactivas', impactScore: 9, notes: 'Altamente favorable en escenario digital' },
        { id: 2, scenarioId: 1, initiativeId: 'INI-002', initiativeName: 'Capacitación docente TIC', impactScore: 10, notes: 'Crítico para éxito del escenario' },
        { id: 3, scenarioId: 2, initiativeId: 'INI-003', initiativeName: 'Optimización recursos administrativos', impactScore: 8, notes: 'Esencial para sostenibilidad' }
    ]);

    // Backcasting Data State
    const [backcastingData, setBackcastingData] = useState([
        {
            id: 1,
            scenarioId: 1,
            year: 2030,
            milestone: 'Universidad 100% digital con certificación internacional',
            actions: ['Auditoría externa calidad digital', 'Certificación ISO educación online']
        },
        {
            id: 2,
            scenarioId: 1,
            year: 2028,
            milestone: '80% cursos con componente virtual',
            actions: ['Rediseño curricular completo', 'Plataforma LMS unificada', 'Capacitación masiva docentes']
        },
        {
            id: 3,
            scenarioId: 1,
            year: 2027,
            milestone: 'Infraestructura tecnológica robusta',
            actions: ['Inversión servidores cloud', 'Fibra óptica campus', 'Equipamiento aulas híbridas']
        }
    ]);

    // CRUD Functions for Signals
    const addSignal = useCallback((signal) => {
        setSignals(prev => [...prev, { ...signal, id: Date.now(), validated: false }]);
    }, []);

    const updateSignal = useCallback((id, updatedSignal) => {
        setSignals(prev => prev.map(s => s.id === id ? { ...s, ...updatedSignal } : s));
    }, []);

    const deleteSignal = useCallback((id) => {
        setSignals(prev => prev.filter(s => s.id !== id));
    }, []);

    // CRUD Functions for Scenarios
    const addScenario = useCallback((scenario) => {
        setScenarios(prev => [...prev, { ...scenario, id: Date.now(), status: 'draft', createdDate: new Date().toISOString().split('T')[0] }]);
    }, []);

    const updateScenario = useCallback((id, updatedScenario) => {
        setScenarios(prev => prev.map(s => s.id === id ? { ...s, ...updatedScenario } : s));
    }, []);

    const deleteScenario = useCallback((id) => {
        setScenarios(prev => prev.filter(s => s.id !== id));
    }, []);

    // CRUD Functions for EWIs
    const addEWI = useCallback((ewi) => {
        setEwis(prev => [...prev, { ...ewi, id: Date.now(), status: 'green', lastUpdate: new Date().toISOString().split('T')[0] }]);
    }, []);

    const updateEWI = useCallback((id, updatedEWI) => {
        setEwis(prev => {
            const currentItem = prev.find(e => e.id === id);
            if (!currentItem) return prev; // Should not happen

            const updated = { ...updatedEWI };
            // Auto-calculate status based on thresholds
            if (updated.currentValue !== undefined || updated.yellowThreshold !== undefined || updated.redThreshold !== undefined) {
                // Use potentially updated values or fall back to current ones
                const val = updated.currentValue !== undefined ? updated.currentValue : currentItem.currentValue;
                const yellow = updated.yellowThreshold !== undefined ? updated.yellowThreshold : currentItem.yellowThreshold;
                const red = updated.redThreshold !== undefined ? updated.redThreshold : currentItem.redThreshold;

                if (val >= red) {
                    updated.status = 'red';
                } else if (val >= yellow) {
                    updated.status = 'yellow';
                } else {
                    updated.status = 'green';
                }
                updated.lastUpdate = new Date().toISOString().split('T')[0];
            }
            return prev.map(e => e.id === id ? { ...e, ...updated } : e);
        });
    }, []);

    const deleteEWI = useCallback((id) => {
        setEwis(prev => prev.filter(e => e.id !== id));
    }, []);

    // CRUD Functions for Decisions
    const addDecision = useCallback((decision) => {
        setDecisions(prev => [...prev, { ...decision, id: Date.now(), status: 'proposed', proposedDate: new Date().toISOString().split('T')[0] }]);
    }, []);

    const updateDecision = useCallback((id, updatedDecision) => {
        setDecisions(prev => prev.map(d => d.id === id ? { ...d, ...updatedDecision } : d));
    }, []);

    const deleteDecision = useCallback((id) => {
        setDecisions(prev => prev.filter(d => d.id !== id));
    }, []);

    // Functions for Recommendations
    const addRecommendation = useCallback((recommendation) => {
        setRecommendations(prev => [...prev, { ...recommendation, id: Date.now(), status: 'pending' }]);
    }, []);

    const updateRecommendation = useCallback((id, updatedRecommendation) => {
        setRecommendations(prev => prev.map(r => r.id === id ? { ...r, ...updatedRecommendation } : r));
    }, []);

    // Functions for Wind Tunneling
    const saveWindTunneling = useCallback((result) => {
        setWindTunnelingResults(prev => {
            const existing = prev.find(
                r => r.scenarioId === result.scenarioId && r.initiativeId === result.initiativeId
            );
            if (existing) {
                return prev.map(r => r.id === existing.id ? { ...r, ...result } : r);
            } else {
                return [...prev, { ...result, id: Date.now() }];
            }
        });
    }, []);

    // Functions for Backcasting
    const saveBackcasting = useCallback((data) => {
        setBackcastingData(prev => {
            const existing = prev.find(
                b => b.scenarioId === data.scenarioId && b.year === data.year
            );
            if (existing) {
                return prev.map(b => b.id === existing.id ? { ...b, ...data } : b);
            } else {
                return [...prev, { ...data, id: Date.now() }];
            }
        });
    }, []);

    const value = useMemo(() => ({
        signals,
        scenarios,
        ewis,
        decisions,
        recommendations,
        windTunnelingResults,
        backcastingData,
        addSignal,
        updateSignal,
        deleteSignal,
        addScenario,
        updateScenario,
        deleteScenario,
        addEWI,
        updateEWI,
        deleteEWI,
        addDecision,
        updateDecision,
        deleteDecision,
        addRecommendation,
        updateRecommendation,
        saveWindTunneling,
        saveBackcasting
    }), [
        signals,
        scenarios,
        ewis,
        decisions,
        recommendations,
        windTunnelingResults,
        backcastingData,
        addSignal,
        updateSignal,
        deleteSignal,
        addScenario,
        updateScenario,
        deleteScenario,
        addEWI,
        updateEWI,
        deleteEWI,
        addDecision,
        updateDecision,
        deleteDecision,
        addRecommendation,
        updateRecommendation,
        saveWindTunneling,
        saveBackcasting
    ]);

    return (
        <ProspectivaContext.Provider value={value}>
            {children}
        </ProspectivaContext.Provider>
    );
};
