"use client"
import React, { useEffect, useState } from 'react';
import convert from 'color-convert';
import InpColor from '@/components/InpColor'; // Import the InpColor component

function GlassMorphismPage() {
  const [textColor, setTextColor] = useState('ffffff');
  const [glass, setGlass] = useState({
    color: '#ececec', // Set a default color
    blur: 10,
    opacity: 0.5,
  });

  useEffect(() => {
    const rgbColor = convert.hex.rgb(glass.color);
    const hslColor = convert.rgb.hsl(rgbColor);

    if (hslColor[2] > 65) {
      setTextColor('000000');
    } else {
      setTextColor('ffffff');
    }
  }, [glass.color]);

  // Function to generate CSS based on user inputs
  const generateCss = () => {
    const rgbColor = convert.hex.rgb(glass.color);
    const rgbaColor = [...rgbColor, glass.opacity]; // Add opacity to the RGB array
    return `background: rgba(${rgbaColor.join(', ')});
-webkit-backdrop-filter: blur(${glass.blur}px);
backdrop-filter: blur(${glass.blur}px);
border: 1px solid rgba(${rgbColor.join(', ')}, 0.25);`;
  };

    // Function to copy generated CSS to clipboard
    const copyCssToClipboard = () => {
      const generatedCss = generateCss();
      navigator.clipboard.writeText(generatedCss)
        .then(() => alert('Generated CSS copied to clipboard'))
        .catch((error) => console.error('Failed to copy generated CSS: ', error));
    };

  return (
    <div className="w-[100%] mobile:w-[27rem] laptop:w-[48rem] mx-auto grid justify-between items-stretch grid-cols-2 gap-4 p-[2rem]">

    <div className='inp-outer col-span-2 laptop:col-span-1'>
      <div className='rounded-[8px] inp-outer p-0'>
          <div
              className="w-[100%] h-[25rem] flex items-center justify-center rounded-[8px]"
              style={{
                background: `url(https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'contain', // Specify background size here
                backgroundPosition: 'center', // Specify background position here
              }}
            >
            <div
                className="w-[70%] h-[75%] rounded-[16px] flex flex-col px-[1rem] py-[0.75rem] gap-[0.55rem]"
                style={{
                  color: `#${textColor}`,
                  background: generateCss().match(/background: ([^;]+);/)[1], // Extract background color from generated CSS
                  WebkitBackdropFilter: `blur(${glass.blur}px)`,
                  backdropFilter: `blur(${glass.blur}px)`,
                  border: generateCss().match(/border: ([^;]+);/)[1], // Extract border color from generated CSS
                }}
              >
                <h1 className="text-2xl">Friends</h1>

                <hr className='opacity-40'/>

                <div className='flex items-center gap-4'>
                  <div className='w-[2.5rem] h-[2.5rem] bg-red-600 rounded-full'></div>
                  <div>
                        <h3 className='text-[1rem] font-semibold'>Charles</h3>
                        <p className='text-[0.75rem] font-thin'>Carpenter</p>
                  </div>
                  
                </div>

                <hr className='opacity-40'/>

                <div className='flex items-center gap-4'>
                  <div className='w-[2.5rem] h-[2.5rem] bg-green-600 rounded-full'></div>
                  <div>
                        <h3 className='text-[1rem] font-semibold'>John</h3>
                        <p className='text-[0.75rem] font-thin'>Developer</p>
                  </div>
                  
                </div>

                <hr className='opacity-40'/>

                <div className='flex items-center gap-4'>
                  <div className='w-[2.5rem] h-[2.5rem] bg-yellow-600 rounded-full'></div>
                  <div>
                        <h3 className='text-[1rem] font-semibold'>Robin</h3>
                        <p className='text-[0.75rem] font-thin'>Reporter</p>
                  </div>
                  
                </div>

                <hr className='opacity-40'/>

                <div className='flex items-center gap-4'>
                  <div className='w-[2.5rem] h-[2.5rem] bg-purple-600 rounded-full'></div>
                  <div>
                        <h3 className='text-[1rem] font-semibold'>Ted Mosby</h3>
                        <p className='text-[0.75rem] font-thin'>Architect</p>
                  </div>
                  
                </div>

            </div>
          </div>
        </div>
    </div>
      
    <div className='col-span-2 laptop:col-span-1'>

<InpColor
    inputColor={glass.color}
    setInputColor={(newColor) => setGlass({ ...glass, color: newColor })}
/>

  <div className="w-[12rem]">
    <label htmlFor="blurRange">Blur: {glass.blur}px</label>
    <input
      id="blurRange"
      type="range"
      min="0"
      max="50" // You can adjust the maximum blur value as needed
      value={glass.blur}
      onChange={(e) => setGlass({ ...glass, blur: parseInt(e.target.value) })}
    />
    <label htmlFor="opacityRange">Opacity: {glass.opacity}</label>
    <input
      id="opacityRange"
      type="range"
      step="0.1"
      min="0"
      max="1"
      value={glass.opacity}
      onChange={(e) => setGlass({ ...glass, opacity: parseFloat(e.target.value) })}
    />
  </div>

</div>
      

      {/* Display the generated CSS */}
      <div className='col-span-2 inp-outer'>
        <div className='inp-outer rounded-[8px] p-[0.5rem] relative'>
            <h2 className='text-[0.75rem] font-thin mb-[0.5rem]'>Generated CSS:</h2>
            <p>{generateCss()}</p>
            <div className=' absolute right-2 bottom-2 inp-outer'> 
              <button onClick={copyCssToClipboard} className='h-[1.5rem] inp-outer bg-[#FF9D00] px-[0.5rem] py-[2.5px]  text-[0.75rem] rounded-[8px] '>copy</button>
            </div>
            
        </div>
        
      </div>
    </div>
  );
}

export default GlassMorphismPage;
