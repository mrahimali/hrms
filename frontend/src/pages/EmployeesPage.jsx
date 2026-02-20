import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const EmployeesPage = () => {
    const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle form
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
    setFormSuccess("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        if (errData.employee_id) setFormError(errData.employee_id);
        else if (errData.email) setFormError(errData.email);
        else if (errData.full_name) setFormError(errData.full_name);
        else setFormError("Failed to add employee");
        return;
      }

      // Instead of appending manually, refetch the list
      await fetchEmployees();

      setFormSuccess("Employee added successfully!");
      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      setShowForm(false);
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      const res = await fetch(`http://localhost:8000/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete employee");

      // Remove employee from state
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employees</h2>

      {/* Add Employee Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Close Form" : "Add Employee"}
      </button>
      {formError && <p className="text-danger">{formError}</p>}
      {formSuccess && <p className="text-success">{formSuccess}</p>}
      {/* Employee Form */}
      {showForm && (
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                className="form-control"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-2">
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Employee Table */}
      {loading && <p>Loading employees...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && employees.length === 0 && (
        <p className="text-muted">No employees found.</p>
      )}

      {!loading && employees.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/attendance/${emp.id}`)}
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
