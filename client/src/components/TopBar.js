import React from 'react';
import logo from '../assets/logoDark.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function TopBar() {
  return (
    <AppBar position="relative">
      <Toolbar>    
        <img src={logo} alt="Logo" style={{height: 50, width: 50, marginLeft: 10}}/>
        <Typography variant="h6" color="inherit" noWrap>
          Rescue Me
        </Typography>
      </Toolbar>
    </AppBar> 
  );
}
