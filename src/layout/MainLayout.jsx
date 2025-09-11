import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen">
     

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-3">
          {/* Company Branding */}
          <div className="flex items-center space-x-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZl1p-xw3V3jDeKzwrQ2fY3WybXlULkdrnPw&s" 
             
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold text-blue-600">
              Aashdit Technologies
            </h1>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <span className="font-medium">JD</span>
            <img
              src="https://ui-avatars.com/api/?name=JD&background=4B0082&color=fff"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </header>
        <div className="flex flex-row"> 
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
          <Outlet />
        </main>

        </div>
        
      </div>
    </div>
  );
}

export default MainLayout;
