import React from "react";
import "./componentStyles/SelectionSort.css";

export const SelectionSort = ({
  difficulty,
  randomNumbers,
  countDownOver,
  setWinner,
  winner,
}) => {
  return (
    <div className="selectionSort">
      <div className="numbersToSort">
        {randomNumbers.map((number, index) => {
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
