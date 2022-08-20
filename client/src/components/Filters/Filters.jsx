import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    FilTheme,
    ORdenAZ,
    PriceRange,
    ChangeRange,
} from '../../redux/features/data/dataSlice';
import style from './Filters.module.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/system';
import { Grid } from '@mui/material';

// usar  FilterAuthor , FilterGenre, FilterFormat , Rango de Precio
export default function Filters({ setPagina}) {
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
        'html',
        'css',
        'python',
        'php',
        'react',
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
        // setOrden(e.target.value);
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
        // setOrden(e.target.value);
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
            // setOrden(e.target.value);
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
        // setOrden(e.target.value);
    }
    function handleOrden(e) {
        e.preventDefault();
        dispatch(ORdenAZ(e.target.value));
        setPagina(1);
    }

    return (
        <div>
        <Container>
            {/* <div>
                <table>
                    <tbody> */}
                        {/* <tr> */}
                            {/* <th >Subject</th> */}
                            <th >
                                {/* Price */}
                                {(errors.max || errors.min) && (
                                    <p className={style.error}>
                                        {errors.max || errors.min}
                                    </p>
                                )}
                            </th>
                            {/* <th>Sort $</th> */}
                        {/* </tr> */}
                        <Grid display="flex" width="100%">
                            {/* <th > */}
                            <Box sx={{
                                        '& > :not(style)': { m: 1, width: '17ch' },
                                    }}>
                                <FormControl fullWidth>
                                    <InputLabel id="sort">Sort</InputLabel>
                                    <Select
                                        sx={{backgroundColor: "#DADADA"}}
                                        labelId="sort"
                                        id="sort"
                                        label="sort"
                                        onChange={(e) => handleOrden(e)}
                                    >
                                        <MenuItem disabled value="all">Sort</MenuItem>
                                        <MenuItem value="A-Z">A-Z</MenuItem>
                                        <MenuItem value="Z-A">Z-A</MenuItem>
                                        {/* <select
                                            
                                            onChange={(e) => handleOrden(e)}
                                        > */}
                                            {/* <option value="all">Sort</option>
                                            <option value="A-Z">A-Z</option>
                                            <option value="Z-A">Z-A</option> */}
                                        {/* </select> */}
                                        </Select>
                                </FormControl>
                            </Box>

                            {/* </th> */}
                            {/* <th > */}
                            <Box sx={{
                                        '& > :not(style)': { m: 1, width: '17ch' },
                                    }}>
                                <FormControl fullWidth>
                                    <InputLabel id="sort">Subject</InputLabel>
                                    <Select
                                        sx={{backgroundColor: "#DADADA"}}
                                        labelId="subject"
                                        id="subject"
                                        label="subject"
                                        onChange={(e) => handleTheme(e)}
                                    >
                                        <MenuItem disabled value="all">Subject</MenuItem>
                                        {tematica?.map((e, k) => {
                                        return (
                                            <MenuItem key={k} value={e}>
                                                {e.toUpperCase()}
                                            </MenuItem>
                                        );
                                    })}
                                    </Select>
                                </FormControl>
                            </Box>
                                        
                                {/* <select
                                    className={style.select}
                                    onChange={(e) => handleTheme(e)}
                                > */}
                                    {/* <option value="all">Subject</option> */}
                                    {/* {tematica?.map((e, k) => {
                                        return (
                                            <option key={k} value={e}>
                                                {e.toUpperCase()}
                                            </option>
                                        );
                                    })} */}
                                {/* </select> */}
                            {/* </th> */}
                            <Box sx={{
                                        '& > :not(style)': { m: 1, width: '17ch' },
                                    }}>
                                <FormControl fullWidth>
                                    <InputLabel id="minmax">Sort by price</InputLabel>
                                    <Select
                                        sx={{backgroundColor: "#DADADA"}}
                                        labelId="minmax"
                                        id="minmax"
                                        label="Sort by price"
                                        onChange={(e) => handleChangeRange(e)}
                                    >
                                        <MenuItem disabled value="all">Min & Max</MenuItem>
                                        <MenuItem value="MintoMax">Min To Max</MenuItem>
                                        <MenuItem value="MaxtoMin">Max To Min</MenuItem>
                                        </Select>
                                </FormControl>
                            </Box>
                            <Stack>
                                {/* <form
                                    // className={style.form}
                                    onSubmit={(e) => handleRange(e)}
                                > */}
                                <Box
                                    component="form"
                                    display="flex"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '20ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                <TextField 
                                    id="outlined-basic" 
                                    label="Min" 
                                    variant="outlined" 
                                    type="number"
                                    name="min"
                                    min={'0'}
                                    value={range.min}
                                    onChange={(e) => handleChange(e)}
                                    sx={{backgroundColor: "#DADADA"}}

                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Max" 
                                    variant="outlined" 
                                    type="number"
                                    name="max"
                                    min={"0"}
                                    value={range.max}
                                    onChange={(e) => handleChange(e)}
                                    sx={{backgroundColor: "#DADADA"}}

                                />
                                    

                                    {/* <input
                                        className={style.input}
                                        type="number"
                                        placeholder="Min"
                                        name="min"
                                        min={'0'}
                                        value={range.min}
                                        onChange={(e) => handleChange(e)}
                                    /> */}

                                    {/* <input
                                        className={style.input}
                                        type="number"
                                        placeholder="Max"
                                        name="max"
                                        min="0"
                                        value={range.max}
                                        onChange={(e) => handleChange(e)}
                                    /> */}

                                    <Button onClick={(e) => handleRange(e)} variant="outlined" type="submit">Filter by price</Button>

                                    {/* <button
                                        className={style.input2}
                                        type="submit"
                                    >
                                        Filter
                                    </button> */}
                                    </Box>
                                {/* </form> */}
                            </Stack>
                            {/* <th > */}
                            
                            
                                {/* <select
                                    className={style.select}
                                    onChange={(e) => handleChangeRange(e)}
                                > */}
                                    {/* <option value="all">Min & Máx</option>
                                    <option value="MintoMax">Min To Máx</option>
                                    <option value="MaxtoMin">Máx To Min</option>
                                </select> */}
                            {/* </th> */}
                        </Grid>
                    {/* </tbody>
                </table>
            </div> */}
            </Container>
        </div>
    );
}
