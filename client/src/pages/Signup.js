import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import api from '../network/axios'
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext'

const RESCATISTA = 'Rescatista'
const ADOPTANTE = 'ADOPTANTE'

const validationSchema = yup.object({
  email: yup
    .string('Ingresa tu email')
    .email('Ingresa un email valido')
    .required('Se requiere un email'),
  name: yup
    .string('Ingresa tu nombre')
    .required('Se requiere tu nombre'),
  birthdate: yup
    .string('Ingresa tu fecha de nacimiento')
    .required('Se requiere fecha de nacimiento'),
  country: yup
    .string('Ingresa tu pais')
    .required('Se requiere un país'),
  address: yup
    .string('Ingresa tu dirección')
    .required('Se requiere una dirección'),
  role: yup
    .string('Ingresa un rol')
    .required('Se requiere un rol'),
  password: yup
    .string('Ingresa tu contase単a')
    .required('Se requiere una contase単a'),
});

export default function Signup() {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      birthdate: '',
      country: '',
      address: '',
      password: '',
      role: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignup(values)
    },
  });

  const history = useHistory();
  const [avatar, setAvatar] = useState();
  const { signup } = useAuth()  //Se pueden agregar login, logout, currentUser 

  const handleFileSelection = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleSignup = async (data) => {
    // let formData = new FormData()
    // formData.append("email", user.email)
    // formData.append("name", user.name)
    // formData.append("birthdate", user.birthdate)
    // formData.append("country", user.country)
    // formData.append("address", user.address)
    // formData.append("role", user.role)
    // formData.append("password", user.password)
    //formData.append("avatar", avatar, avatar.name)
    // headers: {
    //   'content-type': 'multipart/form-data'
    // }

    try {
      const {email, name, birthdate, country, address, password, role} = data 
  
      if (role === RESCATISTA) {
        //Firebase
        const firebase_res = await signup(email, password) //login against firebase
        const token = await firebase_res.user.getIdToken(); 
        localStorage.setItem("token", token) //save id token in localStorage

        //Al back
        const back_res = await api.post(`/rescuers`, {
          email, name, birthdate, country, address
        })
      }
      //history.push('/')
    } catch (error){
      console.log(error)
    }
  }
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10} align="center">
          <Typography variant="h2" color="primary"> Rescue Me </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
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
          <TextField
            fullWidth
            variant="outlined"
            id="birthdate"
            name="birthdate"
            label="Fecha de nacimiento"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
            helperText={formik.touched.birthdate && formik.errors.birthdate}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="country"
            name="country"
            label="País"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            id="address"
            name="address"
            label="Dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={10}>
          <InputLabel
              style={{ disableAnimation: false }}
              disableAnimation={false}
              htmlFor="searchCriteria"
            >
              Elija su rol dentro de la aplicación
          </InputLabel>
          <Select
            fullWidth
            variant="outlined"
            id="role"
            name="role"
            label="Rol"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            <MenuItem value={"Adoptante"}>Adoptante</MenuItem>
            <MenuItem value={"Rescatista"}>Rescatista</MenuItem>
          </Select>
        </Grid>

        {avatar && <Grid item xs={10} style={{textAlign: "center"}}>
          <img src={URL.createObjectURL(avatar)} width="200" height="200" alt="" />
        </Grid>}
        <Grid item xs={10}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            {avatar ? avatar.name : 'Selecciona tu foto de perfil'} 
            <input
              type="file"
              hidden
              onChange={handleFileSelection}
            />
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Button 
            size="large"
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit"
          >
          Registrarme
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Link to='/login'>
            <Button color="primary" style={{textTransform: 'none'}}>
              多Ya tenes una cuenta? Ingresar
            </Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}