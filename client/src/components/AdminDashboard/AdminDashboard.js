import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import CRUD from './CRUD/CRUD'

const classes= {
    dashboard: {
      display: 'flex',
      zIndex: -1
      },
    }

    let theme = createTheme({
        palette: {
          primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
          },
        },
        typography: {
          h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiTab: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
        mixins: {
          toolbar: {
            minHeight: 48,
          },
        },
        zIndex: 0
      });

export function AdminDashboard(){

  const dispatch = useDispatch()
  const state = useSelector((state) => state.data.dashboardState);
  const componentReturn ={
    'CRUD' : <CRUD/>,
  }

  useEffect(()=> {}, [state])
  return (
    <ThemeProvider theme={theme}>
      <div sx={classes.dashboard}>
        <Sidebar ></Sidebar>
        {componentReturn[state]}

      </div>
    </ThemeProvider>)
}