import React, {useEffect, useState} from 'react'
import {Box, Typography, Button} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getLibros } from '../../../redux/features/data/dataSlice';

const {REACT_APP_API} = process.env

export function CommentCard(props){

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLibros())
    }, [])
    const {comment} = props
    const [reviewed, setReviewed] = useState(false)
    async function dispatchChange(type){
        if(type === 'flag'){
            var success = await axios.put(REACT_APP_API +'/comments/edit/' + comment.bookId + '/' + comment.commentId, {content:{...comment, reviewed: true, flagged: true}}).catch(err => console.log(err))
            var banned = await axios.post(REACT_APP_API + '/user/ban', {id :comment.user})
            return (success && banned)
        }
        if(type === 'ok'){
            var success = await axios.put(REACT_APP_API +'/comments/edit/' + comment.bookId + '/' + comment.commentId, {type: {review: true},content:{...comment, reviewed: true}})   
            .catch(err => console.log(err))
            return (success)

        }
    }
    const handleOk = async (event) =>{
        event.preventDefault()
        const success = await dispatchChange('ok')
        if(!success) alert("operation failed")
    
        }
    const handleFlag = async (event) =>{
        event.preventDefault()
        const success = await dispatchChange('flag')       
        if(!success) alert("operation failed")
    
        }
           return !reviewed && <Box sx={{ marginLeft: '20px', marginBottom:'10px', bgcolor: 'rgb(210,210,210)', minHeight: '10vh', width: '60vw', borderRadius: '7px', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{marginLeft: '10px'}}>
                        <Typography color='black' variant='h6' paragraph>"{comment.body}"</Typography>
                        <Typography color={'black'} variant='body2' >by @{comment.user} at: {comment.book}</Typography>
                    </div>
                    <div style={{alignSelf: 'flex-end', marginBottom: '5px', marginRight:'5px'}}>
                        <Button onClick={event =>{ handleOk(event);setReviewed(true)}} variant='contained'><DoneIcon/></Button>
                        <Button onClick={event => {handleFlag(event);setReviewed(true)}} variant="outlined"><DoDisturbOnIcon/></Button>
                    </div>
                </Box>
                
    }