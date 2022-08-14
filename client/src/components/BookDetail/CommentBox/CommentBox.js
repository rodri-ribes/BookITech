import React from 'react'
import style from './CommentBox.module.css'

export default function CommentBox({ image, name, setComment, handleComment }) {
    return (
        <div className={style.Container}>
            <img src={image} alt={name} />
            <div className={style.Container__input}>
                <h3>{name}</h3>
                <textarea type="text" onChange={e => setComment(e.target.value)} />
                <button onClick={() => handleComment()}>Comment</button>
            </div>
        </div>
    )
}