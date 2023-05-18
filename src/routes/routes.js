import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Product from '../pages/Product/Product';
import Blog from '../pages/Blog/Blog';
import ProductAdd from '../pages/ProductAdd/ProductAdd';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import ProductEdit from '../pages/ProductEdit/ProductEdit';
import UserList from '../pages/UserList/UserList';
import BlogAdd from '../pages/BlogAdd/BlogAdd';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import BlogEdit from '../pages/BlogEdit/BlogEdit';
import SignIn from '../pages/SignIn/SignIn';

// ----------------------------------------------------------------------

export default function Router() {
  // window.location.href = adminLoggedIn === null ? '/signin' : '/dashboard';
  const routes = useRoutes([
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
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
  ]);

  return routes;
}
