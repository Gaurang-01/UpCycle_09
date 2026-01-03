import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./UploadMaterial.css";

function UploadMaterial() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [imagePreview, setImagePreview] = useState(null);
  const [coords, setCoords] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "Metal",
    quantity: "",
    description: "",
    location: "",
  });

  /* IMAGE */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* GPS */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCoords({ lat, lng });

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await res.json();

        setForm({
          ...form,
          location:
            data.address.suburb ||
            data.address.city ||
            data.display_name,
        });

        setQuery(
          data.address.suburb ||
            data.address.city ||
            "Current Location"
        );
      },
      () => alert("Location access denied")
    );
  };

  /* SEARCH (INDIA ONLY) */
  const searchLocation = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&addressdetails=1&limit=5&q=${value}`
    );
    const data = await res.json();

    setSuggestions(data);
  };

  const selectLocation = (place) => {
    const city =
      place.address.city ||
      place.address.town ||
      place.address.village ||
      "";

    const state = place.address.state || "";

    setForm({
      ...form,
      location: `${place.name || city}, ${state}`,
    });

    setCoords({
      lat: Number(place.lat),
      lng: Number(place.lon),
    });

    setQuery(`${place.name || city}, ${state}`);
    setSuggestions([]);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coords) {
      alert("Please select a location");
      return;
    }

    await addDoc(collection(db, "materials"), {
      ...form,
      image: imagePreview,
      lat: coords.lat,
      lng: coords.lng,
      supplierId: user.uid,
      supplierName: user.name || user.email,
      createdAt: new Date(),
    });

    alert("Material uploaded");

    setForm({
      name: "",
      category: "Metal",
      quantity: "",
      description: "",
      location: "",
    });
    setCoords(null);
    setImagePreview(null);
    setQuery("");
  };

  return (
    <>
      <Navbar />

      <div className="upload-page">
        <div className="upload-card">
          <h2>Upload Waste Material</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Material Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <div className="row">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              >
                <option>Metal</option>
                <option>Plastic</option>
                <option>Electronics</option>
                <option>Chemical</option>
                <option>Wood</option>
              </select>

              <input
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: e.target.value,
                  })
                }
                required
              />
            </div>

            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            {/* LOCATION */}
            <div className="location-section">
              <label>Material Location</label>

              <input
                placeholder="Search campus, lab, city..."
                value={query}
                onChange={(e) =>
                  searchLocation(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="gps-btn"
                onClick={getCurrentLocation}
              >
                📍 Use Current Location
              </button>

              {suggestions.length > 0 && (
                <div className="suggestions">
                  {suggestions.map((place, i) => (
                    <div
                      key={i}
                      className="suggestion-item"
                      onClick={() => selectLocation(place)}
                    >
                      <strong>
                        {place.name ||
                          place.address.suburb ||
                          place.address.city}
                      </strong>
                      <span>
                        {place.address.city ||
                          place.address.state}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="preview"
              />
            )}

            <button type="submit" className="submit-btn">
              Upload Material
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadMaterial;
