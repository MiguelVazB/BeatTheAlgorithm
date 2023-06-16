import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../images/left-arrow.svg";
import "./componentStyles/AlgoMenu.css";

export const AlgoMenu = ({ showMenuClick }) => {
  return (
    <div className="algoMenu">
      <img src={Arrow} onClick={showMenuClick} className="goBackArrow" />
      <h1>Algorithms</h1>
      <div className="algoList">
        <Link className="algorithms" to="bubbleSort" onClick={showMenuClick}>
          Bubble Sort
        </Link>
        <Link className="algorithms">Algorithm_1</Link>
        <Link className="algorithms">Algorithm_2</Link>
        <Link className="algorithms">Algorithm_3</Link>
        <Link className="algorithms">Algorithm_4</Link>
        <Link className="algorithms">Algorithm_5</Link>
        <Link className="algorithms">Algorithm_6</Link>
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
