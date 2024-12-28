import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBS7ItA7YVCHBXinIkFr0CeDyP1j7kYmtE",
    authDomain: "skillup-admin.firebaseapp.com",
    projectId: "skillup-admin",
    storageBucket: "skillup-admin.firebasestorage.app",
    messagingSenderId: "479703816071",
    appId: "1:479703816071:web:dcc07e6b0b7f83804aa522"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth instance and necessary functions
export { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup };