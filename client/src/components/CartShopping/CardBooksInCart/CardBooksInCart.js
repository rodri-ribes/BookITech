import React from 'react'
import style from './CardBooksInCart.module.css'
import { ImCross } from 'react-icons/im'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { deleteCart } from '../../../redux/features/data/dataSlice';

export default function CardBooksInCart({ id, name, img, subtitle, price, state, setContador, sumar, restar }) {

    let dispatch = useDispatch();

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
                    <GrAddCircle onClick={() => sumar(name)} />
                    <p>{state[name]}</p>
                    <GrSubtractCircle onClick={() => restar(name)} />
                </div>
            </div>
            <div className={style.Container__Cross}>
                <ImCross onClick={() => dispatch(deleteCart(id))} />
            </div>
        </div>
    )
}
