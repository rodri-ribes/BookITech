import React from 'react'
import style from './cardbook.module.css'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, addFavs, deleteCart, deleteFavs } from '../../../redux/features/data/dataSlice'
import axios from 'axios'
const {REACT_APP_API} = process.env

export default function CardBook({ id, name, author, img, gender, idiom, format, price }) {

    const [cart, setCart] = useState(false)
    const [heart, setHeart] = useState(false)


    let user = useSelector(state => state.data.user)

    let dispatch = useDispatch();

    const addToCart = async () => {
        if (user || window.localStorage.getItem("user")) {

            let idBook = id;
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.id
            axios.post(REACT_APP_API + '/cart/add', {
                idUser, idBook
            })
        } else {
            dispatch(AddCart(id))
        }
        setCart(true)
    }

    const RemoveToCart = async () => {

        if (user || window.localStorage.getItem("user")) {
            let idBook = id;
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.id
            await axios.put(REACT_APP_API+ '/cart/delete', {
                idUser, idBook
            })
        } else {
            dispatch(deleteCart(id))
        }
        setCart(false)
    }

    const addToFav = () => {
        //Aca iria el dispatch de la actions que agregaria el item al carrito
        setHeart(true)
        dispatch(addFavs(id))
    }
    const RemoveToFav = () => {
        //Aca iria el dispatch de la actions que quitaria el item al carrito
        setHeart(false)
        dispatch(deleteFavs(id))
    }


    return (
        <div className={style.Container}>
            <div className={style.Container__IMG}>
                <Link to={`/${id}`}>
                    <img src={img} alt={name} />
                </Link>
            </div>
            <div className={style.Container__Information}>
                <div className={style.Container__Information__Heart}>
                    {heart ?
                        <AiFillHeart onClick={() => RemoveToFav()} />
                        :
                        <AiOutlineHeart onClick={() => addToFav()} />
                    }
                </div>
                <Link className={style.Container__Information_title} to={`/${id}`}>{name}</Link>
                <div className={style.Container__Information__ContainerAuthorAndPrice}>
                    <p className={style.Container__Information__ContainerAuthorAndPrice_author}>{author}</p>
                    <h3 className={style.Container__Information__ContainerAuthorAndPrice_price}>{price}</h3>
                </div>
                {cart ?
                    <button className={`${style.Container__Information_btn} ${style.Container__Information_btnTrue}`} onClick={() => RemoveToCart()}>Remove From Cart <RiShoppingCartLine /> </button>
                    :
                    <button className={`${style.Container__Information_btn} ${style.Container__Information_btnFalse}`} onClick={() => addToCart()}>Add To Cart <RiShoppingCartLine /> </button>
                }
            </div>
        </div>
    )
}
