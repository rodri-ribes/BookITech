import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { getSearch } from '../../../redux/features/data/dataSlice';

export function Input(){

    const [input, setInput] = React.useState('')
    const dispatch = useDispatch()
    useEffect(()=>{ 
      dispatch(getSearch(input))
    }, [input])
    const handleOnChange = (e)=>{
      e.preventDefault()
      setTimeout(()=> setInput(e.target.value),100)
    }
    return (
     <TextField onChange={e=> handleOnChange(e)} fullWidth label="Search books by name or subject" id="bookInput" />)
    }