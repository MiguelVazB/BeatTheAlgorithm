import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import { useContext } from "react";
import { GameContext } from "../utils/gameContext";
import "./componentStyles/QuickSort.css";

export const QuickSort = () => {
  const gameProperties = useContext(GameContext);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);
  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);

  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [boxValues, setBoxValues] = React.useState([]); // stores values being changed

  const valuesToSortRef = React.useRef(null);
  const winnerRef = React.useRef(gameProperties.winner);

  const [pivotValue, setPivotValue] = React.useState("");

  React.useEffect(() => {
    setValuesToSort(gameProperties.randomNumbers);
    setBoxValues(gameProperties.randomNumbers);
  }, [gameProperties.randomNumbers]);

  React.useEffect(() => {
    if (gameProperties.countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [gameProperties.countDownOver]);

  // quick sort algorithm
  React.useEffect(() => {
    let difficultyTimeInterval;

    switch (gameProperties.difficulty) {
      case "Easy":
        difficultyTimeInterval = 700;
        break;
      case "Intermediate":
        difficultyTimeInterval = 500;
        break;
      case "Hard":
        difficultyTimeInterval = 300;
        break;
      case "Impossible":
        difficultyTimeInterval = 10;
        break;
    }

    const swap = (arr, left, right) => {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low;
      //Partition the array into two parts using the pivot
      for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
          swap(arr, i, j);
          i++;
        }
      }
      swap(arr, i, high);
      //Return the pivot position
      return i;
    };

    if (startAlgo) {
      let updatedValues = [...valuesToSort];
      let stack = [];
      let start = 0;
      let end = updatedValues.length - 1;

      stack.push(start, end);

      let quickSortInterval = setInterval(() => {
        if (stack.length <= 0) {
          console.log(updatedValues);
          clearInterval(quickSortInterval);
        }
        let x = stack.shift();
        let y = stack.shift();

        let pivot = partition(updatedValues, x, y);
        setPivotValue(updatedValues[pivot]);

        if (pivot - 1 > x) {
          stack.push(x, pivot - 1);
        }

        if (pivot + 1 < y) {
          stack.push(pivot + 1, y);
        }
      }, difficultyTimeInterval);
    }
  }, [startAlgo, gameProperties.winner]);

  return (
    <div className="quickSort">
      <p className="pivot">Pivot value: {pivotValue}</p>
      <div ref={valuesToSortRef} className="numbersToSort">
        {boxValues.map((number, index) => {
          return (
            <div className="values" key={`${number} ${index}`}>
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const QuickSortUser = () => {
  return <div>user</div>;
};
