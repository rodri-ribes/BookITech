import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { getSearch } from '../../../redux/features/data/dataSlice';

export function Input(props){

    const {inputCallback, value} = props
    const dispatch = useDispatch()
    const handleOnChange = (e)=>{
      e.preventDefault()
      inputCallback(e.target.value)

    }
    return (
      <>
        <TextField sx={{backgroundColor:'#ffffff', borderRadius:'10px'}}onChange={e=> handleOnChange(e)} value={value} fullWidth label="Search books by name or subject" id="bookInput" />
      </>)
    }