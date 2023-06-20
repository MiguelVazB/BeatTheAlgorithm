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
      bubbleSortAlgorithm();
    } else {
      arrowRef.current.style.visibility = "hidden";
      secondArrowRef.current.style.visibility = "hidden";
    }
  }, [countDownOver]);

  function bubbleSortAlgorithm() {
    let index = 0;
    let intervalAction;

    const bubbles = document.getElementsByClassName("valueToSort");
    intervalAction = setInterval(() => {
      if (index < randomNumbers.length) {
        displayFirstArrow(index);
        displaySecondArrow(index + 1);
        index++;
      } else {
        clearInterval(intervalAction);
      }
    }, 5000);
    console.log("hi");
  }

  function displayFirstArrow(index) {
    console.log("displayFirstArrow function called " + index);
    const bubbles = document.getElementsByClassName("valueToSort");
    let firstArrowPos = bubbles[index]?.getBoundingClientRect();
    arrowRef.current.style.top = `${
      firstArrowPos?.y - firstArrowPos?.height / 4
    }px`;
    arrowRef.current.style.left = `${
      firstArrowPos?.x + firstArrowPos?.width / 4
    }px`;
    arrowRef.current.classList.add("arrowBrowserAnimate");
    arrowRef.current.style.visibility = "visible";
  }

  function displaySecondArrow(index) {
    const bubbles = document.getElementsByClassName("valueToSort");
    let secondArrowPos = bubbles[index]?.getBoundingClientRect();
    secondArrowRef.current.style.top = `${
      secondArrowPos?.y - secondArrowPos?.height / 4
    }px`;
    secondArrowRef.current.style.left = `${
      secondArrowPos?.x + secondArrowPos?.width / 4
    }px`;
    secondArrowRef.current.classList.add("arrowBrowserAnimate");
    secondArrowRef.current.style.visibility = "visible";
  }

  return (
    <div className="bubbleSort">
      <div className="algorithm">
        {valuesToSort}
        <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
        <img
          src={ArrowTop}
          ref={secondArrowRef}
          className="arrowBrowser second"
        />
      </div>
      <div className="temporaryBubble">
        <p>Temporary bubble:</p>
        <div className="valueToSort">
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      </div>
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

  return <div className="bubbleSortUser">{userValues}</div>;
};
