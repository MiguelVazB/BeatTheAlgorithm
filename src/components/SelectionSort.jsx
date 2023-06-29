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
  const valuesToSortRef = React.useRef(null);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);
  const [showArrows, setShowArrows] = React.useState(false);

  React.useEffect(() => {
    if (countDownOver) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [countDownOver]);

  return (
    <div className="selectionSort">
      <div ref={valuesToSortRef} className="numbersToSort">
        {randomNumbers.map((number, index) => {
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
    </div>
  );
};

export const SelectionSortUser = ({ randomNumbers, setWinner }) => {
  return (
    <div className="selectionSortUser">
      <div className="userValuesToSort">
        {randomNumbers.map((number, index) => {
          return (
            <div className="values userValues" key={`${number} ${index}`}>
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};
