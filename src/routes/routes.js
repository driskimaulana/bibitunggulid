import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Account from '../pages/Account/Account';
import Product from '../pages/Product/Product';
import Blog from '../pages/Blog/Blog';
import ProductAdd from '../pages/ProductAdd/ProductAdd';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import ProductEdit from '../pages/ProductEdit/ProductEdit';
import UserList from '../pages/UserList/UserList';
import BlogAdd from '../pages/BlogAdd/BlogAdd';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import BlogEdit from '../pages/BlogEdit/BlogEdit';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'users', element: <UserList /> },
        { path: 'products', element: <Product /> },
        { path: 'blogs', element: <Blog /> },
        { path: 'blogs/add', element: <BlogAdd /> },
        { path: 'blogs/:id', element: <BlogDetails /> },
        { path: 'blogs/edit/:id', element: <BlogEdit /> },
        { path: 'products/add', element: <ProductAdd /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'products/edit/:id', element: <ProductEdit /> },
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
