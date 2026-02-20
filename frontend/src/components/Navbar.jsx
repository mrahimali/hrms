import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          HRMS Lite
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold" : "")
                }
              >
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold" : "")
                }
              >
                Attendance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold" : "")
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
