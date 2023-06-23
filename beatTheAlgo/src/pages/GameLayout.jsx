import React from "react";
import "./pageStyles/GameLayout.css";
import { generateXRandomNumbers } from "../utils/randomNumbers.jsx";
import { BubbleSort, BubbleSortUser } from "../components/BubbleSort";

export default function GameLayout({ algo }) {
  const [bubbleValues, setBubbleValues] = React.useState([]);

  const [countDownOver, setCountDownOver] = React.useState(false);
  const [showWinner, setShowWinner] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  const [difficulty, setDifficulty] = React.useState("");

  const difficultyOverlay = React.useRef(null);
  const countDownRef = React.useRef(null);

  React.useEffect(() => {
    let randomNumbers = generateXRandomNumbers(9);
    setBubbleValues(randomNumbers);
  }, []);

  React.useEffect(() => {
    if (difficulty.length > 0) {
      difficultyOverlay.current.style.display = "none";
      countDownRef.current.style.visibility = "visible";
      countDown();
    }
  }, [difficulty]);

  React.useEffect(() => {
    setShowWinner(winner);
    // console.log(winner);
  }, [winner]);

  function getComputerSideComponent() {
    switch (algo) {
      case "bubble_sort":
        return (
          <BubbleSort
            difficulty={difficulty ? difficulty : ""}
            randomNumbers={bubbleValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
    }
  }

  function getUserSideComponent() {
    switch (algo) {
      case "bubble_sort":
        return (
          <BubbleSortUser randomNumbers={bubbleValues} setWinner={setWinner} />
        );
    }
  }

  function countDown() {
    let countDownValue = 3;
    const countDown = setInterval(() => {
      countDownRef.current.innerHTML = countDownValue;
      countDownValue -= 1;
      if (countDownValue < 0) {
        countDownRef.current.style.display = "none";
        setCountDownOver(true);
        clearInterval(countDown);
      }
    }, 0); //put it back to 1000 ms = 1 second
  }

  function setDifficultyFunction() {
    let difficultySelected = document.querySelector("#difficulty").value;
    setDifficulty(
      difficultySelected.charAt(0).toUpperCase() + difficultySelected.slice(1)
    );
  }

  function restartGame() {
    window.location.reload(false);
  }

  return (
    <main className="gameLayout">
      <div className="overlay difficultyOverlay" ref={difficultyOverlay}>
        <div className="algoDescription AlgoInfo">
          <p className="infoTitle">
            {String(algo)
              .split("_")
              .map((x) => {
                return x.charAt(0).toUpperCase() + x.slice(1) + " ";
              })}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            quisquam hic iste ratione quis. Quis nesciunt ad voluptate sed natus
            dolor dolore provident ab similique, doloremque sit dolorem iure
            ipsum.
          </p>
        </div>
        <div className="difficultySection">
          <p>Choose Difficulty:</p>
          <div className="difficultyOptions">
            <select name="difficulty" id="difficulty">
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
              <option value="impossible">Impossible</option>
            </select>
            <button
              className="setDifficultyButton"
              onClick={setDifficultyFunction}
            >
              Start
            </button>
          </div>
        </div>
        <div className="algoDescription gameInstructions">
          <p className="infoTitle">Instructions</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugiat
            possimus quia. Inventore aliquam ea quam facilis soluta, saepe
            consequuntur ipsa quaerat aperiam nihil possimus iusto odit quidem
            autem eligendi?
          </p>
        </div>
      </div>
      <div className="overlay countDown" ref={countDownRef}></div>
      {showWinner && (
        <div className="overlay winner">
          {winner == "user" ? "YOU Beat the Algorithm!!!" : "Algorithm Won!"}
          <button className="tryAgainBtn" onClick={restartGame}>
            {winner == "user" ? "Play Again" : "Try Again"}
          </button>
        </div>
      )}
      <h1 className="algorithmDisplayed">
        {String(algo)
          .split("_")
          .map((x) => {
            return x.charAt(0).toUpperCase() + x.slice(1) + " ";
          })}
        <span>{difficulty ? `(${difficulty})` : ""}</span>
      </h1>
      <div className="computerSide">{getComputerSideComponent()}</div>
      <div className="userSide">{getUserSideComponent()}</div>
    </main>
  );
}
