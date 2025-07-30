import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX1HQF3jZQhc3NQCq_dcR2gHzdjtB8CIo",
  authDomain: "snapshoot-app.firebaseapp.com",
  projectId: "snapshoot-app",
  storageBucket: "snapshoot-app.firebasestorage.app",
  messagingSenderId: "1074847119781",
  appId: "1:1074847119781:web:393d364da0ea444991d04c",
  measurementId: "G-6628QZ4LNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

// Export the config for use in other services
export { firebaseConfig };

export default app; 