import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {Theme} from '../theme/appTheme'
import { ThemeProvider } from '@material-ui/core/styles';

export default function AddPet() {
  
  const history = useHistory();

  return(
    <ThemeProvider theme={Theme}>
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
              onClick={() => false}
            >
            Ver mascotas
            </Button>
          </Grid>
      </Grid>
    </ThemeProvider>
  )
}