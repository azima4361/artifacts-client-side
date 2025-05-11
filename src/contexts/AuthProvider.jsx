import React, { useEffect, useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import app from '../../firebase.init';
import { AuthContext } from './AuthContext';
const auth= getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //   sign in with google
  const signInByGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //   creating user with email and password
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   updating profile
  const updatingProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //   signInWithEmailPassword
  const signInWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
   const userLogin = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

  //   logOut Button
  const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
        .finally(() => setLoading(false));
    }

  const authInfo = {
    user,
    userLogin,
    setUser,
    signInByGoogle,
    createNewUser,
    updatingProfile,
    signInWithEmailPassword,
    logOut,
    loading,
    setLoading,
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false);
    })
    return ()=>{
        unsubscribe();
    }
        },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;