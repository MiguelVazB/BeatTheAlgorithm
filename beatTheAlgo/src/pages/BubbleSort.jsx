import React from "react";
import "./pageStyles/BubbleSort.css";
import { generateXRandomNumbers } from "../utils/randomNumbers.jsx";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = () => {
  const [valuesToSort, setValuesToSort] = React.useState([]);
  const [difficulty, setDifficulty] = React.useState("");

  const arrowRef = React.useRef(null);

  const difficultyOverlay = React.useRef(null);

  React.useEffect(() => {
    let randomNumbers = generateXRandomNumbers(9);
    let values = randomNumbers.map((x, index) => {
      return (
        <div className="valueToSort" key={`${x} ${index}`}>
          {x}
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      );
    });
    setValuesToSort(values);
  }, []);

  React.useEffect(() => {
    const bubbles = document.getElementsByClassName("valueToSort");
    let pos = bubbles[0]?.getBoundingClientRect();
    arrowRef.current.style.top = `${pos?.y - pos?.height / 4}px`;
    arrowRef.current.style.left = `${pos?.x + pos?.width / 4}px`;
    console.log(valuesToSort[0]?.props?.children[0]);
  }, [arrowRef, valuesToSort]);

  function setDifficultyFunction() {
    setDifficulty(document.querySelector("#difficulty").value);
  }

  React.useEffect(() => {
    if (difficulty.length > 0) {
      difficultyOverlay.current.style.display = "none";
    }
    console.log(difficulty);
  }, [difficulty]);

  return (
    <main className="bubbleSort">
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
      <div className="computerSide">
        {valuesToSort}
        <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
        {/* <img src={ArrowTop} ref={arrowRef} className="arrowBrowser second" /> */}
      </div>
      <div className="userSide">
        <h1 className="algorithmDisplayed">Bubble Sort</h1>
      </div>
    </main>
  );
};
