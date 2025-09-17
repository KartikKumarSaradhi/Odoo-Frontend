import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [user, setUser] = useState(null);

  const getValidString = (val) =>
    typeof val === "string" && val.trim() ? val : null;

  useEffect(() => {
    // Read user from localStorage
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar always on the left, full height */}
      <Sidebar />

      {/* Right section: header + content */}
      <div className="flex flex-col flex-1">
        {/* Header aligned to the right of sidebar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-3">
          <div className="text-lg font-semibold">Dashboard</div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <span className="font-medium">{user || "Guest"}</span>
            {/* <img
              src={
                user?.image
                  ? `http://localhost:8069/model=res.user${user.image}` // Odoo profile image
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "Guest"
                    )}&background=4B0082&color=fff`
              }
              alt="User"
              className="h-8 w-8 rounded-full"
            /> */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold text-xl">
              {getValidString(user)?.charAt(0) || "E"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
