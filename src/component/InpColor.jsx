"use client"
import ColorPicker from '@/component/ColorPicker'
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
        <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>

            <div className='flex items-center justify-center border-[1px] p-[4px] border-[#313638]'>
                <div
                  className='w-[3rem] h-[2.2rem] border-[1px] border-[#313638]'
                  style={{
                    background: `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`,
                  }}
                ></div>
            </div>
                
            <input
              type='text'
              className='border-2 border-blue-900'
              onClick={handleInputClick}
              onChange={handleInputChange}
              value={getRGB.a === 1 ? `#${hex}` : `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`}
            />
            {visible && <ColorPicker getRGB={getRGB} setGetRGB={setGetRGB} onAlphaChange={handleAlphaChange} />}
                
            
        </div>
    );
}

export default ColorTestPage;