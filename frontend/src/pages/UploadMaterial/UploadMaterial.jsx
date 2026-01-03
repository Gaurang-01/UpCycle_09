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
      // NOTE: This creates a local URL. For production, use Firebase Storage.
      // But for this hackathon, this works on your local machine only.
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* GPS */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCoords({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await res.json();
          const loc =
            data.address.suburb ||
            data.address.city ||
            data.display_name;

          setForm({ ...form, location: loc });
          setQuery(loc);
          setSuggestions([]);
        } catch (err) {
          console.error("Geocoding error: ", err);
        }
      },
      () => alert("Location access denied")
    );
  };

  /* SEARCH (INDIA ONLY) */
  const searchLocation = async (value) => {
    setQuery(value);
    setForm({ ...form, location: value });

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&addressdetails=1&limit=5&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.log("Search error", error);
    }
  };

  const selectLocation = (place) => {
    const city =
      place.address.city ||
      place.address.town ||
      place.address.village ||
      "";
    const state = place.address.state || "";
    const loc = `${place.name || city}, ${state}`;

    setForm({ ...form, location: loc });
    setCoords({
      lat: Number(place.lat),
      lng: Number(place.lon),
    });
    setQuery(loc);
    setSuggestions([]);
  };

  /* GEOCODE MANUAL LOCATION (ON SUBMIT) */
  const geocodeLocation = async (text) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=1&q=${text}`
      );
      const data = await res.json();
      if (data.length === 0) return null;
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    } catch (e) {
      return null;
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to upload material!");
      return;
    }

    let finalCoords = coords;

    // If user typed location but didn't select suggestion
    if (!finalCoords) {
      const geo = await geocodeLocation(form.location);
      if (!geo) {
        alert("Unable to locate the entered address");
        return;
      }
      finalCoords = geo;
    }

    try {
      await addDoc(collection(db, "materials"), {
        ...form,
        image: imagePreview, // Warning: Local blob URL
        lat: finalCoords.lat,
        lng: finalCoords.lng,
        supplierId: user.uid,
        supplierName: user.name || user.email,
        createdAt: new Date(),
      });

      alert("Material uploaded successfully");

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
      setSuggestions([]);
    } catch (error) {
      console.error("Error uploading document: ", error);
      alert("Error uploading material. Check console.");
    }
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