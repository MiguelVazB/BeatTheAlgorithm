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
  const [lines, setLines] = React.useState([]);
  const [windowSize, setWindowSize] = React.useState([]);
  const [difficultyTimeInterval, setDifficultyTimeInterval] = React.useState(0);

  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const winnerRef = React.useRef(winner);

  const binaryTreeRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(13);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(14);

  const [leftAndRightIndices, setLeftAndRightIndices] = React.useState([]);

  const [circleIndicesClass, setCircleIndicesClass] = React.useState([]);

  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    setValuesToSort([...randomNumbers]);
    setCircleValues([...randomNumbers]);
  }, [randomNumbers]);

  // draw lines that connect the nodes
  React.useEffect(() => {
    function getHypotenuseAndAngle(x1, y1, x2, y2) {
      let xLength = x2 - x1;
      let yLength = y2 - y1;
      let hypotenuse = Math.sqrt(xLength ** 2 + yLength ** 2);
      let angle = Math.tan(yLength / xLength);
      let angleDegrees = angle * (180 / Math.PI);
      return [hypotenuse, angleDegrees];
    }

    if (circleValues && binaryTreeRef.current) {
      let updatedLines = [];
      for (let i = 0; i < circleValues.length; i++) {
        if (i === 0) {
          let point1 =
            binaryTreeRef.current.children[0].getBoundingClientRect();
          let point2 =
            binaryTreeRef.current.children[1].getBoundingClientRect();
          let x1 = point1.left + point1.width / 2;
          let y1 = point1.top + point1.height / 2;
          let x2 = point2.left + point2.width / 2;
          let y2 = point2.top + point2.height / 2;

          let [hypotenuse, angleDegrees] = getHypotenuseAndAngle(
            x1,
            y1,
            x2,
            y2
          );

          updatedLines.push(
            <div
              key={`${i}${x1}-${x2}-${y2}`}
              style={{
                position: "absolute",
                zIndex: -1,
                right: `${x1}px`,
                top: `${windowSize[0] <= 900 ? y1 - 140 : y1 - 160}px`,
                width: `${hypotenuse - 30}px`,
                border:
                  windowSize[0] <= 900
                    ? "1.5px dashed white"
                    : "2px dashed white",
                transform: `rotate(${angleDegrees}deg)`,
                transformOrigin: "top right",
              }}
            ></div>
          );

          point2 = binaryTreeRef.current.children[2].getBoundingClientRect();
          x2 = point2.left + point2.width / 2;
          y2 = point2.top + point2.height / 2;

          [hypotenuse, angleDegrees] = getHypotenuseAndAngle(x1, y1, x2, y2);

          updatedLines.push(
            <div
              key={`${i}${x1}-${x2}-${y2}`}
              style={{
                position: "absolute",
                zIndex: -1,
                left: `${x1}px`,
                top: `${windowSize[0] <= 900 ? y1 - 140 : y1 - 160}px`,
                width: `${hypotenuse - 30}px`,
                border:
                  windowSize[0] <= 900
                    ? "1.5px dashed white"
                    : "2px dashed white",
                transform: `rotate(${angleDegrees}deg)`,
                transformOrigin: "top left",
              }}
            ></div>
          );
        } else {
          if (2 * i + 1 < circleValues.length) {
            var point1 =
              binaryTreeRef.current.children[i].getBoundingClientRect();
            var point2 =
              binaryTreeRef.current.children[2 * i + 1].getBoundingClientRect();
            var x1 = point1.left + point1.width;
            var y1 = point1.top + point1.height / 2;
            var x2 = point2.left + point2.width / 2;
            var y2 = point2.top + point2.height / 2;

            var [hypotenuse, angleDegrees] = getHypotenuseAndAngle(
              x1,
              y1,
              x2,
              y2
            );

            updatedLines.push(
              <div
                key={`${i}${x1}-${x2}-${y2}`}
                style={{
                  position: "absolute",
                  zIndex: -1,
                  left: `${x2 - 10}px`,
                  top: `${windowSize[0] <= 900 ? y2 - 150 : y2 - 160}px`,
                  width: `${hypotenuse - 30}px`,
                  border:
                    windowSize[0] <= 900
                      ? "1.5px dashed white"
                      : "2px dashed white",
                  transform: `rotate(${angleDegrees}deg)`,
                  transformOrigin: "top left",
                }}
              ></div>
            );
          }

          if (2 * i + 2 < circleValues.length) {
            point2 =
              binaryTreeRef.current.children[2 * i + 2].getBoundingClientRect();
            x2 = point2.left + point2.width;
            y2 = point2.top + point2.height / 3;

            [hypotenuse, angleDegrees] = getHypotenuseAndAngle(x1, y1, x2, y2);

            updatedLines.push(
              <div
                key={`${i}${x1}-${x2}-${y2}`}
                style={{
                  position: "absolute",
                  zIndex: -1,
                  left: `${x1 - 25}px`,
                  top: `${windowSize[0] <= 900 ? y2 - 165 : y2 - 210}px`,
                  width: `${hypotenuse}px`,
                  border:
                    windowSize[0] <= 900
                      ? "1.5px dashed white"
                      : "2px dashed white",
                  transform: `rotate(${angleDegrees}deg)`,
                  transformOrigin: "top left",
                }}
              ></div>
            );
          }
        }
      }
      setLines([...updatedLines]);
    }
  }, [
    circleValues,
    windowSize,
    binaryTreeRef,
    secondArrowPosition,
    firstArrowPosition,
  ]);

  // React.useEffect(() => {
  //   console.log(circleValues);
  // }, [circleValues]);

  // React.useEffect(() => {
  //   if (showArrows) {
  //     console.log("second = ", secondArrowPosition);
  //     console.log("first = ", firstArrowPosition);
  //   }
  // }, [firstArrowPosition, secondArrowPosition]);

  React.useEffect(() => {
    if (difficulty) {
      switch (difficulty) {
        case "Easy":
          setDifficultyTimeInterval(2000);
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
      setStartAlgo(true);
      setInterval(() => {
        setShowArrows(true);
      }, difficultyTimeInterval);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  // // maxHeapify function
  // const maxHeapify = (arr, n, i) => {
  //   let largest = i;
  //   let l = 2 * i + 1; //left child index
  //   let r = 2 * i + 2; //right child index

  //   // console.log("index: ", arr[i]);
  //   setFirstArrowPosition(i);

  //   if (l < n) {
  //     // console.log("left: ", arr[l]);
  //     setTimeout(() => {
  //       setSecondArrowPosition(l);
  //     }, difficultyTimeInterval / 2);
  //   }
  //   if (l < n && arr[l] > arr[largest]) {
  //     largest = l;
  //   }

  //   if (r < n) {
  //     setTimeout(() => {
  //       setFirstArrowPosition(i);
  //       setSecondArrowPosition(r);
  //     }, difficultyTimeInterval / 2);
  //     // console.log("right: ", arr[r]);
  //   }
  //   if (r < n && arr[r] > arr[largest]) {
  //     largest = r;
  //   }

  //   if (largest !== i) {
  //     console.log(`swapping ${arr[i]} and ${arr[largest]}`);
  //     setFirstArrowPosition(largest);
  //     setSecondArrowPosition(i);
  //     let temp = arr[i];
  //     arr[i] = arr[largest];
  //     arr[largest] = temp;
  //     setCircleValues([...arr]);

  //     // Recursively heapify
  //     setTimeout(() => {
  //       maxHeapify(arr, n, largest);
  //       setCircleValues([...arr]);
  //     }, 0);
  //   }
  // };

  // // heap sort algorithm
  // React.useEffect(() => {
  //   if (startAlgo) {
  //     let arrayLength = randomNumbers.length;

  //     let updatedValues = [...valuesToSort];

  //     // Build heap
  //     let i = parseInt(arrayLength / 2 - 1);

  //     const buildHeapInterval = setInterval(() => {
  //       const currentWinner = winnerRef.current;
  //       if (i >= 0) {
  //         maxHeapify(updatedValues, arrayLength, i);
  //         if (currentWinner === "user") {
  //           setShowArrows(false);
  //           clearInterval(buildHeapInterval);
  //         }
  //         i--;
  //       } else {
  //         console.log("build done!");
  //         clearInterval(buildHeapInterval);
  //         let j = arrayLength - 1;
  //         if (currentWinner === "user") {
  //           setShowArrows(false);
  //           clearInterval(buildHeapInterval);
  //         }
  //         const extractInterval = setInterval(() => {
  //           const currentWinner = winnerRef.current;
  //           if (currentWinner === "user") {
  //             setShowArrows(false);
  //             clearInterval(buildHeapInterval);
  //           }

  //           if (j >= 0) {
  //             // Move current root to end
  //             setTimeout(() => {
  //               setFirstArrowPosition(j);
  //             }, difficultyTimeInterval / 2);
  //             setTimeout(() => {
  //               setSecondArrowPosition(0);
  //             }, difficultyTimeInterval / 2);
  //             let indices = [];
  //             indices.push(0);
  //             indices.push(j);
  //             setCircleIndicesClass(indices);
  //             let temp = updatedValues[0];
  //             updatedValues[0] = updatedValues[j];
  //             updatedValues[j] = temp;

  //             // Call max heapify on the reduced heap
  //             setTimeout(() => {
  //               maxHeapify(updatedValues, j, 0);
  //               setCircleValues([...updatedValues]);
  //             }, difficultyTimeInterval);

  //             j--;
  //           } else {
  //             setShowArrows(false);
  //             clearInterval(extractInterval);
  //             setStartAlgo(false);
  //             setWinner("computer");
  //           }
  //         }, difficultyTimeInterval);
  //         winnerRef.current = winner;
  //       }
  //     }, difficultyTimeInterval);
  //     winnerRef.current = winner;
  //   }
  // }, [startAlgo, winner]);

  React.useEffect(() => {
    if (circleIndicesClass.length > 0) {
      console.log(circleIndicesClass[0] + "-----" + circleIndicesClass[1]);
      // let firstIndex = circleIndicesClass[0];
      // let secondIndex = circleIndicesClass[1];

      // let firstCirclePos =
      //   circleValues?.current?.children[firstIndex].getBoundingClientRect();
      // let secondCirclePos =
      //   circleValues?.current?.children[secondIndex].getBoundingClientRect();

      // if (firstIndex % 2 === 0) {
      // }
      // let distanceX = secondCirclePos.x - firstCirclePos.x;
    }
  }, [circleIndicesClass]);

  React.useEffect(() => {
    if (leftAndRightIndices[0]) {
      setSecondArrowPosition(leftAndRightIndices[0]);
    }
    if (leftAndRightIndices[1]) {
      setTimeout(() => {
        setSecondArrowPosition(leftAndRightIndices[1]);
      }, difficultyTimeInterval / 4);
    }
  }, [leftAndRightIndices]);

  // remove function for heap sort

  function remove(a, size) {
    let max = a[0];
    a[0] = a[size - 1];
    heapify(a, size - 1, 0);
    console.log("Comparison: Remove", max, a[0]);
    return max;
  }

  // heapify function

  function heapify(a, size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setFirstArrowPosition(i);

    if (left < size) {
      console.log("Comparison: Left Child", a[i], a[left]);
      if (a[left] > a[largest]) largest = left;
    }

    if (right < size) {
      console.log("Comparison: Right Child", a[i], a[right]);
      if (a[right] > a[largest]) largest = right;
    }

    if (left < size && right < size) {
      setLeftAndRightIndices([left, right]);
    } else if (left < size) {
      setLeftAndRightIndices([left]);
    } else if (right < size) {
      setLeftAndRightIndices([right]);
    }

    if (largest !== i) {
      console.log("Comparison: Swap", a[i], a[largest]);
      setSecondArrowPosition(largest);
      swap(a, i, largest);
      heapify(a, size, largest);
    }
  }

  function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }

  // heap sort algorithm

  React.useEffect(() => {
    if (startAlgo) {
      let valuesArray = [...valuesToSort];
      let n = valuesArray.length;
      let i = parseInt(n / 2 - 1);
      let iteration = 0;

      let interval = setInterval(() => {
        if (i >= 0) {
          heapify(valuesArray, n, i);
          i--;
        } else {
          if (iteration < n) {
            let size = n - iteration;
            let max = remove(valuesArray, size, iteration);
            valuesArray[size - 1] = max;
            iteration++;
          } else {
            clearInterval(interval);
            console.log("Sorted Array:", valuesArray);
          }
        }
      }, difficultyTimeInterval);
    }
  }, [startAlgo, winner]);

  return (
    <div className="heapSort">
      <div className="originalValues">
        <div className="orValues">Original Values:</div>
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
      {lines}
      {showArrows && (
        <ArrowsComponent
          firstArrowPos={firstArrowPosition}
          secondArrowPos={secondArrowPosition}
          valuesRef={binaryTreeRef}
          xOffset={100}
          yOffset={1}
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
