import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [myRequests, setMyRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    getDocs(collection(db, "requests")).then((snapshot) => {
      const all = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyRequests(
        all.filter((r) => r.consumerId === user.uid)
      );

      setIncomingRequests(
        all.filter((r) => r.supplierId === user.uid)
      );
    });
  }, [user, navigate]);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "requests", id), {
      status,
    });

    setIncomingRequests((prev) =>
      prev.filter((r) => r.id !== id)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            {(user.name || user.email)[0].toUpperCase()}
          </div>
          <h2>{user.name || "User"}</h2>
          <p>{user.email}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-section">
          <h3>My Requests</h3>
          {myRequests.map((req) => (
            <div className="request-card" key={req.id}>
              <strong>{req.materialName}</strong>
              <span className={`status ${req.status}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>

        {incomingRequests.length > 0 && (
          <div className="profile-section">
            <h3>Requests on My Materials</h3>

            {incomingRequests.map((req) => (
              <div className="request-card" key={req.id}>
                <div>
                  <strong>{req.materialName}</strong>
                  <p className="sub">
                    Requested by: {req.consumerName}
                  </p>
                </div>

                <div className="request-actions">
                  <button
                    className="approve-btn"
                    onClick={() =>
                      updateStatus(req.id, "approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateStatus(req.id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
