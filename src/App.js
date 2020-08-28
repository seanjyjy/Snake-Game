import React, { useState, useEffect, useRef } from "react";
import Snake from "./Snake";
import Food from "./Food";
function App() {
  const isOnSnake = (x, y) => {
    const snakeCopy = [...snakePieces];
    for (let i = 0; i < snakeCopy.length; i++) {
      if (snakeCopy[i][0] === x && snakeCopy[i][1] === y) {
        return true;
      }
    }
    return false;
  };
  const generatePossiblePosition = () => {
    let generateX = Math.floor(Math.random() * 79) * 10;
    let generateY = Math.floor(Math.random() * 53) * 10;
    while (isOnSnake(generateX, generateY)) {
      generateX = Math.floor(Math.random() * 79) * 10;
      generateY = Math.floor(Math.random() * 53) * 10;
    }
    return [generateX, generateY];
  };

  let [snakePieces, setSnakePieces] = useState([
    [0, 0],
    [10, 0],
    [20, 0],
    [790, 540],
  ]);
  let [foodPosition, setFoodPosition] = useState(generatePossiblePosition());
  const [userDirection, setUserDirection] = useState("RIGHT");
  const [gameState, setGameState] = useState(false);
  const [speed, setSpeed] = useState(null);

  const startGame = () => {
    setSnakePieces([
      [0, 0],
      [10, 0],
      [20, 0],
    ]);
    setGameState(false);
    setSpeed(80);
    setUserDirection("RIGHT");
    setFoodPosition(generatePossiblePosition());
  };

  const endGame = () => {
    setGameState(false);
    setSpeed(null);
    alert(`Game over. Your score is ${snakePieces.length}`);
  };

  useInterval(() => updateEvent(), speed);

  //Custon hook by Dan Abramov
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const snakeMovement = () => {
    let snakeCopy = [...snakePieces];
    // head of the snake is the end of the array !!!
    let headOfSnake = snakePieces[snakePieces.length - 1];
    switch (userDirection) {
      case "LEFT":
        headOfSnake = [headOfSnake[0] - 10, headOfSnake[1]];
        break;
      case "UP":
        headOfSnake = [headOfSnake[0], headOfSnake[1] - 10];
        break;
      case "RIGHT":
        headOfSnake = [headOfSnake[0] + 10, headOfSnake[1]];
        break;
      case "DOWN":
        headOfSnake = [headOfSnake[0], headOfSnake[1] + 10];
        break;
      default:
        return;
    }
    snakeCopy.push(headOfSnake);
    snakeCopy.shift();
    setSnakePieces(snakeCopy);
  };

  const onKeyDown = (event) => {
    event = event || window.event;
    switch (event.keyCode) {
      case 37:
        if (userDirection === "RIGHT") {
          return;
        }
        setUserDirection("LEFT");
        break;
      case 38:
        if (userDirection === "DOWN") {
          return;
        }
        setUserDirection("UP");
        break;
      case 39:
        if (userDirection === "LEFT") {
          return;
        }
        setUserDirection("RIGHT");
        break;
      case 40:
        if (userDirection === "UP") {
          return;
        }
        setUserDirection("DOWN");
        break;
      default:
        return;
    }
  };

  const collisionWithFood = () => {
    let headOfSnake = snakePieces[snakePieces.length - 1];
    let eat =
      foodPosition[0] === headOfSnake[0] && foodPosition[1] === headOfSnake[1];
    if (eat) {
      setFoodPosition(generatePossiblePosition());
      return true;
    } else {
      return false;
    }
  };

  const collisionWithBoundary = () => {
    let headOfSnake = snakePieces[snakePieces.length - 1];
    let exitX = headOfSnake[0] >= 800 || headOfSnake[0] < 0;
    let exitY = headOfSnake[1] >= 550 || headOfSnake[1] < 0;
    return exitX || exitY;
  };

  const collisionWithSelf = () => {
    let headOfSnake = snakePieces[snakePieces.length - 1];
    for (let i = 0; i < snakePieces.length - 1; i++) {
      if (
        headOfSnake[0] === snakePieces[i][0] &&
        headOfSnake[1] === snakePieces[i][1]
      ) {
        return true;
      }
    }
    return false;
  };

  const grow = () => {
    let snakeCopy = [...snakePieces];
    snakeCopy.unshift([snakeCopy[0], snakeCopy[1]]);
    setSnakePieces(snakeCopy);
  };

  const updateEvent = () => {
    snakeMovement();
    if (collisionWithBoundary() || collisionWithSelf()) {
      endGame();
    }
    if (collisionWithFood()) {
      grow();
    }
  };

  return (
    <>
      <div className="header"></div>
      <div role="button" tabIndex="0" onKeyDown={(e) => onKeyDown(e)}>
        <button onClick={startGame}>Start Game</button>
        <div className="gameDimension">
          <Snake snakePieceList={snakePieces} />
          <Food pos={foodPosition} />
        </div>
      </div>
    </>
  );
}

export default App;
