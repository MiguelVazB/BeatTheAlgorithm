import React from "react";
import "./pageStyles/GameLayout.css";
import "./pageStyles/AlgorithmsPage.css";
import { Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import CountDownSound from "../sounds/countDownSound.mp3";
import StartSound from "../sounds/startSound.wav";
import gameSound from "../sounds/gameSound.mp3";
import userWonSound from "../sounds/userWonSound.mp3";
import algoWonSound from "../sounds/algoWonSound.mp3";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import {
  generateXRandomNumbers,
  generateXUniqueRandomNumbers,
} from "../utils/randomNumbers.jsx";
const BubbleSort = React.lazy(() =>
  import("../components/BubbleSort").then((module) => ({
    default: module.BubbleSort,
  }))
);
const BubbleSortUser = React.lazy(() =>
  import("../components/BubbleSort").then((module) => ({
    default: module.BubbleSortUser,
  }))
);
const SelectionSort = React.lazy(() =>
  import("../components/SelectionSort").then((module) => ({
    default: module.SelectionSort,
  }))
);
const SelectionSortUser = React.lazy(() =>
  import("../components/SelectionSort").then((module) => ({
    default: module.SelectionSortUser,
  }))
);
const HeapSort = React.lazy(() =>
  import("../components/HeapSort").then((module) => ({
    default: module.HeapSort,
  }))
);
const HeapSortUser = React.lazy(() =>
  import("../components/HeapSort").then((module) => ({
    default: module.HeapSortUser,
  }))
);
const MergeSort = React.lazy(() =>
  import("../components/MergeSort").then((module) => ({
    default: module.MergeSort,
  }))
);
const MergeSortUser = React.lazy(() =>
  import("../components/MergeSort").then((module) => ({
    default: module.MergeSortUser,
  }))
);

export default function GameLayout({ algo }) {
  const [randomValues, setRandomValues] = React.useState([]);

  const [countDownOver, setCountDownOver] = React.useState(false);
  const [showWinner, setShowWinner] = React.useState(false);
  const [winner, setWinner] = React.useState("");

  const [difficulty, setDifficulty] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("easy");

  const difficultyOverlayRef = React.useRef(null);
  const countDownRef = React.useRef(null);
  const algoInfoRef = React.useRef(null);
  const instructionsRef = React.useRef(null);
  const difficultyRef = React.useRef(null);
  const difficulties = ["easy", "intermediate", "hard", "impossible"];

  const backgroundMusicRef = React.useRef(null);
  const [songPlaying, setSongPlaying] = React.useState(true);

  const { width, height } = useWindowSize();

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
        backgroundMusicRef.current.volume = 0.1;
      }
      setTimeout(() => {
        backgroundMusicRef.current.play();
      });
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
        let countDownAudio = new Audio(CountDownSound);
        countDownAudio.volume = 0.5;
        countDownAudio.play();
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
        <div ref={difficultyRef} className="difficultySection modern-card difficultySelection">
          <p className="modern-title">Choose Difficulty</p>
          <div className="difficultyOptions">
            <select
              name="difficulty"
              id="difficulty"
              className="modern-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
              <option value="impossible">Impossible</option>
            </select>
            <button
              className="setDifficultyButton modern-btn"
              onClick={setDifficultyFunction}
            >
              Start
            </button>
          </div>
          <div className="difficultyExplanation modern-difficulty-explanation">
            <div className={`modern-difficulty-level ${selectedDifficulty}`}>
              {AlgorithmDescriptions[algo]?.difficulty[selectedDifficulty]}
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
      <div className="overlay countDown" ref={countDownRef} />
      {showWinner && (
        <div className="overlay winner">
          {showWinner === "user" && <Confetti width={width} height={height} />}
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
