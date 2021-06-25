import { createMuiTheme } from '@material-ui/core/styles';
import { green, teal } from '@material-ui/core/colors';

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: green[400],
    },
    secondary: {
      main: teal[200]
    },
  },
});