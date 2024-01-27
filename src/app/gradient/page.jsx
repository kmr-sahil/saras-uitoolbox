"use client"
import React, { useState } from "react";
import InpColor from '@/components/InpColor'; // Import the InpColor component
import { v4 as uuidv4 } from 'uuid';

function GradientPage() {
  const [gradientColors, setGradientColors] = useState([
    { id: uuidv4(), color: '#ff0000', percent: '0' },
    { id: uuidv4(), color: '#00ff00', percent: '100' },
  ]);

  const [gradientType, setGradientType] = useState("");
  const [gradientDegree, setGradientDegree] = useState(90);

 const handleColorChange = (id, color) => {
    setGradientColors((prevColors) =>
      prevColors.map((c) => (c.id === id ? { ...c, color } : c))
    );
    generateGradientCode();
  };

  const handlePercentageChange = (id, percentage) => {
    setGradientColors((prevColors) =>
      prevColors.map((c) => (c.id === id ? { ...c, percent: percentage } : c))
    );
    generateGradientCode();
  };

  const handleAddColor = () => {
    setGradientColors((prevColors) => [
      ...prevColors,
      { id: uuidv4(), color: '#000000', percent: '100' },
    ]);
  };

  const handleDeleteColor = (id) => {
    setGradientColors((prevColors) => prevColors.filter((c) => c.id !== id));
    generateGradientCode();
  };


  const handleGradientTypeChange = () => {
    setGradientType(!gradientType); // Toggle between true and false
  };

  const handleDegreeChange = (degree) => {
    setGradientDegree(degree);
    generateGradientCode();
  };

  const generateGradientCode = () => {
    const gradientCode =
      gradientType // Check for boolean value instead of empty string
        ? `radial-gradient(${gradientColors
            .map((color) => `#${color.color} ${color.percent}%`)
            .join(", ")})`
        : `linear-gradient(${gradientDegree}deg, ${gradientColors
            .map((color) => `#${color.color} ${color.percent}%`)
            .join(", ")})`;
  
    console.log(`Generated CSS Code: ${gradientCode}`);
    return gradientCode;
  };
  
  console.log("Rendering with gradientCode:", generateGradientCode());

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
      <div
        className="w-[40rem] h-32 bg-gradient-to-r"
        style={{
          backgroundImage: generateGradientCode(),
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

{gradientColors.map((color) => (
        <div key={color.id} className="flex items-center gap-2">
          {/* Replace the color input with InpColor component */}
          <InpColor
            inputColor={color.color}
            setInputColor={(newColor) => handleColorChange(color.id, newColor)}
          />

          <input
            type="range"
            min="0"
            max="100"
            value={color.percent}
            onChange={(e) => handlePercentageChange(color.id, e.target.value)}
          />
          <span>{color.percent}%</span>

          <button
            className="px-[0.5rem] py-[0.25rem] border-2 border-black rounded-md"
            onClick={() => handleDeleteColor(color.id)}
          >
            Delete
          </button>
        </div>
      ))}

      <button onClick={handleAddColor}>Add Color</button>


    <div className="flex gap-[0.5rem] items-center">
        <div className='flex items-center justify-center inp-outer'>
            <div
              className='w-[2rem] h-[2rem] inp'
              onClick={() => handleGradientTypeChange()}
            ></div>
        </div>

      <div className="">Radial Gradient</div>
    </div>
    

      <button onClick={generateGradientCode}>Generate CSS</button>

    </div>
  );
}

export default GradientPage;
