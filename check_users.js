import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRS_qniD-vBDtVeybjMepDkHpaDB-ruA0",
  authDomain: "ups-planner-web-psicologia.firebaseapp.com",
  projectId: "ups-planner-web-psicologia",
  storageBucket: "ups-planner-web-psicologia.firebasestorage.app",
  messagingSenderId: "514207924458",
  appId: "1:514207924458:web:14c7e374c545137bf4d793"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkUsers() {
    try {
        console.log("Checking Firestore 'users' collection...");
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        if (users.length === 0) {
            console.log("No registered users found in Firestore.");
        } else {
            console.log(`Found ${users.length} users:`);
            users.forEach(u => {
                console.log(`- ${u.email || u.id}: ${u.name} (Role: ${u.role})`);
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
    process.exit(0);
}

checkUsers();
