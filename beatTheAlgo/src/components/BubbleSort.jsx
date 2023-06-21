import React from "react";
import "./componentStyles/BubbleSort.css";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = ({ difficulty, randomNumbers, countDownOver }) => {
  const [valuesToSort, setValuesToSort] = React.useState([]);
  const [bubbleValues, setBubbleValues] = React.useState([]);
  const [showArrows, setShowArrows] = React.useState(false);
  const [tempBubbleValue, setTempBubbleValue] = React.useState("");

  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);

  React.useEffect(() => {
    setValuesToSort(randomNumbers);
    setBubbleValues(randomNumbers);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      bubbleSortAlgorithm();
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  // Bubble sort algorithm using setInterval
  function bubbleSortAlgorithm() {
    let index = 0;
    let j = 0;
    let intervalAction;

    let difficultyTimeInterval;

    switch (difficulty) {
      case "Easy":
        difficultyTimeInterval = 500;
        break;
      case "Intermediate":
        difficultyTimeInterval = 200;
        break;
      case "Hard":
        difficultyTimeInterval = 100;
        break;
      case "Impossible":
        difficultyTimeInterval = 10;
        break;
    }

    let updatedValues = [...valuesToSort];
    intervalAction = setInterval(() => {
      if (index < randomNumbers.length) {
        if (j < randomNumbers.length - 1) {
          setShowArrows(true);
          displayFirstArrow(j);
          displaySecondArrow(j + 1);
          let firstValue = Number(updatedValues[j]);
          let secondValue = Number(updatedValues[j + 1]);
          if (firstValue > secondValue) {
            setTempBubbleValue(firstValue);
            let tempValue = firstValue;
            updatedValues[j] = secondValue;
            updatedValues[j + 1] = tempValue;
            setBubbleValues([...updatedValues]);
          } else {
            setTempBubbleValue("");
          }
          j++;
        } else {
          index++;
          j = 0;
        }
      } else {
        clearInterval(intervalAction);
        setShowArrows(false);
      }
    }, difficultyTimeInterval);
  }

  function displayFirstArrow(index) {
    const bubbles = document.getElementsByClassName("valueToSortComputer");
    let firstArrowPos = bubbles[index]?.getBoundingClientRect();
    arrowRef.current.style.top = `${
      firstArrowPos?.y - firstArrowPos?.height / 8
    }px`;
    arrowRef.current.style.left = `${
      firstArrowPos?.x + firstArrowPos?.width / 4
    }px`;
    arrowRef.current.classList.add("arrowBrowserAnimate");
    arrowRef.current.style.visibility = "visible";
  }

  function displaySecondArrow(index) {
    const bubbles = document.getElementsByClassName("valueToSortComputer");
    let secondArrowPos = bubbles[index]?.getBoundingClientRect();
    secondArrowRef.current.style.top = `${
      secondArrowPos?.y - secondArrowPos?.height / 8
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
        {bubbleValues.map((x, index) => {
          return (
            <div
              className="valueToSort valueToSortComputer"
              key={`${x} ${index}`}
            >
              <p>{x}</p>
              <div className="bubbleDot"></div>
              <div className="smallBubbleDot bubbleDot"></div>
            </div>
          );
        })}
        {showArrows && (
          <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
        )}
        {showArrows && (
          <img
            src={ArrowTop}
            ref={secondArrowRef}
            className="arrowBrowser second"
          />
        )}
      </div>
      <div className="temporaryBubble">
        <p>Temporary bubble:</p>
        <div className="tempBubble">
          <p className="tempBubbleValue">{tempBubbleValue}</p>
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      </div>
      <div className="sortedValues">
        {bubbleValues.map((value, index) => {
          return <div key={`${value} ${index}`}>{value}</div>;
        })}
      </div>
    </div>
  );
};

/* BubbleSort for the user */

export const BubbleSortUser = ({ randomNumbers }) => {
  const [userValues, setUserValues] = React.useState([]);
  const [userAttempt, setUserAttempt] = React.useState([]);

  React.useEffect(() => {
    let userValues = randomNumbers.map((x, index) => {
      return (
        <div
          className="valueToSort userBubbles"
          key={`${x} ${index}`}
          onClick={() => popBubble(index)}
        >
          <p>{x}</p>
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      );
    });
    setUserValues(userValues);
  }, [randomNumbers, userAttempt]);

  async function popBubble(index) {
    let popBubble = document.getElementsByClassName("userBubbles");
    popBubble[index].classList.add("bubblePopAnimate");
    popBubble[index].style.pointerEvents = "none";
    setUserAttempt((prev) => [
      ...prev,
      Number(popBubble[index].children[0].innerHTML),
    ]);
  }

  function resetUserAttempt() {
    setUserAttempt([]);
    let popBubble = document.getElementsByClassName("userBubbles");
    for (let i = 0; i < popBubble.length; i++) {
      popBubble[i].classList.remove("bubblePopAnimate");
      popBubble[i].style.pointerEvents = "auto";
    }
  }

  return (
    <div className="bubbleSortUser">
      <div className="userCLickableBubbles">{userValues}</div>
      <div className="userAttempt">
        {userAttempt.map((x, index) => {
          return <div key={index}>{x}</div>;
        })}
      </div>
      <div className="buttonWrapper">
        <button className="resetBtn" onClick={resetUserAttempt}>
          Reset
        </button>
      </div>
    </div>
  );
};
