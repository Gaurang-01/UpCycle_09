import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          {/* AVATAR */}
          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : user.email.charAt(0).toUpperCase()}
          </div>

          {/* NAME */}
          <h2 className="profile-name">
            {user.name || "User"}
          </h2>

          {/* ROLE */}
          <span className={`role-badge ${user.role}`}>
            {user.role === "supplier" ? "Supplier" : "Student"}
          </span>

          {/* INFO */}
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            {user.uid && (
              <p className="uid">
                <strong>User ID:</strong> {user.uid}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="profile-actions">
            <button onClick={() => navigate("/marketplace")}>
              Go to Marketplace
            </button>

            {user.role === "supplier" && (
              <button onClick={() => navigate("/upload")}>
                Upload Material
              </button>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
