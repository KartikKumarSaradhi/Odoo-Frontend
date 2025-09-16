import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  IndianRupee,
  Briefcase,
  FileText,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import React from "react";

const COLORS = ["#4B0082", "#FF9800", "#03A9F4", "#8BC34A", "#E91E63"];

// --- SAMPLE DATA --- //
const departmentData = [
  { name: "Finance", value: 20 },
  { name: "HR", value: 10 },
  { name: "Tech", value: 40 },
  { name: "Design", value: 15 },
  { name: "Others", value: 5 },
];

const attendanceData = [
  { branch: "HQ", attendance: 95, leaves: 5 },
  { branch: "Branch A", attendance: 88, leaves: 12 },
  { branch: "Branch B", attendance: 92, leaves: 8 },
];

const leaveData = [
  { id: 1, name: "Diwali", date: "2025-11-12" },
  { id: 2, name: "Christmas", date: "2025-12-25" },
];

const employeesOnLeave = [
  { id: 1, name: "Rahul", dept: "Finance" },
  { id: 2, name: "Ayesha", dept: "Tech" },
];

const payrollData = {
  paid: 45,
  totalPaid: "₹12,50,000",
  pending: 5,
  toBePaid: "₹1,20,000",
};

const recruitmentStats = {
  open: 8,
  resumes: 120,
  hires: 2,
  exits: 1,
};

const Dashboard = () => {
  const totalEmployees = departmentData.reduce((a, c) => a + c.value, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-3xl font-bold text-[#2C2C2C]">
            HR Dashboard
          </h2>
          <p className="text-[#6C757D]">
            Overview of employees, payroll, attendance and recruitment
          </p>
        </div>

        {/* Employee Management */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Employee Management</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#4B0082]" />
                  Employees by Department
                </CardTitle>
                <CardDescription>
                  Distribution across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalEmployees}</p>
                </CardContent>
              </Card>
              {departmentData.map((dept, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{dept.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Management */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Attendance Management</h3>
          <Card>
            <CardHeader>
              <CardTitle>Branch Attendance & Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#4B0082" />
                  <Bar dataKey="leaves" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Leave Management */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Leave Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Holidays</CardTitle>
              </CardHeader>
              <CardContent>
                {leaveData.map((holiday) => (
                  <p key={holiday.id} className="text-sm">
                    {holiday.name} – {holiday.date}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employees on Leave</CardTitle>
              </CardHeader>
              <CardContent>
                {employeesOnLeave.map((emp) => (
                  <p key={emp.id} className="text-sm">
                    {emp.name} ({emp.dept})
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payroll */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Payroll</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employees Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{payrollData.paid}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Amount Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{payrollData.totalPaid}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{payrollData.pending}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Amount to be Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{payrollData.toBePaid}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recruitment */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Recruitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{recruitmentStats.open}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resumes Received</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{recruitmentStats.resumes}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Today Hires</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{recruitmentStats.hires}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Today Exits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{recruitmentStats.exits}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vendor Management (placeholder) */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Vendor Management</h3>
          <Card>
            <CardHeader>
              <CardTitle>Vendors Overview</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
