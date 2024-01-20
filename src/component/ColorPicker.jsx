"use client"
import { RgbaColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';


function ColorPicker({setGetRGB, getRGB}) {

  const [color, setColor] = useState(getRGB);

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