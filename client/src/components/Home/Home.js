import React, { useState } from 'react'
import CardBook from './CardBook/CardBook'
import style from './home.module.css'
import { Paginacion } from './Pagination/Pagination';


export default function Home() {

    //array de pruebaa

    let books = [
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PHYSICAL", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
        { name: "Title ultimo", img: "img1", author: "Author", gender: "Terror", idiom: "español", format: "PDF", price: 500 },
    ]

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
                                name={l.name}
                                author={l.author}
                                gender={l.gender}
                                idiom={l.idiom}
                                format={l.format}
                                price={l.price}
                                img={l.img}
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
