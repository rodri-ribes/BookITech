import React, { useEffect, useState } from 'react'
import style from './SignIn.module.css'

import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getLibros, getUser } from '../../redux/features/data/dataSlice';
import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../firebase/AuthContext';

export default function SignIn() {

    const [confirm, setConfirm] = useState({
        message: "",
        visible: null,
        error: null,
    })

    let navigate = useNavigate()
    let dispatch = useDispatch();

    const { googleSignIn } = UserAuth();

    let user = useSelector(state => state.data.user)

    const handleSubmitGoogle = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            dispatch(getLibros())
        }, 3000);
    }

    //si el usuario no esta logueado no pueda acceder

    useEffect(() => {
        if (user || window.localStorage.getItem("user")) {
            navigate("/");
        }
    }, [])

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={async (valores, { resetForm }) => {

                let { email, password } = valores;

                try {
                    let resp = await axios.post(`http://localhost:3001/signin`, {
                        password, email
                    })
                    window.localStorage.setItem("user", JSON.stringify(resp.data))
                    dispatch(getUser(resp.data))
                    setConfirm({ message: "You logged in successfully", visible: true, error: false })

                    setTimeout(() => {
                        setConfirm({ message: "", visible: null, error: null })
                        dispatch(getLibros())
                        navigate("/")
                    }, 2000);

                    resetForm();

                } catch (error) {

                    setConfirm({ message: error.response.data, visible: true, error: true })
                    setTimeout(() => {
                        setConfirm({ message: "", visible: null, error: null })
                    }, 2000);

                }
            }}
            validate={(valores) => {
                let errores = {};

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
                return errores;
            }}
        >
            {({ errors }) => (
                <div className={style.ContainerForm}>
                    <Form className={style.Container}>
                        <h1 className={style.Container_Title}>SignIn</h1>
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
                        <button type='submit' className={style.Container__Button}>SignIn</button>
                        {confirm.visible ? <div className={`${confirm.error ? style.Container__Div_NotSucess : style.Container__Div_Sucess}`}><p>{confirm.message}</p></div> : null}
                        <p className={style.Container__Register}>You do not have an account? <Link to="/signup" className={style.Container__Register_Link}>Sign up</Link></p>
                        <div className={style.Container__Google}>
                            <GoogleButton onClick={() => handleSubmitGoogle()} />
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
