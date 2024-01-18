"use client"
import React, { useState, useEffect } from 'react';
import convert from 'color-convert';

function VariantPage() {
  const [inputColor, setInputColor] = useState('');
  const [hslColors, setHslColors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputColor) {
      const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

      let normalizedHex = inputColor.trim();

      if (!normalizedHex.startsWith('#')) {
        normalizedHex = `#${normalizedHex}`;
      }

      if (hexRegex.test(normalizedHex)) {
        const hexColor = normalizedHex.slice(1);
        const rgbColor = convert.hex.rgb(hexColor);
        const hslColor = convert.rgb.hsl(rgbColor);

        let x = 6;
        if(hslColor[2] > 50){
            x = 4.2
        }
        console.log(x)
        let divider = (100 - hslColor[2]) / x;
        const hslColors = Array.from({ length: 4 }, (_, index) => {
          return `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2] + index * divider}%)`;
        });

        setHslColors(hslColors);
        setError(null);
      } else {
        setHslColors([]);
        setError('Invalid hex code format. Please use "#rrggbb" format.');
      }
    } else {
      setHslColors([]);
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
      {hslColors.length > 0 && (
        <div className='mt-4'>
          <p className='text-lg'>HSL Colors: {hslColors}</p>
          {hslColors.map((hsl, index) => (
            <div
              key={index}
              className='w-[10rem] h-[4rem] mt-2'
              style={{ backgroundColor: hsl || 'transparent' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VariantPage;
