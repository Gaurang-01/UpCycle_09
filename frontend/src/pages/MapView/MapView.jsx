import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../../components/Navbar/Navbar";
import "../../utils/leafletIconFix";
import "./MapView.css";

function MapView() {
  const [locations, setLocations] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("materialId");

  useEffect(() => {
    fetch("http://localhost:5000/api/materials/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const selected = locations.find(
    (m) => String(m.id) === String(selectedId)
  );

  const center = selected
    ? [selected.lat, selected.lng]
    : [19.0449, 72.8891];

  return (
    <>
      <Navbar />

      <div className="map-page">
        <h2>Material Location Map</h2>
        <p>Click markers to view material details</p>

        <MapContainer
          center={center}
          zoom={selected ? 18 : 16}
          scrollWheelZoom
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((item) => (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <strong>{item.name}</strong>
                <br />
                {item.category}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapView;
