import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../../components/Navbar/Navbar";

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get coordinates passed from Marketplace
  // Default to a fallback location (e.g., New York) if no data
  const { lat, lng, title } = location.state || { lat: 40.7128, lng: -74.0060, title: "Default Location" };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <h2>📍 Location: {title}</h2>
        <button 
            onClick={() => navigate(-1)} 
            style={{marginBottom: '20px', padding: '10px', cursor: 'pointer'}}
        >
            ← Back to Marketplace
        </button>

        <div style={{ height: "500px", width: "90%", margin: "0 auto", border: "2px solid #ddd" }}>
          <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
              <Popup>
                {title} <br /> Item Location.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default MapView;