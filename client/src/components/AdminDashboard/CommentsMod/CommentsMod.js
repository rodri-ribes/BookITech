import React, {useEffect, useState} from 'react'
import {CssBaseline, Container, Box, Typography, Button} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {getLibros} from '../../../redux/features/data/dataSlice'
import { CommentCard } from './CommentCard';
import {Paginacion} from '../../Home/Pagination/Pagination'
const {REACT_APP_API} = process.env



export function CommentsMod(props) {
  
const {books} = props
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
            // commentIndex : book.indexOf(comment)
        }
        })
        return [...booksComments]
}


async function filterBooks(){
    const commentsMatrix = books.map(book => parseComment(book)).filter(e => e!=false)
    setComments([].concat(...commentsMatrix).filter(e => !e.reviewed))
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
                <Typography sx={{margin: '20px'}} variant='h5'>Unreviewed comments: </Typography>
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


