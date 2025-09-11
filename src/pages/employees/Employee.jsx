"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Grid3X3,
  List,
  Mail,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/employees", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const result = await res.json();
        console.log("API result:", result);

        if (result.success) {
          const dataArray = Array.isArray(result.data)
            ? result.data
            : Object.values(result.data);
          setEmployees(dataArray);
        } else {
          console.warn("API returned unsuccessful response:", result.message);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading employees...</p>
      </div>
    );

  if (!employees.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No employees found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-8 w-8 text-[#4B0082]" />
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Directory
          </h1>
        </div>

        <div className="flex flex-row justify-between">
            <Button className={
                view === "list"
                  ? "bg-[#4B0082] text-white"
                  : "bg-white border-2 border-slate-200 text-[#2C2C2C]"
              }
              onClick={() => navigate("/employees/create-employee")}
              >Create Employee</Button>
          {/* View Switch */}
          <div className="flex gap-3 mb-6">
            <Button
              className={
                view === "list"
                  ? "bg-[#4B0082] text-white"
                  : "bg-white border-2 border-slate-200 text-[#2C2C2C]"
              }
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-2" /> List View
            </Button>
            <Button
              className={
                view === "kanban"
                  ? "bg-[#4B0082] text-white"
                  : "bg-white border-2 border-slate-200 text-[#2C2C2C]"
              }
              onClick={() => setView("kanban")}
            >
              <Grid3X3 className="h-4 w-4 mr-2" /> Kanban View
            </Button>
          </div>
        </div>

        {/* Employee List */}
        {view === "list" && (
          <div className="space-y-2">
            {currentEmployees.map((emp) => (
              <Card
                key={emp.id}
                className="shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/employees/${emp.id}`)}
              >
                <CardContent className="flex items-center justify-between gap-4">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold">
                      {emp.name?.charAt(0) || "E"}
                    </div>
                    <span className="font-medium text-slate-800">
                      {emp.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-1 text-sm text-slate-700 truncate">
                    <Mail className="h-4 w-4" />
                    {emp.work_email || <Badge variant="secondary">N/A</Badge>}
                  </div>

                  {/* Job Title */}
                  <div className="flex items-center gap-1 text-sm text-slate-700 truncate">
                    <Briefcase className="h-4 w-4" />
                    {emp.job_title || <Badge variant="secondary">N/A</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Kanban View */}
        {view === "kanban" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEmployees.map((emp) => (
              <Card
                key={emp.id}
                className="shadow-md hover:shadow-xl transition-all text-center cursor-pointer"
                onClick={() => navigate(`/employees/${emp.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold text-xl">
                    {emp.name?.charAt(0) || "E"}
                  </div>
                  <CardTitle>{emp.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {emp.job_title ? (
                    <Badge className="bg-[#4B0082]/10 text-[#4B0082]">
                      {emp.job_title}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">No Title</Badge>
                  )}
                  {emp.work_email && (
                    <p className="truncate">{emp.work_email}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={
                  currentPage === idx + 1
                    ? "bg-[#4B0082] text-white"
                    : "bg-white border-2 border-slate-200"
                }
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
