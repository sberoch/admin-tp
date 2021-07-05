import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { useHistory } from "react-router";
import {Theme} from '../theme/appTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import TopBar from '../components/TopBar';
import TitlebarGridList from '../components/PetsViewer'
import api from '../network/axios'

export default function AddPet() {

  const [pets, setPets] = useState([])

  useEffect( async () => {
    let pets = await api.get('/pets')
    setPets(pets.data)
  }, [])
  
  //const history = useHistory();

  return(
    <ThemeProvider theme={Theme}>
      <TopBar />
      <Grid container spacing={3} justify="center">
          <Grid item xs={10} align="center">
            <Typography variant="h2" color="secondary"> Rescue Me </Typography>
          </Grid>

          {<TitlebarGridList pets={pets}/>}
          <Grid item xs={10} align="center">
            {/* <Button 
              size="large"
              color="primary" 
              variant="contained"  
              onClick={() => false}
            >
            Ver mascotas
            </Button> */}
          </Grid>
      </Grid>
    </ThemeProvider>
  )
}