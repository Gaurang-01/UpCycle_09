import Navbar from "../../components/Navbar/Navbar";

function MapView() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Material Location Map</h2>
        <p>
          Visualize available materials across campus and nearby industrial zones.
        </p>

        <div
          style={{
            marginTop: "30px",
            height: "400px",
            borderRadius: "12px",
            border: "2px dashed #22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#15803d",
          }}
        >
          📍 Map integration coming soon
        </div>
      </div>
    </>
  );
}

export default MapView;
