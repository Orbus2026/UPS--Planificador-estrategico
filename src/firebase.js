
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRS_qniD-vBDtVeybjMepDkHpaDB-ruA0",
  authDomain: "ups-planner-web-psicologia.firebaseapp.com",
  projectId: "ups-planner-web-psicologia",
  storageBucket: "ups-planner-web-psicologia.firebasestorage.app",
  messagingSenderId: "514207924458",
  appId: "1:514207924458:web:14c7e374c545137bf4d793"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
