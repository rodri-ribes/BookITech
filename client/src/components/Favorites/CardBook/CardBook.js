import React from 'react'
import style from './cardbook.module.css'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddCart, addFavs, deleteCart, deleteFavs } from '../../../redux/features/data/dataSlice'

export default function CardBook({ id, name, author, img, gender, idiom, format, price }) {

    const [cart, setCart] = useState(false)
    const [heart, setHeart] = useState(true)

    let dispatch = useDispatch();

    const addToCart = () => {
        //Aca iria el dispatch de la actions que agregaria el item al carrito
        setCart(true)
        dispatch(AddCart(id))
    }
    const RemoveToCart = () => {
        //Aca iria el dispatch de la actions que quitaria el item al carrito
        setCart(false)
        dispatch(deleteCart(id))
    }

    const addToFav = () => {
        setHeart(true)
        dispatch(addFavs(id))
    }
    const RemoveToFav = () => {
        setHeart(true)
        dispatch(deleteFavs(id))
    }


    return (
        <div className={style.Container}>
            <div className={style.Container__IMG}>
                <img src={img} alt={name} />
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
