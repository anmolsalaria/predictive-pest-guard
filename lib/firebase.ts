import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc82pQeABA942Gb9DeAqI1263kJexjN5w",
  authDomain: "predictive-pest-guard.firebaseapp.com",
  projectId: "predictive-pest-guard",
  storageBucket: "predictive-pest-guard.firebasestorage.app",
  messagingSenderId: "578645843031",
  appId: "1:578645843031:web:d195ede887284c31995712",
  measurementId: "G-VZXGVXJ5BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();