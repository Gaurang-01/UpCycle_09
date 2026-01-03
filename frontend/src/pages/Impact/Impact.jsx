import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MaterialContext } from "../../context/MaterialContext";
import "./Impact.css";

function Impact() {
  const { materials } = useContext(MaterialContext);

  const totalMaterials = materials.length;
  const estimatedWasteSaved = totalMaterials * 5; // kg (mock logic)
  const estimatedCO2 = totalMaterials * 2.3; // kg CO₂ (mock)

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
            <span>Metal</span>
            <span>Plastic</span>
            <span>Electronics</span>
            <span>Chemical</span>
            <span>Wood</span>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="impact-section">
          <h3>Recent Activity</h3>

          <ul className="activity-feed">
            {materials.slice(-5).map((item) => (
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
