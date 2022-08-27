import React from 'react'
import style from './payment.module.css'

export default function Payment({ title, image, info }) {
    return (
        <div className={style.container}>
            <h1>{info}</h1>
            <img src={image} alt={title} />
        </div>
    )
}
