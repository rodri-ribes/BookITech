import React from 'react'
import { Typography, Box, Button } from '@mui/material';
export function UserCard(props){
   
   const {user} = props
   
   return <Box sx={{ marginLeft: '20px', marginBottom:'10px', bgcolor: 'rgb(210,210,210)', minHeight: '10vh', width: '60vw', borderRadius: '7px', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{marginLeft: '10px', paddingLeft:'20px'}}>
                        <Typography color='black' variant='h6' paragraph>{user.username}</Typography>
                        <Typography color={'black'} variant='body1' >@{user.id} </Typography>
                        <Typography color={'black'} variant='body2'>Bans:{user.totalbans} </Typography>
                        <Typography color={'black'} variant='body2'>Days remaining: {user.daysRemaining}</Typography>
                    </div>
                    <div style={{alignSelf: 'flex-end', marginBottom: '5px', marginRight:'5px', paddingRight:'10px'}}>
                        <Button  variant='contained'>Unban</Button>
                    </div>
                </Box>
}