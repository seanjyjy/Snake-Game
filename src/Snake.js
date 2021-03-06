import React from "react";
import SnakePiece from "./SnakePiece";
const Snake = (props) => {
  return (
    <div>
      {props.snakePieceList.map((snakePiece, i) => (
        <SnakePiece
          i={i}
          left={snakePiece[0]}
          top={snakePiece[1]}
          length={props.snakePieceList.length}
          direction={props.direction}
        />
      ))}
    </div>
  );
};
export default Snake;
