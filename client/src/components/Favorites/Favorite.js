import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch, connect} from "react-redux"
import {Card404} from "../404/Card404"
import fav from "./Fav.module.css"
import WithoutFav from './withoutFav/WithoutFav'
//import CardBook from "./CardBook/CardBook"
import CardBook from '../Home/CardBook/CardBook';
import { Paginacion } from '../Home/Pagination/Pagination'
import { GiBookmarklet } from "react-icons/gi"
import {getFav} from '../../redux/features/data/dataSlice'
import { Typography } from '@mui/material';

function Favorite() {
    //props
    let Favos=useSelector(state => state.data.Favo)
    let heart= useSelector(state => state.data.heart)
    let user = useSelector(state => state.data.user)
    const Favorites=Favos?.map(l=>l.book)  
    const [pagina, setPagina] = useState(1)
    const porPagina = 10;
    const ceil = Favorites.length / porPagina;
    let maximo = Math.ceil(ceil)

    return (
        <div className={fav.Container} >
            <div className={fav.Favs}>
                <Typography sx={{fontSize:"4rem", fontFamily: "monospace"}}>Favorites <GiBookmarklet /></Typography>
            </div>

            <div className={fav.Container__PanelCards} >
                {Favorites.length === 0 ? <WithoutFav/> :
                    Favorites.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    ).map((l, i) => {
                        return (
                            <CardBook
                                name={l.title}
                                heart={heart.includes(l.isbn13)}
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

// function mapStateToProps(state){
//     return{
//       Favos: state.data.Favo,
//       heart: state.data.heart
//     }
//   }

export default  Favorite ;
//connect(mapStateToProps, null)