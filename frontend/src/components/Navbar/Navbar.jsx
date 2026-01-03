import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="nav-logo">
        <NavLink to="/">UpCycle Connect</NavLink>
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* LINKS */}
      <div className={`nav-links ${open ? "active" : ""}`}>
        <NavLink to="/marketplace" className="nav-link" onClick={() => setOpen(false)}>Marketplace</NavLink>
        <NavLink to="/request" className="nav-link" onClick={() => setOpen(false)}>Request</NavLink>
        <NavLink to="/upload" className="nav-link" onClick={() => setOpen(false)}>Upload</NavLink>
        <NavLink to="/map" className="nav-link" onClick={() => setOpen(false)}>Map</NavLink>
        <NavLink to="/impact" className="nav-link" onClick={() => setOpen(false)}>Impact</NavLink>

        <NavLink to="/auth" className="auth-link" onClick={() => setOpen(false)}>
          Login / Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
