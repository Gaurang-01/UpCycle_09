import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Marketplace.css";

function Marketplace() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));
  }, []);

  const filtered = materials.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.uploadedBy?.name?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    return matchSearch && matchCategory;
  });

  const requestMaterial = async (item) => {
    if (!user) {
      alert("Please login to request materials");
      return;
    }

    await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        materialId: item.id,
        materialName: item.name,
        supplierId: item.uploadedBy.uid,
        supplierName: item.uploadedBy.name,
        consumerId: user.uid,
        consumerName: user.name || user.email,
        message: "Interested in this material",
      }),
    });

    alert("Request sent");
  };

  return (
    <>
      <Navbar />

      <div className="marketplace">
        <h2>Available Materials</h2>

        {/* SEARCH + FILTER */}
        <div className="marketplace-controls">
          <input
            placeholder="Search materials, supplier, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
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
              {item.image && (
                <img src={item.image} alt={item.name} />
              )}

              <h3>{item.name}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>

              <div className="supplier-location">
                <p>
                  <strong>Supplier:</strong> {item.uploadedBy?.name}
                </p>

                <p
                  className="location-link"
                  onClick={() =>
                    navigate(`/map?materialId=${item.id}`)
                  }
                >
                  📍 {item.location}
                </p>
              </div>

              <div className="card-actions">
                <button
                  className="request-btn"
                  onClick={() => requestMaterial(item)}
                >
                  Request
                </button>

                <button className="chat-btn">
                  💬 Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
