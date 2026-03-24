import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={{ position: "relative" }}>
      <div className="container">
        <h1>
          <Link to="/" onClick={closeMenu}>HRMS</Link>
        </h1>

        {/* Desktop links */}
        <div className="links">
          <Link to="/">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/attendance">Attendance</Link>
        </div>

        {/* Hamburger — always rendered, shown/hidden via CSS */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Dashboard</Link>
        <Link to="/employees" onClick={closeMenu}>Employees</Link>
        <Link to="/attendance" onClick={closeMenu}>Attendance</Link>
      </nav>
    </div>
  );
};

export default Navbar;