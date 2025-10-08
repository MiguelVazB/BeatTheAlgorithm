import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import { getDifficultyTimeInterval } from "../utils/difficultyConfig";
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
  const [containerRect, setContainerRect] = React.useState(null);

  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);
  const winnerRef = React.useRef(winner);

  const binaryTreeRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(13);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(14);

  const [leftAndRightIndices, setLeftAndRightIndices] = React.useState([]);

  const [circleIndicesSwap, setCircleIndicesSwap] = React.useState([]);
  const [firstAndLastSwap, setFirstAndLastSwap] = React.useState([]);

  React.useEffect(() => {
    setValuesToSort([...randomNumbers]);
    setCircleValues([...randomNumbers]);
  }, [randomNumbers]);

  React.useEffect(() => {
    setContainerRect(binaryTreeRef.current.getBoundingClientRect());
  }, [circleValues]);

  React.useEffect(() => {
    const handleResize = () => {
      if (binaryTreeRef.current) {
        const rect = binaryTreeRef.current.getBoundingClientRect();
        setContainerRect(rect);
      }
    };

    if (binaryTreeRef.current) {
      const rect = binaryTreeRef.current.getBoundingClientRect();
      setContainerRect(rect);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // draw lines that connect the nodes
  React.useEffect(() => {
    const updateLines = () => {
      if (!containerRect) return;
      let updatedLines = [];
      for (let i = 0; i < circleValues.length; i++) {
        let containerX = containerRect.left + window.scrollX;
        let containerY = containerRect.top + window.scrollY;
        let containerWidth = containerRect.width;
        let containerHeight = containerRect.height;
        const svgStyle = {
          width: containerWidth,
          height: containerHeight,
          position: "absolute",
          top: 0,
          left: 0,
        };
        if (i === 0) {
          let point1 =
            binaryTreeRef.current.children[0].getBoundingClientRect();
          let x1 = point1.left + point1.width / 2 - containerX;
          let y1 = point1.top + point1.height / 2 - containerY;

          let point2 =
            binaryTreeRef.current.children[1].getBoundingClientRect();
          let x2 = point2.left + point2.width / 2 - containerX;
          let y2 = point2.top + point2.height / 2 - containerY;

          updatedLines.push(
            <div
              className="lineContainer"
              key={`${i}${x1}-${x2}-${y2}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "auto",
              }}
            >
              <svg style={svgStyle}>
                <line
                  className="treeEdge"
                  x1={x1}
                  y1={y1 + point1.height / 4}
                  x2={x2}
                  y2={y2 + point2.height / 4}
                />
              </svg>
            </div>
          );

          point2 = binaryTreeRef.current.children[2].getBoundingClientRect();
          x2 = point2.left + point2.width / 2 - containerX;
          y2 = point2.top + point2.height / 2 - containerY;

          updatedLines.push(
            <div
              className="lineContainer"
              key={`${i}${x1}-${x2}-${y2}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "auto",
              }}
            >
              <svg style={svgStyle}>
                <line
                  className="treeEdge"
                  x1={x1}
                  y1={y1 + point1.height / 4}
                  x2={x2}
                  y2={y2 + point2.height / 4}
                />
              </svg>
            </div>
          );
        } else {
          if (2 * i + 1 < circleValues.length) {
            var point1 =
              binaryTreeRef.current.children[i].getBoundingClientRect();
            var x1 = point1.left + point1.width / 2 - containerX;
            var y1 = point1.top + point1.height / 2 - containerY;

            var point2 =
              binaryTreeRef.current.children[2 * i + 1].getBoundingClientRect();
            var x2 = point2.left + point2.width / 2 - containerX;
            var y2 = point2.top + point2.height / 2 - containerY;

            updatedLines.push(
              <div
                className="lineContainer"
                key={`${i}${x1}-${x2}-${y2}`}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "auto",
                }}
              >
                <svg style={svgStyle}>
                  <line
                    className="treeEdge"
                    x1={x1}
                    y1={y1 + point1.height / 4}
                    x2={x2}
                    y2={y2 + point2.height / 4}
                  />
                </svg>
              </div>
            );
          }

          if (2 * i + 2 < circleValues.length) {
            point2 =
              binaryTreeRef.current.children[2 * i + 2].getBoundingClientRect();
            x2 = point2.left + point2.width / 2 - containerX;
            y2 = point2.top + point2.height / 2 - containerY;

            updatedLines.push(
              <div
                className="lineContainer"
                key={`${i}${x1}-${x2}-${y2}`}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "auto",
                }}
              >
                <svg style={svgStyle}>
                  <line
                    className="treeEdge"
                    x1={x1}
                    y1={y1 + point1.height / 4}
                    x2={x2}
                    y2={y2 + point2.height / 4}
                  />
                </svg>
              </div>
            );
          }
        }
      }
      setLines([...updatedLines]);
    };

    updateLines();
  }, [circleValues, binaryTreeRef, containerRect]);

  React.useEffect(() => {
    if (countDownOver) {
      setStartAlgo(true);
      setInterval(() => {
        setShowArrows(true);
      }, getDifficultyTimeInterval(difficulty));
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  React.useEffect(() => {
    if (circleIndicesSwap.length > 0) {
      // console.log(circleIndicesSwap[0] + "-----" + circleIndicesSwap[1]);
      let firstIndex = circleIndicesSwap[0];
      let secondIndex = circleIndicesSwap[1];

      let firstCirclePos =
        binaryTreeRef?.current?.children[firstIndex].getBoundingClientRect();
      let secondCirclePos =
        binaryTreeRef?.current?.children[secondIndex].getBoundingClientRect();

      if (secondIndex % 2 === 0) {
        let distanceX = secondCirclePos.x - firstCirclePos.x;
        let distanceY = secondCirclePos.y - firstCirclePos.y;

        binaryTreeRef?.current?.children[firstIndex].animate(
          [
            // keyframes
            { transform: `translate(${(0, 0)}px)`, opacity: 0.5 },
            {
              transform: `translate(${distanceX}px, ${distanceY}px)`,
              opacity: 1,
            },
          ],
          {
            duration:
              difficulty === "Easy"
                ? getDifficultyTimeInterval(difficulty) / 10
                : getDifficultyTimeInterval(difficulty) / 20,
            timingFunction: "ease-in-out",
          }
        );
        binaryTreeRef?.current?.children[secondIndex].animate(
          [
            // keyframes
            { transform: `translate(${(0, 0)}px)`, opacity: 0.5 },
            {
              transform: `translate(${-distanceX}px, ${-distanceY}px)`,
              opacity: 1,
            },
          ],
          {
            duration:
              difficulty === "Easy"
                ? getDifficultyTimeInterval(difficulty) / 10
                : getDifficultyTimeInterval(difficulty) / 20,
            timingFunction: "ease-in-out",
          }
        );
      }
      if (secondIndex % 2 !== 0) {
        let distanceX = secondCirclePos.x - firstCirclePos.x;
        let distanceY = secondCirclePos.y - firstCirclePos.y;

        binaryTreeRef?.current?.children[secondIndex].animate(
          [
            // keyframes
            { transform: `translate(${(0, 0)}px)`, opacity: 0.5 },
            {
              transform: `translate(${-distanceX}px, ${-distanceY}px)`,
              opacity: 1,
            },
          ],
          {
            duration:
              difficulty === "Easy"
                ? getDifficultyTimeInterval(difficulty) / 10
                : getDifficultyTimeInterval(difficulty) / 20,
            timingFunction: "ease-in-out",
          }
        );
        binaryTreeRef?.current?.children[firstIndex].animate(
          [
            // keyframes
            { transform: `translate(${(0, 0)}px)`, opacity: 0.5 },
            {
              transform: `translate(${distanceX}px, ${distanceY}px)`,
              opacity: 1,
            },
          ],
          {
            duration:
              difficulty === "Easy"
                ? getDifficultyTimeInterval(difficulty) / 10
                : getDifficultyTimeInterval(difficulty) / 20,
            timingFunction: "ease-in-out",
          }
        );
      }
    }
  }, [circleIndicesSwap]);

  React.useEffect(() => {
    if (leftAndRightIndices[0]) {
      setSecondArrowPosition(leftAndRightIndices[0]);
    }
    if (leftAndRightIndices[1]) {
      setTimeout(() => {
        setSecondArrowPosition(leftAndRightIndices[1]);
      }, getDifficultyTimeInterval(difficulty) / 10);
    }
  }, [leftAndRightIndices]);

  React.useEffect(() => {
    let firstNode;
    if (firstAndLastSwap.length > 0) {
      let firstIndex = firstAndLastSwap[0];
      let secondIndex = firstAndLastSwap[1];
      firstNode = binaryTreeRef?.current?.children[firstIndex];
      let secondNode = binaryTreeRef?.current?.children[secondIndex];
      firstNode.style.backgroundColor = "black";
      secondNode.style.backgroundColor = "black";
    }
  }, [firstAndLastSwap]);

  // remove function for heap sort

  function remove(a, size) {
    let max = a[0];
    a[0] = a[size - 1];

    heapify(a, size - 1, 0);

    setCircleIndicesSwap([0, size - 1]);
    setFirstAndLastSwap([0, size - 1]);

    // console.log("Comparison: Remove", max, a[0]);
    return max;
  }

  // heapify function

  function heapify(a, size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setFirstArrowPosition(i);

    if (left < size && a[left] > a[largest]) {
      // console.log("Comparison: Left Child", a[i], a[left]);
      largest = left;
    }

    if (right < size && a[right] > a[largest]) {
      // console.log("Comparison: Right Child", a[i], a[right]);
      largest = right;
    }

    if (left < size && right < size) {
      setLeftAndRightIndices([left, right]);
    } else if (left < size) {
      setLeftAndRightIndices([left]);
    } else if (right < size) {
      setLeftAndRightIndices([right]);
    }

    if (largest !== i) {
      // console.log("Comparison: Swap", a[i], a[largest]);

      swap(a, i, largest);
      setCircleIndicesSwap([i, largest]);

      setTimeout(() => {
        setFirstArrowPosition(i);
      }, getDifficultyTimeInterval(difficulty) / 10);
      setTimeout(() => {
        setSecondArrowPosition(largest);
      }, getDifficultyTimeInterval(difficulty) / 10);

      heapify(a, size, largest);
    }
  }

  function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
    setCircleValues([...a]);
  }

  // heap sort algorithm

  React.useEffect(() => {
    if (startAlgo) {
      let valuesArray = [...valuesToSort];
      let n = valuesArray.length;
      let i = Math.floor(n / 2 - 1);
      let iteration = 0;

      let interval = setInterval(() => {
        const currentWinner = winnerRef.current;

        if (currentWinner === "user") {
          setStartAlgo(false);
          clearInterval(interval);
          setShowArrows(false);
        }

        if (i >= 0) {
          heapify(valuesArray, n, i);
          i--;
        } else {
          if (iteration < n) {
            let size = n - iteration;

            let max = remove(valuesArray, size);

            valuesArray[size - 1] = max;
            setCircleValues([...valuesArray]);
            iteration++;
          } else {
            if (currentWinner === "user") {
              setStartAlgo(false);
              clearInterval(interval);
              setShowArrows(false);
            } else {
              setWinner("computer");
              setStartAlgo(false);
              clearInterval(interval);
              setShowArrows(false);
            }
          }
        }
      }, getDifficultyTimeInterval(difficulty));
      winnerRef.current = winner;
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
  const [selectedValue, setSelectedValue] = React.useState("");
  const [valuesSorted, setValuesSorted] = React.useState([]);

  const valuesToSortRef = React.useRef(null);
  const selectedValueRef = React.useRef(null);

  React.useEffect(() => {
    setUserValues(randomNumbers);
    let correctAnswer = [...randomNumbers];
    setValuesSorted(correctAnswer.sort((a, b) => a - b));
  }, [randomNumbers]);

  React.useEffect(() => {
    if (userValues.length > 0 && userValues.length === randomNumbers.length) {
      if (JSON.stringify(userValues) == JSON.stringify(valuesSorted)) {
        setWinner("user");
      }
    }
  }, [userValues]);

  React.useEffect(() => {
    if (selectedValue) {
      selectedValueRef?.current?.classList.remove("nonHighlightSelectedValue");
    } else {
      selectedValueRef?.current?.classList.add("nonHighlightSelectedValue");
    }
  }, [selectedValue]);

  function selectValueFunction(index, value) {
    let tempArray = [...userValues];
    if (selectedValue === "") {
      tempArray[index] = "";
      setUserValues([...tempArray]);
      setSelectedValue(value);
    } else {
      let valueInBox = selectedValue;
      setSelectedValue(value);
      tempArray[index] = valueInBox;
      setUserValues([...tempArray]);
    }
  }

  return (
    <div className="heapSortUser">
      <div className="selectedValueContainer">
        <div
          ref={selectedValueRef}
          className="selectedValue nonHighlightSelectedValue"
        >
          {selectedValue}
        </div>
      </div>
      <div ref={valuesToSortRef} className="valuesToSortUser">
        {userValues.map((value, index) => {
          return (
            <div
              className="userValues"
              key={`${value}+${index}`}
              onClick={() => selectValueFunction(index, value)}
            >
              <span className="indexPos">{index + 1}</span>
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
