"use client"
import React, { useState } from "react";

function GradientPage() {
  const [gradientColors, setGradientColors] = useState(["#ff0000", "#00ff00"]);
  const [colorPercentages, setColorPercentages] = useState([0, 100]);
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDegree, setGradientDegree] = useState(90);

  const handleColorChange = (index, color) => {
    setGradientColors((prevColors) => [...prevColors.slice(0, index), color, ...prevColors.slice(index + 1)]);
    generateGradientCode();
  };

  const handlePercentageChange = (index, percentage) => {
    setColorPercentages((prevPercentages) => [...prevPercentages.slice(0, index), percentage, ...prevPercentages.slice(index + 1)]);
    generateGradientCode();
  };

  const handleAddColor = () => {
    setGradientColors((prevColors) => [...prevColors, "#000000"]);
    setColorPercentages((prevPercentages) => [...prevPercentages, 100]);
  };

  const handleRemoveColor = (index) => {
    setGradientColors((prevColors) => [...prevColors.slice(0, index), ...prevColors.slice(index + 1)]);
    setColorPercentages((prevPercentages) => [...prevPercentages.slice(0, index), ...prevPercentages.slice(index + 1)]);
    generateGradientCode();
  };

  const handleGradientTypeChange = (type) => {
    setGradientType(type);
    setGradientDegree(type === "linear" ? 90 : 0);
    setColorPercentages(type === "radial" ? [0, 100] : colorPercentages);
  };

  const handleDegreeChange = (degree) => {
    setGradientDegree(degree);
    generateGradientCode();
  };

  const generateGradientCode = () => {
    const gradientCode =
      gradientType === "linear"
        ? `linear-gradient(${gradientDegree}deg, ${gradientColors.map((color, index) => `${color} ${colorPercentages[index]}%`).join(", ")})`
        : `radial-gradient(${gradientColors.map((color, index) => `${color} ${colorPercentages[index]}%`).join(", ")})`;

    console.log(`Generated CSS Code: ${gradientCode}`);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
      <div
        className="w-64 h-32 bg-gradient-to-r"
        style={{
          backgroundImage:
            gradientType === "linear"
              ? `linear-gradient(${gradientDegree}deg, ${gradientColors.map((color, index) => `${color} ${colorPercentages[index]}%`).join(", ")})`
              : `radial-gradient(${gradientColors.map((color, index) => `${color} ${colorPercentages[index]}%`).join(", ")})`,
        }}
      ></div>

      {gradientType === "linear" && (
        <div className="flex items-center gap-2">
          <label>Degree:</label>
          <input
            type="number"
            value={gradientDegree}
            onChange={(e) => handleDegreeChange(e.target.value)}
          />
        </div>
      )}

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
