"use client"
import { useState } from "react";

function GradientPage() {
  const [gradientColors, setGradientColors] = useState(["#ff0000", "#00ff00"]);
  const [gradientType, setGradientType] = useState("linear");

  const handleColorChange = (index, color) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
  };

  const handleAddColor = () => {
    setGradientColors([...gradientColors, "#000000"]);
  };

  const handleRemoveColor = (index) => {
    const newColors = [...gradientColors];
    newColors.splice(index, 1);
    setGradientColors(newColors);
  };

  const handleGradientTypeChange = (type) => {
    setGradientType(type);
  };

  const generateGradientCode = () => {
    // Here you can implement the logic to generate CSS code based on gradientColors and gradientType
    // For simplicity, I'll just log the result to the console
    console.log(`Generated CSS Code: ${gradientType}-gradient(${gradientColors.join(", ")})`);
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>
      {/* Display the gradient preview */}
      <div
        className="w-64 h-32 bg-gradient-to-r"
        style={{
          backgroundImage: `${gradientType}-gradient(${gradientColors.join(", ")})`,
        }}
      ></div>

      {/* Color pickers */}
      {gradientColors.map((color, index) => (
        <input
          key={index}
          type="color"
          value={color}
          onChange={(e) => handleColorChange(index, e.target.value)}
        />
      ))}

      {/* Add and Remove Color buttons */}
      <button onClick={handleAddColor}>Add Color</button>
      {gradientColors.length > 2 && (
        <button onClick={() => handleRemoveColor(gradientColors.length - 1)}>
          Remove Color
        </button>
      )}

      {/* Gradient type buttons */}
      <button onClick={() => handleGradientTypeChange("linear")}>Linear Gradient</button>
      <button onClick={() => handleGradientTypeChange("radial")}>Radial Gradient</button>

      {/* Generate CSS button */}
      <button onClick={generateGradientCode}>Generate CSS</button>
    </div>
  );
}

export default GradientPage;