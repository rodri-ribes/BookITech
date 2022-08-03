import React, { useEffect, useState } from 'react'
import CardBook from './CardBook/CardBook'
import style from './home.module.css'
import { Paginacion } from './Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { getLibros } from '../../redux/features/data/dataSlice';

export default function Home() {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibros())
    }, [dispatch])

    let books = useSelector(state => state.data.books);

    //logica de paginado

    const [pagina, setPagina] = useState(1);

    const porPagina = 10;

    const maximo = books.length / porPagina;

    return (
        <div className={style.Container} >
            <div className={style.Container__PanelCards} >
                {
                    books.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    ).map((l, i) => {
                        return (
                            <CardBook
                                name={l.title}
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
            <div className={style.Container__Pagination}>
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
            </div>
        </div >
    )
}