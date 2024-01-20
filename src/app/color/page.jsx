"use client"
import ColorPicker from '@/component/ColorPicker'
import React, { useEffect, useState } from 'react'
import convert from 'color-convert';

function ColorTestPage() {
    const [visible, setVisible] = useState(false);
    const [getRGB, setGetRGB] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [hex, setHex] = useState('000000');

    useEffect(() => {
        const hexcode = convert.rgb.hex(getRGB.r, getRGB.g, getRGB.b);
        setHex(hexcode);
    }, [getRGB]);

    const handleAlphaChange = (alpha) => {
        setGetRGB((prevColor) => ({ ...prevColor, a: alpha }));
    };

    const handleInputChange = (event) => {
        const inputColor = event.target.value;
        // Validate inputColor and convert it to RGBA
        // Update setGetRGB with the new RGBA value
    };

    return (
        <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>
            <div
                className='w-[5rem] h-[3rem]'
                style={{
                    background: `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`,
                }}
            ></div>
            <input
                type='text'
                className='border-2 border-blue-900'
                onClick={() => setVisible(!visible)}
                onChange={handleInputChange}
                value={getRGB.a == 1 ? `#${hex}` : `rgba(${getRGB.r},${getRGB.g},${getRGB.b},${getRGB.a})`}
            />
            {visible && <ColorPicker getRGB={getRGB} setGetRGB={setGetRGB} onAlphaChange={handleAlphaChange} />}
        </div>
    );
}

export default ColorTestPage;