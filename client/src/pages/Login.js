import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import { useAuth } from '../contexts/AuthContext'
import AlertMessage from '../components/AlertMessage'

const validationSchema = yup.object({
  email: yup
    .string('Ingresa tu email')
    .email('Ingresa un email valido')
    .required('Se requiere un email'),
  password: yup
    .string('Ingresa tu contaseña')
    .required('Se requiere una contaseña'),
});

export default function LoginForm() {
  const { login } = useAuth()
  const [ openedAlert, setOpenedAlert ] = useState(false)
  const [ messageAlert, setMessageAlert ] = useState("")
  // const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        handleSubmit(values)
    },
  });

  const handleSubmit = async (values) => {
    console.log("ASdddd")
    login(values.email, values.password).then((userCredential) => {
      const token = userCredential.user.getIdToken(); 
      localStorage.setItem("token", token) // save id token in localStorage
    })
    .catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      setMessageAlert(errorMessage)
      setOpenedAlert(true)
    });
    
  }


  return (
    <form onSubmit={formik.handleSubmit}>
      <AlertMessage open={openedAlert} setOpen={setOpenedAlert} message={messageAlert} severity="error"/>
      <Grid container spacing={3} justify="center">
        <Grid item xs={7} align="center">
          <Typography variant="h2" color="primary">Rescue Me</Typography>
        </Grid>
        <Grid item xs={7}>
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
        <Grid item xs={7}>
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
        <Grid item xs={7}>
          <Button 
            size="large"
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit"
          >
          Conectarme
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Divider />
        </Grid>

        <Grid item xs={7}>
          <Link to='/signup'>
  	        <Button color="primary" style={{textTransform: 'none'}}>
  	          ¿No tenes cuenta? Registrarse
  	        </Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}
