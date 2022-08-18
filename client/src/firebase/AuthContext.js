import { useContext, createContext, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from './index.js'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/features/data/dataSlice.js';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    let dispatch = useDispatch()


    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            dispatch(getUser(currentUser));

            if (currentUser) {
                let displayName = currentUser?.displayName;
                let email = currentUser?.email

                try {
                    let datos = await axios.post(`http://localhost:3001/save`, {
                        displayName, email
                    })
                    window.localStorage.setItem("user", JSON.stringify(datos.data))
                } catch (error) {
                    console.log(error.message)
                }
            }
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