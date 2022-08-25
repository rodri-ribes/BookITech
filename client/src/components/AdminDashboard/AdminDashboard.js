import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import CRUD from './CRUD/CRUD'
import { SalesHistory } from "./SalesHistory/SalesHistory";
import {CommentsMod} from './CommentsMod/CommentsMod'
import {ModUsers} from './ModUsers/ModUsers'
import {theme} from './theme'
import { getLibros } from "../../redux/features/data/dataSlice";
import { Card404 } from "../404/Card404";
import axios from 'axios'
const {REACT_APP_API} = process.env

const classes= {
    dashboard: {
      display: 'flex',
      zIndex: -1
      },
    }


export function AdminDashboard(){

  const [isAdmin, setIsAdmin] = useState(true)
 
  async function authorizeAdmin(){
    let user = JSON.parse(window.localStorage.getItem("user"))
    if(!user) setIsAdmin(false)
    let dataUsuario = await axios.get(REACT_APP_API + `/user/${user.id}`)
    if(!dataUsuario) setIsAdmin(false)
    if(dataUsuario.data?.rol === 'admin') setIsAdmin(true)
    return
  }
  const dispatch = useDispatch()
  let books = useSelector((state) => state.data.books)
useEffect(()=>{
  authorizeAdmin()
  dispatch(getLibros())
},[])
  const state = useSelector((state) => state.data.dashboardState);
  const componentReturn ={
    'CRUD' : <CRUD/>,
    'Sales History' : <SalesHistory/>,
    'Review Comments' : <CommentsMod books={books} />,
    'Moderate Users' : <ModUsers/>
  }

  return (
    <ThemeProvider theme={theme}>
      {isAdmin ? 
      <div sx={classes.dashboard}>
        <Sidebar ></Sidebar>
        {componentReturn[state]}
      </div> : <Card404/>}
    </ThemeProvider>)
}