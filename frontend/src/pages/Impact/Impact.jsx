import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Impact.css";

function Impact() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error(err));
  }, []);

  const totalMaterials = materials.length;
  const estimatedWasteSaved = totalMaterials * 5; // kg (mock logic)
  const estimatedCO2 = (totalMaterials * 2.3).toFixed(1); // kg CO₂

  // category count
  const categoryCount = materials.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div className="impact-container">
        <h2>Environmental Impact</h2>

        {/* KPI CARDS */}
        <div className="impact-stats">
          <div className="stat-card">
            <h3>{totalMaterials}</h3>
            <p>Materials Reused</p>
          </div>

          <div className="stat-card">
            <h3>{estimatedWasteSaved} kg</h3>
            <p>Waste Diverted</p>
          </div>

          <div className="stat-card">
            <h3>{estimatedCO2} kg</h3>
            <p>CO₂ Reduced</p>
          </div>
        </div>

        {/* IMPACT BREAKDOWN */}
        <div className="impact-section">
          <h3>Impact Breakdown</h3>

          <div className="impact-grid">
            <div className="impact-box">
              ♻️ Reduced landfill waste through reuse
            </div>
            <div className="impact-box">
              🌍 Lower carbon emissions from manufacturing
            </div>
            <div className="impact-box">
              🚀 Enabled student-led innovation
            </div>
          </div>
        </div>

        {/* CATEGORY DISTRIBUTION */}
        <div className="impact-section">
          <h3>Material Categories</h3>

          <div className="category-list">
            {Object.keys(categoryCount).length === 0 && (
              <span>No data yet</span>
            )}

            {Object.keys(categoryCount).map((cat) => (
              <span key={cat}>
                {cat} ({categoryCount[cat]})
              </span>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="impact-section">
          <h3>Recent Activity</h3>

          <ul className="activity-feed">
            {materials.length === 0 && (
              <li>No activity yet</li>
            )}

            {materials.slice(-5).reverse().map((item) => (
              <li key={item.id}>
                ♻️ <strong>{item.name}</strong> reused from{" "}
                {item.location}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Impact;
