import React from "react";
import { useContext } from "react";
import { GameContext } from "../utils/gameContext";
import "./componentStyles/QuickSort.css";

export const QuickSort = () => {
  const gameProperties = useContext(GameContext);

  return (
    <div className="quickSort">
      <button onClick={() => gameProperties.setWinner("user")}>click</button>
    </div>
  );
};

export const QuickSortUser = () => {
  return <div>user</div>;
};
