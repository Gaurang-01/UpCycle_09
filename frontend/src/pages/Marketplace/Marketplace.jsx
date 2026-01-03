import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Marketplace.css";

function Marketplace() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));
  }, []);

  const filtered = materials.filter((m) => {
    const matchName = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || m.category === category;
    return matchName && matchCat;
  });

  return (
    <>
      <Navbar />

      <div className="marketplace">
        <h2>Available Materials</h2>

        {/* SEARCH & FILTER */}
        <div className="marketplace-controls">
          <input
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option>Metal</option>
            <option>Plastic</option>
            <option>Electronics</option>
            <option>Chemical</option>
            <option>Wood</option>
          </select>
        </div>

        <div className="materials-grid">
          {filtered.map((item) => (
            <div className="material-card" key={item.id}>
              <div className="material-image-wrapper">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="material-image"
                  />
                ) : (
                  <div className="material-image placeholder">
                    No Image
                  </div>
                )}
              </div>

              <h3>{item.name}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>

              <p
                className="location-link"
                onClick={() =>
                  navigate(`/map?materialId=${item.id}`)
                }
              >
                📍 {item.location}
              </p>

              <button className="request-btn">
                Request Material
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
