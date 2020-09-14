import React from "react";
import "./CurrentScore.css";

const CurrentScore = ({ score }) => {
  return (
    <div className="currentScore">
      <h1 className="currentScore__title">Score</h1>
      <h1 className="currentScore__score">{score}</h1>
    </div>
  );
};

export default CurrentScore;
