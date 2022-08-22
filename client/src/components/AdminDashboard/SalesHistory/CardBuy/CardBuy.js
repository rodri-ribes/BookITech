import React from 'react'
import style from './CardBuy.module.css'

export default function CardBuy({ email, iduser, buy }) {

    let total = 0;

    buy && buy.forEach(e => {
        total += e.cantidad * e.price.slice(1)
    });

    return (
        <div className={style.Container}>
            <div className={style.Container__info}>
                <h3>{email}</h3>
                <p>ID USER: {iduser}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID Book</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {buy && buy.map(c => {
                        return (
                            <tr>
                                <td>{c.isbn13}</td>
                                <td>{c.date}</td>
                                <td>{c.cantidad}</td>
                                <td>$ {(c.cantidad * c.price.slice(1)).toFixed(2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p className={style.Container_price}>Total: $ {total.toFixed(2)}</p>
        </div>
    )
}
