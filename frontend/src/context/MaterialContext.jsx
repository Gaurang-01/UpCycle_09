import { createContext, useState } from "react";

export const MaterialContext = createContext();

export function MaterialProvider({ children }) {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "Aluminium Scrap",
      category: "Metal",
      quantity: "5 kg",
      location: "Mechanical Lab",
      image: null,
    },
  ]);

  const addMaterial = (material) => {
    setMaterials((prev) => [
      ...prev,
      { ...material, id: Date.now() },
    ]);
  };

  return (
    <MaterialContext.Provider value={{ materials, addMaterial }}>
      {children}
    </MaterialContext.Provider>
  );
}
