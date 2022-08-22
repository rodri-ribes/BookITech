import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import capitalize from "../../auxiliar/capitalize"
import { TextField, Box } from "@mui/material"
import BookCard from './BookCard'
import { getLibros, getSearch } from '../../../redux/features/data/dataSlice';

export function CardsContainer(props){

    const {setDelisted} = props
    const {books} = props
    return (<>
        { books ? books.map(e=> <Box sx={{display:'flex'}}>
            <BookCard key={e.isbn13} sx={{display:'inline-block', backgroundColor:'#FFFFFF', width: '100%'}} delisted={setDelisted} title={capitalize(e.title)} id={e.isbn13}></BookCard>
        </Box>) 
        : <h4>No books found</h4>}
    </>
)}