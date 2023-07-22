import React from "react";
import { ArrowsComponent } from "./ArrowsComponent";
import { useContext } from "react";
import { GameContext } from "../utils/gameContext";
import "./componentStyles/QuickSort.css";

export const QuickSort = () => {
  const gameProperties = useContext(GameContext);

  const [firstArrowPosition, setFirstArrowPosition] = React.useState(0);
  const [secondArrowPosition, setSecondArrowPosition] = React.useState(1);
  const [showArrows, setShowArrows] = React.useState(false);

  const [startAlgo, setStartAlgo] = React.useState(false);

  const [valuesToSort, setValuesToSort] = React.useState([]); // stores original values
  const [boxValues, setBoxValues] = React.useState([]); // stores values being changed

  const valuesToSortRef = React.useRef(null);
  const winnerRef = React.useRef(gameProperties.winner);

  React.useEffect(() => {
    setValuesToSort(gameProperties.randomNumbers);
    setBoxValues(gameProperties.randomNumbers);
  }, [gameProperties.randomNumbers]);

  React.useEffect(() => {
    if (gameProperties.countDownOver) {
      setShowArrows(true);
      setStartAlgo(true);
    } else {
      setShowArrows(false);
    }
  }, [gameProperties.countDownOver]);

  // quick sort algorithm
  React.useEffect(() => {}, [startAlgo, gameProperties.winner]);

  return (
    <div className="quickSort">
      <div ref={valuesToSortRef} className="numbersToSort">
        {boxValues.map((number, index) => {
          return (
            <div className="values" key={`${number} ${index}`}>
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const QuickSortUser = () => {
  return <div>user</div>;
};
