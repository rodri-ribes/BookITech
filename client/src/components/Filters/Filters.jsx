import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FilterAuthor,
    FilterFormat,
    FilterGenre,
    ORdenAZ,
    PriceRange,
} from '../../redux/features/data/dataSlice';
import style from './Filters.module.css';
// usar  FilterAuthor , FilterGenre, FilterFormat , Rango de Precio
export default function Filters({ setPagina }) {
    const dispatch = useDispatch();
    const [range, setRange] = useState({
        max: '',
        min: '',
    });
    const book = useSelector((state) => state.data.prueba);
    const books = [...new Set(book.map((e) => e.genre))];
    const autor = [...new Set(book.map((e) => e.author))];
    function handleAuthor(e) {
        e.preventDefault();
        dispatch(FilterAuthor(e.target.value));
        setPagina(1);
        // setOrder(e.target.value)
    }

    function handleGenre(e) {
        e.preventDefault(e);
        dispatch(FilterGenre(e.target.value));
        setPagina(1);
        // setOrder(e.target.value)
    }

    function handleFormat(e) {
        e.preventDefault();
        dispatch(FilterFormat(e.target.value));
        setPagina(1);
        // setOrder(e.target.value)
    }

    function handleRange(e) {
        e.preventDefault();
        dispatch(PriceRange(range));
        setRange({ max: '', min: '' });
        // console.log('holaaa');
        setPagina(1);
        // setorder(e.target.value)
    }
    function handleChange(e) {
        setRange({
            ...range,
            [e.target.name]: e.target.value,
        });
    }
    function handleOrden(e) {
        e.preventDefault();
        dispatch(ORdenAZ(e.target.value));
        // setPagina(1);
    }

    return (
        <div className={style.div}>
            <div>
                <select
                    className={style.select}
                    onChange={(e) => handleOrden(e)}
                >
                    <option className={style.columna} value="all">
                        ALL
                    </option>
                    <option className={style.columna} value="A-Z">
                        A-Z
                    </option>
                    <option className={style.columna} value="Z-A">
                        Z-A
                    </option>
                </select>
            </div>
            <div>
                <select
                    className={style.select}
                    onChange={(e) => handleAuthor(e)}
                >
                    <option className={style.columna} value="all">
                        Author
                    </option>
                    {/* aca cuando esten los autores */}
                    {autor.map((e) => {
                        return (
                            <option className={style.columna} key={e} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <select
                    className={style.select}
                    onChange={(e) => handleGenre(e)}
                >
                    <option className={style.columna} value="all">
                        Genre
                    </option>
                    {/* los generos  */}
                    {books?.map((e, k) => {
                        return (
                            <option className={style.columna} key={k} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <select
                    className={style.select}
                    onChange={(e) => handleFormat(e)}
                >
                    <option className={style.columna} value="all">
                        Format
                    </option>
                    <option className={style.columna} value="pdf">
                        PDF
                    </option>
                    <option className={style.columna} value="physical">
                        Physical
                    </option>
                </select>
            </div>
            <div className={style.rango}>
                <form onSubmit={(e) => handleRange(e)}>
                    <input
                        className={style.input}
                        type="number"
                        placeholder="Min"
                        name="min"
                        min={'0'}
                        value={range.min}
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        className={style.input}
                        type="number"
                        placeholder="Max"
                        name="max"
                        min="0"
                        value={range.max}
                        onChange={(e) => handleChange(e)}
                    />

                    <button className={style.button} type="submit">
                        Filter
                    </button>
                </form>
            </div>
        </div>
    );
}
