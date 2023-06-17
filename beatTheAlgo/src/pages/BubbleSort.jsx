import React from "react";
import "./pageStyles/BubbleSort.css";
import { generateXRandomNumbers } from "../utils/randomNumbers.jsx";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = () => {
  const [valuesToSort, setValuesToSort] = React.useState([]);

  const arrowRef = React.useRef(null);

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
    arrowRef.current.style.top = `${pos?.y - pos?.height / 8}px`;
    arrowRef.current.style.left = `${pos?.x + pos?.width / 4}px`;
  }, [arrowRef, valuesToSort]);

  return (
    <main className="bubbleSort">
      {/* <dialog open className="difficultyDialog">
        <p>Choose difficulty:</p>
        <form method="dialog">
          <input type="radio" id="easy" name="difficulty" value="easy"></input>
          <label htmlFor="easy">Easy</label>
          <input
            type="radio"
            id="intermediate"
            name="difficulty"
            value="intermediate"
          ></input>
          <label htmlFor="intermediate">Intermediate</label>
          <input type="radio" id="hard" name="difficulty" value="hard"></input>
          <label htmlFor="hard">Hard</label>
          <input
            type="radio"
            id="impossible"
            name="difficulty"
            value="impossible"
          ></input>
          <label htmlFor="impossible">Impossible</label>
          <button>Go</button>
        </form>
      </dialog> */}
      <div className="computerSide">
        {valuesToSort}
        <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
      </div>
      <div className="userSide">
        <h1 className="algorithmDisplayed">Bubble Sort</h1>
        {/* {valuesToSort} */}
      </div>
    </main>
  );
};
