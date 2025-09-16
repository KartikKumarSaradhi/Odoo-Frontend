"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  List,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

const getValidString = (val) =>
  typeof val === "string" && val.trim() ? val : null;

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:8069/send_request", {
          params: {
            model: "hr.department",
          },
          headers: {
            "Content-Type": "application/json",
            login: "admin",
            password: "admin",
            "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
          },
          data: {
            fields: ["id", "name", "manager_id", "member_ids"],
          },
          withCredentials: true,
        });

        if (res.data && Array.isArray(res.data.records)) {
          const cleanDepartments = res.data.records.map((dept) => ({
            id: dept.id,
            name: dept.name || "",
            manager: Array.isArray(dept.manager_id)
              ? dept.manager_id[1] // [id, "Manager Name"]
              : "",
            employeesCount: Array.isArray(dept.member_ids)
              ? dept.member_ids.length
              : 0,
          }));
          setDepartments(cleanDepartments);
          setError(null);
        } else {
          setDepartments([]);
          setError("No departments found.");
        }
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setError("Failed to fetch departments. Please try again later.");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDepartments = departments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading departments...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (!departments.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No departments found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="h-8 w-8 text-[#4B0082]" />
          <h1 className="text-3xl font-bold text-slate-800">
            Department Directory
          </h1>
        </div>

        <div className="flex flex-row justify-between">
          <Button
            className="bg-[#4B0082] text-white"
            onClick={() => navigate("/employees/departments/create")}
          >
            Create Department
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
                  <th className="p-3 text-left">Department Name</th>
                  <th className="p-3 text-center">Manager</th>
                  <th className="p-3 text-center">Employees</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDepartments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                    onClick={() => navigate(`/employees/departments/${dept.id}`)}
                  >
                    {/* Department Name */}
                    <td className="p-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold">
                        {getValidString(dept.name)?.charAt(0) || "D"}
                      </div>
                      <span className="font-medium text-slate-800">
                        {getValidString(dept.name) || "Unnamed Department"}
                      </span>
                    </td>

                    {/* Manager */}
                    <td className="p-3 text-center text-slate-700">
                      {getValidString(dept.manager) || (
                        <Badge>No Manager</Badge>
                      )}
                    </td>

                    {/* Employee Count */}
                    <td className="p-3 text-center text-slate-700">
                      <Badge variant="secondary">
                        {dept.employeesCount} Employees
                      </Badge>
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
            {currentDepartments.map((dept) => (
              <Card
                key={dept.id}
                className="shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/employees/departments/${dept.id}`)}
              >
                <CardContent className="p-4 flex gap-4">
                  {/* Profile */}
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white font-bold">
                    {getValidString(dept.name)?.charAt(0) || "D"}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-slate-800">
                      {getValidString(dept.name) || "Unnamed Department"}
                    </h2>
                    <p className="flex text-sm items-center gap-1 text-slate-600">
                      <User className="h-4 w-4" />{" "}
                      {getValidString(dept.manager) || "No Manager"}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-slate-600">
                      <Users className="h-4 w-4" /> {dept.employeesCount}{" "}
                      Employees
                    </p>
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

export default Departments;
