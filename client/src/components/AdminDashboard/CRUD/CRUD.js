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

useEffect(()=> {
  if(id)setPrompt(true)
  if(!id)setPrompt(false)
}, [id])

function handleOnClick(e){
  e.preventDefault()
  setPrompt(!prompt)
  if(id)dispatch(setId(''))

}

    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box sx={{ bgcolor: '#cfe8fc', height: 'auto'}}>
          {!prompt ? <FormInput id={id} prompt={setPrompt}/> :
          <>
            <Input delisted={isDelisted} setDelisted={setIsDelisted} />
            <CardsContainer setDelisted={setIsDelisted} books={books.slice(0,9)}/>
            </>}
        <Button  variant="outlined" onClick={e =>handleOnClick(e)}>{!prompt ? <Typography variant='h6'>Go back</Typography> : <AddIcon fontSize='large'/>}</Button>
    
        </Box>
      </Container>
    </React.Fragment>
  );
}