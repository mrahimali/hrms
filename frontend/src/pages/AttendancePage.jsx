import React, { useEffect, useState } from "react";

const AttendancePage = () => {
    const today = new Date().toISOString().split("T")[0]; // e.g., "2026-02-20"
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Fetch employees
  useEffect(() => {
    fetch("http://localhost:8000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch attendance records
  useEffect(() => {
    fetch("http://localhost:8000/api/attandance")
      .then((res) => res.json())
      .then((data) => {
        setAttendanceRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrors({ general: "Failed to load attendance" });
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); // clear errors on change
    setSuccess("");
  };

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/attandance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        // If backend sends field-wise errors
        if (errData.employee) {
          setErrors({ employee: errData.employee });
        } else if (errData.date) {
          setErrors({ date: errData.date });
        } else if (errData.status) {
          setErrors({ status: errData.status });
        } else if (errData.detail) {
          setErrors({ general: errData.detail });
        } else {
          setErrors({ general: "Failed to mark attendance" });
        }
        return;
      }

      const data = await res.json();
      setAttendanceRecords((prev) => [...prev, data]);
      setSuccess("Attendance marked successfully!");
      setFormData({ employee: "", date: "", status: "Present" });
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance</h2>

      {/* Form */}
      <form className="mb-4" onSubmit={handleSubmit}>
        {errors.general && <p className="text-danger">{errors.general}</p>}
        {success && <p className="text-success">{success}</p>}

        <div className="row g-3">
          {/* Employee */}
          <div className="col-md-4">
            <label className="form-label">Employee</label>
            <select
              className={`form-select ${errors.employee ? "is-invalid" : ""}`}
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
            {errors.employee && (
              <div className="invalid-feedback">{errors.employee}</div>
            )}
          </div>

          {/* Date */}
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={today}
              required
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>

          {/* Status */}
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status}</div>
            )}
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="submit">
              Mark
            </button>
          </div>
        </div>
      </form>

      {/* Attendance Table */}
      {loading && <p>Loading attendance records...</p>}
      {!loading && attendanceRecords.length === 0 && (
        <p className="text-muted">No attendance records found.</p>
      )}
      {!loading && attendanceRecords.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((att) => (
                <tr key={att.id}>
                  <td>{att.full_name || att.employee}</td>
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

export default AttendancePage;