import "./HomePage.css";
import HeadAlgo from "../images/head-white.png";
import Puzzle from "../images/puzzle.png";
import Matrix from "../images/matrix.png";
import rightArrow from "../images/right-arrow.svg";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="homePage">
      <div className="challengeUser elementBox">
        <p>
          Do <span>YOU</span> have what it takes to Beat the Algorithm?
        </p>
        <img src={HeadAlgo} className="elementImage" />
      </div>
      <div className="solve elementBox">
        <img src={Puzzle} className="elementImage" />
        <p>Beat the algorithm by solving a problem faster</p>
      </div>
      <div className="learn elementBox">
        <p>Learn about algorithms by trying to beat them</p>
        <img src={Matrix} className="elementImage" />
      </div>
      <div className="ready">
        <p className="readyQuestion">Ready to Beat the algorithms?</p>
        <p>CLICK on the START BUTTON to start with Bubble Sort Algorithm</p>
        <p className="orStart">OR</p>
        <p>
          CLICK on the MENU on the TOP LEFT to choose the algorithm YOU want to
          challenge
        </p>
      </div>
      <Link className="elementBox startButton" to="about">
        <p>Start</p>
        <img src={rightArrow} className="elementImage" />
      </Link>
    </main>
  );
}
