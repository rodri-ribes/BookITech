import React from "react";
import styles from './Card404.module.css'
import { useNavigate } from "react-router-dom";
import Payment from './Payment/Payment.js'

import successImg from './img/success.png'
import deniedImg from './img/denied.png'


export function Card404() {

    let mostrar;

    let navigate = useNavigate()

    if (window.location.pathname.slice(0, 8) === "/success") {
        mostrar = "success"
    } else if (window.location.pathname.slice(0, 8) === "/failure") {
        mostrar = "failure"
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