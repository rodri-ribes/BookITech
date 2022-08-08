import { useContext, createContext, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth } from './index.js'
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/features/data/dataSlice.js';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    let dispatch = useDispatch()


    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            dispatch(getUser(currentUser));
        })

        return () => {
            unsubscribe();
        }
    }, [dispatch])



    return (
        <AuthContext.Provider value={{ googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}