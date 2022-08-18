import React, { useState } from 'react'
import style from './CardComment.module.css'
import { ImCross } from 'react-icons/im'
import { BiEdit } from 'react-icons/bi'
import axios from 'axios'

const { REACT_APP_API } = process.env

export default function CardComment({ iduser, image, name, content, date, idBook, idComment, setCambios }) {

    let user;

    if (window.localStorage.getItem("user") === null) {
        user = [0, "user.png", "user"]
    } else {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        user = [usuario.id, usuario.img, usuario.name]
    }

    const [showEdit, setshowEdit] = useState(false)
    const [editComment, setEditComment] = useState("")

    const handleDelete = async () => {
        const aux = window.confirm("Are you sure you want to delete the comment?")
        if (aux) {
            await axios.delete(REACT_APP_API + `/comments/delete/${idBook}/${idComment}`);
            let id = idBook;
            let data = await axios.get(REACT_APP_API + `/books/id/${id}`);
            setCambios(data.data)
        }
    }

    let datee = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const handleEdit = async () => {
        setshowEdit(false)
        let content = editComment;
        let fecha = datee.toLocaleDateString('en-US', options);
        let idcomment = idComment
        await axios.put(REACT_APP_API + `/comments/edit/${idBook}/${idcomment}`, {
            content, fecha
        });

        let id = idBook;
        let data = await axios.get(REACT_APP_API + `/books/id/${id}`);
        setCambios(data.data)
    }

    return (
        <div className={style.Container}>
            <img src={image} alt={name} />
            <div className={style.Container__v2}>
                <div className={style.Container__input}>
                    <div className={style.Container__input__NameAndDate}>
                        <h3>{name}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                {showEdit ?
                    <div className={style.Container__v2__divEdit}>
                        <textarea type="text" onChange={(e) => setEditComment(e.target.value)} />
                        <button onClick={() => handleEdit()}>Edit Comment</button>
                    </div>
                    :
                    <p className={style.Container__input_content}>{content}</p>
                }
            </div>
            {user[0] === iduser ?
                <>
                    {showEdit !== true && <BiEdit className={style.Container__Cross} onClick={() => setshowEdit(true)} />}
                    <ImCross className={style.Container__Cross} onClick={() => handleDelete()} />
                </>
                : null
            }
        </div>
    )
}