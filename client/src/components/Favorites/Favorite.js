import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from "react-redux"
import {Card404} from "../404/Card404"
import fav from "./Fav.module.css"
import CardBook from "./CardBook/CardBook"
import { Paginacion } from '../Home/Pagination/Pagination'
import { GiBookmarklet } from "react-icons/gi"
import { useNavigate } from 'react-router-dom'
import {getFav} from '../../redux/features/data/dataSlice'

function Favorite() {

    let Favs = useSelector(state => state.data.Favs)
    const [Favos,setFavos]= useState([])
    const Favorites=Favs.map(l=>l.book)
    
    const dispatch = useDispatch()
    useEffect(() => {
        let auxUser = JSON.parse(window.localStorage.getItem("user"))
        let idUser = auxUser.email
        dispatch(getFav(idUser))
        setFavos(Favorites)
      },[])

    const [pagina, setPagina] = useState(1);

    const porPagina = 10;
    

   
    const ceil = Favos.length / porPagina;
    let maximo = Math.ceil(ceil)


    //si el usuario no esta logueado no pueda acceder

    // let navigate = useNavigate();
    // let user = useSelector(state => state.data.user)

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/");
    //     } else if (!window.localStorage.getItem("user")) {
    //         navigate("/");
    //     }
    // }, [])



    return (
        <div className={fav.Container} >
            <div className={fav.Favs}>
                <h1>Favorites <GiBookmarklet /></h1>
            </div>

            <div className={fav.Container__PanelCards} >
                {
                    Favos.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    ).map((l, i) => {
                        return (
                            <CardBook
                                name={l.title}
                                id={l.isbn13}
                                author={l.author}
                                gender={l.gender}
                                idiom={l.idiom}
                                format={l.format}
                                price={l.price}
                                img={l.image}
                                key={i}
                            />
                        )
                    })
                }
            </div >
            <div className={fav.Container__Pagination}>
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
            </div>
        </div >
    )
}

export default Favorite