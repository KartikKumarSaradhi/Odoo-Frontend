import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Briefcase, Users, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const EmployeeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/employees/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (!res.ok) {
          if (res.status === 404) {
            setError("Employee not found")
          } else {
            setError(`Server error: ${res.status}`)
          }
          setEmployee(null)
          setLoading(false)
          return
        }

        const result = await res.json()
        if (result.success) {
          setEmployee(result.data)
        } else {
          setError(result.message || "Failed to fetch employee")
        }
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading employee details...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate(-1)}>Back to Directory</Button>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-start p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4B0082] to-[#6A1B9A] flex items-center justify-center text-white text-2xl font-bold">
            {employee.name?.charAt(0) || "E"}
          </div>
          <CardTitle className="text-2xl">{employee.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>{employee.work_email || <Badge variant="secondary">N/A</Badge>}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <span>{employee.job_title || <Badge variant="secondary">N/A</Badge>}</span>
          </div>
          {employee.department_id && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{employee.department_id[1]}</span>
            </div>
          )}
          {employee.work_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>{employee.work_phone}</span>
            </div>
          )}
          {employee.mobile_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>{employee.mobile_phone}</span>
            </div>
          )}
          <Button className="mt-4" onClick={() => navigate(-1)}>
            Back to Directory
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeDetail
