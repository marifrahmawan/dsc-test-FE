import MainPage from '@/pages';
import AddProduct from '@/pages/addProduct';
import EditProduct from '@/pages/editProduct';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/create',
    element: <AddProduct />,
  },
  {
    path: '/edit/:productId',
    element: <EditProduct />,
  },
]);
