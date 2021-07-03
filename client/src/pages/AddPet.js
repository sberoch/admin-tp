import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router";
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import api from '../network/axios'
import { Theme } from '../theme/appTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import logo from '../assets/logo.png'
import { HomeRedirection, UserPostPath } from '../roles';
import { storage } from '../config/firebase'

const validationSchema = yup.object({
  name: yup
    .string('Ingresa el nombre de la mascota')
    .required('Se requiere el nombre'),
  species: yup
    .string('Ingresa la especie de la mascota')
    .required('Se requiere una especie'),
  age: yup
    .number('Ingresa la edad de esta mascota')
    .required('Se requiere la edad de la mascota')
});

export default function AddPet() {

  const history = useHistory();
  const [avatar, setAvatar] = useState(0)

  const formik = useFormik({
    initialValues: {
      name: '',
      species: '',
      age: 0,
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  const handleFileSelection = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleSubmit = async (data) => {
    try {
      const storageRef = storage.ref(`/pets/${avatar.name}`);
      let image_url;

      await storageRef.put(avatar);
      image_url = await storageRef.getDownloadURL();
      const pet = { ...data, image_url }
      const res = await api.post(UserPostPath.Pets, pet)

      history.push(HomeRedirection.Rescuer)
    } catch (err){
      console.log(err)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <ThemeProvider theme={Theme}>
        <img src={logo} alt="Logo" style={{height: 120, width: 120, marginLeft: 10}}/>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10} align="center">
            <Typography variant="h2" color="secondary"> Rescue Me </Typography>
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
              style={{ disableAnimation: false, margin: 10 }}
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
            <TextField
              fullWidth
              variant="outlined"
              id="age"
              name="age"
              label="Edad"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>

          {avatar && <Grid item xs={10} style={{ textAlign: "center" }}>
            <img src={URL.createObjectURL(avatar)} width="200" height="200" alt="" />
          </Grid>}
          <Grid item xs={10}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              {avatar ? avatar.name : 'Selecciona foto del animal'}
              <input
                type="file"
                hidden
                onChange={handleFileSelection}
              />
            </Button>
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
                  onClick={() => history.push('/home')}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  )
}
