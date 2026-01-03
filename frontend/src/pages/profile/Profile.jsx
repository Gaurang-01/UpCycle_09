import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="profile-page">
        {/* LEFT PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-avatar">
            <span>👤</span>
          </div>

          <h2>Gaurang</h2>
          <p className="profile-role">Student</p>

          <div className="profile-info">
            <p>
              <strong>Email:</strong> gaurang@email.com
            </p>
            <p>
              <strong>Joined:</strong> Jan 2026
            </p>
          </div>

          <button className="profile-btn">Edit Profile</button>
        </div>

        {/* RIGHT ACTION CARDS */}
        <div className="profile-actions">
          <div className="action-card">
            <h3>Your Uploads</h3>
            <p>View materials you have uploaded</p>
          </div>

          <div className="action-card">
            <h3>Your Requests</h3>
            <p>Track requested materials</p>
          </div>

          <div className="action-card">
            <h3>Impact Summary</h3>
            <p>See your sustainability contribution</p>
          </div>

          <div className="action-card">
            <h3>Account Settings</h3>
            <p>Manage account preferences</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
