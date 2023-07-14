import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import "./componentStyles/MergeSort.css";

export const MergeSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [squareValues, setSquareValues] = React.useState([]); // stores values being changed

  const [showArrows, setShowArrows] = React.useState(false);
  const [difficultyTimeInterval, setDifficultyTimeInterval] = React.useState(0);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const winnerRef = React.useRef(winner);
  const mergeSortValuesRef = React.useRef(null);

  const [startArrowMovement, setStartArrowMovement] = React.useState(false);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  const positionRef = React.useRef(firstArrowPosition);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      setStartArrowMovement(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
      setStartArrowMovement(false);
    }
  }, [countDownOver]);

  //updated position ref
  React.useEffect(() => {
    if (firstArrowPosition) {
      positionRef.current = firstArrowPosition;
    }
  }, [firstArrowPosition]);

  // move arrows
  React.useEffect(() => {
    if (startArrowMovement) {
      const arrowMovementInterval = setInterval(() => {
        if (startAlgo === false || positionRef.current === 22) {
          clearInterval(arrowMovementInterval);
          setShowArrows(false);
        }
        setFirstArrowPosition((prev) => prev + 2);
        setSecondArrowPosition((prev) => prev + 2);
      }, difficultyTimeInterval / 1.25); //1.25 - 1.3
    }
  }, [startArrowMovement]);

  React.useEffect(() => {
    if (difficulty) {
      switch (difficulty) {
        case "Easy":
          setDifficultyTimeInterval(3000);
          break;
        case "Intermediate":
          setDifficultyTimeInterval(2000);
          break;
        case "Hard":
          setDifficultyTimeInterval(1000);
          break;
        case "Impossible":
          setDifficultyTimeInterval(100);
          break;
      }
    }
  }, [difficulty]);

  React.useEffect(() => {
    setValuesToSort([...randomNumbers]);
    setSquareValues([...randomNumbers]);
  }, [randomNumbers]);

  // merge sort algorithm
  React.useEffect(() => {
    if (startAlgo && valuesToSort.length > 0) {
      const mergeSort = (arr) => {
        let sorted = Array.from(arr);
        let n = sorted.length;
        let buffer = new Array(n);
        let step = 1;
        let i = 0;

        const sortingInterval = setInterval(() => {
          if (step >= n) {
            setShowArrows(false);
            setWinner("computer");
            setStartAlgo(false);
            console.log("Sorted array:", sorted);
            clearInterval(sortingInterval);
            return;
          }

          if (i >= n) {
            let temp = sorted;
            sorted = buffer;
            buffer = temp;
            step *= 2;
            i = 0;
            return;
          }

          let leftStart = i;
          let left = leftStart;
          let right = Math.min(left + step, n);
          let leftLimit = right;
          let rightLimit = Math.min(right + step, n);

          let partition = sorted.slice(left, rightLimit);
          console.log("partition: ", partition);
          merge(left, right, leftLimit, rightLimit, sorted, buffer);

          console.log("PartitionSorted:", buffer.slice(left, rightLimit));
          setSquareValues((prev) => {
            return [...prev, ...buffer.slice(left, rightLimit)];
          });

          i += 2 * step;
        }, difficultyTimeInterval);

        return sorted;
      };

      const merge = (left, right, leftLimit, rightLimit, sorted, buffer) => {
        let i = left;
        while (left < leftLimit && right < rightLimit) {
          console.log(`left: ${sorted[left]}, right: ${sorted[leftLimit]}`);
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
          } else {
            buffer[i++] = sorted[right++];
          }
        }
        while (left < leftLimit) {
          console.log(`left: ${sorted[left]}`);
          buffer[i++] = sorted[left++];
        }
        while (right < rightLimit) {
          console.log(`right: ${sorted[leftLimit]}`);
          buffer[i++] = sorted[right++];
        }
        for (let j = left; j < right; j++) {
          sorted[j] = buffer[j];
        }
      };

      console.log("Original array:", valuesToSort);
      mergeSort(valuesToSort);
    }
  }, [startAlgo, winner]);

  return (
    <div className="mergeSort">
      <div ref={mergeSortValuesRef} className="valuesToSortContainer">
        {squareValues.map((value, index) => {
          return (
            <div
              className={`valueToSort valueToSort${index}`}
              key={`${value} ${index}`}
            >
              {value}
            </div>
          );
        })}
      </div>
      {showArrows && (
        <ArrowsComponent
          firstArrowPos={firstArrowPosition}
          secondArrowPos={secondArrowPosition}
          valuesRef={mergeSortValuesRef}
          xOffset={100}
          yOffset={1}
        />
      )}
    </div>
  );
};

// user merge sort

export const MergeSortUser = ({ randomNumbers, setWinner }) => {
  return <div>hi</div>;
};
