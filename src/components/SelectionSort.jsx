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

  const [sortedIndices, setSortedIndices] = React.useState([]);
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

  React.useEffect(() => {
    if (sortedIndices.length > 0) {
      for (let element in sortedIndices) {
        valuesToSortRef.current.children[element].classList.add("valueSorted");
      }
    }
  }, [sortedIndices]);

  React.useEffect(() => {
    if (startAlgo) {
      let firstPos = 0;
      let secondPos = 1;
      let smallestValueIndex = firstPos;
      let selectionSort;

      let difficultyTimeInterval;

      switch (difficulty) {
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

      let updatedValues = [...valuesToSort];

      selectionSort = setInterval(() => {
        const currentWinner = winnerRef.current;

        if (currentWinner === "user") {
          setShowArrows(false);
          clearInterval(selectionSort);
        }

        if (firstPos < randomNumbers.length) {
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
            setSortedIndices((prev) => [...prev, firstPos]);
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
      <div className="colorMeanings">
        <div className="sortedColor">
          <div id="sorted"></div>Sorted Values
        </div>
        <div className="unsortedColor">
          <div id="unsorted"></div>Unsorted Values
        </div>
      </div>
      <div className="currentValues">
        <div>Current smallest: {currentSmallest}</div>
      </div>
    </div>
  );
};

export const SelectionSortUser = ({ randomNumbers, setWinner }) => {
  const [highlightSelectedBoxes, setHighlightSelectedBoxes] = React.useState(
    []
  );
  const [boxValues, setBoxValues] = React.useState([]);
  const [valuesSorted, setValuesSorted] = React.useState([]);

  const userValuesToSortRef = React.useRef(null);

  React.useEffect(() => {
    if (randomNumbers.length > 0) {
      setBoxValues(randomNumbers);
      let correctAnswer = [...randomNumbers];
      setValuesSorted(correctAnswer.sort((a, b) => a - b));
    }
  }, [randomNumbers]);

  React.useEffect(() => {
    if (boxValues.length > 0 && boxValues.length === randomNumbers.length) {
      if (JSON.stringify(boxValues) == JSON.stringify(valuesSorted)) {
        setWinner("user");
      }
    }
  }, [boxValues]);

  React.useEffect(() => {
    if (userValuesToSortRef.current) {
      if (highlightSelectedBoxes.length === 2) {
        // animate swap
        let firstBoxIndex = highlightSelectedBoxes[0];
        let secondBoxIndex = highlightSelectedBoxes[1];
        let firstBoxPos =
          userValuesToSortRef?.current?.children[
            firstBoxIndex
          ].getBoundingClientRect();
        let secondBoxPos =
          userValuesToSortRef?.current?.children[
            secondBoxIndex
          ].getBoundingClientRect();
        let distance =
          secondBoxIndex > firstBoxIndex
            ? secondBoxPos.x - firstBoxPos.x
            : secondBoxPos.x - firstBoxPos.x;
        userValuesToSortRef?.current?.children[firstBoxIndex].animate(
          [
            // keyframes
            { transform: `translateX(${distance}px)` },
          ],
          {
            duration: difficulty === "Easy" ? 500 : 100,
            timingFunction: "ease-in-out",
          }
        );
        userValuesToSortRef?.current?.children[secondBoxIndex].animate(
          [
            // keyframes
            { transform: `translateX(${-1 * distance}px)` },
          ],
          {
            duration: difficulty === "Easy" ? 500 : 100,
            timingFunction: "ease-in-out",
          }
        );
        // remove highlight
        for (let i = 0; i < highlightSelectedBoxes.length; i++) {
          userValuesToSortRef?.current?.children[
            highlightSelectedBoxes[i]
          ]?.classList.remove("highlightBox");
        }
        //restart state to empty array
        setHighlightSelectedBoxes([]);
        setTimeout(
          () => {
            for (let i = 0; i < boxValues.length; i++) {
              userValuesToSortRef?.current?.children[i].classList.remove(
                "obscureUnselected"
              );
            }
            let updatedValues = [...boxValues];
            let temp = updatedValues[firstBoxIndex];
            updatedValues[firstBoxIndex] = updatedValues[secondBoxIndex];
            updatedValues[secondBoxIndex] = temp;
            setBoxValues(updatedValues);
          },
          difficulty === "Easy" ? 500 : 100
        );
      } else {
        //add highlight
        for (let i = 0; i < boxValues.length; i++) {
          userValuesToSortRef?.current?.children[
            highlightSelectedBoxes[i]
          ]?.classList.add("highlightBox");
        }
      }
    }
    //reduce the opacity of the other boxes
    for (let i = 0; i < boxValues.length; i++) {
      if (!highlightSelectedBoxes.includes(i)) {
        userValuesToSortRef?.current?.children[i].classList.add(
          "obscureUnselected"
        );
      }
    }
  }, [highlightSelectedBoxes]);

  function selectBox(index) {
    setHighlightSelectedBoxes((prev) => [...prev, index]);
  }

  return (
    <div className="selectionSortUser">
      <div ref={userValuesToSortRef} className="userValuesToSort">
        {boxValues.map((number, index) => {
          return (
            <div
              className="values userValues"
              key={`${number} ${index}`}
              onClick={() => selectBox(index)}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};
