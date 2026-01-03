import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./Marketplace.css";

function Marketplace() {
  const [materials, setMaterials] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // materials still from backend for now
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));

    // requests from Firestore
    getDocs(collection(db, "requests")).then((snapshot) => {
      setRequests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
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

    await addDoc(collection(db, "requests"), {
      type: "material",
      materialId: item.id,
      materialName: item.name,
      supplierId: item.uploadedBy.uid,
      supplierName: item.uploadedBy.name,
      consumerId: user.uid,
      consumerName: user.name || user.email,
      status: "pending",
      createdAt: new Date(),
    });

    setRequests((prev) => [
      ...prev,
      {
        materialId: item.id,
        consumerId: user.uid,
      },
    ]);

    alert("Request sent");
  };

  return (
    <>
      <Navbar />

      <div className="marketplace">
        <h2>Available Materials</h2>

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
          {filtered.map((item) => {
            const alreadyRequested =
              user &&
              requests.some(
                (r) =>
                  r.materialId === item.id &&
                  r.consumerId === user.uid
              );

            return (
              <div className="material-card" key={item.id}>
                {item.image && (
                  <img src={item.image} alt={item.name} />
                )}

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

                <div className="card-actions">
                  <button
                    className="request-btn"
                    disabled={alreadyRequested}
                    onClick={() => requestMaterial(item)}
                  >
                    {alreadyRequested ? "Requested" : "Request"}
                  </button>

                  <button className="chat-btn">💬 Chat</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
