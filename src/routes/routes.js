import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Account from '../pages/Account/Account';
import Product from '../pages/Product/Product';
import Blog from '../pages/Blog/Blog';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'users', element: <Account /> },
        { path: 'products', element: <Product /> },
        { path: 'blogs', element: <Blog /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
