import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Theme } from '../theme/appTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import api from '../network/axios'
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext'
import { ROLES, HomeRedirection, UserPostPath } from '../roles';
import { storage } from '../config/firebase'
import logo from '../assets/logo.png'

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

  const isRoleValid = (role) => {
    return (role === ROLES.Rescuer || role === ROLES.Adopter);
  }

  const handleSignup = async (data) => {
    try {
      const { email, name, birthdate, country, address, password, role } = data

      if (isRoleValid(role)) {
        //Firebase
        const firebase_res = await signup(email, password) //login against firebase
        const token = await firebase_res.user.getIdToken();

        //save id token in localStorage
        localStorage.setItem("token", token)

        const storageRef = storage.ref(`/images/${avatar.name}`);
        let image_url;

        try {
          await storageRef.put(avatar);
          image_url = await storageRef.getDownloadURL();
        } catch (err) {
          console.log(err)
        }

        const user = {
          email, name, birthdate, country, address, image_url
        }

        if (role === ROLES.Rescuer) {
          const rescuer = await api.post(UserPostPath.Rescuer, user)
          localStorage.setItem('id', rescuer.data._id)
          history.push(HomeRedirection.Rescuer)
        } else if (role === ROLES.Adopter) {
          const adopter = await api.post(UserPostPath.Adopter, user)
          localStorage.setItem('id', adopter.data._id)
          history.push(HomeRedirection.Adopter)
        }
      }
    } catch (error) {
      console.log(error)
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
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
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
              <MenuItem value={ROLES.Adopter}>Adoptante</MenuItem>
              <MenuItem value={ROLES.Rescuer}>Rescatista</MenuItem>
            </Select>
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
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Button color="secondary" style={{ textTransform: 'none' }}>
                ¿Ya tenes una cuenta? Ingresar
              </Button>
            </Link>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  )
}