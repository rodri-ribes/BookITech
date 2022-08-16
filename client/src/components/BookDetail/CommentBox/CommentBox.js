import React from 'react'
import style from './CommentBox.module.css'

export default function CommentBox({ setComment, handleComment, setDetails }) {

    let usuario = JSON.parse(window.localStorage.getItem("user"))

    return (
        <div className={style.Container}>
            <img src={usuario.img} alt={usuario.name} />
            <div className={style.Container__input}>
                <h3>{usuario.name}</h3>
                <textarea type="text" onChange={e => setComment(e.target.value)} />
                <button onClick={() => handleComment(setDetails)}>Comment</button>
            </div>
        </div>
    )
}