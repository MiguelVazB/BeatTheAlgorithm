import React from "react";
import "./pageStyles/GameLayout.css";
import { BubbleSort, BubbleSortUser } from "../components/BubbleSort";

export default function GameLayout({ algo }) {
  const [difficulty, setDifficulty] = React.useState("");
  const [algorithmBrowser, setAlgorithmBrowser] = React.useState("");
  const [algorithmUser, setAlgorithmUser] = React.useState("");
  const difficultyOverlay = React.useRef(null);
  const countDownRef = React.useRef(null);

  React.useEffect(() => {
    switch (algo) {
      case "bubble_sort":
        setAlgorithmBrowser(
          <BubbleSort difficulty={difficulty ? difficulty : ""} />
        );
        setAlgorithmUser(<BubbleSortUser />);
        break;
    }
  }, []);

  React.useEffect(() => {
    if (difficulty.length > 0) {
      difficultyOverlay.current.style.display = "none";
      countDownRef.current.style.visibility = "visible";
      countDown();
    }
  }, [difficulty]);

  function countDown() {
    let countDownValue = 3;
    const countDown = setInterval(() => {
      countDownRef.current.innerHTML = countDownValue;
      countDownValue -= 1;
      if (countDownValue < 0) {
        countDownRef.current.style.display = "none";
        clearInterval(countDown);
        console.log("done with countdown");
      }
    }, 1000);
  }

  function setDifficultyFunction() {
    let difficultySelected = document.querySelector("#difficulty").value;
    setDifficulty(
      difficultySelected.charAt(0).toUpperCase() + difficultySelected.slice(1)
    );
  }

  return (
    <main className="gameLayout">
      <div className="difficultyOverlay" ref={difficultyOverlay}>
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
      <div className="countDown" ref={countDownRef}></div>
      <div className="computerSide">
        {algorithmBrowser ? algorithmBrowser : ""}
      </div>
      <div className="userSide">
        <h1 className="algorithmDisplayed">
          {String(algo)
            .split("_")
            .map((x) => {
              return x.charAt(0).toUpperCase() + x.slice(1) + " ";
            })}
          <span>{difficulty ? `(${difficulty})` : ""}</span>
        </h1>
        {algorithmUser ? algorithmUser : ""}
      </div>
    </main>
  );
}
