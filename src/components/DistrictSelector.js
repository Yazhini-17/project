import React from 'react';
import './DistrictSelector.css';

function DistrictSelector({ districts, selectedDistrict, onDistrictChange }) {
  return (
    <div className="district-selector">
      <label htmlFor="district-select">Select District:</label>
      <select 
        id="district-select"
        value={selectedDistrict}
        onChange={(e) => onDistrictChange(e.target.value)}
        className="district-dropdown"
      >
        {districts.map(district => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DistrictSelector;
