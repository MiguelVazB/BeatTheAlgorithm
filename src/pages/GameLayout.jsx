import React from "react";
import "./pageStyles/GameLayout.css";
import {
  generateXRandomNumbers,
  generateXUniqueRandomNumbers,
} from "../utils/randomNumbers.jsx";
import { BubbleSort, BubbleSortUser } from "../components/BubbleSort";
import { SelectionSort, SelectionSortUser } from "../components/SelectionSort";
import { HeapSort, HeapSortUser } from "../components/HeapSort";
import { MergeSort, MergeSortUser } from "../components/MergeSort";
import { Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import CountDownSound from "../sounds/CountDownSound.mp3";
import StartSound from "../sounds/startSound.wav";
import gameSound from "../sounds/gameSound.mp3";
import userWonSound from "../sounds/userWonSound.mp3";
import algoWonSound from "../sounds/algoWonSound.mp3";

export default function GameLayout({ algo }) {
  const [randomValues, setRandomValues] = React.useState([]);

  const [countDownOver, setCountDownOver] = React.useState(false);
  const [showWinner, setShowWinner] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  const [difficulty, setDifficulty] = React.useState("");

  const difficultyOverlayRef = React.useRef(null);
  const countDownRef = React.useRef(null);
  const algoInfoRef = React.useRef(null);
  const instructionsRef = React.useRef(null);
  const difficultyRef = React.useRef(null);

  const backgroundMusicRef = React.useRef(null);
  const [songPlaying, setSongPlaying] = React.useState(true);

  React.useEffect(() => {
    let randomNumbers;
    if (algo === "heap_sort") {
      randomNumbers = generateXRandomNumbers(15);
    } else if (algo === "merge_sort") {
      randomNumbers = generateXUniqueRandomNumbers(8);
    } else {
      randomNumbers = generateXRandomNumbers(9);
    }
    setRandomValues(randomNumbers);
  }, []);

  React.useEffect(() => {
    if (difficulty.length > 0 && countDownOver === false) {
      difficultyOverlayRef.current.style.display = "none";
      countDownRef.current.style.visibility = "visible";
      countDown();
    }
  }, [difficulty]);

  React.useEffect(() => {
    setShowWinner(winner);
    if (winner === "user") {
      let userWin = new Audio(userWonSound);
      userWin.volume = 0.5;
      userWin.play();
    } else if (winner === "computer") {
      let algoWin = new Audio(algoWonSound);
      algoWin.volume = 0.5;
      algoWin.play();
    }
  }, [winner]);

  React.useEffect(() => {
    if (countDownOver && !winner.length) {
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = new Audio(gameSound);
        backgroundMusicRef.current.volume = 0.05;
      }
      setTimeout(() => {
        backgroundMusicRef.current.play();
      }, 500);
    } else {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    }
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    };
  }, [countDownOver, winner]);

  function getComputerSideComponent() {
    switch (algo) {
      case "bubble_sort":
        return (
          <BubbleSort
            difficulty={difficulty ? difficulty : ""}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "selection_sort":
        return (
          <SelectionSort
            difficulty={difficulty ? difficulty : ""}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "heap_sort":
        return (
          <HeapSort
            difficulty={difficulty ? difficulty : ""}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "merge_sort":
        return (
          <MergeSort
            difficulty={difficulty ? difficulty : ""}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
    }
  }

  function getUserSideComponent() {
    switch (algo) {
      case "bubble_sort":
        return (
          <BubbleSortUser randomNumbers={randomValues} setWinner={setWinner} />
        );
      case "selection_sort":
        return (
          <SelectionSortUser
            randomNumbers={randomValues}
            setWinner={setWinner}
          />
        );
      case "heap_sort":
        return (
          <HeapSortUser randomNumbers={randomValues} setWinner={setWinner} />
        );
      case "merge_sort":
        return (
          <MergeSortUser randomNumbers={randomValues} setWinner={setWinner} />
        );
    }
  }

  function countDown() {
    let countDownValue = 3;
    const countDown = setInterval(() => {
      countDownRef.current.innerHTML = countDownValue;
      countDownValue -= 1;
      if (countDownValue < 0) {
        countDownRef.current.style.display = "none";
        setCountDownOver(true);
        clearInterval(countDown);
        let startAudio = new Audio(StartSound);
        startAudio.volume = 0.4;
        startAudio.play();
      } else {
        let countDown = new Audio(CountDownSound);
        countDown.volume = 0.5;
        countDown.play();
      }
    }, 1000); //put it back to 1000 ms = 1 second
  }

  function setDifficultyFunction() {
    let difficultySelected = document.querySelector("#difficulty").value;
    setDifficulty(
      difficultySelected.charAt(0).toUpperCase() + difficultySelected.slice(1)
    );
  }

  function restartGame() {
    window.location.reload(false);
  }

  function hideAndShowNextOverlay(overlay) {
    if (overlay === "algoInfo") {
      algoInfoRef.current.style.display = "none";
      instructionsRef.current.style.display = "block";
    } else {
      instructionsRef.current.style.display = "none";
      difficultyRef.current.style.display = "flex";
    }
  }

  function muteSong() {
    if (backgroundMusicRef?.current?.paused === true) {
      backgroundMusicRef?.current?.play();
      setSongPlaying(true);
    } else {
      backgroundMusicRef?.current?.pause();
      setSongPlaying(false);
    }
  }

  return (
    <main className="gameLayout">
      <div className="overlay difficultyOverlay" ref={difficultyOverlayRef}>
        <div ref={algoInfoRef} className="algoDescription algoInfo">
          <p className="infoTitle">
            {String(algo)
              .split("_")
              .map((x) => {
                return x.charAt(0).toUpperCase() + x.slice(1) + " ";
              })}
          </p>
          <p className="description">
            {AlgorithmDescriptions[algo]?.description}
          </p>
          <button
            className="nextOverlayButton"
            onClick={() => hideAndShowNextOverlay("algoInfo")}
          >{`Next >`}</button>
        </div>
        <div ref={difficultyRef} className="difficultySection">
          <p>Choose Difficulty:</p>
          <div className="difficultyOptions">
            <select name="difficulty" id="difficulty">
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
              <option value="impossible">Impossible</option>
            </select>
            <button
              className="setDifficultyButton"
              onClick={setDifficultyFunction}
            >
              Start
            </button>
          </div>
          <div className="difficultyExplanation">
            <div className="easy">
              {AlgorithmDescriptions[algo]?.difficulty.easy}
            </div>
            <div className="intermediate">
              {AlgorithmDescriptions[algo]?.difficulty.intermediate}
            </div>
            <div className="hard">
              {AlgorithmDescriptions[algo]?.difficulty.hard}
            </div>
            <div className="impossible">
              {AlgorithmDescriptions[algo]?.difficulty.impossible}
            </div>
          </div>
        </div>
        <div ref={instructionsRef} className="algoDescription gameInstructions">
          <p className="infoTitle">Instructions</p>
          <p className="instructions">
            {AlgorithmDescriptions[algo]?.instructions}
          </p>
          <button
            className="nextOverlayButton"
            onClick={() => hideAndShowNextOverlay("instructions")}
          >{`Next >`}</button>
        </div>
      </div>
      <div className="overlay countDown" ref={countDownRef}></div>
      {showWinner && (
        <div className="overlay winner">
          {winner == "user" ? "YOU Beat the Algorithm!!!" : "Algorithm Won!"}
          <button className="tryAgainBtn" onClick={restartGame}>
            {winner == "user" ? "Play Again" : "Try Again"}
          </button>
          <Link className="tryAgainBtn" to={`/moreOnAlgorithms/${algo}`}>
            Learn more
          </Link>
        </div>
      )}
      <div className="algorithmDisplayed">
        <div className="nameAndDifficulty">
          {String(algo)
            .split("_")
            .map((x) => {
              return x.charAt(0).toUpperCase() + x.slice(1) + " ";
            })}
          <span>{difficulty ? `(${difficulty})` : ""}</span>
        </div>
        {countDownOver && (
          <div className="BackgroundSongBtn" onClick={() => muteSong()}>
            {songPlaying ? "🔊" : "🔇"}
          </div>
        )}
      </div>
      <div
        className={
          algo === "heap_sort" || algo === "merge_sort"
            ? "computerSideBigger"
            : "computerSide"
        }
      >
        {getComputerSideComponent()}
      </div>
      <div className="userSide">{getUserSideComponent()}</div>
    </main>
  );
}
