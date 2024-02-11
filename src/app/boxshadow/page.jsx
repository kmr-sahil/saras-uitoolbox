"use client"
import React, { useEffect, useState } from 'react';
import InpColor from '@/components/InpColor'; // Import the InpColor component


function BoxShadowPage() {
  const [shadowDetails, setShadowDetails] = useState({
    bgColor: '#fafafa',
    boxColor: '#474bff',
    shadowColor: '#9a9a9a',
    horOffset: 4,
    verOffset: 4,
    blur: 10,
    spread: 4,
    inset: false,
  });

  useEffect(() => {
    // Set the default colors after the component has mounted
    setShadowDetails((prevDetails) => ({
      ...prevDetails,
      bgColor: '#fafafa',
    }));
  }, []);

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

  const copyCssToClipboard = () => {
    const generatedCss = generateBoxShadowCSS();
    navigator.clipboard.writeText(generatedCss)
      .then(() => alert('Generated CSS copied to clipboard'))
      .catch((error) => console.error('Failed to copy generated CSS: ', error));
  };

  return (
    <div className="w-[100%] mobile:w-[27rem] laptop:w-[48rem] mx-auto grid justify-between items-stretch grid-cols-2 gap-4 p-[2rem]">
        
    <div className='col-span-2 laptop:col-span-1'>
      <div
        className="h-[16.75rem] laptop:h-[20.75rem] flex items-center justify-center inp-outer"
        style={{
          backgroundColor: `#${shadowDetails.bgColor}`,
        }}
      >
        <div className='inp-outer w-[100%] h-[16rem] laptop:h-[20rem] flex items-center justify-center rounded-[8px]'>

            <div
              className="w-[8rem] h-[8rem] rounded"
              style={{
                backgroundColor: `#${shadowDetails.boxColor}`,
                boxShadow: generateBoxShadowCSS(),
              }}
            ></div>

        </div>
        
      </div>
    </div>

    <div className='col-span-2 laptop:col-span-1 flex flex-col gap-[1rem]'>

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

    <div className='w-[12rem] flex flex-col'>

    <label htmlFor="horizontalOffset">Horizontal Offset: {shadowDetails.horOffset}px</label>
      <input
        className='mb-[1rem]'
        id="horOffset"
        type="range"
        value={shadowDetails.horOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={(e) => handleInputChange(e, 'horOffset')}
      />

      <label htmlFor="verticalOffset">Vertical Offset: {shadowDetails.verOffset}px</label>
      <input
        className='mb-[1rem]'
        id="verOffset"
        type="range"
        value={shadowDetails.verOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={(e) => handleInputChange(e, 'verOffset')}
      />

      <label htmlFor="blur">Blur: {shadowDetails.blur}px</label>
      <input 
          className='mb-[1rem]'
          id="blur" 
          type="range" 
          value={shadowDetails.blur} 
          min={0} 
          max={64} 
          onChange={(e) => handleInputChange(e, 'blur')}/>

      <label htmlFor="spread">Spread: {shadowDetails.spread}px</label>
      <input
        className='mb-[1rem]'
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
  </div> {/* end user inp */}
      
      {/* Display the generated CSS */}
      <div className='col-span-2 inp-outer'>
        <div className='inp-outer rounded-[8px] p-[0.5rem] relative'>
            <h2 className='text-[0.75rem] font-thin mb-[0.5rem]'>Generated CSS:</h2>
            <p>{generateBoxShadowCSS()}</p>
            <div className=' absolute right-2 bottom-2 inp-outer'> 
              <button onClick={copyCssToClipboard} className='h-[1.5rem] inp-outer bg-[#FF9D00] px-[0.5rem] py-[2.5px]  text-[0.75rem] rounded-[8px] '>copy</button>
            </div>
            
        </div>
        
      </div>
    </div>
  );
}

export default BoxShadowPage;
