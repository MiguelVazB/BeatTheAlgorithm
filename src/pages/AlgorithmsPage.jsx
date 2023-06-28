import "./pageStyles/AlgorithmsPage.css";
import React from "react";
import { Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";

export default function AlgorithmsPage() {
  const [algorithmsToDisplay, setAlgorithmsToDisplay] = React.useState([]);
  const [displayAlgo, setDisplayAlgo] = React.useState(false);

  React.useEffect(() => {
    let algorithms = [];
    for (let algo in AlgorithmDescriptions) {
      if (AlgorithmDescriptions.hasOwnProperty(algo)) algorithms.push(algo);
    }
    setAlgorithmsToDisplay(algorithms);
  }, [AlgorithmDescriptions]);

  React.useEffect(() => {
    if (algorithmsToDisplay) setDisplayAlgo(true);
  }, [algorithmsToDisplay]);

  return (
    <main className="algoPage">
      {displayAlgo &&
        algorithmsToDisplay.map((algorithm) => {
          let bubbleSort =
            AlgorithmDescriptions[algorithm]?.detailedDescription;
          return (
            <div key={algorithm} className="algorithm">
              <div className="name">
                {String(algorithm)
                  .split("_")
                  .map((x) => {
                    return x.charAt(0).toUpperCase() + x.slice(1) + " ";
                  })}
              </div>
              <div className="explanation">{bubbleSort?.simpleExplanation}</div>
              <div className="MoreOnAlgoLinks">
                <Link className="actionBtn" to={`/algo/${algorithm}`}>
                  Play
                </Link>
                <Link
                  className="actionBtn"
                  onClick={{
                    if(algorithmsToDisplay) {
                      setAlgorithmsToDisplay([algorithmsToDisplay]);
                    },
                  }}
                  to={`/moreOnAlgorithms/${algorithm}`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          );
        })}
    </main>
  );
}
