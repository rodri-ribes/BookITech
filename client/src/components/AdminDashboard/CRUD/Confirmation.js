import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateBook, createBook, setId } from '../../../redux/features/data/dataSlice';

export default function Confirmation(props) {
    
    const dispatch = useDispatch()
    const {id, data, prompt, confirmation} = props
    function handleOnClick(e){
        
        e.preventDefault()  
        id ? dispatch(updateBook({...data, id: data._id })) : dispatch(createBook({...data}))
        dispatch(setId(''))
        prompt(true)
        confirmation(true)
        
      }
    function handleCancel(e){
        e.preventDefault()
        confirmation(false)
    }
    
    return (
    <Box
      sx={{
        zIndex: 10,
        position: 'fixed',
        display: 'flex',
        paddingLeft: '18%',
        paddingTop:'10vw',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          minWidth: '30vw',
          maxWidth: '70vw',
          maxHeight: '50vh',
          minHeight: '30vh',
        },
      }}
    >
      <Paper sx={{
        backgroundColor:'#173A5E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        columnGap:'5px'

        }} elevation={6}>

      <Typography sx={{color: 'whitesmoke'}} variant='h5'> Confirm {id ? <a>update</a> : <a>creation</a>}?</Typography>
      <div style={{paddingTop: '10px' }}>  
        <Button variant='contained' onClick={e=>handleOnClick(e)}>Confirm</Button> <Button onClick={e=>handleCancel(e)} variant='outlined'>Cancel</Button>
      </div>

      </Paper>
    </Box>
  );
}