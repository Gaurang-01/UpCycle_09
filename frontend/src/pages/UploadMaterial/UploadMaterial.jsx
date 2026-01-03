import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadMaterial.css";

function UploadMaterial() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login to upload materials");
      navigate("/auth");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: "",
    category: "Metal",
    quantity: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState(null);

  // IMAGE
  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  // GPS LOCATION
  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        alert("📍 Location captured successfully");
      },
      () => alert("Failed to capture location")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coords) {
      alert("Please capture location before uploading");
      return;
    }

    await fetch("http://localhost:5000/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        image,
        lat: coords.lat,
        lng: coords.lng,
        uploadedBy: {
          uid: user.uid,
          name: user.name || user.email,
          email: user.email,
        },
      }),
    });

    alert("Material uploaded successfully");
    navigate("/marketplace");
  };

  return (
    <>
      <Navbar />

      <div className="upload-container">
        <h2>Upload Reusable Material</h2>

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            placeholder="Material Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Metal</option>
            <option>Plastic</option>
            <option>Electronics</option>
            <option>Chemical</option>
            <option>Wood</option>
          </select>

          <input
            placeholder="Quantity"
            required
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            placeholder="Location name (e.g. Mechanical Lab)"
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <button
            type="button"
            className="location-btn"
            onClick={captureLocation}
          >
            📍 Use My Current Location
          </button>

          {coords && (
            <p className="location-status">
              ✔ Location captured
            </p>
          )}

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input type="file" accept="image/*" onChange={handleImage} />

          <button type="submit">Upload Material</button>
        </form>
      </div>
    </>
  );
}

export default UploadMaterial;
