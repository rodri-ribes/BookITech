import React from "react";
import styles from './Card404.module.css'
import { useNavigate } from "react-router-dom";
import Payment from './Payment/Payment.js'

import successImg from './img/success.png'
import deniedImg from './img/denied.png'
import axios from "axios";
const { REACT_APP_API } = process.env

export function Card404() {

    let mostrar;

    let navigate = useNavigate()

    const finishCompra = async () => {
        let items = JSON.parse(window.localStorage.getItem("buy"))
        let user = JSON.parse(window.localStorage.getItem("user"))
        try {
            await axios.post(REACT_APP_API + `/user/${user.email}`, {
                items
            })
            window.localStorage.removeItem("buy")

        } catch (error) {
            console.log(error)
        }
    }

    if (window.location.pathname.slice(0, 8) === "/success") {
        mostrar = "success"
        finishCompra()
    } else if (window.location.pathname.slice(0, 8) === "/failure") {
        mostrar = "failure"
        window.localStorage.removeItem("buy")

    } else {
        mostrar = "404"
    }



    setTimeout(() => {
        navigate('/')
    }, 4000);

    return (
        <div className={styles.container}>
            {
                mostrar === "success" &&
                <Payment title="success" image={successImg}
                    info="Payment Credited Successfully"
                />
            }
            {
                mostrar === "failure" &&
                <Payment title="failure" image={deniedImg}
                    info="Payment Was Not Completed"
                />
            }
            {
                mostrar === "404" &&
                <div className={styles.fourOFour}></div>
            }
        </div>
    )

}