import React, { useEffect, useState } from 'react'
import { Container, ContainerCash, ContainerEmptyCart, ContainerPanel } from './Cart.elements';
import { BsCart4 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import CardBooksInCart from './CardBooksInCart/CardBooksInCart';
import calcularCarrito from './functions/calcularCarrito';
import { FaCartArrowDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import filtrarBooksUser from './functions/filtrarBooksUser';

export default function CartShopping() {

    let user = useSelector(state => state.data.user)
    let books = useSelector(state => state.data.Cart)
    let booksTotal = useSelector(state => state.data.books)

    const [cartUser, setcartUser] = useState([])
    const [cartFiltrado, setCartFiltrado] = useState([])


    const [click, setClick] = useState(false);

    const changeClick = async () => {
        let idUser;
        if (window.localStorage.getItem("user")) {
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            idUser = auxUser.id

            let res = axios.get("http://localhost:3001/cart/" + idUser).then(c => {
                setCartFiltrado(filtrarBooksUser(booksTotal, c.data[0].cart))
            })
        }

        setClick(!click);
    }

    /**----------- Manejo de sumar elementos -------------------------- */

    //este state tiene la cantidades de cada libro, solo habria q hacer una relacion
    //con el array de los libros, se podria crear un array nuevo con cada objeto con los atributos name del libro, precio y la cantidad
    //si no sabes como hacerlo hablame, att rodrigo

    const [contador, setContador] = useState({})


    useEffect(() => {
        if (user || window.localStorage.getItem("user")) {
            cartFiltrado.forEach(e => {
                setContador(pre => ({
                    ...pre,
                    [e.title]: e.cantidad
                }))
            });
        } else {
            books.forEach(e => {
                setContador(pre => ({
                    ...pre,
                    [e.title]: 1
                }))
            });
        }
    }, [books, cartFiltrado])

    let sumar = async (valor, idBook) => {
        if (user || window.localStorage.getItem("user")) {

            let cantBook = contador[valor] + 1
            setContador(pre => ({
                ...pre,
                [valor]: cantBook
            }))
            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.id
            axios.post("http://localhost:3001/cart/add", {
                idUser, cantBook, idBook
            })

        } else {
            let cant = contador[valor] + 1
            setContador(pre => ({
                ...pre,
                [valor]: cant
            }))
        }
    }

    let restar = async (valor, idBook) => {
        if (user || window.localStorage.getItem("user")) {

            let cantBook = contador[valor] - 1
            if ((contador[valor] > 1)) {
                setContador(pre => ({
                    ...pre,
                    [valor]: cantBook
                }))
            }

            let auxUser = JSON.parse(window.localStorage.getItem("user"))
            let idUser = auxUser.id
            axios.put("http://localhost:3001/cart/deleteone", {
                idUser, idBook
            })

        } else if (contador[valor] > 1) {
            let cont = contador[valor] - 1
            setContador(pre => ({
                ...pre,
                [valor]: cont
            }))
        }
    }
    let total;
    let cantidad;

    if (user || window.localStorage.getItem("user")) {
        total = calcularCarrito(contador, cartFiltrado)
        cantidad = cartFiltrado.length;
    } else {
        total = calcularCarrito(contador, books)
        cantidad = books.length;
    }

    total = total.toFixed(2)


    //----------------- logica de procesar pago ----------------------------

    let navigate = useNavigate()


    const submitPay = () => {

        if (user || window.localStorage.getItem("user")) {
            //aca iria la logica del proceso del pago

        } else {
            let aux = window.confirm("You need an account to continue with the purchase")
            if (aux) {
                navigate("/signup")
            }
        }
    }


    return (
        <>
            <Container>
                <div>
                    <BsCart4 onClick={() => changeClick()} />
                    <p>{cantidad}</p>
                </div>
            </Container>
            <ContainerPanel click={click}>
                {user || window.localStorage.getItem("user") ?
                    cartFiltrado.length > 0 ?
                        <>
                            {cartFiltrado && cartFiltrado.map(l => {
                                return (
                                    <CardBooksInCart
                                        name={l.title}
                                        subtitle={l.subtitle}
                                        img={l.image}
                                        id={l.isbn13}
                                        price={l.price}
                                        state={contador}
                                        setContador={setContador}
                                        sumar={sumar}
                                        restar={restar}
                                        setStateUser={setCartFiltrado}
                                        stateUser={cartFiltrado}
                                        key={l.isbn13}
                                    />
                                )
                            })}
                            <ContainerCash>
                                <button onClick={() => submitPay()}>TOTAL TO PAY $ {total}</button>
                            </ContainerCash>
                        </>
                        :
                        <ContainerEmptyCart>
                            <FaCartArrowDown />
                            <h3>Fill the cart with the best books</h3>
                        </ContainerEmptyCart>
                    :
                    books.length > 0 ?
                        <>
                            {books && books.map(l => {
                                return (
                                    <CardBooksInCart
                                        name={l.title}
                                        subtitle={l.subtitle}
                                        img={l.image}
                                        id={l.isbn13}
                                        price={l.price}
                                        state={contador}
                                        setContador={setContador}
                                        sumar={sumar}
                                        restar={restar}
                                        key={l.isbn13}
                                    />
                                )
                            })}
                            <ContainerCash>
                                <button onClick={() => submitPay()}>TOTAL TO PAY $ {total}</button>
                            </ContainerCash>
                        </>
                        :
                        <ContainerEmptyCart>
                            <FaCartArrowDown />
                            <h3>Fill the cart with the best books</h3>
                        </ContainerEmptyCart>
                }
            </ContainerPanel>
        </>
    )
}
