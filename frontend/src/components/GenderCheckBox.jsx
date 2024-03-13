import React from "react";

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex gap-x-3">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
          htmlFor="male"
        >
          <span className="label-text">Male</span>
          <input
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
            type="checkbox"
            id="male"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
          htmlFor="female"
        >
          <span className="label-text">Female</span>
          <input
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
            type="checkbox"
            id="female"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
