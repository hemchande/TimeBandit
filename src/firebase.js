import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from 'firebase/auth';
import { initializeAnalytics } from 'firebase/analytics';



const firebaseConfig = {
    apiKey: "AIzaSyBfutQNJ0N7-lXKolH1SycxwD8-GR6UTMI",
    authDomain: "timebandit-fb684.firebaseapp.com",
    projectId: "timebandit-fb684",
    storageBucket: "timebandit-fb684.appspot.com",
    messagingSenderId: "862140726441",
    appId: "1:862140726441:web:569ac8b0af7d41412bbdb8",
    measurementId: "G-24E8KLHYKW"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const analytics = initializeAnalytics(firebaseApp);


export { auth, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };