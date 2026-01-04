import { NavLink, Link, useNavigate } from "react-router-dom"; // Added 'Link'
import { useState, useEffect } from "react";
import { auth } from "../../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false); 
      localStorage.removeItem("user"); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

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

        {/* AUTH CHECK */}
        {user ? (
          <div className="auth-section">
            {/* 👇 THIS IS THE FIX: Clickable Link to Profile */}
            <Link to="/profile" className="user-profile-link" onClick={() => setOpen(false)}>
                Hi, {user.email?.split('@')[0]}
            </Link>
            
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/auth" className="auth-link" onClick={() => setOpen(false)}>
            Login / Sign Up
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;