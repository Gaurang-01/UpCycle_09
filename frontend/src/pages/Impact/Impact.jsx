import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MaterialContext } from "../../context/MaterialContext";
import "./Impact.css";

function Impact() {
  const context = useContext(MaterialContext);

  // SAFETY CHECK
  if (!context) {
    return <p>Context not available</p>;
  }

  const { materials } = context;

  return (
    <>
      <Navbar />
      <div className="impact-container">
        <h2>Impact Page</h2>
        <p>Total materials: {materials.length}</p>
      </div>
    </>
  );
}

export default Impact;
