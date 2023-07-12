import React from "react";
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

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  React.useEffect(() => {
    if (countDownOver) {
      //   setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  React.useEffect(() => {
    if (difficulty) {
      switch (difficulty) {
        case "Easy":
          setDifficultyTimeInterval(5000);
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
            clearInterval(sortingInterval);
            console.log("Sorted array:", sorted);
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

          console.log("Partition:", sorted.slice(left, rightLimit));
          merge(left, right, leftLimit, rightLimit, sorted, buffer);
          console.log("PartitionSorted:", buffer.slice(left, rightLimit));

          i += 2 * step;
        }, difficultyTimeInterval);

        return sorted;
      };

      const merge = (left, right, leftLimit, rightLimit, sorted, buffer) => {
        let i = left;
        while (left < leftLimit && right < rightLimit) {
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
          } else {
            buffer[i++] = sorted[right++];
          }
          console.log("Comparison:", sorted[left - 1], "<=", sorted[right - 1]);
        }
        while (left < leftLimit) {
          buffer[i++] = sorted[left++];
        }
        while (right < rightLimit) {
          buffer[i++] = sorted[right++];
        }
        for (let j = left; j < right; j++) {
          sorted[j] = buffer[j];
        }
      };

      let tempArray = [18, 12, 16, 22, 28, 5, 9];
      mergeSort(tempArray);

      //   console.log("Original array:", valuesToSort);
      //   mergeSort(valuesToSort);
    }
  }, [startAlgo, winner]);

  return (
    <div className="mergeSort">
      <div className="valuesToSortContainer">
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
    </div>
  );
};

// user merge sort

export const MergeSortUser = ({ randomNumbers, setWinner }) => {
  return <div>hi</div>;
};
