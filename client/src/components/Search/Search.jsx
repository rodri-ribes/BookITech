import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../redux/features/data/dataSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import style from './Search.module.css';
export default function Search() {
    const [display, setDisplay] = useState(false);
    const [option, setOption] = useState([]);
    const [name, setName] = useState('');
    const books = useSelector((state) => state.data.allBooks);

    const dispatch = useDispatch();
    useEffect(() => {
        let titulo = books.map((e) => e.title);
        let autor = books.map((e) => e.authors);
        let obj = titulo.concat(autor);
        setOption(obj);
    }, [books]);
    function handleChange(e) {
        if (name.length >= 2) {
            setName(e.target.value);
            setDisplay(true);
            // setOption(books.map((e) => e.title));
        }
        // if (!name) {
        setName(e.target.value);
        if (name.length < 1) {
            setDisplay(false);
            // setOption([]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name) {
            alert('failed search');
            setName('');
            setDisplay(false);
            // setOption([]);
        } else {
            dispatch(getSearch(name));
            setDisplay(false);
            setName('');
        }
    }
    function setClick(val) {
        setName(val);
        setDisplay(false);
    }
    //
    return (
        <div>
            <div className={style.wrapper}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className={style.input}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        placeholder="Search..."
                        value={name}
                        list="form"
                    />
                    <button type="submit" className={style.btn}>
                        <AiOutlineSearch />
                    </button>
                </form>
            </div>
            <datalist className={style.dentro} id="form">
                {display &&
                    option
                        ?.filter((e) =>
                            e.toLowerCase().includes(name.toLowerCase())
                        )
                        .map((e, k) => {
                            return (
                                <option
                                    key={k}
                                    onClick={() => setClick(e)}
                                    value={e}
                                >
                                    {e}
                                </option>
                            );
                        })}
            </datalist>
        </div>
    );
}
