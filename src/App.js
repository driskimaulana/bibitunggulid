import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ThemeProvider, createTheme } from '@mui/material';
import Router from './routes/routes';

// ----------------------------------------------------------------------

const theme = createTheme({
  palette: {
    primary: {
      main: '#464646',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ProSidebarProvider>
            <Router />
          </ProSidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
