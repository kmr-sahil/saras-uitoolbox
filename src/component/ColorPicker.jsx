// components/ColorPickerCard.js

import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';

const ColorPickerCard = () => {
  const [selectedColor, setSelectedColor] = useState('#0000ff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setSelectedColor(color.hex);
    document.body.style.background = color.hex;
  };

  return (
    <div className="color-picker-card">
      <div
        className="color-preview bg-gray-300 w-16 h-16 border border-gray-400 cursor-pointer"
        onClick={handleClick}
      >
        .
      </div>
      {displayColorPicker && (
        <div className="color-picker-popover absolute z-10 top-20 left-0">
          <div className="color-picker-cover fixed top-0 right-0 bottom-0 left-0" onClick={handleClose} />
          <TwitterPicker color={selectedColor} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerCard;
