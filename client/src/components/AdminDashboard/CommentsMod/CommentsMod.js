import React, {useEffect, useState} from 'react'
import {CssBaseline, Container, Box, Typography, Button} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {getLibros} from '../../../redux/features/data/dataSlice'
import { CommentCard } from './CommentCard';
import {Paginacion} from '../../Home/Pagination/Pagination'
import RefreshIcon from '@mui/icons-material/Refresh';
const {REACT_APP_API} = process.env



export function CommentsMod(props) {
  

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
            commentId : comment._id
        }
        })
        return [...booksComments]
}


async function filterBooks(){
    const books = await axios.get(REACT_APP_API + '/books').catch(err =>console.log(err))
    const commentsMatrix = books.data.map(book => parseComment(book)).filter(e => e!=false)
    setComments([].concat(...commentsMatrix).filter(e => !e.reviewed))
    console.table(comments)
}

const [comments, setComments] = useState([])

useEffect(()=>{
    filterBooks()
}, [])

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth='md' sx={{position: 'relative', display: 'flex'}} >
            <Box sx={{ bgcolor: '#173A5E', minHeight: '75vh', width: '70vw', borderRadius: '7px'}}>
                <div style={{ width:'100%'}}>
                    <Typography sx={{margin: '20px'}} variant='h5'>Unreviewed comments: </Typography>
                    <Button sx={{justifySelf:'stretch'}} variant='outlined' onClick={filterBooks}> <RefreshIcon fontSize='large'/></Button>
                </div>
               {comments.length ?
               comments.map( e => { 
                return !e.reviewed && 
                    <CommentCard key={e._id}comment={e}/>})
                    
                : <Typography sx={{marginLeft: '25px'}} variant='body'>Up to date...</Typography> }
               
            </Box>
          </Container>
        </React.Fragment>
      );
    }


