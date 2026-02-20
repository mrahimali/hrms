import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceToday, setAttendanceToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all employees
        const empRes = await fetch("http://localhost:8000/api/employees");
        const empData = await empRes.json();
        setTotalEmployees(empData.length);

        // Fetch attendance summary for today from backend
        const attRes = await fetch("http://localhost:8000/api/attandance/attendance-summary-today");
        const attData = await attRes.json();

        setAttendanceToday(attData.present);
        setAbsentToday(attData.absent);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="container mt-4">Loading dashboard...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Employees</h5>
              <p className="card-text display-6">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Attendance Today</h5>
              <p className="card-text display-6">{attendanceToday}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Absent Today</h5>
              <p className="card-text display-6">{absentToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}