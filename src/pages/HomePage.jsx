import "./pageStyles/HomePage.css";
import React from "react";
import HeadAlgo from "../images/head-white.png";
import Puzzle from "../images/puzzle.png";
import Matrix from "../images/matrix.png";
import rightArrow from "../images/right-arrow.svg";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [challengeDisplayed, SetChallengeDisplayed] = React.useState(false);
  const [solveBoxDisplayed, SetSolveBoxDisplayed] = React.useState(false);
  const [learnBoxDisplayed, SetLearnBoxDisplayed] = React.useState(false);

  const challengeUserRef = React.useRef(null);
  const solveRef = React.useRef(null);
  const learnRef = React.useRef(null);
  const readyQRef = React.useRef(null);
  const startBtnRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList[0] === "solve") {
              entry.target.classList.add("animateFadeInLeft");
              entry.target.style.opacity = 1;
              setInterval(() => {
                SetSolveBoxDisplayed(true);
              }, 500);
            } else if (entry.target.classList[0] === "learn") {
              entry.target.classList.add("animateFadeInRight");
              entry.target.style.opacity = 1;
              setInterval(() => {
                SetLearnBoxDisplayed(true);
              }, 500);
            } else if (entry.target.classList[0] === "readyQuestion") {
              entry.target.classList.add("bounce");
            } else if (entry.target.classList[1] === "startButton") {
              entry.target.classList.add("buttonPulse");
            } else {
              entry.target.classList.add("animateFadeInRight");
              entry.target.style.opacity = 1;
              setInterval(() => {
                SetChallengeDisplayed(true);
              }, 500);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (challengeUserRef.current) observer.observe(challengeUserRef.current);
    if (solveRef.current) observer.observe(solveRef.current);
    if (learnRef.current) observer.observe(learnRef.current);
    if (readyQRef.current) observer.observe(readyQRef.current);
    if (startBtnRef.current) observer.observe(startBtnRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (challengeDisplayed)
      challengeUserRef.current.classList.add("diffuseLeft");
    if (solveBoxDisplayed) solveRef.current.classList.add("diffuseRight");
    if (learnBoxDisplayed) learnRef.current.classList.add("diffuseLeft");
  }, [challengeDisplayed, solveBoxDisplayed, learnBoxDisplayed]);

  return (
    <main className="homePage">
      <div ref={challengeUserRef} className="challengeUser elementBox">
        <p>
          Do <span>YOU</span> have what it takes to Beat the Algorithm?
        </p>
        <img src={HeadAlgo} className="elementImage" />
      </div>
      <div ref={solveRef} className="solve elementBox">
        <img src={Puzzle} className="elementImage" />
        <p>Beat the algorithm by solving a problem faster</p>
      </div>
      <div ref={learnRef} className="learn elementBox">
        <p>Learn about algorithms by trying to beat them</p>
        <img src={Matrix} className="elementImage" />
      </div>
      <div className="ready">
        <p ref={readyQRef} className="readyQuestion">
          Ready to Beat the algorithms?
        </p>
        <p>CLICK on the START BUTTON to start with Bubble Sort Algorithm</p>
        <p className="orStart">OR</p>
        <p>
          CLICK on the MENU on the TOP LEFT to choose the algorithm YOU want to
          challenge
        </p>
      </div>
      <Link
        ref={startBtnRef}
        className="elementBox startButton"
        to="/BeatTheAlgorithm/algo/bubble_sort"
      >
        <p>Start</p>
        <img src={rightArrow} className="elementImage" />
      </Link>
    </main>
  );
}
