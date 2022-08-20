import React, {useEffect} from 'react'
import {CssBaseline, Container, Box, Typography, Button} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import axios from 'axios'
import { useSelector } from 'react-redux';
const {REACT_APP_API} = process.env

export function CommentsMod() {
  
const parseComment = (book) => {
    if(book.comments.length === 0) return false
    const booksComments = book.comments.map(comment => {
        return {
            body: comment.content,
            reviewed: comment.reviewed || false,
            flagged: comment.flagged || false,
            user: comment.user[0],
            book: book.title,
            bookId: book.isbn13,
            commentIndex : book.indexOf(comment)
        }
        })
        return [...booksComments]
}
const books = useSelector(state => state.data.books)//.slice(0, 5)
const commentsMatrix = books.map(book => parseComment(book)).filter(e => e!=false)
const comments = [].concat(...commentsMatrix).slice(0,5)
    console.table(comments)
    useEffect(()=> {
        
        }, [])
const handleOk = async (event, comment) =>{
    event.preventDefault()
}
const handleFlag = async (event, comment) =>{
    event.preventDefault()
}


    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth='md' sx={{position: 'relative', display: 'flex'}} >
            <Box sx={{ bgcolor: '#173A5E', minHeight: '75vh', width: '70vw', borderRadius: '7px'}}>
                <Typography sx={{margin: '20px'}} variant='h5'>Unreviewed comments: </Typography>
               {comments &&
               comments.map( e => { 
                return(
               <Box sx={{ marginLeft: '20px', marginBottom:'10px', bgcolor: 'rgb(210,210,210)', minHeight: '10vh', width: '60vw', borderRadius: '7px', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{marginLeft: '10px'}}>
                        <Typography>Commentsds</Typography>
                        <Typography color='black' variant='h6' paragraph>"{e.body}"</Typography>
                        <Typography color={'black'} variant='body2' >by @{e.user} at: {e.book}</Typography>
                    </div>
                    <div style={{alignSelf: 'flex-end', marginBottom: '5px', marginRight:'5px'}}>
                        <Button onClick={event => handleOk(event, e)} variant='contained'><DoneIcon/></Button>
                        <Button onClick={event => handleFlag(event,e)} variant="outlined"><DoDisturbOnIcon/></Button>
                    </div>
                </Box>)})}
            </Box>
          </Container>
        </React.Fragment>
      );
    }

