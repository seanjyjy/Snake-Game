import React from "react";

const SnakePiece = ({ top, left, i }) => {
  return (
    <div className="snakePiece" key={i} style={{ top: top, left: left }} />
  );
};

export default SnakePiece;
