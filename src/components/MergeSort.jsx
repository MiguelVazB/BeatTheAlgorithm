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

  const [startAlgo, setStartAlgo] = React.useState(false);
  const winnerRef = React.useRef(winner);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);

  React.useEffect(() => {
    setValuesToSort([...randomNumbers]);
    setSquareValues([...randomNumbers]);
  }, [randomNumbers]);

  return (
    <div className="mergeSort">
      <div className="valuesToSortContainer">
        {squareValues.map((value, index) => {
          return (
            <div className="valueToSort" key={`${value} ${index}`}>
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
