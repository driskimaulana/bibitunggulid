import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

import Dashboard from '../pages/Dashboard/Dashboard';
import Product from '../pages/Products/ProductList/Product';
import ProductAdd from '../pages/Products/ProductAdd/ProductAdd';
import UserList from '../pages/User/UserList/UserList';
import SignIn from '../pages/SignIn/SignIn';
import ProductDetails from '../pages/Products/ProductDetails/ProductDetails';
import ProductEdit from '../pages/Products/ProductEdit/ProductEdit';
import CategoryList from '../pages/Category/CategoryList/CategoryList';
import AddCategory from '../pages/Category/AddCategory/AddCategory';
import SupplierList from '../pages/Suppliers/SupplierList/SuppliersList';
import AddSupplier from '../pages/Suppliers/AddSupplier/AddSupplier';
import AddUser from '../pages/User/AddUsers/AddUser';
import OrderList from '../pages/Orders/OrderList/OrderList';
import PlatList from '../pages/Plants/PlantList/PlantList';
import AddPlant from '../pages/Plants/AddPlant/AddPlant';

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
        { path: 'users/add', element: <AddUser /> },
        { path: 'products', element: <Product /> },
        { path: 'products/add', element: <ProductAdd /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'products/edit/:id', element: <ProductEdit /> },
        { path: 'category', element: <CategoryList /> },
        { path: 'category/add', element: <AddCategory /> },
        { path: 'suppliers', element: <SupplierList /> },
        { path: 'suppliers/add', element: <AddSupplier /> },
        { path: 'orders', element: <OrderList /> },
        { path: 'plants', element: <PlatList /> },
        { path: 'plants/add', element: <AddPlant /> },
      ],
    },
  ]);

  return routes;
}
