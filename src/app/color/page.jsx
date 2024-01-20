"use client"
import ColorPicker from '@/component/ColorPicker'
import React, { useEffect, useState } from 'react'
import convert from 'color-convert';

function ColorTestPage() {
    const [visible, setVisible] = useState(false)
    const [getRGB, setGetRGB] = useState('000000')
    const [hex, setHex] = useState('000000')

    useEffect(()=> {
        console.log("down")

        if(getRGB.a < 1){
            // then make the hexcod to normal rgba value and show on the div by chanhing the style also try show the input value of the hexcode or rgba if user changes alpha
        }
        const hexcode = convert.rgb.hex(getRGB.r, getRGB.g, getRGB.b)
        setHex(hexcode)

        console.log(hex)

    },[getRGB])

  return (
    <div className='flex flex-col gap-4 items-center justify-center p-[2rem]'>
        <div className='w-[5rem] h-[3rem]'
            style={{
            background: `#${hex}`,
        }}>

        </div>
        <input type='text' 
               className='border-2 border-blue-900'
               onClick={() => {setVisible(!visible)}}
               />
        {visible && <ColorPicker setGetRGB={setGetRGB} />}
    </div>
  )
}

export default ColorTestPage