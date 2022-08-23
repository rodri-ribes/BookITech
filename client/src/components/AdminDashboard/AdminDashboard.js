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

const classes= {
    dashboard: {
      display: 'flex',
      zIndex: -1
      },
    }


export function AdminDashboard(){

  const dispatch = useDispatch()
  let books = useSelector((state) => state.data.books)
useEffect(()=>{
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
      <div sx={classes.dashboard}>
        <Sidebar ></Sidebar>
        {componentReturn[state]}

      </div>
    </ThemeProvider>)
}