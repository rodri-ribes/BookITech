import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { getSearch } from '../../../redux/features/data/dataSlice';

export function Input(props){

    const {delisted, setDelisted} = props
    const [input, setInput] = React.useState('')
    const dispatch = useDispatch()
    useEffect(()=>{ 
      dispatch(getSearch(input))
    }, [input])
    useEffect(()=>{
     if(delisted){
        dispatch(getSearch(input))
      setDelisted(false)}
    }, [delisted])
    const handleOnChange = (e)=>{
      e.preventDefault()
      setTimeout(()=> setInput(e.target.value),10)
    }
    return (
     <TextField onChange={e=> handleOnChange(e)} fullWidth label="Search books by name or subject" id="bookInput" />)
    }