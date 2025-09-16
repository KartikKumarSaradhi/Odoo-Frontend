import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const EmployeeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subMenus = [
    { id: "employees", name: "Employees", path: "/employees" },
    { id: "departments", name: "Departments", path: "/employees/departments" },
    { id: "tasks", name: "Tasks", path: "/employees/tasks" },
    { id: "learning", name: "Learning", path: "/employees/learning" },
    { id: "reporting", name: "Reporting", path: "/employees/reporting" },
  ];

  // Initialize activeItem from current location
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Submenu Bar */}
      <div className="flex border-b bg-white shadow-sm px-4">
        {subMenus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => handleNavigation(menu.path)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeItem === menu.path
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {menu.name}
          </button>
        ))}
      </div>

      {/* Subpages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
