import React from 'react'
import style from './cardbook.module.css'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useState } from 'react'

export default function CardBook({ name, author, img, gender, idiom, format, price }) {

    const [cart, setCart] = useState(false)
    const [heart, setHeart] = useState(false)

    const addToCart = () => {
        //Aca iria el dispatch de la actions que agregaria el item al carrito
        setCart(true)
    }
    const RemoveToCart = () => {
        //Aca iria el dispatch de la actions que quitaria el item al carrito
        setCart(false)
    }

    const addToFav = () => {
        //Aca iria el dispatch de la actions que agregaria el item al carrito
        setHeart(true)
    }
    const RemoveToFav = () => {
        //Aca iria el dispatch de la actions que quitaria el item al carrito
        setHeart(false)
    }


    return (
        <div className={style.Container}>
            <div className={style.Container__IMG}>
                {/* <p className={style.Container__IMG_gender}>{gender}</p>
                <p className={style.Container__IMG_format}>{format}</p> */}
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
                <h4 className={style.Container__Information_title}>{name}</h4>
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
