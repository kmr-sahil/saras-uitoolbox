"use client"
import React, { useState } from "react";
import InpColor from '@/components/InpColor'; // Import the InpColor component
import { v4 as uuidv4 } from 'uuid';

function GradientPage() {
  const [gradientColors, setGradientColors] = useState([
    { id: uuidv4(), color: '#ff0000', percent: '0' },
    { id: uuidv4(), color: '#00ff00', percent: '100' },
  ]);

  const [gradientType, setGradientType] = useState(false);
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

  const copyCssToClipboard = () => {
    const cssCode = generateGradientCode();
    navigator.clipboard.writeText(cssCode)
      .then(() => {
        console.log(`Copied CSS to clipboard: ${cssCode}`);
      })
      .catch((err) => {
        console.error('Unable to copy CSS to clipboard', err);
      });
  };

  console.log("Rendering with gradientCode:", generateGradientCode());

  return (
    <div className="w-[100%] mobile:w-[27rem] laptop:w-[48rem] mx-auto grid justify-between items-stretch grid-cols-2 gap-4 p-[2rem] transition-all overflow-hidden">

      <div className="inp-outer h-[8.75rem] tablet:h-[12.75rem] laptop:h-[16.75rem] col-span-2 laptop:col-span-1">
        <div
          className="w-[100%] h-[8rem] tablet:h-[12rem] laptop:h-[16rem] inp bg-gradient-to-r"
          style={{
            backgroundImage: generateGradientCode(),
          }}
        ></div>
      </div>
      
      
    <div className="col-span-2 laptop:col-span-1">
    <div className="inp-outer w-[14.75rem] relative mb-[1rem]"
             style={{
              opacity: `${gradientType ? '50%' : '100%'}`,
             }}      
        >
          <input
            className="inp px-[5rem] font-semibold"
            type="number"
            value={gradientDegree}
            onChange={(e) => handleDegreeChange(e.target.value)}
          />
          <h1 className="absolute top-[0.85rem] left-[1.5rem]">Degree : </h1>
        </div>
      
  
    {gradientColors.map((color) => (
        <div key={color.id} className="flex flex-col items-start justify-center gap-2 bg-slate-300 bg-opacity-50 rounded-md mb-[1rem]">
          {/* Replace the color input with InpColor component */}
          <InpColor
            inputColor={color.color}
            setInputColor={(newColor) => handleColorChange(color.id, newColor)}
          />

        <div className=" w-[100%] flex items-center justify-between mb-[1rem]">
        
        <div className="w-[8rem] ">
          <span>{color.percent}%</span>
          <input
            className="w-[4rem]"
            type="range"
            min="0"
            max="100"
            value={color.percent}
            onChange={(e) => handlePercentageChange(color.id, e.target.value)}
          />
        
        </div>

          <div className="inp-outer">
              <button
                className="w-[6rem] inp"
                onClick={() => handleDeleteColor(color.id)}
              >
                Delete
              </button>
          </div>
          </div>
        </div>
      ))}

      <div className="inp-outer w-[9.75rem] mb-[1rem]">
          <button
            className="w-[9rem] inp"
            onClick={handleAddColor}
          >
             + Add color
          </button>
      </div>


    <div className="flex gap-[0.5rem] items-center">
        <div className='flex items-center justify-center inp-outer'>
            <div
              className='w-[2rem] h-[2rem] inp'
              onClick={() => handleGradientTypeChange()}
            ></div>
        </div>

      <div className="">Radial Gradient</div>
    </div>
    </div>
        
    
      {/* Display the generated CSS */}
      <div className='col-span-2 inp-outer'>
        <div className='inp-outer rounded-[8px] p-[0.5rem] relative'>
            <h2 className='text-[0.75rem] font-thin mb-[0.5rem]'>Generated CSS:</h2>
            <p>{generateGradientCode()}</p>
            <div className=' absolute right-2 bottom-2 inp-outer'> 
              <button onClick={copyCssToClipboard} className='h-[1.5rem] inp-outer bg-[#FF9D00] px-[0.5rem] py-[2.5px]  text-[0.75rem] rounded-[8px] '>copy</button>
            </div>
            
        </div>
        
      </div>

    </div>
  );
}

export default GradientPage;
