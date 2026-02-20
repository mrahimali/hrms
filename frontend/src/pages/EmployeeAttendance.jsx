import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmployeeAttendance = () => {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee info
    fetch(`http://localhost:8000/api/employees/${employeeId}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch(() => setEmployee(null));
  }, [employeeId]);

  useEffect(() => {
    // Fetch attendance records for this employee
    fetch(`http://localhost:8000/api/attandance?employee=${employeeId}`)
      .then((res) => res.json())
      .then((data) => setAttendanceRecords(data))
      .finally(() => setLoading(false));
  }, [employeeId]);

  if (loading) return <p>Loading attendance records...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Attendance Records for {employee ? employee.full_name : "Employee"}
      </h2>
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Employees
      </Link>

      {attendanceRecords.length === 0 ? (
        <p className="text-muted">No attendance records found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((att) => (
                <tr key={att.id}>
                  <td>{att.date}</td>
                  <td>{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;