"use client"
import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setShadowDetails((prevDetails) => ({
      ...prevDetails,
      [id]:
        type === 'range'
          ? id.includes('Offset')
            ? parseInt(value, 10) // Adjusting the range for horizontal and vertical offsets
            : parseInt(value, 10)
          : type === 'checkbox'
          ? checked
          : value,
    }));
  };

  const generateBoxShadowCSS = () => {
    const { horOffset, verOffset, blur, spread, shadowColor, inset } = shadowDetails;
    const insetValue = inset ? 'inset ' : '';
    return `${insetValue}${horOffset}px ${verOffset}px ${blur}px ${spread}px ${shadowColor}`;
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-[2rem]">
      <div
        className="w-[15rem] h-[15rem] p-[2rem] flex items-center justify-center border-2 border-stone-500 rounded-lg"
        style={{
          backgroundColor: shadowDetails.bgColor,
        }}
      >
        <div
          className="w-[10rem] h-[10rem] rounded"
          style={{
            backgroundColor: shadowDetails.boxColor,
            boxShadow: generateBoxShadowCSS(),
          }}
        ></div>
      </div>

      <input
        id="bgColor"
        type="color"
        value={shadowDetails.bgColor}
        onChange={handleInputChange}
        placeholder="Background Color"
      />

      <input
        id="shadowColor"
        type="color"
        value={shadowDetails.shadowColor}
        onChange={handleInputChange}
        placeholder="Shadow Color"
      />

      <input
        id="boxColor"
        type="color"
        value={shadowDetails.boxColor}
        onChange={handleInputChange}
        placeholder="Box Color"
      />

      <label htmlFor="horizontalOffset">Horizontal Offset: {shadowDetails.horOffset}px</label>
      <input
        id="horOffset"
        type="range"
        value={shadowDetails.horOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={handleInputChange}
      />

      <label htmlFor="verticalOffset">Vertical Offset: {shadowDetails.verOffset}px</label>
      <input
        id="verOffset"
        type="range"
        value={shadowDetails.verOffset} // Adjusting the range for display
        min={-32}
        max={32}
        onChange={handleInputChange}
      />

      <label htmlFor="blur">Blur: {shadowDetails.blur}px</label>
      <input id="blur" type="range" value={shadowDetails.blur} min={0} max={64} onChange={handleInputChange} />

      <label htmlFor="spread">Spread: {shadowDetails.spread}px</label>
      <input
        id="spread"
        type="range"
        value={shadowDetails.spread}
        min={0}
        max={32}
        onChange={handleInputChange}
      />

      <label>
        <input
          id="inset"
          type="checkbox"
          checked={shadowDetails.inset}
          onChange={handleInputChange}
        />
        Inset
      </label>

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
