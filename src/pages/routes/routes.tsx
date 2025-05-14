import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../Dashboard';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);
