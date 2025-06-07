// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwJKqEoZFRinFbkDa5YpiDRFAcw3t4RH4",
    authDomain: "sahayata-becce.firebaseapp.com",
    databaseURL: "https://sahayata-becce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sahayata-becce",
    storageBucket: "sahayata-becce.firebasestorage.app",
    messagingSenderId: "723850327793",
    appId: "1:723850327793:web:c51d0e22d974f3d8101b50",
    measurementId: "G-T8VRMD727N"
};

// Prevent re-initialization in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);