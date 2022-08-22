import React, { useEffect } from 'react'
import style from './cardbook.module.css'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCart, addFavs, deleteCart, deleteFavs, getCartUser,getFav,GetHeart } from '../../../redux/features/data/dataSlice'
import axios from 'axios'
const { REACT_APP_API } = process.env

export default function CardBook({ id, name, authors, img, price}) {
    
    const [cart, setCart] = useState(false)
    let user = useSelector(state => state.data.user)
    const [existUser, setexistUser] = useState(false)

    useEffect(() => {
        if ( window.localStorage.getItem("user")) {
            setexistUser(true)
        } else {
            setexistUser(false)
        }
    }, [user, window.localStorage.getItem("user")])

    let dispatch = useDispatch();

    const addToCart = async () => {
        if (user || window.localStorage.getItem("user")) {

            let idBook = id;
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.id
            await axios.post(REACT_APP_API + '/cart/add', {
                idUser, idBook
            })
            dispatch(getCartUser(idUser))
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
            await axios.put(REACT_APP_API + '/cart/delete', {
                idUser, idBook
            })
        } else {
            dispatch(deleteCart(id))
        }
        setCart(false)
    }

    const addToFav = async () => {
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.email
            console.log("IDS", idUser, id)
        if(user || window.localStorage.getItem("user")){
            await axios.post(REACT_APP_API +`/favorite/?email=${idUser}`,{id})
            dispatch(getFav(idUser))
            dispatch(GetHeart(idUser))
            
        }else{
            dispatch(addFavs(id))
        }
       
    }
    const RemoveToFav = async() => {
        //Aca iria el dispatch de la actions que quitaria el favorito
        let auxUser = JSON.parse(window.localStorage.getItem("user"))
        let idUser = auxUser.email
        if(user || window.localStorage.getItem("user")){
            const res= await axios.put(REACT_APP_API +`/favorite/?email=${idUser}`,{id})
            console.log(res.data)
            dispatch(deleteFavs(id))
            dispatch(getFav(idUser))
            dispatch(GetHeart(idUser))
        }else{
            console.log("no se pudieron empujar")
        }    
    }

    //LOGICA PARA OCULTAR


    return (
        <div className={style.Container}>
            <div className={style.Container__IMG}>
                <Link to={`/book/${id}`} className={style.Container__IMG__Link}>
                    <img src={img} alt={name} className={style.Container__IMG_IMG} />
                </Link>
            </div>
            <div className={style.Container__Information}>
                <h3 className={style.Container__Information__ContainerAuthorAndPrice_price}>{price}</h3>
                    <div className={style.Container__Information__Heart}>
                        {heart ?
                            <AiFillHeart onClick={() => RemoveToFav()} />
                            :
                            <AiOutlineHeart onClick={() => addToFav()} />
                        }
                    </div>

                <Link className={style.Container__Information_title} to={`/book/${id}`}>{name?.charAt(0).toUpperCase() + name?.slice(1, 25)} (...)</Link>
                <div className={style.Container__Information__ContainerAuthorAndPrice}>
                <p className={style.Container__Information__ContainerAuthorAndPrice_author}>{authors ? authors.toUpperCase().slice(0,20) : 'has no author'}...</p>

                </div>
            </div>
            <div className={style.Container__btn}>
                {/* {cart ?
                    <button className={`${style.Container__Information_btn} ${style.Container__Information_btnTrue}`} onClick={() => RemoveToCart()}>Remove From Cart <RiShoppingCartLine /> </button>
                    : */}
                <button className={`${style.Container__Information_btn} ${style.Container__Information_btnFalse}`} onClick={() => addToCart()}>Add To Cart <RiShoppingCartLine /> </button>
                {/* } */}
            </div>
        </div>
    )
}
