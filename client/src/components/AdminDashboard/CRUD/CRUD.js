import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch, setId } from '../../../redux/features/data/dataSlice';
import BookCard from './BookCard' 
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import capitalize from '../../auxiliar/capitalize'
import { FormInput } from './FormInput';
import {Input} from './Input'

export default function CRUD() {
  
const dispatch = useDispatch()
const [prompt, setPrompt] = React.useState(false)
const books = useSelector((state) => state.data.books).slice(0,9)
const id = useSelector(state => state.data.id)
const [isDelisted, setIsDelisted] = useState(false)
const [input, setInput] = useState('')
const [idState, setIdState] = useState(id)

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
  dispatch(getSearch(input))
  setIsDelisted(false)
}, [isDelisted])

useEffect(() =>{
  dispatch(getSearch(input))
}, [input])

function handleOnClick(e){
  e.preventDefault()
  setPrompt(!prompt)
  dispatch(setId(''))
}

    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md' sx={{position: 'relative', display: 'flex'}} >
        <Box sx={{ bgcolor: '#0a1929', height: 'auto', width: '70vw'}}>
          {!prompt ? <FormInput id={idState} prompt={setPrompt} /> :
          <>
            <Input delisted={isDelisted} setDelisted={setIsDelisted} inputCallback={setInput} value={input} />
            { books ? books.map(e=> <Box sx={{display:'flex'}}>
            <BookCard sx={{display:'inline-block', backgroundColor:'#FFFFFF', width: '100%'}} delisted={setIsDelisted} title={capitalize(e.title)} id={e.isbn13}></BookCard>
             </Box>) 
            : <h4>No books found</h4>}
          </>}
        <Button  variant="outlined" onClick={e =>handleOnClick(e)}>{!prompt ? <Typography variant='h6'>Go back</Typography> : <AddIcon fontSize='large'/>}</Button>
    
        </Box>
      </Container>
    </React.Fragment>
  );
}