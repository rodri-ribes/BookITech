import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import capitalize from "../../auxiliar/capitalize"
import { TextField, Box } from "@mui/material"
import BookCard from './BookCard'
import { getLibros, getSearch } from '../../../redux/features/data/dataSlice';

export function CardsContainer(props){

    const {books} = props
    return (<>
        { books ? books.map(e=> <Box sx={{display:'flex'}}>
            <BookCard title={capitalize(e.title)} id={e.id}></BookCard>
        </Box>) 
        : <h4>No books found</h4>}
    </>
)}