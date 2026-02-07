import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial users for reference (manual creation in Firebase is recommended)
    // admin@ups.edu.ec, docente@ups.edu.ec, calidad@ups.edu.ec

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const docRef = doc(db, "users", firebaseUser.uid);
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            ...docSnap.data()
                        });
                    } else {
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: firebaseUser.displayName || 'Usuario',
                            role: 'DOCENTE'
                        });
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth Initialization Error:", error);
                setUser(null); 
            } finally {
                setLoading(false);
            }
        });

        // Real-time subscription to all users for Team visibility
        const usersUnsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
        });

        // Safety timeout for loading state
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => {
            unsubscribe();
            usersUnsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Immediate fetch to avoid race condition with ProtectedRoute
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    ...docSnap.data()
                });
            } else {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || 'Usuario',
                    role: 'DOCENTE'
                });
            }

            return { success: true };
        } catch (error) {
            console.error("Firebase Login Error:", error.code, error.message);
            let message = 'Error de autenticación';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                message = 'Credenciales inválidas';
            } else if (error.code === 'auth/user-disabled') {
                message = 'Este usuario ha sido deshabilitado.';
            }
            return { success: false, message: `${message} (${error.code})` };
        }
    };

    const register = async (userData) => {
        console.log("Starting registration process for:", userData.email);
        try {
            console.log("Step 1: Creating user in Firebase Auth...");
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const firebaseUser = userCredential.user;
            console.log("Auth user created. UID:", firebaseUser.uid);

            console.log("Step 2: Updating auth profile...");
            await updateProfile(firebaseUser, { displayName: userData.name });
            console.log("Auth profile updated.");

            // Normalize role
            const role = userData.role === 'GERENTE DOCENTE' ? 'DOCENTE' : (userData.role || 'DOCENTE');

            // Store extra info in Firestore
            const newUserProfile = {
                name: userData.name,
                role: role,
                career: userData.career || 'General',
                createdAt: new Date().toISOString()
            };

            console.log("Step 3: Storing profile in Firestore (with 10s timeout)...");
            
            // Timeout wrapper for Firestore
            const firestorePromise = setDoc(doc(db, "users", firebaseUser.uid), newUserProfile);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('timeout')), 10000)
            );

            try {
                await Promise.race([firestorePromise, timeoutPromise]);
                console.log("Firestore profile stored successfully.");
            } catch (fsError) {
                console.error("Firestore Error or Timeout:", fsError.message);
                if (fsError.message === 'timeout') {
                    throw new Error('timeout_firestore');
                }
                throw fsError;
            }

            setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                ...newUserProfile
            });

            console.log("Registration complete.");
            return { success: true };
        } catch (error) {
            console.error("Firebase Registration Error Detail:", error.code, error.message);
            let message = 'Error al registrar';
            
            if (error.message === 'timeout_firestore') {
                message = 'La base de datos (Firestore) no responde. Posiblemente no ha sido inicializada en la Consola de Firebase.';
            } else if (error.code === 'auth/email-already-in-use') {
                message = 'El correo ya está en uso';
            } else if (error.code === 'auth/weak-password') {
                message = 'La contraseña debe tener al menos 6 caracteres';
            } else if (error.code === 'auth/configuration-not-found') {
                message = 'El método de Autenticación (Email/Password) no ha sido habilitado en la Consola de Firebase.';
            } else if (error.code === 'permission-denied') {
                message = 'Error de permisos en Firestore. Verifica que las reglas permitan la escritura.';
            }
            
            return { success: false, message: `${message} (${error.code || 'TIMEOUT'})` };
        }
    };

    const updateUser = async (updates, targetUid = null) => {
        const uid = targetUid || auth.currentUser?.uid;
        if (!uid) return;
        
        try {
            const userRef = doc(db, "users", uid);
            await setDoc(userRef, updates, { merge: true });
            
            // If updating current user, update the 'user' state too
            if (uid === auth.currentUser?.uid) {
                setUser(prev => ({ ...prev, ...updates }));
            }
            return { success: true };
        } catch (error) {
            console.error("Error updating user profile:", error);
            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const hasPermission = (permission) => {
        if (!user || !user.role) return false;
        
        const userRole = user.role.toUpperCase();
        if (userRole === 'DIRECTOR') return true;

        const roles = {
            'DOCENTE': ['gestionar_iniciativas', 'subir_evidencia', 'ver_reportes'],
            'ACREDITACIÓN': ['validar_evidencia', 'ver_reportes', 'auditoria']
        };

        return roles[userRole]?.includes(permission) || false;
    };

    const getRoleLabel = (role) => {
        if (!role) return '';
        if (role === 'DOCENTE' || role === 'GERENTE DOCENTE') return 'ROL DOCENTE';
        return role;
    };

    return (
        <AuthContext.Provider value={{ user, users, loading, login, logout, register, updateUser, hasPermission, getRoleLabel }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
