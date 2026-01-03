import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      {/* LOGO */}
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
          to="/request"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Request
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
          to="/map"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Map
        </NavLink>

        <NavLink
          to="/impact"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Impact
        </NavLink>

        {/* AUTH / PROFILE (POSITION UNCHANGED) */}
        {user ? (
          <NavLink to="/profile" className="auth-link">
            {user.name ? user.name.split(" ")[0] : "Profile"}
          </NavLink>
        ) : (
          <NavLink to="/auth" className="auth-link">
            Login / Sign Up
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
