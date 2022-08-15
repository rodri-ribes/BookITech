import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useDispatch, useSelector } from 'react-redux';
import { changeDashboard } from '../../redux/features/data/dataSlice';

const drawerWidth = '20vw';
const categories = [
    {
      id: 'Website',
      children: [
        { id: 'CRUD', icon: <BookmarkAddIcon />, active: true },
        { id: 'Moderate Users', icon: <PeopleAltIcon/>, active: false },
        { id: 'Review Comments', icon: <CommentIcon />, active: false },
      ],
    },
    {
      id: 'Business',
      children: [
        { id: 'Sales History', icon: <MonetizationOnIcon />, active: false },
        { id: 'Analytics', icon: <QueryStatsIcon />, active: false },
      ],
    },
  ];
  const item = {
    py: '2px',
    px: 3,
    color: 'rgba(010, 010, 010, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(010, 010, 010, 0.08)',
    },
  };
  
  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };
  

  export  function Sidebar(props) {
    
    const dispatch = useDispatch()
    const state = useSelector((state) => state.data.dashboardState);
    const handleOnClick = (e, id, parentId, index) =>{
    e.preventDefault()
    dispatch(changeDashboard(id))
    categories.map(category => {
        category.children.map(e => e.active = false)
        if(category.id === parentId) category.children[index].active = true  
    })
  }
  
    return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingTop: '75px'
          },
        }}
        variant="permanent"
        anchor="left"
      >


          {categories.map((category) => (
           <div>
           <Typography variant='h6' sx={{...item, ...itemCategory}}>{category.id}</Typography>
           <Divider></Divider>
           <List>
           {category.children.map((e) => (
              <ListItem  sx={{ ...item}} 
                key={e.id} 
                disablePadding 
                onClick={event=> handleOnClick(event, e.id, category.id, category.children.indexOf(e))}> 
              <ListItemButton >
                <ListItemIcon>
                    {e.icon }
                </ListItemIcon>
                <ListItemText  sx={{ color: '#101010' }} primary={e.id}/>
              </ListItemButton>
            </ListItem>
            ))}
        </List>
        </div>
            ))}
        <Divider />
        
      </Drawer>


  );
}
