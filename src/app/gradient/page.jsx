"use client"
import React, { useState } from "react";

function GradientPage() {
  const [gradientColors, setGradientColors] = useState(["#ff0000", "#00ff00"]);
  const [colorPercentages, setColorPercentages] = useState([0, 100]);
  const [gradientType, setGradientType] = useState("linear");

  const handleColorChange = (index, color) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
    generateGradientCode();
  };

  const handlePercentageChange = (index, percentage) => {
    const newPercentages = [...colorPercentages];
    newPercentages[index] = percentage;
    setColorPercentages(newPercentages);
    generateGradientCode();
  };

  const handleAddColor = () => {
    setGradientColors([...gradientColors, "#000000"]);
    setColorPercentages([...colorPercentages, 100]);
  };

  const handleRemoveColor = (index) => {
    const newColors = [...gradientColors];
    const newPercentages = [...colorPercentages];
    newColors.splice(index, 1);
    newPercentages.splice(index, 1);
    setGradientColors(newColors);
    setColorPercentages(newPercentages);
    generateGradientCode();
  };

  const handleGradientTypeChange = (type) => {
    setGradientType(type);
  };

  const generateGradientCode = () => {
    console.log(
      `Generated CSS Code: ${gradientType}-gradient(${gradientColors
        .map((color, index) => `${color} ${colorPercentages[index]}%`)
        .join(", ")})`
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
      <div
        className="w-64 h-32 bg-gradient-to-r"
        style={{
          backgroundImage: `${gradientType}-gradient(${gradientColors
            .map((color, index) => `${color} ${colorPercentages[index]}%`)
            .join(", ")})`,
        }}
      ></div>

      {gradientColors.map((color, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={colorPercentages[index]}
            onChange={(e) => handlePercentageChange(index, e.target.value)}
          />
          <span>{colorPercentages[index]}%</span>
        </div>
      ))}

      <button onClick={handleAddColor}>Add Color</button>
      {gradientColors.length > 2 && (
        <button onClick={() => handleRemoveColor(gradientColors.length - 1)}>
          Remove Color
        </button>
      )}

      <button onClick={() => handleGradientTypeChange("linear")}>Linear Gradient</button>
      <button onClick={() => handleGradientTypeChange("radial")}>Radial Gradient</button>

      <button onClick={generateGradientCode}>Generate CSS</button>
    </div>
  );
}

export default GradientPage;
