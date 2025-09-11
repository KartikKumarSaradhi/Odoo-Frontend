import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './pages/login'
import Home from './pages/home';
import MainLayout from './layout/MainLayout';
import Employee from './pages/employees/Employee';
import EmployeeDetail from './pages/employees/EmployeeDetails';
import CreateEmployee from './pages/employees/CreateEmployee';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "employees",
        element: <Employee />,
      },
      {
        path: "employees/:id", 
        element: <EmployeeDetail />,
      },
      {
        path:"employees/create-employee",
        element: <CreateEmployee />
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
