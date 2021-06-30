import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";
import {Theme} from '../theme/appTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import logo from '../assets/logo.png'

export default function AddPet() {
  
  const history = useHistory();

  return(
    <ThemeProvider theme={Theme}>
      <div style={{ background: `url('${process.env.PUBLIC_URL}/dog_wallpaper.jpg')` }}>
      <img src={logo} alt="Logo" style={{height: 120, width: 120, marginLeft: 10}}/>
        <Grid container spacing={3} justify="center">
            <Grid item xs={10} align="center">
              <Typography variant="h2" color="secondary"> Rescue Me </Typography>
            </Grid>
            <Grid item xs={10} align="center">
              <Typography variant="h5" color="black"> Home </Typography>
            </Grid>
            <Grid item xs={10} align="center">
              <Button 
                size="large"
                color="primary" 
                variant="contained"  
                onClick={() => history.push('/addpet')}
              >
              Agregar mascota
              </Button>
            </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
