import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./pages/login";
import Home from "./pages/home";
import MainLayout from "./layout/MainLayout";

import EmployeeLayout from "./layout/EmployeeLayout"; // ✅ new layout
import Employee from "./pages/employees/Employee";
import EmployeeDetail from "./pages/employees/EmployeeDetails";
import CreateEmployee from "./pages/employees/CreateEmployee";
import Departments from "./pages/employees/Departments/Department";
import Tasks from "./pages/employees/Tasks/Task";
import Learning from "./pages/employees/Learnings/Learning";
import Reporting from "./pages/employees/Reportings/Reporting";
import DepartmentDetails from "./pages/employees/Departments/DepartmentDetails";
import CreateDepartment from "./pages/employees/Departments/CreateDepartment";

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
        element: <EmployeeLayout />, // ✅ submenu container
        children: [
          {
            index: true, // default -> /employees
            element: <Employee />,
          },
          {
            path: "create-employee",
            element: <CreateEmployee />,
          },
          {
            path: ":id",
            element: <EmployeeDetail />,
          },
          {
            path: "departments",
            element: <Departments />,
          },
          {
            path: "departments/create",
            element: <CreateDepartment />,
          },
          {
            path: "departments/:id",
            element: <DepartmentDetails />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "learning",
            element: <Learning />,
          },
          {
            path: "reporting",
            element: <Reporting />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
