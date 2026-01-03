import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    await fetch("http://localhost:5000/api/general-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        requestedBy: {
          uid: user.uid,
          name: user.name || user.email,
          email: user.email,
        },
      }),
    });

    alert("Request submitted successfully");
    navigate("/marketplace");
  };

  return (
    <>
      <Navbar />

      <div className="request-container">
        <h2>Request Material</h2>

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
            placeholder="Required quantity"
            required
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <textarea
            placeholder="Describe your requirement / use-case"
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
