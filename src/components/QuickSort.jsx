import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import { useContext } from "react";
import { GameContext } from "../utils/gameContext";
import "./componentStyles/QuickSort.css";

export const QuickSort = () => {
  const gameProperties = useContext(GameContext);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(0);
  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const [difficultyTimeInterval, setDifficultyTimeInterval] =
    React.useState(10000);

  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [boxValues, setBoxValues] = React.useState([]); // stores values being changed

  const valuesToSortRef = React.useRef(null);
  const winnerRef = React.useRef(gameProperties.winner);

  const [pivotValue, setPivotValue] = React.useState("");
  const [arrowsStack, setArrowsStack] = React.useState([]);
  const [swapsStack, setSwapsStack] = React.useState([]);

  React.useEffect(() => {
    setValuesToSort(gameProperties.randomNumbers);
    setBoxValues(gameProperties.randomNumbers);
  }, [gameProperties.randomNumbers]);

  React.useEffect(() => {
    if (gameProperties.countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [gameProperties.countDownOver]);

  // display the arrows in the right position
  React.useEffect(() => {
    console.log(arrowsStack);
    if (arrowsStack.length > 0) {
      const arrowsInterval = setInterval(() => {
        if (arrowsStack.length <= 0) {
          clearInterval(arrowsInterval);
        }
        let firstArrow = arrowsStack.shift();
        let secondArrow = arrowsStack.shift();
        // console.log(`firstArrow: ${firstArrow}, secondArrow ${secondArrow}`);
        setFirstArrowPosition(firstArrow);
        setSecondArrowPosition(secondArrow);
      }, difficultyTimeInterval / arrowsStack.length);
    }
  }, [arrowsStack]);

  React.useEffect(() => {}, [swapsStack]);

  // Quick sort algorithm
  React.useEffect(() => {
    switch (gameProperties.difficulty) {
      case "Easy":
        setDifficultyTimeInterval(10000);
        break;
      case "Intermediate":
        setDifficultyTimeInterval(5000);
        break;
      case "Hard":
        setDifficultyTimeInterval(3000);
        break;
      case "Impossible":
        setDifficultyTimeInterval(1000);
        break;
    }

    const swap = (arr, left, right) => {
      console.log(`swap ${left}, ${right}`);
      [arr[left], arr[right]] = [arr[right], arr[left]];
    };

    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low;
      //Partition the array into two parts using the pivot
      for (let j = low; j < high; j++) {
        console.log(`i: ${j}, high: ${high}`);
        setArrowsStack((prev) => [...prev, j, high]);
        if (arr[j] <= pivot) {
          setSwapsStack((prev) => [...prev, i, j]);
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
      {showArrows && (
        <ArrowsComponent
          firstArrowPos={firstArrowPosition}
          secondArrowPos={secondArrowPosition}
          valuesRef={valuesToSortRef}
          yOffset={2}
        />
      )}
    </div>
  );
};

export const QuickSortUser = () => {
  return <div>user</div>;
};
