import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { deleteBook, setId, getLibros, getSearch } from '../../../redux/features/data/dataSlice';
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
  // return () =>{
  //   dispatch(setId(''))
  // }
}

  const [deletePressed, setDeletePressed] = useState(false)

    return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{display: "inline-block", zIndex:1, borderColor:'black', borderRadius:'10px', m:1, bgcolor: '#173A5E'}}>
        <Box sx={{ position:'relative', bgcolor: '#173A5E',m: 1, borderRadius: '10px' ,padding:"5px", height: 'auto', width: '100%', alignItems:"center"}}>
          { deletePressed === false ? <>
            <div>
              <Typography sx={{color:'#FFFFFF', fontWeight:'bold'}}>{title}</Typography>
            </div>
            <div style={{float: 'right'}}>            
              <IconButton  onClick={e => setDeletePressed(true)}><DeleteIcon color='primary' fontSize='large'/></IconButton>
              <IconButton onClick={e=> handleOnUpdate(e)}><ModeEditOutlineIcon color='primary'  fontSize='large'/></IconButton> 
            </div>
            </> :
            <>
              <h4 >You want to delist "{title}"?</h4>
              <Typography sx={{color:'#FFFFFF'}}>I'll still be in the database</Typography>
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