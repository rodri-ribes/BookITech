import React, {useEffect, useState} from 'react'
import {UserCard} from './UserCard'
import { Typography, Box, Container, CssBaseline, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from 'axios'

const {REACT_APP_API} = process.env



export function ModUsers(){
    
    const [lift, setLift] = useState(false)
    const [users, setUsers] = useState([])
    async function getUsers(){

        const {data} = await axios.get(REACT_APP_API + '/users/all')
        const users = data?.filter(e => e.banned.isBanned)
        if(!users) return null
        setUsers(users)
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
            <div style={{ width:'95%', display: 'flex', justifyContent:'space-between', paddingTop:'10px', paddingBottom:'10px'}}>
                <Typography sx={{margin: '20px'}} variant='h5'>Banned users: </Typography>
                <Button sx={{paddingTop:'10px', alignSelf: 'flex-end'}} variant='outlined' lift={setLift} onClick={getUsers()}> <RefreshIcon fontSize='large'/></Button>
            </div>
                {users.length ?
                users.map(e => <UserCard user={e}/>)
                : <Typography sx={{marginLeft: '25px'}} variant='body'>We'll show you when there're new banned users</Typography> }

            </Box>
</Container>
  </React.Fragment>)
   
} 
