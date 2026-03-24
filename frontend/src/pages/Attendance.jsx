import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { employeeApi } from "../services/employeeApi";
import { attendanceApi } from "../services/attendanceApi";
import "./Attendance.css";

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const empData = await employeeApi.getAll();
      setEmployees(empData);
      const attendanceData = await attendanceApi.getAll();
      setRecords(attendanceData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await attendanceApi.create({
        employee: employeeId,
        date: date,
        status: status,
      });
      const attendanceData = await attendanceApi.getAll();
      setRecords(attendanceData);
      setMessage("Attendance marked successfully!");
      setIsError(false);
      setEmployeeId("");
      setDate(today);
    } catch (error) {
      setMessage("Error marking attendance!");
      setIsError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="attendance-container">

        {/* ── Mark Attendance ── */}
        <div className="mark-attendance">
          <h1 className="attendance-title">Mark Attendance</h1>
          <div className="attendance-card">
            {message && (
              <div className={isError ? "message-error" : "message-success"}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Employee</label>
                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                >
                  <option value="">-- Select --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  value={date}
                  max={today}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Mark Attendance
              </button>
            </form>
          </div>
        </div>

        {/* ── Attendance Records ── */}
        <div className="attendance-record">
          <h2 className="record-title">Attendance Records</h2>
          <div className="record-card">
            <div className="table-wrapper">
              <table className="record-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", color: "#94a3b8" }}>
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record.id}>
                        <td>{record.employee_name}</td>
                        <td>{record.date}</td>
                        <td className={record.status === "Present" ? "status-present" : "status-absent"}>
                          {record.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Attendance;