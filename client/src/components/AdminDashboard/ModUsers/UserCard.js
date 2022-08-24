import React from 'react'
import { Typography, Box, Button } from '@mui/material';
import axios from 'axios';
const {REACT_APP_API} = process.env
export function UserCard(props){
   
   const {user, lift} = props
   const handleUnban = async (e) =>{
    e.preventDefault()
    const unbaned = await axios.put(REACT_APP_API + '/user/unban/' + user._id).catch(err => console.log(err))
    if(!unbaned) console.log("unbaned failed")
    console.log("unbanned succesfully")
    lift(true)
    return
   }

   return <Box sx={{ marginLeft: '20px', marginBottom:'10px', bgcolor: 'rgb(210,210,210)', minHeight: '10vh', width: '60vw', borderRadius: '7px', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{marginLeft: '10px', paddingLeft:'20px'}}>
                        <Typography sx={{marginTop: '5px'}} color='black' variant='h6' paragraph>{user.fullName}</Typography>
                        <Typography color={'black'} variant='body1' >@{user._id} </Typography>
                        <Typography color={'black'} variant='body2'>Bans: {user.banned.numberOfBans} </Typography>
                        <Typography color={'black'} variant='body2'>Days remaining: {user.daysRemaining || ''}</Typography>
                    </div>
                    <div style={{alignSelf: 'flex-end', marginBottom: '5px', marginRight:'5px', paddingRight:'10px'}}>
                        <Button  onClick={e=>handleUnban(e)} variant='contained'>Unban</Button>
                    </div>
                </Box>
}