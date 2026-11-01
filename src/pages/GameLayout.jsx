import React from "react";
import PropTypes from "prop-types";
import "./pageStyles/GameLayout.css";
import { useParams, Navigate, Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import Icon from "../components/Icon";
import { useSortingGame } from "../hooks/useSortingGame";
import { getDifficultyDescription } from "../utils/difficultyConfig";
import { WinnerOverlay, AlgorithmHeader, GameContainer, GameDialog } from "../components/common/SortingGameUI";
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

export default function GameLayout({ algo: propAlgo }) {
  const { algoname } = useParams();
  const algo = algoname || propAlgo;

  // Validate that the algorithm is supported
  const supportedAlgorithms = ["bubble_sort", "selection_sort", "heap_sort", "merge_sort"];
  const isValidAlgorithm = supportedAlgorithms.includes(algo);

  // Redirect to not found page if algorithm is not supported
  if (!isValidAlgorithm) {
    return <Navigate to="/not-found" replace />;
  }

  return <SortingGame key={algo} algo={algo} />;
}

GameLayout.propTypes = { algo: PropTypes.string };
SortingGame.propTypes = { algo: PropTypes.oneOf(["bubble_sort", "selection_sort", "heap_sort", "merge_sort"]).isRequired };

function SortingGame({ algo }) {
  // Each algorithm gets its own game session when the route changes.
  const {
    countDownOver,
    showWinner,
    winner,
    difficulty,
    selectedDifficulty,
    songPlaying,
    countDownRef,
    difficultyOverlayRef,
    setWinner,
    setDifficulty,
    setSelectedDifficulty,
    startCountDown,
    toggleMusic,
    resetGame
  } = useSortingGame();

  const [randomValues, setRandomValues] = React.useState([]);

  const [setupStep, setSetupStep] = React.useState(0);
  const difficulties = ["easy", "intermediate", "hard", "impossible"];
  const algorithmName = algo.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  React.useEffect(() => {
    if (difficulty && !showWinner) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [difficulty, showWinner]);

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
  }, [algo]);

  React.useEffect(() => {
    if (difficulty.length > 0 && !countDownOver) {
      startCountDown();
    }
  }, [difficulty, countDownOver, startCountDown]);

  function getComputerSideComponent() {
    switch (algo) {
      case "bubble_sort":
        return (
          <BubbleSort
            difficulty={difficulty}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "selection_sort":
        return (
          <SelectionSort
            difficulty={difficulty}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "heap_sort":
        return (
          <HeapSort
            difficulty={difficulty}
            randomNumbers={randomValues}
            countDownOver={countDownOver}
            setWinner={setWinner}
            winner={winner}
          />
        );
      case "merge_sort":
        return (
          <MergeSort
            difficulty={difficulty}
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
          <BubbleSortUser 
            active={countDownOver && !winner}
            randomNumbers={randomValues} 
            setWinner={setWinner} 
            difficulty={difficulty}
          />
        );
      case "selection_sort":
        return (
          <SelectionSortUser
            active={countDownOver && !winner}
            randomNumbers={randomValues}
            setWinner={setWinner}
            difficulty={difficulty}
          />
        );
      case "heap_sort":
        return (
          <HeapSortUser 
            active={countDownOver && !winner}
            randomNumbers={randomValues} 
            setWinner={setWinner} 
            difficulty={difficulty}
          />
        );
      case "merge_sort":
        return (
          <MergeSortUser 
            active={countDownOver && !winner}
            randomNumbers={randomValues} 
            setWinner={setWinner}
            difficulty={difficulty}
          />
        );
    }
  }

  function setDifficultyFunction() {
    setDifficulty(
      selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
    );
  }

  return (
    <main className="gameLayout">
      <GameDialog className="difficultyOverlay" overlayRef={difficultyOverlayRef} labelId="game-setup-title">
        <div className="game-setup-card">
          <div className="game-setup-topline">
            <Link to="/moreOnAlgorithms" className="game-back-link">All algorithms</Link>
            <span>Let’s get you ready</span>
          </div>
          <div className="game-setup-progress" aria-label={`Setup step ${setupStep + 1} of 3`}>
            {["The idea", "How to play", "Your pace"].map((step, index) => (
              <span key={step} className={index <= setupStep ? "is-current" : ""}><i>{index < setupStep ? <Icon name="check" size={12} /> : index + 1}</i>{step}</span>
            ))}
          </div>
          <div className="game-setup-copy" aria-live="polite">
            <p className="game-eyebrow">{algorithmName} challenge</p>
            <h2 id="game-setup-title">{["A little order. A little competition.", "You’ve got the human advantage.", "Find your starting pace."][setupStep]}</h2>
            {setupStep === 0 && <p>{AlgorithmDescriptions[algo]?.description}</p>}
            {setupStep === 1 && <>
              <p>{({
                bubble_sort: "Pop the numbers on your side from smallest to largest. Your choices build the sorted list. Need a fresh attempt? Hit Reset.",
                selection_sort: "Select two numbers to swap their places. Keep swapping until your row runs from smallest to largest.",
                heap_sort: "Pick up a number, then click a position to place it. If that position is filled, you’ll pick up its number. Arrange the whole row from smallest to largest.",
                merge_sort: "Select numbers from smallest to largest to fill your answer row above. Click a number in your answer to send it back and try again.",
              })[algo]}</p>
              <div className="game-setup-note"><Icon name="check" size={18} /><span>Same numbers. Same goal. Your moves don’t have to follow the algorithm; finish with the correct order before the computer.</span></div>
            </>}
            {setupStep === 2 && <>
              <p>The difficulty controls how quickly the computer sorts. Start easy and work your way up.</p>
              <div className="difficulty-buttons" role="group" aria-label="Computer difficulty">
                {difficulties.map((diff, index) => <button key={diff} type="button" className={`difficulty-btn ${selectedDifficulty === diff ? "active" : ""}`} aria-pressed={selectedDifficulty === diff} onClick={() => setSelectedDifficulty(diff)}><span className="difficulty-bars" aria-hidden="true">{[0, 1, 2, 3].map((bar) => <i key={bar} className={bar <= index ? "filled" : ""} />)}</span>{diff.charAt(0).toUpperCase() + diff.slice(1)}</button>)}
              </div>
              <p className="difficultyExplanation">{getDifficultyDescription(algo, selectedDifficulty)}</p>
            </>}
          </div>
          <div className="game-setup-actions">
            {setupStep > 0 ? <button type="button" className="game-secondary-button" onClick={() => setSetupStep((step) => step - 1)}>Back</button> : <span className="game-setup-duration">A quick challenge. A lasting lesson.</span>}
            <button type="button" className="game-primary-button" onClick={setupStep === 2 ? setDifficultyFunction : () => setSetupStep((step) => step + 1)} autoFocus>
              {setupStep === 2 ? "Let’s play" : "Continue"}<Icon name={setupStep === 2 ? "play" : "arrow-right"} size={18} />
            </button>
          </div>
        </div>
      </GameDialog>
      <div className="overlay countDown" ref={countDownRef} aria-live="assertive" aria-label="Game starts in" />
      {showWinner && (
        <WinnerOverlay winner={winner} algo={algo} onRestart={resetGame} />
      )}
      <AlgorithmHeader
        algo={algo}
        difficulty={difficulty}
        songPlaying={songPlaying}
        onToggleMusic={toggleMusic}
        countDownOver={countDownOver}
      />
      <GameContainer
        algo={algo}
        computerSide={getComputerSideComponent()}
        userSide={getUserSideComponent()}
      />
    </main>
  );
}
