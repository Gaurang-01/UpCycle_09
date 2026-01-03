import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./Marketplace.css";

function Marketplace() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // DATA STATE
  const [materials, setMaterials] = useState([]); // Items for SALE
  const [marketRequests, setMarketRequests] = useState([]); // Items WANTED
  const [myRequests, setMyRequests] = useState([]); // Transactions I initiated

  // FILTER STATE
  const [viewMode, setViewMode] = useState("materials"); // 'materials' or 'requests'
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Materials (For Sale)
        const matSnap = await getDocs(collection(db, "materials"));
        setMaterials(matSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // 2. Fetch Market Requests (People wanting to buy)
        const marketReqSnap = await getDocs(collection(db, "market_requests"));
        setMarketRequests(marketReqSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // 3. Fetch Transaction Requests (To check status of buttons)
        const reqSnap = await getDocs(collection(db, "requests"));
        setMyRequests(reqSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // --- LOGIC FOR BUYING (Requesting an Item) ---
  const requestMaterial = async (item) => {
    if (!user) return alert("Please login");
    try {
      const docRef = await addDoc(collection(db, "requests"), {
        materialId: item.id,
        materialName: item.name,
        supplierId: item.supplierId,
        supplierName: item.supplierName,
        consumerId: user.uid,
        consumerName: user.name || user.email,
        status: "pending",
        createdAt: new Date(),
      });
      setMyRequests((prev) => [...prev, { id: docRef.id, materialId: item.id, consumerId: user.uid, status: "pending" }]);
      alert("Request sent successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // --- LOGIC FOR FULFILLING (Responding to a Buyer Request) ---
  const fulfillRequest = (reqItem) => {
    if (!user) return alert("Please login");
    // Ideally, this opens a chat or a "Proposal" form.
    // For now, we'll just alert.
    alert(`You can contact ${reqItem.requesterName} to fulfill their request for ${reqItem.materialName}. (Chat feature coming soon)`);
  };

  // --- FILTERING LOGIC ---
  const getFilteredData = () => {
    const dataToFilter = viewMode === "materials" ? materials : marketRequests;

    return dataToFilter.filter((item) => {
      // Common Filters
      if (viewMode === "materials" && item.status === "unavailable") return false;
      
      const name = (item.name || item.materialName || "").toLowerCase();
      const cat = item.category || "All";
      const term = search.toLowerCase();

      const matchSearch = name.includes(term);
      const matchCategory = category === "All" || cat === category;

      return matchSearch && matchCategory;
    });
  };

  const displayedItems = getFilteredData();

  return (
    <>
      <Navbar />

      <div className="marketplace">
        <h2>Marketplace</h2>

        {/* --- TABS --- */}
        <div className="market-tabs">
          <button 
            className={`tab-btn ${viewMode === "materials" ? "active" : ""}`}
            onClick={() => setViewMode("materials")}
          >
            🛒 Materials for Sale
          </button>
          <button 
            className={`tab-btn ${viewMode === "requests" ? "active" : ""}`}
            onClick={() => setViewMode("requests")}
          >
            📢 Buyer Requests
          </button>
        </div>

        {/* --- CONTROLS --- */}
        <div className="marketplace-controls">
          <input
            placeholder={viewMode === "materials" ? "Search items..." : "Search requests..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Metal</option>
            <option>Plastic</option>
            <option>Electronics</option>
            <option>Chemical</option>
            <option>Wood</option>
          </select>
        </div>

        {/* --- GRID --- */}
        <div className="materials-grid">
          {displayedItems.length === 0 ? (
            <p className="no-items">No items found in this category.</p>
          ) : (
            displayedItems.map((item) => {
              
              // --- RENDER MATERIALS FOR SALE ---
              if (viewMode === "materials") {
                const myRequest = user ? myRequests.find(r => r.materialId === item.id && r.consumerId === user.uid) : null;
                
                return (
                  <div className="material-card" key={item.id}>
                    {item.image && <img src={item.image} alt={item.name} className="card-img" />}
                    <div className="card-content">
                      <h3>{item.name}</h3>
                      <p><strong>Qty:</strong> {item.quantity}</p>
                      <p><strong>Supplier:</strong> {item.supplierName}</p>
                      <p className="loc">📍 {item.location}</p>
                    </div>
                    <div className="card-actions">
                      {myRequest ? (
                         <button className={`request-btn ${myRequest.status}`} disabled>
                           {myRequest.status === "approved" ? "Accepted" : "Pending"}
                         </button>
                      ) : (
                        <button className="request-btn" onClick={() => requestMaterial(item)}>Request</button>
                      )}
                    </div>
                  </div>
                );
              } 
              
              // --- RENDER BUYER REQUESTS ---
              else {
                return (
                  <div className="material-card request-type-card" key={item.id}>
                    <div className="card-badge">WANTED</div>
                    <div className="card-content">
                      <h3>{item.materialName}</h3>
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Needed:</strong> {item.quantity}</p>
                      <p className="desc">"{item.message}"</p>
                      <p className="sub-text">Posted by: {item.requesterName}</p>
                    </div>
                    <div className="card-actions">
                      {user && user.uid === item.requesterId ? (
                        <button className="own-post-btn" disabled>My Post</button>
                      ) : (
                        <button className="fulfill-btn" onClick={() => fulfillRequest(item)}>
                          🤝 Contact Buyer
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Marketplace;