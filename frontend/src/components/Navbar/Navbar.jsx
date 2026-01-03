import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* LOGO / BRAND */}
      <div className="nav-logo">
        <NavLink to="/">UpCycle Connect</NavLink>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Marketplace
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Upload
        </NavLink>

        <NavLink
          to="/impact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Impact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
