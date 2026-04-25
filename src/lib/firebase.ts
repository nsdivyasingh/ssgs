import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL9d_StsRgTuv6OzobbSe9PDBDUoyGGy8",
  authDomain: "ssgs-912de.firebaseapp.com",
  projectId: "ssgs-912de",
  storageBucket: "ssgs-912de.firebasestorage.app",
  messagingSenderId: "936406244743",
  appId: "1:936406244743:web:89c6c552dce89e24874722",
  measurementId: "G-WF6S80WTM3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
