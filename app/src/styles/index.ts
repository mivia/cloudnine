import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b69f58',
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
    h5: {
      fontFamily: 'MillerBannerLight',
    },
    fontSize: 13,
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
