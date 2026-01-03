import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MaterialProvider } from "./context/MaterialContext";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MaterialProvider>
      <App />
    </MaterialProvider>
  </React.StrictMode>
);
