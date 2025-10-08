import React from "react";
import "./pageStyles/GameLayout.css";
import "./pageStyles/AlgorithmsPage.css";
import { useParams, Navigate } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import { useWindowSize } from "react-use";
import { useSortingGame } from "../hooks/useSortingGame";
import { WinnerOverlay, AlgorithmHeader, GameContainer } from "../components/common/SortingGameUI";
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

  // Use the common sorting game hook
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
  } = useSortingGame(algo);

  const [randomValues, setRandomValues] = React.useState([]);

  const algoInfoRef = React.useRef(null);
  const instructionsRef = React.useRef(null);
  const difficultyRef = React.useRef(null);
  const difficulties = ["easy", "intermediate", "hard", "impossible"];

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
    if (difficulty.length > 0 && !countDownOver) {
      startCountDown();
    }
  }, [difficulty]);

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

  function setDifficultyFunction() {
    setDifficulty(
      selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
    );
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
            {width >= 768 ? (
              // Desktop: Show difficulty buttons
              <div className="difficulty-buttons">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    className={`difficulty-btn ${selectedDifficulty === diff ? `active ${diff}` : ''}`}
                    onClick={() => setSelectedDifficulty(diff)}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            ) : (
              // Mobile: Show select dropdown
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
            )}
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
        <WinnerOverlay winner={winner} algo={algo} onRestart={resetGame} />
      )}
      <AlgorithmHeader
        algo={algo}
        difficulty={difficulty}
        songPlaying={songPlaying}
        onToggleMusic={toggleMusic}
      />
      <GameContainer
        algo={algo}
        computerSide={getComputerSideComponent()}
        userSide={getUserSideComponent()}
      />
    </main>
  );
}
