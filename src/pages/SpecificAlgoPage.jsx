import React from "react";
import "./pageStyles/SpecificAlgoPage.css";
import { Link } from "react-router-dom";
import AlgorithmDescriptions from "../AlgorithmDescriptions.json";
import BubbleSortImg from "../images/bubble_sort.jpg";

export default function SpecificAlgoPage({ algo }) {
  const [algorithm, setAlgorithm] = React.useState("");
  const [steps, setSteps] = React.useState([]);
  const [algoName, setAlgoName] = React.useState("");

  React.useEffect(() => {
    if (algo) {
      setAlgorithm(AlgorithmDescriptions[algo]?.detailedDescription);
      setAlgoName(
        String(algo)
          .split("_")
          .map((x) => {
            return x.charAt(0).toUpperCase() + x.slice(1) + " ";
          })
      );
    }
  }, []);

  React.useEffect(() => {
    if (algorithm) {
      let algoSteps = [];
      for (let step in algorithm.steps) {
        algoSteps.push(step);
      }
      setSteps(algoSteps);
    }
  }, [algorithm]);

  function getAlgoImage() {
    switch (algo) {
      case "bubble_sort":
        return BubbleSortImg;
    }
  }

  return (
    <div className="specificAlgorithm">
      <div className="simpleExplanation">
        <div className="name">{algoName}</div>
        <div className="explanation">{algorithm.simpleExplanation}</div>
      </div>
      <div className="algoImgContainer">
        <img src={getAlgoImage()} />
      </div>
      <div className="stepByStepContainer">
        <div className="algoSteps explanation">{algoName} step by step:</div>
        <ol className="steps">
          {steps.length > 0 &&
            steps.map((step) => {
              return (
                <li key={step} className="explanation">
                  {algorithm.steps[step]}
                </li>
              );
            })}
        </ol>
      </div>
      <div className="explanation time">{algorithm.timeComplexity}</div>
      <Link className="actionBtn" to={`/algo/${algo}`}>
        Play
      </Link>
    </div>
  );
}
