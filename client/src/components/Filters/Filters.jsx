import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    FilTheme,
    ORdenAZ,
    PriceRange,
    ChangeRange,
} from '../../redux/features/data/dataSlice';
import style from './Filters.module.css';
// usar  FilterAuthor , FilterGenre, FilterFormat , Rango de Precio
export default function Filters({ setPagina, setOrden }) {
    const dispatch = useDispatch();
    const [range, setRange] = useState({
        max: '',
        min: '',
    });
    const [errors, setErrors] = useState({});

    const tematica = [
        'mongo',
        'mongodb',
        'mongoose',
        'java',
        'javascript',
        ' html',
        'css',
        'python',
        'php',
        'react',
        'redux',
        'perl',
        'swift',
        'rust',
        'sql',
        'ruby',
        'ajax',
        'typescript',
        'express.js',
    ];

    function handleChangeRange(e) {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(ChangeRange(e.target.value));
        setPagina(1);
        setOrden(e.target.value);
    }

    function validate() {
        let err = {};
        if (!range.min) {
            err.min = 'Min Required';
        }
        if (!range.max) {
            err.max = 'Máx Required';
        }
        return err;
    }
    function handleTheme(e) {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(FilTheme(e.target.value));
        setPagina(1);
        setOrden(e.target.value);
    }

    function handleRange(e) {
        e.preventDefault();
        if (!range.max || !range.min) {
            alert('Máx and Min Required');
        } else {
            dispatch(PriceRange(range));
            setRange({ max: '', min: '' });
            // console.log('holaaa');
            setPagina(1);
            setOrden(e.target.value);
        }
    }
    function handleChange(e) {
        setRange({
            ...range,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...range,
                [e.target.name]: e.target.value,
            })
        );
        setOrden(e.target.value);
    }
    function handleOrden(e) {
        e.preventDefault();
        dispatch(ORdenAZ(e.target.value));
        setPagina(1);
    }

    return (
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th className={style.label}>Sort A-Z</th>
                            <th className={style.label}>Subject</th>
                            <th className={style.label}>
                                Price
                                {(errors.max || errors.min) && (
                                    <p className={style.error}>
                                        {errors.max || errors.min}
                                    </p>
                                )}
                            </th>
                            <th className={style.label}>Sort $</th>
                        </tr>
                        <tr>
                            <th className={style.th}>
                                <select
                                    className={style.AZ}
                                    onChange={(e) => handleOrden(e)}
                                >
                                    <option value="all">Sort</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </th>
                            <th className={style.th}>
                                <select
                                    className={style.select}
                                    onChange={(e) => handleTheme(e)}
                                >
                                    <option value="all">Subject</option>
                                    {tematica?.map((e, k) => {
                                        return (
                                            <option key={k} value={e}>
                                                {e.toUpperCase()}
                                            </option>
                                        );
                                    })}
                                </select>
                            </th>
                            <th className={style.th}>
                                <form
                                    className={style.form}
                                    onSubmit={(e) => handleRange(e)}
                                >
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

                                    <button
                                        className={style.input2}
                                        type="submit"
                                    >
                                        Filter
                                    </button>
                                </form>
                            </th>
                            <th className={style.th}>
                                <select
                                    className={style.select}
                                    onChange={(e) => handleChangeRange(e)}
                                >
                                    <option value="all">Min & Máx</option>
                                    <option value="MintoMax">Min To Máx</option>
                                    <option value="MaxtoMin">Máx To Min</option>
                                </select>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
