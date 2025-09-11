import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {

  FileText,
  IndianRupee,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  SidebarOpen,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Home = () => {

  const [user, setUser] = useState({name:"User"})





  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,231.89",
      change: "+20.1%",
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Active Customer",
      value: "2,350",
      change: "+180.1%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Pending Orders",
      value: "12,234",
      change: "+19%",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      title: "Inventory Items",
      value: "573",
      change: "+201",
      icon: Package,
      color: "text-purple-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New order received",
      customer: "John Doe",
      time: "2 minutes ago",
      status: "new",
    },
    {
      id: 2,
      action: "Invoice generated",
      customer: "ABC Corp",
      time: "15 minutes ago",
      status: "completed",
    },
    {
      id: 3,
      action: "Payment received",
      customer: "XYZ Ltd",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: 4,
      action: "Inventory updated",
      customer: "System",
      time: "2 hours ago",
      status: "info",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header section */}

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2">
                Welcome back, {user.name}
              </h2>
              <p className="text-[#6C757D]">
                Here's what's happening with your business today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-[#E9ECEF] bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#6C757D]">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#2C2C2C]">
                      {stat.value}
                    </div>
                    <p className="text-xs text-[#6C757D]">
                      <span className="text-green-600">{stat.change}</span> from
                      last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <Card className="lg:col-span-2 border-[#E9ECEF] bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2C2C2C]">
                    <TrendingUp className="mr-2 h-5 w-5 text-[#4B0082]" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription className="text-[#6C757D]">
                    Latest updates from your business operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#F8F9FA]"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#2C2C2C]">
                            {activity.action}
                          </p>
                          <p className="text-xs text-[#6C757D]">
                            {activity.customer}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              activity.status === "new"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              activity.status === "new"
                                ? "bg-[#4B0082] text-white"
                                : "bg-[#f3af10] text-[#2C2C2C]"
                            }
                          >
                            {activity.status}
                          </Badge>
                          <span className="text-xs text-[#6C757D]">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#2C2C2C]">
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-[#6C757D]">
                    Frequently used operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-[#4B0082] hover:bg-[#4B0082]/90 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Create Order
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-[#E9ECEF] text-[#2C2C2C] hover:bg-[#f3af10]"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Add Employee
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-[#E9ECEF] text-[#2C2C2C] hover:bg-[#f3af10]"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Invoice
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-[#E9ECEF] text-[#2C2C2C] hover:bg-[#f3af10]"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Update Inventory
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
