import { useState } from "react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Blocks,
  Calendar,
  ChevronLeft,
  CreditCard,
  FileText,
  Package,
  Percent,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Blocks, path: "/dashboard" },
  { id: "employees", label: "Employees", icon: Users, path: "/employees" },
  { id: "sales", label: "Sales", icon: ShoppingCart, path: "/sales" },
  { id: "inventory", label: "Inventory", icon: Package, path: "/inventory" },
  { id: "invoicing", label: "Invoicing", icon: FileText, path: "/invoicing" },
  { id: "payroll", label: "Payroll", icon: CreditCard, path: "/payroll" },
  { id: "accounting", label: "Accounting", icon: Percent, path: "/accounting" },
  { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  return (
    <div
      className={`flex flex-col bg-[#F8F9FA] border-r border-[#E9ECEF] transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#E9ECEF]">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZl1p-xw3V3jDeKzwrQ2fY3WybXlULkdrnPw&s"
              className="h-8 w-8"
            />
            <h2 className="text-lg font-semibold text-[#2C2C2C]">
              Aashdit Technologies
            </h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#2C2C2C]"
        >
          {isCollapsed ? (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZl1p-xw3V3jDeKzwrQ2fY3WybXlULkdrnPw&s"
              className="h-4 w-4"
            />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.path;

            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left transition-colors ${
                    isActive
                      ? "bg-[#4B0082] text-white hover:bg-[#4B0082]/90"
                      : "text-[#2C2C2C] hover:bg-[#f3af10] hover:text-[#2C2C2C]"
                  } ${isCollapsed ? "justify-center px-2" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className={`h-5 w-5 ${!isCollapsed ? "mr-3" : ""}`} />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Button>
                {isCollapsed && (
                  <div className="text-xs text-center text-[#2C2C2C]/70 mt-1 px-1">
                    {item.label}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
