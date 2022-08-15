import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { deleteBook, setId } from '../../../redux/features/data/dataSlice';
import capitalize from '../../auxiliar/capitalize';
import { Typography } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export default function CRUD(props) {
  
const {title, id, delisted} = props
const dispatch = useDispatch()
const handleDelete = (e)=>{
  e.preventDefault()
  setDeletePressed(false)
  dispatch(deleteBook(id))
  delisted(true)
  
  return
}
const handleOnUpdate = (e)=>{
  dispatch(setId(id))
  return () =>{
    dispatch(setId(''))
  }
}

  const [deletePressed, setDeletePressed] = useState(false)

    return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }}>
          { deletePressed === false ? <>
            <Typography sx={{color:'#173A5E'}}>{title}</Typography>
            <IconButton onClick={e => setDeletePressed(true)}><DeleteIcon/></IconButton>
            <IconButton onClick={e=> handleOnUpdate(e)}><ModeEditOutlineIcon/></IconButton></> :
            <>
              <Typography sx={{color:'#173A5E'}}>You want to delist this book?</Typography>
              <h4>I'll still be in the database</h4>
              <div>
                <button onClick={e=>handleDelete(e)}>Confirm</button>
                <button onClick={e=>setDeletePressed(false)}>Cancel</button>
              </div>
            </>
          }
        </Box>
      </Container>
    </React.Fragment>
  );
}