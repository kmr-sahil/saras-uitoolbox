"use client"
import React, { useState } from 'react';

function GlassMorphismPage() {
  const [glass, setGlass] = useState({
    color: "#ececec", // Set a default color
    blur: 10,
    opacity: 0.5,
  });

  // Function to generate CSS based on user inputs
  const generateCss = () => {
    return `
      background: rgba(${parseInt(glass.color.slice(1, 3), 16)}, ${parseInt(
      glass.color.slice(3, 5),
      16
    )}, ${parseInt(glass.color.slice(5, 7), 16)}, ${glass.opacity});
      -webkit-backdrop-filter: blur(${glass.blur}px);
      backdrop-filter: blur(${glass.blur}px);
      border: 1px solid rgba(${parseInt(glass.color.slice(1, 3), 16)}, ${parseInt(
      glass.color.slice(3, 5),
      16
    )}, ${parseInt(glass.color.slice(5, 7), 16)}, 0.25);
    `;
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>
      <div
        className='w-[20rem] h-[20rem] p-[2rem] flex items-center justify-center bg-cover bg-center'
        style={{
          background: `url(https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div
          className='w-[10rem] h-[15rem] rounded-lg'
          style={{
            background: `rgba(${parseInt(glass.color.slice(1, 3), 16)}, ${parseInt(
              glass.color.slice(3, 5),
              16
            )}, ${parseInt(glass.color.slice(5, 7), 16)}, ${glass.opacity})`,
            WebkitBackdropFilter: `blur(${glass.blur}px)`,
            backdropFilter: `blur(${glass.blur}px)`,
            border: `1px solid rgba(${parseInt(glass.color.slice(1, 3), 16)}, ${parseInt(
              glass.color.slice(3, 5),
              16
            )}, ${parseInt(glass.color.slice(5, 7), 16)}, 0.25)`,
          }}
        >
          <h1 className='text-2xl'>Hello World</h1>
        </div>
      </div>

      <input
        type='color'
        placeholder='glass color'
        onChange={(e) => {
          setGlass({ ...glass, color: e.target.value });
        }}
      />
      <label htmlFor='blurRange'>Blur: {glass.blur}px</label>
      <input
        id='blurRange'
        type='range'
        min='0'
        max='50' // You can adjust the maximum blur value as needed
        value={glass.blur}
        onChange={(e) => {
          setGlass({ ...glass, blur: parseInt(e.target.value) });
        }}
      />
      <label htmlFor='opacityRange'>Opacity: {glass.opacity}</label>
      <input
        id='opacityRange'
        type='range'
        step='0.1'
        min='0'
        max='1'
        value={glass.opacity}
        onChange={(e) => {
          setGlass({ ...glass, opacity: parseFloat(e.target.value) });
        }}
      />

      {/* Display the generated CSS */}
      <div>
        <h2>Generated CSS:</h2>
        <pre>{generateCss()}</pre>
      </div>
    </div>
  );
}

export default GlassMorphismPage;
