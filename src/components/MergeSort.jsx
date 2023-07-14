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
  const [squareColors, setSquareColors] = React.useState([]); // stores colors of the values

  const [showArrows, setShowArrows] = React.useState(false);
  const [difficultyTimeInterval, setDifficultyTimeInterval] = React.useState(0);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const winnerRef = React.useRef(winner);
  const mergeSortValuesRef = React.useRef(null);

  const [startArrowMovement, setStartArrowMovement] = React.useState(false);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  const positionRef = React.useRef(firstArrowPosition);

  // const [swapPosition, setSwapPosition] = React.useState([]);

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

  React.useEffect(() => {
    if (startAlgo) {
      // update position ref with firstArrowPosition
      positionRef.current = firstArrowPosition;

      // swap first and second values
      if (squareColors.length === 4) {
        setClassColorFunc(firstArrowPosition);
        setClassColorFunc(secondArrowPosition);
      }
    }
  }, [firstArrowPosition, secondArrowPosition]);

  function setClassColorFunc(currentArrowPos) {
    let colorIndex;
    let valuePointed = Number(
      mergeSortValuesRef?.current?.children[currentArrowPos]?.innerHTML
    );
    let valueToCompare;
    squareColors.forEach((array, index) => {
      if (colorIndex) return;
      array.forEach((value) => {
        valueToCompare = Number(
          mergeSortValuesRef?.current?.children[value]?.innerHTML
        );
        if (valueToCompare === valuePointed) colorIndex = index;
        return;
      });
    });
    switch (colorIndex) {
      case 0:
        mergeSortValuesRef?.current?.children[currentArrowPos].classList.add(
          "squaresColor1"
        );
        break;
      case 1:
        mergeSortValuesRef?.current?.children[currentArrowPos].classList.add(
          "squaresColor2"
        );
        break;
      case 2:
        mergeSortValuesRef?.current?.children[currentArrowPos].classList.add(
          "squaresColor3"
        );
        break;
      case 3:
        mergeSortValuesRef?.current?.children[currentArrowPos].classList.add(
          "squaresColor4"
        );
        break;
    }
  }

  // React.useEffect(() => {
  //   if (swapPosition.length > 0) {
  //     console.log(swapPosition);
  //     let firstIndex = swapPosition[0];
  //     let secondIndex = swapPosition[1];

  //     let firstValuePos =
  //       mergeSortValuesRef?.current?.children[
  //         firstIndex
  //       ].getBoundingClientRect();
  //     let secondValuePos =
  //       mergeSortValuesRef?.current?.children[
  //         secondIndex
  //       ].getBoundingClientRect();
  //   }
  // }, [swapPosition]);

  React.useEffect(() => {
    if (squareColors.length > 0) {
      console.log(squareColors);
      squareColors.forEach((array, index) => {
        array.forEach((value) => {
          switch (index) {
            case 0:
              mergeSortValuesRef?.current?.children[value].classList.add(
                "squaresColor1"
              );
              break;
            case 1:
              mergeSortValuesRef?.current?.children[value].classList.add(
                "squaresColor2"
              );
              break;
            case 2:
              mergeSortValuesRef?.current?.children[value].classList.add(
                "squaresColor3"
              );
              break;
            case 3:
              mergeSortValuesRef?.current?.children[value].classList.add(
                "squaresColor4"
              );
              break;
          }
        });
      });
    }
  }, [squareColors]);

  // move arrows
  React.useEffect(() => {
    if (startArrowMovement) {
      const arrowMovementInterval = setInterval(() => {
        if (positionRef.current >= 32) {
          clearInterval(arrowMovementInterval);
          setShowArrows(false);
        }
        if (positionRef.current > 20) {
          setShowArrows(false);
        }
        setFirstArrowPosition((prev) => prev + 2);
        setSecondArrowPosition((prev) => prev + 2);
      }, difficultyTimeInterval / 1.3); //1.25 - 1.3
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

  React.useEffect(() => {
    if (squareValues.length > 8) {
    }
  }, [squareValues]);

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
            console.log("Sorted array:", sorted);
            clearInterval(sortingInterval);
            setTimeout(() => {
              setWinner("computer");
              setStartAlgo(false);
            }, difficultyTimeInterval * 2);
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
          setColorsToSquaresFunc(left, rightLimit);

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

  function setColorsToSquaresFunc(left, right) {
    setSquareColors((prevColors) => {
      if (prevColors.length < 4) {
        return [...prevColors, [left + 8, right + 7]];
      }
      return prevColors;
    });
  }

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
