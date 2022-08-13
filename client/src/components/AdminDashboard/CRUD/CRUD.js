import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getLibros, getSearch } from '../../../redux/features/data/dataSlice';
import BookCard from './BookCard' 
import capitalize from '../../auxiliar/capitalize';

export default function CRUD() {
  
const dispatch = useDispatch()
const [input, setInput] = React.useState('')
React.useEffect(()=>{
  dispatch(getSearch(input))
}, [input])
const books = useSelector((state) => state.data.books)
const booksForInput = books.map(e=>  {return {label: capitalize(e.title), id: e._id}})
const handleOnChange = (e)=>{
  e.preventDefault()
  setInput(e.target.value)
}

  //React.useEffect(()=>{}, [dispatch])
    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <TextField onChange={e=> handleOnChange(e)} fullWidth label="Search by book's name or subject" id="bookInput" />
          {booksForInput&& booksForInput.slice(0,10).map(e=> <Box sx={{display:'flex'}}><BookCard title={capitalize(e.label)} id={e.id}></BookCard></Box>)}
        </Box>
      </Container>
    </React.Fragment>
  );
}