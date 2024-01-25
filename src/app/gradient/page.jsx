"use client"
import React, { useState } from "react";


function GradientPage() {
  const [gradientColors, setGradientColors] = useState([
    {
      color: '#ff0000',
      percent: '0',
    },
    {
      color: '#00ff00',
      percent: '100',
    }
  ]);
  const [gradientType, setGradientType] = useState("linear");
  const [gradientDegree, setGradientDegree] = useState(90);

  const handleColorChange = (index, color) => {
    setGradientColors((prevColors) => [
      ...prevColors.slice(0, index),
      { ...prevColors[index], color },
      ...prevColors.slice(index + 1),
    ]);
    generateGradientCode();
  };

  const handlePercentageChange = (index, percentage) => {
    setGradientColors((prevColors) => [
      ...prevColors.slice(0, index),
      { ...prevColors[index], percent: percentage },
      ...prevColors.slice(index + 1),
    ]);
    generateGradientCode();
  };

  const handleAddColor = () => {
    setGradientColors((prevColors) => [
      ...prevColors,
      { color: "#000000", percent: "100" },
    ]);
  };

  const handleDeleteColor = (index) => {
    setGradientColors((prevColors) => [
      ...prevColors.slice(0, index),
      ...prevColors.slice(index + 1),
    ]);
    generateGradientCode();
  };

  const handleGradientTypeChange = (type) => {
    setGradientType(type);
  };

  const handleDegreeChange = (degree) => {
    setGradientDegree(degree);
    generateGradientCode();
  };

  const generateGradientCode = () => {
    const gradientCode =
      gradientType === "linear"
        ? `linear-gradient(${gradientDegree}deg, ${gradientColors
            .map((color) => `${color.color} ${color.percent}%`)
            .join(", ")})`
        : `radial-gradient(${gradientColors
            .map((color) => `${color.color} ${color.percent}%`)
            .join(", ")})`;

    console.log(`Generated CSS Code: ${gradientCode}`);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
      <div
        className="w-[40rem] h-32 bg-gradient-to-r"
        style={{
          backgroundImage:
            gradientType === "linear"
              ? `linear-gradient(${gradientDegree}deg, ${gradientColors
                  .map((color) => `${color.color} ${color.percent}%`)
                  .join(", ")})`
              : `radial-gradient(${gradientColors
                  .map((color) => `${color.color} ${color.percent}%`)
                  .join(", ")})`,
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
            value={color.color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={color.percent}
            onChange={(e) => handlePercentageChange(index, e.target.value)}
          />
          <span>{color.percent}%</span>

          <button
            className="px-[0.5rem] py-[0.25rem] border-2 border-black rounded-md"
            onClick={() => handleDeleteColor(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button onClick={handleAddColor}>Add Color</button>

      <button onClick={() => handleGradientTypeChange("linear")}>
        Linear Gradient
      </button>
      <button onClick={() => handleGradientTypeChange("radial")}>
        Radial Gradient
      </button>

      <button onClick={generateGradientCode}>Generate CSS</button>
    </div>
  );
}

export default GradientPage;
