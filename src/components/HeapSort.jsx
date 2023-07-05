import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import "./componentStyles/HeapSort.css";

export const HeapSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [circleValues, setCircleValues] = React.useState([]); // stores values being changed
  const [heapArrValues, setHeapArrValues] = React.useState([]); // stores values for heap array
  const [difficultyTimeInterval, setDifficultyTimeInterval] = React.useState(0);

  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const [showHeap, setShowHeap] = React.useState(false);

  const binaryTreeRef = React.useRef(null);
  const arrayValuesRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  React.useEffect(() => {
    setValuesToSort([...randomNumbers]);
    setCircleValues([...randomNumbers]);
    setHeapArrValues([...randomNumbers]);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (difficulty) {
      switch (difficulty) {
        case "Easy":
          setDifficultyTimeInterval(1000);
          break;
        case "Intermediate":
          setDifficultyTimeInterval(200);
          break;
        case "Hard":
          setDifficultyTimeInterval(100);
          break;
        case "Impossible":
          setDifficultyTimeInterval(10);
          break;
      }
    }
  }, [difficulty]);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      // setShowHeap(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  // Build heap (rearrange array)
  // React.useEffect(() => {
  //   if (showHeap) {
  //     let i = parseInt(heapArrValues.length / 2 - 1);

  //     const buildHeapInterval = setInterval(() => {
  //       if (i >= 0) {
  //         maxHeapify(heapArrValues, heapArrValues.length, i);
  //         i--;
  //       } else {
  //         console.log("build done!");
  //         clearInterval(buildHeapInterval);
  //         setCircleValues([...heapArrValues]);
  //         setStartAlgo(true);
  //       }
  //     }, difficultyTimeInterval);
  //   }
  // }, [showHeap]);

  // maxHeapify function
  const maxHeapify = (arr, n, i) => {
    let largest = i;
    let l = 2 * i + 1; //left child index
    let r = 2 * i + 2; //right child index

    console.log("index: ", arr[i]);
    setFirstArrowPosition(i);

    if (l < n) {
      console.log("left: ", arr[l]);
      setSecondArrowPosition(l);
    }
    if (l < n && arr[l] > arr[largest]) {
      // console.log("left: ", l);
      largest = l;
    }

    if (r < n) {
      setSecondArrowPosition(r);
      console.log("right: ", arr[r]);
    }
    if (r < n && arr[r] > arr[largest]) {
      // console.log("right: ", r);
      largest = r;
    }

    if (largest != i) {
      console.log(`swapping ${arr[i]} and ${arr[largest]}`);
      setFirstArrowPosition(largest);
      setSecondArrowPosition(i);
      let temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      // Recursively heapify
      maxHeapify(arr, n, largest);
    }
    // setCircleValues([...arr]);
  };

  // extract element from heap one by one
  React.useEffect(() => {
    if (startAlgo) {
      let arrayLength = randomNumbers.length;

      let updatedValues = [...valuesToSort];

      // Build heap
      let i = parseInt(arrayLength / 2 - 1);

      const buildHeapInterval = setInterval(() => {
        if (i >= 0) {
          maxHeapify(updatedValues, arrayLength, i);
          i--;
        } else {
          console.log("build done!");
          clearInterval(buildHeapInterval);
          let j = arrayLength - 1;
          const extractInterval = setInterval(() => {
            if (j >= 0) {
              // Move current root to end
              let temp = updatedValues[0];
              updatedValues[0] = updatedValues[j];
              updatedValues[j] = temp;

              // Call max heapify on the reduced heap
              maxHeapify(updatedValues, j, 0);

              j--;
            } else {
              clearInterval(extractInterval);
              console.log(updatedValues);
              // setCircleValues([...updatedValues]);
            }
          }, difficultyTimeInterval);
        }
      }, difficultyTimeInterval);
    }
  }, [startAlgo, winner]);

  return (
    <div className="heapSort">
      <div className="originalValues">
        <div>Original Values:</div>
        <div ref={arrayValuesRef} className="heapBuildValues">
          {heapArrValues.map((value, index) => {
            return <div key={`${value} ${index}`}>{value}</div>;
          })}
        </div>
      </div>
      <div ref={binaryTreeRef} className="binaryTree">
        {circleValues.map((value, index) => {
          return (
            <div
              className={`circleValue circleValue${index}`}
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
          valuesRef={startAlgo ? binaryTreeRef : arrayValuesRef}
          xOffset={startAlgo ? 6 : 20}
          yOffset={startAlgo ? 2 : 1.5}
        />
      )}
    </div>
  );
};

export const HeapSortUser = ({ randomNumbers, setWinner }) => {
  const [userValues, setUserValues] = React.useState([]);

  React.useEffect(() => {
    setUserValues(randomNumbers);
  }, [randomNumbers]);

  return (
    <div className="heapSortUser">
      {userValues.map((value, index) => {
        return <div key={`${value}+${index}`}>{value}</div>;
      })}
    </div>
  );
};
