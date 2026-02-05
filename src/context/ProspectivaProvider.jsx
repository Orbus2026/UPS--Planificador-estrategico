import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ProspectivaContext } from './ProspectivaContext';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';

export const ProspectivaProvider = ({ children }) => {
    // Initial Seed Data (Keep for initialization)
    const initialData = {
        signals: [
            { id: 1, title: 'Aumento demanda salud mental post-pandemia', description: 'Incremento 40% en consultas psicológicas', source: 'OMS 2025', category: 'Social', impact: 85, uncertainty: 20, validated: true, date: '2026-01-15' },
            { id: 2, title: 'Regulación IA en diagnóstico clínico', description: 'Nueva normativa europea sobre uso de IA', source: 'EU Health Tech', category: 'Regulatorio', impact: 75, uncertainty: 60, validated: true, date: '2026-01-20' },
            { id: 3, title: 'Terapias digitales certificadas', description: 'Apps de terapia cognitiva con certificación oficial', source: 'FDA', category: 'Tecnológico', impact: 70, uncertainty: 45, validated: false, date: '2026-01-22' },
            { id: 4, title: 'Reducción presupuesto salud pública', description: 'Recorte 15% en financiamiento universitario', source: 'Ministerio Educación', category: 'Económico', impact: 90, uncertainty: 30, validated: true, date: '2026-01-10' }
        ],
        scenarios: [
            { id: 1, name: 'Transformación Digital Acelerada', axisX: 'Adopción Tecnológica', axisY: 'Regulación', narrative: 'Las universidades adoptan masivamente plataformas digitales con regulación favorable que impulsa la innovación educativa.', assumptions: ['Inversión tecnológica sostenida', 'Capacitación docente efectiva', 'Infraestructura digital robusta'], status: 'active', createdDate: '2026-01-05' },
            { id: 2, name: 'Crisis de Recursos', axisX: 'Financiamiento', axisY: 'Demanda Estudiantil', narrative: 'Reducción drástica de presupuesto público con alta demanda estudiantil genera tensión en calidad educativa.', assumptions: ['Recortes presupuestarios continuos', 'Aumento matrícula sin recursos', 'Competencia por fondos privados'], status: 'active', createdDate: '2026-01-08' },
            { id: 3, name: 'Salud Mental Prioritaria', axisX: 'Conciencia Social', axisY: 'Políticas Públicas', narrative: 'La salud mental se posiciona como prioridad nacional con políticas públicas robustas y financiamiento específico.', assumptions: ['Cambio cultural sostenido', 'Políticas de Estado a largo plazo', 'Alianzas público-privadas'], status: 'draft', createdDate: '2026-01-12' }
        ],
        ewis: [
            { id: 1, name: 'Tasa de deserción estudiantil', metric: 'Porcentaje', currentValue: 18, yellowThreshold: 15, redThreshold: 20, status: 'yellow', lastUpdate: '2026-01-25' },
            { id: 2, name: 'Satisfacción docente', metric: 'Escala 1-10', currentValue: 6.2, yellowThreshold: 7, redThreshold: 6, status: 'red', lastUpdate: '2026-01-24' },
            { id: 3, name: 'Empleabilidad graduados', metric: 'Porcentaje', currentValue: 82, yellowThreshold: 80, redThreshold: 75, status: 'green', lastUpdate: '2026-01-20' },
            { id: 4, name: 'Publicaciones científicas', metric: 'Cantidad anual', currentValue: 45, yellowThreshold: 50, redThreshold: 40, status: 'yellow', lastUpdate: '2026-01-22' }
        ],
        decisions: [
            { id: 1, title: 'Implementar plataforma telemedicina', description: 'Servicio de consultas psicológicas virtuales', rationale: 'Respuesta a señal de demanda post-pandemia', status: 'approved', proposedDate: '2026-01-10', evidence: null },
            { id: 2, title: 'Crear laboratorio IA clínica', description: 'Espacio de investigación en IA aplicada a diagnóstico', rationale: 'Anticipación a regulación europea', status: 'proposed', proposedDate: '2026-01-18', evidence: null },
            { id: 3, title: 'Programa retención estudiantil', description: 'Tutorías y apoyo psicológico preventivo', rationale: 'EWI de deserción en zona amarilla', status: 'implemented', proposedDate: '2026-01-05', evidence: 'Informe Q1 2026', implementedDate: '2026-01-15' }
        ],
        recommendations: [
            { id: 1, title: 'Aumentar inversión en infraestructura digital', source: 'Escenario: Transformación Digital', impact: 'Alto', targetKPI: 'Adopción tecnológica docente', suggestedChange: '+25% presupuesto TIC', status: 'pending' },
            { id: 2, title: 'Diversificar fuentes de financiamiento', source: 'Escenario: Crisis de Recursos', impact: 'Crítico', targetKPI: 'Sostenibilidad financiera', suggestedChange: 'Crear 3 convenios privados', status: 'accepted' },
            { id: 3, title: 'Fortalecer programa bienestar estudiantil', source: 'EWI: Deserción estudiantil', impact: 'Medio', targetKPI: 'Tasa de retención', suggestedChange: '+2 psicólogos tiempo completo', status: 'pending' }
        ],
        wind_tunneling: [
            { id: 1, scenarioId: 1, initiativeId: 'INI-001', initiativeName: 'Aulas virtuales interactivas', impactScore: 9, notes: 'Altamente favorable en escenario digital' },
            { id: 2, scenarioId: 1, initiativeId: 'INI-002', initiativeName: 'Capacitación docente TIC', impactScore: 10, notes: 'Crítico para éxito del escenario' },
            { id: 3, scenarioId: 2, initiativeId: 'INI-003', initiativeName: 'Optimización recursos administrativos', impactScore: 8, notes: 'Esencial para sostenibilidad' }
        ],
        backcasting: [
            { id: 1, scenarioId: 1, year: 2030, milestone: 'Universidad 100% digital con certificación internacional', actions: ['Auditoría externa calidad digital', 'Certificación ISO educación online'] },
            { id: 2, scenarioId: 1, year: 2028, milestone: '80% cursos con componente virtual', actions: ['Rediseño curricular completo', 'Plataforma LMS unificada', 'Capacitación masiva docentes'] },
            { id: 3, scenarioId: 1, year: 2027, milestone: 'Infraestructura tecnológica robusta', actions: ['Inversión servidores cloud', 'Fibra óptica campus', 'Equipamiento aulas híbridas'] }
        ]
    };

    const [state, setState] = useState({
        signals: [],
        scenarios: [],
        ewis: [],
        decisions: [],
        recommendations: [],
        windTunnelingResults: [],
        backcastingData: []
    });

    // Generic Hook for Collection Sync
    const useCollectionSync = (collectionName, stateKey) => {
        useEffect(() => {
            const unsub = onSnapshot(collection(db, collectionName), async (snapshot) => {
                if (snapshot.empty && initialData[collectionName]) {
                    console.log(`Initializing ${collectionName}...`);
                    const batch = writeBatch(db);
                    initialData[collectionName].forEach(item => {
                        // eslint_disable_next_line no-unused-vars
                        const docId = item.id.toString(); 
                        const docRef = doc(db, collectionName, docId);
                        batch.set(docRef, { ...item, id: docId }); // Store ID as string inside doc too
                    });
                    
                    try {
                        await batch.commit();
                        console.log(`${collectionName} initialized.`);
                    } catch (e) {
                        console.error(`Error initializing ${collectionName}:`, e);
                    }
                    return;
                }

                const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setState(prev => ({ ...prev, [stateKey]: data }));
            }, (error) => {
                console.error(`Error syncing ${collectionName}:`, error);
            });

            return () => unsub();
        }, [collectionName, stateKey]); // Added dependencies
    };

    // Sync all collections
    useCollectionSync('signals', 'signals');
    useCollectionSync('scenarios', 'scenarios');
    useCollectionSync('ewis', 'ewis');
    useCollectionSync('decisions', 'decisions');
    useCollectionSync('recommendations', 'recommendations');
    useCollectionSync('wind_tunneling', 'windTunnelingResults');
    useCollectionSync('backcasting', 'backcastingData');

    // Generic CRUD Helpers
    const addItem = async (collectionName, item) => {
        try {
            await addDoc(collection(db, collectionName), item);
        } catch (e) {
            console.error(`Error adding to ${collectionName}:`, e);
        }
    };

    const updateItem = async (collectionName, id, updates) => {
        try {
            const docRef = doc(db, collectionName, id.toString());
            await updateDoc(docRef, updates);
        } catch (e) {
            console.error(`Error updating ${collectionName}:`, e);
        }
    };

    const deleteItem = async (collectionName, id) => {
        try {
            const docRef = doc(db, collectionName, id.toString());
            await deleteDoc(docRef);
        } catch (e) {
            console.error(`Error deleting from ${collectionName}:`, e);
        }
    };

    // Specific Actions (Mapped to Generic CRUD)
    const addSignal = useCallback((item) => addItem('signals', { ...item, validated: false }), []);
    const updateSignal = useCallback((id, updates) => updateItem('signals', id, updates), []);
    const deleteSignal = useCallback((id) => deleteItem('signals', id), []);

    const addScenario = useCallback((item) => addItem('scenarios', { ...item, status: 'draft', createdDate: new Date().toISOString().split('T')[0] }), []);
    const updateScenario = useCallback((id, updates) => updateItem('scenarios', id, updates), []);
    const deleteScenario = useCallback((id) => deleteItem('scenarios', id), []);

    const addEWI = useCallback((item) => addItem('ewis', { ...item, status: 'green', lastUpdate: new Date().toISOString().split('T')[0] }), []);
    const updateEWI = useCallback((id, updates) => {
        // Replicating logic:
        // We will just update. The UI provided the status if it changed, logic is simplified to trust the caller 
        // OR we can implement a basic check if specifically status-altering fields are present.
        // For now, simpler is better for migration.
        if (updates.currentValue !== undefined || updates.yellowThreshold !== undefined || updates.redThreshold !== undefined) {
             updateItem('ewis', id, { ...updates, lastUpdate: new Date().toISOString().split('T')[0] });
        } else {
             updateItem('ewis', id, updates);
        }
    }, []); // Removed dependency on state to avoid re-creation loops or stale closure complexity

    const deleteEWI = useCallback((id) => deleteItem('ewis', id), []);

    const addDecision = useCallback((item) => addItem('decisions', { ...item, status: 'proposed', proposedDate: new Date().toISOString().split('T')[0] }), []);
    const updateDecision = useCallback((id, updates) => updateItem('decisions', id, updates), []);
    const deleteDecision = useCallback((id) => deleteItem('decisions', id), []);

    const addRecommendation = useCallback((item) => addItem('recommendations', { ...item, status: 'pending' }), []);
    const updateRecommendation = useCallback((id, updates) => updateItem('recommendations', id, updates), []);

    const saveWindTunneling = useCallback((result) => {
        // Logic: upsert based on scenarioId + initiativeId
        // This is tricky with simple firestore. We need to query.
        // For now, assume add for new, or if we can find it in state.
        // Check state first.
        const existing = state.windTunnelingResults.find(r => r.scenarioId === result.scenarioId && r.initiativeId === result.initiativeId);
        if (existing) {
            updateItem('wind_tunneling', existing.id, result);
        } else {
            addItem('wind_tunneling', result);
        }
    }, [state.windTunnelingResults]);

    const saveBackcasting = useCallback((data) => {
        const existing = state.backcastingData.find(b => b.scenarioId === data.scenarioId && b.year === data.year);
        if (existing) {
             updateItem('backcasting', existing.id, data);
        } else {
             addItem('backcasting', data);
        }
    }, [state.backcastingData]);


    const value = useMemo(() => ({
        ...state,
        addSignal, updateSignal, deleteSignal,
        addScenario, updateScenario, deleteScenario,
        addEWI, updateEWI, deleteEWI,
        addDecision, updateDecision, deleteDecision,
        addRecommendation, updateRecommendation,
        saveWindTunneling, saveBackcasting
    }), [
        state,
        addSignal, updateSignal, deleteSignal,
        addScenario, updateScenario, deleteScenario,
        addEWI, updateEWI, deleteEWI,
        addDecision, updateDecision, deleteDecision,
        addRecommendation, updateRecommendation,
        saveWindTunneling, saveBackcasting
    ]);

    return (
        <ProspectivaContext.Provider value={value}>
            {children}
        </ProspectivaContext.Provider>
    );
};
