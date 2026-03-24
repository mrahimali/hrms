import "./Employees.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { employeeApi } from "../services/employeeApi";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    employee_id: "",
    email: "",
    department: "",
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeApi.getAll();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
    try {
      await employeeApi.delete(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await employeeApi.create(formData);
      const data = await employeeApi.getAll();
      setEmployees(data);
      setFormData({ full_name: "", employee_id: "", email: "", department: "" });
      setShowForm(false);
    } catch (error) {
      if (error.response?.data) {
        const backendErrors = error.response.data;
        const formattedMessage = Object.values(backendErrors)
          .map((err) => {
            if (Array.isArray(err)) return err.join(" ");
            if (typeof err === "object") return Object.values(err).flat().join(" ");
            return err;
          })
          .join(" ");
        setErrorMessage(formattedMessage);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      {/* inline style hata diya — CSS class handle karegi */}
      <div className="employees-container">
        <h1 className="title">Employees</h1>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Employee"}
        </button>

        {showForm && (
          <div className="form-card">
            <h2>Add Employee</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
              <input type="text" name="employee_id" placeholder="Employee ID" value={formData.employee_id} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
              <button type="submit" className="submit-btn">Save Employee</button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-card">
            {/* table-wrapper se scroll handle hoga */}
            <div className="table-wrapper">
              {/* border aur cellPadding hata diye — CSS handle karega */}
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Employee Id</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8" }}>
                        No employees found
                      </td>
                    </tr>
                  ) : (
                    employees.map((emp) => (
                      <tr key={emp.id}>
                        <td>{emp.full_name}</td>
                        <td>{emp.employee_id}</td>
                        <td>{emp.email}</td>
                        <td>{emp.department}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="view-btn" onClick={() => navigate(`/employees/${emp.id}/attendance`)}>
                              View Attendance
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(emp.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;