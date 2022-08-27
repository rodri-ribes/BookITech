import React, { useEffect , useState} from "react"
import { useDispatch } from "react-redux"
import { TextField } from "@mui/material"
import { getSearch } from '../../../redux/features/data/dataSlice';

export function Input(props){

    const {delisted, setDelisted} = props
    const [input, setInput] = React.useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{ 
      dispatch(getSearch(input))
    }, [input])
    // useEffect(()=>{
    //  if(delisted){
    //     dispatch(getSearch(input))
    //   setDelisted(false)}
    // }, [delisted])
    const handleOnChange = (e)=>{
      e.preventDefault()
      setTimeout(()=>(setInput(e.target.value)), 10)
    }

    function handleOnChange2(e) {
      let named = (e.target.value).toLowerCase();
      //console.log(named)
      // console.log(name)
      if(name === ''){
          setName((prevState) =>{
              return prevState + named
          })
          dispatch(getSearch(named))
      return 
      }
      if(name.length < named.length){
          setName((prevState) =>{
              return prevState + named[named.length - 1]
          })
          dispatch(getSearch(named))
          setName(named)
      return
      }
      if(name.length > named.length){
          let diferencia = name.length - named.length
          setName((prevState) =>{
              return prevState.slice(0, -diferencia)
          })
          dispatch(getSearch(named))
      return
      }
  }
    return (
      <>
     <TextField sx={{backgroundColor:'#ffffff', borderRadius:'10px'}}onChange={e=> handleOnChange2(e)} fullWidth label="Search books by name or subject" id="bookInput" />
     </>)
    }