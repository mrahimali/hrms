import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { attendanceApi } from "../services/attendanceApi";
import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await attendanceApi.getByEmployee(id);
        setRecords(data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="attendance-page">
        <h1>Employee Attendance</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="attendance-card">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="2">No attendance records found</td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td
                        className={
                          record.status === "Present"
                            ? "status-present"
                            : "status-absent"
                        }
                      >
                        {record.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
