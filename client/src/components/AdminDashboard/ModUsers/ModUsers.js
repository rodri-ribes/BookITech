import React from 'react'
import {UserCard} from './UserCard'
import { Typography, Box, Container, CssBaseline,  } from '@mui/material'

const usuarios = [
    {
        id: 'randomId',
        username: 'user1',
        totalbans: 1,
        daysRemaining: 10,
    },
    {
        id: 'randomId2',
        username: 'user2',
        totalbans: 2,
        daysRemaining: 20,
    },
    {
        id: 'randomId3',
        username: 'user3',
        totalbans: 1,
        daysRemaining: 6,
    }
]

export function ModUsers(){


    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth='md' sx={{position: 'relative', display: 'flex'}} >
            <Box sx={{ bgcolor: '#173A5E', minHeight: '75vh', width: '70vw', borderRadius: '7px'}}>
                <Typography sx={{margin: '20px'}} variant='h5'>Banned users: </Typography>
                {usuarios ?
                usuarios.map(e => <UserCard user={e}/>)
                : <Typography sx={{marginLeft: '25px'}} variant='body'>No banned users</Typography> }

            </Box>
</Container>
  </React.Fragment>)
   
} 
