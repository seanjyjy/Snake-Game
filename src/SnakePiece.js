import React from "react";
import "./SnakePiece.css";

const SnakePiece = ({ top, left, i, length, direction }) => {
  if (i === length - 1) {
    if (direction === "UP") {
      return (
        <div
          className="snakePieceHeadUp"
          key={i}
          style={{ top: top, left: left }}
        />
      );
    } else if (direction === "DOWN") {
      return (
        <div
          className="snakePieceHeadDown"
          key={i}
          style={{ top: top, left: left }}
        />
      );
    } else if (direction === "RIGHT") {
      return (
        <div
          className="snakePieceHeadRight"
          key={i}
          style={{ top: top, left: left }}
        />
      );
    } else {
      return (
        <div
          className="snakePieceHeadLeft"
          key={i}
          style={{ top: top, left: left }}
        />
      );
    }
  } else {
    return (
      <div className="snakePiece" key={i} style={{ top: top, left: left }} />
    );
  }
};

export default SnakePiece;
