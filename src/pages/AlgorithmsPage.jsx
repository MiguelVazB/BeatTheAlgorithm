import "./pageStyles/AlgorithmsPage.css";
import React from "react";
import { Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";

export default function AlgorithmsPage() {
  const [algorithmsToDisplay, setAlgorithmsToDisplay] = React.useState([]);
  const [displayAlgo, setDisplayAlgo] = React.useState(false);

  React.useEffect(() => {
    let algorithms = [];
    for (let algorithm in AlgorithmDescriptions) {
      if (AlgorithmDescriptions.hasOwnProperty(algorithm))
        algorithms.push(algorithm);
    }
    setAlgorithmsToDisplay(algorithms);
  }, [AlgorithmDescriptions]);

  React.useEffect(() => {
    if (algorithmsToDisplay) setDisplayAlgo(true);
  }, [algorithmsToDisplay]);

  const getEmoji = (algorithm) => {
    switch (algorithm) {
      case "bubble_sort":
        return "🫧";
      case "selection_sort":
        return "☐☑";
      case "heap_sort":
        return "🌳";
      case "merge_sort":
        return "➗👑";
      default:
        return "";
    }
  };

  return (
    <main className="algoPage">
      <div className="page-header">
        <h2>Select Your Challenge</h2>
        <p>
          Choose an algorithm to test your skills against. Each challenge offers a unique problem-solving experience.
        </p>
      </div>
      
      <div className="algorithms-sections">
        <div className="algorithm-category">
          <h3>Sorting Algorithms</h3>
          <div className="algorithm-grid">
            {displayAlgo &&
              algorithmsToDisplay.map((algorithm) => {
                const emoji = getEmoji(algorithm);
                const algoName = algorithm
                  .split("_")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                const description = AlgorithmDescriptions[algorithm]?.detailedDescription?.simpleExplanation || "";
                
                return (
                  <div key={algorithm} className="algorithm-card">
                    <div className="card-header">
                      <h4>{algoName} {emoji}</h4>
                    </div>
                    <p className="card-description">{description}</p>
                    <div className="card-actions">
                      <Link className="challenge-button" to={`/algo/${algorithm}`}>
                        Challenge
                      </Link>
                      <Link className="learn-more-button" to={`/moreOnAlgorithms/${algorithm}`}>
                        Learn More
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
