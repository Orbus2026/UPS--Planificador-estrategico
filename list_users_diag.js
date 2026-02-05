
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRS_qniD-vBDtVeybjMepDkHpaDB-ruA0",
  authDomain: "ups-planner-web-psicologia.firebaseapp.com",
  projectId: "ups-planner-web-psicologia",
  storageBucket: "ups-planner-web-psicologia.firebasestorage.app",
  messagingSenderId: "514207924458",
  appId: "1:514207924458:web:14c7e374c545137bf4d793"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function listUsers() {
    console.log("Authenticating as admin...");
    try {
        await signInWithEmailAndPassword(auth, "admin@ups.edu.ec", "admin123");
        console.log("Authenticated successfully.");
        
        console.log("Fetching users from Firestore...");
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        if (users.length === 0) {
            console.log("No users found in Firestore collection 'users'.");
        } else {
            console.log("Registered Users:");
            console.table(users);
        }
    } catch (error) {
        console.error("Error:", error.code, error.message);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            console.log("Note: Default admin user might not have been created in Firebase yet.");
        }
    }
    process.exit(0);
}

listUsers();
