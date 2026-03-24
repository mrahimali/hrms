import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { attendanceApi } from "../services/attendanceApi";
import { employeeApi } from "../services/employeeApi";
import "./Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    total_employees: 0,
    present: 0,
    absent: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [employees, attendanceSummary] = await Promise.all([
          employeeApi.getAll(),
          attendanceApi.getTodaySummary(),
        ]);

        setSummary({
          total_employees: employees.length,
          present: attendanceSummary.present,
          absent: attendanceSummary.absent,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="cards-container">
            <div className="dashboard-card total">
              <h3>Total Employees</h3>
              <p>{summary.total_employees}</p>
            </div>

            <div className="dashboard-card present">
              <h3>Present Today</h3>
              <p>{summary.present}</p>
            </div>

            <div className="dashboard-card absent">
              <h3>Absent Today</h3>
              <p>{summary.absent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
