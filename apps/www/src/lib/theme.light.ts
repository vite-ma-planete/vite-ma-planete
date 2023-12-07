import { createTheme } from '@mui/material';

const defaultTheme = createTheme();
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#6e83d0',
    },
    secondary: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: 'transparent',
          borderRadius: '10000px',
          ':hover': {
            borderColor: defaultTheme.palette.divider,
          },
        },
      },
    },
  },
});

export default lightTheme;
