// src/components/common/SortingGameUI.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const WinnerOverlay = ({ winner, algo, onRestart }) => {
  const { width, height } = useWindowSize();

  return (
    <div className="overlay winner">
      {winner === "user" && <Confetti width={width} height={height} />}
      {winner === "user" ? "YOU Beat the Algorithm!!!" : "Algorithm Won!"}
      <button className="tryAgainBtn" onClick={onRestart}>
        {winner === "user" ? "Play Again" : "Try Again"}
      </button>
      <Link className="tryAgainBtn" to={`/moreOnAlgorithms/${algo}`}>
        Learn more
      </Link>
    </div>
  );
};

export const AlgorithmHeader = ({ algo, difficulty, songPlaying, onToggleMusic }) => {
  return (
    <div className="algorithmDisplayed">
      <div className="nameAndDifficulty">
        {String(algo)
          .split("_")
          .map((x) => {
            return x.charAt(0).toUpperCase() + x.slice(1) + " ";
          })}
        <span>{difficulty ? `(${difficulty})` : ""}</span>
      </div>
      {songPlaying !== undefined && (
        <div className="BackgroundSongBtn" onClick={onToggleMusic}>
          {songPlaying ? "🔊" : "🔇"}
        </div>
      )}
    </div>
  );
};

export const GameContainer = ({ algo, computerSide, userSide }) => {
  const containerClass = algo === "heap_sort" || algo === "merge_sort"
    ? "computerSideBigger"
    : "computerSide";

  return (
    <>
      <div className={containerClass}>
        {computerSide}
      </div>
      <div className="userSide">
        {userSide}
      </div>
    </>
  );
};