import React from 'react'
import style from './CardComment.module.css'
export default function CardComment({ image, name, content, date }) {
    return (
        <div className={style.Container}>
            <img src={image} alt={name} />
            <div className={style.Container__input}>
                <div className={style.Container__input__NameAndDate}>
                    <h3>{name}</h3>
                    <p>{date}</p>
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}
