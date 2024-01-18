"use client"
import React, { useState, useEffect } from 'react';
import convert from 'color-convert';

function VarientPage() {
  const [inputColor, setInputColor] = useState('');
  const [hslColor, setHslColor] = useState<string | null>(null);
  const [hslColor1, setHslColor1] = useState<string | null>(null);
  const [hslColor2, setHslColor2] = useState<string | null>(null);
  const [hslColor3, setHslColor3] = useState<string | null>(null);
  const [hslColor4, setHslColor4] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputColor) {
      const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

      let normalizedHex = inputColor.trim(); // Remove leading and trailing spaces

      if (!normalizedHex.startsWith('#')) {
        normalizedHex = `#${normalizedHex}`;
      }

      if (hexRegex.test(normalizedHex)) {
        const hexColor = normalizedHex.slice(1); // Remove '#' before converting
        const rgbColor = convert.hex.rgb(hexColor);
        const hslColor = convert.rgb.hsl(rgbColor);

        let divider = hslColor[2]/4.5

        setHslColor(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`);

        setHslColor1(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]+divider}%)`)
        setHslColor2(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]+(divider*2)}%)`)
        setHslColor3(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]+(divider*3)}%)`)
        setHslColor4(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]+(divider*4)}%)`)

        setError(null);
      } else {
        setHslColor(null);
        setError('Invalid hex code format. Please use "#rrggbb" format.');
      }
    } else {
      setHslColor(null);
      setError(null);
    }
  }, [inputColor]);

  
  return (
    <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>
      <input
        type='color'
        className='border-2 border-black'
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
      />
      <input
        type='text'
        className='border-2 border-black'
        placeholder='enter hex code #'
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
      />
      {error && (
        <div className='mt-2 text-red-500'>
          <p>{error}</p>
        </div>
      )}
      {hslColor && (
        <div className='mt-4'>
          <p className='text-lg'>HSL Color: {hslColor}</p>
        </div>
      )}

      <div className='w-[10rem] h-[4rem]' style={{ backgroundColor: hslColor || 'transparent' }}>
        {/* Show HSL color here */}
      </div>

      <div className='w-[10rem] h-[4rem]' style={{ backgroundColor: hslColor1 || 'transparent' }}>
        {/* Show HSL color here 1*/}
      </div>

      <div className='w-[10rem] h-[4rem]' style={{ backgroundColor: hslColor2 || 'transparent' }}>
        {/* Show HSL color here 2*/}
      </div>

      <div className='w-[10rem] h-[4rem]' style={{ backgroundColor: hslColor3 || 'transparent' }}>
        {/* Show HSL color here 3*/}
      </div>

      <div className='w-[10rem] h-[4rem]' style={{ backgroundColor: hslColor4 || 'transparent' }}>
        {/* Show HSL color here 4*/}
      </div>
    </div>
  );
}

export default VarientPage;
