import React from "react";
import styles from './Card404.module.css'
import { Link } from "react-router-dom";

export function Card404(){

    return <div  id={styles.fourOFour}>
                <h1>404</h1>
                <h2>Not Found</h2>
                <p>The book you're looking for doesn't exist</p>
                <p>If you ever write it, please let us know</p>
                <Link to='/'><button>Back Home</button></Link>
            </div>
    
}