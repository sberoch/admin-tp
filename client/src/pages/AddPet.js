import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import api from '../network/axios'

const validationSchema = yup.object({
  name: yup
    .string('Ingresa el nombre de la mascota')
    .required('Se requiere el nombre'),
  species: yup
    .string('Ingresa la especie de la mascota')
    .required('Se requiere una especie'),
  breed: yup
    .string('Ingresa la raza de la mascota')
    .required('Se requiere una raza'),
});

export default function AddPet() {
  
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      species: '',
      breed: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });
  
  const handleSubmit = async (data) => {

    const {name, species, breed, description} = data

    try {
      const res = await api.post(`/pets`, {name, species, description})
      console.log(res)
      history.push('/')
    } catch {
      console.log("Error")
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10} align="center">
          <Typography variant="h2" color="primary"> Rescue Me </Typography>
        </Grid>
        <Grid item xs={10} align="center">
          <Typography variant="h5" color='black'> Nueva mascota </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={10}>
          <InputLabel
              style={{ disableAnimation: false, margin: 10}}
              disableAnimation={false}
              htmlFor="searchCriteria"
            >
              Especie de la mascota
          </InputLabel>
          <Select
            fullWidth
            variant="outlined"
            id="species"
            name="species"
            label="Especie"
            value={formik.values.species}
            onChange={formik.handleChange}
            error={formik.touched.species && Boolean(formik.errors.species)}
            helperText={formik.touched.species && formik.errors.species}
          >
            <MenuItem value={'DOG'}>Perro</MenuItem>
            <MenuItem value={'CAT'}>Gato</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="breed"
            name="breed"
            label="Raza"
            value={formik.values.breed}
            onChange={formik.handleChange}
            error={formik.touched.breed && Boolean(formik.errors.breed)}
            helperText={formik.touched.breed && formik.errors.breed}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="description"
            name="description"
            label="Descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={3} justify="center">
            <Grid item>
              <Button 
                size="large"
                color="primary" 
                variant="contained" 
                type="submit"
              >
              Confirmar
              </Button>             
            </Grid>
            <Grid item>
              <Button 
                size="large"
                color="secondary" 
                variant="contained" 
                
                type="submit"
              >
              Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
