import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./SupplierInventory.css";

function SupplierInventory() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const q = query(
      collection(db, "materials"),
      where("supplierId", "==", user.uid)
    );

    getDocs(q).then((snapshot) => {
      setMaterials(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [user, navigate]);

  const totalItems = materials.length;

  return (
    <>
      <Navbar />

      <div className="inventory-dashboard">
        <h2>Inventory Dashboard</h2>

        {/* KPI SECTION */}
        <div className="inventory-stats">
          <div className="stat-card">
            <h3>{totalItems}</h3>
            <p>Total Materials</p>
          </div>

          <div className="stat-card">
            <h3>{totalItems}</h3>
            <p>Available</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Allocated</p>
          </div>
        </div>

        {/* INVENTORY GRID */}
        <div className="inventory-grid">
          {materials.length === 0 ? (
            <p className="empty-text">
              No materials uploaded yet.
            </p>
          ) : (
            materials.map((item) => (
              <div className="inventory-card" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} />
                )}

                <div className="inventory-info">
                  <h3>{item.name}</h3>
                  <p className="category">{item.category}</p>
                  <p>
                    <strong>Quantity:</strong>{" "}
                    {item.quantity}
                  </p>
                  <p className="location">
                    📍 {item.location}
                  </p>
                </div>

                <div className="inventory-footer">
                  <span className="status available">
                    Available
                  </span>

                  <div className="actions">
                    <button className="edit-btn">
                      Edit
                    </button>
                    <button className="delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default SupplierInventory;
