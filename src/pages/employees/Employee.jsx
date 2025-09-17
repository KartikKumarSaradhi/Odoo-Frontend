"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  BriefcaseBusiness,
  File,
  FileUser,
} from "lucide-react";

// Utility function to sanitize and validate string values
const getValidString = (val) =>
  typeof val === "string" && val.trim() ? val : null;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8069/send_request", {
          params: {
            model: "hr.employee",
          },
          headers: {
            "Content-Type": "application/json",
            login: "admin",
            password: "admin",
            "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
          },
          data: {
            fields: ["id", "name", "work_email", "job_title"],
          },
          withCredentials: true,
        });

      

        if (res.data && Array.isArray(res.data.records)) {
          const cleanEmployees = res.data.records.map((emp) => ({
            id: emp.id,
            name: emp.name || "",
            work_email: emp.work_email || "",
            job_title: emp.job_title || "",
          }));
          setEmployees(cleanEmployees);
          setError(null);
        } else {
          setEmployees([]);
          setError("No employees found.");
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to fetch employees. Please try again later.");
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

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
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
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-8 w-8 text-[#4B0082]" />
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Directory
          </h1>
        </div>

        <div className="flex flex-row justify-between">
          <Button
            className="bg-[#4B0082] text-white"
            onClick={() => navigate("/employees/create-employee")}
          >
            Create Employee
          </Button>

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

        {view === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-slate-100 text-slate-700 text-sm">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Job Title</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">Contract</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                    onClick={() => navigate(`/employees/${emp.id}`)}
                  >
                    {/* Name */}
                    <td className="p-3 flex items-center gap-3">
                      {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold">
                        {getValidString(emp.name)?.charAt(0) || "E"}
                      </div> */}
                      <span className="font-medium text-slate-800">
                        {getValidString(emp.name) || "Unnamed Employee"}
                      </span>
                    </td>

                    {/* Job Title */}
                    <td className="p-3 text-slate-700">
                      {getValidString(emp.job_title) || (
                        <Badge>No Job Title</Badge>
                      )}
                    </td>

                    {/* Email */}
                    <td className="p-3 text-slate-700">
                      {getValidString(emp.work_email) || (
                        <Badge>No Email</Badge>
                      )}
                    </td>

                    {/* Contract */}
                    <td className="p-3 text-slate-700">
                      <Badge variant="secondary">No Contract</Badge>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "kanban" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEmployees.map((emp) => (
              <Card
                key={emp.id}
                className="shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/employees/${emp.id}`)}
              >
                <CardContent className="p-4 flex gap-4">
                  {/* Profile */}
                  {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold text-xl">
                    {getValidString(emp.name)?.charAt(0) || "E"}
                  </div> */}

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-800">
                      {getValidString(emp.name) || "Unnamed Employee"}
                    </h2>
                    <p className="flex text-sm items-center gap-1 text-slate-600">
                      <BriefcaseBusiness className="h-4 w-4" />{" "}
                      {getValidString(emp.job_title) || "No Job Title"}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />{" "}
                      {getValidString(emp.work_email) || "No Email"}
                    </p>
                    {/* <p className="flex items-center gap-1 text-sm text-slate-600">
                      <FileUser className="h-4 w-4" /> No Contract
                    </p> */}
                    <div className="mt-2 flex gap-2">
                      <Badge variant="secondary">Employee</Badge>
                      {emp.job_title?.toLowerCase().includes("consultant") && (
                        <Badge className="bg-blue-100 text-blue-700">
                          Consultant
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Button>
            {Array.from({ length: totalPages }, (_, idx) => (
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
