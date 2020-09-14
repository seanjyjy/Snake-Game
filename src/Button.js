import React from "react";
import "./Button.css";

const Button = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="Button">
      <h1 className="button__title">{title}</h1>
    </div>
  );
};

export default Button;
