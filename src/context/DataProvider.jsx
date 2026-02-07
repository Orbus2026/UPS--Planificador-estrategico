import React, { useState, useEffect } from 'react';
import rawData from '../data.json';
import { processData } from '../utils/dataHelpers';
import { DataContext } from './DataContext';
import { db } from '../firebase';
import { collection, doc, setDoc, onSnapshot, writeBatch, getDocs } from 'firebase/firestore';

import { useAuth } from './AuthContext';

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [data, setData] = useState({
        Psicologia: [],
        Clinica: []
    });
    const [strategicData, setStrategicData] = useState(rawData.strategic || {
        pestel: [],
        porter: [],
        bcg: [],
        came: []
    });
    const [loading, setLoading] = useState(!!user);

    useEffect(() => {
        if (!user) return;

        setLoading(true);

        // Sync with Firestore (Initiatives)
        const initiativesRef = collection(db, "initiatives");
        const unsubscribeInitiatives = onSnapshot(initiativesRef, (snapshot) => {
            if (snapshot.empty) {
                const batch = writeBatch(db);
                processData(rawData.Psicologia).forEach(item => {
                    batch.set(doc(db, "initiatives", `Psicologia_${item.id}`), { ...item, career: 'Psicologia' });
                });
                processData(rawData.Clinica).forEach(item => {
                    batch.set(doc(db, "initiatives", `Clinica_${item.id}`), { ...item, career: 'Clinica' });
                });
                batch.commit().catch(console.error);
                return;
            }

            const initiativesData = { Psicologia: [], Clinica: [] };
            snapshot.docs.forEach(doc => {
                const item = doc.data();
                const c = item.career || '';
                if (c.includes('Psicologia') || c.includes('Psicología')) initiativesData.Psicologia.push(item);
                else initiativesData.Clinica.push(item);
            });
            setData({
                Psicologia: initiativesData.Psicologia.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric:true})),
                Clinica: initiativesData.Clinica.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric:true}))
            });
            setLoading(false);
        });

        // Sync Strategic Analysis
        const strategicRef = doc(db, "settings", "strategic_analysis");
        const unsubscribeStrategic = onSnapshot(strategicRef, (docSnap) => {
            if (docSnap.exists()) {
                setStrategicData(docSnap.data());
            } else {
                // Initialize if not exists
                setDoc(strategicRef, rawData.strategic || { pestel: [], porter: [], bcg: [], came: [] });
            }
        });

        return () => {
            unsubscribeInitiatives();
            unsubscribeStrategic();
        };
    }, [user]);

    const updateInitiative = async (career, id, updates) => {
        try {
            const docId = `${career}_${id}`;
            const docRef = doc(db, "initiatives", docId);
            await setDoc(docRef, updates, { merge: true });
            return true;
        } catch (error) {
            console.error("Error updating initiative:", error);
            return false;
        }
    };

    const updateStrategic = async (newStrategic) => {
        try {
            const strategicRef = doc(db, "settings", "strategic_analysis");
            await setDoc(strategicRef, newStrategic);
            return true;
        } catch (error) {
            console.error("Error updating strategic analysis:", error);
            return false;
        }
    };

    const getSmartAlerts = () => {
        const alerts = [];
        ['Psicologia', 'Clinica'].forEach(segment => {
            if (!data[segment]) return;
            data[segment].forEach(init => {
                const progress = parseFloat(init.progress) || 0;
                if (progress < 40) {
                    alerts.push({
                        id: `alert-${init.id}`,
                        type: 'warning',
                        title: 'Bajo Rendimiento Detectado',
                        message: `La iniciativa "${init.iniciativa}" está al ${progress}%. Recomendamos revisión estratégica.`,
                        time: 'Ahora',
                        context: { initiative: init, segment }
                    });
                } else if (progress >= 100) {
                    alerts.push({
                        id: `alert-${init.id}`,
                        type: 'success',
                        title: 'Meta Alcanzada',
                        message: `¡Felicidades! Se ha completado el 100% de "${init.iniciativa}".`,
                        time: 'Reciente',
                        context: { initiative: init, segment }
                    });
                }
            });
        });
        return alerts;
    };

    const resetData = async () => {
        try {
            console.log("Resetting data...");
            const initiativesRef = collection(db, "initiatives");
            const snapshot = await getDocs(initiativesRef);
            const batch = writeBatch(db);
            
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            
            await batch.commit();
            console.log("Data reset complete. Firestore listener should trigger re-initialization.");
            return true;
        } catch (error) {
            console.error("Error resetting data:", error);
            return false;
        }
    };

    return (
        <DataContext.Provider value={{ 
            data, 
            strategicData, 
            updateInitiative, 
            updateStrategic, 
            getSmartAlerts, 
            loading, 
            resetData 
        }}>
            {children}
        </DataContext.Provider>
    );
};
