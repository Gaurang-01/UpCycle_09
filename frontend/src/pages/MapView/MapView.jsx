import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import Navbar from "../../components/Navbar/Navbar";
import "../../utils/leafletIconFix";
import "./MapView.css";

/* ---------------------------------
   Handles zoom + focus on selection
---------------------------------- */
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 18, {
        duration: 1.5,
      });
    }
  }, [position, map]);

  return null;
}

function MapView() {
  const [materials, setMaterials] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("materialId");

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));
  }, []);

  const selected = materials.find(
    (m) => String(m.id) === String(selectedId)
  );

  const defaultCenter = [19.0449, 72.8891];

  return (
    <>
      <Navbar />

      <div className="map-page">
        <h2>Material Locations</h2>

        <MapContainer
          center={
            selected
              ? [selected.lat, selected.lng]
              : defaultCenter
          }
          zoom={16}
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Smooth zoom when location is selected */}
          {selected && (
            <FlyToLocation
              position={[selected.lat, selected.lng]}
            />
          )}

          {materials.map((item) => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
            >
              <Popup>
                <strong>{item.name}</strong>
                <br />
                📍 {item.location}
                <br />
                👤 {item.uploadedBy?.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapView;
