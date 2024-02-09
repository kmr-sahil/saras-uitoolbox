"use client"
import ColorPicker from '@/components/ColorPicker'
import React, { useEffect, useState } from 'react'
import convert from 'color-convert';

function ColorTestPage({setInputColor, inputColor}) {
    const [visible, setVisible] = useState(false);
    const [getRGB, setGetRGB] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [hex, setHex] = useState(inputColor);

    useEffect(() => {
        const hexcode = convert.rgb.hex(getRGB.r, getRGB.g, getRGB.b);
        setInputColor(hexcode)
        setHex(hexcode);
    }, [getRGB]);

    const handleAlphaChange = (alpha) => {
        setGetRGB((prevColor) => ({ ...prevColor, a: alpha }));
    };

const handleInputChange = (event) => {
  const inputCol = event.target.value.trim();

  // Check if the input is a hex code or an RGBA string
  const isHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputCol);
  const isRgba = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(inputCol);

  if (isHex) {
    const hexWithoutHash = inputCol.replace('#', '');
    const [r, g, b] = convert.hex.rgb(hexWithoutHash);
    setGetRGB((prevColor) => ({ ...prevColor, r, g, b }));
    setHex(hexWithoutHash);
  } else if (isRgba) {
    const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/;
    const matches = inputCol.match(rgbaRegex);
    if (matches) {
      const [, r, g, b, a] = matches.map(Number);
      setGetRGB({ r, g, b, a });
      setHex(convert.rgb.hex(r, g, b));
    }
  }
};

      const handleInputClick = () => {
        setVisible(!visible);
      };

    return (
        <div className='relative flex gap-[0.5rem] items-center justify-start text-[1rem] text-[#313638] font-medium'>

            <div className='flex items-center justify-center inp-outer'>
                <div
                  className='w-[3rem] h-[2.5rem] inp'
                  style={{
                    background: `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`,
                  }}
                ></div>
            </div>
            
            <div className='inp-outer'>
              <input
                type='text'
                className='inp'
                onClick={handleInputClick}
                onChange={handleInputChange}
                value={getRGB.a === 1 ? `#${hex}` : `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`}
              />
            </div>
            {visible && <ColorPicker getRGB={getRGB} setGetRGB={setGetRGB} onAlphaChange={handleAlphaChange} />}
                
            
        </div>
    );
}

export default ColorTestPage;