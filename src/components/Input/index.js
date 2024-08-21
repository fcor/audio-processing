import React from "react";
import "./styles.css";

const Input = ({
  placeholder,
  label = "",
  value,
  onChange,
  variant = "",
  errorMsg = "",
  className = "",
  maxLength = "",
}) => {
  return (
    <div
      className={`column ${className} ${
        errorMsg.length > 0 ? "with-error-msg" : ""
      }`}
    >
      <div
        className={`input-container row ${
          label.length === 0 ? "no-label" : ""
        }`}
      >
        {label.length > 0 && (
          <label htmlFor="name" className={`label-text ${variant}`}>
            {label}
          </label>
        )}
        <input
          name="name"
          type="text"
          className={`input ${variant}`}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Input;
