import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getLibros, getSearch, setId } from '../../../redux/features/data/dataSlice';
import BookCard from './BookCard' 
import capitalize from '../../auxiliar/capitalize';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { Typography } from '@mui/material';
import { FormInput } from './FormInput';
import { CardsContainer } from './CardsContainer';
import {Input} from './Input'

export default function CRUD() {
  
const dispatch = useDispatch()
const [prompt, setPrompt] = React.useState(false)
const books = useSelector((state) => state.data.books)
const id = useSelector(state => state.data.id)
const [isDelisted, setIsDelisted] = useState(false)
const [idState, setIdState] = useState(id)
let nameSearch = useSelector((state) => state.data.nameSearch);

useEffect(()=>{
  dispatch(setId(''))  
  setPrompt(true)
}, [dispatch])

useEffect(()=> {
  if(!id)setPrompt(true)
  if(id)setPrompt(false)
  setIdState(id)
}, [id])

useEffect(() =>{
  dispatch(getLibros())
}, [isDelisted])

const [filtrado, setfiltrado] = useState([])

function searchTerm(term) {
    return function (x) {
        return x.title.toLowerCase().includes(term) || x.authors !== undefined && x.authors.toLowerCase().includes(term) || !term
    }
}

useEffect(() => {
    setfiltrado(books)
}, [books])



let filteredBooks = filtrado.filter(searchTerm(nameSearch))

function handleOnClick(e){
  e.preventDefault()
  dispatch(setId(''))
  setPrompt(!prompt)
}

    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md' sx={{position: 'relative', display: 'flex', marginLeft: '300px'}} >
        <Box sx={{ bgcolor: '#0a1929', height: 'auto', width: '70vw'}}>
          {!prompt ? <FormInput id={idState} prompt={setPrompt} /> :
          <>
            <Input delisted={isDelisted} setDelisted={setIsDelisted} />
            <CardsContainer  setDelisted={setIsDelisted} books={filteredBooks.slice(0,9)}/>
            </>}
        <Button  variant="outlined" onClick={e =>handleOnClick(e)}>{!prompt ? <Typography variant='h6'>Go back</Typography> : <AddIcon fontSize='large'/>}</Button>
    
        </Box>
      </Container>
    </React.Fragment>
  );
}