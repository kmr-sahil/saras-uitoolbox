"use client"
import { RgbaColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';


function ColorPicker({setGetRGB}) {

  const [color, setColor] = useState({ r: 0, g: 0, b: 200, a: 1 });

  useEffect(() => {
    setGetRGB(color)
  },[color])

  console.log(color)

  return (
    <>
      <div className='custom-layout example'>
            <RgbaColorPicker color={color} onChange={setColor} />
      </div>
    </>
  )
}

export default ColorPicker