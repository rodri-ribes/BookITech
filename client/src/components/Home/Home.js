import React, { useEffect, useState } from 'react';
import CardBook from './CardBook/CardBook';
import style from './home.module.css';
import { Paginacion } from './Pagination/Pagination';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getLibros, getFav, GetHeart } from '../../redux/features/data/dataSlice';
import Search from '../Search/Search';
import Filters from '../Filters/Filters';
import Loading from './Loading/Loading.jsx';
import { Card404 } from '../404/Card404';
import Noresults from './NoResults/Noresults';
import { Grid } from '@mui/material';
import FiltersSidebar from "../Filters/FiltersSidebar"

function Home() {
    let dispatch = useDispatch();
    let heart = useSelector(state => state.data.heart)
    let user = useSelector(state => state.data.user)
    let nameSearch = useSelector((state) => state.data.nameSearch);





    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false)
    const idUser = () => {
        if (window.localStorage.getItem("user")) {
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser?.email
            dispatch(GetHeart(idUser))
            dispatch(getFav(idUser))
        }
    }
    useEffect(() => {
        if (window.localStorage.getItem("user")) idUser()
        if (nameSearch === "") dispatch(getLibros());
    }, [dispatch]);


    let books = useSelector((state) => state.data.books);
    let loading = useSelector((state) => state.data.loading);
    let error = useSelector((state) => state.data.error);



    //logica para mostrar el search en home en modo responsive

    const [show, setShow] = useState(false);
    const [sizeGrid, setSizeGrid] = useState("")

    const drawerWidth = 240;
    const sizeG = {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
    }
    const sizeGxl = {
        width: "100%"
    }
    useEffect(() => {
        if (window.innerWidth < 600) {
            setShow(true);
        }
        if (window.innerWidth < 1740) {
            setSizeGrid(sizeG)
        }
        if (window.innerWidth > 1739) {
            setSizeGrid(sizeGxl)
        }
    }, [setSizeGrid]);

    //----------LOGICA DE FILTRADO POR SEARCH-----------



    const [filtrado, setfiltrado] = useState([])

    function searchTerm(term) {
        return function (x) {
            return x.title.toLowerCase().includes(term) || x.authors !== undefined && x.authors.toLowerCase().includes(term) || !term
        }
    }

    useEffect(() => {
        setfiltrado(books)
    }, [books])


    //logica de paginado

    const [pagina, setPagina] = useState(1);

    const porPagina = 10;


    const ceil = filtrado.length / porPagina;

    const maximo = Math.ceil(ceil)

    return (
        <div className={style.Container}>
            <FiltersSidebar setPagina={setPagina} />
            <Grid
                sx={sizeGrid}
            >
                {/* <Filters setPagina={setPagina} /> */}
                {/* <div className={style.Container__Search}>{show && <Search />}</div> */}
                <div className={style.Container__PanelCards}>
                    {error ? <Card404 /> :
                        loading ? <Loading /> :
                            (filtrado.filter(searchTerm(nameSearch)).length === 0) ? <Noresults /> :
                                filtrado && filtrado.filter(searchTerm(nameSearch))
                                    .slice(
                                        (pagina - 1) * porPagina,
                                        (pagina - 1) * porPagina + porPagina
                                    )
                                    .map((l, i) => {
                                        return (
                                            <CardBook
                                                name={l.title}
                                                heart={heart.includes(l.isbn13)}
                                                id={l.isbn13}
                                                price={l.price}
                                                img={l.image}
                                                authors={l.authors}
                                                key={i}
                                            />
                                        );
                                    })}
                </div>
                <div className={style.Container__Pagination}>
                    <Paginacion
                        pagina={pagina}
                        setPagina={setPagina}
                        maximo={maximo}
                    />
                </div>
            </Grid>
        </div>
    );
}


export default Home;
