import React from "react";
import "./Food.css";

const Food = (props) => {
  return (
    <div className="food" style={{ left: props.pos[0], top: props.pos[1] }} />
  );
};

export default Food;
