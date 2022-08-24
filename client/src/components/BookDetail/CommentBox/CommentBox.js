import React, { useEffect, useState} from 'react'
import style from './CommentBox.module.css'
import axios from "axios"
const { REACT_APP_API } = process.env;

export default function CommentBox({ setComment, handleComment, setDetails, comment, error }) {

    let user;
    let [User, setUser]=useState()
    

    if (window.localStorage.getItem("user") === null) {
        user = [0, "user.png", "user"]
    } else {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        user = [usuario.id, usuario.img, usuario.name]
    }
    
    const getdata = async () => {
        let userId = JSON.parse(window.localStorage.getItem("user"));
        try {
            let data = await axios.get(REACT_APP_API + `/user/${userId.id}`);
            setUser(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getdata()
    },[])

    return (
        <div className={style.Container}>
            <img src={user[1]} alt={user[2]} />
            <div className={style.Container__input}>
                <h3>{user[2]}</h3>
                <textarea type="text" value={comment} onChange={e => setComment(e.target.value)} />
                {error.error === "comment" ? <p className={style.error}>{error.content}</p> : null}
                <button onClick={() => handleComment(setDetails)}>Comment</button>
            </div>
        </div>
    )
}