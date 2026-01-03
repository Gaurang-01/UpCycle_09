import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [myRequests, setMyRequests] = useState([]); // I bought
  const [incomingRequests, setIncomingRequests] = useState([]); // I sold (Pending)
  const [approvedTransactions, setApprovedTransactions] = useState([]); // I sold (Done)

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "requests"));
        const all = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        // 1. My Outgoing Requests
        setMyRequests(all.filter((r) => r.consumerId === user.uid));

        // 2. Incoming Requests (filtered by status)
        const myIncoming = all.filter((r) => r.supplierId === user.uid);
        setIncomingRequests(myIncoming.filter((r) => r.status === "pending"));
        setApprovedTransactions(myIncoming.filter((r) => r.status === "approved"));

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, navigate]);

  /* APPROVE LOGIC */
  const handleApprove = async (req) => {
    try {
      // 1. Mark request as Approved
      await updateDoc(doc(db, "requests", req.id), { status: "approved" });

      // 2. Mark material as Unavailable (Removes from Marketplace)
      await updateDoc(doc(db, "materials", req.materialId), { status: "unavailable" });

      // 3. Move from Incoming -> Approved List in UI
      setIncomingRequests((prev) => prev.filter((r) => r.id !== req.id));
      setApprovedTransactions((prev) => [
        ...prev,
        { ...req, status: "approved" },
      ]);
      
      alert("Order Approved! Item removed from Marketplace.");
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  /* REJECT LOGIC */
  const handleReject = async (req) => {
    try {
      await updateDoc(doc(db, "requests", req.id), { status: "rejected" });
      
      // Update UI to show rejected
      setIncomingRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: "rejected" } : r))
      );
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        {/* USER INFO */}
        <div className="profile-card">
          <div className="profile-avatar">
            {(user?.name || user?.email || "U")[0].toUpperCase()}
          </div>
          <h2>{user?.name || "User"}</h2>
          <p className="profile-email">{user?.email}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-grid">
          {/* 1. PENDING REQUESTS */}
          <div className="profile-section">
            <h3>🔔 Pending Requests (Action Needed)</h3>
            {incomingRequests.length === 0 ? (
              <p className="empty-text">No pending requests.</p>
            ) : (
              incomingRequests.map((req) => (
                <div className="request-card pending" key={req.id}>
                  <div>
                    <strong>{req.materialName}</strong>
                    <p className="sub">Requested by: {req.consumerName}</p>
                  </div>

                  {req.status === "pending" ? (
                    <div className="request-actions">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(req)}
                      >
                        ✔ Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(req)}
                      >
                        ✖ Reject
                      </button>
                    </div>
                  ) : (
                    <span className="status-text rejected">Rejected</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 2. APPROVED ORDERS */}
          <div className="profile-section">
            <h3>✅ Approved Orders (History)</h3>
            {approvedTransactions.length === 0 ? (
              <p className="empty-text">No approved orders yet.</p>
            ) : (
              approvedTransactions.map((req) => (
                <div className="request-card approved" key={req.id}>
                  <div>
                    <strong>{req.materialName}</strong>
                    <p className="sub">Sold to: {req.consumerName}</p>
                  </div>
                  <span className="status-badge approved">SOLD</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. MY PURCHASES */}
        <div className="profile-section full-width">
          <h3>📦 My Purchases / Requests</h3>
          <div className="horizontal-scroll">
            {myRequests.length === 0 ? (
              <p className="empty-text">You haven't requested anything.</p>
            ) : (
              myRequests.map((req) => (
                <div className="request-card" key={req.id}>
                  <div>
                    <strong>{req.materialName}</strong>
                    <p className="sub">Supplier: {req.supplierName}</p>
                  </div>
                  <span className={`status-badge ${req.status}`}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;