import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { ProSidebarProvider } from 'react-pro-sidebar';
import Router from './routes/routes';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ProSidebarProvider>
          <Router />
        </ProSidebarProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
