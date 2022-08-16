import React from 'react'
import style from './CommentBox.module.css'

export default function CommentBox({ setComment, handleComment, setDetails, comment }) {

    let user;

    if (window.localStorage.getItem("user") === null) {
        user = [0, "user.png", "user"]
    } else {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        user = [usuario.id, usuario.img, usuario.name]
    }

    return (
        <div className={style.Container}>
            <img src={user[1]} alt={user[2]} />
            <div className={style.Container__input}>
                <h3>{user[2]}</h3>
                <textarea type="text" value={comment} onChange={e => setComment(e.target.value)} />
                <button onClick={() => handleComment(setDetails)}>Comment</button>
            </div>
        </div>
    )
}