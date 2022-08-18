import React from 'react'
import style from './cardbook.module.css'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { AddCart, addFavs, deleteCart, deleteFavs } from '../../../redux/features/data/dataSlice'
const { REACT_APP_API } = process.env

export default function CardBook({ id, name, author, img, price }) {

    const [cart, setCart] = useState(false)
    const [heart, setHeart] = useState(true)
    let user = useSelector(state => state.data.user)

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
    const RemoveToFav = async() => {
          //Aca iria el dispatch de la actions que quitaria el item al carrito
          let auxUser = JSON.parse(window.localStorage.getItem("user"))
          let idUser = auxUser.email
          let t=!heart
          if(user || window.localStorage.getItem("user")){
            console.log("IDS", idUser, id)
                await axios.put(REACT_APP_API + `/books/id/${id}`,{t})
             const res= await axios.put(REACT_APP_API +`/favorite/?email=${idUser}`,{id})
             console.log(res.data)
             dispatch(deleteFavs(id))
          }else{
              console.log("no se pudieron empujar")
          }
          setHeart(false)
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
