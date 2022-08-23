import React, { useEffect, useState } from 'react'
import style from './saleshistory.module.css'
import axios from 'axios'
import CardBuy from './CardBuy/CardBuy'
import { Paginacion } from '../../Home/Pagination/Pagination'
const { REACT_APP_API } = process.env


export function SalesHistory() {

    const [ventas, setVentas] = useState(false)

    async function main() {
        let admin = "admin"
        try {
            let data = await axios.get(REACT_APP_API + `/user/admin/${admin}`);
            setVentas(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        main()
    }, [])

    let filtrado = [];
    let total = 0;

    if (ventas) {
        filtrado = ventas.filter(e => e.buy.length > 0);
        filtrado.forEach(e => {
            e.buy.forEach(f => {
                total += (f.cantidad * f.price.slice(1))
            })
        });
    }

    const [pagina, setPagina] = useState(1);

    const porPagina = 3;

    const ceil = filtrado.length / porPagina;
    const maximo = Math.ceil(ceil)

    return (
        <div className={style.Container}>
            <div className={style.Container__list}>
                {filtrado.length > 0 && filtrado.slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                ).map(c => {
                    if (c.buy.length > 0) {
                        return (
                            <CardBuy
                                email={c.email}
                                iduser={c._id}
                                buy={c.buy}
                            />
                        )
                    }
                })}

                <div className={style.Container__list__total}>
                    <h3>TOTAL: </h3>
                    <h3>$ {total.toFixed(2)}</h3>
                </div>
                <Paginacion
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                />

            </div>
        </div>
    )
}