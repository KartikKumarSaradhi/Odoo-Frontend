import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { View } from "lucide-react";

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees/create-employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends cookies with token
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create employee");

      toast.success("Employee created successfully 🎉");
      navigate("/Home");
    } catch (err) {
      console.error("Error creating employee:", err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="bg-white border-2 border-slate-200 text-[#2C2C2C] hover:bg-[#4B0082] hover:text-white transition-colors" 
            disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Employee"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEmployee;
``