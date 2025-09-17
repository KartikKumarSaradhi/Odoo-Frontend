import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";
import axios from "axios";

const DepartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // Fetch department details
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get("http://localhost:8069/send_request", {
          params: {
            model: "hr.department",
            Id: id,
            fields: JSON.stringify([
              "id",
              "name",
              "manager_id",
              "company_id",
              "note",
            ]),
          },
          headers: {
            "Content-Type": "application/json",
            login: "admin",
            password: "admin",
            "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
          },
          withCredentials: true,
        });

        if (res.data?.records?.length > 0) {
          setDepartment(res.data.records[0]);
          setEditedData(res.data.records[0]);
          setError("");
        } else {
          setDepartment(null);
          setError("Department not found");
        }
      } catch (err) {
        console.error("Error fetching department:", err);
        setError("Failed to fetch department");
        setDepartment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle edit input change
  const handleChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  // Save department updates
  const handleSave = async () => {
    try {
      const payload = {
        values: {
          name: editedData.name,
          note: editedData.note,
          // usually manager_id and company_id are relational fields, better handled separately
        },
      };

      await axios.put("http://localhost:8069/send_request", payload, {
        params: { model: "hr.department", Id: id },
        headers: {
          "Content-Type": "application/json",
          login: "admin",
          password: "admin",
          "api-key": "71bd6298-ac2d-400c-aa5d-a742d3c2cef8",
        },
        withCredentials: true,
      });

      setDepartment({ ...department, ...payload.values });
      setEditMode(false);
    } catch (err) {
      console.error("Error updating department:", err);
      alert("Failed to update department");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading department details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-start p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {department.name}
              </h2>
              <p className="text-slate-600">
                Department ID: {department.id}
              </p>
            </div>

            {/* Edit / Save / Cancel */}
            {editMode ? (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex gap-1">
                  <Save size={18} /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditedData(department);
                    setEditMode(false);
                  }}
                  className="flex gap-1"
                >
                  <X size={18} /> Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)} className="flex gap-1">
                <Pencil size={18} /> Edit
              </Button>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(department).map(([key, value]) => (
              <div key={key} className="flex flex-col border-b pb-2 last:border-0">
                <span className="text-sm font-medium text-slate-500">
                  {key.replace(/_/g, " ").toUpperCase()}
                </span>
                {editMode && typeof value !== "object" ? (
                  <Input
                    value={editedData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : (
                  <span className="text-slate-800">
                    {Array.isArray(value)
                      ? value[1] || value[0] // relational fields (like manager_id)
                      : value?.toString() || "N/A"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentDetails;
