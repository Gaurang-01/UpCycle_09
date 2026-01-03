import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore
import { db } from "../../firebase"; // Import db instance
import Navbar from "../../components/Navbar/Navbar";
import "./RequestMaterial.css";

function RequestMaterial() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login to submit a request");
      navigate("/auth");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    materialName: "",
    category: "Metal",
    quantity: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      // Save to Firestore "market_requests" collection
      await addDoc(collection(db, "market_requests"), {
        ...form,
        requesterId: user.uid,
        requesterName: user.name || user.email,
        requesterEmail: user.email,
        createdAt: new Date(),
        status: "open", // open request
        type: "general_request"
      });

      alert("Request submitted successfully! It is now visible in the Marketplace.");
      navigate("/marketplace");
      
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="request-container">
        <h2>Post a Requirement</h2>
        <p className="sub-text">Can't find what you need? Post a request here.</p>

        <form className="request-form" onSubmit={handleSubmit}>
          <input
            placeholder="Material name (e.g. Copper Wire)"
            required
            onChange={(e) =>
              setForm({ ...form, materialName: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option>Metal</option>
            <option>Plastic</option>
            <option>Electronics</option>
            <option>Chemical</option>
            <option>Wood</option>
          </select>

          <input
            placeholder="Required quantity (e.g., 50kg)"
            required
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <textarea
            placeholder="Describe your requirement / use-case..."
            rows="4"
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </>
  );
}

export default RequestMaterial;