import React from "react";
import "./componentStyles/BubbleSort.css";
import ArrowTop from "../images/arrow-top-white.svg";

export const BubbleSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  const [valuesToSort, setValuesToSort] = React.useState([]);
  const [bubbleValues, setBubbleValues] = React.useState([]);
  const [showArrows, setShowArrows] = React.useState(false);
  const [tempBubbleValue, setTempBubbleValue] = React.useState("");
  const [startAlgo, setStartAlgo] = React.useState(false);
  const [bubbleIndicesClass, setBubbleIndicesClass] = React.useState([]);

  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);
  const winnerRef = React.useRef(winner);
  const bubblesRef = React.useRef(null);

  React.useEffect(() => {
    setValuesToSort(randomNumbers);
    setBubbleValues(randomNumbers);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  // Bubble sort algorithm using setInterval and useEffect

  React.useEffect(() => {
    if (startAlgo) {
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
      setShowArrows(true);

      intervalAction = setInterval(() => {
        const currentWinner = winnerRef.current;

        if (currentWinner === "user") {
          setShowArrows(false);
          clearInterval(intervalAction);
        }

        if (index < randomNumbers.length) {
          if (j < randomNumbers.length - 1) {
            displayFirstArrow(j);
            displaySecondArrow(j + 1);
            let firstValue = Number(updatedValues[j]);
            let secondValue = Number(updatedValues[j + 1]);
            if (firstValue > secondValue) {
              let indices = [];
              indices.push(j);
              indices.push(j + 1);
              setBubbleIndicesClass(indices);
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
          setShowArrows(false);
          clearInterval(intervalAction);
          setStartAlgo(false);
          setWinner("computer");
        }
      }, difficultyTimeInterval);

      winnerRef.current = winner;
    }
  }, [startAlgo, winner]);

  React.useEffect(() => {
    if (bubbleIndicesClass.length > 0) {
      let firstIndex = bubbleIndicesClass[0];
      let secondIndex = bubbleIndicesClass[1];

      // animation for first bubble
      bubblesRef.current.children[firstIndex].style.animationName =
        "moveBubbleRight";
      bubblesRef.current.children[firstIndex].style.animationDuration =
        difficulty === "Easy" ? "0.3s" : "0.1s";
      bubblesRef.current.children[firstIndex].style.animationTimingFunction =
        "ease-in-out";

      // animation for second bubble
      bubblesRef.current.children[secondIndex].style.animationName =
        "moveBubbleLeft";
      bubblesRef.current.children[secondIndex].style.animationDuration =
        difficulty === "Easy" ? "0.3s" : "0.1s";
      bubblesRef.current.children[secondIndex].style.animationTimingFunction =
        "ease-in-out";
    }
  }, [bubbleIndicesClass]);

  function displayFirstArrow(index) {
    if (showArrows) {
      let firstArrowPos =
        bubblesRef.current.children[index]?.getBoundingClientRect();
      if (arrowRef.current) {
        arrowRef.current.style.top = `${
          firstArrowPos?.y - firstArrowPos?.height / 1.8
        }px`;
        arrowRef.current.style.left = `${
          firstArrowPos?.x + firstArrowPos?.width / 4
        }px`;
        arrowRef.current.classList.add("arrowBrowserAnimate");
        arrowRef.current.style.visibility = "visible";
      }
    }
  }

  function displaySecondArrow(index) {
    if (showArrows) {
      let secondArrowPos =
        bubblesRef.current.children[index]?.getBoundingClientRect();
      if (secondArrowRef.current) {
        secondArrowRef.current.style.top = `${
          secondArrowPos?.y - secondArrowPos?.height / 1.8
        }px`;
        secondArrowRef.current.style.left = `${
          secondArrowPos?.x + secondArrowPos?.width / 4
        }px`;
        secondArrowRef.current.classList.add("arrowBrowserAnimate");
        secondArrowRef.current.style.visibility = "visible";
      }
    }
  }

  return (
    <div className="bubbleSort">
      <div ref={bubblesRef} className="algorithm">
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
      </div>
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
      <div className="temporaryBubble">
        <p>Temporary bubble:</p>
        <div className="tempBubble">
          <p className="tempBubbleValue">{tempBubbleValue}</p>
          <div className="bubbleDot"></div>
          <div className="smallBubbleDot bubbleDot"></div>
        </div>
        <div className="sortedValues">
          {bubbleValues.map((value, index) => {
            return <div key={`${value} ${index}`}>{value}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

/* BubbleSort for the user */

export const BubbleSortUser = ({ randomNumbers, setWinner }) => {
  const [userValues, setUserValues] = React.useState([]);
  const [valuesSorted, setValuesSorted] = React.useState([]);
  const [userAttempt, setUserAttempt] = React.useState([]);

  React.useEffect(() => {
    setUserValues(randomNumbers);
    let correctAnswer = [...randomNumbers];
    setValuesSorted(correctAnswer.sort((a, b) => a - b));
  }, [randomNumbers]);

  React.useEffect(() => {
    if (userAttempt.length > 0 && userAttempt.length === randomNumbers.length) {
      if (JSON.stringify(userAttempt) == JSON.stringify(valuesSorted)) {
        setWinner("user");
      }
    }
  }, [userAttempt]);

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
      <div className="userCLickableBubbles">
        {userValues.map((x, index) => {
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
        })}
      </div>
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
