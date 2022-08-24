import React, {useEffect, useState} from 'react'
import {UserCard} from './UserCard'
import { Typography, Box, Container, CssBaseline,  } from '@mui/material'
import axios from 'axios'
const {REACT_APP_API} = process.env



export function ModUsers(){
    
    const [users, setUsers] = useState([])
    async function getUsers(){

        const {data} = await axios.get(REACT_APP_API + '/users/all')
        const users = data?.filter(e => e.banned.isBanned)
        if(!users) return null
        setUsers(users)
        console.log(users)
        return users
    }

    useEffect(()=>{
       getUsers()
    }, [])

    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth='md' sx={{position: 'relative', display: 'flex'}} >
            <Box sx={{ bgcolor: '#173A5E', minHeight: '75vh', width: '70vw', borderRadius: '7px'}}>
                <Typography sx={{margin: '20px'}} variant='h5'>Banned users: </Typography>
                {users.length ?
                users.map(e => <UserCard user={e}/>)
                : <Typography sx={{marginLeft: '25px'}} variant='body'>We'll show you when there're new banned users</Typography> }

            </Box>
</Container>
  </React.Fragment>)
   
} 
