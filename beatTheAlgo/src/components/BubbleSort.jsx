import React from "react";
import "./componentStyles/BubbleSort.css";
import { generateXRandomNumbers } from "../utils/randomNumbers.jsx";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = () => {
  const [valuesToSort, setValuesToSort] = React.useState([]);
  const [userValues, setUserValues] = React.useState([]);

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
    let userValues = randomNumbers.map((x, index) => {
      return (
        <div
          className="valueToSort userBubbles"
          key={`${x} ${index}`}
          onClick={() => popBubble(index)}
        >
          {x}
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      );
    });
    setValuesToSort(values);
    setUserValues(userValues);
  }, []);

  async function popBubble(index) {
    document.getElementsByClassName("userBubbles")[index].style.display =
      "none";
  }

  React.useEffect(() => {
    const bubbles = document.getElementsByClassName("valueToSort");
    let pos = bubbles[0]?.getBoundingClientRect();
    arrowRef.current.style.top = `${pos?.y - pos?.height / 4}px`;
    arrowRef.current.style.left = `${pos?.x + pos?.width / 4}px`;
    console.log(valuesToSort[0]?.props?.children[0]);
  }, [valuesToSort]);

  return (
    <div className="bubbleSort">
      {valuesToSort}
      <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
      {/* <img src={ArrowTop} ref={arrowRef} className="arrowBrowser second" /> */}
    </div>
  );
};
