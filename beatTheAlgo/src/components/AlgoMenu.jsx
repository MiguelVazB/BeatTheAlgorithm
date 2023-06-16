import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  return (
    <div className="algoMenu">
      <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
      <h1>Algorithms</h1>
      <div className="algoList">
        <Link className="algorithms" to="moreOnAlgorithms">
          Bubble Sort
        </Link>
        <p>Algorithm_2</p>
        <p>Algorithm_3</p>
        <p>Algorithm_4</p>
        <p>Algorithm_5</p>
        <p>Algorithm_6</p>
        <p>Algorithm_7</p>
      </div>
      <div className="menuButtons">
        <Link className="homeButtonMenu" to="/">
          Home
        </Link>
        <Link className="aboutButtonMenu" to="about">
          About
        </Link>
      </div>
    </div>
  );
};
