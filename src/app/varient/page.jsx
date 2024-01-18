"use client"
import React, { useState, useEffect } from 'react';
import convert from 'color-convert';

function VariantPage() {
  const [inputColor, setInputColor] = useState('');
  const [hslColors, setHslColors] = useState([]);
  const [error, setError] = useState(null);

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
        if (hslColor[2] > 50) {
          x = 4.2;
        }
        let divider = (100 - hslColor[2]) / x;
        const temphsl = Array.from({ length: 4 }, (_, index) => {
          return `hsl(${hslColor[0]}, ${hslColor[1]}%, ${Math.round(hslColor[2] + index * divider)}%)`;
        });

        setHslColors(temphsl);
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


  const hslToHex = (val) => {
    let hslNumbers = val.match(/\d+/g);
  
    if (hslNumbers && hslNumbers.length === 3) {
      let [a, b, c] = hslNumbers;
  
      const hexColor = convert.hsl.hex([a, b, c]);
  
      console.log(hexColor);
  
      return hexColor;
    } else {
      console.log("Invalid HSL string format");
      return null; // or handle the error accordingly
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(`Copied to clipboard: ${text}`);
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };
  

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
      {hslColors.map((hsl, index) => (
            <div
              key={index}
              className='w-[10rem] h-[4rem] mt-2 flex items-baseline p-[0.2rem]'
              style={{ backgroundColor: hsl || 'transparent' }}
              onClick={() => copyToClipboard("#" + hslToHex(hsl))}
            >
              <span className='text-xs mt-auto'>{"#" + hslToHex(hsl)}</span>
            </div>
          )
      )}
    </div>
  );
}

export default VariantPage;
