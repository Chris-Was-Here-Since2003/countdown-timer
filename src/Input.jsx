import React from "react";

function TimeInput({ label, value, onChange }) {
  return (
    <div className="time-input">
      <label>{label}</label>
      <input 
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value || 0))}
      />
    </div>
  );
}

export default TimeInput;
