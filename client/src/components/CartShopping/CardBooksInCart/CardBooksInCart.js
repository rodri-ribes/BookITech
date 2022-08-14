import React from 'react'
import style from './CardBooksInCart.module.css'
import { ImCross } from 'react-icons/im'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { IoIosAddCircle } from 'react-icons/io'
import { GrSubtract } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCart } from '../../../redux/features/data/dataSlice';
import axios from 'axios'
const { REACT_APP_API } = process.env

export default function CardBooksInCart({ id, name, img, subtitle, price, state, setContador, sumar, restar, stateUser, setStateUser }) {

    let dispatch = useDispatch();

    let user = useSelector(state => state.data.user)

    const deleteBook = async (id) => {
        if (user || window.localStorage.getItem("user")) {

            let idUser;
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            idUser = auxUser.id
            let idBook = id

            await axios.put(REACT_APP_API + '/cart/delete', {
                idUser, idBook
            })

            setStateUser(stateUser.filter(c => c.isbn13 !== id))
        }
        dispatch(DeleteCart(id))
    }


    return (
        <div className={style.Container}>
            <div className={style.Container__IMG}>
                <img src={img} alt={name} />
            </div>
            <div className={style.Container__Datos}>
                <p className={style.Container__Datos_Name}>{name}</p>
                <p className={style.Container__Datos_Subtitle}>{subtitle}</p>
                <p className={style.Container__Datos_Price}>{price}</p>
                <div className={style.Container__Datos_btns} >
                    <GrAddCircle onClick={() => sumar(name, id)} className={style.Container__Datos_btns__btn} />
                    <p>{state[name]}</p>
                    <GrSubtractCircle onClick={() => restar(name, id)} className={style.Container__Datos_btns__btn} />
                </div>
            </div>
            <div className={style.Container__Cross}>
                <ImCross onClick={() => deleteBook(id)} />
            </div>
        </div>
    )
}
