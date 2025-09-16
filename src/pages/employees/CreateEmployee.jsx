import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    work_email: "",
    work_phone: "",
    job_title: "",
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
      toast.error("Name is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8069/send_request",
        {
          model: "hr.employee",
          method: "create",
          args: [formData], // Odoo expects list of values
        },
        {
          headers: {
            "Content-Type": "application/json",
            login: "admin",
            password: "admin",
            "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
          },
          withCredentials: true,
        }
      );

      if (res.data) {
        toast.success("Employee created successfully 🎉");
        navigate("/employees"); // go back to directory
      } else {
        throw new Error("Failed to create employee");
      }
    } catch (err) {
      console.error("Error creating employee:", err);
      toast.error(err.message || "Failed to create employee");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Create Employee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="work_email">Email</Label>
              <Input
                id="work_email"
                type="email"
                name="work_email"
                placeholder="example@company.com"
                value={formData.work_email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="work_phone">Phone</Label>
              <Input
                id="work_phone"
                type="text"
                name="work_phone"
                placeholder="+91-9876543210"
                value={formData.work_phone}
                onChange={handleChange}
              />
            </div>

            {/* Job Title */}
            <div>
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                name="job_title"
                placeholder="Software Engineer"
                value={formData.job_title}
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
                {isLoading ? "Creating..." : "Create Employee"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEmployee;
