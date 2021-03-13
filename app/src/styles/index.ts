import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b69f58',
      light: '#656565',
    },
    secondary: {
      main: '#0047CC',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Helvetica',
    fontSize: 13,
    h5: {
      fontFamily: 'MillerBannerLight',
      fontSize: 20,
    },
    subtitle1: {
      color: '#656565',
      fontSize: 15,
    },
    subtitle2: {
      color: '#656565',
      fontSize: 13,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'white',
        },
      },
    },
  },
});
