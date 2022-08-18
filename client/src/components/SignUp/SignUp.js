import React, { useEffect, useState } from 'react'
import style from './SignUp.module.css'

import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getLibros, getUser } from '../../redux/features/data/dataSlice';
import { UserAuth } from '../../firebase/AuthContext';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { signInWithPopup, FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/index';
const {REACT_APP_API} = process.env


export default function SignUp() {

    const [confirm, setConfirm] = useState({
        message: "",
        visible: null,
        error: null,
    })

    let navigate = useNavigate()

    let dispatch = useDispatch();

    const { googleSignIn } = UserAuth();

    
    
        

    







    const handleSubmitGoogle = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            dispatch(getLibros())
            navigate("/")
        }, 5000);
    }


    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        
        signInWithPopup(auth, provider)
         
            .catch((err) => {
                console.log(err.message);
            })
        setTimeout(() => {
            dispatch(getLibros())
            navigate("/")
        }, 15000);

    }
  

    const signInWithGithub = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
        
            .catch((err) => {
                console.log(err.message);
            })
        setTimeout(() => {
            dispatch(getLibros())
            navigate("/")
        }, 15000);

    }
    const responseGithub = (response) => {
        console.log(response);
    }


  

    let user = useSelector(state => state.data.user)

    useEffect(() => {
        if (user || window.localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])



    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                password2: "",
            }}
            onSubmit={async (valores, { resetForm }) => {

                let { name, email, password } = valores;

                let fullName;

                fullName = name.charAt(0).toUpperCase() + name.slice(1)
                console.log(fullName, email, password)
                try {
                    let resp = await axios.post(REACT_APP_API+ `/signup`, {
                        fullName, email, password
                    })
                    window.localStorage.setItem("user", JSON.stringify(resp.data))
                    dispatch(getUser(resp.data))
                    setConfirm({ message: "Successfully registered", visible: true, error: false })

                    setTimeout(() => {
                        setConfirm({ message: "", visible: null, error: null })
                        dispatch(getLibros())
                        navigate("/")
                    }, 2000);

                    resetForm();
                    valores.password2 = "";

                } catch (error) {

                    setConfirm({ message: error.response.data, visible: true, error: true })
                    setTimeout(() => {
                        setConfirm({ message: "", visible: null, error: null })
                    }, 2000);

                }
            }}
            validate={(valores) => {
                let errores = {};

                if (!valores.name) {
                    errores.name = "Enter name"
                } else if (/^[a-zA-ZÀ-ÿ\s]{1,3}$/.test(valores.name)) {
                    errores.name = "Enter a minimum of 4 characters, they can only be letters and spaces"
                }
                if (!valores.email) {
                    errores.email = "Enter email"
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                    errores.email = "Enter a valid email"
                }
                if (!valores.password) {
                    errores.password = "Enter Password"
                } else if (/^.{1,5}$/.test(valores.password)) {
                    errores.password = "Enter a minimum of 6 characters"
                }
                if (!valores.password2) {
                    errores.password2 = "Confirm the password"
                } else if (valores.password !== valores.password2) {
                    errores.password2 = "Passwords do not match";
                }
                return errores;
            }}
        >
            {({ errors }) => (
                <div className={style.ContainerForm}>
                    <Form className={style.Container}>
                        <h1 className={style.Container_Title}>SignUp</h1>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage name='name' component={() => (<div className={style.Container__Div_Error}><p>{errors.name}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name='email' component={() => (<div className={style.Container__Div_Error}><p>{errors.email}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                            />
                            <ErrorMessage name='password' component={() => (<div className={style.Container__Div_Error}><p>{errors.password}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="password"
                                id="password2"
                                name="password2"
                                placeholder=" Confirm Password"
                            />
                            <ErrorMessage name='password2' component={() => (<div className={style.Container__Div_Error}><p>{errors.password2}</p></div>)} />
                        </div>
                        <button type='submit' className={style.Container__Button}>SignUp</button>
                        {confirm.visible ? <div className={`${confirm.error ? style.Container__Div_NotSucess : style.Container__Div_Sucess}`}><p>{confirm.message}</p></div> : null}
                        <p className={style.Container__Register}>You already have an account? <Link to="/signin" className={style.Container__Register_Link}>Sign In</Link></p>
                        <div className={style.Container__Google}>
                            <GoogleLoginButton onClick={() => handleSubmitGoogle()} />
                        </div>
                        <div className='facebook'>
                            <FacebookLoginButton
                                onClick={signInWithFacebook}
                               
                               />
                        </div>
                        <div className='github'>
                            <GithubLoginButton
                                onClick={signInWithGithub}
                                callback={responseGithub} />
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
