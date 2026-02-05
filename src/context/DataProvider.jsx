import React, { useState, useEffect } from 'react';
import rawData from '../data.json';
import { processData } from '../utils/dataHelpers';
import { DataContext } from './DataContext';
import { db } from '../firebase';
import { collection, doc, setDoc, onSnapshot, writeBatch, getDocs } from 'firebase/firestore';

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        Psicologia: [],
        Clinica: [],
        strategic: rawData.strategic || {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Sync with Firestore
        const initiativesRef = collection(db, "initiatives");
        
        const unsubscribe = onSnapshot(initiativesRef, async (snapshot) => {
            console.log("Firestore Snapshot received, docs count:", snapshot.docs.length);
            if (snapshot.empty) {
                console.log("Collection 'initiatives' is empty. Initializing...");
                const batch = writeBatch(db);
                
                const initialP = processData(rawData.Psicologia);
                const initialC = processData(rawData.Clinica);
                
                initialP.forEach(item => {
                    const docRef = doc(db, "initiatives", `Psicologia_${item.id}`);
                    batch.set(docRef, { ...item, career: 'Psicologia' });
                });
                
                initialC.forEach(item => {
                    const docRef = doc(db, "initiatives", `Clinica_${item.id}`);
                    batch.set(docRef, { ...item, career: 'Clinica' });
                });
                
                await batch.commit();
                console.log("Initialization batch committed.");
                return;
            }

            const initiativesData = {
                Psicologia: [],
                Clinica: [],
                strategic: rawData.strategic || {}
            };

            snapshot.docs.forEach(doc => {
                const item = doc.data();
                // Normalize career match
                const c = item.career || '';
                if (c === 'Psicologia' || c === 'Psicología') initiativesData.Psicologia.push({ ...item, career: 'Psicologia' });
                else if (c === 'Clinica' || c === 'Clínica' || c === 'Psicología Clínica') initiativesData.Clinica.push({ ...item, career: 'Clinica' });
                else {
                    console.warn("Item with unknown career:", item.id, item.career);
                }
            });

            console.log("Processed initiatives:", {
                Psicologia: initiativesData.Psicologia.length,
                Clinica: initiativesData.Clinica.length
            });

            initiativesData.Psicologia.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
            initiativesData.Clinica.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

            setData(initiativesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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

    const getSmartAlerts = () => {
        const alerts = [];
        ['Psicologia', 'Clinica'].forEach(segment => {
            data[segment].forEach(init => {
                if (init.progress < 40) {
                    alerts.push({
                        id: init.id,
                        segment,
                        title: init.iniciativa,
                        type: 'danger',
                        message: `Bajo avance (${init.progress}%) detectado en iniciativa clave.`
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
        <DataContext.Provider value={{ data, updateInitiative, getSmartAlerts, loading, resetData }}>
            {children}
        </DataContext.Provider>
    );
};
