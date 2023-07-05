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

  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);

  const binaryTreeRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  //   React.useEffect(() => {
  //     if (circleValues.length > 0) {
  //       for (let i = 0; i < randomNumbers.length - 4; i++) {
  //         console.log(binaryTreeRef.current.children[i]);
  //       }
  //     }
  //   }, [circleValues]);

  React.useEffect(() => {
    setValuesToSort(randomNumbers);
    setCircleValues(randomNumbers);
  }, [randomNumbers]);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  React.useEffect(() => {
    if (startAlgo) {
      let difficultyTimeInterval;

      let arrayLength = randomNumbers.length;

      switch (difficulty) {
        case "Easy":
          difficultyTimeInterval = 5000;
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

      const maxHeapify = (arr, n, i) => {
        let largest = i;
        let l = 2 * i + 1; //left child index
        let r = 2 * i + 2; //right child index

        console.log("index: ", i);

        if (l < n) console.log("left: ", l);
        if (l < n && arr[l] > arr[largest]) {
          // console.log("left: ", l);
          largest = l;
        }

        if (l < n) console.log("right: ", r);
        if (r < n && arr[r] > arr[largest]) {
          // console.log("right: ", r);
          largest = r;
        }

        if (largest != i) {
          let temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;

          // Recursively heapify
          maxHeapify(arr, n, largest);
        }
      };

      const heapSort = (arr, n) => {
        // Build heap
        let i = parseInt(n / 2 - 1);

        const buildHeapInterval = setInterval(() => {
          if (i >= 0) {
            maxHeapify(arr, n, i);
            i--;
          } else {
            clearInterval(buildHeapInterval);
            let j = n - 1;
            const extractInterval = setInterval(() => {
              if (j >= 0) {
                // Move current root to end
                let temp = arr[0];
                arr[0] = arr[j];
                arr[j] = temp;

                // Call max heapify on the reduced heap
                maxHeapify(arr, j, 0);

                j--;
              } else {
                console.log(arr);
                console.log(updatedValues);
                clearInterval(extractInterval);
                setCircleValues([...updatedValues]);
              }
            }, 1000);
          }
        }, 1000);
      };

      heapSort(updatedValues, arrayLength);
    }
  }, [startAlgo, winner]);

  return (
    <div className="heapSort">
      <div className="originalValues">
        <div>Original Values:</div>
        {valuesToSort.map((value, index) => {
          return <div key={`${value} ${index}`}>{value}</div>;
        })}
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
          valuesRef={binaryTreeRef}
        />
      )}
    </div>
  );
};

export const HeapSortUser = ({ randomNumbers, setWinner }) => {
  return <div className="heapSortUser">HeapSortUser</div>;
};
