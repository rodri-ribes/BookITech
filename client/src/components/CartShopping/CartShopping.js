import React, { useEffect, useState } from 'react'
import { Container, ContainerCash, ContainerEmptyCart, ContainerPanel } from './Cart.elements';
import { BsCart4 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import CardBooksInCart from './CardBooksInCart/CardBooksInCart';
import calcularCarrito from './functions/calcularCarrito';
import { FaCartArrowDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function CartShopping() {

    //para hacer aparecer el div del carrito
    const [click, setClick] = useState(false);
    const changeClick = () => {
        setClick(!click);
    }
    //manejo del state del carrito
    let books = useSelector(state => state.data.Cart)
    let cantidad = books.length;


    /**Manejo de sumar elementos */

    const [contador, setContador] = useState({})

    useEffect(() => {
        books.forEach(e => {
            setContador(pre => ({
                ...pre,
                [e.title]: 1
            }))
        });
    }, [books])

    let sumar = (valor) => {
        let cont = contador[valor] + 1
        setContador(pre => ({
            ...pre,
            [valor]: cont
        }))
    }

    let restar = (valor) => {
        if (contador[valor] > 1) {
            let cont = contador[valor] - 1
            setContador(pre => ({
                ...pre,
                [valor]: cont
            }))
        }
    }
    let total = calcularCarrito(contador, books)
    total = total.toFixed(2)

    //logica de procesar pago

    let navigate = useNavigate()

    const submitPay = () => {
        if (window.localStorage.getItem("user")) {
            //aca iria el dispatch y el navigate
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
                {books.length > 0 ?
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
