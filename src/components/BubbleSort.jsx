import React from "react";
import "./componentStyles/BubbleSort.css";
import { ArrowsComponent } from "./ArrowsComponent";

export const BubbleSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  const [valuesToSort, setValuesToSort] = React.useState([]); //stores original values
  const [bubbleValues, setBubbleValues] = React.useState([]); //stores values being changed
  const [showArrows, setShowArrows] = React.useState(false);
  const [tempBubbleValue, setTempBubbleValue] = React.useState("");
  const [startAlgo, setStartAlgo] = React.useState(false);
  const [bubbleIndicesClass, setBubbleIndicesClass] = React.useState([]);

  const winnerRef = React.useRef(winner);
  const bubblesRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

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
      let bubbleSort;

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

      bubbleSort = setInterval(() => {
        const currentWinner = winnerRef.current;

        if (currentWinner === "user") {
          setShowArrows(false);
          clearInterval(bubbleSort);
        }

        if (index < randomNumbers.length) {
          if (j < randomNumbers.length - 1) {
            setFirstArrowPosition(j);
            setSecondArrowPosition(j + 1);
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
          clearInterval(bubbleSort);
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

      let firstBubblePos =
        bubblesRef.current.children[firstIndex].getBoundingClientRect();
      let secondBubblePos =
        bubblesRef.current.children[secondIndex].getBoundingClientRect();
      let distanceX = secondBubblePos.x - firstBubblePos.x;
      bubblesRef?.current?.children[firstIndex].animate(
        [
          // keyframes
          { transform: `translateX(${distanceX}px)` },
        ],
        {
          duration: difficulty === "Easy" ? 300 : 100,
          timingFunction: "ease-in-out",
        }
      );

      // animation for second bubble
      bubblesRef?.current?.children[secondIndex].animate(
        [
          // keyframes
          { transform: `translateX(${-1 * distanceX}px)` },
        ],
        {
          duration: difficulty === "Easy" ? 300 : 100,
          timingFunction: "ease-in-out",
        }
      );
    }
  }, [bubbleIndicesClass]);

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
        <ArrowsComponent
          firstArrowPos={firstArrowPosition}
          secondArrowPos={secondArrowPosition}
          valuesRef={bubblesRef}
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
