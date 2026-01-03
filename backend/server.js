const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = 5000;

/* -----------------------------
   IN-MEMORY STORAGE
----------------------------- */
let materials = [];
let requests = [];

/* -----------------------------
   MATERIAL APIs
----------------------------- */

// Get all materials
app.get("/api/materials", (req, res) => {
  res.json(materials);
});

// Add material (supplier only – enforced frontend)
app.post("/api/materials", (req, res) => {
  const newMaterial = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    location: req.body.location,
    description: req.body.description,
    image: req.body.image,
    lat: req.body.lat,
    lng: req.body.lng,
    uploadedBy: req.body.uploadedBy, // { uid, name, email }
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// Map locations
app.get("/api/materials/locations", (req, res) => {
  res.json(
    materials.map((m) => ({
      id: m.id,
      name: m.name,
      category: m.category,
      lat: m.lat,
      lng: m.lng,
    }))
  );
});

/* -----------------------------
   REQUEST APIs
----------------------------- */

// Create request
app.post("/api/requests", (req, res) => {
  const newRequest = {
    id: Date.now(),
    materialId: req.body.materialId,
    materialName: req.body.materialName,
    supplierId: req.body.supplierId,
    supplierName: req.body.supplierName,
    consumerId: req.body.consumerId,
    consumerName: req.body.consumerName,
    message: req.body.message || "",
    status: "pending",
    createdAt: new Date(),
  };

  requests.push(newRequest);
  res.status(201).json(newRequest);
});

// Get all requests (for later dashboards)
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

/* -----------------------------
   SERVER START
----------------------------- */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
