import React from "react";
import "./componentStyles/BubbleSort.css";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = ({ difficulty, randomNumbers, countDownOver }) => {
  const [valuesToSort, setValuesToSort] = React.useState([]);

  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);

  React.useEffect(() => {
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
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      const bubbles = document.getElementsByClassName("valueToSort");
      for (let index = 0; index < randomNumbers.length - 1; index++) {
        let firstArrowPos = bubbles[index]?.getBoundingClientRect();
        arrowRef.current.style.top = `${
          firstArrowPos?.y - firstArrowPos?.height / 4
        }px`;
        arrowRef.current.style.left = `${
          firstArrowPos?.x + firstArrowPos?.width / 4
        }px`;
        arrowRef.current.classList.add("arrowBrowserAnimate");
        arrowRef.current.style.visibility = "visible";
        for (let j = 0; j < randomNumbers.length - index - 1; j++) {
          let secondArrowPos = bubbles[j]?.getBoundingClientRect();
          secondArrowRef.current.style.top = `${
            secondArrowPos?.y - secondArrowPos?.height / 4
          }px`;
          secondArrowRef.current.style.left = `${
            secondArrowPos?.x + secondArrowPos?.width / 4
          }px`;
          secondArrowRef.current.classList.add("arrowBrowserAnimate");
          secondArrowRef.current.style.visibility = "visible";
        }
      }
      // console.log(valuesToSort[0]?.props?.children[0]);
      // const countDown = setInterval(() => {
      //   console.log("hi");
      // }, 5000);
    }
  }, [countDownOver]);

  return (
    <div className="bubbleSort">
      {valuesToSort}
      <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
      <img src={ArrowTop} ref={secondArrowRef} className="arrowBrowser" />
    </div>
  );
};

/* BubbleSort for the user */

export const BubbleSortUser = ({ randomNumbers }) => {
  const [userValues, setUserValues] = React.useState([]);

  React.useEffect(() => {
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
    setUserValues(userValues);
  }, [randomNumbers]);

  async function popBubble(index) {
    document
      .getElementsByClassName("userBubbles")
      [index].classList.add("bubblePopAnimate");
  }

  return <div className="bubbleSort">{userValues}</div>;
};
