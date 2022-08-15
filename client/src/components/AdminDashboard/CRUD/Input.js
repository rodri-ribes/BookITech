import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { getSearch } from '../../../redux/features/data/dataSlice';

export function Input(){

    const [input, setInput] = React.useState('')
    const dispatch = useDispatch()
    const fetch = () =>{
        dispatch(getSearch(input))
    }
    useEffect(()=>{ 
       fetch()
    }, [input])
    const handleOnChange = (e)=>{
      e.preventDefault()
      if(e.target.value === input) return
      setInput(e.target.value)
    }
    return (
     <TextField onChange={e=> handleOnChange(e)} fullWidth label="Search books by name or subject" id="bookInput" />)
    }