// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "train-ticket-booking-web.firebaseapp.com",
    projectId: "train-ticket-booking-web",
    storageBucket: "train-ticket-booking-web.firebasestorage.app",
    messagingSenderId: "37567908384",
    appId: "1:37567908384:web:ca11ce49ab0f1ab9fb8a45",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
