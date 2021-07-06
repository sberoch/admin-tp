import React from 'react';
import logo from '../assets/logoDark.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useHistory } from "react-router";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function TopBar() {
  const history = useHistory();

  const isInHome = (history.location.pathname === '/home');
  let res;
  if (!isInHome) {
    res = <Button variant="contained" color="primary" onClick={() => history.push('/home')}>
          <HomeIcon style={{ color: "green", fontSize: 40}}/>
          </Button>;
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          {res}
        </Box>
        <img src={logo} alt="Logo" style={{height: 50, width: 50, marginLeft: 10}}/>
        <Typography variant="h6" color="inherit" noWrap>
          Rescue Me
        </Typography>
      </Toolbar>
    </AppBar> 
  );
}
