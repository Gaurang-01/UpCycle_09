const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // IMPORTANT for base64 images

const PORT = 5000;

/**
 * In-memory storage (hackathon-safe)
 * Can be replaced with Mongo / Supabase / Firebase later
 */
let materials = [
  {
    id: 1,
    name: "Aluminium Scrap",
    category: "Metal",
    quantity: "5 kg",
    location: "Mechanical Lab",
    description: "Clean aluminium offcuts",
    image: null,
    lat: 19.0449,
    lng: 72.8891,
  },
];

/* ----------------------------------
   MATERIAL APIs
---------------------------------- */

/**
 * GET all materials (Marketplace, Impact)
 */
app.get("/api/materials", (req, res) => {
  res.json(materials);
});

/**
 * POST new material (Upload page)
 */
app.post("/api/materials", (req, res) => {
  const newMaterial = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    location: req.body.location,
    description: req.body.description,
    image: req.body.image, // base64 string
    lat: req.body.lat,
    lng: req.body.lng,
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

/**
 * GET map locations (Map page)
 */
app.get("/api/materials/locations", (req, res) => {
  const locations = materials.map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    lat: m.lat,
    lng: m.lng,
  }));

  res.json(locations);
});

/* ----------------------------------
   SERVER START
---------------------------------- */

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
