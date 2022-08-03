import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getSearch,
    getSearchAuthor,
} from '../../redux/features/data/dataSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import style from './Search.module.css';

export default function Search() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name) {
            alert('failed search');
        } else {
            dispatch(getSearch(name));
            dispatch(getSearchAuthor(name));
            setName('');
        }
    }
    //
    return (
        <div className={style.wrapper}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={style.input}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Buscar..."
                    value={name}
                />
                <button type="submit" className={style.btn}>
                    <AiOutlineSearch />
                </button>
            </form>
        </div>
    );
}
