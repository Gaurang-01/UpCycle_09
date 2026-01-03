import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadMaterial.css";

function UploadMaterial() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [coords, setCoords] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "Metal",
    quantity: "",
    description: "",
    location: "",
  });

  // IMAGE → BASE64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // REAL LOCATION
  const getCurrentLocation = () => {
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
        alert("Location captured!");
      },
      () => alert("Failed to get location")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const materialData = {
      ...form,
      image: imageData,
      lat: coords?.lat || 19.045,
      lng: coords?.lng || 72.889,
    };

    try {
      await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });

      alert("Material uploaded successfully!");
    } catch {
      alert("Upload failed");
    }

    setForm({
      name: "",
      category: "Metal",
      quantity: "",
      description: "",
      location: "",
    });
    setImagePreview(null);
    setImageData(null);
    setCoords(null);
  };

  return (
    <>
      <Navbar />

      <div className="upload-container">
        <h2>Upload Waste Material</h2>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>
            Material Name
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
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
          </label>

          <label>
            Quantity
            <input
              required
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />
          </label>

          <label>
            Location
            <input
              required
              placeholder="e.g. Mechanical Lab"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          </label>

          <button
            type="button"
            className="location-btn"
            onClick={getCurrentLocation}
          >
            📍 Use My Current Location
          </button>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <label>
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit">Upload Material</button>
        </form>
      </div>
    </>
  );
}

export default UploadMaterial;
