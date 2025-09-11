import { BarChart3, Calendar, CreditCard, FileText, Package, Percent, Settings, ShoppingCart, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import Employee from '@/pages/employees/Employee';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", path: "/dashboard", },
    { icon: Users, label: "Employees", path: "/employees"},
    { icon: ShoppingCart, label: "Sales", path: "/sales" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: FileText, label: "Invoicing", path: "/invoicing" },
    { icon: CreditCard, label: "Payroll", path: "/payroll"},
    { icon: Percent, label: "Accounting", path: "/accounting" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div>
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 bg-[#F8F9FA] border-r border-[#E9ECEF] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full pt-4">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start ${
                  location.pathname === item.path
                    ? "bg-[#4B0082] text-white hover:bg-[#4B0082]/90"
                    : "text-[#2C2C2C] hover:bg-[#f3af10] hover:text-[#2C2C2C]"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
