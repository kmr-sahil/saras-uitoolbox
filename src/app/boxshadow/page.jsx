"use client"
import React, { useState } from 'react';
import InpColor from '@/components/InpColor'; // Import the InpColor component


function BoxShadowPage() {
  const [shadowDetails, setShadowDetails] = useState({
    bgColor: '#fafafa',
    boxColor: '#474bff',
    shadowColor: '#9a9a9a',
    horOffset: 0,
    verOffset: 0,
    blur: 10,
    spread: 4,
    inset: false,
  });

  const handleInputChange = (e, id, value) => {
    const input = e?.target || { id, value }; // Use optional chaining to safely access target
    const { type, checked } = input;
  
    setShadowDetails((prevDetails) => {
      let updatedDetails = { ...prevDetails };
      if (type === 'checkbox') {
        updatedDetails[input.id] = checked;
      } else {
        updatedDetails[input.id] =
          type === 'range'
            ? input.id.includes('Offset')
              ? parseInt(input.value, 10)
              : parseInt(input.value, 10)
            : input.value;
      }
      return updatedDetails;
    });
  };
  

  const generateBoxShadowCSS = () => {
    const { horOffset, verOffset, blur, spread, shadowColor, inset } = shadowDetails;
    const insetValue = inset ? 'inset ' : '';
    return `${insetValue}${horOffset}px ${verOffset}px ${blur}px ${spread}px #${shadowColor}`;
  };


  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
        
      <div
        className="w-[15rem] h-[15rem] flex items-center justify-center inp-outer"
        style={{
          backgroundColor: `#${shadowDetails.bgColor}`,
        }}
      >
        <div className='inp-outer w-[100%] h-[100%] flex items-center justify-center rounded-[8px]'>

            <div
              className="w-[10rem] h-[10rem] rounded"
              style={{
                backgroundColor: `#${shadowDetails.boxColor}`,
                boxShadow: generateBoxShadowCSS(),
              }}
            ></div>

        </div>
        
      </div>

      <InpColor
        inputColor={shadowDetails.bgColor}
        setInputColor={(newColor) => handleInputChange(null, 'bgColor', newColor)}
      />

      <InpColor
        inputColor={shadowDetails.shadowColor}
        setInputColor={(newColor) => handleInputChange(null, 'shadowColor', newColor)}
      />

      <InpColor
        inputColor={shadowDetails.boxColor}
        setInputColor={(newColor) => handleInputChange(null, 'boxColor', newColor)}
      />

    <div className='w-[12rem] '>

    <label htmlFor="horizontalOffset">Horizontal Offset: {shadowDetails.horOffset}px</label>
      <input
        id="horOffset"
        type="range"
        value={shadowDetails.horOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={(e) => handleInputChange(e, 'horOffset')}
      />

      <label htmlFor="verticalOffset">Vertical Offset: {shadowDetails.verOffset}px</label>
      <input
        id="verOffset"
        type="range"
        value={shadowDetails.verOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={(e) => handleInputChange(e, 'verOffset')}
      />

      <label htmlFor="blur">Blur: {shadowDetails.blur}px</label>
      <input id="blur" type="range" value={shadowDetails.blur} min={0} max={64} onChange={(e) => handleInputChange(e, 'blur')}/>

      <label htmlFor="spread">Spread: {shadowDetails.spread}px</label>
      <input
        id="spread"
        type="range"
        value={shadowDetails.spread}
        min={0}
        max={32}
        onChange={(e) => handleInputChange(e, 'spread')}
      />

      <div className="flex gap-[0.5rem] items-center">
        <div className='flex items-center justify-center inp-outer'>
            <div
              className='w-[2rem] h-[2rem] inp'
              onClick={() => setShadowDetails({ ...shadowDetails, inset: !shadowDetails.inset })}

            ></div>
        </div>

      <div className="">Inset</div>
    </div>

    </div>
      

      <div>
        {/* Display the generated CSS code */}
        {`-webkit-box-shadow: ${generateBoxShadowCSS()};
        -moz-box-shadow: ${generateBoxShadowCSS()};
        box-shadow: ${generateBoxShadowCSS()};`}
      </div>
    </div>
  );
}

export default BoxShadowPage;
