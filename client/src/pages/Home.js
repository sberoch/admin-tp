import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Favorite, Pets} from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import { Theme } from '../theme/appTheme';
import TopBar from '../components/TopBar';
import { useHistory } from "react-router";
import Footer  from '../assets/footer.jpg';
import { ThemeProvider } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(16),
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Footer})`,
    backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'contain',
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const goToRescuerHome = () => { 
    let path = `homeRescuer`; 
    history.push(path);
  }

  const goToAdopterHome = () => { 
    let path = `homeAdopter`; 
    history.push(path);
  }

  return (
    <ThemeProvider theme={Theme}>
      <div>
        <CssBaseline />
        <TopBar />
        <main>
          {/* Hero unit */}
          <div className={classes.content}>
            <Container maxWidth="xl">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Bienvenido a <Typography variant="h2" color="secondary">Rescue Me!</Typography>
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Seleccione como desea ingresar...
              </Typography>
              <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={goToRescuerHome}>
                      <Favorite className={classes.icon} /> Adoptante
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={goToAdopterHome}>
                      <Pets className={classes.icon} /> Rescatista
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Aca deberia ir un slogan  nashee!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </div>
    </ThemeProvider>
  );
}