import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { deleteBook, getLibros } from '../../../redux/features/data/dataSlice';
import capitalize from '../../auxiliar/capitalize';
import { Typography } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export default function CRUD(props) {
  
const {title, id} = props
const dispatch = useDispatch()
const handleOnDelete = (e)=>{
    e.preventDefault()
    dispatch(deleteBook(id))
    alert(id)
}
const handleOnUpdate = (e)=>{
    
}
  React.useEffect(()=>{
    dispatch(getLibros())
  }, [dispatch])
    return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }}>
            <Typography>{title}</Typography>
            <IconButton onClick={e=>handleOnDelete(e)}><DeleteIcon/></IconButton>
            <IconButton onClick={e=> handleOnUpdate(e)}><ModeEditOutlineIcon/></IconButton>
        </Box>
      </Container>
    </React.Fragment>
  );
}