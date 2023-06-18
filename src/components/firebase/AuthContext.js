import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, OAuthProvider} from "firebase/auth";
import  {initializeApp} from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth'; 


const firebaseConfig = {
    apiKey: "AIzaSyBfutQNJ0N7-lXKolH1SycxwD8-GR6UTMI",
    authDomain: "timebandit-fb684.firebaseapp.com",
    projectId: "timebandit-fb684",
    storageBucket: "timebandit-fb684.appspot.com",
    messagingSenderId: "862140726441",
    appId: "1:862140726441:web:569ac8b0af7d41412bbdb8",
    measurementId: "G-24E8KLHYKW"
}


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider(); 


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword( email, password);
  };


  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider); // Use the Google Auth provider for sign-in
  };

  

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
