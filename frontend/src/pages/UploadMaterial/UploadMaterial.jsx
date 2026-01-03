import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { MaterialContext } from "../../context/MaterialContext";
import "./UploadMaterial.css";

function UploadMaterial() {
  const { addMaterial } = useContext(MaterialContext);

  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Metal",
    quantity: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMaterial({
      ...form,
      location: "Uploaded by Lab",
      image: imagePreview,
    });

    alert("Material uploaded!");

    setForm({
      name: "",
      category: "Metal",
      quantity: "",
      description: "",
    });
    setImagePreview(null);
  };

  return (
    <>
      <Navbar />

      <div className="upload-container">
        <h2>Upload Waste Material</h2>

        <form className="upload-form" onSubmit={handleSubmit}>
          <label>
            Material Name
            <input
              type="text"
              placeholder="e.g. Copper Wire"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Metal</option>
              <option>Plastic</option>
              <option>Electronics</option>
              <option>Chemical</option>
              <option>Wood</option>
            </select>
          </label>

          <label>
            Quantity
            <input
              type="text"
              placeholder="e.g. 5 kg / 10 units"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />
          </label>

          <label>
            Description
            <textarea
              placeholder="Any extra details..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <label>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {imagePreview && (
            <div className="image-preview">
              <p>Preview:</p>
              <img src={imagePreview} alt="Material Preview" />
            </div>
          )}

          <button type="submit">Upload Material</button>
        </form>
      </div>
    </>
  );
}

export default UploadMaterial;
