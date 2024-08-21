import React from "react";
import "./styles.css";

const Button = ({
  variant = "",
  children,
  handleClick = () => {},
  className = "",
  id = "",
  disabled,
  active = false,
  loading,
  extensions = ""
}) => {
  if (variant === "input") {
    return (
      <label className={`btn ${className}`}>
        {children}
        <input onChange={handleClick} name="pdb" accept={extensions} type="file" hidden />
      </label>
    );
  } else {
    return (
      <button
        id={id}
        className={`btn ${className} ${variant} ${active ? "active" : ""}`}
        disabled={disabled || loading}
        onClick={handleClick}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
};
export default Button;
