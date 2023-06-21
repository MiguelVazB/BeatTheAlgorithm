import React from "react";
import "./componentStyles/BubbleSort.css";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = ({ difficulty, randomNumbers, countDownOver }) => {
  const [valuesToSort, setValuesToSort] = React.useState([]);
  const [sortedValues, setSortedValues] = React.useState([]);

  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);
  const tempBubble = React.useRef(null);

  React.useEffect(() => {
    let values = randomNumbers.map((x, index) => {
      return (
        <div className="valueToSort valueToSortComputer" key={`${x} ${index}`}>
          <p>{x}</p>
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      );
    });
    setValuesToSort(values);
    setSortedValues(randomNumbers);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      bubbleSortAlgorithm();
    } else {
      arrowRef.current.style.visibility = "hidden";
      secondArrowRef.current.style.visibility = "hidden";
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

    const bubbles = document.getElementsByClassName("valueToSortComputer");
    intervalAction = setInterval(() => {
      if (index < randomNumbers.length) {
        if (j < randomNumbers.length - 1) {
          displayFirstArrow(j);
          displaySecondArrow(j + 1);
          let firstValue = Number(bubbles[j].children[0].innerHTML);
          let secondValue = Number(bubbles[j + 1].children[0].innerHTML);
          if (firstValue > secondValue) {
            bubbles[j].children[0].innerHTML = "";
            tempBubble.current.innerHTML = firstValue;
            bubbles[j].children[0].innerHTML = secondValue;
            bubbles[j + 1].children[0].innerHTML = tempBubble.current.innerHTML;
            setSortedValues((prev) => {
              return prev.map((value, index) => {
                if (index == j) {
                  return secondValue;
                } else if (index == j + 1) {
                  return tempBubble.current.innerHTML;
                } else {
                  return value;
                }
              });
            });
          } else {
            tempBubble.current.innerHTML = "";
          }
          j++;
        } else {
          index++;
          j = 0;
        }
      } else {
        clearInterval(intervalAction);
        arrowRef.current.style.visibility = "hidden";
        secondArrowRef.current.style.visibility = "hidden";
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
        <div className="tempBubble">
          <p className="tempBubbleValue" ref={tempBubble}>
            100
          </p>
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
      </div>
      <div className="sortedValues">
        {sortedValues.map((value, index) => {
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
