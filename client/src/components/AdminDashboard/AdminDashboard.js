import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import CRUD from './CRUD/CRUD'
import { SalesHistory } from "./SalesHistory/SalesHistory";
import {CommentsMod} from './CommentsMod/CommentsMod'
import {theme} from './theme'

const classes= {
    dashboard: {
      display: 'flex',
      zIndex: -1
      },
    }


export function AdminDashboard(){


  const state = useSelector((state) => state.data.dashboardState);
  const componentReturn ={
    'CRUD' : <CRUD/>,
    'Sales History' : <SalesHistory/> || <h1>sales history</h1>,
    'Review Comments' : <CommentsMod/>
  }

  return (
    <ThemeProvider theme={theme}>
      <div sx={classes.dashboard}>
        <Sidebar ></Sidebar>
        {componentReturn[state]}

      </div>
    </ThemeProvider>)
}