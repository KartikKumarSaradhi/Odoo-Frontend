import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const CreateDepartment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    manager_id: "", // Odoo expects an integer ID for manager
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Department name is required");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        model: "hr.department",
        method: "create",
        args: [
          {
            name: formData.name,
            ...(formData.manager_id && { manager_id: parseInt(formData.manager_id) }),
          },
        ],
      };

      const res = await axios.post("http://localhost:8069/send_request", payload, {
        headers: {
          "Content-Type": "application/json",
          login: "admin",
          password: "admin",
          "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
        },
        withCredentials: true,
      });

      if (res.data) {
        toast.success("Department created successfully 🎉");
        navigate("/employees/departments");
      } else {
        throw new Error("Failed to create department");
      }
    } catch (err) {
      console.error("Error creating department:", err);
      toast.error(err.message || "Failed to create department");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Create Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Department Name */}
            <div>
              <Label htmlFor="name">Department Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter department name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Manager (Optional, Odoo Employee ID) */}
            <div>
              <Label htmlFor="manager_id">Manager ID</Label>
              <Input
                id="manager_id"
                name="manager_id"
                type="number"
                placeholder="Enter manager employee ID"
                value={formData.manager_id}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#4B0082] text-white hover:bg-[#6A1B9A] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Department"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDepartment;
