import React from "react";
import "./pageStyles/GameLayout.css";
import { BubbleSort } from "../components/BubbleSort";

export default function GameLayout({ algo }) {
  const [difficulty, setDifficulty] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState("");
  const difficultyOverlay = React.useRef(null);

  function setDifficultyFunction() {
    setDifficulty(document.querySelector("#difficulty").value);
  }

  React.useEffect(() => {
    switch (algo) {
      case "bubble_sort":
        setAlgorithm(<BubbleSort />);
        break;
    }
  }, [algorithm]);

  React.useEffect(() => {
    if (difficulty.length > 0) {
      difficultyOverlay.current.style.display = "none";
    }
    console.log(difficulty);
  }, [difficulty]);

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
            Set Difficulty
          </button>
        </div>
      </div>
      <div className="computerSide">{algorithm ? algorithm : ""}</div>
      <div className="userSide">
        <h1 className="algorithmDisplayed">
          {String(algo)
            .split("_")
            .map((x) => {
              return x.charAt(0).toUpperCase() + x.slice(1) + " ";
            })}
          <span>{difficulty ? `(${difficulty})` : ""}</span>
        </h1>
        {/* {userValues} */}
      </div>
    </main>
  );
}
