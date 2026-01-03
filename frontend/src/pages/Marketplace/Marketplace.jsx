import { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MaterialContext } from "../../context/MaterialContext";
import "./Marketplace.css";

function Marketplace() {
  const { materials } = useContext(MaterialContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  // FILTER LOGIC
  const filteredMaterials = materials.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesLocation =
      location === "All" || item.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <>
      <Navbar />

      <div className="marketplace">
        {/* LEFT: MAP PLACEHOLDER */}
        <div className="map-section">
          <p>📍 Campus Map View</p>
          <span>(Location-based discovery coming soon)</span>
        </div>

        {/* RIGHT: MATERIAL LIST */}
        <div className="materials-section">
          <h2>Available Materials</h2>

          {/* SEARCH + FILTER BAR */}
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
              <option value="Electronics">Electronics</option>
              <option value="Chemical">Chemical</option>
              <option value="Wood">Wood</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Mechanical Lab">Mechanical Lab</option>
              <option value="Chemistry Lab">Chemistry Lab</option>
              <option value="Electronics Lab">Electronics Lab</option>
              <option value="Uploaded by Lab">Uploaded by Lab</option>
            </select>
          </div>

          {/* MATERIAL CARDS */}
          {filteredMaterials.length === 0 && (
            <p className="no-results">No materials found.</p>
          )}

          {filteredMaterials.map((item) => (
            <div className="material-card" key={item.id}>
              {item.image && <img src={item.image} alt="" />}

              <h3>{item.name}</h3>

              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
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
