import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import "./componentStyles/SelectionSort.css";

export const SelectionSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);
  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);

  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [boxValues, setBoxValues] = React.useState([]); // stores values being changed

  const valuesToSortRef = React.useRef(null);
  const winnerRef = React.useRef(winner);

  const [sortedValues, setSortedValues] = React.useState([]);
  const [currentSmallest, setCurrentSmallest] = React.useState("");

  React.useEffect(() => {
    setValuesToSort(randomNumbers);
    setBoxValues(randomNumbers);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  // React.useEffect(() => {
  //   if (boxValues.length > 0) console.log("boxValues: " + boxValues);
  // }, [boxValues]);

  React.useEffect(() => {
    if (startAlgo) {
      let firstPos = 0;
      let secondPos = 1;
      let smallestValueIndex = firstPos;
      let selectionSort;

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

      selectionSort = setInterval(() => {
        const currentWinner = winnerRef.current;

        if (currentWinner === "user") {
          setShowArrows(false);
          clearInterval(selectionSort);
        }

        if (firstPos < randomNumbers.length - 1) {
          setFirstArrowPosition(firstPos);
          if (secondPos < randomNumbers.length) {
            setSecondArrowPosition(secondPos);
            let firstValue = Number(updatedValues[secondPos]);
            let smallestValue = Number(updatedValues[smallestValueIndex]);
            if (firstValue < smallestValue) {
              smallestValueIndex = secondPos;
            }
            setCurrentSmallest(updatedValues[smallestValueIndex]);
            secondPos++;
          } else {
            let temp = updatedValues[firstPos];
            updatedValues[firstPos] = updatedValues[smallestValueIndex];
            updatedValues[smallestValueIndex] = temp;

            firstPos++;
            secondPos = firstPos + 1;
            smallestValueIndex = firstPos;
            setBoxValues([...updatedValues]);
          }
        } else {
          setShowArrows(false);
          clearInterval(selectionSort);
          setStartAlgo(false);
          setWinner("computer");
        }
      }, difficultyTimeInterval);
      winnerRef.current = winner;
    }
  }, [startAlgo, winner]);

  return (
    <div className="selectionSort">
      <div ref={valuesToSortRef} className="numbersToSort">
        {boxValues.map((number, index) => {
          return (
            <div className="values" key={`${number} ${index}`}>
              {number}
            </div>
          );
        })}
      </div>
      {showArrows && (
        <ArrowsComponent
          firstArrowPos={firstArrowPosition}
          secondArrowPos={secondArrowPosition}
          valuesRef={valuesToSortRef}
        />
      )}
      <div className="currentValues">
        <div>Current smallest: {currentSmallest}</div>
      </div>
    </div>
  );
};

export const SelectionSortUser = ({ randomNumbers, setWinner }) => {
  return (
    <div className="selectionSortUser">
      <div className="userValuesToSort">
        {randomNumbers.map((number, index) => {
          return (
            <div className="values userValues" key={`${number} ${index}`}>
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};
