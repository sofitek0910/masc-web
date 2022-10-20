import React from "react";

export default function index({ Dispatch, funCall, stateValue }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={stateValue}
        onChange={(value) => {
          Dispatch(funCall(value.target.checked ? true : false));
        }}
      />
      <div className="slider"></div>
    </label>
  );
}
